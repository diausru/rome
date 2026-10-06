// "Records: what to keep, and for how long" (topic A7, business group) in the approved look (Kit + Plate).
// Master timeline = Grady voiceover (a7/vo-beats.json → tools/vo_hf.py → a7-timeline.json). Facts: a7/PRODUCTION-BIBLE.md.
// Plate: a home office; an open archive box of folders, a clipped stack of slips, a phone and tea on the desk; behind,
// a man shelving plain archive boxes. The rules are pinned onto the real objects; cards sit at the top.
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { PhotoPlate, type Focus } from './Plate';
import { Flag } from './RaiseShort';
import TL from './a7-timeline.json';
import { C, SANS, Card, Header, Hero, Line, Typed, beatsFrom, ease, pill, shade, type Cap } from './Kit';

export const A7FPS = 24;
const B = beatsFrom(TL, A7FPS);
export const A7DUR = Math.ceil((TL.total + 0.5) * A7FPS);
const HEAD = SANS;
const TAU = Math.PI * 2;
const at = (id: string, fr: number) => Math.round(B[id].s + (B[id].e - B[id].s) * fr);

// object positions in the plate (image coordinates of each object's top)
const BOX = { u: 0.35, v: 0.52 }, SLIPS = { u: 0.42, v: 0.81 }, PHONE = { u: 0.84, v: 0.82 }, SHELF = { u: 0.9, v: 0.3 }, TEA = { u: 0.88, v: 0.67 };

const KEYS: Focus[] = [
  { f: 0, u: 0.42, v: 0.7, k: 1.15 },                  // the desk: receipts and box
  { f: B.loop.s, u: 0.68, v: 0.34, k: 1.18 },          // the man shelving boxes
  { f: B.rule.s, u: 0.36, v: 0.46, k: 1.15 },          // the archive box
  { f: B.example.s, u: 0.42, v: 0.78, k: 1.22 },       // the receipts
  { f: B.late.s, u: 0.8, v: 0.36, k: 1.2 },            // the shelf of boxes
  { f: B.digital.s, u: 0.8, v: 0.8, k: 1.25 },         // the phone
  { f: B.early.s, u: 0.38, v: 0.48, k: 1.15 },         // the archive box
  { f: B.payoff.s, u: 0.5, v: 0.5, k: 1.0 },           // wide
];

const CAPS: Cap[] = [
  { at: B.hook.s, l1: 'Tossing old receipts?', l2: 'CRA can ask years later', until: B.loop.s - 2 },
  { at: B.loop.s, l1: 'How long is enough?', l2: 'the CRA rule', until: B.rule.s - 2 },
  { at: B.rule.s, l1: 'Generally 6 years', l2: 'from the end of the tax year', until: B.example.s - 2 },
  { at: B.example.s, l1: 'Example', l2: 'business receipts for 2026', until: B.late.s - 2 },
  { at: B.late.s, l1: 'Exceptions', l2: 'late filing · disputes', until: B.digital.s - 2 },
  { at: B.digital.s, l1: 'Digital is fine', l2: 'complete and readable', until: B.early.s - 2 },
  { at: B.early.s, l1: 'Destroy early?', l2: 'only with permission', until: B.payoff.s - 2 },
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

// persistent strip: the rule and its exceptions tick on
const Strip = ({ f }: { f: number }) => {
  const show = ease(f, B.rule.s + 12, B.rule.s + 24) * (1 - ease(f, B.payoff.s - 6, B.payoff.s + 6));
  if (show <= 0) return null;
  const items: [number, React.ReactNode][] = [
    [B.rule.s + 12, <><span style={{ color: C.gold }}>6 years</span></>],
    [at('late', 0.1), <>late filing → from filing date</>],
    [at('late', 0.6), <>dispute → until resolved</>],
    [B.digital.s + 10, <><span style={{ color: C.green }}>✓</span>digital OK</>],
  ];
  return (
    <div style={{ position: 'absolute', left: 80, top: 690, display: 'flex', gap: 10, flexWrap: 'wrap', width: 920, opacity: show }}>
      {items.map(([a, node], i) => { const on = ease(f, a, a + 10); return on > 0 ? <div key={i} style={{ ...pill, fontSize: 20, padding: '10px 18px', opacity: on, transform: `scale(${0.9 + 0.1 * on})` }}>{node}</div> : null; })}
    </div>
  );
};

export const A7v2 = () => {
  const f = useCurrentFrame();
  const end = ease(f, B.payoff.s + 2, B.payoff.s + 20);
  const lift = 1 - ease(f, B.payoff.s - 6, B.payoff.s + 6);
  return (
    <AbsoluteFill style={{ background: '#0d0b09', fontFamily: SANS, overflow: 'hidden' }}>
      <PhotoPlate f={f} src="plates/a7-4k.jpg" iw={2294} ih={4096} keys={KEYS} glide={40} blur={0.8} steam={{ u: TEA.u, v: TEA.v, w: 0.06 }}>
        <Pin f={f} a={at('rule', 0.3)} b={B.example.s} p={BOX} top="RECORDS" big="6 years" sub="generally" />
        <Pin f={f} a={at('example', 0.3)} b={B.late.s} p={SLIPS} top="2026 BUSINESS RECEIPTS" big="keep to end of 2032" sub="at least" col={C.cream} />
        <Pin f={f} a={at('digital', 0.2)} b={B.early.s} p={PHONE} top="SCANS & DIGITAL FILES" big="✓ count" sub="complete · readable" col={C.green} />
        <Pin f={f} a={at('early', 0.3)} b={B.payoff.s} p={BOX} top="DESTROY EARLY?" big="ask CRA" sub="Form T137" col={C.red} />
      </PhotoPlate>
      <AbsoluteFill style={{ background: 'linear-gradient(180deg, rgba(8,6,4,.82) 0%, rgba(8,6,4,.55) 14%, rgba(8,6,4,0) 28%, rgba(8,6,4,0) 50%, rgba(8,6,4,.55) 66%, rgba(8,6,4,.8) 100%)', opacity: 1 - 0.75 * lift }} />
      <AbsoluteFill style={{ background: 'linear-gradient(180deg, rgba(8,6,4,.82) 0%, rgba(8,6,4,.55) 14%, rgba(8,6,4,0) 28%, rgba(8,6,4,0) 100%)', opacity: 0.75 * lift }} />
      <Header f={f} chip="CRA · RECORDS" />
      <Typed f={f} caps={CAPS} head={HEAD} />
      <Strip f={f} />

      <Card f={f} a={B.hook.s} b={B.rule.s} label="BEFORE YOU SHRED" top={360} h={300}>
        <Line f={f} a={at('hook', 0.4)} top={104} serif head={HEAD} size={48}>CRA can ask for proof</Line>
        <Line f={f} a={at('hook', 0.7)} top={168} serif head={HEAD} size={48}><span style={{ color: C.gold }}>years later.</span></Line>
      </Card>
      <Card f={f} a={B.rule.s} b={B.example.s} label="THE GENERAL RULE" top={360} h={300}>
        <Hero f={f} a={at('rule', 0.12)} size={110}>6 years</Hero>
        <Line f={f} a={at('rule', 0.5)} top={232} size={26} color={C.soft}>business records: from the end of the tax year they relate to</Line>
      </Card>
      <Card f={f} a={B.example.s} b={B.late.s} label="EXAMPLE · BUSINESS RECEIPTS" top={360} h={300}>
        <Line f={f} a={at('example', 0.08)} top={98} size={34} color={C.soft}>Receipts for the 2026 tax year</Line>
        <Hero f={f} a={at('example', 0.55)} top={146} size={88} line={false}>→ end of 2032</Hero>
      </Card>
      <Card f={f} a={B.late.s} b={B.digital.s} label="WHEN IT'S LONGER" top={360} h={300} tone="red">
        <Line f={f} a={at('late', 0.05)} top={98} size={32}><span style={{ color: C.gold }}>Filed late?</span> 6 years from the day you file</Line>
        <Line f={f} a={at('late', 0.55)} top={176} size={32}><span style={{ color: C.gold }}>Objection or appeal?</span> keep until it's resolved</Line>
      </Card>
      <Card f={f} a={B.digital.s} b={B.early.s} label="PAPER OR DIGITAL" top={360} h={300} tone="green">
        <Line f={f} a={at('digital', 0.08)} top={104} serif head={HEAD} size={48}>Scans count.</Line>
        <Line f={f} a={at('digital', 0.45)} top={178} size={30} color={C.soft}>as long as they're complete and readable</Line>
      </Card>
      <Card f={f} a={B.early.s} b={B.payoff.s} label="DESTROYING EARLY" top={360} h={300}>
        <Line f={f} a={at('early', 0.08)} top={104} serif head={HEAD} size={48}>Ask CRA first.</Line>
        <Line f={f} a={at('early', 0.45)} top={178} size={30} color={C.soft}>Form T137, Request for Destruction of Records</Line>
      </Card>

      {f >= B.payoff.s && (
        <div style={{ position: 'absolute', left: 80, right: 80, top: 1010, opacity: end, transform: `translateY(${(1 - end) * 40}px)` }}>
          <Flag f={f} w={150} amp={0.06} />
          <div style={{ marginTop: 26, fontFamily: HEAD, fontSize: 46, fontWeight: 900, lineHeight: 1.2, color: C.cream, textShadow: shade, whiteSpace: 'nowrap' }}>Six years. Digital is fine.<br />Never toss the proof too early.</div>
          <div style={{ marginTop: 34, display: 'inline-flex', padding: '20px 32px', borderRadius: 999, background: 'linear-gradient(160deg,#fff1c2,#f1c75b 50%,#c88f1f)', color: '#2b1d03', fontSize: 34, fontWeight: 900, boxShadow: '0 16px 30px rgba(0,0,0,.4)', opacity: ease(f, B.cta.s - 4, B.cta.s + 8), transform: `scale(${1 + 0.03 * Math.sin(TAU * (f - B.cta.s) / 36)})` }}>Follow for the real math</div>
          <div style={{ marginTop: 28, fontSize: 19, fontWeight: 600, color: C.soft, lineHeight: 1.45, opacity: ease(f, B.payoff.s + 16, B.payoff.s + 30) }}>
            Source: canada.ca (CRA: Where to keep your records and for how long; IC78-10R) · general info, not advice
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
