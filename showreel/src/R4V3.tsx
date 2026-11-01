// R4 "Moving expenses: the 40 km rule" — investigation format, motion engine v1 (2026-11-01). Checklist: channel/REEL-CHECKLIST.md.
// Variety vs R3 / M30 / R2: hook = two verdict rows (34 KM → $0 struck in red, 43 KM → COUNTS in green); main visual = a road
// ruler from WORK (0 km) to the OLD HOME (52 km) with the 40-km-closer line, two candidate apartments dropping as pins and
// distance brackets (✗ 34 / ✓ 43); re-hook = "$4,200 COUNTS" stamp (≈57 %); reveal = the $4,200 bar splitting into $2,500
// (income at the new job, Dec 2025) and $1,700 sliding off to "carried forward"; end = check card + next pill.
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { PhotoPlate, SceneCuts, type Focus } from './Plate';
import { Flag } from './RaiseShort';
import { Typed, beatsFrom, type Cap } from './Kit';
import TL from './r4-timeline.json';
import WORDS from './r4-words.json';
import CUE from './r4-cues.json';
import DATA from '../../r4/data.json';
import REEL from '../../r4/reel.json';
import { T, goldFill, textShadow } from './motion/brand';
import { Captions, Depth, Kinetic, NavyGrade, Stamp, clamp, ease, money, outBack, outExpo } from './motion/Reel';

export const R4FPS = 24;
const B = beatsFrom(TL, R4FPS);
export const R4DUR = Math.ceil((TL.total + REEL.hold_after_vo) * R4FPS);
const Q = Object.fromEntries(Object.entries(CUE).map(([k, v]) => [k, Math.round((v as number) * R4FPS)])) as Record<string, number>;
const X = DATA.example;
const GREEN = T.green;
const PW = 2294, PH = 4096;
const CUTS = [B.c2.s, B.reveal.s];
const L = Object.fromEntries(Object.entries(REEL.layout).map(([k, v]) => [k, { x: v.box[0], y: v.box[1], w: v.box[2], h: v.box[3] }])) as Record<string, { x: number; y: number; w: number; h: number }>;
const K1: Focus[] = [{ f: 0, u: 0.5, v: 0.3, k: 1.14 }, { f: B.c1.s, u: 0.45, v: 0.28, k: 1.22 }];
const K2: Focus[] = [{ f: 0, u: 0.5, v: 0.32, k: 1.2 }, { f: B.c4.s, u: 0.55, v: 0.3, k: 1.12 }];
const K3: Focus[] = [{ f: 0, u: 0.5, v: 0.34, k: 1.2 }, { f: B.action.s, u: 0.5, v: 0.3, k: 1.08 }];
const CAPS: Cap[] = [
  { at: B.c1.s, l1: 'THE MOVE', l2: `new job · old home ${X.old} km away · ${DATA.tax_year}`, until: B.c2.s - 2 },
  { at: B.c2.s, l1: 'THE RULE', l2: `at least ${X.rule} km closer, shortest public route`, until: B.c3.s - 2 },
  { at: B.c3.s, l1: 'APARTMENT A', l2: `${X.near} km from work`, until: B.c4.s - 2 },
  { at: B.c4.s, l1: 'APARTMENT B', l2: `${X.nearer} km from work`, until: B.reveal.s - 2 },
  { at: B.reveal.s, l1: 'THE TWIST', l2: 'only from income at the new job', until: B.action.s - 2 },
];
const glass = { background: 'linear-gradient(160deg, rgba(10,16,28,.86), rgba(10,16,28,.62))', border: `1px solid ${T.glassEdge}` };
const label = (c: string) => ({ fontFamily: T.font, fontSize: 18, fontWeight: 900, letterSpacing: 4, color: c });

const Verdict = ({ f, y, at, km, val, ok }: { f: number; y: number; at: number; km: number; val: string; ok: boolean }) => {
  const p = outExpo((f - at) / 14), c = ok ? GREEN : T.red;
  return (
    <div style={{ position: 'absolute', left: 80, top: y, width: 920, height: 150, opacity: clamp(p), transform: `translateX(${(1 - p) * (ok ? 80 : -80)}px)` }}>
      <div style={{ position: 'absolute', inset: 0, borderRadius: 24, ...glass, border: `2px solid ${c}` }} />
      <div style={{ position: 'absolute', left: 36, top: 22, ...label(T.soft), fontSize: 20 }}>NEW HOME CLOSER TO WORK BY</div>
      <div style={{ position: 'absolute', left: 36, top: 52, fontFamily: T.font, fontSize: 76, fontWeight: 900, color: T.white }}>{km} KM</div>
      <div style={{ position: 'absolute', right: 36, top: 40, fontFamily: T.font, fontSize: 70, fontWeight: 900, color: c, textShadow }}>{val}</div>
      {!ok && <div style={{ position: 'absolute', right: 30, top: 80, width: 230 * ease(f, at + 6, at + 14), height: 6, background: T.red, transform: 'rotate(-8deg)' }} />}
    </div>
  );
};
const Hook = ({ f }: { f: number }) => (
  <div style={{ opacity: 1 - ease(f, B.c1.s - 6, B.c1.s + 8) }}>
    <Kinetic f={f} at={0} now text={REEL.hook.l1} x={80} y={440} size={70} nowrap />
    <Kinetic f={f} at={0} now text={REEL.hook.l2} x={80} y={524} size={70} nowrap color={T.gold} />
    <Verdict f={f} y={680} at={Math.min(Q.h34 - 4, 8)} km={X.gap_near} val="$0" ok={false} />
    <Verdict f={f} y={860} at={Q.h43 - 4} km={X.gap_nearer} val="✓ COUNTS" ok />
  </div>
);

// ---------- the road ruler: WORK (0 km) → OLD HOME (52 km) ----------
const kx = (km: number) => 130 + (km * 800) / X.old;
const Pin = ({ f, at, km, name, c, up = false }: { f: number; at: number; km: number; name: string; c: string; up?: boolean }) => {
  if (f < at - 2) return null;
  const p = outBack((f - at) / 12);
  const txt = [<div key="n" style={{ ...label(c), fontSize: 16 }}>{name}</div>, <div key="k" style={{ fontFamily: T.font, fontSize: 26, fontWeight: 900, color: T.white }}>{km} km</div>];
  return (
    <div style={{ position: 'absolute', left: kx(km) - 70, top: up ? -96 : -6, width: 140, textAlign: 'center', opacity: clamp(p), transform: `translateY(${(1 - p) * (up ? -30 : 30)}px)` }}>
      {up && txt}
      <div style={{ margin: '6px auto', width: 22, height: 22, borderRadius: 11, background: c, boxShadow: `0 0 18px ${c}` }} />
      {!up && txt}
    </div>
  );
};
const Bracket = ({ f, at, from, to, text, c, y }: { f: number; at: number; from: number; to: number; text: string; c: string; y: number }) => {
  if (f < at - 2) return null;
  const p = outExpo((f - at) / 16), x0 = kx(from), x1 = kx(to);
  return (
    <div style={{ position: 'absolute', left: x0, top: y, width: (x1 - x0) * p, height: 54, borderTop: `3px solid ${c}`, borderLeft: `3px solid ${c}`, borderRight: p > 0.95 ? `3px solid ${c}` : 'none' }}>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 8, textAlign: 'center', fontFamily: T.font, fontSize: 30, fontWeight: 900, color: c, opacity: ease(f, at + 8, at + 14), whiteSpace: 'nowrap' }}>{text}</div>
    </div>
  );
};
const Road = ({ f }: { f: number }) => {
  const a = B.c1.s + 2, b = B.reveal.s;
  if (f < a - 1 || f > b + 14) return null;
  const y = L.road.y, ry = y + 250, draw = outExpo((f - a) / 24), ln = ease(f, Q.rule - 2, Q.rule + 10);
  return (
    <div style={{ opacity: outExpo((f - a) / 14) * (1 - ease(f, b - 2, b + 12)) }}>
      <div style={{ position: 'absolute', left: 56, top: y - 20, width: 968, height: 640, borderRadius: 28, ...glass }} />
      <div style={{ position: 'absolute', left: 90, top: y, ...label(T.mute) }}>DISTANCE TO THE NEW JOB · SHORTEST PUBLIC ROUTE</div>
      <div style={{ position: 'absolute', left: 0, top: ry, width: 1080 }}>
        <div style={{ position: 'absolute', left: kx(0), top: 0, width: 800 * draw, height: 10, borderRadius: 5, background: 'rgba(160,176,200,.55)' }} />
        <div style={{ position: 'absolute', left: kx(0), top: 0, width: (kx(X.old - X.rule) - kx(0)) * ln, height: 10, borderRadius: 5, background: `linear-gradient(90deg, ${T.goldDeep}, ${T.gold})` }} />
        <div style={{ position: 'absolute', left: kx(X.old - X.rule) - 2, top: -150, width: 4, height: 300, opacity: ln, background: `repeating-linear-gradient(180deg, ${T.gold} 0 12px, transparent 12px 22px)` }} />
        <div style={{ position: 'absolute', left: kx(X.old - X.rule) + 14, top: -150, opacity: ln, ...label(T.gold), fontSize: 16, lineHeight: 1.4 }}>{X.rule} KM CLOSER<br />= WITHIN {X.old - X.rule} KM</div>
        <Pin f={f} at={a + 4} km={0} name="WORK" c={T.white} up />
        <Pin f={f} at={Q.old} km={X.old} name="OLD HOME" c={T.soft} up />
        <Pin f={f} at={Q.near} km={X.near} name="APT A" c={T.red} />
        <Pin f={f} at={Q.nearer} km={X.nearer} name="APT B" c={GREEN} />
        <Bracket f={f} at={Q.g34} from={X.near} to={X.old} text={`${X.gap_near} km closer ✗`} c={T.red} y={110} />
        <Bracket f={f} at={Q.g43} from={X.nearer} to={X.old} text={`${X.gap_nearer} km closer ✓`} c={GREEN} y={190} />
      </div>
      <div style={{ position: 'absolute', left: 90, top: y + 545, fontFamily: T.font, fontSize: 24, fontWeight: 800, color: T.soft, opacity: ease(f, Q.cost - 2, Q.cost + 8) }}>
        truck · travel · temporary living up to {X.days} days
      </div>
      {f >= Q.cost && <Stamp f={f} at={Q.cost} text={`${money(X.cost)} COUNTS`} x={560} y={y + 40} size={32} color={GREEN} rotate={-5} />}
    </div>
  );
};

// ---------- reveal: the $4,200 splits by income at the new job ----------
const Split = ({ f }: { f: number }) => {
  const a = B.reveal.s, b = B.action.s;
  if (f < a || f > b + 12) return null;
  const y = L.split.y, W = 820, x0 = 130, wE = (W * X.earned) / X.cost, cut = outExpo((f - Q.earned) / 16), slide = outExpo((f - Q.carry) / 22);
  return (
    <div style={{ opacity: ease(f, a, a + 10) * (1 - ease(f, b - 2, b + 12)) }}>
      <div style={{ position: 'absolute', left: 56, top: y - 20, width: 968, height: 520, borderRadius: 28, ...glass }} />
      <div style={{ position: 'absolute', left: 90, top: y + 4, ...label(T.gold) }}>DEDUCTIBLE ONLY FROM INCOME EARNED AT THE NEW JOB</div>
      <div style={{ position: 'absolute', left: x0, top: y + 70, ...label(T.white), fontSize: 20 }}>ELIGIBLE MOVING COSTS · {money(X.cost)}</div>
      <div style={{ position: 'absolute', left: x0, top: y + 110, width: wE, height: 80, borderRadius: '12px 0 0 12px', background: cut > 0.1 ? GREEN : `linear-gradient(90deg, ${T.goldDeep}, ${T.gold})`, display: 'flex', alignItems: 'center', paddingLeft: 18,
        fontFamily: T.font, fontSize: 30, fontWeight: 900, color: '#0b1220' }}>{cut > 0.3 ? `${money(X.earned)} · ${DATA.tax_year}` : money(X.earned)}</div>
      <div style={{ position: 'absolute', left: x0 + wE + 8 * cut, top: y + 110 + 150 * slide, width: W - wE, height: 80, borderRadius: '0 12px 12px 0', background: `linear-gradient(90deg, ${T.goldDeep}, ${T.amber})`, display: 'flex', alignItems: 'center', paddingLeft: 18,
        fontFamily: T.font, fontSize: 30, fontWeight: 900, color: '#1d1503' }}>{money(X.carry)}</div>
      <div style={{ position: 'absolute', left: x0, top: y + 210, width: wE, ...label(T.soft), fontSize: 16, opacity: ease(f, Q.dec - 2, Q.dec + 8) }}>STARTED IN DECEMBER · EARNED {money(X.earned)}</div>
      <div style={{ position: 'absolute', left: x0 + wE + 8, top: y + 360, width: W - wE, ...label(T.amber), fontSize: 18, opacity: slide }}>→ CARRIED FORWARD<br />to future income at the new job</div>
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
        <div style={{ position: 'absolute', left: 36, top: 26, ...label(T.gold) }}>MEASURE FIRST</div>
        <div style={{ position: 'absolute', left: 36, top: 66, right: 36, fontFamily: T.font, fontSize: 32, fontWeight: 900, lineHeight: 1.15, color: T.white, opacity: ease(f, Q.measure - 4, Q.measure + 6) }}>
          Map the shortest public route before you sign · keep every receipt (Form T1-M, line 21900)
        </div>
      </div>
      <div style={{ position: 'absolute', left: 0, top: 240, display: 'flex', alignItems: 'center', gap: 18, opacity: ease(f, Q.next - 4, Q.next + 8) }}>
        <Flag f={f} w={90} amp={0.06} />
        <div style={{ display: 'inline-flex', padding: '16px 28px', borderRadius: 999, background: `linear-gradient(160deg,${T.goldHi},${T.gold} 50%,${T.goldDeep})`, color: '#1d1503', fontFamily: T.font, fontSize: 28, fontWeight: 900,
          transform: `scale(${1 + 0.03 * Math.sin((f - a) / 6)})` }}>NEXT: FIRST HOME →</div>
      </div>
      <div style={{ position: 'absolute', left: 0, top: 330, fontFamily: T.font, fontSize: 26, fontWeight: 700, color: T.white, textShadow, opacity: ease(f, Q.follow, Q.follow + 10) }}>Follow so you don't miss it</div>
      <div style={{ position: 'absolute', left: -10, top: 380, width: 900, padding: '14px 18px', borderRadius: 14, background: 'rgba(10,16,28,.84)', fontFamily: T.font, fontSize: 18, fontWeight: 600, color: T.mute, lineHeight: 1.45, opacity: ease(f, a + 6, a + 20) }}>
        Source: canada.ca (CRA) line 21900 moving expenses; Folio S1-F3-C4 · example · general info, not advice
      </div>
    </div>
  );
};

const Header = ({ f }: { f: number }) => (
  <div style={{ position: 'absolute', left: 80, top: 92, right: 80, display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: T.white, fontSize: 22, fontWeight: 800, letterSpacing: 4, fontFamily: T.font }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}><Flag f={f} w={72} />TAX SECRETS CANADA</div>
    <div style={{ color: T.gold, letterSpacing: 5 }}>MOVING · {DATA.tax_year}</div>
  </div>
);

export const R4V3 = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: T.navy, fontFamily: T.font, overflow: 'hidden' }}>
      <SceneCuts f={f} cuts={CUTS} scene={(i) => i === 0 ? (
        <PhotoPlate f={f} src="plates/r4-s1-4k.jpg" iw={PW} ih={PH} keys={K1} glide={40} blur={0.8 + 4 * (1 - ease(f, 0, 20))} snow={[{ u0: 0.3, v0: 0.05, u1: 1.0, v1: 0.45 }]} />
      ) : i === 1 ? (
        <PhotoPlate f={f} src="plates/r4-s2-4k.jpg" iw={PW} ih={PH} keys={K2} glide={50} blur={0.8} snow={[{ u0: 0.0, v0: 0.0, u1: 1.0, v1: 0.5 }]} />
      ) : (
        <PhotoPlate f={f} src="plates/r4-s3-4k.jpg" iw={PW} ih={PH} keys={K3} glide={40} blur={0.8} steam={{ u: 0.82, v: 0.52, w: 0.03 }} snow={[{ u0: 0.6, v0: 0.0, u1: 1.0, v1: 0.5 }]} />
      )} />
      <Depth f={f} seed={f < B.c2.s ? 50 : f < B.reveal.s ? 51 : 52} warm={0.6} />
      <NavyGrade low={f >= B.action.s ? 1.2 : 1} />
      <Header f={f} />
      <Typed f={f} caps={CAPS} head={T.font} />
      {f < B.c1.s + 20 && <Hook f={f} />}
      <Road f={f} />
      <Split f={f} />
      <End f={f} />
      <Captions f={f} fps={R4FPS} beats={WORDS.beats as never} from={B.c1.s} until={B.action.s} y={1296} />
    </AbsoluteFill>
  );
};
