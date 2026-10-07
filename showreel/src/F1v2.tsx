// "Capital gains basics" (topic F1, investing group) in the approved look (Kit + Plate).
// Master timeline = Grady voiceover (f1/vo-beats.json → tools/vo_hf.py → f1-timeline.json). Facts: f1/PRODUCTION-BIBLE.md.
// Three photo scenes of the same man (series upgrade 2026-10-06), each shown once, joined by SceneCuts:
// 1) morning at a café window, phone in hand (he just sold); 2) the kitchen table with coins, envelope and coffee (the math);
// 3) evening at the same table under a lamp, sorting statements (losses, traps, filing). Fraunces (SERIF) headings. Bridge CTA to F5.
// The first beats keep the top clear so the man is seen; then cards at the top, amounts pinned on the table props.
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { PhotoPlate, SceneCuts, type Focus } from './Plate';
import { Flag } from './RaiseShort';
import TL from './f1-timeline.json';
import { C, SANS, SERIF, Card, Header, Hero, Line, Typed, beatsFrom, ease, pill, shade, type Cap } from './Kit';

export const F1FPS = 24;
const B = beatsFrom(TL, F1FPS);
export const F1DUR = Math.ceil((TL.total + 0.5) * F1FPS);
const HEAD = SERIF;
const TAU = Math.PI * 2;
const at = (id: string, fr: number) => Math.round(B[id].s + (B[id].e - B[id].s) * fr);

// scene changes where the meaning changes: the worked example (scene 2), the losses and traps (scene 3)
const CUTS = [B.example.s, B.losses.s];
// object positions per plate (image coordinates of each object's top)
const COINS = { u: 0.47, v: 0.69 }, ENV3 = { u: 0.74, v: 0.67 }, MUG3 = { u: 0.84, v: 0.47 };

const K1: Focus[] = [
  { f: 0, u: 0.5, v: 0.3, k: 1.15 },                   // morning café: the man
  { f: B.loop.s, u: 0.68, v: 0.38, k: 1.3 },           // push in on the phone
  { f: B.formula.s, u: 0.65, v: 0.6, k: 1.2 },         // coffee and croissant
];
const K2: Focus[] = [
  { f: 0, u: 0.45, v: 0.55, k: 1.25 },                 // the coins
  { f: B.half.s, u: 0.4, v: 0.58, k: 1.3 },            // coins and pen
  { f: B.rate.s, u: 0.55, v: 0.3, k: 1.2 },            // the man
];
const K3: Focus[] = [
  { f: 0, u: 0.72, v: 0.55, k: 1.25 },                 // evening: the envelope
  { f: B.trap.s, u: 0.8, v: 0.45, k: 1.3 },            // the tea
  { f: B.tfsa.s, u: 0.4, v: 0.35, k: 1.2 },            // the man with his statements
  { f: B.payoff.s, u: 0.5, v: 0.5, k: 1.0 },           // wide
];

const CAPS: Cap[] = [
  { at: B.hook.s, l1: 'Sold a stock for a profit?', l2: 'only half is taxed', until: B.loop.s - 2 },
  { at: B.loop.s, l1: 'The math', l2: 'capital gains, step by step', until: B.formula.s - 2 },
  { at: B.formula.s, l1: 'The formula', l2: 'price − cost − selling costs', until: B.example.s - 2 },
  { at: B.example.s, l1: 'Example', l2: 'shares, bought and sold', until: B.half.s - 2 },
  { at: B.half.s, l1: 'Half is taxable', l2: 'at your regular rate', until: B.rate.s - 2 },
  { at: B.rate.s, l1: 'Still one-half', l2: 'the 2/3 increase was cancelled', until: B.losses.s - 2 },
  { at: B.losses.s, l1: 'Capital losses', l2: 'offset gains only', until: B.trap.s - 2 },
  { at: B.trap.s, l1: 'The 30-day trap', l2: 'superficial loss', until: B.tfsa.s - 2 },
  { at: B.tfsa.s, l1: 'Inside a TFSA', l2: 'generally not taxed', until: B.payoff.s - 2 },
];

const Pin = ({ f, a, b, p, top, big, sub, col = C.gold }: { f: number; a: number; b: number; p: { u: number; v: number }; top: string; big: string; sub?: string; col?: string }) => {
  const o = ease(f, a, a + 12) * (1 - ease(f, b - 8, b));
  if (o <= 0) return null;
  return (
    <div style={{ position: 'absolute', left: `${p.u * 100}%`, top: `${p.v * 100}%`, transform: `translate(-50%, calc(-100% - ${18 + (1 - o) * 30}px))`, opacity: o, textAlign: 'center' }}>
      <div style={{ ...pill, flexDirection: 'column', gap: 2, padding: '14px 24px', borderRadius: 22, whiteSpace: 'nowrap' }}>
        <span style={{ fontSize: 20, color: C.soft, fontWeight: 700, letterSpacing: 3 }}>{top}</span>
        <span style={{ fontSize: 40, fontWeight: 900, color: col }}>{big}</span>
        {sub && <span style={{ fontSize: 18, fontWeight: 700, color: C.soft }}>{sub}</span>}
      </div>
      <div style={{ width: 2, height: 22, margin: '0 auto', background: 'rgba(247,241,230,.7)' }} />
    </div>
  );
};

// persistent strip: the rules tick on
const Strip = ({ f }: { f: number }) => {
  const show = ease(f, B.example.s, B.example.s + 12) * (1 - ease(f, B.payoff.s - 6, B.payoff.s + 6));
  if (show <= 0) return null;
  const items: [number, React.ReactNode][] = [
    [at('half', 0.3), <><span style={{ color: C.soft, fontWeight: 600 }}>inclusion</span><span style={{ color: C.gold }}>1/2</span></>],
    [at('losses', 0.6), <><span style={{ color: C.soft, fontWeight: 600 }}>losses</span>3 yrs back · forward</>],
    [at('trap', 0.5), <><span style={{ color: C.red }}>✗</span>rebuy within 30 days</>],
    [at('tfsa', 0.4), <><span style={{ color: C.green }}>✓</span>TFSA</>],
  ];
  return (
    <div style={{ position: 'absolute', left: 80, top: 690, display: 'flex', gap: 10, flexWrap: 'wrap', width: 920, opacity: show }}>
      {items.map(([a, node], i) => { const on = ease(f, a, a + 10); return on > 0 ? <div key={i} style={{ ...pill, fontSize: 20, padding: '10px 18px', opacity: on, transform: `scale(${0.9 + 0.1 * on})` }}>{node}</div> : null; })}
    </div>
  );
};

export const F1v2 = () => {
  const f = useCurrentFrame();
  const end = ease(f, B.payoff.s + 2, B.payoff.s + 20);
  const lift = 1 - ease(f, B.payoff.s - 6, B.payoff.s + 6);
  return (
    <AbsoluteFill style={{ background: '#0d0b09', fontFamily: SANS, overflow: 'hidden' }}>
      <SceneCuts f={f} cuts={CUTS} scene={(i) => i === 0 ? (
        <PhotoPlate f={f} src="plates/f1-s1-4k.jpg" iw={2294} ih={4096} keys={K1} glide={40} blur={0.8} steam={{ u: 0.84, v: 0.53, w: 0.06 }} />
      ) : i === 1 ? (
        <PhotoPlate f={f} src="plates/f1-4k.jpg" iw={2294} ih={4096} keys={K2} glide={40} blur={0.8} steam={{ u: 0.86, v: 0.475, w: 0.06 }}>
          <Pin f={f} a={at('example', 0.85)} b={B.half.s} p={COINS} top="$16,000 − $10,000 − $50" big="gain $5,950" />
          <Pin f={f} a={at('half', 0.35)} b={B.rate.s} p={COINS} top="HALF IS TAXABLE" big="$2,975" sub="added to your income" />
        </PhotoPlate>
      ) : (
        <PhotoPlate f={f} src="plates/f1-s3-4k.jpg" iw={2294} ih={4096} keys={K3} glide={40} blur={0.8} steam={{ u: 0.86, v: 0.47, w: 0.06 }}>
          <Pin f={f} a={at('losses', 0.6)} b={B.trap.s} p={ENV3} top="UNUSED NET CAPITAL LOSSES" big="back 3 years" sub="or forward, no time limit" col={C.cream} />
          <Pin f={f} a={at('trap', 0.6)} b={B.tfsa.s} p={MUG3} top="SUPERFICIAL LOSS" big="loss denied" sub="rebought within 30 days" col={C.red} />
        </PhotoPlate>
      )} />
      <AbsoluteFill style={{ background: 'linear-gradient(180deg, rgba(8,6,4,.82) 0%, rgba(8,6,4,.55) 14%, rgba(8,6,4,0) 28%, rgba(8,6,4,0) 50%, rgba(8,6,4,.55) 66%, rgba(8,6,4,.8) 100%)', opacity: 1 - 0.75 * lift }} />
      <AbsoluteFill style={{ background: 'linear-gradient(180deg, rgba(8,6,4,.82) 0%, rgba(8,6,4,.55) 14%, rgba(8,6,4,0) 28%, rgba(8,6,4,0) 100%)', opacity: 0.75 * lift }} />
      <Header f={f} chip="CRA · CAPITAL GAINS" />
      <Typed f={f} caps={CAPS} head={HEAD} />
      <Strip f={f} />

      <Card f={f} a={B.formula.s} b={B.example.s} label="THE FORMULA · CRA GUIDE T4037" top={360} h={300}>
        <Line f={f} a={at('formula', 0.05)} top={98} size={34}>Selling price</Line>
        <Line f={f} a={at('formula', 0.35)} top={148} size={34}><span style={{ color: C.red }}>−</span> your cost <span style={{ color: C.soft }}>(adjusted cost base)</span></Line>
        <Line f={f} a={at('formula', 0.75)} top={198} size={34}><span style={{ color: C.red }}>−</span> selling costs <span style={{ color: C.gold }}>= capital gain</span></Line>
      </Card>
      <Card f={f} a={B.example.s} b={B.half.s} label="EXAMPLE · SHARES" top={360} h={300}>
        <Line f={f} a={at('example', 0.1)} top={86} size={30}>sold <span style={{ color: C.gold }}>$16,000</span></Line>
        <Line f={f} a={at('example', 0.05)} top={124} size={30} color={C.soft}>bought $10,000 · fees $50</Line>
        <Hero f={f} a={at('example', 0.8)} top={172} size={90}>= $5,950</Hero>
      </Card>
      <Card f={f} a={B.half.s} b={B.rate.s} label="INCLUSION RATE · ONE-HALF" top={360} h={300}>
        <Hero f={f} a={at('half', 0.3)} size={110}>$2,975</Hero>
        <Line f={f} a={at('half', 0.6)} top={232} size={28} color={C.soft}>taxable capital gain, added to your income</Line>
      </Card>
      <Card f={f} a={B.rate.s} b={B.losses.s} label="2026 · STILL ONE-HALF" top={360} h={300} tone="green">
        <Line f={f} a={at('rate', 0.1)} top={104} serif head={HEAD} size={48}>The proposed jump to 2/3</Line>
        <Line f={f} a={at('rate', 0.4)} top={168} serif head={HEAD} size={48}><span style={{ color: C.gold }}>was cancelled.</span></Line>
      </Card>
      <Card f={f} a={B.losses.s} b={B.trap.s} label="CAPITAL LOSSES" top={360} h={300}>
        <Line f={f} a={at('losses', 0.05)} top={98} serif head={HEAD} size={44}>They offset capital gains only.</Line>
        <Line f={f} a={at('losses', 0.5)} top={166} size={30}>Unused: <span style={{ color: C.gold }}>back 3 years</span> or <span style={{ color: C.gold }}>forward indefinitely</span></Line>
        <Line f={f} a={at('losses', 0.7)} top={226} size={24} color={C.soft}>net capital losses · Form T1A to carry back</Line>
      </Card>
      <Card f={f} a={B.trap.s} b={B.tfsa.s} label="SUPERFICIAL LOSS" top={360} h={300} tone="red">
        <Line f={f} a={at('trap', 0.1)} top={98} size={30}>Sold at a loss, and you (or your spouse) bought</Line>
        <Line f={f} a={at('trap', 0.1)} top={138} size={30}>it back <span style={{ color: C.gold }}>within 30 days before or after?</span></Line>
        <Line f={f} a={at('trap', 0.6)} top={196} size={30}><span style={{ color: C.red }}>Loss denied</span> if still owned on day 30</Line>
        <Line f={f} a={at('trap', 0.75)} top={240} size={22} color={C.soft}>the denied loss is added to the cost of the shares bought back</Line>
      </Card>
      <Card f={f} a={B.tfsa.s} b={B.payoff.s} label="TFSA" top={360} h={300} tone="green">
        <Line f={f} a={at('tfsa', 0.1)} top={104} serif head={HEAD} size={48}>Gains inside a TFSA:</Line>
        <Line f={f} a={at('tfsa', 0.4)} top={168} serif head={HEAD} size={48}><span style={{ color: C.gold }}>generally not taxed.</span></Line>
      </Card>

      {f >= B.payoff.s && (
        <div style={{ position: 'absolute', left: 80, right: 80, top: 1010, opacity: end, transform: `translateY(${(1 - end) * 40}px)` }}>
          <Flag f={f} w={150} amp={0.06} />
          <div style={{ marginTop: 26, fontFamily: HEAD, fontSize: 58, fontWeight: 800, lineHeight: 1.1, color: C.cream, textShadow: shade }}>Half is taxed.<br />Track your cost base.</div>
          <div style={{ marginTop: 34, display: 'inline-flex', padding: '20px 32px', borderRadius: 999, background: 'linear-gradient(160deg,#fff1c2,#f1c75b 50%,#c88f1f)', color: '#2b1d03', fontSize: 34, fontWeight: 900, boxShadow: '0 16px 30px rgba(0,0,0,.4)', opacity: ease(f, B.cta.s - 4, B.cta.s + 8), transform: `scale(${1 + 0.03 * Math.sin(TAU * (f - B.cta.s) / 36)})` }}>Next: selling your home, when it's taxed →</div>
          <div style={{ marginTop: 12, fontSize: 26, fontWeight: 700, color: C.cream, textShadow: shade, opacity: ease(f, at('cta', 0.6), at('cta', 0.7)) }}>Follow so you don't miss it</div>
          <div style={{ marginTop: 28, fontSize: 19, fontWeight: 600, color: C.soft, lineHeight: 1.45, opacity: ease(f, B.payoff.s + 16, B.payoff.s + 30) }}>
            Source: canada.ca (CRA guide T4037 Capital Gains; capital losses; Department of Finance on the inclusion rate) · the share sale is an example · general info, not advice
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
