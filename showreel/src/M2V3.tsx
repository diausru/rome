// M2 "Same salary, $679 or $0" — investigation format, motion engine v1 (2026-11-12). Checklist: channel/REEL-CHECKLIST.md.
// Variety vs M9 / M8 / M7: hook = two salary badges (NORA $679 / SAM $0); main visual = income bars against the $46,432 line —
// Nora's single $45K under it, Sam's $45K + partner's $35K stacked to $80K with the $33,568 excess hatched red;
// re-hook = "COUNTS BOTH INCOMES" stamp (≈56 %); reveal = two filing checkboxes (yours ✓, spouse's ✗) → BENEFIT PAYMENTS STOP;
// end = check card + next pill.
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { PhotoPlate, SceneCuts, type Focus } from './Plate';
import { Flag } from './RaiseShort';
import { Typed, beatsFrom, type Cap } from './Kit';
import TL from './m2-timeline.json';
import WORDS from './m2-words.json';
import CUE from './m2-cues.json';
import DATA from '../../m2/data.json';
import REEL from '../../m2/reel.json';
import { T, goldFill, textShadow } from './motion/brand';
import { Captions, Depth, Kinetic, NavyGrade, Stamp, clamp, ease, money, outBack, outExpo } from './motion/Reel';

export const M2FPS = 24;
const B = beatsFrom(TL, M2FPS);
export const M2DUR = Math.ceil((TL.total + REEL.hold_after_vo) * M2FPS);
const Q = Object.fromEntries(Object.entries(CUE).map(([k, v]) => [k, Math.round((v as number) * M2FPS)])) as Record<string, number>;
const X = DATA.example;
const GREEN = T.green;
const PW = 2294, PH = 4096;
const CUTS = [B.c2.s, B.reveal.s];
const L = Object.fromEntries(Object.entries(REEL.layout).map(([k, v]) => [k, { x: v.box[0], y: v.box[1], w: v.box[2], h: v.box[3] }])) as Record<string, { x: number; y: number; w: number; h: number }>;
const K1: Focus[] = [{ f: 0, u: 0.5, v: 0.3, k: 1.14 }, { f: B.c1.s, u: 0.45, v: 0.28, k: 1.22 }];
const K2: Focus[] = [{ f: 0, u: 0.5, v: 0.32, k: 1.2 }, { f: B.c4.s, u: 0.55, v: 0.3, k: 1.12 }];
const K3: Focus[] = [{ f: 0, u: 0.5, v: 0.34, k: 1.2 }, { f: B.action.s, u: 0.5, v: 0.3, k: 1.08 }];
const CAPS: Cap[] = [
  { at: B.c1.s, l1: 'WHAT THE CRA LOOKS AT', l2: 'family net income, not salary', until: B.c2.s - 2 },
  { at: B.c2.s, l1: 'NORA', l2: `single · ${money(X.salary)}`, until: B.c3.s - 2 },
  { at: B.c3.s, l1: 'SAM', l2: `${money(X.salary)} + partner ${money(X.partner)}`, until: B.c4.s - 2 },
  { at: B.c4.s, l1: 'OVER THE LINE', l2: `${money(X.over)} above ${money(X.thr)}`, until: B.reveal.s - 2 },
  { at: B.reveal.s, l1: 'THE TWIST', l2: 'an unfiled return', until: B.action.s - 2 },
];
const glass = { background: 'linear-gradient(160deg, rgba(10,16,28,.86), rgba(10,16,28,.62))', border: `1px solid ${T.glassEdge}` };
const label = (c: string) => ({ fontFamily: T.font, fontSize: 18, fontWeight: 900, letterSpacing: 4, color: c });

const Badge = ({ f, x, name, at, res, resAt, c }: { f: number; x: number; name: string; at: number; res: string; resAt: number; c: string }) => {
  const p = outBack((f - at) / 14), r = ease(f, resAt - 3, resAt + 6);
  return (
    <div style={{ position: 'absolute', left: x, top: 690, width: 420, height: 330, opacity: clamp(p), transform: `translateY(${(1 - clamp(p)) * 40}px)` }}>
      <div style={{ position: 'absolute', inset: 0, borderRadius: 26, ...glass, border: `2px solid ${r > 0.5 ? c : T.glassEdge}` }} />
      <div style={{ position: 'absolute', left: 30, top: 26, ...label(T.soft), fontSize: 20 }}>{name}</div>
      <div style={{ position: 'absolute', left: 30, top: 60, fontFamily: T.font, fontSize: 64, fontWeight: 900, color: T.white }}>{money(X.salary)}</div>
      <div style={{ position: 'absolute', left: 30, top: 140, ...label(T.mute), fontSize: 16 }}>SALARY · BENEFIT</div>
      <div style={{ position: 'absolute', left: 30, top: 172, fontFamily: T.font, fontSize: 104, fontWeight: 900, color: c, opacity: r }}>{res}</div>
    </div>
  );
};
const Hook = ({ f }: { f: number }) => (
  <div style={{ opacity: 1 - ease(f, B.c1.s - 6, B.c1.s + 8) }}>
    <Kinetic f={f} at={0} now text={REEL.hook.l1} x={80} y={440} size={70} nowrap />
    <Kinetic f={f} at={0} now text={REEL.hook.l2} x={80} y={524} size={70} nowrap color={T.gold} />
    <Badge f={f} x={80} name="NORA" at={Math.min(Q.sal - 4, 6)} res={money(X.single)} resAt={Q.nora} c={GREEN} />
    <Badge f={f} x={580} name="SAM" at={Q.sal + 2} res="$0" resAt={Q.sam} c={T.red} />
  </div>
);

// ---------- income bars vs the line ----------
const Stack = ({ f }: { f: number }) => {
  const a = B.c1.s + 2, b = B.reveal.s;
  if (f < a - 1 || f > b + 14) return null;
  const y = L.stack.y, base = y + 480, k = 400 / 82000, bw = 220;
  const line = ease(f, Q.thr - 4, Q.thr + 8), nb = outExpo((f - Q.c2 + 2) / 18), sb = outExpo((f - Q.c3 + 2) / 18), pb = outExpo((f - Q.partner) / 18), ov = ease(f, Q.over - 2, Q.over + 10), calc = ease(f, Q.over + 30, Q.over + 40);
  const ly = base - X.thr * k;
  return (
    <div style={{ opacity: outExpo((f - a) / 14) * (1 - ease(f, b - 2, b + 12)) }}>
      <div style={{ position: 'absolute', left: 56, top: y - 20, width: 968, height: 640, borderRadius: 28, ...glass }} />
      <div style={{ position: 'absolute', left: 90, top: y, ...label(T.mute) }}>FAMILY NET INCOME · YOURS + YOUR SPOUSE'S</div>
      <div style={{ position: 'absolute', left: 90, top: y + 30, ...label(T.gold), fontSize: 15, opacity: ease(f, Q.fam - 4, Q.fam + 8) }}>NOT YOUR SALARY · LINE 23600 COMBINED</div>
      {/* Nora */}
      <div style={{ position: 'absolute', left: 200, top: base - X.salary * k * nb, width: bw, height: X.salary * k * nb, borderRadius: '10px 10px 0 0', background: GREEN }} />
      <div style={{ position: 'absolute', left: 200, top: base + 10, width: bw, textAlign: 'center', ...label(T.white), fontSize: 18 }}>NORA · SINGLE</div>
      <div style={{ position: 'absolute', left: 200, top: base - X.salary * k - 44, width: bw, textAlign: 'center', fontFamily: T.font, fontSize: 30, fontWeight: 900, color: T.white, opacity: nb }}>{money(X.salary)}</div>
      <div style={{ position: 'absolute', left: 200, top: base + 40, width: bw, textAlign: 'center', fontFamily: T.font, fontSize: 34, fontWeight: 900, color: GREEN, opacity: ease(f, Q.full - 4, Q.full + 6) }}>{money(X.single)}</div>
      {/* Sam */}
      <div style={{ position: 'absolute', left: 620, top: base - X.salary * k * sb, width: bw, height: X.salary * k * sb, background: '#8fb8ff', borderRadius: pb > 0.05 ? 0 : '10px 10px 0 0' }} />
      <div style={{ position: 'absolute', left: 620, top: base - (X.salary + X.partner * pb) * k, width: bw, height: X.partner * pb * k, background: '#c9a7ff', borderRadius: '10px 10px 0 0' }} />
      <div style={{ position: 'absolute', left: 620, top: base - X.family * k - 44, width: bw, textAlign: 'center', fontFamily: T.font, fontSize: 30, fontWeight: 900, color: T.white, opacity: pb }}>{money(X.family)}</div>
      <div style={{ position: 'absolute', left: 860, top: base - (X.salary + X.partner / 2) * k - 12, ...label('#c9a7ff'), fontSize: 14, opacity: pb }}>PARTNER<br />{money(X.partner)}</div>
      <div style={{ position: 'absolute', left: 620, top: base + 10, width: bw, textAlign: 'center', ...label(T.white), fontSize: 18 }}>SAM · COUPLE</div>
      <div style={{ position: 'absolute', left: 620, top: base - X.family * k, width: bw, height: X.over * k * ov, background: 'repeating-linear-gradient(45deg, rgba(224,57,43,.55) 0 8px, rgba(224,57,43,.08) 8px 20px)', borderRadius: '10px 10px 0 0' }} />
      <div style={{ position: 'absolute', left: 620, top: base + 40, width: bw, textAlign: 'center', fontFamily: T.font, fontSize: 34, fontWeight: 900, color: T.red, opacity: calc }}>$0</div>
      {/* the line */}
      <div style={{ position: 'absolute', left: 130, top: ly - 2, width: 820 * line, height: 4, background: T.gold }} />
      <div style={{ position: 'absolute', left: 430, top: ly - 30, ...label(T.gold), fontSize: 16, opacity: line }}>{money(X.thr)} LINE</div>
      <div style={{ position: 'absolute', left: 90, top: y + 560, width: 900, fontFamily: T.font, fontSize: 24, fontWeight: 800, color: T.soft, opacity: calc }}>
        {money(X.over)} over × {X.pct}% = $1,678 &gt; {money(X.couple)} couple max → <span style={{ color: T.red }}>$0</span>
      </div>
      {f >= Q.eighty && <Stamp f={f} at={Q.eighty} text="COUNTS BOTH INCOMES" x={110} y={y + 110} size={26} color={T.gold} rotate={-4} />}
    </div>
  );
};

// ---------- reveal: both must file ----------
const Filing = ({ f }: { f: number }) => {
  const a = B.reveal.s, b = B.action.s;
  if (f < a || f > b + 12) return null;
  const y = L.file.y, r1 = ease(f, a + 6, a + 14), r2 = ease(f, Q.nofile - 4, Q.nofile + 6), st = outBack((f - Q.stop) / 12);
  const row = (top: number, t: string, ok: boolean, o: number) => (
    <div style={{ position: 'absolute', left: 110, top, width: 860, height: 100, borderRadius: 18, border: `2px solid ${ok ? GREEN : T.red}`, background: 'rgba(255,255,255,.04)', opacity: o, display: 'flex', alignItems: 'center', gap: 24, paddingLeft: 26, boxSizing: 'border-box' }}>
      <div style={{ width: 54, height: 54, borderRadius: 10, border: `3px solid ${ok ? GREEN : T.red}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: T.font, fontSize: 40, fontWeight: 900, color: ok ? GREEN : T.red }}>{ok ? '✓' : '✗'}</div>
      <div style={{ fontFamily: T.font, fontSize: 34, fontWeight: 900, color: T.white }}>{t}</div>
    </div>
  );
  return (
    <div style={{ opacity: ease(f, a, a + 10) * (1 - ease(f, b - 2, b + 12)) }}>
      <div style={{ position: 'absolute', left: 56, top: y - 20, width: 968, height: 520, borderRadius: 28, ...glass }} />
      <div style={{ position: 'absolute', left: 90, top: y + 4, ...label(T.gold) }}>BOTH PARTNERS MUST FILE</div>
      {row(y + 60, 'Your return · filed', true, r1)}
      {row(y + 180, "Spouse's return · not filed", false, r2)}
      <div style={{ position: 'absolute', left: 110, top: y + 320, width: 860, height: 110, borderRadius: 18, background: 'rgba(224,57,43,.18)', border: `2px solid ${T.red}`, opacity: clamp(st), transform: `scale(${0.8 + 0.2 * clamp(st)})`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: T.font, fontSize: 42, fontWeight: 900, color: T.red }}>BENEFIT PAYMENTS STOP</div>
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
        <div style={{ position: 'absolute', left: 36, top: 26, ...label(T.gold) }}>CHECK BOTH</div>
        <div style={{ position: 'absolute', left: 36, top: 66, right: 36, fontFamily: T.font, fontSize: 32, fontWeight: 900, lineHeight: 1.15, color: T.white, opacity: ease(f, Q.check - 4, Q.check + 6) }}>
          Check family net income (both line 23600s) and that both partners filed
        </div>
      </div>
      <div style={{ position: 'absolute', left: 0, top: 240, display: 'flex', alignItems: 'center', gap: 18, opacity: ease(f, Q.next - 4, Q.next + 8) }}>
        <Flag f={f} w={90} amp={0.06} />
        <div style={{ display: 'inline-flex', padding: '16px 28px', borderRadius: 999, background: `linear-gradient(160deg,${T.goldHi},${T.gold} 50%,${T.goldDeep})`, color: '#1d1503', fontFamily: T.font, fontSize: 28, fontWeight: 900,
          transform: `scale(${1 + 0.03 * Math.sin((f - a) / 6)})` }}>NEXT: WHY BENEFITS STOPPED →</div>
      </div>
      <div style={{ position: 'absolute', left: 0, top: 330, fontFamily: T.font, fontSize: 26, fontWeight: 700, color: T.white, textShadow, opacity: ease(f, Q.follow, Q.follow + 10) }}>Follow so you don't miss it</div>
      <div style={{ position: 'absolute', left: -10, top: 380, width: 900, padding: '14px 18px', borderRadius: 14, background: 'rgba(10,16,28,.84)', fontFamily: T.font, fontSize: 18, fontWeight: 600, color: T.mute, lineHeight: 1.45, opacity: ease(f, a + 6, a + 20) }}>
        Source: canada.ca (CRA) adjusted family net income; CGEB how much (July 2026–June 2027); 5000-G filing rule · example · general info, not advice
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

export const M2V3 = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: T.navy, fontFamily: T.font, overflow: 'hidden' }}>
      <SceneCuts f={f} cuts={CUTS} scene={(i) => i === 0 ? (
        <PhotoPlate f={f} src="plates/m2-s1-4k.jpg" iw={PW} ih={PH} keys={K1} glide={40} blur={0.8 + 4 * (1 - ease(f, 0, 20))} snow={[{ u0: 0.35, v0: 0.0, u1: 1.0, v1: 0.55 }]} steam={{ u: 0.38, v: 0.68, w: 0.025 }} />
      ) : i === 1 ? (
        <PhotoPlate f={f} src="plates/m2-s2-4k.jpg" iw={PW} ih={PH} keys={K2} glide={50} blur={0.8} snow={[{ u0: 0.45, v0: 0.0, u1: 1.0, v1: 0.5 }]} steam={{ u: 0.22, v: 0.69, w: 0.03 }} />
      ) : (
        <PhotoPlate f={f} src="plates/m2-s3-4k.jpg" iw={PW} ih={PH} keys={K3} glide={40} blur={0.8} snow={[{ u0: 0.0, v0: 0.0, u1: 1.0, v1: 0.6 }]} />
      )} />
      <Depth f={f} seed={f < B.c2.s ? 50 : f < B.reveal.s ? 51 : 52} warm={0.6} />
      <NavyGrade low={f >= B.action.s ? 1.2 : 1} />
      <Header f={f} />
      <Typed f={f} caps={CAPS} head={T.font} />
      {f < B.c1.s + 20 && <Hook f={f} />}
      <Stack f={f} />
      <Filing f={f} />
      <End f={f} />
      <Captions f={f} fps={M2FPS} beats={WORDS.beats as never} from={B.c1.s} until={B.action.s} y={1296} />
    </AbsoluteFill>
  );
};
