// CASE #002 — "Can you claim money you send to your parents abroad?"
// Master timeline = the voiceover (case002/vo.py → src/case002-timeline.json). Every visual beat keys off a VO beat.
// Facts and sources: case002/PRODUCTION-BIBLE.md. Same series look as SalaryShort / RaiseShort.
import { BadgeCheck, CircleX, HeartPulse, House, ShieldCheck, Stethoscope } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Office } from './Office';
import { Flag } from './RaiseShort';
import TL from './case002-timeline.json';

export const CFPS = 24, CDUR = 1428, CW2 = 1080, CH2 = 1920;
const TAU = Math.PI * 2;
const C = { cream: '#f6f1e7', gold: '#ffd65e', mint: '#bff0d2', red: '#ff8a65', orange: '#F39C12' };
const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const sstep = (t: number) => { t = clamp(t); return t * t * t * (t * (t * 6 - 15) + 10); };
const ease = (f: number, a: number, b: number) => sstep((f - a) / (b - a));
const spring = (f: number, a: number, dur = 14) => { const t = clamp((f - a) / dur); return t >= 1 ? 1 : 1 - Math.exp(-6 * t) * Math.cos(7.5 * t); };

// beat start/end in frames
const B: Record<string, { s: number; e: number }> = Object.fromEntries(TL.beats.map((b) => [b.id, { s: Math.round(b.start * CFPS), e: Math.round(b.end * CFPS) }]));
// a word inside a beat, by its fraction of the beat (for "no" etc.)
const at = (id: string, frac: number) => Math.round(B[id].s + (B[id].e - B[id].s) * frac);

const glass: React.CSSProperties = {
  background: 'linear-gradient(155deg, rgba(255,255,255,.16), rgba(255,255,255,.05) 60%)',
  border: '1.5px solid rgba(255,255,255,.24)', backdropFilter: 'blur(26px) saturate(150%)',
  boxShadow: 'inset 0 1.5px 0 rgba(255,255,255,.38), inset 0 -20px 40px rgba(0,0,0,.12), 0 3px 8px rgba(0,0,0,.28), 0 26px 50px rgba(0,0,0,.38), 0 70px 120px rgba(0,0,0,.32)',
};
const goldInk: React.CSSProperties = { color: C.gold, textShadow: '0 -2px 0 #fff3c4, 0 4px 0 #c08414, 0 8px 0 #87590a, 0 24px 40px rgba(0,0,0,.45)' };
const ink = '0 3px 0 rgba(0,0,0,.25), 0 12px 30px rgba(0,0,0,.5)';
const Tag = ({ children, tone = 'gold' }: { children: React.ReactNode; tone?: 'gold' | 'orange' | 'red' }) => (
  <div style={{ display: 'inline-block', padding: '8px 18px', borderRadius: 14, fontSize: 26, fontWeight: 900, letterSpacing: 3, color: tone === 'gold' ? '#2e2004' : '#fff',
    background: tone === 'gold' ? 'linear-gradient(160deg,#ffefb0,#f2c14e 50%,#cf961f)' : tone === 'orange' ? 'linear-gradient(160deg,#ffc56b,#F39C12 60%,#c26f00)' : 'linear-gradient(160deg,#ff8a65,#d84315)', boxShadow: '0 10px 22px rgba(0,0,0,.4)' }}>{children}</div>
);

// ---------- typed film-title captions (complement the VO, never transcribe it) ----------
type Cap = { at: number; l1: string; l2?: string; until: number };
const CAPS: Cap[] = [
  { at: B.hook.s, l1: '$500 a month to your parents.', l2: 'Can you claim it?', until: B.answer.s - 2 },
  { at: B.answer.s, l1: 'In most cases: no.', until: B.support.s - 2 },
  { at: B.support.s, l1: 'Deductible support goes to:', l2: 'a spouse, ex-partner or co-parent.', until: B.credits.s - 2 },
  { at: B.credits.s, l1: '3 credits CAN include a parent.', until: B.catch.s - 2 },
  { at: B.catch.s, l1: 'The catch:', l2: 'resident in Canada.', until: B.abroad.s - 2 },
  { at: B.abroad.s, l1: 'Abroad all year?', l2: 'Generally no claim.', until: B.advice.s - 2 },
  { at: B.advice.s, l1: 'Moving them here?', l2: 'Get advice. Keep proof.', until: B.payoff.s - 2 },
  { at: B.payoff.s, l1: 'Generous.', l2: 'Not a write-off.', until: CDUR + 10 },
];
const Typed = ({ f }: { f: number }) => {
  const c = CAPS.find((c) => f >= c.at && f < c.until);
  if (!c) return null;
  const cps = 1.6, n1 = Math.floor((f - c.at) * cps), n2 = Math.floor((f - c.at - c.l1.length / cps - 3) * cps);
  const caret = Math.floor(f / 8) % 2 === 0, t2 = !!c.l2 && n2 >= 0;
  const line = (s: string, n: number, big: boolean, on: boolean) => (
    <div style={{ fontSize: big ? 62 : 44, fontWeight: big ? 900 : 700, letterSpacing: big ? -1.5 : -0.5, color: big ? C.cream : C.mint, minHeight: big ? 70 : 52, whiteSpace: 'nowrap' }}>
      {s.slice(0, clamp(n, 0, s.length))}
      {on && <span style={{ display: 'inline-block', width: big ? 6 : 4, height: big ? 56 : 40, marginLeft: 6, background: C.gold, opacity: caret ? 1 : 0, transform: 'translateY(6px)' }} />}
    </div>
  );
  return <div style={{ position: 'absolute', left: 80, top: 190, opacity: clamp((c.until - f) / 4), textShadow: ink }}>{line(c.l1, n1, true, !t2)}{c.l2 && line(c.l2, n2, false, t2)}</div>;
};

const Hero = ({ a, b, children, h = 480 }: { a: number; b: number; children: React.ReactNode; h?: number }) => {
  const f = useCurrentFrame();
  if (f < a - 2 || f > b + 2) return null;
  const e = spring(f, a, 16), o = 1 - ease(f, b - 10, b);
  return (
    <div style={{ position: 'absolute', left: 80, top: 330, width: 920, height: h, borderRadius: 40, ...glass, transform: `translateY(${(1 - e) * 90 + (1 - o) * 24}px) scale(${1 - (1 - o) * 0.06})`, opacity: clamp(e * 1.4) * o, filter: `blur(${(1 - clamp(e * 1.3)) * 10 + (1 - o) * 6}px)` }}>{children}</div>
  );
};

// ---------- the three credits board ----------
const CREDITS: { id: string; I: LucideIcon; name: string; line: string; cond: string; resident: boolean }[] = [
  { id: 'care', I: HeartPulse, name: 'Caregiver amount', line: 'Line 30450', cond: 'Parent has an impairment', resident: true },
  { id: 'medical', I: Stethoscope, name: 'Medical expenses', line: 'Line 33199', cond: 'Expenses you paid for them', resident: true },
  { id: 'eligible', I: House, name: 'Eligible dependant', line: 'Line 30400', cond: 'You’re single · they live with you', resident: false },
];
const R_Y0 = 870, R_H = 178, R_GAP = 14;
const Board = ({ f }: { f: number }) => {
  const show = ease(f, B.credits.s - 4, B.credits.s + 10) * (1 - ease(f, B.payoff.s - 10, B.payoff.s + 4));
  if (show <= 0) return null;
  const res = ease(f, at('resident', 0.55), at('resident', 0.55) + 12);      // "resident in Canada"
  const abroad = ease(f, at('abroad', 0.3), at('abroad', 0.3) + 14);
  const dim = 1 - 0.35 * ease(f, B.advice.s, B.advice.s + 14);
  return (
    <div style={{ opacity: show * dim }}>
      {CREDITS.map((c, i) => {
        const e = spring(f, B[c.id].s, 14);
        const y = R_Y0 + i * (R_H + R_GAP);
        const blocked = abroad;
        return (
          <div key={c.id} style={{ position: 'absolute', left: 80, top: y, width: 860, height: R_H, borderRadius: 30, ...glass, opacity: clamp(e * 1.4), transform: `translateX(${(1 - e) * -70}px)` }}>
            <div style={{ position: 'absolute', left: 26, top: 40, width: 96, height: 96, borderRadius: 28, display: 'grid', placeItems: 'center', background: 'linear-gradient(150deg,#5fe39a,#27AE60 50%,#146b3a)', boxShadow: 'inset 0 2px 1px rgba(255,255,255,.6), 0 12px 24px rgba(0,0,0,.4)', filter: `saturate(${1 - 0.8 * blocked})` }}>
              <c.I size={50} color="#fff" strokeWidth={2.3} />
            </div>
            <div style={{ position: 'absolute', left: 148, top: 26, fontSize: 40, fontWeight: 900, color: C.cream, textShadow: ink, opacity: 1 - 0.45 * blocked }}>{c.name}</div>
            <div style={{ position: 'absolute', left: 150, top: 80, fontSize: 26, fontWeight: 700, color: C.mint, opacity: 1 - 0.45 * blocked }}>{c.line} · {c.cond}</div>
            {c.resident && res > 0 && (
              <div style={{ position: 'absolute', left: 150, top: 118, transform: `rotate(-2deg) scale(${1 + 0.4 * (1 - spring(f, at('resident', 0.55), 10))})`, transformOrigin: 'left center', opacity: res }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 12, border: '3px solid #ffd65e', color: C.gold, fontSize: 22, fontWeight: 900, letterSpacing: 1.5, background: 'rgba(40,28,0,.55)' }}><ShieldCheck size={24} color={C.gold} />RESIDENT IN CANADA</div>
              </div>
            )}
            {!c.resident && res > 0 && (
              <div style={{ position: 'absolute', left: 150, top: 118, opacity: res, display: 'flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 12, border: '2px solid rgba(191,240,210,.7)', color: C.mint, fontSize: 22, fontWeight: 800 }}><House size={22} color={C.mint} />LIVES WITH YOU</div>
            )}
            {blocked > 0 && (
              <div style={{ position: 'absolute', right: 24, top: 124, display: 'flex', alignItems: 'center', gap: 8, fontSize: 24, fontWeight: 900, color: C.red, opacity: blocked, transform: `translateX(${(1 - blocked) * 30}px)` }}>
                <CircleX size={28} color={C.red} />{c.resident ? 'abroad all year: no' : 'never lived with you: no'}
              </div>
            )}
          </div>
        );
      })}
      <div style={{ position: 'absolute', left: 82, top: R_Y0 + 3 * (R_H + R_GAP) + 2, width: 860, fontSize: 21, fontWeight: 600, color: C.cream, opacity: 0.7 }}>
        Each credit has more conditions and income limits · CRA
      </div>
    </div>
  );
};

export const Case002 = () => {
  const f = useCurrentFrame();
  const T = f / CDUR;
  const yaw = -0.3 + 0.6 * sstep(T) + 0.0025 * (Math.sin(f * 0.031) + 0.6 * Math.sin(f * 0.077 + 1.3));
  const grade = 0.15 + 0.85 * sstep(T);

  const yearIn = ease(f, at('year', 0.05), at('year', 0.05) + 12);
  const askIn = spring(f, at('year', 0.62), 12);
  const noAt = at('answer', 0.86);                                 // "...no."
  const notList = ease(f, at('notlist', 0.1), at('notlist', 0.1) + 12);
  const end = spring(f, B.payoff.s + 4, 18);

  return (
    <AbsoluteFill style={{ background: '#06170f', fontFamily: 'Mont', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', left: 0, top: 0, width: CW2 / 2, height: CH2 / 2, transform: 'scale(2)', transformOrigin: '0 0' }}>
        <Office f={f} loop={180} w={CW2 / 2} h={CH2 / 2} blur={[9, 9]} pan={{ yaw, pitch: -0.02 + 0.0018 * Math.sin(f * 0.043), roll: 0.0012 * Math.sin(f * 0.029 + 2.1), vfov: 50, grade }} />
      </div>
      <AbsoluteFill style={{ background: `rgba(4,24,16,${0.66 - 0.16 * grade})` }} />
      <AbsoluteFill style={{ background: 'linear-gradient(180deg, rgba(2,14,9,.75) 0%, rgba(2,14,9,0) 22%, rgba(2,14,9,0) 70%, rgba(2,14,9,.8) 100%)' }} />
      <AbsoluteFill style={{ background: `radial-gradient(900px 700px at 900px 160px, rgba(255,205,110,${0.06 + 0.22 * grade}), rgba(255,205,110,0) 70%)`, mixBlendMode: 'screen' }} />

      <div style={{ position: 'absolute', left: 80, top: 92, right: 80, display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: C.cream, fontSize: 24, fontWeight: 800, letterSpacing: 3 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}><Flag f={f} w={84} />TAX SECRETS CANADA</div>
        <div style={{ padding: '8px 18px', borderRadius: 999, ...glass, fontSize: 22 }}>CASE #002</div>
      </div>

      <Typed f={f} />

      {/* hook → year → question */}
      <Hero a={B.hook.s} b={at('answer', 0.86) + 6}>
        <div style={{ position: 'absolute', left: 52, top: 44 }}><Tag>EXAMPLE</Tag></div>
        <div style={{ position: 'absolute', left: 44, top: 100, fontSize: 168, fontWeight: 900, letterSpacing: -7, ...goldInk }}>$500<span style={{ fontSize: 60, letterSpacing: 0 }}> /month</span></div>
        <div style={{ position: 'absolute', left: 52, top: 300, fontSize: 52, fontWeight: 900, color: C.cream, textShadow: ink, opacity: yearIn, transform: `translateY(${(1 - yearIn) * 20}px)` }}>× 12 = <span style={goldInk}>$6,000</span> a year</div>
        <div style={{ position: 'absolute', left: 52, top: 392, opacity: clamp(askIn * 1.4), transform: `scale(${0.8 + 0.2 * askIn})`, transformOrigin: 'left center', display: 'flex', alignItems: 'center', gap: 14, fontSize: 38, fontWeight: 800, color: C.mint }}>Deductible? <span style={{ fontSize: 48, color: C.gold }}>?</span></div>
      </Hero>

      {/* the answer: NO */}
      {f >= noAt - 2 && f < B.support.s + 6 && (() => {
        const s = spring(f, noAt, 10), o = 1 - ease(f, B.support.s - 6, B.support.s + 4);
        return (
          <div style={{ position: 'absolute', left: 0, right: 0, top: 860, display: 'grid', placeItems: 'center', opacity: clamp(s * 1.6) * o }}>
            <div style={{ transform: `rotate(-6deg) scale(${1.6 - 0.6 * s})`, padding: '18px 60px', borderRadius: 28, border: '8px solid #ff8a65', color: '#ff8a65', fontSize: 150, fontWeight: 900, letterSpacing: 6, background: 'rgba(40,10,0,.35)', textShadow: '0 10px 30px rgba(0,0,0,.5)', boxShadow: '0 30px 60px rgba(0,0,0,.4)' }}>NO</div>
            <div style={{ marginTop: 26, fontSize: 36, fontWeight: 800, color: C.cream, textShadow: ink }}>in most cases</div>
          </div>
        );
      })()}

      {/* who deductible support can go to */}
      <Hero a={B.support.s} b={B.credits.s} h={520}>
        <div style={{ position: 'absolute', left: 52, top: 44 }}><Tag tone="orange">SUPPORT PAYMENTS</Tag></div>
        {[['Spouse or ex-partner', BadgeCheck, C.mint, 0.25], ["Your child's other parent", BadgeCheck, C.mint, 0.5], ['Court order or written agreement', ShieldCheck, C.cream, 0.78]].map(([t, I, col, fr], k) => {
          const e = ease(f, at('support', fr as number), at('support', fr as number) + 12);
          const Ic = I as LucideIcon;
          return (
            <div key={k} style={{ position: 'absolute', left: 52, top: 120 + k * 84, display: 'flex', alignItems: 'center', gap: 18, fontSize: 40, fontWeight: 800, color: col as string, textShadow: ink, opacity: e, transform: `translateX(${(1 - e) * -30}px)` }}>
              <Ic size={44} color={k < 2 ? '#5fe39a' : C.gold} strokeWidth={2.4} />{t as string}
            </div>
          );
        })}
        <div style={{ position: 'absolute', left: 52, top: 380, display: 'flex', alignItems: 'center', gap: 18, fontSize: 46, fontWeight: 900, color: C.red, textShadow: ink, opacity: notList, transform: `translateX(${(1 - notList) * 40}px)` }}>
          <CircleX size={50} color={C.red} strokeWidth={2.6} />Your parents
        </div>
      </Hero>

      {/* credits header card */}
      <Hero a={B.credits.s} b={B.catch.s} h={300}>
        <div style={{ position: 'absolute', left: 52, top: 44 }}><Tag>TAX CREDITS</Tag></div>
        <div style={{ position: 'absolute', left: 52, top: 110, fontSize: 64, fontWeight: 900, lineHeight: 1.05, color: C.cream, textShadow: ink }}><span style={goldInk}>3</span> that can include<br />a parent</div>
      </Hero>

      {/* the catch */}
      <Hero a={B.catch.s} b={B.abroad.s} h={300}>
        <div style={{ position: 'absolute', left: 52, top: 44 }}><Tag tone="orange">THE CATCH</Tag></div>
        <div style={{ position: 'absolute', left: 52, top: 110, fontSize: 56, fontWeight: 900, lineHeight: 1.1, color: C.cream, textShadow: ink, opacity: ease(f, B.resident.s, B.resident.s + 14) }}>Resident in Canada<br /><span style={goldInk}>at some point in the year</span></div>
      </Hero>

      {/* abroad */}
      <Hero a={B.abroad.s} b={B.advice.s} h={300}>
        <div style={{ position: 'absolute', left: 52, top: 44 }}><Tag tone="red">PARENTS ABROAD ALL YEAR</Tag></div>
        <div style={{ position: 'absolute', left: 52, top: 110, fontSize: 56, fontWeight: 900, lineHeight: 1.1, color: C.cream, textShadow: ink }}>These generally<br /><span style={{ color: C.red }}>don’t apply</span></div>
      </Hero>

      {/* advice */}
      <Hero a={B.advice.s} b={B.payoff.s} h={300}>
        <div style={{ position: 'absolute', left: 52, top: 44 }}><Tag>SITUATION FOR A PROFESSIONAL</Tag></div>
        {[['Residency depends on the facts', 0.3], ['Keep proof they depend on you', 0.72]].map(([t, fr], k) => {
          const e = ease(f, at('advice', fr as number), at('advice', fr as number) + 12);
          return <div key={k} style={{ position: 'absolute', left: 52, top: 120 + k * 76, display: 'flex', alignItems: 'center', gap: 16, fontSize: 40, fontWeight: 800, color: C.cream, textShadow: ink, opacity: e }}><ShieldCheck size={42} color={C.gold} />{t as string}</div>;
        })}
      </Hero>

      <Board f={f} />

      {/* payoff */}
      {f >= B.payoff.s && (
        <div style={{ position: 'absolute', left: 80, top: 400, width: 920, opacity: clamp(end * 1.4), transform: `translateY(${(1 - end) * 60}px)` }}>
          <Flag f={f} w={220} amp={0.06} />
          <div style={{ marginTop: 34, fontSize: 72, fontWeight: 900, color: C.cream, lineHeight: 1.05, textShadow: ink }}>Generous.<br /><span style={goldInk}>Not a write-off.</span></div>
          <div style={{ marginTop: 50, display: 'inline-flex', padding: '22px 34px', borderRadius: 999, background: 'linear-gradient(160deg,#ffefb0,#f2c14e 50%,#cf961f)', color: '#2e2004', fontSize: 38, fontWeight: 900, boxShadow: 'inset 0 2px 1px rgba(255,255,255,.7), 0 16px 30px rgba(0,0,0,.4)', opacity: ease(f, B.cta.s - 4, B.cta.s + 8), transform: `scale(${1 + 0.03 * Math.sin(TAU * (f - B.cta.s) / 36)})` }}>Follow for the real math</div>
        </div>
      )}
      {f >= B.payoff.s && (
        <div style={{ position: 'absolute', left: 80, top: 1330, width: 860, fontSize: 21, fontWeight: 600, color: C.cream, opacity: 0.75 * ease(f, B.payoff.s + 20, B.payoff.s + 36), lineHeight: 1.45 }}>
          Sources: CRA — support payments; lines 30400, 30450, 33199 (canada.ca).<br />$500/month is an example · general info, not advice.
        </div>
      )}
    </AbsoluteFill>
  );
};
