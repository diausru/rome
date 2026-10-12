#!/usr/bin/env python3
"""Automated QC for motion-engine v3 Reels (2026-10-12). Ideas from marketing-skill check.js/render.js lint (safe zones,
text on frame 0, reading time, static stretches, loudness gate), re-implemented on the rendered MP4 with ffmpeg + numpy.
usage: tools/check_v3.py <video.mp4> <timeline.json> [--data-cmd "python3 make_data.py" --data data.json] [--src Comp.tsx] [--sheet out.jpg]
Exit code 1 if a hard check fails. Advice-only items are printed as NOTE."""
import json, re, subprocess, sys, pathlib
import numpy as np

SAFE = dict(x0=60, x1=960, y0=150, y1=1450)
fails, notes = [], []


def run(*a): return subprocess.run(a, capture_output=True, text=True)


def ok(name, cond, detail):
    print(f"{'PASS' if cond else 'FAIL'}  {name}: {detail}")
    if not cond: fails.append(name)


def frame_at(video, t, w=1080, h=1920):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-ss', f'{t:.3f}', '-i', video, '-frames:v', '1', '-f', 'rawvideo', '-pix_fmt', 'gray', '-'],
                         capture_output=True).stdout
    return np.frombuffer(raw, np.uint8).reshape(h, w).astype(np.float32) if len(raw) == w * h else None


def bright_text(img):
    """near-white / gold type pixels: bright and with a strong local edge (photo plates are graded dark)"""
    gx = np.abs(np.diff(img, axis=1, prepend=img[:, :1])); gy = np.abs(np.diff(img, axis=0, prepend=img[:1]))
    return (img > 170) & ((gx + gy) > 60)


def main():
    video, tl = sys.argv[1], json.load(open(sys.argv[2])); args = sys.argv
    # 1. container / stream specs
    pr = json.loads(run('ffprobe', '-v', 'error', '-show_streams', '-show_format', '-of', 'json', video).stdout)
    v = next(s for s in pr['streams'] if s['codec_type'] == 'video'); a = [s for s in pr['streams'] if s['codec_type'] == 'audio']
    fps = eval(v['r_frame_rate']); dur = float(pr['format']['duration'])
    ok('video spec', v['width'] == 1080 and v['height'] == 1920 and v['codec_name'] == 'h264' and v['pix_fmt'] == 'yuv420p',
       f"{v['width']}x{v['height']} {v['codec_name']} {v['pix_fmt']} {fps:.2f} fps")
    ok('audio track', bool(a) and a[0]['codec_name'] == 'aac', f"{a[0]['codec_name']} {a[0]['sample_rate']} Hz {a[0]['channels']} ch" if a else 'missing')
    ok('duration', abs(dur - tl['total']) < 0.15, f"{dur:.2f} s vs timeline {tl['total']:.2f} s")
    # 2. full decode
    dec = run('ffmpeg', '-v', 'error', '-i', video, '-f', 'null', '-')
    ok('full decode', dec.returncode == 0 and not dec.stderr.strip(), 'no decoder errors' if not dec.stderr.strip() else dec.stderr[:200])
    # 3. loudness
    o = run('ffmpeg', '-nostats', '-i', video, '-af', 'ebur128=peak=true', '-f', 'null', '-').stderr
    I = float(re.findall(r'I:\s+(-?[\d.]+) LUFS', o)[-1]); tp = float(re.findall(r'Peak:\s+(-?[\d.]+) dBFS', o)[-1])
    ok('loudness', abs(I + 14) <= 0.6, f'{I:.1f} LUFS (target −14 ±0.6)')
    ok('true peak', tp <= -1.0, f'{tp:.1f} dBTP (≤ −1.0)')
    # 4. black frames (outside the last 0.2 s)
    bd = run('ffmpeg', '-i', video, '-vf', 'blackdetect=d=0.3:pix_th=0.04', '-an', '-f', 'null', '-').stderr
    blacks = [(float(a), float(b)) for a, b in re.findall(r'black_start:([\d.]+) black_end:([\d.]+)', bd) if float(a) < dur - 0.2]
    ok('no black stretches', not blacks, str(blacks) if blacks else 'none ≥ 0.3 s')
    # 5. static stretches (advice): nothing changes for > 3 s
    fz = run('ffmpeg', '-i', video, '-vf', 'freezedetect=n=0.0015:d=3', '-an', '-f', 'null', '-').stderr
    frozen = re.findall(r'freeze_start: ([\d.]+).*?\n.*?freeze_duration: ([\d.]+)', fz)
    print(f"{'NOTE' if frozen else 'PASS'}  pacing: {'static ' + str(frozen) if frozen else 'no stretch > 3 s without visible change'}")
    # 6. text on frame 0 (the cover) and in the first second
    f0 = frame_at(video, 0.0)
    cov = bright_text(f0[300:1000, 60:960]).mean() if f0 is not None else 0
    ok('text on frame 0', cov > 0.004, f'type coverage {cov * 100:.2f}% of the hook area')
    # 7. safe area: bright type in the bands the app UI covers (heuristic on sampled frames)
    worst = (0, 0, '')
    for t in np.arange(0.5, dur - 0.5, 0.5):
        img = frame_at(video, float(t))
        if img is None: continue
        m = bright_text(img)
        for band, sl in (('bottom', m[SAFE['y1'] + 10:, :]), ('right', m[SAFE['y0']:SAFE['y1'], SAFE['x1'] + 10:]), ('top', m[:SAFE['y0'] - 10, :])):
            r = sl.mean()
            if r > worst[0]: worst = (r, float(t), band)
    ok('safe area', worst[0] < 0.004, f'max type-like coverage outside the safe area {worst[0] * 100:.2f}% ({worst[2]} @ {worst[1]:.1f} s)')
    # 8. captions: chunk rules + every chunk inside the voiced span
    ch = tl['chunks']
    long = [c['text'] for c in ch if len(c['words']) > 4]
    ok('caption chunks', not long, f"{len(ch)} chunks, ≤ 4 words each" if not long else f'too long: {long}')
    over = [c['text'] for c in ch if len(c['text']) > 22]
    if over: notes.append(f'{len(over)} chunks over 22 characters (single long words): {over[:3]}')
    vo_end = tl['beats'][-1]['end']
    ok('caption timing', all(c['t0'] >= tl['beats'][0]['start'] - 0.05 and c['t1'] <= vo_end + 0.05 for c in ch), f'all chunks within the voice ({tl["beats"][0]["start"]:.2f}–{vo_end:.2f} s)')
    # 9. SFX density under the voice (≈ one per 3 s at most, scene changes + key reveals)
    ts = sorted(c['t'] for c in tl['cues']); dense = max(sum(1 for u in ts if t <= u < t + 3) for t in ts)
    ok('sfx density', dense <= 2, f'{len(ts)} cues, max {dense} in any 3 s window')
    # 10. data integrity: data.json regenerates identically from the verified calculation; list literal $ amounts in the source
    if '--data' in args:
        dpath = pathlib.Path(args[args.index('--data') + 1]); before = dpath.read_text()
        subprocess.run(args[args.index('--data-cmd') + 1], shell=True, cwd=dpath.parent, capture_output=True, check=True)
        ok('data reproducible', dpath.read_text() == before, f'{dpath.name} regenerated from the calculation, identical')
    if '--src' in args:
        lits = sorted(set(re.findall(r'\$[\d,.]+K?', pathlib.Path(args[args.index('--src') + 1]).read_text())))
        notes.append(f'literal amounts in the composition (labels, not results; review): {lits}')
    # 11. contact sheet for the visual pass
    if '--sheet' in args:
        out = args[args.index('--sheet') + 1]; n = 12
        sel = '+'.join(f"eq(n\\,{int(i * (dur * fps - 2) / (n - 1))})" for i in range(n))
        run('ffmpeg', '-v', 'error', '-y', '-i', video, '-vf', f"select='{sel}',scale=270:480,tile=12x1", '-frames:v', '1', '-vsync', 'vfr', out)
        print(f'INFO  contact sheet: {out}')
    for n_ in notes: print('NOTE ', n_)
    print(f"\n{'ALL HARD CHECKS PASSED' if not fails else 'FAILED: ' + ', '.join(fails)}")
    sys.exit(1 if fails else 0)


if __name__ == '__main__':
    main()
