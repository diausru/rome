// "Leaving Canada: the departure tax" (topic G5, newcomers series) in the approved look (Kit + Plate).
// Master timeline = Grady voiceover (g5/vo-beats.json → tools/vo_hf.py → g5-timeline.json). Facts: g5/PRODUCTION-BIBLE.md.
// Three photo scenes of the same retired couple (series upgrade), each shown once, joined by SceneCuts:
// 1) packing the house in autumn (the rule); 2) the empty living room at night with papers and a calculator
// (example, exclusions, short-stay rule); 3) a sunny terrace abroad (forms, deferral). Mont (SANS).
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { PhotoPlate, SceneCuts, type Focus } from './Plate';
import { Flag } from './RaiseShort';
import TL from './g5-timeline.json';
import { C, SANS, Card, Header, Hero, Line, Typed, beatsFrom, ease, pill, shade, type Cap } from './Kit';

export const G5FPS = 24;
const B = beatsFrom(TL, G5FPS);
export const G5DUR = Math.ceil((TL.total + 0.5) * G5FPS);
const HEAD = SANS;
const TAU = Math.PI * 2;
const at = (id: string, fr: number) => Math.round(B[id].s + (B[id].e - B[id].s) * fr);

// scene changes where the meaning changes: the numbers (scene 2), the paperwork after the move (scene 3)
const CUTS = [B.example.s, B.forms.s];
// object positions per plate (image coordinates of each object's top)
const BOX1 = { u: 0.84, v: 0.41 }, CALC2 = { u: 0.74, v: 0.66 };

const K1: Focus[] = [
  { f: 0, u: 0.62, v: 0.3, k: 1.25 },                  // the couple packing dishes
  { f: B.hook.s + 60, u: 0.6, v: 0.55, k: 1.15 },      // boxes, tape, map
  { f: B.rule.s + 60, u: 0.7, v: 0.45, k: 1.2 },       // the big box
];
const K2: Focus[] = [
  { f: 0, u: 0.45, v: 0.35, k: 1.25 },                 // the couple on the floor
  { f: B.example.s + 60, u: 0.6, v: 0.68, k: 1.2 },    // papers and calculator
  { f: B.short.s, u: 0.45, v: 0.4, k: 1.15 },          // the couple
];
const K3: Focus[] = [
  { f: 0, u: 0.7, v: 0.2, k: 1.2 },                    // abroad: the couple at the railing
  { f: B.defer.s, u: 0.7, v: 0.62, k: 1.15 },          // table: map, glasses, folder
  { f: B.cta.s, u: 0.5, v: 0.5, k: 1.0 },              // wide
];

const CAPS: Cap[] = [
  { at: B.hook.s, l1: 'Leaving Canada for good?', l2: 'tax without selling', until: B.rule.s - 2 },
  { at: B.rule.s, l1: 'The departure tax', l2: 'treated as sold', until: B.example.s - 2 },
  { at: B.example.s, l1: 'Example', l2: 'shares, never sold', until: B.excluded.s - 2 },
  { at: B.excluded.s, l1: 'Not included', l2: 'registered plans · small items', until: B.short.s - 2 },
  { at: B.short.s, l1: 'Short stay?', l2: 'five years or less', until: B.forms.s - 2 },
  { at: B.forms.s, l1: 'The paperwork', l2: 'list what you own', until: B.defer.s - 2 },
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

// persistent strip: the departure checklist builds up
const Strip = ({ f }: { f: number }) => {
  const show = ease(f, B.rule.s, B.rule.s + 12) * (1 - ease(f, B.defer.s - 6, B.defer.s + 6));
  if (show <= 0) return null;
  const items: [number, React.ReactNode][] = [
    [at('rule', 0.6), <><span style={{ color: C.gold }}>1</span>sold at market value</>],
    [at('example', 0.7), <><span style={{ color: C.gold }}>2</span>½ of the gain taxed</>],
    [at('excluded', 0.5), <><span style={{ color: C.green }}>✓</span>RRSP · TFSA · pensions out</>],
    [at('short', 0.5), <><span style={{ color: C.green }}>✓</span>≤ 5 years: brought-in out</>],
    [at('forms', 0.5), <><span style={{ color: C.gold }}>3</span>T1161 over $25K</>],
  ];
  return (
    <div style={{ position: 'absolute', left: 80, top: 690, display: 'flex', gap: 10, flexWrap: 'wrap', width: 920, opacity: show }}>
      {items.map(([a, node], i) => { const on = ease(f, a, a + 10); return on > 0 ? <div key={i} style={{ ...pill, fontSize: 20, padding: '10px 18px', opacity: on, transform: `scale(${0.9 + 0.1 * on})` }}>{node}</div> : null; })}
    </div>
  );
};

export const G5v2 = () => {
  const f = useCurrentFrame();
  const end = ease(f, B.defer.s + 2, B.defer.s + 20);
  const lift = 1 - ease(f, B.defer.s - 6, B.defer.s + 6);
  return (
    <AbsoluteFill style={{ background: '#0d0b09', fontFamily: SANS, overflow: 'hidden' }}>
      <SceneCuts f={f} cuts={CUTS} scene={(i) => i === 0 ? (
        <PhotoPlate f={f} src="plates/g5-s1-4k.jpg" iw={2294} ih={4096} keys={K1} glide={40} blur={0.8}>
          <Pin f={f} a={at('rule', 0.45)} b={B.example.s} p={BOX1} top="TREATED AS SOLD" big="at market value" col={C.cream} />
        </PhotoPlate>
      ) : i === 1 ? (
        <PhotoPlate f={f} src="plates/g5-s2-4k.jpg" iw={2294} ih={4096} keys={K2} glide={40} blur={0.8} steam={{ u: 0.26, v: 0.53, w: 0.05 }}>
          <Pin f={f} a={at('example', 0.55)} b={B.excluded.s} p={CALC2} top="EXAMPLE" big="$60,000 gain" sub="never sold" />
        </PhotoPlate>
      ) : (
        <PhotoPlate f={f} src="plates/g5-s3-4k.jpg" iw={2294} ih={4096} keys={K3} glide={40} blur={0.8} />
      )} />
      <AbsoluteFill style={{ background: 'linear-gradient(180deg, rgba(8,6,4,.82) 0%, rgba(8,6,4,.55) 14%, rgba(8,6,4,0) 28%, rgba(8,6,4,0) 50%, rgba(8,6,4,.55) 66%, rgba(8,6,4,.8) 100%)', opacity: 1 - 0.75 * lift }} />
      <AbsoluteFill style={{ background: 'linear-gradient(180deg, rgba(8,6,4,.82) 0%, rgba(8,6,4,.55) 14%, rgba(8,6,4,0) 28%, rgba(8,6,4,0) 100%)', opacity: 0.75 * lift }} />
      <Header f={f} chip="CRA · LEAVING CANADA" />
      <Typed f={f} caps={CAPS} head={HEAD} />
      <Strip f={f} />

      <Card f={f} a={B.rule.s} b={B.example.s} label="DEPARTURE TAX · DEEMED DISPOSITION" top={360} h={300}>
        <Line f={f} a={at('rule', 0.1)} top={96} size={34}>most property is <span style={{ color: C.gold }}>treated as sold</span></Line>
        <Line f={f} a={at('rule', 0.4)} top={150} size={34}>at <span style={{ color: C.gold }}>fair market value</span>, and bought back</Line>
        <Line f={f} a={at('rule', 0.7)} top={214} size={22} color={C.soft}>on the date you become a non-resident · reported on Form T1243</Line>
      </Card>
      <Card f={f} a={B.example.s} b={B.excluded.s} label="EXAMPLE · SHARES OUTSIDE AN RRSP OR TFSA" top={360} h={300}>
        <Line f={f} a={at('example', 0.08)} top={92} size={30} color={C.soft}>bought $40,000 → worth $100,000 when you go</Line>
        <Hero f={f} a={at('example', 0.75)} top={128} size={96}>+$30,000</Hero>
        <Line f={f} a={at('example', 0.85)} top={236} size={22} color={C.soft}>$60,000 gain × ½ = added to your income that year</Line>
      </Card>
      <Card f={f} a={B.excluded.s} b={B.short.s} label="NOT TREATED AS SOLD" top={360} h={300} tone="green">
        <Line f={f} a={at('excluded', 0.15)} top={98} size={34}><span style={{ color: C.gold }}>RRSP · TFSA</span> · pension plans</Line>
        <Line f={f} a={at('excluded', 0.6)} top={152} size={34}>personal items worth <span style={{ color: C.gold }}>under $10,000</span></Line>
        <Line f={f} a={at('excluded', 0.8)} top={214} size={22} color={C.soft}>registered plans have their own rules once you're non-resident</Line>
      </Card>
      <Card f={f} a={B.short.s} b={B.forms.s} label="SHORT STAY · 60 MONTHS OR LESS IN 10 YEARS" top={360} h={300} tone="green">
        <Hero f={f} a={at('short', 0.45)} size={88}>generally out</Hero>
        <Line f={f} a={at('short', 0.7)} top={232} size={22} color={C.soft}>owned on arrival or inherited after · except taxable Canadian property</Line>
      </Card>
      <Card f={f} a={B.forms.s} b={B.defer.s} label="ALSO FILE, WITH YOUR LAST RESIDENT RETURN" top={360} h={300}>
        <Hero f={f} a={at('forms', 0.55)} size={104}>T1161</Hero>
        <Line f={f} a={at('forms', 0.75)} top={232} size={22} color={C.soft}>if all you own is worth over $25,000 · in and outside Canada</Line>
      </Card>
      <Card f={f} a={B.defer.s} b={G5DUR + 10} label="CAN'T PAY NOW? FORM T1244" top={360} h={300} tone="green">
        <Line f={f} a={at('defer', 0.1)} top={96} size={34}>defer, <span style={{ color: C.gold }}>interest-free</span>, until you sell</Line>
        <Line f={f} a={at('defer', 0.6)} top={150} size={34}>federal tax over <span style={{ color: C.gold }}>$16,500</span> → security</Line>
        <Line f={f} a={at('defer', 0.75)} top={214} size={22} color={C.soft}>elect by April 30 of the year after you leave</Line>
      </Card>

      {f >= B.defer.s && (
        <div style={{ position: 'absolute', left: 80, right: 80, top: 1000, opacity: end, transform: `translateY(${(1 - end) * 40}px)` }}>
          <Flag f={f} w={150} amp={0.06} />
          <div style={{ marginTop: 26, fontFamily: HEAD, fontSize: 56, fontWeight: 900, lineHeight: 1.1, color: C.cream, textShadow: shade }}>Plan the <span style={{ color: C.gold }}>departure tax</span><br />before you leave.</div>
          <div style={{ marginTop: 34, display: 'inline-flex', padding: '20px 32px', borderRadius: 999, background: 'linear-gradient(160deg,#fff1c2,#f1c75b 50%,#c88f1f)', color: '#2b1d03', fontSize: 34, fontWeight: 900, boxShadow: '0 16px 30px rgba(0,0,0,.4)', opacity: ease(f, B.cta.s - 4, B.cta.s + 8), transform: `scale(${1 + 0.03 * Math.sin(TAU * (f - B.cta.s) / 36)})` }}>Next: your tuition slip →</div>
          <div style={{ marginTop: 12, fontSize: 26, fontWeight: 700, color: C.cream, textShadow: shade, opacity: ease(f, at('cta', 0.6), at('cta', 0.7)) }}>Follow so you don't miss it</div>
          <div style={{ marginTop: 28, fontSize: 19, fontWeight: 600, color: C.soft, lineHeight: 1.45, opacity: ease(f, B.defer.s + 16, B.defer.s + 30) }}>
            Source: canada.ca (CRA: Leaving Canada (emigrants); Dispositions of property for emigrants; T1161, T1243, T1244) · the couple and shares are an example · general info, not advice
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
