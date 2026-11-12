// R4 "Moving expenses: $6,000, just not all this year" — motion engine v1 (2026-11-12). Checklist: channel/REEL-CHECKLIST.md.
// Variety vs R3 / M30 / R2: hook = a route drawn Winnipeg → Calgary with a moving van; main visual = cost stack vs
// "income at the new job" meter (cap line); re-hook stamp ONLY $4,000 (≈58 %); reveal = two year blocks 2025/2026 with
// a carry-forward arrow; end = check card + next pill.
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { PhotoPlate, SceneCuts, type Focus } from './Plate';
import { Flag } from './RaiseShort';
import { Typed, beatsFrom, type Cap } from './Kit';
import TL from './r4-timeline.json';
import WORDS from './r4-words.json';
import CUE from './r4-cues.json';
import DATA from '../../r4/data.json';
import REEL from '../../r4/reel.json';
import { T, goldFill, textShadow } from './motion/brand';
import { Captions, Depth, Kinetic, NavyGrade, Stamp, clamp, ease, money, outBack, outExpo } from './motion/Reel';

export const R4FPS = 24;
const B = beatsFrom(TL, R4FPS);
export const R4DUR = Math.ceil((TL.total + REEL.hold_after_vo) * R4FPS);
const Q = Object.fromEntries(Object.entries(CUE).map(([k, v]) => [k, Math.round((v as number) * R4FPS)])) as Record<string, number>;
const X = DATA.example;
const GREEN = T.green;
const PW = 2294, PH = 4096;
const CUTS = [B.c2.s, B.reveal.s];
const L = Object.fromEntries(Object.entries(REEL.layout).map(([k, v]) => [k, { x: v.box[0], y: v.box[1], w: v.box[2], h: v.box[3] }])) as Record<string, { x: number; y: number; w: number; h: number }>;
const K1: Focus[] = [{ f: 0, u: 0.5, v: 0.3, k: 1.14 }, { f: B.c1.s, u: 0.45, v: 0.28, k: 1.22 }];
const K2: Focus[] = [{ f: 0, u: 0.5, v: 0.32, k: 1.2 }, { f: B.c3.s, u: 0.55, v: 0.3, k: 1.12 }];
const K3: Focus[] = [{ f: 0, u: 0.5, v: 0.34, k: 1.2 }, { f: B.action.s, u: 0.5, v: 0.3, k: 1.08 }];
const CAPS: Cap[] = [
  { at: B.c1.s, l1: 'THE 40 KM TEST', l2: 'new home closer to the new job', until: B.c2.s - 2 },
  { at: B.c2.s, l1: 'WHAT COUNTS', l2: 'movers · trip · temporary lodging', until: B.c3.s - 2 },
  { at: B.c3.s, l1: 'THE CATCH', l2: 'only income from the new job', until: B.reveal.s - 2 },
  { at: B.reveal.s, l1: 'THE ANSWER', l2: 'the rest carries forward', until: B.action.s - 2 },
];
const glass = { background: 'linear-gradient(160deg, rgba(10,16,28,.86), rgba(10,16,28,.62))', border: `1px solid ${T.glassEdge}` };
const label = (c: string) => ({ fontFamily: T.font, fontSize: 18, fontWeight: 900, letterSpacing: 4, color: c });

// ---------- hook: the route ----------
const Hook = ({ f }: { f: number }) => {
  const d = outExpo((f - 6) / 60), x0 = 860, y0 = 820, x1 = 200, y1 = 960;
  const px = x0 + (x1 - x0) * d, py = y0 + (y1 - y0) * d - Math.sin(d * Math.PI) * 120;
  return (
    <div style={{ opacity: 1 - ease(f, B.c1.s - 6, B.c1.s + 8) }}>
      <Kinetic f={f} at={0} now text={REEL.hook.l1} x={80} y={440} size={70} nowrap />
      <Kinetic f={f} at={0} now text={REEL.hook.l2} x={80} y={524} size={70} nowrap color={T.gold} />
      <div style={{ position: 'absolute', left: 60, top: 680, width: 960, height: 420, borderRadius: 26, ...glass, opacity: ease(f, 0, 8) }} />
      <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0 }}>
        <path d={`M ${x0} ${y0} Q ${(x0 + x1) / 2} ${y0 - 160} ${x1} ${y1}`} stroke={T.gold} strokeWidth={6} fill="none" strokeDasharray="1200" strokeDashoffset={1200 * (1 - d)} />
        <circle cx={x0} cy={y0} r={14} fill={T.white} /><circle cx={x1} cy={y1} r={14} fill={d > 0.98 ? GREEN : 'rgba(255,255,255,.3)'} />
      </svg>
      <div style={{ position: 'absolute', left: x0 - 80, top: y0 + 26, width: 160, textAlign: 'center', ...label(T.white) }}>WINNIPEG</div>
      <div style={{ position: 'absolute', left: x1 - 80, top: y1 + 26, width: 160, textAlign: 'center', ...label(T.white) }}>CALGARY</div>
      <div style={{ position: 'absolute', left: px - 40, top: py - 34, width: 80, height: 44, borderRadius: 8, background: T.white, boxShadow: '0 8px 20px rgba(0,0,0,.4)' }}>
        <div style={{ position: 'absolute', left: -14, top: 14, width: 18, height: 30, borderRadius: 4, background: T.gold }} />
      </div>
      {f >= Q.six && <div style={{ position: 'absolute', left: 80, width: 920, top: 1120, textAlign: 'center', fontFamily: T.font, fontSize: 48, fontWeight: 900, color: T.white, textShadow, opacity: ease(f, Q.six, Q.six + 8) }}>
        spent <span style={{ ...goldFill }}>{money(X.cost)}</span>{f >= Q.notall ? <span style={{ color: T.redSoft }}> · not all this year</span> : null}</div>}
    </div>
  );
};

// ---------- cost stack vs income meter ----------
const Route = ({ f }: { f: number }) => {
  const a = B.c1.s + 2, b = B.reveal.s;
  if (f < a - 1 || f > b + 14) return null;
  const y = L.route.y, H = 420, top = y + 120, sc = H / 6500;
  const rows: [string, number, number][] = [['MOVERS', X.movers, Q.movers], ['TRIP', X.trip, Q.trip], ['LODGING', X.lodging, Q.lodging]];
  let acc = 0;
  return (
    <div style={{ opacity: outExpo((f - a) / 14) * (1 - ease(f, b - 2, b + 12)) }}>
      <div style={{ position: 'absolute', left: 56, top: y - 20, width: 968, height: 640, borderRadius: 28, ...glass }} />
      <div style={{ position: 'absolute', left: 90, top: y, ...label(T.mute) }}>LINE 21900 · {DATA.tax_year} · EXAMPLE</div>
      {f < B.c2.s ? (
        <div style={{ position: 'absolute', left: 90, top: y + 80, width: 900 }}>
          <div style={{ fontFamily: T.font, fontSize: 30, fontWeight: 800, color: T.soft }}>new home → new job</div>
          <div style={{ fontFamily: T.font, fontSize: 120, fontWeight: 900, ...goldFill, opacity: ease(f, Q.forty - 2, Q.forty + 8) }}>≥ {X.km} km</div>
          <div style={{ fontFamily: T.font, fontSize: 30, fontWeight: 800, color: T.white }}>closer than the old home was</div>
          <div style={{ marginTop: 26, fontFamily: T.font, fontSize: 34, fontWeight: 900, color: GREEN, opacity: ease(f, Q.pass - 2, Q.pass + 8) }}>Winnipeg → Calgary ✓</div>
        </div>
      ) : (
        <>
          <div style={{ position: 'absolute', left: 190, top: top + H + 14, width: 220, textAlign: 'center', ...label(T.white) }}>EXPENSES</div>
          {rows.map(([lab, v, at]) => {
            const h = v * sc, bt = top + H - acc * sc - h; acc += v;
            return <div key={lab} style={{ position: 'absolute', left: 190, top: bt, width: 220, height: h - 4, borderRadius: 8, opacity: ease(f, at - 2, at + 8), background: `linear-gradient(180deg, ${T.goldHi}, ${T.goldDeep})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: T.font, fontSize: 20, fontWeight: 900, color: '#1d1503' }}>{lab} {money(v)}</div>;
          })}
          <div style={{ position: 'absolute', left: 150, width: 300, top: top - 60, textAlign: 'center', fontFamily: T.font, fontSize: 44, fontWeight: 900, color: T.white, opacity: ease(f, Q.total - 2, Q.total + 8) }}>{money(X.cost)}</div>
          {f >= B.c3.s && (
            <>
              <div style={{ position: 'absolute', left: 560, top: top + H + 14, width: 300, textAlign: 'center', ...label(T.white) }}>PAY AT THE NEW JOB</div>
              <div style={{ position: 'absolute', left: 600, top: top + H - X.income_new * sc * ease(f, Q.nov, Q.nov + 20), width: 220, height: X.income_new * sc * ease(f, Q.nov, Q.nov + 20), borderRadius: 8, background: 'rgba(127,224,168,.75)' }} />
              <div style={{ position: 'absolute', left: 150, width: 820, top: top + H - X.income_new * sc, borderTop: `3px dashed ${GREEN}`, opacity: ease(f, Q.four, Q.four + 8) }} />
              <div style={{ position: 'absolute', left: 560, width: 300, top: top + H - X.income_new * sc - 56, textAlign: 'center', fontFamily: T.font, fontSize: 40, fontWeight: 900, color: GREEN, opacity: ease(f, Q.four - 2, Q.four + 8) }}>{money(X.income_new)}</div>
            </>
          )}
          {f >= Q.four + 6 && <Stamp f={f} at={Q.four + 6} text={`ONLY ${money(X.income_new)} THIS YEAR`} x={130} y={y + 40} size={28} color={T.red} rotate={-4} />}
        </>
      )}
    </div>
  );
};

// ---------- reveal: two years ----------
const Split = ({ f }: { f: number }) => {
  const a = B.reveal.s, b = B.action.s;
  if (f < a || f > b + 12) return null;
  const y = L.split.y;
  const blk = (x: number, yr: string, v: number, at: number, c: string) => {
    const p = outBack((f - at) / 14);
    return (
      <div style={{ position: 'absolute', left: x, top: y + 80, width: 380, height: 260, borderRadius: 22, opacity: clamp(p), transform: `scale(${clamp(p, 0.6, 1.04)})`, border: `2px solid ${c}`, background: 'rgba(255,255,255,.06)' }}>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 28, textAlign: 'center', fontFamily: T.font, fontSize: 40, fontWeight: 900, color: T.white }}>{yr}</div>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 100, textAlign: 'center', fontFamily: T.font, fontSize: 72, fontWeight: 900, color: c }}>−{money(v)}</div>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 200, textAlign: 'center', fontFamily: T.font, fontSize: 18, fontWeight: 800, color: T.soft }}>deducted from new-job pay</div>
      </div>
    );
  };
  return (
    <div style={{ opacity: ease(f, a, a + 10) * (1 - ease(f, b - 2, b + 12)) }}>
      <div style={{ position: 'absolute', left: 56, top: y - 20, width: 968, height: 470, borderRadius: 28, ...glass }} />
      <div style={{ position: 'absolute', left: 90, top: y + 4, ...label(T.gold) }}>{money(X.cost)} · ALL OF IT, OVER TWO YEARS</div>
      {blk(90, '2025', X.deduct_now, Q.now - 4, GREEN)}
      {f >= Q.carry && blk(610, '2026', X.carry, Q.carry, T.gold)}
      {f >= Q.carry && <svg width={1080} height={400} style={{ position: 'absolute', left: 0, top: y + 120, overflow: 'visible' }}>
        <path d="M 475 90 L 600 90" stroke={T.gold} strokeWidth={6} strokeDasharray="200" strokeDashoffset={200 * (1 - outExpo((f - Q.carry) / 14))} />
        <polygon points="600,90 584,78 584,102" fill={T.gold} opacity={ease(f, Q.carry + 8, Q.carry + 14)} />
      </svg>}
      <div style={{ position: 'absolute', left: 90, width: 900, top: y + 370, fontFamily: T.font, fontSize: 18, fontWeight: 700, color: T.mute, opacity: ease(f, Q.carry, Q.carry + 10) }}>no carry-back · only income from the new work location · CRA line 21900</div>
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
        <div style={{ position: 'absolute', left: 36, top: 26, ...label(T.gold) }}>CHECK YOURS</div>
        <div style={{ position: 'absolute', left: 36, top: 66, right: 36, fontFamily: T.font, fontSize: 32, fontWeight: 900, lineHeight: 1.15, color: T.white, opacity: ease(f, Q.keep - 4, Q.keep + 6) }}>
          Keep every receipt; leave out what your employer paid back
        </div>
      </div>
      <div style={{ position: 'absolute', left: 0, top: 240, display: 'flex', alignItems: 'center', gap: 18, opacity: ease(f, Q.next - 4, Q.next + 8) }}>
        <Flag f={f} w={90} amp={0.06} />
        <div style={{ display: 'inline-flex', padding: '16px 28px', borderRadius: 999, background: `linear-gradient(160deg,${T.goldHi},${T.gold} 50%,${T.goldDeep})`, color: '#1d1503', fontFamily: T.font, fontSize: 28, fontWeight: 900,
          transform: `scale(${1 + 0.03 * Math.sin((f - a) / 6)})` }}>NEXT: FIRST-TIME HOME BUYERS →</div>
      </div>
      <div style={{ position: 'absolute', left: 0, top: 330, fontFamily: T.font, fontSize: 26, fontWeight: 700, color: T.white, textShadow, opacity: ease(f, Q.follow, Q.follow + 10) }}>Follow so you don't miss it</div>
      <div style={{ position: 'absolute', left: -10, top: 380, width: 900, padding: '14px 18px', borderRadius: 14, background: 'rgba(10,16,28,.84)', fontFamily: T.font, fontSize: 18, fontWeight: 600, color: T.mute, lineHeight: 1.45, opacity: ease(f, a + 6, a + 20) }}>
        Source: canada.ca (CRA) line 21900 moving expenses, {DATA.tax_year} · example move · general info, not advice
      </div>
    </div>
  );
};

const Header = ({ f }: { f: number }) => (
  <div style={{ position: 'absolute', left: 80, top: 92, right: 80, display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: T.white, fontSize: 22, fontWeight: 800, letterSpacing: 4, fontFamily: T.font }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}><Flag f={f} w={72} />TAX SECRETS CANADA</div>
    <div style={{ color: T.gold, letterSpacing: 5 }}>MOVING · {DATA.tax_year}</div>
  </div>
);

export const R4V3 = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: T.navy, fontFamily: T.font, overflow: 'hidden' }}>
      <SceneCuts f={f} cuts={CUTS} scene={(i) => i === 0 ? (
        <PhotoPlate f={f} src="plates/r4-s1-4k.jpg" iw={PW} ih={PH} keys={K1} glide={40} blur={0.8 + 4 * (1 - ease(f, 0, 20))} snow={[{ u0: 0.5, v0: 0.0, u1: 1.0, v1: 0.3 }]} />
      ) : i === 1 ? (
        <PhotoPlate f={f} src="plates/r4-s2-4k.jpg" iw={PW} ih={PH} keys={K2} glide={50} blur={0.8} snow={[{ u0: 0.0, v0: 0.0, u1: 1.0, v1: 0.6 }]} />
      ) : (
        <PhotoPlate f={f} src="plates/r4-s3-4k.jpg" iw={PW} ih={PH} keys={K3} glide={40} blur={0.8} steam={{ u: 0.3, v: 0.75, w: 0.03 }} />
      )} />
      <Depth f={f} seed={f < B.c2.s ? 30 : f < B.reveal.s ? 31 : 32} warm={0.6} />
      <NavyGrade low={f >= B.action.s ? 1.2 : 1} />
      <Header f={f} />
      <Typed f={f} caps={CAPS} head={T.font} />
      {f < B.c1.s + 20 && <Hook f={f} />}
      <Route f={f} />
      <Split f={f} />
      <End f={f} />
      <Captions f={f} fps={R4FPS} beats={WORDS.beats as never} from={B.c1.s} until={B.action.s} y={1296} />
    </AbsoluteFill>
  );
};
