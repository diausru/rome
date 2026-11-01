// N1 "$80,000 of income, $0 federal tax" — eligible dividends, investigation format, motion engine v1 (2026-11-01). Checklist: channel/REEL-CHECKLIST.md.
// Variety vs R3 / M30 / R2: hook = one $80,000 income card with a FEDERAL TAX slot that slams to $0; main visual = a vertical
// waterfall (dividend → +38% gross-up → taxable → tax after BPA → dividend tax credit eats it → $0); re-hook = $0 stamp (≈60 %);
// reveal = salary vs dividends face-off ($9,243 vs $0); end = check card + next pill.
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { PhotoPlate, SceneCuts, type Focus } from './Plate';
import { Flag } from './RaiseShort';
import { Typed, beatsFrom, type Cap } from './Kit';
import TL from './n1-timeline.json';
import WORDS from './n1-words.json';
import CUE from './n1-cues.json';
import DATA from '../../n1/data.json';
import REEL from '../../n1/reel.json';
import { T, goldFill, textShadow } from './motion/brand';
import { Captions, Depth, Kinetic, NavyGrade, Stamp, clamp, ease, money, outBack, outExpo } from './motion/Reel';

export const N1FPS = 24;
const B = beatsFrom(TL, N1FPS);
export const N1DUR = Math.ceil((TL.total + REEL.hold_after_vo) * N1FPS);
const Q = Object.fromEntries(Object.entries(CUE).map(([k, v]) => [k, Math.round((v as number) * N1FPS)])) as Record<string, number>;
const X = DATA.example;
const GREEN = T.green;
const PW = 2294, PH = 4096;
const CUTS = [B.c2.s, B.reveal.s];
const L = Object.fromEntries(Object.entries(REEL.layout).map(([k, v]) => [k, { x: v.box[0], y: v.box[1], w: v.box[2], h: v.box[3] }])) as Record<string, { x: number; y: number; w: number; h: number }>;
const K1: Focus[] = [{ f: 0, u: 0.5, v: 0.3, k: 1.14 }, { f: B.c1.s, u: 0.45, v: 0.28, k: 1.22 }];
const K2: Focus[] = [{ f: 0, u: 0.5, v: 0.32, k: 1.2 }, { f: B.c4.s, u: 0.55, v: 0.3, k: 1.12 }];
const K3: Focus[] = [{ f: 0, u: 0.5, v: 0.34, k: 1.2 }, { f: B.action.s, u: 0.5, v: 0.3, k: 1.08 }];
const CAPS: Cap[] = [
  { at: B.c1.s, l1: 'MEET DANA', l2: `no salary · ${money(X.div)} of eligible dividends · ${DATA.tax_year}`, until: B.c2.s - 2 },
  { at: B.c2.s, l1: 'STEP 1', l2: 'the 38% gross-up', until: B.c3.s - 2 },
  { at: B.c3.s, l1: 'STEP 2', l2: 'federal tax after the basic personal amount', until: B.c4.s - 2 },
  { at: B.c4.s, l1: 'STEP 3', l2: 'the dividend tax credit (15.0198%)', until: B.reveal.s - 2 },
  { at: B.reveal.s, l1: 'THE TWIST', l2: `same ${money(X.div)} as a salary`, until: B.action.s - 2 },
];
const glass = { background: 'linear-gradient(160deg, rgba(10,16,28,.86), rgba(10,16,28,.62))', border: `1px solid ${T.glassEdge}` };
const label = (c: string) => ({ fontFamily: T.font, fontSize: 18, fontWeight: 900, letterSpacing: 4, color: c });



// ---------- hook: one income card, the federal-tax slot slams to $0 ----------
const Hook = ({ f }: { f: number }) => {
  const i = outBack(f / 12), z = outBack((f - Q.hz) / 10), fl = Math.max(0, 1 - Math.abs(f - Q.hz - 2) / 6);
  return (
    <div style={{ opacity: 1 - ease(f, B.c1.s - 6, B.c1.s + 8) }}>
      <Kinetic f={f} at={0} now text={REEL.hook.l1} x={80} y={440} size={70} nowrap />
      <Kinetic f={f} at={0} now text={REEL.hook.l2} x={80} y={524} size={70} nowrap color={T.gold} />
      <div style={{ position: 'absolute', left: 140, top: 680, width: 800, height: 420, borderRadius: 30, ...glass, border: `2px solid ${z > 0.5 ? GREEN : T.glassEdge}`, opacity: clamp(i), transform: `scale(${0.94 + 0.06 * clamp(i)})` }}>
        <div style={{ position: 'absolute', left: 50, top: 40, ...label(T.soft) }}>INCOME · {DATA.tax_year}</div>
        <div style={{ position: 'absolute', left: 50, top: 76, fontFamily: T.font, fontSize: 110, fontWeight: 900, color: T.gold, textShadow }}>{money(X.div)}</div>
        <div style={{ position: 'absolute', left: 50, right: 50, top: 236, height: 130, borderRadius: 18, border: `3px dashed ${z > 0.05 ? GREEN : 'rgba(255,255,255,.25)'}`, overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: '#fff', opacity: fl * 0.4 }} />
          <div style={{ position: 'absolute', left: 30, top: 44, ...label(T.soft), fontSize: 22 }}>FEDERAL TAX</div>
          <div style={{ position: 'absolute', right: 34, top: 14, fontFamily: T.font, fontSize: 92, fontWeight: 900, color: z > 0.05 ? GREEN : T.soft, transform: `scale(${z > 0.05 ? 1.4 - 0.4 * clamp(z) : 1})`, transformOrigin: 'right center' }}>{z > 0.05 ? '$0' : '?'}</div>
        </div>
      </div>
    </div>
  );
};

// ---------- main visual: the waterfall ----------
const Flow = ({ f }: { f: number }) => {
  const a = B.c1.s + 2, b = B.reveal.s;
  if (f < a - 1 || f > b + 14) return null;
  const y = L.flow.y, x0 = 130, W = 820, sc = W / X.taxable;
  const row = (top: number, at: number, name: string, val: string, w: number, left: number, c: string, txt = T.white) => {
    const k = outExpo((f - at) / 16);
    if (f < at - 2) return null;
    return (
      <div style={{ position: 'absolute', left: 0, top, width: 1080, opacity: clamp(k * 1.5) }}>
        <div style={{ position: 'absolute', left: x0, top: 0, ...label(T.soft), fontSize: 18 }}>{name}</div>
        <div style={{ position: 'absolute', left: x0 + left, top: 30, width: Math.max(4, w * k), height: 54, borderRadius: 10, background: c, boxShadow: '0 10px 26px rgba(0,0,0,.4)' }} />
        <div style={{ position: 'absolute', left: x0, top: 30, width: W, height: 54, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 14, fontFamily: T.font, fontSize: 34, fontWeight: 900, color: txt, textShadow }}>{val}</div>
      </div>
    );
  };
  const gu = X.taxable - X.div, tax = X.after_bpa * (1 - outExpo((f - Q.dtcamt - 6) / 22));
  return (
    <div style={{ opacity: outExpo((f - a) / 14) * (1 - ease(f, b - 2, b + 12)) }}>
      <div style={{ position: 'absolute', left: 56, top: y - 20, width: 968, height: 640, borderRadius: 28, ...glass }} />
      <div style={{ position: 'absolute', left: 90, top: y, ...label(T.mute) }}>DANA · FEDERAL TAX · {DATA.tax_year} · EXAMPLE</div>
      {row(y + 50, Q.div, 'ELIGIBLE DIVIDENDS', money(X.div), X.div * sc, 0, `linear-gradient(90deg, ${T.goldDeep}, ${T.gold})`)}
      {row(y + 150, Q.gross, 'GROSS-UP +38%', `+${money(gu)}`, gu * sc, X.div * sc, 'rgba(143,179,232,.85)')}
      {row(y + 250, Q.taxable, 'TAXABLE ON PAPER', money(X.taxable), X.taxable * sc, 0, 'rgba(244,241,234,.28)')}
      {f >= Q.pre - 2 && row(y + 370, Q.pre, 'TAX AFTER BASIC PERSONAL AMOUNT', money(tax), tax * sc * 4, 0, T.red)}
      {f >= Q.dtc - 2 && row(y + 470, Q.dtc, 'DIVIDEND TAX CREDIT 15.0198%', `−${money(X.dtc)}`, X.dtc * sc * 4, 0, GREEN, GREEN)}
      {f >= Q.zero && <Stamp f={f} at={Q.zero} text="FEDERAL TAX $0" x={600} y={y + 6} size={34} color={GREEN} rotate={-5} />}
    </div>
  );
};

// ---------- reveal: salary vs dividends ----------
const Versus = ({ f }: { f: number }) => {
  const a = B.reveal.s, b = B.action.s;
  if (f < a || f > b + 12) return null;
  const y = L.versus.y, s1 = outExpo((f - a - 6) / 16), s2 = outExpo((f - Q.sal) / 16);
  const card = (x: number, name: string, val: number, c: string, k: number) => (
    <div style={{ position: 'absolute', left: x, top: y + 60, width: 400, height: 300, borderRadius: 24, ...glass, border: `2px solid ${c}`, opacity: clamp(k * 1.4), transform: `translateY(${(1 - k) * 40}px)` }}>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 30, textAlign: 'center', ...label(T.white), fontSize: 22 }}>{name}</div>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 70, textAlign: 'center', fontFamily: T.font, fontSize: 40, fontWeight: 900, color: T.gold }}>{money(X.div)}</div>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 140, textAlign: 'center', ...label(T.soft), fontSize: 16 }}>FEDERAL TAX</div>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 168, textAlign: 'center', fontFamily: T.font, fontSize: 84, fontWeight: 900, color: c, textShadow }}>{money(val)}</div>
    </div>
  );
  return (
    <div style={{ opacity: ease(f, a, a + 10) * (1 - ease(f, b - 2, b + 12)) }}>
      <div style={{ position: 'absolute', left: 56, top: y - 20, width: 968, height: 520, borderRadius: 28, ...glass }} />
      <div style={{ position: 'absolute', left: 90, top: y + 4, ...label(T.gold) }}>SAME {money(X.div)} · {DATA.tax_year} · FEDERAL</div>
      {card(100, 'AS ELIGIBLE DIVIDENDS', X.fed, GREEN, s1)}
      {card(580, 'AS A SALARY', X.salary_fed, T.red, s2)}
      <div style={{ position: 'absolute', left: 90, right: 90, top: y + 390, textAlign: 'center', fontFamily: T.font, fontSize: 24, fontWeight: 800, color: T.soft, lineHeight: 1.3, opacity: ease(f, Q.prov - 4, Q.prov + 8) }}>
        the credit reflects tax the company already paid · provinces have their own rates and credits
      </div>
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
        <div style={{ position: 'absolute', left: 36, top: 66, right: 36, fontFamily: T.font, fontSize: 32, fontWeight: 900, lineHeight: 1.15, color: T.white, opacity: ease(f, Q.chk - 4, Q.chk + 6) }}>
          Salary, interest, eligible dividends: same dollars, different tax
        </div>
      </div>
      <div style={{ position: 'absolute', left: 0, top: 240, display: 'flex', alignItems: 'center', gap: 18, opacity: ease(f, Q.next - 4, Q.next + 8) }}>
        <Flag f={f} w={90} amp={0.06} />
        <div style={{ display: 'inline-flex', padding: '16px 28px', borderRadius: 999, background: `linear-gradient(160deg,${T.goldHi},${T.gold} 50%,${T.goldDeep})`, color: '#1d1503', fontFamily: T.font, fontSize: 28, fontWeight: 900,
          transform: `scale(${1 + 0.03 * Math.sin((f - a) / 6)})` }}>NEXT: KEEP MORE OAS →</div>
      </div>
      <div style={{ position: 'absolute', left: 0, top: 330, fontFamily: T.font, fontSize: 26, fontWeight: 700, color: T.white, textShadow, opacity: ease(f, Q.follow, Q.follow + 10) }}>Follow so you don't miss it</div>
      <div style={{ position: 'absolute', left: -10, top: 380, width: 900, padding: '14px 18px', borderRadius: 14, background: 'rgba(10,16,28,.84)', fontFamily: T.font, fontSize: 18, fontWeight: 600, color: T.mute, lineHeight: 1.45, opacity: ease(f, a + 6, a + 20) }}>
        Source: canada.ca (CRA) line 40425 dividend tax credit (38% gross-up, 15.0198%); T4127 {DATA.tax_year} rates · federal only, no other income · example · general info, not advice
      </div>
    </div>
  );
};

const Header = ({ f }: { f: number }) => (
  <div style={{ position: 'absolute', left: 80, top: 92, right: 80, display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: T.white, fontSize: 22, fontWeight: 800, letterSpacing: 4, fontFamily: T.font }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}><Flag f={f} w={72} />TAX SECRETS CANADA</div>
    <div style={{ color: T.gold, letterSpacing: 5 }}>DIVIDENDS · {DATA.tax_year}</div>
  </div>
);

export const N1V3 = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: T.navy, fontFamily: T.font, overflow: 'hidden' }}>
      <SceneCuts f={f} cuts={CUTS} scene={(i) => i === 0 ? (
        <PhotoPlate f={f} src="plates/n1-s1-4k.jpg" iw={PW} ih={PH} keys={K1} glide={40} blur={0.8 + 4 * (1 - ease(f, 0, 20))} snow={[{ u0: 0.5, v0: 0.0, u1: 1.0, v1: 0.3 }]} />
      ) : i === 1 ? (
        <PhotoPlate f={f} src="plates/n1-s2-4k.jpg" iw={PW} ih={PH} keys={K2} glide={50} blur={0.8} snow={[{ u0: 0.0, v0: 0.0, u1: 1.0, v1: 0.5 }]} />
      ) : (
        <PhotoPlate f={f} src="plates/n1-s3-4k.jpg" iw={PW} ih={PH} keys={K3} glide={40} blur={0.8} steam={{ u: 0.3, v: 0.7, w: 0.03 }} />
      )} />
      <Depth f={f} seed={f < B.c2.s ? 50 : f < B.reveal.s ? 51 : 52} warm={0.6} />
      <NavyGrade low={f >= B.action.s ? 1.2 : 1} />
      <Header f={f} />
      <Typed f={f} caps={CAPS} head={T.font} />
      {f < B.c1.s + 20 && <Hook f={f} />}
      <Flow f={f} />
      <Versus f={f} />
      <End f={f} />
      <Captions f={f} fps={N1FPS} beats={WORDS.beats as never} from={B.c1.s} until={B.action.s} y={1296} />
    </AbsoluteFill>
  );
};
