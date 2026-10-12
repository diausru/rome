// H4 "Manitoba's tax lines are frozen" on the motion engine v1 (2026-10-12). Different build from D1 by design
// (CLAUDE.md "Variety"): hook = a three-row ticker (prices ▲, pay ▲, brackets flat + ice stamp) instead of a kinetic
// question; main visual = a rate ladder that frosts over; an income slider across the frozen $100K line; a full-frame
// kinetic statement with no panel; a melting basic-amount bar; two receipt cards; a centred end card.
// Numbers come from h4/data.json; derived values are computed here, never typed in.
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { PhotoPlate, SceneCuts, type Focus } from './Plate';
import { Flag } from './RaiseShort';
import { Typed, beatsFrom, type Cap } from './Kit';
import TL from './h4-timeline.json';
import WORDS from './h4-words.json';
import CUE from './h43-cues.json';
import DATA from '../../h4/data.json';
import REEL from '../../h4/reel.json';
import { T, goldFill, textShadow } from './motion/brand';
import { Captions, Count, Depth, Glass, Kinetic, NavyGrade, Stamp, Vapor, clamp, ease, money, outBack, outExpo } from './motion/Reel';

export const H43FPS = 24;
const B = beatsFrom(TL, H43FPS);
export const H43DUR = Math.ceil((TL.total + REEL.hold_after_vo) * H43FPS);
const Q = Object.fromEntries(Object.entries(CUE).map(([k, v]) => [k, Math.round((v as number) * H43FPS)])) as Record<string, number>;

const X = DATA.example;
const LOW = Math.min(X.to_income, X.t2) - X.from_income, HIGH = X.to_income - X.t2;
const MB_ON_RAISE = Math.round(LOW * X.r2 + HIGH * X.r3);
const pct = (r: number) => `${+(r * 100).toFixed(2)}%`;
const ICE = '#bfe6ff', ICE_DEEP = '#7cc4f0';

const CUTS = [B.example.s, B.high.s];
const L = Object.fromEntries(Object.entries(REEL.layout).map(([k, v]) => [k, { y: v.box[1], h: v.box[3], w: v.box[2] }])) as Record<string, { y: number; h: number; w: number }>;
const K1: Focus[] = [
  { f: 0, u: 0.56, v: 0.44, k: 1.2 },                  // walking toward camera, head above the ticker
  { f: B.rates.s, u: 0.5, v: 0.47, k: 1.12 },
  { f: B.freeze.s, u: 0.6, v: 0.44, k: 1.2 },          // push in as the lines freeze
];
const K2: Focus[] = [
  { f: 0, u: 0.48, v: 0.58, k: 1.12 },                 // the couple at the laptop
  { f: B.creep.s, u: 0.45, v: 0.55, k: 1.22 },
];
const K3: Focus[] = [
  { f: 0, u: 0.58, v: 0.54, k: 1.12 },                 // the bridge at dusk
  { f: B.credits.s, u: 0.6, v: 0.52, k: 1.2 },
  { f: B.cta.s, u: 0.55, v: 0.5, k: 1.04 },
];

const CAPS: Cap[] = [
  { at: B.rates.s, l1: 'THREE RATES', l2: 'on taxable income, 2026', until: B.freeze.s - 2 },
  { at: B.freeze.s, l1: 'FROZEN', l2: 'no inflation increase', until: B.example.s - 2 },
  { at: B.example.s, l1: 'A RAISE', l2: 'across the $100K line', until: B.creep.s - 2 },
  { at: B.high.s, l1: 'HIGH INCOMES', l2: 'net income $200K–$400K', until: B.credits.s - 2 },
  { at: B.credits.s, l1: 'THE OTHER SIDE', l2: 'credits for 2026', until: B.cta.s - 2 },
];

// ---------- small pieces ----------
const Frost = ({ f, at, r = 22 }: { f: number; at: number; r?: number }) => {
  const p = outExpo((f - at) / 18);
  if (p <= 0) return null;
  return (
    <div style={{ position: 'absolute', inset: 0, borderRadius: r, pointerEvents: 'none', opacity: p,
      background: `linear-gradient(160deg, rgba(191,230,255,.30), rgba(124,196,240,.10) 45%, rgba(191,230,255,.24))`, boxShadow: `inset 0 0 ${26 * p}px rgba(191,230,255,.55)` }}>
      {Array.from({ length: 14 }, (_, i) => {
        const a = (i * 137.5) % 360, d = 0.35 + ((i * 53) % 60) / 100;
        return <div key={i} style={{ position: 'absolute', left: `${50 + 46 * d * Math.cos(a)}%`, top: `${50 + 40 * d * Math.sin(a)}%`, width: 3, height: 3, borderRadius: 2, background: '#fff', opacity: 0.7 * p * (0.5 + 0.5 * Math.sin(f * 0.2 + i)) }} />;
      })}
    </div>
  );
};

const Lock = ({ f, at, x, y, s = 1 }: { f: number; at: number; x: number; y: number; s?: number }) => {
  const p = outBack((f - at) / 10);
  if (f < at) return null;
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: 30 * s, height: 38 * s, transform: `scale(${p})`, transformOrigin: '50% 100%' }}>
      <div style={{ position: 'absolute', left: 6 * s, top: 0, width: 18 * s, height: 20 * s, border: `${4 * s}px solid ${ICE}`, borderBottom: 'none', borderRadius: `${10 * s}px ${10 * s}px 0 0` }} />
      <div style={{ position: 'absolute', left: 0, top: 16 * s, width: 30 * s, height: 22 * s, borderRadius: 5 * s, background: ICE, boxShadow: `0 0 14px ${ICE_DEEP}` }} />
    </div>
  );
};

const Spark = ({ f, at, rising, w = 300, h = 70 }: { f: number; at: number; rising: boolean; w?: number; h?: number }) => {
  const p = clamp((f - at) / 22);
  const pts = Array.from({ length: 9 }, (_, i) => {
    const x = (i / 8) * w, y = rising ? h - 8 - (i / 8) * (h - 18) - (i % 2 ? 6 : 0) : h / 2;
    return `${x},${y}`;
  });
  return (
    <svg width={w} height={h} style={{ position: 'absolute', right: 30, top: 15, overflow: 'visible' }}>
      <polyline points={pts.join(' ')} fill="none" stroke={rising ? T.gold : ICE} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={w * 1.6} strokeDashoffset={w * 1.6 * (1 - p)} />
      {rising && p > 0.95 && <polygon points={`${w - 14},${12} ${w + 6},${12} ${w - 4},${-6}`} fill={T.gold} />}
    </svg>
  );
};

// ---------- the hook: a three-row ticker; frame 0 already shows the topic ----------
const Hook = ({ f }: { f: number }) => {
  const out = B.rates.s;
  const o = ease(f, out, out + 12);
  const rows: [string, number, boolean][] = [[REEL.hook.rows[0], Q.p1, true], [REEL.hook.rows[1], Q.p2, true], [REEL.hook.rows[2], Q.p3, false]];
  return (
    <div style={{ opacity: 1 - o, transform: `translateY(${-o * 30}px)` }}>
      <Kinetic f={f} at={0} now text={REEL.hook.title} x={80} y={560} size={76} nowrap />
      {rows.map(([label, at, up], i) => {
        const p = outExpo((f - at + 3) / 14);
        if (p <= 0) return null;
        return (
          <div key={i} style={{ position: 'absolute', left: 80, top: 690 + i * 118, width: 880, height: 100, borderRadius: 20, opacity: p, transform: `translateX(${(1 - p) * (i % 2 ? 120 : -120)}px)`,
            background: T.glass, backdropFilter: 'blur(14px)', border: `1px solid ${up ? T.glassEdge : 'rgba(191,230,255,.4)'}` }}>
            <div style={{ position: 'absolute', left: 30, top: 28, fontFamily: T.font, fontSize: 40, fontWeight: 900, letterSpacing: 1, color: up ? T.white : ICE }}>{label}</div>
            <Spark f={f} at={at} rising={up} />
            {!up && <Frost f={f} at={Q.ice} r={20} />}
          </div>
        );
      })}
      {f >= Q.ice && <div style={{ position: 'absolute', left: 0, top: 0 }}><Stamp f={f} at={Q.ice} text={REEL.hook.stamp} x={330} y={1074} size={38} color={ICE} rotate={-5} /></div>}
      {f >= out && f < out + 30 && <Vapor f={f} a={out} x={80} y={560} w={880} h={560} n={46} seed={3} color="rgba(220,240,255,.9)" />}
    </div>
  );
};

// ---------- rates + freeze: the ladder (one panel across both beats, frosts over on "frozen") ----------
const Ladder = ({ f }: { f: number }) => {
  const steps: [number, number, string][] = [[X.r1, Q.s1, `$0–${money(X.t1)}`], [X.r2, Q.s2, `TO ${money(X.t2)}`], [X.r3, Q.s3, `OVER ${money(X.t2)}`]];
  const base = 470, sx = [50, 320, 590], sw = 250, k = 16.5;
  return (
    <Glass f={f} a={B.rates.s + 2} b={B.example.s - 2} y={L.ladder.y} h={L.ladder.h} w={L.ladder.w} label={`Manitoba ${DATA.tax_year} · on taxable income`} enter="focus" exit="vapor" lit={ease(f, Q.s3, Q.s3 + 8) * 0.5}>
      {steps.map(([r, at, sub], i) => {
        const p = outExpo((f - at + 2) / 14), hgt = r * 100 * k * p;
        return (
          <div key={i}>
            <div style={{ position: 'absolute', left: sx[i], top: base - hgt, width: sw, height: hgt, borderRadius: '16px 16px 4px 4px',
              background: `linear-gradient(180deg, rgba(241,199,91,${0.32 + i * 0.1}), rgba(241,199,91,.06))`, borderTop: `3px solid ${T.gold}` }} />
            {p > 0.05 && <div style={{ position: 'absolute', left: sx[i] + 18, top: base - hgt - 78, opacity: p, fontFamily: T.font, fontSize: 56, fontWeight: 900, ...goldFill }}>{pct(r)}</div>}
            <div style={{ position: 'absolute', left: sx[i] + 18, top: base + 14, opacity: p, fontFamily: T.font, fontSize: 20, fontWeight: 800, letterSpacing: 2, color: T.soft }}>{sub}</div>
          </div>
        );
      })}
      {[X.t1, X.t2].map((t, i) => {
        const at = i ? Q.s3 : Q.s2, p = ease(f, at, at + 8);
        return (
          <div key={t} style={{ position: 'absolute', left: sx[i + 1] - 10, top: 192, height: base - 192, width: 4, opacity: p, background: f >= Q.lines ? ICE : 'rgba(255,255,255,.35)', boxShadow: f >= Q.lines ? `0 0 16px ${ICE_DEEP}` : undefined }}>
            <Lock f={f} at={Q.lines + i * 4} x={-13} y={-48} />
          </div>
        );
      })}
      {f >= Q.bpa - 4 && (
        <div style={{ position: 'absolute', left: 50, top: 92, padding: '10px 18px', borderRadius: 14, border: `1.5px solid ${f >= Q.bpa + 30 ? ICE : T.glassEdge}`, background: 'rgba(12,18,30,.6)', opacity: outExpo((f - Q.bpa + 4) / 10),
          fontFamily: T.font, fontSize: 22, fontWeight: 800, letterSpacing: 2, color: T.white, overflow: 'hidden' }}>
          BASIC AMOUNT <span style={{ color: T.gold }}>{money(X.bpa)}</span><Frost f={f} at={Q.bpa + 30} r={14} />
        </div>
      )}
      {f >= Q.frozen && <Stamp f={f} at={Q.frozen} text="FROZEN" x={300} y={330} size={46} color={ICE} rotate={-6} />}
    </Glass>
  );
};

// ---------- example: the raise slides across the frozen $100,000 line ----------
const Slider = ({ f }: { f: number }) => {
  const lo = 94000, hi = 106000, x0 = 50, W0 = 780, xs = (v: number) => x0 + ((v - lo) / (hi - lo)) * W0;
  const mv = outExpo((f - Q.to) / 20), cur = X.from_income + (X.to_income - X.from_income) * mv;
  const a1 = ease(f, Q.half1, Q.half1 + 10), a2 = ease(f, Q.half2, Q.half2 + 10);
  return (
    <Glass f={f} a={B.example.s + 2} b={B.creep.s - 2} y={L.slider.y} h={L.slider.h} w={L.slider.w} label="Example · a raise" enter="slideR" exit="collapse" collapseTo="50% 100%" lit={ease(f, Q.total, Q.total + 8)}>
      <div style={{ position: 'absolute', left: x0, top: 150, width: W0, height: 14, borderRadius: 7, background: 'rgba(255,255,255,.08)' }} />
      <div style={{ position: 'absolute', left: xs(X.from_income), top: 146, width: (xs(Math.min(X.to_income, X.t2)) - xs(X.from_income)) * a1, height: 22, borderRadius: 6, background: T.gold }} />
      <div style={{ position: 'absolute', left: xs(X.t2), top: 146, width: (xs(X.to_income) - xs(X.t2)) * a2, height: 22, borderRadius: 6, background: T.redSoft }} />
      <div style={{ position: 'absolute', left: xs(X.t2) - 2, top: 104, width: 4, height: 100, background: ICE, boxShadow: `0 0 14px ${ICE_DEEP}` }} />
      <Lock f={f} at={B.example.s + 8} x={xs(X.t2) - 15} y={58} />
      <div style={{ position: 'absolute', left: xs(X.t2) - 70, top: 212, width: 140, textAlign: 'center', fontFamily: T.font, fontSize: 20, fontWeight: 800, color: ICE }}>{money(X.t2)}</div>
      {f >= Q.from - 4 && <div style={{ position: 'absolute', left: xs(cur) - 9, top: 136, width: 18, height: 42, borderRadius: 9, background: T.white, boxShadow: '0 0 18px rgba(255,255,255,.7)', opacity: outExpo((f - Q.from + 4) / 8) }} />}
      {f >= Q.from - 4 && <div style={{ position: 'absolute', left: xs(cur) - 90, top: 92, width: 180, textAlign: 'center', fontFamily: T.font, fontSize: 26, fontWeight: 900, color: T.white, opacity: outExpo((f - Q.from + 4) / 8) }}>{money(Math.round(cur / 100) * 100)}</div>}
      <div style={{ position: 'absolute', left: x0, top: 262, opacity: a1, fontFamily: T.font, fontSize: 24, fontWeight: 800, color: T.gold }}>{money(LOW)} × {pct(X.r2)}</div>
      <div style={{ position: 'absolute', left: x0 + 420, top: 262, opacity: a2, fontFamily: T.font, fontSize: 24, fontWeight: 800, color: T.redSoft }}>{money(HIGH)} × {pct(X.r3)}</div>
      {f >= Q.total - 4 && (
        <div style={{ position: 'absolute', left: x0, top: 314, display: 'flex', alignItems: 'baseline', gap: 20, opacity: outExpo((f - Q.total + 4) / 10) }}>
          <div style={{ fontFamily: T.font, fontSize: 24, fontWeight: 800, letterSpacing: 3, color: T.soft }}>MANITOBA TAKES</div>
          <Count f={f} a={Q.total} value={MB_ON_RAISE} size={84} />
        </div>
      )}
    </Glass>
  );
};

// ---------- creep: a full-frame kinetic statement, no panel ----------
const Creep = ({ f }: { f: number }) => {
  const a = B.creep.s, b = B.high.s - 2;
  if (f < a || f > b + 16) return null;
  const o = ease(f, b, b + 14);
  const up = outBack((f - Q.push) / 12);
  return (
    <div style={{ opacity: 1 - o, filter: o > 0 ? `blur(${o * 8}px)` : undefined }}>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 760, height: 480, background: 'linear-gradient(180deg, rgba(8,12,20,0), rgba(8,12,20,.72) 30%, rgba(8,12,20,.72) 70%, rgba(8,12,20,0))' }} />
      <Kinetic f={f} at={a + 4} text="A RAISE THAT ONLY" x={80} y={830} size={64} nowrap />
      <Kinetic f={f} at={a + 14} text="MATCHES PRICES" x={80} y={910} size={64} from="left" nowrap />
      {f >= Q.push && (
        <div style={{ position: 'absolute', left: 80, top: 1010, display: 'flex', alignItems: 'center', gap: 22, transform: `scale(${0.6 + 0.4 * clamp(up, 0, 1.2)})`, transformOrigin: '0 50%' }}>
          <div style={{ width: 0, height: 0, borderLeft: '34px solid transparent', borderRight: '34px solid transparent', borderBottom: `56px solid ${T.gold}`, transform: `translateY(${-6 * Math.sin((f - Q.push) / 5)}px)` }} />
          <span style={{ fontFamily: T.font, fontSize: 84, fontWeight: 900, ...goldFill }}>HIGHER RATE</span>
        </div>
      )}
    </div>
  );
};

// ---------- high incomes: the basic amount melts between $200K and $400K ----------
const Gauge = ({ f }: { f: number }) => {
  const melt = clamp((f - Q.ph1) / Math.max(1, Q.ph2 - Q.ph1)), W0 = 780;
  return (
    <Glass f={f} a={B.high.s + 2} b={B.credits.s - 2} y={L.gauge.y} h={L.gauge.h} w={L.gauge.w} label="Basic personal amount · net income" toneOf="red" enter="wipe" exit="fade">
      <div style={{ position: 'absolute', left: 50, top: 96, fontFamily: T.font, fontSize: 26, fontWeight: 900, color: T.white }}>BASIC AMOUNT <span style={{ color: T.gold }}>{money(X.bpa)}</span></div>
      <div style={{ position: 'absolute', left: 50, top: 160, width: W0, height: 64, borderRadius: 16, background: 'rgba(255,255,255,.06)', border: `1px solid ${T.glassEdge}` }} />
      <div style={{ position: 'absolute', left: 50, top: 160, width: W0 * (1 - melt), height: 64, borderRadius: 16, background: `linear-gradient(90deg, ${T.goldDeep}, ${T.gold})`, boxShadow: `0 0 ${20 * (1 - melt)}px rgba(241,199,91,.4)` }} />
      {melt > 0 && melt < 1 && Array.from({ length: 6 }, (_, i) => (
        <div key={i} style={{ position: 'absolute', left: 50 + W0 * (1 - melt) - 6, top: 224 + ((f * 3 + i * 17) % 50), width: 6, height: 10, borderRadius: 3, background: T.gold, opacity: 0.6 - ((f * 3 + i * 17) % 50) / 90 }} />
      ))}
      <div style={{ position: 'absolute', left: 50, top: 244, fontFamily: T.font, fontSize: 22, fontWeight: 800, color: T.soft }}>{money(X.phase_start)}</div>
      <div style={{ position: 'absolute', left: 50 + W0 - 140, width: 140, textAlign: 'right', top: 244, fontFamily: T.font, fontSize: 22, fontWeight: 800, color: T.soft }}>{money(X.phase_end)}</div>
      <div style={{ position: 'absolute', left: 50, top: 300, fontFamily: T.font, fontSize: 22, fontWeight: 700, color: T.mute }}>phased out over this range of net income (from 2025)</div>
      <Stamp f={f} at={Q.gone} text="GONE" x={620} y={86} size={40} />
    </Glass>
  );
};

// ---------- credits: two receipts slide in from opposite sides ----------
const Receipt = ({ f, at, from, x, title, value, note }: { f: number; at: number; from: 1 | -1; x: number; title: string; value: number; note: string }) => {
  const p = outExpo((f - at + 6) / 16), o = ease(f, B.cta.s - 16, B.cta.s - 2);
  if (p <= 0 || o >= 1) return null;
  return (
    <div style={{ position: 'absolute', left: x + from * (1 - p) * 520, top: L.credits.y, width: 420, height: L.credits.h, opacity: p * (1 - o), transform: `rotate(${from * (1 - p) * 6 + from * 1.2}deg) translateY(${-o * 30}px)`,
      background: 'linear-gradient(180deg, rgba(246,247,251,.94), rgba(226,232,242,.92))', borderRadius: 8, boxShadow: '0 30px 60px rgba(0,0,0,.45)', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 12, background: `radial-gradient(circle at 10px 0, transparent 9px, ${T.gold} 10px)`, backgroundSize: '20px 12px' }} />
      <div style={{ position: 'absolute', left: 30, top: 44, fontFamily: T.font, fontSize: 20, fontWeight: 800, letterSpacing: 4, color: '#56627a' }}>MANITOBA · {DATA.tax_year}</div>
      <div style={{ position: 'absolute', left: 30, top: 84, fontFamily: T.font, fontSize: 40, fontWeight: 900, color: T.navy }}>{title}</div>
      <div style={{ position: 'absolute', left: 30, right: 30, top: 150, borderTop: '2px dashed #b8c2d4' }} />
      <div style={{ position: 'absolute', left: 30, top: 176, fontFamily: T.font, fontSize: 22, fontWeight: 800, letterSpacing: 3, color: '#56627a' }}>UP TO</div>
      <div style={{ position: 'absolute', left: 26, top: 206 }}>
        {f >= at && <span style={{ fontFamily: T.font, fontSize: 92, fontWeight: 900, color: '#a87412', fontVariantNumeric: 'tabular-nums' }}>{money(f >= at + 16 ? value : Math.round(value * outExpo((f - at) / 16) / 5) * 5)}</span>}
      </div>
      <div style={{ position: 'absolute', left: 30, right: 30, top: 340, fontFamily: T.font, fontSize: 19, fontWeight: 700, lineHeight: 1.35, color: '#56627a' }}>{note}</div>
    </div>
  );
};

// ---------- end: centred card ----------
const Final = ({ f }: { f: number }) => {
  const a = B.cta.s, e = ease(f, a + 2, a + 18);
  if (f < a + 2) return null;
  return (
    <div style={{ position: 'absolute', left: 80, width: L.end_block.w, top: L.end_block.y, opacity: e, transform: `translateY(${(1 - e) * 40}px)`, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 18 }}>
      <Flag f={f} w={140} amp={0.06} />
      <div style={{ fontFamily: T.font, fontSize: 58, fontWeight: 900, color: T.white, textShadow }}>MANITOBA {DATA.tax_year}</div>
      <div style={{ display: 'flex', gap: 14 }}>
        {[X.r1, X.r2, X.r3].map((r, i) => {
          const p = outBack((f - a - 8 - i * 4) / 10);
          return <div key={i} style={{ position: 'relative', overflow: 'hidden', padding: '12px 22px', borderRadius: 14, border: `1.5px solid ${ICE}`, background: 'rgba(12,18,30,.6)', transform: `scale(${clamp(p, 0, 1.2)})`,
            fontFamily: T.font, fontSize: 34, fontWeight: 900, color: T.white }}>{pct(r)}<Frost f={f} at={a + 20} r={14} /></div>;
        })}
      </div>
      <div style={{ fontFamily: T.font, fontSize: 26, fontWeight: 800, letterSpacing: 3, color: ICE }}>LINES FROZEN · NO INFLATION INCREASE</div>
      <div style={{ marginTop: 6, display: 'inline-flex', padding: '18px 30px', borderRadius: 999, background: `linear-gradient(160deg,${T.goldHi},${T.gold} 50%,${T.goldDeep})`, color: '#1d1503', fontFamily: T.font, fontSize: 30, fontWeight: 900,
        opacity: ease(f, Q.next, Q.next + 10), transform: `scale(${1 + 0.03 * Math.sin((f - a) / 6)})` }}>NEXT: CREDITS PEOPLE NEVER CLAIM →</div>
      <div style={{ fontFamily: T.font, fontSize: 26, fontWeight: 700, color: T.white, textShadow, opacity: ease(f, Q.follow, Q.follow + 10) }}>Follow so you don't miss it</div>
      <div style={{ fontFamily: T.font, fontSize: 18, fontWeight: 600, color: T.mute, lineHeight: 1.45, opacity: ease(f, a + 20, a + 34) }}>
        Source: Manitoba Budget 2025 (Tax Measures) · gov.mb.ca Personal Tax Credits · CRA T4127 (2026) · Manitoba tax only, tax year {DATA.tax_year} · example only · general info, not advice
      </div>
    </div>
  );
};

const Header = ({ f }: { f: number }) => (
  <div style={{ position: 'absolute', left: 80, top: 92, right: 80, display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: T.white, fontSize: 22, fontWeight: 800, letterSpacing: 4, fontFamily: T.font }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}><Flag f={f} w={72} />TAX SECRETS CANADA</div>
    <div style={{ color: T.gold, letterSpacing: 5 }}>MANITOBA · {DATA.tax_year}</div>
  </div>
);

export const H4V3 = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: T.navy, fontFamily: T.font, overflow: 'hidden' }}>
      <SceneCuts f={f} cuts={CUTS} scene={(i) => i === 0 ? (
        <PhotoPlate f={f} src="plates/h4-s1-4k.jpg" iw={2294} ih={4096} keys={K1} glide={40} blur={0.8 + 4 * (1 - ease(f, 0, 20))} snow={[{ u0: 0.0, v0: 0.05, u1: 1.0, v1: 0.6 }]} steam={{ u: 0.56, v: 0.31, w: 0.04 }} />
      ) : i === 1 ? (
        <PhotoPlate f={f} src="plates/h4-s2-4k.jpg" iw={2294} ih={4096} keys={K2} glide={40} blur={0.8} snow={[{ u0: 0.44, v0: 0.0, u1: 0.98, v1: 0.36 }]} steam={{ u: 0.13, v: 0.6, w: 0.05 }} />
      ) : (
        <PhotoPlate f={f} src="plates/h4-s3-4k.jpg" iw={2294} ih={4096} keys={K3} glide={40} blur={0.8} snow={[{ u0: 0.0, v0: 0.0, u1: 1.0, v1: 0.55 }]} />
      )} />
      <Depth f={f} seed={f < B.example.s ? 4 : f < B.high.s ? 5 : 6} warm={0.6} />
      <NavyGrade low={f >= B.cta.s ? 1.15 : 1} />
      <Header f={f} />
      <Typed f={f} caps={CAPS} head={T.font} />
      {f < B.rates.s + 30 && <Hook f={f} />}
      <Ladder f={f} />
      <Slider f={f} />
      <Creep f={f} />
      <Gauge f={f} />
      <Receipt f={f} at={Q.rent} from={-1} x={80} title="RENTERS" value={X.renters} note="Renters Affordability Tax Credit (principal residence rented in Manitoba)" />
      <Receipt f={f} at={Q.home} from={1} x={540} title="HOMEOWNERS" value={X.homeowners} note="Homeowners Affordability Tax Credit (principal residence)" />
      <Final f={f} />
      <Captions f={f} fps={H43FPS} beats={WORDS.beats as never} from={B.rates.s} until={B.cta.s} y={1296} />
    </AbsoluteFill>
  );
};
