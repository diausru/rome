// "Your first pay stub, explained" (topic G3, employment group) in the approved look (Kit + Plate).
// Master timeline = Grady voiceover (g3/vo-beats.json → tools/vo_hf.py → g3-timeline.json). Facts: g3/PRODUCTION-BIBLE.md.
// Plate: a young worker reads his first pay stub by a city window at dusk; on the counter, a takeaway coffee, phone,
// earbuds, an unmarked envelope and a folded work apron. The camera stays left of the skyline landmark (example is Manitoba).
// The example's numbers come from g3/example.py; a slim strip builds the pay stub line by line.
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { PhotoPlate, type Focus } from './Plate';
import { Flag } from './RaiseShort';
import TL from './g3-timeline.json';
import { C, SANS, Card, Header, Hero, Line, Typed, beatsFrom, ease, pill, shade, type Cap } from './Kit';

export const G3FPS = 24;
const B = beatsFrom(TL, G3FPS);
export const G3DUR = Math.ceil((TL.total + 0.5) * G3FPS);
const HEAD = SANS;
const TAU = Math.PI * 2;
const at = (id: string, fr: number) => Math.round(B[id].s + (B[id].e - B[id].s) * fr);

// object positions in the plate (image coordinates of each object's top)
const ENV = { u: 0.3, v: 0.8 }, CUP = { u: 0.36, v: 0.535 };

// every key keeps k ≥ 1.15 and u ≤ 0.45, so the right edge of the frame stays left of the skyline tower (u ≈ 0.9)
const KEYS: Focus[] = [
  { f: 0, u: 0.45, v: 0.3, k: 1.2 },                   // the worker reading
  { f: B.loop.s, u: 0.45, v: 0.33, k: 1.32 },          // push in on the stub
  { f: B.setup.s, u: 0.35, v: 0.7, k: 1.2 },           // the envelope
  { f: B.cpp.s, u: 0.45, v: 0.4, k: 1.3 },             // the stub in his hand
  { f: B.ei.s, u: 0.38, v: 0.64, k: 1.25 },            // phone and earbuds
  { f: B.tax.s, u: 0.45, v: 0.34, k: 1.32 },           // the stub
  { f: B.net.s, u: 0.33, v: 0.72, k: 1.25 },           // the envelope
  { f: B.twist.s, u: 0.36, v: 0.52, k: 1.2 },          // the coffee
  { f: B.payoff.s, u: 0.43, v: 0.5, k: 1.15 },         // wide
];

const CAPS: Cap[] = [
  { at: B.hook.s, l1: 'First paycheque?', l2: "here's where the money went", until: B.loop.s - 2 },
  { at: B.loop.s, l1: 'Three deductions', l2: 'every single pay', until: B.setup.s - 2 },
  { at: B.setup.s, l1: 'Example', l2: '$52,000 · Manitoba · biweekly', until: B.cpp.s - 2 },
  { at: B.cpp.s, l1: '1 · CPP', l2: 'Canada Pension Plan', until: B.ei.s - 2 },
  { at: B.ei.s, l1: '2 · EI', l2: 'Employment Insurance', until: B.tax.s - 2 },
  { at: B.tax.s, l1: '3 · Income tax', l2: 'federal + Manitoba', until: B.net.s - 2 },
  { at: B.net.s, l1: 'Take-home', l2: 'what lands in your account', until: B.twist.s - 2 },
  { at: B.twist.s, l1: 'The twist', l2: 'yearly maximums', until: B.payoff.s - 2 },
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

// persistent strip: the pay stub builds line by line
const Strip = ({ f }: { f: number }) => {
  const show = ease(f, B.setup.s + 10, B.setup.s + 22) * (1 - ease(f, B.payoff.s - 6, B.payoff.s + 6));
  if (show <= 0) return null;
  const items: [number, React.ReactNode][] = [
    [at('setup', 0.6), <><span style={{ color: C.soft, fontWeight: 600 }}>gross</span>$2,000</>],
    [at('cpp', 0.35), <><span style={{ color: C.soft, fontWeight: 600 }}>CPP</span><span style={{ color: C.red }}>−$110.99</span></>],
    [at('ei', 0.35), <><span style={{ color: C.soft, fontWeight: 600 }}>EI</span><span style={{ color: C.red }}>−$32.60</span></>],
    [at('tax', 0.25), <><span style={{ color: C.soft, fontWeight: 600 }}>tax</span><span style={{ color: C.red }}>−$301.56</span></>],
    [at('net', 0.45), <><span style={{ color: C.soft, fontWeight: 600 }}>net</span><span style={{ color: C.gold }}>$1,554.85</span></>],
  ];
  return (
    <div style={{ position: 'absolute', left: 80, top: 690, display: 'flex', gap: 10, flexWrap: 'wrap', width: 920, opacity: show }}>
      {items.map(([a, node], i) => { const on = ease(f, a, a + 10); return on > 0 ? <div key={i} style={{ ...pill, fontSize: 20, padding: '10px 18px', opacity: on, transform: `scale(${0.9 + 0.1 * on})` }}>{node}</div> : null; })}
    </div>
  );
};

export const G3v2 = () => {
  const f = useCurrentFrame();
  const end = ease(f, B.payoff.s + 2, B.payoff.s + 20);
  const lift = 1 - ease(f, B.payoff.s - 6, B.payoff.s + 6);
  return (
    <AbsoluteFill style={{ background: '#0d0b09', fontFamily: SANS, overflow: 'hidden' }}>
      <PhotoPlate f={f} src="plates/g3-4k.jpg" iw={2294} ih={4096} keys={KEYS} glide={40} blur={0.8} steam={{ u: CUP.u, v: CUP.v, w: 0.06 }}>
        <Pin f={f} a={at('setup', 0.45)} b={B.cpp.s} p={ENV} top="EVERY TWO WEEKS" big="$2,000" sub="gross pay" col={C.cream} />
        <Pin f={f} a={at('net', 0.3)} b={B.twist.s} p={ENV} top="TAKE-HOME" big="≈ $1,555" sub="per pay" />
        <Pin f={f} a={at('twist', 0.35)} b={B.payoff.s} p={CUP} top="YEARLY MAXIMUM REACHED?" big="CPP & EI stop" sub="until January" col={C.green} />
      </PhotoPlate>
      <AbsoluteFill style={{ background: 'linear-gradient(180deg, rgba(8,6,4,.82) 0%, rgba(8,6,4,.55) 14%, rgba(8,6,4,0) 28%, rgba(8,6,4,0) 50%, rgba(8,6,4,.55) 66%, rgba(8,6,4,.8) 100%)', opacity: 1 - 0.75 * lift }} />
      <AbsoluteFill style={{ background: 'linear-gradient(180deg, rgba(8,6,4,.82) 0%, rgba(8,6,4,.55) 14%, rgba(8,6,4,0) 28%, rgba(8,6,4,0) 100%)', opacity: 0.75 * lift }} />
      <Header f={f} chip="PAYROLL · 2026" />
      <Typed f={f} caps={CAPS} head={HEAD} />
      <Strip f={f} />

      <Card f={f} a={at('hook', 0.3)} b={B.setup.s} label="YOUR FIRST PAY STUB" top={360} h={300}>
        <Line f={f} a={at('hook', 0.45)} top={104} serif head={HEAD} size={48}>Smaller than you expected?</Line>
        <Line f={f} a={B.loop.s} top={172} serif head={HEAD} size={48}><span style={{ color: C.gold }}>Three deductions. Every pay.</span></Line>
      </Card>
      <Card f={f} a={B.setup.s} b={B.cpp.s} label="EXAMPLE · MANITOBA · 2026" top={360} h={300}>
        <Hero f={f} a={at('setup', 0.6)} size={110}>$2,000</Hero>
        <Line f={f} a={at('setup', 0.2)} top={232} size={28} color={C.soft}>gross pay every two weeks · $52,000 a year</Line>
      </Card>
      <Card f={f} a={B.cpp.s} b={B.ei.s} label="1 · CANADA PENSION PLAN" top={360} h={300}>
        <Hero f={f} a={at('cpp', 0.12)} size={110}>−$110.99</Hero>
        <Line f={f} a={at('cpp', 0.6)} top={232} size={26} color={C.soft}>5.95% above the $3,500 yearly exemption · your future CPP</Line>
      </Card>
      <Card f={f} a={B.ei.s} b={B.tax.s} label="2 · EMPLOYMENT INSURANCE" top={360} h={300}>
        <Hero f={f} a={at('ei', 0.15)} size={110}>−$32.60</Hero>
        <Line f={f} a={at('ei', 0.6)} top={232} size={28} color={C.soft}>1.63% of insurable earnings (outside Quebec)</Line>
      </Card>
      <Card f={f} a={B.tax.s} b={B.net.s} label="3 · INCOME TAX" top={360} h={300}>
        <Hero f={f} a={at('tax', 0.12)} size={110}>−$301.56</Hero>
        <Line f={f} a={at('tax', 0.55)} top={232} size={26} color={C.soft}>federal $163.23 + Manitoba $138.33 · based on your TD1 forms</Line>
      </Card>
      <Card f={f} a={B.net.s} b={B.twist.s} label="YOUR TAKE-HOME" top={360} h={300}>
        <Hero f={f} a={at('net', 0.4)} size={110}>$1,554.85</Hero>
        <Line f={f} a={at('net', 0.15)} top={232} size={26} color={C.soft}>$2,000 − $110.99 − $32.60 − $301.56</Line>
      </Card>
      <Card f={f} a={B.twist.s} b={B.payoff.s} label="THE TWIST · 2026 MAXIMUMS" top={360} h={300} tone="green">
        <Line f={f} a={at('twist', 0.1)} top={98} size={30}><span style={{ color: C.gold }}>CPP</span> stops at $85,000 of earnings</Line>
        <Line f={f} a={at('twist', 0.1)} top={142} size={22} color={C.soft}>incl. the extra 4% CPP2 on earnings from $74,600 to $85,000</Line>
        <Line f={f} a={at('twist', 0.3)} top={192} size={30}><span style={{ color: C.gold }}>EI</span> stops at $68,900 of insurable earnings</Line>
        <Line f={f} a={at('twist', 0.6)} top={240} size={22} color={C.soft}>at $52,000 a year, neither stops · both restart in January</Line>
      </Card>

      {f >= B.payoff.s && (
        <div style={{ position: 'absolute', left: 80, right: 80, top: 1010, opacity: end, transform: `translateY(${(1 - end) * 40}px)` }}>
          <Flag f={f} w={150} amp={0.06} />
          <div style={{ marginTop: 26, fontFamily: HEAD, fontSize: 46, fontWeight: 900, lineHeight: 1.2, color: C.cream, textShadow: shade, whiteSpace: 'nowrap' }}>CPP. EI. Income tax.<br />Your return settles the rest.</div>
          <div style={{ marginTop: 34, display: 'inline-flex', padding: '20px 32px', borderRadius: 999, background: 'linear-gradient(160deg,#fff1c2,#f1c75b 50%,#c88f1f)', color: '#2b1d03', fontSize: 34, fontWeight: 900, boxShadow: '0 16px 30px rgba(0,0,0,.4)', opacity: ease(f, B.cta.s - 4, B.cta.s + 8), transform: `scale(${1 + 0.03 * Math.sin(TAU * (f - B.cta.s) / 36)})` }}>Follow for the real math</div>
          <div style={{ marginTop: 28, fontSize: 19, fontWeight: 600, color: C.soft, lineHeight: 1.45, opacity: ease(f, B.payoff.s + 16, B.payoff.s + 30) }}>
            Source: canada.ca (CRA payroll: CPP, CPP2, EI rates and maximums, 2026) · example: $52,000 in Manitoba, basic TD1, yearly tax ÷ 26 · general info, not advice
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
