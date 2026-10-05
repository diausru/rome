// Short #2: "Will a raise push you into a higher bracket?" — marginal tax myth (topic A3).
// Production bible + research record: raise/PRODUCTION-BIBLE.md · example numbers: raise/example.py
// Same visual language as SalaryShort (approved format) + a code-drawn Canadian flag.
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { LEAF } from './Coin';
import { Office } from './Office';
import TL from './raise-timeline.json';

export const RFPS = 24, RDUR = 1438, RW = 1080, RH = 1920;
const TAU = Math.PI * 2;
const C = { cream: '#f6f1e7', gold: '#ffd65e', green: '#27AE60', mint: '#bff0d2', red: '#ff8a65', orange: '#F39C12', flag: '#D52B1E' };
const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const sstep = (t: number) => { t = clamp(t); return t * t * t * (t * (t * 6 - 15) + 10); };
const ease = (f: number, a: number, b: number) => sstep((f - a) / (b - a));
const spring = (f: number, a: number, dur = 14) => { const t = clamp((f - a) / dur); return t >= 1 ? 1 : 1 - Math.exp(-6 * t) * Math.cos(7.5 * t); };
const money = (n: number) => '$' + Math.round(n).toLocaleString('en-US');

// master timeline = the voiceover (raise/vo-beats.json → tools/vo.py → raise-timeline.json)
const BT: Record<string, { s: number; e: number }> = Object.fromEntries(TL.beats.map((b) => [b.id, { s: Math.round(b.start * RFPS), e: Math.round(b.end * RFPS) }]));
const atB = (id: string, frac: number) => Math.round(BT[id].s + (BT[id].e - BT[id].s) * frac);
const S2 = BT.myth.s, S3 = BT.how.s, S4 = BT.example.s, S5 = BT.exception.s, S6 = BT.payoff.s;

const glass: React.CSSProperties = {
  background: 'linear-gradient(155deg, rgba(255,255,255,.16), rgba(255,255,255,.05) 60%)',
  border: '1.5px solid rgba(255,255,255,.24)', backdropFilter: 'blur(26px) saturate(150%)',
  boxShadow: 'inset 0 1.5px 0 rgba(255,255,255,.38), inset 0 -20px 40px rgba(0,0,0,.12), 0 3px 8px rgba(0,0,0,.28), 0 26px 50px rgba(0,0,0,.38), 0 70px 120px rgba(0,0,0,.32)',
};
const goldInk: React.CSSProperties = { color: C.gold, textShadow: '0 -2px 0 #fff3c4, 0 4px 0 #c08414, 0 8px 0 #87590a, 0 24px 40px rgba(0,0,0,.45)' };
const shadowInk = '0 3px 0 rgba(0,0,0,.25), 0 12px 30px rgba(0,0,0,.5)';

// ---------- Canadian flag: 1:2:1, cloth wave by vertical strips with shading ----------
export const Flag = ({ f, w = 96, amp = 0.05 }: { f: number; w?: number; amp?: number }) => {
  const h = w / 2, N = 24, sw = w / N;
  const id = `fl${w}`;
  return (
    <svg width={w} height={h * 1.25} viewBox={`0 ${-h * 0.125} ${w} ${h * 1.25}`} style={{ overflow: 'visible', filter: 'drop-shadow(0 6px 10px rgba(0,0,0,.4))' }}>
      <defs>
        <g id={id}>
          <rect x={0} y={0} width={w} height={h} fill="#fff" />
          <rect x={0} y={0} width={w / 4} height={h} fill={C.flag} />
          <rect x={w * 3 / 4} y={0} width={w / 4} height={h} fill={C.flag} />
          <path d={LEAF} fill={C.flag} transform={`translate(${w / 2 - h * 0.42} ${h * 0.08}) scale(${h * 0.84 / 100})`} />
        </g>
      </defs>
      {Array.from({ length: N }).map((_, i) => {
        const x = i * sw, u = x / w;
        const ph = TAU * (u * 1.1 - f / 40);
        const dy = Math.sin(ph) * h * amp * (0.3 + u);                 // the hoist (left) is fixed to the pole
        const shade = Math.cos(ph) * 0.13 * (0.3 + u);
        return (
          <g key={i} transform={`translate(0 ${dy})`}>
            <clipPath id={`${id}c${i}`}><rect x={x - 0.4} y={-h} width={sw + 0.8} height={h * 3} /></clipPath>
            <g clipPath={`url(#${id}c${i})`}>
              <use href={`#${id}`} />
              <rect x={x} y={0} width={sw + 0.5} height={h} fill={shade > 0 ? '#fff' : '#000'} opacity={Math.abs(shade)} />
            </g>
          </g>
        );
      })}
    </svg>
  );
};

// ---------- typed captions ----------
type Cap = { at: number; l1: string; l2?: string; until: number };
const CAPS: Cap[] = [
  { at: BT.hook.s, l1: 'Got a raise?', l2: '“Now I’m in a higher bracket…”', until: S2 - 2 },
  { at: S2, l1: 'The myth:', l2: 'your whole pay gets the higher rate.', until: S3 - 4 },
  { at: S3, l1: 'How it really works:', l2: 'watch the slices.', until: BT.s205.s - 2 },
  { at: BT.s205.s, l1: 'Only $1,477 crosses the line.', l2: 'That slice pays 20.5%. Not the rest.', until: S4 - 4 },
  { at: S4, l1: 'Real example, Manitoba 2026:', l2: 'a $2,000 raise.', until: BT.keep.s - 2 },
  { at: BT.keep.s, l1: 'You keep $1,292 of it.', l2: 'More money. Not less.', until: S5 - 4 },
  { at: S5, l1: 'One real exception:', l2: 'benefits that shrink with income.', until: BT.advice.s - 2 },
  { at: BT.advice.s, l1: 'On benefits?', l2: 'Run your numbers with a pro.', until: S6 - 4 },
  { at: S6, l1: 'A higher bracket never', l2: 'taxes your whole income.', until: RDUR + 10 },
];
const Typed = ({ f }: { f: number }) => {
  const c = CAPS.find((c) => f >= c.at && f < c.until);
  if (!c) return null;
  const cps = 1.6, n1 = Math.floor((f - c.at) * cps), n2 = Math.floor((f - c.at - c.l1.length / cps - 3) * cps);
  const caret = Math.floor(f / 8) % 2 === 0, typing2 = !!c.l2 && n2 >= 0;
  const line = (s: string, n: number, big: boolean, on: boolean) => (
    <div style={{ fontSize: big ? 62 : 44, fontWeight: big ? 900 : 700, letterSpacing: big ? -1.5 : -0.5, color: big ? C.cream : C.mint, minHeight: big ? 70 : 52, whiteSpace: 'nowrap' }}>
      {s.slice(0, clamp(n, 0, s.length))}
      {on && <span style={{ display: 'inline-block', width: big ? 6 : 4, height: big ? 56 : 40, marginLeft: 6, background: C.gold, opacity: caret ? 1 : 0, transform: 'translateY(6px)' }} />}
    </div>
  );
  return (
    <div style={{ position: 'absolute', left: 80, top: 190, opacity: clamp((c.until - f) / 4), textShadow: shadowInk }}>
      {line(c.l1, n1, true, !typing2)}
      {c.l2 && line(c.l2, n2, false, typing2)}
    </div>
  );
};

const Hero = ({ style, children }: { style?: React.CSSProperties; children: React.ReactNode }) => (
  <div style={{ position: 'absolute', left: 80, top: 330, width: 920, height: 480, borderRadius: 40, ...glass, ...style }}>{children}</div>
);
const inOut = (f: number, a: number, b: number) => {
  const e = spring(f, a, 16), o = 1 - ease(f, b - 12, b);
  return { e, o, style: { transform: `translateY(${(1 - e) * 90 + (1 - o) * 24}px) scale(${1 - (1 - o) * 0.06})`, opacity: clamp(e * 1.4) * o, filter: `blur(${(1 - clamp(e * 1.3)) * 10 + (1 - o) * 6}px)` } as React.CSSProperties };
};

// ---------- the 2026 federal bracket ladder (persistent data board) ----------
const BR = [
  { r: '14%', lo: 0, hi: 58523, label: 'up to $58,523' },
  { r: '20.5%', lo: 58523, hi: 117045, label: '$58,523 – $117,045' },
  { r: '26%', lo: 117045, hi: 181440, label: '$117,045 – $181,440' },
  { r: '29%', lo: 181440, hi: 258482, label: '$181,440 – $258,482' },
  { r: '33%', lo: 258482, hi: 340000, label: 'over $258,482' },
];
const L_Y0 = 890, L_H = 92, L_GAP = 10;
const Ladder = ({ f }: { f: number }) => {
  const inc = 58523 * ease(f, atB('s14', 0.45), atB('s14', 0.75)) + 1477 * ease(f, BT.s205.s, atB('s205', 0.6));              // example: $60,000 of taxable income
  const show = ease(f, S3 - 6, S3 + 20);
  const dim = (1 - 0.35 * ease(f, S4, S4 + 14) - 0.25 * ease(f, S5, S5 + 14)) * (1 - ease(f, S6 - 10, S6 + 6));
  return (
    <div style={{ opacity: show * dim }}>
      <div style={{ position: 'absolute', left: 82, top: L_Y0 - 44, fontSize: 24, fontWeight: 800, letterSpacing: 3, color: C.mint }}>FEDERAL TAX BRACKETS · 2026</div>
      {BR.map((b, i) => {
        const e = spring(f, S3 + i * 4, 14);
        const fill = clamp((inc - b.lo) / (b.hi - b.lo));
        const slice = Math.max(0, Math.min(inc, b.hi) - b.lo);
        const hot = i === 1 && slice > 0;
        return (
          <div key={i} style={{ position: 'absolute', left: 80, top: L_Y0 + i * (L_H + L_GAP), width: 860, height: L_H, borderRadius: 26, overflow: 'hidden', ...glass, transform: `translateX(${(1 - e) * -60}px)`, opacity: clamp(e * 1.4) }}>
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${fill * 100}%`, background: i === 0 ? 'linear-gradient(90deg, rgba(39,174,96,.55), rgba(95,227,154,.45))' : 'linear-gradient(90deg, rgba(243,156,18,.85), rgba(255,138,101,.8))', boxShadow: hot ? '0 0 30px rgba(243,156,18,.8)' : 'none' }} />
            <div style={{ position: 'absolute', left: 28, top: 0, bottom: 0, display: 'flex', alignItems: 'center', gap: 26 }}>
              <span style={{ width: 150, fontSize: 48, fontWeight: 900, color: i === 1 && hot ? C.gold : C.cream, letterSpacing: -1, textShadow: shadowInk }}>{b.r}</span>
              <span style={{ fontSize: 30, fontWeight: 700, color: C.cream, opacity: 0.9, textShadow: shadowInk }}>{b.label}</span>
            </div>
            {slice > 0 && i < 2 && (
              <div style={{ position: 'absolute', right: 26, top: 0, bottom: 0, display: 'flex', alignItems: 'center', fontSize: 36, fontWeight: 900, fontVariantNumeric: 'tabular-nums', ...(i === 1 ? goldInk : { color: C.cream, textShadow: shadowInk }) }}>{money(slice)}</div>
            )}
          </div>
        );
      })}
      <div style={{ position: 'absolute', left: 82, top: L_Y0 + 5 * (L_H + L_GAP) + 4, width: 860, fontSize: 21, fontWeight: 600, color: C.cream, opacity: 0.7 }}>
        Example: $60,000 of taxable income · federal rates only · provincial tax is extra
      </div>
    </div>
  );
};

export const RaiseShort = () => {
  const f = useCurrentFrame();
  const T = f / RDUR;
  const yaw = 0.42 - 0.84 * sstep(T) + 0.0025 * (Math.sin(f * 0.031) + 0.6 * Math.sin(f * 0.077 + 1.3));
  const pitch = -0.02 + 0.0018 * Math.sin(f * 0.043 + 0.4);
  const roll = 0.0012 * Math.sin(f * 0.029 + 2.1);
  const grade = 0.15 + 0.85 * sstep(T);

  const h1 = inOut(f, 2, S3);            // raise card stays under the myth
  const myth = ease(f, S2 + 2, S2 + 14);
  const hHow = inOut(f, S3, BT.s14.s);
  const h3 = inOut(f, BT.s14.s, S4);
  const h4 = inOut(f, S4, S5);
  const h5 = inOut(f, S5, S6);
  const end = spring(f, S6 + 6, 18);

  // example: +$2,000 → keep $1,292 (raise/example.py)
  const parts: [string, number][] = [['Federal', 318.06], ['Manitoba', 238.24], ['CPP', 119], ['EI', 32.6]];
  let taken = 0;
  const shown = parts.map(([, v], k) => { const a = atB('deduct', [0.02, 0.33, 0.66, 0.82][k]); const e = ease(f, a, a + 12); taken += v * e; return e; });

  return (
    <AbsoluteFill style={{ background: '#06170f', fontFamily: 'Mont', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', left: 0, top: 0, width: RW / 2, height: RH / 2, transform: 'scale(2)', transformOrigin: '0 0' }}>
        <Office f={f} loop={180} w={RW / 2} h={RH / 2} blur={[9, 9]} pan={{ yaw, pitch, roll, vfov: 50, grade }} />
      </div>
      <AbsoluteFill style={{ background: `rgba(4,24,16,${0.66 - 0.16 * grade})` }} />
      <AbsoluteFill style={{ background: 'linear-gradient(180deg, rgba(2,14,9,.75) 0%, rgba(2,14,9,0) 22%, rgba(2,14,9,0) 70%, rgba(2,14,9,.8) 100%)' }} />
      <AbsoluteFill style={{ background: `radial-gradient(900px 700px at 180px 160px, rgba(255,205,110,${0.06 + 0.22 * grade}), rgba(255,205,110,0) 70%)`, mixBlendMode: 'screen' }} />

      {/* header with flag */}
      <div style={{ position: 'absolute', left: 80, top: 92, right: 80, display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: C.cream, fontSize: 24, fontWeight: 800, letterSpacing: 3 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}><Flag f={f} w={84} />TAX SECRETS CANADA</div>
        <div style={{ padding: '8px 18px', borderRadius: 999, ...glass, fontSize: 22 }}>2026 TAX YEAR</div>
      </div>

      <Typed f={f} />

      {/* S1–S2: the raise and the myth */}
      {f < S3 && (
        <Hero style={h1.style}>
          <div style={{ position: 'absolute', left: 52, top: 50, fontSize: 30, fontWeight: 800, color: C.mint, letterSpacing: 3 }}>YOUR RAISE</div>
          <div style={{ position: 'absolute', left: 44, top: 96, fontSize: 168, fontWeight: 900, letterSpacing: -7, ...goldInk }}>+$2,000</div>
          <div style={{ position: 'absolute', left: 52, top: 300, width: 816, opacity: myth, transform: `translateY(${(1 - myth) * 20}px)` }}>
            <div style={{ display: 'inline-block', padding: '6px 18px', borderRadius: 12, background: 'linear-gradient(160deg,#ff8a65,#d84315)', color: '#fff', fontSize: 28, fontWeight: 900, letterSpacing: 4, transform: `rotate(-3deg) scale(${1 + 0.25 * (1 - spring(f, S2 + 2, 12))})`, boxShadow: '0 10px 22px rgba(0,0,0,.4)' }}>MYTH</div>
            <div style={{ position: 'relative', marginTop: 14, fontSize: 38, fontWeight: 800, color: C.cream, lineHeight: 1.2, textShadow: shadowInk, opacity: 1 - 0.45 * ease(f, BT.nope.s, BT.nope.s + 8) }}>“The higher rate hits my whole salary.”<div style={{ position: 'absolute', left: -6, top: '50%', height: 6, borderRadius: 3, background: '#ff8a65', width: `${102 * ease(f, BT.nope.s, BT.nope.s + 10)}%`, boxShadow: '0 4px 12px rgba(0,0,0,.4)' }} /></div>
          </div>
        </Hero>
      )}

      {/* S3a: the rule */}
      {f >= S3 - 2 && f < BT.s14.s + 2 && (
        <Hero style={{ ...hHow.style, height: 300 }}>
          <div style={{ position: 'absolute', left: 52, top: 44, display: 'inline-block', padding: '8px 18px', borderRadius: 14, background: 'linear-gradient(160deg,#5fe39a,#27AE60 50%,#146b3a)', color: '#fff', fontSize: 26, fontWeight: 900, letterSpacing: 3 }}>MARGINAL RATES</div>
          <div style={{ position: 'absolute', left: 52, top: 110, width: 816, fontSize: 50, fontWeight: 900, color: C.cream, lineHeight: 1.12, textShadow: shadowInk }}>Each rate taxes only <span style={goldInk}>its own slice</span> of income.</div>
        </Hero>
      )}

      {/* S3: slices */}
      {f >= BT.s14.s - 2 && f < S4 + 2 && (
        <Hero style={h3.style}>
          <div style={{ position: 'absolute', left: 52, top: 46, fontSize: 30, fontWeight: 800, color: C.mint, letterSpacing: 3 }}>EXAMPLE · $60,000 TAXABLE INCOME</div>
          {[['$58,523', 'taxed at 14%', C.cream, atB('s14', 0.45)], ['$1,477', 'taxed at 20.5%', C.gold, BT.s205.s + 6]].map(([a, b, col, at], k) => {
            const e = ease(f, at as number, (at as number) + 16);
            return (
              <div key={k} style={{ position: 'absolute', left: 52, top: 110 + k * 150, display: 'flex', alignItems: 'baseline', gap: 26, opacity: e, transform: `translateX(${(1 - e) * -30}px)` }}>
                <span style={{ fontSize: 110, fontWeight: 900, letterSpacing: -4, fontVariantNumeric: 'tabular-nums', ...(k ? goldInk : { color: col as string, textShadow: shadowInk }) }}>{a}</span>
                <span style={{ fontSize: 40, fontWeight: 800, color: k ? C.gold : C.cream, textShadow: shadowInk }}>{b}</span>
              </div>
            );
          })}
          <div style={{ position: 'absolute', left: 52, top: 420, fontSize: 26, fontWeight: 700, color: C.cream, opacity: 0.8 * ease(f, atB('s205', 0.5), atB('s205', 0.5) + 14) }}>Each rate applies only to its own bracket. — CRA</div>
        </Hero>
      )}

      {/* S4: real example */}
      {f >= S4 - 2 && f < S5 + 2 && (
        <Hero style={h4.style}>
          <div style={{ position: 'absolute', left: 52, top: 40, display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ padding: '8px 16px', borderRadius: 14, background: 'linear-gradient(160deg,#ffefb0,#f2c14e 50%,#cf961f)', color: '#2e2004', fontSize: 26, fontWeight: 900, letterSpacing: 2 }}>EXAMPLE</div>
            <div style={{ fontSize: 32, fontWeight: 800, color: C.cream }}>Manitoba · single · 2026</div>
          </div>
          <div style={{ position: 'absolute', left: 46, top: 112, fontSize: 150, fontWeight: 900, letterSpacing: -6, fontVariantNumeric: 'tabular-nums', ...(f > BT.keep.s ? goldInk : { color: C.cream, textShadow: shadowInk }) }}>{money(2000 - taken)}</div>
          <div style={{ position: 'absolute', left: 52, top: 278, fontSize: 28, fontWeight: 700, color: C.mint, letterSpacing: 2 }}>{f > BT.keep.s ? 'YOU KEEP — OF THE $2,000 RAISE' : 'THE $2,000 RAISE'}</div>
          <div style={{ position: 'absolute', left: 52, top: 330, display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 56, rowGap: 16, width: 816 }}>
            {parts.map(([k, v], i) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 32, fontWeight: 700, opacity: shown[i], transform: `translateX(${(1 - shown[i]) * -24}px)`, color: C.cream }}>
                <span style={{ opacity: 0.85 }}>{k}</span><span style={{ color: C.red }}>−{money(v)}</span>
              </div>
            ))}
          </div>
          <div style={{ position: 'absolute', left: 52, top: 430, fontSize: 22, fontWeight: 600, color: C.cream, opacity: 0.75 }}>Salary $58,000 → $60,000 · no other income or deductions</div>
        </Hero>
      )}

      {/* S5: the exception */}
      {f >= S5 - 2 && f < S6 + 2 && (
        <Hero style={h5.style}>
          <div style={{ position: 'absolute', left: 52, top: 44, display: 'inline-block', padding: '8px 18px', borderRadius: 14, background: 'linear-gradient(160deg,#ffc56b,#F39C12 60%,#c26f00)', color: '#2a1600', fontSize: 26, fontWeight: 900, letterSpacing: 3 }}>EXCEPTION</div>
          <div style={{ position: 'absolute', left: 52, top: 110, width: 816, fontSize: 46, fontWeight: 900, color: C.cream, lineHeight: 1.15, textShadow: shadowInk }}>Some benefits shrink as family income rises.</div>
          <div style={{ position: 'absolute', left: 52, top: 250, width: 816, fontSize: 32, fontWeight: 700, color: C.cream, lineHeight: 1.3, opacity: ease(f, atB('exception', 0.2), atB('exception', 0.2) + 14) }}>
            <span style={{ color: C.gold }}>Canada Child Benefit:</span> reduced once adjusted family net income passes <span style={{ color: C.gold }}>$38,237</span>
          </div>
          <div style={{ position: 'absolute', left: 52, top: 410, fontSize: 22, fontWeight: 600, color: C.cream, opacity: 0.75 * ease(f, atB('exception', 0.6), atB('exception', 0.6) + 14) }}>CRA · payment period July 2026 – June 2027 · depends on your family</div>
        </Hero>
      )}

      <Ladder f={f} />

      {/* S6: payoff */}
      {f >= S6 && (
        <div style={{ position: 'absolute', left: 80, top: 400, width: 920, opacity: clamp(end * 1.4), transform: `translateY(${(1 - end) * 60}px)` }}>
          <Flag f={f} w={220} amp={0.06} />
          <div style={{ marginTop: 34, fontSize: 40, fontWeight: 800, color: C.mint, letterSpacing: 2 }}>THE RULE</div>
          <div style={{ fontSize: 58, fontWeight: 900, color: C.cream, lineHeight: 1.1, marginTop: 8, textShadow: shadowInk }}>Each rate only taxes<br /><span style={goldInk}>its own slice.</span></div>
          <div style={{ marginTop: 50, display: 'inline-flex', alignItems: 'center', padding: '22px 34px', borderRadius: 999, background: 'linear-gradient(160deg,#ffefb0,#f2c14e 50%,#cf961f)', color: '#2e2004', fontSize: 38, fontWeight: 900, boxShadow: 'inset 0 2px 1px rgba(255,255,255,.7), 0 16px 30px rgba(0,0,0,.4)', opacity: ease(f, BT.cta.s - 4, BT.cta.s + 8), transform: `scale(${1 + 0.03 * Math.sin(TAU * (f - S6) / 36)})` }}>Follow for the real math</div>
        </div>
      )}
      {f >= S6 && (
        <div style={{ position: 'absolute', left: 80, top: 1300, width: 860, fontSize: 21, fontWeight: 600, color: C.cream, opacity: 0.75 * ease(f, S6 + 24, S6 + 40), lineHeight: 1.45 }}>
          Sources: CRA — 2026 tax rates and brackets; CRA T4127 (2026); CRA — Canada Child Benefit amounts.<br />Example only · general info, not advice.
        </div>
      )}
    </AbsoluteFill>
  );
};
