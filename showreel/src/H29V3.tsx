// H29 "First home: up to $200,000, stacked" — motion engine v1 (2026-11-12). Checklist: channel/REEL-CHECKLIST.md.
// Variety vs R4 / R3 / M30: hook = big $200,000 count-up; main visual = two stacked-block towers (FHSA 40K + HBP 60K)
// per buyer, merging into one couple total; re-hook stamp ×2 at the total; reveal = repayment timeline 2026 → 2031;
// end = check card + next pill.
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { PhotoPlate, SceneCuts, type Focus } from './Plate';
import { Flag } from './RaiseShort';
import { Typed, beatsFrom, type Cap } from './Kit';
import TL from './h29-timeline.json';
import WORDS from './h29-words.json';
import CUE from './h29-cues.json';
import DATA from '../../h29/data.json';
import REEL from '../../h29/reel.json';
import { T, goldFill, textShadow } from './motion/brand';
import { Captions, Depth, Kinetic, NavyGrade, Stamp, clamp, ease, money, outBack, outExpo } from './motion/Reel';

export const H29FPS = 24;
const B = beatsFrom(TL, H29FPS);
export const H29DUR = Math.ceil((TL.total + REEL.hold_after_vo) * H29FPS);
const Q = Object.fromEntries(Object.entries(CUE).map(([k, v]) => [k, Math.round((v as number) * H29FPS)])) as Record<string, number>;
const X = DATA.example;
const GREEN = T.green;
const PW = 2294, PH = 4096;
const CUTS = [B.c2.s, B.reveal.s];
const L = Object.fromEntries(Object.entries(REEL.layout).map(([k, v]) => [k, { x: v.box[0], y: v.box[1], w: v.box[2], h: v.box[3] }])) as Record<string, { x: number; y: number; w: number; h: number }>;
const K1: Focus[] = [{ f: 0, u: 0.5, v: 0.3, k: 1.14 }, { f: B.c1.s, u: 0.45, v: 0.28, k: 1.22 }];
const K2: Focus[] = [{ f: 0, u: 0.5, v: 0.32, k: 1.2 }, { f: B.c3.s, u: 0.55, v: 0.3, k: 1.12 }];
const K3: Focus[] = [{ f: 0, u: 0.5, v: 0.34, k: 1.2 }, { f: B.action.s, u: 0.5, v: 0.3, k: 1.08 }];
const CAPS: Cap[] = [
  { at: B.c1.s, l1: 'BLOCK 1 · FHSA', l2: 'in deductible, out tax-free', until: B.c2.s - 2 },
  { at: B.c2.s, l1: 'BLOCK 2 · HBP', l2: "Home Buyers' Plan: borrow from your RRSP", until: B.c3.s - 2 },
  { at: B.c3.s, l1: 'TWO BUYERS', l2: 'one home', until: B.reveal.s - 2 },
  { at: B.reveal.s, l1: 'THE TWIST', l2: 'both, same home', until: B.action.s - 2 },
];
const glass = { background: 'linear-gradient(160deg, rgba(10,16,28,.86), rgba(10,16,28,.62))', border: `1px solid ${T.glassEdge}` };
const label = (c: string) => ({ fontFamily: T.font, fontSize: 18, fontWeight: 900, letterSpacing: 4, color: c });

const Hook = ({ f }: { f: number }) => {
  const c = Math.round(X.couple * outExpo((f - 4) / 50) / 1000) * 1000;
  return (
    <div style={{ opacity: 1 - ease(f, B.c1.s - 6, B.c1.s + 8) }}>
      <Kinetic f={f} at={0} now text={REEL.hook.l1} x={80} y={440} size={70} nowrap />
      <Kinetic f={f} at={0} now text={REEL.hook.l2} x={80} y={524} size={70} nowrap color={T.gold} />
      <div style={{ position: 'absolute', left: 60, top: 720, width: 960, height: 330, borderRadius: 28, ...glass, opacity: ease(f, 0, 8) }} />
      <div style={{ position: 'absolute', left: 60, width: 960, top: 760, textAlign: 'center', ...label(T.soft) }}>TWO FIRST-TIME BUYERS · ONE HOME</div>
      <div style={{ position: 'absolute', left: 60, width: 960, top: 800, textAlign: 'center', fontFamily: T.font, fontSize: 150, fontWeight: 900, ...goldFill }}>{money(c)}</div>
      <div style={{ position: 'absolute', left: 60, width: 960, top: 975, textAlign: 'center', fontFamily: T.font, fontSize: 30, fontWeight: 800, color: T.white, opacity: ease(f, Q.stacks - 4, Q.stacks + 6) }}>no tax on the way out</div>
    </div>
  );
};

const Tower = ({ f, x, name, atF, atH }: { f: number; x: number; name: string; atF: number; atH: number }) => {
  const H = 380, sc = H / 100000, pf = outExpo((f - atF) / 18), ph = outExpo((f - atH) / 18);
  return (
    <div style={{ position: 'absolute', left: x, top: 0, width: 260, height: H + 110 }}>
      <div style={{ position: 'absolute', left: 0, right: 0, top: H - X.fhsa_life * sc * pf, height: X.fhsa_life * sc * pf, borderRadius: 10, background: 'linear-gradient(180deg, rgba(127,224,168,.9), rgba(70,160,120,.9))',
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: T.font, fontSize: 22, fontWeight: 900, color: '#0b1220', overflow: 'hidden' }}>FHSA {money(X.fhsa_life)}</div>
      <div style={{ position: 'absolute', left: 0, right: 0, top: H - X.fhsa_life * sc - X.hbp * sc * ph - 6, height: X.hbp * sc * ph, borderRadius: 10, background: `linear-gradient(180deg, ${T.goldHi}, ${T.goldDeep})`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: T.font, fontSize: 22, fontWeight: 900, color: '#1d1503', overflow: 'hidden' }}>HBP {money(X.hbp)}</div>
      <div style={{ position: 'absolute', left: -20, right: -20, top: H + 14, textAlign: 'center', ...label(T.white) }}>{name}</div>
      <div style={{ position: 'absolute', left: -20, right: -20, top: H + 44, textAlign: 'center', fontFamily: T.font, fontSize: 34, fontWeight: 900, color: T.white, opacity: ease(f, Q.hundred - 2, Q.hundred + 8) }}>{money(X.per)}</div>
    </div>
  );
};
const Towers = ({ f }: { f: number }) => {
  const a = B.c1.s + 2, b = B.reveal.s;
  if (f < a - 1 || f > b + 14) return null;
  const y = L.towers.y;
  return (
    <div style={{ opacity: outExpo((f - a) / 14) * (1 - ease(f, b - 2, b + 12)) }}>
      <div style={{ position: 'absolute', left: 56, top: y - 20, width: 968, height: 660, borderRadius: 28, ...glass }} />
      <div style={{ position: 'absolute', left: 90, top: y, ...label(T.mute) }}>MAXIMUMS PER PERSON · {DATA.tax_year}</div>
      <div style={{ position: 'absolute', left: 90, top: y + 34, fontFamily: T.font, fontSize: 21, fontWeight: 800, color: T.soft }}>
        <span style={{ opacity: ease(f, Q.eight - 2, Q.eight + 8) }}>FHSA {money(X.fhsa_year)}/yr · </span><span style={{ opacity: ease(f, Q.fifteen - 2, Q.fifteen + 8) }}>HBP repaid over {X.years} years</span>
      </div>
      <div style={{ position: 'absolute', left: 0, top: y + 100, width: 1080 }}>
        <Tower f={f} x={200} name="BUYER 1" atF={Q.forty} atH={Q.sixty} />
        {f >= B.c3.s && <div style={{ opacity: ease(f, B.c3.s, B.c3.s + 10) }}><Tower f={f} x={620} name="BUYER 2" atF={B.c3.s} atH={B.c3.s + 8} /></div>}
      </div>
      {f >= Q.twohund && <Stamp f={f} at={Q.twohund} text={`TOGETHER ${money(X.couple)}`} x={280} y={y + 580} size={34} color={T.red} rotate={-4} />}
    </div>
  );
};

const Timeline = ({ f }: { f: number }) => {
  const a = B.reveal.s, b = B.action.s;
  if (f < a || f > b + 12) return null;
  const y = L.timeline.y, yrs = [2026, 2027, 2028, 2029, 2030, 2031];
  return (
    <div style={{ opacity: ease(f, a, a + 10) * (1 - ease(f, b - 2, b + 12)) }}>
      <div style={{ position: 'absolute', left: 56, top: y - 20, width: 968, height: 470, borderRadius: 28, ...glass }} />
      <div style={{ position: 'absolute', left: 90, top: y + 4, ...label(T.gold) }}>FHSA + HBP: SAME HOME ✓</div>
      <div style={{ position: 'absolute', left: 90, top: y + 44, fontFamily: T.font, fontSize: 24, fontWeight: 800, color: T.white, opacity: ease(f, Q.both - 4, Q.both + 8) }}>first HBP withdrawal in 2026–2028 → repayments start in year five</div>
      {yrs.map((yr, i) => {
        const at = Q.fifth - 10 + i * 4, p = outBack((f - at) / 12), first = i === 0, pay = i === 5;
        return (
          <div key={yr} style={{ position: 'absolute', left: 90 + i * 150, top: y + 120, width: 136, height: 170, borderRadius: 18, opacity: clamp(p), transform: `scale(${clamp(p, 0.6, 1.04)})`,
            background: pay ? 'rgba(241,199,91,.18)' : 'rgba(255,255,255,.06)', border: `2px solid ${pay ? T.gold : first ? GREEN : T.glassEdge}` }}>
            <div style={{ position: 'absolute', left: 0, right: 0, top: 26, textAlign: 'center', fontFamily: T.font, fontSize: 32, fontWeight: 900, color: T.white }}>{yr}</div>
            <div style={{ position: 'absolute', left: 6, right: 6, top: 90, textAlign: 'center', fontFamily: T.font, fontSize: 17, fontWeight: 800, color: pay ? T.gold : first ? GREEN : T.soft }}>{first ? 'withdraw' : pay ? 'first repayment' : 'no repayment'}</div>
          </div>
        );
      })}
      <div style={{ position: 'absolute', left: 90, width: 900, top: y + 340, fontFamily: T.font, fontSize: 18, fontWeight: 700, color: T.mute, opacity: ease(f, Q.fifth, Q.fifth + 10) }}>CRA example: first withdrawal in 2026 → first repayment year 2031 · 15 years to repay</div>
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
        <div style={{ position: 'absolute', left: 36, top: 26, ...label(T.gold) }}>CHECK YOURS</div>
        <div style={{ position: 'absolute', left: 36, top: 66, right: 36, fontFamily: T.font, fontSize: 32, fontWeight: 900, lineHeight: 1.15, color: T.white, opacity: ease(f, Q.amount - 4, Q.amount + 6) }}>
          + home buyers' amount up to {money(X.hbta)} · check every condition first
        </div>
      </div>
      <div style={{ position: 'absolute', left: 0, top: 240, display: 'flex', alignItems: 'center', gap: 18, opacity: ease(f, Q.next - 4, Q.next + 8) }}>
        <Flag f={f} w={90} amp={0.06} />
        <div style={{ display: 'inline-flex', padding: '16px 28px', borderRadius: 999, background: `linear-gradient(160deg,${T.goldHi},${T.gold} 50%,${T.goldDeep})`, color: '#1d1503', fontFamily: T.font, fontSize: 28, fontWeight: 900,
          transform: `scale(${1 + 0.03 * Math.sin((f - a) / 6)})` }}>NEXT: WHO CLAIMS SHARED CREDITS →</div>
      </div>
      <div style={{ position: 'absolute', left: 0, top: 330, fontFamily: T.font, fontSize: 26, fontWeight: 700, color: T.white, textShadow, opacity: ease(f, Q.follow, Q.follow + 10) }}>Follow so you don't miss it</div>
      <div style={{ position: 'absolute', left: -10, top: 380, width: 900, padding: '14px 18px', borderRadius: 14, background: 'rgba(10,16,28,.84)', fontFamily: T.font, fontSize: 18, fontWeight: 600, color: T.mute, lineHeight: 1.45, opacity: ease(f, a + 6, a + 20) }}>
        Source: canada.ca (CRA) FHSA, Home Buyers' Plan, line 31270 · maximums, conditions apply · example · general info, not advice
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

export const H29V3 = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: T.navy, fontFamily: T.font, overflow: 'hidden' }}>
      <SceneCuts f={f} cuts={CUTS} scene={(i) => i === 0 ? (
        <PhotoPlate f={f} src="plates/h29-s1-4k.jpg" iw={PW} ih={PH} keys={K1} glide={40} blur={0.8 + 4 * (1 - ease(f, 0, 20))} snow={[{ u0: 0.0, v0: 0.0, u1: 1.0, v1: 0.4 }]} />
      ) : i === 1 ? (
        <PhotoPlate f={f} src="plates/h29-s2-4k.jpg" iw={PW} ih={PH} keys={K2} glide={50} blur={0.8} />
      ) : (
        <PhotoPlate f={f} src="plates/h29-s3-4k.jpg" iw={PW} ih={PH} keys={K3} glide={40} blur={0.8} steam={{ u: 0.3, v: 0.75, w: 0.03 }} />
      )} />
      <Depth f={f} seed={f < B.c2.s ? 20 : f < B.reveal.s ? 21 : 22} warm={0.6} />
      <NavyGrade low={f >= B.action.s ? 1.2 : 1} />
      <Header f={f} />
      <Typed f={f} caps={CAPS} head={T.font} />
      {f < B.c1.s + 20 && <Hook f={f} />}
      <Towers f={f} />
      <Timeline f={f} />
      <End f={f} />
      <Captions f={f} fps={H29FPS} beats={WORDS.beats as never} from={B.c1.s} until={B.action.s} y={1296} />
    </AbsoluteFill>
  );
};
