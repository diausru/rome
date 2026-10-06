// "RRSP vs TFSA: how to decide" (topic D6, savings group) in the approved look. Mechanics, not investment advice.
// Master timeline = Grady voiceover (d6/vo-beats.json → tools/vo_hf.py → d6-timeline.json). Facts: d6/PRODUCTION-BIBLE.md.
// Plate: two identical coin jars on a desk (left = RRSP, right = TFSA); behind, a woman in a downtown apartment.
// The jars are the two accounts: their labels and the example amounts are pinned onto the real jars, so the cards
// sit at the top and the jars stay visible. Savings group type: Mont headings.
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { PhotoPlate, type Focus } from './Plate';
import { Flag } from './RaiseShort';
import TL from './d6-timeline.json';
import { C, SANS, Card, Grades, Header, Hero, Line, Typed, beatsFrom, clamp, ease, money, pill, shade, type Cap } from './Kit';

export const D6FPS = 24, D6DUR = 1428;
const HEAD = SANS;
const TAU = Math.PI * 2;
const B = beatsFrom(TL, D6FPS);
const at = (id: string, fr: number) => Math.round(B[id].s + (B[id].e - B[id].s) * fr);

const KEYS: Focus[] = [
  { f: 0, u: 0.47, v: 0.62, k: 1.15 },            // both jars
  { f: B.loop.s, u: 0.53, v: 0.34, k: 1.2 },      // the woman deciding
  { f: B.rrsp.s, u: 0.36, v: 0.62, k: 1.25 },     // RRSP jar
  { f: B.tfsa.s, u: 0.6, v: 0.62, k: 1.25 },      // TFSA jar
  { f: B.example.s, u: 0.47, v: 0.62, k: 1.1 },   // both jars
  { f: B.limits.s, u: 0.72, v: 0.32, k: 1.15 },   // the skyline
  { f: B.payoff.s, u: 0.5, v: 0.5, k: 1.0 },      // wide
];

const CAPS: Cap[] = [
  { at: B.hook.s, l1: 'RRSP or TFSA?', l2: 'one question decides it', until: B.loop.s - 2 },
  { at: B.loop.s, l1: 'Your tax rate', l2: 'now vs later', until: B.rrsp.s - 2 },
  { at: B.rrsp.s, l1: 'RRSP', l2: 'tax break now, tax later', until: B.tfsa.s - 2 },
  { at: B.tfsa.s, l1: 'TFSA', l2: 'tax now, tax-free later', until: B.example.s - 2 },
  { at: B.example.s, l1: 'One example', l2: '$1,000 of income, it doubles', until: B.verdict.s - 2 },
  { at: B.verdict.s, l1: 'The deciding question', l2: 'your rate later vs now', until: B.limits.s - 2 },
  { at: B.limits.s, l1: '2026 limits', l2: 'check your own room', until: B.payoff.s - 2 },
];

// example arithmetic (illustration): $1,000 of pre-tax income, 30% rate in and out, money doubles
const R = 0.3, G = 2;
const rrspAmt = (p: number) => (p < 1 ? 1000 : p < 2 ? 1000 * G : 1000 * G * (1 - R));
const tfsaAmt = (p: number) => (p < 0.5 ? 1000 : p < 1 ? 1000 * (1 - R) : 1000 * (1 - R) * G);

const Pin = ({ u, v, name, big, sub, col, o }: { u: number; v: number; name: string; big?: string; sub?: string; col: string; o: number }) => (
  <div style={{ position: 'absolute', left: `${u * 100}%`, top: `${v * 100}%`, transform: `translate(-50%, calc(-100% - ${18 + (1 - o) * 30}px))`, opacity: o, textAlign: 'center' }}>
    <div style={{ ...pill, flexDirection: 'column', gap: 2, padding: '14px 24px', borderRadius: 22, minWidth: 150 }}>
      <span style={{ fontSize: 22, color: C.gold, fontWeight: 900, letterSpacing: 4 }}>{name}</span>
      {big && <span style={{ fontSize: 40, fontWeight: 900, color: col, fontVariantNumeric: 'tabular-nums' }}>{big}</span>}
      {sub && <span style={{ fontSize: 18, fontWeight: 700, color: C.soft }}>{sub}</span>}
    </div>
    <div style={{ width: 2, height: 22, margin: '0 auto', background: 'rgba(247,241,230,.7)' }} />
  </div>
);

export const D6v2 = () => {
  const f = useCurrentFrame();
  const end = ease(f, B.payoff.s + 2, B.payoff.s + 20);
  const pinsOn = ease(f, at('hook', 0.45), at('hook', 0.6)) * (1 - ease(f, B.limits.s - 8, B.limits.s));
  // example phases: 0..0.5 earn, 0.5..1 TFSA taxed going in, 1..2 doubled, 2..3 RRSP taxed coming out
  const ph = f < B.example.s ? -1 : clamp((f - at('example', 0.08)) / (at('example', 0.7) - at('example', 0.08))) * 3;
  const inEx = f >= B.example.s - 2 && f < B.verdict.s + 999;
  const rr = inEx ? rrspAmt(ph < 0 ? 0 : ph < 1.5 ? 0 : ph < 2.4 ? 1.5 : 2.5) : 0;
  const tf = inEx ? tfsaAmt(ph < 0.5 ? 0 : ph < 1.5 ? 0.6 : 1.5) : 0;
  const both = ph >= 2.4;
  return (
    <AbsoluteFill style={{ background: '#0d0b09', fontFamily: SANS, overflow: 'hidden' }}>
      <PhotoPlate f={f} src="plates/d6-4k.jpg" iw={2294} ih={4096} keys={KEYS} glide={40} blur={0.8}>
        {pinsOn > 0 && <>
          <Pin u={0.345} v={0.583} name="RRSP" o={pinsOn} col={both ? C.green : C.cream}
            big={f >= B.example.s ? money(rr) : undefined}
            sub={f < B.example.s ? (f >= B.rrsp.s && f < B.tfsa.s ? 'deduct now · taxed out' : undefined) : ph < 1.5 ? 'deducted, full amount in' : ph < 2.4 ? 'doubled' : '−30% tax coming out'} />
          <Pin u={0.605} v={0.583} name="TFSA" o={pinsOn} col={both ? C.green : C.cream}
            big={f >= B.example.s ? money(tf) : undefined}
            sub={f < B.example.s ? (f >= B.tfsa.s ? 'taxed in · tax-free out' : undefined) : ph < 0.5 ? 'earned' : ph < 1.5 ? '−30% tax going in' : ph < 2.4 ? 'doubled' : 'tax-free out'} />
        </>}
      </PhotoPlate>
      <Grades />
      <Header f={f} chip="RRSP · TFSA · 2026" />
      <Typed f={f} caps={CAPS} head={HEAD} />

      <Card f={f} a={B.hook.s} b={B.rrsp.s} label="RRSP VS TFSA" top={360} h={300}>
        <Line f={f} a={at('hook', 0.2)} top={104} serif head={HEAD} size={52}>One question decides it.</Line>
        <Line f={f} a={B.loop.s} top={186} size={34} color={C.gold}>Your tax rate: now vs later.</Line>
      </Card>
      <Card f={f} a={B.rrsp.s} b={B.tfsa.s} label="RRSP · REGISTERED RETIREMENT SAVINGS PLAN" top={360} h={300}>
        <Line f={f} a={at('rrsp', 0.12)} top={104} serif head={HEAD} size={46}>Deducted now.</Line>
        <Line f={f} a={at('rrsp', 0.25)} top={162} size={28} color={C.green}>you save tax this year</Line>
        <Line f={f} a={at('rrsp', 0.6)} top={206} serif head={HEAD} size={46}>Taxed when it comes out.</Line>
      </Card>
      <Card f={f} a={B.tfsa.s} b={B.example.s} label="TFSA · TAX-FREE SAVINGS ACCOUNT" top={360} h={300}>
        <Line f={f} a={at('tfsa', 0.08)} top={104} serif head={HEAD} size={40}>No deduction going in.</Line>
        <Line f={f} a={at('tfsa', 0.35)} top={156} serif head={HEAD} size={40}>Growth + withdrawals: tax-free.</Line>
        <Line f={f} a={at('tfsa', 0.72)} top={226} size={26} color={C.soft}>withdrawals come back as room on Jan 1 next year</Line>
      </Card>
      <Card f={f} a={B.example.s} b={B.verdict.s} label="EXAMPLE · 30% IN AND OUT · MONEY ×2" top={360} h={300}>
        <Line f={f} a={at('example', 0.1)} top={98} size={30} color={C.soft}>RRSP: $1,000 → $2,000 → −30% = $1,400</Line>
        <Line f={f} a={at('example', 0.3)} top={146} size={30} color={C.soft}>TFSA: −30% = $700 → $1,400 tax-free</Line>
        <Hero f={f} a={at('example', 0.8)} top={186} size={72} line={false}>Same: $1,400</Hero>
      </Card>
      <Card f={f} a={B.verdict.s} b={B.limits.s} label="IT DEPENDS ON YOUR RATE LATER" top={360} h={300}>
        <Line f={f} a={at('verdict', 0.05)} top={98} serif head={HEAD} size={40}>Lower rate later → <span style={{ color: C.green }}>RRSP ahead</span></Line>
        <Line f={f} a={at('verdict', 0.2)} top={148} size={24} color={C.soft}>e.g. 20% later: RRSP {money(1000 * G * 0.8)} vs TFSA {money(1400)}</Line>
        <Line f={f} a={at('verdict', 0.6)} top={196} serif head={HEAD} size={40}>Higher rate later → <span style={{ color: C.green }}>TFSA ahead</span></Line>
        <Line f={f} a={at('verdict', 0.72)} top={246} size={24} color={C.soft}>e.g. 40% later: RRSP {money(1000 * G * 0.6)} vs TFSA {money(1400)}</Line>
      </Card>
      <Card f={f} a={B.limits.s} b={B.payoff.s} label="2026 LIMITS" top={360} h={300}>
        <Hero f={f} a={at('limits', 0.2)} out={at('limits', 0.5)} size={110}>$7,000</Hero>
        <Hero f={f} a={at('limits', 0.56)} size={110}>$33,810</Hero>
        <Line f={f} a={at('limits', 0.22)} top={232} size={26} color={C.soft}>{f < at('limits', 0.54) ? 'TFSA dollar limit for 2026, plus unused room' : 'RRSP max: 18% of last year’s earned income, up to this'}</Line>
      </Card>

      {f >= B.payoff.s && (
        <div style={{ position: 'absolute', left: 80, right: 80, top: 1010, opacity: end, transform: `translateY(${(1 - end) * 40}px)` }}>
          <Flag f={f} w={150} amp={0.06} />
          <div style={{ marginTop: 26, fontFamily: HEAD, fontSize: 60, fontWeight: 900, lineHeight: 1.06, color: C.cream, textShadow: shade }}>Not "which is better."<br />Which fits your tax rate.</div>
          <div style={{ marginTop: 34, display: 'inline-flex', padding: '20px 32px', borderRadius: 999, background: 'linear-gradient(160deg,#fff1c2,#f1c75b 50%,#c88f1f)', color: '#2b1d03', fontSize: 34, fontWeight: 900, boxShadow: '0 16px 30px rgba(0,0,0,.4)', opacity: ease(f, B.cta.s - 4, B.cta.s + 8), transform: `scale(${1 + 0.03 * Math.sin(TAU * (f - B.cta.s) / 36)})` }}>Follow for the real math</div>
          <div style={{ marginTop: 28, fontSize: 19, fontWeight: 600, color: C.soft, lineHeight: 1.45, opacity: ease(f, B.payoff.s + 16, B.payoff.s + 30) }}>
            Source: canada.ca (CRA) · the example is an illustration (30% rate, money doubles) · mechanics, not investment advice · general info, not advice
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
