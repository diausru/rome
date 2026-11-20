// N1 "2027: federal amounts indexed, Manitoba not" (2026-11-20). Hook = FEDERAL vs MANITOBA cards; main = BPA count-up bar, CPP rate strike; reveal = FEDERAL up / MANITOBA flat.
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
const K1: Focus[] = [{ f: 0, u: 0.5, v: 0.32, k: 1.16 }, { f: B.c1.s, u: 0.42, v: 0.3, k: 1.24 }];
const K2: Focus[] = [{ f: 0, u: 0.45, v: 0.3, k: 1.22 }, { f: B.c3.s, u: 0.55, v: 0.32, k: 1.1 }];
const K3: Focus[] = [{ f: 0, u: 0.5, v: 0.36, k: 1.08 }, { f: B.action.s, u: 0.5, v: 0.3, k: 1.2 }];
const CAPS: Cap[] = [
  { at: B.c1.s, l1: '2027 INDEXING', l2: 'federal amounts go up', until: B.c2.s - 2 },
  { at: B.c2.s, l1: 'WHAT IT SAVES', l2: 'at the 14% rate', until: B.c3.s - 2 },
  { at: B.c3.s, l1: 'CPP · PROPOSED', l2: 'base rate cut', until: B.reveal.s - 2 },
  { at: B.reveal.s, l1: 'THE CATCH', l2: 'Manitoba is not indexed', until: B.action.s - 2 },
];
const glass = { background: 'linear-gradient(160deg, rgba(10,16,28,.86), rgba(10,16,28,.62))', border: `1px solid ${T.glassEdge}` };
const label = (c: string) => ({ fontFamily: T.font, fontSize: 18, fontWeight: 900, letterSpacing: 4, color: c });

const Hook = ({ f }: { f: number }) => {
  const card = (x: number, who: string, big: string, sub: string, c: string, d: number) => (
    <div style={{ position: 'absolute', left: x, top: 740, width: 420, height: 300, borderRadius: 26, ...glass, border: `2px solid ${c}`, opacity: clamp(outBack((f - d) / 12)), transform: `translateY(${(1 - clamp(outExpo((f - d) / 14))) * 60}px)` }}>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 30, textAlign: 'center', ...label(T.soft) }}>{who}</div>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 80, textAlign: 'center', fontFamily: T.font, fontSize: 120, fontWeight: 900, color: c, transform: `scale(${1 + 0.05 * Math.sin(f / 4)})` }}>{big}</div>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 230, textAlign: 'center', ...label(c) }}>{sub}</div>
    </div>
  );
  return (
    <div style={{ opacity: 1 - ease(f, B.c1.s - 6, B.c1.s + 8) }}>
      <Kinetic f={f} at={0} now text={REEL.hook.l1} x={80} y={440} size={66} nowrap />
      <Kinetic f={f} at={0} now text={REEL.hook.l2} x={80} y={524} size={70} nowrap color={T.gold} />
      {card(80, 'FEDERAL 2027', '↑', 'INDEXED', GREEN, 2)}
      {f >= Q.doesnt - 4 && card(580, 'MANITOBA 2027', '❄', 'NOT INDEXED', T.red, Q.doesnt - 4)}
      <div style={{ position: 'absolute', left: 80, width: 920, top: 1080, textAlign: 'center', fontFamily: T.font, fontSize: 30, fontWeight: 800, color: T.white, textShadow, opacity: ease(f, Q.more - 2, Q.more + 10) }}>earn more before federal tax · from Jan 1, 2027</div>
    </div>
  );
};

const Main = ({ f }: { f: number }) => {
  const a = B.c1.s + 2, b = B.reveal.s;
  if (f < a - 1 || f > b + 14) return null;
  const y = L.chips.y, inC1 = f < B.c2.s, inC2 = f >= B.c2.s && f < B.c3.s, inC3 = f >= B.c3.s;
  const g = outExpo((f - Q.rises) / 30), bpa = Math.round(X.bpa26 + (X.bpa27 - X.bpa26) * clamp(g));
  const W = 800, w26 = W * X.bpa26 / X.bpa27;
  return (
    <div style={{ opacity: outExpo((f - a) / 14) * (1 - ease(f, b - 2, b + 12)) }}>
      <div style={{ position: 'absolute', left: 56, top: y - 20, width: 968, height: 640, borderRadius: 28, ...glass }} />
      {!inC3 && <>
        <div style={{ position: 'absolute', left: 90, top: y, ...label(T.mute) }}>FEDERAL BASIC PERSONAL AMOUNT · MAX</div>
        <div style={{ position: 'absolute', left: 90, top: y + 40, ...label(T.soft) }}>2026: {money(X.bpa26)} → 2027</div>
        <div style={{ position: 'absolute', left: 90, top: y + 80, fontFamily: T.font, fontSize: 96, fontWeight: 900, ...goldFill }}>{money(bpa)}</div>
        <div style={{ position: 'absolute', left: 90, top: y + 210, width: W, height: 60, borderRadius: 12, background: 'rgba(255,255,255,.08)' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, height: 60, width: w26, borderRadius: 12, background: 'rgba(127,224,168,.55)' }} />
          <div style={{ position: 'absolute', left: w26 + 4, top: 0, height: 60, width: Math.max(0, (W - w26 - 4) * clamp(g)), borderRadius: 12, background: `linear-gradient(180deg, ${T.goldHi}, ${T.goldDeep})` }} />
        </div>
      </>}
      {inC1 && <div style={{ position: 'absolute', left: 90, top: y + 320, width: 900, opacity: ease(f, Q.brackets - 4, Q.brackets + 8) }}>
        <div style={{ ...label(T.mute) }}>FIRST FEDERAL BRACKET (14%) ENDS AT</div>
        <div style={{ marginTop: 14, fontFamily: T.font, fontSize: 56, fontWeight: 900, color: T.white }}>$58,523 <span style={{ color: T.gold }}>→ $60,044</span></div>
      </div>}
      {inC2 && <div style={{ position: 'absolute', left: 90, top: y + 320, width: 900, opacity: ease(f, B.c2.s, B.c2.s + 10) }}>
        <div style={{ fontFamily: T.font, fontSize: 40, fontWeight: 900, color: T.white }}>+{money(X.diff)} tax-free</div>
        <div style={{ marginTop: 16, fontFamily: T.font, fontSize: 30, fontWeight: 800, color: T.soft }}>{money(X.diff)} × 14% = ${X.saving.toFixed(2)}</div>
        <div style={{ marginTop: 16, fontFamily: T.font, fontSize: 48, fontWeight: 900, color: GREEN, opacity: ease(f, Q.sixty - 3, Q.sixty + 8) }}>≈ $60 LESS FEDERAL TAX</div>
      </div>}
      {inC3 && <>
        <div style={{ position: 'absolute', left: 90, top: y, ...label(T.mute) }}>CPP BASE RATE · EMPLOYEE · PROPOSED FOR 2027</div>
        <div style={{ position: 'absolute', left: 90, top: y + 60, fontFamily: T.font, fontSize: 110, fontWeight: 900, color: T.white }}>
          <span style={{ opacity: 1 - 0.6 * ease(f, Q.drops, Q.drops + 10), textDecoration: f > Q.drops + 6 ? 'line-through' : 'none' }}>4.95%</span>
          <span style={{ ...goldFill, opacity: ease(f, Q.drops, Q.drops + 12) }}> → 4.75%</span>
        </div>
        <div style={{ position: 'absolute', left: 90, top: y + 230, fontFamily: T.font, fontSize: 28, fontWeight: 800, color: T.soft, opacity: ease(f, Q.onefortysix - 20, Q.onefortysix) }}>0.20% × ($76,700 − $3,500) = ${X.cpp_saving.toFixed(2)} max / year</div>
        <div style={{ position: 'absolute', left: 90, top: y + 290, ...label(T.mute), opacity: ease(f, Q.drops, Q.drops + 10) }}>IF ENACTED AS PROPOSED · ANNOUNCED APR 28, 2026</div>
        {f >= Q.onefortysix && <Stamp f={f} at={Q.onefortysix} text="UP TO $146/YR BACK" x={150} y={y + 400} size={40} color={T.red} rotate={-4} />}
      </>}
    </div>
  );
};

const Split = ({ f }: { f: number }) => {
  const a = B.reveal.s, b = B.action.s;
  if (f < a || f > b + 12) return null;
  const y = L.split.y;
  const col = (x: number, t: string, s: string, v: string, ok: boolean, at: number) => {
    const p = outBack((f - at) / 12);
    return (
      <div style={{ position: 'absolute', left: x, top: y + 90, width: 420, height: 320, borderRadius: 22, border: `3px solid ${ok ? GREEN : T.red}`, background: ok ? 'rgba(127,224,168,.10)' : 'rgba(220,70,70,.10)',
        opacity: clamp(p), transform: `scale(${clamp(p, 0.6, 1.04)})` }}>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 24, textAlign: 'center', fontFamily: T.font, fontSize: 70, fontWeight: 900, color: ok ? GREEN : T.red }}>{ok ? '↑' : '='}</div>
        <div style={{ position: 'absolute', left: 10, right: 10, top: 120, textAlign: 'center', fontFamily: T.font, fontSize: 32, fontWeight: 900, color: T.white }}>{t}</div>
        <div style={{ position: 'absolute', left: 10, right: 10, top: 170, textAlign: 'center', fontFamily: T.font, fontSize: 24, fontWeight: 800, color: ok ? GREEN : T.soft }}>{s}</div>
        <div style={{ position: 'absolute', left: 10, right: 10, top: 220, textAlign: 'center', fontFamily: T.font, fontSize: 52, fontWeight: 900, ...goldFill }}>{v}</div>
      </div>
    );
  };
  return (
    <div style={{ opacity: ease(f, a, a + 10) * (1 - ease(f, b - 2, b + 12)) }}>
      <div style={{ position: 'absolute', left: 56, top: y - 20, width: 968, height: 480, borderRadius: 28, ...glass }} />
      <div style={{ position: 'absolute', left: 90, top: y + 10, ...label(T.gold) }}>BASIC PERSONAL AMOUNT · 2027</div>
      {col(90, 'FEDERAL', 'indexed', money(X.bpa27), true, B.reveal.s + 6)}
      {col(570, 'MANITOBA', 'no indexing', money(X.mb_bpa), false, Q.noindex)}
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
        <div style={{ position: 'absolute', left: 36, top: 66, right: 36, fontFamily: T.font, fontSize: 32, fontWeight: 900, lineHeight: 1.15, color: T.white, opacity: ease(f, Q.td1 - 4, Q.td1 + 6) }}>
          First 2027 pay stub · update TD1 / TD1MB if things changed
        </div>
      </div>
      <div style={{ position: 'absolute', left: 0, top: 240, display: 'flex', alignItems: 'center', gap: 18, opacity: ease(f, Q.next - 4, Q.next + 8) }}>
        <Flag f={f} w={90} amp={0.06} />
        <div style={{ display: 'inline-flex', padding: '16px 28px', borderRadius: 999, background: `linear-gradient(160deg,${T.goldHi},${T.gold} 50%,${T.goldDeep})`, color: '#1d1503', fontFamily: T.font, fontSize: 28, fontWeight: 900,
          transform: `scale(${1 + 0.03 * Math.sin((f - a) / 6)})` }}>NEXT: PART-TIME VS FULL-TIME →</div>
      </div>
      <div style={{ position: 'absolute', left: 0, top: 330, fontFamily: T.font, fontSize: 26, fontWeight: 700, color: T.white, textShadow, opacity: ease(f, Q.follow, Q.follow + 10) }}>Follow so you don't miss it</div>
      <div style={{ position: 'absolute', left: -10, top: 380, width: 900, padding: '14px 18px', borderRadius: 14, background: 'rgba(10,16,28,.84)', fontFamily: T.font, fontSize: 18, fontWeight: 600, color: T.mute, lineHeight: 1.45, opacity: ease(f, a + 6, a + 20) }}>
        Source: CRA T4127 (Jan 1, 2027, 124th ed.) · canada.ca 2026 rates & indexation · CPP cut proposed, not yet enacted · example · general info, not advice
      </div>
    </div>
  );
};

const Header = ({ f }: { f: number }) => (
  <div style={{ position: 'absolute', left: 80, top: 92, right: 80, display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: T.white, fontSize: 22, fontWeight: 800, letterSpacing: 4, fontFamily: T.font }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}><Flag f={f} w={72} />TAX SECRETS CANADA</div>
    <div style={{ color: T.gold, letterSpacing: 5 }}>NEWS · 2027</div>
  </div>
);

export const N1V3 = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: T.navy, fontFamily: T.font, overflow: 'hidden' }}>
      <SceneCuts f={f} cuts={CUTS} scene={(i) => i === 0 ? (
        <PhotoPlate f={f} src="plates/n1-s1-4k.jpg" iw={PW} ih={PH} keys={K1} glide={40} blur={0.8 + 4 * (1 - ease(f, 0, 20))} snow={[{ u0: 0.0, v0: 0.0, u1: 1.0, v1: 0.4 }]} />
      ) : i === 1 ? (
        <PhotoPlate f={f} src="plates/n1-s2-4k.jpg" iw={PW} ih={PH} keys={K2} glide={50} blur={0.8} steam={{ u: 0.5, v: 0.62, w: 0.03 }} />
      ) : (
        <PhotoPlate f={f} src="plates/n1-s3-4k.jpg" iw={PW} ih={PH} keys={K3} glide={40} blur={0.8} snow={[{ u0: 0.0, v0: 0.0, u1: 1.0, v1: 0.6 }]} />
      )} />
      <Depth f={f} seed={f < B.c2.s ? 30 : f < B.reveal.s ? 31 : 32} warm={0.6} />
      <NavyGrade low={f >= B.action.s ? 1.2 : 1} />
      <Header f={f} />
      <Typed f={f} caps={CAPS} head={T.font} />
      {f < B.c1.s + 20 && <Hook f={f} />}
      <Main f={f} />
      <Split f={f} />
      <End f={f} />
      <Captions f={f} fps={N1FPS} beats={WORDS.beats as never} from={B.c1.s} until={B.action.s} y={1296} />
    </AbsoluteFill>
  );
};
