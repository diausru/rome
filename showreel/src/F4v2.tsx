// "Rental property: deductions and the CCA trap" (topic F4, property group) in the approved look (Kit + Plate).
// Master timeline = Grady voiceover (f4/vo-beats.json → tools/vo_hf.py → f4-timeline.json). Facts: f4/PRODUCTION-BIBLE.md.
// Three photo scenes of the same landlord (series upgrade), each shown once, joined by SceneCuts:
// 1) repairing a wooden step at his rental duplex (what you can deduct; repair vs improvement); 2) evening at his kitchen
// table with the statements (CCA and its limits); 3) handing the keys to the buyers (the sale and recapture).
// Property group type: Fraunces (SERIF) headings. Bridge CTA to C5.
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { PhotoPlate, SceneCuts, type Focus } from './Plate';
import { Flag } from './RaiseShort';
import TL from './f4-timeline.json';
import { C, SANS, SERIF, Card, Header, Hero, Line, Typed, beatsFrom, ease, pill, shade, type Cap } from './Kit';

export const F4FPS = 24;
const B = beatsFrom(TL, F4FPS);
export const F4DUR = Math.ceil((TL.total + 0.5) * F4FPS);
const HEAD = SERIF;
const TAU = Math.PI * 2;
const at = (id: string, fr: number) => Math.round(B[id].s + (B[id].e - B[id].s) * fr);

// scene changes where the meaning changes: CCA (scene 2), the sale (scene 3)
const CUTS = [B.cca.s, B.trap.s];
// object positions per plate (image coordinates of each object's top)
const ENV1 = { u: 0.35, v: 0.73 }, BOARDS1 = { u: 0.78, v: 0.5 }, KEYS2 = { u: 0.62, v: 0.64 }, MUG2 = { u: 0.85, v: 0.55 }, KEYS3 = { u: 0.5, v: 0.74 };

const K1: Focus[] = [
  { f: 0, u: 0.4, v: 0.33, k: 1.15 },                  // the landlord fixing the step
  { f: B.loop.s, u: 0.42, v: 0.36, k: 1.3 },           // push in
  { f: B.deduct.s, u: 0.4, v: 0.6, k: 1.2 },           // toolbox, keys, envelope
  { f: B.capital.s, u: 0.6, v: 0.45, k: 1.25 },        // the step and the new boards
];
const K2: Focus[] = [
  { f: 0, u: 0.5, v: 0.4, k: 1.2 },                    // evening: the statements
  { f: B.limit.s, u: 0.72, v: 0.4, k: 1.25 },          // keys and tea, low in frame
];
const K3: Focus[] = [
  { f: 0, u: 0.45, v: 0.36, k: 1.2 },                  // the handshake: the building is sold
  { f: B.recap.s, u: 0.45, v: 0.66, k: 1.25 },         // keys and envelope on the rail
  { f: B.payoff.s, u: 0.5, v: 0.5, k: 1.0 },           // wide
];

const CAPS: Cap[] = [
  { at: B.hook.s, l1: 'Renting out a property?', l2: 'one deduction can bite back', until: B.loop.s - 2 },
  { at: B.loop.s, l1: 'What you can deduct', l2: 'rental expenses', until: B.deduct.s - 2 },
  { at: B.deduct.s, l1: 'Current expenses', l2: 'deducted the same year', until: B.capital.s - 2 },
  { at: B.capital.s, l1: 'Repair or improvement?', l2: 'current vs capital', until: B.cca.s - 2 },
  { at: B.cca.s, l1: 'Capital cost allowance', l2: 'claimed slowly', until: B.limit.s - 2 },
  { at: B.limit.s, l1: 'Two rules', l2: 'no CCA loss · optional', until: B.trap.s - 2 },
  { at: B.trap.s, l1: 'The trap', l2: 'ten years of CCA', until: B.recap.s - 2 },
  { at: B.recap.s, l1: 'Recapture', l2: 'when you sell', until: B.payoff.s - 2 },
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

// persistent strip: the levers tick on
const Strip = ({ f }: { f: number }) => {
  const show = ease(f, B.deduct.s, B.deduct.s + 12) * (1 - ease(f, B.payoff.s - 6, B.payoff.s + 6));
  if (show <= 0) return null;
  const items: [number, React.ReactNode][] = [
    [at('deduct', 0.4), <><span style={{ color: C.green }}>✓</span>current: deduct now</>],
    [at('capital', 0.6), <>capital → CCA</>],
    [at('cca', 0.5), <><span style={{ color: C.gold }}>4%</span>class 1 · ½ in year one</>],
    [at('limit', 0.3), <><span style={{ color: C.red }}>✗</span>no CCA rental loss</>],
    [at('recap', 0.5), <><span style={{ color: C.red }}>recapture</span>fully taxed</>],
  ];
  return (
    <div style={{ position: 'absolute', left: 80, top: 690, display: 'flex', gap: 10, flexWrap: 'wrap', width: 920, opacity: show }}>
      {items.map(([a, node], i) => { const on = ease(f, a, a + 10); return on > 0 ? <div key={i} style={{ ...pill, fontSize: 20, padding: '10px 18px', opacity: on, transform: `scale(${0.9 + 0.1 * on})` }}>{node}</div> : null; })}
    </div>
  );
};

export const F4v2 = () => {
  const f = useCurrentFrame();
  const end = ease(f, B.payoff.s + 2, B.payoff.s + 20);
  const lift = 1 - ease(f, B.payoff.s - 6, B.payoff.s + 6);
  return (
    <AbsoluteFill style={{ background: '#0d0b09', fontFamily: SANS, overflow: 'hidden' }}>
      <SceneCuts f={f} cuts={CUTS} scene={(i) => i === 0 ? (
        <PhotoPlate f={f} src="plates/f4-s1-4k.jpg" iw={2294} ih={4096} keys={K1} glide={40} blur={0.8} steam={{ u: 0.62, v: 0.6, w: 0.05 }}>
          <Pin f={f} a={at('deduct', 0.7)} b={B.capital.s} p={ENV1} top="MORTGAGE PAYMENT" big="interest only" sub="the principal is not deductible" />
          <Pin f={f} a={at('capital', 0.6)} b={B.cca.s} p={BOARDS1} top="WOOD → CONCRETE" big="capital" sub="an improvement" col={C.cream} />
        </PhotoPlate>
      ) : i === 1 ? (
        <PhotoPlate f={f} src="plates/f4-s2-4k.jpg" iw={2294} ih={4096} keys={K2} glide={40} blur={0.8} steam={{ u: 0.84, v: 0.56, w: 0.05 }}>
          <Pin f={f} a={at('cca', 0.7)} b={B.limit.s} p={KEYS2} top="YEAR 1 · $300,000 × 4% × ½" big="$6,000" sub="example building, land excluded" />
          <Pin f={f} a={at('limit', 0.4)} b={B.trap.s} p={MUG2} top="NET RENTAL INCOME $0?" big="CCA $0" sub="it can wait" col={C.cream} />
        </PhotoPlate>
      ) : (
        <PhotoPlate f={f} src="plates/f4-s3-4k.jpg" iw={2294} ih={4096} keys={K3} glide={40} blur={0.8}>
          <Pin f={f} a={at('recap', 0.55)} b={B.payoff.s} p={KEYS3} top="YEAR OF THE SALE" big="+$96,395 income" sub="recaptured CCA" col={C.red} />
        </PhotoPlate>
      )} />
      <AbsoluteFill style={{ background: 'linear-gradient(180deg, rgba(8,6,4,.82) 0%, rgba(8,6,4,.55) 14%, rgba(8,6,4,0) 28%, rgba(8,6,4,0) 50%, rgba(8,6,4,.55) 66%, rgba(8,6,4,.8) 100%)', opacity: 1 - 0.75 * lift }} />
      <AbsoluteFill style={{ background: 'linear-gradient(180deg, rgba(8,6,4,.82) 0%, rgba(8,6,4,.55) 14%, rgba(8,6,4,0) 28%, rgba(8,6,4,0) 100%)', opacity: 0.75 * lift }} />
      <Header f={f} chip="CRA · RENTAL PROPERTY" />
      <Typed f={f} caps={CAPS} head={HEAD} />
      <Strip f={f} />

      <Card f={f} a={B.deduct.s} b={B.capital.s} label="CURRENT EXPENSES · DEDUCT THIS YEAR" top={360} h={300} tone="green">
        <Line f={f} a={at('deduct', 0.05)} top={96} size={32}>✓ mortgage interest · property tax</Line>
        <Line f={f} a={at('deduct', 0.3)} top={146} size={32}>✓ insurance · repairs · utilities</Line>
        <Line f={f} a={at('deduct', 0.65)} top={208} size={30}><span style={{ color: C.red }}>✗</span> the principal · <span style={{ color: C.red }}>✗</span> your own labour</Line>
      </Card>
      <Card f={f} a={B.capital.s} b={B.cca.s} label="REPAIR OR IMPROVEMENT?" top={360} h={300}>
        <Line f={f} a={at('capital', 0.05)} top={100} serif head={HEAD} size={42}>Fix the wooden step → <span style={{ color: C.gold }}>deduct now</span></Line>
        <Line f={f} a={at('capital', 0.5)} top={164} serif head={HEAD} size={42}>Upgrade to concrete → <span style={{ color: C.gold }}>capital</span></Line>
        <Line f={f} a={at('capital', 0.7)} top={232} size={24} color={C.soft}>restore = current · better than the original = capital</Line>
      </Card>
      <Card f={f} a={B.cca.s} b={B.limit.s} label="CAPITAL COST ALLOWANCE · CLASS 1" top={360} h={300}>
        <Hero f={f} a={at('cca', 0.45)} size={110}>4% a year</Hero>
        <Line f={f} a={at('cca', 0.6)} top={232} size={26} color={C.soft}>most rental buildings · half in the first year · never on land</Line>
      </Card>
      <Card f={f} a={B.limit.s} b={B.trap.s} label="TWO RULES" top={360} h={300}>
        <Line f={f} a={at('limit', 0.05)} top={100} serif head={HEAD} size={40}><span style={{ color: C.red }}>✗</span> can't create or increase a rental loss</Line>
        <Line f={f} a={at('limit', 0.55)} top={166} serif head={HEAD} size={40}><span style={{ color: C.green }}>✓</span> optional: claim any amount, or none</Line>
      </Card>
      <Card f={f} a={B.trap.s} b={B.recap.s} label="EXAMPLE · $300,000 BUILDING, FULL CCA" top={360} h={300}>
        <Line f={f} a={at('trap', 0.1)} top={92} size={30} color={C.soft}>10 years at 4% (year one: half)</Line>
        <Hero f={f} a={at('trap', 0.75)} top={132} size={96}>$96,395</Hero>
        <Line f={f} a={at('trap', 0.85)} top={244} size={26} color={C.soft}>deducted over the years</Line>
      </Card>
      <Card f={f} a={B.recap.s} b={B.payoff.s} label="SOLD FOR MORE THAN COST · RECAPTURE" top={360} h={300} tone="red">
        <Hero f={f} a={at('recap', 0.45)} size={96}>$96,395</Hero>
        <Line f={f} a={at('recap', 0.6)} top={226} size={26} color={C.soft}>added to income, 100% taxable · a capital gain: only ½</Line>
      </Card>

      {f >= B.payoff.s && (
        <div style={{ position: 'absolute', left: 80, right: 80, top: 1010, opacity: end, transform: `translateY(${(1 - end) * 40}px)` }}>
          <Flag f={f} w={150} amp={0.06} />
          <div style={{ marginTop: 26, fontFamily: HEAD, fontSize: 56, fontWeight: 800, lineHeight: 1.1, color: C.cream, textShadow: shade }}>A deferral, not a gift.<br />Plan before you claim.</div>
          <div style={{ marginTop: 34, display: 'inline-flex', padding: '20px 32px', borderRadius: 999, background: 'linear-gradient(160deg,#fff1c2,#f1c75b 50%,#c88f1f)', color: '#2b1d03', fontSize: 34, fontWeight: 900, boxShadow: '0 16px 30px rgba(0,0,0,.4)', opacity: ease(f, B.cta.s - 4, B.cta.s + 8), transform: `scale(${1 + 0.03 * Math.sin(TAU * (f - B.cta.s) / 36)})` }}>Next: money moves before Dec 31 →</div>
          <div style={{ marginTop: 12, fontSize: 26, fontWeight: 700, color: C.cream, textShadow: shade, opacity: ease(f, at('cta', 0.6), at('cta', 0.7)) }}>Follow so you don't miss it</div>
          <div style={{ marginTop: 28, fontSize: 19, fontWeight: 600, color: C.soft, lineHeight: 1.45, opacity: ease(f, B.payoff.s + 16, B.payoff.s + 30) }}>
            Source: canada.ca (CRA guide T4036 Rental Income; CCA for rental property; Form T776 line 9947) · the $300,000 building is an example · general info, not advice
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
