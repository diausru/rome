// M3 "CCB: why only Mom's account" — investigation format, motion engine v1 (2026-11-04). Checklist: channel/REEL-CHECKLIST.md.
// Variety vs M10 / M29 / R4: hook = two account cards (MAYA ✓ / DAN $0) with a gold coin dropping into Maya's; main visual =
// a 4-step decision path (one payee per home → mother presumed → dad + signed letter → same-sex parents choose);
// re-hook = "SIGNED LETTER = DAD CAN APPLY" stamp (≈55 %); reveal = a balance scale that settles level ($8,157 to Maya =
// $8,157 to Dan); end = check card + next pill.
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { PhotoPlate, SceneCuts, type Focus } from './Plate';
import { Flag } from './RaiseShort';
import { Typed, beatsFrom, type Cap } from './Kit';
import TL from './m3-timeline.json';
import WORDS from './m3-words.json';
import CUE from './m3-cues.json';
import DATA from '../../m3/data.json';
import REEL from '../../m3/reel.json';
import { T, goldFill, textShadow } from './motion/brand';
import { Captions, Depth, Kinetic, NavyGrade, Stamp, clamp, ease, money, outBack, outExpo } from './motion/Reel';

export const M3FPS = 24;
const B = beatsFrom(TL, M3FPS);
export const M3DUR = Math.ceil((TL.total + REEL.hold_after_vo) * M3FPS);
const Q = Object.fromEntries(Object.entries(CUE).map(([k, v]) => [k, Math.round((v as number) * M3FPS)])) as Record<string, number>;
const X = DATA.example;
const GREEN = T.green;
const PW = 2294, PH = 4096;
const CUTS = [B.c2.s, B.reveal.s];
const L = Object.fromEntries(Object.entries(REEL.layout).map(([k, v]) => [k, { x: v.box[0], y: v.box[1], w: v.box[2], h: v.box[3] }])) as Record<string, { x: number; y: number; w: number; h: number }>;
const K1: Focus[] = [{ f: 0, u: 0.5, v: 0.3, k: 1.14 }, { f: B.c1.s, u: 0.45, v: 0.28, k: 1.22 }];
const K2: Focus[] = [{ f: 0, u: 0.5, v: 0.32, k: 1.2 }, { f: B.c4.s, u: 0.55, v: 0.3, k: 1.12 }];
const K3: Focus[] = [{ f: 0, u: 0.5, v: 0.34, k: 1.2 }, { f: B.action.s, u: 0.5, v: 0.3, k: 1.08 }];
const CAPS: Cap[] = [
  { at: B.c1.s, l1: 'THE FAMILY', l2: `Maya, Dan and a ${X.child_age}-year-old`, until: B.c2.s - 2 },
  { at: B.c2.s, l1: 'THE RULE', l2: 'one payee per home', until: B.c3.s - 2 },
  { at: B.c3.s, l1: 'THE EXCEPTION', l2: 'dad is the main caregiver', until: B.c4.s - 2 },
  { at: B.c4.s, l1: 'SAME-SEX PARENTS', l2: 'one applies for all children', until: B.reveal.s - 2 },
  { at: B.reveal.s, l1: 'THE TWIST', l2: 'who gets it ≠ how much', until: B.action.s - 2 },
];
const glass = { background: 'linear-gradient(160deg, rgba(10,16,28,.86), rgba(10,16,28,.62))', border: `1px solid ${T.glassEdge}` };
const label = (c: string) => ({ fontFamily: T.font, fontSize: 18, fontWeight: 900, letterSpacing: 4, color: c });

const Account = ({ f, x, name, on, at, c }: { f: number; x: number; name: string; on: boolean; at: number; c: string }) => {
  const hit = ease(f, at, at + 8);
  return (
    <div style={{ position: 'absolute', left: x, top: 700, width: 400, height: 260, borderRadius: 28, ...glass, border: `2px solid ${on ? c : T.glassEdge}`, opacity: ease(f, 2, 12) }}>
      <div style={{ position: 'absolute', left: 30, top: 28, ...label(T.soft), fontSize: 18 }}>{name}'S ACCOUNT</div>
      <div style={{ position: 'absolute', left: 30, top: 70, fontFamily: T.font, fontSize: 84, fontWeight: 900, color: on ? c : T.mute, opacity: on ? hit : 0.4 + 0.6 * hit }}>{on ? 'CCB ✓' : '$0'}</div>
      <div style={{ position: 'absolute', left: 30, top: 186, ...label(on ? c : T.mute), fontSize: 16, opacity: hit }}>{on ? 'EVERY MONTH' : 'NEVER'}</div>
    </div>
  );
};
const Hook = ({ f }: { f: number }) => {
  const drop = outExpo((f - Q.dep + 4) / 18), land = ease(f, Q.maya - 8, Q.maya);
  return (
    <div style={{ opacity: 1 - ease(f, B.c1.s - 6, B.c1.s + 8) }}>
      <Kinetic f={f} at={0} now text={REEL.hook.l1} x={80} y={440} size={70} nowrap />
      <Kinetic f={f} at={0} now text={REEL.hook.l2} x={80} y={524} size={70} nowrap color={T.gold} />
      <Account f={f} x={80} name="MAYA" on at={Q.maya} c={GREEN} />
      <Account f={f} x={600} name="DAN" on={false} at={Q.never} c={T.red} />
      <div style={{ position: 'absolute', left: 230 + 0 * land, top: 640 + 140 * land, width: 100, height: 100, borderRadius: 50, background: `radial-gradient(circle at 35% 30%, ${T.goldHi}, ${T.gold} 55%, ${T.goldDeep})`,
        boxShadow: '0 10px 30px rgba(0,0,0,.5)', opacity: clamp(drop) * (1 - land), transform: `translateY(${-120 * (1 - drop)}px)`, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: T.font, fontSize: 54, fontWeight: 900, color: '#1d1503' }}>$</div>
    </div>
  );
};

// ---------- the rule as a decision path ----------
const Node = ({ f, at, y, text, sub, c, x = 110, w = 860 }: { f: number; at: number; y: number; text: string; sub: string; c: string; x?: number; w?: number }) => {
  if (f < at - 2) return null;
  const p = outExpo((f - at) / 14);
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, height: 104, borderRadius: 18, border: `2px solid ${c}`, background: 'rgba(255,255,255,.05)', opacity: clamp(p), transform: `translateX(${(1 - p) * 60}px)`, padding: '16px 24px', boxSizing: 'border-box' }}>
      <div style={{ fontFamily: T.font, fontSize: 32, fontWeight: 900, color: T.white }}>{text}</div>
      <div style={{ ...label(c), fontSize: 16, marginTop: 6 }}>{sub}</div>
    </div>
  );
};
const Rule = ({ f }: { f: number }) => {
  const a = B.c1.s + 2, b = B.reveal.s;
  if (f < a - 1 || f > b + 14) return null;
  const y = L.rule.y;
  return (
    <div style={{ opacity: outExpo((f - a) / 14) * (1 - ease(f, b - 2, b + 12)) }}>
      <div style={{ position: 'absolute', left: 56, top: y - 20, width: 968, height: 640, borderRadius: 28, ...glass }} />
      <div style={{ position: 'absolute', left: 90, top: y, ...label(T.mute) }}>CANADA CHILD BENEFIT · JULY 2026 – JUNE 2027</div>
      <div style={{ position: 'absolute', left: 90, top: y + 34, fontFamily: T.font, fontSize: 26, fontWeight: 800, color: T.soft, opacity: ease(f, Q.amt - 2, Q.amt + 8) }}>
        up to <span style={{ color: T.gold, fontWeight: 900 }}>{money(X.under6)}</span>/yr per child under 6 · {money(X.age6to17)} age 6–17
      </div>
      <Node f={f} at={Q.one} y={y + 100} text="1 · One payee per home" sub="CRA PAYS ONLY ONE PERSON" c={T.soft} />
      <Node f={f} at={Q.law} y={y + 220} text="2 · Mother presumed responsible" sub="INCOME TAX ACT · SHE APPLIES" c={T.gold} />
      <Node f={f} at={Q.letter - 4} y={y + 340} text="3 · Dad does most care?" sub="HE APPLIES + SIGNED LETTER FROM MOM" c={GREEN} />
      <Node f={f} at={Q.c4 + 2} y={y + 460} text="4 · Same-sex parents" sub="ONE APPLIES FOR ALL KIDS · YOU CHOOSE" c={GREEN} />
      {f >= Q.letter + 48 && <Stamp f={f} at={Q.letter + 48} text="SIGNED LETTER = DAD CAN APPLY" x={300} y={y + 572} size={24} color={GREEN} rotate={-4} />}
    </div>
  );
};

// ---------- reveal: the scale stays level ----------
const Scale = ({ f }: { f: number }) => {
  const a = B.reveal.s, b = B.action.s;
  if (f < a || f > b + 12) return null;
  const y = L.scale.y, tilt = 8 * Math.exp(-(f - a) / 18) * Math.cos((f - a) / 5), s = ease(f, Q.same - 2, Q.same + 10);
  const pan = (x: number, name: string) => (
    <div style={{ position: 'absolute', left: x, top: 150, width: 300, textAlign: 'center' }}>
      <div style={{ margin: '0 auto', width: 2, height: 70, background: T.soft }} />
      <div style={{ width: 300, height: 120, borderRadius: '0 0 150px 150px', background: 'rgba(241,199,91,.16)', border: `2px solid ${T.gold}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ ...label(T.soft), fontSize: 15 }}>PAID TO {name}</div>
        <div style={{ fontFamily: T.font, fontSize: 40, fontWeight: 900, color: T.gold }}>{money(X.under6)}</div>
      </div>
    </div>
  );
  return (
    <div style={{ opacity: ease(f, a, a + 10) * (1 - ease(f, b - 2, b + 12)) }}>
      <div style={{ position: 'absolute', left: 56, top: y - 20, width: 968, height: 520, borderRadius: 28, ...glass }} />
      <div style={{ position: 'absolute', left: 90, top: y + 4, ...label(T.gold) }}>WHO RECEIVES IT VS HOW MUCH</div>
      <div style={{ position: 'absolute', left: 535, top: y + 90, width: 10, height: 330, background: T.soft, borderRadius: 5 }} />
      <div style={{ position: 'absolute', left: 0, top: y + 70, width: 1080, height: 400, transformOrigin: '540px 30px', transform: `rotate(${tilt}deg)` }}>
        <div style={{ position: 'absolute', left: 180, top: 24, width: 720, height: 12, borderRadius: 6, background: T.white }} />
        {pan(90, 'MAYA')}
        {pan(690, 'DAN')}
      </div>
      <div style={{ position: 'absolute', left: 90, top: y + 430, width: 900, textAlign: 'center', fontFamily: T.font, fontSize: 34, fontWeight: 900, color: GREEN, opacity: s }}>SAME AMOUNT EITHER WAY</div>
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
        <div style={{ position: 'absolute', left: 36, top: 26, ...label(T.gold) }}>DECIDE & FILE</div>
        <div style={{ position: 'absolute', left: 36, top: 66, right: 36, fontFamily: T.font, fontSize: 32, fontWeight: 900, lineHeight: 1.15, color: T.white, opacity: ease(f, Q.pick - 4, Q.pick + 6) }}>
          Decide who applies (letter if it’s Dad) · both keep filing returns on time
        </div>
      </div>
      <div style={{ position: 'absolute', left: 0, top: 240, display: 'flex', alignItems: 'center', gap: 18, opacity: ease(f, Q.next - 4, Q.next + 8) }}>
        <Flag f={f} w={90} amp={0.06} />
        <div style={{ display: 'inline-flex', padding: '16px 28px', borderRadius: 999, background: `linear-gradient(160deg,${T.goldHi},${T.gold} 50%,${T.goldDeep})`, color: '#1d1503', fontFamily: T.font, fontSize: 28, fontWeight: 900,
          transform: `scale(${1 + 0.03 * Math.sin((f - a) / 6)})` }}>NEXT: SHARED CUSTODY →</div>
      </div>
      <div style={{ position: 'absolute', left: 0, top: 330, fontFamily: T.font, fontSize: 26, fontWeight: 700, color: T.white, textShadow, opacity: ease(f, Q.follow, Q.follow + 10) }}>Follow so you don't miss it</div>
      <div style={{ position: 'absolute', left: -10, top: 380, width: 900, padding: '14px 18px', borderRadius: 14, background: 'rgba(10,16,28,.84)', fontFamily: T.font, fontSize: 18, fontWeight: 600, color: T.mute, lineHeight: 1.45, opacity: ease(f, a + 6, a + 20) }}>
        Source: canada.ca (CRA) Canada child benefit: who can apply; how much (July 2026–June 2027) · example · general info, not advice
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

export const M3V3 = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: T.navy, fontFamily: T.font, overflow: 'hidden' }}>
      <SceneCuts f={f} cuts={CUTS} scene={(i) => i === 0 ? (
        <PhotoPlate f={f} src="plates/m3-s1-4k.jpg" iw={PW} ih={PH} keys={K1} glide={40} blur={0.8 + 4 * (1 - ease(f, 0, 20))} snow={[{ u0: 0.2, v0: 0.05, u1: 0.9, v1: 0.45 }]} steam={{ u: 0.12, v: 0.74, w: 0.03 }} />
      ) : i === 1 ? (
        <PhotoPlate f={f} src="plates/m3-s2-4k.jpg" iw={PW} ih={PH} keys={K2} glide={50} blur={0.8} snow={[{ u0: 0.0, v0: 0.0, u1: 1.0, v1: 0.7 }]} />
      ) : (
        <PhotoPlate f={f} src="plates/m3-s3-4k.jpg" iw={PW} ih={PH} keys={K3} glide={40} blur={0.8} snow={[{ u0: 0.86, v0: 0.0, u1: 1.0, v1: 0.4 }]} steam={{ u: 0.73, v: 0.57, w: 0.03 }} />
      )} />
      <Depth f={f} seed={f < B.c2.s ? 50 : f < B.reveal.s ? 51 : 52} warm={0.6} />
      <NavyGrade low={f >= B.action.s ? 1.2 : 1} />
      <Header f={f} />
      <Typed f={f} caps={CAPS} head={T.font} />
      {f < B.c1.s + 20 && <Hook f={f} />}
      <Rule f={f} />
      <Scale f={f} />
      <End f={f} />
      <Captions f={f} fps={M3FPS} beats={WORDS.beats as never} from={B.c1.s} until={B.action.s} y={1296} />
    </AbsoluteFill>
  );
};
