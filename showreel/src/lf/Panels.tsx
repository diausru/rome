// TAX SECRETS CANADA — long-form data panels (scene with several glass panels over a cinematic plate).
// All numbers arrive from build.py (computed by taxcalc); nothing here invents a value.
import React from 'react';
import { AbsoluteFill, interpolate, spring, Easing } from 'remotion';
import { fxStyle, FxName, IN_ROTATION, OUT_ROTATION, easeIn } from './Effects';
import { PANELS2 } from './Panels2';
import { PANELS3 } from './Panels3';

const C = { gold: '#E8C27A', gold2: '#B88A3E', white: '#F4F1EA', dim: 'rgba(244,241,234,.62)', faint: 'rgba(244,241,234,.38)', red: '#E5806E', green: '#7FD3A0', line: 'rgba(255,255,255,.13)', glass: 'rgba(13,19,31,.70)', hl: 'rgba(232,194,122,.13)', canada: '#D52B1E' };
const F = { sans: 'Mont, Montserrat, sans-serif', serif: 'Fraunces, serif' };
const gold: React.CSSProperties = { background: `linear-gradient(180deg,#FFE7B0 0%,${C.gold} 45%,${C.gold2} 100%)`, WebkitBackgroundClip: 'text', color: 'transparent' };
const ease = Easing.bezier(0.22, 1, 0.36, 1);
export const money = (v: number) => (v < 0 ? '−' : '') + '$' + Math.round(Math.abs(v)).toLocaleString('en-CA');
const pct = (v: number, d = 1) => (v * 100).toFixed(d) + '%';
const sp = (now: number, t: number, fps: number, dur = 0.45) => spring({ frame: Math.round((now - t) * fps), fps, config: { damping: 200 }, durationInFrames: Math.max(1, Math.round(dur * fps)) });
const ramp = (now: number, t: number, d: number) => interpolate(now, [t, t + d], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease });

type Ctx = { now: number; fps: number; end: number };
type Pn = { [k: string]: any };

const Head: React.FC<{ title: string; sub?: string; flag?: boolean }> = ({ title, sub, flag }) => (
  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16, marginBottom: 14 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      {flag && <svg width="30" height="15" viewBox="0 0 40 20"><rect width="40" height="20" fill="#fff" /><rect width="10" height="20" fill={C.canada} /><rect x="30" width="10" height="20" fill={C.canada} /><path fill={C.canada} d="M20 3.2l1.1 2.1 1.2-.6-.5 3 1.6-1.6.3.9 1.6-.3-.5 1.7.7.4-2.6 2.2.3.9-2.3-.3.1 2.6h-.6l.1-2.6-2.3.3.3-.9-2.6-2.2.7-.4-.5-1.7 1.6.3.3-.9 1.6 1.6-.5-3 1.2.6z" /></svg>}
      <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase' }}>{title}</div>
    </div>
    {sub && <div style={{ fontSize: 17, color: C.faint, letterSpacing: 1 }}>{sub}</div>}
  </div>
);

// ---------- A. calculation table: rows reveal at their own time, active row highlighted, running balance ----------
const Table: React.FC<{ p: Pn; c: Ctx }> = ({ p, c }) => {
  const rows = p.rows as Pn[];
  const shown = rows.filter((r) => (r.t ?? p.t) <= c.now);
  const active = [...shown].reverse().find((r) => r.t !== undefined && c.now - r.t < (p.hold ?? 3.2));
  const gross = rows.find((r) => r.key === 'gross')?.value;
  const running = gross !== undefined ? gross - shown.filter((r) => r.sign === '-').reduce((a, r) => a + r.value, 0) : undefined;
  return (
    <div>
      <Head title={p.title} sub={p.sub} flag={p.flag} />
      <div style={{ display: 'flex', fontSize: 15, letterSpacing: 2, color: C.faint, fontWeight: 700, padding: '0 12px 8px', borderBottom: `1px solid ${C.line}` }}>
        <div style={{ flex: 1 }}>{(p.cols?.[0] ?? 'Item').toUpperCase()}</div><div>{(p.cols?.[1] ?? 'Amount').toUpperCase()}</div>
      </div>
      {rows.map((r, i) => {
        const k = sp(c.now, r.t ?? p.t, c.fps, 0.35);
        if ((r.t ?? p.t) > c.now) return <div key={i} style={{ height: r.final ? 64 : 46 }} />;
        const isA = active === r;
        const v = r.count ? interpolate(c.now, [r.t, r.t + 0.6], [0, r.value], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease }) : r.value;
        const col = r.final ? undefined : r.sign === '-' ? C.red : r.total ? C.white : C.white;
        return (
          <div key={i} style={{ display: 'flex', alignItems: 'baseline', padding: r.final ? '14px 12px 6px' : '9px 12px', borderTop: r.final ? `2px solid ${C.gold}` : r.total ? `1px solid ${C.line}` : 'none', background: isA ? C.hl : 'transparent', borderRadius: 8, opacity: k, transform: `translateY(${(1 - k) * 14}px)` }}>
            <div style={{ flex: 1, fontSize: r.final ? 28 : 24, fontWeight: r.final || r.total ? 800 : 600, color: r.final ? C.white : C.white }}>{r.label}{r.note && <span style={{ fontSize: 15, color: C.faint, marginLeft: 10 }}>{r.note}</span>}</div>
            <div style={{ fontFamily: F.serif, fontWeight: 800, fontSize: r.final ? 46 : 30, color: r.final ? C.green : col, ...(r.key === 'gross' ? gold : {}) }}>{r.sign === '-' ? '−' : ''}{r.fmt === 'pct' ? pct(v, r.dec ?? 1) : money(v)}</div>
          </div>);
      })}
      {p.running && running !== undefined && (
        <div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between', fontSize: 18, color: C.dim, padding: '8px 12px', border: `1px dashed ${C.line}`, borderRadius: 8 }}>
          <span>Running balance</span><span style={{ fontWeight: 800, color: C.white }}>{money(running)}</span>
        </div>)}
      {p.takeaway && c.now >= (p.takeaway.t ?? Infinity) && <div style={{ marginTop: 12, fontSize: 20, color: C.gold, opacity: ramp(c.now, p.takeaway.t, 0.4) }}>{p.takeaway.text}</div>}
    </div>
  );
};

// ---------- B. formula: tokens appear in order, result counts up after inputs ----------
const Formula: React.FC<{ p: Pn; c: Ctx }> = ({ p, c }) => {
  const toks = p.steps as Pn[];
  return (
    <div>
      <Head title={p.title} sub={p.sub} />
      <div style={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: 18, fontFamily: F.serif, fontWeight: 800, zoom: p.scale ?? 1 } as React.CSSProperties}>
        {toks.map((s, i) => {
          const t = s.t ?? p.t + i * 0.5; const k = ramp(c.now, t, 0.35);
          const cur = c.now >= t && (i === toks.length - 1 || c.now < (toks[i + 1].t ?? p.t + (i + 1) * 0.5));
          if (s.result) {
            const v = interpolate(c.now, [t, t + 0.9], [0, s.value], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease });
            return <span key={i} style={{ fontSize: 64, opacity: k, ...gold }}>{s.fmt === 'pct' ? pct(v, s.dec ?? 1) : money(v)}</span>;
          }
          return <span key={i} style={{ fontSize: s.op ? 44 : 50, color: s.op ? C.dim : C.white, opacity: k, borderBottom: cur && !s.op ? `3px solid ${C.gold}` : '3px solid transparent', paddingBottom: 2 }}>{s.text ?? (s.fmt === 'pct' ? pct(s.value, s.dec ?? 1) : money(s.value))}</span>;
        })}
      </div>
      {p.label && <div style={{ display: 'flex', gap: 18, marginTop: 10, fontSize: 16, color: C.faint }}>{p.label}</div>}
      {p.takeaway && c.now >= p.takeaway.t && <div style={{ marginTop: 14, fontSize: 22, color: C.dim, opacity: ramp(c.now, p.takeaway.t, 0.4) }}>{p.takeaway.text}</div>}
    </div>
  );
};

// ---------- C. bracket table with the portion of income on each step ----------
const Brackets: React.FC<{ p: Pn; c: Ctx }> = ({ p, c }) => {
  const rows = (Array.isArray(p.value) ? p.value : p.value.rows) as Pn[]; const maxPart = Math.max(...rows.map((r) => r.part), 1);
  const anyIncome = rows.some((r) => r.part > 0);
  const gap = p.gap ?? 0.7; const top = rows.reduce((a, r, i) => (r.part > 0 ? i : a), 0);
  let sum = 0;
  return (
    <div>
      <Head title={p.title} sub={p.sub} flag={p.flag} />
      <div style={{ display: 'grid', gridTemplateColumns: '220px 90px 1fr 130px', fontSize: 15, letterSpacing: 2, color: C.faint, fontWeight: 700, padding: '0 8px 8px', borderBottom: `1px solid ${C.line}` }}>
        <div>INCOME RANGE</div><div>RATE</div><div>{anyIncome ? (p.barLabel ?? 'YOUR DOLLARS ON THIS STEP') : ''}</div><div style={{ textAlign: 'right' }}>TAX</div>
      </div>
      {rows.map((r, i) => {
        const t = p.rowAt?.[Math.min(i, p.rowAt.length - 1)]?.t ?? p.t + 0.3 + gap * i; const k = ramp(c.now, t, 0.45); if (r.part > 0) sum += Math.round(r.tax) * k;
        const hl = i === top && c.now >= t;
        return (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '220px 90px 1fr 130px', alignItems: 'center', padding: '8px', borderRadius: 8, background: hl ? C.hl : 'transparent', opacity: 0.25 + 0.75 * k }}>
            <div style={{ fontSize: 20 }}>{r.hi ? `${money(r.lo)} – ${money(r.hi)}` : `over ${money(r.lo)}`}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: hl ? C.gold : C.white }}>{(r.rate * 100).toFixed(2).replace(/\.?0+$/, '')}%</div>
            <div style={{ height: 18, background: 'rgba(255,255,255,.06)', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${(r.part / maxPart) * 100 * k}%`, background: r.part ? `linear-gradient(90deg,${C.gold2},${C.gold})` : 'transparent' }} />
            </div>
            <div style={{ textAlign: 'right', fontFamily: F.serif, fontWeight: 800, fontSize: 22, color: r.part ? C.white : C.faint }}>{r.part ? money(Math.round(r.tax) * k) : '—'}</div>
          </div>);
      })}
      {anyIncome && <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, padding: '10px 8px 0', borderTop: `1px solid ${C.line}`, fontSize: 20 }}>
        <span style={{ color: C.dim }}>{p.sumLabel ?? 'Total before credits'}</span><span style={{ fontFamily: F.serif, fontWeight: 800, fontSize: 30, ...gold }}>{money(sum)}</span>
      </div>}
    </div>
  );
};

// ---------- D. province comparison: identical assumptions, separate components, difference row ----------
const Provinces: React.FC<{ p: Pn; c: Ctx }> = ({ p, c }) => {
  const cols = p.cols as Pn[]; const items = p.items ?? [['federal', 'Federal tax'], ['provincial', 'Provincial tax'], ['cpp', 'CPP'], ['ei', 'EI'], ['take_home', 'Take-home']];
  const best = Math.max(...cols.map((x) => x.value.take_home)); const worst = Math.min(...cols.map((x) => x.value.take_home));
  return (
    <div>
      <Head title={p.title} sub={p.sub} />
      <div style={{ display: 'grid', gridTemplateColumns: `200px repeat(${cols.length}, 1fr)`, gap: 0 }}>
        <div />
        {cols.map((x, j) => { const k = sp(c.now, x.t ?? p.t, c.fps); return <div key={j} style={{ textAlign: 'right', fontSize: 20, fontWeight: 800, padding: '0 10px 8px', opacity: k, borderBottom: `1px solid ${C.line}` }}>{x.name}</div>; })}
        {items.map(([key, label]: string[], i: number) => (
          <React.Fragment key={i}>
            <div style={{ fontSize: 20, padding: '9px 0', color: key === 'take_home' ? C.white : C.dim, fontWeight: key === 'take_home' ? 800 : 500, borderTop: key === 'take_home' ? `2px solid ${C.gold}` : 'none' }}>{label}</div>
            {cols.map((x, j) => {
              const v = x.value[key]; const k = sp(c.now, (x.t ?? p.t) + 0.15 * i, c.fps);
              const win = key === 'take_home' && v === best && c.now >= (p.lead ?? Infinity);
              return <div key={j} style={{ textAlign: 'right', padding: '9px 10px', fontFamily: F.serif, fontWeight: 800, fontSize: key === 'take_home' ? 30 : 22, opacity: k, color: key === 'take_home' ? (win ? C.green : C.white) : C.red, borderTop: key === 'take_home' ? `2px solid ${C.gold}` : 'none', background: win ? 'rgba(127,211,160,.10)' : 'transparent', borderRadius: 6 }}>{key === 'take_home' ? '' : '−'}{money(v)}</div>;
            })}
          </React.Fragment>))}
      </div>
      {p.diff && c.now >= p.diff.t && (
        <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', opacity: ramp(c.now, p.diff.t, 0.4) }}>
          <span style={{ fontSize: 20, color: C.dim }}>{p.diff.label}</span>
          <span style={{ fontFamily: F.serif, fontWeight: 800, fontSize: 40, ...gold }}>{money(best - worst)}</span>
        </div>)}
    </div>
  );
};

// ---------- E. charts: stacked bar, donut and line — all fed from the same datasets ----------
const SEG = [['federal', 'Federal tax', '#E5806E'], ['provincial', 'Provincial tax', '#E8A86A'], ['cpp', 'CPP', '#E8C27A'], ['ei', 'EI', '#9FB8D8'], ['take_home', 'Take-home', '#7FD3A0']];
const Stack: React.FC<{ p: Pn; c: Ctx }> = ({ p, c }) => {
  const d = p.value; const k = ramp(c.now, p.t + 0.2, 1.4);
  return (
    <div>
      <Head title={p.title} sub={p.sub} />
      <div style={{ display: 'flex', height: 46, borderRadius: 8, overflow: 'hidden', background: 'rgba(255,255,255,.05)' }}>
        {SEG.map(([key, , col], i) => <div key={i} style={{ width: `${(d[key] / d.gross) * 100 * k}%`, background: col, borderRight: '1px solid rgba(0,0,0,.35)' }} />)}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, auto)', gap: 14, marginTop: 12, fontSize: 17 }}>
        {SEG.map(([key, label, col], i) => <div key={i} style={{ opacity: ramp(c.now, p.t + 0.3 + 0.25 * i, 0.3) }}><span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: 3, background: col, marginRight: 8 }} />{label}<div style={{ fontWeight: 800, fontSize: 20 }}>{pct(d[key] / d.gross)}</div></div>)}
      </div>
    </div>
  );
};
const Donut: React.FC<{ p: Pn; c: Ctx }> = ({ p, c }) => {
  const d = p.value; const k = ramp(c.now, p.t + 0.2, 1.4); const R = 92, L = 2 * Math.PI * R; let acc = 0;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 26 }}>
      <div style={{ position: 'relative', width: 230, height: 230 }}>
        <svg width="230" height="230" viewBox="0 0 230 230" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="115" cy="115" r={R} fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="26" />
          {SEG.map(([key, , col], i) => { const f = (d[key] / d.gross) * k; const el = <circle key={i} cx="115" cy="115" r={R} fill="none" stroke={col} strokeWidth="26" strokeDasharray={`${f * L} ${L}`} strokeDashoffset={-acc * L} />; acc += f; return el; })}
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontFamily: F.serif, fontWeight: 800, fontSize: 34, color: C.green }}>{money(d.take_home * k)}</div>
          <div style={{ fontSize: 15, color: C.dim }}>{p.center ?? 'take-home / year'}</div>
        </div>
      </div>
      <div>
        <Head title={p.title} />
        {SEG.map(([key, label, col], i) => <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'center', fontSize: 19, padding: '4px 0', opacity: ramp(c.now, p.t + 0.3 + 0.2 * i, 0.3) }}><span style={{ width: 12, height: 12, borderRadius: 6, background: col }} /><span style={{ width: 160 }}>{label}</span><b style={{ color: col }}>{pct(d[key] / d.gross)}</b></div>)}
      </div>
    </div>
  );
};
const LineChart: React.FC<{ p: Pn; c: Ctx }> = ({ p, c }) => {
  const W = p.cw ?? 620, H = p.ch ?? 250, pad = 46; const data = p.value as Record<string, Pn[]>; const keys = Object.keys(data);
  const xs = data[keys[0]].map((r) => r.gross); const all = ([] as number[]).concat(...keys.map((k) => data[k].map((r) => r.take_home)));
  const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.floor(Math.min(...all) / 10000) * 10000, y1 = Math.ceil(Math.max(...all) / 10000) * 10000;
  const X = (v: number) => pad + ((v - x0) / (x1 - x0)) * (W - pad - 10), Y = (v: number) => H - 30 - ((v - y0) / (y1 - y0)) * (H - 50);
  const cols: Record<string, string> = { AB: '#6FA8FF', MB: '#E8C27A', ON: '#E5806E', BC: '#7FD3A0', SK: '#B79CFF' };
  const k = ramp(c.now, p.t + 0.2, 1.6);
  return (
    <div>
      <Head title={p.title} sub={p.sub} />
      <svg width={W} height={H}>
        {[y0, (y0 + y1) / 2, y1].map((v, i) => <g key={i}><line x1={pad} x2={W - 10} y1={Y(v)} y2={Y(v)} stroke={C.line} /><text x={4} y={Y(v) + 5} fill={C.faint} fontSize="14">{`$${Math.round(v / 1000)}K`}</text></g>)}
        {xs.filter((_, i) => i % 2 === 0).map((v, i) => <text key={i} x={X(v) - 16} y={H - 6} fill={C.faint} fontSize="14">{`$${Math.round(v / 1000)}K`}</text>)}
        {keys.map((key) => { const pts = data[key].map((r) => `${X(r.gross)},${Y(r.take_home)}`).join(' '); const len = 2000; return <polyline key={key} points={pts} fill="none" stroke={cols[key] ?? C.white} strokeWidth="3.5" strokeDasharray={len} strokeDashoffset={len * (1 - k)} />; })}
        {p.mark && keys.map((key) => { const r = data[key].find((q) => q.gross === p.mark); return r && k > 0.95 ? <circle key={key} cx={X(r.gross)} cy={Y(r.take_home)} r="6" fill={cols[key]} /> : null; })}
      </svg>
      <div style={{ display: 'flex', gap: 22, fontSize: 17 }}>{keys.map((key) => <span key={key}><span style={{ display: 'inline-block', width: 18, height: 4, background: cols[key], marginRight: 8, verticalAlign: 'middle' }} />{p.names?.[key] ?? key}</span>)}</div>
    </div>
  );
};

// ---------- G. evidence / source and takeaway callouts ----------
const Source: React.FC<{ p: Pn; c: Ctx }> = ({ p }) => (
  <div style={{ fontSize: 17, color: C.dim, lineHeight: 1.45 }}>
    <div style={{ fontSize: 14, letterSpacing: 2, color: C.faint, fontWeight: 700, marginBottom: 6 }}>{p.kind === 'illustration' ? 'ILLUSTRATIVE EXAMPLE' : 'SOURCE'}</div>
    {p.text}
  </div>
);
const Takeaway: React.FC<{ p: Pn; c: Ctx }> = ({ p }) => (
  <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
    <div style={{ width: 4, alignSelf: 'stretch', background: C.gold, borderRadius: 2 }} />
    <div><div style={{ fontSize: 15, letterSpacing: 2, color: C.gold, fontWeight: 800, marginBottom: 6 }}>{p.title ?? 'KEY TAKEAWAY'}</div><div style={{ fontSize: 26, lineHeight: 1.3 }}>{p.text}</div></div>
  </div>
);
const Misconception: React.FC<{ p: Pn; c: Ctx }> = ({ p, c }) => {
  const k2 = ramp(c.now, p.fix.t, 0.5);
  return (
    <div>
      <Head title={p.title} />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 24, padding: '8px 0', opacity: 1 - 0.55 * k2 }}>
        <span style={{ color: C.dim }}>{p.wrong.label}</span>
        <span style={{ position: 'relative', fontFamily: F.serif, fontWeight: 800, fontSize: 34 }}>{p.wrong.text ?? (p.wrong.fmt === 'money' ? money(p.wrong.value) : pct(p.wrong.value, p.wrong.dec ?? 1))}<span style={{ position: 'absolute', left: 0, top: '52%', height: 3, width: `${k2 * 100}%`, background: C.red }} /></span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 24, padding: '8px 0', borderTop: `1px solid ${C.line}`, opacity: k2 }}>
        <span>{p.fix.label}</span><span style={{ fontFamily: F.serif, fontWeight: 800, fontSize: 40, ...gold }}>{p.fix.text ?? (p.fix.fmt === 'money' ? money(p.fix.value) : pct(p.fix.value, p.fix.dec ?? 1))}</span>
      </div>
    </div>
  );
};

const PANELS: Record<string, React.FC<{ p: Pn; c: Ctx }>> = { ...PANELS2, ...PANELS3, table: Table, formula: Formula, brackets: Brackets, provinces: Provinces, stack: Stack, donut: Donut, line: LineChart, source: Source, takeaway: Takeaway, misconception: Misconception };

// ---------- scene: several panels, each with its own entry time; slight depth + parallax drift ----------
export const Scene: React.FC<{ e: Pn; now: number; fps: number }> = ({ e, now, fps }) => {
  const end = e.t + e.dur;
  return (
    <AbsoluteFill style={{ fontFamily: F.sans, color: C.white, perspective: 1800 }}>
      {(e.panels as Pn[]).map((p, i) => {
        const P = PANELS[p.type]; if (!P || now < p.t) return null;
        const until = p.until !== undefined ? (typeof p.until === 'object' ? p.until.t : p.until) : end;
        const seed = Math.floor(e.t * 7) + i;
        const fin: FxName = p.fxIn ?? IN_ROTATION[seed % IN_ROTATION.length];
        const fout: FxName = p.fxOut ?? OUT_ROTATION[seed % OUT_ROTATION.length];
        const inD = p.inDur ?? 0.75, outD = p.outDur ?? 0.6;
        const kIn = interpolate(now, [p.t, p.t + inD], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        const kOut = interpolate(now, [until - outD, until], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        if (kOut >= 1) return null;
        const fx = kOut > 0 ? fxStyle(fout, 1 - easeIn(kOut), 'out', seed) : fxStyle(fin, kIn, 'in', seed);
        const drift = Math.sin((now + i * 3.1) * 0.35) * 3;
        const glass = p.glass === false ? {} : { padding: p.pad ?? '26px 30px', background: p.bg ?? C.glass, border: `1px solid ${C.line}`, borderRadius: 20, boxShadow: '0 24px 60px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,255,255,.10)' };
        return (
          <div key={p.id ?? i} style={{ position: 'absolute', left: p.x, top: p.y, width: p.w, transform: `translateY(${drift}px) rotateY(${p.tilt ?? 0}deg) rotateX(${p.tiltX ?? 0}deg)`, transformOrigin: p.origin ?? 'center' }}>
          <div style={{ position: 'relative', ...glass, ...fx.style, transform: [fx.style.transform].filter(Boolean).join(' ') || undefined }}>
            {fx.overlay}
            <P p={p} c={{ now, fps, end: until }} />
          </div></div>);
      })}
    </AbsoluteFill>
  );
};
