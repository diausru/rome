// "RESP: the 20% grant + the Canada Learning Bond" (topic D3, family / kids group) in the approved look.
// Master timeline = Grady voiceover (d3/vo-beats.json → tools/vo_hf.py → d3-timeline.json). Facts: d3/PRODUCTION-BIBLE.md.
// Plate: a piggy bank, a tall and a short coin stack, a graduation cap and a notebook on a table in front of a
// red-brick school; a parent walks a child with a backpack to the door. Family group type: Nunito headings.
// Signature: the tall stack is "you", the short stack is "the grant" (labels pinned onto the real objects).
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { PhotoPlate, type Focus } from './Plate';
import { Flag } from './RaiseShort';
import TL from './d3-timeline.json';
import { C, SANS, Card, Grades, Header, Hero, Line, Typed, beatsFrom, clamp, ease, goldText, money, pill, shade, type Cap } from './Kit';

export const D3FPS = 24, D3DUR = 1392;
const HEAD = 'Nunito';
const TAU = Math.PI * 2;
const B = beatsFrom(TL, D3FPS);
const at = (id: string, fr: number) => Math.round(B[id].s + (B[id].e - B[id].s) * fr);

const KEYS: Focus[] = [
  { f: 0, u: 0.45, v: 0.66, k: 1.18 },              // the stacks
  { f: B.loop.s, u: 0.45, v: 0.48, k: 1.16 },       // parent and child
  { f: B.rule.s, u: 0.42, v: 0.70, k: 1.15 },       // stacks again
  { f: B.example.s, u: 0.45, v: 0.66, k: 1.08 },    // all props
  { f: B.catchup.s, u: 0.18, v: 0.70, k: 1.24 },    // the piggy bank
  { f: B.bond.s, u: 0.42, v: 0.48, k: 1.26 },       // parent and child
  { f: B.catch.s, u: 0.77, v: 0.66, k: 1.26 },      // the graduation cap
  { f: B.payoff.s, u: 0.5, v: 0.52, k: 1.0 },       // wide
];

const CAPS: Cap[] = [
  { at: B.hook.s, l1: 'RESP: put in $2,500', l2: 'the government adds $500', until: B.loop.s - 2 },
  { at: B.loop.s, l1: 'Most parents know that.', l2: 'Not the rest.', until: B.rule.s - 2 },
  { at: B.rule.s, l1: 'The CESG', l2: 'Canada Education Savings Grant', until: B.example.s - 2 },
  { at: B.example.s, l1: 'Start at birth', l2: 'watch the grant add up', until: B.catchup.s - 2 },
  { at: B.catchup.s, l1: 'Missed years?', l2: 'unused room carries forward', until: B.bond.s - 2 },
  { at: B.bond.s, l1: 'Lower income?', l2: 'the Canada Learning Bond', until: B.catch.s - 2 },
  { at: B.catch.s, l1: 'The catch', l2: 'if there is no post-secondary', until: B.payoff.s - 2 },
];

// labels pinned onto the real objects (image coordinates of each object's top)
const Pin = ({ f, a, u, v, top, big, col }: { f: number; a: number; u: number; v: number; top: string; big: string; col: string }) => {
  const e = ease(f, a, a + 12);
  if (e <= 0) return null;
  return (
    <div style={{ position: 'absolute', left: `${u * 100}%`, top: `${v * 100}%`, transform: `translate(-50%, calc(-100% - ${18 + (1 - e) * 30}px))`, opacity: e, textAlign: 'center' }}>
      <div style={{ ...pill, flexDirection: 'column', gap: 2, padding: '14px 22px', borderRadius: 22 }}>
        <span style={{ fontSize: 20, color: C.soft, fontWeight: 700, letterSpacing: 3 }}>{top}</span>
        <span style={{ fontSize: 40, fontWeight: 900, color: col }}>{big}</span>
      </div>
      <div style={{ width: 2, height: 22, margin: '0 auto', background: 'rgba(247,241,230,.7)' }} />
    </div>
  );
};

const Strip = ({ f }: { f: number }) => {
  const hide = (a: number, b: number) => 1 - ease(f, a - 6, a + 4) + ease(f, b, b + 10);
  const show = ease(f, B.rule.s + 20, B.rule.s + 32) * (1 - ease(f, B.payoff.s - 6, B.payoff.s + 6)) * clamp(hide(B.example.s, B.catchup.s));
  if (show <= 0) return null;
  const items: [number, React.ReactNode][] = [
    [B.rule.s + 20, <><span style={{ color: C.soft, fontWeight: 600 }}>CESG</span><span style={{ color: C.gold }}>20%</span></>],
    [at('rule', 0.8), <><span style={{ color: C.soft, fontWeight: 600 }}>max</span><span style={{ color: C.gold }}>$7,200</span></>],
    [at('bond', 0.4), <><span style={{ color: C.soft, fontWeight: 600 }}>CLB up to</span><span style={{ color: C.green }}>$2,000</span></>],
  ];
  return (
    <div style={{ position: 'absolute', left: 80, top: 1064, display: 'flex', gap: 12, opacity: show }}>
      {items.map(([a, node], i) => { const on = ease(f, a, a + 10); return on > 0 ? <div key={i} style={{ ...pill, opacity: on, transform: `scale(${0.9 + 0.1 * on})` }}>{node}</div> : null; })}
    </div>
  );
};

export const D3v2 = () => {
  const f = useCurrentFrame();
  const end = ease(f, B.payoff.s + 2, B.payoff.s + 20);
  const pinsOn = (f < B.rule.s ? 1 - ease(f, B.rule.s - 8, B.rule.s) : 0) + (f >= B.example.s - 2 && f < B.catchup.s ? 1 - ease(f, B.catchup.s - 8, B.catchup.s) : 0);
  // example: grant total grows year by year from birth ($500 a year) until the $7,200 cap in year 15
  const yr = Math.min(15, Math.max(1, 1 + Math.floor(14 * clamp((f - at('example', 0.12)) / (at('example', 0.85) - at('example', 0.12))))));
  const total = Math.min(500 * yr, 7200);
  return (
    <AbsoluteFill style={{ background: '#0d0b09', fontFamily: SANS, overflow: 'hidden' }}>
      <PhotoPlate f={f} src="plates/d3-4k.jpg" iw={2294} ih={4096} keys={KEYS} glide={40} blur={0.8}>
        {pinsOn > 0 && (
          <div style={{ opacity: pinsOn }}>
            <Pin f={f} a={f < B.rule.s ? at('hook', 0.3) : B.example.s + 4} u={0.39} v={0.69} top="YOU" big="$2,500" col={C.cream} />
            <Pin f={f} a={f < B.rule.s ? at('hook', 0.8) : B.example.s + 10} u={0.51} v={0.74} top="GRANT" big="+$500" col={C.gold} />
          </div>
        )}
      </PhotoPlate>
      <Grades />
      <Header f={f} chip="RESP · 2026" />
      <Typed f={f} caps={CAPS} head={HEAD} />
      <Strip f={f} />

      {/* hook + loop: card in the sky so the stacks carry the numbers */}
      <Card f={f} a={B.hook.s} b={B.rule.s} label="RESP GRANT · CESG" top={360} h={300}>
        <Hero f={f} a={at('hook', 0.12)} out={at('hook', 0.68)} size={120}>$2,500<span style={{ fontSize: 48 }}> /year</span></Hero>
        <Hero f={f} a={at('hook', 0.74)} size={120}>+$500</Hero>
        <Line f={f} a={at('hook', 0.14)} top={236} color={C.soft} size={30}>{f < at('hook', 0.72) ? 'you put into the RESP' : 'from the government, every year'}</Line>
      </Card>
      <Card f={f} a={B.rule.s} b={B.example.s} label="20% MATCH · PER CHILD">
        <Hero f={f} a={at('rule', 0.35)} out={at('rule', 0.78)}>20%</Hero>
        <Hero f={f} a={at('rule', 0.82)}>$7,200</Hero>
        <Line f={f} a={at('rule', 0.4)} top={286} color={C.soft} size={28}>on the first $2,500 a year · lifetime max per child · until the year they turn 17</Line>
      </Card>
      <Card f={f} a={B.example.s} b={B.catchup.s} label="EXAMPLE · $2,500 A YEAR FROM BIRTH" top={360} h={300}>
        <div style={{ position: 'absolute', left: 56, top: 96, fontFamily: SANS, fontSize: 110, fontWeight: 900, letterSpacing: -3, fontVariantNumeric: 'tabular-nums', opacity: ease(f, at('example', 0.08), at('example', 0.14)), ...goldText }}>{money(total)}</div>
        <div style={{ position: 'absolute', right: 56, top: 128, textAlign: 'right', fontFamily: SANS, opacity: ease(f, at('example', 0.08), at('example', 0.14)) }}>
          <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: 4, color: C.soft }}>YEAR</div>
          <div style={{ fontSize: 56, fontWeight: 900, color: C.cream, fontVariantNumeric: 'tabular-nums' }}>{yr}</div>
        </div>
        <Line f={f} a={at('example', 0.86)} top={236} color={C.green} size={30}>full grant reached in year 15</Line>
      </Card>
      <Card f={f} a={B.catchup.s} b={B.bond.s} label="CATCH-UP · UNUSED ROOM">
        <div style={{ position: 'absolute', left: 56, right: 56, top: 112, fontFamily: HEAD, fontSize: 54, fontWeight: 900, lineHeight: 1.1, color: C.cream, opacity: ease(f, at('catchup', 0.06), at('catchup', 0.13)) * (1 - ease(f, at('catchup', 0.54), at('catchup', 0.6))) }}>Unused grant room<br />carries forward.</div>
        <Hero f={f} a={at('catchup', 0.62)}>$1,000</Hero>
        <Line f={f} a={at('catchup', 0.64)} top={286} color={C.soft} size={28}>max grant in one year when you have unused room ($5,000 contributed)</Line>
      </Card>
      <Card f={f} a={B.bond.s} b={B.catch.s} label="CANADA LEARNING BOND" tone="green">
        <Hero f={f} a={at('bond', 0.38)}>$2,000</Hero>
        <Line f={f} a={at('bond', 0.62)} top={286} color={C.soft} size={28}>$500 + $100 a year · lower-income families · born 2004+ · no contribution needed</Line>
      </Card>
      <Card f={f} a={B.catch.s} b={B.payoff.s} label="THE CATCH" tone="red">
        <Line f={f} a={at('catch', 0.15)} top={108} serif head={HEAD} size={50}>No post-secondary?</Line>
        <Line f={f} a={at('catch', 0.6)} top={190} size={34} color={C.red}>The grant and bond go back to the government.</Line>
      </Card>

      {f >= B.payoff.s && (
        <div style={{ position: 'absolute', left: 80, right: 80, top: 1010, opacity: end, transform: `translateY(${(1 - end) * 40}px)` }}>
          <Flag f={f} w={150} amp={0.06} />
          <div style={{ marginTop: 26, fontFamily: HEAD, fontSize: 64, fontWeight: 900, lineHeight: 1.06, color: C.cream, textShadow: shade }}>Start early.<br />Contribute steadily.</div>
          <div style={{ marginTop: 16, fontSize: 30, fontWeight: 600, color: C.soft, textShadow: shade }}>Let the grant do the heavy lifting.</div>
          <div style={{ marginTop: 34, display: 'inline-flex', padding: '20px 32px', borderRadius: 999, background: 'linear-gradient(160deg,#fff1c2,#f1c75b 50%,#c88f1f)', color: '#2b1d03', fontSize: 34, fontWeight: 900, boxShadow: '0 16px 30px rgba(0,0,0,.4)', opacity: ease(f, B.cta.s - 4, B.cta.s + 8), transform: `scale(${1 + 0.03 * Math.sin(TAU * (f - B.cta.s) / 36)})` }}>Follow for the real math</div>
          <div style={{ marginTop: 28, fontSize: 19, fontWeight: 600, color: C.soft, lineHeight: 1.45, opacity: ease(f, B.payoff.s + 16, B.payoff.s + 30) }}>
            Source: canada.ca (ESDC, CRA) · example assumes $2,500 a year from birth · general info, not advice
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
