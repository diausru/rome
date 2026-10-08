// "New to Canada: your first tax return" (topic G1, newcomers) in the approved look (Kit + Plate).
// Master timeline = Grady voiceover (g1/vo-beats.json → tools/vo_hf.py → g1-timeline.json). Facts: g1/PRODUCTION-BIBLE.md.
// Three photo scenes of the same couple (series upgrade), each shown once, joined by SceneCuts:
// 1) September, arriving in their first empty apartment (residency); 2) late October evening at their table with papers
// (world income, two-year statement, prorated credits); 3) an April morning in the now cosy home (benefits, filing). Mont (SANS).
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { PhotoPlate, SceneCuts, type Focus } from './Plate';
import { Flag } from './RaiseShort';
import TL from './g1-timeline.json';
import { C, SANS, Card, Header, Hero, Line, Typed, beatsFrom, ease, pill, shade, type Cap } from './Kit';

export const G1FPS = 24;
const B = beatsFrom(TL, G1FPS);
export const G1DUR = Math.ceil((TL.total + 0.5) * G1FPS);
const HEAD = SANS;
const TAU = Math.PI * 2;
const at = (id: string, fr: number) => Math.round(B[id].s + (B[id].e - B[id].s) * fr);

// scene changes where the meaning changes: income and credits (scene 2), benefits and filing (scene 3)
const CUTS = [B.world.s, B.benefits.s];
// object positions per plate (image coordinates of each object's top)
const KEYS1 = { u: 0.43, v: 0.82 }, ENV2 = { u: 0.6, v: 0.74 }, ENV3 = { u: 0.64, v: 0.73 };

const K1: Focus[] = [
  { f: 0, u: 0.32, v: 0.3, k: 1.15 },                  // arriving with suitcases
  { f: B.hook.s + 40, u: 0.32, v: 0.32, k: 1.3 },      // push in on the couple
  { f: B.residency.s + 60, u: 0.5, v: 0.62, k: 1.2 },  // keys and envelope
];
const K2: Focus[] = [
  { f: 0, u: 0.4, v: 0.3, k: 1.2 },                    // evening: going through papers
  { f: B.soi.s, u: 0.6, v: 0.6, k: 1.25 },             // envelope and folder
  { f: B.prorate.s, u: 0.4, v: 0.3, k: 1.25 },         // the couple
];
const K3: Focus[] = [
  { f: 0, u: 0.5, v: 0.28, k: 1.2 },                   // April: relaxed by the window
  { f: B.deadline.s, u: 0.6, v: 0.62, k: 1.2 },        // envelope and keys
  { f: B.cta.s, u: 0.5, v: 0.5, k: 1.0 },              // wide
];

const CAPS: Cap[] = [
  { at: B.hook.s, l1: 'New to Canada?', l2: 'your first tax return', until: B.residency.s - 2 },
  { at: B.residency.s, l1: 'When you become resident', l2: 'significant residential ties', until: B.world.s - 2 },
  { at: B.world.s, l1: 'World income', l2: 'from the day you’re resident', until: B.soi.s - 2 },
  { at: B.soi.s, l1: 'Income before you came', l2: 'for your benefits', until: B.prorate.s - 2 },
  { at: B.prorate.s, l1: 'Credits are prorated', l2: 'by days resident', until: B.benefits.s - 2 },
  { at: B.benefits.s, l1: 'Apply for benefits', l2: 'before your first return', until: B.deadline.s - 2 },
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

// persistent strip: the first-year checklist ticks on
const Strip = ({ f }: { f: number }) => {
  const show = ease(f, B.residency.s, B.residency.s + 12) * (1 - ease(f, B.deadline.s - 6, B.deadline.s + 6));
  if (show <= 0) return null;
  const items: [number, React.ReactNode][] = [
    [at('residency', 0.6), <><span style={{ color: C.gold }}>1</span>residency date</>],
    [at('world', 0.5), <><span style={{ color: C.gold }}>2</span>world income after</>],
    [at('soi', 0.5), <><span style={{ color: C.gold }}>3</span>2 years abroad listed</>],
    [at('prorate', 0.5), <><span style={{ color: C.gold }}>4</span>credits × days</>],
    [at('benefits', 0.5), <><span style={{ color: C.green }}>✓</span>RC151 · RC66</>],
  ];
  return (
    <div style={{ position: 'absolute', left: 80, top: 690, display: 'flex', gap: 10, flexWrap: 'wrap', width: 920, opacity: show }}>
      {items.map(([a, node], i) => { const on = ease(f, a, a + 10); return on > 0 ? <div key={i} style={{ ...pill, fontSize: 20, padding: '10px 18px', opacity: on, transform: `scale(${0.9 + 0.1 * on})` }}>{node}</div> : null; })}
    </div>
  );
};

export const G1v2 = () => {
  const f = useCurrentFrame();
  const end = ease(f, B.deadline.s + 2, B.deadline.s + 20);
  const lift = 1 - ease(f, B.deadline.s - 6, B.deadline.s + 6);
  return (
    <AbsoluteFill style={{ background: '#0d0b09', fontFamily: SANS, overflow: 'hidden' }}>
      <SceneCuts f={f} cuts={CUTS} scene={(i) => i === 0 ? (
        <PhotoPlate f={f} src="plates/g1-s1-4k.jpg" iw={2294} ih={4096} keys={K1} glide={40} blur={0.8}>
          <Pin f={f} a={at('residency', 0.55)} b={B.world.s} p={KEYS1} top="RESIDENT FROM" big="the day you arrive" sub="usually" col={C.cream} />
        </PhotoPlate>
      ) : i === 1 ? (
        <PhotoPlate f={f} src="plates/g1-s2-4k.jpg" iw={2294} ih={4096} keys={K2} glide={40} blur={0.8} snow={[{ u0: 0.6, v0: 0.02, u1: 0.99, v1: 0.38 }]} steam={{ u: 0.57, v: 0.51, w: 0.05 }}>
          <Pin f={f} a={at('soi', 0.45)} b={B.prorate.s} p={ENV2} top="STATEMENT OF INCOME" big="2 years abroad" sub="used for benefits" />
        </PhotoPlate>
      ) : (
        <PhotoPlate f={f} src="plates/g1-s3-4k.jpg" iw={2294} ih={4096} keys={K3} glide={40} blur={0.8}>
          <Pin f={f} a={at('benefits', 0.5)} b={B.deadline.s} p={ENV3} top="NO CHILDREN · CHILDREN" big="RC151 · RC66" col={C.green} />
        </PhotoPlate>
      )} />
      <AbsoluteFill style={{ background: 'linear-gradient(180deg, rgba(8,6,4,.82) 0%, rgba(8,6,4,.55) 14%, rgba(8,6,4,0) 28%, rgba(8,6,4,0) 50%, rgba(8,6,4,.55) 66%, rgba(8,6,4,.8) 100%)', opacity: 1 - 0.75 * lift }} />
      <AbsoluteFill style={{ background: 'linear-gradient(180deg, rgba(8,6,4,.82) 0%, rgba(8,6,4,.55) 14%, rgba(8,6,4,0) 28%, rgba(8,6,4,0) 100%)', opacity: 0.75 * lift }} />
      <Header f={f} chip="CRA · NEWCOMERS" />
      <Typed f={f} caps={CAPS} head={HEAD} />
      <Strip f={f} />

      <Card f={f} a={B.residency.s} b={B.world.s} label="RESIDENT FOR TAX PURPOSES" top={360} h={300}>
        <Line f={f} a={at('residency', 0.1)} top={98} size={34}>a home · a spouse or partner · social ties</Line>
        <Line f={f} a={at('residency', 0.6)} top={160} size={40}><span style={{ color: C.gold }}>usually the day you arrive</span></Line>
        <Line f={f} a={at('residency', 0.75)} top={226} size={22} color={C.soft}>unsure? Form NR74 asks CRA for an opinion</Line>
      </Card>
      <Card f={f} a={B.world.s} b={B.soi.s} label="THE YEAR YOU ARRIVE" top={360} h={300}>
        <Line f={f} a={at('world', 0.1)} top={96} size={32}>After: <span style={{ color: C.gold }}>world income</span>, all countries</Line>
        <Line f={f} a={at('world', 0.55)} top={150} size={32}>Before: foreign income <span style={{ color: C.green }}>generally not taxed</span></Line>
        <Line f={f} a={at('world', 0.75)} top={214} size={22} color={C.soft}>a tax treaty can exempt some foreign income</Line>
      </Card>
      <Card f={f} a={B.soi.s} b={B.prorate.s} label="STATEMENT OF INCOME" top={360} h={300}>
        <Hero f={f} a={at('soi', 0.4)} size={104}>2 years</Hero>
        <Line f={f} a={at('soi', 0.6)} top={232} size={24} color={C.soft}>income abroad before you arrived · sets your benefits</Line>
      </Card>
      <Card f={f} a={B.prorate.s} b={B.benefits.s} label="EXAMPLE · ARRIVED SEPTEMBER 1, 2026" top={360} h={300}>
        <Line f={f} a={at('prorate', 0.15)} top={92} size={28} color={C.soft}>$16,452 × 122 ÷ 365 days</Line>
        <Hero f={f} a={at('prorate', 0.6)} top={132} size={96}>≈ $5,499</Hero>
        <Line f={f} a={at('prorate', 0.75)} top={240} size={22} color={C.soft}>federal basic personal amount · some credits aren't prorated</Line>
      </Card>
      <Card f={f} a={B.benefits.s} b={B.deadline.s} label="APPLY NOW · DON'T WAIT FOR THE RETURN" top={360} h={300} tone="green">
        <Line f={f} a={at('benefits', 0.3)} top={98} size={34}><span style={{ color: C.gold }}>RC151</span> · GST/HST credit, now CGEB</Line>
        <Line f={f} a={at('benefits', 0.6)} top={152} size={34}><span style={{ color: C.gold }}>RC66</span> · Canada child benefit</Line>
        <Line f={f} a={at('benefits', 0.75)} top={214} size={22} color={C.soft}>you need a social insurance number first</Line>
      </Card>

      {f >= B.deadline.s && (
        <div style={{ position: 'absolute', left: 80, right: 80, top: 1000, opacity: end, transform: `translateY(${(1 - end) * 40}px)` }}>
          <Flag f={f} w={150} amp={0.06} />
          <div style={{ marginTop: 26, fontFamily: HEAD, fontSize: 56, fontWeight: 900, lineHeight: 1.1, color: C.cream, textShadow: shade }}>File by <span style={{ color: C.gold }}>April 30</span>,<br />every year, even at $0.</div>
          <div style={{ marginTop: 34, display: 'inline-flex', padding: '20px 32px', borderRadius: 999, background: 'linear-gradient(160deg,#fff1c2,#f1c75b 50%,#c88f1f)', color: '#2b1d03', fontSize: 34, fontWeight: 900, boxShadow: '0 16px 30px rgba(0,0,0,.4)', opacity: ease(f, B.cta.s - 4, B.cta.s + 8), transform: `scale(${1 + 0.03 * Math.sin(TAU * (f - B.cta.s) / 36)})` }}>Next: benefits newcomers can claim →</div>
          <div style={{ marginTop: 12, fontSize: 26, fontWeight: 700, color: C.cream, textShadow: shade, opacity: ease(f, at('cta', 0.6), at('cta', 0.7)) }}>Follow so you don't miss it</div>
          <div style={{ marginTop: 28, fontSize: 19, fontWeight: 600, color: C.soft, lineHeight: 1.45, opacity: ease(f, B.deadline.s + 16, B.deadline.s + 30) }}>
            Source: canada.ca (CRA: newcomers to Canada; completing your return; federal credits for newcomers; RC151, RC66) · the couple and dates are an example · general info, not advice
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
