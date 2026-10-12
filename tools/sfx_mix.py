#!/usr/bin/env python3
"""Sound design + mastering for motion engine v3 (2026-10-12). Original synthesized sounds (no samples, nothing to license)
and the mix chain modelled on marketing-skill render.js (studied, re-implemented): voice levelled to a fixed loudness,
music bed ≈7 dB under the voice and ducked further while the voice speaks (sidechaincompress), SFX under the voice,
master to −14 LUFS with a true-peak limiter loop until the measured true peak is ≤ −1 dBTP.

TAX SECRETS CANADA sonic identity: restrained, cinematic, D major. SFX: swish (card/caption in), whoosh (scene change),
tick (a number lands, pitched on the D-major pentatonic, climbing across a run), glint (a highlight), boom (the final
result), logo (three-note sonic logo D–F#–A resolving to D, closes every Reel).

usage: tools/sfx_mix.py <timeline.json with total + cues[{t,s,g}]> <voice.wav> <music.wav> <out.wav>
"""
import json, re, subprocess, sys, tempfile, pathlib, wave
import numpy as np

SR = 48000
rng = np.random.default_rng(11)


def tt(d): return np.arange(int(d * SR)) / SR


def noise_sweep(d, f0, f1, q=6.0):
    """band-passed noise whose centre glides f0→f1 (a simple resonant state-variable filter per sample)"""
    n = len(tt(d)); x = rng.standard_normal(n); y = np.zeros(n); lo = bp = 0.0
    fc = np.geomspace(f0, f1, n)
    for i in range(n):
        f = 2 * np.sin(np.pi * fc[i] / SR); hp = x[i] - lo - bp / q; bp += f * hp; lo += f * bp; y[i] = bp
    return y / (np.abs(y).max() + 1e-9)


def env(n, a, d):  # attack/decay seconds
    t = np.arange(n) / SR
    return np.minimum(1, t / max(a, 1e-4)) * np.exp(-np.maximum(0, t - a) / d)


def mtof(m): return 440 * 2 ** ((m - 69) / 12)


def tone(m, d, decay, harm=(1, 0.3, 0.12)):
    t = tt(d); f = mtof(m)
    s = sum(a * np.sin(2 * np.pi * f * (k + 1) * t) for k, a in enumerate(harm))
    return s * env(len(t), 0.004, decay)


PENT = [62, 64, 66, 69, 71, 74, 76, 78, 81]   # D-major pentatonic (D4 …)


def make(kind, step=0):
    if kind == 'swish':
        y = noise_sweep(0.32, 1800, 6500) * env(int(0.32 * SR), 0.09, 0.08); return y * 0.6
    if kind == 'whoosh':
        d = 0.75; y = noise_sweep(d, 300, 4200, 4) * np.sin(np.pi * np.clip(tt(d) / d, 0, 1)) ** 1.5
        return y * 0.8
    if kind == 'tick':
        m = PENT[min(step, len(PENT) - 1)] + 12
        y = tone(m, 0.35, 0.06, (1, 0.5, 0.2)) * 0.5
        y[:int(0.03 * SR)] += noise_sweep(0.03, 3000, 2500) * env(int(0.03 * SR), 0.001, 0.008) * 0.3
        return y
    if kind == 'glint':
        y = sum(tone(m, 1.2, 0.5, (1, 0.25)) * g for m, g in ((86, 0.5), (93, 0.35), (98, 0.2)))
        return y * 0.5
    if kind == 'boom':
        d = 1.8; t = tt(d); f = 55 * np.exp(-t * 2.2) + 38
        body = np.sin(2 * np.pi * np.cumsum(f) / SR) * env(len(t), 0.005, 0.55)
        tail = noise_sweep(d, 400, 120, 2) * env(len(t), 0.01, 0.6) * 0.15
        return (body + tail) * 0.9
    if kind == 'logo':
        y = np.zeros(int(2.4 * SR))
        for k, (m, at) in enumerate(((74, 0.0), (78, 0.18), (81, 0.36), (86, 0.62))):
            s = tone(m, 1.8, 0.7 if k == 3 else 0.35, (1, 0.35, 0.1)) * (0.55 if k < 3 else 0.7)
            i = int(at * SR); y[i:i + len(s)] += s[:len(y) - i]
        return y * 0.6
    raise ValueError(kind)


def write(path, x, ch=1):
    x = np.clip(x, -1, 1)
    with wave.open(str(path), 'wb') as w:
        w.setnchannels(ch); w.setsampwidth(2); w.setframerate(SR); w.writeframes((x * 32767).astype(np.int16).tobytes())


def lufs(path):
    o = subprocess.run(['ffmpeg', '-nostats', '-i', str(path), '-af', 'ebur128=peak=true', '-f', 'null', '-'], capture_output=True, text=True).stderr
    I = float(re.findall(r'I:\s+(-?[\d.]+) LUFS', o)[-1]); tp = re.findall(r'Peak:\s+(-?[\d.]+|-inf) dBFS', o)
    return I, float(tp[-1]) if tp and tp[-1] != '-inf' else -99


def main():
    tl = json.load(open(sys.argv[1])); voice, music, out = sys.argv[2], sys.argv[3], pathlib.Path(sys.argv[4])
    total = tl['total']; tmp = pathlib.Path(tempfile.mkdtemp())
    # 1. SFX bus from the timeline cues (ticks climb when they land close together)
    bus = np.zeros(int((total + 3) * SR)); last_tick, step = -9, 0
    for c in tl['cues']:
        if c['s'] == 'tick':
            step = step + 1 if c['t'] - last_tick < 25 else 0; last_tick = c['t']
        y = make(c['s'], step) * 10 ** (c.get('g', -8) / 20)
        i = int(c['t'] * SR); bus[i:i + len(y)] += y[:len(bus) - i]
    write(tmp / 'sfx.wav', bus[:int(total * SR)])
    # 2. levels: voice to −20 LUFS, music bed 7 dB under the voice, then ducked ~10 dB while the voice speaks
    vI, _ = lufs(voice); mI, _ = lufs(music)
    gv, gm = -20 - vI, (-27 - mI)
    fc = (f"[0:a]aresample={SR},aformat=channel_layouts=stereo,volume={gv:.2f}dB,asplit=2[v][vsc];"
          f"[1:a]aresample={SR},aformat=channel_layouts=stereo,volume={gm:.2f}dB,atrim=0:{total}[m];"
          f"[m][vsc]sidechaincompress=threshold=0.008:ratio=3:attack=40:release=450[md];"
          f"[2:a]aresample={SR},aformat=channel_layouts=stereo,volume=-6dB[s];"
          f"[v][md][s]amix=inputs=3:normalize=0:duration=longest,atrim=0:{total},lowpass=f=16000[mix]")
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', voice, '-i', music, '-i', str(tmp / 'sfx.wav'), '-filter_complex', fc,
                    '-map', '[mix]', '-c:a', 'pcm_s24le', str(tmp / 'pre.wav')], check=True)
    # 3. master: gain to −14 LUFS, 4× oversampled true-peak limiter, tighten until TP ≤ −1 dBTP
    I, _ = lufs(tmp / 'pre.wav'); g = min(20, -14 - I)
    for ceil in (0.79, 0.75, 0.7, 0.63):
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', str(tmp / 'pre.wav'), '-af',
                        f'volume={g:.2f}dB,aresample=192000,alimiter=limit={ceil}:level=false:attack=2:release=60,aresample={SR}',
                        '-c:a', 'pcm_s16le', str(out)], check=True)
        I2, tp = lufs(out)
        if tp <= -1.0: break
    print(f'voice {vI:.1f} → −20 LUFS · music {mI:.1f} → −27 · master {I2:.1f} LUFS · true peak {tp:.1f} dBTP · cues {len(tl["cues"])}')


if __name__ == '__main__':
    main()
