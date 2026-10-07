// "The small business deduction" (topic C3, business group) in the approved look (Kit + Plate).
// Master timeline = Grady voiceover (c3/vo-beats.json → tools/vo_hf.py → c3-timeline.json). Facts: c3/PRODUCTION-BIBLE.md.
// Three photo scenes of the same cabinetmaker (series upgrade 2026-10-06), each shown once, joined by SceneCuts:
// 1) morning, he slides the workshop door open; 2) the working day, reading a sheet while an employee sands a door;
// 3) evening at the corner desk under a lamp. Business group type: Mont (SANS) headings. Bridge CTA to F1.
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { PhotoPlate, SceneCuts, type Focus } from './Plate';
import { Flag } from './RaiseShort';
import TL from './c3-timeline.json';
import { C, SANS, Card, Header, Hero, Line, Typed, beatsFrom, ease, pill, shade, type Cap } from './Kit';

export const C3FPS = 24;
const B = beatsFrom(TL, C3FPS);
export const C3DUR = Math.ceil((TL.total + 0.5) * C3FPS);
const HEAD = SANS;
const TAU = Math.PI * 2;
const at = (id: string, fr: number) => Math.round(B[id].s + (B[id].e - B[id].s) * fr);

// scene changes where the meaning changes: the example (scene 2), the traps (scene 3)
const CUTS = [B.example.s, B.traps.s];
// object positions per plate (image coordinates of each object's top)
const FOLDERS = { u: 0.33, v: 0.64 }, LAPTOP = { u: 0.27, v: 0.54 }, MUG3 = { u: 0.72, v: 0.6 }, KEYS3 = { u: 0.79, v: 0.71 };

const K1: Focus[] = [
  { f: 0, u: 0.45, v: 0.25, k: 1.15 },                 // morning: he opens the workshop
  { f: B.loop.s, u: 0.5, v: 0.28, k: 1.3 },            // push in
  { f: B.rate.s, u: 0.35, v: 0.62, k: 1.2 },           // the folders
  { f: B.general.s, u: 0.6, v: 0.3, k: 1.15 },         // the morning light at the door
];
const K2: Focus[] = [
  { f: 0, u: 0.5, v: 0.5, k: 1.2 },                    // laptop and mug
  { f: B.who.s, u: 0.3, v: 0.3, k: 1.2 },              // the owner
];
const K3: Focus[] = [
  { f: 0, u: 0.65, v: 0.5, k: 1.25 },                  // evening desk: the mug
  { f: B.catch.s, u: 0.7, v: 0.6, k: 1.3 },            // the keys
  { f: B.payoff.s, u: 0.5, v: 0.5, k: 1.0 },           // wide
];

const CAPS: Cap[] = [
  { at: B.hook.s, l1: '9% tax on profit?', l2: 'a small corporation in Manitoba', until: B.loop.s - 2 },
  { at: B.loop.s, l1: 'The small business', l2: 'deduction', until: B.rate.s - 2 },
  { at: B.rate.s, l1: 'The low rate', l2: 'first $500,000', until: B.general.s - 2 },
  { at: B.general.s, l1: 'Above the limit', l2: 'the general rate', until: B.example.s - 2 },
  { at: B.example.s, l1: 'Example', l2: '$120,000 of profit', until: B.who.s - 2 },
  { at: B.who.s, l1: 'Who gets it', l2: 'CCPCs · active business', until: B.traps.s - 2 },
  { at: B.traps.s, l1: 'Two traps', l2: 'passive income · incorporated employee', until: B.catch.s - 2 },
  { at: B.catch.s, l1: 'The catch', l2: 'dividends are taxed personally', until: B.payoff.s - 2 },
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

// persistent strip: the key figures tick on
const Strip = ({ f }: { f: number }) => {
  const show = ease(f, B.rate.s + 10, B.rate.s + 22) * (1 - ease(f, B.payoff.s - 6, B.payoff.s + 6));
  if (show <= 0) return null;
  const items: [number, React.ReactNode][] = [
    [at('rate', 0.45), <><span style={{ color: C.soft, fontWeight: 600 }}>small business</span><span style={{ color: C.gold }}>9%</span></>],
    [at('rate', 0.2), <><span style={{ color: C.soft, fontWeight: 600 }}>limit</span><span style={{ color: C.gold }}>$500,000</span></>],
    [at('general', 0.5), <><span style={{ color: C.soft, fontWeight: 600 }}>general</span><span style={{ color: C.gold }}>27%</span></>],
    [at('who', 0.4), <><span style={{ color: C.green }}>✓</span>CCPC · active income</>],
    [at('traps', 0.25), <><span style={{ color: C.red }}>✗</span>passive over $50K shrinks it</>],
  ];
  return (
    <div style={{ position: 'absolute', left: 80, top: 690, display: 'flex', gap: 10, flexWrap: 'wrap', width: 920, opacity: show }}>
      {items.sort((x, y) => x[0] - y[0]).map(([a, node], i) => { const on = ease(f, a, a + 10); return on > 0 ? <div key={i} style={{ ...pill, fontSize: 20, padding: '10px 18px', opacity: on, transform: `scale(${0.9 + 0.1 * on})` }}>{node}</div> : null; })}
    </div>
  );
};

export const C3v2 = () => {
  const f = useCurrentFrame();
  const end = ease(f, B.payoff.s + 2, B.payoff.s + 20);
  const lift = 1 - ease(f, B.payoff.s - 6, B.payoff.s + 6);
  return (
    <AbsoluteFill style={{ background: '#0d0b09', fontFamily: SANS, overflow: 'hidden' }}>
      <SceneCuts f={f} cuts={CUTS} scene={(i) => i === 0 ? (
        <PhotoPlate f={f} src="plates/c3-s1-4k.jpg" iw={2294} ih={4096} keys={K1} glide={40} blur={0.8} steam={{ u: 0.7, v: 0.52, w: 0.06 }}>
          <Pin f={f} a={at('rate', 0.5)} b={B.general.s} p={FOLDERS} top="FIRST $500,000 · MANITOBA" big="9%" sub="federal 9% + Manitoba 0%" />
        </PhotoPlate>
      ) : i === 1 ? (
        <PhotoPlate f={f} src="plates/c3-4k.jpg" iw={2294} ih={4096} keys={K2} glide={40} blur={0.8} steam={{ u: 0.67, v: 0.55, w: 0.06 }}>
          <Pin f={f} a={at('example', 0.55)} b={B.who.s} p={LAPTOP} top="PROFIT $120,000" big="≈ $10,800 tax" sub="vs $32,400 at 27%" />
        </PhotoPlate>
      ) : (
        <PhotoPlate f={f} src="plates/c3-s3-4k.jpg" iw={2294} ih={4096} keys={K3} glide={40} blur={0.8} steam={{ u: 0.73, v: 0.59, w: 0.06 }}>
          <Pin f={f} a={at('traps', 0.3)} b={B.catch.s} p={MUG3} top="PASSIVE INCOME OVER $50,000" big="limit shrinks" sub="gone at $150,000" col={C.red} />
          <Pin f={f} a={at('catch', 0.5)} b={B.payoff.s} p={KEYS3} top="DIVIDENDS TO YOU" big="taxed personally" col={C.cream} />
        </PhotoPlate>
      )} />
      <AbsoluteFill style={{ background: 'linear-gradient(180deg, rgba(8,6,4,.82) 0%, rgba(8,6,4,.55) 14%, rgba(8,6,4,0) 28%, rgba(8,6,4,0) 50%, rgba(8,6,4,.55) 66%, rgba(8,6,4,.8) 100%)', opacity: 1 - 0.75 * lift }} />
      <AbsoluteFill style={{ background: 'linear-gradient(180deg, rgba(8,6,4,.82) 0%, rgba(8,6,4,.55) 14%, rgba(8,6,4,0) 28%, rgba(8,6,4,0) 100%)', opacity: 0.75 * lift }} />
      <Header f={f} chip="CORPORATIONS · 2026" />
      <Typed f={f} caps={CAPS} head={HEAD} />
      <Strip f={f} />

      <Card f={f} a={B.rate.s} b={B.general.s} label="SMALL BUSINESS DEDUCTION · MANITOBA" top={360} h={300}>
        <Hero f={f} a={at('rate', 0.45)} size={110}>9%</Hero>
        <Line f={f} a={at('rate', 0.15)} top={232} size={26} color={C.soft}>on the first $500,000 of active business income</Line>
      </Card>
      <Card f={f} a={B.general.s} b={B.example.s} label="ABOVE $500,000 · GENERAL RATE" top={360} h={300} tone="red">
        <Hero f={f} a={at('general', 0.4)} size={110}>27%</Hero>
        <Line f={f} a={at('general', 0.55)} top={232} size={28} color={C.soft}>federal 15% + Manitoba 12%</Line>
      </Card>
      <Card f={f} a={B.example.s} b={B.who.s} label="EXAMPLE · $120,000 OF PROFIT" top={360} h={300}>
        <Hero f={f} a={at('example', 0.5)} size={110}>$10,800</Hero>
        <Line f={f} a={at('example', 0.75)} top={232} size={28} color={C.soft}>at 9% · at 27% it would be $32,400</Line>
      </Card>
      <Card f={f} a={B.who.s} b={B.traps.s} label="WHO GETS IT" top={360} h={300} tone="green">
        <Line f={f} a={at('who', 0.05)} top={98} size={30}>✓ a Canadian-controlled private corporation</Line>
        <Line f={f} a={at('who', 0.5)} top={152} size={30}>✓ earning active business income</Line>
        <Line f={f} a={at('who', 0.75)} top={206} size={30}>✓ associated companies share one limit</Line>
      </Card>
      <Card f={f} a={B.traps.s} b={B.catch.s} label="TWO TRAPS" top={360} h={300} tone="red">
        <Line f={f} a={at('traps', 0.08)} top={98} size={30}><span style={{ color: C.gold }}>Passive income over $50,000:</span></Line>
        <Line f={f} a={at('traps', 0.2)} top={140} size={26} color={C.soft}>the limit drops $5 per $1, to zero at $150,000</Line>
        <Line f={f} a={at('traps', 0.55)} top={192} size={30}><span style={{ color: C.gold }}>Incorporated employee</span> (personal</Line>
        <Line f={f} a={at('traps', 0.55)} top={232} size={30}>services business): no deduction</Line>
      </Card>
      <Card f={f} a={B.catch.s} b={B.payoff.s} label="THE CATCH" top={360} h={300}>
        <Line f={f} a={at('catch', 0.08)} top={104} serif head={HEAD} size={48}>A deferral, not a gift.</Line>
        <Line f={f} a={at('catch', 0.45)} top={174} size={32} color={C.soft}>Dividends you take out are taxed personally.</Line>
      </Card>

      {f >= B.payoff.s && (
        <div style={{ position: 'absolute', left: 80, right: 80, top: 1010, opacity: end, transform: `translateY(${(1 - end) * 40}px)` }}>
          <Flag f={f} w={150} amp={0.06} />
          <div style={{ marginTop: 26, fontFamily: HEAD, fontSize: 48, fontWeight: 900, lineHeight: 1.2, color: C.cream, textShadow: shade }}>9% inside the company.<br />Tax again on the way out.</div>
          <div style={{ marginTop: 34, display: 'inline-flex', padding: '20px 32px', borderRadius: 999, background: 'linear-gradient(160deg,#fff1c2,#f1c75b 50%,#c88f1f)', color: '#2b1d03', fontSize: 34, fontWeight: 900, boxShadow: '0 16px 30px rgba(0,0,0,.4)', opacity: ease(f, B.cta.s - 4, B.cta.s + 8), transform: `scale(${1 + 0.03 * Math.sin(TAU * (f - B.cta.s) / 36)})` }}>Next: why only half of a gain is taxed →</div>
          <div style={{ marginTop: 12, fontSize: 26, fontWeight: 700, color: C.cream, textShadow: shade, opacity: ease(f, at('cta', 0.6), at('cta', 0.7)) }}>Follow so you don't miss it</div>
          <div style={{ marginTop: 28, fontSize: 19, fontWeight: 600, color: C.soft, lineHeight: 1.45, opacity: ease(f, B.payoff.s + 16, B.payoff.s + 30) }}>
            Source: canada.ca (CRA: corporation tax rates; small business deduction rules; Manitoba corporation tax) · gov.mb.ca · $120,000 is an example · general info, not advice
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
