// M14 "The deposit didn't come: 4 reasons" — investigation format, motion engine v1 (2026-11-12). Checklist: channel/REEL-CHECKLIST.md.
// Variety vs M2 / M9 / M8: hook = a row of monthly deposit chips with the last one missing (dashed red "?") + "4 USUAL REASONS";
// main visual = numbered reason tiles lighting up in turn, then a MAR → APR → FROM APR timeline for the marital-status case;
// re-hook = "REPORT BY END OF NEXT MONTH" stamp (≈60 %); reveal = the four tiles sorting into "about your income" (1) vs
// "paperwork & rules" (3); end = check card + next pill.
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { PhotoPlate, SceneCuts, type Focus } from './Plate';
import { Flag } from './RaiseShort';
import { Typed, beatsFrom, type Cap } from './Kit';
import TL from './m14-timeline.json';
import WORDS from './m14-words.json';
import CUE from './m14-cues.json';
import DATA from '../../m14/data.json';
import REEL from '../../m14/reel.json';
import { T, goldFill, textShadow } from './motion/brand';
import { Captions, Depth, Kinetic, NavyGrade, Stamp, clamp, ease, money, outBack, outExpo } from './motion/Reel';

export const M14FPS = 24;
const B = beatsFrom(TL, M14FPS);
export const M14DUR = Math.ceil((TL.total + REEL.hold_after_vo) * M14FPS);
const Q = Object.fromEntries(Object.entries(CUE).map(([k, v]) => [k, Math.round((v as number) * M14FPS)])) as Record<string, number>;
const X = DATA.example;
const GREEN = T.green;
const PW = 2294, PH = 4096;
const CUTS = [B.c2.s, B.reveal.s];
const L = Object.fromEntries(Object.entries(REEL.layout).map(([k, v]) => [k, { x: v.box[0], y: v.box[1], w: v.box[2], h: v.box[3] }])) as Record<string, { x: number; y: number; w: number; h: number }>;
const K1: Focus[] = [{ f: 0, u: 0.5, v: 0.3, k: 1.14 }, { f: B.c1.s, u: 0.45, v: 0.28, k: 1.22 }];
const K2: Focus[] = [{ f: 0, u: 0.5, v: 0.32, k: 1.2 }, { f: B.c4.s, u: 0.55, v: 0.3, k: 1.12 }];
const K3: Focus[] = [{ f: 0, u: 0.5, v: 0.34, k: 1.2 }, { f: B.action.s, u: 0.5, v: 0.3, k: 1.08 }];
const CAPS: Cap[] = [
  { at: B.c1.s, l1: 'REASON 1', l2: 'a return not filed', until: B.c2.s - 2 },
  { at: B.c2.s, l1: 'REASON 2', l2: 'income went up', until: B.c3.s - 2 },
  { at: B.c3.s, l1: 'REASON 3', l2: 'marital status changed', until: B.c4.s - 2 },
  { at: B.c4.s, l1: "DANA'S CCB", l2: 'spouse income added', until: B.reveal.s - 2 },
  { at: B.reveal.s, l1: 'REASON 4 + THE TWIST', l2: `a child turned ${X.age}`, until: B.action.s - 2 },
];
const glass = { background: 'linear-gradient(160deg, rgba(10,16,28,.86), rgba(10,16,28,.62))', border: `1px solid ${T.glassEdge}` };
const label = (c: string) => ({ fontFamily: T.font, fontSize: 18, fontWeight: 900, letterSpacing: 4, color: c });

const MON = ['JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const Hook = ({ f }: { f: number }) => {
  const miss = ease(f, Q.miss - 2, Q.miss + 8), four = outBack((f - Q.four) / 12);
  return (
    <div style={{ opacity: 1 - ease(f, B.c1.s - 6, B.c1.s + 8) }}>
      <Kinetic f={f} at={0} now text={REEL.hook.l1} x={80} y={440} size={70} nowrap />
      <Kinetic f={f} at={0} now text={REEL.hook.l2} x={80} y={524} size={70} nowrap color={T.gold} />
      {MON.map((m, i) => {
        const last = i === MON.length - 1, p = outBack((f - i * 3) / 10);
        return (
          <div key={m} style={{ position: 'absolute', left: 80 + i * 155, top: 700, width: 140, height: 170, borderRadius: 18, opacity: clamp(p),
            border: last ? `3px dashed ${T.red}` : `2px solid ${GREEN}`, background: last ? 'rgba(224,57,43,.08)' : 'rgba(127,224,168,.12)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ ...label(last ? T.red : T.soft), fontSize: 18 }}>{m}</div>
            <div style={{ fontFamily: T.font, fontSize: 52, fontWeight: 900, color: last ? T.red : GREEN, marginTop: 8, opacity: last ? miss : 1 }}>{last ? '?' : '$'}</div>
          </div>
        );
      })}
      <div style={{ position: 'absolute', left: 80, top: 920, width: 920, textAlign: 'center', fontFamily: T.font, fontSize: 64, fontWeight: 900, color: T.gold, opacity: clamp(four), transform: `scale(${0.7 + 0.3 * clamp(four)})` }}>{X.count} USUAL REASONS</div>
    </div>
  );
};

// ---------- the reason tiles ----------
const REASONS = [
  { n: 1, t: 'Return not filed', s: 'YOURS OR YOUR SPOUSE’S' },
  { n: 2, t: 'Income went up', s: 'RECALCULATED EVERY JULY' },
  { n: 3, t: 'Marital status changed', s: 'TELL CRA BY END OF NEXT MONTH' },
  { n: 4, t: `A child turned ${X.age}`, s: 'THAT CHILD’S CCB STOPS' },
];
const Tile = ({ f, at, x, y, w, h, r, active }: { f: number; at: number; x: number; y: number; w: number; h: number; r: typeof REASONS[0]; active: boolean }) => {
  const p = outBack((f - at) / 12);
  if (f < at - 2) return null;
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, height: h, borderRadius: 20, border: `2px solid ${active ? T.gold : T.glassEdge}`, background: active ? 'rgba(241,199,91,.12)' : 'rgba(255,255,255,.04)',
      opacity: clamp(p) * (active ? 1 : 0.55), transform: `scale(${0.9 + 0.1 * clamp(p)})`, padding: '18px 22px', boxSizing: 'border-box' }}>
      <div style={{ fontFamily: T.font, fontSize: 44, fontWeight: 900, color: T.gold }}>{r.n}</div>
      <div style={{ fontFamily: T.font, fontSize: 30, fontWeight: 900, color: T.white, marginTop: 4, lineHeight: 1.1 }}>{r.t}</div>
      <div style={{ ...label(T.soft), fontSize: 14, marginTop: 8 }}>{r.s}</div>
    </div>
  );
};
const Cards = ({ f }: { f: number }) => {
  const a = B.c1.s + 2, b = B.reveal.s;
  if (f < a - 1 || f > b + 14) return null;
  const y = L.cards.y, tl = outExpo((f - Q.march + 2) / 18), ap = ease(f, Q.april - 4, Q.april + 6), add = ease(f, Q.added - 4, Q.added + 8), adj = ease(f, Q.adj - 4, Q.adj + 8);
  const stage = f < B.c2.s ? 1 : f < B.c3.s ? 2 : 3;
  return (
    <div style={{ opacity: outExpo((f - a) / 14) * (1 - ease(f, b - 2, b + 12)) }}>
      <div style={{ position: 'absolute', left: 56, top: y - 20, width: 968, height: 640, borderRadius: 28, ...glass }} />
      <div style={{ position: 'absolute', left: 90, top: y, ...label(T.mute) }}>WHY BENEFIT PAYMENTS STOP OR DROP</div>
      <Tile f={f} at={a + 2} x={90} y={y + 40} w={290} h={200} r={REASONS[0]} active={stage === 1} />
      <Tile f={f} at={B.c2.s} x={395} y={y + 40} w={290} h={200} r={REASONS[1]} active={stage === 2} />
      <Tile f={f} at={B.c3.s} x={700} y={y + 40} w={290} h={200} r={REASONS[2]} active={stage === 3} />
      {/* marital timeline */}
      <div style={{ position: 'absolute', left: 90, top: y + 280, width: 900, opacity: tl }}>
        <div style={{ ...label(T.soft), fontSize: 16 }}>DANA · {X.year}</div>
        <div style={{ position: 'absolute', left: 0, top: 50, width: 900 * tl, height: 6, borderRadius: 3, background: 'rgba(255,255,255,.3)' }} />
        {[['MAR', 'MARRIED', T.white, 1], ['APR', 'TELL CRA BY APR 30', T.gold, ap], ['FROM APR', 'CCB ADJUSTED', GREEN, adj]].map(([m, t, c, o], i) => (
          <div key={m as string} style={{ position: 'absolute', left: i * 320, top: 30, width: 280, opacity: o as number }}>
            <div style={{ width: 26, height: 26, borderRadius: 13, background: c as string, marginLeft: 0 }} />
            <div style={{ fontFamily: T.font, fontSize: 30, fontWeight: 900, color: c as string, marginTop: 10 }}>{m}</div>
            <div style={{ ...label(T.soft), fontSize: 15, marginTop: 4 }}>{t}</div>
          </div>
        ))}
        <div style={{ position: 'absolute', left: 0, top: 170, fontFamily: T.font, fontSize: 26, fontWeight: 800, color: T.soft, opacity: add }}>+ new spouse's income → family net income</div>
      </div>
      {f >= Q.adj && <Stamp f={f} at={Q.adj} text="REPORT BY END OF NEXT MONTH" x={320} y={y + 566} size={24} color={T.gold} rotate={-4} />}
    </div>
  );
};

// ---------- reveal: sort the four ----------
const Sort = ({ f }: { f: number }) => {
  const a = B.reveal.s, b = B.action.s;
  if (f < a || f > b + 12) return null;
  const y = L.sort.y, t4 = outBack((f - Q.age + 4) / 12), s = outExpo((f - Q.twist) / 24), e = ease(f, Q.earn - 4, Q.earn + 6);
  const pos = (i: number) => {
    const grid = { x: 100 + (i % 2) * 440, y: y + 60 + Math.floor(i / 2) * 140 };
    const money = i === 1;
    const sorted = money ? { x: 100, y: y + 120 } : { x: 560, y: y + 60 + [0, 0, 1, 2][i] * 120 - (i === 0 ? 0 : 0) };
    if (i === 0) sorted.y = y + 60;
    return { x: grid.x + (sorted.x - grid.x) * s, y: grid.y + (sorted.y - grid.y) * s };
  };
  return (
    <div style={{ opacity: ease(f, a, a + 10) * (1 - ease(f, b - 2, b + 12)) }}>
      <div style={{ position: 'absolute', left: 56, top: y - 20, width: 968, height: 520, borderRadius: 28, ...glass }} />
      <div style={{ position: 'absolute', left: 100, top: y + 10, ...label(GREEN), fontSize: 16, opacity: s }}>ABOUT YOUR INCOME</div>
      <div style={{ position: 'absolute', left: 560, top: y + 10, ...label(T.gold), fontSize: 16, opacity: s }}>PAPERWORK & RULES</div>
      {REASONS.map((r, i) => {
        const p = pos(i), o = i === 3 ? clamp(t4) : 1;
        return <div key={r.n} style={{ position: 'absolute', left: p.x, top: p.y, width: 400, height: 100, borderRadius: 16, border: `2px solid ${i === 1 && s > 0.5 ? GREEN : T.glassEdge}`, background: 'rgba(255,255,255,.05)', opacity: o,
          display: 'flex', alignItems: 'center', gap: 16, paddingLeft: 20, boxSizing: 'border-box' }}>
          <span style={{ fontFamily: T.font, fontSize: 36, fontWeight: 900, color: T.gold }}>{r.n}</span>
          <span style={{ fontFamily: T.font, fontSize: 26, fontWeight: 900, color: T.white }}>{r.t}</span>
        </div>;
      })}
      <div style={{ position: 'absolute', left: 90, top: y + 430, width: 900, textAlign: 'center', fontFamily: T.font, fontSize: 32, fontWeight: 900, color: GREEN, opacity: e }}>ONLY 1 OF 4 IS ABOUT HOW MUCH YOU EARN</div>
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
        <div style={{ position: 'absolute', left: 36, top: 26, ...label(T.gold) }}>CHECK MY ACCOUNT</div>
        <div style={{ position: 'absolute', left: 36, top: 66, right: 36, fontFamily: T.font, fontSize: 32, fontWeight: 900, lineHeight: 1.15, color: T.white, opacity: ease(f, Q.check - 4, Q.check + 6) }}>
          Read your CRA My Account messages before you call
        </div>
      </div>
      <div style={{ position: 'absolute', left: 0, top: 240, display: 'flex', alignItems: 'center', gap: 18, opacity: ease(f, Q.next - 4, Q.next + 8) }}>
        <Flag f={f} w={90} amp={0.06} />
        <div style={{ display: 'inline-flex', padding: '16px 28px', borderRadius: 999, background: `linear-gradient(160deg,${T.goldHi},${T.gold} 50%,${T.goldDeep})`, color: '#1d1503', fontFamily: T.font, fontSize: 28, fontWeight: 900,
          transform: `scale(${1 + 0.03 * Math.sin((f - a) / 6)})` }}>NEXT: IS A 2ND JOB WORTH IT? →</div>
      </div>
      <div style={{ position: 'absolute', left: 0, top: 330, fontFamily: T.font, fontSize: 26, fontWeight: 700, color: T.white, textShadow, opacity: ease(f, Q.follow, Q.follow + 10) }}>Follow so you don't miss it</div>
      <div style={{ position: 'absolute', left: -10, top: 380, width: 900, padding: '14px 18px', borderRadius: 14, background: 'rgba(10,16,28,.84)', fontFamily: T.font, fontSize: 18, fontWeight: 600, color: T.mute, lineHeight: 1.45, opacity: ease(f, a + 6, a + 20) }}>
        Source: canada.ca (CRA) Keep getting your payments (CCB); Marital status; 5000-G filing rule · example · general info, not advice
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

export const M14V3 = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: T.navy, fontFamily: T.font, overflow: 'hidden' }}>
      <SceneCuts f={f} cuts={CUTS} scene={(i) => i === 0 ? (
        <PhotoPlate f={f} src="plates/m14-s1-4k.jpg" iw={PW} ih={PH} keys={K1} glide={40} blur={0.8 + 4 * (1 - ease(f, 0, 20))} snow={[{ u0: 0.35, v0: 0.15, u1: 0.9, v1: 0.45 }]} steam={{ u: 0.85, v: 0.55, w: 0.025 }} />
      ) : i === 1 ? (
        <PhotoPlate f={f} src="plates/m14-s2-4k.jpg" iw={PW} ih={PH} keys={K2} glide={50} blur={0.8} snow={[{ u0: 0.0, v0: 0.0, u1: 1.0, v1: 0.6 }]} />
      ) : (
        <PhotoPlate f={f} src="plates/m14-s3-4k.jpg" iw={PW} ih={PH} keys={K3} glide={40} blur={0.8} snow={[{ u0: 0.6, v0: 0.12, u1: 1.0, v1: 0.5 }]} steam={{ u: 0.17, v: 0.72, w: 0.03 }} />
      )} />
      <Depth f={f} seed={f < B.c2.s ? 50 : f < B.reveal.s ? 51 : 52} warm={0.6} />
      <NavyGrade low={f >= B.action.s ? 1.2 : 1} />
      <Header f={f} />
      <Typed f={f} caps={CAPS} head={T.font} />
      {f < B.c1.s + 20 && <Hook f={f} />}
      <Cards f={f} />
      <Sort f={f} />
      <End f={f} />
      <Captions f={f} fps={M14FPS} beats={WORDS.beats as never} from={B.c1.s} until={B.action.s} y={1296} />
    </AbsoluteFill>
  );
};
