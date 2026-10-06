// Series design kit (approved look, 2026-10-06; reference: E2v2.tsx). Minimal smoked-glass cards, one hero number
// per card that rises out of a mask, a gold hairline, a light sweep on entry, typed film-title captions, pill strip.
import { Flag } from './RaiseShort';

export const C = { cream: '#f7f1e6', gold: '#f1c75b', soft: 'rgba(247,241,230,.84)', red: '#ff8f6b', green: '#7fe0a8' };
export const SERIF = 'Fraunces, Georgia, serif', SANS = 'Mont';
export const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
export const sstep = (t: number) => { t = clamp(t); return t * t * t * (t * (t * 6 - 15) + 10); };
export const ease = (f: number, a: number, b: number) => sstep((f - a) / (b - a));
export const money = (n: number) => '$' + Math.round(n).toLocaleString('en-US');
export const goldText: React.CSSProperties = { background: 'linear-gradient(180deg,#fff1c2 0%,#f1c75b 45%,#c88f1f 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', filter: 'drop-shadow(0 6px 18px rgba(0,0,0,.45))' };
export const shade = '0 2px 14px rgba(0,0,0,.55)';

export type Beats = Record<string, { s: number; e: number }>;
export const beatsFrom = (tl: { beats: { id: string; start: number; end: number }[] }, fps: number): Beats =>
  Object.fromEntries(tl.beats.map((b) => [b.id, { s: Math.round(b.start * fps), e: Math.round(b.end * fps) }]));

export type Cap = { at: number; l1: string; l2?: string; until: number };
export const Typed = ({ f, caps }: { f: number; caps: Cap[] }) => {
  const c = caps.find((c) => f >= c.at && f < c.until);
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

export const Card = ({ f, a, b, label, tone = 'gold', children, h = 380, top = 1150 }: { f: number; a: number; b: number; label: string; tone?: 'gold' | 'red' | 'green'; children: React.ReactNode; h?: number; top?: number }) => {
  if (f < a - 1 || f > b + 1) return null;
  const e = ease(f, a, a + 14), o = 1 - ease(f, b - 8, b);
  const sweep = clamp((f - a - 4) / 22);
  const col = tone === 'gold' ? C.gold : tone === 'red' ? C.red : C.green;
  return (
    <div style={{ position: 'absolute', left: 80, top: top + (1 - e) * 60, width: 920, height: h, borderRadius: 36, overflow: 'hidden', opacity: e * o, transform: `scale(${1 - (1 - o) * 0.04})`,
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

export const Hero = ({ f, a, children, top = 96, size = 150, line = true }: { f: number; a: number; children: React.ReactNode; top?: number; size?: number; line?: boolean }) => {
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

export const Line = ({ f, a, top, children, color = C.cream, size = 36, serif = false }: { f: number; a: number; top: number; children: React.ReactNode; color?: string; size?: number; serif?: boolean }) => (
  <div style={{ position: 'absolute', left: 56, right: 56, top, fontFamily: serif ? SERIF : SANS, fontSize: size, fontWeight: serif ? 700 : 600, color, lineHeight: 1.25, opacity: ease(f, a, a + 10), transform: `translateY(${(1 - ease(f, a, a + 10)) * 14}px)` }}>{children}</div>
);

export const pill: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: 10, padding: '12px 20px', borderRadius: 999, background: 'rgba(16,12,8,.5)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,236,200,.2)', fontFamily: SANS, fontSize: 22, fontWeight: 800, letterSpacing: 1, color: C.cream };

export const Header = ({ f, chip }: { f: number; chip: string }) => (
  <div style={{ position: 'absolute', left: 80, top: 92, right: 80, display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: C.cream, fontSize: 22, fontWeight: 800, letterSpacing: 4, fontFamily: SANS }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}><Flag f={f} w={72} />TAX SECRETS CANADA</div>
    <div style={{ color: C.gold, letterSpacing: 5 }}>{chip}</div>
  </div>
);

export const Grades = () => (
  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(8,6,4,.82) 0%, rgba(8,6,4,.55) 14%, rgba(8,6,4,0) 28%, rgba(8,6,4,0) 50%, rgba(8,6,4,.55) 66%, rgba(8,6,4,.8) 100%)' }} />
);
