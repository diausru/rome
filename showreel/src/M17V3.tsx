// M17 "Part-time → full-time: where the raise goes" — consequence-first hook (Hook Engineering, 2026-11-19), motion engine v1.
// Variety vs M15 / M14 / H10: hook = worried parent + red −$3,848 counter on frame 0 ("$3,848 NEVER ARRIVES"), then "◂◂ HOW IT
// HAPPENS"; main visual = vertical waterfall +$16,000 → tax −$2,320 → CWB −$1,404 → CCB −$123 → KEEP $12,152; re-hook stamp
// "−$3,848 · 24% GONE"; reveal = one dollar split: 36.5¢ gone on her last dollars; end = check card + next pill.
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { PhotoPlate, SceneCuts, type Focus } from './Plate';
import { Flag } from './RaiseShort';
import { Typed, beatsFrom, type Cap } from './Kit';
import TL from './m17-timeline.json';
import WORDS from './m17-words.json';
import CUE from './m17-cues.json';
import DATA from '../../m17/data.json';
import REEL from '../../m17/reel.json';
import { T, goldFill, textShadow } from './motion/brand';
import { Captions, Depth, Kinetic, NavyGrade, Stamp, clamp, ease, money, outBack, outExpo } from './motion/Reel';

export const M17FPS = 24;
const B = beatsFrom(TL, M17FPS);
export const M17DUR = Math.ceil((TL.total + REEL.hold_after_vo) * M17FPS);
const Q = Object.fromEntries(Object.entries(CUE).map(([k, v]) => [k, Math.round((v as number) * M17FPS)])) as Record<string, number>;
const X = DATA.example;
const GREEN = T.green;
const PW = 2294, PH = 4096;
const CUTS = [B.c2.s, B.reveal.s];
const L = Object.fromEntries(Object.entries(REEL.layout).map(([k, v]) => [k, { x: v.box[0], y: v.box[1], w: v.box[2], h: v.box[3] }])) as Record<string, { x: number; y: number; w: number; h: number }>;
const K1: Focus[] = [{ f: 0, u: 0.32, v: 0.42, k: 1.3 }, { f: B.c1.s, u: 0.4, v: 0.4, k: 1.18 }];
const K2: Focus[] = [{ f: 0, u: 0.55, v: 0.4, k: 1.22 }, { f: B.c4.s, u: 0.5, v: 0.36, k: 1.1 }];
const K3: Focus[] = [{ f: 0, u: 0.6, v: 0.42, k: 1.22 }, { f: B.action.s, u: 0.5, v: 0.36, k: 1.08 }];
const CAPS: Cap[] = [
  { at: B.c1.s, l1: "MAYA · SINGLE PARENT", l2: `one child · ${money(X.part)} → ${money(X.full)}`, until: B.c2.s - 2 },
  { at: B.c2.s, l1: 'HIT 1 · FEDERAL TAX', l2: '14.5% of the extra (2025)', until: B.c3.s - 2 },
  { at: B.c3.s, l1: 'HIT 2 · WORKERS BENEFIT', l2: '15% above $30,639', until: B.c4.s - 2 },
  { at: B.c4.s, l1: 'HIT 3 · CHILD BENEFIT', l2: '7% above $38,237 · from July', until: B.reveal.s - 2 },
  { at: B.reveal.s, l1: 'THE TWIST', l2: 'her last dollars', until: B.action.s - 2 },
];
const glass = { background: 'linear-gradient(160deg, rgba(10,16,28,.86), rgba(10,16,28,.62))', border: `1px solid ${T.glassEdge}` };
const label = (c: string) => ({ fontFamily: T.font, fontSize: 18, fontWeight: 900, letterSpacing: 4, color: c });

const Hook = ({ f }: { f: number }) => {
  const run = clamp((f + 8) / 34), v = Math.round(X.total * (0.3 + 0.7 * outExpo(run))), hit = outBack((f - Q.four) / 10), w = ease(f, Q.where - 4, Q.where + 8);
  return (
    <div style={{ opacity: 1 - ease(f, B.c1.s - 6, B.c1.s + 8) }}>
      <Kinetic f={f} at={0} now text={REEL.hook.l1} x={80} y={440} size={70} nowrap />
      <Kinetic f={f} at={0} now text={REEL.hook.l2} x={80} y={524} size={66} nowrap color={T.gold} />
      <div style={{ position: 'absolute', left: 80, top: 650, width: 920, height: 200, borderRadius: 24, ...glass, border: `2px solid ${T.red}`, transform: `scale(${1 + 0.05 * clamp(hit) * (1 - clamp((f - Q.four) / 20))})` }}>
        <div style={{ position: 'absolute', left: 30, top: 24, ...label(T.soft) }}>OF HER +{money(X.extra)} RAISE · NEVER REACHES HER</div>
        <div style={{ position: 'absolute', left: 30, top: 60, fontFamily: T.font, fontSize: 104, fontWeight: 900, color: T.red }}>−{money(v)}</div>
      </div>
      <div style={{ position: 'absolute', left: 80, top: 890, display: 'inline-flex', padding: '14px 26px', borderRadius: 999, border: `2px solid ${T.gold}`, background: 'rgba(10,16,28,.7)', color: T.gold, fontFamily: T.font, fontSize: 28, fontWeight: 900, letterSpacing: 2, opacity: w, transform: `translateX(${-40 * (1 - w)}px)` }}>◂◂ HOW IT HAPPENS</div>
    </div>
  );
};

// ---------- waterfall: +$16,000 → keep ----------
const Fall = ({ f }: { f: number }) => {
  const a = B.c1.s + 2, b = B.reveal.s;
  if (f < a - 1 || f > b + 14) return null;
  const y = L.fall.y, base = y + 520, H = 400, k = H / X.extra, cw = 150, gap = 22, x0 = 100;
  const cols = [
    { l: 'RAISE', v: X.extra, top: X.extra, c: GREEN, d: '+' + money(X.extra), at: Q.part },
    { l: 'TAX', v: X.fed, top: X.extra, c: T.red, d: '−$2,320', at: Q.fed },
    { l: 'CWB', v: X.cwb_cut, top: X.extra - X.fed, c: '#ff9a5a', d: '−$1,404', at: Q.cwb },
    { l: 'CCB', v: X.ccb_cut, top: X.extra - X.fed - X.cwb_cut, c: T.amber, d: '−$123', at: Q.ccb },
    { l: 'KEEP', v: X.keep, top: X.keep, c: GREEN, d: money(Math.round(X.keep)), at: Q.ccb + 14 },
  ];
  return (
    <div style={{ opacity: outExpo((f - a) / 14) * (1 - ease(f, b - 2, b + 12)) }}>
      <div style={{ position: 'absolute', left: 56, top: y - 20, width: 968, height: 680, borderRadius: 28, ...glass }} />
      <div style={{ position: 'absolute', left: 90, top: y, ...label(T.mute) }}>MAYA · {money(X.part)} → {money(X.full)} · 1 CHILD · {DATA.tax_year}</div>
      {cols.map((c, i) => {
        const p = outExpo((f - c.at + 4) / 16), h = Math.max(4, c.v * k) * clamp(p), x = x0 + i * (cw + gap), t = base - c.top * k;
        return (
          <div key={c.l} style={{ opacity: clamp(p * 1.5) }}>
            <div style={{ position: 'absolute', left: x, top: i === 0 || i === 4 ? base - h : t, width: cw, height: h, borderRadius: 10, background: c.c, boxShadow: `0 0 24px ${c.c}55` }} />
            {i > 0 && i < 4 && <div style={{ position: 'absolute', left: x - gap, top: t, width: gap, height: 2, background: T.mute, opacity: 0.6 }} />}
            <div style={{ position: 'absolute', left: x - 10, width: cw + 20, top: (i === 0 || i === 4 ? base - h : t) - 50, textAlign: 'center', fontFamily: T.font, fontSize: 30, fontWeight: 900, color: c.c }}>{c.d}</div>
            <div style={{ position: 'absolute', left: x, width: cw, top: base + 14, textAlign: 'center', ...label(T.white), fontSize: 20 }}>{c.l}</div>
          </div>
        );
      })}
      <div style={{ position: 'absolute', left: x0, top: base + 52, ...label(T.mute), fontSize: 14 }}>FEDERAL 2025 · CWB 2025 · CCB JULY 2026–JUNE 2027 · BEFORE PROVINCIAL TAX, CPP, EI</div>
      {f >= Q.ccb && <Stamp f={f} at={Q.ccb} text="−$3,848 · 24% GONE" x={430} y={y + 70} size={30} color={T.red} rotate={-4} />}
    </div>
  );
};

// ---------- reveal: one dollar on her last dollars ----------
const Rate = ({ f }: { f: number }) => {
  const a = B.reveal.s, b = B.action.s;
  if (f < a || f > b + 12) return null;
  const y = L.rate.y, W = 860, x0 = 110, p = outExpo((f - a - 4) / 24), c = ease(f, Q.cents - 6, Q.cents + 8);
  const segs = [{ v: 14.5, c: T.red, l: 'TAX 14.5¢' }, { v: 15, c: '#ff9a5a', l: 'CWB 15¢' }, { v: 7, c: T.amber, l: 'CCB 7¢' }];
  let off = 0;
  return (
    <div style={{ opacity: ease(f, a, a + 10) * (1 - ease(f, b - 2, b + 12)) }}>
      <div style={{ position: 'absolute', left: 56, top: y - 20, width: 968, height: 520, borderRadius: 28, ...glass }} />
      <div style={{ position: 'absolute', left: 90, top: y + 4, ...label(T.gold) }}>EACH $1 SHE EARNS BETWEEN $38,237 AND $40,000</div>
      <div style={{ position: 'absolute', left: x0, top: y + 70, width: W * p, height: 120, borderRadius: 14, background: GREEN, overflow: 'hidden' }}>
        {segs.map((s) => { const left = off * W / 100; off += s.v; return <div key={s.l} style={{ position: 'absolute', left, top: 0, width: s.v * W / 100 * c, height: 120, background: s.c }} />; })}
      </div>
      {segs.map((s, i) => (
        <div key={s.l} style={{ position: 'absolute', left: x0 + i * 230, top: y + 210, display: 'flex', alignItems: 'center', gap: 10, opacity: c }}>
          <span style={{ width: 22, height: 22, borderRadius: 5, background: s.c }} /><span style={{ ...label(T.white), fontSize: 20 }}>{s.l}</span>
        </div>
      ))}
      <div style={{ position: 'absolute', left: x0, top: y + 270, fontFamily: T.font, fontSize: 92, fontWeight: 900, color: T.red, opacity: c }}>36.5¢ GONE</div>
      <div style={{ position: 'absolute', left: x0, top: y + 390, fontFamily: T.font, fontSize: 24, fontWeight: 700, color: T.mute, opacity: c }}>before provincial tax, CPP and EI</div>
    </div>
  );
};

const End = ({ f }: { f: number }) => {
  const a = B.action.s;
  if (f < a - 2) return null;
  const y = L.end.y;
  return (
    <div style={{ position: 'absolute', left: 80, top: y, width: 880 }}>
      <div style={{ position: 'absolute', left: 0, top: 0, width: 880, height: 200, borderRadius: 26, ...glass, opacity: ease(f, a, a + 12) }}>
        <div style={{ position: 'absolute', left: 36, top: 26, ...label(T.gold) }}>BEFORE YOU SWITCH</div>
        <div style={{ position: 'absolute', left: 36, top: 66, right: 36, fontFamily: T.font, fontSize: 32, fontWeight: 900, lineHeight: 1.15, color: T.white, opacity: ease(f, Q.count - 4, Q.count + 6) }}>
          Count tax + CWB + CCB, not just the paycheque
        </div>
      </div>
      <div style={{ position: 'absolute', left: 0, top: 240, display: 'flex', alignItems: 'center', gap: 18, opacity: ease(f, Q.next - 4, Q.next + 8) }}>
        <Flag f={f} w={90} amp={0.06} />
        <div style={{ display: 'inline-flex', padding: '16px 28px', borderRadius: 999, background: `linear-gradient(160deg,${T.goldHi},${T.gold} 50%,${T.goldDeep})`, color: '#1d1503', fontFamily: T.font, fontSize: 28, fontWeight: 900,
          transform: `scale(${1 + 0.03 * Math.sin((f - a) / 6)})` }}>NEXT: WHY JANUARY'S PAY SHRINKS →</div>
      </div>
      <div style={{ position: 'absolute', left: 0, top: 330, fontFamily: T.font, fontSize: 26, fontWeight: 700, color: T.white, textShadow, opacity: ease(f, Q.follow, Q.follow + 10) }}>Follow so you don't miss it</div>
      <div style={{ position: 'absolute', left: -10, top: 380, width: 900, padding: '14px 18px', borderRadius: 14, background: 'rgba(10,16,28,.84)', fontFamily: T.font, fontSize: 18, fontWeight: 600, color: T.mute, lineHeight: 1.45, opacity: ease(f, a + 6, a + 20) }}>
        Source: canada.ca (CRA) 2025 federal rate & CWB; CCB how much (July 2026–June 2027) · example, federal only · general info, not advice
      </div>
    </div>
  );
};

const Header = ({ f }: { f: number }) => (
  <div style={{ position: 'absolute', left: 80, top: 92, right: 80, display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: T.white, fontSize: 22, fontWeight: 800, letterSpacing: 4, fontFamily: T.font }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}><Flag f={f} w={72} />TAX SECRETS CANADA</div>
    <div style={{ color: T.gold, letterSpacing: 5 }}>BENEFITS · {DATA.tax_year}</div>
  </div>
);

export const M17V3 = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: T.navy, fontFamily: T.font, overflow: 'hidden' }}>
      <SceneCuts f={f} cuts={CUTS} scene={(i) => i === 0 ? (
        <PhotoPlate f={f} src="plates/m17-s1-4k.jpg" iw={PW} ih={PH} keys={K1} glide={40} blur={0.8 + 4 * (1 - ease(f, 0, 20))} snow={[{ u0: 0.66, v0: 0.18, u1: 0.98, v1: 0.5 }]} />
      ) : i === 1 ? (
        <PhotoPlate f={f} src="plates/m17-s2-4k.jpg" iw={PW} ih={PH} keys={K2} glide={50} blur={0.8} snow={[{ u0: 0.76, v0: 0.2, u1: 0.98, v1: 0.52 }]} />
      ) : (
        <PhotoPlate f={f} src="plates/m17-s3-4k.jpg" iw={PW} ih={PH} keys={K3} glide={40} blur={0.8} snow={[{ u0: 0.72, v0: 0.18, u1: 0.98, v1: 0.5 }]} steam={{ u: 0.08, v: 0.74, w: 0.025 }} />
      )} />
      <Depth f={f} seed={f < B.c2.s ? 50 : f < B.reveal.s ? 51 : 52} warm={0.6} />
      <NavyGrade low={f >= B.action.s ? 1.2 : 1} />
      <Header f={f} />
      <Typed f={f} caps={CAPS} head={T.font} />
      {f < B.c1.s + 20 && <Hook f={f} />}
      <Fall f={f} />
      <Rate f={f} />
      <End f={f} />
      <Captions f={f} fps={M17FPS} beats={WORDS.beats as never} from={B.c1.s} until={B.action.s} y={1296} />
    </AbsoluteFill>
  );
};
