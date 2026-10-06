// "What makes an expense deductible" (topic A6, business group) in the approved look (Kit + Plate).
// Master timeline = Grady voiceover (a6/vo-beats.json → tools/vo_hf.py → a6-timeline.json). Facts: a6/PRODUCTION-BIBLE.md.
// Plate: a Main Street café-bakery; the self-employed owner behind the counter; on the front counter, the props ARE the
// examples: phone (business-use part), laptop + car keys (capital, claimed over time), coffee (meals 50%), folders (records).
// Cards sit at the top; each rule is pinned onto its real object. A slim checklist strip ticks the four tests.
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { PhotoPlate, type Focus } from './Plate';
import { Flag } from './RaiseShort';
import TL from './a6-timeline.json';
import { C, SANS, Card, Header, Hero, Line, Typed, beatsFrom, ease, pill, shade, type Cap } from './Kit';

export const A6FPS = 24;
const B = beatsFrom(TL, A6FPS);
export const A6DUR = Math.ceil((TL.total + 0.5) * A6FPS);
const HEAD = SANS;
const TAU = Math.PI * 2;
const at = (id: string, fr: number) => Math.round(B[id].s + (B[id].e - B[id].s) * fr);

const KEYS: Focus[] = [
  { f: 0, u: 0.32, v: 0.38, k: 1.2 },               // the owner
  { f: B.loop.s, u: 0.5, v: 0.72, k: 1.08 },        // the counter
  { f: B.rule.s, u: 0.35, v: 0.42, k: 1.15 },       // the owner at work
  { f: B.split.s, u: 0.4, v: 0.8, k: 1.22 },       // the phone
  { f: B.capital.s, u: 0.48, v: 0.76, k: 1.1 },     // laptop + keys
  { f: B.meals.s, u: 0.7, v: 0.68, k: 1.25 },       // the coffee
  { f: B.employee.s, u: 0.32, v: 0.38, k: 1.18 },   // the owner
  { f: B.proof.s, u: 0.78, v: 0.76, k: 1.22 },      // the folders
  { f: B.payoff.s, u: 0.5, v: 0.5, k: 1.0 },        // wide
];

const CAPS: Cap[] = [
  { at: B.hook.s, l1: 'Can you write it off?', l2: 'CRA asks one question first', until: B.loop.s - 2 },
  { at: B.loop.s, l1: 'To earn income?', l2: 'that comes first', until: B.rule.s - 2 },
  { at: B.rule.s, l1: 'The general rule', l2: 'reasonable · to earn income', until: B.split.s - 2 },
  { at: B.split.s, l1: 'Mixed use?', l2: 'claim the business part', until: B.capital.s - 2 },
  { at: B.capital.s, l1: 'Lasts for years?', l2: 'claimed over time', until: B.meals.s - 2 },
  { at: B.meals.s, l1: 'Meals & entertainment', l2: 'generally 50%', until: B.employee.s - 2 },
  { at: B.employee.s, l1: 'Employees', l2: 'only if the contract requires it', until: B.proof.s - 2 },
  { at: B.proof.s, l1: 'Keep the proof', l2: 'generally 6 years', until: B.payoff.s - 2 },
];

const Pin = ({ f, a, b, u, v, top, big, sub, col = C.gold }: { f: number; a: number; b: number; u: number; v: number; top: string; big: string; sub?: string; col?: string }) => {
  const o = ease(f, a, a + 12) * (1 - ease(f, b - 8, b));
  if (o <= 0) return null;
  return (
    <div style={{ position: 'absolute', left: `${u * 100}%`, top: `${v * 100}%`, transform: `translate(-50%, calc(-100% - ${18 + (1 - o) * 30}px))`, opacity: o, textAlign: 'center' }}>
      <div style={{ ...pill, flexDirection: 'column', gap: 2, padding: '14px 24px', borderRadius: 22, whiteSpace: 'nowrap' }}>
        <span style={{ fontSize: 20, color: C.soft, fontWeight: 700, letterSpacing: 3 }}>{top}</span>
        <span style={{ fontSize: 40, fontWeight: 900, color: col }}>{big}</span>
        {sub && <span style={{ fontSize: 18, fontWeight: 700, color: C.soft }}>{sub}</span>}
      </div>
      <div style={{ width: 2, height: 22, margin: '0 auto', background: 'rgba(247,241,230,.7)' }} />
    </div>
  );
};

// persistent checklist: the four tests tick on as they are explained
const Strip = ({ f }: { f: number }) => {
  const show = ease(f, B.rule.s, B.rule.s + 12) * (1 - ease(f, B.payoff.s - 6, B.payoff.s + 6));
  if (show <= 0) return null;
  const items: [number, string][] = [[at('rule', 0.3), 'earns income'], [at('rule', 0.2), 'reasonable'], [B.split.s + 10, 'business part'], [B.proof.s + 10, 'proof kept']];
  return (
    <div style={{ position: 'absolute', left: 80, top: 690, display: 'flex', gap: 10, flexWrap: 'wrap', width: 920, opacity: show }}>
      {items.sort((x, y) => x[0] - y[0]).map(([a, name], i) => { const on = ease(f, a, a + 10); return on > 0 ? <div key={i} style={{ ...pill, fontSize: 20, padding: '10px 18px', opacity: on, transform: `scale(${0.9 + 0.1 * on})` }}><span style={{ color: C.green }}>✓</span>{name}</div> : null; })}
    </div>
  );
};

export const A6v2 = () => {
  const f = useCurrentFrame();
  const end = ease(f, B.payoff.s + 2, B.payoff.s + 20);
  const lift = 1 - ease(f, B.payoff.s - 6, B.payoff.s + 6);   // bottom grade lifted while objects carry the pins
  return (
    <AbsoluteFill style={{ background: '#0d0b09', fontFamily: SANS, overflow: 'hidden' }}>
      <PhotoPlate f={f} src="plates/a6-4k.jpg" iw={2294} ih={4096} keys={KEYS} glide={40} blur={0.8} steam={{ u: 0.72, v: 0.635, w: 0.06 }}>
        <Pin f={f} a={at('split', 0.3)} b={B.capital.s} u={0.4} v={0.8} top="PHONE · 60% BUSINESS" big="$720" sub="of $1,200 a year" />
        <Pin f={f} a={at('capital', 0.25)} b={B.meals.s} u={0.25} v={0.68} top="LAPTOP" big="over time" sub="capital cost allowance" col={C.cream} />
        <Pin f={f} a={at('capital', 0.4)} b={B.meals.s} u={0.76} v={0.83} top="CAR" big="over time" col={C.cream} />
        <Pin f={f} a={at('meals', 0.4)} b={B.employee.s} u={0.72} v={0.635} top="MEALS & ENTERTAINMENT" big="50%" sub="generally" />
        <Pin f={f} a={at('proof', 0.3)} b={B.payoff.s} u={0.82} v={0.72} top="RECEIPTS & RECORDS" big="6 years" sub="generally" />
      </PhotoPlate>
      <AbsoluteFill style={{ background: 'linear-gradient(180deg, rgba(8,6,4,.82) 0%, rgba(8,6,4,.55) 14%, rgba(8,6,4,0) 28%, rgba(8,6,4,0) 50%, rgba(8,6,4,.55) 66%, rgba(8,6,4,.8) 100%)', opacity: 1 - 0.75 * lift }} />
      <AbsoluteFill style={{ background: 'linear-gradient(180deg, rgba(8,6,4,.82) 0%, rgba(8,6,4,.55) 14%, rgba(8,6,4,0) 28%, rgba(8,6,4,0) 100%)', opacity: 0.75 * lift }} />
      <Header f={f} chip="CRA · EXPENSES" />
      <Typed f={f} caps={CAPS} head={HEAD} />
      <Strip f={f} />

      <Card f={f} a={B.hook.s} b={B.rule.s} label="BEFORE YOU WRITE IT OFF" top={360} h={300}>
        <Line f={f} a={at('hook', 0.45)} top={104} serif head={HEAD} size={50}>One question first:</Line>
        <Line f={f} a={B.loop.s} top={176} serif head={HEAD} size={50}><span style={{ color: C.gold }}>Did it earn income?</span></Line>
      </Card>
      <Card f={f} a={B.rule.s} b={B.split.s} label="THE GENERAL RULE · CRA GUIDE T4002" top={360} h={300}>
        <Line f={f} a={at('rule', 0.1)} top={98} size={34}><span style={{ color: C.green }}>Deductible:</span> reasonable costs to earn business income</Line>
        <Line f={f} a={at('rule', 0.75)} top={196} size={34}><span style={{ color: C.red }}>Not deductible:</span> personal costs</Line>
      </Card>
      <Card f={f} a={B.split.s} b={B.capital.s} label="EXAMPLE · MIXED USE" top={360} h={300}>
        <Hero f={f} a={at('split', 0.6)} size={110}>$720</Hero>
        <Line f={f} a={at('split', 0.15)} top={232} size={28} color={C.soft}>$1,200 phone bill × 60% business use</Line>
      </Card>
      <Card f={f} a={B.capital.s} b={B.meals.s} label="CURRENT VS CAPITAL" top={360} h={300}>
        <Line f={f} a={at('capital', 0.05)} top={98} size={34}>Lasts for years (laptop, car)?</Line>
        <Line f={f} a={at('capital', 0.6)} top={160} size={34}><span style={{ color: C.gold }}>Claimed over time</span>, not all at once</Line>
        <Line f={f} a={at('capital', 0.72)} top={224} size={24} color={C.soft}>through capital cost allowance (CCA)</Line>
      </Card>
      <Card f={f} a={B.meals.s} b={B.employee.s} label="MEALS & ENTERTAINMENT" top={360} h={300}>
        <Line f={f} a={at('meals', 0.1)} top={104} serif head={HEAD} size={50}>Generally, only half.</Line>
        <Line f={f} a={at('meals', 0.4)} top={180} size={28} color={C.soft}>food, drinks and entertainment for business</Line>
      </Card>
      <Card f={f} a={B.employee.s} b={B.proof.s} label="EMPLOYEES" top={360} h={300} tone="red">
        <Line f={f} a={at('employee', 0.1)} top={98} serif head={HEAD} size={44}>Only if your contract requires you to pay</Line>
        <Line f={f} a={at('employee', 0.6)} top={212} size={26} color={C.soft}>your employer signs Form T2200 · no allowance covering it</Line>
      </Card>
      <Card f={f} a={B.proof.s} b={B.payoff.s} label="RECORDS" top={360} h={300}>
        <Hero f={f} a={at('proof', 0.55)} size={110}>6 years</Hero>
        <Line f={f} a={at('proof', 0.15)} top={232} size={26} color={C.soft}>generally, from the end of the tax year they relate to</Line>
      </Card>

      {f >= B.payoff.s && (
        <div style={{ position: 'absolute', left: 80, right: 80, top: 1010, opacity: end, transform: `translateY(${(1 - end) * 40}px)` }}>
          <Flag f={f} w={150} amp={0.06} />
          <div style={{ marginTop: 26, fontFamily: HEAD, fontSize: 42, fontWeight: 900, lineHeight: 1.2, color: C.cream, textShadow: shade, whiteSpace: 'nowrap' }}>Earn income. Keep it reasonable.<br />Claim the business part. Keep proof.</div>
          <div style={{ marginTop: 34, display: 'inline-flex', padding: '20px 32px', borderRadius: 999, background: 'linear-gradient(160deg,#fff1c2,#f1c75b 50%,#c88f1f)', color: '#2b1d03', fontSize: 34, fontWeight: 900, boxShadow: '0 16px 30px rgba(0,0,0,.4)', opacity: ease(f, B.cta.s - 4, B.cta.s + 8), transform: `scale(${1 + 0.03 * Math.sin(TAU * (f - B.cta.s) / 36)})` }}>Follow for the real math</div>
          <div style={{ marginTop: 28, fontSize: 19, fontWeight: 600, color: C.soft, lineHeight: 1.45, opacity: ease(f, B.payoff.s + 16, B.payoff.s + 30) }}>
            Source: canada.ca (CRA guides T4002, T4044; business records) · $1,200 phone is an example · general info, not advice
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
