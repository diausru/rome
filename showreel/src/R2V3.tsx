// R2 "Canada caregiver amount: same care, $1,247 or $0" — investigation format, motion engine v1 (2026-10-25).
// Variety vs R1 / R5 / D4: hook = two year cards ($1,247 vs $0); main visual = a phase-out ramp chart where mom's
// net-income marker slides right and the claimable amount drops; reveal = one $8,601 bar split between two
// supporters; end = one check card + next pill. Numbers come from r2/data.json.
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { PhotoPlate, SceneCuts, type Focus } from './Plate';
import { Flag } from './RaiseShort';
import { Typed, beatsFrom, type Cap } from './Kit';
import TL from './r2-timeline.json';
import WORDS from './r2-words.json';
import CUE from './r2-cues.json';
import DATA from '../../r2/data.json';
import REEL from '../../r2/reel.json';
import { T, goldFill, textShadow } from './motion/brand';
import { Captions, Depth, Kinetic, NavyGrade, Stamp, clamp, ease, money, outBack, outExpo } from './motion/Reel';

export const R2FPS = 24;
const B = beatsFrom(TL, R2FPS);
export const R2DUR = Math.ceil((TL.total + REEL.hold_after_vo) * R2FPS);
const Q = Object.fromEntries(Object.entries(CUE).map(([k, v]) => [k, Math.round((v as number) * R2FPS)])) as Record<string, number>;
const X = DATA.example;
const GREEN = T.green, RED = T.redSoft;
const PW = 2294, PH = 4096;
const CUTS = [B.c3.s, B.reveal.s];
const L = Object.fromEntries(Object.entries(REEL.layout).map(([k, v]) => [k, { x: v.box[0], y: v.box[1], w: v.box[2], h: v.box[3] }])) as Record<string, { x: number; y: number; w: number; h: number }>;
const K1: Focus[] = [{ f: 0, u: 0.5, v: 0.3, k: 1.14 }, { f: B.c1.s, u: 0.4, v: 0.28, k: 1.22 }, { f: B.c2.s, u: 0.6, v: 0.3, k: 1.18 }];
const K2: Focus[] = [{ f: 0, u: 0.5, v: 0.35, k: 1.2 }, { f: Q.gone, u: 0.5, v: 0.3, k: 1.1 }];
const K3: Focus[] = [{ f: 0, u: 0.45, v: 0.32, k: 1.2 }, { f: B.action.s, u: 0.5, v: 0.3, k: 1.08 }];
const CAPS: Cap[] = [
  { at: B.c1.s, l1: "MOM'S INCOME $18,000", l2: 'the full amount', until: B.c2.s - 2 },
  { at: B.c2.s, l1: "MOM'S INCOME $24,000", l2: 'dollar-for-dollar cut', until: B.c3.s - 2 },
  { at: B.c3.s, l1: "MOM'S INCOME $30,000", l2: 'past the cut-off', until: B.reveal.s - 2 },
  { at: B.reveal.s, l1: 'THE TWIST', l2: "her income, not yours", until: B.action.s - 2 },
];
const glass = { background: 'linear-gradient(160deg, rgba(10,16,28,.86), rgba(10,16,28,.62))', border: `1px solid ${T.glassEdge}` };
const label = (c: string) => ({ fontFamily: T.font, fontSize: 18, fontWeight: 900, letterSpacing: 4, color: c });

const Hook = ({ f }: { f: number }) => {
  const o = ease(f, B.c1.s - 6, B.c1.s + 8);
  const card = (x: number, at: number, top: string, val: string, c: string) => {
    const p = outBack((f - at) / 14);
    return (
      <div style={{ position: 'absolute', left: x, top: 720, width: 400, height: 300, borderRadius: 24, ...glass, opacity: clamp(p), transform: `scale(${clamp(p, 0.7, 1.04)})` }}>
        <div style={{ position: 'absolute', left: 30, top: 28, ...label(T.soft) }}>{top}</div>
        <div style={{ position: 'absolute', left: 30, top: 80, fontFamily: T.font, fontSize: 92, fontWeight: 900, color: c, textShadow }}>{val}</div>
        <div style={{ position: 'absolute', left: 30, top: 210, fontFamily: T.font, fontSize: 22, fontWeight: 800, color: T.white }}>caregiver credit</div>
      </div>
    );
  };
  return (
    <div style={{ opacity: 1 - o }}>
      <Kinetic f={f} at={0} now text={REEL.hook.l1} x={80} y={440} size={70} nowrap />
      <Kinetic f={f} at={0} now text={REEL.hook.l2} x={80} y={524} size={70} nowrap color={T.gold} />
      {card(80, Math.min(Q.twelve - 4, 8), 'ONE YEAR', money(X.credit_a), GREEN)}
      {card(600, Q.zero - 4, 'THE NEXT', '$0', RED)}
      {f >= Q.income0 && <div style={{ position: 'absolute', left: 80, width: 920, top: 1080, textAlign: 'center', fontFamily: T.font, fontSize: 44, fontWeight: 900, color: T.white, textShadow,
        opacity: ease(f, Q.income0 - 4, Q.income0 + 6) }}>THE DIFFERENCE: <span style={{ ...goldFill }}>MOM'S INCOME</span></div>}
    </div>
  );
};

// ---------- the phase-out ramp ----------
const XMAX = 32000, CW = 820, CH = 360;
const Ramp = ({ f }: { f: number }) => {
  const a = B.c1.s + 2, b = B.reveal.s;
  if (f < a - 1 || f > b + 14) return null;
  const o = ease(f, b - 2, b + 12), y = L.meter.y, x0 = 130, y0 = y + 120;
  const px = (v: number) => x0 + (CW * v) / XMAX, py = (amt: number) => y0 + CH - (CH * amt) / (X.max * 1.15);
  const amtOf = (inc: number) => Math.max(0, X.max - Math.max(0, inc - X.threshold));
  const inc = f < Q.inc_b ? X.inc_a : f < B.c3.s ? X.inc_a + (X.inc_b - X.inc_a) * outExpo((f - Q.inc_b) / 24) : X.inc_b + (X.inc_c - X.inc_b) * outExpo((f - B.c3.s - 4) / 24);
  const draw = outExpo((f - a) / 30);
  const pts = [[0, X.max], [X.threshold, X.max], [X.zero_at, 0], [XMAX, 0]].map(([v, m]) => `${px(v)},${py(m)}`).join(' ');
  const credit = inc <= X.inc_a + 1 ? X.credit_a : f < B.c3.s ? (f >= Q.cr_b ? X.credit_b : null) : f >= Q.gone ? 0 : null;
  return (
    <div style={{ opacity: outExpo((f - a) / 14) * (1 - o) }}>
      <div style={{ position: 'absolute', left: 56, top: y - 20, width: 968, height: 640, borderRadius: 28, ...glass }} />
      <div style={{ position: 'absolute', left: 90, top: y, ...label(T.mute) }}>CAREGIVER AMOUNT · FEDERAL · {DATA.tax_year}</div>
      <svg width={1080} height={700} style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }}>
        <line x1={x0} y1={y0 + CH} x2={x0 + CW} y2={y0 + CH} stroke="rgba(255,255,255,.35)" strokeWidth={2} />
        <polyline points={pts} fill="none" stroke={T.gold} strokeWidth={6} strokeDasharray="2400" strokeDashoffset={2400 * (1 - draw)} />
        <line x1={px(inc)} y1={y0 - 10} x2={px(inc)} y2={y0 + CH} stroke={T.white} strokeWidth={3} strokeDasharray="8 8" opacity={ease(f, Q.inc_a - 4, Q.inc_a + 6)} />
        <circle cx={px(inc)} cy={py(amtOf(inc))} r={14} fill={amtOf(inc) > 0 ? GREEN : RED} opacity={ease(f, Q.inc_a - 4, Q.inc_a + 6)} />
      </svg>
      <div style={{ position: 'absolute', left: x0, top: y0 + CH + 12, fontFamily: T.font, fontSize: 17, fontWeight: 800, color: T.soft }}>$0</div>
      <div style={{ position: 'absolute', left: px(X.threshold) - 60, top: y0 + CH + 12, width: 120, textAlign: 'center', fontFamily: T.font, fontSize: 17, fontWeight: 800, color: T.gold, opacity: ease(f, Q.shrink - 4, Q.shrink + 6) }}>{money(X.threshold)}</div>
      <div style={{ position: 'absolute', left: px(X.zero_at) - 60, top: y0 + CH + 12, width: 120, textAlign: 'center', fontFamily: T.font, fontSize: 17, fontWeight: 800, color: RED, opacity: ease(f, Q.shrink, Q.shrink + 10) }}>{money(X.zero_at)}</div>
      <div style={{ position: 'absolute', left: x0, top: y0 + CH + 40, fontFamily: T.font, fontSize: 16, fontWeight: 700, color: T.mute }}>mom's net income →</div>
      <div style={{ position: 'absolute', left: x0, top: py(X.max) - 44, fontFamily: T.font, fontSize: 20, fontWeight: 900, color: T.white, opacity: ease(f, Q.max - 4, Q.max + 6) }}>max {money(X.max)}</div>
      <div style={{ position: 'absolute', left: px(inc) - 90, top: y + 40, width: 180, textAlign: 'center', fontFamily: T.font, fontSize: 30, fontWeight: 900, color: T.white, opacity: ease(f, Q.inc_a - 4, Q.inc_a + 6) }}>{money(Math.round(inc / 100) * 100)}</div>
      {credit !== null && (
        <div style={{ position: 'absolute', left: 640, top: y0 + 40, width: 340, textAlign: 'right', opacity: ease(f, (credit === X.credit_a ? Q.cr_a : credit === 0 ? Q.gone : Q.cr_b) - 2, (credit === X.credit_a ? Q.cr_a : credit === 0 ? Q.gone : Q.cr_b) + 8) }}>
          <div style={{ ...label(credit ? GREEN : RED), fontSize: 15 }}>OFF PRIYA'S FEDERAL TAX</div>
          <div style={{ fontFamily: T.font, fontSize: 64, fontWeight: 900, color: credit ? GREEN : RED }}>{money(credit)}</div>
          {credit === X.credit_b && <div style={{ fontFamily: T.font, fontSize: 15, fontWeight: 700, color: T.soft }}>{money(X.amt_b)} × 14.5%</div>}
          {credit === X.credit_a && <div style={{ fontFamily: T.font, fontSize: 15, fontWeight: 700, color: T.soft }}>{money(X.max)} × 14.5%</div>}
        </div>
      )}
      {f >= Q.gone && <Stamp f={f} at={Q.gone} text="OAS + CPP COUNT" x={560} y={y + 330} size={26} color={T.red} rotate={-5} />}
    </div>
  );
};

// ---------- reveal: one maximum, two supporters ----------
const Split = ({ f }: { f: number }) => {
  const a = B.reveal.s, b = B.action.s;
  if (f < a || f > b + 12) return null;
  const y = L.split.y, s = outExpo((f - Q.brother) / 20);
  const W = 860, pw = W * (1 - 0.4 * s);
  return (
    <div style={{ opacity: ease(f, a, a + 10) * (1 - ease(f, b - 2, b + 12)) }}>
      <div style={{ position: 'absolute', left: 56, top: y - 20, width: 968, height: 470, borderRadius: 28, ...glass }} />
      <div style={{ position: 'absolute', left: 90, top: y + 4, ...label(T.gold) }}>WHOSE INCOME COUNTS?</div>
      <div style={{ position: 'absolute', left: 90, top: y + 44, right: 90, fontFamily: T.font, fontSize: 34, fontWeight: 900, color: T.white, opacity: ease(f, Q.follows - 4, Q.follows + 6) }}>
        Mom's net income <span style={{ color: GREEN }}>✓</span> · Priya's income <span style={{ color: RED }}>✕</span>
      </div>
      <div style={{ position: 'absolute', left: 110, top: y + 190, width: W, height: 90, borderRadius: 16, border: `2px dashed ${T.gold}`, opacity: ease(f, Q.brother - 4, Q.brother + 6) }} />
      <div style={{ position: 'absolute', left: 110, top: y + 190, width: pw, height: 90, borderRadius: 16, background: `linear-gradient(90deg, ${T.goldDeep}, ${T.gold})`, display: 'flex', alignItems: 'center', paddingLeft: 24,
        fontFamily: T.font, fontSize: 28, fontWeight: 900, color: '#1d1503', opacity: ease(f, Q.brother - 4, Q.brother + 6) }}>PRIYA</div>
      {s > 0.05 && <div style={{ position: 'absolute', left: 110 + pw + 8, top: y + 190, width: W - pw - 8, height: 90, borderRadius: 16, background: 'rgba(160,176,200,.7)', display: 'flex', alignItems: 'center', paddingLeft: 20,
        fontFamily: T.font, fontSize: 26, fontWeight: 900, color: '#0b1220' }}>BROTHER</div>}
      <div style={{ position: 'absolute', left: 110, top: y + 300, width: W, textAlign: 'center', fontFamily: T.font, fontSize: 28, fontWeight: 900, color: T.white, opacity: ease(f, Q.onemax - 4, Q.onemax + 6) }}>
        together never above <span style={{ ...goldFill }}>{money(X.max)}</span>
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
        <div style={{ position: 'absolute', left: 36, top: 26, ...label(T.gold) }}>CHECK FIRST</div>
        <div style={{ position: 'absolute', left: 36, top: 66, right: 36, fontFamily: T.font, fontSize: 32, fontWeight: 900, lineHeight: 1.15, color: T.white, opacity: ease(f, Q.check - 4, Q.check + 6) }}>
          Mom's net income (line 23600): full under {money(X.threshold)}, none from {money(X.zero_at)}
        </div>
      </div>
      <div style={{ position: 'absolute', left: 0, top: 240, display: 'flex', alignItems: 'center', gap: 18, opacity: ease(f, Q.next - 4, Q.next + 8) }}>
        <Flag f={f} w={90} amp={0.06} />
        <div style={{ display: 'inline-flex', padding: '16px 28px', borderRadius: 999, background: `linear-gradient(160deg,${T.goldHi},${T.gold} 50%,${T.goldDeep})`, color: '#1d1503', fontFamily: T.font, fontSize: 28, fontWeight: 900,
          transform: `scale(${1 + 0.03 * Math.sin((f - a) / 6)})` }}>NEXT: MEDICAL EXPENSES →</div>
      </div>
      <div style={{ position: 'absolute', left: 0, top: 330, fontFamily: T.font, fontSize: 26, fontWeight: 700, color: T.white, textShadow, opacity: ease(f, Q.follow, Q.follow + 10) }}>Follow so you don't miss it</div>
      <div style={{ position: 'absolute', left: -10, top: 380, width: 900, padding: '14px 18px', borderRadius: 14, background: 'rgba(10,16,28,.84)', fontFamily: T.font, fontSize: 18, fontWeight: 600, color: T.mute, lineHeight: 1.45, opacity: ease(f, a + 6, a + 20) }}>
        Source: canada.ca line 30450 (CRA) · {DATA.tax_year} amounts, federal only (14.5% lowest rate) · dependant must be infirm and depend on you · example family · general info, not advice
      </div>
    </div>
  );
};

const Header = ({ f }: { f: number }) => (
  <div style={{ position: 'absolute', left: 80, top: 92, right: 80, display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: T.white, fontSize: 22, fontWeight: 800, letterSpacing: 4, fontFamily: T.font }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}><Flag f={f} w={72} />TAX SECRETS CANADA</div>
    <div style={{ color: T.gold, letterSpacing: 5 }}>CAREGIVER · {DATA.tax_year}</div>
  </div>
);

export const R2V3 = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: T.navy, fontFamily: T.font, overflow: 'hidden' }}>
      <SceneCuts f={f} cuts={CUTS} scene={(i) => i === 0 ? (
        <PhotoPlate f={f} src="plates/r2-s1-4k.jpg" iw={PW} ih={PH} keys={K1} glide={40} blur={0.8 + 4 * (1 - ease(f, 0, 20))} steam={{ u: 0.3, v: 0.62, w: 0.03 }} snow={[{ u0: 0.5, v0: 0.0, u1: 1.0, v1: 0.3 }]} />
      ) : i === 1 ? (
        <PhotoPlate f={f} src="plates/r2-s2-4k.jpg" iw={PW} ih={PH} keys={K2} glide={50} blur={0.8} snow={[{ u0: 0.0, v0: 0.0, u1: 1.0, v1: 0.8 }]} />
      ) : (
        <PhotoPlate f={f} src="plates/r2-s3-4k.jpg" iw={PW} ih={PH} keys={K3} glide={40} blur={0.8} steam={{ u: 0.2, v: 0.7, w: 0.03 }} />
      )} />
      <Depth f={f} seed={f < B.c3.s ? 60 : f < B.reveal.s ? 61 : 62} warm={0.6} />
      <NavyGrade low={f >= B.action.s ? 1.2 : 1} />
      <Header f={f} />
      <Typed f={f} caps={CAPS} head={T.font} />
      {f < B.c1.s + 20 && <Hook f={f} />}
      <Ramp f={f} />
      <Split f={f} />
      <End f={f} />
      <Captions f={f} fps={R2FPS} beats={WORDS.beats as never} from={B.c1.s} until={B.action.s} y={1296} />
    </AbsoluteFill>
  );
};
