// R1 "Disability tax credit: $0 for Noah, three doors" — investigation format, motion engine v1 (2026-10-24).
// Variety vs R5 / D4 / C2 (CLAUDE.md "Variety"): hook = a kinetic question over a struck-through "$0 TAX SAVED";
// main visual = three doors that swing open on the narration, each revealing its benefit and maximum;
// reveal = one key (T2201) slides across and lights all three locks; end = a two-item checklist + next pill.
// Numbers come from r1/data.json.
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { PhotoPlate, SceneCuts, type Focus } from './Plate';
import { Flag } from './RaiseShort';
import { Typed, beatsFrom, type Cap } from './Kit';
import TL from './r1-timeline.json';
import WORDS from './r1-words.json';
import CUE from './r1-cues.json';
import DATA from '../../r1/data.json';
import REEL from '../../r1/reel.json';
import { T, goldFill, textShadow } from './motion/brand';
import { Captions, Depth, Kinetic, NavyGrade, Stamp, clamp, ease, money, outBack, outExpo } from './motion/Reel';

export const R1FPS = 24;
const B = beatsFrom(TL, R1FPS);
export const R1DUR = Math.ceil((TL.total + REEL.hold_after_vo) * R1FPS);
const Q = Object.fromEntries(Object.entries(CUE).map(([k, v]) => [k, Math.round((v as number) * R1FPS)])) as Record<string, number>;

const X = DATA.example;
const GREEN = T.green;
const PW = 2294, PH = 4096;

const CUTS = [B.c2.s, B.reveal.s];
const L = Object.fromEntries(Object.entries(REEL.layout).map(([k, v]) => [k, { x: v.box[0], y: v.box[1], w: v.box[2], h: v.box[3] }])) as Record<string, { x: number; y: number; w: number; h: number }>;
const K1: Focus[] = [{ f: 0, u: 0.45, v: 0.3, k: 1.14 }, { f: B.c1.s, u: 0.35, v: 0.28, k: 1.22 }];
const K2: Focus[] = [{ f: 0, u: 0.5, v: 0.32, k: 1.2 }, { f: B.c3.s, u: 0.45, v: 0.3, k: 1.12 }];
const K3: Focus[] = [{ f: 0, u: 0.5, v: 0.34, k: 1.2 }, { f: B.action.s, u: 0.5, v: 0.3, k: 1.08 }];

const CAPS: Cap[] = [
  { at: B.c1.s, l1: 'DOOR 1', l2: 'child disability benefit', until: B.c2.s - 2 },
  { at: B.c2.s, l1: 'DOOR 2', l2: 'RDSP bond + grant', until: B.c3.s - 2 },
  { at: B.c3.s, l1: 'DOOR 3', l2: 'at 18: Canada Disability Benefit', until: B.reveal.s - 2 },
  { at: B.reveal.s, l1: 'THE TWIST', l2: 'one key for every door', until: B.action.s - 2 },
];

const glass = { background: 'linear-gradient(160deg, rgba(10,16,28,.86), rgba(10,16,28,.62))', border: `1px solid ${T.glassEdge}` };
const label = (c: string) => ({ fontFamily: T.font, fontSize: 18, fontWeight: 900, letterSpacing: 4, color: c });

// ---------- hook: $0 struck through, then the question ----------
const Hook = ({ f }: { f: number }) => {
  const o = ease(f, B.c1.s - 6, B.c1.s + 8);
  const strike = outExpo((f - Q.zero - 14) / 12);
  return (
    <div style={{ opacity: 1 - o }}>
      <Kinetic f={f} at={0} now text={REEL.hook.l1} x={80} y={440} size={64} nowrap />
      <Kinetic f={f} at={0} now text={REEL.hook.l2} x={80} y={518} size={64} nowrap color={T.gold} />
      <div style={{ position: 'absolute', left: 80, width: 920, top: 700, textAlign: 'center', opacity: ease(f, Q.zero - 4, Q.zero + 6) }}>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <span style={{ fontFamily: T.font, fontSize: 200, fontWeight: 900, color: T.white, textShadow }}>$0</span>
          <div style={{ position: 'absolute', left: -20, top: '52%', height: 14, width: `${(100 + 20) * strike}%`, background: T.red, borderRadius: 7, transform: 'rotate(-8deg)' }} />
        </div>
        <div style={{ ...label(T.soft), fontSize: 22, marginTop: 6 }}>TAX SAVED ON HIS OWN RETURN</div>
      </div>
      {f >= Q.why && (
        <div style={{ position: 'absolute', left: 120, width: 840, top: 1040, padding: '14px 0', borderRadius: 20, background: 'rgba(10,16,28,.78)', textAlign: 'center', fontFamily: T.font, fontSize: 56, fontWeight: 900, color: T.white, textShadow,
          opacity: ease(f, Q.why, Q.why + 8), transform: `scale(${clamp(outBack((f - Q.why) / 14), 0.7, 1.04)})` }}>
          SO WHY <span style={{ ...goldFill }}>APPROVE IT?</span>
        </div>
      )}
    </div>
  );
};

// ---------- three doors ----------
type D = { at: number; amt: number; n: number; title: string; amount: string; per: string; note: string };
const Door = ({ f, x, d, lit }: { f: number; x: number; d: D; lit: number }) => {
  const open = outExpo((f - d.at) / 18);
  const show = ease(f, d.amt - 2, d.amt + 8);
  return (
    <div style={{ position: 'absolute', left: x, top: 0, width: 280, height: 560, perspective: 1200 }}>
      <div style={{ position: 'absolute', inset: 0, borderRadius: '20px 20px 6px 6px', background: 'rgba(8,14,26,.82)', border: `2px solid ${lit > 0 ? T.gold : T.glassEdge}`,
        boxShadow: lit > 0 ? `0 0 ${36 * lit}px rgba(241,199,91,.45)` : undefined }}>
        <div style={{ position: 'absolute', left: 20, right: 20, top: 26, ...label(T.gold), fontSize: 16, letterSpacing: 3 }}>DOOR {d.n}</div>
        <div style={{ position: 'absolute', left: 20, right: 16, top: 58, fontFamily: T.font, fontSize: 25, fontWeight: 900, lineHeight: 1.12, color: T.white, opacity: open }}>{d.title}</div>
        <div style={{ position: 'absolute', left: 20, right: 10, top: 236, opacity: show, transform: `translateY(${(1 - show) * 18}px)` }}>
          <div style={{ fontFamily: T.font, fontSize: 16, fontWeight: 800, color: T.soft, letterSpacing: 2 }}>UP TO</div>
          <div style={{ fontFamily: T.font, fontSize: 50, fontWeight: 900, ...goldFill }}>{d.amount}</div>
          <div style={{ fontFamily: T.font, fontSize: 19, fontWeight: 800, color: T.white }}>{d.per}</div>
        </div>
        <div style={{ position: 'absolute', left: 20, right: 14, bottom: 22, fontFamily: T.font, fontSize: 15, fontWeight: 700, lineHeight: 1.35, color: T.soft, opacity: show }}>{d.note}</div>
      </div>
      <div style={{ position: 'absolute', inset: 0, borderRadius: '20px 20px 6px 6px', transformOrigin: 'left center', transform: `rotateY(${-100 * open}deg)`, opacity: 1 - 0.85 * open,
        background: 'linear-gradient(160deg, #4b3a26, #2c2117)', border: '2px solid rgba(255,255,255,.18)', boxShadow: '0 20px 40px rgba(0,0,0,.45)' }}>
        <div style={{ position: 'absolute', left: 26, right: 26, top: 40, height: 200, borderRadius: 10, border: '2px solid rgba(255,255,255,.12)' }} />
        <div style={{ position: 'absolute', left: 26, right: 26, top: 280, height: 220, borderRadius: 10, border: '2px solid rgba(255,255,255,.12)' }} />
        <div style={{ position: 'absolute', right: 26, top: 262, width: 22, height: 22, borderRadius: 11, background: lit > 0 ? T.gold : '#b89a5e' }} />
        <div style={{ position: 'absolute', left: 0, right: 0, top: 210, textAlign: 'center', fontFamily: T.font, fontSize: 90, fontWeight: 900, color: 'rgba(255,255,255,.22)' }}>{d.n}</div>
      </div>
    </div>
  );
};
const Doors = ({ f }: { f: number }) => {
  const a = B.c1.s + 2, b = B.action.s;
  if (f < a - 1 || f > b + 16) return null;
  const o = ease(f, b - 2, b + 14), y = L.doors.y;
  const lit = (i: number) => ease(f, Q.key + 6 + i * 5, Q.key + 14 + i * 5);
  const DS: D[] = [
    { at: Q.door1, amt: Q.amt1, n: 1, title: 'Child Disability Benefit', amount: money(X.child_dis), per: 'a year, with the CCB', note: `under 18 · less when family net income is over ${money(X.afni_reduce)} · Jul 2026–Jun 2027` },
    { at: Q.door2, amt: Q.bond, n: 2, title: 'RDSP bond + grant', amount: money(X.bond), per: 'bond a year, no deposit', note: `lower incomes · plus grants up to ${money(X.grant)}/yr matching deposits` },
    { at: Q.door3, amt: Q.amt3, n: 3, title: 'Canada Disability Benefit', amount: `$${X.cdb_month.toFixed(2)}`, per: 'a month, ages 18–64', note: 'income-tested · Jul 2026–Jun 2027' },
  ];
  return (
    <div style={{ position: 'absolute', left: 0, top: y, width: 1080, opacity: outExpo((f - a) / 14) * (1 - o) }}>
      {DS.map((d, i) => <Door key={i} f={f} x={78 + i * 312} d={d} lit={f >= Q.key ? lit(i) : 0} />)}
    </div>
  );
};

// ---------- reveal: one key ----------
const Key = ({ f }: { f: number }) => {
  const a = B.reveal.s, b = B.action.s;
  if (f < Q.key - 6 || f > b + 12) return null;
  const s = outExpo((f - Q.key + 6) / 22), y = L.doors.y - 130;
  return (
    <div style={{ opacity: 1 - ease(f, b - 2, b + 12) }}>
      <div style={{ position: 'absolute', left: 80 + 260 * (1 - s), top: y, width: 760, height: 110, borderRadius: 18, ...glass, display: 'flex', alignItems: 'center', gap: 22, padding: '0 28px',
        opacity: ease(f, Q.key - 6, Q.key + 4) }}>
        <svg width={90} height={46} viewBox="0 0 90 46"><circle cx={22} cy={23} r={17} fill="none" stroke={T.gold} strokeWidth={7} /><rect x={38} y={19} width={48} height={8} rx={3} fill={T.gold} /><rect x={70} y={27} width={7} height={12} fill={T.gold} /><rect x={58} y={27} width={7} height={9} fill={T.gold} /></svg>
        <div>
          <div style={{ ...label(T.gold), fontSize: 16 }}>THE KEY</div>
          <div style={{ fontFamily: T.font, fontSize: 32, fontWeight: 900, color: T.white, opacity: ease(f, Q.form - 4, Q.form + 6) }}>CRA approves form T2201</div>
        </div>
      </div>
      {f >= a && f < Q.key && <div style={{ position: 'absolute', left: 80, width: 920, top: y + 20, textAlign: 'center', fontFamily: T.font, fontSize: 40, fontWeight: 900, color: T.white, textShadow, opacity: ease(f, a, a + 8) }}>EVERY DOOR, SAME LOCK</div>}
    </div>
  );
};

// ---------- action + end ----------
const End = ({ f }: { f: number }) => {
  const a = B.action.s;
  if (f < a - 2) return null;
  const y = L.end.y;
  const row = (at: number, t: string, i: number) => (
    <div style={{ position: 'absolute', left: 36, top: 70 + i * 66, display: 'flex', alignItems: 'center', gap: 16, opacity: ease(f, at - 4, at + 6) }}>
      <div style={{ width: 40, height: 40, borderRadius: 10, border: `2px solid ${GREEN}`, display: 'grid', placeItems: 'center', fontSize: 28, fontWeight: 900, color: GREEN }}>{f >= at + 4 ? '✓' : ''}</div>
      <div style={{ fontFamily: T.font, fontSize: 30, fontWeight: 800, color: T.white }}>{t}</div>
    </div>
  );
  return (
    <div style={{ position: 'absolute', left: 80, top: y, width: 880 }}>
      <div style={{ position: 'absolute', left: 0, top: 0, width: 880, height: 220, borderRadius: 26, ...glass, opacity: ease(f, a, a + 12) }}>
        <div style={{ position: 'absolute', left: 36, top: 26, ...label(T.gold) }}>CHECK YOURS</div>
        {row(Q.apply, 'Apply once: form T2201', 0)}
        {row(Q.file, 'File a return every year, even at $0', 1)}
      </div>
      <div style={{ position: 'absolute', left: 0, top: 260, display: 'flex', alignItems: 'center', gap: 18, opacity: ease(f, Q.next - 4, Q.next + 8) }}>
        <Flag f={f} w={90} amp={0.06} />
        <div style={{ display: 'inline-flex', padding: '16px 28px', borderRadius: 999, background: `linear-gradient(160deg,${T.goldHi},${T.gold} 50%,${T.goldDeep})`, color: '#1d1503', fontFamily: T.font, fontSize: 28, fontWeight: 900,
          transform: `scale(${1 + 0.03 * Math.sin((f - a) / 6)})` }}>NEXT: CANADA CAREGIVER CREDIT →</div>
      </div>
      <div style={{ position: 'absolute', left: 0, top: 350, fontFamily: T.font, fontSize: 26, fontWeight: 700, color: T.white, textShadow, opacity: ease(f, Q.follow, Q.follow + 10) }}>Follow so you don't miss it</div>
      <div style={{ position: 'absolute', left: -10, top: 400, width: 900, padding: '14px 18px', borderRadius: 14, background: 'rgba(10,16,28,.84)', fontFamily: T.font, fontSize: 18, fontWeight: 600, color: T.mute, lineHeight: 1.45, opacity: ease(f, a + 6, a + 20) }}>
        Source: canada.ca — Child disability benefit; RDSP grants and bonds (ESDC); Canada Disability Benefit amounts (Jul 2026–Jun 2027); Income Tax Act s. 118.3 · maximums, income-tested · example family · general info, not advice
      </div>
    </div>
  );
};

const Header = ({ f }: { f: number }) => (
  <div style={{ position: 'absolute', left: 80, top: 92, right: 80, display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: T.white, fontSize: 22, fontWeight: 800, letterSpacing: 4, fontFamily: T.font }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}><Flag f={f} w={72} />TAX SECRETS CANADA</div>
    <div style={{ color: T.gold, letterSpacing: 5 }}>DISABILITY · {DATA.tax_year}</div>
  </div>
);

export const R1V3 = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: T.navy, fontFamily: T.font, overflow: 'hidden' }}>
      <SceneCuts f={f} cuts={CUTS} scene={(i) => i === 0 ? (
        <PhotoPlate f={f} src="plates/r1-s1-4k.jpg" iw={PW} ih={PH} keys={K1} glide={40} blur={0.8 + 4 * (1 - ease(f, 0, 20))} snow={[{ u0: 0.6, v0: 0.0, u1: 1.0, v1: 0.3 }]} />
      ) : i === 1 ? (
        <PhotoPlate f={f} src="plates/r1-s2-4k.jpg" iw={PW} ih={PH} keys={K2} glide={50} blur={0.8} />
      ) : (
        <PhotoPlate f={f} src="plates/r1-s3-4k.jpg" iw={PW} ih={PH} keys={K3} glide={40} blur={0.8} steam={{ u: 0.3, v: 0.68, w: 0.03 }} />
      )} />
      <Depth f={f} seed={f < B.c2.s ? 70 : f < B.reveal.s ? 71 : 72} warm={0.6} />
      <NavyGrade low={f >= B.action.s ? 1.2 : 1} />
      <Header f={f} />
      <Typed f={f} caps={CAPS} head={T.font} />
      {f < B.c1.s + 20 && <Hook f={f} />}
      <Doors f={f} />
      <Key f={f} />
      {f >= Q.tested + 10 && f < B.reveal.s && <Stamp f={f} at={Q.tested + 10} text="ALL NEED DTC APPROVAL" x={180} y={L.doors.y - 110} size={28} color={T.red} rotate={-4} />}
      <End f={f} />
      <Captions f={f} fps={R1FPS} beats={WORDS.beats as never} from={B.c1.s} until={B.action.s} y={1296} />
    </AbsoluteFill>
  );
};
