// D4 "Spousal RRSP: whose name, and the 3-year trap" — investigation format, motion engine v1 (2026-10-17).
// Variety vs C2 / C1 / H1 (CLAUDE.md "Variety"): hook = a $10,000 coin dropping toward one of two named jars
// (ALEX $120K / SAM $30K); main visual = a tax-rate staircase with the deduction taken on the top step and the withdrawal
// on a bottom step; trap = the withdrawal arrow flips back to the contributor (red); reveal = calendar-year tiles
// (2026–2028 locked, 2029 free); end = a one-rule card + next pill. Numbers come from d4/data.json.
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { PhotoPlate, SceneCuts, type Focus } from './Plate';
import { Flag } from './RaiseShort';
import { Typed, beatsFrom, type Cap } from './Kit';
import TL from './d4-timeline.json';
import WORDS from './d4-words.json';
import CUE from './d4-cues.json';
import DATA from '../../d4/data.json';
import REEL from '../../d4/reel.json';
import { T, goldFill, textShadow } from './motion/brand';
import { Captions, Depth, Kinetic, NavyGrade, Stamp, clamp, ease, money, outBack, outExpo } from './motion/Reel';

export const D4FPS = 24;
const B = beatsFrom(TL, D4FPS);
export const D4DUR = Math.ceil((TL.total + REEL.hold_after_vo) * D4FPS);
const Q = Object.fromEntries(Object.entries(CUE).map(([k, v]) => [k, Math.round((v as number) * D4FPS)])) as Record<string, number>;

const X = DATA.example;
const RED = T.redSoft, GREEN = T.green;
const PW = 2294, PH = 4096;

const CUTS = [B.c2.s, B.c3.s];
const L = Object.fromEntries(Object.entries(REEL.layout).map(([k, v]) => [k, { x: v.box[0], y: v.box[1], w: v.box[2], h: v.box[3] }])) as Record<string, { x: number; y: number; w: number; h: number }>;
const K1: Focus[] = [{ f: 0, u: 0.42, v: 0.26, k: 1.16 }, { f: B.c1.s, u: 0.3, v: 0.24, k: 1.24 }];
const K2: Focus[] = [{ f: 0, u: 0.55, v: 0.3, k: 1.2 }, { f: Q.low, u: 0.55, v: 0.34, k: 1.12 }];
const K3: Focus[] = [{ f: 0, u: 0.6, v: 0.28, k: 1.2 }, { f: B.reveal.s, u: 0.78, v: 0.24, k: 1.14 }, { f: B.cta.s, u: 0.55, v: 0.3, k: 1.05 }];

const CAPS: Cap[] = [
  { at: B.c1.s, l1: 'TODAY', l2: 'Alex contributes, Alex deducts', until: B.c2.s - 2 },
  { at: B.c2.s, l1: 'YEARS LATER', l2: 'Sam withdraws', until: B.c3.s - 2 },
  { at: B.c3.s, l1: 'THE TRAP', l2: 'the 3-year rule', until: B.reveal.s - 2 },
  { at: B.reveal.s, l1: 'THE TWIST', l2: 'calendar years, not dates', until: B.action.s - 2 },
];

// ---------- hook: two named jars and a $10,000 coin ----------
const Jar = ({ f, x, at, name, inc, lit }: { f: number; x: number; at: number; name: string; inc: string; lit: number }) => {
  const p = outBack((f - at) / 14);
  return (
    <div style={{ position: 'absolute', left: x, top: 760, width: 330, height: 300, opacity: clamp(p), transform: `scale(${clamp(p, 0.6, 1.04)})` }}>
      <div style={{ position: 'absolute', left: 30, right: 30, top: 40, bottom: 0, borderRadius: '30px 30px 46px 46px', background: `linear-gradient(180deg, rgba(255,255,255,.14), rgba(255,255,255,.04))`, border: `3px solid ${lit > 0 ? T.gold : 'rgba(255,255,255,.45)'}`, boxShadow: lit > 0 ? `0 0 ${40 * lit}px rgba(241,199,91,.5)` : undefined }} />
      <div style={{ position: 'absolute', left: 60, right: 60, top: 18, height: 30, borderRadius: 10, background: 'rgba(255,255,255,.35)' }} />
      <div style={{ position: 'absolute', left: 0, right: 0, top: 62, textAlign: 'center', fontFamily: T.font, fontSize: 40, fontWeight: 900, letterSpacing: 4, color: T.white, textShadow }}>{name}</div>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 112, textAlign: 'center', fontFamily: T.font, fontSize: 32, fontWeight: 900, ...goldFill }}>{inc}</div>
    </div>
  );
};
const Hook = ({ f }: { f: number }) => {
  const out = B.c1.s, o = ease(f, out - 6, out + 8);
  const drop = outExpo((f - Q.drop) / 18), sway = Math.sin(f / 7) * 18 * (1 - ease(f, Q.name, Q.name + 10));
  const coinX = 470 + sway + (f >= Q.name ? 265 * outExpo((f - Q.name) / 14) : 0);
  const coinY = 620 + drop * 120 + (f >= Q.name ? 220 * outExpo((f - Q.name) / 14) : 0);
  return (
    <div style={{ opacity: 1 - o }}>
      <Kinetic f={f} at={0} now text={REEL.hook.l1} x={80} y={470} size={70} nowrap />
      <Kinetic f={f} at={0} now text={REEL.hook.l2} x={80} y={552} size={70} nowrap color={T.gold} />
      <Jar f={f} x={110} at={Math.min(Q.alex - 4, 10)} name="ALEX" inc={money(X.alex)} lit={0} />
      <Jar f={f} x={640} at={Math.min(Q.sam - 4, 16)} name="SAM" inc={money(X.sam)} lit={ease(f, Q.name + 8, Q.name + 18)} />
      <div style={{ position: 'absolute', left: coinX, top: coinY, width: 140, height: 140, borderRadius: 70, background: `radial-gradient(circle at 35% 30%, ${T.goldHi}, ${T.gold} 55%, ${T.goldDeep})`, boxShadow: '0 16px 40px rgba(0,0,0,.5)', display: 'grid', placeItems: 'center',
        opacity: ease(f, 2, 10), fontFamily: T.font, fontSize: 28, fontWeight: 900, color: '#1d1503' }}>$10,000</div>
      {f >= Q.name && <div style={{ position: 'absolute', left: 80, width: 880, top: 1110, textAlign: 'center', fontFamily: T.font, fontSize: 30, fontWeight: 800, letterSpacing: 3, color: T.white, textShadow, opacity: ease(f, Q.name + 6, Q.name + 16) }}>A SPOUSAL RRSP: ALEX PAYS IN, SAM OWNS IT</div>}
    </div>
  );
};

// ---------- the tax-rate staircase ----------
const STEPS: [string, number][] = [['$16K–$47K', X.sam_rate], ['$47K–$58K', 0.2675], ['$58K–$100K', 0.3325], ['$100K–$117K', 0.379], ['$117K–$181K', X.alex_rate]];
const Stairs = ({ f }: { f: number }) => {
  const a = B.c1.s + 4, b = B.reveal.s;
  if (f < a - 1 || f > b + 16) return null;
  const o = ease(f, b - 2, b + 14), y = L.stairs.y;
  const W = 150, H0 = 70, top = y + 40;
  const flip = f >= B.c3.s;
  const stepY = (i: number) => top + 380 - i * 74;
  return (
    <div style={{ opacity: outExpo((f - a) / 14) * (1 - o) }}>
      <div style={{ position: 'absolute', left: 56, top: y - 20, width: 928, height: 640, borderRadius: 28, background: 'linear-gradient(160deg, rgba(10,16,28,.84), rgba(10,16,28,.6))', border: `1px solid ${T.glassEdge}` }} />
      <div style={{ position: 'absolute', left: 90, top: y, fontFamily: T.font, fontSize: 18, fontWeight: 900, letterSpacing: 4, color: T.mute }}>COMBINED TAX RATE · MANITOBA {DATA.tax_year}</div>
      {STEPS.map(([lab, r], i) => {
        const p = outExpo((f - a - i * 3) / 14);
        const on = (i === 4 && f >= Q.spousal) || (i === 0 && f >= Q.out && !flip);
        return (
          <div key={lab} style={{ position: 'absolute', left: 110 + i * W, top: stepY(i), width: W - 8, height: 470 - (stepY(i) - top), borderRadius: '12px 12px 0 0', opacity: p,
            background: on ? `linear-gradient(180deg, ${i === 4 ? T.gold : GREEN}, rgba(30,40,60,.4))` : 'rgba(255,255,255,.08)', border: `1.5px solid ${on ? (i === 4 ? T.gold : GREEN) : T.glassEdge}` }}>
            <div style={{ position: 'absolute', left: 0, right: 0, top: 10, textAlign: 'center', fontFamily: T.font, fontSize: 28, fontWeight: 900, color: on ? '#0b1220' : T.white }}>{(r * 100).toFixed(1)}%</div>
            <div style={{ position: 'absolute', left: 0, right: 0, top: 46, textAlign: 'center', fontFamily: T.font, fontSize: 14, fontWeight: 800, color: on ? '#0b1220' : T.soft }}>{lab}</div>
          </div>
        );
      })}
      {f >= Q.save && !flip && (
        <div style={{ position: 'absolute', left: 720, top: stepY(4) - 120, width: 250, opacity: ease(f, Q.save, Q.save + 8), transform: `translateY(${(1 - outExpo((f - Q.save) / 12)) * 20}px)` }}>
          <div style={{ fontFamily: T.font, fontSize: 16, fontWeight: 900, letterSpacing: 3, color: T.gold }}>ALEX DEDUCTS</div>
          <div style={{ fontFamily: T.font, fontSize: 46, fontWeight: 900, color: GREEN }}>−{money(X.saving)}</div>
        </div>
      )}
      {f >= Q.low && !flip && (
        <div style={{ position: 'absolute', left: 110, top: stepY(0) - 130, width: 300, opacity: ease(f, Q.low, Q.low + 8), transform: `translateY(${(1 - outExpo((f - Q.low) / 12)) * 20}px)` }}>
          <div style={{ fontFamily: T.font, fontSize: 16, fontWeight: 900, letterSpacing: 3, color: GREEN }}>SAM WITHDRAWS, LATER</div>
          <div style={{ fontFamily: T.font, fontSize: 46, fontWeight: 900, color: T.white }}>{money(X.sam_tax)} tax</div>
        </div>
      )}
      {f >= Q.less && !flip && <Stamp f={f} at={Q.less} text={`≈ ${money(X.saving - X.sam_tax)} less tax`} x={110} y={stepY(0) - 196} size={24} color={GREEN} rotate={-4} />}
      {flip && (
        <>
          <svg width={1080} height={700} style={{ position: 'absolute', left: 0, top: y, overflow: 'visible' }}>
            <path d={`M 180 ${stepY(0) - y - 10} C 300 ${stepY(0) - y - 260}, 700 ${stepY(4) - y - 260}, 840 ${stepY(4) - y - 20}`} stroke={RED} strokeWidth={7} fill="none" strokeDasharray="2000" strokeDashoffset={2000 * (1 - outExpo((f - Q.toalex) / 18))} />
          </svg>
          <div style={{ position: 'absolute', left: 110, top: y + 40, width: 560, lineHeight: 1.25, fontFamily: T.font, fontSize: 24, fontWeight: 800, color: T.white, opacity: ease(f, Q.two - 8, Q.two + 4) }}>
            Alex contributed this year or in the 2 years before?
          </div>
          {f >= Q.early && (
            <div style={{ position: 'absolute', left: 720, top: stepY(4) - 120, width: 250, opacity: ease(f, Q.early, Q.early + 8) }}>
              <div style={{ fontFamily: T.font, fontSize: 16, fontWeight: 900, letterSpacing: 3, color: RED }}>TAXED TO ALEX</div>
              <div style={{ fontFamily: T.font, fontSize: 46, fontWeight: 900, color: T.white }}>{money(X.early_tax)}</div>
            </div>
          )}
          <Stamp f={f} at={Q.toalex} text="Back to the contributor" x={130} y={y + 130} size={24} color={T.red} rotate={-5} />
        </>
      )}
    </div>
  );
};

// ---------- reveal: calendar-year tiles ----------
const Years = ({ f }: { f: number }) => {
  const a = B.reveal.s, b = B.action.s;
  if (f < a || f > b + 14) return null;
  const o = ease(f, b - 2, b + 12), y = L.years.y;
  const yrs = [X.dec_year, X.dec_year + 1, X.dec_year + 2, X.free_year];
  return (
    <div style={{ opacity: 1 - o }}>
      <div style={{ position: 'absolute', left: 56, top: y - 20, width: 928, height: 520, borderRadius: 28, background: 'linear-gradient(160deg, rgba(10,16,28,.86), rgba(10,16,28,.62))', border: `1px solid ${T.glassEdge}`, opacity: ease(f, a, a + 10) }} />
      <div style={{ position: 'absolute', left: 80, width: 880, top: y + 10, textAlign: 'center', fontFamily: T.font, fontSize: 28, fontWeight: 900, letterSpacing: 3, color: T.white, opacity: ease(f, Q.cal - 6, Q.cal + 6) }}>DEPOSIT: <span style={{ ...goldFill }}>DEC {X.dec_year}</span></div>
      {yrs.map((yr, i) => {
        const at = Q.dec + 6 + i * 6, p = outBack((f - at) / 12), free = i === 3;
        return (
          <div key={yr} style={{ position: 'absolute', left: 96 + i * 216, top: y + 90, width: 196, height: 220, borderRadius: 22, opacity: clamp(p), transform: `scale(${clamp(p, 0.6, 1.04)})`,
            background: free ? 'rgba(127,224,168,.16)' : 'rgba(224,57,43,.16)', border: `2px solid ${free ? GREEN : RED}` }}>
            <div style={{ position: 'absolute', left: 0, right: 0, top: 22, textAlign: 'center', fontFamily: T.font, fontSize: 46, fontWeight: 900, color: T.white }}>{yr}</div>
            <div style={{ position: 'absolute', left: 0, right: 0, top: 92, textAlign: 'center', fontFamily: T.font, fontSize: 54, fontWeight: 900, color: free ? GREEN : RED }}>{free ? '✓' : '✕'}</div>
            <div style={{ position: 'absolute', left: 10, right: 10, top: 166, textAlign: 'center', fontFamily: T.font, fontSize: 17, fontWeight: 800, color: T.soft }}>{free ? 'taxed to Sam' : 'taxed to Alex'}</div>
          </div>
        );
      })}
      <div style={{ position: 'absolute', left: 80, width: 880, top: y + 350, textAlign: 'center', fontFamily: T.font, fontSize: 30, fontWeight: 900, color: T.white, opacity: ease(f, Q.three - 4, Q.three + 8) }}>
        one December deposit → <span style={{ ...goldFill }}>{X.years} tax years</span> locked
      </div>
      <div style={{ position: 'absolute', left: 80, width: 880, top: y + 410, textAlign: 'center', fontFamily: T.font, fontSize: 19, fontWeight: 700, color: T.mute, opacity: ease(f, Q.three, Q.three + 10) }}>
        ITA 146(8.3): contributions in the year of withdrawal or the 2 years before · example
      </div>
    </div>
  );
};

// ---------- action + end ----------
const End = ({ f }: { f: number }) => {
  const a = B.action.s;
  if (f < a - 2) return null;
  const y = L.end.y;
  return (
    <div style={{ position: 'absolute', left: 80, top: y, width: 880 }}>
      <div style={{ position: 'absolute', left: 0, top: 0, width: 880, height: 270, borderRadius: 26, background: 'linear-gradient(160deg, rgba(10,16,28,.86), rgba(10,16,28,.64))', border: `1px solid ${T.glassEdge}`, opacity: ease(f, a, a + 12) }}>
        <div style={{ position: 'absolute', left: 36, top: 28, fontFamily: T.font, fontSize: 18, fontWeight: 900, letterSpacing: 4, color: T.gold }}>THE RULE OF THUMB</div>
        <div style={{ position: 'absolute', left: 36, top: 70, right: 36, fontFamily: T.font, fontSize: 34, fontWeight: 900, lineHeight: 1.15, color: T.white, opacity: ease(f, Q.time - 4, Q.time + 8) }}>Count 3 calendar years from the last spousal contribution</div>
        <div style={{ position: 'absolute', left: 36, top: 196, right: 36, fontFamily: T.font, fontSize: 20, fontWeight: 700, color: T.soft, opacity: ease(f, Q.acct - 6, Q.acct + 6) }}>before Sam withdraws · check with an accountant first</div>
      </div>
      <div style={{ position: 'absolute', left: 0, top: 310, display: 'flex', alignItems: 'center', gap: 18, opacity: ease(f, Q.next - 4, Q.next + 8) }}>
        <Flag f={f} w={90} amp={0.06} />
        <div style={{ display: 'inline-flex', padding: '16px 28px', borderRadius: 999, background: `linear-gradient(160deg,${T.goldHi},${T.gold} 50%,${T.goldDeep})`, color: '#1d1503', fontFamily: T.font, fontSize: 28, fontWeight: 900,
          transform: `scale(${1 + 0.03 * Math.sin((f - a) / 6)})` }}>NEXT: PENSION INCOME SPLITTING →</div>
      </div>
      <div style={{ position: 'absolute', left: 0, top: 400, fontFamily: T.font, fontSize: 26, fontWeight: 700, color: T.white, textShadow, opacity: ease(f, Q.follow, Q.follow + 10) }}>Follow so you don't miss it</div>
      <div style={{ position: 'absolute', left: 0, top: 450, width: 880, fontFamily: T.font, fontSize: 18, fontWeight: 600, color: T.mute, lineHeight: 1.45, opacity: ease(f, a + 20, a + 34) }}>
        Source: Income Tax Act ss. 146(5.1), 146(8.3); CRA {DATA.tax_year} federal and Manitoba rates · example couple, future withdrawal shown at {DATA.tax_year} rates · general info, not advice
      </div>
    </div>
  );
};

const Header = ({ f }: { f: number }) => (
  <div style={{ position: 'absolute', left: 80, top: 92, right: 80, display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: T.white, fontSize: 22, fontWeight: 800, letterSpacing: 4, fontFamily: T.font }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}><Flag f={f} w={72} />TAX SECRETS CANADA</div>
    <div style={{ color: T.gold, letterSpacing: 5 }}>SPOUSAL RRSP · {DATA.tax_year}</div>
  </div>
);

export const D4V3 = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: T.navy, fontFamily: T.font, overflow: 'hidden' }}>
      <SceneCuts f={f} cuts={CUTS} scene={(i) => i === 0 ? (
        <PhotoPlate f={f} src="plates/d4-s1-4k.jpg" iw={PW} ih={PH} keys={K1} glide={40} blur={0.8 + 4 * (1 - ease(f, 0, 20))} steam={{ u: 0.12, v: 0.66, w: 0.03 }} snow={[{ u0: 0.52, v0: 0.06, u1: 0.98, v1: 0.36 }]} />
      ) : i === 1 ? (
        <PhotoPlate f={f} src="plates/d4-s2-4k.jpg" iw={PW} ih={PH} keys={K2} glide={50} blur={0.8} snow={[{ u0: 0.0, v0: 0.0, u1: 1.0, v1: 0.5 }]} />
      ) : (
        <PhotoPlate f={f} src="plates/d4-s3-4k.jpg" iw={PW} ih={PH} keys={K3} glide={40} blur={0.8} steam={{ u: 0.93, v: 0.78, w: 0.03 }} />
      )} />
      <Depth f={f} seed={f < B.c2.s ? 80 : f < B.c3.s ? 81 : 82} warm={0.6} />
      <NavyGrade low={f >= B.action.s ? 1.2 : 1} />
      <Header f={f} />
      <Typed f={f} caps={CAPS} head={T.font} />
      {f < B.c1.s + 20 && <Hook f={f} />}
      <Stairs f={f} />
      <Years f={f} />
      <End f={f} />
      <Captions f={f} fps={D4FPS} beats={WORDS.beats as never} from={B.c1.s} until={B.action.s} y={1296} />
    </AbsoluteFill>
  );
};
