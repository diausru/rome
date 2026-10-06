// E2 — "OAS clawback: how the recovery tax works, and 3 legal levers" (pensions group).
// Master timeline = Grady voiceover (e2/vo-beats.json → tools/vo_hf.py → e2-timeline.json).
// Plate: Kitchen.tsx (retirement kitchen, winter morning). Headline type: Fraunces (pensions group).
// Facts: e2/PRODUCTION-BIBLE.md.
import { CalendarClock, Hourglass, PiggyBank, ShieldCheck, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Kitchen } from './Kitchen';
import { Flag } from './RaiseShort';
import TL from './e2-timeline.json';

export const E2FPS = 24, E2DUR = 1428;
const TAU = Math.PI * 2;
const C = { cream: '#f8f1e6', gold: '#ffd166', amber: '#f4a259', mint: '#cdeedd', red: '#ff8a65', green: '#5fe39a' };
const SERIF = 'Fraunces, Georgia, serif', SANS = 'Mont';
const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const sstep = (t: number) => { t = clamp(t); return t * t * t * (t * (t * 6 - 15) + 10); };
const ease = (f: number, a: number, b: number) => sstep((f - a) / (b - a));
const spring = (f: number, a: number, dur = 14) => { const t = clamp((f - a) / dur); return t >= 1 ? 1 : 1 - Math.exp(-6 * t) * Math.cos(7.5 * t); };
const money = (n: number) => '$' + Math.round(n).toLocaleString('en-US');

const B: Record<string, { s: number; e: number }> = Object.fromEntries(TL.beats.map((b) => [b.id, { s: Math.round(b.start * E2FPS), e: Math.round(b.end * E2FPS) }]));
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
  { at: B.hook.s, l1: 'Retired, over $95K?', l2: 'Part of your OAS goes back.', until: B.loop.s - 2 },
  { at: B.loop.s, l1: 'But there are', l2: 'legal ways to keep more.', until: B.rule.s - 2 },
  { at: B.rule.s, l1: 'The recovery tax', l2: '15¢ per $1 above the line', until: B.example.s - 2 },
  { at: B.example.s, l1: 'Example: $110,000', l2: 'net income in 2026', until: B.timing.s - 2 },
  { at: B.timing.s, l1: 'When it hits', l2: 'your OAS from July 2027', until: B.split.s - 2 },
  { at: B.split.s, l1: 'Lever 1', l2: 'pension splitting at 65+', until: B.tfsa.s - 2 },
  { at: B.tfsa.s, l1: 'Lever 2', l2: 'TFSA withdrawals', until: B.delay.s - 2 },
  { at: B.delay.s, l1: 'Lever 3', l2: 'delay OAS, up to 70', until: B.payoff.s - 2 },
  { at: B.payoff.s, l1: 'Plan for the line.', l2: 'Not the panic.', until: E2DUR + 10 },
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


const LINE = 95323, MAXI = 160000, X0 = 110, BW = 860;
const px = (v: number) => X0 + (v / MAXI) * BW;
// board phase A: the income bar against the 2026 line
const Bar = ({ f }: { f: number }) => {
  const show = ease(f, B.hook.s + 30, B.hook.s + 44) * (1 - ease(f, B.split.s - 10, B.split.s));
  if (show <= 0) return null;
  const Y = 930;
  const inc = 60000 + 50000 * ease(f, B.example.s + 4, at('example', 0.3));
  const over = ease(f, at('example', 0.35), at('example', 0.5));
  const rec = ease(f, at('example', 0.72), at('example', 0.88));
  return (
    <div style={{ opacity: show }}>
      <div style={{ position: 'absolute', left: 80, top: Y - 70, width: 920, height: 420, borderRadius: 36, ...glass }} />
      <div style={{ position: 'absolute', left: X0, top: Y - 44, fontFamily: SANS, fontSize: 23, fontWeight: 800, letterSpacing: 3, color: C.mint }}>NET INCOME · 2026 TAX YEAR</div>
      <div style={{ position: 'absolute', left: X0, top: Y + 40, width: BW, height: 64, borderRadius: 18, background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.15)' }} />
      <div style={{ position: 'absolute', left: X0, top: Y + 40, width: px(Math.min(inc, LINE)) - X0, height: 64, borderRadius: '18px 0 0 18px', background: 'linear-gradient(180deg,#7fe9b0,#27AE60)' }} />
      {inc > LINE && <div style={{ position: 'absolute', left: px(LINE), top: Y + 40, width: px(inc) - px(LINE), height: 64, background: 'linear-gradient(180deg,#ffb38f,#d84315)', boxShadow: over ? `0 0 ${30 * over}px rgba(255,120,80,.6)` : 'none' }} />}
      <div style={{ position: 'absolute', left: px(LINE) - 2, top: Y + 14, width: 4, height: 116, background: C.gold, boxShadow: '0 0 18px rgba(255,209,102,.8)' }} />
      <div style={{ position: 'absolute', left: px(LINE) - 160, top: Y + 140, width: 320, textAlign: 'center', fontFamily: SANS, fontSize: 30, fontWeight: 900, ...goldInk }}>$95,323</div>
      <div style={{ position: 'absolute', left: px(LINE) - 160, top: Y + 182, width: 320, textAlign: 'center', fontFamily: SANS, fontSize: 21, fontWeight: 700, color: C.cream, opacity: 0.85 }}>the 2026 line</div>
      <div style={{ position: 'absolute', left: X0, top: Y + 4, fontFamily: SANS, fontSize: 28, fontWeight: 900, color: C.cream, fontVariantNumeric: 'tabular-nums', textShadow: ink, opacity: ease(f, B.example.s, B.example.s + 8) }}>{money(inc)}</div>
      <div style={{ position: 'absolute', left: X0, top: Y + 236, fontFamily: SANS, fontSize: 34, fontWeight: 900, color: C.red, textShadow: ink, opacity: over }}>{money(14677 * over)} over the line</div>
      <div style={{ position: 'absolute', left: X0, top: Y + 286, fontFamily: SANS, fontSize: 34, fontWeight: 900, color: C.cream, textShadow: ink, opacity: rec }}>× 15% = <span style={goldInk}>{'$' + (2201.55 * rec).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span> of OAS repaid</div>
    </div>
  );
};

// board phase B: the three levers
const LEVERS: { id: string; I: LucideIcon; name: string; chip: string }[] = [
  { id: 'split', I: Users, name: 'Pension splitting', chip: 'Up to 50% of eligible pension income · 65+' },
  { id: 'tfsa', I: PiggyBank, name: 'TFSA withdrawals', chip: 'Not income · no effect on OAS' },
  { id: 'delay', I: Hourglass, name: 'Delay OAS', chip: '+0.6% a month · up to +36% at 70' },
];
const Y0 = 1000, RH = 120, GAP = 14;
const Levers = ({ f }: { f: number }) => {
  const show = ease(f, B.split.s - 4, B.split.s + 8) * (1 - ease(f, B.payoff.s - 8, B.payoff.s + 6));
  if (show <= 0) return null;
  const active = f < B.tfsa.s ? 'split' : f < B.delay.s ? 'tfsa' : 'delay';
  return (
    <div style={{ opacity: show }}>
      <div style={{ position: 'absolute', left: 82, top: Y0 - 42, fontFamily: SANS, fontSize: 23, fontWeight: 800, letterSpacing: 3, color: C.mint }}>3 LEGAL LEVERS</div>
      {LEVERS.map((o, i) => {
        const e = spring(f, B[o.id].s, 14), on = active === o.id;
        return (
          <div key={o.id} style={{ position: 'absolute', left: 80, top: Y0 + i * (RH + GAP), width: 860, height: RH, borderRadius: 28, ...glass, opacity: clamp(e * 1.4), transform: `translateX(${(1 - e) * -70}px) scale(${on ? 1.02 : 1})`, border: on ? '2px solid rgba(255,209,102,.9)' : glass.border, boxShadow: `${glass.boxShadow}${on ? ', 0 0 34px rgba(255,200,90,.45)' : ''}` }}>
            <div style={{ position: 'absolute', left: 22, top: 18, width: 84, height: 84, borderRadius: 24, display: 'grid', placeItems: 'center', background: 'linear-gradient(150deg,#5fe39a,#27AE60 50%,#146b3a)', boxShadow: 'inset 0 2px 1px rgba(255,255,255,.6), 0 12px 24px rgba(0,0,0,.4)' }}><o.I size={44} color="#fff" strokeWidth={2.3} /></div>
            <div style={{ position: 'absolute', left: 130, top: 16, fontFamily: SERIF, fontSize: 40, fontWeight: 800, color: C.cream, textShadow: ink }}>{o.name}</div>
            <div style={{ position: 'absolute', left: 132, top: 72, display: 'flex', alignItems: 'center', gap: 8, fontFamily: SANS, fontSize: 24, fontWeight: 800, color: C.green }}><ShieldCheck size={24} color={C.green} />{o.chip}</div>
          </div>
        );
      })}
      <div style={{ position: 'absolute', left: 82, top: Y0 + 3 * (RH + GAP) + 4, width: 860, fontFamily: SANS, fontSize: 20, fontWeight: 600, color: C.cream, opacity: 0.72 }}>Splitting needs a joint election (T1032) and moves income to your spouse. You can't get GIS while you delay OAS.</div>
    </div>
  );
};

export const E2Short = () => {
  const f = useCurrentFrame();
  const T = f / E2DUR;
  const end = spring(f, B.payoff.s + 2, 18);
  return (
    <AbsoluteFill style={{ background: '#10131a', fontFamily: SANS, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', left: 0, top: 0, width: 540, height: 960, transform: 'scale(2)', transformOrigin: '0 0' }}>
        <Kitchen f={f} T={T} w={540} h={960} blur={8} />
      </div>
      <AbsoluteFill style={{ background: 'rgba(14,16,22,.5)' }} />
      <AbsoluteFill style={{ background: 'linear-gradient(180deg, rgba(10,12,18,.8) 0%, rgba(10,12,18,0) 24%, rgba(10,12,18,0) 60%, rgba(10,12,18,.85) 100%)' }} />

      <div style={{ position: 'absolute', left: 80, top: 92, right: 80, display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: C.cream, fontSize: 24, fontWeight: 800, letterSpacing: 3 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}><Flag f={f} w={84} />TAX SECRETS CANADA</div>
        <div style={{ padding: '8px 18px', borderRadius: 999, ...glass, fontSize: 22 }}>OAS CLAWBACK</div>
      </div>

      <Typed f={f} />

      {/* hook + loop: the line */}
      <Hero a={B.hook.s} b={B.rule.s} h={440}>
        <div style={{ position: 'absolute', left: 52, top: 44, display: 'flex', gap: 14 }}><Tag>THE LINE · 2026 INCOME</Tag></div>
        <div style={{ position: 'absolute', left: 46, top: 104, fontSize: 150, fontWeight: 900, letterSpacing: -5, fontVariantNumeric: 'tabular-nums', ...goldInk }}>{money(95323 * ease(f, B.hook.s + 4, at('hook', 0.5)))}</div>
        <div style={{ position: 'absolute', left: 54, top: 276, fontSize: 36, fontWeight: 800, color: C.cream, textShadow: ink }}>net income before OAS starts going back</div>
        <div style={{ position: 'absolute', left: 54, top: 340, width: 820, fontSize: 34, fontWeight: 800, color: C.green, opacity: ease(f, B.loop.s, B.loop.s + 12), textShadow: ink }}>…and there are legal ways to keep more.</div>
      </Hero>

      {/* the rule */}
      <Hero a={B.rule.s} b={B.example.s} h={420}>
        <div style={{ position: 'absolute', left: 52, top: 44 }}><Tag tone="red">OAS RECOVERY TAX</Tag></div>
        <div style={{ position: 'absolute', left: 46, top: 96, display: 'flex', alignItems: 'baseline', gap: 26 }}>
          <div style={{ fontSize: 170, fontWeight: 900, letterSpacing: -6, ...goldInk }}>15¢</div>
          <div style={{ fontFamily: SERIF, fontSize: 48, fontWeight: 800, color: C.cream, lineHeight: 1.1, textShadow: ink }}>of OAS<br />per $1</div>
        </div>
        <div style={{ position: 'absolute', left: 54, top: 320, fontSize: 34, fontWeight: 800, color: C.mint, opacity: ease(f, at('rule', 0.55), at('rule', 0.55) + 10) }}>of net income above the line</div>
      </Hero>

      {/* example: the bar carries the math; hero holds the label */}
      <Hero a={B.example.s} b={B.timing.s} h={300}>
        <div style={{ position: 'absolute', left: 52, top: 44, display: 'flex', gap: 14 }}><Tag>EXAMPLE</Tag><Tag tone="green">SINGLE SENIOR · 2026</Tag></div>
        <div style={{ position: 'absolute', left: 52, top: 112, fontFamily: SERIF, fontSize: 60, fontWeight: 800, lineHeight: 1.08, color: C.cream, textShadow: ink }}>Net income<br /><span style={goldInk}>$110,000</span></div>
      </Hero>

      {/* timing */}
      <Hero a={B.timing.s} b={B.split.s} h={300}>
        <div style={{ position: 'absolute', left: 52, top: 44 }}><Tag>WHEN IT'S TAKEN</Tag></div>
        <div style={{ position: 'absolute', left: 52, top: 106, display: 'flex', alignItems: 'center', gap: 24 }}>
          <CalendarClock size={96} color={C.gold} strokeWidth={1.8} />
          <div style={{ fontFamily: SERIF, fontSize: 60, fontWeight: 800, lineHeight: 1.05, ...goldInk }}>Jul 2027 →<br />Jun 2028</div>
        </div>
        <div style={{ position: 'absolute', left: 54, top: 240, fontSize: 28, fontWeight: 700, color: C.mint }}>withheld from your monthly OAS payments</div>
      </Hero>

      {/* levers */}
      <Hero a={B.split.s} b={B.tfsa.s} h={300}>
        <div style={{ position: 'absolute', left: 52, top: 44 }}><Tag tone="green">LEVER 1 · PENSION SPLITTING</Tag></div>
        <div style={{ position: 'absolute', left: 46, top: 96, fontSize: 120, fontWeight: 900, letterSpacing: -4, ...goldInk }}>up to 50%</div>
        <div style={{ position: 'absolute', left: 54, top: 236, fontSize: 28, fontWeight: 700, color: C.mint }}>of RRIF / annuity income to your spouse, at 65+</div>
      </Hero>
      <Hero a={B.tfsa.s} b={B.delay.s} h={300}>
        <div style={{ position: 'absolute', left: 52, top: 44 }}><Tag tone="green">LEVER 2 · TFSA</Tag></div>
        <div style={{ position: 'absolute', left: 52, top: 112, fontFamily: SERIF, fontSize: 58, fontWeight: 800, lineHeight: 1.08, color: C.cream, textShadow: ink }}>Withdrawals aren't<br /><span style={goldInk}>income</span></div>
      </Hero>
      <Hero a={B.delay.s} b={B.payoff.s} h={300}>
        <div style={{ position: 'absolute', left: 52, top: 44 }}><Tag tone="green">LEVER 3 · DELAY OAS</Tag></div>
        <div style={{ position: 'absolute', left: 46, top: 96, fontSize: 120, fontWeight: 900, letterSpacing: -4, ...goldInk }}>+0.6%<span style={{ fontSize: 56 }}> /month</span></div>
        <div style={{ position: 'absolute', left: 54, top: 236, fontSize: 28, fontWeight: 700, color: C.mint }}>for each month you wait, up to +36% at 70</div>
      </Hero>

      <Bar f={f} />
      <Levers f={f} />

      {/* payoff */}
      {f >= B.payoff.s && (
        <div style={{ position: 'absolute', left: 80, top: 380, width: 920, opacity: clamp(end * 1.4), transform: `translateY(${(1 - end) * 60}px)` }}>
          <Flag f={f} w={200} amp={0.06} />
          <div style={{ marginTop: 30, fontSize: 96, fontWeight: 900, letterSpacing: -3, lineHeight: 1, ...goldInk }}>$95,323</div>
          <div style={{ marginTop: 16, fontFamily: SERIF, fontSize: 52, fontWeight: 800, color: C.cream, lineHeight: 1.1, textShadow: ink }}>Plan for the line,<br />not the panic.</div>
          <div style={{ marginTop: 20, fontSize: 32, fontWeight: 700, color: C.mint }}>The right lever depends on your whole picture.</div>
          <div style={{ marginTop: 44, display: 'inline-flex', padding: '22px 34px', borderRadius: 999, background: 'linear-gradient(160deg,#ffefb0,#f2c14e 50%,#cf961f)', color: '#2e2004', fontSize: 38, fontWeight: 900, boxShadow: 'inset 0 2px 1px rgba(255,255,255,.7), 0 16px 30px rgba(0,0,0,.4)', opacity: ease(f, B.cta.s - 4, B.cta.s + 8), transform: `scale(${1 + 0.03 * Math.sin(TAU * (f - B.cta.s) / 36)})` }}>Follow for the real math</div>
        </div>
      )}
      {f >= B.payoff.s && (
        <div style={{ position: 'absolute', left: 80, top: 1290, width: 860, fontSize: 21, fontWeight: 600, color: C.cream, opacity: 0.75 * ease(f, B.payoff.s + 16, B.payoff.s + 30), lineHeight: 1.45 }}>
          Sources: Service Canada — OAS pension recovery tax; OAS: when to start; CRA — Pension income splitting; What is a TFSA.<br />$110,000 is an example · line = 2026 income, indexed yearly · general info, not advice.
        </div>
      )}
    </AbsoluteFill>
  );
};
