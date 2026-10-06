// "CPP at 60, 65 or 70?" (topic E1, pensions group) in the approved look (Kit.tsx + Plate.tsx).
// Master timeline = Grady voiceover (e1/vo-beats.json → tools/vo_hf.py → e1-timeline.json). Facts: e1/PRODUCTION-BIBLE.md.
// Plate: hourglass + three coin stacks growing left → right (60 / 65 / 70) on a lakeside rail; a couple walks a dog behind.
// In the example beat the card moves to the sky and the amounts are pinned onto the real coin stacks.
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { PhotoPlate, type Focus } from './Plate';
import { Flag } from './RaiseShort';
import TL from './e1-timeline.json';
import { C, SANS, SERIF, Card, Grades, Header, Hero, Line, Typed, beatsFrom, clamp, ease, goldText, money, pill, shade, type Cap } from './Kit';

export const E1FPS = 24, E1DUR = 1428;
const TAU = Math.PI * 2;
const B = beatsFrom(TL, E1FPS);
const at = (id: string, fr: number) => Math.round(B[id].s + (B[id].e - B[id].s) * fr);

// camera: the couple → the props → the hourglass (early) → the tall stack (late) → all three stacks (example)
// → the hourglass (break-even) → the couple (odds, health) → wide
const KEYS: Focus[] = [
  { f: 0, u: 0.70, v: 0.42, k: 1.25 },
  { f: B.loop.s, u: 0.55, v: 0.62, k: 1.08 },
  { f: B.early.s, u: 0.30, v: 0.62, k: 1.22 },
  { f: B.late.s, u: 0.72, v: 0.64, k: 1.18 },
  { f: B.example.s, u: 0.55, v: 0.66, k: 1.12 },
  { f: B.breakeven.s, u: 0.28, v: 0.60, k: 1.2 },
  { f: B.odds.s, u: 0.70, v: 0.44, k: 1.28 },
  { f: B.health.s, u: 0.74, v: 0.48, k: 1.14 },
  { f: B.payoff.s, u: 0.5, v: 0.5, k: 1.0 },
];

const CAPS: Cap[] = [
  { at: B.hook.s, l1: 'CPP: 60, 65 or 70?', l2: 'the gap is bigger than you think', until: B.loop.s - 2 },
  { at: B.loop.s, l1: 'Same pension.', l2: 'three different cheques', until: B.early.s - 2 },
  { at: B.early.s, l1: 'Start early', l2: 'a permanent cut', until: B.late.s - 2 },
  { at: B.late.s, l1: 'Start late', l2: 'a permanent raise', until: B.example.s - 2 },
  { at: B.breakeven.s, l1: 'When waiting pays', l2: '65 vs 70, simplified', until: B.odds.s - 2 },
  { at: B.odds.s, l1: 'Plan for a long life', l2: 'about half reach 90', until: B.health.s - 2 },
  { at: B.health.s, l1: 'Your health matters', l2: 'it can change the answer', until: B.payoff.s - 2 },
];

// amounts pinned to the three real coin stacks (image coordinates of each stack's top)
const STACKS = [
  { age: 60, amt: 640, u: 0.50, v: 0.75, col: C.red, at: () => at('example', 0.5) },
  { age: 65, amt: 1000, u: 0.645, v: 0.722, col: C.cream, at: () => at('example', 0.08) },
  { age: 70, amt: 1420, u: 0.786, v: 0.68, col: C.green, at: () => at('example', 0.78) },
];

const Strip = ({ f }: { f: number }) => {
  const show = ease(f, B.early.s + 20, B.early.s + 32) * (1 - ease(f, B.payoff.s - 6, B.payoff.s + 6)) * (1 - ease(f, B.example.s - 6, B.example.s + 4) + ease(f, B.breakeven.s, B.breakeven.s + 10));
  if (show <= 0) return null;
  const items: [number, React.ReactNode][] = [
    [B.early.s + 20, <><span style={{ color: C.soft, fontWeight: 600 }}>60</span><span style={{ color: C.red }}>−36%</span></>],
    [B.late.s + 20, <><span style={{ color: C.soft, fontWeight: 600 }}>70</span><span style={{ color: C.green }}>+42%</span></>],
    [B.breakeven.s + 30, <><span style={{ color: C.soft, fontWeight: 600 }}>break-even</span><span style={{ color: C.gold }}>≈ 82</span></>],
  ];
  return (
    <div style={{ position: 'absolute', left: 80, top: 1064, display: 'flex', gap: 12, opacity: show }}>
      {items.map(([a, node], i) => { const on = ease(f, a, a + 10); return on > 0 ? <div key={i} style={{ ...pill, opacity: on, transform: `scale(${0.9 + 0.1 * on})` }}>{node}</div> : null; })}
    </div>
  );
};

export const E1v2 = () => {
  const f = useCurrentFrame();
  const end = ease(f, B.payoff.s + 2, B.payoff.s + 20);
  const exOn = ease(f, B.example.s, B.example.s + 10) * (1 - ease(f, B.breakeven.s - 8, B.breakeven.s));
  return (
    <AbsoluteFill style={{ background: '#0d0b09', fontFamily: SANS, overflow: 'hidden' }}>
      <PhotoPlate f={f} src="plates/e1-4k.jpg" iw={2294} ih={4096} keys={KEYS} glide={40} blur={0.8}>
        {/* example: amounts pinned to the coin stacks */}
        {exOn > 0 && STACKS.map((s) => {
          const e = ease(f, s.at(), s.at() + 12);
          return (
            <div key={s.age} style={{ position: 'absolute', left: `${s.u * 100}%`, top: `${s.v * 100}%`, transform: `translate(-50%, calc(-100% - ${18 + (1 - e) * 30}px))`, opacity: e * exOn, textAlign: 'center' }}>
              <div style={{ ...pill, flexDirection: 'column', gap: 2, padding: '14px 22px', borderRadius: 22 }}>
                <span style={{ fontSize: 20, color: C.soft, fontWeight: 700, letterSpacing: 3 }}>AT {s.age}</span>
                <span style={{ fontSize: 40, fontWeight: 900, color: s.col }}>{money(s.amt)}</span>
              </div>
              <div style={{ width: 2, height: 22, margin: '0 auto', background: 'rgba(247,241,230,.7)' }} />
            </div>
          );
        })}
      </PhotoPlate>
      <Grades />
      <Header f={f} chip="CPP · 2026" />
      <Typed f={f} caps={CAPS} />
      <Strip f={f} />

      <Card f={f} a={B.hook.s} b={B.early.s} label="CPP · WHEN TO START">
        <Hero f={f} a={B.hook.s + 6} size={140}>60 · 65 · 70</Hero>
        <Line f={f} a={B.loop.s} top={286} color={C.soft}>Same pension. Three very different cheques.</Line>
      </Card>
      <Card f={f} a={B.early.s} b={B.late.s} label="START AT 60" tone="red">
        <Hero f={f} a={at('early', 0.1)} out={at('early', 0.5)}>−0.6%<span style={{ fontSize: 56 }}> /month</span></Hero>
        <Hero f={f} a={at('early', 0.55)}>−36%</Hero>
        <Line f={f} a={at('early', 0.15)} top={286} color={C.soft} size={32}>each month before 65 · −36% at 60, for life</Line>
      </Card>
      <Card f={f} a={B.late.s} b={B.example.s} label="WAIT TO 70" tone="green">
        <Hero f={f} a={at('late', 0.1)} out={at('late', 0.55)}>+0.7%<span style={{ fontSize: 56 }}> /month</span></Hero>
        <Hero f={f} a={at('late', 0.6)}>+42%</Hero>
        <Line f={f} a={at('late', 0.15)} top={286} color={C.soft} size={32}>each month after 65 · up to +42% at 70</Line>
      </Card>
      {/* example: the card moves up to the sky so the coin stacks carry the numbers */}
      <Card f={f} a={B.example.s} b={B.breakeven.s} label="EXAMPLE · $1,000 A MONTH AT 65" top={360} h={300}>
        <Line f={f} a={at('example', 0.06)} top={104} serif size={52}>From 60 to 70:</Line>
        <Line f={f} a={at('example', 0.84)} top={176} size={44}><span style={goldText}>more than double</span></Line>
      </Card>
      <Card f={f} a={B.breakeven.s} b={B.odds.s} label="BREAK-EVEN · 65 VS 70">
        <Hero f={f} a={at('breakeven', 0.55)}>≈ age 82</Hero>
        <Line f={f} a={at('breakeven', 0.2)} top={286} color={C.soft} size={26}>Simplified: $1,000 vs $1,420 a month, ignoring inflation, tax and returns.</Line>
      </Card>
      <Card f={f} a={B.odds.s} b={B.health.s} label="RETIREMENT HUB · CANADA.CA">
        <Hero f={f} a={at('odds', 0.3)}>≈ 50%</Hero>
        <Line f={f} a={at('odds', 0.5)} top={286} color={C.soft} size={32}>chance today's new retirees live to 90</Line>
      </Card>
      <Card f={f} a={B.health.s} b={B.payoff.s} label="IT DEPENDS">
        <Line f={f} a={at('health', 0.05)} top={104} serif size={42}>Health concerns?</Line>
        <Line f={f} a={at('health', 0.2)} top={160} size={30} color={C.red}>Starting earlier may make sense</Line>
        <Line f={f} a={at('health', 0.55)} top={230} serif size={42}>Good health?</Line>
        <Line f={f} a={at('health', 0.68)} top={286} size={30} color={C.green}>Waiting may pay more</Line>
      </Card>

      {f >= B.payoff.s && (
        <div style={{ position: 'absolute', left: 80, right: 80, top: 1010, opacity: end, transform: `translateY(${(1 - end) * 40}px)` }}>
          <Flag f={f} w={150} amp={0.06} />
          <div style={{ marginTop: 26, fontFamily: SERIF, fontSize: 66, fontWeight: 800, lineHeight: 1.06, color: C.cream, textShadow: shade }}>A lifetime decision.</div>
          <div style={{ marginTop: 16, fontSize: 30, fontWeight: 600, color: C.soft, textShadow: shade }}>Run your own numbers, and get advice.</div>
          <div style={{ marginTop: 34, display: 'inline-flex', padding: '20px 32px', borderRadius: 999, background: 'linear-gradient(160deg,#fff1c2,#f1c75b 50%,#c88f1f)', color: '#2b1d03', fontSize: 34, fontWeight: 900, boxShadow: '0 16px 30px rgba(0,0,0,.4)', opacity: ease(f, B.cta.s - 4, B.cta.s + 8), transform: `scale(${1 + 0.03 * Math.sin(TAU * (f - B.cta.s) / 36)})` }}>Follow for the real math</div>
          <div style={{ marginTop: 28, fontSize: 19, fontWeight: 600, color: C.soft, lineHeight: 1.45, opacity: clamp(ease(f, B.payoff.s + 16, B.payoff.s + 30)) }}>
            Source: canada.ca (Service Canada, Retirement Hub) · $1,000 is an example · break-even simplified · general info, not advice
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
