// TAX SECRETS CANADA — advanced motion engine (user rules 2026-10-12, channel/LONGFORM-MOTION-SYSTEM.md).
// Reusable, deterministic components: FloatingTag, KineticHeadline, ActiveIcon(+row), ProgressiveTable, OpeningScene.
// Easing set follows the studied reference: expo-out for entrances, back-out for settles/pops, in-out for moves.
import React from 'react';
import { Easing, Img, staticFile } from 'remotion';
import { RollNumber } from './Kinetic';
import { DepthPhoto } from './DepthPhoto';

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
      {p.bg && <div style={{ position: 'absolute', inset: 0 }}>
        {p.bg.depth ? <DepthPhoto src={p.bg.src} depth={p.bg.depth} t={el} amt={p.bg.amt ?? 0.05} cam={{ x: Math.sin(el * 0.25) * 0.8, y: Math.cos(el * 0.2) * 0.3, z: 0.12 + 0.18 * cl(el / 10) }} />
          : <Img src={staticFile(p.bg.src)} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${1.08 + 0.06 * cl(el / 10)})` }} />}
        <div style={{ position: 'absolute', inset: 0, background: `rgba(7,11,20,${p.bg.dim ?? 0.68})` }} /></div>}
      <div style={{ position: 'absolute', left: '55%', top: '-25%', width: 1200, height: 1200, borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(232,160,80,.28), transparent)' }} />
      <div style={{ position: 'absolute', left: '-20%', top: '35%', width: 1200, height: 1200, borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(80,130,230,.24), transparent)' }} />
      {tiles.map((g, i) => {
        const fly = (g.fly ?? [i % 2 ? 900 : -900, i < 2 ? -300 : 300]).map((v: number) => v * out);
        // entrance per tile: drop (falls from above, settles with overshoot) · slideL / slideR · pop (scale up) · none
        const te = el - (g.delay ?? i * 0.18); const ke = g.enter === 'none' ? 1 : prog(te + (g.enter ? 0 : 0), 0, g.enterDur ?? 0.85, BACK); const ka = cl(te / 0.25);
        const en = g.enter ?? 'drop';
        const ex = en === 'slideL' ? (1 - ke) * -1100 : en === 'slideR' ? (1 - ke) * 1100 : 0;
        const ey = en === 'drop' ? (1 - ke) * -(g.y + g.h + 120) : 0;
        const es = en === 'pop' ? 0.3 + 0.7 * ke : 1; const er = en === 'drop' ? (1 - ke) * (i % 2 ? 18 : -18) : 0;
        const drift = Math.sin(el * 0.5 + i * 1.7) * 6;
        // per-tile "alive" camera move on the depth photo: dolly · truck · orbit · rise
        const mv = g.move ?? ['dolly', 'truck', 'orbit', 'rise'][i % 4]; const u = el / 8;
        const cam = mv === 'dolly' ? { x: 0, y: 0, z: 0.05 + 0.35 * cl(u) } : mv === 'truck' ? { x: -1 + 2 * cl(u), y: 0, z: 0.15 } : mv === 'orbit' ? { x: Math.sin(el * 0.7), y: Math.cos(el * 0.7) * 0.5, z: 0.18 } : { x: 0, y: 1 - 2 * cl(u), z: 0.12 + 0.1 * cl(u) };
        return (
          <div key={i} style={{ position: 'absolute', left: g.x, top: g.y, width: g.w, height: g.h, padding: 10, background: '#F4F1EA', borderRadius: 6, boxShadow: `0 ${30 + (1 - ke) * 40}px ${80 + (1 - ke) * 60}px rgba(0,0,0,.65)`,
            transform: `translate(${ex + (fly[0] ?? 0)}px, ${ey + (fly[1] ?? 0) + drift}px) rotate(${g.rot + er + Math.sin(el * 0.3 + i) * 0.6}deg) scale(${es})`, opacity: ka * (1 - out * 0.8) }}>
            <div style={{ width: '100%', height: '100%', overflow: 'hidden', borderRadius: 2, position: 'relative' }}>
              {g.depth ? <DepthPhoto src={g.src} depth={g.depth} t={el} amt={g.amt ?? 0.06} w={g.w - 20} h={g.h - 20} cam={cam} />
                : <Img src={staticFile(g.src)} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${1.06 + 0.08 * cl(u)}) translate(${Math.sin(el * 0.2 + i) * 10}px, 0)` }} />}
              <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(115deg, transparent ${30 + ((el * 12 + i * 25) % 100)}%, rgba(255,255,255,.10) ${40 + ((el * 12 + i * 25) % 100)}%, transparent ${50 + ((el * 12 + i * 25) % 100)}%)` }} />
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


// ---------- StubsHook: frame-0 hook — two pay stubs that both look "correct" collide; a bill drops with the surprise amount ----------
// Beats (resolved times): checkAt (green ✓ on each stub) → mergeAt (stubs slide together and shrink) → billAt (bill drops, amount rolls) → qAt (question) → out.
const StubsHook: React.FC<{ p: Pn; c: Ctx }> = ({ p, c }) => {
  const now = c.now; const el = now - p.t; const out = p.out ? prog(now, p.out.t, 0.9, INOUT) : 0;
  const ck = (i: number) => (p.checkAt ? prog(now, p.checkAt[i]?.t ?? p.checkAt[0].t, 0.5, BACK) : 1);
  const mg = p.mergeAt ? prog(now, p.mergeAt.t, 0.9, INOUT) : 0;
  const bk = p.billAt ? prog(now, p.billAt.t, 0.8, BACK) : 0; const ba = p.billAt ? cl((now - p.billAt.t) / 0.2) : 0;
  const qk = p.qAt ? prog(now, p.qAt.t, 0.7) : 0;
  const shake = p.billAt && now > p.billAt.t && now < p.billAt.t + 0.35 ? Math.sin((now - p.billAt.t) * 90) * 8 * (1 - (now - p.billAt.t) / 0.35) : 0;
  const stubs = p.stubs as Pn[];
  return (
    <div style={{ position: 'absolute', left: -p.x, top: -p.y, width: 1920, height: 1080, background: C.navy, overflow: 'hidden', transform: `translate(${shake}px, ${shake * 0.4}px)` }}>
      {p.bg && <div style={{ position: 'absolute', inset: 0 }}>
        <DepthPhoto src={p.bg.src} depth={p.bg.depth} t={el} amt={0.05} cam={{ x: Math.sin(el * 0.2) * 0.6, y: 0, z: 0.1 + 0.2 * cl(el / 12) }} />
        <div style={{ position: 'absolute', inset: 0, background: `rgba(7,11,20,${p.bg.dim ?? 0.72})` }} /></div>}
      <div style={{ position: 'absolute', left: '50%', top: '30%', width: 1400, height: 1000, marginLeft: -700, borderRadius: '50%', background: `radial-gradient(closest-side, rgba(213,43,30,${0.35 * bk}), transparent)` }} />
      <div style={{ position: 'absolute', left: 0, right: 0, top: 46, textAlign: 'center', fontFamily: COND, fontSize: 36, letterSpacing: 10, color: C.gold, opacity: 1 - out }}>{p.kicker}</div>
      {stubs.map((s, i) => {
        const side = i === 0 ? -1 : 1; const bx = 960 + side * 430 - 300; const tx = -side * 300 * mg; const sc = 1 - 0.28 * mg; const ry = side * -8 * (1 - mg);
        const k = ck(i);
        return (
          <div key={i} style={{ position: 'absolute', left: bx, top: 150, width: 600, padding: '30px 36px 34px', borderRadius: 14, background: '#F4F1EA', color: '#1a1d24', fontFamily: COND,
            boxShadow: '0 40px 100px rgba(0,0,0,.6)', transform: `translate(${tx + (out * side * 900)}px, ${mg * 40 + Math.sin(el * 0.6 + i) * 5}px) rotate(${side * 3 * (1 - mg) + Math.sin(el * 0.4 + i) * 0.5}deg) scale(${sc}) perspective(1200px) rotateY(${ry}deg)`, opacity: (1 - out) * (1 - 0.55 * bk) }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 24, letterSpacing: 4, color: '#6b6f78' }}><span>{s.head}</span><span>{s.tag}</span></div>
            <div style={{ fontSize: 54, fontWeight: 700, margin: '6px 0 14px' }}>{s.title}</div>
            {(s.rows as Pn[]).map((r, j) => (
              <div key={j} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 32, padding: '8px 0', borderTop: '1px solid rgba(0,0,0,.10)' }}>
                <span>{r.label}</span><span style={{ fontWeight: 700, color: r.red ? '#B8432F' : '#1a1d24' }}>{r.value}</span></div>))}
            <div style={{ position: 'absolute', right: 26, bottom: -30, transform: `scale(${k}) rotate(-8deg)`, padding: '10px 22px', borderRadius: 10, background: '#2E8B57', color: '#fff', fontSize: 34, fontWeight: 700, letterSpacing: 3, boxShadow: '0 10px 30px rgba(46,139,87,.5)' }}>✓ {s.ok ?? 'TAX DEDUCTED'}</div>
          </div>);
      })}
      {p.billAt && now >= p.billAt.t && (
        <div style={{ position: 'absolute', left: 960 - 420, top: 300, width: 840, padding: '34px 44px', borderRadius: 16, background: '#FFFDF7', color: '#1a1d24', fontFamily: COND, textAlign: 'center',
          boxShadow: '0 60px 140px rgba(0,0,0,.75), 0 0 0 4px rgba(213,43,30,.85)', transform: `translateY(${(1 - bk) * -900 + out * 1100}px) rotate(${(1 - bk) * 12 - 1.5}deg)`, opacity: ba }}>
          <div style={{ fontSize: 28, letterSpacing: 6, color: '#6b6f78' }}>{p.bill.head}</div>
          <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: 3, marginTop: 6 }}>{p.bill.label}</div>
          <div style={{ color: '#C0392B', fontWeight: 700, marginTop: 8 }}><RollNumber value={p.bill.value} t={p.billAt.t + 0.25} now={now} size={170} dur={1.6} /></div>
          <div style={{ fontSize: 26, letterSpacing: 3, color: '#6b6f78', marginTop: 4 }}>{p.bill.note}</div>
        </div>)}
      {p.qAt && <div style={{ position: 'absolute', left: 120, right: 120, top: 860, textAlign: 'center', fontFamily: COND, fontSize: 56, fontWeight: 600, color: C.white, textTransform: 'uppercase', textShadow: '0 4px 30px rgba(0,0,0,.9)', opacity: qk * (1 - out), transform: `translateY(${(1 - qk) * 30}px)` }}>{p.question}</div>}
    </div>
  );
};

// ---------- RaceHook: frame-0 hook — three lanes start at the same gross; deductions peel off on cue; photo-finish flash + gap tags ----------
// p.lanes[{name, sub, prov, take}] · p.common[{label, value, color}] (same in every lane) · p.provColor · p.drainAt[] (one per common item + one for provincial) · p.finishAt · p.gaps[{lane, text, red}] · p.qAt · p.out
const RaceHook: React.FC<{ p: Pn; c: Ctx }> = ({ p, c }) => {
  const now = c.now; const el = now - p.t; const out = p.out ? prog(now, p.out.t, 0.9, INOUT) : 0;
  const lanes = p.lanes as Pn[]; const common = p.common as Pn[]; const gross = p.gross as number; const W = 1180; const X = 520;
  const steps = [...common.map((x) => ({ ...x, prov: false })), { label: 'PROVINCIAL TAX', color: p.provColor ?? '#E8A86A', prov: true }];
  const fin = p.finishAt ? prog(now, p.finishAt.t, 0.6, BACK) : 0; const flash = p.finishAt ? Math.max(0, 1 - Math.abs(now - p.finishAt.t - 0.1) / 0.25) : 0;
  const qk = p.qAt ? prog(now, p.qAt.t, 0.7) : 0;
  return (
    <div style={{ position: 'absolute', left: -p.x, top: -p.y, width: 1920, height: 1080, background: C.navy, overflow: 'hidden' }}>
      {p.bg && <div style={{ position: 'absolute', inset: 0 }}>
        <DepthPhoto src={p.bg.src} depth={p.bg.depth} t={el} amt={0.06} cam={{ x: 0, y: -0.3 + 0.6 * cl(el / 14), z: 0.08 + 0.3 * cl(el / 14) }} />
        <div style={{ position: 'absolute', inset: 0, background: `rgba(7,11,20,${p.bg.dim ?? 0.6})` }} /></div>}
      <div style={{ position: 'absolute', inset: 0, background: '#fff', opacity: flash * 0.35 }} />
      <div style={{ position: 'absolute', left: 0, right: 0, top: 70, textAlign: 'center', fontFamily: COND, opacity: 1 - out }}>
        <div style={{ fontSize: 34, letterSpacing: 10, color: C.gold }}>{p.kicker}</div>
        <div style={{ fontSize: 88, fontWeight: 700, color: C.white, letterSpacing: 2, marginTop: 6, textShadow: '0 6px 30px rgba(0,0,0,.7)' }}>{fin > 0.05 ? p.finishTitle : p.title}</div>
      </div>
      {lanes.map((ln, i) => {
        const y = 330 + i * 190; let done = 0; const segs: React.ReactNode[] = [];
        steps.forEach((s, j) => {
          const v = s.prov ? ln.prov : s.value; const t = p.drainAt?.[j]?.t ?? Infinity; const k = prog(now, t + i * 0.12, 0.9, INOUT);
          const right = X + W * (1 - done / gross); const wv = (W * v) / gross;
          if (k > 0) segs.push(<div key={j} style={{ position: 'absolute', left: right - wv, top: y, width: wv, height: 96, background: s.color, opacity: 0.85 * (1 - 0.6 * k), transform: `translateY(${k * 40}px)`, borderLeft: '2px solid rgba(0,0,0,.35)' }} />);
          done += v * k;
        });
        const cur = gross - done; const lead = fin > 0 && ln.take === Math.max(...lanes.map((q) => q.take));
        const li = p.laneAt?.[i]?.t !== undefined ? prog(now, p.laneAt[i].t, 0.7, BACK) : 1; const la = p.laneAt?.[i]?.t !== undefined ? cl((now - p.laneAt[i].t) / 0.25) : 1;
        return (
          <div key={i} style={{ opacity: (1 - out) * (0.45 + 0.55 * la), transform: `translateX(${out * (i % 2 ? 900 : -900) + (1 - li) * -40}px)` }}>
            <div style={{ position: 'absolute', left: 90, top: y + 6, width: 400, fontFamily: COND }}>
              <div style={{ fontSize: 50, fontWeight: 700, color: C.white, letterSpacing: 2 }}>{ln.name}</div>
              <div style={{ fontSize: 24, letterSpacing: 4, color: C.dim }}>{ln.sub}</div>
            </div>
            <div style={{ position: 'absolute', left: X, top: y, width: W, height: 96, borderRadius: 10, background: 'rgba(255,255,255,.06)', border: `2px solid ${lead ? C.gold : 'rgba(255,255,255,.14)'}`, boxShadow: lead ? `0 0 ${30 * fin}px rgba(232,194,122,.6)` : undefined }} />
            <div style={{ position: 'absolute', left: X, top: y, width: (W * cur) / gross, height: 96, borderRadius: 10, background: `linear-gradient(90deg, rgba(127,211,160,.85), rgba(95,181,133,.85))` }} />
            {segs}
            <div style={{ position: 'absolute', left: X + 24, top: y + 14, fontFamily: COND, fontWeight: 700, color: '#0b1a12' }}><RollNumber value={Math.round(cur)} t={-99} now={now} size={64} dur={0.01} /></div>
            {p.gaps && fin > 0 && p.gaps.filter((g: Pn) => g.lane === i).map((g: Pn, gi: number) => (
              <div key={gi} style={{ position: 'absolute', left: X + (W * cur) / gross + 20, top: y + 22, fontFamily: COND, fontWeight: 700, fontSize: 46, color: g.red ? C.red : C.gold, transform: `scale(${fin})`, transformOrigin: 'left center' }}>{g.text}</div>))}
          </div>);
      })}
      <div style={{ position: 'absolute', left: X, top: 935, display: 'flex', gap: 26, fontFamily: COND, fontSize: 24, letterSpacing: 2, opacity: (1 - out) * (1 - qk) }}>
        {steps.map((s, j) => <span key={j} style={{ color: now >= (p.drainAt?.[j]?.t ?? Infinity) ? C.white : C.faint }}><span style={{ display: 'inline-block', width: 14, height: 14, background: s.color, borderRadius: 3, marginRight: 8 }} />{s.label}</span>)}
      </div>
      {p.qAt && <div style={{ position: 'absolute', left: 120, right: 120, top: 920, textAlign: 'center', fontFamily: COND, fontSize: 54, fontWeight: 600, color: C.white, textTransform: 'uppercase', textShadow: '0 4px 30px rgba(0,0,0,.9)', opacity: qk * (1 - out) }}>{p.question}</div>}
    </div>
  );
};

// ---------- StacksHook: frame-0 hook — two identical cash stacks; each cut peels bills off the top on cue; the taller survivor wins ----------
// p.people[{name, sub, take, cuts[{label, value, color}]}] (cut j aligned across people) · p.cutAt[] · p.personAt[] · p.finishAt · p.delta · p.qAt · p.question · p.out
const StacksHook: React.FC<{ p: Pn; c: Ctx }> = ({ p, c }) => {
  const now = c.now; const el = now - p.t; const out = p.out ? prog(now, p.out.t, 0.9, INOUT) : 0;
  const ppl = p.people as Pn[]; const gross = (p.gross as number) ?? 10000; const N = 50; const BH = 9; const BW = 380; const base = 820;
  const fin = p.finishAt ? prog(now, p.finishAt.t, 0.7, BACK) : 0; const flash = p.finishAt ? Math.max(0, 1 - Math.abs(now - p.finishAt.t - 0.1) / 0.25) : 0;
  const qk = p.qAt ? prog(now, p.qAt.t, 0.7) : 0; const best = Math.max(...ppl.map((q) => q.take));
  return (
    <div style={{ position: 'absolute', left: -p.x, top: -p.y, width: 1920, height: 1080, background: C.navy, overflow: 'hidden' }}>
      {p.bg && <div style={{ position: 'absolute', inset: 0 }}>
        <DepthPhoto src={p.bg.src} depth={p.bg.depth} t={el} amt={0.06} cam={{ x: 0.2 - 0.4 * cl(el / 16), y: 0, z: 0.05 + 0.3 * cl(el / 16) }} />
        <div style={{ position: 'absolute', inset: 0, background: `rgba(7,11,20,${p.bg.dim ?? 0.6})` }} /></div>}
      <div style={{ position: 'absolute', inset: 0, background: '#fff', opacity: flash * 0.3 }} />
      <div style={{ position: 'absolute', left: 0, right: 0, top: 60, textAlign: 'center', fontFamily: COND, opacity: 1 - out }}>
        <div style={{ fontSize: 34, letterSpacing: 10, color: C.gold }}>{p.kicker}</div>
        <div style={{ fontSize: 84, fontWeight: 700, color: C.white, letterSpacing: 2, marginTop: 4, textShadow: '0 6px 30px rgba(0,0,0,.7)' }}>{fin > 0.05 && p.finishTitle ? p.finishTitle : p.title}</div>
      </div>
      {ppl.map((pe, i) => {
        const cx = i === 0 ? 560 : 1360; const cuts = pe.cuts as Pn[];
        const pin = p.personAt?.[i]?.t !== undefined ? prog(now, p.personAt[i].t, 0.8, BACK) : 1;
        let done = 0; let cum = 0; const ranges = cuts.map((ct, j) => { const r = [cum, cum + ct.value, prog(now, (p.cutAt?.[j]?.t ?? Infinity) + i * 0.15, 1.1, INOUT)]; cum += ct.value; done += ct.value * (r[2] as number); return r; });
        const cur = gross - done; const lead = fin > 0 && pe.take === best;
        const bills: React.ReactNode[] = [];
        for (let b = 0; b < N; b++) {
          const mid = (N - 1 - b + 0.5) * (gross / N); const j = ranges.findIndex((r) => mid >= r[0] && mid < r[1]);
          const top = base - (b + 1) * BH; let k = 0; let col = 'linear-gradient(90deg,#4f8f69,#7FD3A0 45%,#5fae80)';
          if (j >= 0) { const rk = ranges[j][2] as number; const order = (mid - ranges[j][0]) / Math.max(1, ranges[j][1] - ranges[j][0]); k = cl(rk * 1.6 - (1 - order) * 0.6); if (rk > 0) col = cuts[j].color; }
          const pop = pin * cl((pin * N - b) / 6 + 1);
          bills.push(<div key={b} style={{ position: 'absolute', left: cx - BW / 2, top, width: BW, height: BH - 2, borderRadius: 3, background: col, boxShadow: 'inset 0 1px 0 rgba(255,255,255,.25), 0 1px 0 rgba(0,0,0,.4)',
            opacity: pop * (1 - k), transform: `translate(${k * (i === 0 ? -320 : 320)}px, ${-k * 120}px) rotate(${k * (i === 0 ? -18 : 18)}deg)` }} />);
        }
        return (
          <div key={i} style={{ opacity: (1 - out) * cl(pin * 1.5), transform: `translateX(${out * (i ? 900 : -900)}px)` }}>
            <div style={{ position: 'absolute', left: cx - 300, width: 600, top: 232, textAlign: 'center', fontFamily: COND }}>
              <div style={{ fontSize: 62, fontWeight: 700, color: C.white, letterSpacing: 3 }}>{pe.name}</div>
              <div style={{ fontSize: 28, letterSpacing: 5, color: C.dim }}>{pe.sub}</div>
            </div>
            {lead && <div style={{ position: 'absolute', left: cx - BW / 2 - 14, top: base - (N * BH * cur) / gross - 14, width: BW + 28, height: (N * BH * cur) / gross + 28, borderRadius: 10, border: `3px solid ${C.gold}`, boxShadow: `0 0 ${40 * fin}px rgba(232,194,122,.55)` }} />}
            {bills}
            <div style={{ position: 'absolute', left: cx - 300, width: 600, top: base + 22, textAlign: 'center', fontFamily: COND, fontWeight: 700, color: lead ? C.gold : C.white }}><RollNumber value={Math.round(cur)} t={-99} now={now} size={72} dur={0.01} /></div>
            {cuts.map((ct, j) => { const k = ranges[j][2] as number; return k > 0 ? (
              <div key={j} style={{ position: 'absolute', left: i === 0 ? cx - BW / 2 - 330 : cx + BW / 2 + 40, width: 290, top: 400 + j * 110, textAlign: i === 0 ? 'right' : 'left', fontFamily: COND, opacity: cl(k * 2) }}>
                <div style={{ fontSize: 24, letterSpacing: 4, color: ct.color }}>{ct.label}</div>
                <div style={{ fontSize: 50, fontWeight: 700, color: ct.value ? C.white : C.faint }}>{ct.value ? '−$' + ct.value.toLocaleString('en-US') : '$0'}</div>
              </div>) : null; })}
            {lead && p.delta && <div style={{ position: 'absolute', left: cx - 200, width: 400, top: base - (N * BH * cur) / gross - 110, textAlign: 'center', fontFamily: COND, fontWeight: 700, fontSize: 70, color: C.gold, transform: `scale(${fin})`, textShadow: '0 4px 24px rgba(0,0,0,.8)' }}>{p.delta}</div>}
          </div>);
      })}
      {p.qAt && <div style={{ position: 'absolute', left: 120, right: 120, top: 930, textAlign: 'center', fontFamily: COND, fontSize: 46, fontWeight: 600, color: C.white, textTransform: 'uppercase', textShadow: '0 4px 30px rgba(0,0,0,.9)', opacity: qk * (1 - out) }}>{p.question}</div>}
    </div>
  );
};

// ---------- GaugeHook: frame-0 hook — three dial gauges ("taken from the next $1,000"); needles swing on cue; the surprise lane glows ----------
// p.people[{name, sub, taken, keep}] · p.swingAt[] · p.finishAt · p.winner (index) · p.delta · p.qAt · p.question · p.out · p.max (scale, default 600)
const GaugeHook: React.FC<{ p: Pn; c: Ctx }> = ({ p, c }) => {
  const now = c.now; const el = now - p.t; const out = p.out ? prog(now, p.out.t, 0.9, INOUT) : 0;
  const ppl = p.people as Pn[]; const MX = p.max ?? 600; const R0 = 210;
  const fin = p.finishAt ? prog(now, p.finishAt.t, 0.7, BACK) : 0; const qk = p.qAt ? prog(now, p.qAt.t, 0.7) : 0;
  const ang = (v: number) => Math.PI * (1 - v / MX); // 0 → left (180°), MX → right (0°)
  const pt = (cx: number, cy: number, r: number, a: number) => [cx + r * Math.cos(a), cy - r * Math.sin(a)];
  return (
    <div style={{ position: 'absolute', left: -p.x, top: -p.y, width: 1920, height: 1080, background: C.navy, overflow: 'hidden' }}>
      {p.bg && <div style={{ position: 'absolute', inset: 0 }}>
        <DepthPhoto src={p.bg.src} depth={p.bg.depth} t={el} amt={0.06} cam={{ x: -0.2 + 0.4 * cl(el / 16), y: 0, z: 0.05 + 0.25 * cl(el / 16) }} />
        <div style={{ position: 'absolute', inset: 0, background: `rgba(7,11,20,${p.bg.dim ?? 0.62})` }} /></div>}
      <div style={{ position: 'absolute', left: 0, right: 0, top: 60, textAlign: 'center', fontFamily: COND, opacity: 1 - out }}>
        <div style={{ fontSize: 34, letterSpacing: 10, color: C.gold }}>{p.kicker}</div>
        <div style={{ fontSize: 84, fontWeight: 700, color: C.white, letterSpacing: 2, marginTop: 4, textShadow: '0 6px 30px rgba(0,0,0,.7)' }}>{fin > 0.05 && p.finishTitle ? p.finishTitle : p.title}</div>
      </div>
      <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0, opacity: 1 - out }}>
        {ppl.map((pe, i) => {
          const cx = 360 + i * 600; const cy = 640; const k = p.swingAt?.[i] ? prog(now, p.swingAt[i].t, 1.4, BACK) : 0;
          const v = pe.taken * k; const a = ang(v); const [nx, ny] = pt(cx, cy, R0 - 30, a); const win = fin > 0 && i === p.winner;
          const arc = (v0: number, v1: number, col: string, w: number) => { const [x0, y0] = pt(cx, cy, R0, ang(v0)); const [x1, y1] = pt(cx, cy, R0, ang(v1));
            return <path d={`M ${x0} ${y0} A ${R0} ${R0} 0 0 1 ${x1} ${y1}`} stroke={col} strokeWidth={w} fill="none" strokeLinecap="round" />; };
          const ticks = [0, 100, 200, 300, 400, 500, 600].filter((t) => t <= MX);
          return (
            <g key={i} style={{ transform: `translateY(${(1 - prog(now, p.t + i * 0.15, 0.8, EX)) * 40}px)` }}>
              {arc(0, MX, 'rgba(255,255,255,.12)', 26)}
              {v > 1 && arc(0, v, win ? C.gold : C.red, 26)}
              {ticks.map((t) => { const [a1, b1] = pt(cx, cy, R0 + 22, ang(t)); const [a2, b2] = pt(cx, cy, R0 + 48, ang(t));
                return <g key={t}><line x1={a1} y1={b1} x2={pt(cx, cy, R0 + 34, ang(t))[0]} y2={pt(cx, cy, R0 + 34, ang(t))[1]} stroke="rgba(255,255,255,.35)" strokeWidth={2} />
                  <text x={a2} y={b2 + 6} fill={C.faint} fontSize={18} fontFamily="Oswald" textAnchor="middle">${t}</text></g>; })}
              <line x1={cx} y1={cy} x2={nx} y2={ny} stroke={C.white} strokeWidth={6} strokeLinecap="round" />
              <circle cx={cx} cy={cy} r={16} fill={C.white} />
              {win && <circle cx={cx} cy={cy - 60} r={R0 + 70} fill="none" stroke={C.gold} strokeWidth={3} opacity={0.6 * fin} />}
            </g>);
        })}
      </svg>
      {ppl.map((pe, i) => {
        const cx = 360 + i * 600; const k = p.swingAt?.[i] ? prog(now, p.swingAt[i].t, 1.4, EX) : 0; const win = fin > 0 && i === p.winner;
        return (
          <div key={i} style={{ position: 'absolute', left: cx - 280, width: 560, top: 0, textAlign: 'center', fontFamily: COND, opacity: 1 - out }}>
            <div style={{ position: 'absolute', top: 236, width: '100%' }}>
              <div style={{ fontSize: 54, fontWeight: 700, color: C.white, letterSpacing: 3 }}>{pe.name}</div>
              <div style={{ fontSize: 26, letterSpacing: 5, color: C.dim }}>{pe.sub}</div></div>
            <div style={{ position: 'absolute', top: 680, width: '100%', opacity: cl(k * 1.5) }}>
              <div style={{ fontSize: 24, letterSpacing: 5, color: C.dim }}>TAKEN FROM THE NEXT $1,000</div>
              <div style={{ fontSize: 66, fontWeight: 700, color: win ? C.gold : C.red }}>−${Math.round(pe.taken * k)}</div>
              <div style={{ fontSize: 34, letterSpacing: 3, color: win ? C.gold : C.white }}>KEEPS ${Math.round(1000 - pe.taken * k)}</div></div>
            {win && p.delta && <div style={{ position: 'absolute', top: 165, width: '100%', fontSize: 46, fontWeight: 700, color: C.gold, transform: `scale(${fin})` }}>{p.delta}</div>}
          </div>);
      })}
      {p.qAt && <div style={{ position: 'absolute', left: 120, right: 120, top: 935, textAlign: 'center', fontFamily: COND, fontSize: 46, fontWeight: 600, color: C.white, textTransform: 'uppercase', textShadow: '0 4px 30px rgba(0,0,0,.9)', opacity: qk * (1 - out) }}>{p.question}</div>}
    </div>
  );
};

// ---------- CurveChart: the next-$1,000 line across incomes; revealed left→right on cues; marks + person pins on cue ----------
// p.data[[x, y]] · p.xr [x0, x1] · p.yr [y0, y1] · p.revealAt[{t, x}] · p.marks[{x, text, t, color}] · p.pins[{x, name, t}] · p.title · p.sub · p.out · p.bands[{x0, x1, t, color, text}]
const CurveChart: React.FC<{ p: Pn; c: Ctx }> = ({ p, c }) => {
  const now = c.now; const el = now - p.t; const out = p.out ? prog(now, p.out.t, 0.8, INOUT) : 0; const inn = prog(now, p.t, 0.9, EX);
  const data = p.data as number[][]; const [x0, x1] = p.xr; const [y0, y1] = p.yr; const L = 190, Rr = 1730, T = 250, B = 880;
  const X = (x: number) => L + ((x - x0) / (x1 - x0)) * (Rr - L); const Y = (y: number) => B - ((y - y0) / (y1 - y0)) * (B - T);
  const rv = (p.revealAt ?? []) as Pn[]; let rx = x0;
  for (let i = 0; i < rv.length; i++) { const a = rv[i]; const b = rv[i + 1]; if (now >= a.t) { rx = b ? a.x + (b.x - a.x) * INOUT(cl((now - a.t) / Math.max(0.6, Math.min(2.5, b.t - a.t)))) * (now >= b.t ? 1 : 1) : a.x; if (b && now < b.t) rx = a.x + (b.x - a.x) * INOUT(cl((now - a.t) / Math.min(2.2, b.t - a.t))); } }
  const vis = data.filter((d) => d[0] <= rx); const yAt = (x: number) => { let v = data[0][1]; for (const d of data) { if (d[0] <= x) v = d[1]; else break; } return v; };
  const step = (pts: number[][]) => pts.map((d, i) => (i ? `L ${X(d[0])} ${Y(pts[i - 1][1])} L ${X(d[0])} ${Y(d[1])}` : `M ${X(d[0])} ${Y(d[1])}`)).join(' ');
  const line = vis.length ? step(vis) + ` L ${X(rx)} ${Y(vis[vis.length - 1][1])}` : '';
  const area = vis.length ? `${line} L ${X(rx)} ${B} L ${X(vis[0][0])} ${B} Z` : '';
  const cy = Y(yAt(rx)); const fmtK = (x: number) => '$' + Math.round(x / 1000) + 'K';
  return (
    <div style={{ position: 'absolute', left: -p.x, top: -p.y, width: 1920, height: 1080, opacity: inn * (1 - out), transform: `translateY(${(1 - inn) * 30}px)` }}>
      <div style={{ position: 'absolute', left: 110, top: 120, width: 1700, height: 860, borderRadius: 22, background: 'rgba(9,14,26,.78)', border: '1px solid rgba(255,255,255,.12)', backdropFilter: 'blur(14px)' }} />
      <div style={{ position: 'absolute', left: 160, top: 145, fontFamily: COND }}>
        <div style={{ fontSize: 40, fontWeight: 700, color: C.white, letterSpacing: 2 }}>{p.title}</div>
        <div style={{ fontSize: 22, letterSpacing: 4, color: C.dim }}>{p.sub}</div></div>
      <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
        <defs><linearGradient id="cg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#E8C27A" stopOpacity=".42" /><stop offset="1" stopColor="#E8C27A" stopOpacity="0" /></linearGradient></defs>
        {[200, 300, 400, 500, 600].filter((v) => v >= y0 && v <= y1).map((v) => <g key={v}><line x1={L} x2={Rr} y1={Y(v)} y2={Y(v)} stroke="rgba(255,255,255,.08)" />
          <text x={L - 14} y={Y(v) + 7} fill={C.faint} fontSize={20} fontFamily="Oswald" textAnchor="end">${v}</text></g>)}
        {(p.xticks ?? []).map((x: number) => <text key={x} x={X(x)} y={B + 34} fill={C.faint} fontSize={20} fontFamily="Oswald" textAnchor="middle">{fmtK(x)}</text>)}
        {(p.bands ?? []).map((b: Pn, i: number) => { const k = prog(now, b.t ?? Infinity, 0.6); return k > 0 ? <g key={i} opacity={k}>
          <rect x={X(b.x0)} y={T} width={X(b.x1) - X(b.x0)} height={B - T} fill={b.color ?? 'rgba(127,211,160,.10)'} />
          <text x={(X(b.x0) + X(b.x1)) / 2} y={T + 30} fill={C.green} fontSize={22} fontFamily="Oswald" textAnchor="middle" letterSpacing={3}>{b.text}</text></g> : null; })}
        {area && <path d={area} fill="url(#cg)" />}
        {line && <path d={line} stroke={C.gold} strokeWidth={5} fill="none" strokeLinejoin="round" />}
        {(p.marks ?? []).map((m: Pn, i: number) => { const k = prog(now, m.t ?? Infinity, 0.5); if (k <= 0) return null; const mx = X(m.x); const my = Y(yAt(m.x)); const up = (m.dy ?? -70);
          return <g key={i} opacity={k}><line x1={mx} x2={mx} y1={T + 40} y2={B} stroke={m.color ?? 'rgba(255,255,255,.35)'} strokeDasharray="6 8" strokeWidth={2} />
            <circle cx={mx} cy={my} r={9 * k} fill={m.color ?? C.white} />
            <text x={mx + (m.anchor === 'end' ? -14 : 14)} y={my + up} fill={m.color ?? C.white} fontSize={26} fontFamily="Oswald" fontWeight={600} textAnchor={m.anchor ?? 'start'}>{m.text}</text></g>; })}
        {(p.pins ?? []).map((m: Pn, i: number) => { const k = prog(now, m.t ?? Infinity, 0.6, BACK); if (k <= 0) return null; const mx = X(m.x); const my = Y(yAt(m.x));
          return <g key={i}><circle cx={mx} cy={my} r={16 * k} fill={m.color ?? C.gold} stroke={C.navy} strokeWidth={4} />
            <rect x={mx - 90} y={my - 96} width={180} height={62} rx={10} fill="rgba(7,11,20,.9)" stroke={m.color ?? C.gold} strokeWidth={2} opacity={k} />
            <text x={mx} y={my - 56} fill={m.color ?? C.gold} fontSize={30} fontFamily="Oswald" fontWeight={700} textAnchor="middle" opacity={k}>{m.name}</text></g>; })}
        {rx > x0 && rx < x1 && now < (p.cursorOff?.t ?? Infinity) && <g><circle cx={X(rx)} cy={cy} r={11} fill={C.white} />
          <text x={X(rx)} y={cy - 26} fill={C.white} fontSize={30} fontFamily="Oswald" fontWeight={700} textAnchor="middle">${Math.round(yAt(rx))}</text>
          <text x={X(rx)} y={B + 64} fill={C.gold} fontSize={26} fontFamily="Oswald" fontWeight={700} textAnchor="middle">{'$' + Math.round(rx).toLocaleString('en-US')}</text></g>}
      </svg>
    </div>
  );
};

// ---------- BonusHook: frame-0 hook — a $20,000 bonus bar; deductions drop out on cue (March stub), then the month flips and CPP/EI return ----------
// p.total · p.parts[{label, amount, tone:'tax'|'cpp', back}] · p.cutAt[] · p.month · p.flipAt · p.month2 · p.kicker · p.title · p.finishTitle · p.qAt · p.question · p.out · p.bg
const BonusHook: React.FC<{ p: Pn; c: Ctx }> = ({ p, c }) => {
  const now = c.now; const el = now - p.t; const out = p.out ? prog(now, p.out.t, 0.9, INOUT) : 0;
  const parts = p.parts as Pn[]; const tot = p.total as number; const W = 1400, X0 = 260, Y = 400, H = 150;
  const flip = p.flipAt ? prog(now, p.flipAt.t, 0.9, BACK) : 0; const qk = p.qAt ? prog(now, p.qAt.t, 0.7) : 0;
  const cut = parts.map((_, i) => p.cutAt?.[i]?.t !== undefined ? prog(now, p.cutAt[i].t, 0.6, BACK) : 0);
  const ret = parts.map((pt) => pt.back ? flip : 0);
  const taken = parts.reduce((a, pt, i) => a + pt.amount * cut[i] * (1 - ret[i]), 0); const net = Math.round(tot - taken);
  let off = W * (1 - parts.reduce((a, pt) => a + pt.amount, 0) / tot);
  const fmt = (v: number) => '$' + Math.round(v).toLocaleString('en-US');
  return (
    <div style={{ position: 'absolute', left: -p.x, top: -p.y, width: 1920, height: 1080, background: C.navy, overflow: 'hidden' }}>
      {p.bg && <div style={{ position: 'absolute', inset: 0 }}>
        <DepthPhoto src={p.bg.src} depth={p.bg.depth} t={el} amt={0.06} cam={{ x: 0.3 - 0.6 * cl(el / 20), y: 0, z: 0.05 + 0.22 * cl(el / 20) }} />
        <div style={{ position: 'absolute', inset: 0, background: `rgba(7,11,20,${p.bg.dim ?? 0.66})` }} /></div>}
      <div style={{ position: 'absolute', left: 0, right: 0, top: 56, textAlign: 'center', fontFamily: COND, opacity: 1 - out }}>
        <div style={{ fontSize: 34, letterSpacing: 10, color: C.gold }}>{p.kicker}</div>
        <div style={{ fontSize: 84, fontWeight: 700, color: C.white, letterSpacing: 2, marginTop: 4, textShadow: '0 6px 30px rgba(0,0,0,.7)' }}>{flip > 0.05 && p.finishTitle ? p.finishTitle : p.title}</div>
      </div>
      <div style={{ position: 'absolute', left: X0, top: Y - 150, width: W, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', fontFamily: COND, opacity: 1 - out }}>
        <div><div style={{ fontSize: 26, letterSpacing: 6, color: C.dim }}>ON THE STUB</div>
          <div style={{ fontSize: 92, fontWeight: 700, color: C.gold, lineHeight: 1 }}>{fmt(net)}</div></div>
        <div style={{ padding: '10px 26px', borderRadius: 12, border: `2px solid ${flip > 0.5 ? C.green : C.gold}`, fontSize: 40, fontWeight: 700, letterSpacing: 8, color: flip > 0.5 ? C.green : C.gold, transform: `rotateX(${Math.sin(flip * Math.PI) * 80}deg)` }}>{flip > 0.5 ? p.month2 : p.month}</div>
      </div>
      <div style={{ position: 'absolute', left: X0, top: Y, width: W, height: H, borderRadius: 18, border: '2px dashed rgba(255,255,255,.22)', opacity: 1 - out }} />
      <div style={{ position: 'absolute', left: X0, top: Y, width: off, height: H, borderRadius: '18px 0 0 18px', background: 'linear-gradient(180deg,#F1D38E,#C9A055)', opacity: 1 - out, boxShadow: '0 20px 50px rgba(0,0,0,.45)' }}>
        <div style={{ position: 'absolute', left: 30, top: 44, fontFamily: COND, fontSize: 52, fontWeight: 700, color: '#1A1408', letterSpacing: 3 }}>YOU KEEP</div></div>
      {parts.map((pt, i) => {
        const w = W * pt.amount / tot; const x = X0 + off; off += w; const k = cut[i] * (1 - ret[i]);
        const col = pt.tone === 'tax' ? C.red : C.org; const back = ret[i] > 0.5;
        return (
          <div key={i} style={{ position: 'absolute', left: x + 6 * k, top: Y + k * (240 + i * 18), width: w - 4, height: H, borderRadius: i === parts.length - 1 ? '0 18px 18px 0' : 4, opacity: 1 - out,
            background: back ? 'linear-gradient(180deg,#F1D38E,#C9A055)' : `linear-gradient(180deg, ${col}, ${col}bb)`, transform: `rotate(${k * (i - 1) * 3}deg)`, boxShadow: '0 16px 40px rgba(0,0,0,.45)' }}>
            {cut[i] > 0.4 && !back && <div style={{ position: 'absolute', left: i === 0 ? 0 : (i - 1) * 170 - 40, top: H + 12, minWidth: 220, whiteSpace: 'nowrap', fontFamily: COND, color: col, opacity: cl((cut[i] - 0.4) * 3) }}>
              <div style={{ fontSize: 24, letterSpacing: 5 }}>{pt.label}</div><div style={{ fontSize: 48, fontWeight: 700, lineHeight: 1 }}>−{fmt(pt.amount)}</div></div>}
          </div>);
      })}
      {p.qAt && <div style={{ position: 'absolute', left: 120, right: 120, top: 900, textAlign: 'center', fontFamily: COND, fontSize: 48, fontWeight: 600, color: C.white, textTransform: 'uppercase', textShadow: '0 4px 30px rgba(0,0,0,.9)', opacity: qk * (1 - out) }}>{p.question}</div>}
    </div>
  );
};

// ---------- SoldHook: frame-0 hook — three SOLD house cards with the same profit; a tax stamp slams onto each on cue ----------
// p.cards[{name, sub, tax, color, tone}] · p.gain · p.cardAt[] · p.stampAt[] · p.finishAt · p.title · p.kicker · p.qAt · p.question · p.out · p.bg
const SoldHook: React.FC<{ p: Pn; c: Ctx }> = ({ p, c }) => {
  const now = c.now; const el = now - p.t; const out = p.out ? prog(now, p.out.t, 0.9, INOUT) : 0;
  const cards = p.cards as Pn[]; const fin = p.finishAt ? prog(now, p.finishAt.t, 0.7, BACK) : 0;
  const qk = p.qAt ? prog(now, p.qAt.t, 0.7) : 0; const CW = 500, CH = 640, GAP = 70; const X0 = (1920 - (3 * CW + 2 * GAP)) / 2;
  return (
    <div style={{ position: 'absolute', left: -p.x, top: -p.y, width: 1920, height: 1080, background: C.navy, overflow: 'hidden' }}>
      {p.bg && <div style={{ position: 'absolute', inset: 0 }}>
        <DepthPhoto src={p.bg.src} depth={p.bg.depth} t={el} amt={0.06} cam={{ x: -0.3 + 0.6 * cl(el / 18), y: 0, z: 0.05 + 0.25 * cl(el / 18) }} />
        <div style={{ position: 'absolute', inset: 0, background: `rgba(7,11,20,${p.bg.dim ?? 0.66})` }} /></div>}
      <div style={{ position: 'absolute', left: 0, right: 0, top: 56, textAlign: 'center', fontFamily: COND, opacity: 1 - out }}>
        <div style={{ fontSize: 34, letterSpacing: 10, color: C.gold }}>{p.kicker}</div>
        <div style={{ fontSize: 84, fontWeight: 700, color: C.white, letterSpacing: 2, marginTop: 4, textShadow: '0 6px 30px rgba(0,0,0,.7)' }}>{fin > 0.05 && p.finishTitle ? p.finishTitle : p.title}</div>
      </div>
      {cards.map((cd, i) => {
        const x = X0 + i * (CW + GAP); const ci = p.cardAt?.[i]?.t !== undefined ? prog(now, p.cardAt[i].t + i * 0.18, 0.8, BACK) : 1;
        const st = p.stampAt?.[i]?.t !== undefined ? prog(now, p.stampAt[i].t, 0.45, BACK) : 0; const fl = p.stampAt?.[i]?.t !== undefined ? Math.max(0, 1 - Math.abs(now - p.stampAt[i].t - 0.1) / 0.22) : 0;
        const col = cd.tone === 'good' ? C.green : cd.tone === 'bad' ? C.red : C.org;
        return (
          <div key={i} style={{ position: 'absolute', left: x, top: 230 + (1 - ci) * 160, width: CW, height: CH, opacity: (1 - out) * cl(ci * 1.6), transform: `translateX(${out * (i === 0 ? -1100 : i === 2 ? 1100 : 0)}px) scale(${0.96 + 0.04 * ci})`, borderRadius: 26, background: 'linear-gradient(165deg, rgba(14,22,38,.92), rgba(9,14,26,.88))', border: `2px solid ${st > 0.5 ? col : 'rgba(255,255,255,.16)'}`, boxShadow: st > 0.5 ? `0 0 ${46 * st}px ${col}55` : '0 24px 60px rgba(0,0,0,.5)' }}>
            <svg width={CW} height={190} viewBox="0 0 500 190" style={{ position: 'absolute', left: 0, top: 18 }}>
              <path d="M110 150 L110 88 L250 20 L390 88 L390 150 Z" fill="rgba(255,255,255,.10)" stroke="rgba(255,255,255,.55)" strokeWidth={4} strokeLinejoin="round" />
              <rect x="224" y="98" width="52" height="52" fill="rgba(232,194,122,.35)" stroke={C.gold} strokeWidth={3} />
              <rect x="136" y="100" width="46" height="34" fill="rgba(143,179,232,.35)" stroke="rgba(255,255,255,.5)" strokeWidth={3} />
              <rect x="318" y="100" width="46" height="34" fill="rgba(143,179,232,.35)" stroke="rgba(255,255,255,.5)" strokeWidth={3} />
            </svg>
            <div style={{ position: 'absolute', right: -14, top: 26, padding: '6px 22px', fontFamily: COND, fontSize: 30, fontWeight: 700, letterSpacing: 6, color: '#fff', background: C.red, transform: 'rotate(8deg)', boxShadow: '0 6px 18px rgba(0,0,0,.45)' }}>SOLD</div>
            <div style={{ position: 'absolute', left: 0, right: 0, top: 220, textAlign: 'center', fontFamily: COND }}>
              <div style={{ fontSize: 58, fontWeight: 700, color: C.white, letterSpacing: 3 }}>{cd.name}</div>
              <div style={{ fontSize: 24, letterSpacing: 4, color: C.dim, marginTop: 2 }}>{cd.sub}</div>
              <div style={{ fontSize: 22, letterSpacing: 5, color: C.faint, marginTop: 22 }}>PROFIT</div>
              <div style={{ fontSize: 62, fontWeight: 700, color: C.gold }}>${(p.gain as number).toLocaleString('en-US')}</div>
            </div>
            <div style={{ position: 'absolute', left: 30, right: 30, top: 470, height: 130, borderRadius: 16, border: `3px dashed ${st > 0.05 ? col : 'rgba(255,255,255,.2)'}`, textAlign: 'center', fontFamily: COND, overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, background: '#fff', opacity: fl * 0.45 }} />
              {st < 0.05 && <div style={{ position: 'absolute', left: 0, right: 0, top: 36, fontSize: 40, letterSpacing: 8, color: C.faint }}>TAX ?</div>}
              {st >= 0.05 && <div style={{ transform: `scale(${1.5 - 0.5 * st}) rotate(${(1 - st) * -8}deg)`, opacity: cl(st * 2), transformOrigin: 'center', paddingTop: 10 }}>
                <div style={{ fontSize: 22, letterSpacing: 6, color: col }}>TAX</div>
                <div style={{ fontSize: 66, fontWeight: 700, color: col, lineHeight: 1 }}>${(cd.tax as number).toLocaleString('en-US')}</div></div>}
            </div>
          </div>);
      })}
      {p.qAt && <div style={{ position: 'absolute', left: 120, right: 120, top: 878, textAlign: 'center', fontFamily: COND, fontSize: 44, fontWeight: 600, color: C.white, textTransform: 'uppercase', textShadow: '0 4px 30px rgba(0,0,0,.9)', opacity: qk * (1 - out) }}>{p.question}</div>}
    </div>
  );
};

// ---------- FedProvHook: frame-0 hook — one income-tax bar splits into FEDERAL + PROVINCIAL; province pill cycles, only the provincial block moves ----------
// p.total · p.fed · p.provs[{code, amount}] · p.splitAt · p.provAt[] (one per provs[1..]) · p.lockAt · p.kicker · p.title · p.finishTitle · p.qAt · p.question · p.out · p.bg
const FedProvHook: React.FC<{ p: Pn; c: Ctx }> = ({ p, c }) => {
  const now = c.now; const el = now - p.t; const out = p.out ? prog(now, p.out.t, 0.9, INOUT) : 0;
  const provs = p.provs as Pn[]; const fed = p.fed as number; const sp = p.splitAt ? prog(now, p.splitAt.t, 0.9, BACK) : 0;
  let prov = provs[0].amount; let idx = 0;
  provs.slice(1).forEach((pv, i) => { const t = p.provAt?.[i]?.t; if (t === undefined) return; const k = prog(now, t, 0.7, INOUT); prov += (pv.amount - prov) * k; if (k > 0.5) idx = i + 1; });
  const lk = p.lockAt ? prog(now, p.lockAt.t, 0.6, BACK) : 0; const qk = p.qAt ? prog(now, p.qAt.t, 0.7) : 0;
  const W = 1400, X0 = 260, Y = 420, H = 170, scale = W / (fed + provs[0].amount); const gap = 90 * sp;
  const fw = fed * scale - gap / 2, pw = prov * scale - gap / 2, px = X0 + fed * scale + gap / 2;
  const fmt = (v: number) => '$' + Math.round(v).toLocaleString('en-US');
  const goldBar = 'linear-gradient(180deg,#F1D38E,#C9A055)', blueBar = 'linear-gradient(180deg,#A9C6F0,#6F93C9)';
  const mix = (a: string, b: string) => (sp > 0.5 ? b : a);
  return (
    <div style={{ position: 'absolute', left: -p.x, top: -p.y, width: 1920, height: 1080, background: C.navy, overflow: 'hidden' }}>
      {p.bg && <div style={{ position: 'absolute', inset: 0 }}>
        <DepthPhoto src={p.bg.src} depth={p.bg.depth} t={el} amt={0.06} cam={{ x: 0.3 - 0.6 * cl(el / 22), y: 0, z: 0.05 + 0.22 * cl(el / 22) }} />
        <div style={{ position: 'absolute', inset: 0, background: `rgba(7,11,20,${p.bg.dim ?? 0.66})` }} /></div>}
      <div style={{ position: 'absolute', left: 0, right: 0, top: 56, textAlign: 'center', fontFamily: COND, opacity: 1 - out }}>
        <div style={{ fontSize: 34, letterSpacing: 10, color: C.gold }}>{p.kicker}</div>
        <div style={{ fontSize: 84, fontWeight: 700, color: C.white, letterSpacing: 2, marginTop: 4, textShadow: '0 6px 30px rgba(0,0,0,.7)' }}>{sp > 0.5 && p.finishTitle ? p.finishTitle : p.title}</div>
      </div>
      <div style={{ position: 'absolute', left: X0, top: Y - 150, width: W, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', fontFamily: COND, opacity: 1 - out }}>
        <div><div style={{ fontSize: 26, letterSpacing: 6, color: C.dim }}>INCOME TAX · $75,000 SALARY</div>
          <div style={{ fontSize: 92, fontWeight: 700, color: C.white, lineHeight: 1 }}>{fmt(fed + prov)}</div></div>
        <div style={{ padding: '10px 30px', borderRadius: 12, border: `2px solid ${C.gold}`, fontSize: 46, fontWeight: 700, letterSpacing: 10, color: C.gold, transform: `rotateX(${(p.provAt ?? []).reduce((a: number, w: Pn) => a + (w?.t !== undefined ? Math.sin(prog(now, w.t, 0.7, INOUT) * Math.PI) * 80 : 0), 0)}deg)` }}>{provs[idx].code}</div>
      </div>
      <div style={{ position: 'absolute', left: X0, top: Y, width: fw, height: H, borderRadius: sp > 0.3 ? 18 : '18px 0 0 18px', background: mix(goldBar, blueBar), opacity: 1 - out, boxShadow: lk > 0.05 ? `0 0 ${50 * lk}px rgba(143,179,232,.7)` : '0 20px 50px rgba(0,0,0,.45)', transform: `translateX(${-out * 900}px)` }}>
        {sp > 0.4 && <div style={{ position: 'absolute', left: 30, top: 26, fontFamily: COND, color: '#0D1626', opacity: cl((sp - 0.4) * 2) }}>
          <div style={{ fontSize: 30, letterSpacing: 6, fontWeight: 600 }}>FEDERAL</div><div style={{ fontSize: 70, fontWeight: 700, lineHeight: 1.05 }}>{fmt(fed)}</div></div>}
        {lk > 0.05 && <div style={{ position: 'absolute', right: 22, top: 22, padding: '6px 16px', borderRadius: 10, background: '#0D1626', fontFamily: COND, fontSize: 26, letterSpacing: 4, color: C.blue, transform: `scale(${0.6 + 0.4 * lk})`, opacity: lk }}>= SAME IN EVERY PROVINCE</div>}
      </div>
      <div style={{ position: 'absolute', left: px, top: Y, width: pw, height: H, borderRadius: sp > 0.3 ? 18 : '0 18px 18px 0', background: goldBar, opacity: 1 - out, boxShadow: '0 20px 50px rgba(0,0,0,.45)', transform: `translateX(${out * 900}px)` }}>
        {sp > 0.4 && <div style={{ position: 'absolute', left: 26, top: 26, fontFamily: COND, color: '#1A1408', opacity: cl((sp - 0.4) * 2), whiteSpace: 'nowrap' }}>
          <div style={{ fontSize: 30, letterSpacing: 6, fontWeight: 600 }}>{provs[idx].code}</div><div style={{ fontSize: 70, fontWeight: 700, lineHeight: 1.05 }}>{fmt(prov)}</div></div>}
      </div>
      {sp > 0.4 && <div style={{ position: 'absolute', left: X0, top: Y + H + 24, width: W, display: 'flex', fontFamily: COND, fontSize: 30, letterSpacing: 5, opacity: cl((sp - 0.4) * 2) * (1 - out) }}>
        <div style={{ width: fw + gap, color: C.blue }}>GOES TO OTTAWA</div><div style={{ color: C.gold }}>GOES TO THE PROVINCE</div></div>}
      {p.qAt && <div style={{ position: 'absolute', left: 120, right: 120, top: 880, textAlign: 'center', fontFamily: COND, fontSize: 50, fontWeight: 600, color: C.white, textTransform: 'uppercase', textShadow: '0 4px 30px rgba(0,0,0,.9)', opacity: qk * (1 - out) }}>{p.question}</div>}
    </div>
  );
};

export const PANELS_MOTION: Record<string, React.FC<{ p: Pn; c: Ctx }>> = { opening: OpeningScene, ptable: ProgressiveTable, collage: CollageHook, stubs: StubsHook, race: RaceHook, stacks: StacksHook, gauges: GaugeHook, curve: CurveChart, sold: SoldHook, bonus: BonusHook, fedprov: FedProvHook };
