// "Year-end moves before December 31" (topic C5, planning group) in the approved look (Kit + Plate).
// Master timeline = Grady voiceover (c5/vo-beats.json → tools/vo_hf.py, tempo 1.04 → c5-timeline.json). Facts: c5/PRODUCTION-BIBLE.md.
// Three photo scenes of the same woman (series upgrade), each shown once, joined by SceneCuts:
// 1) early December, hanging lights at home (donations, TFSA timing); 2) with her son by the tree, a piggy bank and a toy
// house (FHSA, RESP); 3) New Year's Eve with her partner (the RRSP myth, the payoff). Mont (SANS) headings. Bridge CTA to A4.
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { PhotoPlate, SceneCuts, type Focus } from './Plate';
import { Flag } from './RaiseShort';
import TL from './c5-timeline.json';
import { C, SANS, Card, Header, Hero, Line, Typed, beatsFrom, ease, pill, shade, type Cap } from './Kit';

export const C5FPS = 24;
const B = beatsFrom(TL, C5FPS);
export const C5DUR = Math.ceil((TL.total + 0.5) * C5FPS);
const HEAD = SANS;
const TAU = Math.PI * 2;
const at = (id: string, fr: number) => Math.round(B[id].s + (B[id].e - B[id].s) * fr);

// scene changes where the meaning changes: family accounts (scene 2), the RRSP myth (scene 3)
const CUTS = [B.fhsa.s, B.rrsp.s];
// object positions per plate (image coordinates of each object's top)
const ENV1 = { u: 0.43, v: 0.76 }, PHONE1 = { u: 0.18, v: 0.69 }, HOUSE2 = { u: 0.46, v: 0.56 }, PIGGY2 = { u: 0.74, v: 0.53 }, ENV3 = { u: 0.42, v: 0.77 };

const K1: Focus[] = [
  { f: 0, u: 0.45, v: 0.3, k: 1.15 },                  // hanging the lights
  { f: B.donate.s, u: 0.42, v: 0.62, k: 1.2 },         // envelope and cocoa
  { f: B.tfsa.s, u: 0.3, v: 0.6, k: 1.25 },            // the phone
];
const K2: Focus[] = [
  { f: 0, u: 0.55, v: 0.32, k: 1.2 },                  // mother and son by the tree
  { f: B.fhsa.s + 30, u: 0.5, v: 0.55, k: 1.25 },      // the toy house
  { f: B.resp.s, u: 0.68, v: 0.5, k: 1.25 },           // the piggy bank
];
const K3: Focus[] = [
  { f: 0, u: 0.6, v: 0.3, k: 1.2 },                    // New Year's Eve toast
  { f: B.rrsp.s + 40, u: 0.5, v: 0.62, k: 1.2 },       // envelope and keys
  { f: B.payoff.s, u: 0.5, v: 0.5, k: 1.0 },           // wide
];

const CAPS: Cap[] = [
  { at: B.hook.s, l1: 'December 31', l2: 'four moves expire', until: B.donate.s - 2 },
  { at: B.donate.s, l1: '1 · Donations', l2: 'counted by year', until: B.tfsa.s - 2 },
  { at: B.tfsa.s, l1: '2 · TFSA timing', l2: 'when the room comes back', until: B.fhsa.s - 2 },
  { at: B.fhsa.s, l1: '3 · Open an FHSA', l2: 'first-home savings', until: B.resp.s - 2 },
  { at: B.resp.s, l1: '4 · RESP grant', l2: 'per calendar year', until: B.rrsp.s - 2 },
  { at: B.rrsp.s, l1: 'The myth', l2: 'the RRSP deadline', until: B.payoff.s - 2 },
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

// persistent strip: the checklist ticks on
const Strip = ({ f }: { f: number }) => {
  const show = ease(f, B.donate.s, B.donate.s + 12) * (1 - ease(f, B.payoff.s - 6, B.payoff.s + 6));
  if (show <= 0) return null;
  const items: [number, React.ReactNode][] = [
    [at('donate', 0.6), <><span style={{ color: C.green }}>✓</span>donations</>],
    [at('tfsa', 0.6), <><span style={{ color: C.green }}>✓</span>TFSA timing</>],
    [at('fhsa', 0.6), <><span style={{ color: C.green }}>✓</span>FHSA opened</>],
    [at('resp', 0.6), <><span style={{ color: C.green }}>✓</span>RESP $2,500</>],
    [at('rrsp', 0.5), <><span style={{ color: C.gold }}>RRSP</span>+60 days</>],
  ];
  return (
    <div style={{ position: 'absolute', left: 80, top: 690, display: 'flex', gap: 10, flexWrap: 'wrap', width: 920, opacity: show }}>
      {items.map(([a, node], i) => { const on = ease(f, a, a + 10); return on > 0 ? <div key={i} style={{ ...pill, fontSize: 20, padding: '10px 18px', opacity: on, transform: `scale(${0.9 + 0.1 * on})` }}>{node}</div> : null; })}
    </div>
  );
};

export const C5v2 = () => {
  const f = useCurrentFrame();
  const end = ease(f, B.payoff.s + 2, B.payoff.s + 20);
  const lift = 1 - ease(f, B.payoff.s - 6, B.payoff.s + 6);
  return (
    <AbsoluteFill style={{ background: '#0d0b09', fontFamily: SANS, overflow: 'hidden' }}>
      <SceneCuts f={f} cuts={CUTS} scene={(i) => i === 0 ? (
        <PhotoPlate f={f} src="plates/c5-s1-4k.jpg" iw={2294} ih={4096} keys={K1} glide={40} blur={0.8} snow={[{ u0: 0.48, v0: 0.02, u1: 0.98, v1: 0.5 }]} steam={{ u: 0.32, v: 0.55, w: 0.05 }}>
          <Pin f={f} a={at('donate', 0.55)} b={B.tfsa.s} p={ENV1} top="DONATION RECEIPT" big="by Dec 31" sub="counts for this year" />
          <Pin f={f} a={at('tfsa', 0.55)} b={B.fhsa.s} p={PHONE1} top="WITHDRAW IN DECEMBER" big="room back Jan 1" col={C.cream} />
        </PhotoPlate>
      ) : i === 1 ? (
        <PhotoPlate f={f} src="plates/c5-s2-4k.jpg" iw={2294} ih={4096} keys={K2} glide={40} blur={0.8} steam={{ u: 0.15, v: 0.56, w: 0.05 }}>
          <Pin f={f} a={at('fhsa', 0.6)} b={B.resp.s} p={HOUSE2} top="FHSA OPENED THIS YEAR" big="$8,000 room" />
          <Pin f={f} a={at('resp', 0.55)} b={B.rrsp.s} p={PIGGY2} top="$2,500 × 20%" big="+$500 grant" col={C.green} />
        </PhotoPlate>
      ) : (
        <PhotoPlate f={f} src="plates/c5-s3-4k.jpg" iw={2294} ih={4096} keys={K3} glide={40} blur={0.8}>
          <Pin f={f} a={at('rrsp', 0.5)} b={B.payoff.s} p={ENV3} top="RRSP FOR 2026" big="60 days into 2027" col={C.cream} />
        </PhotoPlate>
      )} />
      <AbsoluteFill style={{ background: 'linear-gradient(180deg, rgba(8,6,4,.82) 0%, rgba(8,6,4,.55) 14%, rgba(8,6,4,0) 28%, rgba(8,6,4,0) 50%, rgba(8,6,4,.55) 66%, rgba(8,6,4,.8) 100%)', opacity: 1 - 0.75 * lift }} />
      <AbsoluteFill style={{ background: 'linear-gradient(180deg, rgba(8,6,4,.82) 0%, rgba(8,6,4,.55) 14%, rgba(8,6,4,0) 28%, rgba(8,6,4,0) 100%)', opacity: 0.75 * lift }} />
      <Header f={f} chip="CRA · YEAR-END 2026" />
      <Typed f={f} caps={CAPS} head={HEAD} />
      <Strip f={f} />

      <Card f={f} a={B.donate.s} b={B.tfsa.s} label="1 · DONATIONS" top={360} h={300} tone="green">
        <Hero f={f} a={at('donate', 0.3)} size={110}>Dec 31</Hero>
        <Line f={f} a={at('donate', 0.55)} top={232} size={26} color={C.soft}>gifts made by then count for 2026 · official receipt required</Line>
      </Card>
      <Card f={f} a={B.tfsa.s} b={B.fhsa.s} label="2 · TFSA WITHDRAWALS" top={360} h={300}>
        <Line f={f} a={at('tfsa', 0.3)} top={98} size={32}>Out in <span style={{ color: C.gold }}>Dec 2026</span> → room back <span style={{ color: C.green }}>Jan 1, 2027</span></Line>
        <Line f={f} a={at('tfsa', 0.55)} top={154} size={32}>Out in <span style={{ color: C.gold }}>Jan 2027</span> → room back <span style={{ color: C.red }}>Jan 1, 2028</span></Line>
        <Line f={f} a={at('tfsa', 0.7)} top={222} size={24} color={C.soft}>re-contributing without room: 1% a month on the excess</Line>
      </Card>
      <Card f={f} a={B.fhsa.s} b={B.resp.s} label="3 · FHSA · FIRST-TIME HOME BUYERS" top={360} h={300}>
        <Hero f={f} a={at('fhsa', 0.6)} size={110}>$8,000</Hero>
        <Line f={f} a={at('fhsa', 0.75)} top={232} size={24} color={C.soft}>room starts the year you open it · unused room carries forward</Line>
      </Card>
      <Card f={f} a={B.resp.s} b={B.rrsp.s} label="4 · RESP · CANADA EDUCATION SAVINGS GRANT" top={360} h={300} tone="green">
        <Line f={f} a={at('resp', 0.15)} top={92} size={30} color={C.soft}>$2,500 contributed in 2026 × 20%</Line>
        <Hero f={f} a={at('resp', 0.55)} top={132} size={96}>+$500</Hero>
        <Line f={f} a={at('resp', 0.75)} top={240} size={24} color={C.soft}>missed years carry forward · max $1,000 grant a year</Line>
      </Card>
      <Card f={f} a={B.rrsp.s} b={B.payoff.s} label="MYTH · THE RRSP DEADLINE" top={360} h={300} tone="red">
        <Hero f={f} a={at('rrsp', 0.4)} size={104}>+60 days</Hero>
        <Line f={f} a={at('rrsp', 0.6)} top={226} size={24} color={C.soft}>first 60 days of 2027 count for 2026 · age 71? Dec 31</Line>
      </Card>

      {f >= B.payoff.s && (
        <div style={{ position: 'absolute', left: 80, right: 80, top: 1010, opacity: end, transform: `translateY(${(1 - end) * 40}px)` }}>
          <Flag f={f} w={150} amp={0.06} />
          <div style={{ marginTop: 26, fontFamily: HEAD, fontSize: 58, fontWeight: 900, lineHeight: 1.1, color: C.cream, textShadow: shade }}>Four moves.<br />One date: Dec 31.</div>
          <div style={{ marginTop: 34, display: 'inline-flex', padding: '20px 32px', borderRadius: 999, background: 'linear-gradient(160deg,#fff1c2,#f1c75b 50%,#c88f1f)', color: '#2b1d03', fontSize: 34, fontWeight: 900, boxShadow: '0 16px 30px rgba(0,0,0,.4)', opacity: ease(f, B.cta.s - 4, B.cta.s + 8), transform: `scale(${1 + 0.03 * Math.sin(TAU * (f - B.cta.s) / 36)})` }}>Next: what makes CRA review you →</div>
          <div style={{ marginTop: 12, fontSize: 26, fontWeight: 700, color: C.cream, textShadow: shade, opacity: ease(f, at('cta', 0.6), at('cta', 0.7)) }}>Follow so you don't miss it</div>
          <div style={{ marginTop: 28, fontSize: 19, fontWeight: 600, color: C.soft, lineHeight: 1.45, opacity: ease(f, B.payoff.s + 16, B.payoff.s + 30) }}>
            Source: canada.ca (CRA: gifts and income tax; TFSA withdrawals; FHSA participation room; RRSP dates · ESDC: CESG) · general info, not advice
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
