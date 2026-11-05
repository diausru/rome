// M7 "Why the CCB changes in July" — investigation format, motion engine v1 (2026-11-05). Checklist: channel/REEL-CHECKLIST.md.
// Variety vs M26 / M3 / M10: hook = a code-drawn calendar page flipping JUN → JUL + "CCB DEPOSIT CHANGED"; main visual = two
// rows of year blocks (income year 2024/2025/2026 → benefit year Jul–Jun) with the 2025 → Jul 26–Jun 27 link, then an indexation
// tag $7,997 → $8,157; re-hook = "INDEXED TO INFLATION" stamp (≈63 %); reveal = income vs CCB step lines, the CCB catching up a
// year later (July 2027); end = check card + next pill.
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { PhotoPlate, SceneCuts, type Focus } from './Plate';
import { Flag } from './RaiseShort';
import { Typed, beatsFrom, type Cap } from './Kit';
import TL from './m7-timeline.json';
import WORDS from './m7-words.json';
import CUE from './m7-cues.json';
import DATA from '../../m7/data.json';
import REEL from '../../m7/reel.json';
import { T, goldFill, textShadow } from './motion/brand';
import { Captions, Depth, Kinetic, NavyGrade, Stamp, clamp, ease, money, outBack, outExpo } from './motion/Reel';

export const M7FPS = 24;
const B = beatsFrom(TL, M7FPS);
export const M7DUR = Math.ceil((TL.total + REEL.hold_after_vo) * M7FPS);
const Q = Object.fromEntries(Object.entries(CUE).map(([k, v]) => [k, Math.round((v as number) * M7FPS)])) as Record<string, number>;
const X = DATA.example;
const GREEN = T.green;
const PW = 2294, PH = 4096;
const CUTS = [B.c2.s, B.reveal.s];
const L = Object.fromEntries(Object.entries(REEL.layout).map(([k, v]) => [k, { x: v.box[0], y: v.box[1], w: v.box[2], h: v.box[3] }])) as Record<string, { x: number; y: number; w: number; h: number }>;
const K1: Focus[] = [{ f: 0, u: 0.5, v: 0.3, k: 1.14 }, { f: B.c1.s, u: 0.45, v: 0.28, k: 1.22 }];
const K2: Focus[] = [{ f: 0, u: 0.5, v: 0.32, k: 1.2 }, { f: B.c4.s, u: 0.55, v: 0.3, k: 1.12 }];
const K3: Focus[] = [{ f: 0, u: 0.5, v: 0.34, k: 1.2 }, { f: B.action.s, u: 0.5, v: 0.3, k: 1.08 }];
const CAPS: Cap[] = [
  { at: B.c1.s, l1: 'THE BENEFIT YEAR', l2: 'July to June · recalculated every July', until: B.c2.s - 2 },
  { at: B.c2.s, l1: 'REASON 1', l2: "last year's family income", until: B.c3.s - 2 },
  { at: B.c3.s, l1: "PRIYA'S FAMILY", l2: `${money(X.old_inc)} → ${money(X.new_inc)} in 2025`, until: B.c4.s - 2 },
  { at: B.c4.s, l1: 'REASON 2', l2: 'indexed to inflation', until: B.reveal.s - 2 },
  { at: B.reveal.s, l1: 'THE TWIST', l2: 'always a year behind', until: B.action.s - 2 },
];
const glass = { background: 'linear-gradient(160deg, rgba(10,16,28,.86), rgba(10,16,28,.62))', border: `1px solid ${T.glassEdge}` };
const label = (c: string) => ({ fontFamily: T.font, fontSize: 18, fontWeight: 900, letterSpacing: 4, color: c });

const Hook = ({ f }: { f: number }) => {
  const flip = ease(f, Q.july - 6, Q.july + 6), ch = outBack((f - Q.changed) / 12);
  return (
    <div style={{ opacity: 1 - ease(f, B.c1.s - 6, B.c1.s + 8) }}>
      <Kinetic f={f} at={0} now text={REEL.hook.l1} x={80} y={440} size={70} nowrap />
      <Kinetic f={f} at={0} now text={REEL.hook.l2} x={80} y={524} size={70} nowrap color={T.gold} />
      <div style={{ position: 'absolute', left: 600, top: 680, width: 400, height: 300, borderRadius: 26, ...glass, overflow: 'hidden', opacity: ease(f, 2, 12) }}>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 70, background: T.red }} />
        <div style={{ position: 'absolute', left: 0, right: 0, top: 90, textAlign: 'center', fontFamily: T.font, fontSize: 110, fontWeight: 900, color: T.white, transformOrigin: '50% 0', transform: `rotateX(${flip * 90}deg)`, opacity: 1 - flip }}>JUN</div>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 90, textAlign: 'center', fontFamily: T.font, fontSize: 110, fontWeight: 900, color: T.gold, opacity: flip }}>JUL</div>
      </div>
      <div style={{ position: 'absolute', left: 80, top: 1010, width: 920, textAlign: 'center', fontFamily: T.font, fontSize: 64, fontWeight: 900, color: GREEN, opacity: clamp(ch), transform: `scale(${0.7 + 0.3 * clamp(ch)})` }}>CCB DEPOSIT CHANGED</div>
    </div>
  );
};

// ---------- income year → payment year ----------
const Blk = ({ x, y, w, top, sub, c, glow }: { x: number; y: number; w: number; top: string; sub: string; c: string; glow: number }) => (
  <div style={{ position: 'absolute', left: x, top: y, width: w, height: 100, borderRadius: 14, border: `2px solid ${c}`, background: `rgba(255,255,255,${0.04 + 0.12 * glow})`, boxShadow: glow > 0.1 ? `0 0 ${24 * glow}px ${c}` : 'none',
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ fontFamily: T.font, fontSize: 30, fontWeight: 900, color: T.white }}>{top}</div>
    <div style={{ ...label(c), fontSize: 15, marginTop: 4 }}>{sub}</div>
  </div>
);
const Lag = ({ f }: { f: number }) => {
  const a = B.c1.s + 2, b = B.reveal.s;
  if (f < a - 1 || f > b + 14) return null;
  const y = L.lag.y, W = 270, gx = 300, x0 = 110;
  const pay = ease(f, Q.recalc - 4, Q.recalc + 8), map = ease(f, Q.map - 4, Q.map + 10), land = ease(f, Q.lands - 2, Q.lands + 8), tag = ease(f, Q.m1 - 4, Q.m1 + 6), tag2 = ease(f, Q.m2 - 4, Q.m2 + 6);
  return (
    <div style={{ opacity: outExpo((f - a) / 14) * (1 - ease(f, b - 2, b + 12)) }}>
      <div style={{ position: 'absolute', left: 56, top: y - 20, width: 968, height: 640, borderRadius: 28, ...glass }} />
      <div style={{ position: 'absolute', left: 90, top: y, ...label(T.mute) }}>INCOME YEAR → CCB PAYMENT YEAR</div>
      <div style={{ position: 'absolute', left: 90, top: y + 40, ...label(T.soft), fontSize: 16 }}>YOUR TAX RETURN (INCOME)</div>
      <Blk x={x0} y={y + 66} w={W} top="2024" sub={f >= Q.i60 ? 'FAMILY $60K' : ''} c={T.soft} glow={0} />
      <Blk x={x0 + gx} y={y + 66} w={W} top="2025" sub={f >= Q.i70 ? 'FAMILY $70K ▲' : ''} c={T.gold} glow={map} />
      <Blk x={x0 + 2 * gx} y={y + 66} w={W} top="2026" sub="this year" c={T.mute} glow={0} />
      <div style={{ position: 'absolute', left: 90, top: y + 200, ...label(T.soft), fontSize: 16, opacity: pay }}>CCB BENEFIT YEAR (JULY → JUNE)</div>
      <div style={{ opacity: pay }}>
        <Blk x={x0 + 150} y={y + 226} w={W} top="JUL 25 – JUN 26" sub="uses 2024" c={T.soft} glow={0} />
        <Blk x={x0 + 150 + gx} y={y + 226} w={W} top="JUL 26 – JUN 27" sub={f >= Q.lands ? 'uses 2025 · $70K' : 'uses 2025'} c={GREEN} glow={Math.max(map * 0.6, land)} />
      </div>
      <svg style={{ position: 'absolute', left: 0, top: 0 }} width={1080} height={1920}>
        <path d={`M ${x0 + gx + W / 2} ${y + 168} L ${x0 + 150 + gx + W / 2} ${y + 224}`} stroke={T.gold} strokeWidth={5} strokeDasharray="90" strokeDashoffset={90 * (1 - map)} markerEnd="" />
      </svg>
      <div style={{ position: 'absolute', left: 110, top: y + 360, width: 860, height: 110, borderRadius: 16, border: `2px solid ${T.gold}`, opacity: ease(f, Q.idx - 4, Q.idx + 8), display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
        <div style={{ ...label(T.soft), fontSize: 15, width: 200 }}>MAX · CHILD UNDER 6</div>
        <div style={{ fontFamily: T.font, fontSize: 40, fontWeight: 900, color: T.soft, opacity: tag, textDecoration: tag2 > 0.5 ? 'line-through' : 'none' }}>{money(X.old_max)}</div>
        <div style={{ fontFamily: T.font, fontSize: 40, fontWeight: 900, color: T.gold, opacity: tag2 }}>→ {money(X.new_max)}</div>
      </div>
      <div style={{ position: 'absolute', left: 110, top: y + 486, ...label(T.soft), fontSize: 15, opacity: tag2 }}>AGE 6–17: {money(X.old_617)} → {money(X.new_617)} · INDEXED EVERY JULY</div>
      <div style={{ position: 'absolute', left: 110, top: y + 520, ...label(T.mute), fontSize: 15, opacity: tag2 }}>REDUCTION STARTS ABOVE {money(X.thr)} OF FAMILY NET INCOME</div>
      {f >= Q.m2 && <Stamp f={f} at={Q.m2} text="INDEXED TO INFLATION" x={560} y={y + 566} size={26} color={T.gold} rotate={-4} />}
    </div>
  );
};

// ---------- reveal: the benefit is a year behind ----------
const Shadow = ({ f }: { f: number }) => {
  const a = B.reveal.s, b = B.action.s;
  if (f < a || f > b + 12) return null;
  const y = L.shadow.y, x0 = 120, W = 840, gy = y + 110, H = 220;
  const t = outExpo((f - a - 6) / 40), drop = ease(f, Q.behind - 4, Q.behind + 10), late = ease(f, Q.next_july - 6, Q.next_july + 8);
  const mx = (m: number) => x0 + (W * m) / 24; // months from Jan 2026
  const incPath = `M ${mx(0)} ${gy + 40} L ${mx(8)} ${gy + 40} L ${mx(8)} ${gy + 40 + 80 * drop} L ${mx(24)} ${gy + 40 + 80 * drop}`;
  const ccbPath = `M ${mx(0)} ${gy + H - 30} L ${mx(18)} ${gy + H - 30} L ${mx(18)} ${gy + H - 30 - 90 * late} L ${mx(24)} ${gy + H - 30 - 90 * late}`;
  return (
    <div style={{ opacity: ease(f, a, a + 10) * (1 - ease(f, b - 2, b + 12)) }}>
      <div style={{ position: 'absolute', left: 56, top: y - 20, width: 968, height: 520, borderRadius: 28, ...glass }} />
      <div style={{ position: 'absolute', left: 90, top: y + 4, ...label(T.gold) }}>THE BENEFIT RUNS A YEAR BEHIND</div>
      <svg style={{ position: 'absolute', left: 0, top: 0 }} width={1080} height={1920}>
        <rect x={x0} y={gy} width={W * t} height={H} fill="none" />
        <path d={incPath} fill="none" stroke={T.white} strokeWidth={6} strokeDasharray="2000" strokeDashoffset={2000 * (1 - t)} />
        <path d={ccbPath} fill="none" stroke={GREEN} strokeWidth={6} strokeDasharray="2000" strokeDashoffset={2000 * (1 - t)} />
        <line x1={mx(18)} y1={gy - 10} x2={mx(18)} y2={gy + H + 10} stroke={T.gold} strokeWidth={3} strokeDasharray="8 8" opacity={late} />
      </svg>
      <div style={{ position: 'absolute', left: x0, top: gy + 6, ...label(T.white), fontSize: 15 }}>YOUR INCOME</div>
      <div style={{ position: 'absolute', left: x0, top: gy + H - 70, ...label(GREEN), fontSize: 15 }}>YOUR CCB</div>
      <div style={{ position: 'absolute', left: mx(8) + 16, top: gy + 60, width: 200, textAlign: 'left', ...label(T.red), fontSize: 15, opacity: drop }}>INCOME DROPS<br />2026</div>
      <div style={{ position: 'absolute', left: mx(18) - 90, top: gy + H + 18, width: 180, textAlign: 'center', ...label(T.gold), fontSize: 16, opacity: late }}>JULY 2027<br />CCB CATCHES UP</div>
      {['JAN 26', 'JUL 26', 'JAN 27', 'JUL 27', 'JAN 28'].map((s, i) => <div key={s} style={{ position: 'absolute', left: mx(i * 6) - 40, top: gy + H + 80, width: 80, textAlign: 'center', ...label(T.mute), fontSize: 13 }}>{s}</div>)}
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
        <div style={{ position: 'absolute', left: 36, top: 26, ...label(T.gold) }}>CHECK LAST YEAR</div>
        <div style={{ position: 'absolute', left: 36, top: 66, right: 36, fontFamily: T.font, fontSize: 32, fontWeight: 900, lineHeight: 1.15, color: T.white, opacity: ease(f, Q.check - 4, Q.check + 6) }}>
          July looks different? Check last year's return, not this year's paycheque
        </div>
      </div>
      <div style={{ position: 'absolute', left: 0, top: 240, display: 'flex', alignItems: 'center', gap: 18, opacity: ease(f, Q.next - 4, Q.next + 8) }}>
        <Flag f={f} w={90} amp={0.06} />
        <div style={{ display: 'inline-flex', padding: '16px 28px', borderRadius: 999, background: `linear-gradient(160deg,${T.goldHi},${T.gold} 50%,${T.goldDeep})`, color: '#1d1503', fontFamily: T.font, fontSize: 28, fontWeight: 900,
          transform: `scale(${1 + 0.03 * Math.sin((f - a) / 6)})` }}>NEXT: THE GST CREDIT’S NEW NAME →</div>
      </div>
      <div style={{ position: 'absolute', left: 0, top: 330, fontFamily: T.font, fontSize: 26, fontWeight: 700, color: T.white, textShadow, opacity: ease(f, Q.follow, Q.follow + 10) }}>Follow so you don't miss it</div>
      <div style={{ position: 'absolute', left: -10, top: 380, width: 900, padding: '14px 18px', borderRadius: 14, background: 'rgba(10,16,28,.84)', fontFamily: T.font, fontSize: 18, fontWeight: 600, color: T.mute, lineHeight: 1.45, opacity: ease(f, a + 6, a + 20) }}>
        Source: canada.ca (CRA) Canada child benefit: how much you can get (July 2026–June 2027, 2025 base year); T4114 · example · general info, not advice
      </div>
    </div>
  );
};

const Header = ({ f }: { f: number }) => (
  <div style={{ position: 'absolute', left: 80, top: 92, right: 80, display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: T.white, fontSize: 22, fontWeight: 800, letterSpacing: 4, fontFamily: T.font }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}><Flag f={f} w={72} />TAX SECRETS CANADA</div>
    <div style={{ color: T.gold, letterSpacing: 5 }}>CCB · {DATA.tax_year}</div>
  </div>
);

export const M7V3 = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: T.navy, fontFamily: T.font, overflow: 'hidden' }}>
      <SceneCuts f={f} cuts={CUTS} scene={(i) => i === 0 ? (
        <PhotoPlate f={f} src="plates/m7-s1-4k.jpg" iw={PW} ih={PH} keys={K1} glide={40} blur={0.8 + 4 * (1 - ease(f, 0, 20))}  />
      ) : i === 1 ? (
        <PhotoPlate f={f} src="plates/m7-s2-4k.jpg" iw={PW} ih={PH} keys={K2} glide={50} blur={0.8} snow={[{ u0: 0.6, v0: 0.0, u1: 1.0, v1: 0.55 }]} steam={{ u: 0.67, v: 0.7, w: 0.03 }} />
      ) : (
        <PhotoPlate f={f} src="plates/m7-s3-4k.jpg" iw={PW} ih={PH} keys={K3} glide={40} blur={0.8}  />
      )} />
      <Depth f={f} seed={f < B.c2.s ? 50 : f < B.reveal.s ? 51 : 52} warm={0.6} />
      <NavyGrade low={f >= B.action.s ? 1.2 : 1} />
      <Header f={f} />
      <Typed f={f} caps={CAPS} head={T.font} />
      {f < B.c1.s + 20 && <Hook f={f} />}
      <Lag f={f} />
      <Shadow f={f} />
      <End f={f} />
      <Captions f={f} fps={M7FPS} beats={WORDS.beats as never} from={B.c1.s} until={B.action.s} y={1296} />
    </AbsoluteFill>
  );
};
