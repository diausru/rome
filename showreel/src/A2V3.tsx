// A2 "Why your refund got smaller" — investigation format (list-2 #1), motion engine v1 (2026-10-13).
// Variety vs A8 / A5 / A1 (CLAUDE.md "Variety"): hook = a split before/after (BEFORE: refund / NOW: you owe) under a kinetic
// "SAME $70,000 SALARY"; main visual = a balance scale (WITHHELD vs TAX) that tilts per year + a three-year pill strip;
// reveal = a paper receipt of the three years with the tax change vs the result swing; end = two side-by-side check tiles.
// Numbers come from a2/data.json; derived values are computed here exactly as its "derive" formulas.
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { PhotoPlate, SceneCuts, type Focus } from './Plate';
import { Flag } from './RaiseShort';
import { Typed, beatsFrom, type Cap } from './Kit';
import TL from './a2-timeline.json';
import WORDS from './a2-words.json';
import CUE from './a23-cues.json';
import DATA from '../../a2/data.json';
import REEL from '../../a2/reel.json';
import { T, goldFill, textShadow } from './motion/brand';
import { Captions, Depth, Glass, Kinetic, NavyGrade, Stamp, Tag, clamp, ease, money, outBack, outExpo } from './motion/Reel';

export const A23FPS = 24;
const B = beatsFrom(TL, A23FPS);
export const A23DUR = Math.ceil((TL.total + REEL.hold_after_vo) * A23FPS);
const Q = Object.fromEntries(Object.entries(CUE).map(([k, v]) => [k, Math.round((v as number) * A23FPS)])) as Record<string, number>;

const X = DATA.example;
const RATE = X.fed_rate + X.mb_rate;
const TAX = X.tax70_fed + X.tax70_mb;
const REF1 = X.rrsp * RATE;
const TAX1 = TAX - REF1;
const WH3 = 2 * (X.tax35_fed + X.tax35_mb);
const SHORT = TAX - WH3;
const SWING = REF1 + SHORT;
const RED = T.redSoft;
const PW = 2294, PH = 4096;

const CUTS = [B.y3.s, B.reveal.s];
const L = Object.fromEntries(Object.entries(REEL.layout).map(([k, v]) => [k, { x: v.box[0], y: v.box[1], w: v.box[2], h: v.box[3] }])) as Record<string, { x: number; y: number; w: number; h: number }>;
const K1: Focus[] = [{ f: 0, u: 0.5, v: 0.4, k: 1.16 }, { f: B.y1.s, u: 0.52, v: 0.32, k: 1.24 }, { f: B.y2.s, u: 0.48, v: 0.36, k: 1.14 }];
const K2: Focus[] = [{ f: 0, u: 0.45, v: 0.3, k: 1.22 }, { f: Q.bpa, u: 0.4, v: 0.45, k: 1.12 }];
const K3: Focus[] = [{ f: 0, u: 0.62, v: 0.3, k: 1.2 }, { f: B.action.s, u: 0.6, v: 0.42, k: 1.12 }, { f: B.cta.s, u: 0.6, v: 0.35, k: 1.06 }];

const CAPS: Cap[] = [
  { at: B.y1.s, l1: 'YEAR 1', l2: 'one job + RRSP', until: B.y2.s - 2 },
  { at: B.y2.s, l1: 'YEAR 2', l2: 'same job, no RRSP', until: B.y3.s - 2 },
  { at: B.y3.s, l1: 'YEAR 3', l2: 'two jobs', until: B.reveal.s - 2 },
  { at: B.reveal.s, l1: 'THE TWIST', l2: 'tax vs withholding', until: B.action.s - 2 },
];

// ---------- hook: split before / after ----------
const Hook = ({ f }: { f: number }) => {
  const out = B.y1.s, o = ease(f, out - 6, out + 8);
  const half = (x: number, over: string, word: string, val: string, c: string, at: number, from: number) => {
    const p = at <= 0 ? 1 : outExpo((f - at) / 12);
    return (
      <div style={{ position: 'absolute', left: x + (1 - p) * from, top: 640, width: 420, height: 360, borderRadius: 28, opacity: at <= 0 ? 1 : p,
        background: 'linear-gradient(160deg, rgba(14,20,32,.86), rgba(10,14,22,.7))', border: `2px solid ${c}`, boxShadow: `0 0 40px ${c === RED ? 'rgba(224,57,43,.28)' : 'rgba(127,224,168,.25)'}` }}>
        <div style={{ position: 'absolute', left: 30, top: 28, fontFamily: T.font, fontSize: 22, fontWeight: 800, letterSpacing: 5, color: T.soft }}>{over}</div>
        <div style={{ position: 'absolute', left: 30, top: 74, fontFamily: T.font, fontSize: 54, fontWeight: 900, color: c }}>{word}</div>
        <div style={{ position: 'absolute', left: 30, top: 170, fontFamily: T.font, fontSize: 76, fontWeight: 900, color: T.white, fontVariantNumeric: 'tabular-nums' }}>{val}</div>
        <div style={{ position: 'absolute', left: 30, top: 280, fontFamily: T.font, fontSize: 18, fontWeight: 700, color: T.mute }}>example</div>
      </div>
    );
  };
  const q = outBack((f - Q.why) / 10);
  return (
    <div style={{ opacity: 1 - o }}>
      <Kinetic f={f} at={0} now text={REEL.hook.title} x={80} y={500} size={74} nowrap />
      {half(80, 'BEFORE', 'REFUND', `≈ ${money(Math.round(REF1 / 1000) * 1000)}`, T.green, 0, -120)}
      {half(540, 'NOW', 'YOU OWE', `≈ ${money(Math.round(SHORT / 100) * 100)}`, RED, Q.last + 6, 120)}
      {f >= Q.why && <div style={{ position: 'absolute', left: 470, top: 1020, width: 140, height: 140, borderRadius: 70, display: 'grid', placeItems: 'center', background: `linear-gradient(160deg,${T.goldHi},${T.gold})`,
        transform: `scale(${clamp(q, 0, 1.15)})`, fontFamily: T.font, fontSize: 90, fontWeight: 900, color: '#1d1503', boxShadow: '0 20px 50px rgba(0,0,0,.5)' }}>?</div>}
      <Tag f={f} at={Q.sal + 2} text="Same job" x={100} y={1210} from="left" out={out - 6} seed={3} />
      <Tag f={f} at={Q.owe + 2} text="Same salary" x={600} y={1210} from="right" out={out - 6} seed={6} />
    </div>
  );
};

// ---------- three-year strip ----------
const Strip = ({ f }: { f: number }) => {
  const a = B.y1.s, b = B.reveal.s;
  if (f < a || f > b + 14) return null;
  const o = ease(f, b - 2, b + 12);
  const cells: [string, number, number, string][] = [['YEAR 1', Q.ref1, REF1, T.green], ['YEAR 2', Q.zero, 0, T.white], ['YEAR 3', Q.short, -SHORT, RED]];
  const active = f >= B.y3.s ? 2 : f >= B.y2.s ? 1 : 0;
  return (
    <div style={{ position: 'absolute', left: L.strip.x, top: L.strip.y, width: L.strip.w, display: 'flex', gap: 14, opacity: 1 - o }}>
      {cells.map(([t, at, v, c], i) => {
        const p = outExpo((f - a - 2 - i * 3) / 12), on = i === active;
        return (
          <div key={t} style={{ flex: 1, height: 88, borderRadius: 999, position: 'relative', opacity: p * (on ? 1 : 0.62), transform: `translateX(${(1 - p) * -60}px)`,
            background: on ? 'linear-gradient(90deg, rgba(241,199,91,.22), rgba(12,18,30,.78))' : T.glass, border: `1.5px solid ${on ? T.gold : T.glassEdge}` }}>
            <div style={{ position: 'absolute', left: 30, top: 12, fontFamily: T.font, fontSize: 16, fontWeight: 800, letterSpacing: 3, color: on ? T.gold : T.mute }}>{t}</div>
            <div style={{ position: 'absolute', left: 30, top: 34, fontFamily: T.font, fontSize: 34, fontWeight: 900, color: f >= at ? c : T.mute, fontVariantNumeric: 'tabular-nums' }}>
              {f >= at ? `${v > 0 ? '+' : v < 0 ? '−' : ''}${money(v)}` : '…'}</div>
          </div>
        );
      })}
    </div>
  );
};

// ---------- the balance scale: WITHHELD vs TAX ----------
const Scale = ({ f, at, wh, tax, show }: { f: number; at: number; wh: number; tax: number; show: number }) => {
  const W = 880, cx = W / 2, py = 120, arm = 300;
  const target = clamp((tax - wh) / 6000, -1, 1) * 11; // degrees; heavier side goes down
  const ang = target * outBack((f - at) / 22) * (f >= at ? 1 : 0);
  const rad = (ang * Math.PI) / 180;
  const lx = cx - Math.cos(rad) * arm, ly = py - Math.sin(rad) * arm;
  const rx = cx + Math.cos(rad) * arm, ry = py + Math.sin(rad) * arm;
  const pan = (x: number, y: number, label: string, v: number, c: string) => (
    <div style={{ position: 'absolute', left: x - 130, top: y, width: 260, textAlign: 'center' }}>
      <svg width={260} height={60} style={{ position: 'absolute', left: 0, top: 0 }}><line x1={130} y1={0} x2={40} y2={50} stroke={T.glassEdge} strokeWidth={2} /><line x1={130} y1={0} x2={220} y2={50} stroke={T.glassEdge} strokeWidth={2} /></svg>
      <div style={{ position: 'absolute', left: 20, top: 50, width: 220, height: 16, borderRadius: '0 0 110px 110px', background: c }} />
      <div style={{ position: 'absolute', left: 0, width: 260, top: 76, fontFamily: T.font, fontSize: 18, fontWeight: 800, letterSpacing: 3, color: T.soft }}>{label}</div>
      <div style={{ position: 'absolute', left: 0, width: 260, top: 100, fontFamily: T.font, fontSize: 40, fontWeight: 900, color: T.white, fontVariantNumeric: 'tabular-nums', opacity: show }}>{money(v)}</div>
    </div>
  );
  return (
    <>
      <div style={{ position: 'absolute', left: cx - 4, top: py, width: 8, height: 170, background: 'rgba(190,210,240,.35)', borderRadius: 4 }} />
      <div style={{ position: 'absolute', left: cx - 70, top: py + 166, width: 140, height: 10, borderRadius: 5, background: 'rgba(190,210,240,.35)' }} />
      <svg width={W} height={400} style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }}>
        <line x1={lx} y1={ly} x2={rx} y2={ry} stroke={T.gold} strokeWidth={8} strokeLinecap="round" />
        <circle cx={cx} cy={py} r={13} fill={T.gold} />
      </svg>
      {pan(lx, ly, 'WITHHELD', wh, 'rgba(127,224,168,.75)')}
      {pan(rx, ry, 'TAX', tax, 'rgba(255,122,104,.75)')}
    </>
  );
};
const Result = ({ f, at, v, label }: { f: number; at: number; v: number; label: string }) => {
  if (f < at) return null;
  const c = v > 1 ? T.green : v < -1 ? RED : T.white;
  return (
    <div style={{ position: 'absolute', left: 0, width: 880, top: 330, textAlign: 'center', transform: `scale(${clamp(outBack((f - at) / 10), 0.6, 1.06)})` }}>
      <span style={{ fontFamily: T.font, fontSize: 22, fontWeight: 800, letterSpacing: 4, color: T.soft }}>{label} </span>
      <span style={{ fontFamily: T.font, fontSize: 52, fontWeight: 900, color: c, fontVariantNumeric: 'tabular-nums' }}>{v < -1 ? '−' : v > 1 ? '+' : ''}{money(v)}</span>
    </div>
  );
};
const chip = (f: number, at: number, txt: string, x: number, c: string = T.gold) => f >= at && (
  <div style={{ position: 'absolute', left: x, top: 96, padding: '10px 20px', borderRadius: 999, border: `2px solid ${c}`, background: 'rgba(10,14,22,.6)', fontFamily: T.font, fontSize: 24, fontWeight: 900, color: c, whiteSpace: 'nowrap',
    transform: `translateY(${(1 - outBack((f - at) / 10)) * 24}px)`, opacity: clamp((f - at) / 5) }}>{txt}</div>
);

const Y1 = ({ f }: { f: number }) => (
  <Glass f={f} a={B.y1.s + 4} b={B.y2.s - 2} y={L.scale.y} h={L.scale.h} w={L.scale.w} label="Year 1 · one job + RRSP" enter="glass" exit="fade" toneOf="green" lit={ease(f, Q.ref1, Q.ref1 + 8)}>
    {chip(f, Q.rrsp, `RRSP ${money(X.rrsp)}`, 52)}
    {chip(f, Q.rate, `× ${+(RATE * 100).toFixed(2)}% (20.5% fed + 12.75% MB)`, 290)}
    <div style={{ position: 'absolute', left: 0, top: 100 }}><Scale f={f} at={Q.rate} wh={TAX} tax={TAX1} show={ease(f, Q.rate, Q.rate + 8)} /></div>
    <div style={{ position: 'absolute', left: 0, top: 100 }}><Result f={f} at={Q.ref1} v={REF1} label="REFUND" /></div>
  </Glass>
);
const Y2 = ({ f }: { f: number }) => (
  <Glass f={f} a={B.y2.s + 4} b={B.y3.s - 2} y={L.scale.y} h={L.scale.h} w={L.scale.w} label="Year 2 · same job, no RRSP" enter="slideR" exit="vapor">
    {chip(f, Q.norrsp, 'NO RRSP', 52, T.mute)}
    {chip(f, Q.close, 'PAYROLL ≈ YOUR TAX', 250, T.white)}
    <div style={{ position: 'absolute', left: 0, top: 100 }}><Scale f={f} at={Q.close} wh={TAX} tax={TAX} show={ease(f, Q.close, Q.close + 8)} /></div>
    <div style={{ position: 'absolute', left: 0, top: 100 }}><Result f={f} at={Q.zero} v={0} label="REFUND" /></div>
  </Glass>
);
const Y3 = ({ f }: { f: number }) => (
  <Glass f={f} a={B.y3.s + 4} b={B.reveal.s - 2} y={L.scale.y} h={L.scale.h} w={L.scale.w} label="Year 3 · two jobs, $35,000 each" enter="wipe" exit="collapse" collapseTo="50% 0%" toneOf="red" lit={ease(f, Q.short, Q.short + 8)}>
    {chip(f, Q.jobs, `PAYROLL A · BPA ✓`, 52, T.white)}
    {chip(f, Q.jobs + 6, `PAYROLL B · BPA ✓`, 350, T.white)}
    <Stamp f={f} at={Q.bpa} text="BPA claimed twice" x={530} y={160} size={18} color={T.amber} rotate={-5} />
    <div style={{ position: 'absolute', left: 0, top: 100 }}><Scale f={f} at={Q.bpa} wh={WH3} tax={TAX} show={ease(f, Q.bpa, Q.bpa + 8)} /></div>
    <div style={{ position: 'absolute', left: 0, top: 100 }}><Result f={f} at={Q.short} v={-SHORT} label="OWING" /></div>
  </Glass>
);

// ---------- reveal: the three-year receipt ----------
const Receipt = ({ f }: { f: number }) => {
  const a = B.reveal.s, b = B.action.s;
  if (f < a || f > b + 14) return null;
  const o = ease(f, b - 2, b + 12), p = outExpo((f - a) / 18);
  const rows: [string, number, number, number][] = [['YEAR 1', TAX1, TAX, REF1], ['YEAR 2', TAX, TAX, 0], ['YEAR 3', TAX, WH3, -SHORT]];
  const cell = (s: string, x: number, w: number, c: string, bold = false, hl = 0) => (
    <div style={{ position: 'absolute', left: x, width: w, textAlign: 'right', fontFamily: 'Courier New, monospace', fontSize: 28, fontWeight: bold ? 900 : 700, color: c,
      background: hl > 0 ? `rgba(241,199,91,${0.35 * hl})` : undefined, borderRadius: 6, padding: '0 6px' }}>{s}</div>
  );
  const hT = ease(f, Q.tax, Q.tax + 8), hW = ease(f, Q.withheld, Q.withheld + 8);
  return (
    <div style={{ position: 'absolute', left: L.receipt.x, top: L.receipt.y + (1 - p) * 300, width: L.receipt.w, opacity: (1 - o) * p, transform: `rotate(${-1.5 + 1.5 * p}deg)` }}>
      <div style={{ position: 'absolute', inset: 0, height: 600, background: '#f4f2ec', borderRadius: 6, boxShadow: '0 40px 80px rgba(0,0,0,.55)',
        WebkitMaskImage: 'linear-gradient(#000 0 0)', clipPath: 'polygon(0 0,100% 0,100% 97%,96% 100%,92% 97%,88% 100%,84% 97%,80% 100%,76% 97%,72% 100%,68% 97%,64% 100%,60% 97%,56% 100%,52% 97%,48% 100%,44% 97%,40% 100%,36% 97%,32% 100%,28% 97%,24% 100%,20% 97%,16% 100%,12% 97%,8% 100%,4% 97%,0 100%)' }} />
      <div style={{ position: 'absolute', left: 0, width: 740, top: 30, textAlign: 'center', fontFamily: 'Courier New, monospace', fontSize: 26, fontWeight: 900, letterSpacing: 4, color: '#2a3140' }}>SAME $70,000 · 3 YEARS</div>
      <div style={{ position: 'absolute', left: 30, right: 30, top: 76, borderTop: '2px dashed #9aa0ab' }} />
      <div style={{ position: 'absolute', left: 0, top: 96, width: 740, height: 34 }}>
        {cell('', 30, 140, '#3a4250')}{cell('TAX', 170, 170, '#3a4250', true)}{cell('WITHHELD', 350, 190, '#3a4250', true)}{cell('RESULT', 545, 170, '#3a4250', true)}
      </div>
      {rows.map(([y, t, w, r], i) => (
        <div key={y} style={{ position: 'absolute', left: 0, top: 150 + i * 56, width: 740, height: 44, opacity: ease(f, a + 8 + i * 5, a + 16 + i * 5) }}>
          <div style={{ position: 'absolute', left: 36, fontFamily: 'Courier New, monospace', fontSize: 26, fontWeight: 900, color: '#3a4250' }}>{y}</div>
          {cell(money(t), 170, 170, '#2a3140', false, hT)}{cell(money(w), 350, 190, '#2a3140', false, hW)}
          {cell(`${r > 1 ? '+' : r < -1 ? '−' : ''}${money(r)}`, 545, 170, r > 1 ? '#1e7a4a' : r < -1 ? '#b3261e' : '#2a3140', true)}
        </div>
      ))}
      <div style={{ position: 'absolute', left: 30, right: 30, top: 330, borderTop: '2px dashed #9aa0ab' }} />
      <div style={{ position: 'absolute', left: 36, top: 352, fontFamily: 'Courier New, monospace', fontSize: 25, fontWeight: 900, color: '#3a4250', opacity: hT }}>TAX MOVED AT MOST {money(REF1)}</div>
      <div style={{ position: 'absolute', left: 36, top: 396, fontFamily: 'Courier New, monospace', fontSize: 25, fontWeight: 900, color: '#b3261e', opacity: hW }}>RESULT SWUNG {money(SWING)}</div>
      <div style={{ position: 'absolute', left: 36, top: 456, fontFamily: 'Courier New, monospace', fontSize: 22, fontWeight: 700, color: '#3a4250', opacity: ease(f, Q.own - 2, Q.own + 8) }}>REFUND = WITHHELD − TAX = YOUR OWN MONEY</div>
      <div style={{ position: 'absolute', left: 36, top: 500, fontFamily: 'Courier New, monospace', fontSize: 17, fontWeight: 700, color: '#6a7080', opacity: ease(f, Q.own, Q.own + 10) }}>example: Manitoba 2026, employment income only</div>
      <Stamp f={f} at={Q.bonus} text="Not a bonus" x={330} y={520} size={34} color={T.red} rotate={-6} />
    </div>
  );
};

// ---------- action + end: two check tiles ----------
const Tiles = ({ f }: { f: number }) => {
  const a = B.action.s;
  if (f < a - 2) return null;
  const y = L.tiles.y;
  const tile = (x: number, at: number, over: string, l1: string, l2: string, l3: string, from: number) => {
    const p = outExpo((f - at) / 14);
    if (p <= 0) return null;
    return (
      <div style={{ position: 'absolute', left: x + (1 - p) * from, top: 0, width: 430, height: 300, borderRadius: 26, opacity: p, background: 'linear-gradient(160deg, rgba(14,20,34,.88), rgba(10,14,24,.74))', border: `1.5px solid ${T.gold}` }}>
        <div style={{ position: 'absolute', left: 30, top: 28, fontFamily: T.font, fontSize: 20, fontWeight: 800, letterSpacing: 4, color: T.gold }}>{over}</div>
        <div style={{ position: 'absolute', left: 30, top: 70, right: 24, fontFamily: T.font, fontSize: 38, fontWeight: 900, lineHeight: 1.1, ...goldFill }}>{l1}</div>
        <div style={{ position: 'absolute', left: 30, top: 170, right: 24, fontFamily: T.font, fontSize: 24, fontWeight: 800, color: T.white, lineHeight: 1.25 }}>{l2}</div>
        <div style={{ position: 'absolute', left: 30, top: 240, right: 24, fontFamily: T.font, fontSize: 18, fontWeight: 700, color: T.soft, lineHeight: 1.3 }}>{l3}</div>
      </div>
    );
  };
  return (
    <div style={{ position: 'absolute', left: 80, top: y, width: 880 }}>
      {tile(0, Q.box - 4, 'COMPARE', 'T4 BOX 22', 'vs total payable on your notice', 'line 43500 · difference = refund or balance', -140)}
      {tile(450, Q.twojobs, 'TWO JOBS?', 'SECOND TD1: CLAIM $0', 'tick “more than one employer”', 'or ask for extra tax off each cheque', 140)}
      <div style={{ position: 'absolute', left: 0, top: 336, display: 'flex', alignItems: 'center', gap: 18, opacity: ease(f, Q.next - 4, Q.next + 8) }}>
        <Flag f={f} w={90} amp={0.06} />
        <div style={{ display: 'inline-flex', padding: '16px 28px', borderRadius: 999, background: `linear-gradient(160deg,${T.goldHi},${T.gold} 50%,${T.goldDeep})`, color: '#1d1503', fontFamily: T.font, fontSize: 28, fontWeight: 900,
          transform: `scale(${1 + 0.03 * Math.sin((f - a) / 6)})` }}>NEXT: FILED WRONG? FIX YOUR RETURN →</div>
      </div>
      <div style={{ position: 'absolute', left: 0, top: 426, fontFamily: T.font, fontSize: 26, fontWeight: 700, color: T.white, textShadow, opacity: ease(f, Q.follow, Q.follow + 10) }}>Follow so you don't miss it</div>
      <div style={{ position: 'absolute', left: 0, top: 476, width: 880, fontFamily: T.font, fontSize: 18, fontWeight: 600, color: T.mute, lineHeight: 1.45, opacity: ease(f, a + 20, a + 34) }}>
        Source: CRA Form TD1 (2026); T1 lines 43500, 43700, 48400; ITA 146(5); 2026 federal and Manitoba rates (CRA T4127) · example amounts · general info, not advice
      </div>
    </div>
  );
};

const Header = ({ f }: { f: number }) => (
  <div style={{ position: 'absolute', left: 80, top: 92, right: 80, display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: T.white, fontSize: 22, fontWeight: 800, letterSpacing: 4, fontFamily: T.font }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}><Flag f={f} w={72} />TAX SECRETS CANADA</div>
    <div style={{ color: T.gold, letterSpacing: 5 }}>REFUND · {DATA.tax_year} RULES</div>
  </div>
);

export const A2V3 = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: T.navy, fontFamily: T.font, overflow: 'hidden' }}>
      <SceneCuts f={f} cuts={CUTS} scene={(i) => i === 0 ? (
        <PhotoPlate f={f} src="plates/a2-s1-4k.jpg" iw={PW} ih={PH} keys={K1} glide={40} blur={0.8 + 4 * (1 - ease(f, 0, 20))} steam={{ u: 0.15, v: 0.75, w: 0.035 }} />
      ) : i === 1 ? (
        <PhotoPlate f={f} src="plates/a2-s2-4k.jpg" iw={PW} ih={PH} keys={K2} glide={50} blur={0.8} />
      ) : (
        <PhotoPlate f={f} src="plates/a2-s3-4k.jpg" iw={PW} ih={PH} keys={K3} glide={40} blur={0.8} />
      )} />
      <Depth f={f} seed={f < B.y3.s ? 30 : f < B.reveal.s ? 31 : 32} warm={0.6} />
      <NavyGrade low={f >= B.action.s ? 1.2 : 1} />
      <Header f={f} />
      <Typed f={f} caps={CAPS} head={T.font} />
      {f < B.y1.s + 20 && <Hook f={f} />}
      <Strip f={f} />
      <Y1 f={f} />
      <Y2 f={f} />
      <Y3 f={f} />
      <Receipt f={f} />
      <Tiles f={f} />
      <Captions f={f} fps={A23FPS} beats={WORDS.beats as never} from={B.y1.s} until={B.action.s} y={1296} />
    </AbsoluteFill>
  );
};
