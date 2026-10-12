// "Down on a stock? Sell by December 30" rebuilt on the motion engine v1 (sample reel for the engine upgrade,
// 2026-10-12). Same verified script, voice and plates as NyV2; new: a progressive hook, kinetic ALL-CAPS headings,
// narration-driven highlights and count-ups, word-synced captions, depth layers, glass entrances/exits, and a sound
// layer (tools/sfx.py) on the same anchors as the visuals (ny/reel.json → tools/reel_cues.py → ny3-cues.json).
// Numbers come from ny/data.json; derived values are computed here, never typed in.
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { PhotoPlate, SceneCuts, type Focus } from './Plate';
import { Flag } from './RaiseShort';
import { Typed, beatsFrom, type Cap } from './Kit';
import TL from './ny-timeline.json';
import WORDS from './ny-words.json';
import CUE from './ny3-cues.json';
import DATA from '../../ny/data.json';
import REEL from '../../ny/reel.json';
import { T, textShadow } from './motion/brand';
import { Captions, Count, Depth, Glass, Kinetic, NavyGrade, Stamp, Tag, Tile, Vapor, clamp, ease, money, outExpo } from './motion/Reel';

export const NY3FPS = 24;
const B = beatsFrom(TL, NY3FPS);
export const NY3DUR = Math.ceil((TL.total + REEL.hold_after_vo) * NY3FPS);
const Q = Object.fromEntries(Object.entries(CUE).map(([k, v]) => [k, Math.round((v as number) * NY3FPS)])) as Record<string, number>;

// verified example (ny/data.json) → derived values
const X = DATA.example;
const NET = X.gain - X.loss, TAXABLE = NET * X.inclusion_rate, WITHOUT = X.gain * X.inclusion_rate;

const CUTS = [B.example.s, B.trap.s];
// panel geometry lives in ny/reel.json "layout", so tools/reel_check.py lints the same boxes that render
const L = Object.fromEntries(Object.entries(REEL.layout).map(([k, v]) => [k, { y: v.box[1], h: v.box[3], w: v.box[2] }])) as Record<string, { y: number; h: number; w: number }>;
const K1: Focus[] = [
  { f: 0, u: 0.5, v: 0.36, k: 1.32 },                  // her face, thinking (hook)
  { f: B.rule.s, u: 0.62, v: 0.3, k: 1.22 },           // the window and the skyline (the rule)
];
const K2: Focus[] = [
  { f: 0, u: 0.45, v: 0.6, k: 1.2 },                   // paper and calculator (the numbers)
  { f: B.date.s, u: 0.6, v: 0.32, k: 1.2 },            // the window: the year is ending
];
const K3: Focus[] = [
  { f: 0, u: 0.58, v: 0.44, k: 1.22 },                 // the couple (cards sit low in this scene)
  { f: B.tfsa.s, u: 0.48, v: 0.46, k: 1.12 },
  { f: B.payoff.s, u: 0.5, v: 0.5, k: 1.0 },
];

const CAPS: Cap[] = [
  { at: B.rule.s, l1: 'THE RULE', l2: 'losses offset gains', until: B.example.s - 2 },
  { at: B.example.s, l1: 'EXAMPLE', l2: 'one winner, one loser', until: B.date.s - 2 },
  { at: B.date.s, l1: 'WHY THE 30TH?', l2: 'settlement sets the year', until: B.trap.s - 2 },
  { at: B.trap.s, l1: 'THE TRAP', l2: 'buying it back', until: B.acb.s - 2 },
  { at: B.acb.s, l1: 'NOT GONE', l2: 'it moves into the cost', until: B.tfsa.s - 2 },
  { at: B.tfsa.s, l1: 'TFSA · RRSP', l2: 'no loss to claim', until: B.payoff.s - 2 },
];

// ---------- the hook: progressive, frame 0 already carries the topic ----------
const Hook = ({ f }: { f: number }) => {
  const out = B.rule.s;
  const hero = outExpo((f - Q.dec30) / 14);
  const glow = f >= Q.dec30 ? 0.5 + 0.5 * Math.sin((f - Q.dec30) * 0.18) * Math.exp(-(f - Q.dec30) / 30) : 0;
  const o = ease(f, out, out + 12);
  return (
    <>
      {REEL.hook.tags.map((t, i) => <Tag key={i} f={f} at={Q[t.cue]} text={t.text} x={t.x} y={t.y} from={t.from as 'left'} out={out - 4 + i * 2} seed={i + 1} />)}
      <Kinetic f={f} at={0} now text={REEL.hook.lines[0]} x={80} y={880} size={78} out={out} nowrap />
      <Kinetic f={f} at={Q.sell} text={REEL.hook.lines[1]} x={80} y={984} size={72} from="left" out={out} />
      {hero > 0 && o < 1 && (
        <div style={{ position: 'absolute', left: 76, top: 1048, opacity: (1 - o) * clamp(hero * 1.5), transform: `scale(${0.82 + 0.18 * hero}) translateY(${-o * 40}px)`, transformOrigin: '0% 50%', filter: o > 0 ? `blur(${o * 8}px)` : undefined }}>
          <div style={{ position: 'absolute', left: -40, top: -20, width: 560, height: 220, borderRadius: '50%', background: `radial-gradient(closest-side, rgba(241,199,91,${0.28 * glow}), rgba(241,199,91,0))` }} />
          <Kinetic f={f} at={Q.dec30} text={REEL.hook.hero} x={0} y={0} size={168} gold stagger={3} nowrap />
        </div>
      )}
      {f >= out && f < out + 30 && <Vapor f={f} a={out} x={80} y={880} w={700} h={380} n={50} seed={7} />}
    </>
  );
};

// ---------- beats ----------
const Rule = ({ f }: { f: number }) => (
  <Glass f={f} a={B.rule.s + 4} b={B.example.s - 2} y={L.rule.y} h={L.rule.h} label="Capital losses" exit="vapor" lit={ease(f, Q.gainsOk, Q.gainsOk + 8) * (1 - ease(f, Q.salaryNo, Q.salaryNo + 10)) * 0.6}>
    <Kinetic f={f} at={B.rule.s + 10} text="OFFSET CAPITAL GAINS" x={50} y={92} size={60} />
    <Tile f={f} at={B.rule.s + 16} lit={Q.gainsOk} x={50} y={200} w={400} h={150} title="Capital gains" value="YES" mark="ok" toneOf="green" valueSize={46} />
    <Tile f={f} at={B.rule.s + 20} lit={Q.salaryNo} x={470} y={200} w={400} h={150} title="Your salary" value="NO" mark="no" toneOf="red" valueSize={46} />
  </Glass>
);

const Ledger = ({ f }: { f: number }) => {
  const rows: [number, string, React.ReactNode, ('gold' | 'red' | 'green')][] = [
    [Q.gain, 'Gain on stock A', <Count f={f} a={Q.gain} value={X.gain} sign="+" size={56} gold={false} />, 'green'],
    [Q.loss, 'Loss on stock B, sold', <Count f={f} a={Q.loss} value={X.loss} sign="−" size={56} gold={false} />, 'red'],
    [Q.net, 'Net capital gain', <Count f={f} a={Q.net} value={NET} size={56} gold={false} />, 'gold'],
  ];
  const strike = ease(f, Q.six, Q.six + 10);
  return (
    <Glass f={f} a={B.example.s + 2} b={B.date.s - 2} y={L.ledger.y} h={L.ledger.h} label="Example · one winner, one loser" exit="collapse" collapseTo="50% 100%" enter="wipe">
      {rows.map(([at, title, val, tn], i) => (
        <Tile key={i} f={f} at={B.example.s + 10 + i * 3} lit={at} off={rows[i + 1]?.[0] ?? Q.taxable} x={40} y={92 + i * 112} w={840} h={100} title={title} value={val} toneOf={tn} valueSize={56} />
      ))}
      {f >= Q.taxable && (
        <div style={{ position: 'absolute', left: 44, top: 440, display: 'flex', alignItems: 'baseline', gap: 24 }}>
          <div style={{ fontFamily: T.font, fontSize: 22, fontWeight: 800, letterSpacing: 3, color: T.gold, opacity: outExpo((f - Q.taxable) / 10) }}>TAXABLE ½</div>
          <Count f={f} a={Q.taxable} value={TAXABLE} size={84} />
          {f >= Q.six && <div style={{ position: 'relative', fontFamily: T.font, fontSize: 30, fontWeight: 700, color: T.mute, opacity: outExpo((f - Q.six) / 8) }}>
            not {money(WITHOUT)}<div style={{ position: 'absolute', left: -4, top: '52%', height: 3, width: `${strike * 104}%`, background: T.redSoft }} /></div>}
        </div>
      )}
    </Glass>
  );
};

const DateTrack = ({ f }: { f: number }) => {
  const a = B.date.s + 2, travel = outExpo((f - Q.settle) / 18), yr = ease(f, Q.taxyear, Q.taxyear + 10);
  const node = (x: number, title: string, sub: string, on: number) => (
    <div style={{ position: 'absolute', left: x - 120, top: 150, width: 240, textAlign: 'center' }}>
      <div style={{ margin: '0 auto', width: 26, height: 26, borderRadius: 13, background: on > 0.5 ? T.gold : 'rgba(12,16,26,.9)', border: `2px solid ${on > 0.5 ? T.gold : T.glassEdge}`, boxShadow: `0 0 ${24 * on}px ${T.gold}` }} />
      <div style={{ marginTop: 16, fontFamily: T.font, fontSize: 30, fontWeight: 900, color: T.white }}>{title}</div>
      <div style={{ marginTop: 4, fontFamily: T.font, fontSize: 20, fontWeight: 800, letterSpacing: 3, color: on > 0.5 ? T.gold : T.mute }}>{sub}</div>
    </div>
  );
  return (
    <Glass f={f} a={a} b={B.trap.s - 2} y={L.date.y} h={L.date.h} label={`Why December 30 · ${DATA.dates.cycle}`} enter="slideR" exit="fade">
      <div style={{ position: 'absolute', left: 190, top: 162, width: 540, height: 3, background: T.glassEdge }} />
      <div style={{ position: 'absolute', left: 190, top: 162, width: 540 * travel, height: 3, background: T.gold }} />
      {node(190, DATA.dates.last_trade, 'TRADE', ease(f, a + 6, a + 14))}
      {node(730, DATA.dates.settles, 'SETTLES', travel)}
      <div style={{ position: 'absolute', left: 190 + 540 * travel - 9, top: 155, width: 18, height: 18, borderRadius: 9, background: T.goldHi, opacity: f >= Q.settle && travel < 1 ? 1 : 0, boxShadow: `0 0 18px ${T.gold}` }} />
      <div style={{ position: 'absolute', left: 50, top: 330, fontFamily: T.font, fontSize: 34, fontWeight: 900, color: T.white, opacity: yr }}>COUNTS FOR <span style={{ color: T.gold }}>2026</span></div>
      <div style={{ position: 'absolute', left: 50, top: 390, fontFamily: T.font, fontSize: 24, fontWeight: 700, color: T.redSoft, opacity: yr }}>A {DATA.dates.late_trade} TRADE SETTLES IN {DATA.dates.late_settles_year}</div>
    </Glass>
  );
};

const Trap = ({ f }: { f: number }) => {
  const fill = outExpo((f - Q.window) / 20), y0 = L.trap.y;
  return (
    <Glass f={f} a={B.trap.s + 6} b={B.acb.s - 2} y={y0} h={L.trap.h} w={L.trap.w} label="The trap · superficial loss" toneOf="red" enter="glass" exit="fade">
      <div style={{ position: 'absolute', left: 60, right: 60, top: 128, height: 44, borderRadius: 22, background: 'rgba(255,255,255,.06)', border: `1px solid ${T.glassEdge}` }} />
      <div style={{ position: 'absolute', left: 440 - 380 * fill, width: 760 * fill, top: 128, height: 44, borderRadius: 22, background: 'linear-gradient(90deg, rgba(224,57,43,.55), rgba(255,122,104,.35), rgba(224,57,43,.55))' }} />
      <div style={{ position: 'absolute', left: 432, top: 116, width: 16, height: 68, borderRadius: 8, background: T.white }} />
      {[['−30 DAYS', 60], ['SALE', 390], ['+30 DAYS', 660]].map(([t, x], i) => (
        <div key={i} style={{ position: 'absolute', left: x as number, top: 190, width: i === 1 ? 100 : 160, textAlign: i === 1 ? 'center' : i === 0 ? 'left' : 'right', fontFamily: T.font, fontSize: 22, fontWeight: 800, letterSpacing: 2, color: i === 1 ? T.white : T.redSoft, opacity: i === 1 ? 1 : fill }}>{t}</div>
      ))}
      <Tile f={f} at={B.trap.s + 14} lit={Q.spouse} x={60} y={250} w={420} h={100} title="You or your spouse" value="BUY BACK" valueSize={34} toneOf="red" />
      <Stamp f={f} at={Q.denied} text="Loss denied" x={480} y={268} size={34} />
    </Glass>
  );
};

const Acb = ({ f }: { f: number }) => {
  const mv = outExpo((f - Q.cost) / 18);
  return (
    <Glass f={f} a={B.acb.s + 2} b={B.tfsa.s - 2} y={L.acb.y} h={L.acb.h} w={L.acb.w} label="Not gone" toneOf="green" enter="slideL" exit="vapor">
      <div style={{ position: 'absolute', left: 60 + 420 * mv, top: 130, padding: '16px 24px', borderRadius: 16, border: `2px solid ${T.redSoft}`, background: 'rgba(224,57,43,.14)', fontFamily: T.font, fontSize: 28, fontWeight: 900, color: T.white, opacity: 1 - 0.85 * mv }}>DENIED LOSS</div>
      <div style={{ position: 'absolute', left: 330, top: 160, width: 140, height: 3, background: T.glassEdge }} />
      <div style={{ position: 'absolute', left: 520, top: 104, width: 340, height: 120, borderRadius: 18, border: `2px solid ${mv > 0.6 ? T.green : T.glassEdge}`, background: `rgba(127,224,168,${0.1 * mv})`, boxShadow: `0 0 ${30 * mv}px rgba(127,224,168,.3)`, display: 'grid', placeItems: 'center', textAlign: 'center',
        fontFamily: T.font, fontSize: 26, fontWeight: 900, lineHeight: 1.15, color: T.white }}>COST OF THE<br />NEW SHARES</div>
      <div style={{ position: 'absolute', left: 60, top: 252, fontFamily: T.font, fontSize: 24, fontWeight: 700, color: T.soft, opacity: mv }}>usually added there · it lowers a future gain</div>
    </Glass>
  );
};

const Registered = ({ f }: { f: number }) => (
  <Glass f={f} a={B.tfsa.s + 2} b={B.payoff.s - 2} y={L.tfsa.y} h={L.tfsa.h} w={L.tfsa.w} label="Losses inside registered plans" toneOf="red" exit="collapse" collapseTo="50% 0%">
    <Tile f={f} at={B.tfsa.s + 8} lit={Q.cant} x={60} y={100} w={380} h={150} title="TFSA" value="NOT CLAIMABLE" valueSize={26} mark="no" toneOf="red" />
    <Tile f={f} at={B.tfsa.s + 12} lit={Q.cant + 4} x={480} y={100} w={380} h={150} title="RRSP" value="NOT CLAIMABLE" valueSize={26} mark="no" toneOf="red" />
  </Glass>
);

// ---------- payoff: the points collapse into the final result ----------
const Final = ({ f }: { f: number }) => {
  const a = B.payoff.s;
  const points = ['OFFSETS GAINS ONLY', `½ OF ${money(NET)} TAXED`, 'SELL BY DEC 30', '30-DAY RULE', 'NO TFSA / RRSP LOSS'];
  const merge = ease(f, Q.before30 - 6, Q.before30 + 8);
  const end = ease(f, Q.before30, Q.before30 + 16);
  return (
    <>
      {points.map((p, i) => {
        const pin = outExpo((f - a - i * 3) / 12);
        if (pin <= 0 || merge >= 1) return null;
        const y0 = 420 + i * 78, x0 = i % 2 ? 1080 : -400;
        return <div key={i} style={{ position: 'absolute', left: 80 + (x0 - 80) * (1 - pin) + (0) , top: y0 + (1060 - y0) * merge, opacity: (1 - merge) * pin, transform: `scale(${1 - 0.4 * merge})`, transformOrigin: '0 50%',
          padding: '12px 22px', borderRadius: 999, background: 'rgba(12,18,30,.66)', backdropFilter: 'blur(10px)', border: `1px solid ${T.glassEdge}`, fontFamily: T.font, fontSize: 26, fontWeight: 800, letterSpacing: 2, color: T.white }}>
          <span style={{ color: T.gold, marginRight: 12 }}>{i + 1}</span>{p}</div>;
      })}
      {f >= Q.before30 - 4 && (
        <div style={{ position: 'absolute', left: 80, width: L.end_block.w, top: L.end_block.y, opacity: end, transform: `translateY(${(1 - end) * 40}px)` }}>
          <Flag f={f} w={150} amp={0.06} />
          <div style={{ position: 'relative', marginTop: 26, height: 70 }}><Kinetic f={f} at={Q.before30} text="CHECK YOUR GAINS" x={0} y={0} size={60} nowrap /></div>
          <div style={{ marginTop: 6, display: 'flex', alignItems: 'baseline', gap: 18 }}>
            <span style={{ fontFamily: T.font, fontSize: 60, fontWeight: 900, color: T.white, textShadow }}>BEFORE</span>
            <span style={{ fontFamily: T.font, fontSize: 60, fontWeight: 900, color: T.gold, textShadow }}>DEC 30.</span>
          </div>
          <div style={{ marginTop: 26, display: 'inline-flex', padding: '18px 30px', borderRadius: 999, background: `linear-gradient(160deg,${T.goldHi},${T.gold} 50%,${T.goldDeep})`, color: '#1d1503', fontFamily: T.font, fontSize: 32, fontWeight: 900,
            opacity: ease(f, Q.next - 4, Q.next + 8), transform: `scale(${1 + 0.03 * Math.sin((f - Q.next) / 6)})` }}>NEXT: INVESTMENTS OUTSIDE CANADA →</div>
          <div style={{ marginTop: 12, fontFamily: T.font, fontSize: 26, fontWeight: 700, color: T.white, textShadow, opacity: ease(f, Q.next + 40, Q.next + 52) }}>Follow so you don't miss it</div>
          <div style={{ marginTop: 22, fontFamily: T.font, fontSize: 18, fontWeight: 600, color: T.mute, lineHeight: 1.45, opacity: ease(f, a + 16, a + 30) }}>
            Source: canada.ca (CRA: Capital losses; superficial loss; T4037) · CRA 2012-0468931C6 (settlement date) · CSA: T+1 since 2024 · example only · confirm with your broker · general info, not advice
          </div>
        </div>
      )}
    </>
  );
};

const Header = ({ f }: { f: number }) => (
  <div style={{ position: 'absolute', left: 80, top: 92, right: 80, display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: T.white, fontSize: 22, fontWeight: 800, letterSpacing: 4, fontFamily: T.font }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}><Flag f={f} w={72} />TAX SECRETS CANADA</div>
    <div style={{ color: T.gold, letterSpacing: 5 }}>CRA · YEAR-END · STOCKS</div>
  </div>
);

export const NyV3 = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: T.navy, fontFamily: T.font, overflow: 'hidden' }}>
      <SceneCuts f={f} cuts={CUTS} scene={(i) => i === 0 ? (
        <PhotoPlate f={f} src="plates/ny-s1-4k.jpg" iw={2294} ih={4096} keys={K1} glide={40} blur={0.8 + 5 * (1 - ease(f, 0, 22))} snow={[{ u0: 0.5, v0: 0.0, u1: 0.95, v1: 0.3 }]} steam={{ u: 0.22, v: 0.62, w: 0.05 }} />
      ) : i === 1 ? (
        <PhotoPlate f={f} src="plates/ny-s2-4k.jpg" iw={2294} ih={4096} keys={K2} glide={40} blur={0.8} snow={[{ u0: 0.5, v0: 0.0, u1: 0.7, v1: 0.3 }]} steam={{ u: 0.13, v: 0.61, w: 0.05 }} />
      ) : (
        <PhotoPlate f={f} src="plates/ny-s3-4k.jpg" iw={2294} ih={4096} keys={K3} glide={40} blur={0.8}>
          <div style={{ position: 'absolute', left: '8.5%', top: '59.5%', width: '11.5%', height: '12.5%', borderRadius: '40%', backdropFilter: 'blur(14px)', maskImage: 'radial-gradient(closest-side, #000 65%, transparent)', WebkitMaskImage: 'radial-gradient(closest-side, #000 65%, transparent)' }} />
        </PhotoPlate>
      )} />
      <Depth f={f} seed={f < B.example.s ? 1 : f < B.trap.s ? 2 : 3} warm={0.75} />
      <NavyGrade low={f >= B.payoff.s ? 1.1 : 1} />
      <Header f={f} />
      <Typed f={f} caps={CAPS} head={T.font} />
      {f < B.rule.s + 30 && <Hook f={f} />}
      <Rule f={f} />
      <Ledger f={f} />
      <DateTrack f={f} />
      <Trap f={f} />
      <Acb f={f} />
      <Registered f={f} />
      <Final f={f} />
      <Captions f={f} fps={NY3FPS} beats={WORDS.beats as never} from={Q.dec30 + 30} until={B.payoff.s} y={f >= B.trap.s ? 1296 : 1296} />
    </AbsoluteFill>
  );
};
