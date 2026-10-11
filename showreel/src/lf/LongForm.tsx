// TAX SECRETS CANADA — long-form engine ("machine #1").
// One reusable 16:9 composition driven by an episode JSON (see longform/ENGINE.md).
// Per episode only data changes: events, numbers, contenders, scores, audio, plate.
import React from 'react';
import { AbsoluteFill, Audio, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, Easing } from 'remotion';

export type Ev = { t: number; dur: number; type: string; [k: string]: any };
export type Episode = {
  fps: number; duration?: number; plate?: string; audio?: string; music?: string; musicVol?: number;
  footer?: string; chapters?: { t: number; title: string }[]; events: Ev[];
};

const C = { gold: '#E8C27A', gold2: '#B88A3E', white: '#F5F2EA', dim: 'rgba(245,242,234,.62)', red: '#D52B1E', green: '#7FC79A', bad: '#E07A6A', glass: 'rgba(18,20,26,.55)', line: 'rgba(255,255,255,.14)' };
const F = { sans: 'Mont, Montserrat, sans-serif', serif: 'Fraunces, serif', mono: 'Tape, monospace' };
const goldText: React.CSSProperties = { background: `linear-gradient(180deg,#FFE7B0 0%,${C.gold} 45%,${C.gold2} 100%)`, WebkitBackgroundClip: 'text', color: 'transparent' };
const ease = Easing.bezier(0.22, 1, 0.36, 1);

export const lfDuration = (ep: Episode) =>
  Math.ceil((ep.duration ?? Math.max(...ep.events.map((e) => e.t + e.dur)) + 1) * ep.fps);

// ---------- persistent world ----------
const noise = (t: number, s: number) => Math.sin(t * 0.37 + s) * 0.6 + Math.sin(t * 0.13 + s * 2.1) * 0.4;

const Desk: React.FC<{ plate?: string; t: number }> = ({ plate, t }) => {
  const push = 1.06 + t * 0.0004;
  const x = noise(t, 1) * 14, y = noise(t, 4) * 8;
  return (
    <AbsoluteFill style={{ background: '#0B0C10', overflow: 'hidden' }}>
      {plate ? (
        <Img src={staticFile(plate)} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: `translate(${x}px,${y}px) scale(${push})`, filter: 'blur(1.2px) brightness(.62)' }} />
      ) : (
        <AbsoluteFill style={{ transform: `translate(${x}px,${y}px) scale(${push})`,
          background: `radial-gradient(60% 55% at ${38 + noise(t, 7) * 2}% 30%, rgba(255,196,120,.30), transparent 70%),
                       radial-gradient(50% 40% at 80% 85%, rgba(213,43,30,.10), transparent 70%),
                       linear-gradient(180deg,#14151B 0%,#0B0C10 60%,#1A140E 100%)` }} />
      )}
      {/* window light breathing */}
      <AbsoluteFill style={{ background: 'linear-gradient(115deg, rgba(255,230,190,.08) 0%, transparent 40%)', opacity: 0.6 + 0.4 * Math.sin(t * 0.21) }} />
      {/* dust motes */}
      {Array.from({ length: 26 }).map((_, i) => {
        const px = ((i * 137.5) % 100) + Math.sin(t * 0.2 + i) * 2, py = (((i * 61.8) % 100) - t * (0.6 + (i % 5) * 0.15)) % 100;
        return <div key={i} style={{ position: 'absolute', left: `${px}%`, top: `${(py + 100) % 100}%`, width: 3, height: 3, borderRadius: 9, background: 'rgba(255,225,170,.35)', filter: 'blur(1px)' }} />;
      })}
      <AbsoluteFill style={{ background: 'radial-gradient(120% 90% at 50% 45%, transparent 55%, rgba(0,0,0,.65) 100%)' }} />
    </AbsoluteFill>
  );
};

const Flag: React.FC<{ h?: number }> = ({ h = 22 }) => (
  <svg width={h * 2} height={h} viewBox="0 0 40 20" style={{ borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,.4)' }}>
    <rect width="40" height="20" fill="#fff" /><rect width="10" height="20" fill={C.red} /><rect x="30" width="10" height="20" fill={C.red} />
    <path fill={C.red} d="M20 3.2l1.1 2.1 1.2-.6-.5 3 1.6-1.6.3.9 1.6-.3-.5 1.7.7.4-2.6 2.2.3.9-2.3-.3.1 2.6h-.6l.1-2.6-2.3.3.3-.9-2.6-2.2.7-.4-.5-1.7 1.6.3.3-.9 1.6 1.6-.5-3 1.2.6z" />
  </svg>
);

const Chrome: React.FC<{ ep: Episode; t: number }> = ({ ep, t }) => {
  const total = (ep.duration ?? Math.max(...ep.events.map((e) => e.t + e.dur)));
  const ch = [...(ep.chapters ?? [])].reverse().find((c) => c.t <= t);
  return (
    <AbsoluteFill style={{ fontFamily: F.sans, color: C.white }}>
      <div style={{ position: 'absolute', top: 40, right: 56, display: 'flex', alignItems: 'center', gap: 14, fontSize: 18, letterSpacing: 4, fontWeight: 700, opacity: 0.9 }}>
        TAX SECRETS CANADA <Flag />
      </div>
      {ch && <div style={{ position: 'absolute', top: 44, left: 56, fontSize: 17, letterSpacing: 3, color: C.dim, fontWeight: 600 }}>{ch.title.toUpperCase()}</div>}
      <div style={{ position: 'absolute', bottom: 34, left: 56, fontSize: 16, color: C.dim, letterSpacing: 1 }}>{ep.footer ?? 'Source: canada.ca · General info, not advice'}</div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, height: 4, width: `${Math.min(1, t / total) * 100}%`, background: `linear-gradient(90deg,${C.gold2},${C.gold})` }} />
    </AbsoluteFill>
  );
};

// ---------- building blocks ----------
const useIn = (lf: number, fps: number, delay = 0) => spring({ frame: lf - delay * fps, fps, config: { damping: 200 }, durationInFrames: Math.round(fps * 0.7) });
const outOp = (lf: number, durF: number, fps: number) => interpolate(lf, [durF - fps * 0.45, durF], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

const Glass: React.FC<{ style?: React.CSSProperties; children: React.ReactNode; sweep?: number }> = ({ style, children, sweep = 1 }) => (
  <div style={{ position: 'relative', background: C.glass, border: `1px solid ${C.line}`, borderRadius: 22, boxShadow: '0 30px 80px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,255,255,.12)', overflow: 'hidden', ...style }}>
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(100deg,transparent 30%,rgba(255,255,255,.10) 50%,transparent 70%)', transform: `translateX(${(sweep * 2.2 - 1.1) * 100}%)` }} />
    {children}
  </div>
);
const Over: React.FC<{ text: string }> = ({ text }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 20, letterSpacing: 5, fontWeight: 700, color: C.dim }}>
    <div style={{ width: 34, height: 2, background: C.gold }} />{text.toUpperCase()}
  </div>
);
const Typed: React.FC<{ text: string; lf: number; fps: number; cps?: number; style?: React.CSSProperties }> = ({ text, lf, fps, cps = 38, style }) => {
  const n = Math.floor((lf / fps) * cps);
  return <span style={style}>{text.slice(0, n)}<span style={{ opacity: n < text.length && Math.floor(lf / 8) % 2 ? 1 : 0 }}>▍</span></span>;
};
const money = (v: number, p = '$') => p + Math.round(v).toLocaleString('en-CA');
const Counter: React.FC<{ to: number; lf: number; fps: number; prefix?: string; suffix?: string; dec?: number }> = ({ to, lf, fps, prefix = '$', suffix = '', dec = 0 }) => {
  const v = interpolate(lf, [0, fps * 1.1], [0, to], { extrapolateRight: 'clamp', easing: ease });
  return <>{dec ? prefix + v.toFixed(dec) : money(v, prefix)}{suffix}</>;
};

// ---------- event types ----------
type P = { e: Ev; lf: number; fps: number; durF: number };

const Hook: React.FC<P> = ({ e, lf, fps }) => (
  <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 40 }}>
    <div style={{ display: 'flex', gap: 36, alignItems: 'center' }}>
      {e.items.map((it: any, i: number) => {
        const s = useIn(lf, fps, 0.25 * i);
        return (<React.Fragment key={i}>
          {i > 0 && <div style={{ fontFamily: F.serif, fontSize: 44, color: C.dim, opacity: s }}>VS</div>}
          <Glass sweep={s} style={{ padding: '34px 46px', minWidth: 330, textAlign: 'center', opacity: s, transform: `translateY(${(1 - s) * 60}px)` }}>
            <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: 1 }}>{it.name}</div>
            {it.value && <div style={{ fontFamily: F.serif, fontSize: 84, fontWeight: 800, marginTop: 8, ...goldText }}>{it.value}</div>}
          </Glass>
        </React.Fragment>);
      })}
    </div>
    {e.question && <div style={{ fontFamily: F.serif, fontSize: 64, fontWeight: 800, opacity: useIn(lf, fps, 0.3 * e.items.length + 0.3) }}>{e.question}</div>}
  </AbsoluteFill>
);

const Chapter: React.FC<P> = ({ e, lf, fps }) => {
  const s = useIn(lf, fps);
  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column', background: `rgba(5,6,9,${0.55 * s})` }}>
      <div style={{ fontFamily: F.serif, fontSize: 150, fontWeight: 800, ...goldText, opacity: s, transform: `scale(${0.9 + 0.1 * s})` }}>{e.num}</div>
      <div style={{ width: 120 * s, height: 2, background: C.gold, margin: '18px 0 26px' }} />
      <div style={{ fontSize: 54, fontWeight: 800, letterSpacing: 6 }}><Typed text={e.title.toUpperCase()} lf={lf - fps * 0.3} fps={fps} /></div>
    </AbsoluteFill>
  );
};

const Card: React.FC<P> = ({ e, lf, fps }) => {
  const s = useIn(lf, fps), n = useIn(lf, fps, 0.25);
  const pos: React.CSSProperties = e.side === 'right' ? { right: 110 } : e.side === 'center' ? { left: '50%', transform: 'translateX(-50%)' } : { left: 110 };
  return (
    <div style={{ position: 'absolute', bottom: 150, ...pos }}>
      <Glass sweep={s} style={{ padding: '38px 54px', minWidth: 640, opacity: s, translate: `0 ${(1 - s) * 50}px` }}>
        <Over text={e.label} />
        <div style={{ overflow: 'hidden', marginTop: 14 }}>
          <div style={{ fontFamily: F.serif, fontSize: 130, fontWeight: 800, lineHeight: 1.05, ...goldText, transform: `translateY(${(1 - n) * 100}%)` }}>
            {typeof e.value === 'number' ? <Counter to={e.value} lf={lf - fps * 0.25} fps={fps} prefix={e.prefix ?? '$'} suffix={e.suffix ?? ''} dec={e.dec} /> : e.value}
          </div>
        </div>
        <div style={{ height: 1, width: `${n * 100}%`, background: `linear-gradient(90deg,${C.gold},transparent)`, margin: '10px 0 18px' }} />
        {e.line && <div style={{ fontSize: 30, color: C.dim, maxWidth: 760 }}><Typed text={e.line} lf={lf - fps * 0.6} fps={fps} /></div>}
      </Glass>
    </div>
  );
};

const Caption: React.FC<P> = ({ e, lf, fps }) => (
  <div style={{ position: 'absolute', top: 120, left: 56, maxWidth: 1100, fontFamily: F.mono, fontSize: 40, lineHeight: 1.35, textShadow: '0 2px 18px rgba(0,0,0,.8)' }}>
    <Typed text={e.text} lf={lf} fps={fps} cps={e.cps ?? 30} />
  </div>
);

const Contenders: React.FC<P> = ({ e, lf, fps }) => (
  <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
    {e.title && <div style={{ position: 'absolute', top: 150 }}><Over text={e.title} /></div>}
    <div style={{ display: 'flex', gap: 28 }}>
      {e.items.map((it: any, i: number) => {
        const s = useIn(lf, fps, 0.35 * i), hl = e.focus === undefined || e.focus === i;
        return (
          <Glass key={i} sweep={s} style={{ width: 1500 / e.items.length - 28, padding: '36px 34px', opacity: s * (hl ? 1 : 0.4), transform: `translateY(${(1 - s) * 70}px) scale(${hl && e.focus !== undefined ? 1.04 : 1})`, borderColor: hl && e.focus !== undefined ? C.gold : C.line }}>
            <div style={{ width: 58, height: 58, borderRadius: 16, display: 'grid', placeItems: 'center', fontSize: 28, fontWeight: 800, background: it.color ?? 'rgba(232,194,122,.16)', color: C.gold }}>{it.badge ?? it.name[0]}</div>
            <div style={{ fontSize: 36, fontWeight: 800, marginTop: 22 }}>{it.name}</div>
            {it.value && <div style={{ fontFamily: F.serif, fontSize: 56, fontWeight: 800, marginTop: 6, ...goldText }}>{it.value}</div>}
            {it.tag && <div style={{ fontSize: 24, color: C.dim, marginTop: 12, lineHeight: 1.35 }}>{it.tag}</div>}
          </Glass>
        );
      })}
    </div>
  </AbsoluteFill>
);

// rows: [{name, scores:[0..5|null]}]; reveal: index of last criterion revealed (scores beyond are hidden)
const Score: React.FC<P> = ({ e, lf, fps }) => {
  const s = useIn(lf, fps);
  const reveal = e.reveal ?? e.criteria.length - 1;
  const totals = e.rows.map((r: any) => r.scores.slice(0, reveal + 1).reduce((a: number, b: number | null) => a + (b ?? 0), 0));
  const best = Math.max(...totals);
  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Glass sweep={s} style={{ padding: '40px 56px', opacity: s }}>
        <Over text={e.title ?? 'Face-off score'} />
        <table style={{ borderCollapse: 'collapse', marginTop: 24, fontSize: 30 }}>
          <thead><tr><td />{e.criteria.map((c: string, j: number) => <td key={j} style={{ padding: '6px 26px', fontSize: 19, letterSpacing: 3, color: j <= reveal ? C.dim : 'rgba(255,255,255,.2)', fontWeight: 700, textAlign: 'center' }}>{c.toUpperCase()}</td>)}<td style={{ padding: '6px 26px', fontSize: 19, letterSpacing: 3, color: C.gold, fontWeight: 700 }}>TOTAL</td></tr></thead>
          <tbody>{e.rows.map((r: any, i: number) => (
            <tr key={i} style={{ borderTop: `1px solid ${C.line}` }}>
              <td style={{ padding: '18px 26px 18px 0', fontWeight: 800, fontSize: 32 }}>{r.name}</td>
              {r.scores.map((v: number | null, j: number) => {
                const k = j === reveal ? useIn(lf, fps, 0.4 + 0.15 * i) : j < reveal ? 1 : 0;
                return <td key={j} style={{ textAlign: 'center', opacity: k }}>{v === null ? '—' : <span>{'●'.repeat(v)}<span style={{ opacity: 0.2 }}>{'●'.repeat(5 - v)}</span></span>}</td>;
              })}
              <td style={{ textAlign: 'center', fontFamily: F.serif, fontWeight: 800, fontSize: 44, ...(totals[i] === best && e.lead ? goldText : {}) }}>{totals[i]}</td>
            </tr>))}</tbody>
        </table>
      </Glass>
    </AbsoluteFill>
  );
};

// horizontal bars: items [{label, value}] ; values in $ unless unit given
const Bars: React.FC<P> = ({ e, lf, fps }) => {
  const max = Math.max(...e.items.map((i: any) => i.value));
  return (
    <AbsoluteFill style={{ justifyContent: 'center', padding: '0 180px' }}>
      <Over text={e.title} />
      <div style={{ marginTop: 34, display: 'flex', flexDirection: 'column', gap: 22 }}>
        {e.items.map((it: any, i: number) => {
          const s = useIn(lf, fps, 0.3 * i);
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 26, opacity: s }}>
              <div style={{ width: 320, fontSize: 32, fontWeight: 700, textAlign: 'right' }}>{it.label}</div>
              <div style={{ height: 46, borderRadius: 10, width: `${(it.value / max) * 62 * s}%`, background: it.hl ? `linear-gradient(90deg,${C.gold2},${C.gold})` : 'rgba(255,255,255,.22)' }} />
              <div style={{ fontFamily: F.serif, fontSize: 44, fontWeight: 800, ...(it.hl ? goldText : {}) }}>{it.text ?? money(it.value * s, e.prefix ?? '$')}</div>
            </div>);
        })}
      </div>
    </AbsoluteFill>
  );
};

// step flow: steps [{label, value, sign}] e.g. gross → minus federal → ... → take-home
const Flow: React.FC<P> = ({ e, lf, fps }) => (
  <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
    <Glass sweep={useIn(lf, fps)} style={{ padding: '40px 60px', minWidth: 900 }}>
      <Over text={e.title} />
      {e.steps.map((st: any, i: number) => {
        const s = useIn(lf, fps, (e.gap ?? 0.8) * i);
        const last = i === e.steps.length - 1;
        return (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '16px 0', borderTop: last ? `2px solid ${C.gold}` : i ? `1px solid ${C.line}` : 'none', opacity: s, transform: `translateX(${(1 - s) * -40}px)`, marginTop: last ? 10 : 0 }}>
            <div style={{ fontSize: last ? 36 : 30, fontWeight: last ? 800 : 600 }}>{st.label}</div>
            <div style={{ fontFamily: F.serif, fontSize: last ? 72 : 46, fontWeight: 800, color: st.sign === '-' ? C.bad : C.white, ...(last ? goldText : {}) }}>{st.sign === '-' ? '−' : ''}{typeof st.value === 'number' ? money(st.value) : st.value}</div>
          </div>);
      })}
    </Glass>
  </AbsoluteFill>
);

const Verdict: React.FC<P> = ({ e, lf, fps }) => (
  <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 26 }}>
    <div style={{ fontFamily: F.serif, fontSize: 72, fontWeight: 800, ...goldText, opacity: useIn(lf, fps) }}>{e.title ?? 'THE VERDICT'}</div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 640px)', gap: 22 }}>
      {e.awards.map((a: any, i: number) => {
        const s = useIn(lf, fps, 0.6 + (e.gap ?? 1.2) * i);
        return <Glass key={i} sweep={s} style={{ padding: '26px 34px', opacity: s, transform: `scale(${0.94 + 0.06 * s})` }}><Over text={a.label} /><div style={{ fontSize: 44, fontWeight: 800, marginTop: 10 }}>{a.name}</div>{a.why && <div style={{ fontSize: 24, color: C.dim, marginTop: 6 }}>{a.why}</div>}</Glass>;
      })}
    </div>
  </AbsoluteFill>
);

const Statement: React.FC<P> = ({ e, lf, fps }) => (
  <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: '0 200px', textAlign: 'center' }}>
    {e.label && <Over text={e.label} />}
    <div style={{ fontFamily: F.serif, fontSize: e.size ?? 76, fontWeight: 800, lineHeight: 1.15, marginTop: 20, opacity: useIn(lf, fps), ...(e.gold ? goldText : {}) }}>{e.text}</div>
    {e.sub && <div style={{ fontSize: 32, color: C.dim, marginTop: 24 }}><Typed text={e.sub} lf={lf - fps * 0.6} fps={fps} /></div>}
  </AbsoluteFill>
);

const REG: Record<string, React.FC<P>> = { hook: Hook, chapter: Chapter, card: Card, caption: Caption, contenders: Contenders, score: Score, bars: Bars, flow: Flow, verdict: Verdict, statement: Statement };

// ---------- composition ----------
export const LongForm: React.FC<{ ep: Episode }> = ({ ep }) => {
  const f = useCurrentFrame(), { fps } = useVideoConfig(), t = f / fps;
  return (
    <AbsoluteFill style={{ fontFamily: F.sans, color: C.white }}>
      <Desk plate={ep.plate} t={t} />
      {ep.events.filter((e) => t >= e.t && t < e.t + e.dur).map((e, i) => {
        const Comp = REG[e.type]; if (!Comp) return null;
        const lf = f - Math.round(e.t * fps), durF = Math.round(e.dur * fps);
        const push = 1 + (lf / durF) * (e.push ?? 0.025); // motivated slow push per event
        return <AbsoluteFill key={`${e.t}-${i}`} style={{ opacity: outOp(lf, durF, fps), transform: `scale(${push})` }}><Comp e={e} lf={lf} fps={fps} durF={durF} /></AbsoluteFill>;
      })}
      <Chrome ep={ep} t={t} />
      {ep.audio && <Audio src={staticFile(ep.audio)} />}
      {ep.music && <Audio src={staticFile(ep.music)} volume={ep.musicVol ?? 0.08} loop />}
    </AbsoluteFill>
  );
};
