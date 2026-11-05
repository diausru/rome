// M26 "Two homes, two CCB deposits" — investigation format, motion engine v1 (2026-11-05). Checklist: channel/REEL-CHECKLIST.md.
// Variety vs M3 / M10 / M29: hook = two code-drawn homes with a "$ ≠ $"; main visual = 14 nights (week on / week off), a 0–100
// band with the 40–60 % shared-custody window, a 50/50 split, then two unequal halves on each parent's own income;
// re-hook = "EACH ON OWN INCOME" stamp (≈57 %); reveal = a three-zone slider (under 40 / 40–60 / over 60) whose marker slides
// 50 → 64 → 38; end = check card + next pill.
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { PhotoPlate, SceneCuts, type Focus } from './Plate';
import { Flag } from './RaiseShort';
import { Typed, beatsFrom, type Cap } from './Kit';
import TL from './m26-timeline.json';
import WORDS from './m26-words.json';
import CUE from './m26-cues.json';
import DATA from '../../m26/data.json';
import REEL from '../../m26/reel.json';
import { T, goldFill, textShadow } from './motion/brand';
import { Captions, Depth, Kinetic, NavyGrade, Stamp, clamp, ease, money, outBack, outExpo } from './motion/Reel';

export const M26FPS = 24;
const B = beatsFrom(TL, M26FPS);
export const M26DUR = Math.ceil((TL.total + REEL.hold_after_vo) * M26FPS);
const Q = Object.fromEntries(Object.entries(CUE).map(([k, v]) => [k, Math.round((v as number) * M26FPS)])) as Record<string, number>;
const X = DATA.example;
const GREEN = T.green;
const PW = 2294, PH = 4096;
const CUTS = [B.c2.s, B.reveal.s];
const L = Object.fromEntries(Object.entries(REEL.layout).map(([k, v]) => [k, { x: v.box[0], y: v.box[1], w: v.box[2], h: v.box[3] }])) as Record<string, { x: number; y: number; w: number; h: number }>;
const K1: Focus[] = [{ f: 0, u: 0.5, v: 0.3, k: 1.14 }, { f: B.c1.s, u: 0.45, v: 0.28, k: 1.22 }];
const K2: Focus[] = [{ f: 0, u: 0.5, v: 0.32, k: 1.2 }, { f: B.c4.s, u: 0.55, v: 0.3, k: 1.12 }];
const K3: Focus[] = [{ f: 0, u: 0.5, v: 0.34, k: 1.2 }, { f: B.action.s, u: 0.5, v: 0.3, k: 1.08 }];
const CAPS: Cap[] = [
  { at: B.c1.s, l1: 'THE SPLIT', l2: `Jordan, Casey and a ${X.child_age}-year-old`, until: B.c2.s - 2 },
  { at: B.c2.s, l1: 'THE RULE', l2: `${X.lo}% to ${X.hi}% of the time`, until: B.c3.s - 2 },
  { at: B.c3.s, l1: 'THE PAYMENT', l2: 'half of a full-time amount each', until: B.c4.s - 2 },
  { at: B.c4.s, l1: 'NOT EQUAL HALVES', l2: "each on that parent's own income", until: B.reveal.s - 2 },
  { at: B.reveal.s, l1: 'THE TWIST', l2: 'the 40 and 60 lines', until: B.action.s - 2 },
];
const glass = { background: 'linear-gradient(160deg, rgba(10,16,28,.86), rgba(10,16,28,.62))', border: `1px solid ${T.glassEdge}` };
const label = (c: string) => ({ fontFamily: T.font, fontSize: 18, fontWeight: 900, letterSpacing: 4, color: c });

const JC = '#ff9a5a', CC = '#8fb8ff';
const HomeCard = ({ f, x, name, c, at, amt }: { f: number; x: number; name: string; c: string; at: number; amt: string }) => {
  const p = outBack((f - at) / 14);
  return (
    <div style={{ position: 'absolute', left: x, top: 690, width: 400, height: 300, opacity: clamp(p), transform: `translateY(${(1 - clamp(p)) * 40}px)` }}>
      <div style={{ position: 'absolute', left: 40, top: 0, width: 320, height: 110, clipPath: 'polygon(50% 0, 100% 100%, 0 100%)', background: c, opacity: 0.85 }} />
      <div style={{ position: 'absolute', left: 60, top: 110, width: 280, height: 170, borderRadius: '0 0 18px 18px', ...glass, border: `2px solid ${c}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ ...label(c), fontSize: 18 }}>{name}</div>
        <div style={{ fontFamily: T.font, fontSize: 64, fontWeight: 900, color: T.white, marginTop: 8 }}>{amt}</div>
      </div>
    </div>
  );
};
const Hook = ({ f }: { f: number }) => {
  const ne = ease(f, Q.not - 3, Q.not + 6);
  return (
    <div style={{ opacity: 1 - ease(f, B.c1.s - 6, B.c1.s + 8) }}>
      <Kinetic f={f} at={0} now text={REEL.hook.l1} x={80} y={440} size={70} nowrap />
      <Kinetic f={f} at={0} now text={REEL.hook.l2} x={80} y={524} size={70} nowrap color={T.gold} />
      <HomeCard f={f} x={60} name="HOME 1" c={JC} at={Math.min(Q.two - 4, 6)} amt="$" />
      <HomeCard f={f} x={620} name="HOME 2" c={CC} at={Q.two + 4} amt="$" />
      <div style={{ position: 'absolute', left: 440, top: 840, width: 200, textAlign: 'center', fontFamily: T.font, fontSize: 110, fontWeight: 900, color: T.gold, opacity: ne, transform: `scale(${0.6 + 0.4 * ne})` }}>≠</div>
    </div>
  );
};

// ---------- 14 nights, the 40–60 band, the 50/50 split ----------
const Weeks = ({ f }: { f: number }) => {
  const a = B.c1.s + 2, b = B.reveal.s;
  if (f < a - 1 || f > b + 14) return null;
  const y = L.weeks.y, fill = clamp((f - Q.week + 10) / 28), band = ease(f, Q.lo - 2, Q.hi + 10), half = outExpo((f - Q.half) / 18), own = outExpo((f - Q.own) / 20);
  const sq = 108, gap = 10, x0 = 110;
  return (
    <div style={{ opacity: outExpo((f - a) / 14) * (1 - ease(f, b - 2, b + 12)) }}>
      <div style={{ position: 'absolute', left: 56, top: y - 20, width: 968, height: 640, borderRadius: 28, ...glass }} />
      <div style={{ position: 'absolute', left: 90, top: y, ...label(T.mute) }}>TWO WEEKS OF NIGHTS · WEEK ON / WEEK OFF</div>
      {Array.from({ length: 14 }, (_, i) => {
        const on = clamp(fill * 14 - i), j = i < 7;
        return <div key={i} style={{ position: 'absolute', left: x0 + (i % 7) * (sq + gap), top: y + 40 + Math.floor(i / 7) * (60 + gap), width: sq, height: 60, borderRadius: 10,
          background: j ? JC : CC, opacity: 0.15 + 0.75 * on, border: '1px solid rgba(255,255,255,.2)' }} />;
      })}
      <div style={{ position: 'absolute', left: 90, top: y + 186, width: 900, display: 'flex', justifyContent: 'space-between', opacity: fill }}>
        <span style={{ ...label(JC), fontSize: 18 }}>JORDAN · 7 NIGHTS</span><span style={{ ...label(CC), fontSize: 18 }}>CASEY · 7 NIGHTS</span>
      </div>
      {/* 0–100 band */}
      <div style={{ position: 'absolute', left: 110, top: y + 240, width: 860, height: 16, borderRadius: 8, background: 'rgba(255,255,255,.12)', opacity: band }} />
      <div style={{ position: 'absolute', left: 110 + 860 * 0.4, top: y + 236, width: 860 * 0.2 * band, height: 24, borderRadius: 8, background: GREEN, opacity: band }} />
      <div style={{ position: 'absolute', left: 110 + 860 * 0.4 - 30, top: y + 268, ...label(GREEN), fontSize: 16, opacity: band }}>{X.lo}% – {X.hi}% = SHARED CUSTODY</div>
      <div style={{ position: 'absolute', left: 110 + 860 * 0.5 - 2, top: y + 226, width: 4, height: 44, background: T.white, opacity: band }} />
      {/* split */}
      <div style={{ position: 'absolute', left: 110, top: y + 320, width: 860, height: 110, borderRadius: 18, border: `2px solid ${T.gold}`, opacity: ease(f, Q.half - 4, Q.half + 4) * (1 - half * 0.0) }}>
        <div style={{ position: 'absolute', left: 0, top: 0, width: 430 - 8 * half, height: 106, borderRadius: '16px 0 0 16px', background: `linear-gradient(90deg, ${JC}55, ${JC}22)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: T.font, fontSize: 36, fontWeight: 900, color: T.white }}>50%</div>
        <div style={{ position: 'absolute', right: 0, top: 0, width: 430 - 8 * half, height: 106, borderRadius: '0 16px 16px 0', background: `linear-gradient(90deg, ${CC}22, ${CC}55)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: T.font, fontSize: 36, fontWeight: 900, color: T.white }}>50%</div>
      </div>
      <div style={{ position: 'absolute', left: 110, top: y + 440, ...label(T.soft), fontSize: 13, opacity: half }}>HALF OF EACH PARENT'S OWN FULL-TIME AMOUNT · UNDER 6: UP TO $4,078.50</div>
      {/* own income */}
      <div style={{ position: 'absolute', left: 110, top: y + 480, width: 860, opacity: own }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}><span style={{ ...label(JC), fontSize: 14, width: 300, whiteSpace: 'nowrap' }}>JORDAN · LOWER INCOME</span><div style={{ height: 34, width: 500 * own, borderRadius: 8, background: JC }} /></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 12 }}><span style={{ ...label(CC), fontSize: 14, width: 300, whiteSpace: 'nowrap' }}>CASEY · HIGHER INCOME</span><div style={{ height: 34, width: 290 * own, borderRadius: 8, background: CC }} /></div>
      </div>
      {f >= Q.own + 10 && <Stamp f={f} at={Q.own + 10} text="EACH ON OWN INCOME" x={540} y={y + 572} size={26} color={T.gold} rotate={-4} />}
    </div>
  );
};

// ---------- reveal: three zones, the marker slides ----------
const Zones = ({ f }: { f: number }) => {
  const a = B.reveal.s, b = B.action.s;
  if (f < a || f > b + 12) return null;
  const y = L.zones.y, W = 860, x0 = 110;
  const pos = f < Q.over ? 50 : f < Q.under ? 50 + 14 * outExpo((f - Q.over) / 18) : 64 - 26 * outExpo((f - Q.under) / 18);
  const zone = pos > 60 ? 2 : pos < 40 ? 0 : 1;
  const verdict = ['UNDER 40% · CAN’T APPLY', '40–60% · SHARED · 50% EACH', 'OVER 60% · ONLY YOU ARE ELIGIBLE'][zone];
  const vc = [T.red, GREEN, T.gold][zone];
  return (
    <div style={{ opacity: ease(f, a, a + 10) * (1 - ease(f, b - 2, b + 12)) }}>
      <div style={{ position: 'absolute', left: 56, top: y - 20, width: 968, height: 520, borderRadius: 28, ...glass }} />
      <div style={{ position: 'absolute', left: 90, top: y + 4, ...label(T.gold) }}>SHARE OF NIGHTS WITH YOU</div>
      <div style={{ position: 'absolute', left: x0, top: y + 150, width: W * 0.4, height: 70, borderRadius: '14px 0 0 14px', background: 'rgba(224,57,43,.35)' }} />
      <div style={{ position: 'absolute', left: x0 + W * 0.4, top: y + 150, width: W * 0.2, height: 70, background: 'rgba(127,224,168,.45)' }} />
      <div style={{ position: 'absolute', left: x0 + W * 0.6, top: y + 150, width: W * 0.4, height: 70, borderRadius: '0 14px 14px 0', background: 'rgba(241,199,91,.35)' }} />
      {[0, 40, 60, 100].map((v) => <div key={v} style={{ position: 'absolute', left: x0 + (W * v) / 100 - 40, top: y + 230, width: 80, textAlign: 'center', ...label(T.soft), fontSize: 18 }}>{v}%</div>)}
      <div style={{ position: 'absolute', left: x0 + (W * pos) / 100 - 3, top: y + 120, width: 6, height: 130, background: T.white, boxShadow: '0 0 14px rgba(255,255,255,.8)' }} />
      <div style={{ position: 'absolute', left: x0 + (W * pos) / 100 - 50, top: y + 72, width: 100, textAlign: 'center', fontFamily: T.font, fontSize: 34, fontWeight: 900, color: T.white }}>{Math.round(pos)}%</div>
      <div style={{ position: 'absolute', left: 90, top: y + 300, width: 900, textAlign: 'center', fontFamily: T.font, fontSize: 38, fontWeight: 900, color: vc }}>{verdict}</div>
      <div style={{ position: 'absolute', left: 90, top: y + 380, width: 900, textAlign: 'center', fontFamily: T.font, fontSize: 20, fontWeight: 700, color: T.mute }}>CRA test for shared custody · each month can vary (illness, summer)</div>
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
        <div style={{ position: 'absolute', left: 36, top: 26, ...label(T.gold) }}>COUNT THE NIGHTS</div>
        <div style={{ position: 'absolute', left: 36, top: 66, right: 36, fontFamily: T.font, fontSize: 32, fontWeight: 900, lineHeight: 1.15, color: T.white, opacity: ease(f, Q.count - 4, Q.count + 6) }}>
          Count the real nights in your schedule before either parent applies
        </div>
      </div>
      <div style={{ position: 'absolute', left: 0, top: 240, display: 'flex', alignItems: 'center', gap: 18, opacity: ease(f, Q.next - 4, Q.next + 8) }}>
        <Flag f={f} w={90} amp={0.06} />
        <div style={{ display: 'inline-flex', padding: '16px 28px', borderRadius: 999, background: `linear-gradient(160deg,${T.goldHi},${T.gold} 50%,${T.goldDeep})`, color: '#1d1503', fontFamily: T.font, fontSize: 28, fontWeight: 900,
          transform: `scale(${1 + 0.03 * Math.sin((f - a) / 6)})` }}>NEXT: WHY CCB CHANGES IN JULY →</div>
      </div>
      <div style={{ position: 'absolute', left: 0, top: 330, fontFamily: T.font, fontSize: 26, fontWeight: 700, color: T.white, textShadow, opacity: ease(f, Q.follow, Q.follow + 10) }}>Follow so you don't miss it</div>
      <div style={{ position: 'absolute', left: -10, top: 380, width: 900, padding: '14px 18px', borderRadius: 14, background: 'rgba(10,16,28,.84)', fontFamily: T.font, fontSize: 18, fontWeight: 600, color: T.mute, lineHeight: 1.45, opacity: ease(f, a + 6, a + 20) }}>
        Source: canada.ca (CRA) Canada child benefit: who can apply (shared custody); how much (July 2026–June 2027) · example · general info, not advice
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

export const M26V3 = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: T.navy, fontFamily: T.font, overflow: 'hidden' }}>
      <SceneCuts f={f} cuts={CUTS} scene={(i) => i === 0 ? (
        <PhotoPlate f={f} src="plates/m26-s1-4k.jpg" iw={PW} ih={PH} keys={K1} glide={40} blur={0.8 + 4 * (1 - ease(f, 0, 20))} snow={[{ u0: 0.0, v0: 0.0, u1: 1.0, v1: 0.6 }]} />
      ) : i === 1 ? (
        <PhotoPlate f={f} src="plates/m26-s2-4k.jpg" iw={PW} ih={PH} keys={K2} glide={50} blur={0.8} snow={[{ u0: 0.0, v0: 0.0, u1: 1.0, v1: 0.7 }]} />
      ) : (
        <PhotoPlate f={f} src="plates/m26-s3-4k.jpg" iw={PW} ih={PH} keys={K3} glide={40} blur={0.8} snow={[{ u0: 0.6, v0: 0.0, u1: 1.0, v1: 0.4 }]} steam={{ u: 0.94, v: 0.62, w: 0.025 }} />
      )} />
      <Depth f={f} seed={f < B.c2.s ? 50 : f < B.reveal.s ? 51 : 52} warm={0.6} />
      <NavyGrade low={f >= B.action.s ? 1.2 : 1} />
      <Header f={f} />
      <Typed f={f} caps={CAPS} head={T.font} />
      {f < B.c1.s + 20 && <Hook f={f} />}
      <Weeks f={f} />
      <Zones f={f} />
      <End f={f} />
      <Captions f={f} fps={M26FPS} beats={WORDS.beats as never} from={B.c1.s} until={B.action.s} y={1296} />
    </AbsoluteFill>
  );
};
