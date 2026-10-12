// TAX SECRETS CANADA — advanced motion engine (user rules 2026-10-12, channel/LONGFORM-MOTION-SYSTEM.md).
// Reusable, deterministic components: FloatingTag, KineticHeadline, ActiveIcon(+row), ProgressiveTable, OpeningScene.
// Easing set follows the studied reference: expo-out for entrances, back-out for settles/pops, in-out for moves.
import React from 'react';
import { Easing, Img, staticFile } from 'remotion';
import { RollNumber } from './Kinetic';

export const EX = Easing.bezier(0.16, 1, 0.3, 1);      // expo-out
export const BACK = Easing.bezier(0.34, 1.56, 0.64, 1); // back-out (overshoot settle)
export const INOUT = Easing.bezier(0.65, 0, 0.35, 1);
const cl = (v: number) => Math.max(0, Math.min(1, v));
const prog = (now: number, t: number, d: number, e = EX) => e(cl((now - t) / d));
const C = { navy: '#070B14', gold: '#E8C27A', gold2: '#B88A3E', white: '#F4F1EA', dim: 'rgba(244,241,234,.66)', faint: 'rgba(244,241,234,.38)', red: '#E5806E', org: '#E8A86A', blue: '#8FB3E8', yel: '#E8C27A', green: '#7FD3A0', line: 'rgba(255,255,255,.14)' };
const COND = 'Oswald, Mont, sans-serif';
type Pn = { [k: string]: any };
type Ctx = { now: number; fps: number; end: number };
const R = (x: any) => (x && typeof x === 'object' && ('ref' in x || 'expr' in x) ? x.value : x);

// ---------- FloatingTag: enters from its own direction with slight rotation, settles with overshoot ----------
export const FloatingTag: React.FC<{ text: string; color: string; x: number; y: number; t: number; now: number; dir?: [number, number]; rot?: number; out?: number; size?: number }> = ({ text, color, x, y, t, now, dir = [0, 30], rot = 4, out, size = 34 }) => {
  const k = prog(now, t, 0.7, BACK); const a = cl((now - t) / 0.35);
  const o = out !== undefined ? 1 - prog(now, out, 0.45, INOUT) : 1;
  const drift = Math.sin(now * 0.6 + x * 0.05) * 4; // slow idle float after settling
  return (
    <div style={{ position: 'absolute', left: x, top: y, opacity: a * o, transform: `translate(${(1 - k) * dir[0]}px, ${(1 - k) * dir[1] + drift * k}px) rotate(${(1 - k) * rot + rot * 0.15}deg) scale(${0.92 + 0.08 * k})`, filter: `blur(${(1 - a) * 6}px)`,
      display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px', borderRadius: 999, background: 'rgba(14,20,34,.72)', border: `1px solid ${C.line}`, boxShadow: '0 12px 40px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,255,255,.08)',
      fontFamily: COND, fontSize: size, letterSpacing: 3, color: C.white, whiteSpace: 'nowrap' }}>
      <span style={{ width: 10, height: 10, borderRadius: 5, background: color, boxShadow: `0 0 12px ${color}` }} />{text}
    </div>
  );
};

// ---------- KineticHeadline: lines rise out of a mask, accent rule grows, key words take the gold on cue ----------
export const KineticHeadline: React.FC<{ lines: { text: string; t: number; size?: number; emph?: string[]; emphAt?: number }[]; now: number; align?: 'left' | 'center'; rule?: boolean; track?: boolean }> = ({ lines, now, align = 'center', rule = true, track = true }) => (
  <div style={{ textAlign: align, fontFamily: COND, fontWeight: 700, textTransform: 'uppercase', color: C.white }}>
    {lines.map((ln, i) => {
      const k = prog(now, ln.t, 0.8); const size = ln.size ?? 104;
      return (
        <div key={i} style={{ overflow: 'hidden', lineHeight: 1.08, paddingBottom: 4 }}>
          <div style={{ fontSize: size, transform: `translateY(${(1 - k) * 105}%)`, letterSpacing: track ? `${(1 - k) * 0.12 + 0.01}em` : undefined, textShadow: '0 6px 40px rgba(0,0,0,.55)' }}>
            {ln.text.split(' ').map((w, j) => {
              const e = (ln.emph ?? []).indexOf(w.replace(/[.,?!]/g, '')) >= 0 ? prog(now, ln.emphAt ?? ln.t + 0.5, 0.5) : 0;
              return <span key={j} style={{ color: e ? `rgba(232,194,122,${0.35 + 0.65 * e})` : undefined, display: 'inline-block', transform: `scale(${1 + 0.06 * Math.sin(Math.PI * e)})`, marginRight: '0.24em' }}>{w}</span>;
            })}
          </div>
        </div>);
    })}
    {rule && <div style={{ height: 4, width: `${prog(now, lines[0].t + 0.25, 0.9, INOUT) * 220}px`, background: `linear-gradient(90deg, ${C.gold2}, ${C.gold})`, margin: align === 'center' ? '18px auto 0' : '18px 0 0', borderRadius: 2 }} />}
  </div>
);

// ---------- ActiveIcon: consistent 2px-stroke line icons; pending → active (gold border sweep, lift) → done ----------
const ICONS: Record<string, React.ReactNode> = {
  gross: <><rect x="6" y="14" width="36" height="22" rx="3" /><circle cx="24" cy="25" r="5" /><path d="M10 18h4M34 32h4" /></>,
  federal: <><path d="M8 40h32M10 36h28M12 20v16M20 20v16M28 20v16M36 20v16M6 20h36L24 8z" /></>,
  provincial: <><path d="M24 42s-12-11-12-21a12 12 0 0124 0c0 10-12 21-12 21z" /><circle cx="24" cy="21" r="4" /></>,
  cpp: <><path d="M24 6l14 6v10c0 9-6 16-14 20-8-4-14-11-14-20V12z" /><path d="M18 24l4 4 8-8" /></>,
  ei: <><rect x="8" y="16" width="32" height="22" rx="3" /><path d="M18 16v-4a2 2 0 012-2h8a2 2 0 012 2v4M8 26h32" /></>,
  take: <><path d="M8 22L24 9l16 13" /><path d="M12 20v18h24V20" /><path d="M21 38v-9h6v9" /></>,
  tax: <><rect x="10" y="6" width="28" height="36" rx="3" /><path d="M16 15h16M16 22h16M16 29h9" /></>,
};
export const ActiveIcon: React.FC<{ icon: string; label: string; value?: string; state: 'pending' | 'active' | 'done'; k: number; color: string; size?: number; now: number }> = ({ icon, label, value, state, k, color, size = 150, now }) => {
  const act = state === 'active'; const done = state === 'done';
  const sweep = act ? ((now * 0.55) % 1.6) - 0.3 : -1;
  return (
    <div style={{ position: 'relative', width: size * 1.25, padding: '16px 10px 14px', borderRadius: 18, textAlign: 'center', overflow: 'hidden',
      background: act ? 'rgba(232,194,122,.13)' : 'rgba(14,20,34,.62)', border: `1.5px solid ${act ? C.gold : done ? 'rgba(232,194,122,.35)' : C.line}`,
      transform: `translateY(${act ? -10 * k : 0}px) scale(${act ? 1 + 0.07 * k : 1})`, opacity: state === 'pending' ? 0.62 : 1, boxShadow: act ? `0 18px 50px rgba(232,194,122,${0.22 * k})` : '0 10px 30px rgba(0,0,0,.35)' }}>
      {act && <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(110deg, transparent ${sweep * 100 - 15}%, rgba(255,236,200,.22) ${sweep * 100}%, transparent ${sweep * 100 + 15}%)` }} />}
      <svg width={size * 0.42} height={size * 0.42} viewBox="0 0 48 48" fill="none" stroke={act ? C.gold : done ? color : C.white} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">{ICONS[icon]}</svg>
      <div style={{ fontFamily: COND, fontSize: 28, letterSpacing: 2, marginTop: 8, color: act ? C.white : C.dim }}>{label}</div>
      {value && <div style={{ fontFamily: COND, fontWeight: 700, fontSize: 42, color: act ? C.gold : done ? color : C.faint, opacity: state === 'pending' ? 0 : 1 }}>{value}</div>}
      {done && <div style={{ position: 'absolute', top: 10, right: 12, width: 10, height: 10, borderRadius: 5, background: color }} />}
    </div>
  );
};

// ---------- ProgressiveTable: icon row with moving active state + rows/bars revealed in narration order ----------
const ProgressiveTable: React.FC<{ p: Pn; c: Ctx }> = ({ p, c }) => {
  const steps = p.steps as Pn[]; const gross = R(p.gross); const now = c.now;
  const idx = steps.reduce((a, s, i) => (now >= s.t ? i : a), -1);
  const ded = steps.filter((s, i) => i <= idx && s.kind === 'ded').reduce((a, s) => a + R(s.value), 0);
  const money = (v: number) => '$' + Math.round(v).toLocaleString('en-CA');
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 18 }}>
        <div style={{ fontFamily: COND, fontSize: 34, fontWeight: 600, letterSpacing: 3 }}>{p.title}</div>
        <div style={{ fontFamily: COND, fontSize: 20, letterSpacing: 2, color: C.faint }}>{p.sub}</div>
      </div>
      <div style={{ display: 'flex', gap: 14, justifyContent: 'space-between', marginBottom: 22 }}>
        {steps.map((s, i) => <ActiveIcon key={i} icon={s.icon} label={s.label} color={s.color} now={now} size={196}
          value={i <= idx ? (s.kind === 'ded' ? '−' : '') + money(R(s.value)) : undefined}
          state={i < idx ? 'done' : i === idx ? 'active' : 'pending'} k={i === idx ? prog(now, s.t, 0.45, BACK) : 1} />)}
      </div>
      {steps.filter((s) => s.kind === 'ded').map((s, i) => {
        const k = prog(now, s.t, 0.7); if (now < s.t) return <div key={i} style={{ height: 46 }} />; const v = R(s.value);
        return (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '260px 1fr 160px', alignItems: 'center', gap: 16, padding: '5px 0', opacity: cl((now - s.t) / 0.3) }}>
            <div style={{ fontFamily: COND, fontSize: 28, letterSpacing: 1.5, color: steps[idx] === s ? C.white : C.dim }}>{s.label}</div>
            <div style={{ height: 16, background: 'rgba(255,255,255,.05)', borderRadius: 4, overflow: 'hidden' }}><div style={{ height: '100%', width: `${(v / (p.barMax ?? gross * 0.25)) * 100 * k}%`, background: s.color }} /></div>
            <div style={{ fontFamily: COND, fontWeight: 700, fontSize: 34, textAlign: 'right', color: s.color }}>−<RollNumber value={v} t={s.t} now={now} size={34} dur={0.7} /></div>
          </div>);
      })}
      {p.totalAt && now >= p.totalAt.t && <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: `1px solid ${C.line}`, marginTop: 8, paddingTop: 10, fontFamily: COND, fontSize: 30, letterSpacing: 2, opacity: prog(now, p.totalAt.t, 0.5) }}>
        <span style={{ color: C.dim }}>TOTAL DEDUCTIONS</span><span style={{ color: C.red, fontWeight: 700 }}>−{money(ded)}</span></div>}
    </div>
  );
};

// ---------- OpeningScene: dark navy world, blooms, dotted grid, floating tags, kinetic headline, financial object ----------
const OpeningScene: React.FC<{ p: Pn; c: Ctx }> = ({ p, c }) => {
  const now = c.now; const fadeOut = p.bgOut ? prog(now, p.bgOut.t, 1.1, INOUT) : 0;
  const bloom = 0.85 + 0.15 * Math.sin(now * 0.5);
  return (
    <div style={{ position: 'absolute', left: -p.x, top: -p.y, width: 1920, height: 1080 }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 1 - fadeOut, background: C.navy }}>
        <div style={{ position: 'absolute', left: '58%', top: '-20%', width: 1100, height: 1100, borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(232,160,80,.30), transparent)', transform: `scale(${bloom}) translate(${Math.sin(now * 0.2) * 30}px, 0)` }} />
        <div style={{ position: 'absolute', left: '-15%', top: '40%', width: 1100, height: 1100, borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(80,130,230,.26), transparent)', transform: `translate(${Math.cos(now * 0.17) * 40}px, 0)` }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,.2) 1.4px, transparent 1.5px)', backgroundSize: '36px 36px', backgroundPosition: `${(now * 6) % 36}px ${(now * 3) % 36}px`, WebkitMaskImage: 'radial-gradient(ellipse at 50% 50%, #000 30%, transparent 80%)', maskImage: 'radial-gradient(ellipse at 50% 50%, #000 30%, transparent 80%)' }} />
      </div>
      {(p.tags as Pn[]).map((g, i) => <FloatingTag key={i} text={g.text} color={g.color} x={g.x} y={g.y} t={g.t} now={now} dir={g.dir} rot={g.rot} out={p.tagsOut?.t} />)}
      <div style={{ position: 'absolute', left: 160, right: 160, top: p.headY ?? 330, transform: p.headOut ? `translateY(${-prog(now, p.headOut.t, 0.8, INOUT) * 160}px) scale(${1 - 0.25 * prog(now, p.headOut.t, 0.8, INOUT)})` : undefined }}>
        <KineticHeadline now={now} lines={(p.head as any[])} />
      </div>
      {p.object && now >= p.object.t && (() => {
        const k = prog(now, p.object.t, 0.8, BACK); const o = p.object; const money = (v: number) => '$' + Math.round(v).toLocaleString('en-CA');
        return (
          <div style={{ position: 'absolute', left: 1920 / 2 - 330, top: o.y ?? 560, width: 660, padding: '26px 32px', borderRadius: 18, background: 'rgba(244,241,234,.95)', color: '#1a1d24', boxShadow: '0 40px 90px rgba(0,0,0,.6)', transform: `translateY(${(1 - k) * 120}px) rotate(${(1 - k) * -6 - 1.2}deg)`, opacity: cl((now - o.t) / 0.3) }}>
            <div style={{ fontFamily: COND, fontSize: 24, letterSpacing: 4, color: '#6b6f78' }}>{o.title}</div>
            {(o.rows as Pn[]).map((r, i) => { const rk = prog(now, r.t ?? o.t + 0.4 + i * 0.25, 0.4); return (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontFamily: COND, fontSize: 34, padding: '6px 0', borderBottom: '1px solid rgba(0,0,0,.08)', opacity: rk }}>
                <span>{r.label}</span><span style={{ fontWeight: 700, color: r.red ? '#B8432F' : '#1a1d24' }}>{r.red ? '−' : ''}{money(R(r.value))}</span></div>); })}
          </div>);
      })()}
    </div>
  );
};


// ---------- CollageHook: frame-0 hook — photo collage + giant stat + stamp + intrigue question, all readable on the first frame ----------
// Everything is composed at t0 (no fade from black); motion after that is ambient (drift, sweep, stamp pulse) until p.out, when tiles fly apart.
const CollageHook: React.FC<{ p: Pn; c: Ctx }> = ({ p, c }) => {
  const now = c.now; const t0 = p.t; const el = now - t0; const out = p.out ? prog(now, p.out.t, 0.9, INOUT) : 0;
  const tiles = p.tiles as Pn[];
  const sweep = ((el * 0.45) % 1.6) - 0.3; // light sweep across the number, repeats slowly
  const stampK = 1 + 0.04 * Math.max(0, Math.sin(el * 2.2));
  return (
    <div style={{ position: 'absolute', left: -p.x, top: -p.y, width: 1920, height: 1080, background: C.navy, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', left: '55%', top: '-25%', width: 1200, height: 1200, borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(232,160,80,.28), transparent)' }} />
      <div style={{ position: 'absolute', left: '-20%', top: '35%', width: 1200, height: 1200, borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(80,130,230,.24), transparent)' }} />
      {tiles.map((g, i) => {
        const fly = out * (g.fly ?? [i % 2 ? 900 : -900, i < 2 ? -300 : 300]);
        const drift = Math.sin(el * 0.5 + i * 1.7) * 6; const kb = 1.06 + 0.05 * cl(el / 12);
        return (
          <div key={i} style={{ position: 'absolute', left: g.x, top: g.y, width: g.w, height: g.h, padding: 10, background: '#F4F1EA', borderRadius: 6, boxShadow: '0 30px 80px rgba(0,0,0,.65)',
            transform: `translate(${fly[0] ?? 0}px, ${(fly[1] ?? 0) + drift}px) rotate(${g.rot + Math.sin(el * 0.3 + i) * 0.6}deg)`, opacity: 1 - out * 0.8 }}>
            <div style={{ width: '100%', height: '100%', overflow: 'hidden', borderRadius: 2 }}>
              <Img src={staticFile(g.src)} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${kb}) translate(${Math.sin(el * 0.2 + i) * 10}px, 0)` }} />
            </div>
          </div>);
      })}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 46% 52% at 50% 50%, rgba(7,11,20,.92) 35%, rgba(7,11,20,.25) 75%, transparent)', opacity: 1 - out }} />
      <div style={{ position: 'absolute', left: 0, right: 0, top: p.cy ?? 250, textAlign: 'center', fontFamily: COND, textTransform: 'uppercase', opacity: 1 - out, transform: `scale(${1 + out * 0.15})` }}>
        <div style={{ fontSize: 34, letterSpacing: 10, color: C.gold }}>{p.kicker}</div>
        {(() => { const fs = p.statSize ?? 260; const w = fs * 0.5 * String(p.stat).length + 40; const gid = `cg-${Math.round(t0 * 100)}`; return (
          <svg width={w} height={fs * 1.05} style={{ display: 'block', margin: '8px auto 0', overflow: 'visible' }}>
            <defs><linearGradient id={gid} x1="0" y1="0" x2="1" y2="0.25">
              <stop offset="0" stopColor="#B88A3E" /><stop offset={cl(sweep - 0.12)} stopColor="#E8C27A" /><stop offset={cl(sweep)} stopColor="#FFF4D6" /><stop offset={cl(sweep + 0.12)} stopColor="#E8C27A" /><stop offset="1" stopColor="#B88A3E" />
            </linearGradient></defs>
            <text x="50%" y={fs * 0.86} textAnchor="middle" fontFamily={COND} fontWeight={700} fontSize={fs} fill={`url(#${gid})`} style={{ filter: 'drop-shadow(0 10px 30px rgba(0,0,0,.6))' }}>{p.stat}</text>
          </svg>); })()}
        <div style={{ fontSize: 40, letterSpacing: 3, color: C.white, marginTop: 6 }}>{p.statLabel}</div>
        <div style={{ fontSize: 50, fontWeight: 600, color: C.white, marginTop: 34, textShadow: '0 4px 30px rgba(0,0,0,.8)' }}>{p.question}</div>
      </div>
      {p.stamp && <div style={{ position: 'absolute', left: p.stamp.x, top: p.stamp.y, transform: `rotate(${p.stamp.rot ?? -8}deg) scale(${stampK * (1 - out)})`, padding: '14px 28px', border: '6px solid #D52B1E', borderRadius: 10,
        fontFamily: COND, fontWeight: 700, fontSize: p.stamp.size ?? 54, letterSpacing: 4, color: '#FF5A4A', background: 'rgba(30,6,6,.55)', boxShadow: '0 0 40px rgba(213,43,30,.45)' }}>{p.stamp.text}</div>}
    </div>
  );
};

export const PANELS_MOTION: Record<string, React.FC<{ p: Pn; c: Ctx }>> = { opening: OpeningScene, ptable: ProgressiveTable, collage: CollageHook };
