// M10 "Sam's tuition, Alex's refund" — investigation format, motion engine v1 (2026-11-04). Checklist: channel/REEL-CHECKLIST.md.
// Variety vs M29 / R4 / R3: hook = two chips (SAM PAID TUITION → ALEX GOT THE REFUND) joined by a drawn gold arc and a +$725
// counter; main visual = a transfer pipe: Sam's $8,000 tuition tank, "Sam's tax $0" gauge, a $5,000 valve, $5,000 flowing into
// Alex's line-32600 box → −$725; re-hook = "ALEX +$725" stamp (≈60 %); reveal = Sam's $3,000 carry-forward locked
// ("Sam only") + three chips for the other transferable amounts (age, pension, disability); end = check card + next pill.
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { PhotoPlate, SceneCuts, type Focus } from './Plate';
import { Flag } from './RaiseShort';
import { Typed, beatsFrom, type Cap } from './Kit';
import TL from './m10-timeline.json';
import WORDS from './m10-words.json';
import CUE from './m10-cues.json';
import DATA from '../../m10/data.json';
import REEL from '../../m10/reel.json';
import { T, goldFill, textShadow } from './motion/brand';
import { Captions, Depth, Kinetic, NavyGrade, Stamp, clamp, ease, money, outBack, outExpo } from './motion/Reel';

export const M10FPS = 24;
const B = beatsFrom(TL, M10FPS);
export const M10DUR = Math.ceil((TL.total + REEL.hold_after_vo) * M10FPS);
const Q = Object.fromEntries(Object.entries(CUE).map(([k, v]) => [k, Math.round((v as number) * M10FPS)])) as Record<string, number>;
const X = DATA.example;
const GREEN = T.green;
const PW = 2294, PH = 4096;
const CUTS = [B.c2.s, B.reveal.s];
const L = Object.fromEntries(Object.entries(REEL.layout).map(([k, v]) => [k, { x: v.box[0], y: v.box[1], w: v.box[2], h: v.box[3] }])) as Record<string, { x: number; y: number; w: number; h: number }>;
const K1: Focus[] = [{ f: 0, u: 0.5, v: 0.3, k: 1.14 }, { f: B.c1.s, u: 0.45, v: 0.28, k: 1.22 }];
const K2: Focus[] = [{ f: 0, u: 0.5, v: 0.32, k: 1.2 }, { f: B.c4.s, u: 0.55, v: 0.3, k: 1.12 }];
const K3: Focus[] = [{ f: 0, u: 0.5, v: 0.34, k: 1.2 }, { f: B.action.s, u: 0.5, v: 0.3, k: 1.08 }];
const CAPS: Cap[] = [
  { at: B.c1.s, l1: 'THE STUDENT', l2: `Sam · ${money(X.tuition)} tuition · ${money(X.income)} income`, until: B.c2.s - 2 },
  { at: B.c2.s, l1: "SAM'S RETURN", l2: `under the ${DATA.tax_year} basic personal amount`, until: B.c3.s - 2 },
  { at: B.c3.s, l1: 'THE RULE', l2: `up to ${money(X.cap)} of this year's tuition`, until: B.c4.s - 2 },
  { at: B.c4.s, l1: "ALEX'S RETURN", l2: 'line 32600 · Schedule 2', until: B.reveal.s - 2 },
  { at: B.reveal.s, l1: 'THE TWIST', l2: 'what stays with Sam', until: B.action.s - 2 },
];
const glass = { background: 'linear-gradient(160deg, rgba(10,16,28,.86), rgba(10,16,28,.62))', border: `1px solid ${T.glassEdge}` };
const label = (c: string) => ({ fontFamily: T.font, fontSize: 18, fontWeight: 900, letterSpacing: 4, color: c });

const Chip = ({ x, y, title, sub, c, o }: { x: number; y: number; title: string; sub: string; c: string; o: number }) => (
  <div style={{ position: 'absolute', left: x, top: y, width: 380, height: 150, borderRadius: 24, ...glass, border: `2px solid ${c}`, opacity: o, padding: '24px 28px', boxSizing: 'border-box' }}>
    <div style={{ ...label(c), fontSize: 18 }}>{title}</div>
    <div style={{ fontFamily: T.font, fontSize: 44, fontWeight: 900, color: T.white, marginTop: 10 }}>{sub}</div>
  </div>
);
const Hook = ({ f }: { f: number }) => {
  const p = outExpo((f - Q.h725 + 6) / 20), arc = ease(f, 6, Q.h725);
  return (
    <div style={{ opacity: 1 - ease(f, B.c1.s - 6, B.c1.s + 8) }}>
      <Kinetic f={f} at={0} now text={REEL.hook.l1} x={80} y={440} size={70} nowrap />
      <Kinetic f={f} at={0} now text={REEL.hook.l2} x={80} y={524} size={70} nowrap color={T.gold} />
      <Chip x={80} y={700} title="SAM PAID" sub="TUITION" c={T.soft} o={ease(f, 2, 12)} />
      <Chip x={620} y={700} title="ALEX GOT" sub="THE REFUND" c={GREEN} o={ease(f, 10, 20)} />
      <svg style={{ position: 'absolute', left: 0, top: 0 }} width={1080} height={1920}>
        <path d="M 300 860 Q 540 1060 800 860" fill="none" stroke={T.gold} strokeWidth={6} strokeDasharray="520" strokeDashoffset={520 * (1 - arc)} />
      </svg>
      <div style={{ position: 'absolute', left: 80, top: 1000, width: 920, textAlign: 'center', fontFamily: T.font, fontSize: 130, fontWeight: 900, ...goldFill, opacity: clamp(p), transform: `scale(${0.8 + 0.2 * clamp(p)})` }}>+{money(X.credit)}</div>
    </div>
  );
};

// ---------- the transfer pipe: Sam's tuition → Alex's return ----------
const Pipe = ({ f }: { f: number }) => {
  const a = B.c1.s + 2, b = B.reveal.s;
  if (f < a - 1 || f > b + 14) return null;
  const y = L.pipe.y, H = 360, tankTop = y + 130;
  const tu = outExpo((f - Q.tu) / 18), z = ease(f, Q.zero - 2, Q.zero + 8), cap = ease(f, Q.cap - 2, Q.cap + 10), flow = outExpo((f - Q.flow) / 30);
  const fullH = H * tu, moved = (H * X.cap) / X.tuition * flow;
  return (
    <div style={{ opacity: outExpo((f - a) / 14) * (1 - ease(f, b - 2, b + 12)) }}>
      <div style={{ position: 'absolute', left: 56, top: y - 20, width: 968, height: 640, borderRadius: 28, ...glass }} />
      <div style={{ position: 'absolute', left: 90, top: y, ...label(T.mute) }}>CURRENT-YEAR TUITION · {DATA.tax_year} · FEDERAL</div>
      {/* Sam's tank */}
      <div style={{ position: 'absolute', left: 110, top: tankTop - 50, width: 240, textAlign: 'center', ...label(T.white), fontSize: 20 }}>SAM · TUITION</div>
      <div style={{ position: 'absolute', left: 140, top: tankTop, width: 180, height: H, borderRadius: 20, border: `2px solid ${T.glassEdge}`, overflow: 'hidden', background: 'rgba(255,255,255,.04)' }}>
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: fullH - moved, background: `linear-gradient(180deg, ${T.gold}, ${T.goldDeep})` }} />
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 10, textAlign: 'center', fontFamily: T.font, fontSize: 34, fontWeight: 900, color: '#1d1503', opacity: tu }}>{money(Math.round(X.tuition - X.cap * flow))}</div>
      </div>
      {/* Sam's tax gauge */}
      <div style={{ position: 'absolute', left: 90, top: tankTop + H + 18, width: 300, opacity: ease(f, Q.inc - 2, Q.inc + 8) }}>
        <div style={{ ...label(T.soft), fontSize: 15 }}>INCOME {money(X.income)} &lt; BPA {money(X.bpa)}</div>
        <div style={{ fontFamily: T.font, fontSize: 30, fontWeight: 900, color: z > 0.5 ? T.red : T.white, opacity: 0.4 + 0.6 * z }}>SAM'S TAX: $0</div>
      </div>
      {/* pipe + valve */}
      <div style={{ position: 'absolute', left: 320, top: tankTop + 150, width: 300, height: 34, borderRadius: 17, background: 'rgba(160,176,200,.25)', border: `2px solid ${T.glassEdge}`, opacity: cap }} />
      <div style={{ position: 'absolute', left: 320, top: tankTop + 156, width: 300 * flow, height: 22, borderRadius: 11, background: GREEN, opacity: cap }} />
      <div style={{ position: 'absolute', left: 380, top: tankTop + 60, width: 180, textAlign: 'center', opacity: cap }}>
        <div style={{ ...label(T.gold), fontSize: 15 }}>MAX TRANSFER</div>
        <div style={{ fontFamily: T.font, fontSize: 36, fontWeight: 900, color: T.gold }}>{money(X.cap)}</div>
      </div>
      <div style={{ position: 'absolute', left: 350, top: tankTop + 200, width: 240, textAlign: 'center', ...label(T.soft), fontSize: 14, lineHeight: 1.4, opacity: ease(f, Q.minus - 2, Q.minus + 8) }}>MINUS WHAT SAM NEEDS<br /><span style={{ color: GREEN, fontSize: 18 }}>{f >= Q.none ? 'SAM NEEDS $0' : ''}</span></div>
      {/* Alex's return */}
      <div style={{ position: 'absolute', left: 620, top: tankTop - 50, width: 340, textAlign: 'center', ...label(T.white), fontSize: 20, opacity: cap }}>ALEX · LINE 32600</div>
      <div style={{ position: 'absolute', left: 640, top: tankTop, width: 300, height: H, borderRadius: 20, border: `2px solid ${GREEN}`, background: 'rgba(127,224,168,.06)', opacity: cap, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontFamily: T.font, fontSize: 48, fontWeight: 900, color: T.white, opacity: flow }}>{money(Math.round(X.cap * flow / 100) * 100)}</div>
        <div style={{ ...label(T.soft), fontSize: 16, marginTop: 8, opacity: flow }}>× 14.5%</div>
        <div style={{ fontFamily: T.font, fontSize: 56, fontWeight: 900, color: GREEN, marginTop: 10, opacity: ease(f, Q.cr - 2, Q.cr + 8) }}>−{money(X.credit)}</div>
        <div style={{ ...label(T.soft), fontSize: 14, opacity: ease(f, Q.cr - 2, Q.cr + 8) }}>OFF ALEX'S FEDERAL TAX</div>
      </div>
      {f >= Q.cr + 10 && <Stamp f={f} at={Q.cr + 10} text={`ALEX +${money(X.credit)}`} x={620} y={y + 520} size={30} color={GREEN} rotate={-5} />}
    </div>
  );
};

// ---------- reveal: what stays locked with Sam, what else can move ----------
const Lock = ({ f }: { f: number }) => {
  const a = B.reveal.s, b = B.action.s;
  if (f < a || f > b + 12) return null;
  const y = L.lock.y, t = ease(f, Q.three - 2, Q.three + 8), n = ease(f, Q.never - 2, Q.never + 8), o = outExpo((f - Q.others) / 18);
  return (
    <div style={{ opacity: ease(f, a, a + 10) * (1 - ease(f, b - 2, b + 12)) }}>
      <div style={{ position: 'absolute', left: 56, top: y - 20, width: 968, height: 520, borderRadius: 28, ...glass }} />
      <div style={{ position: 'absolute', left: 90, top: y + 4, ...label(T.gold) }}>ONLY THIS YEAR'S UNUSED AMOUNTS CAN MOVE</div>
      <div style={{ position: 'absolute', left: 90, top: y + 60, width: 900, height: 150, borderRadius: 22, border: `2px solid ${T.amber}`, background: 'rgba(255,181,71,.08)', opacity: t }}>
        <div style={{ position: 'absolute', left: 30, top: 26, ...label(T.amber), fontSize: 18 }}>SAM'S CARRY-FORWARD</div>
        <div style={{ position: 'absolute', left: 30, top: 58, fontFamily: T.font, fontSize: 64, fontWeight: 900, color: T.white }}>{money(X.carry)}</div>
        <div style={{ position: 'absolute', right: 30, top: 44, fontFamily: T.font, fontSize: 30, fontWeight: 900, color: T.red, opacity: n, textAlign: 'right', lineHeight: 1.2 }}>🔒 SAM ONLY<br /><span style={{ fontSize: 20, color: T.soft }}>never transferable later</span></div>
      </div>
      <div style={{ position: 'absolute', left: 90, top: y + 240, ...label(T.soft), fontSize: 18, opacity: o }}>ALSO TRANSFERABLE TO A SPOUSE IF UNUSED:</div>
      {['AGE AMOUNT', 'PENSION AMOUNT', 'DISABILITY AMOUNT'].map((s, i) => (
        <div key={s} style={{ position: 'absolute', left: 90 + i * 300, top: y + 285, width: 280, height: 80, borderRadius: 16, border: `2px solid ${GREEN}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: T.font, fontSize: 22, fontWeight: 900, color: T.white, opacity: clamp(o * 3 - i), transform: `translateY(${20 * (1 - clamp(o * 3 - i))}px)` }}>✓ {s}</div>
      ))}
      <div style={{ position: 'absolute', left: 90, top: y + 395, fontFamily: T.font, fontSize: 20, fontWeight: 700, color: T.mute, opacity: o }}>Schedule 2 · line 32600 · only what the partner didn't need to bring their own tax to $0</div>
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
        <div style={{ position: 'absolute', left: 36, top: 26, ...label(T.gold) }}>LOWER INCOME FIRST</div>
        <div style={{ position: 'absolute', left: 36, top: 66, right: 36, fontFamily: T.font, fontSize: 32, fontWeight: 900, lineHeight: 1.15, color: T.white, opacity: ease(f, Q.first - 4, Q.first + 6) }}>
          File the lower-income return first, then transfer what it didn’t need (Schedule 2)
        </div>
      </div>
      <div style={{ position: 'absolute', left: 0, top: 240, display: 'flex', alignItems: 'center', gap: 18, opacity: ease(f, Q.next - 4, Q.next + 8) }}>
        <Flag f={f} w={90} amp={0.06} />
        <div style={{ display: 'inline-flex', padding: '16px 28px', borderRadius: 999, background: `linear-gradient(160deg,${T.goldHi},${T.gold} 50%,${T.goldDeep})`, color: '#1d1503', fontFamily: T.font, fontSize: 28, fontWeight: 900,
          transform: `scale(${1 + 0.03 * Math.sin((f - a) / 6)})` }}>NEXT: WHO GETS THE CCB →</div>
      </div>
      <div style={{ position: 'absolute', left: 0, top: 330, fontFamily: T.font, fontSize: 26, fontWeight: 700, color: T.white, textShadow, opacity: ease(f, Q.follow, Q.follow + 10) }}>Follow so you don't miss it</div>
      <div style={{ position: 'absolute', left: -10, top: 380, width: 900, padding: '14px 18px', borderRadius: 14, background: 'rgba(10,16,28,.84)', fontFamily: T.font, fontSize: 18, fontWeight: 600, color: T.mute, lineHeight: 1.45, opacity: ease(f, a + 6, a + 20) }}>
        Source: canada.ca (CRA) line 32600, Schedule 2; tuition transfer rules · {DATA.tax_year} federal 14.5% · example · general info, not advice
      </div>
    </div>
  );
};

const Header = ({ f }: { f: number }) => (
  <div style={{ position: 'absolute', left: 80, top: 92, right: 80, display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: T.white, fontSize: 22, fontWeight: 800, letterSpacing: 4, fontFamily: T.font }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}><Flag f={f} w={72} />TAX SECRETS CANADA</div>
    <div style={{ color: T.gold, letterSpacing: 5 }}>SPOUSES · {DATA.tax_year}</div>
  </div>
);

export const M10V3 = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: T.navy, fontFamily: T.font, overflow: 'hidden' }}>
      <SceneCuts f={f} cuts={CUTS} scene={(i) => i === 0 ? (
        <PhotoPlate f={f} src="plates/m10-s1-4k.jpg" iw={PW} ih={PH} keys={K1} glide={40} blur={0.8 + 4 * (1 - ease(f, 0, 20))} snow={[{ u0: 0.5, v0: 0.0, u1: 1.0, v1: 0.45 }]} steam={{ u: 0.1, v: 0.78, w: 0.03 }} />
      ) : i === 1 ? (
        <PhotoPlate f={f} src="plates/m10-s2-4k.jpg" iw={PW} ih={PH} keys={K2} glide={50} blur={0.8} snow={[{ u0: 0.0, v0: 0.0, u1: 1.0, v1: 0.6 }]} />
      ) : (
        <PhotoPlate f={f} src="plates/m10-s3-4k.jpg" iw={PW} ih={PH} keys={K3} glide={40} blur={0.8} snow={[{ u0: 0.6, v0: 0.0, u1: 1.0, v1: 0.45 }]} steam={{ u: 0.56, v: 0.78, w: 0.03 }} />
      )} />
      <Depth f={f} seed={f < B.c2.s ? 50 : f < B.reveal.s ? 51 : 52} warm={0.6} />
      <NavyGrade low={f >= B.action.s ? 1.2 : 1} />
      <Header f={f} />
      <Typed f={f} caps={CAPS} head={T.font} />
      {f < B.c1.s + 20 && <Hook f={f} />}
      <Pipe f={f} />
      <Lock f={f} />
      <End f={f} />
      <Captions f={f} fps={M10FPS} beats={WORDS.beats as never} from={B.c1.s} until={B.action.s} y={1296} />
    </AbsoluteFill>
  );
};
