// M29 "First home: three programs, one home" — investigation format, motion engine v1 (2026-11-04). Checklist: channel/REEL-CHECKLIST.md.
// Variety vs R4 / R3 / M30: hook = a $59,000 gold counter + "+$1,450 CREDIT" pill; main visual = a code-drawn house that
// builds itself (FHSA foundation $24,000 of $40,000, HBP walls $35,000 with the $35,000 → $60,000 limit change, credit roof
// $1,450); re-hook = "BOTH · SAME HOME ✓" stamp (≈62 %); reveal = keep vs repay cards + a 15-tile 2030–2044 repayment strip.
// End = check card + next pill.
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { PhotoPlate, SceneCuts, type Focus } from './Plate';
import { Flag } from './RaiseShort';
import { Typed, beatsFrom, type Cap } from './Kit';
import TL from './m29-timeline.json';
import WORDS from './m29-words.json';
import CUE from './m29-cues.json';
import DATA from '../../m29/data.json';
import REEL from '../../m29/reel.json';
import { T, goldFill, textShadow } from './motion/brand';
import { Captions, Depth, Kinetic, NavyGrade, Stamp, clamp, ease, money, outBack, outExpo } from './motion/Reel';

export const M29FPS = 24;
const B = beatsFrom(TL, M29FPS);
export const M29DUR = Math.ceil((TL.total + REEL.hold_after_vo) * M29FPS);
const Q = Object.fromEntries(Object.entries(CUE).map(([k, v]) => [k, Math.round((v as number) * M29FPS)])) as Record<string, number>;
const X = DATA.example;
const GREEN = T.green;
const PW = 2294, PH = 4096;
const CUTS = [B.c2.s, B.reveal.s];
const L = Object.fromEntries(Object.entries(REEL.layout).map(([k, v]) => [k, { x: v.box[0], y: v.box[1], w: v.box[2], h: v.box[3] }])) as Record<string, { x: number; y: number; w: number; h: number }>;
const K1: Focus[] = [{ f: 0, u: 0.5, v: 0.3, k: 1.14 }, { f: B.c1.s, u: 0.45, v: 0.28, k: 1.22 }];
const K2: Focus[] = [{ f: 0, u: 0.5, v: 0.32, k: 1.2 }, { f: B.c4.s, u: 0.55, v: 0.3, k: 1.12 }];
const K3: Focus[] = [{ f: 0, u: 0.5, v: 0.34, k: 1.2 }, { f: B.action.s, u: 0.5, v: 0.3, k: 1.08 }];
const CAPS: Cap[] = [
  { at: B.c1.s, l1: 'PROGRAM 1 · FHSA', l2: `${money(X.fhsa_year)} a year · ${money(X.fhsa_life)} for life`, until: B.c2.s - 2 },
  { at: B.c2.s, l1: "JAMIE'S FHSA", l2: '2023–2025 · deducted in, tax-free out', until: B.c3.s - 2 },
  { at: B.c3.s, l1: 'PROGRAM 2 · HBP', l2: `Home Buyers' Plan · up to ${money(X.hbp_max)} from RRSPs`, until: B.c4.s - 2 },
  { at: B.c4.s, l1: 'PROGRAM 3 · CREDIT', l2: `home buyers' amount ${money(X.hbtc)} × 14.5%`, until: B.reveal.s - 2 },
  { at: B.reveal.s, l1: 'THE TWIST', l2: 'one is yours, one is a loan', until: B.action.s - 2 },
];
const glass = { background: 'linear-gradient(160deg, rgba(10,16,28,.86), rgba(10,16,28,.62))', border: `1px solid ${T.glassEdge}` };
const label = (c: string) => ({ fontFamily: T.font, fontSize: 18, fontWeight: 900, letterSpacing: 4, color: c });

const Hook = ({ f }: { f: number }) => {
  const p = outExpo((f - Q.h59 + 4) / 20), v = Math.round((X.total * p) / 1000) * 1000;
  return (
    <div style={{ opacity: 1 - ease(f, B.c1.s - 6, B.c1.s + 8) }}>
      <Kinetic f={f} at={0} now text={REEL.hook.l1} x={80} y={440} size={70} nowrap />
      <Kinetic f={f} at={0} now text={REEL.hook.l2} x={80} y={524} size={70} nowrap color={T.gold} />
      <div style={{ position: 'absolute', left: 80, top: 690, width: 920, height: 330, opacity: clamp(p * 1.5) }}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: 28, ...glass }} />
        <div style={{ position: 'absolute', left: 40, top: 34, ...label(T.soft), fontSize: 20 }}>DOWN PAYMENT FROM TAX-SHELTERED MONEY</div>
        <div style={{ position: 'absolute', left: 40, top: 70, fontFamily: T.font, fontSize: 150, fontWeight: 900, ...goldFill }}>{money(f >= Q.h59 + 16 ? X.total : v)}</div>
        <div style={{ position: 'absolute', left: 40, top: 250, display: 'inline-flex', padding: '10px 22px', borderRadius: 999, border: `2px solid ${GREEN}`, fontFamily: T.font, fontSize: 30, fontWeight: 900, color: GREEN,
          opacity: ease(f, Q.h1450 - 3, Q.h1450 + 6), transform: `translateY(${20 * (1 - ease(f, Q.h1450 - 3, Q.h1450 + 8))}px)` }}>+ {money(X.credit)} CREDIT</div>
      </div>
    </div>
  );
};

// ---------- the house: FHSA foundation, HBP walls, credit roof ----------
const Part = ({ f, at, children, style }: { f: number; at: number; children: React.ReactNode; style: React.CSSProperties }) => {
  if (f < at - 2) return null;
  const p = outBack((f - at) / 14);
  return <div style={{ position: 'absolute', opacity: clamp(p), transform: `translateY(${(1 - p) * -60}px)`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', ...style }}>{children}</div>;
};
const big = (c: string, s = 54) => ({ fontFamily: T.font, fontSize: s, fontWeight: 900, color: c, lineHeight: 1.05 });
const House = ({ f }: { f: number }) => {
  const a = B.c1.s + 2, b = B.reveal.s;
  if (f < a - 1 || f > b + 14) return null;
  const y = L.stack.y, fill = outExpo((f - Q.f24) / 18);
  return (
    <div style={{ opacity: outExpo((f - a) / 14) * (1 - ease(f, b - 2, b + 12)) }}>
      <div style={{ position: 'absolute', left: 56, top: y - 20, width: 968, height: 640, borderRadius: 28, ...glass }} />
      <div style={{ position: 'absolute', left: 90, top: y, ...label(T.mute) }}>THREE PROGRAMS · ONE HOME · {DATA.tax_year}</div>
      <Part f={f} at={Q.cr - 4} style={{ left: 200, top: y + 40, width: 680, height: 200, clipPath: 'polygon(50% 0, 100% 100%, 0 100%)', background: `linear-gradient(180deg, ${T.goldHi}, ${T.gold})`, paddingTop: 90 }}>
        <div style={{ ...label('#1d1503'), fontSize: 15 }}>CREDIT ON {money(X.hbtc)}</div>
        <div style={big('#1d1503', 40)}>{money(X.credit)}</div>
      </Part>
      <Part f={f} at={Q.h60 - 2} style={{ left: 280, top: y + 250, width: 520, height: 160, borderRadius: 10, border: `2px solid ${T.glassEdge}`, background: 'rgba(120,150,200,.28)' }}>
        <div style={{ ...label(T.soft), fontSize: 16 }}>HOME BUYERS' PLAN · RRSP</div>
        <div style={{ ...label(T.mute), fontSize: 16, marginTop: 6 }}>LIMIT <span style={{ textDecoration: 'line-through', color: T.redSoft }}>{money(X.hbp_old)}</span> → <span style={{ color: T.gold }}>{money(X.hbp_max)}</span></div>
        <div style={{ ...big(T.white), opacity: ease(f, Q.h35 - 2, Q.h35 + 8) }}>{money(X.hbp)}</div>
      </Part>
      <Part f={f} at={Q.fyear - 2} style={{ left: 240, top: y + 420, width: 600, height: 110, borderRadius: 10, border: `2px solid ${GREEN}`, background: 'rgba(127,224,168,.12)', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${(100 * X.fhsa * fill) / X.fhsa_life}%`, background: 'rgba(127,224,168,.28)' }} />
        <div style={{ ...label(T.soft), fontSize: 16, position: 'relative' }}>FHSA · {money(X.fhsa_year)}/YR · {money(X.fhsa_life)} LIFETIME</div>
        <div style={{ ...big(GREEN, 46), position: 'relative', opacity: ease(f, Q.f24 - 2, Q.f24 + 8) }}>{money(X.fhsa)}</div>
      </Part>
      <div style={{ position: 'absolute', left: 90, top: y + 552, width: 900, display: 'flex', justifyContent: 'space-between', opacity: ease(f, Q.cr + 10, Q.cr + 22) }}>
        <span style={{ ...label(T.soft), fontSize: 20 }}>DOWN PAYMENT: {money(X.fhsa)} + {money(X.hbp)}</span>
        <span style={{ ...big(T.gold, 30) }}>= {money(X.total)}</span>
      </div>
      {f >= Q.both && <Stamp f={f} at={Q.both} text="BOTH · SAME HOME ✓" x={80} y={y + 60} size={28} color={GREEN} rotate={-6} />}
    </div>
  );
};

// ---------- reveal: keep vs repay ----------
const Keep = ({ f }: { f: number }) => {
  const a = B.reveal.s, b = B.action.s;
  if (f < a || f > b + 12) return null;
  const y = L.keep.y, k = ease(f, Q.never - 2, Q.never + 10), r = ease(f, Q.loan - 2, Q.loan + 10), t = outExpo((f - Q.y2030 + 2) / 30);
  const col = (x: number, title: string, amt: number, c: string, o: number, sub: string) => (
    <div style={{ position: 'absolute', left: x, top: y + 60, width: 420, height: 220, borderRadius: 22, border: `2px solid ${c}`, background: 'rgba(255,255,255,.04)', opacity: o, padding: '22px 26px', boxSizing: 'border-box' }}>
      <div style={{ ...label(c), fontSize: 18 }}>{title}</div>
      <div style={{ ...big(T.white, 58), marginTop: 10 }}>{money(amt)}</div>
      <div style={{ fontFamily: T.font, fontSize: 24, fontWeight: 800, color: c, marginTop: 12 }}>{sub}</div>
    </div>
  );
  return (
    <div style={{ opacity: ease(f, a, a + 10) * (1 - ease(f, b - 2, b + 12)) }}>
      <div style={{ position: 'absolute', left: 56, top: y - 20, width: 968, height: 520, borderRadius: 28, ...glass }} />
      <div style={{ position: 'absolute', left: 90, top: y + 4, ...label(T.gold) }}>WHICH MONEY IS YOURS TO KEEP?</div>
      {col(90, 'FHSA', X.fhsa, GREEN, k, '✓ never paid back')}
      {col(560, "HOME BUYERS' PLAN", X.hbp, T.amber, r, `repay ${money(Math.round(X.repay_year))}/yr`)}
      <div style={{ position: 'absolute', left: 90, top: y + 320, ...label(T.soft), fontSize: 16, opacity: t }}>1/15 A YEAR · {X.repay_start}–{X.repay_start + 14}</div>
      {Array.from({ length: 15 }, (_, i) => (
        <div key={i} style={{ position: 'absolute', left: 90 + i * 60, top: y + 352, width: 48, height: 48, borderRadius: 10, opacity: clamp(t * 15 - i),
          background: i === 0 ? T.amber : 'rgba(255,181,71,.25)', border: `1px solid ${T.amber}` }} />
      ))}
      <div style={{ position: 'absolute', left: 90, top: y + 418, fontFamily: T.font, fontSize: 20, fontWeight: 700, color: T.mute, opacity: t }}>repayments start in the 5th year after the withdrawal (relief for 2022–2025 first withdrawals)</div>
    </div>
  );
};

const End = ({ f }: { f: number }) => {
  const a = B.action.s;
  if (f < a - 2) return null;
  const y = L.end.y;
  return (
    <div style={{ position: 'absolute', left: 80, top: y, width: 880 }}>
      <div style={{ position: 'absolute', left: 0, top: 0, width: 880, height: 200, borderRadius: 26, ...glass, opacity: ease(f, a, a + 12) }}>
        <div style={{ position: 'absolute', left: 36, top: 26, ...label(T.gold) }}>BEFORE YOU OFFER</div>
        <div style={{ position: 'absolute', left: 36, top: 66, right: 36, fontFamily: T.font, fontSize: 32, fontWeight: 900, lineHeight: 1.15, color: T.white, opacity: ease(f, Q.check - 4, Q.check + 6) }}>
          Check your FHSA room and RRSP balance · first-time buyer rules apply to each program
        </div>
      </div>
      <div style={{ position: 'absolute', left: 0, top: 240, display: 'flex', alignItems: 'center', gap: 18, opacity: ease(f, Q.next - 4, Q.next + 8) }}>
        <Flag f={f} w={90} amp={0.06} />
        <div style={{ display: 'inline-flex', padding: '16px 28px', borderRadius: 999, background: `linear-gradient(160deg,${T.goldHi},${T.gold} 50%,${T.goldDeep})`, color: '#1d1503', fontFamily: T.font, fontSize: 28, fontWeight: 900,
          transform: `scale(${1 + 0.03 * Math.sin((f - a) / 6)})` }}>NEXT: SHARED CREDITS →</div>
      </div>
      <div style={{ position: 'absolute', left: 0, top: 330, fontFamily: T.font, fontSize: 26, fontWeight: 700, color: T.white, textShadow, opacity: ease(f, Q.follow, Q.follow + 10) }}>Follow so you don't miss it</div>
      <div style={{ position: 'absolute', left: -10, top: 380, width: 900, padding: '14px 18px', borderRadius: 14, background: 'rgba(10,16,28,.84)', fontFamily: T.font, fontSize: 18, fontWeight: 600, color: T.mute, lineHeight: 1.45, opacity: ease(f, a + 6, a + 20) }}>
        Source: canada.ca (CRA) FHSA; Home Buyers' Plan; line 31270 · {DATA.tax_year} federal 14.5% · example · general info, not advice
      </div>
    </div>
  );
};

const Header = ({ f }: { f: number }) => (
  <div style={{ position: 'absolute', left: 80, top: 92, right: 80, display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: T.white, fontSize: 22, fontWeight: 800, letterSpacing: 4, fontFamily: T.font }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}><Flag f={f} w={72} />TAX SECRETS CANADA</div>
    <div style={{ color: T.gold, letterSpacing: 5 }}>FIRST HOME · {DATA.tax_year}</div>
  </div>
);

export const M29V3 = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: T.navy, fontFamily: T.font, overflow: 'hidden' }}>
      <SceneCuts f={f} cuts={CUTS} scene={(i) => i === 0 ? (
        <PhotoPlate f={f} src="plates/m29-s1-4k.jpg" iw={PW} ih={PH} keys={K1} glide={40} blur={0.8 + 4 * (1 - ease(f, 0, 20))} snow={[{ u0: 0.0, v0: 0.0, u1: 1.0, v1: 0.6 }]} />
      ) : i === 1 ? (
        <PhotoPlate f={f} src="plates/m29-s2-4k.jpg" iw={PW} ih={PH} keys={K2} glide={50} blur={0.8} snow={[{ u0: 0.6, v0: 0.0, u1: 1.0, v1: 0.45 }]} steam={{ u: 0.3, v: 0.7, w: 0.03 }} />
      ) : (
        <PhotoPlate f={f} src="plates/m29-s3-4k.jpg" iw={PW} ih={PH} keys={K3} glide={40} blur={0.8} snow={[{ u0: 0.0, v0: 0.0, u1: 1.0, v1: 0.6 }]} />
      )} />
      <Depth f={f} seed={f < B.c2.s ? 50 : f < B.reveal.s ? 51 : 52} warm={0.6} />
      <NavyGrade low={f >= B.action.s ? 1.2 : 1} />
      <Header f={f} />
      <Typed f={f} caps={CAPS} head={T.font} />
      {f < B.c1.s + 20 && <Hook f={f} />}
      <House f={f} />
      <Keep f={f} />
      <End f={f} />
      <Captions f={f} fps={M29FPS} beats={WORDS.beats as never} from={B.c1.s} until={B.action.s} y={1296} />
    </AbsoluteFill>
  );
};
