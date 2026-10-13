// A8 "Filing late vs paying late" — investigation format, motion engine v1 (2026-10-13).
// Variety vs A5 / A1 / H4 (CLAUDE.md "Variety"): hook = a myth question stamped COSTS EXTRA, with floating tags and three
// paper returns; main visual = a three-return scoreboard + one case panel per return (a late-month calendar strip with
// stacking percentage chips, an on-time check with an interest dash line, a refund with a credit "on hold"); reveal = a
// split screen NOT FILING vs NOT PAYING with a semicircle penalty gauge; end = two deadline tickets. Numbers come from
// a8/data.json; derived values are computed here exactly as its "derive" formulas.
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { PhotoPlate, SceneCuts, type Focus } from './Plate';
import { Flag } from './RaiseShort';
import { Typed, beatsFrom, type Cap } from './Kit';
import TL from './a8-timeline.json';
import WORDS from './a8-words.json';
import CUE from './a83-cues.json';
import DATA from '../../a8/data.json';
import REEL from '../../a8/reel.json';
import { T, goldFill, textShadow } from './motion/brand';
import { Captions, Count, Depth, Glass, Kinetic, NavyGrade, Stamp, Tag, Vapor, clamp, ease, money, outBack, outExpo } from './motion/Reel';

export const A83FPS = 24;
const B = beatsFrom(TL, A83FPS);
export const A83DUR = Math.ceil((TL.total + REEL.hold_after_vo) * A83FPS);
const Q = Object.fromEntries(Object.entries(CUE).map(([k, v]) => [k, Math.round((v as number) * A83FPS)])) as Record<string, number>;

const X = DATA.example;
const LATE_RATE = X.base_rate + X.monthly_rate * X.months_late;
const PENALTY = X.balance * LATE_RATE;
const MAX_RATE = X.base_rate + X.monthly_rate * X.max_months;
const MAX_PENALTY = X.balance * MAX_RATE;
const pc = (r: number) => `${Math.round(r * 100)}%`;
const RED = T.redSoft;
const PW = 2294, PH = 4096;

const CUTS = [B.r2.s, B.action.s];
const L = Object.fromEntries(Object.entries(REEL.layout).map(([k, v]) => [k, { x: v.box[0], y: v.box[1], w: v.box[2], h: v.box[3] }])) as Record<string, { x: number; y: number; w: number; h: number }>;
const K1: Focus[] = [{ f: 0, u: 0.62, v: 0.36, k: 1.22 }, { f: Q.three, u: 0.5, v: 0.5, k: 1.1 }, { f: B.r1.s + 40, u: 0.6, v: 0.4, k: 1.18 }];
const K2: Focus[] = [{ f: 0, u: 0.6, v: 0.42, k: 1.2 }, { f: B.r3.s, u: 0.5, v: 0.5, k: 1.1 }, { f: B.reveal.s, u: 0.55, v: 0.4, k: 1.24 }];
const K3: Focus[] = [{ f: 0, u: 0.7, v: 0.35, k: 1.2 }, { f: B.cta.s, u: 0.6, v: 0.45, k: 1.08 }];

const CAPS: Cap[] = [
  { at: B.r1.s, l1: 'RETURN 1', l2: 'owes · files late', until: B.r2.s - 2 },
  { at: B.r2.s, l1: 'RETURN 2', l2: 'owes · files on time', until: B.r3.s - 2 },
  { at: B.r3.s, l1: 'RETURN 3', l2: 'refund · files late', until: B.reveal.s - 2 },
  { at: B.reveal.s, l1: 'THE TWIST', l2: 'filing vs paying', until: B.action.s - 2 },
];

// ---------- hook: the myth question, stamped; three paper returns ----------
const Hook = ({ f }: { f: number }) => {
  const out = B.r1.s, o = ease(f, out - 4, out + 10);
  return (
    <div style={{ opacity: 1 - o }}>
      <Kinetic f={f} at={0} now text={REEL.hook.l1} x={80} y={480} size={96} nowrap />
      <Kinetic f={f} at={0} now text={REEL.hook.l2} x={80} y={590} size={96} nowrap color={T.gold} />
      <Stamp f={f} at={Q.move} text={REEL.hook.stamp} x={470} y={720} size={46} rotate={-7} />
      <Tag f={f} at={Q.pay + 4} text="Late-filing penalty" x={96} y={384} from="left" out={Q.three} seed={2} />
      <Tag f={f} at={Q.file + 2} text="April 30" x={640} y={384} from="right" out={Q.three} seed={4} />
      {[0, 1, 2].map((i) => {
        const p = outBack((f - Q.three - i * 3) / 12);
        if (f < Q.three) return null;
        const rot = (i - 1) * 7, x = 170 + i * 250;
        const ref = i === 2;
        return (
          <div key={i} style={{ position: 'absolute', left: x, top: 840 + (1 - clamp(p, 0, 1)) * 140, width: 210, height: 270, borderRadius: 10, background: '#f4f2ec', opacity: clamp(p, 0, 1),
            transform: `rotate(${rot}deg) scale(${0.9 + 0.1 * clamp(p, 0, 1.1)})`, boxShadow: '0 30px 60px rgba(0,0,0,.55)' }}>
            <div style={{ position: 'absolute', left: 20, top: 20, fontFamily: T.font, fontSize: 20, fontWeight: 900, letterSpacing: 3, color: '#3a4250' }}>RETURN {i + 1}</div>
            {[0.8, 0.6, 0.7, 0.45].map((w, j) => <div key={j} style={{ position: 'absolute', left: 20, top: 66 + j * 34, width: 170 * w, height: 10, borderRadius: 5, background: '#c9ccd3' }} />)}
            <div style={{ position: 'absolute', left: 20, right: 20, bottom: 24, fontFamily: T.font, fontSize: 22, fontWeight: 900, color: ref ? '#1e7a4a' : '#b3261e' }}>{ref ? 'REFUND' : 'OWES'}</div>
          </div>
        );
      })}
      {f >= Q.same && (
        <div style={{ position: 'absolute', left: 80, width: 920, top: 1150, textAlign: 'center', opacity: ease(f, Q.same, Q.same + 8), fontFamily: T.font, fontSize: 34, fontWeight: 900, letterSpacing: 6, color: T.white, textShadow }}>
          SAME DEADLINE · <span style={{ color: T.gold }}>APRIL 30</span>
        </div>
      )}
      {f >= out - 4 && f < out + 26 && <Vapor f={f} a={out - 4} x={170} y={840} w={710} h={300} n={40} seed={8} />}
    </div>
  );
};

// ---------- persistent scoreboard: the penalty each return pays ----------
const Board = ({ f }: { f: number }) => {
  const a = B.r1.s, b = B.reveal.s;
  if (f < a || f > b + 14) return null;
  const o = ease(f, b - 2, b + 12);
  const cells: [string, string, number, number, string][] = [
    ['RETURN 1', 'filed late', Q.pen, PENALTY, RED],
    ['RETURN 2', 'on time', Q.zero, 0, T.green],
    ['RETURN 3', 'refund', Q.nopen, 0, T.green],
  ];
  const active = f >= B.r3.s ? 2 : f >= B.r2.s ? 1 : 0;
  return (
    <div style={{ position: 'absolute', left: L.board.x, top: L.board.y, width: L.board.w, display: 'flex', gap: 14, opacity: 1 - o }}>
      {cells.map(([t, s, at, v, c], i) => {
        const p = outExpo((f - a - 2 - i * 3) / 12), on = i === active;
        return (
          <div key={t} style={{ flex: 1, height: 112, borderRadius: 18, position: 'relative', transform: `translateY(${(1 - p) * -40}px)`, opacity: p * (on ? 1 : 0.6),
            background: on ? 'linear-gradient(180deg, rgba(241,199,91,.22), rgba(12,18,30,.78))' : T.glass, border: `1.5px solid ${on ? T.gold : T.glassEdge}` }}>
            <div style={{ position: 'absolute', left: 18, top: 14, fontFamily: T.font, fontSize: 18, fontWeight: 800, letterSpacing: 3, color: on ? T.gold : T.mute }}>{t}</div>
            <div style={{ position: 'absolute', left: 18, top: 40, fontFamily: T.font, fontSize: 17, fontWeight: 700, color: T.soft }}>{s}</div>
            <div style={{ position: 'absolute', right: 18, top: 44, fontFamily: T.font, fontSize: 40, fontWeight: 900, color: f >= at ? c : T.mute, fontVariantNumeric: 'tabular-nums', transform: `scale(${f >= at ? clamp(outBack((f - at) / 10), 0.6, 1.1) : 1})` }}>
              {f >= at ? money(v) : '—'}</div>
          </div>
        );
      })}
    </div>
  );
};

// ---------- return 1: the calendar strip and the stacking percentages ----------
const MONTHS = ['MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC', 'JAN', 'FEB', 'MAR', 'APR'];
const R1 = ({ f }: { f: number }) => {
  const chip = (txt: string, at: number, x: number, col: string) => f >= at && (
    <div style={{ position: 'absolute', left: x, top: 226, padding: '10px 20px', borderRadius: 999, border: `2px solid ${col}`, background: 'rgba(10,14,22,.6)', fontFamily: T.font, fontSize: 28, fontWeight: 900, color: col,
      transform: `translateY(${(1 - outBack((f - at) / 10)) * 30}px)`, opacity: clamp((f - at) / 5) }}>{txt}</div>
  );
  return (
    <Glass f={f} a={B.r1.s + 4} b={B.r2.s - 2} y={L.r1.y} h={L.r1.h} w={L.r1.w} label="Return 1 · owes, filed 4 months late" enter="slideL" exit="fade" lit={ease(f, Q.pen, Q.pen + 8)}>
      <div style={{ position: 'absolute', left: 52, top: 86, display: 'flex', alignItems: 'baseline', gap: 16, opacity: ease(f, Q.k4 - 4, Q.k4 + 6) }}>
        <span style={{ fontFamily: T.font, fontSize: 26, fontWeight: 800, color: T.soft }}>tax owing</span>
        {f >= Q.k4 - 2 && <span style={{ fontFamily: T.font, fontSize: 44, fontWeight: 900, color: T.white, fontVariantNumeric: 'tabular-nums' }}>{money(f >= Q.k4 + 12 ? X.balance : Math.round(X.balance * outExpo((f - Q.k4 + 2) / 14) / 100) * 100)}</span>}
      </div>
      <div style={{ position: 'absolute', left: 52, top: 154, display: 'flex', gap: 6 }}>
        {MONTHS.map((m, i) => {
          const late = i < X.months_late && f >= Q.months + i * 4;
          return (
            <div key={m} style={{ width: 59, height: 50, borderRadius: 8, display: 'grid', placeItems: 'center', fontFamily: T.font, fontSize: 15, fontWeight: 800, letterSpacing: 1,
              background: late ? 'rgba(224,57,43,.55)' : 'rgba(255,255,255,.06)', border: `1px solid ${late ? RED : T.glassEdge}`, color: late ? T.white : T.mute, transform: `scale(${late ? clamp(outBack((f - Q.months - i * 4) / 8), 0.8, 1.08) : 1})` }}>{m}</div>
          );
        })}
      </div>
      {chip(pc(X.base_rate), Q.five, 52, T.gold)}
      {chip(`+ ${pc(X.monthly_rate)} × ${X.months_late} MONTHS`, Q.full, 176, T.gold)}
      {chip(`= ${pc(LATE_RATE)}`, Q.pen - 6, 560, T.white)}
      <div style={{ position: 'absolute', left: 52, top: 300, display: 'flex', alignItems: 'baseline', gap: 18 }}>
        <Count f={f} a={Q.pen} value={PENALTY} size={76} />
        {f >= Q.pen + 6 && <span style={{ fontFamily: T.font, fontSize: 26, fontWeight: 800, color: T.soft, opacity: ease(f, Q.pen + 6, Q.pen + 14) }}>late-filing penalty</span>}
      </div>
      <div style={{ position: 'absolute', left: 52, top: 388, fontFamily: T.font, fontSize: 18, fontWeight: 700, color: T.mute, opacity: ease(f, Q.before, Q.before + 10) }}>example · + interest at CRA's prescribed rate · penalty counts complete months only</div>
    </Glass>
  );
};

// ---------- return 2: on time, can't pay → no penalty, interest runs ----------
const R2 = ({ f }: { f: number }) => {
  const run = clamp((f - Q.may) / 60);
  return (
    <Glass f={f} a={B.r2.s + 4} b={B.r3.s - 2} y={L.r2.y} h={L.r2.h} w={L.r2.w} label="Return 2 · owes, filed on time" enter="glass" exit="vapor" toneOf="green" lit={ease(f, Q.zero, Q.zero + 8)}>
      <div style={{ position: 'absolute', left: 52, top: 92, display: 'flex', gap: 16, alignItems: 'center' }}>
        <div style={{ padding: '12px 22px', borderRadius: 999, background: f >= Q.ontime ? 'rgba(127,224,168,.18)' : 'rgba(255,255,255,.05)', border: `2px solid ${f >= Q.ontime ? T.green : T.glassEdge}`, fontFamily: T.font, fontSize: 26, fontWeight: 900, color: f >= Q.ontime ? T.green : T.mute,
          transform: `scale(${f >= Q.ontime ? clamp(outBack((f - Q.ontime) / 10), 0.7, 1.08) : 1})` }}>✓ FILED BY APRIL 30</div>
        <div style={{ padding: '12px 22px', borderRadius: 999, border: `2px solid ${f >= Q.cantpay ? RED : T.glassEdge}`, fontFamily: T.font, fontSize: 26, fontWeight: 900, color: f >= Q.cantpay ? RED : T.mute, opacity: ease(f, Q.cantpay - 2, Q.cantpay + 6) }}>NOT PAID: {money(X.balance)}</div>
      </div>
      <div style={{ position: 'absolute', left: 52, top: 172, display: 'flex', alignItems: 'baseline', gap: 18, opacity: ease(f, Q.zero - 3, Q.zero + 5) }}>
        <span style={{ fontFamily: T.font, fontSize: 96, fontWeight: 900, color: T.green, fontVariantNumeric: 'tabular-nums', transform: `scale(${clamp(outBack((f - Q.zero) / 10), 0.6, 1.06)})`, display: 'inline-block' }}>{money(0)}</span>
        <span style={{ fontFamily: T.font, fontSize: 28, fontWeight: 800, color: T.soft }}>late-filing penalty</span>
      </div>
      <div style={{ position: 'absolute', left: 52, top: 320, width: 776, height: 6, borderRadius: 3, background: 'rgba(255,255,255,.08)', opacity: ease(f, Q.int, Q.int + 8) }} />
      <div style={{ position: 'absolute', left: 52, top: 320, width: 776 * run, height: 6, borderRadius: 3, background: `repeating-linear-gradient(90deg, ${RED} 0 10px, rgba(255,122,104,.3) 10px 14px)` }} />
      <div style={{ position: 'absolute', left: 52, top: 340, fontFamily: T.font, fontSize: 24, fontWeight: 800, color: RED, opacity: ease(f, Q.int, Q.int + 8) }}>interest still runs from MAY 1 · compounded daily</div>
    </Glass>
  );
};

// ---------- return 3: refund, filed late → no penalty, the credit waits ----------
const R3 = ({ f }: { f: number }) => (
  <Glass f={f} a={B.r3.s + 4} b={B.reveal.s - 2} y={L.r3.y} h={L.r3.h} w={L.r3.w} label="Return 3 · refund, filed late" enter="wipe" exit="collapse" collapseTo="50% 0%" toneOf="green">
    <div style={{ position: 'absolute', left: 52, top: 92, display: 'flex', alignItems: 'baseline', gap: 16, opacity: ease(f, Q.refund - 2, Q.refund + 8) }}>
      <span style={{ fontFamily: T.font, fontSize: 26, fontWeight: 800, color: T.soft }}>refund due</span>
      <span style={{ fontFamily: T.font, fontSize: 52, fontWeight: 900, color: T.green, fontVariantNumeric: 'tabular-nums' }}>+{money(X.refund)}</span>
    </div>
    <div style={{ position: 'absolute', left: 52, top: 170, display: 'flex', alignItems: 'baseline', gap: 16, opacity: ease(f, Q.nopen - 2, Q.nopen + 6) }}>
      <span style={{ fontFamily: T.font, fontSize: 52, fontWeight: 900, color: T.white, fontVariantNumeric: 'tabular-nums' }}>{money(0)}</span>
      <span style={{ fontFamily: T.font, fontSize: 24, fontWeight: 800, color: T.soft }}>penalty · it's a % of tax unpaid, and none was</span>
    </div>
    <div style={{ position: 'absolute', left: 52, top: 262, width: 520, height: 96, borderRadius: 20, border: `2px solid ${f >= Q.stop ? T.amber : T.glassEdge}`, background: 'rgba(255,255,255,.05)', opacity: ease(f, Q.gst - 4, Q.gst + 6) }}>
      <div style={{ position: 'absolute', left: 24, top: 16, fontFamily: T.font, fontSize: 18, fontWeight: 800, letterSpacing: 3, color: T.mute }}>BENEFIT PAYMENT</div>
      <div style={{ position: 'absolute', left: 24, top: 44, fontFamily: T.font, fontSize: 30, fontWeight: 900, color: T.white }}>GST/HST CREDIT</div>
      <div style={{ position: 'absolute', right: 26, top: 26, width: 44, height: 44, display: 'flex', gap: 8, justifyContent: 'center', opacity: f >= Q.stop ? 1 : 0.3 }}>
        <div style={{ width: 12, height: 44, borderRadius: 3, background: T.amber }} /><div style={{ width: 12, height: 44, borderRadius: 3, background: T.amber }} />
      </div>
    </div>
    <Stamp f={f} at={Q.stop} text="On hold until filed" x={560} y={290} size={17} color={T.amber} rotate={-4} />
  </Glass>
);

// ---------- reveal: NOT FILING vs NOT PAYING, with the penalty gauge ----------
const Gauge = ({ f, rate, cx, cy, r }: { f: number; rate: number; cx: number; cy: number; r: number }) => {
  const ang = Math.PI * (1 - rate / MAX_RATE);
  const nx = cx + Math.cos(ang) * (r - 26), ny = cy - Math.sin(ang) * (r - 26);
  const arc = (from: number, to: number) => {
    const a0 = Math.PI * (1 - from), a1 = Math.PI * (1 - to);
    return `M ${cx + Math.cos(a0) * r} ${cy - Math.sin(a0) * r} A ${r} ${r} 0 0 1 ${cx + Math.cos(a1) * r} ${cy - Math.sin(a1) * r}`;
  };
  return (
    <svg width={2 * cx} height={cy + 20} style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }}>
      <path d={arc(0, 1)} stroke="rgba(255,255,255,.12)" strokeWidth={20} fill="none" strokeLinecap="round" />
      <path d={arc(0, rate / MAX_RATE)} stroke={RED} strokeWidth={20} fill="none" strokeLinecap="round" />
      <line x1={cx} y1={cy} x2={nx} y2={ny} stroke={T.white} strokeWidth={6} strokeLinecap="round" />
      <circle cx={cx} cy={cy} r={12} fill={T.white} />
    </svg>
  );
};
const Split = ({ f }: { f: number }) => {
  const a = B.reveal.s, b = B.action.s;
  if (f < a || f > b + 14) return null;
  const o = ease(f, b - 2, b + 12), y = L.split.y;
  const rate = f < Q.year ? LATE_RATE * outExpo((f - Q.notfile) / 16) : LATE_RATE + (MAX_RATE - LATE_RATE) * outExpo((f - Q.year) / 20);
  const shown = f >= Q.s17 ? MAX_PENALTY : Math.round(X.balance * Math.max(0, rate));
  const col = (x: number, w: number, title: string, at: number, c: string, child: React.ReactNode, dx: number) => {
    const p = outExpo((f - a - 2) / 14), lit = ease(f, at, at + 8);
    return (
      <div style={{ position: 'absolute', left: x + (1 - p) * dx, top: y, width: w, height: L.split.h, borderRadius: 30, background: 'linear-gradient(160deg, rgba(14,20,32,.86), rgba(10,14,22,.74))', opacity: p,
        border: `1.5px solid ${lit > 0.05 ? c : T.glassEdge}`, boxShadow: `0 0 ${36 * lit}px ${c === RED ? 'rgba(224,57,43,.35)' : 'rgba(127,224,168,.3)'}` }}>
        <div style={{ position: 'absolute', left: 32, top: 30, fontFamily: T.font, fontSize: 30, fontWeight: 900, letterSpacing: 2, color: lit > 0.05 ? c : T.white }}>{title}</div>
        {child}
      </div>
    );
  };
  return (
    <div style={{ opacity: 1 - o }}>
      {col(80, 520, 'NOT FILING', Q.notfile, RED, (
        <>
          <div style={{ position: 'absolute', left: 60, top: 84, width: 400, height: 190, opacity: ease(f, Q.notfile, Q.notfile + 8) }}><Gauge f={f} rate={Math.max(0, rate)} cx={200} cy={168} r={148} /></div>
          <div style={{ position: 'absolute', left: 0, width: 520, top: 254, textAlign: 'center', fontFamily: T.font, fontSize: 56, fontWeight: 900, color: T.white, fontVariantNumeric: 'tabular-nums', opacity: ease(f, Q.notfile, Q.notfile + 8) }}>
            {pc(Math.max(0, rate) + 0.0001)} <span style={{ fontSize: 30, color: T.soft }}>= {money(shown)}</span></div>
          <div style={{ position: 'absolute', left: 0, width: 520, top: 330, textAlign: 'center', fontFamily: T.font, fontSize: 20, fontWeight: 700, color: T.mute, opacity: ease(f, Q.s17, Q.s17 + 10) }}>
            max after {X.max_months} months, on the {money(X.balance)} example</div>
        </>
      ), -120)}
      {col(620, 340, 'NOT PAYING', Q.notpay, T.green, (
        <>
          <div style={{ position: 'absolute', left: 32, top: 96, fontFamily: T.font, fontSize: 76, fontWeight: 900, color: T.green, opacity: ease(f, Q.notpay - 2, Q.notpay + 8) }}>{money(0)}</div>
          <div style={{ position: 'absolute', left: 32, top: 192, fontFamily: T.font, fontSize: 24, fontWeight: 800, color: T.soft, lineHeight: 1.3, opacity: ease(f, Q.notpay, Q.notpay + 10) }}>late-filing<br />penalty</div>
          <div style={{ position: 'absolute', left: 32, top: 272, fontFamily: T.font, fontSize: 22, fontWeight: 800, color: RED, lineHeight: 1.3, opacity: ease(f, Q.notpay + 8, Q.notpay + 18) }}>interest only,<br />from May 1</div>
        </>
      ), 120)}
      {f >= Q.repeat && (
        <div style={{ position: 'absolute', left: 80, top: L.repeat.y, width: 880, padding: '18px 28px', borderRadius: 22, background: 'rgba(10,14,22,.78)', border: `1.5px solid ${f >= Q.double ? RED : T.glassEdge}`,
          opacity: ease(f, Q.repeat, Q.repeat + 8), transform: `translateY(${(1 - outExpo((f - Q.repeat) / 12)) * 30}px)` }}>
          <div style={{ fontFamily: T.font, fontSize: 30, fontWeight: 900, color: T.white }}>REPEAT: <span style={{ color: f >= Q.double ? RED : T.white }}>{pc(X.repeat_base_rate)} + {pc(X.repeat_monthly_rate)}/MONTH</span></div>
          <div style={{ marginTop: 6, maxWidth: 700, fontFamily: T.font, fontSize: 19, fontWeight: 700, color: T.soft, opacity: ease(f, Q.demand - 2, Q.demand + 8) }}>after a CRA demand to file + a penalty in any of the 3 prior years · max {X.repeat_max_months} months</div>
        </div>
      )}
      <Stamp f={f} at={Q.double} text="× 2" x={810} y={L.repeat.y - 18} size={40} color={RED} rotate={-8} />
    </div>
  );
};

// ---------- action + end: two deadline tickets ----------
const Ticket = ({ f, at, y, over, date, sub, extra }: { f: number; at: number; y: number; over: string; date: string; sub: string; extra?: React.ReactNode }) => {
  const p = outExpo((f - at) / 14);
  if (p <= 0) return null;
  return (
    <div style={{ position: 'absolute', left: 0, top: y, width: 880, height: 190, opacity: p, transform: `translateX(${(1 - p) * 160}px) rotate(${(1 - p) * 3}deg)` }}>
      <div style={{ position: 'absolute', inset: 0, borderRadius: 24, background: 'linear-gradient(160deg, rgba(14,20,34,.86), rgba(10,14,24,.7))', backdropFilter: 'blur(14px)', border: `1.5px solid ${T.gold}` }} />
      <div style={{ position: 'absolute', left: 620, top: 18, bottom: 18, borderLeft: `3px dashed rgba(241,199,91,.45)` }} />
      <div style={{ position: 'absolute', left: 36, top: 26, fontFamily: T.font, fontSize: 20, fontWeight: 800, letterSpacing: 4, color: T.gold }}>{over}</div>
      <div style={{ position: 'absolute', left: 36, top: 60, fontFamily: T.font, fontSize: 58, fontWeight: 900, letterSpacing: -1, ...goldFill }}>{date}</div>
      <div style={{ position: 'absolute', left: 36, top: 136, fontFamily: T.font, fontSize: 22, fontWeight: 700, color: T.soft }}>{sub}</div>
      <div style={{ position: 'absolute', left: 646, top: 30, width: 210 }}>{extra}</div>
    </div>
  );
};
const Tickets = ({ f }: { f: number }) => {
  const a = B.action.s;
  if (f < a - 2) return null;
  const y = L.tickets.y;
  return (
    <div style={{ position: 'absolute', left: 80, top: y, width: 880 }}>
      <Ticket f={f} at={Q.apr - 4} y={0} over="FILE BY · 2026 RETURNS" date="APR 30, 2027" sub="even if you can't pay in full"
        extra={<div style={{ fontFamily: T.font, fontSize: 22, fontWeight: 900, color: T.white, lineHeight: 1.3 }}>MOST<br />PEOPLE<div style={{ marginTop: 10, fontSize: 18, fontWeight: 700, color: T.soft }}>pay by the same day</div></div>} />
      <Ticket f={f} at={Q.se} y={214} over="SELF-EMPLOYED (AND SPOUSE)" date="JUN 15, 2027" sub="file by June 15 · interest from May 1 on any balance"
        extra={<div style={{ fontFamily: T.font, fontSize: 22, fontWeight: 900, color: f >= Q.payapr ? RED : T.white, lineHeight: 1.3, opacity: ease(f, Q.payapr - 6, Q.payapr + 4) }}>BUT PAY<br />BY APR 30</div>} />
      <div style={{ position: 'absolute', left: 0, top: 428, fontFamily: T.font, fontSize: 22, fontWeight: 700, color: T.white, textShadow, opacity: ease(f, Q.payapr + 10, Q.payapr + 22) }}>Can't pay in full? Ask CRA about a payment arrangement.</div>
      <div style={{ position: 'absolute', left: 0, top: 476, display: 'flex', alignItems: 'center', gap: 18, opacity: ease(f, Q.next - 4, Q.next + 8) }}>
        <Flag f={f} w={90} amp={0.06} />
        <div style={{ display: 'inline-flex', padding: '16px 28px', borderRadius: 999, background: `linear-gradient(160deg,${T.goldHi},${T.gold} 50%,${T.goldDeep})`, color: '#1d1503', fontFamily: T.font, fontSize: 28, fontWeight: 900,
          transform: `scale(${1 + 0.03 * Math.sin((f - a) / 6)})` }}>NEXT: WHY YOUR REFUND GOT SMALLER →</div>
      </div>
      <div style={{ position: 'absolute', left: 0, top: 566, fontFamily: T.font, fontSize: 26, fontWeight: 700, color: T.white, textShadow, opacity: ease(f, Q.follow, Q.follow + 10) }}>Follow so you don't miss it</div>
      <div style={{ position: 'absolute', left: 0, top: 614, width: 880, fontFamily: T.font, fontSize: 18, fontWeight: 600, color: T.mute, lineHeight: 1.45, opacity: ease(f, a + 20, a + 34) }}>
        Source: Income Tax Act ss. 150(1)(d), 162(1)–(2), 122.5(3), 161(1), 248(1) · canada.ca late-filing penalty · example amounts · general info, not advice
      </div>
    </div>
  );
};

const Header = ({ f }: { f: number }) => (
  <div style={{ position: 'absolute', left: 80, top: 92, right: 80, display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: T.white, fontSize: 22, fontWeight: 800, letterSpacing: 4, fontFamily: T.font }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}><Flag f={f} w={72} />TAX SECRETS CANADA</div>
    <div style={{ color: T.gold, letterSpacing: 5 }}>FILING · {DATA.tax_year} RETURNS</div>
  </div>
);

export const A8V3 = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: T.navy, fontFamily: T.font, overflow: 'hidden' }}>
      <SceneCuts f={f} cuts={CUTS} scene={(i) => i === 0 ? (
        <PhotoPlate f={f} src="plates/a8-s1-4k.jpg" iw={PW} ih={PH} keys={K1} glide={40} blur={0.8 + 4 * (1 - ease(f, 0, 20))} />
      ) : i === 1 ? (
        <PhotoPlate f={f} src="plates/a8-s2-4k.jpg" iw={PW} ih={PH} keys={K2} glide={50} blur={0.8} steam={{ u: 0.1, v: 0.56, w: 0.04 }} />
      ) : (
        <PhotoPlate f={f} src="plates/a8-s3-4k.jpg" iw={PW} ih={PH} keys={K3} glide={40} blur={0.8} steam={{ u: 0.76, v: 0.47, w: 0.035 }} />
      )} />
      <Depth f={f} seed={f < B.r2.s ? 20 : f < B.action.s ? 21 : 22} warm={0.6} />
      <NavyGrade low={f >= B.action.s ? 1.2 : 1} />
      <Header f={f} />
      <Typed f={f} caps={CAPS} head={T.font} />
      {f < B.r1.s + 30 && <Hook f={f} />}
      <Board f={f} />
      <R1 f={f} />
      <R2 f={f} />
      <R3 f={f} />
      <Split f={f} />
      <Tickets f={f} />
      <Captions f={f} fps={A83FPS} beats={WORDS.beats as never} from={B.r1.s} until={B.action.s} y={1296} />
    </AbsoluteFill>
  );
};
