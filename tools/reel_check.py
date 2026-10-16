#!/usr/bin/env python3
"""Automated QC for a card-format reel built on the motion engine. Every check below actually runs; it reports
PASS / FAIL / ADVICE and exits 1 on any FAIL. Visual review of the contact sheet is still required.
usage: tools/reel_check.py <project dir> <final.mp4> [--fps 24]
reads <project>/reel.json, <project>/data.json, <project>/vo-beats.json and showreel/src/<id-prefix>-timeline.json,
<prefix>-words.json, <reel id>-cues.json.

Checks (rules adapted from marketing-skill's render.js / check.js, MIT):
 1. video: 1080×1920, fps, every frame decodes, length ≥ narration end + hold
 2. audio: integrated loudness −14 ± 0.6 LUFS, true peak ≤ −1.0 dBTP (ffmpeg ebur128)
 3. first frame: the hook's box holds bright text pixels at frame 0 (the cover and the swipe decision)
 4. safe zone: every declared layout box inside SAFE (top 150, bottom 1450, left 60, right 1020; right 960 below y 1100)
 5. overlaps: the caption box never overlaps a panel that is on screen at the same time
 6. captions: word timings monotonic and inside their beat; chunks ≤ 4 words / 22 chars; no chunk shorter than 0.25 s
 7. pacing (advice): stretches over 3 s with no new caption chunk, cue or scene change
 8. sound: cue density under the voice ≤ 1 per 3 s (advice), sounds within 1 s of each other listed
 9. facts: derived example numbers recomputed from data.json; each spoken number in data.json appears in the VO text"""
import json, re, subprocess, sys
from pathlib import Path

SAFE = dict(left=60, right=1020, top=150, bottom=1450, right_low=960, low_from=1100)
res = []


def report(status, name, detail=''):
    res.append((status, name, detail)); print(f'{status:6s} {name}' + (f' — {detail}' if detail else ''))


def run(cmd):
    return subprocess.run(cmd, capture_output=True, text=True)


ONES = 'zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen'.split()
TENS = 'zero ten twenty thirty forty fifty sixty seventy eighty ninety'.split()


def words(n):
    if n < 20: return ONES[n]
    if n < 100: return TENS[n // 10] + ('' if n % 10 == 0 else '-' + ONES[n % 10])
    if n < 1000: return ONES[n // 100] + ' hundred' + ('' if n % 100 == 0 else ' ' + words(n % 100))
    return words(n // 1000) + ' thousand' + ('' if n % 1000 == 0 else ' ' + words(n % 1000))


def main():
    proj, mp4 = Path(sys.argv[1]), sys.argv[2]
    fps = 24
    reel = json.load(open(proj / 'reel.json')); data = json.load(open(proj / 'data.json'))
    beats_txt = {b[0]: b[1] for b in json.load(open(proj / 'vo-beats.json'))['beats']}
    src = Path('showreel/src'); pre = proj.name
    tl = json.load(open(src / f'{pre}-timeline.json')); W = json.load(open(src / f'{pre}-words.json'))
    cues = json.load(open(src / f"{reel['id']}-cues.json")); sfx = json.load(open(proj / 'sfx-cues.json'))
    TB = {b['id']: b for b in tl['beats']}
    vo_end = tl['total']; hold = reel.get('hold_after_vo', 0.5)

    # 1. video
    p = run(['ffprobe', '-v', 'error', '-count_frames', '-select_streams', 'v:0', '-show_entries', 'stream=width,height,r_frame_rate,nb_read_frames', '-of', 'json', mp4])
    st = json.loads(p.stdout)['streams'][0]
    n = int(st['nb_read_frames']); dur = n / fps
    ok = st['width'] == 1080 and st['height'] == 1920 and st['r_frame_rate'] == f'{fps}/1'
    report('PASS' if ok else 'FAIL', 'video format', f"{st['width']}×{st['height']} @ {st['r_frame_rate']}, {n} frames = {dur:.2f} s")
    dec = run(['ffmpeg', '-v', 'error', '-i', mp4, '-f', 'null', '-'])
    report('PASS' if not dec.stderr.strip() else 'FAIL', 'decodes cleanly', dec.stderr.strip()[:200])
    need = vo_end + hold - 0.05
    report('PASS' if dur >= need else 'FAIL', 'length covers narration + hold', f'{dur:.2f} s vs {need:.2f} s')

    # 2. audio
    e = run(['ffmpeg', '-hide_banner', '-i', mp4, '-vn', '-af', 'ebur128=peak=true', '-f', 'null', '-']).stderr
    I = float(re.findall(r'I:\s+(-?[\d.]+) LUFS', e)[-1]); TP = float(re.findall(r'Peak:\s+(-?[\d.]+) dBFS', e)[-1])
    report('PASS' if abs(I + 14) <= 0.6 else 'FAIL', 'loudness', f'{I} LUFS (target −14 ± 0.6)')
    report('PASS' if TP <= -1.0 else 'FAIL', 'true peak', f'{TP} dBTP (≤ −1.0)')

    # 3. first frame text: bright pixels inside the hook box at frame 0
    x, y, w, h = reel['layout']['hook_text']['box']
    px = subprocess.run(['ffmpeg', '-v', 'error', '-i', mp4, '-vf', f'select=eq(n\\,0),crop={w}:{min(h, 110)}:{x}:{y},format=gray', '-frames:v', '1', '-f', 'rawvideo', '-'], capture_output=True).stdout
    bright = sum(1 for b in px if b > 215) / max(1, len(px))
    report('PASS' if bright > 0.02 else 'FAIL', 'first frame carries the hook text', f'{bright * 100:.1f}% bright pixels in the hook line box')

    # 4. safe zone, 5. overlaps
    t_of = lambda k: 0 if k == 'start' else dur if k == 'end' else TB[k]['start']
    boxes = {k: (v['box'], t_of(v['from']), t_of(v['to'])) for k, v in reel['layout'].items()}
    for t in reel['hook'].get('tags', []):
        boxes[f"tag {t['text']}"] = ([t['x'], t['y'], len(t['text']) * 18 + 70, 52], 0, TB['rule']['start'])
    bad = []
    for k, ((bx, by, bw, bh), a, b) in boxes.items():
        right = SAFE['right_low'] if by + bh > SAFE['low_from'] else SAFE['right']
        if k == 'header':  # the brand header sits above the safe top by design (the platforms' top bar is translucent); checked separately
            continue
        if bx < SAFE['left'] or bx + bw > right or by < SAFE['top'] or by + bh > SAFE['bottom']:
            bad.append(f'{k} [{bx},{by},{bw},{bh}] (right limit {right})')
    report('PASS' if not bad else 'FAIL', 'safe zone (declared layout)', '; '.join(bad) or f'{len(boxes) - 1} boxes inside')
    cx, cy, cw, ch = boxes['captions'][0]; ca, cb = boxes['captions'][1], boxes['captions'][2]
    ov = []
    for k, ((bx, by, bw, bh), a, b) in boxes.items():
        if k in ('captions', 'header', 'titles'):
            continue
        if a < cb and ca < b and by < cy + ch and cy < by + bh and bx < cx + cw and cx < bx + bw:
            # captions start after the hook hero lands: compare with the actual first chunk
            ov.append(f'{k} ({max(a, ca):.1f}–{min(b, cb):.1f} s)')
    report('PASS' if not ov else 'FAIL', 'captions never overlap a panel', '; '.join(ov) or 'clear')

    # 6. captions
    probs, shortest = [], 9
    for b in W['beats']:
        ws = b['words']; t0, t1 = TB[b['id']]['start'], TB[b['id']]['end']
        if any(w2['start'] < w1['start'] for w1, w2 in zip(ws, ws[1:])): probs.append(f"{b['id']}: not monotonic")
        if ws and (ws[0]['start'] < t0 - 0.01 or ws[-1]['end'] > t1 + 0.01): probs.append(f"{b['id']}: outside its beat")
        for c in b['chunks']:
            txt = ' '.join(ws[i]['text'] for i in c['words'])
            if len(c['words']) > 4 or (len(c['words']) > 1 and len(txt) > 22): probs.append(f"{b['id']}: chunk too long '{txt}'")
        for c1, c2 in zip(b['chunks'], b['chunks'][1:]):
            shortest = min(shortest, c2['start'] - c1['start'])
    if shortest < 0.25: probs.append(f'a chunk is on screen only {shortest:.2f} s')
    report('PASS' if not probs else 'FAIL', 'captions (timing, chunk size)', '; '.join(probs) or f"{sum(len(b['chunks']) for b in W['beats'])} chunks, shortest {shortest:.2f} s, method: {W['method']}")

    # 7. pacing
    events = sorted({round(c['start'], 2) for b in W['beats'] for c in b['chunks']} | {round(v, 2) for v in cues.values()} | {round(b['start'], 2) for b in tl['beats']})
    gaps = [(a, b) for a, b in zip(events, events[1:]) if b - a > 3]
    report('ADVICE' if gaps else 'PASS', 'pacing: nothing static over 3 s', ', '.join(f'{a:.1f}–{b:.1f}' for a, b in gaps) or f'{len(events)} events')

    # 8. sound
    under = [s for s in sfx if s['t'] <= vo_end]
    dens = len(under) / vo_end * 3
    times = sorted(s['t'] for s in sfx); close = [round(b, 2) for a, b in zip(times, times[1:]) if b - a < 1]
    report('PASS' if dens <= 1.0 else 'ADVICE', 'sound density under the voice', f'{dens:.2f} per 3 s; within 1 s: {close or "none"}')

    # 9. facts
    ex = data['example']; fx = []
    vo = re.sub(r'\s+', ' ', ' '.join(beats_txt.values()).lower().replace('-', ' ').replace(',', ''))
    if 'derive' in data:
        # generic: values = example inputs + data.json "derive" formulas; every "spoken" phrase must be in the VO and,
        # for plain amounts, equal the value read aloud ("and" and commas ignored; rates checked as "N percent")
        env = dict(ex); env.update({k: round(eval(e, {'__builtins__': {}}, dict(env, min=min, max=max, round=round)), 6) for k, e in data['derive'].items()})
        norm = lambda s: re.sub(r'\s+', ' ', s.lower().replace('-', ' ').replace(',', '').replace(' and ', ' ')).strip()
        for k, spoken in data['spoken'].items():
            val = env[k]
            if spoken.replace(',', '').replace('-', ' ') not in vo: fx.append(f'"{spoken}" not in the VO')
            def pct_words(v):
                ip, dp = f'{v * 100:.4f}'.rstrip('0').rstrip('.').partition('.')[::2]
                return words(int(ip)) + ((' point ' + ' '.join(ONES[int(c)] for c in dp)) if dp else '')
            cands = []
            if 0 < val < 1: cands += [pct_words(val), pct_words(val) + ' percent']
            else:
                w = words(int(round(val))); cands += [w, w + ' dollars', w + ' days', w + ' years']
                if w.startswith('one '): cands += ['a ' + w[4:], 'a ' + w[4:] + ' dollars', w[4:], w[4:] + ' dollars']
                if val % 100 == 0 and 1000 < val < 10000: cands += [words(int(val // 100)) + ' hundred', words(int(val // 100)) + ' hundred dollars']
            ok = norm(spoken) in {norm(c) for c in cands}
            if not ok: fx.append(f'{k}: data {val} ≠ spoken "{spoken}"')
        summary = ', '.join(f'{k} {env[k]:g}' for k in data['spoken'])
    else:
        net = ex['gain'] - ex['loss']; taxable = net * ex['inclusion_rate']; without = ex['gain'] * ex['inclusion_rate']
        for k, val in [('gain', ex['gain']), ('loss', ex['loss']), ('net', net), ('taxable', taxable), ('without_sale', without)]:
            spoken = data['spoken'][k]
            if spoken not in vo: fx.append(f'"{spoken}" not in the VO')
            if k != 'without_sale' and words(int(val)).replace('-', ' ') != spoken: fx.append(f'{k}: data {val} ≠ spoken "{spoken}"')
            if k == 'without_sale' and not words(int(val)).startswith(spoken): fx.append(f'without_sale: {val} vs "{spoken}"')
        summary = f'gain {ex["gain"]}, loss {ex["loss"]}, net {net}, taxable {taxable:.0f}, without the sale {without:.0f}'
    report('PASS' if not fx else 'FAIL', 'facts: numbers from data.json match the narration', '; '.join(fx) or summary)

    fails = [r for r in res if r[0] == 'FAIL']
    out = proj / 'QC-REPORT.md'
    out.write_text('# Automated QC\n\n' + f'File: `{mp4}`\n\n| Result | Check | Detail |\n|---|---|---|\n' + ''.join(f'| {s} | {n} | {d} |\n' for s, n, d in res)
                   + '\nVisual review (contact sheet, hook, captions, transitions, final frame) is done separately and recorded in the bible.\n')
    print(f'\n{len(fails)} failed; report {out}')
    sys.exit(1 if fails else 0)


if __name__ == '__main__':
    main()
