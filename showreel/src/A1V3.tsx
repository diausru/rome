// A1 "Credits people miss" — the first investigation-format reel (list-2 rule), motion engine v1 (2026-10-12).
// Variety vs D1 / H4 (CLAUDE.md "Variety"): hook = a big-number count-up ($4,550) with three case folders landing;
// main visual = paper case files (not glass) + a growing stack of found money; case 2 = a year-by-year room scrub;
// reveal = split screen REFUNDABLE / NON-REFUNDABLE with stamps; end = a ticking checklist.
// Numbers come from a1/data.json; derived values are computed here (same formulas as data.json "derive").
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { PhotoPlate, SceneCuts, type Focus } from './Plate';
import { Flag } from './RaiseShort';
import { Typed, beatsFrom, type Cap } from './Kit';
import TL from './a1-timeline.json';
import WORDS from './a1-words.json';
import CUE from './a13-cues.json';
import DATA from '../../a1/data.json';
import REEL from '../../a1/reel.json';
import { T, goldFill, textShadow } from './motion/brand';
import { Captions, Depth, Kinetic, NavyGrade, Stamp, Vapor, clamp, ease, money, outBack, outExpo } from './motion/Reel';

export const A13FPS = 24;
const B = beatsFrom(TL, A13FPS);
export const A13DUR = Math.ceil((TL.total + REEL.hold_after_vo) * A13FPS);
const Q = Object.fromEntries(Object.entries(CUE).map(([k, v]) => [k, Math.round((v as number) * A13FPS)])) as Record<string, number>;

const X = DATA.example;
const EDU = Math.min(X.supplies, X.edu_cap) * X.edu_rate;
const ROOM = Math.min(X.ctc_per_year * X.ctc_years, X.ctc_lifetime);
const CTC = Math.min(ROOM, X.course * 0.5);
const HATC = Math.round(Math.min(X.reno, X.hatc_cap) * X.rate);
const TOTAL = EDU + CTC + HATC;
const YEARS = Array.from({ length: X.ctc_years }, (_, i) => DATA.tax_year - X.ctc_years + 1 + i);

const PAPER = '#efe4c8', PAPER_DEEP = '#d9c79e', INK = '#2a2418', INK_SOFT = '#6b5f45';
const GREEN = T.green, AMBER = T.amber;

const CUTS = [B.case2.s, B.case3.s];
const L = Object.fromEntries(Object.entries(REEL.layout).map(([k, v]) => [k, { x: v.box[0], y: v.box[1], w: v.box[2], h: v.box[3] }])) as Record<string, { x: number; y: number; w: number; h: number }>;
const K1: Focus[] = [{ f: 0, u: 0.55, v: 0.5, k: 1.28 }, { f: B.case1.s, u: 0.56, v: 0.55, k: 1.14 }];
const K2: Focus[] = [{ f: 0, u: 0.52, v: 0.56, k: 1.14 }, { f: B.case2.s + 300, u: 0.5, v: 0.6, k: 1.2 }];
const K3: Focus[] = [{ f: 0, u: 0.56, v: 0.5, k: 1.14 }, { f: B.reveal.s, u: 0.55, v: 0.52, k: 1.06 }, { f: B.action.s, u: 0.58, v: 0.5, k: 1.18 }];

const CAPS: Cap[] = [
  { at: B.case1.s, l1: 'CASE 01', l2: 'the teacher', until: B.case2.s - 2 },
  { at: B.case2.s, l1: 'CASE 02', l2: 'the course', until: B.case3.s - 2 },
  { at: B.case3.s, l1: 'CASE 03', l2: "mom's bathroom", until: B.reveal.s - 2 },
  { at: B.reveal.s, l1: 'THE TWIST', l2: 'refundable or not', until: B.action.s - 2 },
];

// ---------- a paper case file (manila folder) ----------
const Folder = ({ f, a, b, n, title, children, y = L.case1.y, h = L.case1.h }: { f: number; a: number; b: number; n: string; title: string; children?: React.ReactNode; y?: number; h?: number }) => {
  if (f < a - 1 || f > b + 20) return null;
  const p = outBack((f - a) / 16), o = ease(f, b, b + 14);
  return (
    <div style={{ position: 'absolute', left: 80, top: y + (1 - clamp(p, 0, 1)) * 260 + o * 40, width: 880, height: h, opacity: clamp(p * 2, 0, 1) * (1 - o), transform: `rotate(${(1 - clamp(p, 0, 1)) * -4 + o * 3}deg)`, transformOrigin: '20% 100%' }}>
      <div style={{ position: 'absolute', left: 30, top: -40, width: 230, height: 52, borderRadius: '14px 14px 0 0', background: PAPER_DEEP, fontFamily: T.font, fontSize: 22, fontWeight: 900, letterSpacing: 4, color: INK, padding: '12px 22px' }}>CASE {n}</div>
      <div style={{ position: 'absolute', inset: 0, borderRadius: 14, background: `linear-gradient(170deg, ${PAPER}, ${PAPER_DEEP})`, boxShadow: '0 30px 70px rgba(0,0,0,.5)' }}>
        <div style={{ position: 'absolute', left: 40, top: 30, fontFamily: T.font, fontSize: 22, fontWeight: 800, letterSpacing: 3, color: INK_SOFT }}>{title}</div>
        <div style={{ position: 'absolute', left: 40, right: 40, top: 68, borderTop: `2px dashed ${INK_SOFT}`, opacity: 0.5 }} />
        {children}
      </div>
    </div>
  );
};

const Line = ({ f, at, label, value, y, big = false }: { f: number; at: number; label: string; value: React.ReactNode; y: number; big?: boolean }) => {
  const p = outExpo((f - at + 2) / 10);
  if (p <= 0) return null;
  return (
    <div style={{ position: 'absolute', left: 40, right: 40, top: y, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', opacity: p, transform: `translateX(${(1 - p) * -30}px)` }}>
      <span style={{ fontFamily: T.font, fontSize: big ? 26 : 28, fontWeight: 800, color: big ? INK : INK_SOFT, letterSpacing: big ? 2 : 0 }}>{label}</span>
      <span style={{ fontFamily: T.font, fontSize: big ? 84 : 44, fontWeight: 900, color: big ? '#8a5a00' : INK, fontVariantNumeric: 'tabular-nums' }}>{value}</span>
    </div>
  );
};

const Num = ({ f, a, v, dur = 16 }: { f: number; a: number; v: number; dur?: number }) => <>{money(f >= a + dur ? v : Math.round((v * outExpo((f - a) / dur)) / 10) * 10)}</>;

// ---------- hook: count-up + three folders land ----------
const Hook = ({ f }: { f: number }) => {
  const out = B.promise.s, o = ease(f, out, out + 12);
  const n = outExpo((f - Q.count) / 30);
  return (
    <div style={{ opacity: 1 - o, transform: `scale(${1 - 0.06 * o})` }}>
      <Kinetic f={f} at={0} now text={REEL.hook.title} x={80} y={560} size={74} nowrap />
      <div style={{ position: 'absolute', left: 82, top: 652, fontFamily: T.font, fontSize: 26, fontWeight: 800, letterSpacing: 6, color: T.gold, textShadow }}>{REEL.hook.sub}</div>
      {[0, 1, 2].map((i) => {
        const at = Q.f1 + i * 4, p = outBack((f - at) / 12);
        if (f < at) return null;
        return (
          <div key={i} style={{ position: 'absolute', left: 90 + i * 250, top: 810 + (1 - clamp(p, 0, 1)) * -200, width: 220, height: 150, transform: `rotate(${(i - 1) * 4}deg) scale(${clamp(p, 0, 1.1)})` }}>
            <div style={{ position: 'absolute', left: 14, top: -22, width: 100, height: 30, borderRadius: '10px 10px 0 0', background: PAPER_DEEP }} />
            <div style={{ position: 'absolute', inset: 0, borderRadius: 10, background: `linear-gradient(170deg, ${PAPER}, ${PAPER_DEEP})`, boxShadow: '0 18px 40px rgba(0,0,0,.5)', display: 'grid', placeItems: 'center',
              fontFamily: T.font, fontSize: 30, fontWeight: 900, letterSpacing: 4, color: INK }}>CASE 0{i + 1}</div>
          </div>
        );
      })}
      {f >= Q.count && (
        <div style={{ position: 'absolute', left: 76, top: 1000, opacity: clamp(n * 2), transform: `scale(${0.8 + 0.2 * n})`, transformOrigin: '0 50%' }}>
          <div style={{ fontFamily: T.font, fontSize: 158, fontWeight: 900, letterSpacing: -4, fontVariantNumeric: 'tabular-nums', ...goldFill }}>{money(f >= Q.count + 30 ? TOTAL : Math.round((TOTAL * n) / 10) * 10)}</div>
          <div style={{ fontFamily: T.font, fontSize: 26, fontWeight: 800, letterSpacing: 4, color: T.white, textShadow, opacity: ease(f, Q.count + 20, Q.count + 30) }}>ALMOST LEFT WITH THE CRA</div>
        </div>
      )}
      {f >= out && f < out + 30 && <Vapor f={f} a={out} x={80} y={560} w={880} h={640} n={46} seed={9} />}
    </div>
  );
};

// ---------- promise: kinetic, no panel ----------
const PromiseBeat = ({ f }: { f: number }) => {
  const a = B.promise.s, b = B.case1.s;
  if (f < a || f > b + 10) return null;
  const o = ease(f, b - 4, b + 8);
  return (
    <div style={{ opacity: 1 - o }}>
      <Kinetic f={f} at={a + 2} text="WHICH CREDITS PAY YOU" x={80} y={880} size={60} nowrap />
      <div style={{ position: 'absolute', left: 80, top: 960, display: 'flex', alignItems: 'baseline', gap: 18, opacity: ease(f, a + 10, a + 18) }}>
        <span style={{ fontFamily: T.font, fontSize: 60, fontWeight: 900, color: T.white, textShadow }}>EVEN AT</span>
        <span style={{ fontFamily: T.font, fontSize: 96, fontWeight: 900, transform: `scale(${f >= Q.zero ? 1 + 0.12 * Math.exp(-(f - Q.zero) / 6) : 1})`, display: 'inline-block', ...goldFill }}>$0 TAX?</span>
      </div>
    </div>
  );
};

// ---------- the three cases ----------
const Case1 = ({ f }: { f: number }) => (
  <Folder f={f} a={B.case1.s + 4} b={B.case2.s - 4} n="01" title="THE TEACHER · OWN MONEY">
    <Line f={f} at={Q.t1000} label="Classroom supplies" value={<Num f={f} a={Q.t1000} v={X.supplies} />} y={96} />
    <Line f={f} at={Q.p25} label="Educator credit" value={`× ${X.edu_rate * 100}%`} y={170} />
    <Line f={f} at={Q.v250} label="BACK TO HER" value={<Num f={f} a={Q.v250} v={EDU} />} y={250} big />
    <div style={{ position: 'absolute', left: 40, top: 372, fontFamily: T.font, fontSize: 19, fontWeight: 700, color: INK_SOFT, opacity: ease(f, Q.v250 + 10, Q.v250 + 20) }}>certified teacher or ECE · not reimbursed · up to {money(X.edu_cap)} of supplies</div>
  </Folder>
);

const Case2 = ({ f }: { f: number }) => {
  const fill = clamp((f - Q.grew) / 36);
  return (
    <Folder f={f} a={B.case2.s + 4} b={B.case3.s - 4} n="02" title={`THE COURSE · SHE'S ${X.her_age}`}>
      <Line f={f} at={Q.course} label="Course fee" value={<Num f={f} a={Q.course} v={X.course} />} y={92} />
      {f >= Q.grew - 4 && (
        <div style={{ position: 'absolute', left: 40, right: 40, top: 160, display: 'flex', gap: 8, opacity: ease(f, Q.grew - 4, Q.grew + 4) }}>
          {YEARS.map((yr, i) => {
            const on = fill * YEARS.length > i;
            return (
              <div key={yr} style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ height: 40, borderRadius: 8, background: on ? `linear-gradient(180deg, ${T.goldHi}, ${T.gold})` : 'rgba(42,36,24,.12)', border: `1.5px solid ${on ? '#a87412' : 'rgba(42,36,24,.25)'}` }} />
                <div style={{ marginTop: 6, fontFamily: T.font, fontSize: 17, fontWeight: 800, color: INK_SOFT }}>{yr}</div>
              </div>
            );
          })}
        </div>
      )}
      <Line f={f} at={Q.grew + 30} label={`Room · +${money(X.ctc_per_year)} a year`} value={money(ROOM)} y={240} />
      <Line f={f} at={Q.v1500} label="HALF THE FEE" value={<Num f={f} a={Q.v1500} v={CTC} />} y={300} big />
      <div style={{ position: 'absolute', left: 40, top: 392, fontFamily: T.font, fontSize: 18, fontWeight: 700, color: INK_SOFT, opacity: ease(f, Q.v1500 + 10, Q.v1500 + 20) }}>if eligible every year (age 26–65, filed, working income) · tuition credit reduced by 14% of it</div>
    </Folder>
  );
};

const Case3 = ({ f }: { f: number }) => (
  <Folder f={f} a={B.case3.s + 4} b={B.reveal.s - 4} n="03" title={`MOM'S BATHROOM · SHE'S ${X.mom_age}`}>
    <Line f={f} at={Q.reno} label="Walk-in shower + grab bars" value={<Num f={f} a={Q.reno} v={X.reno} />} y={96} />
    <Line f={f} at={Q.p14} label="Home accessibility credit" value={`× ${Math.round(X.rate * 100)}%`} y={170} />
    <Line f={f} at={Q.v2800} label="OFF HER TAX" value={<Num f={f} a={Q.v2800} v={HATC} />} y={250} big />
    <div style={{ position: 'absolute', left: 40, top: 372, fontFamily: T.font, fontSize: 19, fontWeight: 700, color: INK_SOFT, opacity: ease(f, Q.v2800 + 10, Q.v2800 + 20) }}>65+ or DTC-eligible · lasting change for access or safety · up to {money(X.hatc_cap)} a year</div>
  </Folder>
);

// ---------- the stack of found money (persistent through the cases) ----------
const Tally = ({ f }: { f: number }) => {
  const a = B.case1.s, b = B.reveal.s;
  if (f < a || f > b + 16) return null;
  const o = ease(f, b - 2, b + 12);
  const blocks: [number, number, string][] = [[EDU, Q.v250, T.green], [CTC, Q.v1500, T.green], [HATC, Q.v2800, T.amber]];
  const H = 300, x = L.tally.x, base = L.tally.y + L.tally.h - 40;
  let acc = 0;
  const found = blocks.reduce((s, [v, at]) => s + (f >= at + 16 ? v : 0), 0);
  return (
    <div style={{ opacity: 1 - o }}>
      <div style={{ position: 'absolute', left: x, top: L.tally.y, width: 200, textAlign: 'center', fontFamily: T.font, fontSize: 18, fontWeight: 800, letterSpacing: 3, color: T.soft, textShadow }}>FOUND</div>
      <div style={{ position: 'absolute', left: x, top: L.tally.y + 26, width: 200, textAlign: 'center', fontFamily: T.font, fontSize: 40, fontWeight: 900, fontVariantNumeric: 'tabular-nums', ...goldFill }}>{money(found)}</div>
      {blocks.map(([v, at, col], i) => {
        const p = outBack((f - at) / 12), h = (v / TOTAL) * H;
        const y = base - acc - h; acc += h;
        if (f < at) return null;
        return <div key={i} style={{ position: 'absolute', left: x + 30, top: y - (1 - clamp(p, 0, 1)) * 120, width: 140, height: Math.max(6, h - 4), borderRadius: 6, opacity: clamp(p * 2, 0, 1),
          background: `linear-gradient(180deg, ${col}, rgba(255,255,255,.15))`, boxShadow: `0 0 16px ${col}55` }} />;
      })}
      <div style={{ position: 'absolute', left: x + 20, top: base, width: 160, height: 3, background: T.glassEdge }} />
    </div>
  );
};

// ---------- reveal: split screen ----------
const Reveal = ({ f }: { f: number }) => {
  const a = B.reveal.s, b = B.action.s;
  if (f < a || f > b + 16) return null;
  const pL = outExpo((f - a - 4) / 14), pR = outExpo((f - Q.third + 6) / 14), o = ease(f, b - 2, b + 12);
  const col = (side: 'L' | 'R') => {
    const p = side === 'L' ? pL : pR, c = side === 'L' ? GREEN : AMBER;
    return (
      <div style={{ position: 'absolute', left: side === 'L' ? 80 : 530, top: L.reveal.y, width: 430, height: L.reveal.h, opacity: p * (1 - o), transform: `translateY(${(1 - p) * 60}px)`,
        borderRadius: 28, background: T.glass, backdropFilter: 'blur(16px)', border: `1.5px solid ${c}` }}>
        <div style={{ position: 'absolute', left: 30, top: 30, fontFamily: T.font, fontSize: 20, fontWeight: 800, letterSpacing: 3, color: c }}>{side === 'L' ? 'PAID EVEN AT $0 TAX' : 'ONLY CUTS TAX OWED'}</div>
        <div style={{ position: 'absolute', left: 30, top: 80, fontFamily: T.font, fontSize: 64, fontWeight: 900, fontVariantNumeric: 'tabular-nums', ...goldFill }}>{money(side === 'L' ? EDU + CTC : HATC)}</div>
        <div style={{ position: 'absolute', left: 30, top: 170, fontFamily: T.font, fontSize: 24, fontWeight: 700, lineHeight: 1.45, color: T.soft }}>
          {side === 'L' ? <>Educator {money(EDU)}<br />Training {money(CTC)}</> : <>Home accessibility<br />{money(HATC)}</>}
        </div>
        <Stamp f={f} at={side === 'L' ? Q.refund : Q.third + 8} text={side === 'L' ? 'REFUNDABLE' : 'NON-REFUNDABLE'} x={26} y={330} size={side === 'L' ? 34 : 27} color={c} rotate={-6} />
      </div>
    );
  };
  return <>{col('L')}{col('R')}</>;
};

// ---------- action + end: a ticking checklist ----------
const Checklist = ({ f }: { f: number }) => {
  const a = B.action.s;
  if (f < a - 2) return null;
  const e = ease(f, a, a + 14);
  const rows: [string, number][] = [['Training credit limit on your notice of assessment', Q.tick1], ['Keep every receipt', Q.tick2]];
  return (
    <div style={{ position: 'absolute', left: 80, top: L.checklist.y - 60, width: 880, opacity: e, transform: `translateY(${(1 - e) * 30}px)` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}><Flag f={f} w={110} amp={0.06} /><span style={{ fontFamily: T.font, fontSize: 44, fontWeight: 900, color: T.white, textShadow }}>CHECK YOURS</span></div>
      {rows.map(([t, at], i) => {
        const tick = outBack((f - at) / 10);
        return (
          <div key={i} style={{ marginTop: 22, display: 'flex', alignItems: 'center', gap: 20, padding: '18px 24px', borderRadius: 18, background: T.glass, backdropFilter: 'blur(14px)', border: `1px solid ${f >= at ? T.gold : T.glassEdge}`, width: 860, boxSizing: 'border-box' }}>
            <div style={{ position: 'relative', width: 46, height: 46, borderRadius: 10, border: `3px solid ${f >= at ? T.gold : T.mute}`, flex: '0 0 auto' }}>
              {f >= at && <div style={{ position: 'absolute', left: 13, top: 2, width: 14, height: 28, borderRight: `5px solid ${T.gold}`, borderBottom: `5px solid ${T.gold}`, transform: `rotate(40deg) scale(${clamp(tick, 0, 1.2)})` }} />}
            </div>
            <span style={{ fontFamily: T.font, fontSize: 30, fontWeight: 800, color: T.white }}>{t}</span>
          </div>
        );
      })}
      <div style={{ marginTop: 26, display: 'inline-flex', padding: '18px 30px', borderRadius: 999, background: `linear-gradient(160deg,${T.goldHi},${T.gold} 50%,${T.goldDeep})`, color: '#1d1503', fontFamily: T.font, fontSize: 30, fontWeight: 900,
        opacity: ease(f, Q.next, Q.next + 10), transform: `scale(${1 + 0.03 * Math.sin((f - a) / 6)})` }}>NEXT: CRA SAYS YOU OWE →</div>
      <div style={{ marginTop: 12, fontFamily: T.font, fontSize: 26, fontWeight: 700, color: T.white, textShadow, opacity: ease(f, Q.follow, Q.follow + 10) }}>Follow so you don't miss it</div>
      <div style={{ marginTop: 18, fontFamily: T.font, fontSize: 18, fontWeight: 600, color: T.mute, lineHeight: 1.45, opacity: ease(f, a + 20, a + 34) }}>
        Source: Income Tax Act ss. 122.9, 122.91, 118.5(1.2), 118.041 · canada.ca line 45350 · federal, tax year {DATA.tax_year} · example family, conditions apply · general info, not advice
      </div>
    </div>
  );
};

const Header = ({ f }: { f: number }) => (
  <div style={{ position: 'absolute', left: 80, top: 92, right: 80, display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: T.white, fontSize: 22, fontWeight: 800, letterSpacing: 4, fontFamily: T.font }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}><Flag f={f} w={72} />TAX SECRETS CANADA</div>
    <div style={{ color: T.gold, letterSpacing: 5 }}>CRA · CREDITS · {DATA.tax_year}</div>
  </div>
);

export const A1V3 = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: T.navy, fontFamily: T.font, overflow: 'hidden' }}>
      <SceneCuts f={f} cuts={CUTS} scene={(i) => i === 0 ? (
        <PhotoPlate f={f} src="plates/a1-s1-4k.jpg" iw={2294} ih={4096} keys={K1} glide={40} blur={0.8 + 4 * (1 - ease(f, 0, 20))}>
          {/* a small white tag on the box side could carry pseudo-lettering: feathered local blur */}
          <div style={{ position: 'absolute', left: '71%', top: '41.5%', width: '7%', height: '6%', borderRadius: '40%', backdropFilter: 'blur(10px)', maskImage: 'radial-gradient(closest-side, #000 65%, transparent)', WebkitMaskImage: 'radial-gradient(closest-side, #000 65%, transparent)' }} />
        </PhotoPlate>
      ) : i === 1 ? (
        <PhotoPlate f={f} src="plates/a1-s2-4k.jpg" iw={2294} ih={4096} keys={K2} glide={60} blur={0.8} steam={{ u: 0.9, v: 0.6, w: 0.04 }} />
      ) : (
        <PhotoPlate f={f} src="plates/a1-s3-4k.jpg" iw={2294} ih={4096} keys={K3} glide={40} blur={0.8} />
      )} />
      <Depth f={f} seed={f < B.case2.s ? 7 : f < B.case3.s ? 8 : 9} warm={0.8} />
      <NavyGrade low={f >= B.action.s ? 1.15 : 1} />
      <Header f={f} />
      <Typed f={f} caps={CAPS} head={T.font} />
      {f < B.promise.s + 30 && <Hook f={f} />}
      <PromiseBeat f={f} />
      <Case1 f={f} />
      <Case2 f={f} />
      <Case3 f={f} />
      <Tally f={f} />
      <Reveal f={f} />
      <Checklist f={f} />
      <Captions f={f} fps={A13FPS} beats={WORDS.beats as never} from={B.promise.s} until={B.action.s} y={1296} />
    </AbsoluteFill>
  );
};
