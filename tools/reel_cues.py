#!/usr/bin/env python3
"""Resolve a reel's cue anchors to times, from the measured word timings, for BOTH the visuals and the sound.
usage: tools/reel_cues.py <reel.json> <words.json> <timeline.json> <out cues.json> <out sfx-cues.json>

reel.json "cues": [{"id": "gain", "beat": "example", "word": "Twelve", "n": 1, "offset": 0.0, "sfx": "tick"}, ...]
  - "word": the nth (default 1st) word in that beat whose normalized text matches → its measured start time;
  - "at": a fraction of the beat instead of a word (0 = the beat's start);
  - "end": true → the end of the narration (last beat's end) + offset.
One anchor drives the on-screen event (the composition reads <out cues.json>) and its sound (tools/sfx.py reads
<out sfx-cues.json>), so a highlight and its sound can't drift apart. Fails loudly on an anchor that doesn't match."""
import json, re, sys, unicodedata

norm = lambda w: re.sub(r'[^a-z0-9]', '', unicodedata.normalize('NFKD', w.lower()))


def main():
    reel, words, tl = (json.load(open(p)) for p in sys.argv[1:4])
    out_cues, out_sfx = sys.argv[4], sys.argv[5]
    W = {b['id']: b for b in words['beats']}
    T = {b['id']: b for b in tl['beats']}
    times, sfx, problems = {}, [], []
    for c in reel['cues']:
        if c.get('end'):
            t = tl['beats'][-1]['end']
        elif 'word' in c:
            ws = [w for w in W[c['beat']]['words'] if norm(w['text']) == norm(c['word'])]
            n = c.get('n', 1)
            if len(ws) < n:
                problems.append(f"{c['id']}: word '{c['word']}' (#{n}) not in beat {c['beat']}"); continue
            t = ws[n - 1]['start']
        else:
            b = T[c['beat']]; t = b['start'] + (b['end'] - b['start']) * c.get('at', 0)
        t = round(t + c.get('offset', 0), 3)
        times[c['id']] = t
        for s in ([c['sfx']] if isinstance(c.get('sfx'), str) else c.get('sfx', [])):
            sfx.append({'t': t, 'sound': s, 'gain': c.get('gain', 1.0), **({'dur': c['dur']} if 'dur' in c else {})})
    if problems:
        raise SystemExit('\n'.join(problems))
    json.dump(times, open(out_cues, 'w'), indent=1)
    json.dump(sfx, open(out_sfx, 'w'), indent=1)
    gaps = sorted(s['t'] for s in sfx)
    dense = [round(b, 2) for a, b in zip(gaps, gaps[1:]) if b - a < 1.0]
    print(f'{len(times)} cues, {len(sfx)} sounds ({len(sfx) / (tl["total"] or 1) * 3:.2f} per 3 s); sounds closer than 1 s: {dense or "none"}')


if __name__ == '__main__':
    main()
