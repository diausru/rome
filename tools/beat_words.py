#!/usr/bin/env python3
"""Word-level timing for each voiceover beat, measured from the actual audio.
usage: tools/beat_words.py <beats.json> <vo dir> <timeline.json> <out words.json>

Port of the alignment in marketing-skill's scripts/video/captions.js (MIT, github.com/marcosmodly/marketing-skill),
adapted to our pipeline (one trimmed Grady clip per beat, seg-<id>.wav, placed at the beat's start by tools/vo_hf.py):
- loudness every 10 ms; quiet stretches of 0.15 s or more split the clip into spoken runs;
- the beat's words are shared across those runs by dynamic programming so each run's words take about as long to say
  as the run lasts (letters per word, digits counted as longer words), preferring cuts after punctuation;
- inside a run, time is shared by word weight.
The reference reports word starts about 50 ms from the truth on average on synthesized speech; that figure is theirs,
not re-measured here. Chunks for on-screen captions: at most 4 words / 22 characters / 1.8 s, a new chunk at
punctuation or a pause. Output times are in video seconds (beat start + time inside the clip)."""
import json, re, subprocess, sys, unicodedata
import numpy as np

SR, HOP = 16000, 160
FRAME = HOP / SR
MIN_PAUSE, MIN_RUN = 0.15, 0.04


def decode(path):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-'], capture_output=True, check=True).stdout
    return np.frombuffer(raw, dtype=np.float32)


def envelope(x):
    n = len(x) // HOP
    fr = x[:n * HOP].reshape(n, HOP).astype(np.float64)
    return np.maximum(-100, 10 * np.log10((fr ** 2).mean(axis=1) + 1e-12))


def spoken_runs(db):
    if not len(db):
        return []
    floor, peak = np.percentile(db, 10), np.percentile(db, 95)
    thr = max(floor + 6, peak - 32)
    runs, start = [], -1
    for f in range(len(db) + 1):
        v = f < len(db) and db[f] > thr
        if v and start < 0:
            start = f
        if not v and start >= 0:
            runs.append([start * FRAME, f * FRAME]); start = -1
    merged = []
    for r in runs:
        if merged and r[0] - merged[-1][1] < MIN_PAUSE:
            merged[-1][1] = r[1]
        else:
            merged.append(r)
    return [r for r in merged if r[1] - r[0] >= MIN_RUN]


def norm(w):
    return re.sub(r'[^a-z0-9]', '', unicodedata.normalize('NFKD', w.lower()))


def weight(w):
    s = norm(w); d = sum(c.isdigit() for c in s)
    return len(s) - d + d * 3 + 0.7


ends_phrase = lambda w: bool(re.search(r'[.,!?;:…—–)"”\']$', w))


def assign(words, runs):
    N, K = len(words), len(runs)
    if K == 1 or N == 0:
        return [list(range(N))]
    ws = np.concatenate([[0], np.cumsum([w['weight'] for w in words])])
    total = sum(r[1] - r[0] for r in runs)
    pace = ws[N] / total

    def fit(j, a, b):
        d = runs[j][1] - runs[j][0]
        if b == a:
            return 0.3 if d < 0.25 else 3
        return np.log((ws[b] - ws[a]) / (pace * d)) ** 2

    cut = lambda b: 0.5 if 0 < b < N and ends_phrase(words[b - 1]['text']) else 0
    INF = float('inf')
    best = [[INF] * (N + 1) for _ in range(K)]; frm = [[0] * (N + 1) for _ in range(K)]
    for b in range(N + 1):
        best[0][b] = fit(0, 0, b) - cut(b)
    for j in range(1, K):
        for b in range(N + 1):
            if j == K - 1 and b != N:
                continue
            for a in range(b + 1):
                c = best[j - 1][a] + fit(j, a, b) - (cut(b) if j < K - 1 else 0)
                if c < best[j][b]:
                    best[j][b], frm[j][b] = c, a
    cuts = [N]
    for j in range(K - 1, 0, -1):
        cuts.insert(0, frm[j][cuts[0]])
    groups, s = [], 0
    for c in cuts:
        groups.append(list(range(s, c))); s = c
    return groups


def align(text, clip):
    words = [{'text': t, 'weight': weight(t)} for t in text.split()]
    x = decode(clip)
    dur = len(x) / SR
    runs = spoken_runs(envelope(x)) or [[0, dur]]
    for idx, run in zip(assign(words, runs), runs):
        wsum = sum(words[i]['weight'] for i in idx) or 1
        t = run[0]
        for i in idx:
            words[i]['start'] = t
            t += (run[1] - run[0]) * words[i]['weight'] / wsum
            words[i]['end'] = t
    return words, dur, len(runs)


def chunk(words, max_words=4, max_chars=22, pause=0.25, max_dur=1.8):
    phrases, cur = [], []
    for i, w in enumerate(words):
        cur.append(w)
        nxt = words[i + 1] if i + 1 < len(words) else None
        if not nxt or ends_phrase(w['text']) or nxt['start'] - w['end'] >= pause:
            phrases.append(cur); cur = []
    fits = lambda p: len(p) <= max_words and len(' '.join(x['text'] for x in p)) <= max_chars and p[-1]['end'] - p[0]['start'] <= max_dur
    out = []
    for ph in phrases:
        for k in range(-(-len(ph) // max_words), len(ph) + 1):
            parts = [ph[round(i * len(ph) / k):round((i + 1) * len(ph) / k)] for i in range(k)]
            if all(len(p) == 1 or fits(p) for p in parts):
                break
        out += [{'start': p[0]['start'], 'end': p[-1]['end'], 'words': [w['i'] for w in p]} for p in parts]
    return out


def main():
    beats_path, vo_dir, tl_path, out_path = sys.argv[1:5]
    beats = json.load(open(beats_path))['beats']
    tl = {b['id']: b for b in json.load(open(tl_path))['beats']}
    result = {'method': 'pauses + word length (port of marketing-skill captions.js)', 'beats': []}
    for bid, text, _ in beats:
        words, dur, nruns = align(text, f'{vo_dir}/seg-{bid}.wav')
        t0, t1 = tl[bid]['start'], tl[bid]['end']
        k = (t1 - t0) / dur if dur else 1  # the timeline's measured length of the placed clip (should be ≈1)
        flat = []
        for i, w in enumerate(words):
            flat.append({'i': i, 'text': w['text'], 'start': round(t0 + w['start'] * k, 3), 'end': round(t0 + w['end'] * k, 3)})
        result['beats'].append({'id': bid, 'start': t0, 'end': t1, 'runs': nruns, 'clip': round(dur, 3), 'words': flat, 'chunks': chunk(flat)})
        print(f'{bid:9s} {len(flat):3d} words  {nruns} runs  clip {dur:.2f}s vs timeline {t1 - t0:.2f}s')
    json.dump(result, open(out_path, 'w'), indent=1)
    print('written', out_path)


if __name__ == '__main__':
    main()
