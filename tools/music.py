#!/usr/bin/env python3
"""Procedural background music bed (original, no samples). usage: music.py <mood> <seconds> <out.wav>
moods: pension (warm EP + pad, 72 BPM, D major), pension2 (same palette, 76 BPM, F major: F–Am–Dm–Bb) — more added per topic group."""
import sys, numpy as np, wave
mood, dur, out = sys.argv[1], float(sys.argv[2]), sys.argv[3]
SR = 48000
P = {'pension': dict(bpm=72, prog=[(50, [62, 66, 69, 73, 76]), (47, [62, 66, 69, 71, 74]), (43, [62, 66, 67, 71, 74]), (45, [61, 64, 67, 69, 76])], ep=0.22, pad=0.10, bass=0.16),
     'pension2': dict(bpm=76, prog=[(41, [60, 65, 69, 72, 77]), (45, [60, 64, 69, 72, 76]), (38, [62, 65, 69, 72, 74]), (46, [62, 65, 70, 72, 77])], ep=0.22, pad=0.10, bass=0.16)}[mood]
n = int(dur * SR); t = np.arange(n) / SR; out_l = np.zeros(n); out_r = np.zeros(n)
mtof = lambda m: 440 * 2 ** ((m - 69) / 12)
beat = 60 / P['bpm']; bar = 4 * beat
rng = np.random.default_rng(7)
def add(sig, start, pan=0.0):
    i = int(start * SR); j = min(n, i + len(sig))
    if j <= i: return
    s = sig[:j - i]; out_l[i:j] += s * (1 - pan) * 0.5 + s * 0.5 * (1 - abs(pan)); out_r[i:j] += s * (1 + pan) * 0.5 + s * 0.5 * (1 - abs(pan))
def ep(m, length, vel):
    tt = np.arange(int(length * SR)) / SR; f = mtof(m)
    idx = 1.6 * np.exp(-tt * 3.0) * vel
    sig = np.sin(2 * np.pi * f * tt + idx * np.sin(2 * np.pi * f * tt)) * np.exp(-tt * 1.4) * vel
    sig += 0.15 * np.sin(2 * np.pi * 2 * f * tt) * np.exp(-tt * 3) * vel
    env = np.minimum(1, tt / 0.006); return sig * env * (1 + 0.04 * np.sin(2 * np.pi * 4.5 * tt))
def pad(m, length):
    tt = np.arange(int(length * SR)) / SR; f = mtof(m); s = np.zeros_like(tt)
    for d in (-0.08, 0.0, 0.07):
        ph = (f * (1 + d / 100) * tt) % 1.0; s += 2 * ph - 1
    # gentle low-pass (one-pole) + slow swell
    y = np.zeros_like(s); a = 0.035
    for k in range(1, len(s)): y[k] = y[k - 1] + a * (s[k] - y[k - 1])
    env = np.minimum(1, tt / 1.2) * np.minimum(1, (length - tt) / 1.0)
    return y * env / 3
def bass(m, length):
    tt = np.arange(int(length * SR)) / SR; f = mtof(m)
    return np.sin(2 * np.pi * f * tt) * np.exp(-tt * 0.9) * np.minimum(1, tt / 0.02)
nbars = int(np.ceil(dur / bar))
for b in range(nbars):
    root, chord = P['prog'][b % len(P['prog'])]; t0 = b * bar
    for m in chord[:3]: add(pad(m, bar + 0.8) * P['pad'], t0, rng.uniform(-0.4, 0.4))
    add(bass(root, bar) * P['bass'], t0)
    for k, pos in enumerate([0, 1.5, 2.5, 3.0]):           # soft comping
        notes = chord if k == 0 else chord[1:4]
        for q, m in enumerate(notes):
            add(ep(m, 2.4, (0.8 if k == 0 else 0.5) * rng.uniform(0.85, 1.0)) * P['ep'], t0 + pos * beat + q * 0.012, (q - 2) * 0.2)
fade = np.minimum(1, t / 2.0) * np.minimum(1, (dur - t) / 3.0)
L, R = out_l * fade, out_r * fade
peak = max(np.abs(L).max(), np.abs(R).max()) or 1
st = (np.stack([L, R], 1) / peak * 0.8 * 32767).astype(np.int16)
with wave.open(out, 'wb') as w: w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(st.tobytes())
print('ok', out, dur)
