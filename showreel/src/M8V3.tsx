// M8 "The GST credit has a new name" — investigation format, motion engine v1 (2026-11-06). Checklist: channel/REEL-CHECKLIST.md.
// Variety vs M7 / M26 / M3: hook = "GST/HST CREDIT" struck through, the CGEB name card sliding in, a +25% pill; main visual = a
// code-drawn paper receipt (maximums, then Amira + Ben's $890 + 2 × $234 = $1,358) and four tear-off quarterly coupons
// (JUL/OCT/JAN/APR, $339.50); re-hook = "4 PAYMENTS A YEAR" stamp (≈57 %); reveal = a benefit-vs-income line, flat to $46,432
// then −5 % of the extra, marker at $56,432 → −$500; end = check card + next pill.
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { PhotoPlate, SceneCuts, type Focus } from './Plate';
import { Flag } from './RaiseShort';
import { Typed, beatsFrom, type Cap } from './Kit';
import TL from './m8-timeline.json';
import WORDS from './m8-words.json';
import CUE from './m8-cues.json';
import DATA from '../../m8/data.json';
import REEL from '../../m8/reel.json';
import { T, goldFill, textShadow } from './motion/brand';
import { Captions, Depth, Kinetic, NavyGrade, Stamp, clamp, ease, money, outBack, outExpo } from './motion/Reel';

export const M8FPS = 24;
const B = beatsFrom(TL, M8FPS);
export const M8DUR = Math.ceil((TL.total + REEL.hold_after_vo) * M8FPS);
const Q = Object.fromEntries(Object.entries(CUE).map(([k, v]) => [k, Math.round((v as number) * M8FPS)])) as Record<string, number>;
const X = DATA.example;
const GREEN = T.green;
const PW = 2294, PH = 4096;
const CUTS = [B.c2.s, B.reveal.s];
const L = Object.fromEntries(Object.entries(REEL.layout).map(([k, v]) => [k, { x: v.box[0], y: v.box[1], w: v.box[2], h: v.box[3] }])) as Record<string, { x: number; y: number; w: number; h: number }>;
const K1: Focus[] = [{ f: 0, u: 0.5, v: 0.3, k: 1.14 }, { f: B.c1.s, u: 0.45, v: 0.28, k: 1.22 }];
const K2: Focus[] = [{ f: 0, u: 0.5, v: 0.32, k: 1.2 }, { f: B.c4.s, u: 0.55, v: 0.3, k: 1.12 }];
const K3: Focus[] = [{ f: 0, u: 0.5, v: 0.34, k: 1.2 }, { f: B.action.s, u: 0.5, v: 0.3, k: 1.08 }];
const CAPS: Cap[] = [
  { at: B.c1.s, l1: 'WHAT CHANGED', l2: `+${X.pct}% over the GST credit · ${X.years} years`, until: B.c2.s - 2 },
  { at: B.c2.s, l1: 'THE MAXIMUMS', l2: 'July 2026 – June 2027', until: B.c3.s - 2 },
  { at: B.c3.s, l1: 'AMIRA & BEN', l2: 'couple · 2 children', until: B.c4.s - 2 },
  { at: B.c4.s, l1: 'WHEN IT ARRIVES', l2: 'four quarterly payments', until: B.reveal.s - 2 },
  { at: B.reveal.s, l1: 'THE TWIST', l2: `the ${money(X.thr)} line`, until: B.action.s - 2 },
];
const glass = { background: 'linear-gradient(160deg, rgba(10,16,28,.86), rgba(10,16,28,.62))', border: `1px solid ${T.glassEdge}` };
const label = (c: string) => ({ fontFamily: T.font, fontSize: 18, fontWeight: 900, letterSpacing: 4, color: c });

const Hook = ({ f }: { f: number }) => {
  const strike = ease(f, Q.gone - 3, Q.gone + 6), nn = outExpo((f - Q.name + 4) / 16), up = outBack((f - Q.bigger) / 12);
  return (
    <div style={{ opacity: 1 - ease(f, B.c1.s - 6, B.c1.s + 8) }}>
      <Kinetic f={f} at={0} now text={REEL.hook.l1} x={80} y={440} size={70} nowrap />
      <Kinetic f={f} at={0} now text={REEL.hook.l2} x={80} y={524} size={70} nowrap color={T.gold} />
      <div style={{ position: 'absolute', left: 80, top: 690, width: 920, height: 120, borderRadius: 22, ...glass, opacity: ease(f, 2, 10) }}>
        <div style={{ position: 'absolute', left: 36, top: 30, fontFamily: T.font, fontSize: 54, fontWeight: 900, color: T.soft }}>GST/HST CREDIT</div>
        <div style={{ position: 'absolute', left: 30, top: 58, width: 470 * strike, height: 7, background: T.red }} />
      </div>
      <div style={{ position: 'absolute', left: 80, top: 840, width: 920, height: 190, borderRadius: 22, ...glass, border: `2px solid ${GREEN}`, opacity: clamp(nn), transform: `translateY(${(1 - clamp(nn)) * 40}px)` }}>
        <div style={{ position: 'absolute', left: 36, top: 26, ...label(GREEN), fontSize: 18 }}>SINCE JULY 2026</div>
        <div style={{ position: 'absolute', left: 36, top: 58, right: 36, fontFamily: T.font, fontSize: 46, fontWeight: 900, color: T.white, lineHeight: 1.1 }}>CANADA GROCERIES AND ESSENTIALS BENEFIT</div>
      </div>
      <div style={{ position: 'absolute', left: 760, top: 1060, padding: '14px 26px', borderRadius: 999, background: `linear-gradient(160deg,${T.goldHi},${T.gold} 50%,${T.goldDeep})`, fontFamily: T.font, fontSize: 48, fontWeight: 900, color: '#1d1503', opacity: clamp(up), transform: `scale(${0.6 + 0.4 * clamp(up)})` }}>+{X.pct}%</div>
    </div>
  );
};

// ---------- the receipt ----------
const Line = ({ f, at, l, r, bold = false, c = '#1b2230' }: { f: number; at: number; l: string; r: string; bold?: boolean; c?: string }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'JetBrains Mono, monospace', fontSize: bold ? 42 : 33, fontWeight: bold ? 900 : 700, color: c, opacity: ease(f, at - 3, at + 5), marginTop: 10 }}>
    <span>{l}</span><span>{r}</span>
  </div>
);
const Receipt = ({ f }: { f: number }) => {
  const a = B.c1.s + 2, b = B.reveal.s;
  if (f < a - 1 || f > b + 14) return null;
  const y = L.receipt.y, grow = outExpo((f - a) / 30), fam = f >= Q.c3 - 2, qs = [Q.q1, Q.q2, Q.q3, Q.q4], mon = ['JUL', 'OCT', 'JAN', 'APR'];
  return (
    <div style={{ opacity: outExpo((f - a) / 14) * (1 - ease(f, b - 2, b + 12)) }}>
      <div style={{ position: 'absolute', left: 140, top: y - 20, width: 800, height: (fam ? 330 : 380) * grow, background: '#f4f1e8', borderRadius: 6, boxShadow: '0 20px 50px rgba(0,0,0,.5)', overflow: 'hidden', padding: '26px 36px', boxSizing: 'border-box',
        clipPath: 'polygon(0 0,100% 0,100% 100%,95% 98%,90% 100%,85% 98%,80% 100%,75% 98%,70% 100%,65% 98%,60% 100%,55% 98%,50% 100%,45% 98%,40% 100%,35% 98%,30% 100%,25% 98%,20% 100%,15% 98%,10% 100%,5% 98%,0 100%)' }}>
        <div style={{ textAlign: 'center', fontFamily: 'JetBrains Mono, monospace', fontSize: 26, fontWeight: 800, color: '#1b2230', letterSpacing: 3 }}>CGEB · JUL 2026 – JUN 2027</div>
        <div style={{ borderTop: '2px dashed #8a8f99', margin: '14px 0 4px' }} />
        {!fam && <>
          <Line f={f} at={Q.pct} l="VS GST CREDIT" r={`+${X.pct}% · ${X.years} YRS`} />
          <Line f={f} at={Q.s} l="SINGLE MAX" r={money(X.single)} />
          <Line f={f} at={Q.cp} l="COUPLE MAX" r={money(X.couple)} />
          <Line f={f} at={Q.ch} l="EACH CHILD <19" r={`+${money(X.child)}`} />
        </>}
        {fam && <>
          <Line f={f} at={Q.c3} l="AMIRA + BEN" r={money(X.couple)} />
          <Line f={f} at={Q.c3 + 8} l={`2 CHILDREN × ${money(X.child)}`} r={money(X.child * 2)} />
          <div style={{ borderTop: '2px dashed #8a8f99', margin: '14px 0 4px', opacity: ease(f, Q.tot - 4, Q.tot + 2) }} />
          <Line f={f} at={Q.tot} l="TOTAL / YEAR" r={money(X.family)} bold c="#0f6b3e" />
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 21, color: '#5d6470', marginTop: 8, opacity: ease(f, Q.tot, Q.tot + 8) }}>family net income ≤ {money(X.thr)}</div>
        </>}
      </div>
      {f >= Q.c4 - 4 && mon.map((m, i) => {
        const p = outBack((f - qs[i]) / 12);
        return <div key={m} style={{ position: 'absolute', left: 110 + i * 222, top: y + 350, width: 200, height: 120, borderRadius: 16, border: `2px dashed ${GREEN}`, background: 'rgba(127,224,168,.12)', opacity: clamp(p), transform: `translateY(${(1 - clamp(p)) * 40}px) rotate(${(i - 1.5) * 2}deg)`,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ ...label(GREEN), fontSize: 18 }}>{m}</div>
          <div style={{ fontFamily: T.font, fontSize: 36, fontWeight: 900, color: T.white }}>$339.50</div>
        </div>;
      })}
      {f >= Q.q1 && <Stamp f={f} at={Q.q1} text="4 PAYMENTS A YEAR" x={520} y={y + 500} size={30} color={GREEN} rotate={-5} />}
    </div>
  );
};

// ---------- reveal: the 5% slope ----------
const Slope = ({ f }: { f: number }) => {
  const a = B.reveal.s, b = B.action.s;
  if (f < a || f > b + 12) return null;
  const y = L.slope.y, x0 = 150, W = 800, gy = y + 90, H = 260;
  const inc = (v: number) => x0 + (W * (v - 20000)) / 50000;
  const amt = (v: number) => gy + H - (H * v) / 1500;
  const t = outExpo((f - a - 4) / 30), mk = ease(f, Q.over - 4, Q.over + 12), cut = ease(f, Q.cut - 4, Q.cut + 6);
  const xm = inc(X.thr + X.over * mk), ym = amt(X.family - X.cut * mk);
  const path = `M ${inc(20000)} ${amt(X.family)} L ${inc(X.thr)} ${amt(X.family)} L ${inc(70000)} ${amt(Math.max(0, X.family - 0.05 * (70000 - X.thr)))}`;
  return (
    <div style={{ opacity: ease(f, a, a + 10) * (1 - ease(f, b - 2, b + 12)) }}>
      <div style={{ position: 'absolute', left: 56, top: y - 20, width: 968, height: 520, borderRadius: 28, ...glass }} />
      <div style={{ position: 'absolute', left: 90, top: y + 4, ...label(T.gold) }}>ABOVE {money(X.thr)}: −{X.rate}% OF THE EXTRA</div>
      <svg style={{ position: 'absolute', left: 0, top: 0 }} width={1080} height={1920}>
        <path d={path} fill="none" stroke={GREEN} strokeWidth={7} strokeDasharray="1400" strokeDashoffset={1400 * (1 - t)} />
        <line x1={inc(X.thr)} y1={gy - 10} x2={inc(X.thr)} y2={gy + H + 10} stroke={T.gold} strokeWidth={3} strokeDasharray="8 8" opacity={t} />
        <circle cx={xm} cy={ym} r={14} fill={T.white} opacity={mk} />
      </svg>
      <div style={{ position: 'absolute', left: x0, top: amt(X.family) - 50, ...label(GREEN), fontSize: 18, opacity: t }}>{money(X.family)}/YR</div>
      <div style={{ position: 'absolute', left: inc(X.thr) - 90, top: gy + H + 20, width: 180, textAlign: 'center', ...label(T.gold), fontSize: 16, opacity: t }}>{money(X.thr)}</div>
      <div style={{ position: 'absolute', left: xm - 20, top: ym + 22, width: 260, ...label(T.white), fontSize: 16, opacity: mk }}>{money(X.thr + X.over)} FAMILY INCOME</div>
      <div style={{ position: 'absolute', left: xm + 24, top: ym - 70, fontFamily: T.font, fontSize: 44, fontWeight: 900, color: T.red, opacity: cut }}>−{money(X.cut)} → {money(X.after)}</div>
      <div style={{ position: 'absolute', left: 90, top: y + 440, width: 900, textAlign: 'center', fontFamily: T.font, fontSize: 20, fontWeight: 700, color: T.mute, opacity: t }}>Example couple, 2 children · based on 2025 family net income</div>
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
        <div style={{ position: 'absolute', left: 36, top: 26, ...label(T.gold) }}>FILE ON TIME</div>
        <div style={{ position: 'absolute', left: 36, top: 66, right: 36, fontFamily: T.font, fontSize: 32, fontWeight: 900, lineHeight: 1.15, color: T.white, opacity: ease(f, Q.file - 4, Q.file + 6) }}>
          It's calculated from last year's return: file on time, every year
        </div>
      </div>
      <div style={{ position: 'absolute', left: 0, top: 240, display: 'flex', alignItems: 'center', gap: 18, opacity: ease(f, Q.next - 4, Q.next + 8) }}>
        <Flag f={f} w={90} amp={0.06} />
        <div style={{ display: 'inline-flex', padding: '16px 28px', borderRadius: 999, background: `linear-gradient(160deg,${T.goldHi},${T.gold} 50%,${T.goldDeep})`, color: '#1d1503', fontFamily: T.font, fontSize: 28, fontWeight: 900,
          transform: `scale(${1 + 0.03 * Math.sin((f - a) / 6)})` }}>NEXT: CANADA WORKERS BENEFIT →</div>
      </div>
      <div style={{ position: 'absolute', left: 0, top: 330, fontFamily: T.font, fontSize: 26, fontWeight: 700, color: T.white, textShadow, opacity: ease(f, Q.follow, Q.follow + 10) }}>Follow so you don't miss it</div>
      <div style={{ position: 'absolute', left: -10, top: 380, width: 900, padding: '14px 18px', borderRadius: 14, background: 'rgba(10,16,28,.84)', fontFamily: T.font, fontSize: 18, fontWeight: 600, color: T.mute, lineHeight: 1.45, opacity: ease(f, a + 6, a + 20) }}>
        Source: canada.ca (CRA) Canada Groceries and Essentials Benefit: how much (July 2026–June 2027); Budget 2026 · example · general info, not advice
      </div>
    </div>
  );
};

const Header = ({ f }: { f: number }) => (
  <div style={{ position: 'absolute', left: 80, top: 92, right: 80, display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: T.white, fontSize: 22, fontWeight: 800, letterSpacing: 4, fontFamily: T.font }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}><Flag f={f} w={72} />TAX SECRETS CANADA</div>
    <div style={{ color: T.gold, letterSpacing: 5 }}>CGEB · {DATA.tax_year}</div>
  </div>
);

export const M8V3 = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: T.navy, fontFamily: T.font, overflow: 'hidden' }}>
      <SceneCuts f={f} cuts={CUTS} scene={(i) => i === 0 ? (
        <PhotoPlate f={f} src="plates/m8-s1-4k.jpg" iw={PW} ih={PH} keys={K1} glide={40} blur={0.8 + 4 * (1 - ease(f, 0, 20))} snow={[{ u0: 0.1, v0: 0.2, u1: 1.0, v1: 0.45 }]} />
      ) : i === 1 ? (
        <PhotoPlate f={f} src="plates/m8-s2-4k.jpg" iw={PW} ih={PH} keys={K2} glide={50} blur={0.8} snow={[{ u0: 0.6, v0: 0.0, u1: 1.0, v1: 0.5 }]} steam={{ u: 0.06, v: 0.46, w: 0.03 }} />
      ) : (
        <PhotoPlate f={f} src="plates/m8-s3-4k.jpg" iw={PW} ih={PH} keys={K3} glide={40} blur={0.8} snow={[{ u0: 0.75, v0: 0.1, u1: 1.0, v1: 0.45 }]} steam={{ u: 0.17, v: 0.68, w: 0.03 }} />
      )} />
      <Depth f={f} seed={f < B.c2.s ? 50 : f < B.reveal.s ? 51 : 52} warm={0.6} />
      <NavyGrade low={f >= B.action.s ? 1.2 : 1} />
      <Header f={f} />
      <Typed f={f} caps={CAPS} head={T.font} />
      {f < B.c1.s + 20 && <Hook f={f} />}
      <Receipt f={f} />
      <Slope f={f} />
      <End f={f} />
      <Captions f={f} fps={M8FPS} beats={WORDS.beats as never} from={B.c1.s} until={B.action.s} y={1296} />
    </AbsoluteFill>
  );
};
