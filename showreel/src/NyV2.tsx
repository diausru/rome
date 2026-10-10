// "Down on a stock? Sell by December 30" (New Year extra, Dec 29) in the approved look (Kit + Plate).
// Master timeline = Grady voiceover (ny/vo-beats.json → tools/vo_hf.py → ny-timeline.json). Facts: ny/PRODUCTION-BIBLE.md.
// Three photo scenes of the same Toronto apartment (CN Tower outside), each shown once, joined by SceneCuts:
// 1) late-December evening at the laptop (the idea, the rule); 2) the morning of Dec 30 with paper and a calculator
// (example, settlement date); 3) New Year's Eve with her husband, fireworks (the spouse trap, TFSA/RRSP, payoff). Mont (SANS).
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { PhotoPlate, SceneCuts, type Focus } from './Plate';
import { Flag } from './RaiseShort';
import TL from './ny-timeline.json';
import { C, SANS, Card, Header, Hero, Line, Typed, beatsFrom, ease, pill, shade, type Cap } from './Kit';

export const NYFPS = 24;
const B = beatsFrom(TL, NYFPS);
export const NYDUR = Math.ceil((TL.total + 0.5) * NYFPS);
const HEAD = SANS;
const TAU = Math.PI * 2;
const at = (id: string, fr: number) => Math.round(B[id].s + (B[id].e - B[id].s) * fr);

// scene changes where the meaning changes: the numbers (scene 2), the spouse and the new year (scene 3)
const CUTS = [B.example.s, B.trap.s];
// object positions per plate (image coordinates; CALC2 is the calculator's base, the pill hangs below it)
const CALC2 = { u: 0.4, v: 0.79 };

const K1: Focus[] = [
  { f: 0, u: 0.5, v: 0.32, k: 1.3 },                   // her face, thinking
  { f: B.hook.s + 70, u: 0.55, v: 0.5, k: 1.18 },      // the desk, the laptop
  { f: B.rule.s + 20, u: 0.62, v: 0.25, k: 1.22 },     // snow over the skyline
];
const K2: Focus[] = [
  { f: 0, u: 0.45, v: 0.36, k: 1.25 },                 // morning: writing
  { f: B.example.s + 60, u: 0.45, v: 0.6, k: 1.15 },   // paper, calculator
  { f: B.date.s, u: 0.6, v: 0.3, k: 1.2 },             // the window: the year is ending
];
const K3: Focus[] = [
  { f: 0, u: 0.58, v: 0.44, k: 1.22 },                 // the couple, glasses raised (cards sit low in this scene)
  { f: B.tfsa.s, u: 0.45, v: 0.45, k: 1.12 },          // the couple and the table
  { f: B.payoff.s, u: 0.5, v: 0.5, k: 1.0 },           // wide: fireworks
];
const SNOW1 = [{ u0: 0.5, v0: 0.0, u1: 0.95, v1: 0.3 }];
const SNOW2 = [{ u0: 0.5, v0: 0.0, u1: 0.7, v1: 0.3 }];

const CAPS: Cap[] = [
  { at: B.hook.s, l1: 'Down on a stock?', l2: 'the December 30 deadline', until: B.rule.s - 2 },
  { at: B.rule.s, l1: 'The rule', l2: 'losses offset gains', until: B.example.s - 2 },
  { at: B.example.s, l1: 'Example', l2: 'one winner, one loser', until: B.date.s - 2 },
  { at: B.date.s, l1: 'Why the 30th?', l2: 'settlement sets the year', until: B.trap.s - 2 },
  { at: B.trap.s, l1: 'The trap', l2: 'buying it back', until: B.acb.s - 2 },
  { at: B.acb.s, l1: 'Not gone', l2: 'it moves into the cost', until: B.tfsa.s - 2 },
  { at: B.tfsa.s, l1: 'TFSA · RRSP', l2: 'no loss to claim', until: B.payoff.s - 2 },
];

// below: the pill hangs under the anchor (the space above the object belongs to the card and strip)
const Pin = ({ f, a, b, p, top, big, sub, col = C.gold, below }: { f: number; a: number; b: number; p: { u: number; v: number }; top: string; big: string; sub?: string; col?: string; below?: boolean }) => {
  const o = ease(f, a, a + 12) * (1 - ease(f, b - 8, b));
  if (o <= 0) return null;
  const stem = <div style={{ width: 2, height: 22, margin: '0 auto', background: 'rgba(247,241,230,.7)' }} />;
  return (
    <div style={{ position: 'absolute', left: `${p.u * 100}%`, top: `${p.v * 100}%`, transform: below ? `translate(-50%, ${6 + (1 - o) * 30}px)` : `translate(-50%, calc(-100% - ${18 + (1 - o) * 30}px))`, opacity: o, textAlign: 'center' }}>
      {below && stem}
      <div style={{ ...pill, flexDirection: 'column', gap: 2, padding: '14px 24px', borderRadius: 22, whiteSpace: 'nowrap' }}>
        <span style={{ fontSize: 20, color: C.soft, fontWeight: 700, letterSpacing: 3 }}>{top}</span>
        <span style={{ fontSize: 40, fontWeight: 900, color: col }}>{big}</span>
        {sub && <span style={{ fontSize: 18, fontWeight: 700, color: C.soft }}>{sub}</span>}
      </div>
      {!below && stem}
    </div>
  );
};

// persistent strip: the year-end checklist builds up (in scene 3 it moves under the low card, off the couple's faces)
const Strip = ({ f }: { f: number }) => {
  const show = ease(f, B.rule.s, B.rule.s + 12) * (1 - ease(f, B.payoff.s - 6, B.payoff.s + 6));
  if (show <= 0) return null;
  const items: [number, React.ReactNode][] = [
    [at('rule', 0.5), <><span style={{ color: C.gold }}>1</span>losses offset gains only</>],
    [at('example', 0.8), <><span style={{ color: C.gold }}>2</span>½ of the net gain taxed</>],
    [at('date', 0.6), <><span style={{ color: C.gold }}>3</span>sell by Dec 30 (T+1)</>],
    [at('trap', 0.7), <><span style={{ color: C.red }}>✕</span>buy back within 30 days</>],
    [at('tfsa', 0.6), <><span style={{ color: C.red }}>✕</span>losses in a TFSA / RRSP</>],
  ];
  return (
    <div style={{ position: 'absolute', left: 80, top: f >= B.trap.s ? 1470 : 690, display: 'flex', gap: 10, flexWrap: 'wrap', width: 920, opacity: show }}>
      {items.map(([a, node], i) => { const on = ease(f, a, a + 10); return on > 0 ? <div key={i} style={{ ...pill, fontSize: 20, padding: '10px 18px', opacity: on, transform: `scale(${0.9 + 0.1 * on})` }}>{node}</div> : null; })}
    </div>
  );
};

export const NyV2 = () => {
  const f = useCurrentFrame();
  const end = ease(f, B.payoff.s + 2, B.payoff.s + 20);
  const lift = 1 - ease(f, B.payoff.s - 6, B.payoff.s + 6);
  return (
    <AbsoluteFill style={{ background: '#0d0b09', fontFamily: SANS, overflow: 'hidden' }}>
      <SceneCuts f={f} cuts={CUTS} scene={(i) => i === 0 ? (
        <PhotoPlate f={f} src="plates/ny-s1-4k.jpg" iw={2294} ih={4096} keys={K1} glide={40} blur={0.8} snow={SNOW1} steam={{ u: 0.22, v: 0.62, w: 0.05 }} />
      ) : i === 1 ? (
        <PhotoPlate f={f} src="plates/ny-s2-4k.jpg" iw={2294} ih={4096} keys={K2} glide={40} blur={0.8} snow={SNOW2} steam={{ u: 0.13, v: 0.61, w: 0.05 }}>
          <Pin f={f} a={at('example', 0.8)} b={B.date.s} p={CALC2} top="TAXABLE" big="$2,000" sub="instead of $6,000" below />
        </PhotoPlate>
      ) : (
        <PhotoPlate f={f} src="plates/ny-s3-4k.jpg" iw={2294} ih={4096} keys={K3} glide={40} blur={0.8}>
          {/* the generated bottle carried pseudo-lettering on its neck: soften that patch like foreground defocus */}
          <div style={{ position: 'absolute', left: '8.5%', top: '59.5%', width: '11.5%', height: '12.5%', borderRadius: '40%', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', maskImage: 'radial-gradient(closest-side, #000 65%, transparent)', WebkitMaskImage: 'radial-gradient(closest-side, #000 65%, transparent)' }} />
        </PhotoPlate>
      )} />
      <AbsoluteFill style={{ background: 'linear-gradient(180deg, rgba(8,6,4,.82) 0%, rgba(8,6,4,.55) 14%, rgba(8,6,4,0) 28%, rgba(8,6,4,0) 50%, rgba(8,6,4,.55) 66%, rgba(8,6,4,.8) 100%)', opacity: 1 - 0.75 * lift }} />
      <AbsoluteFill style={{ background: 'linear-gradient(180deg, rgba(8,6,4,.82) 0%, rgba(8,6,4,.55) 14%, rgba(8,6,4,0) 28%, rgba(8,6,4,0) 100%)', opacity: 0.75 * lift }} />
      <Header f={f} chip="CRA · YEAR-END · STOCKS" />
      <Typed f={f} caps={CAPS} head={HEAD} />
      <Strip f={f} />

      <Card f={f} a={B.rule.s} b={B.example.s} label="CAPITAL LOSSES" top={360} h={300}>
        <Hero f={f} a={at('rule', 0.3)} size={100}>offset gains</Hero>
        <Line f={f} a={at('rule', 0.65)} top={232} size={22} color={C.soft}>only capital gains · not your salary or other income</Line>
      </Card>
      <Card f={f} a={B.example.s} b={B.date.s} label="EXAMPLE · ONE WINNER, ONE LOSER" top={360} h={300}>
        <Line f={f} a={at('example', 0.1)} top={92} size={30} color={C.soft}>gain $12,000 − loss $8,000</Line>
        <Hero f={f} a={at('example', 0.5)} top={128} size={96}>$4,000 net</Hero>
        <Line f={f} a={at('example', 0.78)} top={236} size={22} color={C.soft}>taxable half: $2,000 instead of $6,000 without the sale</Line>
      </Card>
      <Card f={f} a={B.date.s} b={B.trap.s} label="WHY DECEMBER 30 (2026)" top={360} h={300}>
        <Line f={f} a={at('date', 0.15)} top={92} size={30} color={C.soft}>trades settle one business day later</Line>
        <Hero f={f} a={at('date', 0.55)} top={128} size={96}>Dec 30 → 31</Hero>
        <Line f={f} a={at('date', 0.75)} top={236} size={22} color={C.soft}>settlement sets the tax year · a Dec 31 trade settles in 2027</Line>
      </Card>
      <Card f={f} a={B.trap.s} b={B.acb.s} label="THE TRAP · SUPERFICIAL LOSS" top={1150} h={300} tone="red">
        <Line f={f} a={at('trap', 0.12)} top={92} size={30} color={C.soft}>bought back 30 days before or after</Line>
        <Hero f={f} a={at('trap', 0.85)} top={128} size={96}>loss denied</Hero>
        <Line f={f} a={at('trap', 0.55)} top={236} size={22} color={C.soft}>by you or an affiliated person, like your spouse · still held 30 days after</Line>
      </Card>
      <Card f={f} a={B.acb.s} b={B.tfsa.s} label="NOT GONE" top={1150} h={300} tone="green">
        <Hero f={f} a={at('acb', 0.35)} size={88}>added to cost</Hero>
        <Line f={f} a={at('acb', 0.6)} top={232} size={22} color={C.soft}>usually added to the cost of the shares bought back</Line>
      </Card>
      <Card f={f} a={B.tfsa.s} b={B.payoff.s} label="INSIDE A TFSA OR RRSP" top={1150} h={300} tone="red">
        <Hero f={f} a={at('tfsa', 0.55)} size={88}>no loss to claim</Hero>
        <Line f={f} a={at('tfsa', 0.75)} top={232} size={22} color={C.soft}>losses inside registered plans can't be deducted</Line>
      </Card>

      {f >= B.payoff.s && (
        <div style={{ position: 'absolute', left: 80, right: 80, top: 1000, opacity: end, transform: `translateY(${(1 - end) * 40}px)` }}>
          <Flag f={f} w={150} amp={0.06} />
          <div style={{ marginTop: 26, fontFamily: HEAD, fontSize: 56, fontWeight: 900, lineHeight: 1.1, color: C.cream, textShadow: shade }}>Check your gains<br />before <span style={{ color: C.gold }}>December 30</span>.</div>
          <div style={{ marginTop: 34, display: 'inline-flex', padding: '20px 32px', borderRadius: 999, background: 'linear-gradient(160deg,#fff1c2,#f1c75b 50%,#c88f1f)', color: '#2b1d03', fontSize: 34, fontWeight: 900, boxShadow: '0 16px 30px rgba(0,0,0,.4)', opacity: ease(f, B.cta.s - 4, B.cta.s + 8), transform: `scale(${1 + 0.03 * Math.sin(TAU * (f - B.cta.s) / 36)})` }}>Next: investments outside Canada →</div>
          <div style={{ marginTop: 12, fontSize: 26, fontWeight: 700, color: C.cream, textShadow: shade, opacity: ease(f, at('cta', 0.6), at('cta', 0.7)) }}>Follow so you don't miss it</div>
          <div style={{ marginTop: 28, fontSize: 19, fontWeight: 600, color: C.soft, lineHeight: 1.45, opacity: ease(f, B.payoff.s + 16, B.payoff.s + 30) }}>
            Source: canada.ca (CRA: Capital losses; superficial loss; T4037) · CRA 2012-0468931C6 (settlement date) · CSA: T+1 since 2024 · example only · confirm with your broker · general info, not advice
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
