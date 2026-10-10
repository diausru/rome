// "Gifts and tax in Canada" (Christmas special, Dec 22) in the approved look (Kit + Plate). Up to 1:30 by the
// user's decision for this video only. Master timeline = Grady voiceover (xmas/vo-beats.json → tools/vo_hf.py →
// xmas-timeline.json). Facts: xmas/PRODUCTION-BIBLE.md.
// Three festive photo scenes of the same family, gifts everywhere, each shown once, joined by SceneCuts:
// 1) Christmas Eve by the tree (gifts, attribution); 2) dinner, the father hands his son a cottage-shaped gift
// (property gifts, example); 3) Christmas morning, unwrapped presents (gifts from the boss, payoff). Mont (SANS).
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { PhotoPlate, SceneCuts, type Focus } from './Plate';
import { Flag } from './RaiseShort';
import TL from './xmas-timeline.json';
import { C, SANS, Card, Header, Hero, Line, Typed, beatsFrom, ease, pill, shade, type Cap } from './Kit';

export const XMASFPS = 24;
const B = beatsFrom(TL, XMASFPS);
export const XMASDUR = Math.ceil((TL.total + 0.5) * XMASFPS);
const HEAD = SANS;
const TAU = Math.PI * 2;
const at = (id: string, fr: number) => Math.round(B[id].s + (B[id].e - B[id].s) * fr);

// scene changes where the meaning changes: gifts that aren't cash (scene 2), the gift from the boss (scene 3)
const CUTS = [B.property.s, B.boss.s];
// object positions per plate (image coordinates of each object's top; HOUSE2 is the cottage's base)
const ENV1 = { u: 0.43, v: 0.73 }, HOUSE2 = { u: 0.47, v: 0.505 }, BOX3 = { u: 0.25, v: 0.58 };

const K1: Focus[] = [
  { f: 0, u: 0.42, v: 0.36, k: 1.3 },                  // the family by the tree
  { f: B.receive.s + 20, u: 0.42, v: 0.6, k: 1.2 },    // gifts and the red-ribbon envelope
  { f: B.spouse.s + 30, u: 0.36, v: 0.4, k: 1.28 },    // the parents
  { f: B.kids.s, u: 0.5, v: 0.48, k: 1.08 },           // wider: the whole family, gifts everywhere
];
const K2: Focus[] = [
  { f: 0, u: 0.44, v: 0.42, k: 1.25 },                 // the father hands over the little cottage
  { f: B.example.s + 40, u: 0.5, v: 0.5, k: 1.12 },    // the table full of presents
];
const K3: Focus[] = [
  { f: 0, u: 0.45, v: 0.42, k: 1.22 },                 // morning: unwrapping on the rug
  { f: B.boss.s + 40, u: 0.32, v: 0.5, k: 1.2 },      // the open gift box
  { f: B.payoff.s, u: 0.5, v: 0.5, k: 1.0 },           // wide
];
const SNOW1 = [{ u0: 0.31, v0: 0.0, u1: 0.58, v1: 0.27 }];
const SNOW2 = [{ u0: 0.31, v0: 0.0, u1: 0.6, v1: 0.25 }];
const SNOW3 = [{ u0: 0.31, v0: 0.0, u1: 0.65, v1: 0.24 }];

const CAPS: Cap[] = [
  { at: B.hook.s, l1: 'Cash under the tree?', l2: 'no gift tax in Canada', until: B.receive.s - 2 },
  { at: B.receive.s, l1: 'Got a gift?', l2: 'not income', until: B.spouse.s - 2 },
  { at: B.spouse.s, l1: 'Catch #1', l2: 'giving to your spouse', until: B.tfsa.s - 2 },
  { at: B.tfsa.s, l1: 'The exception', l2: 'their own TFSA', until: B.kids.s - 2 },
  { at: B.kids.s, l1: 'Gifts to kids', l2: 'under eighteen', until: B.property.s - 2 },
  { at: B.property.s, l1: 'Catch #2', l2: "gifts that aren't cash", until: B.example.s - 2 },
  { at: B.example.s, l1: 'Example', l2: 'shares to an adult son', until: B.boss.s - 2 },
  { at: B.boss.s, l1: 'From your boss', l2: 'the $500 rule', until: B.payoff.s - 2 },
];

// below: the pill hangs under the anchor (used where the space above the object belongs to the card and strip)
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

// persistent strip: who pays tax on which gift, building up beat by beat
const Strip = ({ f }: { f: number }) => {
  const show = ease(f, B.receive.s, B.receive.s + 12) * (1 - ease(f, B.payoff.s - 6, B.payoff.s + 6));
  if (show <= 0) return null;
  const items: [number, React.ReactNode][] = [
    [at('receive', 0.5), <><span style={{ color: C.green }}>✓</span>a gift: not income</>],
    [at('spouse', 0.7), <><span style={{ color: C.gold }}>1</span>spouse invests it: taxed to you</>],
    [at('tfsa', 0.5), <><span style={{ color: C.green }}>✓</span>their TFSA: exception</>],
    [at('kids', 0.6), <><span style={{ color: C.gold }}>2</span>kids under 18: taxed to you</>],
    [at('property', 0.6), <><span style={{ color: C.gold }}>3</span>property: treated as sold</>],
    [at('boss', 0.6), <><span style={{ color: C.green }}>✓</span>boss: non-cash ≤ $500</>],
  ];
  return (
    <div style={{ position: 'absolute', left: 80, top: 690, display: 'flex', gap: 10, flexWrap: 'wrap', width: 920, opacity: show }}>
      {items.map(([a, node], i) => { const on = ease(f, a, a + 10); return on > 0 ? <div key={i} style={{ ...pill, fontSize: 20, padding: '10px 18px', opacity: on, transform: `scale(${0.9 + 0.1 * on})` }}>{node}</div> : null; })}
    </div>
  );
};

export const XmasV2 = () => {
  const f = useCurrentFrame();
  const end = ease(f, B.payoff.s + 2, B.payoff.s + 20);
  const lift = 1 - ease(f, B.payoff.s - 6, B.payoff.s + 6);
  return (
    <AbsoluteFill style={{ background: '#0d0b09', fontFamily: SANS, overflow: 'hidden' }}>
      <SceneCuts f={f} cuts={CUTS} scene={(i) => i === 0 ? (
        <PhotoPlate f={f} src="plates/xmas-s1-4k.jpg" iw={2294} ih={4096} keys={K1} glide={40} blur={0.8} snow={SNOW1} steam={{ u: 0.83, v: 0.665, w: 0.05 }}>
          <Pin f={f} a={at('receive', 0.3)} b={B.spouse.s} p={ENV1} top="A GIFT" big="not income" col={C.cream} />
        </PhotoPlate>
      ) : i === 1 ? (
        <PhotoPlate f={f} src="plates/xmas-s2-4k.jpg" iw={2294} ih={4096} keys={K2} glide={40} blur={0.8} snow={SNOW2}>
          <Pin f={f} a={at('property', 0.55)} b={B.example.s} p={HOUSE2} top="TREATED AS SOLD" big="at market value" col={C.cream} below />
          <Pin f={f} a={at('example', 0.6)} b={B.boss.s} p={HOUSE2} top="YOU REPORT" big="$20,000 gain" sub="not your son" below />
        </PhotoPlate>
      ) : (
        <PhotoPlate f={f} src="plates/xmas-s3-4k.jpg" iw={2294} ih={4096} keys={K3} glide={40} blur={0.8} snow={SNOW3} steam={{ u: 0.88, v: 0.69, w: 0.05 }}>
          <Pin f={f} a={at('boss', 0.45)} b={B.payoff.s} p={BOX3} top="NON-CASH GIFT" big="up to $500" sub="a year, tax-free" />
        </PhotoPlate>
      )} />
      <AbsoluteFill style={{ background: 'linear-gradient(180deg, rgba(8,6,4,.82) 0%, rgba(8,6,4,.55) 14%, rgba(8,6,4,0) 28%, rgba(8,6,4,0) 50%, rgba(8,6,4,.55) 66%, rgba(8,6,4,.8) 100%)', opacity: 1 - 0.75 * lift }} />
      <AbsoluteFill style={{ background: 'linear-gradient(180deg, rgba(8,6,4,.82) 0%, rgba(8,6,4,.55) 14%, rgba(8,6,4,0) 28%, rgba(8,6,4,0) 100%)', opacity: 0.75 * lift }} />
      <Header f={f} chip="CRA · GIFTS & TAX" />
      <Typed f={f} caps={CAPS} head={HEAD} />
      <Strip f={f} />

      <Card f={f} a={B.receive.s} b={B.spouse.s} label="GIFTS & INHERITANCES" top={360} h={300} tone="green">
        <Hero f={f} a={at('receive', 0.25)} size={104}>not income</Hero>
        <Line f={f} a={at('receive', 0.7)} top={232} size={22} color={C.soft}>you don't report the gift · what it earns later is taxable</Line>
      </Card>
      <Card f={f} a={B.spouse.s} b={B.tfsa.s} label="CATCH #1 · A GIFT TO YOUR SPOUSE OR PARTNER" top={360} h={300}>
        <Line f={f} a={at('spouse', 0.08)} top={92} size={30} color={C.soft}>money you give them to invest</Line>
        <Hero f={f} a={at('spouse', 0.82)} top={128} size={96}>taxed to you</Hero>
        <Line f={f} a={at('spouse', 0.5)} top={236} size={22} color={C.soft}>interest · dividends · capital gains · the attribution rules</Line>
      </Card>
      <Card f={f} a={B.tfsa.s} b={B.kids.s} label="THE EXCEPTION · THEIR OWN TFSA" top={360} h={300} tone="green">
        <Hero f={f} a={at('tfsa', 0.55)} size={92}>not attributed</Hero>
        <Line f={f} a={at('tfsa', 0.75)} top={232} size={22} color={C.soft}>money your spouse or partner contributes to their own TFSA</Line>
      </Card>
      <Card f={f} a={B.kids.s} b={B.property.s} label="GIFTS TO KIDS UNDER 18" top={360} h={300}>
        <Line f={f} a={at('kids', 0.3)} top={92} size={30} color={C.soft}>interest and dividends on that money</Line>
        <Hero f={f} a={at('kids', 0.78)} top={128} size={96}>taxed to you</Hero>
        <Line f={f} a={at('kids', 0.85)} top={236} size={22} color={C.soft}>children, grandchildren and other related minors · general rule</Line>
      </Card>
      <Card f={f} a={B.property.s} b={B.example.s} label="CATCH #2 · GIFTS THAT AREN'T CASH" top={360} h={300}>
        <Line f={f} a={at('property', 0.25)} top={92} size={30} color={C.soft}>shares · a cottage · crypto</Line>
        <Hero f={f} a={at('property', 0.72)} top={128} size={92}>treated as sold</Hero>
        <Line f={f} a={at('property', 0.85)} top={236} size={22} color={C.soft}>at fair market value · to a spouse or partner: generally rolls over at cost</Line>
      </Card>
      <Card f={f} a={B.example.s} b={B.boss.s} label="EXAMPLE · SHARES GIVEN TO AN ADULT SON" top={360} h={300}>
        <Line f={f} a={at('example', 0.06)} top={92} size={30} color={C.soft}>bought for $10,000 → worth $30,000 now</Line>
        <Hero f={f} a={at('example', 0.55)} top={128} size={96}>$20,000 gain</Hero>
        <Line f={f} a={at('example', 0.85)} top={236} size={22} color={C.soft}>× ½ = $10,000 added to your income · his cost becomes $30,000</Line>
      </Card>
      <Card f={f} a={B.boss.s} b={B.payoff.s} label="GIFTS & AWARDS FROM YOUR EMPLOYER" top={360} h={300} tone="green">
        <Line f={f} a={at('boss', 0.1)} top={92} size={30} color={C.soft}>non-cash, total value per year</Line>
        <Hero f={f} a={at('boss', 0.55)} top={128} size={96}>$500 tax-free</Hero>
        <Line f={f} a={at('boss', 0.82)} top={236} size={22} color={C.soft}>above $500, only the excess is taxable · cash and near-cash: always</Line>
      </Card>

      {f >= B.payoff.s && (
        <div style={{ position: 'absolute', left: 80, right: 80, top: 1000, opacity: end, transform: `translateY(${(1 - end) * 40}px)` }}>
          <Flag f={f} w={150} amp={0.06} />
          <div style={{ marginTop: 26, fontFamily: HEAD, fontSize: 56, fontWeight: 900, lineHeight: 1.1, color: C.cream, textShadow: shade }}>The gift is <span style={{ color: C.gold }}>tax-free</span>.<br />What it earns may not be.</div>
          <div style={{ marginTop: 34, display: 'inline-flex', padding: '20px 32px', borderRadius: 999, background: 'linear-gradient(160deg,#fff1c2,#f1c75b 50%,#c88f1f)', color: '#2b1d03', fontSize: 34, fontWeight: 900, boxShadow: '0 16px 30px rgba(0,0,0,.4)', opacity: ease(f, B.cta.s - 4, B.cta.s + 8), transform: `scale(${1 + 0.03 * Math.sin(TAU * (f - B.cta.s) / 36)})` }}>Next: the Dec 30 stock deadline →</div>
          <div style={{ marginTop: 12, fontSize: 26, fontWeight: 700, color: C.cream, textShadow: shade, opacity: ease(f, at('cta', 0.6), at('cta', 0.7)) }}>Follow so you don't miss it</div>
          <div style={{ marginTop: 28, fontSize: 19, fontWeight: 600, color: C.soft, lineHeight: 1.45, opacity: ease(f, B.payoff.s + 16, B.payoff.s + 30) }}>
            Source: canada.ca (CRA: Amounts that are not reported or taxed; Transfers of capital property; TFSA; Gifts, awards and long-service awards) · the family and shares are an example · general info, not advice
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
