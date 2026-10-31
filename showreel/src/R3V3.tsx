// R3 "Donations: same $400, $58 or $87" — investigation format, motion engine v1 (2026-10-31). Checklist: channel/REEL-CHECKLIST.md.
// Variety vs M30 / R2 / R1: hook = two $200 receipt envelopes (ALEX / SAM) flying together and merging, with a $58 → $87
// flip counter; main visual = a two-step "credit staircase" (14.5% step, 29% step) — split: two staircases, each filled only
// on the low step; pooled: Sam's block climbs onto Alex's 29% step; re-hook = "+$29 SAME GIFTS" stamp (≈60 %);
// reveal = a 2025→2030 year rail where receipts wait and stack (carry forward 5 years) + non-refundable note; end = check card.
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { PhotoPlate, SceneCuts, type Focus } from './Plate';
import { Flag } from './RaiseShort';
import { Typed, beatsFrom, type Cap } from './Kit';
import TL from './r3-timeline.json';
import WORDS from './r3-words.json';
import CUE from './r3-cues.json';
import DATA from '../../r3/data.json';
import REEL from '../../r3/reel.json';
import { T, goldFill, textShadow } from './motion/brand';
import { Captions, Depth, Kinetic, NavyGrade, Stamp, clamp, ease, money, outBack, outExpo } from './motion/Reel';

export const R3FPS = 24;
const B = beatsFrom(TL, R3FPS);
export const R3DUR = Math.ceil((TL.total + REEL.hold_after_vo) * R3FPS);
const Q = Object.fromEntries(Object.entries(CUE).map(([k, v]) => [k, Math.round((v as number) * R3FPS)])) as Record<string, number>;
const X = DATA.example;
const GREEN = T.green;
const PW = 2294, PH = 4096; // TODO: confirm against the downloaded 4K plates
const CUTS = [B.c2.s, B.reveal.s];
const L = Object.fromEntries(Object.entries(REEL.layout).map(([k, v]) => [k, { x: v.box[0], y: v.box[1], w: v.box[2], h: v.box[3] }])) as Record<string, { x: number; y: number; w: number; h: number }>;
const K1: Focus[] = [{ f: 0, u: 0.5, v: 0.3, k: 1.14 }, { f: B.c1.s, u: 0.45, v: 0.28, k: 1.22 }];
const K2: Focus[] = [{ f: 0, u: 0.5, v: 0.32, k: 1.2 }, { f: B.c4.s, u: 0.55, v: 0.3, k: 1.12 }];
const K3: Focus[] = [{ f: 0, u: 0.5, v: 0.34, k: 1.2 }, { f: B.action.s, u: 0.5, v: 0.3, k: 1.08 }];
const CAPS: Cap[] = [
  { at: B.c1.s, l1: 'THE COUPLE', l2: `${money(X.alex)} + ${money(X.sam)} to charity · ${DATA.tax_year}`, until: B.c2.s - 2 },
  { at: B.c2.s, l1: 'THE RULE', l2: `first ${money(X.tier)} 14.5% · above it 29%`, until: B.c3.s - 2 },
  { at: B.c3.s, l1: 'SPLIT', l2: 'two returns, two low steps', until: B.c4.s - 2 },
  { at: B.c4.s, l1: 'POOLED', l2: 'one return claims both receipts', until: B.reveal.s - 2 },
  { at: B.reveal.s, l1: 'THE TWIST', l2: 'claim now or carry forward', until: B.action.s - 2 },
]
const glass = { background: 'linear-gradient(160deg, rgba(10,16,28,.86), rgba(10,16,28,.62))', border: `1px solid ${T.glassEdge}` };
const label = (c: string) => ({ fontFamily: T.font, fontSize: 18, fontWeight: 900, letterSpacing: 4, color: c });

const Env = ({ f, x0, x1, y, at, merge, name, c }: { f: number; x0: number; x1: number; y: number; at: number; merge: number; name: string; c: string }) => {
  const p = outExpo((f - at) / 18), m = outExpo((f - merge) / 16), x = x0 + (x1 - x0) * m;
  return (
    <div style={{ position: 'absolute', left: x, top: y + 30 * (1 - p), width: 360, height: 230, opacity: clamp(p), transform: `rotate(${(1 - m) * (x0 < 500 ? -6 : 6)}deg)` }}>
      <div style={{ position: 'absolute', inset: 0, borderRadius: 20, ...glass, border: `2px solid ${c}` }} />
      <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 0, borderLeft: '180px solid transparent', borderRight: '180px solid transparent', borderTop: `90px solid rgba(255,255,255,.08)` }} />
      <div style={{ position: 'absolute', left: 0, right: 0, top: 70, textAlign: 'center', ...label(T.soft), fontSize: 22 }}>{name}'S RECEIPT</div>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 108, textAlign: 'center', fontFamily: T.font, fontSize: 80, fontWeight: 900, color: T.white, textShadow }}>{money(X.tier)}</div>
    </div>
  );
};
const Hook = ({ f }: { f: number }) => {
  const mg = Q.c87 - 10, flip = ease(f, Q.c87 - 3, Q.c87 + 6);
  return (
    <div style={{ opacity: 1 - ease(f, B.c1.s - 6, B.c1.s + 8) }}>
      <Kinetic f={f} at={0} now text={REEL.hook.l1} x={80} y={440} size={70} nowrap />
      <Kinetic f={f} at={0} now text={REEL.hook.l2} x={80} y={524} size={70} nowrap color={T.gold} />
      <Env f={f} x0={80} x1={360} y={660} at={Math.min(Q.c400 - 6, 6)} merge={mg} name="ALEX" c={T.soft} />
      <Env f={f} x0={640} x1={360} y={660} at={Math.min(Q.c400, 10)} merge={mg} name="SAM" c={T.soft} />
      <div style={{ position: 'absolute', left: 80, top: 940, width: 920, textAlign: 'center', opacity: ease(f, Q.c58 - 3, Q.c58 + 6) }}>
        <div style={{ ...label(T.mute) }}>{flip < 0.5 ? 'SPLIT ON TWO RETURNS' : 'POOLED ON ONE RETURN'}</div>
        <div style={{ position: 'relative', height: 150, marginTop: 10 }}>
          <div style={{ position: 'absolute', left: 0, right: 0, fontFamily: T.font, fontSize: 130, fontWeight: 900, color: T.soft, opacity: 1 - flip, transform: `translateY(${-60 * flip}px)` }}>{money(X.split)}</div>
          <div style={{ position: 'absolute', left: 0, right: 0, fontFamily: T.font, fontSize: 140, fontWeight: 900, ...goldFill, opacity: flip, transform: `translateY(${60 * (1 - flip)}px)` }}>{money(X.pooled)}</div>
        </div>
      </div>
    </div>
  );
};

// ---------- the credit staircase ----------
const Stairs = ({ f }: { f: number }) => {
  const a = B.c1.s + 2, b = B.reveal.s;
  if (f < a - 1 || f > b + 14) return null;
  const y = L.stairs.y, base = y + 470, SW = 170, hLow = 140, hHigh = 280;
  const pool = outExpo((f - Q.jump) / 20), pooled = f >= B.c4.s;
  const steps = (x: number, who: string, filledLow: boolean, filledHigh: number, credit: number, dim: boolean) => (
    <div style={{ position: 'absolute', left: 0, top: 0, opacity: dim ? 0.3 : 1 }}>
      <div style={{ position: 'absolute', left: x, top: base - hLow, width: SW, height: hLow, borderRadius: '10px 10px 0 0', border: `2px solid ${T.glassEdge}`, background: filledLow ? 'rgba(160,176,200,.55)' : 'rgba(255,255,255,.04)' }}>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 14, textAlign: 'center', fontFamily: T.font, fontSize: 30, fontWeight: 900, color: T.white }}>14.5%</div>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 54, textAlign: 'center', ...label(T.soft), fontSize: 15 }}>FIRST {money(X.tier)}</div>
      </div>
      <div style={{ position: 'absolute', left: x + SW, top: base - hHigh, width: SW, height: hHigh, borderRadius: '10px 10px 0 0', border: `2px solid ${T.glassEdge}`, overflow: 'hidden', background: 'rgba(255,255,255,.04)' }}>
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: hHigh * filledHigh, background: `linear-gradient(180deg, ${T.gold}, ${T.goldDeep})` }} />
        <div style={{ position: 'absolute', left: 0, right: 0, top: 14, textAlign: 'center', fontFamily: T.font, fontSize: 30, fontWeight: 900, color: filledHigh > 0.5 ? '#1d1503' : T.gold }}>29%</div>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 54, textAlign: 'center', ...label(filledHigh > 0.5 ? '#1d1503' : T.soft), fontSize: 15 }}>ABOVE {money(X.tier)}</div>
      </div>
      <div style={{ position: 'absolute', left: x, top: base + 14, width: SW * 2, textAlign: 'center', ...label(T.white), fontSize: 20 }}>{who}</div>
      <div style={{ position: 'absolute', left: x, top: base + 44, width: SW * 2, textAlign: 'center', fontFamily: T.font, fontSize: 34, fontWeight: 900, color: credit > X.credit_each ? GREEN : T.white }}>{money(credit)}</div>
    </div>
  );
  const lowOn = f >= Q.each - 4, alexHigh = pooled ? pool : 0, credA = pooled && pool > 0.6 ? X.pooled : X.credit_each;
  return (
    <div style={{ opacity: outExpo((f - a) / 14) * (1 - ease(f, b - 2, b + 12)) }}>
      <div style={{ position: 'absolute', left: 56, top: y - 20, width: 968, height: 640, borderRadius: 28, ...glass }} />
      <div style={{ position: 'absolute', left: 90, top: y, ...label(T.mute) }}>FEDERAL DONATION CREDIT · {DATA.tax_year} · PER RETURN</div>
      <div style={{ position: 'absolute', left: 90, top: y + 34, fontFamily: T.font, fontSize: 22, fontWeight: 800, color: T.soft, opacity: ease(f, Q.low - 2, Q.low + 8) }}>
        first {money(X.tier)} × 14.5% = {money(X.credit_each)} · <span style={{ opacity: ease(f, Q.high - 2, Q.high + 8) }}>next {money(X.tier)} × 29% = {money(X.tier * X.high)}</span>
      </div>
      {f >= Q.alex && steps(110, 'ALEX', lowOn, alexHigh, lowOn ? credA : 0, false)}
      {f >= Q.sam && steps(560, 'SAM', lowOn && !(pooled && pool > 0.5), 0, lowOn ? (pooled && pool > 0.6 ? 0 : X.credit_each) : 0, pooled && pool > 0.6)}
      {f >= Q.split - 2 && f < B.c4.s && <div style={{ position: 'absolute', left: 90, top: y + 108, ...label(T.white), fontSize: 24, opacity: ease(f, Q.split - 2, Q.split + 8) }}>SPLIT TOTAL: {money(X.split)}</div>}
      {pooled && <div style={{ position: 'absolute', left: 90, top: y + 108, ...label(T.gold), fontSize: 24, opacity: ease(f, Q.jump, Q.jump + 10) }}>POOLED TOTAL: {money(X.pooled)}</div>}
      {f >= Q.more && <Stamp f={f} at={Q.more} text={`+${money(X.gain)} · SAME GIFTS`} x={500} y={y + 140} size={30} color={T.red} rotate={-5} />}
    </div>
  );
};

// ---------- reveal: the carry-forward year rail ----------
const Years = ({ f }: { f: number }) => {
  const a = B.reveal.s, b = B.action.s;
  if (f < a || f > b + 12) return null;
  const y = L.years.y, yrs = [0, 1, 2, 3, 4, 5].map((k) => DATA.tax_year + k), w = 132;
  const run = outExpo((f - Q.five + 4) / 30), stk = ease(f, Q.stack - 4, Q.stack + 8);
  return (
    <div style={{ opacity: ease(f, a, a + 10) * (1 - ease(f, b - 2, b + 12)) }}>
      <div style={{ position: 'absolute', left: 56, top: y - 20, width: 968, height: 520, borderRadius: 28, ...glass }} />
      <div style={{ position: 'absolute', left: 90, top: y + 4, ...label(T.gold) }}>CARRY FORWARD: ANY OF THE NEXT 5 YEARS</div>
      {yrs.map((yr, i) => (
        <div key={yr} style={{ position: 'absolute', left: 100 + i * (w + 12), top: y + 250, width: w, height: 70, borderRadius: 14, border: `2px solid ${i === 0 ? T.gold : T.glassEdge}`,
          background: i / 5 <= run ? 'rgba(241,199,91,.14)' : 'rgba(255,255,255,.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: T.font, fontSize: 28, fontWeight: 900, color: T.white }}>{yr}</div>
      ))}
      {[0, 1, 2].map((k) => (
        <div key={k} style={{ position: 'absolute', left: 100 + run * 5 * (w + 12) + 6, top: y + 190 - k * 46 * stk, width: w - 12, height: 40, borderRadius: 8, background: `linear-gradient(90deg, ${T.goldDeep}, ${T.gold})`, opacity: k === 0 ? 1 : stk,
          boxShadow: '0 6px 16px rgba(0,0,0,.4)' }} />
      ))}
      <div style={{ position: 'absolute', left: 90, top: y + 350, width: 900, fontFamily: T.font, fontSize: 26, fontWeight: 800, color: T.soft, lineHeight: 1.3, opacity: ease(f, Q.owed - 6, Q.owed + 6) }}>
        Non-refundable: it only cuts tax the claimer owes. Claim up to 75% of net income a year.
      </div>
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
        <div style={{ position: 'absolute', left: 36, top: 26, ...label(T.gold) }}>POOL & CHECK</div>
        <div style={{ position: 'absolute', left: 36, top: 66, right: 36, fontFamily: T.font, fontSize: 32, fontWeight: 900, lineHeight: 1.15, color: T.white, opacity: ease(f, Q.pool - 4, Q.pool + 6) }}>
          Put both receipts on one return (Schedule 9, line 34900): the spouse who owes tax
        </div>
      </div>
      <div style={{ position: 'absolute', left: 0, top: 240, display: 'flex', alignItems: 'center', gap: 18, opacity: ease(f, Q.next - 4, Q.next + 8) }}>
        <Flag f={f} w={90} amp={0.06} />
        <div style={{ display: 'inline-flex', padding: '16px 28px', borderRadius: 999, background: `linear-gradient(160deg,${T.goldHi},${T.gold} 50%,${T.goldDeep})`, color: '#1d1503', fontFamily: T.font, fontSize: 28, fontWeight: 900,
          transform: `scale(${1 + 0.03 * Math.sin((f - a) / 6)})` }}>NEXT: MOVING EXPENSES →</div>
      </div>
      <div style={{ position: 'absolute', left: 0, top: 330, fontFamily: T.font, fontSize: 26, fontWeight: 700, color: T.white, textShadow, opacity: ease(f, Q.follow, Q.follow + 10) }}>Follow so you don't miss it</div>
      <div style={{ position: 'absolute', left: -10, top: 380, width: 900, padding: '14px 18px', borderRadius: 14, background: 'rgba(10,16,28,.84)', fontFamily: T.font, fontSize: 18, fontWeight: 600, color: T.mute, lineHeight: 1.45, opacity: ease(f, a + 6, a + 20) }}>
        Source: canada.ca (CRA) donations and gifts, line 34900 · {DATA.tax_year} federal 14.5% / 29% · example couple · general info, not advice
      </div>
    </div>
  );
};

const Header = ({ f }: { f: number }) => (
  <div style={{ position: 'absolute', left: 80, top: 92, right: 80, display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: T.white, fontSize: 22, fontWeight: 800, letterSpacing: 4, fontFamily: T.font }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}><Flag f={f} w={72} />TAX SECRETS CANADA</div>
    <div style={{ color: T.gold, letterSpacing: 5 }}>DONATIONS · {DATA.tax_year}</div>
  </div>
);

export const R3V3 = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: T.navy, fontFamily: T.font, overflow: 'hidden' }}>
      <SceneCuts f={f} cuts={CUTS} scene={(i) => i === 0 ? (
        <PhotoPlate f={f} src="plates/r3-s1-4k.jpg" iw={PW} ih={PH} keys={K1} glide={40} blur={0.8 + 4 * (1 - ease(f, 0, 20))} snow={[{ u0: 0.5, v0: 0.0, u1: 1.0, v1: 0.3 }]} />
      ) : i === 1 ? (
        <PhotoPlate f={f} src="plates/r3-s2-4k.jpg" iw={PW} ih={PH} keys={K2} glide={50} blur={0.8} />
      ) : (
        <PhotoPlate f={f} src="plates/r3-s3-4k.jpg" iw={PW} ih={PH} keys={K3} glide={40} blur={0.8} steam={{ u: 0.45, v: 0.72, w: 0.03 }} />
      )} />
      <Depth f={f} seed={f < B.c2.s ? 50 : f < B.reveal.s ? 51 : 52} warm={0.6} />
      <NavyGrade low={f >= B.action.s ? 1.2 : 1} />
      <Header f={f} />
      <Typed f={f} caps={CAPS} head={T.font} />
      {f < B.c1.s + 20 && <Hook f={f} />}
      <Stairs f={f} />
      <Years f={f} />
      <End f={f} />
      <Captions f={f} fps={R3FPS} beats={WORDS.beats as never} from={B.c1.s} until={B.action.s} y={1296} />
    </AbsoluteFill>
  );
};
