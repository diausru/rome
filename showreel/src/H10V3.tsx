// H10 "Spouse paid $0 tax? Move the credits (line 32600)" — motion engine v1 (2026-11-13). Checklist: channel/REEL-CHECKLIST.md.
// Variety vs H29 / R4 / R3: hook = split two-return panel (YOU vs SPOUSE $0) with a pulsing transfer arrow; main visual = five credit
// chips + a tuition bar that splits $5,000 across to the spouse; re-hook stamp $725 OFF; reveal = THIS YEAR ✓ / CARRIED FORWARD ✗.
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { PhotoPlate, SceneCuts, type Focus } from './Plate';
import { Flag } from './RaiseShort';
import { Typed, beatsFrom, type Cap } from './Kit';
import TL from './h10-timeline.json';
import WORDS from './h10-words.json';
import CUE from './h10-cues.json';
import DATA from '../../h10/data.json';
import REEL from '../../h10/reel.json';
import { T, goldFill, textShadow } from './motion/brand';
import { Captions, Depth, Kinetic, NavyGrade, Stamp, clamp, ease, money, outBack, outExpo } from './motion/Reel';

export const H10FPS = 24;
const B = beatsFrom(TL, H10FPS);
export const H10DUR = Math.ceil((TL.total + REEL.hold_after_vo) * H10FPS);
const Q = Object.fromEntries(Object.entries(CUE).map(([k, v]) => [k, Math.round((v as number) * H10FPS)])) as Record<string, number>;
const X = DATA.example;
const GREEN = T.green;
const PW = 2294, PH = 4096;
const CUTS = [B.c2.s, B.reveal.s];
const L = Object.fromEntries(Object.entries(REEL.layout).map(([k, v]) => [k, { x: v.box[0], y: v.box[1], w: v.box[2], h: v.box[3] }])) as Record<string, { x: number; y: number; w: number; h: number }>;
const K1: Focus[] = [{ f: 0, u: 0.5, v: 0.32, k: 1.16 }, { f: B.c1.s, u: 0.42, v: 0.3, k: 1.24 }];
const K2: Focus[] = [{ f: 0, u: 0.45, v: 0.3, k: 1.22 }, { f: B.c3.s, u: 0.55, v: 0.32, k: 1.1 }];
const K3: Focus[] = [{ f: 0, u: 0.5, v: 0.36, k: 1.08 }, { f: B.action.s, u: 0.5, v: 0.3, k: 1.2 }];
const CAPS: Cap[] = [
  { at: B.c1.s, l1: 'THE RULE', l2: "spouse's tax already $0", until: B.c2.s - 2 },
  { at: B.c2.s, l1: 'EXAMPLE · LEE', l2: 'full-time student, no income', until: B.c3.s - 2 },
  { at: B.c3.s, l1: 'MOVE IT ACROSS', l2: "to the spouse's return", until: B.reveal.s - 2 },
  { at: B.reveal.s, l1: 'THE TWIST', l2: "only this year's tuition", until: B.action.s - 2 },
];
const glass = { background: 'linear-gradient(160deg, rgba(10,16,28,.86), rgba(10,16,28,.62))', border: `1px solid ${T.glassEdge}` };
const label = (c: string) => ({ fontFamily: T.font, fontSize: 18, fontWeight: 900, letterSpacing: 4, color: c });

const Hook = ({ f }: { f: number }) => {
  const card = (x: number, who: string, tax: string, c: string, d: number) => (
    <div style={{ position: 'absolute', left: x, top: 740, width: 380, height: 300, borderRadius: 26, ...glass, opacity: clamp(outBack((f - d) / 12)), transform: `translateY(${(1 - clamp(outExpo((f - d) / 14))) * 60}px)` }}>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 30, textAlign: 'center', ...label(T.soft) }}>{who} RETURN</div>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 80, textAlign: 'center', ...label(T.mute) }}>TAX OWING</div>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 118, textAlign: 'center', fontFamily: T.font, fontSize: 104, fontWeight: 900, color: c, ...(c === T.gold ? goldFill : {}) }}>{tax}</div>
    </div>
  );
  const p = ease(f, Q.move - 6, Q.move + 6), pulse = 1 + 0.08 * Math.sin(f / 4);
  return (
    <div style={{ opacity: 1 - ease(f, B.c1.s - 6, B.c1.s + 8) }}>
      <Kinetic f={f} at={0} now text={REEL.hook.l1} x={80} y={440} size={66} nowrap />
      <Kinetic f={f} at={0} now text={REEL.hook.l2} x={80} y={524} size={70} nowrap color={T.gold} />
      {card(80, "SPOUSE'S", '$0', GREEN, 2)}
      {card(620, 'YOUR', '$$$', T.gold, 8)}
      <div style={{ position: 'absolute', left: 470, top: 840, width: 140, textAlign: 'center', fontFamily: T.font, fontSize: 90, fontWeight: 900, color: T.gold, opacity: p, transform: `translateX(${(1 - p) * -40}px) scale(${pulse})` }}>→</div>
      <div style={{ position: 'absolute', left: 80, width: 920, top: 1080, textAlign: 'center', fontFamily: T.font, fontSize: 30, fontWeight: 800, color: T.white, textShadow, opacity: ease(f, Q.zero - 2, Q.zero + 10) }}>unused credits don't have to go to waste</div>
    </div>
  );
};

const CHIPS = ['AGE AMOUNT', 'PENSION AMOUNT', 'DISABILITY (SELF)', 'CAREGIVER · INFIRM CHILD', 'TUITION ≤ $5,000'];
const Main = ({ f }: { f: number }) => {
  const a = B.c1.s + 2, b = B.reveal.s;
  if (f < a - 1 || f > b + 14) return null;
  const y = L.chips.y, inC1 = f < B.c2.s;
  const bar = ease(f, Q.eight - 4, Q.eight + 14), mv = outExpo((f - Q.fivek) / 20);
  const W = 800, sc = W / X.tuition, wT = X.transfer * sc;
  return (
    <div style={{ opacity: outExpo((f - a) / 14) * (1 - ease(f, b - 2, b + 12)) }}>
      <div style={{ position: 'absolute', left: 56, top: y - 20, width: 968, height: 640, borderRadius: 28, ...glass }} />
      <div style={{ position: 'absolute', left: 90, top: y, ...label(T.mute) }}>LINE 32600 · TRANSFERABLE · TAX YEAR {DATA.tax_year}</div>
      <div style={{ position: 'absolute', left: 90, top: y + 40, fontFamily: T.font, fontSize: 30, fontWeight: 900, color: T.gold, opacity: ease(f, Q.five - 3, Q.five + 8) }}>5 CREDITS CAN MOVE</div>
      {CHIPS.map((c, i) => {
        const at = Q.five + 18 + i * 34, p = outBack((f - at) / 12), hi = i === 4 && !inC1;
        return (
          <div key={c} style={{ position: 'absolute', left: 90, top: y + 100 + i * (inC1 ? 84 : 30), width: inC1 ? 900 : 0, opacity: inC1 ? clamp(p) : 0, transform: `translateX(${(1 - clamp(p)) * -50}px)`,
            display: 'flex' }}>
            <div style={{ padding: '14px 26px', borderRadius: 999, border: `2px solid ${hi ? T.gold : GREEN}`, background: 'rgba(127,224,168,.10)', fontFamily: T.font, fontSize: 30, fontWeight: 900, color: T.white }}>✓ {c}</div>
          </div>
        );
      })}
      {!inC1 && (
        <div style={{ position: 'absolute', left: 90, top: y + 100, width: 900, opacity: ease(f, B.c2.s, B.c2.s + 10) }}>
          <div style={{ ...label(T.soft) }}>LEE'S TUITION THIS YEAR</div>
          <div style={{ fontFamily: T.font, fontSize: 96, fontWeight: 900, ...goldFill, opacity: bar }}>{money(Math.round(X.tuition * outExpo((f - Q.eight) / 30) / 100) * 100)}</div>
          <div style={{ position: 'relative', marginTop: 20, width: W, height: 70, borderRadius: 12, background: 'rgba(255,255,255,.08)', overflow: 'visible' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, height: 70, width: wT * bar, borderRadius: 12, background: `linear-gradient(180deg, ${T.goldHi}, ${T.goldDeep})`, transform: `translateY(${mv * 150}px)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: T.font, fontSize: 26, fontWeight: 900, color: '#1d1503' }}>{f >= Q.fivek ? `${money(X.transfer)} → SPOUSE` : ''}</div>
            <div style={{ position: 'absolute', left: wT + 6, top: 0, height: 70, width: (W - wT - 6) * bar, borderRadius: 12, background: 'rgba(127,224,168,.75)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: T.font, fontSize: 22, fontWeight: 900, color: '#0b1220', opacity: ease(f, Q.fivek, Q.fivek + 10) }}>{money(X.tuition - X.transfer)} · LEE KEEPS</div>
          </div>
          <div style={{ marginTop: 100, fontFamily: T.font, fontSize: 24, fontWeight: 800, color: T.soft, opacity: ease(f, Q.seven - 4, Q.seven + 8) }}>{money(X.transfer)} × {(X.rate * 100).toFixed(1)}% federal = {money(X.credit)}</div>
        </div>
      )}
      {f >= Q.seven && <Stamp f={f} at={Q.seven} text={`${money(X.credit)} OFF FEDERAL TAX`} x={150} y={y + 545} size={34} color={T.red} rotate={-4} />}
    </div>
  );
};

const Split = ({ f }: { f: number }) => {
  const a = B.reveal.s, b = B.action.s;
  if (f < a || f > b + 12) return null;
  const y = L.split.y;
  const col = (x: number, t: string, s: string, ok: boolean, at: number) => {
    const p = outBack((f - at) / 12);
    return (
      <div style={{ position: 'absolute', left: x, top: y + 90, width: 420, height: 300, borderRadius: 22, border: `3px solid ${ok ? GREEN : T.red}`, background: ok ? 'rgba(127,224,168,.10)' : 'rgba(220,70,70,.10)',
        opacity: clamp(p), transform: `scale(${clamp(p, 0.6, 1.04)})` }}>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 30, textAlign: 'center', fontFamily: T.font, fontSize: 80, fontWeight: 900, color: ok ? GREEN : T.red }}>{ok ? '✓' : '✗'}</div>
        <div style={{ position: 'absolute', left: 10, right: 10, top: 140, textAlign: 'center', fontFamily: T.font, fontSize: 32, fontWeight: 900, color: T.white }}>{t}</div>
        <div style={{ position: 'absolute', left: 10, right: 10, top: 196, textAlign: 'center', fontFamily: T.font, fontSize: 24, fontWeight: 800, color: ok ? GREEN : T.soft }}>{s}</div>
      </div>
    );
  };
  return (
    <div style={{ opacity: ease(f, a, a + 10) * (1 - ease(f, b - 2, b + 12)) }}>
      <div style={{ position: 'absolute', left: 56, top: y - 20, width: 968, height: 460, borderRadius: 28, ...glass }} />
      <div style={{ position: 'absolute', left: 90, top: y + 10, ...label(T.gold) }}>WHICH TUITION CAN MOVE?</div>
      {col(90, "THIS YEAR'S", 'can transfer', true, Q.only)}
      {col(570, 'CARRIED FORWARD', 'stays with Lee', false, Q.stay - 6)}
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
        <div style={{ position: 'absolute', left: 36, top: 66, right: 36, fontFamily: T.font, fontSize: 32, fontWeight: 900, lineHeight: 1.15, color: T.white, opacity: ease(f, Q.sched - 4, Q.sched + 6) }}>
          Schedule 2 → line 32600 · not separated 90+ days at Dec 31
        </div>
      </div>
      <div style={{ position: 'absolute', left: 0, top: 240, display: 'flex', alignItems: 'center', gap: 18, opacity: ease(f, Q.next - 4, Q.next + 8) }}>
        <Flag f={f} w={90} amp={0.06} />
        <div style={{ display: 'inline-flex', padding: '16px 28px', borderRadius: 999, background: `linear-gradient(160deg,${T.goldHi},${T.gold} 50%,${T.goldDeep})`, color: '#1d1503', fontFamily: T.font, fontSize: 28, fontWeight: 900,
          transform: `scale(${1 + 0.03 * Math.sin((f - a) / 6)})` }}>NEXT: WHO GETS THE CCB →</div>
      </div>
      <div style={{ position: 'absolute', left: 0, top: 330, fontFamily: T.font, fontSize: 26, fontWeight: 700, color: T.white, textShadow, opacity: ease(f, Q.follow, Q.follow + 10) }}>Follow so you don't miss it</div>
      <div style={{ position: 'absolute', left: -10, top: 380, width: 900, padding: '14px 18px', borderRadius: 14, background: 'rgba(10,16,28,.84)', fontFamily: T.font, fontSize: 18, fontWeight: 600, color: T.mute, lineHeight: 1.45, opacity: ease(f, a + 6, a + 20) }}>
        Source: canada.ca (CRA) line 32600, Schedule 2, Schedule 11 · tax year {DATA.tax_year} · example, federal only · general info, not advice
      </div>
    </div>
  );
};

const Header = ({ f }: { f: number }) => (
  <div style={{ position: 'absolute', left: 80, top: 92, right: 80, display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: T.white, fontSize: 22, fontWeight: 800, letterSpacing: 4, fontFamily: T.font }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}><Flag f={f} w={72} />TAX SECRETS CANADA</div>
    <div style={{ color: T.gold, letterSpacing: 5 }}>COUPLES · {DATA.tax_year}</div>
  </div>
);

export const H10V3 = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: T.navy, fontFamily: T.font, overflow: 'hidden' }}>
      <SceneCuts f={f} cuts={CUTS} scene={(i) => i === 0 ? (
        <PhotoPlate f={f} src="plates/h10-s1-4k.jpg" iw={PW} ih={PH} keys={K1} glide={40} blur={0.8 + 4 * (1 - ease(f, 0, 20))} snow={[{ u0: 0.0, v0: 0.0, u1: 1.0, v1: 0.4 }]} />
      ) : i === 1 ? (
        <PhotoPlate f={f} src="plates/h10-s2-4k.jpg" iw={PW} ih={PH} keys={K2} glide={50} blur={0.8} steam={{ u: 0.5, v: 0.62, w: 0.03 }} />
      ) : (
        <PhotoPlate f={f} src="plates/h10-s3-4k.jpg" iw={PW} ih={PH} keys={K3} glide={40} blur={0.8} snow={[{ u0: 0.0, v0: 0.0, u1: 1.0, v1: 0.6 }]} />
      )} />
      <Depth f={f} seed={f < B.c2.s ? 30 : f < B.reveal.s ? 31 : 32} warm={0.6} />
      <NavyGrade low={f >= B.action.s ? 1.2 : 1} />
      <Header f={f} />
      <Typed f={f} caps={CAPS} head={T.font} />
      {f < B.c1.s + 20 && <Hook f={f} />}
      <Main f={f} />
      <Split f={f} />
      <End f={f} />
      <Captions f={f} fps={H10FPS} beats={WORDS.beats as never} from={B.c1.s} until={B.action.s} y={1296} />
    </AbsoluteFill>
  );
};
