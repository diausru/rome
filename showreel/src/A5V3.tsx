// A5 "CRA says you owe $5,000: check these first" — investigation format (list-2 #6), motion engine v1 (2026-10-12).
// Variety vs A1 / H4 / D1 (CLAUDE.md "Variety"): hook = document close-up (an EXAMPLE notice, no CRA marks) under a
// magnifying lens; main visual = a suspect line-up (spotlight on the active one) + one evidence panel per suspect
// (fill bar against the bill, a misrouted payment chip, threshold bars); reveal = a timeline scrub with a day counter;
// end = a vertical three-step path. Numbers come from a5/data.json; derived values are computed here.
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { PhotoPlate, SceneCuts, type Focus } from './Plate';
import { Flag } from './RaiseShort';
import { Typed, beatsFrom, type Cap } from './Kit';
import TL from './a5-timeline.json';
import WORDS from './a5-words.json';
import CUE from './a53-cues.json';
import DATA from '../../a5/data.json';
import REEL from '../../a5/reel.json';
import { T, goldFill, textShadow } from './motion/brand';
import { Captions, Depth, Glass, Kinetic, NavyGrade, Stamp, Vapor, clamp, ease, money, outBack, outExpo } from './motion/Reel';

export const A53FPS = 24;
const B = beatsFrom(TL, A53FPS);
export const A53DUR = Math.ceil((TL.total + REEL.hold_after_vo) * A53FPS);
const Q = Object.fromEntries(Object.entries(CUE).map(([k, v]) => [k, Math.round((v as number) * A53FPS)])) as Record<string, number>;

const X = DATA.example;
const COMBINED = X.fed_rate + X.mb_rate;
const EXTRA = X.t5 * COMBINED;
const pct = (r: number) => `${+(r * 100).toFixed(2)}%`;
const RED = T.redSoft;

const CUTS = [B.s2.s, B.reveal.s];
const L = Object.fromEntries(Object.entries(REEL.layout).map(([k, v]) => [k, { x: v.box[0], y: v.box[1], w: v.box[2], h: v.box[3] }])) as Record<string, { x: number; y: number; w: number; h: number }>;
const K1: Focus[] = [{ f: 0, u: 0.46, v: 0.47, k: 1.24 }, { f: B.s1.s, u: 0.5, v: 0.5, k: 1.12 }];
const K2: Focus[] = [{ f: 0, u: 0.48, v: 0.47, k: 1.16 }, { f: B.s3.s, u: 0.55, v: 0.52, k: 1.24 }];
const K3: Focus[] = [{ f: 0, u: 0.5, v: 0.48, k: 1.14 }, { f: B.action.s, u: 0.45, v: 0.52, k: 1.2 }, { f: B.cta.s, u: 0.5, v: 0.5, k: 1.06 }];

const CAPS: Cap[] = [
  { at: B.s1.s, l1: 'SUSPECT 1', l2: 'a forgotten slip', until: B.s2.s - 2 },
  { at: B.s2.s, l1: 'SUSPECT 2', l2: 'a payment elsewhere', until: B.s3.s - 2 },
  { at: B.s3.s, l1: 'SUSPECT 3', l2: 'instalments', until: B.reveal.s - 2 },
  { at: B.reveal.s, l1: 'THE TWIST', l2: 'time vs interest', until: B.action.s - 2 },
];

// ---------- hook: an example notice under a magnifying lens ----------
const Hook = ({ f }: { f: number }) => {
  const out = B.suspects.s, o = ease(f, out, out + 12);
  const lensP = outExpo((f - Q.amt + 6) / 18);
  const bars = [0.72, 0.55, 0.64, 0.4, 0.58];
  return (
    <div style={{ opacity: 1 - o, transform: `translateY(${-o * 30}px)` }}>
      <Kinetic f={f} at={0} now text={REEL.hook.title} x={80} y={520} size={80} nowrap />
      <div style={{ position: 'absolute', left: 120, top: 640, width: 760, height: 520, borderRadius: 10, background: '#f4f2ec', boxShadow: '0 40px 80px rgba(0,0,0,.55)', transform: `rotate(-2.5deg) translateY(${(1 - outExpo(f / 14)) * 60}px)` }}>
        <div style={{ position: 'absolute', left: 40, top: 34, fontFamily: T.font, fontSize: 22, fontWeight: 900, letterSpacing: 4, color: '#3a4250' }}>{REEL.hook.sub}</div>
        {bars.map((w, i) => <div key={i} style={{ position: 'absolute', left: 40, top: 96 + i * 46, width: 680 * w, height: 14, borderRadius: 7, background: '#c9ccd3' }} />)}
        <div style={{ position: 'absolute', left: 40, right: 40, top: 360, borderTop: '2px solid #9aa0ab' }} />
        <div style={{ position: 'absolute', left: 40, top: 390, fontFamily: T.font, fontSize: 30, fontWeight: 900, letterSpacing: 2, color: '#3a4250' }}>BALANCE OWING</div>
        {f >= Q.amt - 2 && <div style={{ position: 'absolute', right: 40, top: 372, fontFamily: T.font, fontSize: 64, fontWeight: 900, color: '#b3261e', fontVariantNumeric: 'tabular-nums' }}>
          {money(f >= Q.amt + 16 ? X.balance : Math.round((X.balance * outExpo((f - Q.amt + 2) / 18)) / 10) * 10)}</div>}
      </div>
      {lensP > 0 && (
        <div style={{ position: 'absolute', left: 560 - (1 - lensP) * 300, top: 960 - (1 - lensP) * 200, width: 300, height: 300, opacity: lensP }}>
          <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: `10px solid ${T.gold}`, boxShadow: `0 0 40px rgba(241,199,91,.45), inset 0 0 40px rgba(255,255,255,.25)`, background: 'radial-gradient(circle at 35% 30%, rgba(255,255,255,.22), rgba(255,255,255,0) 60%)' }} />
          <div style={{ position: 'absolute', left: 250, top: 250, width: 120, height: 26, borderRadius: 13, background: T.goldDeep, transform: 'rotate(45deg)', transformOrigin: '0 50%' }} />
        </div>
      )}
      {f >= out && f < out + 30 && <Vapor f={f} a={out} x={120} y={640} w={760} h={520} n={44} seed={5} />}
    </div>
  );
};

// ---------- the line-up (persistent from "Three usual suspects" to the reveal) ----------
const Lineup = ({ f }: { f: number }) => {
  const a = B.suspects.s, b = B.reveal.s;
  if (f < a || f > b + 14) return null;
  const o = ease(f, b - 2, b + 12);
  const names = ['FORGOTTEN SLIP', 'PAYMENT ELSEWHERE', 'INSTALMENTS'];
  const active = f >= B.s3.s ? 2 : f >= B.s2.s ? 1 : f >= B.s1.s ? 0 : -1;
  return (
    <div style={{ position: 'absolute', left: L.lineup.x, top: L.lineup.y, width: L.lineup.w, display: 'flex', gap: 14, opacity: 1 - o }}>
      {names.map((n, i) => {
        const p = outBack((f - a - 4 - i * 4) / 12), on = i === active;
        return (
          <div key={n} style={{ flex: 1, height: 104, borderRadius: 18, position: 'relative', overflow: 'hidden', transform: `translateY(${(1 - clamp(p, 0, 1)) * 60}px) scale(${on ? 1.04 : 1})`, opacity: clamp(p, 0, 1) * (active < 0 || on ? 1 : 0.45),
            background: on ? 'linear-gradient(180deg, rgba(241,199,91,.28), rgba(12,18,30,.75))' : T.glass, border: `1.5px solid ${on ? T.gold : T.glassEdge}`, boxShadow: on ? '0 0 30px rgba(241,199,91,.35)' : undefined }}>
            <div style={{ position: 'absolute', left: 18, top: 14, fontFamily: T.font, fontSize: 18, fontWeight: 800, letterSpacing: 3, color: on ? T.gold : T.mute }}>SUSPECT {i + 1}</div>
            <div style={{ position: 'absolute', left: 18, right: 12, top: 42, fontFamily: T.font, fontSize: 21, fontWeight: 900, lineHeight: 1.1, color: T.white }}>{n}</div>
          </div>
        );
      })}
    </div>
  );
};

// ---------- suspect 1: the slip almost fills the bill ----------
const S1 = ({ f }: { f: number }) => {
  const fill = outExpo((f - Q.bill + 4) / 20) * (EXTRA / X.balance);
  return (
    <Glass f={f} a={B.s1.s + 4} b={B.s2.s - 2} y={L.s1.y} h={L.s1.h} w={L.s1.w} label="Suspect 1 · CRA matched a slip" enter="glass" exit="fade" lit={ease(f, Q.bill, Q.bill + 8)}>
      <div style={{ position: 'absolute', left: 50, top: 92, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', width: 780, opacity: ease(f, Q.t5 - 4, Q.t5 + 6) }}>
        <span style={{ fontFamily: T.font, fontSize: 28, fontWeight: 800, color: T.white }}>T5 interest not reported</span>
        {f >= Q.f15 && <span style={{ fontFamily: T.font, fontSize: 48, fontWeight: 900, color: T.white, fontVariantNumeric: 'tabular-nums' }}>{money(f >= Q.f15 + 14 ? X.t5 : Math.round(X.t5 * outExpo((f - Q.f15) / 14) / 100) * 100)}</span>}
      </div>
      <div style={{ position: 'absolute', left: 50, top: 170, fontFamily: T.font, fontSize: 24, fontWeight: 800, color: T.gold, opacity: ease(f, Q.rate - 2, Q.rate + 8) }}>× {pct(X.fed_rate)} federal + {pct(X.mb_rate)} Manitoba = {pct(COMBINED)}</div>
      <div style={{ position: 'absolute', left: 50, top: 236, width: 780, height: 54, borderRadius: 14, border: `2px dashed ${RED}`, opacity: ease(f, Q.rate, Q.rate + 8) }} />
      <div style={{ position: 'absolute', left: 50, top: 236, width: 780 * fill, height: 54, borderRadius: 14, background: `linear-gradient(90deg, ${T.goldDeep}, ${T.gold})` }} />
      <div style={{ position: 'absolute', left: 50, top: 300, display: 'flex', alignItems: 'baseline', gap: 16, opacity: ease(f, Q.bill, Q.bill + 10) }}>
        <span style={{ fontFamily: T.font, fontSize: 56, fontWeight: 900, fontVariantNumeric: 'tabular-nums', ...goldFill }}>{money(EXTRA)}</span>
        <span style={{ fontFamily: T.font, fontSize: 26, fontWeight: 800, color: T.soft }}>of the {money(X.balance)} bill</span>
      </div>
      <div style={{ position: 'absolute', left: 50, top: 374, fontFamily: T.font, fontSize: 18, fontWeight: 700, color: T.mute, opacity: ease(f, Q.bill + 10, Q.bill + 20) }}>example: Manitoba, taxable income ≈ $80K · CRA can reassess within 3 years of the original notice</div>
    </Glass>
  );
};

// ---------- suspect 2: the payment lands in another year ----------
const S2 = ({ f }: { f: number }) => {
  const mv = outExpo((f - Q.wrong + 4) / 18);
  const col = (x: number, title: string, bad: boolean) => (
    <div style={{ position: 'absolute', left: x, top: 150, width: 370, height: 180, borderRadius: 18, border: `2px solid ${bad && f >= Q.wrong + 10 ? RED : T.glassEdge}`, background: 'rgba(255,255,255,.04)' }}>
      <div style={{ position: 'absolute', left: 20, top: 16, fontFamily: T.font, fontSize: 20, fontWeight: 800, letterSpacing: 3, color: T.mute }}>{title}</div>
      {bad && f >= Q.wrong + 10 && <div style={{ position: 'absolute', left: 20, top: 60, fontFamily: T.font, fontSize: 30, fontWeight: 900, color: RED }}>STILL OWING {money(X.balance)}</div>}
    </div>
  );
  return (
    <Glass f={f} a={B.s2.s + 4} b={B.s3.s - 2} y={L.s2.y} h={L.s2.h} w={L.s2.w} label="Suspect 2 · payment applied elsewhere" enter="slideR" exit="vapor">
      {col(50, "THIS YEAR'S BALANCE", true)}
      {col(460, 'ANOTHER YEAR', false)}
      {f >= B.s2.s + 10 && (
        <div style={{ position: 'absolute', left: 240 + 410 * mv, top: 96 + 150 * mv, padding: '14px 22px', borderRadius: 999, background: `linear-gradient(160deg,${T.goldHi},${T.gold})`, color: '#1d1503', fontFamily: T.font, fontSize: 24, fontWeight: 900, transform: `rotate(${mv * 4}deg)`, boxShadow: '0 12px 30px rgba(0,0,0,.4)' }}>YOUR PAYMENT</div>
      )}
      <div style={{ position: 'absolute', left: 50, top: 352, fontFamily: T.font, fontSize: 24, fontWeight: 800, color: T.white, opacity: ease(f, Q.acct, Q.acct + 10) }}>CHECK: CRA My Account → how each payment was applied</div>
    </Glass>
  );
};

// ---------- suspect 3: instalment threshold bars ----------
const S3 = ({ f }: { f: number }) => {
  const yrs = X.instal_years, max = 6000, H = 200, base = 330, thr = X.instal_threshold;
  return (
    <Glass f={f} a={B.s3.s + 4} b={B.reveal.s - 2} y={L.s3.y} h={L.s3.h} w={L.s3.w} label="Suspect 3 · instalments (example amounts)" toneOf="gold" enter="wipe" exit="collapse" collapseTo="50% 100%">
      {yrs.map((y, i) => {
        const p = outExpo((f - B.s3.s - 10 - i * 4) / 16), h = (y.owing / max) * H * p, over = y.owing > thr && f >= Q.last2;
        return (
          <div key={y.label}>
            <div style={{ position: 'absolute', left: 90 + i * 250, top: base - h, width: 150, height: h, borderRadius: '12px 12px 4px 4px', background: over ? `linear-gradient(180deg, ${T.amber}, rgba(255,181,71,.25))` : 'rgba(190,210,240,.35)' }} />
            <div style={{ position: 'absolute', left: 70 + i * 250, width: 190, textAlign: 'center', top: base + 10, fontFamily: T.font, fontSize: 18, fontWeight: 800, color: T.soft }}>{y.label}</div>
            {p > 0.6 && <div style={{ position: 'absolute', left: 90 + i * 250, width: 150, textAlign: 'center', top: base - h + 10, fontFamily: T.font, fontSize: 24, fontWeight: 900, color: over ? '#1d1503' : T.white }}>{money(y.owing)}</div>}
          </div>
        );
      })}
      <div style={{ position: 'absolute', left: 50, top: base - (thr / max) * H, width: 780, borderTop: `3px dashed ${T.gold}`, opacity: ease(f, Q.t3k, Q.t3k + 8) }} />
      <div style={{ position: 'absolute', left: 752, top: base - (thr / max) * H - 50, fontFamily: T.font, fontSize: 18, fontWeight: 900, lineHeight: 1.15, color: T.gold, opacity: ease(f, Q.t3k, Q.t3k + 8) }}>{money(thr)}<br />LINE</div>
      <Stamp f={f} at={Q.expected} text="Instalments expected" x={300} y={86} size={22} color={T.amber} rotate={-3} />
    </Glass>
  );
};

// ---------- reveal: the timeline scrub ----------
const Timeline = ({ f }: { f: number }) => {
  const a = B.reveal.s, b = B.action.s;
  if (f < a || f > b + 14) return null;
  const o = ease(f, b - 2, b + 12), draw = outExpo((f - a - 4) / 20);
  const nodes: [string, string, number, string][] = [['APR 30', 'interest starts, daily', Q.april, RED], ['NOTICE', 'day 0', Q.time, T.white], [`+${X.collection_days} DAYS`, 'no legal collection', Q.ninety, T.green], ['OBJECT BY', 'later of 90 days or 1 yr after the filing deadline', Q.object, T.gold]];
  const xs = [70, 300, 530, 760], y0 = L.timeline.y + 150;
  const days = f >= Q.daily ? Math.floor((f - Q.daily) / 3) : 0;
  return (
    <div style={{ opacity: 1 - o }}>
      <div style={{ position: 'absolute', left: 80, top: L.timeline.y, width: 880, height: L.timeline.h, borderRadius: 30, background: T.glass, backdropFilter: 'blur(16px)', border: `1px solid ${T.glassEdge}`, opacity: outExpo((f - a) / 12) }} />
      <div style={{ position: 'absolute', left: 80 + xs[0], top: y0, width: (xs[3] - xs[0]) * draw, height: 4, background: T.glassEdge }} />
      {f >= Q.daily && <div style={{ position: 'absolute', left: 80 + xs[0], top: y0 + 14, width: (xs[3] - xs[0]) * clamp((f - Q.daily) / 40), height: 6, borderRadius: 3, background: `repeating-linear-gradient(90deg, ${RED} 0 10px, rgba(255,122,104,.3) 10px 14px)` }} />}
      {nodes.map(([t, s, at, c], i) => {
        const p = outBack((f - at) / 10);
        if (f < at) return null;
        return (
          <div key={t} style={{ position: 'absolute', left: 80 + xs[i] - 100, top: y0 - 12, width: 200, textAlign: 'center', opacity: clamp(p, 0, 1) }}>
            <div style={{ margin: '0 auto', width: 28, height: 28, borderRadius: 14, background: c, transform: `scale(${clamp(p, 0, 1.2)})`, boxShadow: `0 0 18px ${c}` }} />
            <div style={{ marginTop: 18, fontFamily: T.font, fontSize: 24, fontWeight: 900, color: c }}>{t}</div>
            <div style={{ marginTop: 6, fontFamily: T.font, fontSize: 17, fontWeight: 700, color: T.soft, lineHeight: 1.3 }}>{s}</div>
          </div>
        );
      })}
      <div style={{ position: 'absolute', left: 80, width: 880, top: L.timeline.y + 40, textAlign: 'center', fontFamily: T.font, fontSize: 34, fontWeight: 900, color: T.white, opacity: ease(f, Q.time - 2, Q.time + 8) }}>YOU HAVE TIME…</div>
      {f >= Q.daily && <div style={{ position: 'absolute', left: 80, width: 880, top: L.timeline.y + 360, textAlign: 'center', fontFamily: T.font, fontSize: 28, fontWeight: 900, color: RED }}>…BUT INTEREST COMPOUNDS DAILY <span style={{ fontVariantNumeric: 'tabular-nums' }}>· DAY {days + 1}</span></div>}
    </div>
  );
};

// ---------- action + end: a vertical three-step path ----------
const Steps = ({ f }: { f: number }) => {
  const a = B.action.s;
  if (f < a - 2) return null;
  const e = ease(f, a, a + 14);
  const steps: [string, string, number][] = [['OPEN THE NOTICE', 'read the explanation of changes', Q.open], ['MATCH EVERY SLIP', 'CRA My Account', Q.match], ['PAY OR OBJECT', 'before the deadline', Q.payobj]];
  return (
    <div style={{ position: 'absolute', left: 80, top: L.steps.y, width: 880, opacity: e }}>
      <div style={{ position: 'absolute', left: -24, top: -26, width: 928, height: 330, borderRadius: 28, background: 'linear-gradient(160deg, rgba(10,16,28,.78), rgba(10,16,28,.55))', backdropFilter: 'blur(14px)', border: `1px solid ${T.glassEdge}` }} />
      <div style={{ position: 'absolute', left: 33, top: 40, width: 4, height: 230 * clamp((f - Q.open) / ((Q.payobj - Q.open) || 1)), background: T.gold }} />
      {steps.map(([t, s, at], i) => {
        const p = outBack((f - at) / 10);
        return (
          <div key={t} style={{ position: 'absolute', left: 0, top: i * 115, display: 'flex', alignItems: 'center', gap: 24, opacity: f >= at - 2 ? 1 : 0.35 }}>
            <div style={{ width: 70, height: 70, borderRadius: 35, display: 'grid', placeItems: 'center', background: f >= at ? `linear-gradient(160deg,${T.goldHi},${T.gold})` : 'rgba(12,18,30,.7)', border: `2px solid ${T.gold}`, transform: `scale(${f >= at ? clamp(p, 0.6, 1.15) : 1})`,
              fontFamily: T.font, fontSize: 32, fontWeight: 900, color: f >= at ? '#1d1503' : T.gold }}>{i + 1}</div>
            <div>
              <div style={{ fontFamily: T.font, fontSize: 40, fontWeight: 900, color: T.white, textShadow }}>{t}</div>
              <div style={{ fontFamily: T.font, fontSize: 24, fontWeight: 700, color: T.soft, textShadow }}>{s}</div>
            </div>
          </div>
        );
      })}
      <div style={{ position: 'absolute', left: 0, top: 360, display: 'flex', alignItems: 'center', gap: 18, opacity: ease(f, Q.next - 4, Q.next + 8) }}>
        <Flag f={f} w={90} amp={0.06} />
        <div style={{ display: 'inline-flex', padding: '16px 28px', borderRadius: 999, background: `linear-gradient(160deg,${T.goldHi},${T.gold} 50%,${T.goldDeep})`, color: '#1d1503', fontFamily: T.font, fontSize: 28, fontWeight: 900,
          transform: `scale(${1 + 0.03 * Math.sin((f - a) / 6)})` }}>NEXT: DEADLINES THAT COST MONEY →</div>
      </div>
      <div style={{ position: 'absolute', left: 0, top: 452, fontFamily: T.font, fontSize: 26, fontWeight: 700, color: T.white, textShadow, opacity: ease(f, Q.follow, Q.follow + 10) }}>Follow so you don't miss it</div>
      <div style={{ position: 'absolute', left: 0, top: 504, width: 880, fontFamily: T.font, fontSize: 18, fontWeight: 600, color: T.mute, lineHeight: 1.45, opacity: ease(f, a + 20, a + 34) }}>
        Source: Income Tax Act ss. 152(3.1), 156.1, 161, 165(1), 225.1, 248 · example notice and amounts · interest at CRA's prescribed rate · general info, not advice
      </div>
    </div>
  );
};

const Header = ({ f }: { f: number }) => (
  <div style={{ position: 'absolute', left: 80, top: 92, right: 80, display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: T.white, fontSize: 22, fontWeight: 800, letterSpacing: 4, fontFamily: T.font }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}><Flag f={f} w={72} />TAX SECRETS CANADA</div>
    <div style={{ color: T.gold, letterSpacing: 5 }}>CRA · NOTICE · {DATA.tax_year}</div>
  </div>
);

export const A5V3 = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: T.navy, fontFamily: T.font, overflow: 'hidden' }}>
      <SceneCuts f={f} cuts={CUTS} scene={(i) => i === 0 ? (
        <PhotoPlate f={f} src="plates/a5-s1-4k.jpg" iw={2294} ih={4096} keys={K1} glide={40} blur={0.8 + 4 * (1 - ease(f, 0, 20))} snow={[{ u0: 0.48, v0: 0.04, u1: 0.98, v1: 0.42 }]} steam={{ u: 0.48, v: 0.7, w: 0.04 }} />
      ) : i === 1 ? (
        <PhotoPlate f={f} src="plates/a5-s2-4k.jpg" iw={2294} ih={4096} keys={K2} glide={50} blur={0.8} snow={[{ u0: 0.45, v0: 0.0, u1: 0.98, v1: 0.45 }]} />
      ) : (
        <PhotoPlate f={f} src="plates/a5-s3-4k.jpg" iw={2294} ih={4096} keys={K3} glide={40} blur={0.8} steam={{ u: 0.62, v: 0.45, w: 0.04 }} />
      )} />
      <Depth f={f} seed={f < B.s2.s ? 10 : f < B.reveal.s ? 11 : 12} warm={0.6} />
      <NavyGrade low={f >= B.action.s ? 1.2 : 1} />
      <Header f={f} />
      <Typed f={f} caps={CAPS} head={T.font} />
      {f < B.suspects.s + 30 && <Hook f={f} />}
      {f >= B.suspects.s && f < B.s1.s + 6 && <Kinetic f={f} at={B.suspects.s + 2} text="THREE USUAL SUSPECTS" x={80} y={560} size={64} nowrap out={B.s1.s - 4} />}
      <Lineup f={f} />
      <S1 f={f} />
      <S2 f={f} />
      <S3 f={f} />
      <Timeline f={f} />
      <Steps f={f} />
      <Captions f={f} fps={A53FPS} beats={WORDS.beats as never} from={B.suspects.s} until={B.action.s} y={1296} />
    </AbsoluteFill>
  );
};
