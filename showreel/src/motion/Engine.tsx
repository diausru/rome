// TAX SECRETS CANADA motion engine v3 (2026-10-12). Reusable, frame-driven building blocks for card-format Reels.
// Techniques adapted from the marketing-skill video pipeline (studied: easing curves, staggered "--in" reveals,
// chunked word-highlight captions, count-ups, scene cross-moves, safe areas) and re-built in Remotion in OUR look:
// dark navy / charcoal glass, white type, restrained gold, purposeful Canadian red, ALL-CAPS headings (Mont).
// Every animation is a pure function of the frame. Numbers are passed in from verified data files; components only
// format them, and a count-up always lands exactly on the value it was given.
import React from 'react';
import { Easing, interpolate } from 'remotion';

// ---------- brand tokens ----------
export const BR = {
  navy: '#0a1220', ink: '#f4f6fa', soft: 'rgba(226,233,244,.80)', dim: 'rgba(226,233,244,.55)', gray: '#9fb0c8',
  gold: '#f1c75b', amber: '#ffb648', red: '#d52b1e',
  glass: 'linear-gradient(160deg, rgba(18,28,48,.72), rgba(8,14,26,.56))',
  line: 'rgba(190,210,240,.20)', font: 'Mont',
};
export const goldText: React.CSSProperties = {
  background: 'linear-gradient(180deg,#fff3c9 0%,#f1c75b 48%,#c88f1f 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text',
  color: 'transparent', filter: 'drop-shadow(0 6px 18px rgba(0,0,0,.5))',
};
export const shadow = '0 2px 16px rgba(0,0,0,.6)';
// Instagram / TikTok / Shorts UI: ≈150 px top, ≈470 px bottom, ≈120 px right are covered (reference lint zone)
export const SAFE = { x0: 60, x1: 960, y0: 150, y1: 1450 };

// ---------- timing ----------
export const EZ = {
  rise: Easing.bezier(0.2, 0.8, 0.2, 1),      // entrances, count-ups
  wipe: Easing.bezier(0.7, 0, 0.25, 1),       // mask wipes, scene moves
  settle: Easing.bezier(0.16, 1, 0.3, 1),     // calm landing, no overshoot (brand: no bouncy pops)
  out: Easing.bezier(0.4, 0, 1, 1),           // exits
};
export const tw = (f: number, a: number, b: number, ez = EZ.rise) =>
  interpolate(f, [a, b], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ez });
export const sec = (fps: number) => (s: number) => Math.round(s * fps);

// ---------- money formatting (never rounds silently: callers choose cents) ----------
export const money = (n: number, cents = false) =>
  '$' + n.toLocaleString('en-US', { minimumFractionDigits: cents ? 2 : 0, maximumFractionDigits: cents ? 2 : 0 });

// ---------- count-up: eases 0 → value, lands exactly on value ----------
export const CountUp = ({ f, a, dur = 24, value, cents = false, from = 0 }: { f: number; a: number; dur?: number; value: number; cents?: boolean; from?: number }) => {
  const t = tw(f, a, a + dur);
  const v = t >= 1 ? value : from + (value - from) * t;
  return <span style={{ fontVariantNumeric: 'tabular-nums' }}>{money(cents ? Math.round(v * 100) / 100 : Math.round(v), cents)}</span>;
};

// ---------- floating topic tag: drifts in from a side, blur → clear, then floats ----------
export const FloatTag = ({ f, a, from, x, y, children, out }: { f: number; a: number; from: 'left' | 'right' | 'top' | 'bottom'; x: number; y: number; children: React.ReactNode; out?: number }) => {
  const e = tw(f, a, a + 18, EZ.settle), o = out !== undefined ? 1 - tw(f, out, out + 10, EZ.out) : 1;
  if (e <= 0 || o <= 0) return null;
  const d = (1 - e) * 120, dx = from === 'left' ? -d : from === 'right' ? d : 0, dy = from === 'top' ? -d : from === 'bottom' ? d : 0;
  const fl = Math.sin((f + a * 3) * 0.045) * 6;
  return (
    <div style={{ position: 'absolute', left: x, top: y, transform: `translate(${dx}px, ${dy + fl}px)`, opacity: e * o, filter: `blur(${(1 - e) * 10}px)`,
      padding: '12px 22px', borderRadius: 999, background: 'rgba(12,20,36,.62)', backdropFilter: 'blur(14px)', border: `1px solid ${BR.line}`,
      fontFamily: BR.font, fontSize: 24, fontWeight: 800, letterSpacing: 4, color: BR.ink, whiteSpace: 'nowrap', boxShadow: '0 12px 30px rgba(0,0,0,.35)' }}>{children}</div>
  );
};

// ---------- mask headline: ALL-CAPS lines rise out of a mask one after another; *word* = gold ----------
const spans = (s: string) => s.toUpperCase().split(/(\*[^*]+\*)/).map((p, i) =>
  p.startsWith('*') ? <span key={i} style={goldText}>{p.slice(1, -1)}</span> : <span key={i}>{p}</span>);
export const MaskHeadline = ({ f, a, lines, size = 92, stagger = 7, x = 80, y, now = false, out, color = BR.ink }: {
  f: number; a: number; lines: string[]; size?: number; stagger?: number; x?: number; y: number; now?: boolean; out?: number; color?: string;
}) => {
  const o = out !== undefined ? tw(f, out, out + 12, EZ.out) : 0;
  if (o >= 1) return null;
  return (
    <div style={{ position: 'absolute', left: x, top: y - o * 40, opacity: 1 - o, filter: `blur(${o * 8}px)` }}>
      {lines.map((l, i) => {
        // `now`: every line is already on screen at frame 0 (the cover frame), only settling
        const e = now ? 0.84 + 0.16 * tw(f, i * 2, i * 2 + 14, EZ.settle) : tw(f, a + i * stagger, a + i * stagger + 16);
        return (
          <div key={i} style={{ overflow: 'hidden', height: size * 1.14, paddingRight: 20 }}>
            <div style={{ fontFamily: BR.font, fontSize: size, fontWeight: 900, letterSpacing: -size * 0.02, lineHeight: 1.12, color, textShadow: shadow,
              transform: `translateY(${(1 - e) * 105}%)`, filter: `blur(${(1 - e) * 6}px)`, whiteSpace: 'nowrap' }}>{spans(l)}</div>
          </div>
        );
      })}
    </div>
  );
};

// ---------- underline sweep under a phrase ----------
export const Sweep = ({ f, a, x, y, w, color = BR.gold, dur = 14 }: { f: number; a: number; x: number; y: number; w: number; color?: string; dur?: number }) => (
  <div style={{ position: 'absolute', left: x, top: y, width: w * tw(f, a, a + dur, EZ.wipe), height: 5, borderRadius: 3, background: `linear-gradient(90deg, ${color}, rgba(241,199,91,.2))`, boxShadow: `0 0 18px ${color}88` }} />
);

// ---------- glass panel with entrance / exit variants, light sweep and narration-driven highlight ----------
export type Enter = 'glass' | 'slide-left' | 'slide-right' | 'wipe' | 'focus';
export type Exit = 'fade' | 'vapor' | 'collapse';
export const GlassPanel = ({ f, a, b, enter = 'glass', exit = 'fade', active = 0, x, y, w, h, label, accent = BR.gold, children }: {
  f: number; a: number; b: number; enter?: Enter; exit?: Exit; active?: number; x: number; y: number; w: number; h: number; label?: string; accent?: string; children?: React.ReactNode;
}) => {
  if (f < a - 1 || f > b + 22) return null;
  const e = tw(f, a, a + 18, enter === 'wipe' ? EZ.wipe : EZ.settle);
  const xo = tw(f, b, b + (exit === 'vapor' ? 20 : 12), EZ.out);
  let tf = '', clip = 'none', blur = 0, op = 1;
  if (enter === 'glass') { tf = `scale(${0.95 + 0.05 * e})`; blur = (1 - e) * 14; op = e; }
  if (enter === 'slide-left' || enter === 'slide-right') { tf = `translateX(${(enter === 'slide-left' ? -1 : 1) * (1 - e) * 160}px)`; op = e; blur = (1 - e) * 6; }
  if (enter === 'wipe') { clip = `inset(0 ${(1 - e) * 100}% 0 0 round 34px)`; }
  if (enter === 'focus') { blur = (1 - e) * 22; op = e; tf = `scale(${1.04 - 0.04 * e})`; }
  if (exit === 'fade') op *= 1 - xo;
  if (exit === 'vapor') { op *= 1 - xo; blur += xo * 16; tf += ` translateY(${-xo * 50}px)`; }
  if (exit === 'collapse') { tf += ` scaleY(${1 - 0.92 * xo})`; op *= 1 - tw(f, b + 6, b + 12); }
  const sweep = tw(f, a + 6, a + 32, EZ.wipe);
  const glow = active;
  const border = `rgba(${Math.round(190 + 51 * glow)},${Math.round(210 - 11 * glow)},${Math.round(240 - 149 * glow)},${0.2 + 0.55 * glow})`;
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, height: h, transform: tf, transformOrigin: 'center top', opacity: op, filter: blur ? `blur(${blur}px)` : undefined, clipPath: clip }}>
      <div style={{ position: 'absolute', inset: 0, borderRadius: 34, overflow: 'hidden', background: BR.glass, backdropFilter: 'blur(18px) saturate(125%)',
        border: `1.5px solid ${border}`, boxShadow: `inset 0 1px 0 rgba(255,255,255,.16), 0 30px 70px rgba(0,0,0,.45), 0 0 ${40 * glow}px rgba(255,182,72,${0.28 * glow})` }}>
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(105deg, rgba(255,255,255,0) ${sweep * 140 - 40}%, rgba(230,240,255,.14) ${sweep * 140 - 25}%, rgba(255,255,255,0) ${sweep * 140 - 10}%)` }} />
        {label && (
          <div style={{ position: 'absolute', left: 44, top: 34, display: 'flex', alignItems: 'center', gap: 14, fontFamily: BR.font, fontSize: 22, fontWeight: 800, letterSpacing: 5,
            color: glow > 0.5 ? accent : BR.gray, textTransform: 'uppercase' }}>
            <div style={{ width: 34 * tw(f, a + 4, a + 18), height: 2, background: glow > 0.5 ? accent : BR.gray }} />{label}
          </div>
        )}
        {children}
      </div>
      {exit === 'vapor' && xo > 0 && xo < 1 && <Vapor f={f} t={xo} w={w} h={h} />}
    </div>
  );
};

// particle dissolve used by the vapor exit: specks rise off the panel and fade
const rnd = (i: number, n: number) => { const s = Math.sin(i * 127.1 + n * 311.7) * 43758.5453; return s - Math.floor(s); };
const Vapor = ({ f, t, w, h }: { f: number; t: number; w: number; h: number }) => (
  <>{Array.from({ length: 60 }, (_, i) => (
    <div key={i} style={{ position: 'absolute', left: rnd(i, 1) * w, top: rnd(i, 2) * h - t * (60 + 140 * rnd(i, 3)), width: 3 + 4 * rnd(i, 4), height: 3 + 4 * rnd(i, 4),
      borderRadius: '50%', background: rnd(i, 5) > 0.7 ? BR.gold : '#dfe8f6', opacity: Math.sin(Math.PI * t) * 0.7, filter: 'blur(1px)' }} />
  ))}</>
);

// ---------- table row: slides in, divider draws, value lands; active row gets a gold bar and brighter type ----------
export const Row = ({ f, a, top, label, value, note, active = 0, color = BR.ink }: {
  f: number; a: number; top: number; label: string; value: React.ReactNode; note?: string; active?: number; color?: string;
}) => {
  const e = tw(f, a, a + 14);
  if (e <= 0) return null;
  return (
    <div style={{ position: 'absolute', left: 44, right: 44, top, opacity: e, transform: `translateX(${(1 - e) * 40}px)` }}>
      <div style={{ position: 'absolute', left: -20, top: 6, width: 5, height: 62, borderRadius: 3, background: BR.gold, opacity: active, boxShadow: `0 0 16px ${BR.amber}` }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div style={{ fontFamily: BR.font, fontSize: 30, fontWeight: 800, letterSpacing: 3, color: active > 0.5 ? BR.ink : BR.soft }}>{label}</div>
        <div style={{ fontFamily: BR.font, fontSize: 64, fontWeight: 900, letterSpacing: -1, color, ...(active > 0.5 ? goldText : {}) }}>{value}</div>
      </div>
      {note && <div style={{ fontFamily: BR.font, fontSize: 21, fontWeight: 600, color: BR.dim, marginTop: -4, opacity: tw(f, a + 10, a + 24) }}>{note}</div>}
      <div style={{ marginTop: 10, width: `${100 * tw(f, a + 4, a + 22, EZ.wipe)}%`, height: 1.5, background: BR.line }} />
    </div>
  );
};

// ---------- horizontal value bar ----------
export const Bar = ({ f, a, frac, color = BR.gold, h = 22, dur = 26 }: { f: number; a: number; frac: number; color?: string; h?: number; dur?: number }) => (
  <div style={{ height: h, borderRadius: h / 2, background: 'rgba(190,210,240,.10)', overflow: 'hidden' }}>
    <div style={{ height: '100%', width: `${100 * frac * tw(f, a, a + dur, EZ.rise)}%`, borderRadius: h / 2, background: `linear-gradient(90deg, ${color}aa, ${color})`, boxShadow: `0 0 18px ${color}66` }} />
  </div>
);

// ---------- depth: two parallax layers of drifting dust in the plate's light ----------
export const Dust = ({ f, n = 34, seed = 1 }: { f: number; n?: number; seed?: number }) => (
  <>{Array.from({ length: n }, (_, i) => {
    const near = rnd(i + seed, 9) > 0.7, sp = near ? 0.55 : 0.18, size = near ? 6 + 8 * rnd(i, 3) : 2 + 3 * rnd(i, 3);
    const x = ((rnd(i + seed, 1) * 1080 + f * sp * (rnd(i, 6) - 0.4) * 1.4) % 1180 + 1180) % 1180 - 50;
    const y = ((rnd(i + seed, 2) * 1920 - f * sp * 0.8) % 2000 + 2000) % 2000 - 40;
    return <div key={i} style={{ position: 'absolute', left: x, top: y, width: size, height: size, borderRadius: '50%', background: rnd(i, 7) > 0.6 ? '#ffd9a0' : '#cfe0ff',
      opacity: (near ? 0.18 : 0.32) * (0.6 + 0.4 * Math.sin(f * 0.05 + i)), filter: `blur(${near ? 4 : 1}px)` }} />;
  })}</>
);

// ---------- word-level captions: whole chunk cuts in, the spoken word turns gold; kept inside the safe area ----------
export type Chunk = { text: string; t0: number; t1: number; words: number[] };
export type Word = { w: string; t0: number; t1: number };
export const Captions = ({ f, fps, chunks, words, display = (s) => s, y = 1312, until }: {
  f: number; fps: number; chunks: Chunk[]; words: Word[]; display?: (s: string) => string; y?: number; until?: number;
}) => {
  const t = f / fps;
  if (until !== undefined && t > until) return null;
  const c = chunks.find((c, i) => t >= c.t0 - 0.05 && t < (chunks[i + 1] ? Math.min(chunks[i + 1].t0 - 0.05, c.t1 + 0.6) : c.t1 + 0.6));
  if (!c) return null;
  const e = tw(f, Math.round((c.t0 - 0.05) * fps), Math.round((c.t0 - 0.05) * fps) + 3, EZ.settle);
  return (
    <div style={{ position: 'absolute', left: SAFE.x0, width: SAFE.x1 - SAFE.x0, top: y, display: 'flex', justifyContent: 'center', opacity: e, transform: `scale(${0.94 + 0.06 * e})` }}>
      <div style={{ padding: '12px 26px', borderRadius: 18, background: 'rgba(6,10,20,.55)', backdropFilter: 'blur(10px)', fontFamily: BR.font, fontSize: 50, fontWeight: 800, color: BR.ink, textShadow: shadow, whiteSpace: 'nowrap', maxWidth: 900 }}>
        {c.words.map((wi, k) => {
          const w = words[wi], on = t >= w.t0 - 0.03;
          return <span key={wi} style={{ color: on && t < (c.words[k + 1] !== undefined ? words[c.words[k + 1]].t0 : c.t1 + 0.6) ? BR.gold : on ? BR.ink : 'rgba(244,246,250,.55)' }}>{display(w.w)}{k < c.words.length - 1 ? ' ' : ''}</span>;
        })}
      </div>
    </div>
  );
};
