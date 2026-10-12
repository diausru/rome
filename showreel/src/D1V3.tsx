// D1 "Your tuition slip is worth money: whose?" on the motion engine v1 (2026-10-12). Federal tuition credit (2026):
// claim first, transfer up to $5,000 to one parent / grandparent / spouse, carry the rest forward; education and
// textbook amounts ended after 2016. Numbers come from d1/data.json; derived values are computed here, never typed in.
// Cue anchors: d1/reel.json → tools/reel_cues.py → d13-cues.json (the same times drive the sounds in d1/sfx-cues.json).
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { PhotoPlate, SceneCuts, type Focus } from './Plate';
import { Flag } from './RaiseShort';
import { Typed, beatsFrom, type Cap } from './Kit';
import TL from './d1-timeline.json';
import WORDS from './d1-words.json';
import CUE from './d13-cues.json';
import DATA from '../../d1/data.json';
import REEL from '../../d1/reel.json';
import { T, goldFill, textShadow } from './motion/brand';
import { Captions, Count, Depth, Glass, Kinetic, NavyGrade, Tag, Tile, Vapor, clamp, ease, money, outExpo } from './motion/Reel';

export const D13FPS = 24;
const B = beatsFrom(TL, D13FPS);
export const D13DUR = Math.ceil((TL.total + REEL.hold_after_vo) * D13FPS);
const Q = Object.fromEntries(Object.entries(CUE).map(([k, v]) => [k, Math.round((v as number) * D13FPS)])) as Record<string, number>;

// verified example (d1/data.json) → derived values (same formulas as data.json "derive", re-checked by tools/reel_check.py)
const X = DATA.example;
const MOVED = Math.min(X.transfer_cap, X.tuition);
const CREDIT = Math.round(X.tuition * X.rate), TRANSFER = Math.round(MOVED * X.rate), CARRY = X.tuition - MOVED, CARRY_CREDIT = Math.round(CARRY * X.rate);
const PCT = Math.round(X.rate * 100);

const CUTS = [B.first.s, B.carry.s];
const L = Object.fromEntries(Object.entries(REEL.layout).map(([k, v]) => [k, { y: v.box[1], h: v.box[3], w: v.box[2] }])) as Record<string, { y: number; h: number; w: number }>;
// focus points keep the faces above the lower-third panels (focus v sits at the frame centre)
const K1: Focus[] = [
  { f: 0, u: 0.5, v: 0.5, k: 1.3 },                    // her face over the envelope (hook)
  { f: B.rule.s, u: 0.56, v: 0.56, k: 1.14 },          // the table: envelope, notebook, coffee (the rule)
  { f: B.example.s, u: 0.5, v: 0.55, k: 1.2 },
];
const K2: Focus[] = [
  { f: 0, u: 0.5, v: 0.52, k: 1.12 },                  // mother and daughter at the kitchen table
  { f: B.transfer.s, u: 0.4, v: 0.5, k: 1.2 },         // toward the parent: the transfer
];
const K3: Focus[] = [
  { f: 0, u: 0.5, v: 0.5, k: 1.12 },                   // years later, the first job
  { f: B.gone.s, u: 0.45, v: 0.5, k: 1.2 },
  { f: B.cta.s, u: 0.5, v: 0.5, k: 1.04 },
];

const CAPS: Cap[] = [
  { at: B.rule.s, l1: 'THE SLIP', l2: 'T2202 = eligible tuition', until: B.example.s - 2 },
  { at: B.example.s, l1: 'EXAMPLE', l2: 'one year of tuition', until: B.first.s - 2 },
  { at: B.first.s, l1: 'STEP 1', l2: 'the student claims first', until: B.transfer.s - 2 },
  { at: B.transfer.s, l1: 'STEP 2', l2: 'transfer up to $5,000', until: B.carry.s - 2 },
  { at: B.carry.s, l1: 'STEP 3', l2: 'carry the rest forward', until: B.gone.s - 2 },
  { at: B.gone.s, l1: 'WHAT ENDED', l2: 'education + textbook', until: B.cta.s - 2 },
];

// ---------- the hook: frame 0 already carries the topic ----------
const Hook = ({ f }: { f: number }) => {
  const out = B.rule.s;
  const hero = outExpo((f - Q.whose) / 14);
  const glow = f >= Q.whose ? 0.5 + 0.5 * Math.sin((f - Q.whose) * 0.18) * Math.exp(-(f - Q.whose) / 30) : 0;
  const o = ease(f, out, out + 12);
  return (
    <>
      {REEL.hook.tags.map((t, i) => <Tag key={i} f={f} at={Q[t.cue]} text={t.text} x={t.x} y={t.y} from={t.from as 'left'} out={out - 4 + i * 2} seed={i + 1} />)}
      <Kinetic f={f} at={0} now text={REEL.hook.lines[0]} x={80} y={880} size={78} out={out} nowrap />
      <Kinetic f={f} at={Q.real} text={REEL.hook.lines[1]} x={80} y={984} size={72} from="left" out={out} nowrap />
      {hero > 0 && o < 1 && (
        <div style={{ position: 'absolute', left: 76, top: 1058, opacity: (1 - o) * clamp(hero * 1.5), transform: `scale(${0.82 + 0.18 * hero}) translateY(${-o * 40}px)`, transformOrigin: '0% 50%', filter: o > 0 ? `blur(${o * 8}px)` : undefined }}>
          <div style={{ position: 'absolute', left: -40, top: -20, width: 620, height: 220, borderRadius: '50%', background: `radial-gradient(closest-side, rgba(241,199,91,${0.28 * glow}), rgba(241,199,91,0))` }} />
          <Kinetic f={f} at={Q.whose} text={REEL.hook.hero} x={0} y={0} size={160} gold stagger={3} nowrap />
        </div>
      )}
      {f >= out && f < out + 30 && <Vapor f={f} a={out} x={80} y={880} w={760} h={380} n={50} seed={7} />}
    </>
  );
};

const Pct = ({ f, a, value, size }: { f: number; a: number; value: number; size: number }) => {
  if (f < a) return null;
  const shown = f >= a + 14 ? value : Math.round(value * outExpo((f - a) / 14));
  return <span style={{ fontFamily: T.font, fontSize: size, fontWeight: 900, fontVariantNumeric: 'tabular-nums', ...goldFill }}>{shown}%</span>;
};

const Chip = ({ f, at, text, x, y, col = T.gold }: { f: number; at: number; text: string; x: number; y: number; col?: string }) => {
  const p = outExpo((f - at) / 12);
  if (p <= 0) return null;
  return <div style={{ position: 'absolute', left: x, top: y + (1 - p) * 18, opacity: p, padding: '10px 20px', borderRadius: 999, border: `1.5px solid ${col}`, background: 'rgba(12,18,30,.55)',
    fontFamily: T.font, fontSize: 24, fontWeight: 800, letterSpacing: 2, color: T.white, whiteSpace: 'nowrap', boxShadow: `0 0 ${18 * p}px rgba(241,199,91,.18)` }}>{text}</div>;
};

// ---------- beats ----------
const Rule = ({ f }: { f: number }) => (
  <Glass f={f} a={B.rule.s + 4} b={B.example.s - 2} y={L.rule.y} h={L.rule.h} w={L.rule.w} label={`Federal tuition credit · ${DATA.tax_year}`} exit="vapor" lit={ease(f, Q.pct, Q.pct + 8) * 0.6}>
    <Kinetic f={f} at={Q.slip} text="T2202 = YOUR TUITION" x={50} y={92} size={54} nowrap />
    <Tile f={f} at={B.rule.s + 16} lit={Q.pct} x={40} y={200} w={390} h={160} title="Credit rate" value={<Pct f={f} a={Q.pct} value={PCT} size={64} />} valueSize={64} />
    <Tile f={f} at={B.rule.s + 20} lit={Q.hundred} x={450} y={200} w={390} h={160} title="Fees per school" value={`OVER ${money(X.min_fees)}`} valueSize={44} mark="ok" toneOf="green" />
  </Glass>
);

const Example = ({ f }: { f: number }) => (
  <Glass f={f} a={B.example.s + 2} b={B.first.s - 2} y={L.example.y} h={L.example.h} w={L.example.w} label="Example · one year" enter="wipe" exit="fade" lit={ease(f, Q.credit, Q.credit + 8)}>
    <Tile f={f} at={B.example.s + 8} lit={Q.tuition} off={Q.credit} x={40} y={92} w={800} h={116} title="Tuition on your T2202" value={<Count f={f} a={Q.tuition} value={X.tuition} size={56} gold={false} />} valueSize={56} />
    {f >= Q.credit - 6 && (
      <div style={{ position: 'absolute', left: 44, top: 240, display: 'flex', alignItems: 'baseline', gap: 22, opacity: outExpo((f - Q.credit + 6) / 10) }}>
        <div style={{ fontFamily: T.font, fontSize: 24, fontWeight: 800, letterSpacing: 3, color: T.gold }}>× {PCT}% = CREDIT</div>
        <Count f={f} a={Q.credit} value={CREDIT} size={100} />
      </div>
    )}
  </Glass>
);

const First = ({ f }: { f: number }) => (
  <Glass f={f} a={B.first.s + 6} b={B.transfer.s - 2} y={L.first.y} h={L.first.h} w={L.first.w} label="Step 1 · the student claims first" enter="slideL" exit="fade" lit={ease(f, Q.nothing, Q.nothing + 8) * 0.6}>
    <Kinetic f={f} at={B.first.s + 12} text="YOURS FIRST" x={50} y={90} size={60} nowrap />
    <Tile f={f} at={B.first.s + 18} lit={Q.income} off={Q.nothing} x={40} y={190} w={390} h={150} title="Summer job income" value={<Count f={f} a={Q.income} value={X.student_income} size={52} gold={false} />} valueSize={52} />
    <Tile f={f} at={B.first.s + 22} lit={Q.nothing} x={450} y={190} w={390} h={150} title="Federal tax owed" value="$0" valueSize={56} mark="ok" toneOf="green" />
    <div style={{ position: 'absolute', left: 44, top: 354, fontFamily: T.font, fontSize: 22, fontWeight: 700, color: T.soft, opacity: ease(f, Q.nothing + 10, Q.nothing + 22) }}>
      so none of the {money(CREDIT)} is needed by you this year</div>
  </Glass>
);

const Transfer = ({ f }: { f: number }) => {
  const fill = outExpo((f - Q.five) / 18), share = MOVED / X.tuition, W0 = 780;
  const who = ['PARENT', 'GRANDPARENT', 'SPOUSE'];
  return (
    <Glass f={f} a={B.transfer.s + 2} b={B.carry.s - 2} y={L.transfer.y} h={L.transfer.h} w={L.transfer.w} label="Step 2 · transfer (Schedule 11)" enter="glass" exit="fade" lit={ease(f, Q.seven, Q.seven + 8)}>
      <div style={{ position: 'absolute', left: 50, top: 100, width: W0, height: 46, borderRadius: 23, background: 'rgba(255,255,255,.06)', border: `1px solid ${T.glassEdge}` }} />
      <div style={{ position: 'absolute', left: 50, top: 100, width: W0 * share * fill, height: 46, borderRadius: 23, background: `linear-gradient(90deg, ${T.goldDeep}, ${T.gold}, ${T.goldHi})` }} />
      <div style={{ position: 'absolute', left: 50 + W0 * share + 4, top: 100, width: (W0 * (1 - share) - 4) * fill, height: 46, borderRadius: 23, background: 'rgba(160,180,210,.35)' }} />
      <div style={{ position: 'absolute', left: 50, top: 156, fontFamily: T.font, fontSize: 24, fontWeight: 900, color: T.gold, opacity: fill }}>UP TO {money(MOVED)} → ONE PERSON</div>
      <div style={{ position: 'absolute', left: 50 + W0 * share + 14, top: 156, fontFamily: T.font, fontSize: 24, fontWeight: 800, color: T.mute, opacity: fill }}>{money(CARRY)} STAYS</div>
      {who.map((w, i) => <Chip key={w} f={f} at={Q.parent + i * 5} text={w} x={50 + [0, 196, 470][i]} y={208} />)}
      {f >= Q.seven - 4 && (
        <div style={{ position: 'absolute', left: 50, top: 286, display: 'flex', alignItems: 'baseline', gap: 22, opacity: outExpo((f - Q.seven + 4) / 10) }}>
          <Count f={f} a={Q.seven} value={TRANSFER} size={92} />
          <div style={{ fontFamily: T.font, fontSize: 28, fontWeight: 900, letterSpacing: 2, color: T.white }}>OFF THEIR TAX</div>
        </div>
      )}
      <div style={{ position: 'absolute', left: 50, top: 394, fontFamily: T.font, fontSize: 22, fontWeight: 700, color: T.soft, opacity: ease(f, Q.owe, Q.owe + 10) }}>
        only if they owe tax · {money(MOVED)} × {PCT}% · this year's tuition only</div>
    </Glass>
  );
};

const Carry = ({ f }: { f: number }) => (
  <Glass f={f} a={B.carry.s + 6} b={B.gone.s - 2} y={L.carry.y} h={L.carry.h} w={L.carry.w} label="Step 3 · carry forward" toneOf="green" enter="slideR" exit="vapor" lit={ease(f, Q.four, Q.four + 8) * 0.7}>
    {f >= Q.three - 4 && (
      <div style={{ position: 'absolute', left: 50, top: 92, display: 'flex', alignItems: 'baseline', gap: 20, opacity: outExpo((f - Q.three + 4) / 10) }}>
        <Count f={f} a={Q.three} value={CARRY} size={64} gold={false} />
        <div style={{ fontFamily: T.font, fontSize: 32, fontWeight: 900, letterSpacing: 1, color: T.white }}>STAYS WITH YOU</div>
      </div>
    )}
    {f >= Q.four - 4 && (
      <div style={{ position: 'absolute', left: 50, top: 186, display: 'flex', alignItems: 'baseline', gap: 22, opacity: outExpo((f - Q.four + 4) / 10) }}>
        <div style={{ fontFamily: T.font, fontSize: 24, fontWeight: 800, letterSpacing: 3, color: T.gold }}>FUTURE CREDIT</div>
        <Count f={f} a={Q.four} value={CARRY_CREDIT} size={92} />
      </div>
    )}
    <Chip f={f} at={Q.expiry} text="NO EXPIRY" x={50} y={312} col={T.green} />
    <Chip f={f} at={Q.only} text="YOUR OWN RETURN ONLY" x={280} y={312} />
  </Glass>
);

const Gone = ({ f }: { f: number }) => (
  <Glass f={f} a={B.gone.s + 4} b={B.cta.s - 2} y={L.gone.y} h={L.gone.h} w={L.gone.w} label="Federal · after 2016" toneOf="red" enter="glass" exit="collapse" collapseTo="50% 100%">
    <Tile f={f} at={B.gone.s + 10} lit={Q.ended} x={40} y={92} w={390} h={130} title="Education amount" value="ENDED" valueSize={40} mark="no" toneOf="red" />
    <Tile f={f} at={B.gone.s + 14} lit={Q.ended + 4} x={450} y={92} w={390} h={130} title="Textbook amount" value="ENDED" valueSize={40} mark="no" toneOf="red" />
    <Tile f={f} at={Q.left - 8} lit={Q.left} x={40} y={244} w={800} h={130} title="Tuition credit" value="STILL HERE" valueSize={44} mark="ok" toneOf="green" />
  </Glass>
);

// ---------- end: the three steps collapse into the final line ----------
const Final = ({ f }: { f: number }) => {
  const a = B.cta.s;
  const points = ['CLAIM IT FIRST', `TRANSFER UP TO ${money(X.transfer_cap)}`, 'CARRY THE REST'];
  const merge = ease(f, a + 22, a + 36);
  const end = ease(f, a + 28, a + 44);
  return (
    <>
      {points.map((p, i) => {
        const pin = outExpo((f - a - i * 3) / 12);
        if (pin <= 0 || merge >= 1) return null;
        const y0 = 560 + i * 82, x0 = i % 2 ? 1080 : -400;
        return <div key={i} style={{ position: 'absolute', left: 80 + (x0 - 80) * (1 - pin), top: y0 + (1060 - y0) * merge, opacity: (1 - merge) * pin, transform: `scale(${1 - 0.4 * merge})`, transformOrigin: '0 50%',
          padding: '12px 22px', borderRadius: 999, background: 'rgba(12,18,30,.66)', backdropFilter: 'blur(10px)', border: `1px solid ${T.glassEdge}`, fontFamily: T.font, fontSize: 28, fontWeight: 800, letterSpacing: 2, color: T.white }}>
          <span style={{ color: T.gold, marginRight: 12 }}>{i + 1}</span>{p}</div>;
      })}
      {f >= a + 24 && (
        <div style={{ position: 'absolute', left: 80, width: L.end_block.w, top: L.end_block.y, opacity: end, transform: `translateY(${(1 - end) * 40}px)` }}>
          <Flag f={f} w={150} amp={0.06} />
          <div style={{ position: 'relative', marginTop: 26, height: 70 }}><Kinetic f={f} at={a + 28} text="YOUR SLIP." x={0} y={0} size={60} nowrap /></div>
          <div style={{ marginTop: 6, display: 'flex', alignItems: 'baseline', gap: 18 }}>
            <span style={{ fontFamily: T.font, fontSize: 60, fontWeight: 900, color: T.white, textShadow }}>YOUR TAX</span>
            <span style={{ fontFamily: T.font, fontSize: 60, fontWeight: 900, color: T.gold, textShadow }}>FIRST.</span>
          </div>
          <div style={{ marginTop: 26, display: 'inline-flex', padding: '18px 30px', borderRadius: 999, background: `linear-gradient(160deg,${T.goldHi},${T.gold} 50%,${T.goldDeep})`, color: '#1d1503', fontFamily: T.font, fontSize: 32, fontWeight: 900,
            opacity: ease(f, a + 36, a + 48), transform: `scale(${1 + 0.03 * Math.sin((f - a) / 6)})` }}>NEXT: MANITOBA TAX BRACKETS →</div>
          <div style={{ marginTop: 12, fontFamily: T.font, fontSize: 26, fontWeight: 700, color: T.white, textShadow, opacity: ease(f, Q.next + 100, Q.next + 112) }}>Follow so you don't miss it</div>
          <div style={{ marginTop: 22, fontFamily: T.font, fontSize: 18, fontWeight: 600, color: T.mute, lineHeight: 1.45, opacity: ease(f, a + 36, a + 50) }}>
            Source: Income Tax Act ss. 117(2), 118.5, 118.61, 118.81, 118.9 · canada.ca (CRA line 32300, Schedule 11) · federal, tax year {DATA.tax_year} · example only · provincial credits differ · general info, not advice
          </div>
        </div>
      )}
    </>
  );
};

const Header = ({ f }: { f: number }) => (
  <div style={{ position: 'absolute', left: 80, top: 92, right: 80, display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: T.white, fontSize: 22, fontWeight: 800, letterSpacing: 4, fontFamily: T.font }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}><Flag f={f} w={72} />TAX SECRETS CANADA</div>
    <div style={{ color: T.gold, letterSpacing: 5 }}>CRA · STUDENTS · T2202</div>
  </div>
);

export const D1V3 = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: T.navy, fontFamily: T.font, overflow: 'hidden' }}>
      <SceneCuts f={f} cuts={CUTS} scene={(i) => i === 0 ? (
        <PhotoPlate f={f} src="plates/d1-s1-4k.jpg" iw={2294} ih={4096} keys={K1} glide={40} blur={0.8 + 5 * (1 - ease(f, 0, 22))} snow={[{ u0: 0.0, v0: 0.0, u1: 0.42, v1: 0.36 }]} steam={{ u: 0.84, v: 0.58, w: 0.05 }} />
      ) : i === 1 ? (
        <PhotoPlate f={f} src="plates/d1-s2-4k.jpg" iw={2294} ih={4096} keys={K2} glide={40} blur={0.8} snow={[{ u0: 0.0, v0: 0.02, u1: 0.33, v1: 0.3 }]} steam={{ u: 0.9, v: 0.63, w: 0.05 }}>
          {/* the calculator keys carry tiny glyphs and a corner mark: a feathered local blur (reads as foreground defocus) */}
          <div style={{ position: 'absolute', left: '60%', top: '73%', width: '33%', height: '10.5%', borderRadius: '30%', backdropFilter: 'blur(12px)', maskImage: 'radial-gradient(closest-side, #000 70%, transparent)', WebkitMaskImage: 'radial-gradient(closest-side, #000 70%, transparent)' }} />
        </PhotoPlate>
      ) : (
        <PhotoPlate f={f} src="plates/d1-s3-4k.jpg" iw={2294} ih={4096} keys={K3} glide={40} blur={0.8} />
      )} />
      <Depth f={f} seed={f < B.first.s ? 1 : f < B.carry.s ? 2 : 3} warm={0.75} />
      <NavyGrade low={f >= B.cta.s ? 1.1 : 1} />
      <Header f={f} />
      <Typed f={f} caps={CAPS} head={T.font} />
      {f < B.rule.s + 30 && <Hook f={f} />}
      <Rule f={f} />
      <Example f={f} />
      <First f={f} />
      <Transfer f={f} />
      <Carry f={f} />
      <Gone f={f} />
      <Final f={f} />
      <Captions f={f} fps={D13FPS} beats={WORDS.beats as never} from={Q.whose + 30} until={B.cta.s} y={1296} />
    </AbsoluteFill>
  );
};
