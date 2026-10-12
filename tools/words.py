#!/usr/bin/env python3
"""Word-level caption timing from the actual voiceover audio (motion engine v3, 2026-10-12).
Port of the offline aligner in marketing-skill scripts/video/captions.js (studied, not copied verbatim):
a 10 ms dB envelope → speech runs split at pauses ≥ 0.15 s → words distributed over runs by dynamic programming on a
letter-count weight (digits ×3, +0.7 per word, bonus for cutting after punctuation) → words spaced inside each run by
weight. Then words are grouped into caption chunks (≤ 4 words, ≤ 22 characters, ≤ 1.8 s; break at punctuation or a
gap ≥ 0.25 s; no orphan word). No speech-recognition model is used, so timing is an estimate from pauses
(the reference reports ≈50 ms mean error with the same method).

usage: tools/words.py <lines.json> <proc_dir with lineNN.wav> <vo_place.json> <out_words.json> [--srt out.srt]
  lines.json   : ["spoken line 0", "spoken line 1", ...]
  vo_place.json: [[name, place_s, text, speech_start_s, speech_end_s], ...]   (as written by b*/vo pipeline)
Output: {"words": [{"w", "t0", "t1", "line"}], "chunks": [{"text", "t0", "t1", "words": [i...]}]} (absolute seconds).
"""
import json, re, subprocess, sys, pathlib
import numpy as np

SR, HOP = 16000, 0.01


def envelope(wav):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', str(wav), '-f', 's16le', '-ac', '1', '-ar', str(SR), '-'],
                         capture_output=True, check=True).stdout
    x = np.frombuffer(raw, np.int16).astype(np.float32) / 32768
    n = int(len(x) / (SR * HOP))
    fr = x[:n * int(SR * HOP)].reshape(n, -1)
    return 20 * np.log10(np.sqrt((fr ** 2).mean(1)) + 1e-9)


def runs(db, min_pause=0.15):
    thr = max(np.percentile(db, 10) + 6, np.percentile(db, 95) - 32)
    on = db > thr
    out, i, n, gap = [], 0, len(on), int(min_pause / HOP)
    while i < n:
        if not on[i]:
            i += 1; continue
        j = i
        while j < n:
            if on[j]:
                j += 1; continue
            k = j
            while k < n and not on[k]: k += 1
            if k - j >= gap or k == n: break
            j = k
        out.append([i * HOP, j * HOP]); i = j
    return out or [[0.0, len(db) * HOP]]


def weight(w):
    letters = sum(3 if c.isdigit() else 1 for c in w if c.isalnum())
    return letters + 0.7


def distribute(words, rs):
    """DP: assign consecutive word groups to runs so each run's share of weight matches its share of time."""
    W = [weight(w) for w in words]; nw, nr = len(words), len(rs)
    if nr == 1 or nw <= nr:
        nr = min(nr, nw); rs = rs[:nr] if nw < len(rs) else rs
    tot_w, durs = sum(W), [r[1] - r[0] for r in rs]; tot_d = sum(durs)
    cum = np.concatenate([[0], np.cumsum(W)])
    INF = 1e18
    cost = np.full((nr + 1, nw + 1), INF); back = np.zeros((nr + 1, nw + 1), int); cost[0, 0] = 0
    for r in range(1, nr + 1):
        for j in range(r, nw - (nr - r) + 1):
            for i in range(r - 1, j):
                share_w = (cum[j] - cum[i]) / tot_w; share_d = durs[r - 1] / tot_d
                c = cost[r - 1, i] + (share_w - share_d) ** 2 * 100
                if r < nr and not re.search(r'[.,?!:;]$', words[j - 1]): c += 0.6   # prefer cuts after punctuation
                if c < cost[r, j]: cost[r, j], back[r, j] = c, i
    cuts, j = [], nw
    for r in range(nr, 0, -1):
        i = back[r, j]; cuts.append((i, j)); j = i
    cuts.reverse()
    out = []
    for (i, j), (a, b) in zip(cuts, rs):
        ws = W[i:j]; s = sum(ws); t = a
        for k in range(i, j):
            d = (b - a) * W[k] / s; out.append((words[k], t, t + d)); t += d
    return out


def chunk(words):
    chunks, cur = [], []
    def flush():
        if cur: chunks.append(list(cur)); cur.clear()
    for i, w in enumerate(words):
        if cur:
            text = ' '.join(words[k]['w'] for k in cur + [i])
            gap = w['t0'] - words[cur[-1]]['t1']
            if len(cur) >= 4 or len(text) > 22 or w['t1'] - words[cur[0]]['t0'] > 1.8 or gap >= 0.25 \
                    or re.search(r'[.?!:;]$', words[cur[-1]]['w']) or words[cur[-1]]['line'] != w['line']:
                flush()
        cur.append(i)
    flush()
    # no orphan word: merge a lone word into its neighbour when the line allows it
    fixed = []
    for c in chunks:
        if len(c) == 1 and fixed and words[fixed[-1][-1]]['line'] == words[c[0]]['line'] and len(fixed[-1]) < 4 \
                and not re.search(r'[.?!:;]$', words[fixed[-1][-1]]['w']):
            fixed[-1] += c
        else:
            fixed.append(c)
    return [dict(text=' '.join(words[k]['w'] for k in c), t0=words[c[0]]['t0'], t1=words[c[-1]]['t1'], words=c) for c in fixed]


def srt(chunks):
    f = lambda t: f"{int(t // 3600):02d}:{int(t % 3600 // 60):02d}:{int(t % 60):02d},{int(round(t % 1 * 1000)):03d}"
    return '\n'.join(f"{i + 1}\n{f(c['t0'])} --> {f(c['t1'])}\n{c['text']}\n" for i, c in enumerate(chunks))


def main():
    lines = json.load(open(sys.argv[1])); proc = pathlib.Path(sys.argv[2]); place = json.load(open(sys.argv[3]))
    allw = []
    for li, (text, (name, p, _t, s, e)) in enumerate(zip(lines, place)):
        db = envelope(proc / f'{name}.wav')
        rs = [r for r in runs(db) if r[1] > s - 0.05 and r[0] < e + 0.05]
        for w, a, b in distribute(text.split(), rs):
            allw.append(dict(w=w, t0=round(p + a, 3), t1=round(p + b, 3), line=li))
    out = dict(words=allw, chunks=chunk(allw))
    json.dump(out, open(sys.argv[4], 'w'), indent=1)
    if '--srt' in sys.argv:
        open(sys.argv[sys.argv.index('--srt') + 1], 'w').write(srt(out['chunks']))
    print(f"{len(allw)} words, {len(out['chunks'])} chunks")
    for c in out['chunks'][:6]: print(f"  [{c['t0']:6.2f}–{c['t1']:6.2f}] {c['text']}")


if __name__ == '__main__':
    main()
