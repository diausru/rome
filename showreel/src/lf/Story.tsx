// TAX SECRETS CANADA — "Real Situations" story panels (stories/BOOT.md). Cream paper cards on living illustrated plates.
// Palette (prompt file A4): deep green / cream / warm red / charcoal. Every number arrives from episode data.
import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { easeOut } from './Effects';
import { RollNumber } from './Kinetic';
import { FxText } from './Studio';
const FXS = ['type', 'rise', 'decode', 'mask', 'glow'];

// v4 theme: frosted glass on photoreal plates (owner 2026-11-05) — light text, bright accents
const S = { green: '#3FD08A', green2: '#7FE6B0', cream: '#F4EFE6', paper: 'rgba(255,255,255,.10)', red: '#FF5A4E', red2: '#E0574F', ink: '#FFFFFF', dim: 'rgba(255,255,255,.74)', gold: '#F2C76B' };
const GLASS: React.CSSProperties = { background: 'linear-gradient(135deg, rgba(255,255,255,.16), rgba(255,255,255,.05))', backdropFilter: 'blur(18px) saturate(1.3) brightness(.72)', WebkitBackdropFilter: 'blur(18px) saturate(1.3) brightness(.72)', border: '1px solid rgba(255,255,255,.28)', boxShadow: '0 30px 80px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.35)' };
const PH = { ink: '#2B2B2B', dim: 'rgba(43,43,43,.62)', green: '#1F4D3A' };
const F = { head: 'Mont, Montserrat, sans-serif', cond: 'Oswald, Mont, sans-serif', num: 'Mont, Montserrat, sans-serif' };
type Ctx = { now: number; fps: number; end: number };
type Pn = { [k: string]: any };
const T = (x: any, d: number) => (x && typeof x === 'object' ? (x.t ?? d) : (x ?? d));
const k01 = (now: number, t: number, d = 0.45) => easeOut(Math.max(0, Math.min(1, (now - t) / d)));
const money = (v: number) => '$' + Math.round(v).toLocaleString('en-CA');
const toneC = (t?: string) => (t === 'red' ? S.red : t === 'green' ? S.green : S.ink);

// typed text: characters appear at ~38 cps with a caret while typing
const Typed: React.FC<{ text: string; t: number; now: number; cps?: number }> = ({ text, t, now, cps = 38 }) => {
  const n = Math.max(0, Math.floor((now - t) * cps)); const done = n >= text.length;
  return <span>{text.slice(0, n)}{!done && now >= t && <span style={{ opacity: Math.sin(now * 18) > 0 ? 1 : 0.2 }}>▍</span>}</span>;
};

const Paper: React.FC<{ children: React.ReactNode; accent?: string; style?: React.CSSProperties }> = ({ children, accent = S.green, style }) => (
  <div style={{ position: 'relative', ...GLASS, color: S.ink, borderRadius: 20, padding: '24px 32px 24px 38px', textShadow: '0 2px 16px rgba(0,0,0,.4)', ...style }}>
    <div style={{ position: 'absolute', left: 0, top: 18, bottom: 18, width: 5, borderRadius: 3, background: accent, boxShadow: `0 0 14px ${accent}` }} />
    <RunLine accent={accent} />
    {children}
  </div>
);

// light that runs around a window edge (time from the global frame clock)
const RunLine: React.FC<{ accent: string }> = ({ accent }) => {
  const now = useCurrentFrame() / 30; const run = (now * 0.22) % 1;
  return <svg style={{ position: 'absolute', inset: -1, width: 'calc(100% + 2px)', height: 'calc(100% + 2px)', overflow: 'visible', pointerEvents: 'none' }}>
    <rect x="1" y="1" width="99.6%" height="99.4%" rx="20" pathLength={100} fill="none" stroke={accent} strokeWidth={2.5} strokeDasharray="12 88" strokeDashoffset={-run * 100} style={{ filter: `drop-shadow(0 0 7px ${accent})` }} />
    <rect x="1" y="1" width="99.6%" height="99.4%" rx="20" pathLength={100} fill="none" stroke="rgba(255,255,255,.75)" strokeWidth={1.2} strokeDasharray="5 95" strokeDashoffset={-run * 100 - 50} /></svg>;
};

// story caption card: kicker + typed lines (tone green/red/ink), optional rolling number
const Chip: React.FC<{ p: Pn; c: Ctx }> = ({ p, c }) => (
  <Paper accent={p.accent === 'red' ? S.red : S.green} style={{ transform: `rotate(${p.rot ?? -0.6}deg)` }}>
    {p.kicker && <div style={{ fontFamily: F.cond, fontSize: 22, letterSpacing: 5, color: p.accent === 'red' ? S.red : S.green2, marginBottom: 8, textTransform: 'uppercase' }}>{p.kicker}</div>}
    {(p.lines as Pn[]).map((ln, i) => {
      const t = T(ln, p.t + i * 0.7); if (c.now < t) return null;
      if (ln.roll !== undefined) return <div key={i} style={{ color: toneC(ln.tone), fontWeight: 800, lineHeight: 1.1 }}><RollNumber value={ln.roll} t={t} now={c.now} size={ln.size ?? 84} prefix={ln.prefix ?? '$'} style={{ fontFamily: F.num, fontWeight: 800 }} />{ln.suffix && <span style={{ fontSize: (ln.size ?? 84) * 0.42, marginLeft: 10, color: S.dim }}>{ln.suffix}</span>}</div>;
      return <div key={i} style={{ fontFamily: F.head, fontWeight: ln.light ? 600 : 800, fontSize: ln.size ?? 46, lineHeight: 1.15, color: toneC(ln.tone), opacity: ln.strike && c.now > T(ln.strike, 1e9) ? 0.45 : 1, textDecoration: ln.strike && c.now > T(ln.strike, 1e9) ? `line-through ${S.red} 5px` : undefined }}><FxText fx={ln.fx ?? FXS[(i + Math.round(p.t)) % FXS.length]} text={ln.text} t={t} now={c.now} cps={ln.cps ?? 34} accent={ln.tone === 'red' ? S.red : ln.tone === 'green' ? S.green : S.gold} /></div>;
    })}
  </Paper>
);

// code-built phone: banking app (balance count-up + rows) or transfer setup or red alert
const Phone: React.FC<{ p: Pn; c: Ctx }> = ({ p, c }) => {
  const k = k01(c.now, p.t, 0.6); const rows = (p.rows ?? []) as Pn[];
  const alertT = p.alertAt ? T(p.alertAt, 1e9) : 1e9; const al = c.now >= alertT;
  return (
    <div style={{ width: 380, height: 760, borderRadius: 54, background: '#141414', padding: 14, boxShadow: '0 40px 90px rgba(0,0,0,.55)', transform: `translateY(${(1 - k) * 80}px) rotate(${(p.rot ?? 4) * (1 - 0.3 * k)}deg)`, opacity: k }}>
      <div style={{ width: '100%', height: '100%', borderRadius: 42, background: S.cream, overflow: 'hidden', position: 'relative', fontFamily: F.head, color: PH.ink }}>
        <div style={{ background: al ? '#C8102E' : PH.green, color: S.cream, padding: '46px 26px 22px', transition: 'none' }}>
          <div style={{ fontSize: 18, letterSpacing: 3, opacity: 0.8 }}>{(al ? p.alertTitle : p.title) ?? 'MY ACCOUNT'}</div>
          <div style={{ fontSize: 54, fontWeight: 800, marginTop: 6 }}>{p.balance !== undefined ? <RollNumber value={p.balance} t={p.t + 0.3} now={c.now} size={54} dur={1.4} /> : p.big}</div>
          {p.balanceSub && <div style={{ fontSize: 18, opacity: 0.85, marginTop: 2 }}>{p.balanceSub}</div>}
        </div>
        <div style={{ padding: '14px 18px' }}>
          {rows.map((r, i) => {
            const t = T(r, p.t + 0.8 + i * 0.5); const kk = k01(c.now, t, 0.35); if (c.now < t) return null;
            return <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 10px', borderBottom: '1px solid rgba(43,43,43,.1)', opacity: kk, transform: `translateX(${(1 - kk) * 40}px)` }}>
              <div><div style={{ fontSize: 20, fontWeight: 700 }}>{r.label}</div>{r.sub && <div style={{ fontSize: 15, color: PH.dim }}>{r.sub}</div>}</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: r.tone === 'red' ? '#C8102E' : PH.green }}>{r.value}</div>
            </div>;
          })}
        </div>
        {al && <div style={{ position: 'absolute', left: 18, right: 18, bottom: 30, background: S.red, color: '#fff', borderRadius: 18, padding: '16px 18px', fontSize: 22, fontWeight: 800, transform: `scale(${1 + 0.04 * Math.max(0, Math.sin((c.now - alertT) * 6))})`, boxShadow: '0 0 30px rgba(200,16,46,.6)' }}>{p.alertText}</div>}
      </div>
    </div>
  );
};

// L3 timeline: TFSA room per year as coin stacks, then a rolling total
const RoomYears: React.FC<{ p: Pn; c: Ctx }> = ({ p, c }) => {
  const ys = p.years as { y: number; v: number }[]; const max = Math.max(...ys.map((y) => y.v)); const span = p.span ?? 6; const t0 = T(p.startAt, p.t + 0.6);
  const totT = T(p.totalAt, t0 + span + 0.4);
  return (
    <Paper accent={S.green} style={{ padding: '24px 30px 22px 40px' }}>
      <div style={{ fontFamily: F.cond, fontSize: 24, letterSpacing: 5, color: S.green2 }}>{p.title}</div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14, height: 330, marginTop: 14 }}>
        {ys.map((y, i) => {
          const t = t0 + (span * i) / ys.length; const kk = k01(c.now, t, 0.5); const coins = Math.round((y.v / max) * 9);
          return <div key={i} style={{ flex: 1, textAlign: 'center', opacity: c.now < t ? 0.12 : 1 }}>
            <div style={{ fontSize: 19, fontWeight: 800, color: S.green, marginBottom: 6, opacity: kk }}>{money(y.v)}</div>
            <div style={{ display: 'flex', flexDirection: 'column-reverse', alignItems: 'center', height: 250 }}>
              {Array.from({ length: coins }, (_, j) => { const kj = k01(c.now, t + j * 0.04, 0.3);
                return <div key={j} style={{ width: 74, height: 22, marginTop: -4, borderRadius: '50%', background: `linear-gradient(180deg,#F1D58C,${S.gold})`, border: '2px solid #A9823F', transform: `translateY(${(1 - kj) * -120}px)`, opacity: kj }} />; })}
            </div>
            <div style={{ fontFamily: F.cond, fontSize: 24, marginTop: 8, color: S.ink }}>{y.y}</div>
          </div>;
        })}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderTop: `3px double ${S.ink}`, marginTop: 14, paddingTop: 10, opacity: c.now >= totT ? 1 : 0 }}>
        <div style={{ fontFamily: F.head, fontWeight: 800, fontSize: 30 }}>{p.totalLabel}</div>
        <div style={{ color: S.green, fontWeight: 800 }}><RollNumber value={p.total} t={totT} now={c.now} size={74} /></div>
      </div>
    </Paper>
  );
};

// L3 timeline (months): cumulative deposits vs the room line; the part above the line turns red; tax rolls up
const Months: React.FC<{ p: Pn; c: Ctx }> = ({ p, c }) => {
  const cum = p.cum as number[]; const room = p.room as number; const top = Math.max(...cum) * 1.05; const H = 330; const t0 = T(p.startAt, p.t + 0.5); const span = p.span ?? 7;
  const lbl = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const ry = H - (room / top) * H; const taxT = T(p.taxAt, 1e9); const exT = T(p.exAt, 1e9);
  return (
    <Paper accent={S.red} style={{ padding: '24px 30px 22px 40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div style={{ fontFamily: F.cond, fontSize: 24, letterSpacing: 5, color: S.red }}>{p.title}</div>
        <div style={{ fontSize: 18, color: S.dim }}>{p.sub}</div>
      </div>
      <div style={{ position: 'relative', height: H, marginTop: 18, display: 'flex', alignItems: 'flex-end', gap: 12 }}>
        <div style={{ position: 'absolute', left: 0, right: 0, top: ry, borderTop: `3px dashed ${S.green}`, zIndex: 2 }}>
          <div style={{ position: 'absolute', right: 0, top: -34, fontSize: 19, fontWeight: 800, color: S.green, background: 'rgba(0,0,0,.45)', borderRadius: 6, padding: '0 8px' }}>{p.roomLabel}</div>
        </div>
        {cum.map((v, i) => {
          const t = t0 + (span * i) / cum.length; const kk = k01(c.now, t, 0.5); const h = (v / top) * H * kk; const okH = Math.min(h, (room / top) * H);
          return <div key={i} style={{ flex: 1, position: 'relative', height: '100%' }}>
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: okH, background: S.green2, borderRadius: '4px 4px 0 0', opacity: 0.85 }} />
            {h > okH && <div style={{ position: 'absolute', bottom: okH, left: 0, right: 0, height: h - okH, background: S.red, borderRadius: '4px 4px 0 0', boxShadow: '0 0 16px rgba(200,16,46,.5)' }} />}
          </div>;
        })}
      </div>
      <div style={{ display: 'flex', gap: 12, marginTop: 6 }}>{lbl.map((m, i) => <div key={i} style={{ flex: 1, textAlign: 'center', fontFamily: F.cond, fontSize: 19, color: i >= 4 ? S.red : S.ink }}>{m}</div>)}</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderTop: `3px double ${S.ink}`, marginTop: 12, paddingTop: 10 }}>
        <div style={{ opacity: c.now >= exT ? 1 : 0 }}><div style={{ fontSize: 20, color: S.dim, fontWeight: 700 }}>{p.exLabel}</div><div style={{ color: S.red, fontWeight: 800 }}><RollNumber value={p.ex} t={exT} now={c.now} size={54} /></div></div>
        <div style={{ textAlign: 'right', opacity: c.now >= taxT ? 1 : 0 }}><div style={{ fontSize: 20, color: S.dim, fontWeight: 700 }}>{p.taxLabel}</div><div style={{ color: S.red, fontWeight: 800 }}><RollNumber value={p.tax} t={taxT} now={c.now} size={74} prefix="≈ $" /></div></div>
      </div>
    </Paper>
  );
};

// L1 ledger: rows appear one by one, final row underlined twice, result rolls up
const Ledger: React.FC<{ p: Pn; c: Ctx }> = ({ p, c }) => (
  <Paper accent={S.green} style={{ padding: '26px 34px 24px 44px' }}>
    <div style={{ fontFamily: F.cond, fontSize: 24, letterSpacing: 5, color: S.green2, marginBottom: 10 }}>{p.title}</div>
    {(p.rows as Pn[]).map((r, i) => {
      const t = T(r, p.t + 0.6 + i); const kk = k01(c.now, t, 0.4); const last = i === p.rows.length - 1;
      return <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '14px 0', borderTop: last ? `4px double ${S.ink}` : '1px dashed rgba(43,43,43,.25)', opacity: kk, transform: `translateX(${(1 - kk) * -24}px)` }}>
        <div style={{ fontFamily: F.head, fontSize: last ? 34 : 30, fontWeight: last ? 800 : 600 }}>{r.label}</div>
        <div style={{ fontWeight: 800, color: last ? S.green : S.ink }}>{r.roll !== undefined && c.now >= t ? <RollNumber value={r.roll} t={t} now={c.now} size={last ? 76 : 44} prefix={r.prefix ?? '$'} /> : <span style={{ fontSize: 44 }}>{r.value}</span>}</div>
      </div>;
    })}
    {p.note && <div style={{ marginTop: 10, fontSize: 21, color: S.red, fontWeight: 700, opacity: k01(c.now, T(p.noteAt, p.t + 3)) }}>{p.note}</div>}
  </Paper>
);

// L4 split: without the fix (red) vs with the fix (green), totals count up together
const Versus: React.FC<{ p: Pn; c: Ctx }> = ({ p, c }) => {
  const col = (side: Pn, color: string, accent: string, i: number) => {
    const t = T(side, p.t + 0.4 + i * 0.6); const kk = k01(c.now, t, 0.5);
    return <Paper accent={accent} style={{ flex: 1, opacity: c.now < t ? 0.15 : 1, transform: `translateY(${(1 - kk) * 30}px)` }}>
      <div style={{ fontFamily: F.cond, fontSize: 26, letterSpacing: 5, color }}>{side.title}</div>
      {(side.items as string[]).map((s, j) => <div key={j} style={{ fontFamily: F.head, fontSize: 30, fontWeight: 700, padding: '12px 0', borderBottom: '1px dashed rgba(43,43,43,.2)', opacity: k01(c.now, t + 0.3 + j * 0.35) }}>{s}</div>)}
      <div style={{ marginTop: 14, color, fontWeight: 800 }}>{side.value !== undefined && c.now >= t ? <RollNumber value={side.value} t={t + 0.4} now={c.now} size={70} prefix={side.prefix ?? '$'} /> : null}{side.valueSub && <div style={{ fontSize: 20, color: S.dim }}>{side.valueSub}</div>}</div>
    </Paper>;
  };
  return <div style={{ display: 'flex', gap: 30 }}>{col(p.left, S.red, S.red, 0)}{col(p.right, S.green, S.green, 1)}</div>;
};

// numbered step cards slide in one by one; the current one is lit
const StepCards: React.FC<{ p: Pn; c: Ctx }> = ({ p, c }) => {
  const items = p.items as Pn[];
  return (
    <div>
      {p.title && <div style={{ fontFamily: F.cond, fontSize: 30, letterSpacing: 6, color: S.cream, marginBottom: 14, textShadow: '0 4px 20px rgba(0,0,0,.6)' }}>{p.title}</div>}
      {items.map((it, i) => {
        const t = T(it, p.t + 0.5 + i); const kk = k01(c.now, t, 0.5); const nextT = i + 1 < items.length ? T(items[i + 1], 1e9) : 1e9; const cur = c.now >= t && c.now < nextT;
        if (c.now < t) return null;
        return <div key={i} style={{ display: 'flex', gap: 22, alignItems: 'center', marginBottom: 14, ...GLASS, color: S.ink, borderRadius: 16, padding: '16px 22px', boxShadow: cur ? '0 18px 40px rgba(0,0,0,.45)' : '0 6px 16px rgba(0,0,0,.25)', opacity: cur ? kk : 0.82, transform: `translateX(${(1 - kk) * 120}px) scale(${cur ? 1 : 0.97})`, transformOrigin: 'left center' }}>
          <div style={{ minWidth: 64, height: 64, borderRadius: 32, background: it.tone === 'red' ? S.red : S.green, color: S.cream, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F.head, fontWeight: 800, fontSize: 30 }}>{it.n ?? i + 1}</div>
          <div><div style={{ fontFamily: F.head, fontWeight: 800, fontSize: 31, lineHeight: 1.15 }}>{it.head}</div>{it.text && <div style={{ fontSize: 22, color: S.dim, marginTop: 4 }}>{it.text}</div>}</div>
        </div>;
      })}
    </div>
  );
};

// source tag (bottom-left) and lower-third (disclaimer / illustrative-rate line)
const SrcTag: React.FC<{ p: Pn; c: Ctx }> = ({ p }) => (
  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(31,77,58,.92)', color: S.cream, borderRadius: 999, padding: '9px 18px', fontFamily: F.head, fontSize: 19, fontWeight: 700, letterSpacing: 0.5 }}>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={S.cream} strokeWidth="2.4"><path d="M5 12l4 4 10-10" /></svg>{p.text}
  </div>
);
const Lower: React.FC<{ p: Pn; c: Ctx }> = ({ p, c }) => {
  const k = k01(c.now, p.t, 0.5);
  return <div style={{ display: 'flex', alignItems: 'stretch', transform: `translateX(${(1 - k) * -60}px)`, opacity: k }}>
    <div style={{ width: 12, background: p.tone === 'red' ? S.red : S.green, borderRadius: '6px 0 0 6px' }} />
    <div style={{ ...GLASS, color: S.ink, padding: '14px 24px', borderRadius: '0 10px 10px 0', fontFamily: F.head, fontSize: p.size ?? 26, fontWeight: 700, lineHeight: 1.3, maxWidth: p.w }}>{p.text}</div>
  </div>;
};

// end card: question + handles + next pill + subscribe line + rules-checked line
const EndCard: React.FC<{ p: Pn; c: Ctx }> = ({ p, c }) => {
  const k = (d: number) => k01(c.now, p.t + d, 0.5);
  return <div style={{ textAlign: 'center', color: S.cream, fontFamily: F.head }}>
    <div style={{ fontSize: 30, letterSpacing: 6, fontFamily: F.cond, opacity: k(0), color: '#BFD9C9' }}>YOUR TURN · COMMENTS</div>
    <div style={{ fontSize: 50, fontWeight: 800, lineHeight: 1.2, margin: '14px auto 26px', maxWidth: 1400, opacity: k(0.3), textShadow: '0 6px 30px rgba(0,0,0,.6)' }}>{p.question}</div>
    <div style={{ display: 'flex', gap: 24, justifyContent: 'center', opacity: k(T(p.handlesAt, p.t + 1) - p.t) }}>
      {(p.handles as string[]).map((h, i) => <div key={i} style={{ ...GLASS, color: S.ink, borderRadius: 999, padding: '12px 28px', fontSize: 30, fontWeight: 800 }}>{h}</div>)}
    </div>
    {c.now >= T(p.nextAt, 1e9) && <div style={{ marginTop: 34, display: 'inline-flex', alignItems: 'center', gap: 16, background: S.red, borderRadius: 999, padding: '12px 30px', fontSize: 30, fontWeight: 800, transform: `scale(${0.9 + 0.1 * k01(c.now, T(p.nextAt, 0), 0.5)})` }}><span style={{ fontFamily: F.cond, letterSpacing: 4 }}>NEXT</span>{p.next}</div>}
    {c.now >= T(p.subAt, 1e9) && <div style={{ marginTop: 22, fontSize: 34, fontWeight: 800, color: '#F1D58C' }}>Follow so you don't miss it</div>}
    <div style={{ marginTop: 30, fontSize: 19, color: 'rgba(244,239,230,.8)', maxWidth: 1300, marginLeft: 'auto', marginRight: 'auto', opacity: k(1.4) }}>{p.checked}</div>
  </div>;
};

// a hard "turn" hit: red flash ring + stamp text
const Stamp: React.FC<{ p: Pn; c: Ctx }> = ({ p, c }) => {
  const u = (c.now - p.t); const s = interpolate(u, [0, 0.18, 0.35], [2.4, 0.94, 1], { extrapolateRight: 'clamp' });
  return <div style={{ display: 'inline-block', color: S.red, borderRadius: 18, padding: '14px 34px', fontFamily: F.head, fontWeight: 900, fontSize: p.size ?? 84, letterSpacing: 2, transform: `scale(${s}) rotate(${p.rot ?? -6}deg)`, ...GLASS, border: `6px solid ${S.red}`, opacity: interpolate(u, [0, 0.1], [0, 1], { extrapolateRight: 'clamp' }) }}>{p.text}</div>;
};

export const PANELS_STORY: Record<string, React.FC<{ p: Pn; c: Ctx }>> = { chip: Chip, phone: Phone, roomyears: RoomYears, months: Months, ledger: Ledger, versus: Versus, stepcards: StepCards, srctag: SrcTag, lower: Lower, endcard: EndCard, stamp: Stamp };
