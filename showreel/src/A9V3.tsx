// A9 "Filed wrong? How to fix your return" — investigation format, motion engine v1 (2026-10-13).
// Variety vs A2 / A8 / A5 (CLAUDE.md "Variety"): hook = a date-flip ticker (MARCH ✓ FILED → JUNE + a late slip) with a
// red ✕ on "a second return"; main visual = a paper return page edited in red pen per case (struck-out line, new value,
// result chip) + a ten-year ruler for case 3; reveal = a fork diagram (✕ second return / ✓ wait for the notice → change it);
// end = a comparison chart of turnaround (online ≈ 2 weeks vs paper ≈ 8 weeks). Numbers come from a9/data.json.
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { PhotoPlate, SceneCuts, type Focus } from './Plate';
import { Flag } from './RaiseShort';
import { Typed, beatsFrom, type Cap } from './Kit';
import TL from './a9-timeline.json';
import WORDS from './a9-words.json';
import CUE from './a93-cues.json';
import DATA from '../../a9/data.json';
import REEL from '../../a9/reel.json';
import { T, goldFill, textShadow } from './motion/brand';
import { Captions, Depth, Glass, Kinetic, NavyGrade, Stamp, clamp, ease, money, outBack, outExpo } from './motion/Reel';

export const A93FPS = 24;
const B = beatsFrom(TL, A93FPS);
export const A93DUR = Math.ceil((TL.total + REEL.hold_after_vo) * A93FPS);
const Q = Object.fromEntries(Object.entries(CUE).map(([k, v]) => [k, Math.round((v as number) * A93FPS)])) as Record<string, number>;

const X = DATA.example;
const RATE = X.fed_rate + X.mb_rate;
const BACK = X.union * RATE;
const OWE = X.t4a * RATE;
const RED = T.redSoft;
const INK = '#c0392b';
const PW = 2294, PH = 4096;

const CUTS = [B.c3.s, B.reveal.s];
const L = Object.fromEntries(Object.entries(REEL.layout).map(([k, v]) => [k, { x: v.box[0], y: v.box[1], w: v.box[2], h: v.box[3] }])) as Record<string, { x: number; y: number; w: number; h: number }>;
const K1: Focus[] = [{ f: 0, u: 0.5, v: 0.32, k: 1.18 }, { f: B.c1.s, u: 0.5, v: 0.24, k: 1.24 }, { f: B.c2.s, u: 0.55, v: 0.3, k: 1.14 }];
const K2: Focus[] = [{ f: 0, u: 0.5, v: 0.3, k: 1.22 }, { f: Q.ten, u: 0.45, v: 0.42, k: 1.12 }];
const K3: Focus[] = [{ f: 0, u: 0.5, v: 0.3, k: 1.2 }, { f: B.action.s, u: 0.5, v: 0.38, k: 1.12 }, { f: B.cta.s, u: 0.5, v: 0.32, k: 1.06 }];

const CAPS: Cap[] = [
  { at: B.c1.s, l1: 'CASE 1', l2: 'a deduction you forgot', until: B.c2.s - 2 },
  { at: B.c2.s, l1: 'CASE 2', l2: 'a slip that came late', until: B.c3.s - 2 },
  { at: B.c3.s, l1: 'CASE 3', l2: 'a credit from years ago', until: B.reveal.s - 2 },
  { at: B.reveal.s, l1: 'THE TWIST', l2: 'never a second return', until: B.action.s - 2 },
];

// ---------- hook: the date-flip ticker ----------
const Flip = ({ f, at, from, to }: { f: number; at: number; from: string; to: string }) => {
  const p = clamp((f - at) / 10), half = p < 0.5;
  const txt = half ? from : to, sy = half ? 1 - p * 2 : (p - 0.5) * 2;
  return (
    <div style={{ position: 'absolute', left: 80, top: 640, width: 400, height: 300, borderRadius: 24, background: 'linear-gradient(180deg,#f4f2ec 0 49%, #e4e1d8 51% 100%)', boxShadow: '0 30px 70px rgba(0,0,0,.55)', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 60, background: '#b3261e' }} />
      <div style={{ position: 'absolute', left: 0, width: 400, top: 96, textAlign: 'center', fontFamily: T.font, fontSize: 92, fontWeight: 900, color: '#2a3140', transform: `scaleY(${f < at ? 1 : Math.max(0.02, sy)})` }}>{f < at ? from : txt}</div>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 149, height: 2, background: 'rgba(0,0,0,.18)' }} />
    </div>
  );
};
const Hook = ({ f }: { f: number }) => {
  const out = B.c1.s, o = ease(f, out - 6, out + 8);
  const sp = outExpo((f - Q.slip) / 14);
  return (
    <div style={{ opacity: 1 - o }}>
      <Kinetic f={f} at={0} now text={REEL.hook.l1} x={80} y={470} size={70} nowrap />
      <Kinetic f={f} at={0} now text={REEL.hook.l2} x={80} y={552} size={70} nowrap color={T.gold} />
      <Flip f={f} at={Q.june - 4} from="MARCH" to="JUNE" />
      {f < Q.june && <Stamp f={f} at={Q.march} text="✓ Filed" x={190} y={880} size={34} color={T.green} rotate={-6} />}
      {f >= Q.slip - 2 && (
        <div style={{ position: 'absolute', left: 540 + (1 - sp) * 400, top: 660, width: 400, height: 260, borderRadius: 12, background: '#f4f2ec', transform: `rotate(${4 - 2 * sp}deg)`, boxShadow: '0 30px 60px rgba(0,0,0,.5)', opacity: sp }}>
          <div style={{ position: 'absolute', left: 26, top: 22, fontFamily: T.font, fontSize: 22, fontWeight: 900, letterSpacing: 4, color: '#3a4250' }}>SLIP · ARRIVED LATE</div>
          {[0.8, 0.6, 0.7].map((w, i) => <div key={i} style={{ position: 'absolute', left: 26, top: 80 + i * 40, width: 340 * w, height: 12, borderRadius: 6, background: '#c9ccd3' }} />)}
          <div style={{ position: 'absolute', left: 26, bottom: 24, fontFamily: T.font, fontSize: 20, fontWeight: 800, color: '#b3261e' }}>example</div>
        </div>
      )}
      {f >= Q.again - 2 && (
        <div style={{ position: 'absolute', left: 80, width: 880, top: 1000, textAlign: 'center', opacity: ease(f, Q.again - 2, Q.again + 6) }}>
          <span style={{ fontFamily: T.font, fontSize: 54, fontWeight: 900, color: T.white, textShadow, textDecoration: f >= Q.no ? `line-through ${RED} 8px` : undefined }}>FILE A 2ND RETURN?</span>
        </div>
      )}
      <Stamp f={f} at={Q.no} text="No" x={460} y={1080} size={50} color={T.red} rotate={-10} />
      {f >= Q.how && <div style={{ position: 'absolute', left: 80, width: 880, top: 1190, textAlign: 'center', fontFamily: T.font, fontSize: 30, fontWeight: 800, letterSpacing: 4, color: T.gold, opacity: ease(f, Q.how, Q.how + 8), textShadow }}>HOW A FIX REALLY WORKS ↓</div>}
    </div>
  );
};

// ---------- persistent three-case strip ----------
const Strip = ({ f }: { f: number }) => {
  const a = B.c1.s, b = B.reveal.s;
  if (f < a || f > b + 14) return null;
  const o = ease(f, b - 2, b + 12);
  const cells: [string, number, string, string][] = [['CASE 1', Q.back1, `+${money(BACK)}`, T.green], ['CASE 2', Q.owe, `−${money(OWE)}`, RED], ['CASE 3', Q.ten, `≤ ${X.years_back} YRS`, T.gold]];
  const active = f >= B.c3.s ? 2 : f >= B.c2.s ? 1 : 0;
  return (
    <div style={{ position: 'absolute', left: L.strip.x, top: L.strip.y, width: L.strip.w, display: 'flex', gap: 14, opacity: 1 - o }}>
      {cells.map(([t, at, v, c], i) => {
        const p = outExpo((f - a - 2 - i * 3) / 12), on = i === active;
        return (
          <div key={t} style={{ flex: 1, height: 88, borderRadius: 16, position: 'relative', opacity: p * (on ? 1 : 0.62), transform: `translateY(${(1 - p) * 40}px)`,
            background: on ? 'linear-gradient(180deg, rgba(241,199,91,.22), rgba(12,18,30,.78))' : T.glass, border: `1.5px solid ${on ? T.gold : T.glassEdge}` }}>
            <div style={{ position: 'absolute', left: 24, top: 12, fontFamily: T.font, fontSize: 16, fontWeight: 800, letterSpacing: 3, color: on ? T.gold : T.mute }}>{t}</div>
            <div style={{ position: 'absolute', left: 24, top: 36, fontFamily: T.font, fontSize: 32, fontWeight: 900, color: f >= at ? c : T.mute, fontVariantNumeric: 'tabular-nums' }}>{f >= at ? v : '…'}</div>
          </div>
        );
      })}
    </div>
  );
};

// ---------- the paper return page, edited in red pen ----------
const Page = ({ f }: { f: number }) => {
  const a = B.c1.s + 4, b = B.c3.s - 2;
  if (f < a - 1 || f > b + 20) return null;
  const pi = outExpo((f - a) / 16), po = ease(f, b, b + 14);
  const row = (y: number, label: string, oldV: string, newV: string, strikeAt: number, newAt: number, hl: boolean) => {
    const s = clamp((f - strikeAt) / 8), n = outBack((f - newAt) / 10);
    return (
      <div style={{ position: 'absolute', left: 40, right: 40, top: y, height: 56, background: hl && f >= strikeAt ? 'rgba(241,199,91,.18)' : undefined, borderRadius: 8 }}>
        <div style={{ position: 'absolute', left: 16, top: 12, fontFamily: T.font, fontSize: 24, fontWeight: 800, color: '#3a4250' }}>{label}</div>
        <div style={{ position: 'absolute', right: 230, top: 10, fontFamily: 'Courier New, monospace', fontSize: 30, fontWeight: 900, color: '#3a4250' }}>{oldV}
          <div style={{ position: 'absolute', left: -6, top: 18, height: 4, width: `calc(${s * 100}% + 12px)`, background: INK, transform: 'rotate(-4deg)' }} /></div>
        {f >= newAt && <div style={{ position: 'absolute', right: 20, top: 2, fontFamily: 'Segoe Script, Comic Sans MS, cursive', fontSize: 38, fontWeight: 700, color: INK, transform: `scale(${clamp(n, 0, 1.1)}) rotate(-3deg)`, transformOrigin: '0 50%' }}>{newV}</div>}
      </div>
    );
  };
  const c2 = f >= B.c2.s;
  return (
    <div style={{ position: 'absolute', left: L.page.x, top: L.page.y + (1 - pi) * 120, width: L.page.w, height: L.page.h, opacity: pi * (1 - po), transform: `rotate(${-0.6 * pi}deg)` }}>
      <div style={{ position: 'absolute', inset: 0, borderRadius: 10, background: '#f4f2ec', boxShadow: '0 40px 80px rgba(0,0,0,.55)' }} />
      <div style={{ position: 'absolute', left: 56, top: 30, fontFamily: T.font, fontSize: 22, fontWeight: 900, letterSpacing: 4, color: '#3a4250' }}>YOUR FILED RETURN · EXAMPLE</div>
      <div style={{ position: 'absolute', left: 40, right: 40, top: 76, borderTop: '2px solid #9aa0ab' }} />
      {[0.7, 0.5].map((w, i) => <div key={i} style={{ position: 'absolute', left: 56, top: 100 + i * 34, width: 600 * w, height: 12, borderRadius: 6, background: '#d3d6dc' }} />)}
      {row(172, 'Union dues', '$0', money(X.union), Q.dues, Q.change1, !c2)}
      {row(240, 'Other income (T4A)', '$0', money(X.t4a), c2 ? Q.k3 : 1e9, c2 ? Q.k3 + 4 : 1e9, c2)}
      {[0.6, 0.45].map((w, i) => <div key={i} style={{ position: 'absolute', left: 56, top: 318 + i * 30, width: 600 * w, height: 12, borderRadius: 6, background: '#d3d6dc' }} />)}
      {!c2 && f >= Q.back1 && (
        <div style={{ position: 'absolute', left: 56, top: 392, display: 'flex', alignItems: 'baseline', gap: 14, transform: `translateY(${(1 - outExpo((f - Q.back1) / 10)) * 20}px)` }}>
          <span style={{ fontFamily: T.font, fontSize: 56, fontWeight: 900, color: '#1e7a4a' }}>+{money(BACK)}</span>
          <span style={{ fontFamily: T.font, fontSize: 22, fontWeight: 800, color: '#3a4250' }}>back · deduction × {+(RATE * 100).toFixed(2)}%</span>
        </div>
      )}
      {c2 && f >= Q.owe && (
        <div style={{ position: 'absolute', left: 56, top: 392, display: 'flex', alignItems: 'baseline', gap: 14, transform: `translateY(${(1 - outExpo((f - Q.owe) / 10)) * 20}px)` }}>
          <span style={{ fontFamily: T.font, fontSize: 56, fontWeight: 900, color: '#b3261e' }}>−{money(OWE)}</span>
          <span style={{ fontFamily: T.font, fontSize: 22, fontWeight: 800, color: '#3a4250', opacity: ease(f, Q.may - 4, Q.may + 4) }}>owing · + interest from MAY 1</span>
        </div>
      )}
      <div style={{ position: 'absolute', left: 56, bottom: 18, fontFamily: T.font, fontSize: 16, fontWeight: 700, color: '#6a7080' }}>example · Manitoba, taxable income ≈ $70K · 20.5% fed + 12.75% MB</div>
    </div>
  );
};

// ---------- case 3: the ten-year ruler ----------
const Ruler = ({ f }: { f: number }) => {
  const now = DATA.tax_year, first = now - X.years_back;
  const years = Array.from({ length: X.years_back + 1 }, (_, i) => first + i);
  return (
    <Glass f={f} a={B.c3.s + 4} b={B.reveal.s - 2} y={L.page.y} h={L.page.h} w={L.page.w} label="Case 3 · a refund from years ago" enter="wipe" exit="collapse" collapseTo="50% 0%" lit={ease(f, Q.ten, Q.ten + 8)}>
      <div style={{ position: 'absolute', left: 50, top: 100, display: 'flex', gap: 4 }}>
        {years.map((y, i) => {
          const on = f >= Q.ten + (X.years_back - i) * 2 && i < years.length - 1;
          return (
            <div key={y} style={{ width: 70, height: 110, borderRadius: 10, display: 'grid', placeItems: 'center', background: on ? 'rgba(241,199,91,.24)' : 'rgba(255,255,255,.05)', border: `1px solid ${on ? T.gold : T.glassEdge}`,
              fontFamily: T.font, fontSize: 19, fontWeight: 900, color: on ? T.white : T.mute, writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>{y}</div>
          );
        })}
      </div>
      <div style={{ position: 'absolute', left: 50, top: 236, fontFamily: T.font, fontSize: 28, fontWeight: 900, color: T.white, opacity: ease(f, Q.ten, Q.ten + 8) }}>
        A request made in {now} can reach back to <span style={{ ...goldFill }}>{first}</span></div>
      <div style={{ position: 'absolute', left: 50, top: 286, fontFamily: T.font, fontSize: 22, fontWeight: 700, color: T.soft, opacity: ease(f, Q.ten + 6, Q.ten + 16) }}>{X.years_back} calendar years after the end of the tax year · refunds or reductions</div>
      <Stamp f={f} at={Q.call} text="CRA's discretion" x={480} y={350} size={22} color={T.amber} rotate={-4} />
      <div style={{ position: 'absolute', left: 50, top: 410, fontFamily: T.font, fontSize: 17, fontWeight: 700, color: T.mute, opacity: ease(f, Q.call, Q.call + 10) }}>ITA 152(4.2): CRA “may” reassess · Change my return: 2015 and later</div>
    </Glass>
  );
};

// ---------- reveal: the fork ----------
const Fork = ({ f }: { f: number }) => {
  const a = B.reveal.s, b = B.action.s;
  if (f < a || f > b + 14) return null;
  const o = ease(f, b - 2, b + 12), y = L.fork.y;
  const draw = outExpo((f - a - 4) / 18);
  const card = (x: number, at: number, ok: boolean, l1: string, l2: string) => {
    const p = outBack((f - at) / 12);
    if (f < at) return null;
    return (
      <div style={{ position: 'absolute', left: x, top: y + 250, width: 420, height: 270, borderRadius: 26, background: 'linear-gradient(160deg, rgba(14,20,34,.88), rgba(10,14,24,.74))', border: `2px solid ${ok ? T.green : RED}`,
        transform: `scale(${clamp(p, 0.6, 1.04)})`, opacity: clamp(p, 0, 1) }}>
        <div style={{ position: 'absolute', left: 28, top: 22, width: 64, height: 64, borderRadius: 32, display: 'grid', placeItems: 'center', background: ok ? 'rgba(127,224,168,.18)' : 'rgba(224,57,43,.2)', fontFamily: T.font, fontSize: 38, fontWeight: 900, color: ok ? T.green : RED }}>{ok ? '✓' : '✕'}</div>
        <div style={{ position: 'absolute', left: 28, top: 100, right: 24, fontFamily: T.font, fontSize: 28, fontWeight: 900, lineHeight: 1.12, color: T.white }}>{l1}</div>
        <div style={{ position: 'absolute', left: 28, top: 200, right: 24, fontFamily: T.font, fontSize: 19, fontWeight: 700, lineHeight: 1.3, color: T.soft }}>{l2}</div>
      </div>
    );
  };
  return (
    <div style={{ opacity: 1 - o }}>
      <div style={{ position: 'absolute', left: 80, width: 880, top: y, textAlign: 'center', fontFamily: T.font, fontSize: 30, fontWeight: 900, letterSpacing: 3, color: T.white, textShadow, opacity: ease(f, a, a + 10) }}>YOU FOUND A MISTAKE</div>
      <svg width={1080} height={260} style={{ position: 'absolute', left: 0, top: y + 50, overflow: 'visible' }}>
        <path d={`M 540 10 L 540 ${10 + 80 * draw}`} stroke={T.glassEdge} strokeWidth={6} fill="none" />
        <path d={`M 540 90 C 540 150, 290 140, 290 ${90 + 110 * draw}`} stroke={f >= Q.second ? RED : T.glassEdge} strokeWidth={6} fill="none" strokeDasharray="14 10" />
        <path d={`M 540 90 C 540 150, 790 140, 790 ${90 + 110 * draw}`} stroke={f >= Q.wait ? T.green : T.glassEdge} strokeWidth={6} fill="none" />
      </svg>
      {card(80, Q.second, false, 'FILE A SECOND RETURN', 'not how it works')}
      {card(540, Q.wait, true, 'WAIT FOR THE NOTICE, THEN CHANGE IT', 'notice of assessment first, then adjust the return you filed')}
      <Stamp f={f} at={Q.change2} text="Adjust, don't refile" x={600} y={y + 150} size={22} color={T.green} rotate={-4} />
    </div>
  );
};

// ---------- action + end: the turnaround chart ----------
const Bars = ({ f }: { f: number }) => {
  const a = B.action.s;
  if (f < a - 2) return null;
  const y = L.bars.y, max = 8, W = 600;
  const bar = (yy: number, at: number, label: string, sub: string, weeks: number, c: string) => {
    const p = outExpo((f - at) / 18);
    if (f < at - 4) return null;
    return (
      <div style={{ position: 'absolute', left: 0, top: yy, width: 880, opacity: ease(f, at - 4, at + 4) }}>
        <div style={{ fontFamily: T.font, fontSize: 26, fontWeight: 900, color: T.white, textShadow }}>{label}</div>
        <div style={{ fontFamily: T.font, fontSize: 18, fontWeight: 700, color: T.soft, textShadow }}>{sub}</div>
        <div style={{ position: 'absolute', left: 0, top: 70, width: W, height: 40, borderRadius: 20, background: 'rgba(255,255,255,.08)' }} />
        <div style={{ position: 'absolute', left: 0, top: 70, width: (W * weeks / max) * p, height: 40, borderRadius: 20, background: c }} />
        <div style={{ position: 'absolute', left: (W * weeks / max) * p + 18, top: 66, fontFamily: T.font, fontSize: 34, fontWeight: 900, color: T.white, textShadow, whiteSpace: 'nowrap' }}>≈ {Math.max(1, Math.round(weeks * p))} WEEKS</div>
      </div>
    );
  };
  return (
    <div style={{ position: 'absolute', left: 80, top: y, width: 880 }}>
      <div style={{ position: 'absolute', left: -24, top: -24, width: 928, height: 300, borderRadius: 26, background: 'linear-gradient(160deg, rgba(10,16,28,.8), rgba(10,16,28,.58))', border: `1px solid ${T.glassEdge}`, opacity: ease(f, a, a + 12) }} />
      {bar(0, Q.online, 'ONLINE', 'Change my return (My Account) · ReFILE (your tax software)', X.online_weeks, `linear-gradient(90deg, ${T.goldDeep}, ${T.gold})`)}
      {bar(130, Q.paper, 'PAPER', 'Form T1-ADJ by mail', X.paper_weeks, 'rgba(190,210,240,.55)')}
      <div style={{ position: 'absolute', left: 0, top: 300, display: 'flex', alignItems: 'center', gap: 18, opacity: ease(f, Q.next - 4, Q.next + 8) }}>
        <Flag f={f} w={90} amp={0.06} />
        <div style={{ display: 'inline-flex', padding: '16px 28px', borderRadius: 999, background: `linear-gradient(160deg,${T.goldHi},${T.gold} 50%,${T.goldDeep})`, color: '#1d1503', fontFamily: T.font, fontSize: 28, fontWeight: 900,
          transform: `scale(${1 + 0.03 * Math.sin((f - a) / 6)})` }}>NEXT: MB479 CREDITS PEOPLE MISS →</div>
      </div>
      <div style={{ position: 'absolute', left: 0, top: 390, fontFamily: T.font, fontSize: 26, fontWeight: 700, color: T.white, textShadow, opacity: ease(f, Q.follow, Q.follow + 10) }}>Follow so you don't miss it</div>
      <div style={{ position: 'absolute', left: 0, top: 440, width: 880, fontFamily: T.font, fontSize: 18, fontWeight: 600, color: T.mute, lineHeight: 1.45, opacity: ease(f, a + 20, a + 34) }}>
        Source: canada.ca “Change your return”; Income Tax Act ss. 152(4.2), 161(1), 8(1)(i); 2026 federal and Manitoba rates · example amounts · times are CRA estimates · general info, not advice
      </div>
    </div>
  );
};

const Header = ({ f }: { f: number }) => (
  <div style={{ position: 'absolute', left: 80, top: 92, right: 80, display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: T.white, fontSize: 22, fontWeight: 800, letterSpacing: 4, fontFamily: T.font }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}><Flag f={f} w={72} />TAX SECRETS CANADA</div>
    <div style={{ color: T.gold, letterSpacing: 5 }}>FIX A RETURN · {DATA.tax_year}</div>
  </div>
);

export const A9V3 = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: T.navy, fontFamily: T.font, overflow: 'hidden' }}>
      <SceneCuts f={f} cuts={CUTS} scene={(i) => i === 0 ? (
        <PhotoPlate f={f} src="plates/a9-s1-4k.jpg" iw={PW} ih={PH} keys={K1} glide={40} blur={0.8 + 4 * (1 - ease(f, 0, 20))} />
      ) : i === 1 ? (
        <PhotoPlate f={f} src="plates/a9-s2-4k.jpg" iw={PW} ih={PH} keys={K2} glide={50} blur={0.8} />
      ) : (
        <PhotoPlate f={f} src="plates/a9-s3-4k.jpg" iw={PW} ih={PH} keys={K3} glide={40} blur={0.8} steam={{ u: 0.5, v: 0.55, w: 0.035 }} />
      )} />
      <Depth f={f} seed={f < B.c3.s ? 40 : f < B.reveal.s ? 41 : 42} warm={0.6} />
      <NavyGrade low={f >= B.action.s ? 1.2 : 1} />
      <Header f={f} />
      <Typed f={f} caps={CAPS} head={T.font} />
      {f < B.c1.s + 20 && <Hook f={f} />}
      <Strip f={f} />
      <Page f={f} />
      <Ruler f={f} />
      <Fork f={f} />
      <Bars f={f} />
      <Captions f={f} fps={A93FPS} beats={WORDS.beats as never} from={B.c1.s} until={B.action.s} y={1296} />
    </AbsoluteFill>
  );
};
