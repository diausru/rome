"""Tighten the Grady (ElevenLabs via Higgsfield) lines (B2):
long inner pauses (>0.45 s) are shortened to 0.38 s, edges trimmed, tempo unchanged (B2 fits the 45 s–1:10 tolerance).
Output: grady/proc/lineXX.wav (48 kHz mono) + grady/proc/segments.json (speech segments after processing)."""
import json, os, re, subprocess
import numpy as np
HERE = os.path.dirname(os.path.abspath(__file__))
SRC, OUT = os.path.join(HERE, "grady"), os.path.join(HERE, "grady", "proc")
os.makedirs(OUT, exist_ok=True)
SR = 48000

def read(p):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", p, "-f", "s16le", "-ac", "1", "-ar", str(SR), "-"], capture_output=True).stdout
    return np.frombuffer(raw, np.int16).astype(np.float32)

def silences(x, thr_db=-40, min_d=0.08):
    win = int(0.01 * SR)
    n = len(x) // win
    rms = np.sqrt((x[:n * win].reshape(n, win) ** 2).mean(1) + 1e-9) / 32768
    quiet = 20 * np.log10(rms + 1e-9) < thr_db
    segs, i = [], 0
    while i < n:
        if quiet[i]:
            j = i
            while j < n and quiet[j]:
                j += 1
            if (j - i) * 0.01 >= min_d:
                segs.append((i * win, j * win))
            i = j
        else:
            i += 1
    return segs

def write(p, x):
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-f", "s16le", "-ar", str(SR), "-ac", "1", "-i", "-", p],
                   input=np.clip(x, -32768, 32767).astype(np.int16).tobytes(), check=True)

meta = {}
for k in range(10):
    name = f"line{k:02d}"
    x = read(os.path.join(SRC, name + ".mp3"))
    segs = silences(x)
    keep, pos = [], 0
    for a, b in segs:
        if a == 0:                       # leading silence → drop
            pos = b; continue
        if b >= len(x) - int(0.02 * SR):  # trailing silence → drop
            keep.append(x[pos:a]); pos = len(x); break
        keep.append(x[pos:a])
        d = b - a
        keep.append(x[a:a + min(d, int(0.38 * SR))] if d > int(0.45 * SR) else x[a:b])
        pos = b
    if pos < len(x):
        keep.append(x[pos:])
    y = np.concatenate(keep)
    tmp = os.path.join(OUT, name + "_tmp.wav")
    write(tmp, y)
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", tmp, "-af", "atempo=1.0", "-ar", str(SR), "-ac", "1",
                    os.path.join(OUT, name + ".wav")], check=True)
    os.remove(tmp)
    z = read(os.path.join(OUT, name + ".wav"))
    sp, last = [], 0
    for a, b in silences(z) + [(len(z), len(z))]:
        if a > last:
            sp.append((round(last / SR, 3), round(a / SR, 3)))
        last = b
    meta[name] = dict(dur=round(len(z) / SR, 3), speech=sp)
    print(name, meta[name]["dur"], sp)
json.dump(meta, open(os.path.join(OUT, "segments.json"), "w"), indent=1)
print("total", round(sum(m["dur"] for m in meta.values()), 2))
