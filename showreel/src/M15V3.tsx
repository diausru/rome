// M15 "A $10,000 side job: you keep how much?" — investigation format, motion engine v1 (2026-11-13). Checklist: channel/REEL-CHECKLIST.md.
// Variety vs M14 / M2 / M9: hook = +$10,000 card, "bracket says keep 86%" struck → "really closer to 2/3"; main visual = the
// $10,000 bar eaten from the right by federal tax (−$1,496), CCB (−$1,350) and the groceries benefit (−$500), "KEEP" counting
// down to $6,654; re-hook = "−$3,346 · A THIRD GONE" stamp (≈63 %); reveal = two columns 14% vs 33.5% + "benefit cuts start next
// July" pill; end = check card + next pill.
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { PhotoPlate, SceneCuts, type Focus } from './Plate';
import { Flag } from './RaiseShort';
import { Typed, beatsFrom, type Cap } from './Kit';
import TL from './m15-timeline.json';
import WORDS from './m15-words.json';
import CUE from './m15-cues.json';
import DATA from '../../m15/data.json';
import REEL from '../../m15/reel.json';
import { T, goldFill, textShadow } from './motion/brand';
import { Captions, Depth, Kinetic, NavyGrade, Stamp, clamp, ease, money, outBack, outExpo } from './motion/Reel';

export const M15FPS = 24;
const B = beatsFrom(TL, M15FPS);
export const M15DUR = Math.ceil((TL.total + REEL.hold_after_vo) * M15FPS);
const Q = Object.fromEntries(Object.entries(CUE).map(([k, v]) => [k, Math.round((v as number) * M15FPS)])) as Record<string, number>;
const X = DATA.example;
const GREEN = T.green;
const PW = 2294, PH = 4096;
const CUTS = [B.c2.s, B.reveal.s];
const L = Object.fromEntries(Object.entries(REEL.layout).map(([k, v]) => [k, { x: v.box[0], y: v.box[1], w: v.box[2], h: v.box[3] }])) as Record<string, { x: number; y: number; w: number; h: number }>;
const K1: Focus[] = [{ f: 0, u: 0.5, v: 0.3, k: 1.14 }, { f: B.c1.s, u: 0.45, v: 0.28, k: 1.22 }];
const K2: Focus[] = [{ f: 0, u: 0.5, v: 0.32, k: 1.2 }, { f: B.c4.s, u: 0.55, v: 0.3, k: 1.12 }];
const K3: Focus[] = [{ f: 0, u: 0.5, v: 0.34, k: 1.2 }, { f: B.action.s, u: 0.5, v: 0.3, k: 1.08 }];
const CAPS: Cap[] = [
  { at: B.c1.s, l1: "KAI'S FAMILY", l2: `${money(X.family)} · two kids · +${money(X.extra)}`, until: B.c2.s - 2 },
  { at: B.c2.s, l1: 'HIT 1 · FEDERAL TAX', l2: '14%, then 20.5% above $58,523', until: B.c3.s - 2 },
  { at: B.c3.s, l1: 'HIT 2 · CCB', l2: '13.5% of the extra (2 kids)', until: B.c4.s - 2 },
  { at: B.c4.s, l1: 'HIT 3 · GROCERIES BENEFIT', l2: '5% of the extra', until: B.reveal.s - 2 },
  { at: B.reveal.s, l1: 'THE TWIST', l2: 'a third, before the rest', until: B.action.s - 2 },
];
const glass = { background: 'linear-gradient(160deg, rgba(10,16,28,.86), rgba(10,16,28,.62))', border: `1px solid ${T.glassEdge}` };
const label = (c: string) => ({ fontFamily: T.font, fontSize: 18, fontWeight: 900, letterSpacing: 4, color: c });

const Hook = ({ f }: { f: number }) => {
  const t = outExpo((f - Q.ten + 4) / 18), s = ease(f, Q.k86 - 3, Q.k86 + 8), r = outBack((f - Q.two3) / 12);
  return (
    <div style={{ opacity: 1 - ease(f, B.c1.s - 6, B.c1.s + 8) }}>
      <Kinetic f={f} at={0} now text={REEL.hook.l1} x={80} y={440} size={70} nowrap />
      <Kinetic f={f} at={0} now text={REEL.hook.l2} x={80} y={524} size={70} nowrap color={T.gold} />
      <div style={{ position: 'absolute', left: 80, top: 690, width: 920, height: 160, borderRadius: 24, ...glass, opacity: clamp(t) }}>
        <div style={{ position: 'absolute', left: 30, top: 24, ...label(T.soft), fontSize: 18 }}>EXTRA INCOME · WEEKEND JOB</div>
        <div style={{ position: 'absolute', left: 30, top: 56, fontFamily: T.font, fontSize: 84, fontWeight: 900, ...goldFill }}>+{money(X.extra)}</div>
      </div>
      <div style={{ position: 'absolute', left: 80, top: 880, width: 440, height: 160, borderRadius: 24, ...glass, opacity: s }}>
        <div style={{ position: 'absolute', left: 30, top: 24, ...label(T.mute), fontSize: 16 }}>BRACKET SAYS YOU KEEP</div>
        <div style={{ position: 'absolute', left: 30, top: 56, fontFamily: T.font, fontSize: 80, fontWeight: 900, color: T.soft }}>{X.keep_naive}%</div>
        <div style={{ position: 'absolute', left: 24, top: 96, width: 240 * ease(f, Q.two3 - 2, Q.two3 + 6), height: 7, background: T.red, transform: 'rotate(-6deg)' }} />
      </div>
      <div style={{ position: 'absolute', left: 560, top: 880, width: 440, height: 160, borderRadius: 24, ...glass, border: `2px solid ${GREEN}`, opacity: clamp(r), transform: `scale(${0.85 + 0.15 * clamp(r)})` }}>
        <div style={{ position: 'absolute', left: 30, top: 24, ...label(GREEN), fontSize: 16 }}>REALLY CLOSER TO</div>
        <div style={{ position: 'absolute', left: 30, top: 56, fontFamily: T.font, fontSize: 80, fontWeight: 900, color: GREEN }}>2/3</div>
      </div>
    </div>
  );
};

// ---------- the $10,000 bar gets eaten ----------
const Bills = ({ f }: { f: number }) => {
  const a = B.c1.s + 2, b = B.reveal.s;
  if (f < a - 1 || f > b + 14) return null;
  const y = L.bills.y, x0 = 110, W = 860, k = W / X.extra;
  const bar = outExpo((f - a) / 20), e1 = outExpo((f - Q.fed + 6) / 16), e2 = outExpo((f - Q.ccb + 4) / 16), e3 = outExpo((f - Q.cg + 4) / 16);
  const segs = [
    { v: X.fed, c: T.red, l: 'FEDERAL TAX', d: '−$1,496', p: e1, at: Q.fed },
    { v: X.ccb, c: '#ff9a5a', l: 'CCB (2 KIDS · 13.5%)', d: '−$1,350', p: e2, at: Q.ccb },
    { v: X.cgeb, c: T.amber, l: 'GROCERIES BENEFIT (5%)', d: '−$500', p: e3, at: Q.cg },
  ];
  let off = 0;
  const kept = X.extra - X.fed * e1 - X.ccb * e2 - X.cgeb * e3;
  return (
    <div style={{ opacity: outExpo((f - a) / 14) * (1 - ease(f, b - 2, b + 12)) }}>
      <div style={{ position: 'absolute', left: 56, top: y - 20, width: 968, height: 640, borderRadius: 28, ...glass }} />
      <div style={{ position: 'absolute', left: 90, top: y, ...label(T.mute) }}>KAI'S EXTRA {money(X.extra)} · FAMILY {money(X.family)} · 2 KIDS · {DATA.tax_year}</div>
      <div style={{ position: 'absolute', left: x0, top: y + 60, width: W * bar, height: 110, borderRadius: 14, background: GREEN, overflow: 'hidden' }}>
        {segs.map((s) => { const left = W - (off += s.v * k) ; return <div key={s.l} style={{ position: 'absolute', left, top: 0, width: s.v * k * s.p, height: 110, background: s.c }} />; })}
      </div>
      <div style={{ position: 'absolute', left: x0 + 20, top: y + 92, fontFamily: T.font, fontSize: 40, fontWeight: 900, color: '#0b1220' }}>KEEP {money(Math.round(kept))}</div>
      {segs.map((s, i) => (
        <div key={s.l} style={{ position: 'absolute', left: x0, top: y + 210 + i * 90, width: W, display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: ease(f, s.at - 6, s.at + 4) }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 14 }}><span style={{ width: 26, height: 26, borderRadius: 6, background: s.c }} /><span style={{ ...label(T.white), fontSize: 20 }}>{s.l}</span></span>
          <span style={{ fontFamily: T.font, fontSize: 40, fontWeight: 900, color: s.c }}>{s.d}</span>
        </div>
      ))}
      <div style={{ position: 'absolute', left: x0, top: y + 490, ...label(T.mute), fontSize: 14, opacity: e1 }}>FEDERAL: 14% TO $58,523, THE LAST $1,477 AT 20.5% · BENEFIT RATES JULY 2026–JUNE 2027</div>
      {f >= Q.cg && <Stamp f={f} at={Q.cg} text="−$3,346 · A THIRD GONE" x={420} y={y + 540} size={28} color={T.red} rotate={-4} />}
    </div>
  );
};

// ---------- reveal: bracket vs real ----------
const Gap = ({ f }: { f: number }) => {
  const a = B.reveal.s, b = B.action.s;
  if (f < a || f > b + 12) return null;
  const y = L.gap.y, p = outExpo((f - a - 4) / 24), th = ease(f, Q.third - 4, Q.third + 8), jl = outBack((f - Q.july) / 12);
  const col = (x: number, t: string, v: number, c: string, o: number) => (
    <div style={{ position: 'absolute', left: x, top: y + 60, width: 400, height: 300, opacity: o }}>
      <div style={{ ...label(c), fontSize: 18 }}>{t}</div>
      <div style={{ position: 'absolute', left: 0, bottom: 0, width: 160, height: 240 * (v / 40) * p, borderRadius: '12px 12px 0 0', background: c }} />
      <div style={{ position: 'absolute', left: 180, bottom: 20, fontFamily: T.font, fontSize: 72, fontWeight: 900, color: c }}>{v}%</div>
    </div>
  );
  return (
    <div style={{ opacity: ease(f, a, a + 10) * (1 - ease(f, b - 2, b + 12)) }}>
      <div style={{ position: 'absolute', left: 56, top: y - 20, width: 968, height: 520, borderRadius: 28, ...glass }} />
      <div style={{ position: 'absolute', left: 90, top: y + 4, ...label(T.gold) }}>SHARE OF THE EXTRA $10,000 THAT GOES</div>
      {col(100, 'TAX BRACKET', X.lo, T.soft, 1)}
      {col(560, 'TAX + BENEFIT CUTS', 33.5, T.red, th)}
      <div style={{ position: 'absolute', left: 90, top: y + 380, width: 900, textAlign: 'center', fontFamily: T.font, fontSize: 22, fontWeight: 700, color: T.mute, opacity: th }}>before provincial tax, CPP and EI</div>
      <div style={{ position: 'absolute', left: 300, top: y + 420, width: 480, height: 60, borderRadius: 999, border: `2px solid ${T.gold}`, opacity: clamp(jl), display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: T.font, fontSize: 24, fontWeight: 900, color: T.gold }}>BENEFIT CUTS START NEXT JULY</div>
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
        <div style={{ position: 'absolute', left: 36, top: 26, ...label(T.gold) }}>COUNT IT ALL</div>
        <div style={{ position: 'absolute', left: 36, top: 66, right: 36, fontFamily: T.font, fontSize: 32, fontWeight: 900, lineHeight: 1.15, color: T.white, opacity: ease(f, Q.count - 4, Q.count + 6) }}>
          Before you say yes: tax + benefit cuts, not just the bracket
        </div>
      </div>
      <div style={{ position: 'absolute', left: 0, top: 240, display: 'flex', alignItems: 'center', gap: 18, opacity: ease(f, Q.next - 4, Q.next + 8) }}>
        <Flag f={f} w={90} amp={0.06} />
        <div style={{ display: 'inline-flex', padding: '16px 28px', borderRadius: 999, background: `linear-gradient(160deg,${T.goldHi},${T.gold} 50%,${T.goldDeep})`, color: '#1d1503', fontFamily: T.font, fontSize: 28, fontWeight: 900,
          transform: `scale(${1 + 0.03 * Math.sin((f - a) / 6)})` }}>NEXT: PART-TIME VS FULL-TIME →</div>
      </div>
      <div style={{ position: 'absolute', left: 0, top: 330, fontFamily: T.font, fontSize: 26, fontWeight: 700, color: T.white, textShadow, opacity: ease(f, Q.follow, Q.follow + 10) }}>Follow so you don't miss it</div>
      <div style={{ position: 'absolute', left: -10, top: 380, width: 900, padding: '14px 18px', borderRadius: 14, background: 'rgba(10,16,28,.84)', fontFamily: T.font, fontSize: 18, fontWeight: 600, color: T.mute, lineHeight: 1.45, opacity: ease(f, a + 6, a + 20) }}>
        Source: canada.ca (CRA) 2026 federal rates; CCB & CGEB how much (July 2026–June 2027) · example, federal only · general info, not advice
      </div>
    </div>
  );
};

const Header = ({ f }: { f: number }) => (
  <div style={{ position: 'absolute', left: 80, top: 92, right: 80, display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: T.white, fontSize: 22, fontWeight: 800, letterSpacing: 4, fontFamily: T.font }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}><Flag f={f} w={72} />TAX SECRETS CANADA</div>
    <div style={{ color: T.gold, letterSpacing: 5 }}>BENEFITS · {DATA.tax_year}</div>
  </div>
);

export const M15V3 = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: T.navy, fontFamily: T.font, overflow: 'hidden' }}>
      <SceneCuts f={f} cuts={CUTS} scene={(i) => i === 0 ? (
        <PhotoPlate f={f} src="plates/m15-s1-4k.jpg" iw={PW} ih={PH} keys={K1} glide={40} blur={0.8 + 4 * (1 - ease(f, 0, 20))} snow={[{ u0: 0.0, v0: 0.0, u1: 1.0, v1: 0.6 }]} />
      ) : i === 1 ? (
        <PhotoPlate f={f} src="plates/m15-s2-4k.jpg" iw={PW} ih={PH} keys={K2} glide={50} blur={0.8} snow={[{ u0: 0.0, v0: 0.22, u1: 0.45, v1: 0.55 }]} />
      ) : (
        <PhotoPlate f={f} src="plates/m15-s3-4k.jpg" iw={PW} ih={PH} keys={K3} glide={40} blur={0.8} snow={[{ u0: 0.65, v0: 0.05, u1: 1.0, v1: 0.55 }]} steam={{ u: 0.9, v: 0.64, w: 0.025 }} />
      )} />
      <Depth f={f} seed={f < B.c2.s ? 50 : f < B.reveal.s ? 51 : 52} warm={0.6} />
      <NavyGrade low={f >= B.action.s ? 1.2 : 1} />
      <Header f={f} />
      <Typed f={f} caps={CAPS} head={T.font} />
      {f < B.c1.s + 20 && <Hook f={f} />}
      <Bills f={f} />
      <Gap f={f} />
      <End f={f} />
      <Captions f={f} fps={M15FPS} beats={WORDS.beats as never} from={B.c1.s} until={B.action.s} y={1296} />
    </AbsoluteFill>
  );
};
