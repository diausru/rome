// OAS clawback 2026 — short (motion engine v1). Structure: hook (threshold stamp) → rule (15¢ per $1 above the line) →
// example (ledger: $110,000 − $95,323 = $14,677 × 15% = $2,201.55) → timing (repayment window) → three legal levers →
// next pill + sources. Numbers come from oas/data.json (canada.ca, see oas/FACTS.md); presentation code never edits them.
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { PhotoPlate, SceneCuts, type Focus } from './Plate';
import { Flag } from './RaiseShort';
import { Typed, beatsFrom, type Cap } from './Kit';
import TL from './oas-timeline.json';
import WORDS from './oas-words.json';
import DATA from '../../oas/data.json';
import { T, goldFill, textShadow } from './motion/brand';
import { Captions, Depth, Kinetic, NavyGrade, Stamp, clamp, ease, money, outExpo } from './motion/Reel';

export const OASFPS = 24;
const B = beatsFrom(TL, OASFPS);
export const OASDUR = Math.ceil((TL.total + 0.8) * OASFPS);

const TH = DATA.threshold_2026_income as number;
const EX = DATA.example as { net_income: number; over: number; recovery: number };
const usd = (v: number) => '$' + v.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
const usd2 = (v: number) => '$' + v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const PW = 2294, PH = 4096;
const CUTS = [B.rule.s, B.example.s, B.timing.s, B.levers.s];
const K1: Focus[] = [{ f: 0, u: 0.4, v: 0.3, k: 1.18 }, { f: B.rule.s, u: 0.4, v: 0.32, k: 1.2 }];
const K2: Focus[] = [{ f: 0, u: 0.5, v: 0.42, k: 1.15 }, { f: B.example.s, u: 0.5, v: 0.46, k: 1.2 }];
const K3: Focus[] = [{ f: 0, u: 0.5, v: 0.4, k: 1.1 }, { f: B.timing.s, u: 0.5, v: 0.38, k: 1.16 }];
const K4: Focus[] = [{ f: 0, u: 0.45, v: 0.36, k: 1.12 }, { f: B.levers.s, u: 0.45, v: 0.34, k: 1.16 }];
const RED = T.redSoft, GREEN = T.green;

const CAPS: Cap[] = [
  { at: B.rule.s, l1: 'THE LINE', l2: '$95,323 of net income', until: B.example.s - 2 },
  { at: B.example.s, l1: 'WORKED EXAMPLE', l2: 'an illustration, not a CRA rule', until: B.timing.s - 2 },
  { at: B.timing.s, l1: 'WHEN IT HAPPENS', l2: 'from your OAS payments', until: B.levers.s - 2 },
  { at: B.levers.s, l1: 'THREE LEVERS', l2: 'check your own situation', until: B.cta.s - 2 },
];

// ---------- hook: the threshold ----------
const Hook = ({ f }: { f: number }) => {
  const out = B.rule.s, o = ease(f, out - 6, out + 8);
  const n = Math.round(TH * clamp(outExpo((f - 20) / 40)));
  return (
    <div style={{ opacity: 1 - o }}>
      <Kinetic f={f} at={0} now text="RETIRED, OVER" x={80} y={470} size={64} nowrap />
      <Kinetic f={f} at={0} now text="THE LINE?" x={80} y={548} size={64} nowrap color={T.gold} />
      <div style={{ position: 'absolute', left: 80, top: 690, width: 880, fontFamily: T.font, fontSize: 96, fontWeight: 900, ...goldFill, fontVariantNumeric: 'tabular-nums', opacity: ease(f, 14, 26) }}>${n.toLocaleString('en-US')}</div>
      <div style={{ position: 'absolute', left: 80, top: 820, width: 880, fontFamily: T.font, fontSize: 34, fontWeight: 800, color: T.white, textShadow, opacity: ease(f, 30, 40) }}>Part of your Old Age Security can go back to the government.</div>
    </div>
  );
};

// ---------- rule: 15¢ per dollar above the line ----------
const Rule = ({ f }: { f: number }) => {
  const a = B.rule.s, b = B.example.s;
  if (f < a - 2 || f > b + 12) return null;
  const o = ease(f, b - 2, b + 10);
  const p = clamp(outExpo((f - a) / 24));
  return (
    <div style={{ position: 'absolute', left: 56, top: 760, width: 928, height: 460, opacity: (1 - o) * ease(f, a - 2, a + 10) }}>
      <div style={{ position: 'absolute', inset: 0, borderRadius: 28, background: 'linear-gradient(160deg, rgba(10,16,28,.86), rgba(10,16,28,.62))', border: `1px solid ${T.glassEdge}` }} />
      <div style={{ position: 'absolute', left: 40, top: 34, fontFamily: T.font, fontSize: 20, fontWeight: 900, letterSpacing: 4, color: T.gold }}>RECOVERY TAX · 2026 INCOME</div>
      <div style={{ position: 'absolute', left: 40, top: 80, fontFamily: T.font, fontSize: 96, fontWeight: 900, ...goldFill }}>15¢</div>
      <div style={{ position: 'absolute', left: 300, top: 118, fontFamily: T.font, fontSize: 34, fontWeight: 800, color: T.white }}>for every $1 above</div>
      <div style={{ position: 'absolute', left: 40, top: 200, width: 848, height: 14, borderRadius: 7, background: 'rgba(255,255,255,.12)' }} />
      <div style={{ position: 'absolute', left: 40, top: 200, width: 848 * 0.5 * p, height: 14, borderRadius: 7, background: `linear-gradient(90deg, ${T.gold}, ${RED})` }} />
      <div style={{ position: 'absolute', left: 40 + 848 * 0.5, top: 170, width: 4, height: 74, background: T.white }} />
      <div style={{ position: 'absolute', left: 40, top: 252, width: 300, fontFamily: T.font, fontSize: 26, fontWeight: 800, color: T.soft }}>0 → line: no clawback</div>
      <div style={{ position: 'absolute', left: 40 + 848 * 0.5 + 16, top: 286, width: 420, fontFamily: T.font, fontSize: 28, fontWeight: 900, color: T.white }}>the line: {usd(TH)}</div>
      <div style={{ position: 'absolute', left: 40, top: 330, width: 848, fontFamily: T.font, fontSize: 30, fontWeight: 800, color: T.white, lineHeight: 1.3, opacity: ease(f, a + 30, a + 42) }}>Only the part above the line is clawed back. Not all your OAS.</div>
    </div>
  );
};

// ---------- example: ledger ----------
const Example = ({ f }: { f: number }) => {
  const a = B.example.s, b = B.timing.s;
  if (f < a - 2 || f > b + 12) return null;
  const o = ease(f, b - 2, b + 10);
  const rows: [string, string, number, string][] = [
    ['Net income', usd(EX.net_income), a + 20, T.white],
    ['Minus the line', `−${usd(TH)}`, a + 60, T.soft],
    ['Over the line', usd(EX.over), a + 100, T.white],
    ['× 15%', '', a + 140, T.soft],
    ['OAS you repay', usd2(EX.recovery), a + 180, RED],
  ];
  return (
    <div style={{ position: 'absolute', left: 56, top: 760, width: 928, height: 460, opacity: (1 - o) * ease(f, a - 2, a + 10) }}>
      <div style={{ position: 'absolute', inset: 0, borderRadius: 28, background: 'linear-gradient(160deg, rgba(10,16,28,.86), rgba(10,16,28,.62))', border: `1px solid ${T.glassEdge}` }} />
      <div style={{ position: 'absolute', left: 40, top: 30, fontFamily: T.font, fontSize: 20, fontWeight: 900, letterSpacing: 4, color: T.gold }}>EXAMPLE · NOT A CRA RULE</div>
      {rows.map(([lab, val, at, c], i) => (
        <div key={lab} style={{ position: 'absolute', left: 40, right: 40, top: 80 + i * 62, height: 56, opacity: f >= at ? 1 : 0.25, transform: `translateY(${(1 - outExpo((f - at) / 12)) * (f >= at ? 10 : 0)}px)` }}>
          <div style={{ position: 'absolute', left: 0, top: 10, fontFamily: T.font, fontSize: 28, fontWeight: 800, color: T.soft }}>{lab}</div>
          <div style={{ position: 'absolute', right: 0, top: 4, fontFamily: T.font, fontSize: i === 4 ? 48 : 34, fontWeight: 900, color: c, fontVariantNumeric: 'tabular-nums' }}>{val}</div>
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 1, background: 'rgba(255,255,255,.08)' }} />
        </div>
      ))}
      <Stamp f={f} at={a + 190} text="$14,677 over the line" x={300} y={-50} size={24} color={T.gold} rotate={-3} />
    </div>
  );
};

// ---------- timing: repayment window ----------
const Timing = ({ f }: { f: number }) => {
  const a = B.timing.s, b = B.levers.s;
  if (f < a - 2 || f > b + 12) return null;
  const o = ease(f, b - 2, b + 10);
  const tiles: [string, string, number][] = [['2026 INCOME', 'the year that is measured', a + 20], ['JUL 2027', 'OAS repayment starts', a + 60], ['JUN 2028', 'repayment window ends', a + 100]];
  return (
    <div style={{ position: 'absolute', left: 56, top: 760, width: 928, height: 460, opacity: (1 - o) * ease(f, a - 2, a + 10) }}>
      <div style={{ position: 'absolute', inset: 0, borderRadius: 28, background: 'linear-gradient(160deg, rgba(10,16,28,.86), rgba(10,16,28,.62))', border: `1px solid ${T.glassEdge}` }} />
      <div style={{ position: 'absolute', left: 40, top: 30, fontFamily: T.font, fontSize: 20, fontWeight: 900, letterSpacing: 4, color: T.gold }}>WHEN IT COMES OUT</div>
      {tiles.map(([t, s, at], i) => (
        <div key={t} style={{ position: 'absolute', left: 40, right: 40, top: 90 + i * 110, height: 90, borderRadius: 18, background: 'rgba(255,255,255,.05)', border: `1.5px solid ${f >= at ? T.gold : T.glassEdge}`, opacity: ease(f, at - 6, at + 6), transform: `translateX(${(1 - outExpo((f - at) / 14)) * 60}px)` }}>
          <div style={{ position: 'absolute', left: 26, top: 16, fontFamily: T.font, fontSize: 40, fontWeight: 900, ...goldFill }}>{t}</div>
          <div style={{ position: 'absolute', left: 26, top: 58, fontFamily: T.font, fontSize: 24, fontWeight: 700, color: T.soft }}>{s}</div>
        </div>
      ))}
      <div style={{ position: 'absolute', left: 40, top: 420, fontFamily: T.font, fontSize: 22, fontWeight: 700, color: T.mute, opacity: ease(f, a + 120, a + 130) }}>Estimates Jan–Sep 2026; final in Oct–Dec 2026. Re-checked before posting.</div>
    </div>
  );
};

// ---------- levers: three legal ways ----------
const Levers = ({ f }: { f: number }) => {
  const a = B.levers.s, b = B.cta.s;
  if (f < a - 2 || f > b + 10) return null;
  const o = ease(f, b - 2, b + 8);
  const items: [string, string, string, number][] = [
    ['1', 'SPLIT PENSION INCOME', 'up to 50% of eligible pension income to your spouse, from 65 · Form T1032', a + 40],
    ['2', 'TFSA WITHDRAWALS', 'not income, so they do not count toward the line', a + 120],
    ['3', 'DELAY YOUR OAS', '+0.6% for each month past 65 · up to +36% at 70', a + 200],
  ];
  return (
    <div style={{ position: 'absolute', left: 56, top: 760, width: 928, opacity: 1 - o }}>
      {items.map(([n, t, s, at], i) => (
        <div key={n} style={{ position: 'absolute', left: 0, right: 0, top: i * 150, height: 130, borderRadius: 22, background: 'linear-gradient(160deg, rgba(10,16,28,.86), rgba(10,16,28,.62))', border: `1.5px solid ${f >= at ? T.gold : T.glassEdge}`, opacity: ease(f, at - 6, at + 8), transform: `translateY(${(1 - outExpo((f - at) / 14)) * 40}px)` }}>
          <div style={{ position: 'absolute', left: 26, top: 26, width: 66, height: 66, borderRadius: 33, background: `linear-gradient(160deg,${T.goldHi},${T.gold} 50%,${T.goldDeep})`, color: '#1d1503', fontFamily: T.font, fontSize: 36, fontWeight: 900, textAlign: 'center', lineHeight: '66px' }}>{n}</div>
          <div style={{ position: 'absolute', left: 116, top: 22, fontFamily: T.font, fontSize: 30, fontWeight: 900, color: T.white }}>{t}</div>
          <div style={{ position: 'absolute', left: 116, top: 66, width: 780, fontFamily: T.font, fontSize: 22, fontWeight: 700, color: T.soft, lineHeight: 1.3 }}>{s}</div>
        </div>
      ))}
    </div>
  );
};

// ---------- next pill + sources ----------
const End = ({ f }: { f: number }) => {
  const a = B.cta.s;
  if (f < a - 2) return null;
  return (
    <div style={{ position: 'absolute', left: 80, top: 1180, width: 880 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18, opacity: ease(f, a, a + 10) }}>
        <Flag f={f} w={90} amp={0.06} />
        <div style={{ display: 'inline-flex', padding: '16px 28px', borderRadius: 999, background: `linear-gradient(160deg,${T.goldHi},${T.gold} 50%,${T.goldDeep})`, color: '#1d1503', fontFamily: T.font, fontSize: 26, fontWeight: 900, transform: `scale(${1 + 0.03 * Math.sin((f - a) / 6)})` }}>NEXT: PENSION SPLITTING →</div>
      </div>
      <div style={{ position: 'absolute', left: 0, top: 96, fontFamily: T.font, fontSize: 24, fontWeight: 600, color: T.mute, lineHeight: 1.4, opacity: ease(f, a + 6, a + 16) }}>
        Source: canada.ca — OAS pension recovery tax (threshold $95,323, July 2027–June 2028, 2026 income) · Pension income splitting (T1032) · OAS when to start · example: $110,000 net income, illustrative · general information, not advice
      </div>
    </div>
  );
};

const Header = ({ f }: { f: number }) => (
  <div style={{ position: 'absolute', left: 80, top: 92, right: 80, display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: T.white, fontSize: 22, fontWeight: 800, letterSpacing: 4, fontFamily: T.font }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}><Flag f={f} w={72} />TAX SECRETS CANADA</div>
    <div style={{ color: T.gold, letterSpacing: 5 }}>OAS · 2026</div>
  </div>
);

export const OASV3 = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: T.navy, fontFamily: T.font, overflow: 'hidden' }}>
      <SceneCuts f={f} cuts={CUTS} scene={(i) => i === 0 ? (
        <PhotoPlate f={f} src="plates/oas-s1-4k.jpg" iw={PW} ih={PH} keys={K1} glide={40} blur={0.8 + 4 * (1 - ease(f, 0, 20))} />
      ) : i === 1 ? (
        <PhotoPlate f={f} src="plates/oas-s2-4k.jpg" iw={PW} ih={PH} keys={K2} glide={50} blur={0.8} />
      ) : i === 2 ? (
        <PhotoPlate f={f} src="plates/oas-s3-4k.jpg" iw={PW} ih={PH} keys={K3} glide={40} blur={0.8} />
      ) : (
        <PhotoPlate f={f} src="plates/oas-s2-4k.jpg" iw={PW} ih={PH} keys={K4} glide={40} blur={0.8} />
      )} />
      <Depth f={f} seed={f < B.rule.s ? 80 : f < B.example.s ? 81 : f < B.timing.s ? 82 : 83} warm={0.5} />
      <NavyGrade low={f >= B.levers.s ? 1.15 : 1} />
      <Header f={f} />
      <Typed f={f} caps={CAPS} head={T.font} />
      {f < B.rule.s + 20 && <Hook f={f} />}
      <Rule f={f} />
      <Example f={f} />
      <Timing f={f} />
      <Levers f={f} />
      <End f={f} />
      <Captions f={f} fps={OASFPS} beats={WORDS.beats as never} from={B.rule.s} until={B.cta.s} y={1296} />
    </AbsoluteFill>
  );
};
