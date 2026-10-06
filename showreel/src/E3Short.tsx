// E3 — "RRSP at 71: the December 31 deadline" (pensions group).
// Master timeline = Grady voiceover (e3/vo-beats.json → tools/vo_hf.py → e3-timeline.json).
// Plate: Home.tsx (retirement living room). Headline type: Fraunces (pensions group); numbers stay in the series face.
// Facts: e3/PRODUCTION-BIBLE.md.
import { Banknote, CalendarClock, CircleX, Landmark, ShieldCheck, Wallet } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Home } from './Home';
import { Flag } from './RaiseShort';
import TL from './e3-timeline.json';

export const E3FPS = 24, E3DUR = 1428;
const TAU = Math.PI * 2;
const C = { cream: '#f8f1e6', gold: '#ffd166', amber: '#f4a259', mint: '#cdeedd', red: '#ff8a65', green: '#5fe39a' };
const SERIF = 'Fraunces, Georgia, serif', SANS = 'Mont';
const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const sstep = (t: number) => { t = clamp(t); return t * t * t * (t * (t * 6 - 15) + 10); };
const ease = (f: number, a: number, b: number) => sstep((f - a) / (b - a));
const spring = (f: number, a: number, dur = 14) => { const t = clamp((f - a) / dur); return t >= 1 ? 1 : 1 - Math.exp(-6 * t) * Math.cos(7.5 * t); };
const money = (n: number) => '$' + Math.round(n).toLocaleString('en-US');

const B: Record<string, { s: number; e: number }> = Object.fromEntries(TL.beats.map((b) => [b.id, { s: Math.round(b.start * E3FPS), e: Math.round(b.end * E3FPS) }]));
const at = (id: string, fr: number) => Math.round(B[id].s + (B[id].e - B[id].s) * fr);

const glass: React.CSSProperties = {
  background: 'linear-gradient(155deg, rgba(255,250,240,.17), rgba(255,245,230,.05) 60%)',
  border: '1.5px solid rgba(255,240,220,.26)', backdropFilter: 'blur(26px) saturate(140%)',
  boxShadow: 'inset 0 1.5px 0 rgba(255,255,255,.38), inset 0 -20px 40px rgba(0,0,0,.12), 0 3px 8px rgba(0,0,0,.28), 0 26px 50px rgba(0,0,0,.38), 0 70px 120px rgba(0,0,0,.32)',
};
const goldInk: React.CSSProperties = { color: C.gold, textShadow: '0 -2px 0 #fff3c4, 0 4px 0 #c08414, 0 8px 0 #87590a, 0 24px 40px rgba(0,0,0,.45)' };
const ink = '0 3px 0 rgba(0,0,0,.25), 0 12px 30px rgba(0,0,0,.5)';
const Tag = ({ children, tone = 'gold' }: { children: React.ReactNode; tone?: 'gold' | 'red' | 'green' }) => (
  <div style={{ display: 'inline-block', padding: '8px 18px', borderRadius: 14, fontFamily: SANS, fontSize: 25, fontWeight: 900, letterSpacing: 3, color: tone === 'gold' ? '#2e2004' : '#fff',
    background: tone === 'gold' ? 'linear-gradient(160deg,#ffefb0,#f2c14e 50%,#cf961f)' : tone === 'red' ? 'linear-gradient(160deg,#ff8a65,#d84315)' : 'linear-gradient(160deg,#5fe39a,#27AE60 50%,#146b3a)', boxShadow: '0 10px 22px rgba(0,0,0,.4)' }}>{children}</div>
);

// typed film-title captions (Fraunces for the line, Mont for the sub-line)
type Cap = { at: number; l1: string; l2?: string; until: number };
const CAPS: Cap[] = [
  { at: B.hook.s, l1: 'Turning 71?', l2: 'Your RRSP has a deadline.', until: B.loop.s - 2 },
  { at: B.loop.s, l1: 'Miss it…', l2: 'and it can hit one tax return.', until: B.cash.s - 2 },
  { at: B.cash.s, l1: 'Option 1: cash out', l2: 'all of it is income that year', until: B.annuity.s - 2 },
  { at: B.annuity.s, l1: 'Option 2: an annuity', l2: 'taxed as payments come in', until: B.rrif.s - 2 },
  { at: B.rrif.s, l1: 'Option 3: a RRIF', l2: 'no tax withheld on the transfer', until: B.minimum.s - 2 },
  { at: B.minimum.s, l1: 'The RRIF minimum', l2: 'starts the year after', until: B.catch.s - 2 },
  { at: B.catch.s, l1: 'The real danger:', l2: 'doing nothing.', until: B.payoff.s - 2 },
  { at: B.payoff.s, l1: 'December 31.', l2: 'Pick your path.', until: E3DUR + 10 },
];
const Typed = ({ f }: { f: number }) => {
  const c = CAPS.find((c) => f >= c.at && f < c.until);
  if (!c) return null;
  const cps = 1.5, n1 = Math.floor((f - c.at) * cps), n2 = Math.floor((f - c.at - c.l1.length / cps - 3) * cps);
  const caret = Math.floor(f / 8) % 2 === 0, t2 = !!c.l2 && n2 >= 0;
  const line = (s: string, n: number, big: boolean, on: boolean) => (
    <div style={{ fontFamily: big ? SERIF : SANS, fontSize: big ? 66 : 42, fontWeight: big ? 800 : 700, letterSpacing: big ? -0.5 : -0.3, color: big ? C.cream : C.mint, minHeight: big ? 76 : 50, whiteSpace: 'nowrap' }}>
      {s.slice(0, clamp(n, 0, s.length))}
      {on && <span style={{ display: 'inline-block', width: big ? 5 : 4, height: big ? 58 : 38, marginLeft: 6, background: C.gold, opacity: caret ? 1 : 0, transform: 'translateY(6px)' }} />}
    </div>
  );
  return <div style={{ position: 'absolute', left: 80, top: 186, opacity: clamp((c.until - f) / 4), textShadow: ink }}>{line(c.l1, n1, true, !t2)}{c.l2 && line(c.l2, n2, false, t2)}</div>;
};

const Hero = ({ a, b, children, h = 470 }: { a: number; b: number; children: React.ReactNode; h?: number }) => {
  const f = useCurrentFrame();
  if (f < a - 2 || f > b + 2) return null;
  const e = spring(f, a, 16), o = 1 - ease(f, b - 9, b);
  return <div style={{ position: 'absolute', left: 80, top: 336, width: 920, height: h, borderRadius: 40, ...glass, transform: `translateY(${(1 - e) * 90 + (1 - o) * 24}px) scale(${1 - (1 - o) * 0.06})`, opacity: clamp(e * 1.4) * o, filter: `blur(${(1 - clamp(e * 1.3)) * 10 + (1 - o) * 6}px)` }}>{children}</div>;
};

// persistent board: the three options and what is withheld now
const OPTS: { id: string; I: LucideIcon; name: string; chip: string; tone: 'red' | 'green' }[] = [
  { id: 'cash', I: Banknote, name: 'Cash out', chip: '30% withheld now*', tone: 'red' },
  { id: 'annuity', I: Landmark, name: 'Buy an annuity', chip: 'No tax withheld on transfer', tone: 'green' },
  { id: 'rrif', I: Wallet, name: 'Move to a RRIF', chip: 'No tax withheld on transfer', tone: 'green' },
];
const Y0 = 880, RH = 132, GAP = 14;
const Board = ({ f }: { f: number }) => {
  const show = ease(f, B.cash.s - 4, B.cash.s + 8) * (1 - ease(f, B.payoff.s - 8, B.payoff.s + 6));
  if (show <= 0) return null;
  const dim = 1 - 0.4 * ease(f, B.catch.s, B.catch.s + 12);
  const active = f < B.annuity.s ? 'cash' : f < B.rrif.s ? 'annuity' : f < B.catch.s ? 'rrif' : '';
  const nothing = ease(f, at('catch', 0.15), at('catch', 0.15) + 12);
  return (
    <div style={{ opacity: show }}>
      <div style={{ position: 'absolute', left: 82, top: Y0 - 42, fontFamily: SANS, fontSize: 23, fontWeight: 800, letterSpacing: 3, color: C.mint }}>BY DEC 31 OF THE YEAR YOU TURN 71</div>
      {OPTS.map((o, i) => {
        const e = spring(f, B[o.id].s, 14), on = active === o.id;
        return (
          <div key={o.id} style={{ position: 'absolute', left: 80, top: Y0 + i * (RH + GAP), width: 860, height: RH, borderRadius: 28, ...glass, opacity: clamp(e * 1.4) * dim, transform: `translateX(${(1 - e) * -70}px) scale(${on ? 1.02 : 1})`, border: on ? '2px solid rgba(255,209,102,.9)' : glass.border, boxShadow: `${glass.boxShadow}${on ? ', 0 0 34px rgba(255,200,90,.45)' : ''}` }}>
            <div style={{ position: 'absolute', left: 24, top: 22, width: 88, height: 88, borderRadius: 26, display: 'grid', placeItems: 'center', background: o.tone === 'red' ? 'linear-gradient(150deg,#ffb38f,#e0603a 55%,#a3391b)' : 'linear-gradient(150deg,#5fe39a,#27AE60 50%,#146b3a)', boxShadow: 'inset 0 2px 1px rgba(255,255,255,.6), 0 12px 24px rgba(0,0,0,.4)' }}><o.I size={46} color="#fff" strokeWidth={2.3} /></div>
            <div style={{ position: 'absolute', left: 136, top: 22, fontFamily: SERIF, fontSize: 42, fontWeight: 800, color: C.cream, textShadow: ink }}>{o.name}</div>
            <div style={{ position: 'absolute', left: 138, top: 80, display: 'flex', alignItems: 'center', gap: 8, fontFamily: SANS, fontSize: 25, fontWeight: 800, color: o.tone === 'red' ? C.red : C.green }}>
              {o.tone === 'red' ? <CircleX size={26} color={C.red} /> : <ShieldCheck size={26} color={C.green} />}{o.chip}
            </div>
          </div>
        );
      })}
      {nothing > 0 && (
        <div style={{ position: 'absolute', left: 80, top: Y0 + 3 * (RH + GAP), width: 860, height: 96, borderRadius: 26, background: 'linear-gradient(90deg, rgba(216,67,21,.55), rgba(216,67,21,.2))', border: '2px solid rgba(255,138,101,.9)', display: 'flex', alignItems: 'center', gap: 16, padding: '0 26px', opacity: nothing, transform: `scale(${0.9 + 0.1 * spring(f, at('catch', 0.15), 12)})`, fontFamily: SANS, fontSize: 30, fontWeight: 900, color: '#fff', textShadow: ink }}>
          <CircleX size={40} color="#fff" />Do nothing → full value can be taxed as income
        </div>
      )}
      <div style={{ position: 'absolute', left: 82, top: Y0 + 3 * (RH + GAP) + (nothing > 0 ? 108 : 6), width: 860, fontFamily: SANS, fontSize: 20, fontWeight: 600, color: C.cream, opacity: 0.72 }}>*Withholding on a lump sum over $15,000, outside Québec. It isn't the final tax.</div>
    </div>
  );
};

export const E3Short = () => {
  const f = useCurrentFrame();
  const T = f / E3DUR;
  const end = spring(f, B.payoff.s + 2, 18);
  const pct = ease(f, at('minimum', 0.3), at('minimum', 0.5));
  const minAmt = ease(f, at('minimum', 0.5), at('minimum', 0.72));
  return (
    <AbsoluteFill style={{ background: '#140f0a', fontFamily: SANS, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', left: 0, top: 0, width: 540, height: 960, transform: 'scale(2)', transformOrigin: '0 0' }}>
        <Home f={f} T={T} w={540} h={960} blur={8} />
      </div>
      <AbsoluteFill style={{ background: 'rgba(20,14,8,.42)' }} />
      <AbsoluteFill style={{ background: 'linear-gradient(180deg, rgba(14,10,6,.78) 0%, rgba(14,10,6,0) 24%, rgba(14,10,6,0) 64%, rgba(14,10,6,.82) 100%)' }} />

      <div style={{ position: 'absolute', left: 80, top: 92, right: 80, display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: C.cream, fontSize: 24, fontWeight: 800, letterSpacing: 3 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}><Flag f={f} w={84} />TAX SECRETS CANADA</div>
        <div style={{ padding: '8px 18px', borderRadius: 999, ...glass, fontSize: 22 }}>RRSP AT 71</div>
      </div>

      <Typed f={f} />

      {/* hook + loop: the deadline */}
      <Hero a={B.hook.s} b={B.cash.s}>
        <div style={{ position: 'absolute', left: 52, top: 44 }}><Tag>DEADLINE</Tag></div>
        <div style={{ position: 'absolute', left: 52, top: 104, display: 'flex', alignItems: 'center', gap: 26 }}>
          <CalendarClock size={120} color={C.gold} strokeWidth={1.8} />
          <div style={{ fontFamily: SERIF, fontSize: 150, fontWeight: 800, letterSpacing: -3, lineHeight: 1, ...goldInk }}>Dec 31</div>
        </div>
        <div style={{ position: 'absolute', left: 54, top: 280, fontSize: 38, fontWeight: 800, color: C.cream, textShadow: ink }}>of the year you turn 71</div>
        <div style={{ position: 'absolute', left: 54, top: 350, width: 820, fontSize: 32, fontWeight: 700, color: C.red, opacity: ease(f, B.loop.s, B.loop.s + 12), textShadow: ink }}>Miss it, and the whole account can hit one tax return.</div>
      </Hero>

      {/* option 1: cash out (example $300,000) */}
      <Hero a={B.cash.s} b={B.annuity.s} h={420}>
        <div style={{ position: 'absolute', left: 52, top: 40, display: 'flex', gap: 14 }}><Tag tone="red">OPTION 1 · CASH OUT</Tag><Tag>EXAMPLE</Tag></div>
        <div style={{ position: 'absolute', left: 46, top: 104, fontSize: 140, fontWeight: 900, letterSpacing: -5, fontVariantNumeric: 'tabular-nums', ...goldInk }}>{money(300000 * ease(f, B.cash.s + 6, at('cash', 0.45)))}</div>
        <div style={{ position: 'absolute', left: 52, top: 262, fontSize: 34, fontWeight: 800, color: C.cream, textShadow: ink }}>all income in that one year</div>
        <div style={{ position: 'absolute', left: 52, top: 322, fontSize: 46, fontWeight: 900, color: C.red, textShadow: ink, opacity: ease(f, at('cash', 0.72), at('cash', 0.72) + 10), transform: `translateX(${(1 - ease(f, at('cash', 0.72), at('cash', 0.72) + 10)) * -30}px)` }}>−$90,000 withheld (30%)</div>
      </Hero>

      {/* option 2 */}
      <Hero a={B.annuity.s} b={B.rrif.s} h={300}>
        <div style={{ position: 'absolute', left: 52, top: 40 }}><Tag tone="green">OPTION 2 · ANNUITY</Tag></div>
        <div style={{ position: 'absolute', left: 52, top: 110, fontFamily: SERIF, fontSize: 56, fontWeight: 800, lineHeight: 1.08, color: C.cream, textShadow: ink }}>No tax withheld<br />on the transfer</div>
        <div style={{ position: 'absolute', left: 54, top: 236, fontSize: 30, fontWeight: 700, color: C.mint, opacity: ease(f, at('annuity', 0.55), at('annuity', 0.55) + 10) }}>Taxed as the payments come in</div>
      </Hero>

      {/* option 3 */}
      <Hero a={B.rrif.s} b={B.minimum.s} h={300}>
        <div style={{ position: 'absolute', left: 52, top: 40 }}><Tag tone="green">OPTION 3 · RRIF</Tag></div>
        <div style={{ position: 'absolute', left: 52, top: 110, fontFamily: SERIF, fontSize: 56, fontWeight: 800, lineHeight: 1.08, color: C.cream, textShadow: ink }}>No tax withheld on<br />a direct transfer</div>
      </Hero>

      {/* RRIF minimum at 72 */}
      <Hero a={B.minimum.s} b={B.catch.s} h={440}>
        <div style={{ position: 'absolute', left: 52, top: 40, display: 'flex', gap: 14 }}><Tag>RRIF MINIMUM · AGE 72</Tag><Tag>EXAMPLE</Tag></div>
        <div style={{ position: 'absolute', left: 46, top: 100, fontSize: 150, fontWeight: 900, letterSpacing: -5, opacity: pct, ...goldInk }}>5.40%</div>
        <div style={{ position: 'absolute', left: 52, top: 270, fontSize: 46, fontWeight: 900, color: C.cream, textShadow: ink, opacity: minAmt }}>× $300,000 = <span style={goldInk}>{money(16200 * minAmt)}</span></div>
        <div style={{ position: 'absolute', left: 54, top: 350, width: 820, fontSize: 28, fontWeight: 700, color: C.mint, opacity: ease(f, at('minimum', 0.78), at('minimum', 0.78) + 10) }}>No tax withheld on the minimum · still taxable income</div>
      </Hero>

      {/* catch */}
      <Hero a={B.catch.s} b={B.payoff.s} h={300}>
        <div style={{ position: 'absolute', left: 52, top: 40 }}><Tag tone="red">THE REAL DANGER</Tag></div>
        <div style={{ position: 'absolute', left: 52, top: 110, fontFamily: SERIF, fontSize: 54, fontWeight: 800, lineHeight: 1.1, color: C.cream, textShadow: ink }}>Miss Dec 31 and it<br /><span style={{ color: C.red }}>stops being an RRSP</span></div>
      </Hero>

      <Board f={f} />

      {/* payoff */}
      {f >= B.payoff.s && (
        <div style={{ position: 'absolute', left: 80, top: 380, width: 920, opacity: clamp(end * 1.4), transform: `translateY(${(1 - end) * 60}px)` }}>
          <Flag f={f} w={200} amp={0.06} />
          <div style={{ marginTop: 30, fontFamily: SERIF, fontSize: 92, fontWeight: 800, lineHeight: 1, ...goldInk }}>Dec 31</div>
          <div style={{ marginTop: 16, fontFamily: SERIF, fontSize: 52, fontWeight: 800, color: C.cream, lineHeight: 1.1, textShadow: ink }}>Pick your path:<br />cash, annuity or RRIF.</div>
          <div style={{ marginTop: 20, fontSize: 32, fontWeight: 700, color: C.mint }}>Talk to your plan issuer and a pro.</div>
          <div style={{ marginTop: 44, display: 'inline-flex', padding: '22px 34px', borderRadius: 999, background: 'linear-gradient(160deg,#ffefb0,#f2c14e 50%,#cf961f)', color: '#2e2004', fontSize: 38, fontWeight: 900, boxShadow: 'inset 0 2px 1px rgba(255,255,255,.7), 0 16px 30px rgba(0,0,0,.4)', opacity: ease(f, B.cta.s - 4, B.cta.s + 8), transform: `scale(${1 + 0.03 * Math.sin(TAU * (f - B.cta.s) / 36)})` }}>Follow for the real math</div>
        </div>
      )}
      {f >= B.payoff.s && (
        <div style={{ position: 'absolute', left: 80, top: 1290, width: 860, fontSize: 21, fontWeight: 600, color: C.cream, opacity: 0.75 * ease(f, B.payoff.s + 16, B.payoff.s + 30), lineHeight: 1.45 }}>
          Sources: CRA — RRSP options when you turn 71; Minimum amount from a RRIF (prescribed factors); Tax rates on withdrawals.<br />$300,000 is an example · withholding shown is outside Québec · general info, not advice.
        </div>
      )}
    </AbsoluteFill>
  );
};
