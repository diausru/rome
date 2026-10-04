// Seamless Instagram carousel: one 7×1080 × 1350 canvas, sliced into seven 4:5 slides.
// Objects (3D coins, the gold path, arrows) cross the seams on purpose so a swipe reads as one panorama.
// Every animation is periodic over LOOP frames, so each sliced slide video loops cleanly.
// Facts: canada.ca (CESG InfoCapsule 11, RESP provider guide ch. 5–6, CRA Canada Learning Bond page).
import { ThreeCanvas } from '@remotion/three';
import { useThree } from '@react-three/fiber';
import { useMemo } from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { CoinMesh, LEAF } from './Coin';

export const SLIDES = 7, SW = 1080, SH = 1350, CW = SLIDES * SW, LOOP = 180;
const C = { deep: '#0a3323', green: '#27AE60', mint: '#bff0d2', cream: '#f6f1e7', ink: '#0d0f0e', gold: '#f2c14e', orange: '#F39C12', red: '#D52B1E' };
const F = 'Mont';
const TAU = Math.PI * 2;

const Env = () => {
  const { gl, scene } = useThree();
  useMemo(() => {
    const pm = new THREE.PMREMGenerator(gl);
    scene.environment = pm.fromScene(new RoomEnvironment(), 0.02).texture;
    gl.toneMapping = THREE.ACESFilmicToneMapping; gl.toneMappingExposure = 1.2;
  }, [gl, scene]);
  return null;
};

// coin placed in canvas pixels; spin = whole turns per loop so the loop is seamless
type C3 = { x: number; y: number; r: number; tilt: number; turns: number; phase: number; bob: number };
const COINS: C3[] = [
  { x: 1010, y: 1010, r: 215, tilt: 0.35, turns: 1, phase: 0.04, bob: 14 },     // crosses seam 1|2
  { x: 1600, y: 1150, r: 70, tilt: 0.5, turns: 2, phase: 0.45, bob: 8 },
  { x: 3190, y: 1130, r: 125, tilt: 1.15, turns: 0, phase: 0, bob: 0 },      // stack base, crosses seam 3|4
  { x: 3190, y: 1095, r: 125, tilt: 1.15, turns: 0, phase: 0, bob: 0 },
  { x: 3190, y: 1060, r: 125, tilt: 1.15, turns: 0, phase: 0, bob: 0 },
  { x: 3205, y: 1025, r: 125, tilt: 1.15, turns: 0, phase: 0, bob: 0 },
  { x: 3250, y: 880, r: 115, tilt: 0.25, turns: 1, phase: 0.06, bob: 18 },    // flipping coin above the stack
  { x: 4300, y: 1080, r: 92, tilt: 0.4, turns: 1, phase: 0.47, bob: 10 },      // on seam 4|5
  { x: 6470, y: 1060, r: 165, tilt: 0.3, turns: 1, phase: 0.53, bob: 14 },    // crosses seam 6|7
  { x: 7390, y: 1110, r: 80, tilt: 0.45, turns: 2, phase: 0.02, bob: 9 },
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

// One continuous gold path through all seven slides; dashes flow one period per loop.
const PATH = (() => {
  const pts = [[-40, 1270], [540, 1250], [1080, 1285], [1620, 1255], [2160, 1280], [2700, 1250], [3240, 1285], [3780, 1255], [4320, 1280], [4860, 1250], [5400, 1285], [5940, 1255], [6480, 1280], [7020, 1250], [7600, 1270]];
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1], [x1, y1] = pts[i], mx = (x0 + x1) / 2;
    d += ` C${mx},${y0} ${mx},${y1} ${x1},${y1}`;
  }
  return d;
})();

const Pill = ({ children, bg = C.green, color = '#fff', rot = 0, size = 30 }: { children: React.ReactNode; bg?: string; color?: string; rot?: number; size?: number }) => (
  <div style={{ display: 'inline-block', background: bg, color, fontWeight: 800, fontSize: size, letterSpacing: 3, padding: `${size * 0.45}px ${size * 0.9}px`, borderRadius: 999, transform: `rotate(${rot}deg)`, boxShadow: '0 10px 24px rgba(0,0,0,.25)' }}>{children}</div>
);
const Slide = ({ i, children }: { i: number; children: React.ReactNode }) => (
  <div style={{ position: 'absolute', left: i * SW, top: 0, width: SW, height: SH, fontFamily: F, color: C.cream }}>
    <div style={{ position: 'absolute', left: 80, top: 70, display: 'flex', alignItems: 'center', gap: 14, fontSize: 22, fontWeight: 800, letterSpacing: 3, opacity: 0.85 }}>
      <div style={{ width: 40, height: 40, borderRadius: 10, background: C.green, color: '#fff', display: 'grid', placeItems: 'center', fontSize: 26 }}>$</div>TAX SECRETS CANADA
    </div>
    <div style={{ position: 'absolute', right: 80, top: 74, fontSize: 24, fontWeight: 800, letterSpacing: 2, opacity: 0.7 }}>{i + 1} / {SLIDES}</div>
    {children}
  </div>
);

export const Carousel = () => {
  const f = useCurrentFrame();
  const p = f / LOOP;
  const pulse = 0.5 + 0.5 * Math.sin(TAU * p * 2);
  const nudge = Math.sin(TAU * p * 3) * 12;
  return (
    <AbsoluteFill style={{ width: CW, height: SH, overflow: 'hidden', background: `linear-gradient(100deg, #0b3a28 0%, ${C.deep} 30%, #0d4430 55%, ${C.deep} 80%, #0b3a28 100%)` }}>
      {/* big soft shapes that span seams */}
      <svg width={CW} height={SH} style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#1f7a4d" stopOpacity="0.55" /><stop offset="100%" stopColor="#1f7a4d" stopOpacity="0" /></radialGradient>
        </defs>
        {[[900, 900, 700], [2400, 300, 600], [3600, 1000, 650], [5100, 380, 700], [6500, 1000, 650]].map(([x, y, r], k) => (
          <circle key={k} cx={x + Math.sin(TAU * (p + k * 0.2)) * 20} cy={y} r={r} fill="url(#glow)" />
        ))}
        {[[2650, 1180, 9, 0.07], [5850, 240, 7, 0.06], [180, 1180, 5, 0.06]].map(([x, y, s, o], k) => (
          <path key={k} d={LEAF} transform={`translate(${x - s * 50},${y - s * 50}) scale(${s}) rotate(${-12 + k * 9} 50 50)`} fill="#ffffff" opacity={o} />
        ))}
        <path d={PATH} fill="none" stroke={C.gold} strokeWidth={10} strokeLinecap="round" strokeDasharray="44 30" strokeDashoffset={-p * 74 * 4} opacity={0.9} />
      </svg>

      <Coins f={f} />

      {/* 1 · hook */}
      <Slide i={0}>
        <div style={{ position: 'absolute', left: 80, top: 190 }}><Pill bg={C.cream} color={C.deep} rot={-3}>FOR PARENTS IN CANADA</Pill></div>
        <div style={{ position: 'absolute', left: 80, top: 300, fontWeight: 900, fontSize: 118, lineHeight: 0.98, letterSpacing: -3 }}>
          Canada<br /><span style={{ color: C.gold }}>pays you</span><br />to save for<br />your kid's<br />education.
        </div>
        <div style={{ position: 'absolute', left: 80, top: 1060, transform: `translateX(${nudge}px)` }}><Pill bg={C.green} size={32}>SWIPE →</Pill></div>
      </Slide>

      {/* 2 · RESP */}
      <Slide i={1}>
        <div style={{ position: 'absolute', left: 140, top: 210, fontSize: 30, letterSpacing: 6, fontWeight: 800, color: C.mint }}>IT'S CALLED AN</div>
        <div style={{ position: 'absolute', left: 130, top: 250, fontWeight: 900, fontSize: 250, letterSpacing: -10, lineHeight: 1 }}>RESP</div>
        <div style={{ position: 'absolute', left: 140, top: 520, fontSize: 40, fontWeight: 600, opacity: 0.9, width: 760 }}>Registered Education Savings Plan</div>
        <div style={{ position: 'absolute', left: 140, top: 700, display: 'flex', alignItems: 'center', gap: 26 }}>
          <div style={{ background: C.cream, color: C.ink, borderRadius: 28, padding: '28px 34px', fontWeight: 800, fontSize: 40, boxShadow: '0 16px 30px rgba(0,0,0,.3)' }}>You save</div>
          <svg width={110} height={60} viewBox="0 0 110 60"><path d="M4 30 C40 8, 70 52, 100 30" fill="none" stroke={C.gold} strokeWidth={7} strokeLinecap="round" /><path d="M86 16 L102 30 L86 44" fill="none" stroke={C.gold} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" /></svg>
          <div style={{ background: C.green, color: '#fff', borderRadius: 28, padding: '28px 34px', fontWeight: 800, fontSize: 40, boxShadow: '0 16px 30px rgba(0,0,0,.3)', transform: `scale(${1 + 0.04 * pulse})` }}>Canada adds</div>
        </div>
      </Slide>

      {/* 3 · CESG 20% */}
      <Slide i={2}>
        <div style={{ position: 'absolute', left: 100, top: 210 }}><Pill bg={C.gold} color={C.ink} rot={2}>THE GRANT · CESG</Pill></div>
        <div style={{ position: 'absolute', left: 80, top: 290, fontWeight: 900, fontSize: 360, letterSpacing: -18, lineHeight: 1, color: C.cream }}>20<span style={{ color: C.gold }}>%</span></div>
        <div style={{ position: 'absolute', left: 100, top: 690, fontSize: 52, fontWeight: 800, lineHeight: 1.12, width: 800 }}>on the first <span style={{ color: C.gold }}>$2,500</span> you put in each year</div>
        <div style={{ position: 'absolute', left: 100, top: 900 }}><Pill bg={C.cream} color={C.deep} size={40} rot={-2}>= up to $500 a year</Pill></div>
      </Slide>

      {/* 4 · carry forward */}
      <Slide i={3}>
        <div style={{ position: 'absolute', left: 170, top: 210 }}><Pill bg={C.orange} color={C.ink} rot={-2}>MISSED A YEAR?</Pill></div>
        <div style={{ position: 'absolute', left: 170, top: 320, fontWeight: 900, fontSize: 96, lineHeight: 1.02, letterSpacing: -2, width: 820 }}>Unused grant room <span style={{ color: C.gold }}>carries forward.</span></div>
        <div style={{ position: 'absolute', left: 170, top: 680, display: 'flex', gap: 18 }}>
          {['2024', '2025', '2026'].map((y, k) => (
            <div key={y} style={{ width: 200, height: 220, background: C.cream, color: C.ink, borderRadius: 22, overflow: 'hidden', boxShadow: '0 14px 28px rgba(0,0,0,.3)', transform: `rotate(${(k - 1) * 4}deg) translateY(${k === 2 ? -10 * pulse : 0}px)` }}>
              <div style={{ background: k === 2 ? C.green : '#9aa39c', color: '#fff', fontWeight: 800, fontSize: 34, textAlign: 'center', padding: '12px 0' }}>{y}</div>
              <div style={{ fontWeight: 900, fontSize: k === 2 ? 52 : 46, textAlign: 'center', marginTop: 44, color: k === 2 ? C.green : '#9aa39c' }}>{k === 2 ? '+' : ''}$500</div>
            </div>
          ))}
        </div>
        <div style={{ position: 'absolute', left: 170, top: 980, fontSize: 44, fontWeight: 800, width: 820 }}>Catch up: up to <span style={{ color: C.gold }}>$1,000</span> of grant in one year.</div>
      </Slide>

      {/* 5 · lifetime */}
      <Slide i={4}>
        <div style={{ position: 'absolute', left: 100, top: 210, fontSize: 32, letterSpacing: 6, fontWeight: 800, color: C.mint }}>LIFETIME LIMIT · PER CHILD</div>
        <div style={{ position: 'absolute', left: 80, top: 250, fontWeight: 900, fontSize: 250, letterSpacing: -12, color: C.gold, lineHeight: 1 }}>$7,200</div>
        <svg width={SW} height={SH} style={{ position: 'absolute', inset: 0 }}>
          {Array.from({ length: 15 }).map((_, k) => {
            const cum = Math.min(7200, (k + 1) * 500), h = cum / 7200 * 520 * (0.97 + 0.03 * Math.sin(TAU * (p + k / 15)));
            return <rect key={k} x={100 + k * 58} y={1150 - h} width={46} height={h} rx={8} fill={k === 14 ? C.gold : C.cream} opacity={k === 14 ? 1 : 0.9} />;
          })}
          <line x1={100} x2={SW + 60} y1={1162} y2={1162} stroke={C.cream} strokeWidth={4} opacity={0.6} />
        </svg>
        <div style={{ position: 'absolute', left: 100, top: 1180, fontSize: 32, fontWeight: 700, opacity: 0.9 }}>$36,000 of your savings × 20% = $7,200</div>
      </Slide>

      {/* 6 · Canada Learning Bond */}
      <Slide i={5}>
        <div style={{ position: 'absolute', left: 100, top: 210 }}><Pill bg={C.cream} color={C.deep} rot={2}>LOW INCOME? BONUS</Pill></div>
        <div style={{ position: 'absolute', left: 100, top: 310, fontWeight: 900, fontSize: 104, lineHeight: 1, letterSpacing: -3 }}>Canada<br />Learning Bond</div>
        <div style={{ position: 'absolute', left: 100, top: 560, display: 'flex', flexDirection: 'column', gap: 20, width: 840 }}>
          {[['+$500', 'the first year'], ['+$100', 'each year, up to age 15'], ['$2,000', 'maximum']].map(([a, b], k) => (
            <div key={k} style={{ display: 'flex', alignItems: 'baseline', gap: 22 }}>
              <span style={{ fontWeight: 900, fontSize: 84, color: k === 2 ? C.gold : C.cream, letterSpacing: -2, width: 320 }}>{a}</span>
              <span style={{ fontWeight: 700, fontSize: 40, opacity: 0.92 }}>{b}</span>
            </div>
          ))}
        </div>
        <div style={{ position: 'absolute', left: 100, top: 950 }}><Pill bg={C.green} size={36}>No contribution needed</Pill></div>
        <div style={{ position: 'absolute', left: 100, top: 1080, fontSize: 30, fontWeight: 600, opacity: 0.85, width: 760, lineHeight: 1.35 }}>+$25 once to help open the RESP.<br />For children born in 2004 or later.</div>
      </Slide>

      {/* 7 · CTA */}
      <Slide i={6}>
        <div style={{ position: 'absolute', left: 190, top: 230, fontWeight: 900, fontSize: 132, lineHeight: 0.98, letterSpacing: -4 }}>Save this.<br /><span style={{ color: C.gold }}>Send it</span><br />to a parent.</div>
        <div style={{ position: 'absolute', left: 190, top: 690, width: 800, display: 'flex', flexDirection: 'column', gap: 18 }}>
          {['Open an RESP', 'Get your child a SIN', 'Contribute up to $2,500 a year', 'Low income? Ask for the CLB'].map((s, k) => (
            <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 20, fontSize: 40, fontWeight: 800 }}>
              <div style={{ width: 54, height: 54, borderRadius: 14, background: C.green, display: 'grid', placeItems: 'center', color: '#fff', fontSize: 36, transform: `scale(${k === Math.floor(p * 4) % 4 ? 1.12 : 1})` }}>✓</div>{s}
            </div>
          ))}
        </div>
        <div style={{ position: 'absolute', left: 190, top: 1000 }}><Pill bg={C.cream} color={C.deep} size={34}>@canadataxwizard</Pill></div>
        <div style={{ position: 'absolute', left: 190, top: 1150, fontSize: 24, fontWeight: 600, opacity: 0.75 }}>Source: canada.ca · General info, not advice</div>
      </Slide>

      {/* light grain */}
      <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 70%, rgba(0,0,0,.18) 100%)', pointerEvents: 'none' }} />
    </AbsoluteFill>
  );
};
