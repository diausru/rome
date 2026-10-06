// "Manitoba Renters Affordability Tax Credit (2026)" (topic H2, provincial / benefits group) in the approved look.
// Master timeline = Grady voiceover (h2/vo-beats.json → tools/vo_hf.py → h2-timeline.json). Facts: h2/PRODUCTION-BIBLE.md.
// Plate: a rented apartment in an older red-brick Winnipeg building, snow outside; a renter hangs her coat by the door;
// on the table, apartment keys, an unmarked envelope, coffee, a succulent. Amounts are pinned onto the real objects.
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { PhotoPlate, type Focus } from './Plate';
import { Flag } from './RaiseShort';
import TL from './h2-timeline.json';
import { C, SANS, SERIF, Card, Header, Hero, Line, Typed, beatsFrom, ease, pill, shade, type Cap } from './Kit';

export const H2FPS = 24;
const B = beatsFrom(TL, H2FPS);
export const H2DUR = Math.ceil((TL.total + 0.5) * H2FPS);
const TAU = Math.PI * 2;
const at = (id: string, fr: number) => Math.round(B[id].s + (B[id].e - B[id].s) * fr);

const KEYS_ = { u: 0.3, v: 0.75 }, ENV = { u: 0.68, v: 0.7 }, CUP = { u: 0.37, v: 0.545 };

const KEYS: Focus[] = [
  { f: 0, u: 0.7, v: 0.3, k: 1.2 },                   // the renter at the door
  { f: B.loop.s, u: 0.4, v: 0.2, k: 1.15 },           // snowy Winnipeg street through the window
  { f: B.amount.s, u: 0.6, v: 0.72, k: 1.18 },        // the envelope
  { f: B.who.s, u: 0.7, v: 0.32, k: 1.15 },           // the renter
  { f: B.months.s, u: 0.32, v: 0.76, k: 1.25 },       // the keys
  { f: B.seniors.s, u: 0.4, v: 0.25, k: 1.12 },       // the window
  { f: B.claim.s, u: 0.66, v: 0.74, k: 1.22 },        // the envelope
  { f: B.payoff.s, u: 0.5, v: 0.5, k: 1.0 },          // wide
];

const CAPS: Cap[] = [
  { at: B.hook.s, l1: 'Rent in Manitoba?', l2: "a credit you don't want to miss", until: B.loop.s - 2 },
  { at: B.loop.s, l1: 'It went up', l2: 'for the 2026 tax year', until: B.amount.s - 2 },
  { at: B.amount.s, l1: 'Renters Affordability', l2: 'Tax Credit', until: B.who.s - 2 },
  { at: B.who.s, l1: 'Who qualifies', l2: 'Manitoba renters', until: B.months.s - 2 },
  { at: B.months.s, l1: 'Moved this year?', l2: 'claim the months you rented', until: B.seniors.s - 2 },
  { at: B.seniors.s, l1: 'Seniors', l2: 'an extra top-up', until: B.claim.s - 2 },
  { at: B.claim.s, l1: 'How to claim', l2: 'form MB479', until: B.payoff.s - 2 },
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

const Strip = ({ f }: { f: number }) => {
  const show = ease(f, B.who.s, B.who.s + 12) * (1 - ease(f, B.payoff.s - 6, B.payoff.s + 6));
  if (show <= 0) return null;
  const items: [number, React.ReactNode][] = [
    [B.who.s, <><span style={{ color: C.soft, fontWeight: 600 }}>2026</span><span style={{ color: C.gold }}>up to $625</span></>],
    [at('seniors', 0.5), <><span style={{ color: C.soft, fontWeight: 600 }}>seniors</span><span style={{ color: C.gold }}>+ up to $357</span></>],
    [at('claim', 0.3), <><span style={{ color: C.green }}>✓</span>form MB479</>],
  ];
  return (
    <div style={{ position: 'absolute', left: 80, top: 690, display: 'flex', gap: 10, flexWrap: 'wrap', width: 920, opacity: show }}>
      {items.map(([a, node], i) => { const on = ease(f, a, a + 10); return on > 0 ? <div key={i} style={{ ...pill, fontSize: 20, padding: '10px 18px', opacity: on, transform: `scale(${0.9 + 0.1 * on})` }}>{node}</div> : null; })}
    </div>
  );
};

export const H2v2 = () => {
  const f = useCurrentFrame();
  const end = ease(f, B.payoff.s + 2, B.payoff.s + 20);
  const lift = 1 - ease(f, B.payoff.s - 6, B.payoff.s + 6);
  return (
    <AbsoluteFill style={{ background: '#0d0b09', fontFamily: SANS, overflow: 'hidden' }}>
      <PhotoPlate f={f} src="plates/h2-4k.jpg" iw={2294} ih={4096} keys={KEYS} glide={40} blur={0.8}
        snow={[{ u0: 0.01, v0: 0.01, u1: 0.22, v1: 0.33 }, { u0: 0.31, v0: 0.01, u1: 0.49, v1: 0.33 }]} steam={{ u: CUP.u, v: CUP.v, w: 0.06 }}>
        <Pin f={f} a={at('amount', 0.3)} b={B.who.s} p={ENV} top="RENTERS CREDIT · 2026" big="up to $625" sub="2025: up to $575" />
        <Pin f={f} a={at('months', 0.25)} b={B.seniors.s} p={KEYS_} top="MOVED IN 2026?" big="your months" sub="you rented in Manitoba" col={C.cream} />
        <Pin f={f} a={at('claim', 0.25)} b={B.payoff.s} p={ENV} top="CLAIM WITH YOUR RETURN" big="MB479" sub="Manitoba Credits form" col={C.green} />
      </PhotoPlate>
      <AbsoluteFill style={{ background: 'linear-gradient(180deg, rgba(8,6,4,.82) 0%, rgba(8,6,4,.55) 14%, rgba(8,6,4,0) 28%, rgba(8,6,4,0) 50%, rgba(8,6,4,.55) 66%, rgba(8,6,4,.8) 100%)', opacity: 1 - 0.75 * lift }} />
      <AbsoluteFill style={{ background: 'linear-gradient(180deg, rgba(8,6,4,.82) 0%, rgba(8,6,4,.55) 14%, rgba(8,6,4,0) 28%, rgba(8,6,4,0) 100%)', opacity: 0.75 * lift }} />
      <Header f={f} chip="MANITOBA · 2026" />
      <Typed f={f} caps={CAPS} />
      <Strip f={f} />

      <Card f={f} a={B.hook.s} b={B.amount.s} label="FOR MANITOBA RENTERS" top={360} h={300}>
        <Line f={f} a={at('hook', 0.45)} top={104} serif size={52}>A credit on your return.</Line>
        <Line f={f} a={B.loop.s} top={182} size={34} color={C.green}>And it went up for 2026.</Line>
      </Card>
      <Card f={f} a={B.amount.s} b={B.who.s} label="RENTERS AFFORDABILITY TAX CREDIT" top={360} h={300}>
        <Hero f={f} a={at('amount', 0.3)} size={110}>$625</Hero>
        <Line f={f} a={at('amount', 0.65)} top={232} size={28} color={C.soft}>maximum, 2026 tax year · was $575 for 2025</Line>
      </Card>
      <Card f={f} a={B.who.s} b={B.months.s} label="WHO QUALIFIES" top={360} h={300} tone="green">
        <Line f={f} a={at('who', 0.05)} top={98} size={32}>✓ Manitoba resident on December 31</Line>
        <Line f={f} a={at('who', 0.4)} top={152} size={32}>✓ 16 or older at year-end</Line>
        <Line f={f} a={at('who', 0.65)} top={206} size={32}>✓ paid rent on your main home in Manitoba</Line>
      </Card>
      <Card f={f} a={B.months.s} b={B.seniors.s} label="PART OF THE YEAR" top={360} h={300}>
        <Line f={f} a={at('months', 0.1)} top={104} serif size={48}>Claim the months</Line>
        <Line f={f} a={at('months', 0.3)} top={168} serif size={48}><span style={{ color: C.gold }}>you rented.</span></Line>
      </Card>
      <Card f={f} a={B.seniors.s} b={B.claim.s} label="SENIORS' TOP-UP · 2026" top={360} h={300}>
        <Hero f={f} a={at('seniors', 0.3)} size={110}>+ $357</Hero>
        <Line f={f} a={at('seniors', 0.2)} top={232} size={28} color={C.soft}>maximum, for eligible seniors</Line>
      </Card>
      <Card f={f} a={B.claim.s} b={B.payoff.s} label="HOW TO CLAIM" top={360} h={300}>
        <Line f={f} a={at('claim', 0.1)} top={104} serif size={48}>Form MB479</Line>
        <Line f={f} a={at('claim', 0.4)} top={174} size={30} color={C.soft}>with your tax return · keep your rent records</Line>
      </Card>

      {f >= B.payoff.s && (
        <div style={{ position: 'absolute', left: 80, right: 80, top: 1010, opacity: end, transform: `translateY(${(1 - end) * 40}px)` }}>
          <Flag f={f} w={150} amp={0.06} />
          <div style={{ marginTop: 26, fontFamily: SERIF, fontSize: 60, fontWeight: 800, lineHeight: 1.08, color: C.cream, textShadow: shade }}>File. Fill in MB479.<br />Get what's yours.</div>
          <div style={{ marginTop: 34, display: 'inline-flex', padding: '20px 32px', borderRadius: 999, background: 'linear-gradient(160deg,#fff1c2,#f1c75b 50%,#c88f1f)', color: '#2b1d03', fontSize: 34, fontWeight: 900, boxShadow: '0 16px 30px rgba(0,0,0,.4)', opacity: ease(f, B.cta.s - 4, B.cta.s + 8), transform: `scale(${1 + 0.03 * Math.sin(TAU * (f - B.cta.s) / 36)})` }}>Follow for the real math</div>
          <div style={{ marginTop: 28, fontSize: 19, fontWeight: 600, color: C.soft, lineHeight: 1.45, opacity: ease(f, B.payoff.s + 16, B.payoff.s + 30) }}>
            Source: gov.mb.ca (Manitoba Finance, Budget 2026 bulletin) · canada.ca (MB479 guide) · general info, not advice
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
