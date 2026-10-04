// Seamless Instagram carousel v2 — "from blur to clarity".
// Behind the content: a live, defocused tax office (Office.tsx). Swiping right, the office comes into focus,
// warms up and the paper chaos settles; one gold thread with travelling light ties the seven slides together.
// Every animation is periodic over LOOP frames, so each sliced slide video loops cleanly.
// Facts (unchanged from v1): canada.ca — CESG InfoCapsule 11, RESP provider guide ch. 5–6, CRA Canada Learning Bond page.
import { ThreeCanvas } from '@remotion/three';
import { useThree } from '@react-three/fiber';
import { BadgeDollarSign, Baby, CalendarDays, ChartColumn, Check, Gift, GraduationCap, HandCoins, History, Landmark, ListChecks, Percent, PiggyBank } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useMemo } from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { CoinMesh, LEAF } from './Coin';
import { Office } from './Office';

export const SLIDES = 7, SW = 1080, SH = 1350, CW = SLIDES * SW, LOOP = 180;
const C = { green: '#27AE60', mint: '#bff0d2', cream: '#f6f1e7', ink: '#0d0f0e', gold: '#f2c14e', orange: '#F39C12' };
const F = 'Mont';
const TAU = Math.PI * 2;
const ease = (t: number) => (t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t));
const win = (p: number, a: number, b: number) => ease((p - a) / (b - a));

// ---------- 3D coins ----------
const Env = () => {
  const { gl, scene } = useThree();
  useMemo(() => {
    const pm = new THREE.PMREMGenerator(gl);
    scene.environment = pm.fromScene(new RoomEnvironment(), 0.02).texture;
    gl.toneMapping = THREE.ACESFilmicToneMapping; gl.toneMappingExposure = 1.2;
  }, [gl, scene]);
  return null;
};
type C3 = { x: number; y: number; r: number; tilt: number; turns: number; phase: number; bob: number };
const COINS: C3[] = [
  { x: 1060, y: 1000, r: 150, tilt: 0.35, turns: 1, phase: 0.04, bob: 14 },   // crosses seam 1|2
  { x: 3240, y: 1080, r: 78, tilt: 0.5, turns: 2, phase: 0.45, bob: 9 },      // seam 3|4
  { x: 5400, y: 1060, r: 82, tilt: 0.45, turns: 1, phase: 0.47, bob: 10 },    // seam 5|6
  { x: 6470, y: 990, r: 128, tilt: 0.3, turns: 1, phase: 0.53, bob: 14 },     // seam 6|7
];
const Coins = ({ f }: { f: number }) => (
  <ThreeCanvas orthographic width={CW} height={SH} camera={{ position: [0, 0, 2000], zoom: 1, near: 1, far: 5000 }} gl={{ antialias: true }}>
    <Env />
    <directionalLight position={[300, 600, 900]} intensity={2.6} />
    <directionalLight position={[-600, -200, 600]} intensity={0.7} color="#9fe0bb" />
    {COINS.map((c, i) => {
      const p = f / LOOP;
      const spin = c.turns * TAU * p + c.phase * TAU;
      const bob = Math.sin(TAU * (p + c.phase)) * c.bob;
      return (
        <group key={i} position={[c.x - CW / 2, SH / 2 - c.y + bob, 0]} rotation={[c.tilt, spin, 0]}>
          <CoinMesh rx={Math.PI / 2} ry={0} rz={0} x={0} y={0} z={0} s={c.r} />
        </group>
      );
    })}
  </ThreeCanvas>
);
// soft contact shadow under each coin (it floats above the glass)
const CoinShadows = ({ p }: { p: number }) => (
  <>
    {COINS.map((c, i) => {
      const bob = Math.sin(TAU * (p + c.phase)) * c.bob;
      const k = 1 - bob / (c.bob * 4 + 1);
      return <div key={i} style={{ position: 'absolute', left: c.x - c.r * 0.9, top: c.y + c.r * 0.95, width: c.r * 1.8, height: c.r * 0.34, borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(0,0,0,.55), rgba(0,0,0,0))', transform: `scale(${k})`, filter: 'blur(6px)' }} />;
    })}
  </>
);

// ---------- the thread: one smooth curve through every slide's icon node ----------
const NODES: [number, number][] = [[740, 1195], [1900, 1205], [3010, 1188], [4090, 1206], [5190, 1186], [6260, 1204], [7330, 1190]];
const PTS: [number, number][] = (() => {
  const out: [number, number][] = [[-80, 1250]];
  NODES.forEach((n, i) => {
    out.push(n);
    const nx = NODES[i + 1] ? NODES[i + 1][0] : 7640;
    out.push([(n[0] + nx) / 2, i % 2 ? 1150 : 1292]);
  });
  return out;
})();
const SEGS = (() => {   // Catmull-Rom → cubic Béziers
  const s: number[][] = [];
  for (let i = 0; i < PTS.length - 1; i++) {
    const p0 = PTS[Math.max(0, i - 1)], p1 = PTS[i], p2 = PTS[i + 1], p3 = PTS[Math.min(PTS.length - 1, i + 2)];
    s.push([p1[0], p1[1], p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6, p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6, p2[0], p2[1]]);
  }
  return s;
})();
const PATH = SEGS.map((s, i) => `${i ? '' : `M${s[0]},${s[1]}`} C${s[2]},${s[3]} ${s[4]},${s[5]} ${s[6]},${s[7]}`).join(' ');
const TABLE = (() => {   // arc-length table for placing the travelling lights
  const pts: [number, number, number][] = []; let L = 0, prev: [number, number] | null = null;
  for (const s of SEGS) for (let k = 0; k <= 200; k++) {
    const t = k / 200, u = 1 - t;
    const x = u * u * u * s[0] + 3 * u * u * t * s[2] + 3 * u * t * t * s[4] + t * t * t * s[6];
    const y = u * u * u * s[1] + 3 * u * u * t * s[3] + 3 * u * t * t * s[5] + t * t * t * s[7];
    if (prev) L += Math.hypot(x - prev[0], y - prev[1]);
    pts.push([x, y, L]); prev = [x, y];
  }
  return { pts, L };
})();
const at = (d: number) => {
  const { pts, L } = TABLE; d = ((d % L) + L) % L;
  let lo = 0, hi = pts.length - 1;
  while (hi - lo > 1) { const m = (lo + hi) >> 1; if (pts[m][2] < d) lo = m; else hi = m; }
  return pts[hi];
};
const COMETS = 14;
const Thread = ({ p }: { p: number }) => (
  <svg width={CW} height={SH} style={{ position: 'absolute', inset: 0 }}>
    <defs>
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="9" /></filter>
      <radialGradient id="spark"><stop offset="0%" stopColor="#fffbe8" /><stop offset="35%" stopColor="#ffe08a" /><stop offset="100%" stopColor="#f2c14e" stopOpacity="0" /></radialGradient>
    </defs>
    <path d={PATH} fill="none" stroke={C.gold} strokeWidth={14} opacity={0.35} filter="url(#glow)" />
    <path d={PATH} fill="none" stroke="#f7d77e" strokeWidth={4.5} strokeLinecap="round" />
    {Array.from({ length: COMETS }).map((_, i) => {
      const d0 = ((i + p) / COMETS) * TABLE.L;
      return (
        <g key={i}>
          {Array.from({ length: 9 }).map((_, k) => {
            const [x, y] = at(d0 - k * 14);
            return <circle key={k} cx={x} cy={y} r={k ? 9 - k * 0.8 : 20} fill={k ? '#ffe9a8' : 'url(#spark)'} opacity={k ? 0.75 - k * 0.08 : 1} />;
          })}
        </g>
      );
    })}
  </svg>
);

// ---------- building blocks ----------
const glass: React.CSSProperties = {
  background: 'linear-gradient(155deg, rgba(255,255,255,.17), rgba(255,255,255,.05) 60%)',
  border: '1.5px solid rgba(255,255,255,.24)',
  backdropFilter: 'blur(26px) saturate(150%)',
  boxShadow: 'inset 0 1.5px 0 rgba(255,255,255,.38), inset 0 -20px 40px rgba(0,0,0,.12), 0 3px 8px rgba(0,0,0,.28), 0 26px 50px rgba(0,0,0,.38), 0 70px 120px rgba(0,0,0,.32)',
};
const Glass = ({ style, children }: { style?: React.CSSProperties; children: React.ReactNode }) => (
  <div style={{ position: 'absolute', borderRadius: 34, ...glass, ...style }}>{children}</div>
);
const goldFill = (deep = false): React.CSSProperties => ({
  backgroundImage: deep ? 'linear-gradient(180deg, #fffbe6 0%, #ffe28a 30%, #f7c444 58%, #e09d1c 82%, #c98512 100%)' : 'linear-gradient(180deg, #fff6d8 0%, #f7d36d 45%, #d99a22 100%)',
  WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
});
const lift = 'drop-shadow(0 3px 0 rgba(120,78,6,.9)) drop-shadow(0 6px 0 rgba(80,50,4,.5)) drop-shadow(0 0 24px rgba(255,200,90,.25)) drop-shadow(0 20px 26px rgba(0,0,0,.45))';
const textLift = '0 2px 0 rgba(0,0,0,.25), 0 10px 30px rgba(0,0,0,.45)';

const Chip = ({ I, size = 120, tone = 'gold', style }: { I: LucideIcon; size?: number; tone?: 'gold' | 'green' | 'glass'; style?: React.CSSProperties }) => (
  <div style={{
    width: size, height: size, borderRadius: size * 0.3, display: 'grid', placeItems: 'center', flex: 'none',
    background: tone === 'gold' ? 'linear-gradient(150deg, #fff0b8 0%, #f2c14e 42%, #c48a16 100%)' : tone === 'green' ? 'linear-gradient(150deg, #5fe39a 0%, #27AE60 48%, #146b3a 100%)' : 'linear-gradient(150deg, rgba(255,255,255,.3), rgba(255,255,255,.08))',
    border: tone === 'glass' ? '1.5px solid rgba(255,255,255,.3)' : 'none',
    boxShadow: 'inset 0 2px 1px rgba(255,255,255,.7), inset 0 -8px 16px rgba(0,0,0,.22), 0 4px 8px rgba(0,0,0,.3), 0 18px 34px rgba(0,0,0,.45)',
    ...style,
  }}>
    <I size={size * 0.5} color={tone === 'gold' ? '#3a2804' : '#ffffff'} strokeWidth={2.3} />
  </div>
);

// slot-machine digits: they spin two full turns once per loop and land on the same value (seamless)
const rollInk: React.CSSProperties = { color: '#ffd65e', textShadow: '0 -2px 0 #fff3c4, 0 4px 0 #c08414, 0 8px 0 #87590a' };
const Roll = ({ text, p, at: t0, size, style }: { text: string; p: number; at: number; size: number; style?: React.CSSProperties }) => {
  let di = 0;
  return (
    <span style={{ display: 'inline-flex', lineHeight: 1, height: size + 20, overflow: 'hidden', filter: 'drop-shadow(0 0 30px rgba(255,200,90,.3)) drop-shadow(0 26px 30px rgba(0,0,0,.5))', ...style }}>
      {text.split('').map((ch, i) => {
        if (!/[0-9]/.test(ch)) return <span key={i} style={{ ...rollInk, fontSize: size, height: size }}>{ch}</span>;
        const d = Number(ch), k = di++;
        const e = win(p, t0 + k * 0.025, t0 + 0.22 + k * 0.025);
        const v = Math.sin(Math.PI * e);                        // speed proxy for the blur
        const idx = d + 20 * e;
        return (
          <span key={i} style={{ display: 'inline-block', height: size + 20, overflow: 'hidden' }}>
            <span style={{ display: 'flex', flexDirection: 'column', transform: `translateY(${-idx * size}px)`, filter: `blur(${v * size * 0.025}px)` }}>
              {Array.from({ length: 31 }).map((_, j) => <span key={j} style={{ ...rollInk, fontSize: size, height: size, lineHeight: `${size}px` }}>{j % 10}</span>)}
            </span>
          </span>
        );
      })}
    </span>
  );
};

const Pill = ({ children, gold = false, size = 28, rot = 0, style }: { children: React.ReactNode; gold?: boolean; size?: number; rot?: number; style?: React.CSSProperties }) => (
  <div style={{
    display: 'inline-flex', alignItems: 'center', gap: size * 0.5, fontWeight: 800, fontSize: size, letterSpacing: 3, padding: `${size * 0.5}px ${size * 0.95}px`, borderRadius: 999,
    transform: `rotate(${rot}deg)`, color: gold ? '#2e2004' : C.cream,
    ...(gold ? { background: 'linear-gradient(160deg, #ffefb0, #f2c14e 50%, #cf961f)', boxShadow: 'inset 0 2px 1px rgba(255,255,255,.7), 0 14px 28px rgba(0,0,0,.4)' } : glass),
    ...style,
  }}>{children}</div>
);

const Slide = ({ i, children }: { i: number; children: React.ReactNode }) => (
  <div style={{ position: 'absolute', left: i * SW, top: 0, width: SW, height: SH, fontFamily: F, color: C.cream, textShadow: textLift }}>
    <div style={{ position: 'absolute', left: 80, top: 66, display: 'flex', alignItems: 'center', gap: 14, fontSize: 22, fontWeight: 800, letterSpacing: 3 }}>
      <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(150deg,#5fe39a,#27AE60 50%,#146b3a)', boxShadow: 'inset 0 2px 1px rgba(255,255,255,.6), 0 8px 16px rgba(0,0,0,.4)', display: 'grid', placeItems: 'center', textShadow: 'none' }}>
        <svg width={30} height={30} viewBox="0 0 100 100"><path d={LEAF} fill="#fff" /></svg>
      </div>
      TAX SECRETS CANADA
    </div>
    {/* clarity meter: fills as you swipe */}
    <div style={{ position: 'absolute', right: 80, top: 70, display: 'flex', alignItems: 'center', gap: 16, fontSize: 22, fontWeight: 800, letterSpacing: 2 }}>
      <div style={{ display: 'flex', gap: 6 }}>
        {Array.from({ length: SLIDES }).map((_, k) => (
          <div key={k} style={{ width: 22, height: 8, borderRadius: 4, background: k <= i ? 'linear-gradient(90deg,#ffe08a,#f2c14e)' : 'rgba(255,255,255,.22)', boxShadow: k <= i ? '0 0 10px rgba(242,193,78,.7)' : 'none' }} />
        ))}
      </div>
      {i + 1}/{SLIDES}
    </div>
    {children}
  </div>
);

// ---------- paper chaos (thins out and settles as you swipe) ----------
type Sheet = { x: number; y: number; r: number; s: number; blur: number; ph: number; o: number };
const SHEETS: Sheet[] = [
  { x: 640, y: 210, r: 18, s: 0.95, blur: 7, ph: 0.1, o: 0.8 }, { x: 860, y: 520, r: -24, s: 0.7, blur: 3, ph: 0.4, o: 0.9 },
  { x: 700, y: 820, r: 32, s: 1.25, blur: 12, ph: 0.7, o: 0.55 }, { x: -60, y: 980, r: -12, s: 0.8, blur: 9, ph: 0.25, o: 0.6 },
  { x: 1500, y: 980, r: -16, s: 0.75, blur: 5, ph: 0.55, o: 0.55 }, { x: 1960, y: 120, r: 22, s: 0.85, blur: 10, ph: 0.85, o: 0.45 },
  { x: 2780, y: 160, r: -9, s: 0.6, blur: 6, ph: 0.3, o: 0.35 },
];
const Paper = ({ sh, p }: { sh: Sheet; p: number }) => {
  const dx = Math.sin(TAU * (p + sh.ph)) * 26, dy = Math.cos(TAU * (p + sh.ph)) * 18, dr = Math.sin(TAU * (p + sh.ph + 0.2)) * 5;
  return (
    <div style={{ position: 'absolute', left: sh.x + dx, top: sh.y + dy, width: 300 * sh.s, height: 390 * sh.s, transform: `rotate(${sh.r + dr}deg) perspective(900px) rotateX(${12 + dr * 2}deg) rotateY(${dr * 3}deg)`, opacity: sh.o, filter: `blur(${sh.blur}px)` }}>
      <div style={{ position: 'absolute', inset: 0, borderRadius: 6, background: 'linear-gradient(170deg,#fbf8f1,#e9e4d8)', boxShadow: '0 30px 50px rgba(0,0,0,.45)', overflow: 'hidden', padding: 24 * sh.s }}>
        <div style={{ height: 22 * sh.s, width: '55%', background: '#27AE60', borderRadius: 4, opacity: 0.8 }} />
        {Array.from({ length: 9 }).map((_, k) => (
          <div key={k} style={{ marginTop: 16 * sh.s, height: 8 * sh.s, width: `${92 - ((k * 37) % 40)}%`, background: '#b9b2a4', borderRadius: 4 }} />
        ))}
        <div style={{ marginTop: 20 * sh.s, display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 6 * sh.s }}>
          {Array.from({ length: 8 }).map((_, k) => <div key={k} style={{ height: 22 * sh.s, border: `${2 * sh.s}px solid #c9c1b0`, borderRadius: 3 }} />)}
        </div>
      </div>
    </div>
  );
};

// icon node sitting on the thread; a ring pulses out once per loop
const Node = ({ n, I, p, ph, tone = 'gold' }: { n: number; I: LucideIcon; p: number; ph: number; tone?: 'gold' | 'green' }) => {
  const [x, y] = NODES[n];
  const q = (p + ph) % 1;
  return (
    <>
      <div style={{ position: 'absolute', left: x - 60, top: y - 60, width: 120, height: 120, borderRadius: 40, border: '3px solid rgba(255,224,138,.9)', transform: `scale(${1 + q * 0.9})`, opacity: (1 - q) * 0.7 }} />
      <Chip I={I} size={120} tone={tone} style={{ position: 'absolute', left: x - 60, top: y - 60 }} />
    </>
  );
};

export const Carousel2 = () => {
  const f = useCurrentFrame();
  const p = f / LOOP;
  const pulse = 0.5 + 0.5 * Math.sin(TAU * p * 2);
  const nudge = Math.sin(TAU * p * 3) * 12;
  const leak = Math.sin(TAU * p);
  return (
    <AbsoluteFill style={{ width: CW, height: SH, overflow: 'hidden', background: '#06170f' }}>
      {/* live office, half resolution, defocused */}
      <div style={{ position: 'absolute', left: 0, top: 0, width: CW / 2, height: SH / 2, transform: 'scale(2)', transformOrigin: '0 0' }}>
        <Office f={f} loop={LOOP} w={CW / 2} h={SH / 2} />
      </div>
      {/* brand grade: deep green, heavier on the left (murky) and lighter on the right (clear) */}
      <AbsoluteFill style={{ background: 'linear-gradient(90deg, rgba(3,20,13,.72) 0%, rgba(5,30,20,.6) 30%, rgba(7,38,25,.48) 65%, rgba(10,44,29,.36) 100%)' }} />
      <AbsoluteFill style={{ background: 'linear-gradient(180deg, rgba(2,14,9,.6) 0%, rgba(2,14,9,0) 20%, rgba(2,14,9,0) 72%, rgba(2,14,9,.7) 100%)' }} />
      <AbsoluteFill style={{ background: `radial-gradient(900px 700px at ${6900 + leak * 120}px 120px, rgba(255,205,110,.30), rgba(255,205,110,0) 70%), radial-gradient(700px 600px at ${5300 - leak * 100}px 60px, rgba(255,205,110,.14), rgba(255,205,110,0) 70%)`, mixBlendMode: 'screen' }} />
      {/* haze on the first slides */}
      <AbsoluteFill style={{ background: `radial-gradient(800px 500px at ${500 + leak * 80}px 700px, rgba(190,210,205,.10), rgba(190,210,205,0) 70%), radial-gradient(900px 500px at ${1700 - leak * 80}px 400px, rgba(190,210,205,.07), rgba(190,210,205,0) 70%)` }} />

      {SHEETS.map((sh, i) => <Paper key={i} sh={sh} p={p} />)}

      <Thread p={p} />
      <CoinShadows p={p} />
      <Coins f={f} />

      {/* 1 · hook */}
      <Slide i={0}>
        <div style={{ position: 'absolute', left: 80, top: 190 }}><Pill rot={-2}><Baby size={30} color={C.gold} strokeWidth={2.4} />FOR PARENTS IN CANADA</Pill></div>
        <div style={{ position: 'absolute', left: 80, top: 310, fontWeight: 900, fontSize: 116, lineHeight: 0.98, letterSpacing: -3 }}>
          Canada<br /><span style={{ ...goldFill(true), filter: lift, textShadow: 'none' }}>pays you</span><br />to save for<br />your kid's<br />education.
        </div>
        <div style={{ position: 'absolute', left: 80, top: 960, display: 'flex', alignItems: 'center', gap: 22 }}>
          <Pill gold size={30} style={{ transform: `translateX(${nudge}px)` }}>SWIPE →</Pill>
          <div style={{ fontSize: 28, fontWeight: 700, opacity: 0.85 }}>it gets clearer</div>
        </div>
      </Slide>
      <Node n={0} I={GraduationCap} p={p} ph={0} />

      {/* 2 · RESP */}
      <Slide i={1}>
        <div style={{ position: 'absolute', left: 140, top: 200, fontSize: 30, letterSpacing: 6, fontWeight: 800, color: C.mint }}>IT'S CALLED AN</div>
        <div style={{ position: 'absolute', left: 126, top: 240, fontWeight: 900, fontSize: 260, letterSpacing: -10, lineHeight: 1, textShadow: '0 4px 0 rgba(0,0,0,.25), 0 30px 60px rgba(0,0,0,.5)' }}>RESP</div>
        <div style={{ position: 'absolute', left: 140, top: 520, fontSize: 40, fontWeight: 700, width: 800 }}>Registered Education Savings Plan</div>
        <Glass style={{ left: 140, top: 660, width: 340, height: 250, padding: 34 }}>
          <Chip I={PiggyBank} size={96} tone="glass" />
          <div style={{ marginTop: 26, fontWeight: 800, fontSize: 44 }}>You save</div>
        </Glass>
        <svg width={170} height={120} viewBox="0 0 170 120" style={{ position: 'absolute', left: 495, top: 725, overflow: 'visible' }}>
          <path d="M8 60 C60 10, 110 110, 150 60" fill="none" stroke="rgba(247,215,126,.35)" strokeWidth={8} strokeLinecap="round" />
          <path d="M8 60 C60 10, 110 110, 150 60" fill="none" stroke="#f7d77e" strokeWidth={8} strokeLinecap="round" strokeDasharray="40 200" strokeDashoffset={-((p * 3) % 1) * 240 + 40} />
          <path d="M134 44 L154 60 L134 76" fill="none" stroke="#f7d77e" strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <Glass style={{ left: 680, top: 660, width: 340, height: 250, padding: 34, transform: `scale(${1 + 0.03 * pulse})`, background: 'linear-gradient(155deg, rgba(39,174,96,.55), rgba(39,174,96,.18) 70%)' }}>
          <Chip I={Landmark} size={96} tone="gold" />
          <div style={{ marginTop: 26, fontWeight: 800, fontSize: 44 }}>Canada adds</div>
        </Glass>
      </Slide>
      <Node n={1} I={PiggyBank} p={p} ph={0.14} tone="green" />

      {/* 3 · CESG 20% */}
      <Slide i={2}>
        <div style={{ position: 'absolute', left: 90, top: 200 }}><Pill gold rot={2}>THE GRANT · CESG</Pill></div>
        <div style={{ position: 'absolute', left: 70, top: 300, fontWeight: 900, letterSpacing: -16 }}><Roll text="20%" p={p} at={0.3} size={350} /></div>
        <div style={{ position: 'absolute', left: 90, top: 680, fontSize: 52, fontWeight: 800, lineHeight: 1.12, width: 860 }}>on the first <span style={{ color: C.gold }}>$2,500</span> you put in each year</div>
        <Glass style={{ left: 90, top: 860, width: 860, height: 150, display: 'flex', alignItems: 'center', gap: 26, padding: '0 34px' }}>
          <Chip I={HandCoins} size={92} tone="gold" />
          <div style={{ fontSize: 40, fontWeight: 700, opacity: 0.9 }}>$2,500 × 20% =</div>
          <div style={{ fontSize: 64, fontWeight: 900, ...goldFill(true), filter: lift, textShadow: 'none' }}>$500</div>
          <div style={{ fontSize: 32, fontWeight: 700, opacity: 0.85 }}>a year</div>
        </Glass>
      </Slide>
      <Node n={2} I={Percent} p={p} ph={0.28} />

      {/* 4 · carry forward */}
      <Slide i={3}>
        <div style={{ position: 'absolute', left: 150, top: 200 }}><Pill rot={-2}><History size={30} color={C.gold} strokeWidth={2.4} />MISSED A YEAR?</Pill></div>
        <div style={{ position: 'absolute', left: 150, top: 310, fontWeight: 900, fontSize: 96, lineHeight: 1.02, letterSpacing: -2, width: 840 }}>Unused grant room <span style={{ ...goldFill(true), filter: lift, textShadow: 'none' }}>carries forward.</span></div>
        {['2024', '2025', '2026'].map((y, k) => {
          const now = k === 2;
          return (
            <Glass key={y} style={{ left: 150 + k * 230, top: 650 - (now ? 14 * pulse : 0), width: 205, height: 240, overflow: 'hidden', transform: `rotate(${(k - 1) * 3}deg)`, ...(now ? { background: 'linear-gradient(155deg, rgba(39,174,96,.6), rgba(39,174,96,.2))' } : {}) }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '16px 0', fontWeight: 800, fontSize: 32, background: 'rgba(0,0,0,.18)' }}><CalendarDays size={28} color={now ? '#fff' : C.gold} />{y}</div>
              <div style={{ fontWeight: 900, fontSize: now ? 58 : 50, textAlign: 'center', marginTop: 40, ...(now ? { ...goldFill(true), filter: lift, textShadow: 'none' } : { opacity: 0.55 }) }}>{now ? '+' : ''}$500</div>
            </Glass>
          );
        })}
        <div style={{ position: 'absolute', left: 150, top: 960, fontSize: 44, fontWeight: 800, width: 840 }}>Catch up: up to <span style={{ color: C.gold }}>$1,000</span> of grant in one year.</div>
      </Slide>
      <Node n={3} I={History} p={p} ph={0.42} tone="green" />

      {/* 5 · lifetime */}
      <Slide i={4}>
        <div style={{ position: 'absolute', left: 90, top: 200, fontSize: 30, letterSpacing: 6, fontWeight: 800, color: C.mint }}>LIFETIME LIMIT · PER CHILD</div>
        <div style={{ position: 'absolute', left: 70, top: 250, fontWeight: 900, letterSpacing: -12 }}><Roll text="$7,200" p={p} at={0.35} size={250} /></div>
        <Glass style={{ left: 90, top: 560, width: 900, height: 470 }}>
          <svg width={900} height={470} style={{ position: 'absolute', inset: 0 }}>
            <defs><linearGradient id="bar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff6d8" /><stop offset="1" stopColor="#d99a22" /></linearGradient></defs>
            {Array.from({ length: 15 }).map((_, k) => {
              const cum = Math.min(7200, (k + 1) * 500), h = (cum / 7200) * 360 * (0.97 + 0.03 * Math.sin(TAU * (p + k / 15)));
              const last = k === 14;
              return <rect key={k} x={40 + k * 56} y={410 - h} width={42} height={h} rx={9} fill={last ? 'url(#bar)' : 'rgba(246,241,231,.85)'} style={{ filter: last ? 'drop-shadow(0 0 14px rgba(242,193,78,.8))' : 'none' }} />;
            })}
            <line x1={30} x2={870} y1={418} y2={418} stroke="rgba(246,241,231,.5)" strokeWidth={3} />
          </svg>
          <div style={{ position: 'absolute', left: 40, top: 30, display: 'flex', alignItems: 'center', gap: 14, fontSize: 28, fontWeight: 700, opacity: 0.9 }}><ChartColumn size={30} color={C.gold} />Grant adds up year after year</div>
        </Glass>
        <div style={{ position: 'absolute', left: 90, top: 1050, fontSize: 34, fontWeight: 800 }}>$36,000 of your savings × 20% = <span style={{ color: C.gold }}>$7,200</span></div>
      </Slide>
      <Node n={4} I={ChartColumn} p={p} ph={0.56} />

      {/* 6 · Canada Learning Bond */}
      <Slide i={5}>
        <div style={{ position: 'absolute', left: 100, top: 200 }}><Pill gold rot={2}>LOW INCOME? BONUS</Pill></div>
        <div style={{ position: 'absolute', left: 100, top: 300, fontWeight: 900, fontSize: 100, lineHeight: 1, letterSpacing: -3 }}>Canada<br />Learning Bond</div>
        {[[Gift, '+$500', 'the first year'], [CalendarDays, '+$100', 'each year, up to age 15'], [BadgeDollarSign, '$2,000', 'maximum']].map(([I, a, b], k) => (
          <Glass key={k} style={{ left: 100, top: 530 + k * 128, width: 860, height: 108, display: 'flex', alignItems: 'center', gap: 24, padding: '0 26px', borderRadius: 28 }}>
            <Chip I={I as LucideIcon} size={70} tone={k === 2 ? 'gold' : 'green'} />
            <span style={{ fontWeight: 900, fontSize: 60, width: 250, letterSpacing: -1, ...(k === 2 ? { ...goldFill(true), filter: lift, textShadow: 'none' } : {}) }}>{a as string}</span>
            <span style={{ fontWeight: 700, fontSize: 34, opacity: 0.92 }}>{b as string}</span>
          </Glass>
        ))}
        <div style={{ position: 'absolute', left: 100, top: 935 }}><Pill size={32}><Check size={34} color={C.gold} strokeWidth={3} />No contribution needed</Pill></div>
        <div style={{ position: 'absolute', left: 100, top: 1040, fontSize: 28, fontWeight: 600, opacity: 0.88, width: 760, lineHeight: 1.35 }}>+$25 once to help open the RESP.<br />For children born in 2004 or later.</div>
      </Slide>
      <Node n={5} I={Gift} p={p} ph={0.7} tone="green" />

      {/* 7 · CTA */}
      <Slide i={6}>
        <div style={{ position: 'absolute', left: 190, top: 210, fontWeight: 900, fontSize: 128, lineHeight: 0.98, letterSpacing: -4 }}>Save this.<br /><span style={{ ...goldFill(true), filter: lift, textShadow: 'none' }}>Send it</span><br />to a parent.</div>
        <Glass style={{ left: 190, top: 620, width: 820, height: 330, padding: '30px 34px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {['Open an RESP', 'Get your child a SIN', 'Contribute up to $2,500 a year', 'Low income? Ask for the CLB'].map((s, k) => {
            const on = win(p, 0.1 + k * 0.12, 0.16 + k * 0.12) * (1 - win(p, 0.86, 0.96));
            return (
              <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 20, fontSize: 38, fontWeight: 800 }}>
                <div style={{ width: 54, height: 54, borderRadius: 16, flex: 'none', display: 'grid', placeItems: 'center', background: on > 0.5 ? 'linear-gradient(150deg,#5fe39a,#27AE60 50%,#146b3a)' : 'rgba(255,255,255,.12)', border: '1.5px solid rgba(255,255,255,.3)', boxShadow: on > 0.5 ? '0 0 22px rgba(39,174,96,.8), inset 0 2px 1px rgba(255,255,255,.6)' : 'none', transform: `scale(${1 + 0.15 * Math.sin(Math.PI * on)})` }}>
                  <Check size={36} color="#fff" strokeWidth={3.4} style={{ opacity: 0.25 + 0.75 * on }} />
                </div>
                {s}
              </div>
            );
          })}
        </Glass>
        <div style={{ position: 'absolute', left: 190, top: 975 }}><Pill gold size={32}>@canadataxwizard</Pill></div>
        <div style={{ position: 'absolute', left: 190, top: 1068, fontSize: 24, fontWeight: 600, opacity: 0.8 }}>Source: canada.ca · General info, not advice</div>
      </Slide>
      <Node n={6} I={ListChecks} p={p} ph={0.84} />

      {/* film grain + vignette */}
      <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 72%, rgba(0,0,0,.2) 100%)', pointerEvents: 'none' }} />
    </AbsoluteFill>
  );
};
