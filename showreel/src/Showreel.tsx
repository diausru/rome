import { TransitionSeries, linearTiming, springTiming } from '@remotion/transitions';
import { slide } from '@remotion/transitions/slide';
import { wipe } from '@remotion/transitions/wipe';
import { flip } from '@remotion/transitions/flip';
import { iris } from '@remotion/transitions/iris';
import { AbsoluteFill, Audio, Easing, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { CoinScene, LEAF } from './Coin';

// Palette + type
const C = { ink: '#0d0f0e', deep: '#0b3d2a', green: '#27AE60', mint: '#c9f2d9', cream: '#f4efe6', red: '#D52B1E', gold: '#e9b949' };
const F = 'Mont';
const W = 1080, H = 1920;
const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const ease = Easing.bezier(0.16, 1, 0.3, 1);
const ramp = (f: number, a: number, b: number, e = ease) => interpolate(f, [a, b], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: e });
const useSpring = (delay: number, cfg = { damping: 14, stiffness: 160, mass: 0.7 }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  return spring({ frame: f - delay, fps, config: cfg });
};

// Words split into letters that drop in with a 3D tilt
const Kinetic = ({ text, size, delay, color = C.cream, stagger = 3, weight = 900, outline = false }: { text: string; size: number; delay: number; color?: string; stagger?: number; weight?: number; outline?: boolean }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  return (
    <div style={{ display: 'flex', fontFamily: F, fontWeight: weight, fontSize: size, lineHeight: 0.86, letterSpacing: -size * 0.04, perspective: 900 }}>
      {text.split('').map((ch, i) => {
        const p = spring({ frame: f - delay - i * stagger, fps, config: { damping: 12, stiffness: 180, mass: 0.6 } });
        return (
          <span key={i} style={{
            display: 'inline-block', transformOrigin: '50% 100%',
            transform: `translateY(${(1 - p) * size * 0.9}px) rotateX(${(1 - p) * -80}deg)`, opacity: clamp(p * 1.5),
            color: outline ? 'transparent' : color, WebkitTextStroke: outline ? `3px ${color}` : undefined,
          }}>{ch === ' ' ? ' ' : ch}</span>
        );
      })}
    </div>
  );
};

// Persistent "premium website" chrome on top of every shot
const Chrome = () => {
  const f = useCurrentFrame();
  const starts = [0, 117, 264, 411, 558, 675, 792];
  const shot = starts.filter((s) => f >= s - 9).length;
  const p = ramp(f, 0, 30);
  return (
    <AbsoluteFill style={{ fontFamily: F, color: shot === 3 || shot === 5 ? C.ink : C.cream, opacity: p, pointerEvents: 'none' }}>
      <div style={{ position: 'absolute', left: 60, top: 70, display: 'flex', alignItems: 'center', gap: 16, fontSize: 24, fontWeight: 700, letterSpacing: 3 }}>
        <div style={{ width: 34, height: 34, borderRadius: 17, border: '3px solid currentColor', display: 'grid', placeItems: 'center' }}><div style={{ width: 12, height: 12, borderRadius: 6, background: 'currentColor' }} /></div>
        TAX SECRETS<br />CANADA
      </div>
      <div style={{ position: 'absolute', right: 60, top: 76, border: '2px solid currentColor', padding: '12px 22px', fontSize: 22, fontWeight: 700, letterSpacing: 2 }}>MENU ≡</div>
      <div style={{ position: 'absolute', left: 40, top: 960, transform: 'rotate(-90deg)', transformOrigin: '0 0', fontSize: 18, letterSpacing: 6, opacity: 0.7 }}>CANADIAN TAX · EXPLAINED</div>
      <div style={{ position: 'absolute', right: 40, top: 760, transform: 'rotate(90deg)', transformOrigin: '100% 0', fontSize: 18, letterSpacing: 6, opacity: 0.7 }}>SHOWREEL / 2026</div>
      <div style={{ position: 'absolute', left: 60, bottom: 70, fontSize: 20, letterSpacing: 4, opacity: 0.75 }}>FACTS: CANADA.CA</div>
      <div style={{ position: 'absolute', right: 60, bottom: 62, fontSize: 30, fontWeight: 800, letterSpacing: 2, fontVariantNumeric: 'tabular-nums' }}>0{shot}<span style={{ opacity: 0.5 }}> / 07</span></div>
    </AbsoluteFill>
  );
};

// ---------- 01 · Hook ----------
const Hook = () => {
  const f = useCurrentFrame();
  const leaf = useSpring(4, { damping: 16, stiffness: 90, mass: 1 });
  const rot = interpolate(f, [0, 140], [-25, 8]);
  const fill = ramp(f, 46, 70);
  return (
    <AbsoluteFill style={{ background: C.ink, alignItems: 'center', justifyContent: 'center' }}>
      <svg viewBox="0 0 100 100" style={{ position: 'absolute', width: 1300, opacity: 0.95, transform: `scale(${0.2 + leaf * 0.9}) rotate(${rot}deg)` }}>
        <path d={LEAF} fill={C.red} />
      </svg>
      <div style={{ position: 'absolute', top: 660, left: 64 }}><Kinetic text="CANADA" size={212} delay={10} /></div>
      <div style={{ position: 'absolute', top: 870, left: 64 }}>
        <div style={{ position: 'relative' }}>
          <Kinetic text="TAXES" size={262} delay={22} outline />
          <div style={{ position: 'absolute', inset: 0, clipPath: `inset(0 ${100 - fill * 100}% 0 0)` }}><Kinetic text="TAXES" size={262} delay={22} color={C.cream} /></div>
        </div>
      </div>
      <div style={{ position: 'absolute', top: 1230, left: 80, fontFamily: F, fontWeight: 600, fontSize: 44, color: C.cream, opacity: ramp(f, 60, 80), transform: `translateY(${(1 - ramp(f, 60, 80)) * 30}px)` }}>
        explained in <span style={{ color: C.green, fontWeight: 800 }}>numbers</span>, not jargon.
      </div>
    </AbsoluteFill>
  );
};

// ---------- 02 · 3D coin through "20%" ----------
const Grant = () => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const drop = spring({ frame: f - 6, fps, config: { damping: 11, stiffness: 70, mass: 1.2 } });
  const spinY = interpolate(f, [0, 60], [Math.PI * 5, 0], { extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }) + Math.sin(f / 22) * 0.12;
  const coins = [{ rx: Math.PI / 2 + Math.sin(f / 30) * 0.12, ry: 0, rz: spinY, x: 0.35, y: 3.4 - drop * 3.2 + Math.sin(f / 25) * 0.05, z: 0.6, s: 1.25 }];
  const pct = useSpring(0, { damping: 13, stiffness: 120, mass: 0.8 });
  return (
    <AbsoluteFill style={{ background: `radial-gradient(circle at 50% 40%, #145c3d, ${C.deep} 70%)` }}>
      <div style={{ position: 'absolute', top: 470, width: '100%', textAlign: 'center', fontFamily: F, fontWeight: 900, fontSize: 600, lineHeight: 1, color: C.cream, letterSpacing: -30, transform: `scale(${0.7 + 0.3 * pct})`, opacity: clamp(pct * 2) }}>20%</div>
      <CoinScene coins={coins} />
      {/* the % sign sits in front of the coin = depth, like the koi weaving through letters */}
      <div style={{ position: 'absolute', top: 470, width: '100%', textAlign: 'center', fontFamily: F, fontWeight: 900, fontSize: 600, lineHeight: 1, letterSpacing: -30, transform: `scale(${0.7 + 0.3 * pct})`, opacity: clamp(pct * 2), clipPath: 'inset(0 0 0 64%)', color: C.cream, textShadow: '0 30px 60px rgba(0,0,0,.35)' }}>20%</div>
      <div style={{ position: 'absolute', top: 1180, left: 90, right: 90, fontFamily: F, color: C.cream }}>
        <div style={{ fontSize: 34, letterSpacing: 6, fontWeight: 700, color: C.mint, opacity: ramp(f, 30, 50) }}>CANADA EDUCATION SAVINGS GRANT</div>
        <div style={{ fontSize: 66, fontWeight: 800, lineHeight: 1.08, marginTop: 14, opacity: ramp(f, 38, 60), transform: `translateY(${(1 - ramp(f, 38, 60)) * 40}px)` }}>
          added to what you save in an <span style={{ color: C.gold }}>RESP</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---------- 03 · Odometer $0 → $7,200 ----------
const Digit = ({ value, place, size }: { value: number; place: number; size: number }) => {
  const pos = (value / Math.pow(10, place)) % 10;
  const shown = place === 0 ? pos : Math.floor(value / Math.pow(10, place)) % 10 + clamp((value % Math.pow(10, place)) / Math.pow(10, place) * 10 - 9);
  return (
    <div style={{ height: size, overflow: 'hidden', width: size * 0.66 }}>
      <div style={{ transform: `translateY(${-shown * size}px)` }}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((d, i) => <div key={i} style={{ height: size, lineHeight: `${size}px`, textAlign: 'center' }}>{d}</div>)}
      </div>
    </div>
  );
};
const Odometer = () => {
  const f = useCurrentFrame();
  const v = interpolate(f, [8, 105], [0, 7200], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.3, 0, 0.1, 1) });
  const done = ramp(f, 100, 118);
  const size = 270;
  const blur = clamp(Math.abs(interpolate(f, [8, 30, 90, 105], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }))) * 3;
  return (
    <AbsoluteFill style={{ background: C.cream, color: C.ink, fontFamily: F }}>
      <svg width={W} height={H} style={{ position: 'absolute', opacity: 0.12 }}>
        {Array.from({ length: 30 }).map((_, i) => <line key={i} x1={0} x2={W} y1={i * 70 + (f * 1.5) % 70} y2={i * 70 + (f * 1.5) % 70} stroke={C.ink} strokeWidth={1} />)}
      </svg>
      <div style={{ position: 'absolute', top: 470, left: 90, fontSize: 36, letterSpacing: 6, fontWeight: 700, color: C.deep }}>LIFETIME GRANT LIMIT · PER CHILD</div>
      <div style={{ position: 'absolute', top: 560, left: 60, display: 'flex', alignItems: 'center', fontWeight: 900, fontSize: size, letterSpacing: -10, fontVariantNumeric: 'tabular-nums', filter: `blur(${blur}px)`, color: done > 0.5 ? C.deep : C.ink }}>
        <span style={{ width: size * 0.6 }}>$</span>
        <Digit value={v} place={3} size={size} /><span style={{ width: size * 0.25 }}>,</span>
        <Digit value={v} place={2} size={size} /><Digit value={v} place={1} size={size} /><Digit value={v} place={0} size={size} />
      </div>
      <div style={{ position: 'absolute', top: 880, left: 90, height: 14, width: 900 * done, background: C.green, borderRadius: 7 }} />
      <div style={{ position: 'absolute', top: 960, left: 90, right: 90, fontSize: 60, fontWeight: 800, lineHeight: 1.1, opacity: ramp(f, 60, 85) }}>
        20% on the first <span style={{ color: C.green }}>$2,500</span><br />you put in each year.
      </div>
      <div style={{ position: 'absolute', top: 1180, left: 90, fontSize: 34, fontWeight: 600, color: '#555', opacity: ramp(f, 80, 100) }}>Up to $500 of grant a year.</div>
    </AbsoluteFill>
  );
};

// ---------- 04 · Receipt printing ----------
const LINES = ['RRSP AT 71', '', '> RRIF', '> ANNUITY', '> CASH OUT', '', 'DUE: DEC 31'];
const Receipt = () => {
  const f = useCurrentFrame();
  const feed = ramp(f, 0, 110, Easing.linear);
  const chars = Math.floor(interpolate(f, [10, 110], [0, LINES.join('').length], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  let left = chars;
  const tear = ramp(f, 122, 150, Easing.in(Easing.cubic));
  return (
    <AbsoluteFill style={{ background: C.red, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 360, left: 90, fontFamily: F, fontWeight: 900, fontSize: 150, color: C.cream, lineHeight: 0.9, opacity: 0.18 }}>TURNING<br />71?</div>
      <div style={{
        position: 'absolute', left: 180, width: 720, top: -900 + feed * 1300 + tear * 400, transform: `rotate(${-2 + tear * 14}deg)`,
        background: '#fbf8ef', boxShadow: '0 40px 80px rgba(0,0,0,.35)', padding: '60px 56px 90px', boxSizing: 'border-box', height: 1080,
        clipPath: 'polygon(0 0,100% 0,100% 96%,95% 100%,90% 96%,85% 100%,80% 96%,75% 100%,70% 96%,65% 100%,60% 96%,55% 100%,50% 96%,45% 100%,40% 96%,35% 100%,30% 96%,25% 100%,20% 96%,15% 100%,10% 96%,5% 100%,0 96%)',
        fontFamily: 'Tape', color: '#222', fontSize: 62, lineHeight: '105px',
      }}>
        <div style={{ height: 200 }} />
        {LINES.map((l, i) => {
          const n = Math.max(0, Math.min(l.length, left)); left -= l.length;
          const strong = i === 0 || i === 6;
          return <div key={i} style={{ height: 105, fontWeight: strong ? 700 : 400, color: i === 6 ? C.red : '#222' }}>{l.slice(0, n)}{n < l.length && n > 0 ? '▌' : ''}</div>;
        })}
      </div>
      <div style={{ position: 'absolute', bottom: 240, left: 90, right: 90, fontFamily: F, fontWeight: 800, fontSize: 58, color: C.cream, opacity: ramp(f, 70, 95) }}>Your RRSP has 3 exits.</div>
    </AbsoluteFill>
  );
};

// ---------- 05 · Calendar flip to DEC 31 ----------
const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const Page = ({ m, d, flipP }: { m: string; d: string; flipP: number }) => (
  <div style={{ position: 'absolute', inset: 0, transformOrigin: '50% 0', transform: `rotateX(${flipP * 110}deg)`, backfaceVisibility: 'hidden', background: '#fff', borderRadius: 30, overflow: 'hidden', boxShadow: '0 30px 70px rgba(0,0,0,.25)' }}>
    <div style={{ height: 190, background: C.red, color: '#fff', fontFamily: F, fontWeight: 900, fontSize: 120, display: 'grid', placeItems: 'center', letterSpacing: 8 }}>{m}</div>
    <div style={{ fontFamily: F, fontWeight: 900, fontSize: 380, textAlign: 'center', lineHeight: '480px', color: C.ink, letterSpacing: -10 }}>{d}</div>
  </div>
);
const Calendar = () => {
  const f = useCurrentFrame();
  const idx = interpolate(f, [4, 70], [0, 11], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic) });
  const cur = Math.floor(idx), frac = idx - cur;
  const ring = ramp(f, 78, 108);
  return (
    <AbsoluteFill style={{ background: C.cream, alignItems: 'center' }}>
      <div style={{ position: 'absolute', top: 400, width: 760, height: 680, perspective: 1600 }}>
        <Page m="DEC" d="31" flipP={0} />
        {cur < 11 && <Page m={MONTHS[cur + 1]} d={cur + 1 === 11 ? '31' : '1'} flipP={0} />}
        {cur < 11 && <Page m={MONTHS[cur]} d="1" flipP={frac} />}
        <svg width={760} height={680} style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
          <ellipse cx={380} cy={430} rx={300} ry={190} fill="none" stroke={C.red} strokeWidth={14} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - ring} transform="rotate(-6 380 430)" />
        </svg>
      </div>
      <div style={{ position: 'absolute', top: 1180, left: 90, right: 90, fontFamily: F, color: C.ink }}>
        <div style={{ fontSize: 34, letterSpacing: 6, fontWeight: 700, color: C.red, opacity: ramp(f, 70, 90) }}>THE DEADLINE</div>
        <div style={{ fontSize: 70, fontWeight: 800, lineHeight: 1.08, marginTop: 12, opacity: ramp(f, 78, 100), transform: `translateY(${(1 - ramp(f, 78, 100)) * 40}px)` }}>Dec 31 of the year you turn 71.</div>
      </div>
    </AbsoluteFill>
  );
};

// ---------- 06 · Canada Learning Bond staircase ----------
const Bond = () => {
  const f = useCurrentFrame();
  const n = 16, bw = 50, gap = 6, base = 1130, top = 560, scale = (base - top) / 2000;
  const total = Math.round(interpolate(f, [6, 96], [0, 2000], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) / 100) * 100;
  return (
    <AbsoluteFill style={{ background: C.deep, fontFamily: F, color: C.cream }}>
      <div style={{ position: 'absolute', top: 380, left: 90, fontSize: 34, letterSpacing: 6, fontWeight: 700, color: C.mint }}>CANADA LEARNING BOND</div>
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        <line x1={90} x2={990} y1={top} y2={top} stroke={C.gold} strokeWidth={4} strokeDasharray="14 12" opacity={ramp(f, 0, 20)} />
        {Array.from({ length: n }).map((_, i) => {
          const cum = 500 + 100 * i;
          const p = ramp(f, 6 + i * 5.5, 22 + i * 5.5, Easing.out(Easing.back(1.6)));
          const h = cum * scale * p;
          return <rect key={i} x={90 + i * (bw + gap)} y={base - h} width={bw} height={h} rx={8} fill={i === 0 ? C.gold : i === n - 1 ? C.green : '#e9f5ee'} />;
        })}
      </svg>
      <div style={{ position: 'absolute', top: 470, right: 90, fontSize: 36, fontWeight: 800, color: C.gold, opacity: ramp(f, 10, 30) }}>MAX $2,000</div>
      <div style={{ position: 'absolute', top: 1170, left: 90, fontWeight: 900, fontSize: 200, letterSpacing: -6, fontVariantNumeric: 'tabular-nums' }}>${total.toLocaleString('en-US')}</div>
      <div style={{ position: 'absolute', top: 1410, left: 90, right: 90, fontSize: 50, fontWeight: 700, lineHeight: 1.15, opacity: ramp(f, 40, 65) }}>
        <span style={{ color: C.gold }}>$500</span> first year + <span style={{ color: C.green }}>$100</span> a year. No contribution needed.
      </div>
    </AbsoluteFill>
  );
};

// ---------- 07 · Logo resolve + cursor click ----------
const Outro = () => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const flipC = interpolate(f, [0, 50], [0, Math.PI], { extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic) });
  const coins = [{ rx: Math.PI / 2, ry: 0, rz: 0, x: 0, y: 1.25, z: 0, s: 0.85 }];
  coins[0].rx = Math.PI / 2 + flipC; // flips from leaf face to $ face
  const cx = interpolate(f, [30, 70], [980, 600], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease });
  const cy = interpolate(f, [30, 70], [1800, 1395], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease });
  const press = spring({ frame: f - 74, fps, config: { damping: 10, stiffness: 300 } });
  const pressed = f > 74 ? 1 - 0.06 * Math.sin(Math.min(1, press) * Math.PI) : 1;
  return (
    <AbsoluteFill style={{ background: C.ink }}>
      <CoinScene coins={coins} />
      <div style={{ position: 'absolute', top: 1010, width: '100%', textAlign: 'center' }}>
        <div style={{ display: 'inline-block' }}><Kinetic text="TAX SECRETS" size={124} delay={14} stagger={2} /></div>
        <div style={{ fontFamily: F, fontWeight: 600, fontSize: 40, letterSpacing: 22, color: C.green, marginTop: 18, opacity: ramp(f, 30, 50) }}>CANADA</div>
      </div>
      <div style={{ position: 'absolute', top: 1340, left: 340, width: 400, height: 110, borderRadius: 55, background: f > 76 ? C.green : C.cream, color: f > 76 ? '#fff' : C.ink, display: 'grid', placeItems: 'center', fontFamily: F, fontWeight: 800, fontSize: 40, letterSpacing: 2, transform: `scale(${pressed * ramp(f, 40, 60)})` }}>
        {f > 76 ? 'SUBSCRIBED ✓' : 'SUBSCRIBE'}
      </div>
      <svg width={52} height={70} viewBox="0 0 26 35" style={{ position: 'absolute', left: cx, top: cy, opacity: ramp(f, 30, 40), transform: `scale(${f > 74 && f < 84 ? 0.88 : 1})` }}>
        <path d="M1 1 L1 27 L8 21 L13 33 L18 31 L13 19 L23 19 Z" fill="#fff" stroke="#000" strokeWidth={1.6} strokeLinejoin="round" />
      </svg>
    </AbsoluteFill>
  );
};

// ---------- sequence ----------
const T = 18; // transition frames
export const SHOWREEL_FRAMES = 135 + 165 + 165 + 165 + 135 + 135 + 108 - 6 * T;
export const Showreel = () => (
  <AbsoluteFill style={{ background: C.ink }}>
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={135}><Hook /></TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={iris({ width: W, height: H })} timing={linearTiming({ durationInFrames: T, easing: ease })} />
      <TransitionSeries.Sequence durationInFrames={165}><Grant /></TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({ direction: 'from-bottom' })} timing={springTiming({ durationInFrames: T, config: { damping: 200 } })} />
      <TransitionSeries.Sequence durationInFrames={165}><Odometer /></TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={wipe({ direction: 'from-left' })} timing={linearTiming({ durationInFrames: T, easing: ease })} />
      <TransitionSeries.Sequence durationInFrames={165}><Receipt /></TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={flip({ direction: 'from-right' })} timing={linearTiming({ durationInFrames: T, easing: ease })} />
      <TransitionSeries.Sequence durationInFrames={135}><Calendar /></TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({ direction: 'from-right' })} timing={springTiming({ durationInFrames: T, config: { damping: 200 } })} />
      <TransitionSeries.Sequence durationInFrames={135}><Bond /></TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={iris({ width: W, height: H })} timing={linearTiming({ durationInFrames: T, easing: ease })} />
      <TransitionSeries.Sequence durationInFrames={108}><Outro /></TransitionSeries.Sequence>
    </TransitionSeries>
    <Chrome />
    <Audio src={staticFile('music.wav')} />
    <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 60%, rgba(0,0,0,.35) 100%)', pointerEvents: 'none' }} />
  </AbsoluteFill>
);
