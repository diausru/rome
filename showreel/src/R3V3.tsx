// R3 "Donations: two receipts, one return" — investigation format, motion engine v1 (2026-10-31). Checklist: channel/REEL-CHECKLIST.md.
// Variety vs M30 / R2 / R1: hook = two $200 receipt cards ($29 each) that slide together into one $400 card ($87);
// main visual = a two-step credit staircase (14.5% / 29%) filled by two separate columns, then by one combined column;
// re-hook = +$29 · +50% stamp (≈65 %); reveal = five year chips, small receipts carried forward into one claim; end = check card + next pill.
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
const PW = 2294, PH = 4096;
const CUTS = [B.c2.s, B.reveal.s];
const L = Object.fromEntries(Object.entries(REEL.layout).map(([k, v]) => [k, { x: v.box[0], y: v.box[1], w: v.box[2], h: v.box[3] }])) as Record<string, { x: number; y: number; w: number; h: number }>;
const K1: Focus[] = [{ f: 0, u: 0.5, v: 0.3, k: 1.14 }, { f: B.c1.s, u: 0.45, v: 0.28, k: 1.22 }];
const K2: Focus[] = [{ f: 0, u: 0.5, v: 0.32, k: 1.2 }, { f: B.c4.s, u: 0.55, v: 0.3, k: 1.12 }];
const K3: Focus[] = [{ f: 0, u: 0.5, v: 0.34, k: 1.2 }, { f: B.action.s, u: 0.5, v: 0.3, k: 1.08 }];
const CAPS: Cap[] = [
  { at: B.c1.s, l1: 'THE COUPLE', l2: `${money(X.each)} each to charity · ${DATA.tax_year}`, until: B.c2.s - 2 },
  { at: B.c2.s, l1: 'THE RULE', l2: `first ${money(X.tier)}: 14.5% · above: 29%`, until: B.c3.s - 2 },
  { at: B.c3.s, l1: 'TWO RETURNS', l2: 'each stays in the low tier', until: B.c4.s - 2 },
  { at: B.c4.s, l1: 'ONE RETURN', l2: `both receipts · ${money(X.total)}`, until: B.reveal.s - 2 },
  { at: B.reveal.s, l1: 'THE TWIST', l2: `carry forward up to ${X.carry_years} years`, until: B.action.s - 2 },
];
const glass = { background: 'linear-gradient(160deg, rgba(10,16,28,.86), rgba(10,16,28,.62))', border: `1px solid ${T.glassEdge}` };
const label = (c: string) => ({ fontFamily: T.font, fontSize: 18, fontWeight: 900, letterSpacing: 4, color: c });


// ---------- hook: two $200 receipts slide into one $400 receipt ----------
const Receipt = ({ x, y, w, amt, credit, c, o = 1, s = 1 }: { x: number; y: number; w: number; amt: number; credit: number; c: string; o?: number; s?: number }) => (
  <div style={{ position: 'absolute', left: x, top: y, width: w, height: 400, opacity: o, transform: `scale(${s})`, transformOrigin: 'center top' }}>
    <div style={{ position: 'absolute', inset: 0, borderRadius: 22, background: 'linear-gradient(180deg, rgba(246,241,230,.97), rgba(226,219,204,.95))', boxShadow: '0 30px 70px rgba(0,0,0,.55)' }} />
    <div style={{ position: 'absolute', left: 0, right: 0, top: 30, textAlign: 'center', fontFamily: T.font, fontSize: 18, fontWeight: 900, letterSpacing: 5, color: '#6b6f78' }}>OFFICIAL RECEIPT</div>
    <div style={{ position: 'absolute', left: 30, right: 30, top: 70, borderTop: '2px dashed rgba(0,0,0,.18)' }} />
    <div style={{ position: 'absolute', left: 0, right: 0, top: 96, textAlign: 'center', fontFamily: T.font, fontSize: 92, fontWeight: 900, color: '#1a1d24' }}>{money(amt)}</div>
    <div style={{ position: 'absolute', left: 0, right: 0, top: 210, textAlign: 'center', fontFamily: T.font, fontSize: 18, fontWeight: 800, letterSpacing: 4, color: '#6b6f78' }}>FEDERAL CREDIT</div>
    <div style={{ position: 'absolute', left: '50%', top: 248, transform: 'translateX(-50%)', padding: '8px 26px', borderRadius: 14, background: c, fontFamily: T.font, fontSize: 64, fontWeight: 900, color: '#0b1220' }}>{money(credit)}</div>
  </div>
);
const Hook = ({ f }: { f: number }) => {
  const m = outExpo((f - (Q.c87 - 10)) / 16), i1 = outBack(f / 10), i2 = outBack((f - Math.min(Q.c58 - 6, 10)) / 12);
  return (
    <div style={{ opacity: 1 - ease(f, B.c1.s - 6, B.c1.s + 8) }}>
      <Kinetic f={f} at={0} now text={REEL.hook.l1} x={80} y={440} size={70} nowrap />
      <Kinetic f={f} at={0} now text={REEL.hook.l2} x={80} y={524} size={70} nowrap color={T.gold} />
      <Receipt x={80 + 230 * m} y={680} w={400} amt={X.each} credit={X.sep_each} c={T.soft} o={clamp(i1) * (1 - m)} s={0.98} />
      <Receipt x={600 - 230 * m} y={680} w={400} amt={X.each} credit={X.sep_each} c={T.soft} o={clamp(i2) * (1 - m)} s={0.98} />
      {m > 0 && <Receipt x={240} y={680} w={600} amt={X.total} credit={X.comb} c={GREEN} o={m} s={0.9 + 0.1 * m} />}
      {m > 0.5 && <div style={{ position: 'absolute', left: 80, right: 80, top: 1110, textAlign: 'center', fontFamily: T.font, fontSize: 34, fontWeight: 900, color: T.white, textShadow, opacity: m }}>{money(X.sep_each)} + {money(X.sep_each)} = {money(X.sep_total)} → ONE RETURN: {money(X.comb)}</div>}
    </div>
  );
};

// ---------- main visual: the two-tier staircase ----------
const Tiers = ({ f }: { f: number }) => {
  const a = B.c1.s + 2, b = B.reveal.s;
  if (f < a - 1 || f > b + 14) return null;
  const y = L.tiers.y, x0 = 140, W = 800, base = y + 470, unit = 900; // px per 100% rate
  const hx = (d: number) => x0 + (W * d) / X.total, hLow = unit * X.low, hHigh = unit * X.high;
  const steps = ease(f, Q.low - 4, Q.low + 10), hi = ease(f, Q.high - 4, Q.high + 10);
  const sep = outExpo((f - Q.sep) / 16), sepT = ease(f, Q.sept - 3, Q.sept + 8), comb = f >= B.c4.s;
  const one = outExpo((f - Q.one) / 18), rest = outExpo((f - Q.rest) / 18), tot = ease(f, Q.comb - 3, Q.comb + 8);
  const col = (left: number, w: number, h: number, c: string, k: number, txt?: string) => (
    <div style={{ position: 'absolute', left, top: base - h * k, width: w, height: h * k, background: c, borderRadius: '10px 10px 0 0', boxShadow: '0 10px 30px rgba(0,0,0,.4)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 10, overflow: 'hidden',
      fontFamily: T.font, fontSize: 30, fontWeight: 900, color: '#0b1220' }}>{k > 0.6 ? txt : ''}</div>
  );
  return (
    <div style={{ opacity: outExpo((f - a) / 14) * (1 - ease(f, b - 2, b + 12)) }}>
      <div style={{ position: 'absolute', left: 56, top: y - 20, width: 968, height: 640, borderRadius: 28, ...glass }} />
      <div style={{ position: 'absolute', left: 90, top: y, ...label(T.mute) }}>FEDERAL DONATION CREDIT · {DATA.tax_year}</div>
      <div style={{ position: 'absolute', left: 90, top: y + 34, fontFamily: T.font, fontSize: 22, fontWeight: 800, color: T.soft }}>credit rate on each dollar given</div>
      {/* tier outlines */}
      <div style={{ position: 'absolute', left: hx(0), top: base - hLow, width: hx(X.tier) - hx(0), height: hLow, border: `2px dashed rgba(255,255,255,${0.35 * steps})`, borderBottom: 'none' }} />
      <div style={{ position: 'absolute', left: hx(X.tier), top: base - hHigh, width: hx(X.total) - hx(X.tier), height: hHigh, border: `2px dashed rgba(255,255,255,${0.35 * hi})`, borderBottom: 'none' }} />
      <div style={{ position: 'absolute', left: hx(0), top: base - hLow - 46, width: hx(X.tier) - hx(0), textAlign: 'center', fontFamily: T.font, fontSize: 34, fontWeight: 900, color: T.gold, opacity: steps }}>14.5%</div>
      <div style={{ position: 'absolute', left: hx(X.tier), top: base - hHigh - 46, width: hx(X.total) - hx(X.tier), textAlign: 'center', fontFamily: T.font, fontSize: 34, fontWeight: 900, color: GREEN, opacity: hi }}>29%</div>
      <div style={{ position: 'absolute', left: x0, top: base, width: W, height: 2, background: 'rgba(255,255,255,.5)' }} />
      {[0, X.tier, X.total].map((d) => <div key={d} style={{ position: 'absolute', left: hx(d) - 60, width: 120, top: base + 10, textAlign: 'center', fontFamily: T.font, fontSize: 22, fontWeight: 800, color: T.soft }}>{money(d)}</div>)}
      {/* separate: two thin columns, both inside the first tier */}
      {!comb && f >= B.c3.s && <>
        {col(hx(0) + 20, (hx(X.tier) - hx(0)) / 2 - 30, hLow, T.soft, sep, 'ALEX')}
        {col(hx(0) + (hx(X.tier) - hx(0)) / 2 + 10, (hx(X.tier) - hx(0)) / 2 - 30, hLow, T.soft, sep, 'SAM')}
        <div style={{ position: 'absolute', left: hx(X.tier) + 30, top: base - 170, width: 380, fontFamily: T.font, opacity: sepT }}>
          <div style={{ fontSize: 26, fontWeight: 900, color: T.white }}>{money(X.sep_each)} + {money(X.sep_each)}</div>
          <div style={{ fontSize: 64, fontWeight: 900, color: T.gold }}>= {money(X.sep_total)}</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: T.soft }}>the 29% tier stays empty</div>
        </div>
      </>}
      {/* combined: one column climbs into the second tier */}
      {comb && <>
        {col(hx(0) + 6, hx(X.tier) - hx(0) - 12, hLow, `linear-gradient(180deg, ${T.goldHi}, ${T.gold})`, one, money(X.sep_each))}
        {col(hx(X.tier) + 6, hx(X.total) - hx(X.tier) - 12, hHigh, GREEN, rest, money(X.comb - X.sep_each))}
        <div style={{ position: 'absolute', left: 90, top: y + 80, fontFamily: T.font, fontSize: 64, fontWeight: 900, color: GREEN, opacity: tot, textShadow }}>{money(X.comb)}</div>
        <div style={{ position: 'absolute', left: 90, top: y + 160, ...label(T.soft), fontSize: 16, opacity: tot }}>BOTH RECEIPTS · ONE RETURN</div>
      </>}
      {f >= Q.comb + 8 && <Stamp f={f} at={Q.comb + 8} text={`+${money(X.gain)} · +${X.gain_pct}%`} x={600} y={y + 70} size={30} color={T.red} rotate={-5} />}
    </div>
  );
};

// ---------- reveal: carry forward up to 5 years ----------
const Carry = ({ f }: { f: number }) => {
  const a = B.reveal.s, b = B.action.s;
  if (f < a || f > b + 12) return null;
  const y = L.carry.y, n = X.carry_years, cw = 150, gap = 24, x0 = 90 + (880 - (n * cw + (n - 1) * gap)) / 2;
  const chips = ease(f, a + 6, a + 30), merge = outExpo((f - Q.pass) / 18);
  return (
    <div style={{ opacity: ease(f, a, a + 10) * (1 - ease(f, b - 2, b + 12)) }}>
      <div style={{ position: 'absolute', left: 56, top: y - 20, width: 968, height: 520, borderRadius: 28, ...glass }} />
      <div style={{ position: 'absolute', left: 90, top: y + 4, ...label(T.gold) }}>UNUSED DONATIONS: CARRY FORWARD UP TO {n} YEARS</div>
      {Array.from({ length: n }, (_, i) => {
        const x = x0 + i * (cw + gap), k = clamp(chips * n - i);
        return (
          <div key={i} style={{ position: 'absolute', left: x, top: y + 90, width: cw, height: 120, borderRadius: 16, border: `2px solid ${i === 2 && merge > 0.5 ? GREEN : T.glassEdge}`, background: 'rgba(255,255,255,.05)', opacity: k, transform: `translateY(${(1 - k) * 30}px)` }}>
            <div style={{ position: 'absolute', left: 0, right: 0, top: 14, textAlign: 'center', ...label(T.soft), fontSize: 16 }}>YEAR {i + 1}</div>
            {i < 2 && <div style={{ position: 'absolute', left: 25, top: 50, width: 100, height: 54, borderRadius: 10, background: 'rgba(246,241,230,.95)', transform: `translateX(${(2 - i) * (cw + gap) * merge}px) translateY(${-i * 8 * merge}px)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: T.font, fontSize: 26, fontWeight: 900, color: '#1a1d24' }}>{money(X.carry_small)}</div>}
          </div>
        );
      })}
      <div style={{ position: 'absolute', left: 90, right: 90, top: y + 250, textAlign: 'center', fontFamily: T.font, fontSize: 34, fontWeight: 900, color: T.white, opacity: ease(f, Q.pass - 2, Q.pass + 10) }}>
        claim them together once you pass {money(X.tier)}
      </div>
      <div style={{ position: 'absolute', left: 90, right: 90, top: y + 310, textAlign: 'center', fontFamily: T.font, fontSize: 24, fontWeight: 800, color: T.soft, opacity: ease(f, Q.pass + 6, Q.pass + 16) }}>
        more of the gift reaches the 29% tier · carried-forward amounts are claimed first
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
        <div style={{ position: 'absolute', left: 36, top: 26, ...label(T.gold) }}>BEFORE YOU FILE</div>
        <div style={{ position: 'absolute', left: 36, top: 66, right: 36, fontFamily: T.font, fontSize: 32, fontWeight: 900, lineHeight: 1.15, color: T.white, opacity: ease(f, Q.pool - 4, Q.pool + 6) }}>
          Pool both spouses' receipts on one return (Schedule 9, line 34900)
        </div>
      </div>
      <div style={{ position: 'absolute', left: 0, top: 240, display: 'flex', alignItems: 'center', gap: 18, opacity: ease(f, Q.next - 4, Q.next + 8) }}>
        <Flag f={f} w={90} amp={0.06} />
        <div style={{ display: 'inline-flex', padding: '16px 28px', borderRadius: 999, background: `linear-gradient(160deg,${T.goldHi},${T.gold} 50%,${T.goldDeep})`, color: '#1d1503', fontFamily: T.font, fontSize: 28, fontWeight: 900,
          transform: `scale(${1 + 0.03 * Math.sin((f - a) / 6)})` }}>NEXT: MOVING COSTS →</div>
      </div>
      <div style={{ position: 'absolute', left: 0, top: 330, fontFamily: T.font, fontSize: 26, fontWeight: 700, color: T.white, textShadow, opacity: ease(f, Q.follow, Q.follow + 10) }}>Follow so you don't miss it</div>
      <div style={{ position: 'absolute', left: -10, top: 380, width: 900, padding: '14px 18px', borderRadius: 14, background: 'rgba(10,16,28,.84)', fontFamily: T.font, fontSize: 18, fontWeight: 600, color: T.mute, lineHeight: 1.45, opacity: ease(f, a + 6, a + 20) }}>
        Source: canada.ca (CRA) line 34900 donations; Finance Canada tax expenditures {DATA.tax_year}: 14.5% / 29% · federal only · example couple · general info, not advice
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
        <PhotoPlate f={f} src="plates/r3-s2-4k.jpg" iw={PW} ih={PH} keys={K2} glide={50} blur={0.8} snow={[{ u0: 0.0, v0: 0.0, u1: 1.0, v1: 0.5 }]} />
      ) : (
        <PhotoPlate f={f} src="plates/r3-s3-4k.jpg" iw={PW} ih={PH} keys={K3} glide={40} blur={0.8} steam={{ u: 0.3, v: 0.7, w: 0.03 }} />
      )} />
      <Depth f={f} seed={f < B.c2.s ? 50 : f < B.reveal.s ? 51 : 52} warm={0.6} />
      <NavyGrade low={f >= B.action.s ? 1.2 : 1} />
      <Header f={f} />
      <Typed f={f} caps={CAPS} head={T.font} />
      {f < B.c1.s + 20 && <Hook f={f} />}
      <Tiers f={f} />
      <Carry f={f} />
      <End f={f} />
      <Captions f={f} fps={R3FPS} beats={WORDS.beats as never} from={B.c1.s} until={B.action.s} y={1296} />
    </AbsoluteFill>
  );
};
