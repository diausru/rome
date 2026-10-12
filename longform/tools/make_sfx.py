"""Synthesize the SFX library in code (no samples): whoosh, click, paper, tick, thump, chime."""
import numpy as np, wave, os
SR = 48000; rng = np.random.default_rng(7); out = os.path.join(os.path.dirname(__file__), 'sfx')
def save(n, x):
    x = x / (np.abs(x).max() + 1e-9) * 0.9; w = wave.open(os.path.join(out, n + '.wav'), 'wb')
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((x * 32767).astype(np.int16).tobytes()); w.close()
def env(n, a, r): t = np.arange(n) / SR; return np.minimum(1, t / a) * np.exp(-t / r)
def lp(x, k):  # one-pole low-pass, k in (0,1)
    y = np.zeros_like(x); acc = 0.0
    for i, v in enumerate(x): acc += k * (v - acc); y[i] = acc
    return y
n = int(SR * 0.9); t = np.arange(n) / SR; noise = rng.standard_normal(n)
k = 0.02 + 0.25 * np.sin(np.pi * t / t[-1]) ** 2               # sweeping filter = whoosh
y = np.zeros(n); acc = 0.0
for i in range(n): acc += k[i] * (noise[i] - acc); y[i] = acc
save('whoosh', y * np.sin(np.pi * t / t[-1]) ** 1.5)
n = int(SR * 0.06); c = rng.standard_normal(n) * env(n, 0.0005, 0.006); save('click', np.diff(c, prepend=0))
n = int(SR * 0.5); p = rng.standard_normal(n); p = p - lp(p, 0.08); save('paper', p * env(n, 0.02, 0.12) * (0.6 + 0.4 * np.sin(np.arange(n) / SR * 60)))
n = int(SR * 0.25); tt = np.arange(n) / SR; save('thump', np.sin(2 * np.pi * (70 - 30 * tt) * tt) * env(n, 0.003, 0.08))
n = int(SR * 1.4); tt = np.arange(n) / SR; save('chime', (np.sin(2*np.pi*880*tt) + 0.5*np.sin(2*np.pi*1320*tt) + 0.25*np.sin(2*np.pi*1760*tt)) * env(n, 0.004, 0.35))
n = int(SR * 0.03); save('tick', np.sin(2 * np.pi * 2200 * np.arange(n) / SR) * env(n, 0.0005, 0.005))
print(sorted(os.listdir(out)))
