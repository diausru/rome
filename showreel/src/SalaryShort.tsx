// Short: "$100K, 10 provinces" — 2026 take-home pay on a $100,000 salary, by province.
// Production bible: salary/PRODUCTION-BIBLE.md · numbers: salary/calc.py → src/salary-data.json
// Background: one continuous tripod pan across the defocused office plate (Office.tsx, pan mode).
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Flag } from './RaiseShort';
import { Office } from './Office';
import DATA from './salary-data.json';
import TL from './salary-timeline.json';

export const SFPS = 24, SDUR = 1428, SW = 1080, SH = 1920;
const TAU = Math.PI * 2;
const F = 'Mont';
const C = { cream: '#f6f1e7', gold: '#ffd65e', green: '#27AE60', mint: '#bff0d2', red: '#ff8a65', grey: '#a9b4ae' };
const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const sstep = (t: number) => { t = clamp(t); return t * t * t * (t * (t * 6 - 15) + 10); };
const ease = (f: number, a: number, b: number) => sstep((f - a) / (b - a));
// damped spring 0→1 (overshoot ~3%)
const spring = (f: number, a: number, dur = 14) => { const t = clamp((f - a) / dur); return 1 - Math.exp(-6 * t) * Math.cos(7.5 * t) * (1 - t * 0.0) * (t < 1 ? 1 : 0); };
const money = (n: number) => '$' + Math.round(n).toLocaleString('en-US');

type Row = { p: string; net: number; fed: number; prov: number; cpp: number; ei: number };
const BY: Record<string, Row> = Object.fromEntries((DATA as Row[]).map((r) => [r.p, r]));
const NAME: Record<string, string> = { BC: 'British Columbia', AB: 'Alberta', ON: 'Ontario', SK: 'Saskatchewan', MB: 'Manitoba', NB: 'New Brunswick', NL: 'Newfoundland & Labrador', PE: 'Prince Edward Island', NS: 'Nova Scotia', QC: 'Québec' };
// reveal order: Québec aside first, then worst → best
const ORDER = ['QC', 'NS', 'PE', 'NL', 'NB', 'MB', 'SK', 'ON', 'AB', 'BC'];
const RANK: Record<string, number> = { BC: 1, AB: 2, ON: 3, SK: 4, MB: 5, NB: 6, NL: 7, PE: 8, NS: 9 };
const NOTE: Record<string, string> = {
  QC: 'Separate Québec return · estimate', NS: 'Keeps the least', PE: '', NL: '', NB: '',
  MB: 'Our home province · brackets frozen since 2025', SK: '', ON: '', AB: 'Not #1?', BC: 'Keeps the most',
};
// master timeline = the voiceover (salary/vo-beats.json → tools/vo.py → salary-timeline.json)
const BT: Record<string, { s: number; e: number }> = Object.fromEntries(TL.beats.map((b) => [b.id, { s: Math.round(b.start * SFPS), e: Math.round(b.end * SFPS) }]));
const atB = (id: string, frac: number) => Math.round(BT[id].s + (BT[id].e - BT[id].s) * frac);
const T_TWIST = BT.twist.s, T_GAP = BT.gap.s, T_STAT = BT.stat.s, T_END = BT.payoff.s;
const C_START: Record<string, number> = {}, C_END: Record<string, number> = {};
ORDER.forEach((p, i) => { C_START[p] = BT[p === 'QC' ? 'qc' : p].s - 4; });
ORDER.forEach((p, i) => { C_END[p] = i + 1 < ORDER.length ? C_START[ORDER[i + 1]] : T_TWIST - 2; });
const T_CARDS = C_START.QC;

// ---------- leaderboard geometry ----------
const ROW_Y0 = 850, ROW_H = 60, ROW_GAP = 3;
const slotOf = (p: string) => (p === 'QC' ? 9 : RANK[p] - 1);
const rowY = (p: string) => ROW_Y0 + slotOf(p) * (ROW_H + ROW_GAP);
const barPct = (net: number) => 15 + ((net - 68000) / (76000 - 68000)) * 85;

// ---------- typing captions ----------
type Cap = { at: number; l1: string; l2?: string; until: number };
const CAPS: Cap[] = [
  { at: BT.hook.s, l1: '$100,000 salary.', l2: 'How much do you keep?', until: BT.setup.s - 2 },
  { at: BT.setup.s, l1: 'Same $100K. 10 provinces.', l2: 'One keeps $6,506 more. Which?', until: T_CARDS - 4 },
  ...ORDER.map((p) => ({ at: C_START[p], l1: p === 'QC' ? 'Québec · aside' : `#${RANK[p]} · ${NAME[p]}`, l2: NOTE[p] || undefined, until: C_END[p] - 2 })),
  { at: T_TWIST + 2, l1: 'Wait — B.C. beats Alberta?', l2: 'At $100K, yes. Here is why.', until: T_GAP - 2 },
  { at: T_GAP + 2, l1: '#1 vs #9:', l2: 'same salary, different province.', until: T_STAT - 2 },
  { at: T_STAT + 2, l1: 'About 1 in 6 workers', l2: 'earns $100K or more.', until: T_END - 2 },
  { at: T_END + 2, l1: 'Where you live', l2: 'is a tax decision.', until: SDUR + 10 },
];
const Typed = ({ f }: { f: number }) => {
  const c = CAPS.find((c) => f >= c.at && f < c.until);
  if (!c) return null;
  const cps = 1.6; // chars per frame
  const n1 = Math.floor((f - c.at) * cps);
  const n2 = Math.floor((f - c.at - c.l1.length / cps - 3) * cps);
  const out = clamp((c.until - f) / 4);
  const caret = Math.floor(f / 8) % 2 === 0;
  const line = (s: string, n: number, big: boolean, on: boolean) => (
    <div style={{ fontSize: big ? 62 : 44, fontWeight: big ? 900 : 700, letterSpacing: big ? -1.5 : -0.5, color: big ? C.cream : C.mint, minHeight: big ? 70 : 52, whiteSpace: 'nowrap' }}>
      {s.slice(0, clamp(n, 0, s.length))}
      {on && <span style={{ display: 'inline-block', width: big ? 6 : 4, height: big ? 56 : 40, marginLeft: 6, background: C.gold, opacity: caret ? 1 : 0, transform: 'translateY(6px)' }} />}
    </div>
  );
  const typing2 = !!c.l2 && n2 >= 0;
  return (
    <div style={{ position: 'absolute', left: 80, top: 190, opacity: out, textShadow: '0 3px 0 rgba(0,0,0,.25), 0 12px 30px rgba(0,0,0,.5)' }}>
      {line(c.l1, n1, true, !typing2)}
      {c.l2 && line(c.l2, n2, false, typing2)}
    </div>
  );
};

// ---------- building blocks ----------
const glass: React.CSSProperties = {
  background: 'linear-gradient(155deg, rgba(255,255,255,.16), rgba(255,255,255,.05) 60%)',
  border: '1.5px solid rgba(255,255,255,.24)', backdropFilter: 'blur(26px) saturate(150%)',
  boxShadow: 'inset 0 1.5px 0 rgba(255,255,255,.38), inset 0 -20px 40px rgba(0,0,0,.12), 0 3px 8px rgba(0,0,0,.28), 0 26px 50px rgba(0,0,0,.38), 0 70px 120px rgba(0,0,0,.32)',
};
const goldInk: React.CSSProperties = { color: C.gold, textShadow: '0 -2px 0 #fff3c4, 0 4px 0 #c08414, 0 8px 0 #87590a, 0 24px 40px rgba(0,0,0,.45)' };

const Hero = ({ style, children }: { style?: React.CSSProperties; children: React.ReactNode }) => (
  <div style={{ position: 'absolute', left: 80, top: 330, width: 920, height: 480, borderRadius: 40, ...glass, ...style }}>{children}</div>
);

// card for one province: count down $100,000 → take-home while the four deductions subtract
const ProvinceCard = ({ p, f0, len, f }: { p: string; f0: number; len: number; f: number }) => {
  const t = f - f0;
  if (t < 0 || t > len) return null;
  const a0 = Math.min(10, len * 0.15), step = clamp(len * 0.5 / 4, 3, 7), done = a0 + step * 4 + 2;
  const r = BY[p], qc = p === 'QC';
  const parts: [string, number][] = [['Federal', r.fed], [qc ? 'Québec' : 'Provincial', r.prov], [qc ? 'QPP' : 'CPP', r.cpp], [qc ? 'EI+QPIP' : 'EI', r.ei]];
  let taken = 0;
  const shown = parts.map(([, v], k) => { const e = ease(t, a0 + k * step, a0 + (k + 1) * step + 1); taken += v * e; return e; });
  const value = 100000 - taken;
  const enter = spring(t, 0, Math.min(12, Math.max(6, len * 0.3)));
  const exit = ease(t, len - Math.min(7, len * 0.25), len);
  const gold = p === 'BC';
  return (
    <Hero style={{ transform: `translateY(${(1 - enter) * 90 + exit * 30}px) scale(${1 - exit * 0.08})`, opacity: clamp(enter * 1.4) * (1 - exit), filter: `blur(${(1 - clamp(enter * 1.3)) * 10 + exit * 6}px)` }}>
      <div style={{ position: 'absolute', left: 50, top: 40, display: 'flex', alignItems: 'center', gap: 18 }}>
        <div style={{ minWidth: 92, height: 64, padding: '0 18px', borderRadius: 20, display: 'grid', placeItems: 'center', fontSize: 38, fontWeight: 900, color: qc ? '#1d2420' : '#2e2004', background: qc ? 'linear-gradient(160deg,#dfe6e2,#a9b4ae)' : 'linear-gradient(160deg,#ffefb0,#f2c14e 50%,#cf961f)', boxShadow: 'inset 0 2px 1px rgba(255,255,255,.7), 0 10px 22px rgba(0,0,0,.4)' }}>{qc ? '≈' : `#${RANK[p]}`}</div>
        <div style={{ fontSize: 44, fontWeight: 800, color: C.cream, letterSpacing: -0.5 }}>{NAME[p]}</div>
      </div>
      <div style={{ position: 'absolute', left: 46, top: 132, fontSize: 150, fontWeight: 900, letterSpacing: -6, fontVariantNumeric: 'tabular-nums', ...(gold || t > done ? goldInk : { color: C.cream, textShadow: '0 4px 0 rgba(0,0,0,.25), 0 24px 40px rgba(0,0,0,.45)' }) }}>
        {qc && t > done ? '≈' : ''}{money(value)}
      </div>
      <div style={{ position: 'absolute', left: 52, top: 300, fontSize: 28, fontWeight: 700, color: C.mint, letterSpacing: 2 }}>TAKE-HOME OF $100,000</div>
      <div style={{ position: 'absolute', left: 52, top: 350, display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 56, rowGap: 16, width: 816 }}>
        {parts.map(([k, v], i) => (
          <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 32, fontWeight: 700, opacity: shown[i], transform: `translateX(${(1 - shown[i]) * -24}px)`, color: C.cream }}>
            <span style={{ opacity: 0.85 }}>{k}</span><span style={{ color: C.red, fontVariantNumeric: 'tabular-nums' }}>−{money(v)}</span>
          </div>
        ))}
      </div>
    </Hero>
  );
};

// one leaderboard row; flies in from the hero card on an arc, then settles
const LRow = ({ p, f, land, hi }: { p: string; f: number; land: number; hi: number }) => {
  if (f < land - 12) return null;
  const r = BY[p], qc = p === 'QC';
  const t = ease(f, land - 12, land);
  const y = rowY(p);
  const fromY = 520;
  const cy = fromY + (y - fromY) * t - Math.sin(Math.PI * t) * 60;
  const settle = 1 + Math.exp(-0.35 * Math.max(0, f - land)) * Math.sin(Math.max(0, f - land) * 0.9) * 0.04 * (f >= land ? 1 : 0);
  const glow = hi;
  return (
    <div style={{ position: 'absolute', left: 60, top: cy, width: 880, height: ROW_H, borderRadius: 18, display: 'flex', alignItems: 'center', gap: 16, padding: '0 18px', transform: `scale(${(0.7 + 0.3 * t) * settle})`, transformOrigin: '50% 50%', opacity: clamp(t * 1.5),
      ...glass, background: glow > 0 ? `linear-gradient(90deg, rgba(242,193,78,${0.18 + 0.22 * glow}), rgba(255,255,255,.05))` : glass.background, border: glow > 0 ? `1.5px solid rgba(255,214,94,${0.3 + 0.6 * glow})` : glass.border,
      boxShadow: `${glass.boxShadow}${glow > 0 ? `, 0 0 ${30 * glow}px rgba(255,200,90,${0.5 * glow})` : ''}` }}>
      <div style={{ width: 54, fontSize: 30, fontWeight: 900, color: qc ? C.grey : RANK[p] === 1 ? C.gold : C.cream }}>{qc ? '≈' : `#${RANK[p]}`}</div>
      <div style={{ width: 300, fontSize: 28, fontWeight: 800, color: qc ? C.grey : C.cream, whiteSpace: 'nowrap', overflow: 'hidden' }}>{p === 'NL' ? 'Nfld. & Labrador' : p === 'PE' ? 'P.E.I.' : NAME[p]}</div>
      <div style={{ flex: 1, height: 14, borderRadius: 7, background: 'rgba(255,255,255,.1)', overflow: 'hidden' }}>
        <div style={{ width: `${barPct(r.net) * ease(f, land - 2, land + 10)}%`, height: '100%', borderRadius: 7, background: qc ? 'linear-gradient(90deg,#8d9993,#c3ccc7)' : RANK[p] === 1 ? 'linear-gradient(90deg,#ffe08a,#f2c14e)' : 'linear-gradient(90deg,#1f8e4f,#5fe39a)' }} />
      </div>
      <div style={{ width: 150, textAlign: 'right', fontSize: 30, fontWeight: 900, fontVariantNumeric: 'tabular-nums', color: qc ? C.grey : RANK[p] === 1 ? C.gold : C.cream }}>{qc ? '≈' : ''}{money(r.net)}</div>
    </div>
  );
};

export const SalaryShort = () => {
  const f = useCurrentFrame();
  const T = f / SDUR;
  // tripod pan with operator micro-motion
  const yaw = -0.42 + 0.84 * sstep(T) + 0.0025 * (Math.sin(f * 0.031) + 0.6 * Math.sin(f * 0.077 + 1.3));
  const pitch = -0.02 + 0.0018 * Math.sin(f * 0.043 + 0.4);
  const roll = 0.0012 * Math.sin(f * 0.029 + 2.1);
  const grade = 0.15 + 0.85 * sstep(T);

  // hook / setup hero
  const hookIn = spring(f, 2, 16);
  const hookOut = ease(f, T_CARDS - 14, T_CARDS - 2);
  const qmarks = ['Federal', 'Provincial', 'CPP', 'EI'];

  // highlights: twist (BC & AB), gap (BC & NS)
  const twistHi = ease(f, T_TWIST + 10, T_TWIST + 24) * (1 - ease(f, T_GAP - 10, T_GAP));
  const gapHi = ease(f, T_GAP + 6, T_GAP + 20) * (1 - ease(f, T_STAT - 8, T_STAT));
  const boardDim = 1 - 0.55 * ease(f, T_STAT, T_STAT + 12);
  const boardOut = ease(f, T_END + 6, T_END + 30);
  const endIn = spring(f, T_END + 10, 18);

  return (
    <AbsoluteFill style={{ background: '#06170f', fontFamily: F, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', left: 0, top: 0, width: SW / 2, height: SH / 2, transform: 'scale(2)', transformOrigin: '0 0' }}>
        <Office f={f} loop={180} w={SW / 2} h={SH / 2} blur={[9, 9]} pan={{ yaw, pitch, roll, vfov: 50, grade }} />
      </div>
      <AbsoluteFill style={{ background: `rgba(4,24,16,${0.66 - 0.16 * grade})` }} />
      <AbsoluteFill style={{ background: 'linear-gradient(180deg, rgba(2,14,9,.75) 0%, rgba(2,14,9,0) 22%, rgba(2,14,9,0) 70%, rgba(2,14,9,.8) 100%)' }} />
      <AbsoluteFill style={{ background: `radial-gradient(900px 700px at 900px 160px, rgba(255,205,110,${0.06 + 0.22 * grade}), rgba(255,205,110,0) 70%)`, mixBlendMode: 'screen' }} />

      {/* header */}
      <div style={{ position: 'absolute', left: 80, top: 96, right: 80, display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: C.cream, fontSize: 24, fontWeight: 800, letterSpacing: 3 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <Flag f={f} w={84} />
          TAX SECRETS CANADA
        </div>
        <div style={{ padding: '8px 18px', borderRadius: 999, ...glass, fontSize: 22 }}>2026 TAX YEAR</div>
      </div>

      <Typed f={f} />

      {/* S1–S2: the salary and what comes off it */}
      {f < T_CARDS && (
        <Hero style={{ transform: `translateY(${(1 - hookIn) * 120}px) scale(${1.25 - 0.25 * hookIn - hookOut * 0.06})`, opacity: clamp(hookIn * 1.5) * (1 - hookOut), filter: `blur(${hookOut * 8}px)` }}>
          <div style={{ position: 'absolute', left: 52, top: 50, fontSize: 30, fontWeight: 800, color: C.mint, letterSpacing: 3 }}>YOUR SALARY</div>
          <div style={{ position: 'absolute', left: 44, top: 96, fontSize: 168, fontWeight: 900, letterSpacing: -7, ...goldInk }}>$100,000</div>
          <div style={{ position: 'absolute', left: 52, top: 300, display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 40, rowGap: 14, width: 820 }}>
            {qmarks.map((k, i) => {
              const e = ease(f, BT.setup.s + 10 + i * 8, BT.setup.s + 22 + i * 8);
              return (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 34, fontWeight: 700, color: C.cream, opacity: e, transform: `translateX(${(1 - e) * -24}px)` }}>
                  <span style={{ opacity: 0.85 }}>{k}</span><span style={{ color: C.red }}>−$?</span>
                </div>
              );
            })}
          </div>
          <div style={{ position: 'absolute', left: 52, top: 410, fontSize: 30, fontWeight: 700, color: C.cream, opacity: 0.8 * ease(f, BT.setup.s + 50, BT.setup.s + 64) }}>Single · employment income only</div>
        </Hero>
      )}

      {ORDER.map((p) => <ProvinceCard key={p} p={p} f0={C_START[p]} len={C_END[p] - C_START[p]} f={f} />)}

      {/* S4: the twist */}
      {f >= T_TWIST - 2 && f < T_GAP + 4 && (() => {
        const e = spring(f, T_TWIST, 16), o = 1 - ease(f, T_GAP - 10, T_GAP);
        const rows: [string, string, string][] = [['First ~$50K', '5.6%', '8%'], ['Up to ~$100K', '7.7%', '8–10%'], ['Provincial tax', '$5,556', '$6,470']];
        return (
          <Hero style={{ transform: `translateY(${(1 - e) * 90}px)`, opacity: clamp(e * 1.4) * o }}>
            <div style={{ position: 'absolute', left: 52, top: 44, right: 52, display: 'grid', gridTemplateColumns: '1.3fr 1fr 1fr', fontSize: 34, fontWeight: 800, color: C.mint, letterSpacing: 1 }}>
              <span>2026 rates</span><span style={{ color: C.gold }}>B.C.</span><span>Alberta</span>
            </div>
            {rows.map(([a, b, c], k) => {
              const ek = ease(f, atB('twist', [0.3, 0.5, 0.85][k]) - 4, atB('twist', [0.3, 0.5, 0.85][k]) + 8);
              return (
                <div key={a} style={{ position: 'absolute', left: 52, right: 52, top: 120 + k * 118, display: 'grid', gridTemplateColumns: '1.3fr 1fr 1fr', alignItems: 'baseline', opacity: ek, transform: `translateY(${(1 - ek) * 20}px)`, borderTop: '1.5px solid rgba(255,255,255,.14)', paddingTop: 22 }}>
                  <span style={{ fontSize: 34, fontWeight: 700, color: C.cream }}>{a}</span>
                  <span style={{ fontSize: 64, fontWeight: 900, ...goldInk }}>{b}</span>
                  <span style={{ fontSize: 56, fontWeight: 900, color: C.cream, opacity: 0.75 }}>{c}</span>
                </div>
              );
            })}
          </Hero>
        );
      })()}

      {/* S5: the gap */}
      {f >= T_GAP - 2 && f < T_STAT + 4 && (() => {
        const e = spring(f, T_GAP, 16), o = 1 - ease(f, T_STAT - 10, T_STAT);
        const m = ease(f, atB('gap', 0.74) - 4, atB('gap', 0.74) + 10);
        return (
          <Hero style={{ transform: `translateY(${(1 - e) * 90}px)`, opacity: clamp(e * 1.4) * o }}>
            <div style={{ position: 'absolute', left: 52, top: 50, fontSize: 32, fontWeight: 800, color: C.mint, letterSpacing: 2 }}>B.C. $75,373 − N.S. $68,867</div>
            <div style={{ position: 'absolute', left: 44, top: 100, fontSize: 168, fontWeight: 900, letterSpacing: -7, ...goldInk }}>{money(6506 * ease(f, T_GAP + 4, atB('gap', 0.45)))}</div>
            <div style={{ position: 'absolute', left: 52, top: 290, fontSize: 40, fontWeight: 800, color: C.cream }}>a year more in your pocket</div>
            <div style={{ position: 'absolute', left: 52, top: 380, fontSize: 64, fontWeight: 900, color: C.cream, opacity: m, transform: `translateY(${(1 - m) * 20}px)` }}>= <span style={goldInk}>$542</span> every month</div>
          </Hero>
        );
      })()}

      {/* S6: the statistic */}
      {f >= T_STAT - 2 && f < T_END + 4 && (() => {
        const e = spring(f, T_STAT, 16), o = 1 - ease(f, T_END - 10, T_END);
        return (
          <Hero style={{ transform: `translateY(${(1 - e) * 90}px)`, opacity: clamp(e * 1.4) * o }}>
            <div style={{ position: 'absolute', left: 44, top: 70, fontSize: 200, fontWeight: 900, letterSpacing: -8, ...goldInk }}>17.1%</div>
            <div style={{ position: 'absolute', left: 52, top: 300, fontSize: 40, fontWeight: 800, color: C.cream, width: 820, lineHeight: 1.2 }}>of Canadians with a job earned $100,000 or more in 2024</div>
            <div style={{ position: 'absolute', left: 52, top: 410, fontSize: 24, fontWeight: 600, color: C.mint, opacity: 0.85 }}>Statistics Canada · Canadian Income Survey 2024</div>
          </Hero>
        );
      })()}

      {/* leaderboard */}
      <div style={{ opacity: boardDim * (1 - boardOut), transform: `translateY(${boardOut * 40}px)` }}>
        {ORDER.map((p, i) => {
          const hi = (p === 'BC' || p === 'AB') ? twistHi : 0;
          const hg = (p === 'BC' || p === 'NS') ? gapHi : 0;
          return <LRow key={p} p={p} f={f} land={C_END[p] - 2} hi={Math.max(hi, hg)} />;
        })}
        {/* gap bracket between #1 and #9 */}
        {gapHi > 0 && (
          <svg width={SW} height={SH} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            <path d={`M 948 ${rowY('BC') + ROW_H / 2} h 22 V ${rowY('NS') + ROW_H / 2} h -22`} fill="none" stroke={C.gold} strokeWidth={5} strokeLinecap="round" strokeDasharray={1200} strokeDashoffset={1200 * (1 - gapHi)} />
          </svg>
        )}
        <div style={{ position: 'absolute', left: 62, top: ROW_Y0 + 10 * (ROW_H + ROW_GAP) + 8, width: 880, fontSize: 21, fontWeight: 600, color: C.cream, opacity: 0.7 * ease(f, T_CARDS, T_CARDS + 20) }}>
          2026 · single · employment income · after tax, CPP/QPP, EI (+QPIP in QC)
        </div>
      </div>

      {/* S7: payoff */}
      {f >= T_END && (
        <>
          <div style={{ position: 'absolute', left: 80, top: 400, width: 920, opacity: clamp(endIn * 1.4), transform: `translateY(${(1 - endIn) * 60}px)` }}>
            <Flag f={f} w={200} amp={0.06} />
            <div style={{ marginTop: 26, fontSize: 40, fontWeight: 800, color: C.mint, letterSpacing: 2 }}>SAME $100,000</div>
            <div style={{ fontSize: 130, fontWeight: 900, letterSpacing: -5, lineHeight: 1, marginTop: 10, ...goldInk }}>$6,506</div>
            <div style={{ fontSize: 46, fontWeight: 800, color: C.cream, marginTop: 14 }}>apart, every year.</div>
            <div style={{ marginTop: 70, display: 'inline-flex', alignItems: 'center', gap: 18, padding: '22px 34px', borderRadius: 999, background: 'linear-gradient(160deg,#ffefb0,#f2c14e 50%,#cf961f)', color: '#2e2004', fontSize: 38, fontWeight: 900, boxShadow: 'inset 0 2px 1px rgba(255,255,255,.7), 0 16px 30px rgba(0,0,0,.4)', transform: `scale(${1 + 0.03 * Math.sin(TAU * (f - T_END) / 36)})` }}>Follow for the real math</div>
          </div>
          <div style={{ position: 'absolute', left: 80, top: 1120, width: 840, fontSize: 22, fontWeight: 600, color: C.cream, opacity: 0.75 * ease(f, T_END + 20, T_END + 34), lineHeight: 1.45 }}>
            Sources: CRA T4127 (2026), 2026 provincial budgets, Revenu Québec, Statistics Canada.<br />
            2026 estimates · single · employment income only · general info, not advice.
          </div>
        </>
      )}
    </AbsoluteFill>
  );
};
