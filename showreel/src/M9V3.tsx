// M9 "Canada Workers Benefit: owe no tax, still get paid" — investigation format, motion engine v1 (2026-11-09). Checklist:
// channel/REEL-CHECKLIST.md. Variety vs M8 / M7 / M26: hook = TAX OWED $0 card → CRA PAYS YOU UP TO $1,633; main visual = the CWB
// "hill" over income (start $3,000, plateau $1,633, fades from $26,855 to $0 at $37,742) with Leo's $30,000 marker;
// re-hook = "−15% OF THE EXTRA" stamp (≈61 %); reveal = the CWB bar splitting, up to 50% dropping out as advance payments;
// end = check card + next pill.
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { PhotoPlate, SceneCuts, type Focus } from './Plate';
import { Flag } from './RaiseShort';
import { Typed, beatsFrom, type Cap } from './Kit';
import TL from './m9-timeline.json';
import WORDS from './m9-words.json';
import CUE from './m9-cues.json';
import DATA from '../../m9/data.json';
import REEL from '../../m9/reel.json';
import { T, goldFill, textShadow } from './motion/brand';
import { Captions, Depth, Kinetic, NavyGrade, Stamp, clamp, ease, money, outBack, outExpo } from './motion/Reel';

export const M9FPS = 24;
const B = beatsFrom(TL, M9FPS);
export const M9DUR = Math.ceil((TL.total + REEL.hold_after_vo) * M9FPS);
const Q = Object.fromEntries(Object.entries(CUE).map(([k, v]) => [k, Math.round((v as number) * M9FPS)])) as Record<string, number>;
const X = DATA.example;
const GREEN = T.green;
const PW = 2294, PH = 4096;
const CUTS = [B.c2.s, B.reveal.s];
const L = Object.fromEntries(Object.entries(REEL.layout).map(([k, v]) => [k, { x: v.box[0], y: v.box[1], w: v.box[2], h: v.box[3] }])) as Record<string, { x: number; y: number; w: number; h: number }>;
const K1: Focus[] = [{ f: 0, u: 0.5, v: 0.3, k: 1.14 }, { f: B.c1.s, u: 0.45, v: 0.28, k: 1.22 }];
const K2: Focus[] = [{ f: 0, u: 0.5, v: 0.32, k: 1.2 }, { f: B.c4.s, u: 0.55, v: 0.3, k: 1.12 }];
const K3: Focus[] = [{ f: 0, u: 0.5, v: 0.34, k: 1.2 }, { f: B.action.s, u: 0.5, v: 0.3, k: 1.08 }];
const CAPS: Cap[] = [
  { at: B.c1.s, l1: 'CANADA WORKERS BENEFIT', l2: 'refundable · low-income workers', until: B.c2.s - 2 },
  { at: B.c2.s, l1: 'HOW MUCH', l2: `${DATA.tax_year} · working income over ${money(X.min)}`, until: B.c3.s - 2 },
  { at: B.c3.s, l1: 'THE FADE', l2: `single · above ${money(X.thr)}`, until: B.c4.s - 2 },
  { at: B.c4.s, l1: "LEO'S CWB", l2: `single · ${money(X.income)} income`, until: B.reveal.s - 2 },
  { at: B.reveal.s, l1: 'THE TWIST', l2: 'you can get it early', until: B.action.s - 2 },
];
const glass = { background: 'linear-gradient(160deg, rgba(10,16,28,.86), rgba(10,16,28,.62))', border: `1px solid ${T.glassEdge}` };
const label = (c: string) => ({ fontFamily: T.font, fontSize: 18, fontWeight: 900, letterSpacing: 4, color: c });

const Hook = ({ f }: { f: number }) => {
  const z = ease(f, Q.none - 4, Q.none + 6), up = outExpo((f - Q.pay + 4) / 20);
  return (
    <div style={{ opacity: 1 - ease(f, B.c1.s - 6, B.c1.s + 8) }}>
      <Kinetic f={f} at={0} now text={REEL.hook.l1} x={80} y={440} size={70} nowrap />
      <Kinetic f={f} at={0} now text={REEL.hook.l2} x={80} y={524} size={70} nowrap color={T.gold} />
      <div style={{ position: 'absolute', left: 80, top: 700, width: 420, height: 220, borderRadius: 24, ...glass, opacity: ease(f, 2, 10) }}>
        <div style={{ position: 'absolute', left: 30, top: 28, ...label(T.soft), fontSize: 18 }}>TAX OWED</div>
        <div style={{ position: 'absolute', left: 30, top: 66, fontFamily: T.font, fontSize: 110, fontWeight: 900, color: T.white, opacity: 0.3 + 0.7 * z }}>$0</div>
      </div>
      <div style={{ position: 'absolute', left: 560, top: 700 + 120 * (1 - up), width: 440, height: 220, borderRadius: 24, ...glass, border: `2px solid ${GREEN}`, opacity: clamp(up) }}>
        <div style={{ position: 'absolute', left: 30, top: 28, ...label(GREEN), fontSize: 18 }}>CRA PAYS YOU UP TO</div>
        <div style={{ position: 'absolute', left: 30, top: 66, fontFamily: T.font, fontSize: 104, fontWeight: 900, color: GREEN }}>{money(X.single)}</div>
      </div>
      <div style={{ position: 'absolute', left: 510, top: 760, fontFamily: T.font, fontSize: 70, fontWeight: 900, color: T.gold, opacity: clamp(up) }}>→</div>
    </div>
  );
};

// ---------- the benefit "hill" over income ----------
const Hill = ({ f }: { f: number }) => {
  const a = B.c1.s + 2, b = B.reveal.s;
  if (f < a - 1 || f > b + 14) return null;
  const y = L.hill.y, x0 = 130, W = 820, gy = y + 150, H = 260;
  const ix = (v: number) => x0 + (W * v) / 40000;
  const ay = (v: number) => gy + H - (H * v) / X.single;
  const plateau = ease(f, Q.s - 4, Q.s + 8), minv = ease(f, Q.min - 4, Q.min + 8), fall = ease(f, Q.thr - 4, Q.thr + 16), leo = ease(f, Q.leo - 4, Q.leo + 10), cut = ease(f, Q.cut - 4, Q.cut + 8), res = ease(f, Q.still - 4, Q.still + 8);
  const ramp = 9048; // schematic only: where the curve reaches the plateau is drawn, not stated
  const pts = `${ix(0)},${ay(0)} ${ix(X.min)},${ay(0)} ${ix(ramp)},${ay(X.single * plateau)} ${ix(X.thr)},${ay(X.single * plateau)} ${ix(X.thr + (X.end - X.thr) * fall)},${ay(X.single * plateau * (1 - fall))} ${ix(X.thr + (X.end - X.thr) * fall)},${ay(0)}`;
  const ly = ay(X.result);
  return (
    <div style={{ opacity: outExpo((f - a) / 14) * (1 - ease(f, b - 2, b + 12)) }}>
      <div style={{ position: 'absolute', left: 56, top: y - 20, width: 968, height: 640, borderRadius: 28, ...glass }} />
      <div style={{ position: 'absolute', left: 90, top: y, ...label(T.mute) }}>CWB {DATA.tax_year} · SINGLE · BASIC AMOUNT BY INCOME</div>
      <div style={{ position: 'absolute', left: 90, top: y + 34, fontFamily: T.font, fontSize: 26, fontWeight: 800, color: T.soft, opacity: ease(f, Q.fam - 4, Q.fam + 8) }}>
        max <span style={{ color: GREEN, fontWeight: 900 }}>{money(X.single)}</span> single · <span style={{ color: GREEN, fontWeight: 900 }}>{money(X.family)}</span> family
      </div>
      <div style={{ position: 'absolute', left: 90, top: y + 70, ...label(T.gold), fontSize: 16, opacity: ease(f, Q.refund - 4, Q.refund + 8) }}>REFUNDABLE · PAID EVEN IF YOU OWE $0</div>
      <svg style={{ position: 'absolute', left: 0, top: 0 }} width={1080} height={1920}>
        <polygon points={pts} fill="rgba(127,224,168,.25)" stroke={GREEN} strokeWidth={5} opacity={plateau} />
        <line x1={ix(0)} y1={gy + H} x2={ix(40000)} y2={gy + H} stroke="rgba(255,255,255,.35)" strokeWidth={2} />
        <line x1={ix(30000)} y1={gy - 10} x2={ix(30000)} y2={gy + H} stroke={T.white} strokeWidth={3} strokeDasharray="8 8" opacity={leo} />
        <circle cx={ix(30000)} cy={ly} r={13} fill={T.gold} opacity={res} />
      </svg>
      <div style={{ position: 'absolute', left: ix(X.min) - 60, top: gy + H + 12, width: 120, textAlign: 'center', ...label(T.soft), fontSize: 15, opacity: minv }}>{money(X.min)}<br />START</div>
      <div style={{ position: 'absolute', left: ix(X.thr) - 70, top: gy + H + 12, width: 140, textAlign: 'center', ...label(T.gold), fontSize: 15, opacity: fall }}>{money(X.thr)}<br />FADES −{X.pct}%</div>
      <div style={{ position: 'absolute', left: ix(X.end) - 60, top: gy + H + 12, width: 120, textAlign: 'center', ...label(T.mute), fontSize: 15, opacity: fall }}>{money(X.end)}<br />$0</div>
      <div style={{ position: 'absolute', left: ix(X.min) + 30, top: ay(X.single) - 44, ...label(GREEN), fontSize: 18, opacity: plateau }}>{money(X.single)}</div>
      <div style={{ position: 'absolute', left: ix(30000) - 250, top: gy - 64, width: 240, textAlign: 'right', ...label(T.white), fontSize: 16, opacity: leo }}>LEO · {money(X.income)}</div>
      <div style={{ position: 'absolute', left: 90, top: y + 510, width: 900, fontFamily: T.font, fontSize: 28, fontWeight: 900, color: T.white, opacity: cut }}>
        {money(X.over)} over × {X.pct}% = <span style={{ color: T.red }}>−$471.75</span> <span style={{ opacity: res }}>→ <span style={{ color: GREEN }}>$1,161.25</span></span>
      </div>
      {f >= Q.cut && <Stamp f={f} at={Q.cut} text={`−${X.pct}% OF THE EXTRA`} x={540} y={y + 566} size={26} color={T.red} rotate={-4} />}
    </div>
  );
};

// ---------- reveal: half in advance ----------
const Advance = ({ f }: { f: number }) => {
  const a = B.reveal.s, b = B.action.s;
  if (f < a || f > b + 12) return null;
  const y = L.advance.y, x0 = 110, W = 860, sp = outExpo((f - Q.half) / 18), ad = outExpo((f - Q.advance) / 22);
  return (
    <div style={{ opacity: ease(f, a, a + 10) * (1 - ease(f, b - 2, b + 12)) }}>
      <div style={{ position: 'absolute', left: 56, top: y - 20, width: 968, height: 520, borderRadius: 28, ...glass }} />
      <div style={{ position: 'absolute', left: 90, top: y + 4, ...label(T.gold) }}>ADVANCED CWB · UP TO {X.half}% DURING THE YEAR</div>
      <div style={{ position: 'absolute', left: x0, top: y + 80, ...label(T.soft), fontSize: 16 }}>YOUR CWB</div>
      <div style={{ position: 'absolute', left: x0, top: y + 110, width: W / 2 - 6 * sp, height: 100, borderRadius: '16px 0 0 16px', background: GREEN, transform: `translateY(${ad * 130}px)`, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: T.font, fontSize: 30, fontWeight: 900, color: '#0b1220' }}>UP TO 50%</div>
      <div style={{ position: 'absolute', left: x0 + W / 2 + 6 * sp, top: y + 110, width: W / 2 - 6 * sp, height: 100, borderRadius: '0 16px 16px 0', background: `linear-gradient(90deg, ${T.goldDeep}, ${T.gold})`, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: T.font, fontSize: 30, fontWeight: 900, color: '#1d1503' }}>REST</div>
      <div style={{ position: 'absolute', left: x0, top: y + 360, width: W / 2, textAlign: 'center', ...label(GREEN), fontSize: 18, opacity: ad }}>PAID IN ADVANCE · DURING THE YEAR</div>
      <div style={{ position: 'absolute', left: x0 + W / 2, top: y + 230, width: W / 2, textAlign: 'center', ...label(T.gold), fontSize: 18, opacity: sp }}>WITH YOUR TAX REFUND</div>
      <div style={{ position: 'absolute', left: 90, top: y + 420, width: 900, textAlign: 'center', fontFamily: T.font, fontSize: 20, fontWeight: 700, color: T.mute, opacity: ad }}>if you're entitled to the CWB · CRA</div>
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
        <div style={{ position: 'absolute', left: 36, top: 26, ...label(T.gold) }}>CLAIM IT</div>
        <div style={{ position: 'absolute', left: 36, top: 66, right: 36, fontFamily: T.font, fontSize: 32, fontWeight: 900, lineHeight: 1.15, color: T.white, opacity: ease(f, Q.claim - 4, Q.claim + 6) }}>
          Claim it when you file: Schedule 6, line 45300
        </div>
      </div>
      <div style={{ position: 'absolute', left: 0, top: 240, display: 'flex', alignItems: 'center', gap: 18, opacity: ease(f, Q.next - 4, Q.next + 8) }}>
        <Flag f={f} w={90} amp={0.06} />
        <div style={{ display: 'inline-flex', padding: '16px 28px', borderRadius: 999, background: `linear-gradient(160deg,${T.goldHi},${T.gold} 50%,${T.goldDeep})`, color: '#1d1503', fontFamily: T.font, fontSize: 28, fontWeight: 900,
          transform: `scale(${1 + 0.03 * Math.sin((f - a) / 6)})` }}>NEXT: WHY YOUR FRIEND GOT BENEFITS →</div>
      </div>
      <div style={{ position: 'absolute', left: 0, top: 330, fontFamily: T.font, fontSize: 26, fontWeight: 700, color: T.white, textShadow, opacity: ease(f, Q.follow, Q.follow + 10) }}>Follow so you don't miss it</div>
      <div style={{ position: 'absolute', left: -10, top: 380, width: 900, padding: '14px 18px', borderRadius: 14, background: 'rgba(10,16,28,.84)', fontFamily: T.font, fontSize: 18, fontWeight: 600, color: T.mute, lineHeight: 1.45, opacity: ease(f, a + 6, a + 20) }}>
        Source: canada.ca (CRA) Canada workers benefit: how much you can get ({DATA.tax_year}); Schedule 6 · example · general info, not advice
      </div>
    </div>
  );
};

const Header = ({ f }: { f: number }) => (
  <div style={{ position: 'absolute', left: 80, top: 92, right: 80, display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: T.white, fontSize: 22, fontWeight: 800, letterSpacing: 4, fontFamily: T.font }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}><Flag f={f} w={72} />TAX SECRETS CANADA</div>
    <div style={{ color: T.gold, letterSpacing: 5 }}>CWB · {DATA.tax_year}</div>
  </div>
);

export const M9V3 = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: T.navy, fontFamily: T.font, overflow: 'hidden' }}>
      <SceneCuts f={f} cuts={CUTS} scene={(i) => i === 0 ? (
        <PhotoPlate f={f} src="plates/m9-s1-4k.jpg" iw={PW} ih={PH} keys={K1} glide={40} blur={0.8 + 4 * (1 - ease(f, 0, 20))} snow={[{ u0: 0.0, v0: 0.0, u1: 1.0, v1: 0.6 }]} />
      ) : i === 1 ? (
        <PhotoPlate f={f} src="plates/m9-s2-4k.jpg" iw={PW} ih={PH} keys={K2} glide={50} blur={0.8} snow={[{ u0: 0.25, v0: 0.27, u1: 1.0, v1: 0.55 }]} steam={{ u: 0.62, v: 0.74, w: 0.03 }} />
      ) : (
        <PhotoPlate f={f} src="plates/m9-s3-4k.jpg" iw={PW} ih={PH} keys={K3} glide={40} blur={0.8} snow={[{ u0: 0.62, v0: 0.02, u1: 1.0, v1: 0.25 }]} steam={{ u: 0.18, v: 0.7, w: 0.03 }} />
      )} />
      <Depth f={f} seed={f < B.c2.s ? 50 : f < B.reveal.s ? 51 : 52} warm={0.6} />
      <NavyGrade low={f >= B.action.s ? 1.2 : 1} />
      <Header f={f} />
      <Typed f={f} caps={CAPS} head={T.font} />
      {f < B.c1.s + 20 && <Hook f={f} />}
      <Hill f={f} />
      <Advance f={f} />
      <End f={f} />
      <Captions f={f} fps={M9FPS} beats={WORDS.beats as never} from={B.c1.s} until={B.action.s} y={1296} />
    </AbsoluteFill>
  );
};
