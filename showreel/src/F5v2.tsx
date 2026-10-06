// "Selling your home: when the principal residence exemption doesn't cover you" (topic F5, investing/property group).
// Master timeline = Grady voiceover (f5/vo-beats.json → tools/vo_hf.py → f5-timeline.json). Facts: f5/PRODUCTION-BIBLE.md.
// Plate: moving day at a red-brick house on a prairie street in autumn; a family loads plain boxes into a car; on the porch
// rail, house keys, a pumpkin, a coffee and a plain envelope. Property group type: Fraunces (SERIF) headings.
// The first beats keep the top clear so the family is seen; then cards at the top, amounts pinned on the porch props.
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { PhotoPlate, type Focus } from './Plate';
import { Flag } from './RaiseShort';
import TL from './f5-timeline.json';
import { C, SANS, SERIF, Card, Header, Hero, Line, Typed, beatsFrom, ease, pill, shade, type Cap } from './Kit';

export const F5FPS = 24;
const B = beatsFrom(TL, F5FPS);
export const F5DUR = Math.ceil((TL.total + 0.5) * F5FPS);
const HEAD = SERIF;
const TAU = Math.PI * 2;
const at = (id: string, fr: number) => Math.round(B[id].s + (B[id].e - B[id].s) * fr);

// object positions in the plate (image coordinates of each object's top)
const ENV = { u: 0.68, v: 0.73 }, KEYSP = { u: 0.29, v: 0.72 }, MUG = { u: 0.34, v: 0.595 };

const KEYS: Focus[] = [
  { f: 0, u: 0.62, v: 0.35, k: 1.15 },                 // the family loading the car
  { f: B.loop.s, u: 0.65, v: 0.36, k: 1.3 },           // push in
  { f: B.example.s, u: 0.62, v: 0.6, k: 1.2 },         // the envelope
  { f: B.report.s, u: 0.65, v: 0.62, k: 1.3 },         // closer on the envelope
  { f: B.family.s, u: 0.3, v: 0.6, k: 1.25 },          // the house keys
  { f: B.flip.s, u: 0.65, v: 0.6, k: 1.25 },           // the envelope
  { f: B.life.s, u: 0.6, v: 0.38, k: 1.2 },            // the family
  { f: B.payoff.s, u: 0.5, v: 0.5, k: 1.0 },           // wide
];

const CAPS: Cap[] = [
  { at: B.hook.s, l1: 'Selling your home?', l2: 'usually tax-free. Usually.', until: B.loop.s - 2 },
  { at: B.loop.s, l1: 'Three ways', l2: 'it goes wrong', until: B.example.s - 2 },
  { at: B.example.s, l1: 'When it works', l2: 'the principal residence exemption', until: B.report.s - 2 },
  { at: B.report.s, l1: '1 · Report it', l2: 'even when it’s tax-free', until: B.family.s - 2 },
  { at: B.family.s, l1: '2 · One per family', l2: 'per year', until: B.flip.s - 2 },
  { at: B.flip.s, l1: '3 · The flipping rule', l2: 'owned less than 365 days', until: B.life.s - 2 },
  { at: B.life.s, l1: 'Exceptions', l2: 'certain life events', until: B.payoff.s - 2 },
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

// persistent strip: the three rules tick on
const Strip = ({ f }: { f: number }) => {
  const show = ease(f, B.report.s, B.report.s + 12) * (1 - ease(f, B.payoff.s - 6, B.payoff.s + 6));
  if (show <= 0) return null;
  const items: [number, React.ReactNode][] = [
    [at('report', 0.3), <><span style={{ color: C.green }}>✓</span>report + designate</>],
    [at('family', 0.3), <>1 home · per family · per year</>],
    [at('flip', 0.5), <><span style={{ color: C.red }}>✗</span>under 365 days → fully taxed</>],
  ];
  return (
    <div style={{ position: 'absolute', left: 80, top: 690, display: 'flex', gap: 10, flexWrap: 'wrap', width: 920, opacity: show }}>
      {items.map(([a, node], i) => { const on = ease(f, a, a + 10); return on > 0 ? <div key={i} style={{ ...pill, fontSize: 20, padding: '10px 18px', opacity: on, transform: `scale(${0.9 + 0.1 * on})` }}>{node}</div> : null; })}
    </div>
  );
};

export const F5v2 = () => {
  const f = useCurrentFrame();
  const end = ease(f, B.payoff.s + 2, B.payoff.s + 20);
  const lift = 1 - ease(f, B.payoff.s - 6, B.payoff.s + 6);
  return (
    <AbsoluteFill style={{ background: '#0d0b09', fontFamily: SANS, overflow: 'hidden' }}>
      <PhotoPlate f={f} src="plates/f5-4k.jpg" iw={2294} ih={4096} keys={KEYS} glide={40} blur={0.8} steam={{ u: MUG.u, v: MUG.v, w: 0.06 }}>
        <Pin f={f} a={at('example', 0.75)} b={B.report.s} p={ENV} top="$450,000 − $300,000" big="$150,000 gain" sub="exempt when designated" />
        <Pin f={f} a={at('report', 0.6)} b={B.family.s} p={ENV} top="DESIGNATED LATE?" big="up to $8,000" sub="$100 a month penalty" col={C.red} />
        <Pin f={f} a={at('family', 0.4)} b={B.flip.s} p={KEYSP} top="HOME + COTTAGE?" big="one per year" sub="per family unit" col={C.cream} />
        <Pin f={f} a={at('flip', 0.6)} b={B.life.s} p={ENV} top="OWNED UNDER 365 DAYS" big="fully taxed" sub="as business income" col={C.red} />
      </PhotoPlate>
      <AbsoluteFill style={{ background: 'linear-gradient(180deg, rgba(8,6,4,.82) 0%, rgba(8,6,4,.55) 14%, rgba(8,6,4,0) 28%, rgba(8,6,4,0) 50%, rgba(8,6,4,.55) 66%, rgba(8,6,4,.8) 100%)', opacity: 1 - 0.75 * lift }} />
      <AbsoluteFill style={{ background: 'linear-gradient(180deg, rgba(8,6,4,.82) 0%, rgba(8,6,4,.55) 14%, rgba(8,6,4,0) 28%, rgba(8,6,4,0) 100%)', opacity: 0.75 * lift }} />
      <Header f={f} chip="CRA · YOUR HOME" />
      <Typed f={f} caps={CAPS} head={HEAD} />
      <Strip f={f} />

      <Card f={f} a={B.example.s} b={B.report.s} label="EXAMPLE · LIVED THERE ALL 5 YEARS" top={360} h={300}>
        <Line f={f} a={at('example', 0.1)} top={92} size={30} color={C.soft}>bought $300,000 · sold $450,000</Line>
        <Hero f={f} a={at('example', 0.7)} top={128} size={96}>$150,000</Hero>
        <Line f={f} a={at('example', 0.8)} top={244} size={26} color={C.soft}>gain, fully exempt with the principal residence designation</Line>
      </Card>
      <Card f={f} a={B.report.s} b={B.family.s} label="1 · REPORT IT" top={360} h={300}>
        <Line f={f} a={at('report', 0.1)} top={98} serif head={HEAD} size={44}>Report the sale and designate it</Line>
        <Line f={f} a={at('report', 0.3)} top={156} serif head={HEAD} size={44}><span style={{ color: C.gold }}>Schedule 3 + Form T2091</span></Line>
        <Line f={f} a={at('report', 0.65)} top={226} size={26} color={C.soft}>late designation: $100 per month, up to $8,000</Line>
      </Card>
      <Card f={f} a={B.family.s} b={B.flip.s} label="2 · ONE PER FAMILY" top={360} h={300}>
        <Line f={f} a={at('family', 0.05)} top={98} serif head={HEAD} size={46}>One principal residence</Line>
        <Line f={f} a={at('family', 0.2)} top={158} serif head={HEAD} size={46}><span style={{ color: C.gold }}>per family unit, per year.</span></Line>
        <Line f={f} a={at('family', 0.55)} top={228} size={26} color={C.soft}>home and cottage? only one is covered for a given year</Line>
      </Card>
      <Card f={f} a={B.flip.s} b={B.life.s} label="3 · THE FLIPPING RULE · SALES SINCE 2023" top={360} h={300} tone="red">
        <Hero f={f} a={at('flip', 0.45)} size={110}>365 days</Hero>
        <Line f={f} a={at('flip', 0.65)} top={232} size={26} color={C.soft}>owned less: business income, fully taxed, no exemption</Line>
      </Card>
      <Card f={f} a={B.life.s} b={B.payoff.s} label="EXCEPTIONS · LIFE EVENTS" top={360} h={300} tone="green">
        <Line f={f} a={at('life', 0.2)} top={98} size={32}>✓ a death in the family</Line>
        <Line f={f} a={at('life', 0.5)} top={152} size={32}>✓ a new child joining the household</Line>
        <Line f={f} a={at('life', 0.7)} top={222} size={24} color={C.soft}>and other events CRA lists, like a home destroyed in a disaster</Line>
      </Card>

      {f >= B.payoff.s && (
        <div style={{ position: 'absolute', left: 80, right: 80, top: 1010, opacity: end, transform: `translateY(${(1 - end) * 40}px)` }}>
          <Flag f={f} w={150} amp={0.06} />
          <div style={{ marginTop: 26, fontFamily: HEAD, fontSize: 56, fontWeight: 800, lineHeight: 1.1, color: C.cream, textShadow: shade }}>Tax-free, if you report it<br />and it was really home.</div>
          <div style={{ marginTop: 34, display: 'inline-flex', padding: '20px 32px', borderRadius: 999, background: 'linear-gradient(160deg,#fff1c2,#f1c75b 50%,#c88f1f)', color: '#2b1d03', fontSize: 34, fontWeight: 900, boxShadow: '0 16px 30px rgba(0,0,0,.4)', opacity: ease(f, B.cta.s - 4, B.cta.s + 8), transform: `scale(${1 + 0.03 * Math.sin(TAU * (f - B.cta.s) / 36)})` }}>Follow for the real math</div>
          <div style={{ marginTop: 28, fontSize: 19, fontWeight: 600, color: C.soft, lineHeight: 1.45, opacity: ease(f, B.payoff.s + 16, B.payoff.s + 30) }}>
            Source: canada.ca (CRA: principal residence; reporting the sale; Folio S1-F3-C2; flipped property rules) · the $300,000 home is an example · general info, not advice
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
