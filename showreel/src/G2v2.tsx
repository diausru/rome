// "Foreign property: who files T1135" (topic G2, newcomers) in the approved look (Kit + Plate).
// Master timeline = Grady voiceover (g2/vo-beats.json → tools/vo_hf.py → g2-timeline.json). Facts: g2/PRODUCTION-BIBLE.md.
// Three photo scenes of the same couple (series upgrade), each shown once, joined by SceneCuts:
// 1) a winter evening, a photo of their apartment back home on the table (the threshold); 2) later at the table with
// papers and a calculator (what counts, what doesn't, cost); 3) a spring morning by the window (year one, penalty). Mont (SANS).
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { PhotoPlate, SceneCuts, type Focus } from './Plate';
import { Flag } from './RaiseShort';
import TL from './g2-timeline.json';
import { C, SANS, Card, Header, Hero, Line, Typed, beatsFrom, ease, pill, shade, type Cap } from './Kit';

export const G2FPS = 24;
const B = beatsFrom(TL, G2FPS);
export const G2DUR = Math.ceil((TL.total + 0.5) * G2FPS);
const HEAD = SANS;
const TAU = Math.PI * 2;
const at = (id: string, fr: number) => Math.round(B[id].s + (B[id].e - B[id].s) * fr);

// scene changes where the meaning changes: what counts (scene 2), timing and penalty (scene 3)
const CUTS = [B.counts.s, B.first.s];
// object positions per plate (image coordinates of each object's top)
const FRAME1 = { u: 0.62, v: 0.5 }, CALC2 = { u: 0.72, v: 0.71 };

const K1: Focus[] = [
  { f: 0, u: 0.55, v: 0.58, k: 1.12 },                 // the photo of the apartment back home
  { f: B.hook.s + 70, u: 0.68, v: 0.32, k: 1.25 },     // the couple looking at their phone
  { f: B.form.s + 40, u: 0.55, v: 0.55, k: 1.1 },      // table: photo, key, folder
];
const K2: Focus[] = [
  { f: 0, u: 0.45, v: 0.35, k: 1.25 },                 // the couple reading a sheet
  { f: B.excluded.s, u: 0.4, v: 0.6, k: 1.15 },        // folder and glasses
  { f: B.cost.s + 20, u: 0.7, v: 0.66, k: 1.2 },       // calculator
];
const K3: Focus[] = [
  { f: 0, u: 0.72, v: 0.32, k: 1.25 },                 // spring: the couple by the window
  { f: B.late.s, u: 0.65, v: 0.6, k: 1.15 },           // photo and key on the sill
  { f: B.cta.s, u: 0.5, v: 0.5, k: 1.0 },              // wide
];

const CAPS: Cap[] = [
  { at: B.hook.s, l1: 'Own property back home?', l2: 'CRA may want a form', until: B.form.s - 2 },
  { at: B.form.s, l1: 'Form T1135', l2: 'the $100,000 test', until: B.counts.s - 2 },
  { at: B.counts.s, l1: 'What counts', l2: 'specified foreign property', until: B.excluded.s - 2 },
  { at: B.excluded.s, l1: 'What doesn’t', l2: 'personal use · registered plans', until: B.cost.s - 2 },
  { at: B.cost.s, l1: 'Cost, not price', l2: 'newcomers: value on arrival', until: B.first.s - 2 },
  { at: B.first.s, l1: 'The year you arrive', l2: 'no T1135 yet', until: B.late.s - 2 },
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

// persistent strip: the T1135 test builds up
const Strip = ({ f }: { f: number }) => {
  const show = ease(f, B.form.s, B.form.s + 12) * (1 - ease(f, B.late.s - 6, B.late.s + 6));
  if (show <= 0) return null;
  const items: [number, React.ReactNode][] = [
    [at('form', 0.55), <><span style={{ color: C.gold }}>1</span>cost &gt; $100K</>],
    [at('counts', 0.5), <><span style={{ color: C.gold }}>2</span>banks · rentals · stocks</>],
    [at('excluded', 0.5), <><span style={{ color: C.green }}>✓</span>RRSP · TFSA out</>],
    [at('cost', 0.5), <><span style={{ color: C.gold }}>3</span>cost on arrival</>],
    [at('first', 0.4), <><span style={{ color: C.green }}>✓</span>year 1: not required</>],
  ];
  return (
    <div style={{ position: 'absolute', left: 80, top: 690, display: 'flex', gap: 10, flexWrap: 'wrap', width: 920, opacity: show }}>
      {items.map(([a, node], i) => { const on = ease(f, a, a + 10); return on > 0 ? <div key={i} style={{ ...pill, fontSize: 20, padding: '10px 18px', opacity: on, transform: `scale(${0.9 + 0.1 * on})` }}>{node}</div> : null; })}
    </div>
  );
};

export const G2v2 = () => {
  const f = useCurrentFrame();
  const end = ease(f, B.late.s + 2, B.late.s + 20);
  const lift = 1 - ease(f, B.late.s - 6, B.late.s + 6);
  return (
    <AbsoluteFill style={{ background: '#0d0b09', fontFamily: SANS, overflow: 'hidden' }}>
      <SceneCuts f={f} cuts={CUTS} scene={(i) => i === 0 ? (
        <PhotoPlate f={f} src="plates/g2-s1-4k.jpg" iw={2294} ih={4096} keys={K1} glide={40} blur={0.8} snow={[{ u0: 0.66, v0: 0.02, u1: 0.99, v1: 0.3 }]} steam={{ u: 0.86, v: 0.53, w: 0.05 }}>
          <Pin f={f} a={at('hook', 0.35)} b={B.form.s + 4} p={FRAME1} top="APARTMENT BACK HOME" big="foreign property" col={C.cream} />
        </PhotoPlate>
      ) : i === 1 ? (
        <PhotoPlate f={f} src="plates/g2-s2-4k.jpg" iw={2294} ih={4096} keys={K2} glide={40} blur={0.8} snow={[{ u0: 0.44, v0: 0.02, u1: 0.99, v1: 0.3 }]} steam={{ u: 0.35, v: 0.53, w: 0.05 }}>
          <Pin f={f} a={at('cost', 0.35)} b={B.first.s} p={CALC2} top="COST AMOUNT" big="not today's price" />
        </PhotoPlate>
      ) : (
        <PhotoPlate f={f} src="plates/g2-s3-4k.jpg" iw={2294} ih={4096} keys={K3} glide={40} blur={0.8}>
        </PhotoPlate>
      )} />
      <AbsoluteFill style={{ background: 'linear-gradient(180deg, rgba(8,6,4,.82) 0%, rgba(8,6,4,.55) 14%, rgba(8,6,4,0) 28%, rgba(8,6,4,0) 50%, rgba(8,6,4,.55) 66%, rgba(8,6,4,.8) 100%)', opacity: 1 - 0.75 * lift }} />
      <AbsoluteFill style={{ background: 'linear-gradient(180deg, rgba(8,6,4,.82) 0%, rgba(8,6,4,.55) 14%, rgba(8,6,4,0) 28%, rgba(8,6,4,0) 100%)', opacity: 0.75 * lift }} />
      <Header f={f} chip="CRA · FOREIGN PROPERTY" />
      <Typed f={f} caps={CAPS} head={HEAD} />
      <Strip f={f} />

      <Card f={f} a={B.form.s} b={B.counts.s} label="FORM T1135 · FILE IF TOTAL COST IS OVER" top={360} h={300}>
        <Hero f={f} a={at('form', 0.5)} size={104}>$100,000</Hero>
        <Line f={f} a={at('form', 0.7)} top={232} size={22} color={C.soft}>at any time in the year · Part A under $250,000 · Part B above</Line>
      </Card>
      <Card f={f} a={B.counts.s} b={B.excluded.s} label="COUNTS · SPECIFIED FOREIGN PROPERTY" top={360} h={300}>
        <Line f={f} a={at('counts', 0.1)} top={92} size={34}>money in <span style={{ color: C.gold }}>foreign bank accounts</span></Line>
        <Line f={f} a={at('counts', 0.4)} top={144} size={34}>a <span style={{ color: C.gold }}>rental property</span> abroad</Line>
        <Line f={f} a={at('counts', 0.65)} top={196} size={34}><span style={{ color: C.gold }}>U.S. stocks</span>, even at a Canadian broker</Line>
      </Card>
      <Card f={f} a={B.excluded.s} b={B.cost.s} label="DOESN'T COUNT" top={360} h={300} tone="green">
        <Line f={f} a={at('excluded', 0.15)} top={98} size={34}>a vacation home used <span style={{ color: C.gold }}>mainly by you</span></Line>
        <Line f={f} a={at('excluded', 0.6)} top={152} size={34}>anything inside an <span style={{ color: C.gold }}>RRSP or TFSA</span></Line>
        <Line f={f} a={at('excluded', 0.75)} top={214} size={22} color={C.soft}>also out: property used only in an active business</Line>
      </Card>
      <Card f={f} a={B.cost.s} b={B.first.s} label="COST, NOT MARKET VALUE" top={360} h={300}>
        <Line f={f} a={at('cost', 0.1)} top={96} size={32}>the test uses what the property <span style={{ color: C.gold }}>cost</span></Line>
        <Hero f={f} a={at('cost', 0.6)} top={136} size={72}>value on arrival</Hero>
        <Line f={f} a={at('cost', 0.75)} top={232} size={22} color={C.soft}>newcomers: fair market value when you became resident</Line>
      </Card>
      <Card f={f} a={B.first.s} b={B.late.s} label="THE YEAR YOU BECOME RESIDENT" top={360} h={300} tone="green">
        <Hero f={f} a={at('first', 0.3)} size={96}>no T1135</Hero>
        <Line f={f} a={at('first', 0.7)} top={232} size={22} color={C.soft}>the $100,000 test starts next year · world income is still reported</Line>
      </Card>
      <Card f={f} a={B.late.s} b={G2DUR + 10} label="FILED LATE · EVEN WITH NO TAX OWING" top={360} h={300}>
        <Hero f={f} a={at('late', 0.3)} size={104}>$25 a day</Hero>
        <Line f={f} a={at('late', 0.6)} top={232} size={22} color={C.soft}>at least $100 · up to $2,500 (100 days) · more if knowingly</Line>
      </Card>

      {f >= B.late.s && (
        <div style={{ position: 'absolute', left: 80, right: 80, top: 1000, opacity: end, transform: `translateY(${(1 - end) * 40}px)` }}>
          <Flag f={f} w={150} amp={0.06} />
          <div style={{ marginTop: 26, fontFamily: HEAD, fontSize: 56, fontWeight: 900, lineHeight: 1.1, color: C.cream, textShadow: shade }}>Over <span style={{ color: C.gold }}>$100,000</span> at cost?<br />File T1135 with your return.</div>
          <div style={{ marginTop: 34, display: 'inline-flex', padding: '20px 32px', borderRadius: 999, background: 'linear-gradient(160deg,#fff1c2,#f1c75b 50%,#c88f1f)', color: '#2b1d03', fontSize: 34, fontWeight: 900, boxShadow: '0 16px 30px rgba(0,0,0,.4)', opacity: ease(f, B.cta.s - 4, B.cta.s + 8), transform: `scale(${1 + 0.03 * Math.sin(TAU * (f - B.cta.s) / 36)})` }}>Next: leaving Canada? Departure tax →</div>
          <div style={{ marginTop: 12, fontSize: 26, fontWeight: 700, color: C.cream, textShadow: shade, opacity: ease(f, at('cta', 0.6), at('cta', 0.7)) }}>Follow so you don't miss it</div>
          <div style={{ marginTop: 28, fontSize: 19, fontWeight: 600, color: C.soft, lineHeight: 1.45, opacity: ease(f, B.late.s + 16, B.late.s + 30) }}>
            Source: canada.ca (CRA: Foreign Income Verification Statement; Questions and answers about Form T1135; foreign reporting penalties) · the couple is an example · general info, not advice
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
