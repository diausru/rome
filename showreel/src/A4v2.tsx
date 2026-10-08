// "Why CRA reviews a return" (topic A4, CRA basics) in the approved look (Kit + Plate).
// Master timeline = Grady voiceover (a4/vo-beats.json → tools/vo_hf.py → a4-timeline.json). Facts: a4/PRODUCTION-BIBLE.md.
// Angle: the four reasons CRA itself publishes (canada.ca "How tax returns are selected for review"), not rumoured red flags.
// Three photo scenes of the same man (series upgrade), each shown once, joined by SceneCuts:
// 1) morning, reading a letter at the kitchen table (the four reasons begin); 2) evening, sorting receipts from a shoebox
// (history, random, review is not an audit); 3) next morning, relieved, sealing his reply (what to do). Mont (SANS) headings.
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { PhotoPlate, SceneCuts, type Focus } from './Plate';
import { Flag } from './RaiseShort';
import TL from './a4-timeline.json';
import { C, SANS, Card, Header, Hero, Line, Typed, beatsFrom, ease, pill, shade, type Cap } from './Kit';

export const A4FPS = 24;
const B = beatsFrom(TL, A4FPS);
export const A4DUR = Math.ceil((TL.total + 0.5) * A4FPS);
const HEAD = SANS;
const TAU = Math.PI * 2;
const at = (id: string, fr: number) => Math.round(B[id].s + (B[id].e - B[id].s) * fr);

// scene changes where the meaning changes: history/random/review (scene 2), what to do (scene 3)
const CUTS = [B.history.s, B.letter.s];
// object positions per plate (image coordinates of each object's top)
const PAPERS1 = { u: 0.74, v: 0.61 }, ENV1 = { u: 0.4, v: 0.71 }, BOX2 = { u: 0.3, v: 0.53 }, RECEIPTS2 = { u: 0.62, v: 0.75 };

const K1: Focus[] = [
  { f: 0, u: 0.4, v: 0.3, k: 1.15 },                   // reading the letter
  { f: B.hook.s + 40, u: 0.45, v: 0.38, k: 1.3 },      // push in on the letter
  { f: B.mismatch.s, u: 0.65, v: 0.55, k: 1.2 },       // the face-down papers
  { f: B.claims.s, u: 0.4, v: 0.62, k: 1.25 },         // the envelope
];
const K2: Focus[] = [
  { f: 0, u: 0.4, v: 0.3, k: 1.2 },                    // evening: sorting receipts
  { f: B.random.s, u: 0.35, v: 0.55, k: 1.25 },        // the shoebox
  { f: B.review.s, u: 0.6, v: 0.6, k: 1.2 },           // folders and receipts
];
const K3: Focus[] = [
  { f: 0, u: 0.5, v: 0.3, k: 1.2 },                    // relief: sealing the reply
  { f: B.letter.s + 50, u: 0.45, v: 0.62, k: 1.2 },    // the sealed envelope
  { f: B.cta.s, u: 0.5, v: 0.5, k: 1.0 },              // wide
];

const CAPS: Cap[] = [
  { at: B.hook.s, l1: 'Why CRA picked your return', l2: 'the reasons are public', until: B.mismatch.s - 2 },
  { at: B.mismatch.s, l1: '1 · A slip doesn’t match', l2: 'T4 · T5 · third-party copies', until: B.claims.s - 2 },
  { at: B.claims.s, l1: '2 · What you claimed', l2: 'deductions and credits', until: B.history.s - 2 },
  { at: B.history.s, l1: '3 · Your history', l2: 'compliance history', until: B.random.s - 2 },
  { at: B.random.s, l1: '4 · Random selection', l2: 'pure chance', until: B.review.s - 2 },
  { at: B.review.s, l1: 'Review ≠ audit', l2: 'a routine check', until: B.letter.s - 2 },
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

// persistent strip: the four official reasons tick on
const Strip = ({ f }: { f: number }) => {
  const show = ease(f, B.mismatch.s, B.mismatch.s + 12) * (1 - ease(f, B.letter.s - 6, B.letter.s + 6));
  if (show <= 0) return null;
  const items: [number, React.ReactNode][] = [
    [at('mismatch', 0.4), <><span style={{ color: C.gold }}>1</span>slips vs return</>],
    [at('claims', 0.4), <><span style={{ color: C.gold }}>2</span>claims</>],
    [at('history', 0.4), <><span style={{ color: C.gold }}>3</span>history</>],
    [at('random', 0.4), <><span style={{ color: C.gold }}>4</span>random</>],
    [at('review', 0.3), <><span style={{ color: C.green }}>review</span>≠ audit</>],
  ];
  return (
    <div style={{ position: 'absolute', left: 80, top: 690, display: 'flex', gap: 10, flexWrap: 'wrap', width: 920, opacity: show }}>
      {items.map(([a, node], i) => { const on = ease(f, a, a + 10); return on > 0 ? <div key={i} style={{ ...pill, fontSize: 20, padding: '10px 18px', opacity: on, transform: `scale(${0.9 + 0.1 * on})` }}>{node}</div> : null; })}
    </div>
  );
};

export const A4v2 = () => {
  const f = useCurrentFrame();
  const end = ease(f, B.letter.s + 2, B.letter.s + 20);
  const lift = 1 - ease(f, B.letter.s - 6, B.letter.s + 6);
  return (
    <AbsoluteFill style={{ background: '#0d0b09', fontFamily: SANS, overflow: 'hidden' }}>
      <SceneCuts f={f} cuts={CUTS} scene={(i) => i === 0 ? (
        <PhotoPlate f={f} src="plates/a4-s1-4k.jpg" iw={2294} ih={4096} keys={K1} glide={40} blur={0.8} steam={{ u: 0.13, v: 0.57, w: 0.05 }}>
          <Pin f={f} a={at('mismatch', 0.55)} b={B.claims.s} p={PAPERS1} top="T4 · T5 COPIES" big="already at CRA" sub="from employers and banks" />
          <Pin f={f} a={at('claims', 0.45)} b={B.history.s} p={ENV1} top="DEDUCTIONS · CREDITS" big="keep receipts" col={C.cream} />
        </PhotoPlate>
      ) : i === 1 ? (
        <PhotoPlate f={f} src="plates/a4-s2-4k.jpg" iw={2294} ih={4096} keys={K2} glide={40} blur={0.8} steam={{ u: 0.15, v: 0.72, w: 0.05 }}>
          <Pin f={f} a={at('random', 0.45)} b={B.review.s} p={BOX2} top="SOME RETURNS" big="picked at random" col={C.cream} />
          <Pin f={f} a={at('review', 0.55)} b={B.letter.s} p={RECEIPTS2} top="A REVIEW ASKS FOR" big="receipts, documents" sub="to support a claim" />
        </PhotoPlate>
      ) : (
        <PhotoPlate f={f} src="plates/a4-s3-4k.jpg" iw={2294} ih={4096} keys={K3} glide={40} blur={0.8}>
        </PhotoPlate>
      )} />
      <AbsoluteFill style={{ background: 'linear-gradient(180deg, rgba(8,6,4,.82) 0%, rgba(8,6,4,.55) 14%, rgba(8,6,4,0) 28%, rgba(8,6,4,0) 50%, rgba(8,6,4,.55) 66%, rgba(8,6,4,.8) 100%)', opacity: 1 - 0.75 * lift }} />
      <AbsoluteFill style={{ background: 'linear-gradient(180deg, rgba(8,6,4,.82) 0%, rgba(8,6,4,.55) 14%, rgba(8,6,4,0) 28%, rgba(8,6,4,0) 100%)', opacity: 0.75 * lift }} />
      <Header f={f} chip="CRA · REVIEWS" />
      <Typed f={f} caps={CAPS} head={HEAD} />
      <Strip f={f} />

      <Card f={f} a={B.mismatch.s} b={B.claims.s} label="1 · INFORMATION DOESN’T MATCH" top={360} h={300}>
        <Line f={f} a={at('mismatch', 0.25)} top={96} size={32}>Employer → <span style={{ color: C.gold }}>T4</span> → CRA</Line>
        <Line f={f} a={at('mismatch', 0.4)} top={146} size={32}>Bank → <span style={{ color: C.gold }}>T5</span> → CRA</Line>
        <Line f={f} a={at('mismatch', 0.75)} top={212} size={26} color={C.soft}>the system compares them with your return</Line>
      </Card>
      <Card f={f} a={B.claims.s} b={B.history.s} label="2 · THE DEDUCTIONS AND CREDITS YOU CLAIM" top={360} h={300}>
        <Line f={f} a={at('claims', 0.1)} top={104} size={40}>Some get a closer look.</Line>
        <Line f={f} a={at('claims', 0.6)} top={170} size={40}><span style={{ color: C.gold }}>Keep the receipts.</span></Line>
      </Card>
      <Card f={f} a={B.history.s} b={B.random.s} label="3 · YOUR COMPLIANCE HISTORY" top={360} h={300}>
        <Line f={f} a={at('history', 0.15)} top={104} size={40}>Past problems</Line>
        <Line f={f} a={at('history', 0.5)} top={170} size={40}><span style={{ color: C.gold }}>can bring a second look.</span></Line>
      </Card>
      <Card f={f} a={B.random.s} b={B.review.s} label="4 · RANDOM SELECTION" top={360} h={300}>
        <Hero f={f} a={at('random', 0.3)} size={104}>chance</Hero>
        <Line f={f} a={at('random', 0.6)} top={232} size={26} color={C.soft}>some returns are picked with no red flag at all</Line>
      </Card>
      <Card f={f} a={B.review.s} b={B.letter.s} label="A REVIEW IS NOT AN AUDIT" top={360} h={300} tone="green">
        <Hero f={f} a={at('review', 0.45)} size={100}>≈3 million</Hero>
        <Line f={f} a={at('review', 0.65)} top={226} size={26} color={C.soft}>reviewed a year · mostly to confirm claims are supported</Line>
      </Card>

      {f >= B.letter.s && (
        <div style={{ position: 'absolute', left: 80, right: 80, top: 1000, opacity: end, transform: `translateY(${(1 - end) * 40}px)` }}>
          <Flag f={f} w={150} amp={0.06} />
          <div style={{ marginTop: 26, fontFamily: HEAD, fontSize: 56, fontWeight: 900, lineHeight: 1.1, color: C.cream, textShadow: shade }}>Reply on time.<br />Keep records <span style={{ color: C.gold }}>6 years.</span></div>
          <div style={{ marginTop: 34, display: 'inline-flex', padding: '20px 32px', borderRadius: 999, background: 'linear-gradient(160deg,#fff1c2,#f1c75b 50%,#c88f1f)', color: '#2b1d03', fontSize: 34, fontWeight: 900, boxShadow: '0 16px 30px rgba(0,0,0,.4)', opacity: ease(f, B.cta.s - 4, B.cta.s + 8), transform: `scale(${1 + 0.03 * Math.sin(TAU * (f - B.cta.s) / 36)})` }}>Next: your first return in Canada →</div>
          <div style={{ marginTop: 12, fontSize: 26, fontWeight: 700, color: C.cream, textShadow: shade, opacity: ease(f, at('cta', 0.6), at('cta', 0.7)) }}>Follow so you don't miss it</div>
          <div style={{ marginTop: 28, fontSize: 19, fontWeight: 600, color: C.soft, lineHeight: 1.45, opacity: ease(f, B.letter.s + 16, B.letter.s + 30) }}>
            Source: canada.ca (CRA: how tax returns are selected for review; types of reviews; keeping records) · general info, not advice
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
