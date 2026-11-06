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

// ---------- OasHook: frame-0 hook — two couples, 12 monthly OAS cheques each; one row's cheques drain by the clawback, the other stays whole ----------
// p.rows[{name, sub, loss, tone}] · p.monthly · p.months[] · p.cutAt · p.keepAt · p.kicker · p.title · p.finishTitle · p.qAt · p.question · p.out · p.bg
const OasHook: React.FC<{ p: Pn; c: Ctx }> = ({ p, c }) => {
  const now = c.now; const el = now - p.t; const out = p.out ? prog(now, p.out.t, 0.9, INOUT) : 0;
  const rows = p.rows as Pn[]; const months = p.months as string[]; const M = p.monthly as number;
  const cut = p.cutAt?.t; const keep = p.keepAt ? prog(now, p.keepAt.t, 0.6, BACK) : 0; const qk = p.qAt ? prog(now, p.qAt.t, 0.7) : 0;
  const X0 = 250, W = 1420, n = months.length, gap = 16, bw = (W - (n - 1) * gap) / n, BH = 165;
  const fmt = (v: number) => '$' + v.toLocaleString('en-US', { minimumFractionDigits: v % 1 ? 2 : 0, maximumFractionDigits: 2 });
  const fin = cut !== undefined ? prog(now, cut + n * 0.09, 0.6) : 0;
  return (
    <div style={{ position: 'absolute', left: -p.x, top: -p.y, width: 1920, height: 1080, background: C.navy, overflow: 'hidden' }}>
      {p.bg && <div style={{ position: 'absolute', inset: 0 }}>
        <DepthPhoto src={p.bg.src} depth={p.bg.depth} t={el} amt={0.06} cam={{ x: -0.3 + 0.6 * cl(el / 22), y: 0, z: 0.05 + 0.22 * cl(el / 22) }} />
        <div style={{ position: 'absolute', inset: 0, background: `rgba(7,11,20,${p.bg.dim ?? 0.66})` }} /></div>}
      <div style={{ position: 'absolute', left: 0, right: 0, top: 44, textAlign: 'center', fontFamily: COND, opacity: 1 - out }}>
        <div style={{ fontSize: 34, letterSpacing: 10, color: C.gold }}>{p.kicker}</div>
        <div style={{ fontSize: 80, fontWeight: 700, color: fin > 0.5 && p.finishTitle ? C.red : C.white, letterSpacing: 2, marginTop: 4, textShadow: '0 6px 30px rgba(0,0,0,.7)' }}>{fin > 0.5 && p.finishTitle ? p.finishTitle : p.title}</div>
      </div>
      {rows.map((r, ri) => {
        const y = 240 + ri * 300; const ri0 = prog(now, p.t + 0.15 + ri * 0.35, 0.7, BACK);
        const lossPer = (r.loss ?? 0) / n; const good = !r.loss;
        const lost = r.loss && cut !== undefined ? months.reduce((a, _, i) => a + lossPer * prog(now, cut + i * 0.09, 0.45, EX), 0) : 0;
        return (
          <div key={ri} style={{ position: 'absolute', left: 0, top: y, width: 1920, opacity: (1 - out) * cl(ri0 * 1.5), transform: `translateX(${(1 - ri0) * (ri ? 80 : -80)}px)` }}>
            <div style={{ position: 'absolute', left: X0, top: 0, width: W, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontFamily: COND }}>
              <div><span style={{ fontSize: 44, fontWeight: 700, color: C.white, letterSpacing: 3 }}>{r.name}</span><span style={{ fontSize: 28, color: C.dim, letterSpacing: 4, marginLeft: 22 }}>{r.sub}</span></div>
              <div style={{ fontSize: 46, fontWeight: 700, color: good ? C.green : C.red, opacity: good ? keep : cl(lost / 50) }}>{good ? 'OAS LOST: $0' : `−${fmt(Math.round(lost))}`}</div>
            </div>
            {months.map((m, i) => {
              const k = r.loss && cut !== undefined ? prog(now, cut + i * 0.09, 0.45, EX) : 0; const h = BH * (1 - (lossPer / M) * k);
              return (
                <div key={i} style={{ position: 'absolute', left: X0 + i * (bw + gap), top: 70, width: bw, height: BH + 50 }}>
                  <div style={{ position: 'absolute', left: 0, bottom: 50, width: bw, height: BH, borderRadius: 10, border: '1px dashed rgba(255,255,255,.18)' }} />
                  {k > 0 && <div style={{ position: 'absolute', left: 0, bottom: 50 + h + 40 * k, width: bw, height: BH - h, borderRadius: 10, background: C.red, opacity: 1 - k * 0.85, transform: `rotate(${k * (i % 2 ? 8 : -8)}deg)` }} />}
                  <div style={{ position: 'absolute', left: 0, bottom: 50, width: bw, height: h, borderRadius: 10, background: good && keep > 0.5 ? 'linear-gradient(180deg,#9FE3B9,#5BB585)' : 'linear-gradient(180deg,#F1D38E,#C9A055)', boxShadow: good && keep > 0.5 ? `0 0 ${24 * keep}px rgba(127,211,160,.5)` : '0 10px 26px rgba(0,0,0,.45)' }} />
                  <div style={{ position: 'absolute', left: 0, right: 0, bottom: 14, textAlign: 'center', fontFamily: COND, fontSize: 22, letterSpacing: 2, color: C.dim }}>{m}</div>
                </div>);
            })}
          </div>);
      })}
      <div style={{ position: 'absolute', left: 250, top: 196, fontFamily: COND, fontSize: 26, letterSpacing: 5, color: C.dim, opacity: 1 - out }}>OAS · {fmt(M)} / MONTH · JULY → JUNE</div>
      {p.qAt && <div style={{ position: 'absolute', left: 120, right: 120, top: 862, textAlign: 'center', fontFamily: COND, fontSize: 48, fontWeight: 600, color: C.white, textTransform: 'uppercase', textShadow: '0 4px 30px rgba(0,0,0,.9)', opacity: qk * (1 - out) }}>{p.question}</div>}
    </div>
  );
};

// ---------- WindowHook: frame-0 hook — an age timeline 60→75 with a glowing low-tax window; one $10,000 block lands at 62 (cheap) then at 72 (expensive) ----------
// p.ages[a0,a1] · p.win[w0,w1] · p.stops[{age, tax, tone, label}] · p.stopAt[] · p.closeAt · p.kicker · p.title · p.finishTitle · p.qAt · p.question · p.out · p.bg
const WindowHook: React.FC<{ p: Pn; c: Ctx }> = ({ p, c }) => {
  const now = c.now; const el = now - p.t; const out = p.out ? prog(now, p.out.t, 0.9, INOUT) : 0;
  const [a0, a1] = p.ages as number[]; const [w0, w1] = p.win as number[]; const stops = p.stops as Pn[];
  const X0 = 200, W = 1520, Y = 560; const ax = (a: number) => X0 + (W * (a - a0)) / (a1 - a0);
  const wi = prog(now, p.t + 0.3, 1.0, EX); const cls = p.closeAt ? prog(now, p.closeAt.t, 0.8, INOUT) : 0; const qk = p.qAt ? prog(now, p.qAt.t, 0.7) : 0;
  const ks = stops.map((_, i) => (p.stopAt?.[i]?.t !== undefined ? prog(now, p.stopAt[i].t, 0.7, BACK) : 0));
  const cur = ks[1] > 0.05 ? 1 : 0; const bx = cur ? ax(stops[0].age) + (ax(stops[1].age) - ax(stops[0].age)) * ks[1] : ax(stops[0].age);
  const fin = ks[1] > 0.6;
  return (
    <div style={{ position: 'absolute', left: -p.x, top: -p.y, width: 1920, height: 1080, background: C.navy, overflow: 'hidden' }}>
      {p.bg && <div style={{ position: 'absolute', inset: 0 }}>
        <DepthPhoto src={p.bg.src} depth={p.bg.depth} t={el} amt={0.06} cam={{ x: 0.3 - 0.6 * cl(el / 22), y: 0, z: 0.05 + 0.22 * cl(el / 22) }} />
        <div style={{ position: 'absolute', inset: 0, background: `rgba(7,11,20,${p.bg.dim ?? 0.66})` }} /></div>}
      <div style={{ position: 'absolute', left: 0, right: 0, top: 50, textAlign: 'center', fontFamily: COND, opacity: 1 - out }}>
        <div style={{ fontSize: 34, letterSpacing: 10, color: C.gold }}>{p.kicker}</div>
        <div style={{ fontSize: 84, fontWeight: 700, color: C.white, letterSpacing: 2, marginTop: 4, textShadow: '0 6px 30px rgba(0,0,0,.7)' }}>{fin && p.finishTitle ? p.finishTitle : p.title}</div>
      </div>
      <div style={{ opacity: 1 - out }}>
        <div style={{ position: 'absolute', left: ax(w0), top: Y - 260, width: (ax(w1) - ax(w0)) * wi * (1 - 0.0 * cls), height: 300, borderRadius: 22, background: `linear-gradient(180deg, rgba(127,211,160,${0.28 * (1 - 0.6 * cls)}), rgba(127,211,160,.04))`, border: `2px solid rgba(127,211,160,${0.7 * (1 - 0.6 * cls)})` }}>
          <div style={{ position: 'absolute', left: 24, top: 18, fontFamily: COND, fontSize: 30, letterSpacing: 6, color: C.green, opacity: wi }}>LOW-TAX WINDOW</div>
        </div>
        <div style={{ position: 'absolute', left: ax(w1) - 4, top: Y - 290, width: 8, height: 330 * cls, background: C.red, borderRadius: 4, boxShadow: `0 0 ${20 * cls}px ${C.red}` }} />
        {cls > 0.3 && <div style={{ position: 'absolute', left: ax(w1) + 18, top: Y - 290, fontFamily: COND, fontSize: 26, letterSpacing: 4, color: C.red, opacity: cls }}>RRSP → RRIF BY 71</div>}
        <div style={{ position: 'absolute', left: X0, top: Y + 40, width: W, height: 4, background: 'rgba(255,255,255,.5)' }} />
        {Array.from({ length: a1 - a0 + 1 }, (_, i) => a0 + i).map((a) => (
          <div key={a} style={{ position: 'absolute', left: ax(a) - 30, width: 60, top: Y + 56, textAlign: 'center', fontFamily: COND, fontSize: a % 5 === 0 || stops.some((s) => s.age === a) ? 34 : 22, color: stops.some((s) => s.age === a) ? C.white : C.dim }}>{a}</div>))}
        {(ks[0] > 0.02) && <div style={{ position: 'absolute', left: bx - 110, top: Y - 150 - 60 * (1 - ks[0]), width: 220, height: 150, borderRadius: 18, background: 'linear-gradient(180deg,#F1D38E,#C9A055)', boxShadow: '0 20px 50px rgba(0,0,0,.5)', opacity: cl(ks[0] * 2), display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: COND, color: '#1A1408' }}>
          <div style={{ fontSize: 22, letterSpacing: 5 }}>RRSP</div><div style={{ fontSize: 56, fontWeight: 700 }}>$10,000</div></div>}
        {stops.map((s, i) => ks[i] > 0.05 && (
          <div key={i} style={{ position: 'absolute', left: ax(s.age) - 160, width: 320, top: Y + 120, textAlign: 'center', fontFamily: COND, opacity: cl(ks[i] * 1.5), transform: `scale(${0.8 + 0.2 * ks[i]})` }}>
            <div style={{ fontSize: 24, letterSpacing: 5, color: C.dim }}>{s.label}</div>
            <div style={{ fontSize: 86, fontWeight: 700, color: s.tone === 'good' ? C.green : C.red, lineHeight: 1 }}>{'$' + (s.tax as number).toLocaleString('en-US')}</div>
          </div>))}
      </div>
      {p.qAt && <div style={{ position: 'absolute', left: 120, right: 120, top: 900, textAlign: 'center', fontFamily: COND, fontSize: 50, fontWeight: 600, color: C.white, textTransform: 'uppercase', textShadow: '0 4px 30px rgba(0,0,0,.9)', opacity: qk * (1 - out) }}>{p.question}</div>}
    </div>
  );
};

// ---------- CcbHook: frame-0 hook — a CCB meter; an RRSP card slides the net-income knob left, the benefit rises and a tax-saved tag pops ----------
// p.before · p.after · p.tax · p.total · p.incFrom · p.incTo · p.lo · p.hi · p.showAt · p.moveAt · p.totalAt · p.kicker · p.title · p.finishTitle · p.qAt · p.question · p.out · p.bg
const CcbHook: React.FC<{ p: Pn; c: Ctx }> = ({ p, c }) => {
  const now = c.now; const el = now - p.t; const out = p.out ? prog(now, p.out.t, 0.9, INOUT) : 0;
  const sh = p.showAt ? prog(now, p.showAt.t, 0.7, BACK) : 1; const mv = p.moveAt ? prog(now, p.moveAt.t, 1.4, INOUT) : 0;
  const tk = p.totalAt ? prog(now, p.totalAt.t, 0.6, BACK) : 0; const qk = p.qAt ? prog(now, p.qAt.t, 0.7) : 0;
  const inc = p.incFrom + (p.incTo - p.incFrom) * mv; const ccb = p.before + (p.after - p.before) * mv;
  const X0 = 260, W = 1400, Y = 640; const kx = X0 + (W * (inc - p.lo)) / (p.hi - p.lo);
  const fmt = (v: number) => '$' + Math.round(v).toLocaleString('en-US');
  return (
    <div style={{ position: 'absolute', left: -p.x, top: -p.y, width: 1920, height: 1080, background: C.navy, overflow: 'hidden' }}>
      {p.bg && <div style={{ position: 'absolute', inset: 0 }}>
        <DepthPhoto src={p.bg.src} depth={p.bg.depth} t={el} amt={0.06} cam={{ x: -0.3 + 0.6 * cl(el / 22), y: 0, z: 0.05 + 0.22 * cl(el / 22) }} />
        <div style={{ position: 'absolute', inset: 0, background: `rgba(7,11,20,${p.bg.dim ?? 0.66})` }} /></div>}
      <div style={{ position: 'absolute', left: 0, right: 0, top: 50, textAlign: 'center', fontFamily: COND, opacity: 1 - out }}>
        <div style={{ fontSize: 34, letterSpacing: 10, color: C.gold }}>{p.kicker}</div>
        <div style={{ fontSize: 84, fontWeight: 700, color: C.white, letterSpacing: 2, marginTop: 4, textShadow: '0 6px 30px rgba(0,0,0,.7)' }}>{mv > 0.5 && p.finishTitle ? p.finishTitle : p.title}</div>
      </div>
      <div style={{ opacity: (1 - out) * cl(sh * 1.4) }}>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 250, textAlign: 'center', fontFamily: COND }}>
          <div style={{ fontSize: 30, letterSpacing: 8, color: C.dim }}>CANADA CHILD BENEFIT · PER YEAR</div>
          <div style={{ fontSize: 170, fontWeight: 700, lineHeight: 1, color: mv > 0.05 ? C.green : C.gold, textShadow: '0 10px 40px rgba(0,0,0,.6)', transform: `scale(${0.9 + 0.1 * sh})` }}>{fmt(ccb)}</div>
        </div>
        <div style={{ position: 'absolute', left: X0, top: Y, width: W, height: 14, borderRadius: 7, background: 'linear-gradient(90deg, rgba(127,211,160,.8), rgba(232,194,122,.8), rgba(229,128,110,.8))' }} />
        <div style={{ position: 'absolute', left: X0, top: Y + 30, width: W, display: 'flex', justifyContent: 'space-between', fontFamily: COND, fontSize: 24, letterSpacing: 4, color: C.dim }}><span>LOWER NET INCOME · MORE CCB</span><span>HIGHER NET INCOME · LESS CCB</span></div>
        <div style={{ position: 'absolute', left: kx - 180, top: Y - 120, width: 360, textAlign: 'center', fontFamily: COND }}>
          <div style={{ fontSize: 22, letterSpacing: 4, color: C.dim }}>FAMILY NET INCOME</div>
          <div style={{ fontSize: 44, fontWeight: 700, color: C.white }}>{fmt(inc)}</div></div>
        <div style={{ position: 'absolute', left: kx - 18, top: Y - 11, width: 36, height: 36, borderRadius: 18, background: C.white, boxShadow: '0 0 20px rgba(255,255,255,.6)' }} />
        {mv > 0.02 && <div style={{ position: 'absolute', left: X0 + W - 380 - 200 * mv, top: Y + 90, padding: '14px 26px', borderRadius: 14, background: 'linear-gradient(180deg,#F1D38E,#C9A055)', fontFamily: COND, fontSize: 36, fontWeight: 700, color: '#1A1408', opacity: cl(mv * 3) }}>RRSP −$10,000</div>}
        {tk > 0.05 && <div style={{ position: 'absolute', left: 0, right: 0, top: Y + 170, textAlign: 'center', fontFamily: COND, transform: `scale(${0.7 + 0.3 * tk})`, opacity: cl(tk * 1.5) }}>
          <span style={{ fontSize: 40, color: C.green, fontWeight: 700 }}>+{fmt(p.after - p.before)} CCB</span><span style={{ fontSize: 40, color: C.dim }}>  +  </span>
          <span style={{ fontSize: 40, color: C.green, fontWeight: 700 }}>{fmt(p.tax)} LESS TAX</span><span style={{ fontSize: 40, color: C.dim }}>  =  </span>
          <span style={{ fontSize: 56, color: C.gold, fontWeight: 700 }}>{fmt(p.total)}</span></div>}
      </div>
      {p.qAt && <div style={{ position: 'absolute', left: 120, right: 120, top: 905, textAlign: 'center', fontFamily: COND, fontSize: 46, fontWeight: 600, color: C.white, textTransform: 'uppercase', textShadow: '0 4px 30px rgba(0,0,0,.9)', opacity: qk * (1 - out) }}>{p.question}</div>}
    </div>
  );
};

// ---------- BreakHook: frame-0 hook — three people, the same $1,000 tax break; bars show what a deduction saves, then flip to a credit ----------
// p.people[{name, sub, ded, cred}] · p.valAt[] · p.flipAt · p.kicker · p.title · p.finishTitle · p.qAt · p.question · p.out · p.bg
const BreakHook: React.FC<{ p: Pn; c: Ctx }> = ({ p, c }) => {
  const now = c.now; const el = now - p.t; const out = p.out ? prog(now, p.out.t, 0.9, INOUT) : 0;
  const ppl = p.people as Pn[]; const fl = p.flipAt ? prog(now, p.flipAt.t, 0.9, INOUT) : 0; const qk = p.qAt ? prog(now, p.qAt.t, 0.7) : 0;
  const CW = 440, GAP = 90, X0 = (1920 - (3 * CW + 2 * GAP)) / 2, BASE = 820, MAXH = 380, MAXV = 450;
  const fmt = (v: number) => '$' + (v % 1 ? v.toFixed(2) : Math.round(v).toLocaleString('en-US'));
  return (
    <div style={{ position: 'absolute', left: -p.x, top: -p.y, width: 1920, height: 1080, background: C.navy, overflow: 'hidden' }}>
      {p.bg && <div style={{ position: 'absolute', inset: 0 }}>
        <DepthPhoto src={p.bg.src} depth={p.bg.depth} t={el} amt={0.06} cam={{ x: 0.3 - 0.6 * cl(el / 22), y: 0, z: 0.05 + 0.22 * cl(el / 22) }} />
        <div style={{ position: 'absolute', inset: 0, background: `rgba(7,11,20,${p.bg.dim ?? 0.66})` }} /></div>}
      <div style={{ position: 'absolute', left: 0, right: 0, top: 50, textAlign: 'center', fontFamily: COND, opacity: 1 - out }}>
        <div style={{ fontSize: 34, letterSpacing: 10, color: C.gold }}>{p.kicker}</div>
        <div style={{ fontSize: 84, fontWeight: 700, color: C.white, letterSpacing: 2, marginTop: 4, textShadow: '0 6px 30px rgba(0,0,0,.7)' }}>{fl > 0.5 && p.finishTitle ? p.finishTitle : p.title}</div>
        <div style={{ display: 'inline-block', marginTop: 14, padding: '8px 28px', borderRadius: 12, border: `2px solid ${fl > 0.5 ? C.blue : C.gold}`, fontSize: 38, fontWeight: 700, letterSpacing: 6, color: fl > 0.5 ? C.blue : C.gold, transform: `rotateX(${Math.sin(fl * Math.PI) * 80}deg)` }}>{fl > 0.5 ? '$1,000 CREDIT AMOUNT' : '$1,000 DEDUCTION'}</div>
      </div>
      {ppl.map((q, i) => {
        const k = p.valAt?.[i]?.t !== undefined ? prog(now, p.valAt[i].t, 0.8, BACK) : 0; const v = q.ded + (q.cred - q.ded) * fl;
        const h = Math.max(6, (MAXH * v) / MAXV) * cl(k); const x = X0 + i * (CW + GAP);
        return (
          <div key={i} style={{ position: 'absolute', left: x, top: 0, width: CW, height: 1080, opacity: 1 - out }}>
            <div style={{ position: 'absolute', left: 60, width: CW - 120, top: BASE - h, height: h, borderRadius: '16px 16px 0 0', background: fl > 0.5 ? 'linear-gradient(180deg,#A9C6F0,#6F93C9)' : 'linear-gradient(180deg,#F1D38E,#C9A055)', boxShadow: '0 16px 40px rgba(0,0,0,.45)' }} />
            {k > 0.05 && <div style={{ position: 'absolute', left: 0, right: 0, top: BASE - h - 90, textAlign: 'center', fontFamily: COND, fontSize: 76, fontWeight: 700, color: C.white, textShadow: '0 6px 24px rgba(0,0,0,.7)', opacity: cl(k * 1.5) }}>{fmt(Math.round(v * 100) / 100)}</div>}
            <div style={{ position: 'absolute', left: 0, right: 0, top: BASE + 16, textAlign: 'center', fontFamily: COND }}>
              <div style={{ fontSize: 46, fontWeight: 700, color: C.white, letterSpacing: 3 }}>{q.name}</div>
              <div style={{ fontSize: 26, letterSpacing: 5, color: C.dim }}>{q.sub}</div></div>
          </div>);
      })}
      {p.qAt && <div style={{ position: 'absolute', left: 120, right: 120, top: 935, textAlign: 'center', fontFamily: COND, fontSize: 44, fontWeight: 600, color: C.white, textTransform: 'uppercase', textShadow: '0 4px 30px rgba(0,0,0,.9)', opacity: qk * (1 - out) }}>{p.question}</div>}
    </div>
  );
};

// ---------- RefundHook: frame-0 hook — two people, two bars each (WITHHELD vs REAL TAX); the gap drips out as a refund for one, zero for the other; then SAME TAX ----------
// p.rows[{name, withheld, real}] · p.gapAt[] · p.sameAt · p.kicker · p.title · p.finishTitle · p.qAt · p.question · p.out · p.bg
const RefundHook: React.FC<{ p: Pn; c: Ctx }> = ({ p, c }) => {
  const now = c.now; const el = now - p.t; const out = p.out ? prog(now, p.out.t, 0.9, INOUT) : 0;
  const rows = p.rows as Pn[]; const sm = p.sameAt ? prog(now, p.sameAt.t, 0.7, BACK) : 0; const qk = p.qAt ? prog(now, p.qAt.t, 0.7) : 0;
  const X0 = 360, W = 1200, MAXV = 16000; const fmt = (v: number) => '$' + Math.round(v).toLocaleString('en-US');
  return (
    <div style={{ position: 'absolute', left: -p.x, top: -p.y, width: 1920, height: 1080, background: C.navy, overflow: 'hidden' }}>
      {p.bg && <div style={{ position: 'absolute', inset: 0 }}>
        <DepthPhoto src={p.bg.src} depth={p.bg.depth} t={el} amt={0.06} cam={{ x: 0.3 - 0.6 * cl(el / 22), y: 0, z: 0.05 + 0.22 * cl(el / 22) }} />
        <div style={{ position: 'absolute', inset: 0, background: `rgba(7,11,20,${p.bg.dim ?? 0.66})` }} /></div>}
      <div style={{ position: 'absolute', left: 0, right: 0, top: 50, textAlign: 'center', fontFamily: COND, opacity: 1 - out }}>
        <div style={{ fontSize: 34, letterSpacing: 10, color: C.gold }}>{p.kicker}</div>
        <div style={{ fontSize: 84, fontWeight: 700, color: C.white, letterSpacing: 2, marginTop: 4, textShadow: '0 6px 30px rgba(0,0,0,.7)' }}>{sm > 0.5 && p.finishTitle ? p.finishTitle : p.title}</div>
      </div>
      {rows.map((r, i) => {
        const y = 270 + i * 290; const g = p.gapAt?.[i]?.t !== undefined ? prog(now, p.gapAt[i].t, 0.9, EX) : 0; const gap = r.withheld - r.real; const wR = (W * r.real) / MAXV, wG = (W * gap) / MAXV;
        const i0 = prog(now, p.t + 0.2 + i * 0.3, 0.7, BACK);
        return (
          <div key={i} style={{ position: 'absolute', left: 0, top: y, width: 1920, opacity: (1 - out) * cl(i0 * 1.5) }}>
            <div style={{ position: 'absolute', left: X0, top: 0, fontFamily: COND, fontSize: 46, fontWeight: 700, color: C.white, letterSpacing: 3 }}>{r.name}<span style={{ fontSize: 26, color: C.dim, marginLeft: 20, letterSpacing: 4 }}>$70,000 SALARY</span></div>
            <div style={{ position: 'absolute', left: X0, top: 70, fontFamily: COND, fontSize: 22, letterSpacing: 4, color: C.dim }}>TAX WITHHELD</div>
            <div style={{ position: 'absolute', left: X0 + 200, top: 64, width: wR, height: 40, borderRadius: '8px 0 0 8px', background: 'linear-gradient(90deg,#C9A055,#F1D38E)' }} />
            {gap > 0 && <div style={{ position: 'absolute', left: X0 + 200 + wR + 2 + 60 * g, top: 64 + 50 * g, width: wG, height: 40, borderRadius: 8, background: C.green, boxShadow: g > 0.3 ? `0 0 ${24 * g}px rgba(127,211,160,.6)` : 'none', transform: `rotate(${6 * g}deg)` }} />}
            <div style={{ position: 'absolute', left: X0, top: 124, fontFamily: COND, fontSize: 22, letterSpacing: 4, color: C.dim }}>REAL TAX</div>
            <div style={{ position: 'absolute', left: X0 + 200, top: 118, width: wR, height: 40, borderRadius: 8, background: 'rgba(244,241,234,.85)', boxShadow: sm > 0.3 ? `0 0 ${30 * sm}px rgba(232,194,122,.7)` : 'none' }} />
            {sm > 0.05 && <div style={{ position: 'absolute', left: X0 + 210 + wR, top: 116, fontFamily: COND, fontSize: 38, fontWeight: 700, color: C.gold, opacity: sm }}>{fmt(r.real)}</div>}
            {g > 0.2 && <div style={{ position: 'absolute', left: X0 + 200 + W - 120, top: 0, textAlign: 'right', width: 200, fontFamily: COND, opacity: cl((g - 0.2) * 2) }}>
              <div style={{ fontSize: 22, letterSpacing: 4, color: C.dim }}>REFUND</div><div style={{ fontSize: 60, fontWeight: 700, color: gap > 0 ? C.green : C.white, lineHeight: 1 }}>{fmt(gap)}</div></div>}
          </div>);
      })}
      {p.qAt && <div style={{ position: 'absolute', left: 120, right: 120, top: 900, textAlign: 'center', fontFamily: COND, fontSize: 48, fontWeight: 600, color: C.white, textTransform: 'uppercase', textShadow: '0 4px 30px rgba(0,0,0,.9)', opacity: qk * (1 - out) }}>{p.question}</div>}
    </div>
  );
};

// ---------- PayHook: frame-0 hook — 26 paycheque bars (net · tax · CPP · CPP2 · EI); EI then CPP drop out in the fall, the net rises; first vs last net, +diff ----------
// p.rows[{n,cpp,cpp2,ei,tax,net}] · p.gross · p.firstAt · p.lastAt · p.diffAt · p.kicker · p.title · p.qAt · p.question · p.out · p.bg
const PayHook: React.FC<{ p: Pn; c: Ctx }> = ({ p, c }) => {
  const now = c.now; const el = now - p.t; const out = p.out ? prog(now, p.out.t, 0.9, INOUT) : 0;
  const rows = p.rows as Pn[]; const n = rows.length; const X0 = 170, SPAN = 1580, step = SPAN / n, bw = step * 0.7, BASE = 890, HMAX = 520, G = p.gross as number;
  const fa = p.firstAt ? prog(now, p.firstAt.t, 0.7, BACK) : 0; const la = p.lastAt ? prog(now, p.lastAt.t, 0.7, BACK) : 0; const da = p.diffAt ? prog(now, p.diffAt.t, 0.8, BACK) : 0; const qk = p.qAt ? prog(now, p.qAt.t, 0.7) : 0;
  const fmt = (v: number) => '$' + Math.round(v).toLocaleString('en-US');
  const segs: [string, string][] = [['net', 'linear-gradient(180deg,#F1D38E,#C9A055)'], ['tax', 'rgba(244,241,234,.78)'], ['cpp', C.blue], ['cpp2', C.org], ['ei', C.green]];
  const leg: [string, string][] = [['TAKE-HOME', C.gold], ['INCOME TAX', C.white], ['CPP', C.blue], ['CPP2', C.org], ['EI', C.green]];
  const hOf = (v: number) => (HMAX * v) / G;
  const netTop = (r: Pn) => BASE - hOf(r.net);
  return (
    <div style={{ position: 'absolute', left: -p.x, top: -p.y, width: 1920, height: 1080, background: C.navy, overflow: 'hidden' }}>
      {p.bg && <div style={{ position: 'absolute', inset: 0 }}>
        <DepthPhoto src={p.bg.src} depth={p.bg.depth} t={el} amt={0.06} cam={{ x: -0.3 + 0.6 * cl(el / 22), y: 0, z: 0.05 + 0.2 * cl(el / 22) }} />
        <div style={{ position: 'absolute', inset: 0, background: `rgba(7,11,20,${p.bg.dim ?? 0.7})` }} /></div>}
      <div style={{ position: 'absolute', left: 0, right: 0, top: 74, textAlign: 'center', fontFamily: COND, opacity: 1 - out }}>
        <div style={{ fontSize: 32, letterSpacing: 10, color: C.gold }}>{p.kicker}</div>
        <div style={{ fontSize: qk > 0.5 ? 54 : 78, height: 96, lineHeight: '96px', fontWeight: 700, color: C.white, letterSpacing: 2, textTransform: 'uppercase', textShadow: '0 6px 30px rgba(0,0,0,.7)', opacity: qk > 0 && qk < 1 ? Math.abs(qk - 0.5) * 2 : 1 }}>{qk > 0.5 ? p.question : p.title}</div>
        </div>
      <div style={{ position: 'absolute', left: 0, right: 0, top: BASE + 48, display: 'flex', justifyContent: 'center', gap: 34, fontFamily: COND, opacity: 1 - out }}>{leg.map(([t, col], i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 24, letterSpacing: 3, color: C.dim, opacity: cl((el - 0.4 - i * 0.12) * 3) }}><span style={{ width: 22, height: 22, borderRadius: 5, background: col }} />{t}</div>))}</div>
      {rows.map((r, i) => {
        const a = prog(now, p.t + 0.15 + i * 0.07, 0.6, BACK); const x = X0 + i * step; let y = BASE; const hot = r.net > rows[0].net + 1 && la > 0;
        return (
          <div key={i} style={{ opacity: (1 - out) * cl(a * 2) }}>
            {segs.map(([k, bg]) => { const h = hOf(r[k] || 0) * a; y -= h; return h > 0.3 ? <div key={k} style={{ position: 'absolute', left: x, top: y, width: bw, height: h, background: bg, borderRadius: 3, boxShadow: k === 'net' && hot ? `0 0 ${22 * la}px rgba(232,194,122,.75)` : 'none' }} /> : null; })}
            <div style={{ position: 'absolute', left: x - 6, top: BASE + 10, width: bw + 12, textAlign: 'center', fontFamily: COND, fontSize: 20, color: C.faint }}>{r.n}</div>
          </div>);
      })}
      {fa > 0.02 && <div style={{ position: 'absolute', left: X0 - 20, top: 214, fontFamily: COND, opacity: fa * (1 - out), transform: `translateY(${(1 - fa) * 30}px)` }}>
        <div style={{ fontSize: 24, letterSpacing: 4, color: C.dim }}>FIRST · JANUARY</div><div style={{ fontSize: 76, fontWeight: 700, color: C.gold, lineHeight: 1 }}>{fmt(rows[0].net)}</div></div>}
      {la > 0.02 && <div style={{ position: 'absolute', left: X0 + SPAN - 330, width: 330, textAlign: 'right', top: 214, fontFamily: COND, opacity: la * (1 - out), transform: `translateY(${(1 - la) * 30}px)` }}>
        <div style={{ fontSize: 24, letterSpacing: 4, color: C.dim }}>LAST · DECEMBER</div><div style={{ fontSize: 76, fontWeight: 700, color: C.gold, lineHeight: 1 }}>{fmt(rows[n - 1].net)}</div></div>}
      {da > 0.02 && <div style={{ position: 'absolute', left: 0, right: 0, top: 196, textAlign: 'center', fontFamily: COND, opacity: da * (1 - out), transform: `scale(${0.7 + 0.3 * da})` }}>
        <div style={{ fontSize: 100, lineHeight: 1, fontWeight: 700, color: C.green, textShadow: '0 0 40px rgba(127,211,160,.45)' }}>+{fmt(rows[n - 1].net - rows[0].net)}</div>
        <div style={{ fontSize: 30, letterSpacing: 6, color: C.white }}>SAME SALARY · NO RAISE</div></div>}
    </div>
  );
};

// ---------- DepositHook: frame-0 hook — five identical $10,000 RRSP blocks; tax-saving bars rise from each (very different heights); a pair is bracketed "+$59"; title flips to the question ----------
// p.people[{name, salary, saving, pct}] · p.riseAt · p.pairAt · p.pair[i,j] · p.pairText · p.kicker · p.title · p.qAt · p.question · p.out · p.bg
const DepositHook: React.FC<{ p: Pn; c: Ctx }> = ({ p, c }) => {
  const now = c.now; const el = now - p.t; const out = p.out ? prog(now, p.out.t, 0.9, INOUT) : 0;
  const ps = p.people as Pn[]; const n = ps.length; const CW = 300, X0 = (1920 - n * CW) / 2, BASE = 840, BH = 120, HMAX = 380;
  const max = Math.max(...ps.map((x) => x.saving)); const qk = p.qAt ? prog(now, p.qAt.t, 0.7) : 0; const pk = p.pairAt ? prog(now, p.pairAt.t, 0.7, BACK) : 0;
  const fmt = (v: number) => '$' + Math.round(v).toLocaleString('en-US');
  const rise = (i: number) => (p.riseAt ? prog(now, p.riseAt.t + i * 0.35, 1.1, EX) : 0);
  const [a, b] = (p.pair ?? [2, 3]) as number[];
  return (
    <div style={{ position: 'absolute', left: -p.x, top: -p.y, width: 1920, height: 1080, background: C.navy, overflow: 'hidden' }}>
      {p.bg && <div style={{ position: 'absolute', inset: 0 }}>
        <DepthPhoto src={p.bg.src} depth={p.bg.depth} t={el} amt={0.06} cam={{ x: 0, y: 0.2 - 0.4 * cl(el / 22), z: 0.05 + 0.2 * cl(el / 22) }} />
        <div style={{ position: 'absolute', inset: 0, background: `rgba(7,11,20,${p.bg.dim ?? 0.72})` }} /></div>}
      <div style={{ position: 'absolute', left: 0, right: 0, top: 74, textAlign: 'center', fontFamily: COND, opacity: 1 - out }}>
        <div style={{ fontSize: 32, letterSpacing: 10, color: C.gold }}>{p.kicker}</div>
        <div style={{ fontSize: qk > 0.5 ? 56 : 80, height: 100, lineHeight: '100px', fontWeight: 700, color: C.white, letterSpacing: 2, textTransform: 'uppercase', textShadow: '0 6px 30px rgba(0,0,0,.7)', opacity: qk > 0 && qk < 1 ? Math.abs(qk - 0.5) * 2 : 1 }}>{qk > 0.5 ? p.question : p.title}</div>
      </div>
      {ps.map((x, i) => {
        const cx = X0 + i * CW + CW / 2; const k = prog(now, p.t + 0.2 + i * 0.12, 0.7, BACK); const r = rise(i); const h = (HMAX * x.saving / max) * r;
        const hl = pk > 0 && (i === a || i === b); const dim = pk > 0 && !hl ? 1 - 0.55 * pk : 1;
        return (
          <div key={i} style={{ opacity: (1 - out) * cl(k * 2) * dim }}>
            <div style={{ position: 'absolute', left: cx - 110, top: BASE - BH, width: 220, height: BH, borderRadius: 12, background: 'rgba(244,241,234,.12)', border: '2px solid rgba(232,194,122,.55)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: COND, transform: `translateY(${(1 - k) * 60}px)` }}>
              <div style={{ fontSize: 20, letterSpacing: 4, color: C.dim }}>RRSP</div><div style={{ fontSize: 46, fontWeight: 700, color: C.white, lineHeight: 1 }}>$10,000</div></div>
            <div style={{ position: 'absolute', left: cx - 70, top: BASE - BH - 12 - h, width: 140, height: h, borderRadius: '10px 10px 4px 4px', background: 'linear-gradient(180deg,#9BE3B6,#4FA874)', boxShadow: hl ? `0 0 ${30 * pk}px rgba(127,211,160,.7)` : 'none' }} />
            {r > 0.05 && <div style={{ position: 'absolute', left: cx - 140, width: 280, top: BASE - BH - 12 - h - 92, textAlign: 'center', fontFamily: COND, opacity: cl(r * 2) }}>
              <div style={{ fontSize: 56, fontWeight: 700, color: C.green, lineHeight: 1 }}>{fmt(x.saving * r)}</div>
              <div style={{ fontSize: 22, letterSpacing: 3, color: C.dim, marginTop: 4 }}>≈ {x.pct.toFixed(1)}¢ PER $1</div></div>}
            <div style={{ position: 'absolute', left: cx - 140, width: 280, top: BASE + 16, textAlign: 'center', fontFamily: COND }}>
              <div style={{ fontSize: 40, fontWeight: 700, color: C.white, letterSpacing: 3 }}>{x.name.toUpperCase()}</div>
              <div style={{ fontSize: 24, letterSpacing: 3, color: C.gold }}>{fmt(x.salary)}</div></div>
          </div>);
      })}
      {pk > 0.02 && (() => { const x1 = X0 + a * CW + CW / 2 - 90, x2 = X0 + b * CW + CW / 2 + 90; const top = BASE - BH - 12 - HMAX * Math.max(ps[a].saving, ps[b].saving) / max - 150;
        return <div style={{ position: 'absolute', left: x1, width: x2 - x1, top, height: 40, borderTop: `3px solid ${C.gold}`, borderLeft: `3px solid ${C.gold}`, borderRight: `3px solid ${C.gold}`, borderRadius: '10px 10px 0 0', opacity: pk * (1 - out) }}>
          <div style={{ position: 'absolute', left: -300, right: -300, top: -64, textAlign: 'center', whiteSpace: 'nowrap', fontFamily: COND, fontSize: 44, fontWeight: 700, color: C.gold, transform: `scale(${0.7 + 0.3 * pk})` }}>{p.pairText}</div></div>; })()}
    </div>
  );
};

// ---------- HalfHook: frame-0 hook — a capital-gain bar splits in half (half not taxed, half taxable) and drops a red tax chip; below, the same amount fully taxed with a bigger chip; then a "−$X" stamp; title flips to the question ----------
// p.gain · p.taxable · p.taxGain · p.taxFull · p.splitAt · p.fullAt · p.stampAt · p.stamp · p.stampSub · p.kicker · p.title · p.qAt · p.question · p.out · p.bg
const HalfHook: React.FC<{ p: Pn; c: Ctx }> = ({ p, c }) => {
  const now = c.now; const el = now - p.t; const out = p.out ? prog(now, p.out.t, 0.9, INOUT) : 0;
  const G = p.gain as number; const X0 = 260, W = 1240, H = 74; const w = (v: number) => (W * v) / G;
  const k0 = prog(now, p.t + 0.2, 0.9, EX); const sp = p.splitAt ? prog(now, p.splitAt.t, 0.9, BACK) : 0; const fu = p.fullAt ? prog(now, p.fullAt.t, 0.8, BACK) : 0;
  const st = p.stampAt ? prog(now, p.stampAt.t, 0.6, BACK) : 0; const qk = p.qAt ? prog(now, p.qAt.t, 0.7) : 0;
  const fmt = (v: number) => '$' + Math.round(v).toLocaleString('en-US');
  const lab = (t: string, col: string) => <div style={{ fontFamily: COND, fontSize: 24, letterSpacing: 4, color: col }}>{t}</div>;
  const yA = 330, yB = 650;
  return (
    <div style={{ position: 'absolute', left: -p.x, top: -p.y, width: 1920, height: 1080, background: C.navy, overflow: 'hidden' }}>
      {p.bg && <div style={{ position: 'absolute', inset: 0 }}>
        <DepthPhoto src={p.bg.src} depth={p.bg.depth} t={el} amt={0.06} cam={{ x: 0.3 - 0.6 * cl(el / 22), y: 0, z: 0.05 + 0.2 * cl(el / 22) }} />
        <div style={{ position: 'absolute', inset: 0, background: `rgba(7,11,20,${p.bg.dim ?? 0.72})` }} /></div>}
      <div style={{ position: 'absolute', left: 0, right: 0, top: 74, textAlign: 'center', fontFamily: COND, opacity: 1 - out }}>
        <div style={{ fontSize: 32, letterSpacing: 10, color: C.gold }}>{p.kicker}</div>
        <div style={{ fontSize: qk > 0.5 ? 56 : 80, height: 100, lineHeight: '100px', fontWeight: 700, color: C.white, letterSpacing: 2, textTransform: 'uppercase', textShadow: '0 6px 30px rgba(0,0,0,.7)', opacity: qk > 0 && qk < 1 ? Math.abs(qk - 0.5) * 2 : 1 }}>{qk > 0.5 ? p.question : p.title}</div>
      </div>
      <div style={{ opacity: (1 - out) * cl(k0 * 2) }}>
        <div style={{ position: 'absolute', left: X0, top: yA - 92 }}>{lab('CAPITAL GAIN · SHARES SOLD', C.dim)}<div style={{ fontFamily: COND, fontSize: 40, fontWeight: 700, color: C.white }}>{fmt(G)}</div></div>
        <div style={{ position: 'absolute', left: X0, top: yA, width: w(G / 2) * k0, height: H, borderRadius: '10px 0 0 10px', background: 'rgba(127,211,160,.85)', transform: `translate(${-30 * sp}px, ${60 * sp}px)`, opacity: 1 - 0.45 * sp }} />
        {sp > 0.05 && <div style={{ position: 'absolute', left: X0 - 30, top: yA + H + 70, opacity: sp }}>{lab('HALF · NOT TAXED', C.green)}</div>}
        <div style={{ position: 'absolute', left: X0 + w(G / 2) * k0, top: yA, width: w(G / 2) * k0, height: H, borderRadius: '0 10px 10px 0', background: 'linear-gradient(90deg,#C9A055,#F1D38E)', transform: `translateX(${20 * sp}px)` }} />
        {sp > 0.05 && <div style={{ position: 'absolute', left: X0 + w(G / 2) + 20, top: yA + H + 10, opacity: sp }}>{lab(`TAXABLE HALF · ${fmt(p.taxable)}`, C.gold)}</div>}
        {sp > 0.05 && <div style={{ position: 'absolute', left: X0 + W + 20 - w(p.taxGain) * sp, top: yA - 6, width: w(p.taxGain) * sp, height: H + 12, borderRadius: 10, background: C.red, boxShadow: '0 0 24px rgba(229,128,110,.55)' }} />}
        {sp > 0.4 && <div style={{ position: 'absolute', left: X0 + W + 40, top: yA - 4, fontFamily: COND, opacity: cl((sp - 0.4) * 2) }}>{lab('TAX', C.dim)}<div style={{ fontSize: 56, fontWeight: 700, color: C.red, lineHeight: 1 }}>{fmt(p.taxGain)}</div></div>}
        {fu > 0.02 && <div style={{ opacity: fu }}>
          <div style={{ position: 'absolute', left: X0, top: yB - 92 }}>{lab('SAME AMOUNT · FULLY TAXED', C.dim)}<div style={{ fontFamily: COND, fontSize: 40, fontWeight: 700, color: C.white }}>{fmt(G)}</div></div>
          <div style={{ position: 'absolute', left: X0, top: yB, width: W * fu, height: H, borderRadius: 10, background: 'rgba(244,241,234,.8)' }} />
          <div style={{ position: 'absolute', left: X0 + W + 20 - w(p.taxFull) * fu, top: yB - 6, width: w(p.taxFull) * fu, height: H + 12, borderRadius: 10, background: C.red }} />
          <div style={{ position: 'absolute', left: X0 + W + 40, top: yB - 4, fontFamily: COND }}>{lab('TAX', C.dim)}<div style={{ fontSize: 56, fontWeight: 700, color: C.red, lineHeight: 1 }}>{fmt(p.taxFull)}</div></div></div>}
      </div>
      {st > 0.02 && <div style={{ position: 'absolute', left: 0, right: 0, top: 820, textAlign: 'center', fontFamily: COND, opacity: st * (1 - out), transform: `scale(${1.4 - 0.4 * st}) rotate(${-3 * st}deg)` }}>
        <span style={{ display: 'inline-block', padding: '8px 30px', border: `4px solid ${C.green}`, borderRadius: 14, color: C.green, fontSize: 64, fontWeight: 700, background: 'rgba(7,11,20,.6)' }}>{p.stamp}</span>
        <div style={{ fontSize: 26, letterSpacing: 6, color: C.white, marginTop: 6 }}>{p.stampSub}</div></div>}
    </div>
  );
};

// ---------- ColumnHook: frame-0 hook — a tall $100K salary column; deduction slices peel off the top and fall; what's left is labelled TAXABLE; a red tax fill rises; a second column (no RRSP) appears taller with a bigger tax fill; diff badge; title flips ----------
// p.salary · p.cuts[{label, value}] · p.taxable · p.tax · p.other{label, taxable, tax} · p.cutAt · p.taxAt · p.otherAt · p.diffAt · p.diffText · p.kicker · p.title · p.qAt · p.question · p.out · p.bg
const ColumnHook: React.FC<{ p: Pn; c: Ctx }> = ({ p, c }) => {
  const now = c.now; const el = now - p.t; const out = p.out ? prog(now, p.out.t, 0.9, INOUT) : 0;
  const S = p.salary as number; const BASE = 900, HMAX = 560, CW = 240; const hv = (v: number) => (HMAX * v) / S;
  const k0 = prog(now, p.t + 0.2, 0.9, EX); const cu = p.cutAt ? prog(now, p.cutAt.t, 1.1, EX) : 0; const tx = p.taxAt ? prog(now, p.taxAt.t, 1.0, EX) : 0;
  const ot = p.otherAt ? prog(now, p.otherAt.t, 0.9, BACK) : 0; const df = p.diffAt ? prog(now, p.diffAt.t, 0.6, BACK) : 0; const qk = p.qAt ? prog(now, p.qAt.t, 0.7) : 0;
  const fmt = (v: number) => '$' + Math.round(v).toLocaleString('en-US');
  const xA = ot > 0 ? 560 - 120 * ot : 840, xB = 1120;
  const cuts = p.cuts as Pn[]; let acc = 0;
  const lab = (t: string, col: string, size = 24) => <div style={{ fontFamily: COND, fontSize: size, letterSpacing: 4, color: col }}>{t}</div>;
  return (
    <div style={{ position: 'absolute', left: -p.x, top: -p.y, width: 1920, height: 1080, background: C.navy, overflow: 'hidden' }}>
      {p.bg && <div style={{ position: 'absolute', inset: 0 }}>
        <DepthPhoto src={p.bg.src} depth={p.bg.depth} t={el} amt={0.06} cam={{ x: -0.3 + 0.6 * cl(el / 22), y: 0, z: 0.05 + 0.2 * cl(el / 22) }} />
        <div style={{ position: 'absolute', inset: 0, background: `rgba(7,11,20,${p.bg.dim ?? 0.74})` }} /></div>}
      <div style={{ position: 'absolute', left: 0, right: 0, top: 74, textAlign: 'center', fontFamily: COND, opacity: 1 - out }}>
        <div style={{ fontSize: 32, letterSpacing: 10, color: C.gold }}>{p.kicker}</div>
        <div style={{ fontSize: qk > 0.5 ? 56 : 80, height: 100, lineHeight: '100px', fontWeight: 700, color: C.white, letterSpacing: 2, textTransform: 'uppercase', textShadow: '0 6px 30px rgba(0,0,0,.7)', opacity: qk > 0 && qk < 1 ? Math.abs(qk - 0.5) * 2 : 1 }}>{qk > 0.5 ? p.question : p.title}</div>
      </div>
      <div style={{ opacity: (1 - out) * cl(k0 * 2) }}>
        <div style={{ position: 'absolute', left: xA - 60, width: CW + 120, top: BASE - hv(S) - 2, borderTop: `3px dashed ${C.gold}`, opacity: 0.8 }} />
        <div style={{ position: 'absolute', left: xA - 300, width: 280, textAlign: 'right', top: BASE - hv(S) - 96, fontFamily: COND }}>{lab('SALARY', C.dim)}<div style={{ fontSize: 44, fontWeight: 700, color: C.gold, lineHeight: 1 }}>{fmt(S)}</div></div>
        <div style={{ position: 'absolute', left: xA, top: BASE - hv(p.taxable) * k0, width: CW, height: hv(p.taxable) * k0, borderRadius: '8px 8px 0 0', background: 'rgba(244,241,234,.86)' }} />
        <div style={{ position: 'absolute', left: xA, top: BASE - hv(p.tax) * tx, width: CW, height: hv(p.tax) * tx, background: C.red, boxShadow: tx > 0.2 ? '0 0 26px rgba(229,128,110,.5)' : 'none' }} />
        {cuts.map((x, i) => { const h = hv(x.value); const top0 = BASE - hv(p.taxable) - acc - h; acc += h; const f = cl(cu * 1.4 - i * 0.25);
          return <div key={i} style={{ opacity: 1 - ot }}>
            <div style={{ position: 'absolute', left: xA + 330 * f, top: top0 + 120 * f, width: CW, height: Math.max(h, 6), borderRadius: 6, background: i === 0 ? C.green : C.blue, opacity: (1 - 0.3 * f) * cl(k0 * 2), transform: `rotate(${10 * f}deg)` }} />
            {f > 0.3 && <div style={{ position: 'absolute', left: xA + 330 * f + CW + 16, top: top0 + 120 * f - 6 + i * 84, fontFamily: COND, opacity: cl((f - 0.3) * 2), whiteSpace: 'nowrap' }}>{lab(x.label, C.dim, 22)}<div style={{ fontSize: 36, fontWeight: 700, color: i === 0 ? C.green : C.blue, lineHeight: 1 }}>−{fmt(x.value)}</div></div>}
          </div>; })}
        {cu > 0.6 && <div style={{ position: 'absolute', left: xA, width: CW, top: BASE - hv(p.taxable) + 14, textAlign: 'center', fontFamily: COND, opacity: cl((cu - 0.6) * 3) }}>{lab('TAXABLE', '#3A3F4A', 22)}<div style={{ fontSize: 42, fontWeight: 700, color: C.navy, lineHeight: 1 }}>{fmt(p.taxable)}</div></div>}
        {tx > 0.3 && <div style={{ position: 'absolute', left: xA, width: CW, top: BASE - hv(p.tax) + 14, textAlign: 'center', fontFamily: COND, opacity: cl((tx - 0.3) * 2) }}>{lab('INCOME TAX', 'rgba(7,11,20,.7)', 20)}<div style={{ fontSize: 40, fontWeight: 700, color: C.navy, lineHeight: 1 }}>{fmt(p.tax)}</div></div>}
        <div style={{ position: 'absolute', left: xA - 20, width: CW + 40, top: BASE + 14, textAlign: 'center', fontFamily: COND, fontSize: 36, fontWeight: 700, color: C.white, letterSpacing: 3 }}>{p.name}</div>
        {ot > 0.02 && (() => { const o = p.other as Pn; return <div style={{ opacity: ot }}>
          <div style={{ position: 'absolute', left: xB, top: BASE - hv(o.taxable) * ot, width: CW, height: hv(o.taxable) * ot, borderRadius: '8px 8px 0 0', background: 'rgba(244,241,234,.6)' }} />
          <div style={{ position: 'absolute', left: xB, top: BASE - hv(o.tax) * ot, width: CW, height: hv(o.tax) * ot, background: C.red }} />
          <div style={{ position: 'absolute', left: xB, width: CW, top: BASE - hv(o.taxable) + 14, textAlign: 'center', fontFamily: COND }}>{lab('TAXABLE', '#3A3F4A', 22)}<div style={{ fontSize: 42, fontWeight: 700, color: C.navy, lineHeight: 1 }}>{fmt(o.taxable)}</div></div>
          <div style={{ position: 'absolute', left: xB, width: CW, top: BASE - hv(o.tax) + 14, textAlign: 'center', fontFamily: COND }}>{lab('INCOME TAX', 'rgba(7,11,20,.7)', 20)}<div style={{ fontSize: 40, fontWeight: 700, color: C.navy, lineHeight: 1 }}>{fmt(o.tax)}</div></div>
          <div style={{ position: 'absolute', left: xB - 20, width: CW + 40, top: BASE + 14, textAlign: 'center', fontFamily: COND, fontSize: 36, fontWeight: 700, color: C.white, letterSpacing: 3 }}>{o.label}</div></div>; })()}
        {df > 0.02 && <div style={{ position: 'absolute', left: xB + CW + 40, top: BASE - hv((p.other as Pn).tax) - 20, fontFamily: COND, opacity: df, transform: `scale(${0.7 + 0.3 * df})`, transformOrigin: 'left center', whiteSpace: 'nowrap' }}>
          <div style={{ fontSize: 64, fontWeight: 700, color: C.red, lineHeight: 1 }}>{p.diffText}</div>{lab('SAME $100,000 SALARY', C.white)}</div>}
      </div>
    </div>
  );
};

export const PANELS_MOTION: Record<string, React.FC<{ p: Pn; c: Ctx }>> = { opening: OpeningScene, ptable: ProgressiveTable, collage: CollageHook, stubs: StubsHook, race: RaceHook, stacks: StacksHook, gauges: GaugeHook, curve: CurveChart, sold: SoldHook, bonus: BonusHook, fedprov: FedProvHook, oas: OasHook, window: WindowHook, ccb: CcbHook, breaks: BreakHook, refund: RefundHook, paytl: PayHook, deposit: DepositHook, half: HalfHook, column: ColumnHook };
