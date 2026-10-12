// TAX SECRETS CANADA — kinetic typography (LF-03+): text morphing, decode reveal, word-by-word rise, rolling numbers.
// Pure functions of time; every value shown still comes from episode data.
import React from 'react';
import { easeOut } from './Effects';

const cl = (v: number) => Math.max(0, Math.min(1, v));
const rnd = (n: number) => { const x = Math.sin(n * 91.7 + 17.3) * 43758.5453; return x - Math.floor(x); };

// 1. MORPH: one phrase melts into the next (gooey blur-threshold morph, like liquid letters)
export const MorphText: React.FC<{ seq: { text: string; t: number }[]; now: number; size: number; color?: string; dur?: number; id: string; style?: React.CSSProperties }> = ({ seq, now, size, color = '#F4F1EA', dur = 0.9, id, style }) => {
  let i = 0; for (let j = 0; j < seq.length; j++) if (now >= seq[j].t) i = j;
  const next = seq[i + 1]; const into = next ? cl((now - (next.t - dur)) / dur) : 0;
  const k = easeOut(into);
  const blurA = Math.min(k * 14, 14), blurB = Math.min((1 - k) * 14, 14);
  const fid = `goo-${id}`;
  return (
    <div style={{ position: 'relative', height: size * 1.15, ...style }}>
      <svg width="0" height="0" style={{ position: 'absolute' }}><filter id={fid}><feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 26 -11" /></filter></svg>
      <div style={{ position: 'absolute', inset: 0, filter: k > 0.001 && k < 0.999 ? `url(#${fid})` : undefined }}>
        <div style={{ position: 'absolute', inset: 0, fontSize: size, color, opacity: 1 - k * k, filter: `blur(${blurA}px)`, whiteSpace: 'nowrap', lineHeight: 1.1, textAlign: 'inherit' }}>{seq[i].text}</div>
        {next && k > 0 && <div style={{ position: 'absolute', inset: 0, fontSize: size, color, opacity: Math.sqrt(k), filter: `blur(${blurB}px)`, whiteSpace: 'nowrap', lineHeight: 1.1, textAlign: 'inherit' }}>{next.text}</div>}
      </div>
    </div>
  );
};

// 2. DECODE: letters scramble, then lock in left → right (analysis feel)
const GLYPHS = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789$%#';
export const DecodeText: React.FC<{ text: string; t: number; now: number; dur?: number; style?: React.CSSProperties }> = ({ text, t, now, dur = 0.9, style }) => {
  const u = cl((now - t) / dur); const frame = Math.floor(now * 24);
  return <span style={style}>{text.split('').map((ch, i) => {
    const lock = i / Math.max(1, text.length) * 0.8; if (ch === ' ') return ' ';
    if (u >= lock + 0.2) return <span key={i}>{ch}</span>;
    if (u < lock) return <span key={i} style={{ opacity: 0.15 }}>{GLYPHS[Math.floor(rnd(i + frame) * GLYPHS.length)]}</span>;
    return <span key={i} style={{ color: '#E8C27A' }}>{GLYPHS[Math.floor(rnd(i * 7 + frame) * GLYPHS.length)]}</span>;
  })}</span>;
};

// 3. WORDS: each word rises out of a blur, staggered (film-title kinetic line)
export const WordsRise: React.FC<{ text: string; t: number; now: number; gap?: number; style?: React.CSSProperties; gold?: (w: string) => boolean; goldStyle?: React.CSSProperties }> = ({ text, t, now, gap = 0.11, style, gold, goldStyle }) => (
  <span style={style}>{text.split(' ').map((w, i) => {
    const k = easeOut(cl((now - t - i * gap) / 0.55));
    return <span key={i} style={{ display: 'inline-block', marginRight: '0.26em', opacity: k, filter: `blur(${(1 - k) * 10}px)`, transform: `translateY(${(1 - k) * 0.5}em) scale(${0.9 + 0.1 * k})`, ...(gold?.(w) ? goldStyle : {}) }}>{w}</span>;
  })}</span>
);

// 4. ROLL: odometer digits roll to the real value (each digit column spins, settling left → right)
export const RollNumber: React.FC<{ value: number; t: number; now: number; prefix?: string; dur?: number; size: number; style?: React.CSSProperties }> = ({ value, t, now, prefix = '$', dur = 1.2, size, style }) => {
  const s = Math.round(value).toLocaleString('en-CA'); let di = 0; const nd = s.replace(/\D/g, '').length;
  return (
    <span style={{ display: 'inline-flex', fontSize: size, lineHeight: 1, ...style }}>
      {prefix && <span>{prefix}</span>}
      {s.split('').map((ch, i) => {
        if (!/\d/.test(ch)) return <span key={i}>{ch}</span>;
        const d = +ch; const order = di++; const k = easeOut(cl((now - t - order * (dur * 0.35) / nd) / (dur * 0.65)));
        const pos = (d + 10 * (2 - order % 2)) * k; // spins through 1–2 extra turns
        return <span key={i} style={{ display: 'inline-block', height: '1em', overflow: 'hidden', position: 'relative', width: '0.54em', fontVariantNumeric: 'tabular-nums' }}>
          <span style={{ position: 'absolute', left: 0, right: 0, top: 0, textAlign: 'center', transform: `translateY(${-(pos % 10) * 1}em)`, filter: k < 1 ? `blur(${(1 - k) * 2.5}px)` : undefined }}>
            {Array.from({ length: 11 }, (_, n) => <div key={n} style={{ height: '1em' }}>{n % 10}</div>)}
          </span>
        </span>;
      })}
    </span>
  );
};
