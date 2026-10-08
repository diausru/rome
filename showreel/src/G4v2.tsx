// "Benefits newcomers can claim" (topic G4, newcomers) in the approved look (Kit + Plate).
// Master timeline = Grady voiceover (g4/vo-beats.json → tools/vo_hf.py → g4-timeline.json). Facts: g4/PRODUCTION-BIBLE.md.
// Three photo scenes of the same young family (series upgrade), each shown once, joined by SceneCuts:
// 1) unpacking groceries in their first winter kitchen (CGEB); 2) the living room with mail and a baby bottle
// (Canada child benefit, temporary residents, RC151/RC66); 3) brushing the baby's first teeth (CDCP, filing). Mont (SANS).
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { PhotoPlate, SceneCuts, type Focus } from './Plate';
import { Flag } from './RaiseShort';
import TL from './g4-timeline.json';
import { C, SANS, Card, Header, Hero, Line, Typed, beatsFrom, ease, pill, shade, type Cap } from './Kit';

export const G4FPS = 24;
const B = beatsFrom(TL, G4FPS);
export const G4DUR = Math.ceil((TL.total + 0.5) * G4FPS);
const HEAD = SANS;
const TAU = Math.PI * 2;
const at = (id: string, fr: number) => Math.round(B[id].s + (B[id].e - B[id].s) * fr);

// scene changes where the meaning changes: children (scene 2), dental and filing (scene 3)
const CUTS = [B.ccb.s, B.dental.s];
// object positions per plate (image coordinates of each object's top)
const ENV1 = { u: 0.62, v: 0.76 }, ENV2 = { u: 0.55, v: 0.76 };

const K1: Focus[] = [
  { f: 0, u: 0.45, v: 0.3, k: 1.15 },                  // the family unpacking groceries
  { f: B.hook.s + 40, u: 0.4, v: 0.28, k: 1.3 },       // push in on the couple
  { f: B.cgeb.s + 40, u: 0.35, v: 0.5, k: 1.2 },       // the grocery bag
];
const K2: Focus[] = [
  { f: 0, u: 0.3, v: 0.36, k: 1.25 },                  // mother and baby
  { f: B.temp.s, u: 0.5, v: 0.3, k: 1.15 },            // father with the mail
  { f: B.apply.s + 30, u: 0.5, v: 0.66, k: 1.2 },      // envelope and phone
];
const K3: Focus[] = [
  { f: 0, u: 0.7, v: 0.3, k: 1.25 },                   // the baby's first toothbrush
  { f: B.file.s, u: 0.65, v: 0.55, k: 1.15 },          // counter, envelope
  { f: B.cta.s, u: 0.5, v: 0.5, k: 1.0 },              // wide
];

const CAPS: Cap[] = [
  { at: B.hook.s, l1: 'New to Canada?', l2: 'benefits you can claim', until: B.cgeb.s - 2 },
  { at: B.cgeb.s, l1: '1 · Groceries and Essentials', l2: 'the old GST/HST credit', until: B.ccb.s - 2 },
  { at: B.ccb.s, l1: '2 · Canada child benefit', l2: 'monthly, tax-free', until: B.temp.s - 2 },
  { at: B.temp.s, l1: 'On a work or study permit?', l2: 'the 18-month rule', until: B.apply.s - 2 },
  { at: B.apply.s, l1: 'Apply when you arrive', l2: 'don’t wait for the return', until: B.dental.s - 2 },
  { at: B.dental.s, l1: '3 · Dental Care Plan', l2: 'the Canadian Dental Care Plan', until: B.file.s - 2 },
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

// persistent strip: the three benefits and the application tick on
const Strip = ({ f }: { f: number }) => {
  const show = ease(f, B.cgeb.s, B.cgeb.s + 12) * (1 - ease(f, B.file.s - 6, B.file.s + 6));
  if (show <= 0) return null;
  const items: [number, React.ReactNode][] = [
    [at('cgeb', 0.5), <><span style={{ color: C.gold }}>1</span>CGEB · quarterly</>],
    [at('ccb', 0.5), <><span style={{ color: C.gold }}>2</span>CCB · monthly</>],
    [at('apply', 0.5), <><span style={{ color: C.green }}>✓</span>RC151 · RC66</>],
    [at('dental', 0.5), <><span style={{ color: C.gold }}>3</span>CDCP · dental</>],
  ];
  return (
    <div style={{ position: 'absolute', left: 80, top: 690, display: 'flex', gap: 10, flexWrap: 'wrap', width: 920, opacity: show }}>
      {items.map(([a, node], i) => { const on = ease(f, a, a + 10); return on > 0 ? <div key={i} style={{ ...pill, fontSize: 20, padding: '10px 18px', opacity: on, transform: `scale(${0.9 + 0.1 * on})` }}>{node}</div> : null; })}
    </div>
  );
};

export const G4v2 = () => {
  const f = useCurrentFrame();
  const end = ease(f, B.file.s + 2, B.file.s + 20);
  const lift = 1 - ease(f, B.file.s - 6, B.file.s + 6);
  return (
    <AbsoluteFill style={{ background: '#0d0b09', fontFamily: SANS, overflow: 'hidden' }}>
      <SceneCuts f={f} cuts={CUTS} scene={(i) => i === 0 ? (
        <PhotoPlate f={f} src="plates/g4-s1-4k.jpg" iw={2294} ih={4096} keys={K1} glide={40} blur={0.8} snow={[{ u0: 0.6, v0: 0.04, u1: 0.99, v1: 0.42 }]}>
          <Pin f={f} a={at('cgeb', 0.6)} b={B.ccb.s} p={ENV1} top="PAID IN" big="Jan · Apr · Jul · Oct" col={C.cream} />
        </PhotoPlate>
      ) : i === 1 ? (
        <PhotoPlate f={f} src="plates/g4-s2-4k.jpg" iw={2294} ih={4096} keys={K2} glide={40} blur={0.8} snow={[{ u0: 0.62, v0: 0.04, u1: 0.99, v1: 0.42 }]}>
          <Pin f={f} a={at('apply', 0.45)} b={B.dental.s} p={ENV2} top="YOU NEED" big="a SIN" sub="social insurance number" />
        </PhotoPlate>
      ) : (
        <PhotoPlate f={f} src="plates/g4-s3-4k.jpg" iw={2294} ih={4096} keys={K3} glide={40} blur={0.8}>
        </PhotoPlate>
      )} />
      <AbsoluteFill style={{ background: 'linear-gradient(180deg, rgba(8,6,4,.82) 0%, rgba(8,6,4,.55) 14%, rgba(8,6,4,0) 28%, rgba(8,6,4,0) 50%, rgba(8,6,4,.55) 66%, rgba(8,6,4,.8) 100%)', opacity: 1 - 0.75 * lift }} />
      <AbsoluteFill style={{ background: 'linear-gradient(180deg, rgba(8,6,4,.82) 0%, rgba(8,6,4,.55) 14%, rgba(8,6,4,0) 28%, rgba(8,6,4,0) 100%)', opacity: 0.75 * lift }} />
      <Header f={f} chip="CRA · NEWCOMER BENEFITS" />
      <Typed f={f} caps={CAPS} head={HEAD} />
      <Strip f={f} />

      <Card f={f} a={B.cgeb.s} b={B.ccb.s} label="CANADA GROCERIES AND ESSENTIALS BENEFIT" top={360} h={300}>
        <Line f={f} a={at('cgeb', 0.15)} top={98} size={34}>replaced the GST/HST credit <span style={{ color: C.gold }}>July 3, 2026</span></Line>
        <Line f={f} a={at('cgeb', 0.6)} top={160} size={40}><span style={{ color: C.gold }}>tax-free · every 3 months</span></Line>
        <Line f={f} a={at('cgeb', 0.75)} top={226} size={22} color={C.soft}>amount depends on family size and income</Line>
      </Card>
      <Card f={f} a={B.ccb.s} b={B.temp.s} label="CANADA CHILD BENEFIT · MAXIMUM" top={360} h={300}>
        <Hero f={f} a={at('ccb', 0.55)} size={104}>$8,157</Hero>
        <Line f={f} a={at('ccb', 0.75)} top={232} size={22} color={C.soft}>per child under 6 · Jul 2026–Jun 2027 · full under $38,237</Line>
      </Card>
      <Card f={f} a={B.temp.s} b={B.apply.s} label="TEMPORARY RESIDENTS" top={360} h={300}>
        <Hero f={f} a={at('temp', 0.6)} size={104}>18 months</Hero>
        <Line f={f} a={at('temp', 0.75)} top={232} size={22} color={C.soft}>in Canada, plus a valid permit in the 19th month</Line>
      </Card>
      <Card f={f} a={B.apply.s} b={B.dental.s} label="APPLY NOW · DON'T WAIT FOR THE RETURN" top={360} h={300} tone="green">
        <Line f={f} a={at('apply', 0.2)} top={98} size={34}><span style={{ color: C.gold }}>RC151</span> · CGEB, no children</Line>
        <Line f={f} a={at('apply', 0.4)} top={152} size={34}><span style={{ color: C.gold }}>RC66</span> · with children (CCB too)</Line>
        <Line f={f} a={at('apply', 0.75)} top={214} size={22} color={C.soft}>a social insurance number is needed first</Line>
      </Card>
      <Card f={f} a={B.dental.s} b={B.file.s} label="CANADIAN DENTAL CARE PLAN" top={360} h={300}>
        <Line f={f} a={at('dental', 0.2)} top={98} size={34}>no access to dental insurance</Line>
        <Line f={f} a={at('dental', 0.4)} top={152} size={34}>filed tax return · resident</Line>
        <Hero f={f} a={at('dental', 0.65)} top={196} size={56}>income &lt; $90,000</Hero>
      </Card>

      {f >= B.file.s && (
        <div style={{ position: 'absolute', left: 80, right: 80, top: 1000, opacity: end, transform: `translateY(${(1 - end) * 40}px)` }}>
          <Flag f={f} w={150} amp={0.06} />
          <div style={{ marginTop: 26, fontFamily: HEAD, fontSize: 56, fontWeight: 900, lineHeight: 1.1, color: C.cream, textShadow: shade }}>It all runs on <span style={{ color: C.gold }}>your return</span>.<br />File every year, even at $0.</div>
          <div style={{ marginTop: 34, display: 'inline-flex', padding: '20px 32px', borderRadius: 999, background: 'linear-gradient(160deg,#fff1c2,#f1c75b 50%,#c88f1f)', color: '#2b1d03', fontSize: 34, fontWeight: 900, boxShadow: '0 16px 30px rgba(0,0,0,.4)', opacity: ease(f, B.cta.s - 4, B.cta.s + 8), transform: `scale(${1 + 0.03 * Math.sin(TAU * (f - B.cta.s) / 36)})` }}>Next: own property abroad? T1135 →</div>
          <div style={{ marginTop: 12, fontSize: 26, fontWeight: 700, color: C.cream, textShadow: shade, opacity: ease(f, at('cta', 0.6), at('cta', 0.7)) }}>Follow so you don't miss it</div>
          <div style={{ marginTop: 28, fontSize: 19, fontWeight: 600, color: C.soft, lineHeight: 1.45, opacity: ease(f, B.file.s + 16, B.file.s + 30) }}>
            Source: canada.ca (CRA: CGEB; Canada child benefit; RC151, RC66 · Health Canada: CDCP) · the family is an example · general info, not advice
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
