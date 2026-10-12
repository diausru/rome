#!/usr/bin/env python3
"""Tax Secrets Canada sonic identity: synthesized sound effects placed on a reel's cues, plus the sonic logo.
usage: tools/sfx.py <cues.json> <duration s> <out.wav>
cues.json: [{"t": 3.42, "sound": "swish", "gain": 1.0}, ...]

The syntheses are ports of marketing-skill's scripts/video/soundtrack.js (MIT, github.com/marcosmodly/marketing-skill):
swish, whoosh, marimba tick, bell chime, pluck pop, low impact, riser. Original synthesis, nothing to license.
Our identity on top: everything tonal is in D major (fixed for the whole channel, whatever the music bed's key), ticks
climb the D major pentatonic across a run, and every reel ends on the same sonic logo (A4 → D5 → F#5, then D5 + A5
bells over a soft low impact). Overt sounds only; no subliminal content."""
import json, sys, wave
import numpy as np

SR = 48000
TAU = 2 * np.pi
rng = np.random.default_rng(11)
mtof = lambda m: 440 * 2 ** ((m - 69) / 12)
D_PENT = [62, 64, 66, 69, 71, 74, 76, 78, 81, 83]  # D major pentatonic, two octaves from D4
LOGO = [69, 74, 78]  # A4, D5, F#5


def svf(x, cutoff, q=0.707, kind='bp'):
    """State-variable filter (Chamberlin, as in the reference); cutoff may be an array."""
    out = np.zeros_like(x); lp = bp = 0.0
    cut = np.broadcast_to(np.asarray(cutoff, dtype=float), x.shape)
    k = 1 / q
    for i in range(len(x)):
        g = np.tan(np.pi * min(cut[i], SR * 0.45) / SR)
        hp = (x[i] - (k + g) * bp - lp) / (1 + k * g + g * g)
        b2 = g * hp + bp; l2 = g * b2 + lp
        bp, lp = g * hp + b2, g * b2 + l2
        out[i] = {'bp': b2, 'lp': l2, 'hp': hp}[kind]
    return out


def n_(d):
    return int(d * SR)


def swish(dur=0.22, bright=1.0):
    n = n_(dur); x = svf(rng.standard_normal(n), 4000 if bright > 1 else 2500, 0.6, 'hp' if bright > 1 else 'bp')
    return x * np.sin(np.pi * np.arange(n) / n) ** 2 * 0.45


def whoosh(dur=0.5):
    n = n_(dur); p = np.arange(n) / n
    return svf(rng.standard_normal(n), 300 + 5000 * p, 1.2) * np.sin(np.pi * p) ** 3 * 0.7


def marimba(f, dur=0.4):
    t = np.arange(n_(dur)) / SR; w = TAU * f
    return np.sin(w * t) * np.exp(-t / 0.13) + 0.25 * np.sin(3.93 * w * t) * np.exp(-t / 0.03)


def bell(f, dur=1.4):
    t = np.arange(n_(dur)) / SR
    return sum(a * np.sin(TAU * f * r * t) * np.exp(-t / d) for r, a, d in [(1, 1.0, 0.6), (2.0, 0.5, 0.35), (2.76, 0.3, 0.2), (5.4, 0.15, 0.08)])


def pluck(f, dur=0.35):
    t = np.arange(n_(dur)) / SR; w = TAU * f
    return np.sin(w * t) * np.exp(-t / 0.12) + 0.35 * np.sin(2 * w * t) * np.exp(-t / 0.05) + rng.standard_normal(len(t)) * np.exp(-t / 0.003) * 0.15


def impact(dur=2.2):
    t = np.arange(n_(dur)) / SR
    ph = np.cumsum(TAU * (34 + 70 * np.exp(-t / 0.12)) / SR)
    air = svf(rng.standard_normal(len(t)), 900, 0.7, 'lp')
    return np.tanh(2 * np.sin(ph)) * np.exp(-t / 0.7) + air * np.exp(-t / 0.3) * 0.5


def riser(dur=1.0):
    n = n_(dur); p = np.arange(n) / n
    ph = np.cumsum(TAU * (220 + 900 * p * p) / SR)
    return (svf(rng.standard_normal(n), 400 + 7000 * p * p, 1.5) * 0.5 + np.sin(ph) * 0.12) * p ** 2.2


class Bus:
    def __init__(self, dur):
        self.L = np.zeros(n_(dur) + SR * 3); self.R = np.zeros_like(self.L)

    def add(self, sig, t, gain=1.0, pan=0.0):
        i = max(0, int(t * SR)); j = min(len(self.L), i + len(sig)); s = sig[:j - i] * gain
        self.L[i:j] += s * (1 - max(0, pan)); self.R[i:j] += s * (1 + min(0, pan))


def build(cues, dur):
    bus = Bus(dur)
    tick_i, last_tick, sw = 0, -9, 0
    for c in sorted(cues, key=lambda c: c['t']):
        t, s, g = c['t'], c['sound'], c.get('gain', 1.0)
        if s == 'tick':
            tick_i = tick_i + 1 if t - last_tick < 1.5 else 0; last_tick = t
            bus.add(marimba(mtof(D_PENT[tick_i % len(D_PENT)] + 12)), t, 0.45 * g)
        elif s == 'pop':
            bus.add(pluck(mtof(D_PENT[(tick_i + 3) % len(D_PENT)] + 12)), t + 0.04, 0.4 * g); bus.add(swish(0.12, 2), t, 0.3 * g)
        elif s == 'swish':
            bus.add(swish(), t, 0.55 * g, 0.4 if sw % 2 else -0.4); sw += 1
        elif s == 'whoosh':
            bus.add(whoosh(), t - 0.1, 0.8 * g)
        elif s == 'chime':
            bus.add(bell(mtof(78)), t, 0.3 * g); bus.add(bell(mtof(81)), t + 0.09, 0.34 * g)
        elif s == 'impact':
            bus.add(impact(), t, 0.5 * g)
        elif s == 'riser':
            d = c.get('dur', 1.0); bus.add(riser(d), t - d, 0.6 * g)
        elif s == 'logo':  # the sonic logo: three notes, then home with two bells and a soft low impact
            step = 0.16
            for k, m in enumerate(LOGO):
                bus.add(marimba(mtof(m), 0.5), t + k * step, 0.5 * g)
            home = t + 3 * step
            bus.add(bell(mtof(74), 1.4), home, 0.42 * g); bus.add(bell(mtof(81), 1.4), home + 0.02, 0.3 * g)
            bus.add(impact(1.6), home, 0.28 * g)
        else:
            raise SystemExit(f'unknown sound {s}')
    n = n_(dur)
    L, R = bus.L[:n], bus.R[:n]
    peak = max(np.abs(L).max(), np.abs(R).max(), 1e-9)
    st = (np.stack([L, R], 1) / peak * 0.89 * 32767).astype(np.int16)
    return st


def main():
    cues, dur, out = json.load(open(sys.argv[1])), float(sys.argv[2]), sys.argv[3]
    st = build(cues, dur)
    with wave.open(out, 'wb') as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(st.tobytes())
    print('ok', out, len(cues), 'cues')


if __name__ == '__main__':
    main()
