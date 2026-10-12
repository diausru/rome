// TAX SECRETS CANADA — LF-03 panel set: kinetic headlines, paycheque waterfall, money splits, $100 bar, day clock.
// Every number arrives from episode data (data.json via build.py refs).
import React from 'react';
import { easeOut } from './Effects';
import { MorphText, DecodeText, WordsRise, RollNumber } from './Kinetic';
import { T, Title } from './Panels2';

const C = { gold: '#E8C27A', gold2: '#B88A3E', white: '#F4F1EA', dim: 'rgba(244,241,234,.66)', faint: 'rgba(244,241,234,.40)', red: '#E5806E', green: '#7FD3A0', blue: '#8FB3E8', line: 'rgba(255,255,255,.14)', hl: 'rgba(232,194,122,.14)' };
const gold: React.CSSProperties = { background: `linear-gradient(180deg,#FFE7B0 0%,${C.gold} 45%,${C.gold2} 100%)`, WebkitBackgroundClip: 'text', color: 'transparent' };
type Ctx = { now: number; fps: number; end: number };
type Pn = { [k: string]: any };
const R = (x: any) => (x && typeof x === 'object' && ('ref' in x || 'expr' in x) ? x.value : x);
const k01 = (now: number, t: number, d = 0.45) => easeOut(Math.max(0, Math.min(1, (now - t) / d)));
const money = (v: number) => '$' + Math.round(v).toLocaleString('en-CA');

// kinetic headline: each line picks an animation — words | decode | morph | roll
const KHero: React.FC<{ p: Pn; c: Ctx }> = ({ p, c }) => (
  <div style={{ textAlign: p.align ?? 'center', fontFamily: T.cond, fontWeight: 700, textTransform: 'uppercase', textShadow: '0 6px 40px rgba(0,0,0,.6)' }}>
    {p.kicker && <div style={{ fontSize: 26, letterSpacing: 8, color: C.gold, marginBottom: 12, fontWeight: 500 }}><DecodeText text={p.kicker.toUpperCase()} t={p.t} now={c.now} dur={0.7} /></div>}
    {(p.lines as Pn[]).map((ln, i) => {
      const t = ln.t ?? p.t + i * 0.4; if (c.now < t) return <div key={i} style={{ height: (ln.size ?? p.size ?? 100) * 1.08 }} />;
      const size = ln.size ?? p.size ?? 100;
      if (ln.anim === 'roll') return <div key={i} style={{ color: C.gold, lineHeight: 1.05, textShadow: '0 0 40px rgba(232,194,122,.35)' }}><RollNumber value={R(ln.value)} t={t} now={c.now} size={size} prefix={ln.prefix ?? '$'} /></div>;
      if (ln.anim === 'decode') return <div key={i} style={{ fontSize: size, lineHeight: 1.05, ...(ln.gold ? gold : {}) }}><DecodeText text={ln.text} t={t} now={c.now} /></div>;
      if (ln.anim === 'morph') return <MorphText key={i} id={`${p.t}-${i}`} seq={ln.seq} now={c.now} size={size} color={ln.gold ? C.gold : C.white} />;
      return <div key={i} style={{ fontSize: size, lineHeight: 1.05 }}><WordsRise text={ln.text} t={t} now={c.now} gold={(w) => /^\*.*\*$/.test(w) || (ln.goldWords ?? []).includes(w)} goldStyle={{ color: C.gold }} /></div>;
    })}
    {p.sub && c.now >= (p.subAt?.t ?? p.t + 0.8) && <div style={{ marginTop: 16, fontSize: 34, letterSpacing: 4, color: C.dim, fontWeight: 500 }}><WordsRise text={p.sub} t={p.subAt?.t ?? p.t + 0.8} now={c.now} gap={0.06} /></div>}
  </div>
);

// paycheque / annual waterfall: gross rolls in, each deduction peels off a bar, balance rolls down
const Pay: React.FC<{ p: Pn; c: Ctx }> = ({ p, c }) => {
  const gross = R(p.gross); const rows = p.rows as Pn[]; const W = p.barW ?? 900;
  let bal = gross; const shownBal = rows.reduce((b, r) => (c.now >= r.t ? b - R(r.value) : b), gross);
  const finalT = p.finalAt?.t ?? Infinity;
  return (
    <div>
      <Title text={p.title} sub={p.sub} size={34} />
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', margin: '4px 0 14px' }}>
        <div style={{ fontFamily: T.cond, fontSize: 30, letterSpacing: 2, color: C.dim }}>{p.grossLabel ?? 'GROSS'}</div>
        <span style={{ fontFamily: T.cond, fontWeight: 700, color: C.gold }}><RollNumber value={gross} t={p.t + 0.2} now={c.now} size={64} /></span>
      </div>
      <div style={{ position: 'relative', height: 30, background: 'rgba(255,255,255,.06)', borderRadius: 8, overflow: 'hidden', marginBottom: 16, width: W }}>
        <div style={{ position: 'absolute', inset: 0, width: `${(shownBal / gross) * 100}%`, background: `linear-gradient(90deg,${C.green},#5FB585)`, transition: 'none' }} />
        {rows.map((r, i) => { const k = k01(c.now, r.t, 0.6); const prev = gross - rows.slice(0, i).reduce((a, x) => a + R(x.value), 0); const v = R(r.value);
          return c.now >= r.t ? <div key={i} style={{ position: 'absolute', top: 0, bottom: 0, left: `${((prev - v) / gross) * 100}%`, width: `${(v / gross) * 100}%`, background: r.color ?? C.red, opacity: 0.9, transform: `scaleY(${k})`, borderLeft: '2px solid rgba(0,0,0,.4)' }} /> : null; })}
      </div>
      {rows.map((r, i) => {
        const k = k01(c.now, r.t, 0.5); const v = R(r.value); bal -= v; if (c.now < r.t) return <div key={i} style={{ height: 50 }} />;
        return (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 220px', alignItems: 'baseline', padding: '6px 0', opacity: k, transform: `translateX(${(1 - k) * -40}px)` }}>
            <div style={{ fontFamily: T.cond, fontSize: 32, letterSpacing: 1.5 }}><span style={{ display: 'inline-block', width: 14, height: 14, borderRadius: 3, background: r.color ?? C.red, marginRight: 14 }} />{r.label}</div>
            <div style={{ fontFamily: T.cond, fontWeight: 700, fontSize: 42, textAlign: 'right', color: r.color ?? C.red }}>−<RollNumber value={v} t={r.t} now={c.now} size={42} dur={0.8} /></div>
          </div>);
      })}
      {c.now >= finalT && <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderTop: `2px solid ${C.gold}`, marginTop: 10, paddingTop: 12, opacity: k01(c.now, finalT) }}>
        <div style={{ fontFamily: T.cond, fontSize: 36, fontWeight: 600, letterSpacing: 2 }}>{p.finalLabel ?? 'TAKE-HOME'}</div>
        <span style={{ fontFamily: T.cond, fontWeight: 700, color: C.green }}><RollNumber value={shownBal} t={finalT} now={c.now} size={76} /></span>
      </div>}
    </div>
  );
};

// split of one amount into categories (illustrative allocation): bars grow as each line is narrated
const Split: React.FC<{ p: Pn; c: Ctx }> = ({ p, c }) => {
  const items = R(p.items) as Pn[]; const total = items.reduce((a, x) => a + x.value, 0); const max = Math.max(...items.map((x) => x.value));
  const order: number[] = p.order ?? items.map((_, i) => i);
  return (
    <div>
      <Title text={p.title} sub={p.sub} size={32} />
      {order.map((ix, j) => {
        const it = items[ix]; const t = p.rowAt?.[j]?.t ?? p.t + 0.3 + j * 0.5; const k = k01(c.now, t, 0.7);
        const act = c.now >= t && c.now < (p.rowAt?.[j + 1]?.t ?? Infinity);
        return (
          <div key={ix} style={{ display: 'grid', gridTemplateColumns: `${p.labelW ?? 520}px 1fr 150px`, alignItems: 'center', gap: 14, padding: '5px 10px', borderRadius: 8, background: act ? C.hl : 'transparent', opacity: c.now >= t ? 1 : 0.18 }}>
            <div style={{ fontFamily: T.cond, fontSize: p.fs ?? 25, letterSpacing: 1.2, color: act ? C.white : C.dim }}>{it.name}</div>
            <div style={{ height: 16, background: 'rgba(255,255,255,.05)', borderRadius: 4, overflow: 'hidden' }}><div style={{ height: '100%', width: `${(it.value / max) * 100 * k}%`, background: act ? `linear-gradient(90deg,${C.gold2},${C.gold})` : 'rgba(232,194,122,.55)' }} /></div>
            <div style={{ fontFamily: T.cond, fontWeight: 700, fontSize: p.vs ?? 34, textAlign: 'right', color: act ? C.gold : C.white }}>{c.now >= t ? <RollNumber value={it.value} t={t} now={c.now} size={p.vs ?? 34} dur={0.9} /> : ''}</div>
          </div>);
      })}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, paddingTop: 10, borderTop: `1px solid ${C.line}`, fontFamily: T.cond, fontSize: 22, letterSpacing: 2, color: C.faint }}>
        <span>{p.note ?? 'ILLUSTRATION: TAXES ARE NOT EARMARKED'}</span><span>TOTAL {money(total)}</span>
      </div>
    </div>
  );
};

// $100 bar: one hundred dollars split into labelled segments
const Hundred: React.FC<{ p: Pn; c: Ctx }> = ({ p, c }) => {
  const segs = p.segs as Pn[];
  return (
    <div>
      <Title text={p.title} sub={p.sub} size={34} />
      <div style={{ display: 'flex', height: 120, borderRadius: 14, overflow: 'hidden', background: 'rgba(255,255,255,.05)' }}>
        {segs.map((s, i) => { const k = k01(c.now, s.t, 0.8); const v = R(s.value); return <div key={i} style={{ width: `${v * k}%`, background: s.color, borderRight: '2px solid rgba(0,0,0,.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          {v > 8 && <span style={{ fontFamily: T.cond, fontWeight: 700, fontSize: 44, color: '#10131a', opacity: k }}>${v.toFixed(2)}</span>}</div>; })}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${segs.length}, 1fr)`, gap: 10, marginTop: 16 }}>
        {segs.map((s, i) => { const k = k01(c.now, s.t, 0.5); const v = R(s.value); return <div key={i} style={{ opacity: k, transform: `translateY(${(1 - k) * 18}px)` }}>
          <div style={{ width: 28, height: 6, background: s.color, borderRadius: 3, marginBottom: 8 }} />
          <div style={{ fontFamily: T.cond, fontSize: 24, letterSpacing: 1.5, color: C.dim }}>{s.label}</div>
          <div style={{ fontFamily: T.cond, fontWeight: 700, fontSize: 40, color: s.color }}>${v.toFixed(2)}</div></div>; })}
      </div>
    </div>
  );
};

// pay-by-pay strip: 26 pays; EI/CPP/CPP2 stop when the yearly maximums are reached
const Pays: React.FC<{ p: Pn; c: Ctx }> = ({ p, c }) => {
  const stops = p.stops as Pn[]; const n = 26;
  return (
    <div>
      <Title text={p.title} sub={p.sub} size={32} />
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${n}, 1fr)`, gap: 6, alignItems: 'end', height: 300 }}>
        {Array.from({ length: n }, (_, i) => {
          const k = k01(c.now, p.t + 0.2 + i * 0.04, 0.4); let h = 0.62;
          stops.forEach((s) => { if (c.now >= s.t && i + 1 > s.pay) h += s.bump; });
          const lit = stops.some((s) => c.now >= s.t && i + 1 === s.pay + 1);
          return <div key={i} style={{ height: `${h * 100 * k}%`, background: lit ? C.gold : h > 0.62 ? C.green : 'rgba(127,211,160,.55)', borderRadius: 4, boxShadow: lit ? `0 0 18px ${C.gold}` : undefined }} />;
        })}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${n}, 1fr)`, gap: 6, marginTop: 8, fontFamily: T.cond, fontSize: 16, color: C.faint, textAlign: 'center' }}>{Array.from({ length: n }, (_, i) => <div key={i}>{i + 1}</div>)}</div>
      <div style={{ display: 'flex', gap: 30, marginTop: 16 }}>
        {stops.map((s, i) => c.now >= s.t ? <div key={i} style={{ fontFamily: T.cond, fontSize: 26, letterSpacing: 1.5, opacity: k01(c.now, s.t) }}><span style={{ color: C.gold, fontWeight: 700 }}>PAY {s.pay + 1}+</span> {s.label}</div> : null)}
      </div>
    </div>
  );
};

// workday clock: 8-hour bar, income-tax minutes fill first
const Clock: React.FC<{ p: Pn; c: Ctx }> = ({ p, c }) => {
  const k = k01(c.now, p.t + 0.4, 1.6); const mins = p.minutes;
  return (
    <div>
      <Title text={p.title} sub={p.sub} size={32} />
      <div style={{ position: 'relative', height: 90, borderRadius: 12, overflow: 'hidden', background: 'rgba(127,211,160,.35)' }}>
        <div style={{ position: 'absolute', inset: 0, width: `${(mins / 480) * 100 * k}%`, background: `linear-gradient(90deg,${C.red},#E8A86A)` }} />
        {Array.from({ length: 9 }, (_, i) => <div key={i} style={{ position: 'absolute', top: 0, bottom: 0, left: `${(i / 8) * 100}%`, width: 1, background: 'rgba(0,0,0,.35)' }} />)}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: T.cond, fontSize: 20, color: C.faint, marginTop: 6 }}>{['9:00', '10:00', '11:00', '12:00', '1:00', '2:00', '3:00', '4:00', '5:00'].map((h) => <span key={h}>{h}</span>)}</div>
      <div style={{ marginTop: 16, fontFamily: T.cond, fontSize: 44, fontWeight: 700, opacity: k01(c.now, p.t + 1.6) }}>
        <span style={{ color: C.red }}>{Math.floor(mins / 60)} H {Math.round(mins % 60)} MIN</span> <span style={{ color: C.dim, fontWeight: 500, fontSize: 32 }}>{p.caption}</span>
      </div>
    </div>
  );
};

export const PANELS3: Record<string, React.FC<{ p: Pn; c: Ctx }>> = { khero: KHero, pay: Pay, split: Split, hundred: Hundred, pays: Pays, clock: Clock };
