// "GIS: the benefit low-income seniors miss" (topic E4, pensions group) in the approved look (Kit + Plate).
// Master timeline = Grady voiceover (e4/vo-beats.json → tools/vo_hf.py → e4-timeline.json). Facts: e4/PRODUCTION-BIBLE.md.
// Plate: a senior waters plants at a snowy window; on the table, tea, reading glasses, an unmarked envelope, a coin purse.
// Signature: the envelope on the table "receives" the monthly amount (a label pinned onto the real envelope).
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { PhotoPlate, type Focus } from './Plate';
import { Flag } from './RaiseShort';
import TL from './e4-timeline.json';
import { C, SANS, SERIF, Card, Grades, Header, Hero, Line, Typed, beatsFrom, ease, pill, shade, type Cap } from './Kit';

export const E4FPS = 24;
const B = beatsFrom(TL, E4FPS);
export const E4DUR = Math.ceil((TL.total + 0.5) * E4FPS);
const TAU = Math.PI * 2;
const at = (id: string, fr: number) => Math.round(B[id].s + (B[id].e - B[id].s) * fr);

const KEYS: Focus[] = [
  { f: 0, u: 0.44, v: 0.32, k: 1.2 },               // the senior at the window
  { f: B.loop.s, u: 0.55, v: 0.68, k: 1.12 },      // the table
  { f: B.what.s, u: 0.4, v: 0.8, k: 1.2 },         // the envelope
  { f: B.who.s, u: 0.44, v: 0.34, k: 1.15 },       // the senior
  { f: B.exempt.s, u: 0.82, v: 0.72, k: 1.25 },    // the coin purse
  { f: B.file.s, u: 0.8, v: 0.82, k: 1.25 },      // the pen
  { f: B.delay.s, u: 0.44, v: 0.34, k: 1.18 },      // the senior
  { f: B.payoff.s, u: 0.5, v: 0.5, k: 1.0 },       // wide
];

const CAPS: Cap[] = [
  { at: B.hook.s, l1: '65+, on a low income?', l2: 'a monthly payment you may miss', until: B.loop.s - 2 },
  { at: B.loop.s, l1: 'Many miss it', l2: "the government's own estimate", until: B.what.s - 2 },
  { at: B.what.s, l1: 'The GIS', l2: 'Guaranteed Income Supplement', until: B.who.s - 2 },
  { at: B.who.s, l1: 'Who qualifies', l2: 'single senior, 2026', until: B.exempt.s - 2 },
  { at: B.exempt.s, l1: "What doesn't count", l2: 'TFSA · first $5,000 of work', until: B.file.s - 2 },
  { at: B.file.s, l1: 'The key', l2: 'file every year', until: B.delay.s - 2 },
  { at: B.delay.s, l1: 'One trap', l2: 'delaying OAS', until: B.payoff.s - 2 },
];

const Strip = ({ f }: { f: number }) => {
  const show = ease(f, B.what.s + 20, B.what.s + 32) * (1 - ease(f, B.payoff.s - 6, B.payoff.s + 6));
  if (show <= 0) return null;
  const items: [number, React.ReactNode][] = [
    [B.what.s + 20, <><span style={{ color: C.soft, fontWeight: 600 }}>up to</span><span style={{ color: C.gold }}>$1,138.90/mo</span></>],
    [at('who', 0.6), <><span style={{ color: C.soft, fontWeight: 600 }}>income under</span><span style={{ color: C.gold }}>$23,112</span></>],
    [B.file.s + 10, <><span style={{ color: C.green }}>✓</span>file taxes</>],
  ];
  return (
    <div style={{ position: 'absolute', left: 80, top: 1064, display: 'flex', gap: 12, flexWrap: 'wrap', width: 920, opacity: show }}>
      {items.map(([a, node], i) => { const on = ease(f, a, a + 10); return on > 0 ? <div key={i} style={{ ...pill, opacity: on, transform: `scale(${0.9 + 0.1 * on})` }}>{node}</div> : null; })}
    </div>
  );
};

export const E4v2 = () => {
  const f = useCurrentFrame();
  const end = ease(f, B.payoff.s + 2, B.payoff.s + 20);
  const pinOn = ease(f, at('what', 0.35), at('what', 0.45)) * (1 - ease(f, B.who.s - 6, B.who.s + 4));
  return (
    <AbsoluteFill style={{ background: '#0d0b09', fontFamily: SANS, overflow: 'hidden' }}>
      <PhotoPlate f={f} src="plates/e4-4k.jpg" iw={2294} ih={4096} keys={KEYS} glide={40} blur={0.8}
        snow={[{ u0: 0.66, v0: 0.02, u1: 0.99, v1: 0.3 }]} steam={{ u: 0.23, v: 0.62, w: 0.06 }}>
        {pinOn > 0 && (
          <div style={{ position: 'absolute', left: '35%', top: '79%', transform: `translate(-50%, calc(-100% - ${18 + (1 - pinOn) * 30}px))`, opacity: pinOn, textAlign: 'center' }}>
            <div style={{ ...pill, flexDirection: 'column', gap: 2, padding: '14px 24px', borderRadius: 22 }}>
              <span style={{ fontSize: 20, color: C.soft, fontWeight: 700, letterSpacing: 3 }}>EVERY MONTH, UP TO</span>
              <span style={{ fontSize: 42, fontWeight: 900, color: C.gold }}>$1,138.90</span>
              <span style={{ fontSize: 18, color: C.green, fontWeight: 800 }}>tax-free · on top of OAS</span>
            </div>
            <div style={{ width: 2, height: 22, margin: '0 auto', background: 'rgba(247,241,230,.7)' }} />
          </div>
        )}
      </PhotoPlate>
      <Grades />
      <Header f={f} chip="GIS · 2026" />
      <Typed f={f} caps={CAPS} />
      <Strip f={f} />

      <Card f={f} a={B.hook.s} b={B.loop.s} label="FOR SENIORS 65+">
        <Line f={f} a={at('hook', 0.3)} top={104} serif size={54}>Monthly. Tax-free.</Line>
        <Line f={f} a={at('hook', 0.65)} top={186} size={34} color={C.soft}>And easy to miss.</Line>
      </Card>
      <Card f={f} a={B.loop.s} b={B.what.s} label="ESDC ESTIMATE · 2015" tone="red">
        <Hero f={f} a={at('loop', 0.5)}>240,000</Hero>
        <Line f={f} a={at('loop', 0.62)} top={286} color={C.soft} size={28}>eligible seniors didn't receive it (about 1 in 10)</Line>
      </Card>
      {/* what: card in the sky so the envelope on the table carries the amount */}
      <Card f={f} a={B.what.s} b={B.who.s} label="GUARANTEED INCOME SUPPLEMENT" top={360} h={300}>
        <Line f={f} a={at('what', 0.1)} top={104} serif size={50}>The GIS</Line>
        <Line f={f} a={at('what', 0.5)} top={176} size={30} color={C.soft}>single senior · Oct–Dec 2026 maximum</Line>
      </Card>
      <Card f={f} a={B.who.s} b={B.exempt.s} label="WHO QUALIFIES · SINGLE · 2026">
        <Line f={f} a={at('who', 0.05)} top={98} size={30} color={C.green}>✓ receive OAS   ✓ live in Canada</Line>
        <Hero f={f} a={at('who', 0.55)} top={144} size={110}>&lt; $23,112</Hero>
        <Line f={f} a={at('who', 0.75)} top={298} color={C.soft} size={26}>annual income, not counting OAS</Line>
      </Card>
      <Card f={f} a={B.exempt.s} b={B.file.s} label="DOESN'T REDUCE YOUR GIS" tone="green">
        <Line f={f} a={at('exempt', 0.05)} top={104} serif size={44}>TFSA withdrawals</Line>
        <Hero f={f} a={at('exempt', 0.5)} top={150} size={110}>$5,000</Hero>
        <Line f={f} a={at('exempt', 0.6)} top={300} color={C.soft} size={26}>of work earnings exempt · then 50% of the next $10,000</Line>
      </Card>
      <Card f={f} a={B.file.s} b={B.delay.s} label="THE KEY">
        <Line f={f} a={at('file', 0.1)} top={104} serif size={54}>File every year.</Line>
        <Line f={f} a={at('file', 0.5)} top={186} size={30} color={C.soft}>Your tax return is how eligibility is reviewed.</Line>
      </Card>
      <Card f={f} a={B.delay.s} b={B.payoff.s} label="ONE TRAP" tone="red">
        <Line f={f} a={at('delay', 0.1)} top={104} serif size={50}>Don't delay OAS</Line>
        <Line f={f} a={at('delay', 0.5)} top={180} size={30} color={C.red}>No GIS while you're deferring your OAS pension.</Line>
      </Card>

      {f >= B.payoff.s && (
        <div style={{ position: 'absolute', left: 80, right: 80, top: 1010, opacity: end, transform: `translateY(${(1 - end) * 40}px)` }}>
          <Flag f={f} w={150} amp={0.06} />
          <div style={{ marginTop: 26, fontFamily: SERIF, fontSize: 62, fontWeight: 800, lineHeight: 1.06, color: C.cream, textShadow: shade }}>Know a senior on<br />a low income?</div>
          <div style={{ marginTop: 16, fontSize: 30, fontWeight: 600, color: C.soft, textShadow: shade }}>Make sure they've checked for the GIS.</div>
          <div style={{ marginTop: 34, display: 'inline-flex', padding: '20px 32px', borderRadius: 999, background: 'linear-gradient(160deg,#fff1c2,#f1c75b 50%,#c88f1f)', color: '#2b1d03', fontSize: 34, fontWeight: 900, boxShadow: '0 16px 30px rgba(0,0,0,.4)', opacity: ease(f, B.cta.s - 4, B.cta.s + 8), transform: `scale(${1 + 0.03 * Math.sin(TAU * (f - B.cta.s) / 36)})` }}>Follow for the real math</div>
          <div style={{ marginTop: 28, fontSize: 19, fontWeight: 600, color: C.soft, lineHeight: 1.45, opacity: ease(f, B.payoff.s + 16, B.payoff.s + 30) }}>
            Source: canada.ca (Service Canada, ESDC, CRA) · amounts Oct–Dec 2026, adjusted quarterly · couples have other thresholds · general info, not advice
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
