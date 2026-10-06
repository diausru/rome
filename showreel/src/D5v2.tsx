// "Child care expenses: who claims" (topic D5, family group) in the approved look (Kit + Plate).
// Master timeline = Grady voiceover (d5/vo-beats.json → tools/vo_hf.py → d5-timeline.json). Facts: d5/PRODUCTION-BIBLE.md.
// Three photo scenes of the same mother and daughter (series upgrade 2026-10-06), each shown once, joined by a code
// "whip push" (SceneCuts): 1) morning at home, zipping the pink jacket; 2) the daycare door, goodbye hug, educator waves;
// 3) evening at the kitchen table, sorting receipts while the girl colours. Family group type: Nunito headings.
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { PhotoPlate, SceneCuts, type Focus } from './Plate';
import { Flag } from './RaiseShort';
import TL from './d5-timeline.json';
import { C, SANS, Card, Header, Hero, Line, Typed, beatsFrom, ease, pill, shade, type Cap } from './Kit';

export const D5FPS = 24;
const B = beatsFrom(TL, D5FPS);
export const D5DUR = Math.ceil((TL.total + 0.5) * D5FPS);
const HEAD = 'Nunito';
const TAU = Math.PI * 2;
const at = (id: string, fr: number) => Math.round(B[id].s + (B[id].e - B[id].s) * fr);

// scene changes where the meaning changes: who claims (scene 2), exceptions (scene 3)
const CUTS = [B.who.s, B.exceptions.s];
// object positions per plate (image coordinates of each object's top)
const BOX1 = { u: 0.4, v: 0.6 }, SLIP = { u: 0.52, v: 0.69 }, BOX2 = { u: 0.4, v: 0.59 }, STACK = { u: 0.41, v: 0.69 };

const K1: Focus[] = [
  { f: 0, u: 0.5, v: 0.28, k: 1.15 },                  // mother zips the jacket
  { f: B.loop.s, u: 0.55, v: 0.28, k: 1.3 },           // push in on the girl
  { f: B.what.s, u: 0.7, v: 0.42, k: 1.15 },           // boots and coats by the door
  { f: B.limits.s, u: 0.4, v: 0.55, k: 1.25 },         // the lunch box
];
const K2: Focus[] = [
  { f: 0, u: 0.4, v: 0.33, k: 1.2 },                   // the goodbye hug
  { f: B.example.s, u: 0.5, v: 0.6, k: 1.25 },         // the slip
  { f: B.cap.s, u: 0.45, v: 0.56, k: 1.3 },            // lunch box
];
const K3: Focus[] = [
  { f: 0, u: 0.62, v: 0.3, k: 1.15 },                  // evening: mother and daughter at the table
  { f: B.receipts.s, u: 0.45, v: 0.62, k: 1.3 },       // the receipts
  { f: B.payoff.s, u: 0.5, v: 0.5, k: 1.0 },           // wide
];

const CAPS: Cap[] = [
  { at: B.hook.s, l1: 'Paying for daycare?', l2: 'part of it can be deducted', until: B.loop.s - 2 },
  { at: B.loop.s, l1: 'Usually one parent', l2: 'can claim it', until: B.what.s - 2 },
  { at: B.what.s, l1: 'What counts', l2: 'care, so you can work or study', until: B.limits.s - 2 },
  { at: B.limits.s, l1: 'The limits', l2: 'per child, per year', until: B.who.s - 2 },
  { at: B.who.s, l1: 'Who claims', l2: 'generally the lower earner', until: B.example.s - 2 },
  { at: B.example.s, l1: 'Example', l2: '$90,000 + $30,000 · $9,000 paid', until: B.cap.s - 2 },
  { at: B.cap.s, l1: 'The cap', l2: '2/3 of earned income', until: B.exceptions.s - 2 },
  { at: B.exceptions.s, l1: 'Exceptions', l2: 'when the higher earner claims', until: B.receipts.s - 2 },
  { at: B.receipts.s, l1: 'Receipts', l2: 'keep every one', until: B.payoff.s - 2 },
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
  const show = ease(f, B.limits.s + 10, B.limits.s + 22) * (1 - ease(f, B.payoff.s - 6, B.payoff.s + 6));
  if (show <= 0) return null;
  const items: [number, React.ReactNode][] = [
    [at('limits', 0.35), <><span style={{ color: C.soft, fontWeight: 600 }}>under 7</span><span style={{ color: C.gold }}>$8,000</span></>],
    [at('limits', 0.75), <><span style={{ color: C.soft, fontWeight: 600 }}>7–16</span><span style={{ color: C.gold }}>$5,000</span></>],
    [at('who', 0.4), <>lower earner claims</>],
    [at('cap', 0.4), <><span style={{ color: C.soft, fontWeight: 600 }}>cap</span><span style={{ color: C.gold }}>2/3 earned income</span></>],
    [at('receipts', 0.25), <><span style={{ color: C.green }}>✓</span>receipts</>],
  ];
  return (
    <div style={{ position: 'absolute', left: 80, top: 690, display: 'flex', gap: 10, flexWrap: 'wrap', width: 920, opacity: show }}>
      {items.map(([a, node], i) => { const on = ease(f, a, a + 10); return on > 0 ? <div key={i} style={{ ...pill, fontSize: 20, padding: '10px 18px', opacity: on, transform: `scale(${0.9 + 0.1 * on})` }}>{node}</div> : null; })}
    </div>
  );
};

export const D5v2 = () => {
  const f = useCurrentFrame();
  const end = ease(f, B.payoff.s + 2, B.payoff.s + 20);
  const lift = 1 - ease(f, B.payoff.s - 6, B.payoff.s + 6);
  return (
    <AbsoluteFill style={{ background: '#0d0b09', fontFamily: SANS, overflow: 'hidden' }}>
      <SceneCuts f={f} cuts={CUTS} scene={(i) => i === 0 ? (
        <PhotoPlate f={f} src="plates/d5-s1-4k.jpg" iw={2294} ih={4096} keys={K1} glide={40} blur={0.8} steam={{ u: 0.9, v: 0.565, w: 0.06 }}>
          <Pin f={f} a={at('limits', 0.3)} b={B.who.s} p={BOX1} top="PER CHILD UNDER 7" big="up to $8,000" sub="a year · age 7–16: $5,000" />
        </PhotoPlate>
      ) : i === 1 ? (
        <PhotoPlate f={f} src="plates/d5-4k.jpg" iw={2294} ih={4096} keys={K2} glide={40} blur={0.8} steam={{ u: 0.93, v: 0.555, w: 0.06 }}>
          <Pin f={f} a={at('example', 0.7)} b={B.cap.s} p={SLIP} top="LOWER EARNER CLAIMS" big="$8,000" sub="of $9,000 paid" />
          <Pin f={f} a={at('cap', 0.4)} b={B.exceptions.s} p={BOX2} top="2/3 × $30,000" big="up to $20,000" sub="so the $8,000 fits" col={C.cream} />
        </PhotoPlate>
      ) : (
        <PhotoPlate f={f} src="plates/d5-s3-4k.jpg" iw={2294} ih={4096} keys={K3} glide={40} blur={0.8} steam={{ u: 0.93, v: 0.53, w: 0.06 }}>
          <Pin f={f} a={at('receipts', 0.4)} b={B.payoff.s} p={STACK} top="BABYSITTER?" big="SIN on the receipt" col={C.green} />
        </PhotoPlate>
      )} />
      <AbsoluteFill style={{ background: 'linear-gradient(180deg, rgba(8,6,4,.82) 0%, rgba(8,6,4,.55) 14%, rgba(8,6,4,0) 28%, rgba(8,6,4,0) 50%, rgba(8,6,4,.55) 66%, rgba(8,6,4,.8) 100%)', opacity: 1 - 0.75 * lift }} />
      <AbsoluteFill style={{ background: 'linear-gradient(180deg, rgba(8,6,4,.82) 0%, rgba(8,6,4,.55) 14%, rgba(8,6,4,0) 28%, rgba(8,6,4,0) 100%)', opacity: 0.75 * lift }} />
      <Header f={f} chip="CRA · LINE 21400" />
      <Typed f={f} caps={CAPS} head={HEAD} />
      <Strip f={f} />

      <Card f={f} a={B.what.s} b={B.limits.s} label="WHAT CAN COUNT" top={360} h={300} tone="green">
        <Line f={f} a={at('what', 0.05)} top={98} size={32}>✓ daycare centres &amp; nursery schools</Line>
        <Line f={f} a={at('what', 0.4)} top={152} size={32}>✓ caregivers, like babysitters or nannies</Line>
        <Line f={f} a={at('what', 0.65)} top={206} size={32}>✓ day camps &amp; day sports schools</Line>
      </Card>
      <Card f={f} a={B.limits.s} b={B.who.s} label="YEARLY LIMIT PER CHILD" top={360} h={300}>
        <Hero f={f} a={at('limits', 0.2)} size={110}>$8,000</Hero>
        <Line f={f} a={at('limits', 0.6)} top={232} size={26} color={C.soft}>under 7 · ages 7–16: $5,000 · eligible for the DTC: $11,000</Line>
      </Card>
      <Card f={f} a={B.who.s} b={B.example.s} label="WHO CLAIMS" top={360} h={300}>
        <Line f={f} a={at('who', 0.1)} top={104} serif head={HEAD} size={48}>Generally, the parent with</Line>
        <Line f={f} a={at('who', 0.4)} top={168} serif head={HEAD} size={48}><span style={{ color: C.gold }}>the lower net income.</span></Line>
        <Line f={f} a={at('who', 0.7)} top={240} size={24} color={C.soft}>CRA: even if that income is zero</Line>
      </Card>
      <Card f={f} a={B.example.s} b={B.cap.s} label="EXAMPLE · ONE CHILD, AGE 3" top={360} h={300}>
        <Line f={f} a={at('example', 0.05)} top={92} size={30} color={C.soft}>Parents earn $90,000 and $30,000 · daycare $9,000</Line>
        <Hero f={f} a={at('example', 0.7)} top={128} size={96}>$8,000</Hero>
        <Line f={f} a={at('example', 0.75)} top={244} size={26} color={C.soft}>claimed by the $30,000 parent</Line>
      </Card>
      <Card f={f} a={B.cap.s} b={B.exceptions.s} label="THE CAP" top={360} h={300}>
        <Hero f={f} a={at('cap', 0.3)} size={110}>2/3</Hero>
        <Line f={f} a={at('cap', 0.6)} top={232} size={26} color={C.soft}>of the claiming parent's earned income</Line>
      </Card>
      <Card f={f} a={B.exceptions.s} b={B.receipts.s} label="EXCEPTIONS" top={360} h={300} tone="red">
        <Line f={f} a={at('exceptions', 0.05)} top={92} size={26} color={C.soft}>The higher earner claims only if the other parent:</Line>
        <Line f={f} a={at('exceptions', 0.45)} top={136} size={30}>• was in school (a qualifying program)</Line>
        <Line f={f} a={at('exceptions', 0.62)} top={184} size={30}>• was in hospital or bed-bound (2+ weeks)</Line>
        <Line f={f} a={at('exceptions', 0.75)} top={236} size={24} color={C.soft}>a few other cases · weekly limits apply · Form T778</Line>
      </Card>
      <Card f={f} a={B.receipts.s} b={B.payoff.s} label="RECEIPTS" top={360} h={300} tone="green">
        <Line f={f} a={at('receipts', 0.05)} top={104} serif head={HEAD} size={48}>Keep every receipt.</Line>
        <Line f={f} a={at('receipts', 0.4)} top={170} serif head={HEAD} size={44}><span style={{ color: C.gold }}>Babysitter? Their SIN on it.</span></Line>
        <Line f={f} a={at('receipts', 0.7)} top={240} size={24} color={C.soft}>don't send them with the return · keep them in case CRA asks</Line>
      </Card>

      {f >= B.payoff.s && (
        <div style={{ position: 'absolute', left: 80, right: 80, top: 1010, opacity: end, transform: `translateY(${(1 - end) * 40}px)` }}>
          <Flag f={f} w={150} amp={0.06} />
          <div style={{ marginTop: 26, fontFamily: HEAD, fontSize: 54, fontWeight: 900, lineHeight: 1.15, color: C.cream, textShadow: shade }}>Lower earner claims.<br />Keep the receipts.</div>
          <div style={{ marginTop: 14, fontSize: 28, fontWeight: 700, color: C.gold, textShadow: shade }}>It lowers net income, which can help your CCB too.</div>
          <div style={{ marginTop: 30, display: 'inline-flex', padding: '20px 32px', borderRadius: 999, background: 'linear-gradient(160deg,#fff1c2,#f1c75b 50%,#c88f1f)', color: '#2b1d03', fontSize: 34, fontWeight: 900, boxShadow: '0 16px 30px rgba(0,0,0,.4)', opacity: ease(f, B.cta.s - 4, B.cta.s + 8), transform: `scale(${1 + 0.03 * Math.sin(TAU * (f - B.cta.s) / 36)})` }}>Next: why a corporation pays 9% →</div>
          <div style={{ marginTop: 12, fontSize: 26, fontWeight: 700, color: C.cream, textShadow: shade, opacity: ease(f, at('cta', 0.55), at('cta', 0.65)) }}>Follow so you don't miss it</div>
          <div style={{ marginTop: 26, fontSize: 19, fontWeight: 600, color: C.soft, lineHeight: 1.45, opacity: ease(f, B.payoff.s + 16, B.payoff.s + 30) }}>
            Source: canada.ca (CRA: line 21400 child care expenses; Form T778; Folio S1-F3-C1) · the $90,000 / $30,000 family is an example · general info, not advice
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
