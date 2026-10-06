// "Canada Child Benefit and your income" (topic D2, family group) in the approved look (Kit + Plate).
// Master timeline = Grady voiceover (d2/vo-beats.json → tools/vo_hf.py → d2-timeline.json). Facts: d2/PRODUCTION-BIBLE.md.
// Plate: a prairie family kitchen on an autumn morning; a mother lifts a laughing toddler by the window (fields outside);
// on the table, a coin jar, toddler sneakers, a mug, an unmarked envelope and toy blocks. Family group type: Nunito headings.
// The first beats keep the top clear so the family is seen; then cards at the top, amounts pinned on the table props.
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { PhotoPlate, type Focus } from './Plate';
import { Flag } from './RaiseShort';
import TL from './d2-timeline.json';
import { C, SANS, Card, Header, Hero, Line, Typed, beatsFrom, ease, pill, shade, type Cap } from './Kit';

export const D2FPS = 24;
const B = beatsFrom(TL, D2FPS);
export const D2DUR = Math.ceil((TL.total + 0.5) * D2FPS);
const HEAD = 'Nunito';
const TAU = Math.PI * 2;
const at = (id: string, fr: number) => Math.round(B[id].s + (B[id].e - B[id].s) * fr);

// object positions in the plate (image coordinates of each object's top)
const JAR = { u: 0.21, v: 0.53 }, SHOES = { u: 0.48, v: 0.61 }, ENV = { u: 0.39, v: 0.76 }, MUG = { u: 0.78, v: 0.58 };

const KEYS: Focus[] = [
  { f: 0, u: 0.45, v: 0.2, k: 1.12 },                  // mother and toddler
  { f: B.loop.s, u: 0.48, v: 0.22, k: 1.25 },          // push in on the toddler's laugh
  { f: B.base.s, u: 0.4, v: 0.7, k: 1.2 },             // the envelope
  { f: B.max.s, u: 0.48, v: 0.6, k: 1.3 },             // the toddler's sneakers
  { f: B.threshold.s, u: 0.26, v: 0.62, k: 1.25 },     // the coin jar
  { f: B.example.s, u: 0.4, v: 0.5, k: 1.15 },         // the table
  { f: B.raise.s, u: 0.4, v: 0.74, k: 1.25 },          // the envelope
  { f: B.lever.s, u: 0.24, v: 0.48, k: 1.3 },          // the coin jar
  { f: B.file.s, u: 0.5, v: 0.4, k: 1.1 },             // the family by the window
  { f: B.payoff.s, u: 0.5, v: 0.45, k: 1.0 },          // wide
];

const CAPS: Cap[] = [
  { at: B.hook.s, l1: 'Got a raise?', l2: 'your CCB could shrink', until: B.loop.s - 2 },
  { at: B.loop.s, l1: 'Not right away', l2: 'it runs a year behind', until: B.base.s - 2 },
  { at: B.base.s, l1: 'Base year', l2: 'last year’s family net income', until: B.max.s - 2 },
  { at: B.max.s, l1: 'The maximum', l2: 'per child, per year', until: B.threshold.s - 2 },
  { at: B.threshold.s, l1: 'Above the threshold', l2: 'it starts to shrink', until: B.example.s - 2 },
  { at: B.example.s, l1: 'Example', l2: '1 child under 6 · $70,000', until: B.raise.s - 2 },
  { at: B.raise.s, l1: 'A $10,000 raise', l2: 'what changes, and when', until: B.lever.s - 2 },
  { at: B.lever.s, l1: 'One lever', l2: 'RRSP contributions', until: B.file.s - 2 },
  { at: B.file.s, l1: 'The big rule', l2: 'both of you file, every year', until: B.payoff.s - 2 },
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

// persistent strip: the key numbers tick on
const Strip = ({ f }: { f: number }) => {
  const show = ease(f, B.max.s + 10, B.max.s + 22) * (1 - ease(f, B.payoff.s - 6, B.payoff.s + 6));
  if (show <= 0) return null;
  const items: [number, React.ReactNode][] = [
    [at('max', 0.5), <><span style={{ color: C.soft, fontWeight: 600 }}>max, under 6</span><span style={{ color: C.gold }}>$8,157</span></>],
    [at('threshold', 0.4), <><span style={{ color: C.soft, fontWeight: 600 }}>shrinks above</span><span style={{ color: C.gold }}>$38,237</span></>],
    [at('raise', 0.5), <><span style={{ color: C.soft, fontWeight: 600 }}>1 child</span><span style={{ color: C.red }}>7%</span></>],
    [at('file', 0.3), <><span style={{ color: C.green }}>✓</span>both spouses file</>],
  ];
  return (
    <div style={{ position: 'absolute', left: 80, top: 690, display: 'flex', gap: 10, flexWrap: 'wrap', width: 920, opacity: show }}>
      {items.map(([a, node], i) => { const on = ease(f, a, a + 10); return on > 0 ? <div key={i} style={{ ...pill, fontSize: 20, padding: '10px 18px', opacity: on, transform: `scale(${0.9 + 0.1 * on})` }}>{node}</div> : null; })}
    </div>
  );
};

export const D2v2 = () => {
  const f = useCurrentFrame();
  const end = ease(f, B.payoff.s + 2, B.payoff.s + 20);
  const lift = 1 - ease(f, B.payoff.s - 6, B.payoff.s + 6);
  return (
    <AbsoluteFill style={{ background: '#0d0b09', fontFamily: SANS, overflow: 'hidden' }}>
      <PhotoPlate f={f} src="plates/d2-4k.jpg" iw={2294} ih={4096} keys={KEYS} glide={40} blur={0.8} steam={{ u: MUG.u, v: MUG.v, w: 0.07 }}>
        <Pin f={f} a={at('max', 0.35)} b={B.threshold.s} p={SHOES} top="CHILD UNDER 6" big="up to $8,157" sub="a year · July 2026 – June 2027" />
        <Pin f={f} a={at('example', 0.45)} b={B.raise.s} p={JAR} top="EXAMPLE · $70,000" big="≈ $494 / month" sub="$5,933.59 a year" />
        <Pin f={f} a={at('raise', 0.35)} b={B.lever.s} p={ENV} top="+ $10,000 RAISE" big="− $700 a year" sub="from the July after you file" col={C.red} />
        <Pin f={f} a={at('lever', 0.3)} b={B.file.s} p={JAR} top="RRSP CONTRIBUTION" big="lowers net income" col={C.green} />
      </PhotoPlate>
      <AbsoluteFill style={{ background: 'linear-gradient(180deg, rgba(8,6,4,.82) 0%, rgba(8,6,4,.55) 14%, rgba(8,6,4,0) 28%, rgba(8,6,4,0) 50%, rgba(8,6,4,.55) 66%, rgba(8,6,4,.8) 100%)', opacity: 1 - 0.75 * lift }} />
      <AbsoluteFill style={{ background: 'linear-gradient(180deg, rgba(8,6,4,.82) 0%, rgba(8,6,4,.55) 14%, rgba(8,6,4,0) 28%, rgba(8,6,4,0) 100%)', opacity: 0.75 * lift }} />
      <Header f={f} chip="CRA · CCB 2026–27" />
      <Typed f={f} caps={CAPS} head={HEAD} />
      <Strip f={f} />

      <Card f={f} a={B.base.s} b={B.max.s} label="HOW THE CCB IS SET" top={360} h={300}>
        <Line f={f} a={at('base', 0.05)} top={98} size={34} color={C.soft}>Payments July 2026 – June 2027</Line>
        <Line f={f} a={at('base', 0.6)} top={156} serif head={HEAD} size={50}><span style={{ color: C.gold }}>use your 2025</span></Line>
        <Line f={f} a={at('base', 0.7)} top={218} serif head={HEAD} size={40}>family net income</Line>
      </Card>
      <Card f={f} a={B.max.s} b={B.threshold.s} label="MAXIMUM · JULY 2026 – JUNE 2027" top={360} h={300}>
        <Hero f={f} a={at('max', 0.25)} size={110}>$8,157</Hero>
        <Line f={f} a={at('max', 0.55)} top={232} size={28} color={C.soft}>a year per child under 6 · ages 6–17: $6,883</Line>
      </Card>
      <Card f={f} a={B.threshold.s} b={B.example.s} label="WHERE IT STARTS TO SHRINK" top={360} h={300}>
        <Hero f={f} a={at('threshold', 0.3)} size={110}>$38,237</Hero>
        <Line f={f} a={at('threshold', 0.55)} top={232} size={28} color={C.soft}>adjusted family net income, 2025</Line>
      </Card>
      <Card f={f} a={B.example.s} b={B.raise.s} label="EXAMPLE · 1 CHILD UNDER 6 · $70,000" top={360} h={300}>
        <Hero f={f} a={at('example', 0.55)} size={110}>$494/mo</Hero>
        <Line f={f} a={at('example', 0.15)} top={232} size={26} color={C.soft}>$8,157 − 7% × ($70,000 − $38,237) = $5,933.59 a year</Line>
      </Card>
      <Card f={f} a={B.raise.s} b={B.lever.s} label="A $10,000 RAISE" top={360} h={300} tone="red">
        <Hero f={f} a={at('raise', 0.3)} size={110}>−$700</Hero>
        <Line f={f} a={at('raise', 0.55)} top={232} size={26} color={C.soft}>a year: 7% for 1 child · 13.5% for 2 · from the next July</Line>
      </Card>
      <Card f={f} a={B.lever.s} b={B.file.s} label="ONE LEVER" top={360} h={300} tone="green">
        <Line f={f} a={at('lever', 0.15)} top={104} serif head={HEAD} size={50}>RRSP contributions</Line>
        <Line f={f} a={at('lever', 0.45)} top={170} serif head={HEAD} size={50}><span style={{ color: C.gold }}>lower net income.</span></Line>
      </Card>
      <Card f={f} a={B.file.s} b={B.payoff.s} label="THE BIG RULE" top={360} h={300} tone="red">
        <Line f={f} a={at('file', 0.15)} top={98} serif head={HEAD} size={44}>You and your spouse both file,</Line>
        <Line f={f} a={at('file', 0.4)} top={156} serif head={HEAD} size={44}><span style={{ color: C.gold }}>every year, even with no income.</span></Line>
        <Line f={f} a={at('file', 0.75)} top={226} size={26} color={C.soft}>or payments stop · file by April 30 to avoid a gap</Line>
      </Card>

      {f >= B.payoff.s && (
        <div style={{ position: 'absolute', left: 80, right: 80, top: 1010, opacity: end, transform: `translateY(${(1 - end) * 40}px)` }}>
          <Flag f={f} w={150} amp={0.06} />
          <div style={{ marginTop: 26, fontFamily: HEAD, fontSize: 54, fontWeight: 900, lineHeight: 1.15, color: C.cream, textShadow: shade }}>Take the raise.<br />Plan for the July after.</div>
          <div style={{ marginTop: 34, display: 'inline-flex', padding: '20px 32px', borderRadius: 999, background: 'linear-gradient(160deg,#fff1c2,#f1c75b 50%,#c88f1f)', color: '#2b1d03', fontSize: 34, fontWeight: 900, boxShadow: '0 16px 30px rgba(0,0,0,.4)', opacity: ease(f, B.cta.s - 4, B.cta.s + 8), transform: `scale(${1 + 0.03 * Math.sin(TAU * (f - B.cta.s) / 36)})` }}>Follow for the real math</div>
          <div style={{ marginTop: 28, fontSize: 19, fontWeight: 600, color: C.soft, lineHeight: 1.45, opacity: ease(f, B.payoff.s + 16, B.payoff.s + 30) }}>
            Source: canada.ca (CRA: Canada child benefit, how much you can get; keep getting your payments) · July 2026 – June 2027 · $70,000 is an example · general info, not advice
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
