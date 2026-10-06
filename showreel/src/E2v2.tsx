// E2 v2 — the improved series look (user, 2026-10-06): photoreal plate animated in code, light blur,
// minimalist foreground: one idea per card, one hero number, a gold hairline, a light sweep across the glass.
// Same facts, VO and master timeline as E2Short (e2/PRODUCTION-BIBLE.md, e2-timeline.json).
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { PhotoPlate, type Focus } from './Plate';
import { Flag } from './RaiseShort';
import TL from './e2-timeline.json';

export const E2V2FPS = 24, E2V2DUR = 1428;
const TAU = Math.PI * 2;
const C = { cream: '#f7f1e6', gold: '#f1c75b', soft: 'rgba(247,241,230,.84)', red: '#ff8f6b', green: '#7fe0a8' };
const SERIF = 'Fraunces, Georgia, serif', SANS = 'Mont';
const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const sstep = (t: number) => { t = clamp(t); return t * t * t * (t * (t * 6 - 15) + 10); };
const ease = (f: number, a: number, b: number) => sstep((f - a) / (b - a));
const money = (n: number) => '$' + Math.round(n).toLocaleString('en-US');

const B: Record<string, { s: number; e: number }> = Object.fromEntries(TL.beats.map((b) => [b.id, { s: Math.round(b.start * E2V2FPS), e: Math.round(b.end * E2V2FPS) }]));
const at = (id: string, fr: number) => Math.round(B[id].s + (B[id].e - B[id].s) * fr);

// camera looks at what the narration is about: the couple, the letter in their hands, then wider for the levers
const KEYS: Focus[] = [
  { f: 0, u: 0.44, v: 0.30, k: 1.20 },
  { f: B.rule.s, u: 0.55, v: 0.38, k: 1.10 },
  { f: B.example.s, u: 0.62, v: 0.38, k: 1.24 },
  { f: B.timing.s, u: 0.45, v: 0.30, k: 1.14 },
  { f: B.split.s, u: 0.50, v: 0.40, k: 1.06 },
  { f: B.payoff.s, u: 0.50, v: 0.48, k: 1.00 },
];

const goldText: React.CSSProperties = { background: 'linear-gradient(180deg,#fff1c2 0%,#f1c75b 45%,#c88f1f 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', filter: 'drop-shadow(0 6px 18px rgba(0,0,0,.45))' };
const shade = '0 2px 14px rgba(0,0,0,.55)';

// typed film-title captions, top of frame
type Cap = { at: number; l1: string; l2?: string; until: number };
const CAPS: Cap[] = [
  { at: B.hook.s, l1: 'Retired, over $95K?', l2: 'Part of your OAS goes back.', until: B.loop.s - 2 },
  { at: B.loop.s, l1: 'But there are', l2: 'legal ways to keep more.', until: B.rule.s - 2 },
  { at: B.rule.s, l1: 'The recovery tax', l2: 'a.k.a. the OAS clawback', until: B.example.s - 2 },
  { at: B.example.s, l1: 'One example', l2: 'a single senior, 2026', until: B.timing.s - 2 },
  { at: B.timing.s, l1: 'When it hits', l2: 'a year and a half later', until: B.split.s - 2 },
  { at: B.split.s, l1: 'Lever 1', l2: 'pension splitting', until: B.tfsa.s - 2 },
  { at: B.tfsa.s, l1: 'Lever 2', l2: 'TFSA withdrawals', until: B.delay.s - 2 },
  { at: B.delay.s, l1: 'Lever 3', l2: 'delay OAS', until: B.payoff.s - 2 },
];
const Typed = ({ f }: { f: number }) => {
  const c = CAPS.find((c) => f >= c.at && f < c.until);
  if (!c) return null;
  const cps = 1.6, n1 = Math.floor((f - c.at) * cps), n2 = Math.floor((f - c.at - c.l1.length / cps - 3) * cps);
  const caret = Math.floor(f / 8) % 2 === 0, t2 = !!c.l2 && n2 >= 0;
  const line = (s: string, n: number, big: boolean, on: boolean) => (
    <div style={{ fontFamily: big ? SERIF : SANS, fontSize: big ? 64 : 38, fontWeight: big ? 800 : 600, letterSpacing: big ? -0.5 : 0.2, color: big ? C.cream : C.soft, minHeight: big ? 74 : 46, whiteSpace: 'nowrap' }}>
      {s.slice(0, clamp(n, 0, s.length))}
      {on && <span style={{ display: 'inline-block', width: 4, height: big ? 54 : 34, marginLeft: 6, background: C.gold, opacity: caret ? 1 : 0, transform: 'translateY(6px)' }} />}
    </div>
  );
  return <div style={{ position: 'absolute', left: 80, top: 176, opacity: clamp((c.until - f) / 4), textShadow: shade }}>{line(c.l1, n1, true, !t2)}{c.l2 && line(c.l2, n2, false, t2)}</div>;
};

// the card: smoked glass, hairline border, light sweep on entry, gold hairline under the hero number
const CARD_TOP = 1150;
const Card = ({ f, a, b, label, tone = 'gold', children, h = 380 }: { f: number; a: number; b: number; label: string; tone?: 'gold' | 'red' | 'green'; children: React.ReactNode; h?: number }) => {
  if (f < a - 1 || f > b + 1) return null;
  const e = ease(f, a, a + 14), o = 1 - ease(f, b - 8, b);
  const sweep = clamp((f - a - 4) / 22);
  const col = tone === 'gold' ? C.gold : tone === 'red' ? C.red : C.green;
  return (
    <div style={{ position: 'absolute', left: 80, top: CARD_TOP + (1 - e) * 60, width: 920, height: h, borderRadius: 36, overflow: 'hidden', opacity: e * o, transform: `scale(${1 - (1 - o) * 0.04})`,
      background: 'linear-gradient(160deg, rgba(28,22,16,.62), rgba(18,14,10,.42))', backdropFilter: 'blur(16px) saturate(130%)', border: '1px solid rgba(255,236,200,.22)',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,.22), 0 30px 70px rgba(0,0,0,.45)' }}>
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(105deg, rgba(255,255,255,0) ${sweep * 140 - 40}%, rgba(255,246,220,.16) ${sweep * 140 - 25}%, rgba(255,255,255,0) ${sweep * 140 - 10}%)` }} />
      <div style={{ position: 'absolute', left: 56, top: 48, display: 'flex', alignItems: 'center', gap: 16, fontFamily: SANS, fontSize: 21, fontWeight: 800, letterSpacing: 5, color: col }}>
        <div style={{ width: 34 * ease(f, a + 4, a + 16), height: 2, background: col }} />{label}
      </div>
      {children}
    </div>
  );
};
// a number that rises out of a mask, with a gold hairline drawn underneath
const Hero = ({ f, a, children, top = 96, size = 150, line = true }: { f: number; a: number; children: React.ReactNode; top?: number; size?: number; line?: boolean }) => {
  const e = ease(f, a, a + 12);
  return (
    <div style={{ position: 'absolute', left: 52, top }}>
      <div style={{ overflow: 'hidden', height: size * 1.12, paddingRight: 20 }}>
        <div style={{ fontFamily: SANS, fontSize: size, fontWeight: 900, letterSpacing: -size * 0.03, lineHeight: 1.1, fontVariantNumeric: 'tabular-nums', transform: `translateY(${(1 - e) * 100}%)`, ...goldText }}>{children}</div>
      </div>
      {line && <div style={{ marginTop: 6, marginLeft: 4, width: 300 * ease(f, a + 8, a + 26), height: 2, background: 'linear-gradient(90deg,#f1c75b,rgba(241,199,91,0))' }} />}
    </div>
  );
};
const Line = ({ f, a, top, children, color = C.cream, size = 36, serif = false }: { f: number; a: number; top: number; children: React.ReactNode; color?: string; size?: number; serif?: boolean }) => (
  <div style={{ position: 'absolute', left: 56, right: 56, top, fontFamily: serif ? SERIF : SANS, fontSize: size, fontWeight: serif ? 700 : 600, color, lineHeight: 1.25, opacity: ease(f, a, a + 10), transform: `translateY(${(1 - ease(f, a, a + 10)) * 14}px)` }}>{children}</div>
);

// persistent data strip: the 2026 line, then each lever ticks on as it is explained
const Strip = ({ f }: { f: number }) => {
  const show = ease(f, B.loop.s, B.loop.s + 12) * (1 - ease(f, B.payoff.s - 6, B.payoff.s + 6));
  if (show <= 0) return null;
  const levers = [['split', 'Splitting'], ['tfsa', 'TFSA'], ['delay', 'Delay']] as const;
  const pill: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: 10, padding: '12px 20px', borderRadius: 999, background: 'rgba(16,12,8,.5)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,236,200,.2)', fontFamily: SANS, fontSize: 22, fontWeight: 800, letterSpacing: 1, color: C.cream };
  return (
    <div style={{ position: 'absolute', left: 80, top: 1064, display: 'flex', gap: 12, opacity: show }}>
      <div style={pill}><span style={{ color: C.soft, fontWeight: 600 }}>2026 line</span><span style={{ color: C.gold }}>$95,323</span></div>
      {levers.map(([id, name]) => {
        const on = ease(f, B[id].s, B[id].s + 10);
        return on > 0 ? <div key={id} style={{ ...pill, opacity: on, transform: `scale(${0.9 + 0.1 * on})` }}><span style={{ color: C.green }}>✓</span>{name}</div> : null;
      })}
    </div>
  );
};

export const E2v2 = () => {
  const f = useCurrentFrame();
  const end = ease(f, B.payoff.s + 2, B.payoff.s + 20);
  const over = ease(f, at('example', 0.35), at('example', 0.5)), rec = ease(f, at('example', 0.72), at('example', 0.84));
  const LINE = 95323, MAXI = 130000, BW = 808, px = (v: number) => (v / MAXI) * BW;
  return (
    <AbsoluteFill style={{ background: '#0d0b09', fontFamily: SANS, overflow: 'hidden' }}>
      <PhotoPlate f={f} src="plates/e2-b-4k.jpg" iw={2294} ih={4096} keys={KEYS} blur={0.8}
        snow={[{ u0: 0.66, v0: 0.01, u1: 0.99, v1: 0.27 }, { u0: 0.38, v0: 0.0, u1: 0.6, v1: 0.17 }]} steam={{ u: 0.76, v: 0.55, w: 0.08 }} />
      <AbsoluteFill style={{ background: 'linear-gradient(180deg, rgba(8,6,4,.82) 0%, rgba(8,6,4,.55) 14%, rgba(8,6,4,0) 28%, rgba(8,6,4,0) 50%, rgba(8,6,4,.55) 66%, rgba(8,6,4,.8) 100%)' }} />

      <div style={{ position: 'absolute', left: 80, top: 92, right: 80, display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: C.cream, fontSize: 22, fontWeight: 800, letterSpacing: 4 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}><Flag f={f} w={72} />TAX SECRETS CANADA</div>
        <div style={{ color: C.gold, letterSpacing: 5 }}>OAS · 2026</div>
      </div>

      <Typed f={f} />
      <Strip f={f} />

      <Card f={f} a={B.hook.s} b={B.rule.s} label="THE LINE · 2026 INCOME">
        <Hero f={f} a={B.hook.s + 6}>{money(95323)}</Hero>
        <Line f={f} a={at('hook', 0.55)} top={286} color={C.soft}>Above it, part of your OAS goes back.</Line>
      </Card>
      <Card f={f} a={B.rule.s} b={B.example.s} label="OAS RECOVERY TAX" tone="red">
        <Hero f={f} a={B.rule.s + 6}>15¢</Hero>
        <Line f={f} a={at('rule', 0.45)} top={286} color={C.soft}>for every $1 of net income above the line</Line>
      </Card>
      <Card f={f} a={B.example.s} b={B.timing.s} label="EXAMPLE · NET INCOME">
        <div style={{ position: 'absolute', left: 56, top: 112, width: BW, height: 14, borderRadius: 7, background: 'rgba(255,255,255,.12)' }} />
        <div style={{ position: 'absolute', left: 56, top: 112, width: px(Math.min(LINE, 60000 + 50000 * ease(f, B.example.s + 4, at('example', 0.3)))), height: 14, borderRadius: '7px 0 0 7px', background: 'linear-gradient(90deg,#3f8f63,#7fe0a8)' }} />
        <div style={{ position: 'absolute', left: 56 + px(LINE), top: 112, width: (px(110000) - px(LINE)) * over, height: 14, borderRadius: '0 7px 7px 0', background: 'linear-gradient(90deg,#ff8f6b,#d84315)' }} />
        <div style={{ position: 'absolute', left: 56 + px(60000 + 50000 * ease(f, B.example.s + 4, at('example', 0.3))) - 80, top: 72, width: 160, textAlign: 'center', fontSize: 22, fontWeight: 800, color: C.cream, opacity: ease(f, B.example.s + 4, B.example.s + 12) }}>{money(60000 + 50000 * ease(f, B.example.s + 4, at('example', 0.3)))}</div>
        <div style={{ position: 'absolute', left: 56 + px(LINE) - 1, top: 96, width: 2, height: 46, background: C.gold }} />
        <div style={{ position: 'absolute', left: 56 + px(LINE) - 120, top: 150, width: 240, textAlign: 'center', fontSize: 20, fontWeight: 700, color: C.gold, letterSpacing: 1 }}>line $95,323</div>
        <Line f={f} a={at('example', 0.35)} top={196} color={C.red} size={34}>{money(14677 * over)} over the line × 15%</Line>
        {rec > 0 && <Hero f={f} a={at('example', 0.72)} top={244} size={96} line={false}>$2,201.55</Hero>}
        <Line f={f} a={at('example', 0.8)} top={342} color={C.soft} size={24}>of OAS repaid</Line>
      </Card>
      <Card f={f} a={B.timing.s} b={B.split.s} label="WHEN IT'S TAKEN">
        <Hero f={f} a={B.timing.s + 6} size={110}>Jul 2027</Hero>
        <Line f={f} a={at('timing', 0.4)} top={262} color={C.soft}>withheld from monthly OAS payments, through June 2028</Line>
      </Card>
      <Card f={f} a={B.split.s} b={B.tfsa.s} label="LEVER 1 · PENSION SPLITTING" tone="green">
        <Hero f={f} a={B.split.s + 6} size={130}>up to 50%</Hero>
        <Line f={f} a={at('split', 0.4)} top={276} color={C.soft} size={30}>of RRIF or annuity income to your spouse, at 65+ (Form T1032)</Line>
      </Card>
      <Card f={f} a={B.tfsa.s} b={B.delay.s} label="LEVER 2 · TFSA" tone="green">
        <Hero f={f} a={B.tfsa.s + 6} size={130}>$0</Hero>
        <Line f={f} a={at('tfsa', 0.35)} top={276} color={C.soft} size={30}>TFSA withdrawals aren't income, so they don't count for OAS</Line>
      </Card>
      <Card f={f} a={B.delay.s} b={B.payoff.s} label="LEVER 3 · DELAY OAS" tone="green">
        <Hero f={f} a={B.delay.s + 6} size={130}>+0.6%</Hero>
        <Line f={f} a={at('delay', 0.4)} top={276} color={C.soft} size={30}>per month you wait, up to +36% at 70. No GIS while you delay.</Line>
      </Card>

      {/* payoff */}
      {f >= B.payoff.s && (
        <div style={{ position: 'absolute', left: 80, right: 80, top: 1010, opacity: end, transform: `translateY(${(1 - end) * 40}px)` }}>
          <Flag f={f} w={150} amp={0.06} />
          <div style={{ marginTop: 26, fontFamily: SERIF, fontSize: 66, fontWeight: 800, lineHeight: 1.06, color: C.cream, textShadow: shade }}>Plan for the line,<br />not the panic.</div>
          <div style={{ marginTop: 16, fontSize: 30, fontWeight: 600, color: C.soft, textShadow: shade }}>The right lever depends on your whole picture.</div>
          <div style={{ marginTop: 34, display: 'inline-flex', padding: '20px 32px', borderRadius: 999, background: 'linear-gradient(160deg,#fff1c2,#f1c75b 50%,#c88f1f)', color: '#2b1d03', fontSize: 34, fontWeight: 900, boxShadow: '0 16px 30px rgba(0,0,0,.4)', opacity: ease(f, B.cta.s - 4, B.cta.s + 8), transform: `scale(${1 + 0.03 * Math.sin(TAU * (f - B.cta.s) / 36)})` }}>Follow for the real math</div>
          <div style={{ marginTop: 28, fontSize: 19, fontWeight: 600, color: C.soft, lineHeight: 1.45, opacity: ease(f, B.payoff.s + 16, B.payoff.s + 30) }}>
            Source: canada.ca (Service Canada, CRA) · $110,000 is an example · line = 2026 income, indexed yearly · general info, not advice
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
