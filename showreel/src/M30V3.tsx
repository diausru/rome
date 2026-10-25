// M30 "Medical expenses: whose return?" — investigation format, motion engine v1 (2026-10-25). Checklist: channel/REEL-CHECKLIST.md.
// Variety vs R2 / R1 / R5: hook = two name tags (ALEX / SAM) swinging on cords with $116 vs $377; main visual = the same
// $3,500 receipt bar on two returns, the 3% floor sliding in (grey, "doesn't count") and the counted part lighting gold;
// re-hook = SAM WINS stamp (≈65 %); reveal = Sam's tax-owed tank absorbing the $377 credit; end = check card + next pill.
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { PhotoPlate, SceneCuts, type Focus } from './Plate';
import { Flag } from './RaiseShort';
import { Typed, beatsFrom, type Cap } from './Kit';
import TL from './m30-timeline.json';
import WORDS from './m30-words.json';
import CUE from './m30-cues.json';
import DATA from '../../m30/data.json';
import REEL from '../../m30/reel.json';
import { T, goldFill, textShadow } from './motion/brand';
import { Captions, Depth, Kinetic, NavyGrade, Stamp, clamp, ease, money, outBack, outExpo } from './motion/Reel';

export const M30FPS = 24;
const B = beatsFrom(TL, M30FPS);
export const M30DUR = Math.ceil((TL.total + REEL.hold_after_vo) * M30FPS);
const Q = Object.fromEntries(Object.entries(CUE).map(([k, v]) => [k, Math.round((v as number) * M30FPS)])) as Record<string, number>;
const X = DATA.example;
const GREEN = T.green;
const PW = 2294, PH = 4096;
const CUTS = [B.c2.s, B.reveal.s];
const L = Object.fromEntries(Object.entries(REEL.layout).map(([k, v]) => [k, { x: v.box[0], y: v.box[1], w: v.box[2], h: v.box[3] }])) as Record<string, { x: number; y: number; w: number; h: number }>;
const K1: Focus[] = [{ f: 0, u: 0.5, v: 0.3, k: 1.14 }, { f: B.c1.s, u: 0.45, v: 0.28, k: 1.22 }];
const K2: Focus[] = [{ f: 0, u: 0.5, v: 0.32, k: 1.2 }, { f: B.c4.s, u: 0.55, v: 0.3, k: 1.12 }];
const K3: Focus[] = [{ f: 0, u: 0.5, v: 0.34, k: 1.2 }, { f: B.action.s, u: 0.5, v: 0.3, k: 1.08 }];
const CAPS: Cap[] = [
  { at: B.c1.s, l1: 'THE COUPLE', l2: `${money(X.expenses)} of receipts · ${DATA.tax_year}`, until: B.c2.s - 2 },
  { at: B.c2.s, l1: 'THE RULE', l2: `above 3% of net income, max ${money(X.cap)}`, until: B.c3.s - 2 },
  { at: B.c3.s, l1: "ON ALEX'S RETURN", l2: `net income ${money(X.alex)}`, until: B.c4.s - 2 },
  { at: B.c4.s, l1: "ON SAM'S RETURN", l2: `net income ${money(X.sam)}`, until: B.reveal.s - 2 },
  { at: B.reveal.s, l1: 'THE TWIST', l2: 'a credit needs tax to cut', until: B.action.s - 2 },
];
const glass = { background: 'linear-gradient(160deg, rgba(10,16,28,.86), rgba(10,16,28,.62))', border: `1px solid ${T.glassEdge}` };
const label = (c: string) => ({ fontFamily: T.font, fontSize: 18, fontWeight: 900, letterSpacing: 4, color: c });

const Tag = ({ f, x, at, name, val, c }: { f: number; x: number; at: number; name: string; val: number; c: string }) => {
  const p = outBack((f - at) / 16), sw = Math.sin((f - at) / 9) * 5 * Math.exp(-(f - at) / 40);
  return (
    <div style={{ position: 'absolute', left: x, top: 640, width: 400, height: 420, opacity: clamp(p), transformOrigin: '200px 0px', transform: `rotate(${sw}deg)` }}>
      <div style={{ position: 'absolute', left: 198, top: 0, width: 4, height: 90, background: 'rgba(255,255,255,.5)' }} />
      <div style={{ position: 'absolute', left: 0, top: 90, width: 400, height: 300, borderRadius: 26, ...glass, border: `2px solid ${c}` }}>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 34, textAlign: 'center', fontFamily: T.font, fontSize: 54, fontWeight: 900, letterSpacing: 6, color: T.white }}>{name}</div>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 120, textAlign: 'center', fontFamily: T.font, fontSize: 96, fontWeight: 900, color: c, textShadow }}>{money(val)}</div>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 236, textAlign: 'center', ...label(T.soft), fontSize: 16 }}>CLAIMS THE RECEIPTS</div>
      </div>
    </div>
  );
};
const Hook = ({ f }: { f: number }) => (
  <div style={{ opacity: 1 - ease(f, B.c1.s - 6, B.c1.s + 8) }}>
    <Kinetic f={f} at={0} now text={REEL.hook.l1} x={80} y={440} size={70} nowrap />
    <Kinetic f={f} at={0} now text={REEL.hook.l2} x={80} y={524} size={70} nowrap color={T.gold} />
    <Tag f={f} x={80} at={Math.min(Q.c116 - 6, 8)} name="ALEX" val={X.credit_a} c={T.soft} />
    <Tag f={f} x={600} at={Q.c377 - 6} name="SAM" val={X.credit_s} c={GREEN} />
  </div>
);

// ---------- the receipt bar on two returns ----------
const Bars = ({ f }: { f: number }) => {
  const a = B.c1.s + 2, b = B.reveal.s;
  if (f < a - 1 || f > b + 14) return null;
  const y = L.bars.y, W = 820, x0 = 130;
  const row = (top: number, name: string, inc: number, floor: number, elig: number, credit: number, atF: number, atE: number, on: boolean) => {
    const fl = outExpo((f - atF) / 18), show = ease(f, atE - 2, atE + 8);
    return (
      <div style={{ position: 'absolute', left: 0, top, width: 1080, opacity: on ? 1 : 0.35 }}>
        <div style={{ position: 'absolute', left: x0, top: 0, ...label(T.white), fontSize: 20 }}>{name} · NET {money(inc)}</div>
        <div style={{ position: 'absolute', left: x0, top: 36, width: W, height: 70, borderRadius: 12, background: `linear-gradient(90deg, ${T.goldDeep}, ${T.gold})` }} />
        <div style={{ position: 'absolute', left: x0, top: 36, width: (W * floor * fl) / X.expenses, height: 70, borderRadius: '12px 0 0 12px', background: 'rgba(120,130,150,.92)', display: 'flex', alignItems: 'center', paddingLeft: 14, overflow: 'hidden',
          fontFamily: T.font, fontSize: 20, fontWeight: 900, color: '#0b1220', whiteSpace: 'nowrap' }}>3% = {money(floor)} · doesn't count</div>
        <div style={{ position: 'absolute', left: x0, top: 118, width: W, display: 'flex', justifyContent: 'space-between', opacity: show }}>
          <span style={{ fontFamily: T.font, fontSize: 26, fontWeight: 900, color: T.gold }}>counts: {money(elig)}</span>
          <span style={{ fontFamily: T.font, fontSize: 26, fontWeight: 900, color: credit > 200 ? GREEN : T.white }}>credit {money(credit)}</span>
        </div>
      </div>
    );
  };
  return (
    <div style={{ opacity: outExpo((f - a) / 14) * (1 - ease(f, b - 2, b + 12)) }}>
      <div style={{ position: 'absolute', left: 56, top: y - 20, width: 968, height: 640, borderRadius: 28, ...glass }} />
      <div style={{ position: 'absolute', left: 90, top: y, ...label(T.mute) }}>SAME {money(X.expenses)} OF RECEIPTS · FEDERAL {DATA.tax_year}</div>
      <div style={{ position: 'absolute', left: 90, top: y + 34, fontFamily: T.font, fontSize: 20, fontWeight: 800, color: T.soft, opacity: ease(f, Q.cap - 2, Q.cap + 8) }}>
        floor = the lesser of 3% of net income or {money(X.cap)} · credit at {(X.rate * 100).toFixed(1)}%
      </div>
      {f >= Q.alex && row(y + 110, 'ALEX', X.alex, X.floor_a, X.elig_a, X.credit_a, Q.fa, Q.ea, true)}
      {f >= Q.sam && row(y + 330, 'SAM', X.sam, X.floor_s, X.elig_s, X.credit_s, Q.fs, Q.es, f >= B.c4.s || f < B.c3.s)}
      {f >= Q.es + 8 && <Stamp f={f} at={Q.es + 8} text={`SAM: +${money(X.gain)}`} x={560} y={y + 520} size={30} color={T.red} rotate={-5} />}
    </div>
  );
};

// ---------- reveal: Sam's tax tank ----------
const Tank = ({ f }: { f: number }) => {
  const a = B.reveal.s, b = B.action.s;
  if (f < a || f > b + 12) return null;
  const y = L.gauge.y, owed = 2011, H = 360, fill = outExpo((f - Q.owes) / 20), bite = outExpo((f - Q.owes - 16) / 18);
  return (
    <div style={{ opacity: ease(f, a, a + 10) * (1 - ease(f, b - 2, b + 12)) }}>
      <div style={{ position: 'absolute', left: 56, top: y - 20, width: 968, height: 520, borderRadius: 28, ...glass }} />
      <div style={{ position: 'absolute', left: 90, top: y + 4, ...label(T.gold) }}>NON-REFUNDABLE: IT ONLY CUTS TAX OWED</div>
      <div style={{ position: 'absolute', left: 130, top: y + 70, width: 200, height: H, borderRadius: 22, border: `2px solid ${T.glassEdge}`, overflow: 'hidden', background: 'rgba(255,255,255,.05)' }}>
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: H * 0.85 * fill, background: 'linear-gradient(180deg, rgba(160,176,200,.7), rgba(90,105,130,.7))' }} />
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: H * 0.85 * fill - H * 0.16 * bite, height: H * 0.16 * bite, background: GREEN }} />
      </div>
      <div style={{ position: 'absolute', left: 380, top: y + 90, width: 600 }}>
        <div style={{ ...label(T.soft), fontSize: 16 }}>SAM'S FEDERAL TAX BEFORE CREDITS (EXAMPLE)</div>
        <div style={{ fontFamily: T.font, fontSize: 60, fontWeight: 900, color: T.white, opacity: fill }}>≈ {money(owed)}</div>
        <div style={{ marginTop: 18, fontFamily: T.font, fontSize: 30, fontWeight: 900, color: GREEN, opacity: bite }}>− {money(X.credit_s)} fits ✓</div>
        <div style={{ marginTop: 22, fontFamily: T.font, fontSize: 24, fontWeight: 800, color: T.soft, lineHeight: 1.3, opacity: ease(f, Q.refund - 4, Q.refund + 6) }}>owes $0? the credit is wasted: it can't become a refund</div>
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
        <div style={{ position: 'absolute', left: 36, top: 26, ...label(T.gold) }}>CHECK BOTH</div>
        <div style={{ position: 'absolute', left: 36, top: 66, right: 36, fontFamily: T.font, fontSize: 32, fontWeight: 900, lineHeight: 1.15, color: T.white, opacity: ease(f, Q.run - 4, Q.run + 6) }}>
          Run the claim on both returns (line 33099) and keep the bigger result
        </div>
      </div>
      <div style={{ position: 'absolute', left: 0, top: 240, display: 'flex', alignItems: 'center', gap: 18, opacity: ease(f, Q.next - 4, Q.next + 8) }}>
        <Flag f={f} w={90} amp={0.06} />
        <div style={{ display: 'inline-flex', padding: '16px 28px', borderRadius: 999, background: `linear-gradient(160deg,${T.goldHi},${T.gold} 50%,${T.goldDeep})`, color: '#1d1503', fontFamily: T.font, fontSize: 28, fontWeight: 900,
          transform: `scale(${1 + 0.03 * Math.sin((f - a) / 6)})` }}>NEXT: DONATIONS →</div>
      </div>
      <div style={{ position: 'absolute', left: 0, top: 330, fontFamily: T.font, fontSize: 26, fontWeight: 700, color: T.white, textShadow, opacity: ease(f, Q.follow, Q.follow + 10) }}>Follow so you don't miss it</div>
      <div style={{ position: 'absolute', left: -10, top: 380, width: 900, padding: '14px 18px', borderRadius: 14, background: 'rgba(10,16,28,.84)', fontFamily: T.font, fontSize: 18, fontWeight: 600, color: T.mute, lineHeight: 1.45, opacity: ease(f, a + 6, a + 20) }}>
        Source: canada.ca (CRA) medical expenses, lines 33099/33199; {DATA.tax_year} threshold {money(X.cap)} · federal only, 14.5% · example couple · general info, not advice
      </div>
    </div>
  );
};

const Header = ({ f }: { f: number }) => (
  <div style={{ position: 'absolute', left: 80, top: 92, right: 80, display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: T.white, fontSize: 22, fontWeight: 800, letterSpacing: 4, fontFamily: T.font }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}><Flag f={f} w={72} />TAX SECRETS CANADA</div>
    <div style={{ color: T.gold, letterSpacing: 5 }}>MEDICAL · {DATA.tax_year}</div>
  </div>
);

export const M30V3 = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: T.navy, fontFamily: T.font, overflow: 'hidden' }}>
      <SceneCuts f={f} cuts={CUTS} scene={(i) => i === 0 ? (
        <PhotoPlate f={f} src="plates/m30-s1-4k.jpg" iw={PW} ih={PH} keys={K1} glide={40} blur={0.8 + 4 * (1 - ease(f, 0, 20))} snow={[{ u0: 0.5, v0: 0.0, u1: 1.0, v1: 0.3 }]} />
      ) : i === 1 ? (
        <PhotoPlate f={f} src="plates/m30-s2-4k.jpg" iw={PW} ih={PH} keys={K2} glide={50} blur={0.8} />
      ) : (
        <PhotoPlate f={f} src="plates/m30-s3-4k.jpg" iw={PW} ih={PH} keys={K3} glide={40} blur={0.8} steam={{ u: 0.3, v: 0.7, w: 0.03 }} />
      )} />
      <Depth f={f} seed={f < B.c2.s ? 50 : f < B.reveal.s ? 51 : 52} warm={0.6} />
      <NavyGrade low={f >= B.action.s ? 1.2 : 1} />
      <Header f={f} />
      <Typed f={f} caps={CAPS} head={T.font} />
      {f < B.c1.s + 20 && <Hook f={f} />}
      <Bars f={f} />
      <Tank f={f} />
      <End f={f} />
      <Captions f={f} fps={M30FPS} beats={WORDS.beats as never} from={B.c1.s} until={B.action.s} y={1296} />
    </AbsoluteFill>
  );
};
