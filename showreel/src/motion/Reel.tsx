// Tax Secrets Canada motion engine v1, card reels (file Reel.tsx; the parallel session's engine is Engine.tsx) (2026-10-12). Reusable, frame-driven building blocks for the card-format reels:
// progressive hook openings, kinetic ALL-CAPS headlines, floating topic tags, dark-glass panels with entrance / exit
// variants, narration-driven highlights, count-ups, word-synced captions, depth layers over photo plates, particle
// dissolves. Techniques studied from marketing-skill (MIT): hook text on screen from frame 0, captions chunked and
// highlighted word by word from measured word timings, one anchor driving a visual event and its sound. Look and
// layout stay ours (brand.ts). Everything is deterministic (no Math.random), so renders are repeatable.
import React from 'react';
import { AbsoluteFill } from 'remotion';
import { T, ZONE, goldFill, textShadow } from './brand';

export const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const sstep = (t: number) => { t = clamp(t); return t * t * t * (t * (t * 6 - 15) + 10); };
export const ease = (f: number, a: number, b: number) => sstep((f - a) / (b - a));
export const outExpo = (t: number) => (t <= 0 ? 0 : t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));
export const outBack = (t: number) => { t = clamp(t); const c = 1.4; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); };
export const rnd = (i: number, k = 0) => { const s = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453; return s - Math.floor(s); };
export const money = (n: number) => '$' + Math.round(Math.abs(n)).toLocaleString('en-US');

type Dir = 'up' | 'down' | 'left' | 'right';
const offset = (d: Dir, k: number) => ({ up: [0, k], down: [0, -k], left: [-k, 0], right: [k, 0] }[d]);

// ---------- kinetic typography ----------
// Words rise out of a mask one after another (stagger in frames); `out` lifts and blurs them away.
export const Kinetic = ({ f, at, text, x, y, size = 72, from = 'up', stagger = 2, gold = false, out, weight = 900, now = false, color = T.white, nowrap = false }: {
  f: number; at: number; text: string; x: number; y: number; size?: number; from?: Dir; stagger?: number; gold?: boolean; out?: number; weight?: number; now?: boolean; color?: string; nowrap?: boolean;
}) => {
  const words = text.toUpperCase().split(' ');
  const o = out !== undefined ? ease(f, out, out + 10) : 0;
  if (o >= 1) return null;
  return (
    <div style={{ position: 'absolute', left: x, top: y, display: 'flex', flexWrap: nowrap ? 'nowrap' : 'wrap', whiteSpace: 'nowrap', gap: `0 ${size * 0.28}px`, opacity: 1 - o, transform: `translateY(${-o * 30}px)`, filter: o > 0 ? `blur(${o * 8}px)` : undefined }}>
      {words.map((w, i) => {
        // "now": already on screen at the first frame (the cover), settling in, as the reference requires of a hook
        const p = now ? 0.65 + 0.35 * outExpo((f - at) / 12) : outExpo((f - at - i * stagger) / 12);
        // a "now" word never moves inside its mask (the first frame must show it whole); it only settles in blur and scale
        const [dx, dy] = now ? [0, 0] : from === 'up' ? [0, 105] : from === 'down' ? [0, -105] : from === 'left' ? [-60, 0] : [60, 0];
        return (
          <span key={i} style={{ display: 'inline-block', overflow: 'hidden', paddingBottom: size * 0.08, lineHeight: 1.05 }}>
            <span style={{ display: 'inline-block', fontFamily: T.font, fontSize: size, fontWeight: weight, letterSpacing: -size * 0.02, color, textShadow: gold ? undefined : textShadow,
              transform: `translate(${(1 - p) * dx}%, ${(1 - p) * dy}%)${now ? ` scale(${1.04 - 0.04 * p})` : ''}`, opacity: clamp(p * 1.4), filter: p < 1 ? `blur(${(1 - p) * 6}px)` : undefined, ...(gold ? goldFill : {}) }}>{w}</span>
          </span>
        );
      })}
    </div>
  );
};

// ---------- floating topic tag ----------
export const Tag = ({ f, at, text, x, y, from = 'left', out, seed = 1 }: { f: number; at: number; text: string; x: number; y: number; from?: Dir; out?: number; seed?: number }) => {
  const p = outExpo((f - at) / 16);
  if (p <= 0) return null;
  const o = out !== undefined ? clamp((f - out) / 14) : 0;
  if (o >= 1) return null;
  const [dx, dy] = offset(from, 160);
  const fx = Math.sin(f * 0.031 + seed * 2.1) * 7, fy = Math.cos(f * 0.024 + seed * 1.3) * 6; // slow float, so the label lives
  return (
    <>
      <div style={{ position: 'absolute', left: x + (1 - p) * dx + fx, top: y + (1 - p) * dy + fy, opacity: p * (1 - o), filter: o > 0 ? `blur(${o * 6}px)` : undefined,
        display: 'flex', alignItems: 'center', gap: 12, padding: '12px 22px 12px 18px', borderRadius: 999, background: 'rgba(12,18,30,.62)', backdropFilter: 'blur(12px)',
        border: `1px solid ${T.glassEdge}`, fontFamily: T.font, fontSize: 24, fontWeight: 800, letterSpacing: 3 + o * 6, color: T.white, boxShadow: '0 10px 30px rgba(0,0,0,.35)' }}>
        <div style={{ width: 8, height: 8, borderRadius: 4, background: T.gold, boxShadow: `0 0 12px ${T.gold}` }} />{text.toUpperCase()}
      </div>
      {out !== undefined && <Vapor f={f} a={out} x={x} y={y} w={text.length * 18 + 60} h={52} n={22} seed={seed} />}
    </>
  );
};

// ---------- particle dissolve ----------
export const Vapor = ({ f, a, x, y, w, h, n = 36, seed = 0, color = 'rgba(246,240,224,.9)', dur = 26 }: { f: number; a: number; x: number; y: number; w: number; h: number; n?: number; seed?: number; color?: string; dur?: number }) => {
  const t = (f - a) / dur;
  if (t <= 0 || t >= 1) return null;
  return (
    <>
      {Array.from({ length: n }, (_, i) => {
        const r1 = rnd(i, seed + 1), r2 = rnd(i, seed + 2), r3 = rnd(i, seed + 3);
        const size = 2 + r3 * 5;
        return <div key={i} style={{ position: 'absolute', left: x + r1 * w + (r3 - 0.5) * 90 * t, top: y + r2 * h - t * (50 + 130 * r3), width: size, height: size, borderRadius: '50%',
          background: color, opacity: (1 - t) * (0.35 + 0.65 * r2) * clamp(t / 0.12), filter: 'blur(1px)' }} />;
      })}
    </>
  );
};

// ---------- dark-glass panel with entrances and exits ----------
export type Enter = 'glass' | 'slideL' | 'slideR' | 'wipe' | 'focus';
export type Exit = 'fade' | 'vapor' | 'collapse';
const tone = (t: 'gold' | 'red' | 'green') => (t === 'gold' ? T.gold : t === 'red' ? T.redSoft : T.green);
export const Glass = ({ f, a, b, y, h, x = 80, w = 920, enter = 'glass', exit = 'fade', lit = 0, label, toneOf = 'gold', collapseTo = '50% 50%', children }: {
  f: number; a: number; b: number; y: number; h: number; x?: number; w?: number; enter?: Enter; exit?: Exit; lit?: number; label?: string; toneOf?: 'gold' | 'red' | 'green'; collapseTo?: string; children?: React.ReactNode;
}) => {
  const exitLen = exit === 'vapor' ? 22 : 12;
  if (f < a - 1 || f > b + exitLen + 26) return null;
  const pi = outExpo((f - a) / 16), po = clamp((f - b) / exitLen);
  let transform = '', clip: string | undefined, blur = 0, op = pi;
  if (enter === 'glass') { transform = `scale(${0.96 + 0.04 * pi})`; blur = (1 - pi) * 14; }
  if (enter === 'slideL') transform = `translateX(${-(1 - pi) * 140}px)`;
  if (enter === 'slideR') transform = `translateX(${(1 - pi) * 140}px)`;
  if (enter === 'wipe') { clip = `inset(0 ${(1 - pi) * 100}% 0 0 round 34px)`; op = 1; }
  if (enter === 'focus') blur = (1 - pi) * 24;
  if (exit === 'fade') { op *= 1 - po; transform += ` translateY(${-po * 20}px)`; }
  if (exit === 'vapor') { op *= 1 - po; blur += po * 10; transform += ` translateY(${-po * 30}px)`; }
  if (exit === 'collapse') { op *= 1 - po; transform += ` scale(${1 - 0.88 * outExpo(po)})`; }
  const sweep = clamp((f - a - 6) / 24);
  const col = tone(toneOf);
  return (
    <>
      <div style={{ position: 'absolute', left: x, top: y, width: w, height: h, borderRadius: 34, overflow: 'hidden', opacity: op, transform, transformOrigin: exit === 'collapse' ? collapseTo : '50% 50%', clipPath: clip,
        background: T.glass, backdropFilter: 'blur(18px) saturate(130%)', border: `1px solid ${lit > 0 ? `rgba(241,199,91,${0.2 + 0.5 * lit})` : T.glassEdge}`,
        boxShadow: `inset 0 1px 0 rgba(255,255,255,.18), 0 30px 70px rgba(0,0,0,.45), 0 0 ${40 * lit}px rgba(241,199,91,${0.28 * lit})` }}>
        {/* restrained light sweep, once, after the entrance */}
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(105deg, rgba(255,255,255,0) ${sweep * 140 - 40}%, rgba(225,235,255,.13) ${sweep * 140 - 25}%, rgba(255,255,255,0) ${sweep * 140 - 10}%)` }} />
        <div style={{ position: 'absolute', inset: 0, filter: blur > 0.2 ? `blur(${blur}px)` : undefined }}>
          {label && <div style={{ position: 'absolute', left: 52, top: 40, display: 'flex', alignItems: 'center', gap: 16, fontFamily: T.font, fontSize: 21, fontWeight: 800, letterSpacing: 5, color: col }}>
            <div style={{ width: 34 * ease(f, a + 4, a + 16), height: 2, background: col }} />{label.toUpperCase()}</div>}
          {children}
        </div>
      </div>
      {exit === 'vapor' && <Vapor f={f} a={b} x={x} y={y} w={w} h={h} n={44} seed={a} />}
    </>
  );
};

// ---------- narration-driven highlight tile ----------
// Appears at `at`; lights up (border, gold glow, value reveal, mark stamp) at `lit`; dims when focus moves on (`off`).
export const Tile = ({ f, at, lit, off, x, y, w, h, title, value, mark, toneOf = 'gold', valueSize = 48 }: {
  f: number; at: number; lit: number; off?: number; x: number; y: number; w: number; h: number; title: string; value?: React.ReactNode; mark?: 'ok' | 'no'; toneOf?: 'gold' | 'red' | 'green'; valueSize?: number;
}) => {
  const p = outExpo((f - at) / 14);
  if (p <= 0) return null;
  const L = ease(f, lit, lit + 8) * (off !== undefined ? 1 - 0.55 * ease(f, off, off + 10) : 1);
  const col = tone(toneOf);
  const v = outExpo((f - lit) / 12);
  const s = f >= lit ? outBack((f - lit) / 10) : 0;
  return (
    <div style={{ position: 'absolute', left: x, top: y + (1 - p) * 30, width: w, height: h, opacity: p * (0.62 + 0.38 * Math.max(L, f < lit ? 0.6 : 0)), borderRadius: 22,
      background: `linear-gradient(160deg, rgba(24,34,52,${0.55 + 0.2 * L}), rgba(12,16,26,.5))`, border: `1.5px solid ${L > 0.05 ? col : T.glassEdge}`,
      boxShadow: `0 0 ${34 * L}px ${toneOf === 'red' ? 'rgba(224,57,43,.35)' : 'rgba(241,199,91,.32)'}` }}>
      <div style={{ position: 'absolute', left: 26, top: 22, fontFamily: T.font, fontSize: 20, fontWeight: 800, letterSpacing: 3, color: L > 0.05 ? col : T.mute }}>{title.toUpperCase()}</div>
      {value !== undefined && <div style={{ position: 'absolute', left: 24, top: 52, overflow: 'hidden', height: valueSize * 1.2 }}>
        <div style={{ fontFamily: T.font, fontSize: valueSize, fontWeight: 900, letterSpacing: -1, color: T.white, transform: `translateY(${(1 - v) * 100}%)`, fontVariantNumeric: 'tabular-nums' }}>{value}</div></div>}
      {mark && f >= lit && <div style={{ position: 'absolute', right: 22, top: h / 2 - 30, width: 60, height: 60, borderRadius: 30, display: 'grid', placeItems: 'center',
        background: mark === 'ok' ? 'rgba(127,224,168,.16)' : 'rgba(224,57,43,.2)', border: `2px solid ${mark === 'ok' ? T.green : T.red}`, color: mark === 'ok' ? T.green : T.redSoft,
        fontFamily: T.font, fontSize: 34, fontWeight: 900, transform: `scale(${s})` }}>{mark === 'ok' ? '✓' : '✕'}</div>}
    </div>
  );
};

// ---------- count-up (the final frame always shows the exact verified value) ----------
export const Count = ({ f, a, value, dur = 18, sign = '', size = 96, gold = true }: { f: number; a: number; value: number; dur?: number; sign?: string; size?: number; gold?: boolean }) => {
  if (f < a) return null;
  const p = outExpo((f - a) / dur);
  const shown = f >= a + dur ? value : Math.round((value * p) / 10) * 10;
  return <span style={{ fontFamily: T.font, fontSize: size, fontWeight: 900, letterSpacing: -size * 0.03, fontVariantNumeric: 'tabular-nums', ...(gold ? goldFill : { color: T.white }) }}>{sign}{money(shown)}</span>;
};

// ---------- stamp ----------
export const Stamp = ({ f, at, text, x, y, color = T.red, rotate = -8, size = 44 }: { f: number; at: number; text: string; x: number; y: number; color?: string; rotate?: number; size?: number }) => {
  if (f < at) return null;
  const s = outBack((f - at) / 9);
  return <div style={{ position: 'absolute', left: x, top: y, transform: `rotate(${rotate}deg) scale(${1.6 - 0.6 * s})`, opacity: clamp((f - at) / 4), padding: '10px 22px', border: `4px solid ${color}`, borderRadius: 12,
    fontFamily: T.font, fontSize: size, fontWeight: 900, letterSpacing: 4, color, whiteSpace: 'nowrap', textShadow: '0 2px 10px rgba(0,0,0,.4)', background: 'rgba(10,12,18,.35)' }}>{text.toUpperCase()}</div>;
};

// ---------- word-synced captions (from tools/words.py) ----------
type W = { i: number; text: string; start: number; end: number };
type Beat = { id: string; words: W[]; chunks: { start: number; end: number; words: number[] }[] };
export const Captions = ({ f, fps, beats, from = 0, until = 1e9, y = ZONE.captionTop }: { f: number; fps: number; beats: Beat[]; from?: number; until?: number; y?: number }) => {
  if (f < from || f >= until) return null;
  const t = f / fps;
  for (const b of beats) {
    const cs = b.chunks;
    for (let k = 0; k < cs.length; k++) {
      const c = cs[k], next = cs[k + 1];
      const outT = next ? next.start : c.end + 0.45;
      if (t < c.start || t >= outT) continue;
      const pin = clamp((t - c.start) / 0.08);
      return (
        <div style={{ position: 'absolute', left: 80, right: 120, top: y, height: ZONE.captionH, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <div style={{ padding: '14px 26px', borderRadius: 20, background: 'rgba(8,12,22,.5)', backdropFilter: 'blur(8px)', transform: `scale(${0.92 + 0.08 * pin})`, opacity: pin,
            fontFamily: T.font, fontSize: 50, fontWeight: 800, lineHeight: 1.12, letterSpacing: -0.5, color: T.white, textShadow }}>
            {c.words.map((wi, j) => {
              const w = b.words[wi];
              const on = t >= w.start && t < w.end + 0.04;
              return <span key={j} style={{ color: on ? T.gold : T.white }}>{w.text.replace(/[,.;:]$/, '')}{j < c.words.length - 1 ? ' ' : ''}</span>;
            })}
          </div>
        </div>
      );
    }
  }
  return null;
};

// ---------- depth over a photo plate (simulated, on a still: not live footage) ----------
// Foreground bokeh drifting faster than the plate's own camera (parallax), a slow light leak, and our navy grade.
export const Depth = ({ f, seed = 1, warm = 0.7, leak = 1 }: { f: number; seed?: number; warm?: number; leak?: number }) => (
  <AbsoluteFill style={{ pointerEvents: 'none' }}>
    {Array.from({ length: 12 }, (_, i) => {
      const r1 = rnd(i, seed), r2 = rnd(i, seed + 7), r3 = rnd(i, seed + 13);
      const near = 0.4 + r3 * 0.6, size = 26 + 70 * near;
      const x = ((r1 * 1300 + f * (0.25 + 0.9 * near)) % 1400) - 160, y = 120 + r2 * 1650 + Math.sin(f * 0.02 + i) * 14 * near;
      const c = r2 < warm ? '255,214,150' : '200,220,255';
      return <div key={i} style={{ position: 'absolute', left: x, top: y, width: size, height: size, borderRadius: '50%', background: `radial-gradient(circle, rgba(${c},${0.1 + 0.08 * near}) 0%, rgba(${c},0) 70%)`, filter: `blur(${4 + 10 * near}px)` }} />;
    })}
    <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(60% 40% at ${30 + 40 * Math.sin(f * 0.004 + seed)}% ${20 + 10 * Math.cos(f * 0.003)}%, rgba(255,226,180,${0.07 * leak}) 0%, rgba(255,226,180,0) 70%)`, mixBlendMode: 'screen' }} />
  </AbsoluteFill>
);

export const NavyGrade = ({ low = 1 }: { low?: number }) => (
  <AbsoluteFill style={{ background: `linear-gradient(180deg, rgba(8,12,22,.86) 0%, rgba(8,12,22,.52) 14%, rgba(8,12,22,0) 30%, rgba(8,12,22,0) 50%, rgba(8,12,22,${0.5 * low}) 66%, rgba(8,12,22,${0.86 * low}) 100%)` }} />
);
