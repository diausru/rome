// TAX SECRETS CANADA — code-only panel set v2 (LF-02+): ALL-CAPS condensed type, data from episode JSON only.
import React from 'react';
import { interpolate } from 'remotion';
import { staggerK, easeOut } from './Effects';

export const T = { cond: 'Oswald, Mont, sans-serif', sans: 'Mont, Montserrat, sans-serif' };
const C = { gold: '#E8C27A', gold2: '#B88A3E', white: '#F4F1EA', dim: 'rgba(244,241,234,.66)', faint: 'rgba(244,241,234,.40)', red: '#E5806E', green: '#7FD3A0', line: 'rgba(255,255,255,.14)', hl: 'rgba(232,194,122,.14)', canada: '#D52B1E' };
const gold: React.CSSProperties = { background: `linear-gradient(180deg,#FFE7B0 0%,${C.gold} 45%,${C.gold2} 100%)`, WebkitBackgroundClip: 'text', color: 'transparent' };
type Ctx = { now: number; fps: number; end: number };
type Pn = { [k: string]: any };
const k01 = (now: number, t: number, d = 0.4) => easeOut(Math.max(0, Math.min(1, (now - t) / d)));
const R = (x: any) => (x && typeof x === 'object' && ('ref' in x || 'expr' in x) ? x.value : x);
const isFree = (v: string) => /^\$0|FREE/.test(v);

export const Title: React.FC<{ text: string; sub?: string; size?: number }> = ({ text, sub, size = 30 }) => (
  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 20, marginBottom: 16 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <div style={{ width: 6, height: size * 0.9, background: C.gold, borderRadius: 2 }} />
      <div style={{ fontFamily: T.cond, fontSize: size, fontWeight: 600, letterSpacing: 2.5, textTransform: 'uppercase' }}>{text}</div>
    </div>
    {sub && <div style={{ fontFamily: T.cond, fontSize: 18, color: C.faint, letterSpacing: 2, textTransform: 'uppercase' }}>{sub}</div>}
  </div>
);

// hero headline: big ALL-CAPS line(s), optional gold words wrapped in *stars*, kicker + sub
const Hero: React.FC<{ p: Pn; c: Ctx }> = ({ p, c }) => {
  const lines: string[] = Array.isArray(p.text) ? p.text : [p.text];
  return (
    <div style={{ textAlign: p.align ?? 'center' }}>
      {p.kicker && <div style={{ fontFamily: T.cond, fontSize: 24, letterSpacing: 8, color: C.gold, marginBottom: 14, opacity: k01(c.now, p.t, 0.5) }}>{p.kicker.toUpperCase()}</div>}
      {lines.map((ln, i) => {
        const t = p.lineAt?.[i]?.t ?? p.t + i * 0.35; const k = k01(c.now, t, 0.55);
        return <div key={i} style={{ fontFamily: T.cond, fontWeight: 700, fontSize: p.size ?? 104, lineHeight: 1.04, letterSpacing: 1, textTransform: 'uppercase', opacity: k, transform: `translateY(${(1 - k) * 40}px)`, textShadow: '0 6px 40px rgba(0,0,0,.55)' }}>
          {ln.split(/(\*[^*]+\*)/).map((s, j) => s.startsWith('*') ? <span key={j} style={gold}>{s.slice(1, -1)}</span> : <span key={j}>{s}</span>)}
        </div>;
      })}
      {p.sub && <div style={{ marginTop: 20, fontFamily: T.cond, fontSize: 38, letterSpacing: 4, color: C.dim, textTransform: 'uppercase', opacity: k01(c.now, p.subAt?.t ?? p.t + 0.8, 0.5) }}>{p.sub}</div>}
    </div>
  );
};

// price ladder of one program: tiers light up one by one (synced to narration via rowAt)
const Tiers: React.FC<{ p: Pn; c: Ctx }> = ({ p, c }) => {
  const prog = R(p.value); const tiers = prog.tiers as string[][];
  return (
    <div>
      <Title text={prog.name} sub={p.sub ?? '2025 TAX YEAR · PER RETURN'} size={40} />
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${tiers.length}, 1fr)`, gap: 14 }}>
        {tiers.map((tr, i) => {
          const t = p.rowAt?.[Math.min(i, (p.rowAt?.length ?? 1) - 1)]?.t ?? p.t + 0.3 + i * 0.5; const k = k01(c.now, t, 0.45);
          const nextT = p.rowAt?.[i + 1]?.t ?? Infinity; const active = c.now >= t && c.now < nextT + 1.2;
          return (
            <div key={i} style={{ padding: '18px 18px 16px', borderRadius: 14, border: `1px solid ${active ? C.gold : C.line}`, background: active ? C.hl : 'rgba(255,255,255,.03)', opacity: 0.15 + 0.85 * k, transform: `translateY(${(1 - k) * 24}px)` }}>
              <div style={{ fontFamily: T.cond, fontSize: 22, letterSpacing: 3, color: C.dim }}>{tr[0]}</div>
              <div style={{ fontFamily: T.cond, fontWeight: 700, fontSize: 68, lineHeight: 1.1, ...(isFree(tr[2]) ? { color: C.green } : gold) }}>{tr[2]}</div>
              <div style={{ fontFamily: T.cond, fontSize: 19, letterSpacing: 2, color: C.faint }}>{tr[1]}</div>
            </div>);
        })}
      </div>
    </div>
  );
};

// the seven contenders: staggered cards, each with its entry price
const Lineup: React.FC<{ p: Pn; c: Ctx }> = ({ p, c }) => {
  const progs = R(p.value).programs; const order: string[] = R(p.value).order;
  return (
    <div>
      <Title text={p.title} sub={p.sub} size={36} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 12 }}>
        {order.map((id, i) => {
          const pr = progs[id]; const k = staggerK(c.now, p.t + 0.2, i, 0.16, 0.5);
          const on = p.focus?.find((f: Pn) => f.id === id && c.now >= f.t && c.now < (f.until?.t ?? f.t + 99));
          const lo = pr.tiers[0][2], hi = pr.tiers[pr.tiers.length - 1][2];
          return (
            <div key={id} style={{ padding: '20px 12px', borderRadius: 14, textAlign: 'center', border: `1px solid ${on ? C.gold : C.line}`, background: on ? C.hl : 'rgba(255,255,255,.03)', opacity: k, transform: `translateY(${(1 - k) * 30}px) scale(${on ? 1.04 : 1})` }}>
              <div style={{ fontFamily: T.cond, fontSize: 24, fontWeight: 600, letterSpacing: 1.5, minHeight: 64 }}>{pr.name}</div>
              <div style={{ fontFamily: T.cond, fontSize: 40, fontWeight: 700, color: isFree(lo) ? C.green : undefined, ...(isFree(lo) ? {} : gold) }}>{lo}</div>
              {pr.tiers.length > 1 && <div style={{ fontFamily: T.cond, fontSize: 20, color: C.faint, letterSpacing: 2 }}>UP TO {hi}</div>}
            </div>);
        })}
      </div>
    </div>
  );
};

// persona card for a round
const Persona: React.FC<{ p: Pn; c: Ctx }> = ({ p, c }) => (
  <div>
    <div style={{ fontFamily: T.cond, fontSize: 22, letterSpacing: 6, color: C.gold }}>{p.round}</div>
    <div style={{ fontFamily: T.cond, fontWeight: 700, fontSize: 120, lineHeight: 1, letterSpacing: 2 }}>{R(p.value).name}</div>
    <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
      {(p.chips as Pn[]).map((ch, i) => {
        const k = k01(c.now, ch.t ?? p.t + 0.4 + i * 0.4, 0.4);
        return <div key={i} style={{ alignSelf: 'flex-start', fontFamily: T.cond, fontSize: 28, letterSpacing: 2, padding: '8px 18px', borderRadius: 999, border: `1px solid ${C.line}`, background: 'rgba(255,255,255,.05)', opacity: k, transform: `translateX(${(1 - k) * -30}px)` }}>{ch.text}</div>;
      })}
    </div>
  </div>
);

// one round: program → cost for this person, rows revealed in sync with narration
const Round: React.FC<{ p: Pn; c: Ctx }> = ({ p, c }) => {
  const r = R(p.value); const progs = R(p.programs); const order: string[] = R(p.order);
  return (
    <div>
      <Title text={`WHAT ${r.name} PAYS`} sub="PUBLISHED PRICES · 2025 TAX YEAR" />
      {order.map((id, i) => {
        const row = p.rowAt?.find((x: Pn) => x.id === id); const t = row?.t ?? p.t + 0.3 + i * 0.3; const k = k01(c.now, t, 0.4);
        const [val, note] = r.cells[id]; const free = isFree(val); const na = val === '—';
        const active = row && c.now >= t && c.now < t + 2.6;
        return (
          <div key={id} style={{ display: 'grid', gridTemplateColumns: '300px 170px 1fr', alignItems: 'center', padding: '7px 14px', borderRadius: 10, background: active ? C.hl : 'transparent', opacity: na ? 0.45 * Math.max(k, 0.25) : 0.2 + 0.8 * k }}>
            <div style={{ fontFamily: T.cond, fontSize: 30, letterSpacing: 1.5 }}>{progs[id].name}</div>
            <div style={{ fontFamily: T.cond, fontWeight: 700, fontSize: 46, textAlign: 'right', paddingRight: 26, color: free ? C.green : na ? C.faint : undefined, ...(free || na ? {} : gold), transform: `scale(${0.85 + 0.15 * k})`, transformOrigin: 'right' }}>{k > 0.05 ? val : ''}</div>
            <div style={{ fontFamily: T.cond, fontSize: 22, letterSpacing: 2, color: C.dim }}>{k > 0.05 ? note : ''}</div>
          </div>);
      })}
    </div>
  );
};

// scoreboard: people as columns, revealed column by column; zero rows glow
const Matrix: React.FC<{ p: Pn; c: Ctx }> = ({ p, c }) => {
  const d = R(p.value); const people: string[] = p.people;
  return (
    <div>
      <Title text={p.title} sub={p.sub} size={34} />
      <div style={{ display: 'grid', gridTemplateColumns: `300px repeat(${people.length}, 1fr)`, rowGap: 2 }}>
        <div />
        {people.map((who, j) => { const k = k01(c.now, p.colAt?.[j]?.t ?? p.t + 0.4 + j * 0.6, 0.4); return <div key={who} style={{ fontFamily: T.cond, fontSize: 30, fontWeight: 600, letterSpacing: 2, textAlign: 'center', paddingBottom: 10, borderBottom: `1px solid ${C.line}`, opacity: k }}>{d.rounds[who].name}</div>; })}
        {d.order.map((id: string) => {
          const allZero = people.every((w) => isFree(d.rounds[w].cells[id][0]));
          const hl = allZero && c.now >= (p.zeroAt?.t ?? Infinity);
          return (
            <React.Fragment key={id}>
              <div style={{ fontFamily: T.cond, fontSize: 27, padding: '9px 10px', letterSpacing: 1.5, background: hl ? 'rgba(127,211,160,.12)' : 'transparent', borderRadius: '8px 0 0 8px', color: hl ? C.green : C.white }}>{d.programs[id].name}</div>
              {people.map((w, j) => {
                const v = d.rounds[w].cells[id][0]; const k = k01(c.now, (p.colAt?.[j]?.t ?? p.t + 0.4 + j * 0.6) + 0.06 * d.order.indexOf(id), 0.35);
                return <div key={w} style={{ fontFamily: T.cond, fontWeight: 700, fontSize: 36, textAlign: 'center', padding: '6px 0', opacity: k, background: hl ? 'rgba(127,211,160,.12)' : 'transparent', color: isFree(v) ? C.green : v === '—' ? C.faint : undefined, ...(isFree(v) || v === '—' ? {} : gold) }}>{v}</div>;
              })}
            </React.Fragment>);
        })}
      </div>
    </div>
  );
};

// what the money buys: feature chips per program
const Buys: React.FC<{ p: Pn; c: Ctx }> = ({ p, c }) => (
  <div>
    <Title text={p.title} sub={p.sub} />
    {(p.rows as Pn[]).map((r, i) => {
      const k = k01(c.now, r.t ?? p.t + 0.3 + i * 0.6, 0.45);
      return (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '360px 150px 1fr', alignItems: 'center', padding: '12px 14px', borderTop: i ? `1px solid ${C.line}` : 'none', opacity: k, transform: `translateX(${(1 - k) * 40}px)` }}>
          <div style={{ fontFamily: T.cond, fontSize: 32, letterSpacing: 1.5 }}>{r.name}</div>
          <div style={{ fontFamily: T.cond, fontSize: 44, fontWeight: 700, color: isFree(r.price) ? C.green : undefined, ...(isFree(r.price) ? {} : gold) }}>{r.price}</div>
          <div style={{ fontFamily: T.cond, fontSize: 26, letterSpacing: 2, color: r.neg ? C.red : C.dim }}>{r.gets}</div>
        </div>);
    })}
  </div>
);

// dated timeline (CRA facts): a line fills, dots + labels appear as narrated
const Timeline: React.FC<{ p: Pn; c: Ctx }> = ({ p, c }) => {
  const pts = p.points as Pn[]; const n = pts.length;
  const fill = Math.max(0, ...pts.map((q, i) => (c.now >= (q.t ?? p.t + i) ? i / Math.max(1, n - 1) : 0)));
  return (
    <div>
      <Title text={p.title} sub={p.sub} />
      <div style={{ position: 'relative', height: 250, margin: '10px 30px 0' }}>
        <div style={{ position: 'absolute', top: 60, left: 0, right: 0, height: 4, background: C.line, borderRadius: 2 }} />
        <div style={{ position: 'absolute', top: 60, left: 0, width: `${interpolate(fill, [0, 1], [0, 100])}%`, height: 4, background: `linear-gradient(90deg,${C.gold2},${C.gold})`, borderRadius: 2 }} />
        {pts.map((q, i) => {
          const k = k01(c.now, q.t ?? p.t + i, 0.45); const x = (i / Math.max(1, n - 1)) * 100;
          return (
            <div key={i} style={{ position: 'absolute', left: `${x}%`, top: 0, width: 300, marginLeft: i === 0 ? 0 : i === n - 1 ? -300 : -150, textAlign: i === 0 ? 'left' : i === n - 1 ? 'right' : 'center', opacity: k }}>
              <div style={{ fontFamily: T.cond, fontSize: 36, fontWeight: 700, ...(q.red ? { color: C.red } : gold) }}>{q.date}</div>
              <div style={{ position: 'absolute', top: 52, left: i === 0 ? 0 : i === n - 1 ? 'auto' : 'calc(50% - 10px)', right: i === n - 1 ? 0 : 'auto', width: 20, height: 20, borderRadius: 10, background: q.red ? C.red : C.gold, transform: `scale(${k})`, boxShadow: `0 0 18px ${q.red ? C.red : C.gold}` }} />
              <div style={{ marginTop: 54, fontFamily: T.cond, fontSize: 25, letterSpacing: 1.5, color: C.white, lineHeight: 1.25 }}>{q.label}</div>
            </div>);
        })}
      </div>
    </div>
  );
};

// numbered decision questions / verdict list
const Steps: React.FC<{ p: Pn; c: Ctx }> = ({ p, c }) => (
  <div>
    {p.title && <Title text={p.title} sub={p.sub} size={34} />}
    {(p.items as Pn[]).map((it, i) => {
      const k = k01(c.now, it.t ?? p.t + 0.4 + i, 0.45); const cur = it.t !== undefined && c.now >= it.t && c.now < ((p.items[i + 1]?.t) ?? Infinity);
      return (
        <div key={i} style={{ display: 'flex', gap: 24, alignItems: 'flex-start', padding: '14px 16px', borderRadius: 12, background: cur ? C.hl : 'transparent', opacity: Math.max(0.12, k) * (cur || !p.dimOthers ? 1 : 0.55), transform: `translateY(${(1 - k) * 20}px)` }}>
          <div style={{ fontFamily: T.cond, fontWeight: 700, fontSize: 54, lineHeight: 1, minWidth: 70, ...gold }}>{it.n ?? ('0' + (i + 1)).slice(-2)}</div>
          <div>
            <div style={{ fontFamily: T.cond, fontSize: 38, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase' }}>{it.head}</div>
            {it.text && <div style={{ fontFamily: T.sans, fontSize: 25, color: C.dim, marginTop: 4, lineHeight: 1.35 }}>{it.text}</div>}
          </div>
        </div>);
    })}
  </div>
);

export const PANELS2: Record<string, React.FC<{ p: Pn; c: Ctx }>> = { hero: Hero, tiers: Tiers, lineup: Lineup, persona: Persona, round: Round, matrix: Matrix, buys: Buys, timeline: Timeline, steps: Steps };
