// TAX SECRETS CANADA — "2.5D studio" overlays (Stories v3): Blender clay mascot sprite, frosted-glass windows with typed text and a
// running highlight line, CapCut-style word captions, film FX (light leaks on cuts, flare, grain). No AI video.
import React from 'react';
import { AbsoluteFill, Img, staticFile, interpolate } from 'remotion';
import { easeOut } from './Effects';

type Ctx = { now: number; fps: number; end: number };
type Pn = { [k: string]: any };
const T = (x: any, d: number) => (x && typeof x === 'object' ? (x.t ?? d) : (x ?? d));
const k01 = (now: number, t: number, d = 0.45) => easeOut(Math.max(0, Math.min(1, (now - t) / d)));
const F = { head: 'Mont, Montserrat, sans-serif', cond: 'Oswald, Mont, sans-serif' };
const ACC: Record<string, string> = { gold: '#F2C76B', red: '#FF5A4E', green: '#5FE0A0', white: '#FFFFFF' };

// typed text with caret; numbers/money tokens get the accent colour, never clipped (no overflow:hidden, nowrap)
const Typed: React.FC<{ text: string; t: number; now: number; cps?: number; accent: string }> = ({ text, t, now, cps = 30, accent }) => {
  const n = Math.max(0, Math.floor((now - t) * cps)); const shown = text.slice(0, n); const typing = n < text.length && now >= t;
  const parts = shown.split(/(\$?\d[\d,.]*%?(?:\s?\/\s?\w+)?)/);
  return <span style={{ whiteSpace: 'nowrap' }}>{parts.map((s, i) => i % 2 ? <span key={i} style={{ color: accent, fontWeight: 900 }}>{s}</span> : s)}
    {typing && <span style={{ display: 'inline-block', width: '0.08em', height: '0.9em', marginLeft: 4, verticalAlign: '-0.08em', background: accent, opacity: Math.sin(now * 20) > 0 ? 1 : 0.15 }} />}</span>;
};

const GL = '!<>-_\\/[]{}=+*^?#$%&0123456789';
const colorize = (txt: string, accent: string) => txt.split(/(\$?\d[\d,.]*%?(?:\s?\/\s?\w+)?)/).map((s, i) => i % 2 ? <span key={i} style={{ color: accent, fontWeight: 900 }}>{s}</span> : <React.Fragment key={i}>{s}</React.Fragment>);
// text-appear effects: type (letter by letter + caret), decode (scramble → real), rise (words float up from blur), mask (wipe reveal), glow (letters flash in)
export const FxText: React.FC<{ fx: string; text: string; t: number; now: number; accent: string; cps?: number }> = ({ fx, text, t, now, accent, cps = 30 }) => {
  const u = now - t;
  if (fx === 'decode') {
    const n = text.length; const done = Math.floor(Math.max(0, u) / 0.9 * n);
    if (done >= n) return <span style={{ whiteSpace: 'nowrap' }}>{colorize(text, accent)}</span>;
    return <span style={{ whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>{text.split('').map((ch, i) => i < done || ch === ' ' ? ch : <span key={i} style={{ color: accent, opacity: 0.8 }}>{GL[Math.floor((now * 30 + i * 7) % GL.length)]}</span>)}</span>;
  }
  if (fx === 'rise') return <span style={{ whiteSpace: 'nowrap' }}>{text.split(' ').map((w, i) => { const k = k01(now, t + i * 0.12, 0.5);
    return <span key={i} style={{ display: 'inline-block', marginRight: '0.28em', opacity: k, filter: `blur(${(1 - k) * 12}px)`, transform: `translateY(${(1 - k) * 0.6}em)` }}>{colorize(w, accent)}</span>; })}</span>;
  if (fx === 'mask') { const k = k01(now, t, 0.9);
    return <span style={{ position: 'relative', display: 'inline-block', whiteSpace: 'nowrap', clipPath: `inset(-20% ${(1 - k) * 100}% -20% 0)` }}>{colorize(text, accent)}
      <span style={{ position: 'absolute', top: '-10%', bottom: '-10%', left: `${k * 100}%`, width: 4, background: accent, boxShadow: `0 0 16px ${accent}`, opacity: k < 1 ? 1 : 0 }} /></span>; }
  if (fx === 'glow') return <span style={{ whiteSpace: 'nowrap' }}>{text.split('').map((ch, i) => { const k = k01(now, t + i * 0.035, 0.35); const isN = /[\d$%,.]/.test(ch);
    return <span key={i} style={{ opacity: k, color: isN ? accent : undefined, fontWeight: isN ? 900 : undefined, textShadow: `0 0 ${(1 - k) * 30}px ${accent}`, display: 'inline-block', transform: `scale(${1.6 - 0.6 * k})`, whiteSpace: 'pre' }}>{ch}</span>; })}</span>;
  return <Typed text={text} t={t} now={now} cps={cps} accent={accent} />;
};

// frosted glass window: backdrop blur, soft border, a light that runs around the edge, kicker with a live dot, typed lines
const GlassWin: React.FC<{ p: Pn; c: Ctx }> = ({ p, c }) => {
  const acc = ACC[p.accent ?? 'gold']; const k = k01(c.now, p.t, 0.5); const lines = p.lines as Pn[];
  const run = ((c.now - p.t) * 0.22) % 1;
  return (
    <div style={{ position: 'relative', display: 'inline-block', padding: '26px 36px 28px', borderRadius: 22, background: 'linear-gradient(135deg, rgba(255,255,255,.16), rgba(255,255,255,.05))',
      backdropFilter: 'blur(18px) saturate(1.3) brightness(.78)', WebkitBackdropFilter: 'blur(18px) saturate(1.3) brightness(.78)', border: '1px solid rgba(255,255,255,.28)',
      boxShadow: '0 30px 80px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.35)', color: '#fff', fontFamily: F.head,
      transform: `translateY(${(1 - k) * 30}px) scale(${0.96 + 0.04 * k})`, opacity: k }}>
      <svg style={{ position: 'absolute', inset: -1, width: 'calc(100% + 2px)', height: 'calc(100% + 2px)', overflow: 'visible', pointerEvents: 'none' }}>
        <rect x="1" y="1" width="99.6%" height="99.4%" rx="22" pathLength={100} fill="none" stroke={acc} strokeWidth={3} strokeDasharray="14 86" strokeDashoffset={-run * 100} style={{ filter: `drop-shadow(0 0 8px ${acc})` }} />
        <rect x="1" y="1" width="99.6%" height="99.4%" rx="22" pathLength={100} fill="none" stroke="rgba(255,255,255,.8)" strokeWidth={1.5} strokeDasharray="5 95" strokeDashoffset={-run * 100 - 50} />
      </svg>
      {p.kicker && <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: F.cond, fontSize: 24, letterSpacing: 5, color: 'rgba(255,255,255,.85)', marginBottom: 12, textTransform: 'uppercase' }}>
        <span style={{ width: 12, height: 12, borderRadius: 6, background: acc, boxShadow: `0 0 ${8 + 6 * Math.sin(c.now * 5)}px ${acc}` }} />{p.kicker}</div>}
      {lines.map((ln, i) => {
        const t = T(ln, p.t + 0.4 + i * 0.8); if (c.now < t) return null;
        const dur = (ln.fx ?? 'type') === 'type' ? ln.text.length / 30 : 0.9; const hl = ln.hl && c.now > t + dur;
        return <div key={i} style={{ position: 'relative', fontSize: ln.size ?? 48, fontWeight: ln.light ? 600 : 800, lineHeight: 1.22, padding: '2px 0', textShadow: '0 2px 18px rgba(0,0,0,.45)' }}>
          {hl && <div style={{ position: 'absolute', left: -10, right: -10, top: '8%', bottom: '8%', borderRadius: 8, background: acc, opacity: 0.22, transformOrigin: 'left', transform: `scaleX(${k01(c.now, t + dur, 0.4)})` }} />}
          <FxText fx={ln.fx ?? 'type'} text={ln.text} t={t} now={c.now} cps={ln.cps ?? 30} accent={ACC[ln.accent ?? p.accent ?? 'gold']} />
        </div>;
      })}
      {p.src && <div style={{ marginTop: 14, fontSize: 18, color: 'rgba(255,255,255,.7)', fontWeight: 600, opacity: k01(c.now, T(p.srcAt, p.t + 1.5)) }}>✓ {p.src}</div>}
    </div>
  );
};

// Blender clay mascot: pre-rendered loops (15 fps) per action; path keys move/scale/flip him over the scene; soft contact shadow
const Mascot: React.FC<{ p: Pn; c: Ctx }> = ({ p, c }) => {
  const keys = p.keys as Pn[]; let i = 0; for (let j = 0; j < keys.length; j++) if (c.now >= T(keys[j], 0)) i = j;
  const a = keys[i], b = keys[Math.min(i + 1, keys.length - 1)]; const ta = T(a, 0), tb = T(b, ta + 1);
  const move = a.move && b !== a ? easeOut(Math.max(0, Math.min(1, (c.now - ta) / Math.max(0.1, a.move)))) : 1;
  const L = (q: string) => (a.move && b !== a ? a[q] + (b[q] - a[q]) * move : a[q]);
  const x = L('x'), y = L('y'), h = L('h'); const action = a.move && move < 1 ? (a.moving ?? 'run') : a.action;
  const n = (p.frames as Record<string, number>)[action]; const fi = Math.floor((c.now - ta) * 15) % n;
  const file = `${p.dir}/${action}/f_${String(fi * 2 + 1).padStart(4, '0')}.png`;
  const flip = a.flip ? -1 : 1; const w = h * 600 / 720;
  return (
    <div style={{ position: 'absolute', left: x - w / 2, top: y - h, width: w, height: h }}>
      <div style={{ position: 'absolute', left: '22%', right: '22%', bottom: h * 0.035, height: h * 0.05, borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(0,0,0,.55), transparent)', filter: 'blur(4px)' }} />
      <Img src={staticFile(file)} style={{ width: '100%', height: '100%', transform: `scaleX(${flip})`, filter: `brightness(${p.bright ?? 1}) sepia(${p.warm ?? 0.08}) drop-shadow(0 10px 18px rgba(0,0,0,.35))` }} />
    </div>
  );
};

// CapCut-style captions: 3–4 word groups, the spoken word pops in a red pill
// captions: each word materialises from nothing — its letters fly in from scattered points, spin and lock into place
// (morph-assemble, no blur/haze); the spoken word sits on a red pill
const rh = (n: number) => { const x = Math.sin(n * 91.7 + 13.3) * 43758.5453; return x - Math.floor(x); };
export const Captions: React.FC<{ words: { w: string; s: number; e: number }[]; t: number }> = ({ words, t }) => {
  const i = words.findIndex((w) => t >= w.s && t < w.e + 0.3); if (i < 0) return null;
  const g0 = Math.floor(i / 4) * 4; const grp = words.slice(g0, g0 + 4);
  return <div style={{ position: 'absolute', bottom: 70, left: 300, right: 300, textAlign: 'center', fontFamily: F.head, fontWeight: 900, fontSize: 58, letterSpacing: 0.5, textTransform: 'uppercase' }}>
    {grp.map((w, j) => { const idx = g0 + j; if (t < w.s - 0.08) return null; const cur = idx === i; const pk = k01(t, w.s, 0.18);
      return <span key={j} style={{ display: 'inline-block', margin: '0 10px', padding: '2px 14px', borderRadius: 12, color: '#fff', background: cur ? `rgba(215,25,32,${pk})` : 'transparent',
        textShadow: '0 4px 14px rgba(0,0,0,.65)', WebkitTextStroke: cur ? undefined : '2px rgba(0,0,0,.8)' }}>
        {w.w.split('').map((ch, q) => { const sd = idx * 31 + q * 7; const k = k01(t, w.s - 0.08 + q * 0.022, 0.32);
          const dx = (rh(sd) - 0.5) * 140 * (1 - k), dy = (rh(sd + 1) - 0.5) * 90 * (1 - k), r = (rh(sd + 2) - 0.5) * 120 * (1 - k);
          return <span key={q} style={{ display: 'inline-block', whiteSpace: 'pre', opacity: k, transform: `translate(${dx}px, ${dy}px) rotate(${r}deg) scale(${0.25 + 0.75 * k})` }}>{ch}</span>; })}
      </span>; })}
  </div>;
};

// film FX over the 2.5D plates: light leak on every cut, drifting flare, grain, vignette
export const FilmFX: React.FC<{ cuts: number[]; t: number }> = ({ cuts, t }) => {
  const rnd = (n: number) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
  const fr = Math.floor(t * 24);
  return <AbsoluteFill style={{ pointerEvents: 'none' }}>
    {cuts.map((c, i) => { const u = (t - c) / 1.1; if (u < 0 || u > 1) return null;
      return <AbsoluteFill key={i} style={{ mixBlendMode: 'screen', opacity: Math.sin(u * Math.PI) * 0.7, background: `linear-gradient(${105 + (i % 3) * 25}deg, transparent 15%, rgba(255,170,90,.6) 45%, rgba(255,80,60,.35) 56%, transparent 85%)`, transform: `translateX(${interpolate(u, [0, 1], [-40, 40])}%)` }} />; })}
    <AbsoluteFill style={{ mixBlendMode: 'screen' }}>
      <div style={{ position: 'absolute', top: `${20 + Math.sin(t * 0.13) * 6}%`, left: `${-30 + ((t * 2.4) % 150)}%`, width: '60%', height: 3, background: 'linear-gradient(90deg, transparent, rgba(255,215,170,.6), transparent)', filter: 'blur(2px)', opacity: 0.55 }} />
      <div style={{ position: 'absolute', top: `${6 + Math.sin(t * 0.2) * 4}%`, left: `${72 + Math.sin(t * 0.1) * 8}%`, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(255,200,140,.30), transparent)', opacity: 0.6 + 0.3 * Math.sin(t * 0.7) }} />
    </AbsoluteFill>
    <AbsoluteFill style={{ opacity: 0.08, backgroundImage: 'radial-gradient(rgba(255,255,255,.9) 1px, transparent 1px)', backgroundSize: `${3 + rnd(fr) * 2}px ${3 + rnd(fr + 1) * 2}px`, backgroundPosition: `${rnd(fr + 2) * 50}px ${rnd(fr + 3) * 50}px` }} />
  </AbsoluteFill>;
};

export const PANELS_STUDIO: Record<string, React.FC<{ p: Pn; c: Ctx }>> = { glasswin: GlassWin, mascot: Mascot };
