// C1 "Sole proprietor vs corporation: the real trade-off" — investigation format, motion engine v1 (2026-10-16).
// Variety vs H1 / A9 / A2 (CLAUDE.md "Variety"): hook = a big-number count-up (+$6,008) that a "LOWER TAX?" line then
// strikes; main visual = the same $100,000 bar split into tax / CPP / take-home, one bar per option, stacked; reveal =
// a company "vault" holding $40,000 taxed at 9% so far; end = a note card + next pill. Numbers come from c1/data.json.
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { PhotoPlate, SceneCuts, type Focus } from './Plate';
import { Flag } from './RaiseShort';
import { Typed, beatsFrom, type Cap } from './Kit';
import TL from './c1-timeline.json';
import WORDS from './c1-words.json';
import CUE from './c1-cues.json';
import DATA from '../../c1/data.json';
import REEL from '../../c1/reel.json';
import { T, goldFill, textShadow } from './motion/brand';
import { Captions, Depth, Glass, Kinetic, NavyGrade, Stamp, clamp, ease, money, outBack, outExpo } from './motion/Reel';

export const C1FPS = 24;
const B = beatsFrom(TL, C1FPS);
export const C1DUR = Math.ceil((TL.total + REEL.hold_after_vo) * C1FPS);
const Q = Object.fromEntries(Object.entries(CUE).map(([k, v]) => [k, Math.round((v as number) * C1FPS)])) as Record<string, number>;

const X = DATA.example;
const GAP = X.corp_keep - X.sole_keep;
const MORE = X.corp_total_tax - X.sole_tax;
const RED = T.redSoft, GREEN = T.green, BLUE = 'rgba(150,180,230,.85)';
const PW = 2294, PH = 4096;

const CUTS = [B.c2.s, B.reveal.s];
const L = Object.fromEntries(Object.entries(REEL.layout).map(([k, v]) => [k, { x: v.box[0], y: v.box[1], w: v.box[2], h: v.box[3] }])) as Record<string, { x: number; y: number; w: number; h: number }>;
const K1: Focus[] = [{ f: 0, u: 0.4, v: 0.28, k: 1.18 }, { f: B.c1.s, u: 0.38, v: 0.24, k: 1.24 }];
const K2: Focus[] = [{ f: 0, u: 0.55, v: 0.24, k: 1.2 }, { f: B.c3.s, u: 0.5, v: 0.3, k: 1.12 }];
const K3: Focus[] = [{ f: 0, u: 0.6, v: 0.3, k: 1.2 }, { f: B.action.s, u: 0.6, v: 0.36, k: 1.1 }, { f: B.cta.s, u: 0.6, v: 0.3, k: 1.05 }];

const CAPS: Cap[] = [
  { at: B.c1.s, l1: 'OPTION 1', l2: 'sole proprietor', until: B.c2.s - 2 },
  { at: B.c2.s, l1: 'OPTION 2', l2: 'corporation, all paid out', until: B.c3.s - 2 },
  { at: B.c3.s, l1: 'THE GAP', l2: 'where the $6,000 comes from', until: B.reveal.s - 2 },
  { at: B.reveal.s, l1: 'THE REAL EDGE', l2: 'money left inside', until: B.action.s - 2 },
];

// ---------- hook: +$6,008 count-up, then "lower tax?" struck ----------
const Hook = ({ f }: { f: number }) => {
  const out = B.c1.s, o = ease(f, out - 6, out + 8);
  const p = 0.08 + 0.92 * outExpo(f / Math.max(1, Q.six + 4));
  return (
    <div style={{ opacity: 1 - o }}>
      <Kinetic f={f} at={0} now text={REEL.hook.l1} x={80} y={470} size={70} nowrap />
      <Kinetic f={f} at={0} now text={REEL.hook.l2} x={80} y={552} size={66} nowrap color={T.gold} />
      <div style={{ position: 'absolute', left: 80, top: 690, width: 880, height: 260, borderRadius: 30, background: 'linear-gradient(160deg, rgba(14,20,34,.88), rgba(10,14,24,.7))', border: `1.5px solid ${T.glassEdge}` }}>
        <div style={{ position: 'absolute', left: 40, top: 28, fontFamily: T.font, fontSize: 20, fontWeight: 900, letterSpacing: 4, color: T.mute }}>KEPT WITH A CORPORATION · VS SOLE PROPRIETOR</div>
        <div style={{ position: 'absolute', left: 40, top: 76, fontFamily: T.font, fontSize: 130, fontWeight: 900, lineHeight: 1, ...goldFill, fontVariantNumeric: 'tabular-nums' }}>+{money(GAP * clamp(p))}</div>
        <div style={{ position: 'absolute', left: 44, top: 214, fontFamily: T.font, fontSize: 19, fontWeight: 700, color: T.soft, opacity: ease(f, Q.six + 10, Q.six + 20) }}>example · Manitoba 2026 · all profit paid out as dividends</div>
      </div>
      {f >= Q.nottax - 6 && (
        <div style={{ position: 'absolute', left: 80, width: 880, top: 1010, textAlign: 'center', opacity: ease(f, Q.nottax - 6, Q.nottax + 2) }}>
          <span style={{ fontFamily: T.font, fontSize: 58, fontWeight: 900, color: T.white, textShadow, textDecoration: f >= Q.nottax + 6 ? `line-through ${RED} 8px` : undefined }}>LOWER TAX?</span>
        </div>
      )}
      <Stamp f={f} at={Q.nottax + 6} text="Not the reason" x={430} y={1090} size={40} color={T.red} rotate={-8} />
    </div>
  );
};

// ---------- the two $100,000 bars ----------
const Bar = ({ f, y, at, label, segs }: { f: number; y: number; at: number; label: string; segs: [string, number, number, string][] }) => {
  if (f < at - 2) return null;
  const W = 880, scale = W / X.profit;
  let x = 0;
  return (
    <div style={{ position: 'absolute', left: 80, top: y, width: W, opacity: ease(f, at - 2, at + 8) }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: T.font, fontWeight: 900, color: T.white, textShadow }}>
        <span style={{ fontSize: 26, letterSpacing: 3 }}>{label}</span><span style={{ fontSize: 22, color: T.soft }}>{money(X.profit)} profit</span>
      </div>
      <div style={{ position: 'relative', marginTop: 12, height: 74, borderRadius: 14, background: 'rgba(255,255,255,.08)', overflow: 'hidden' }}>
        {segs.map(([t, v, sAt, c]) => {
          const p = outExpo((f - sAt) / 16), w = v * scale * p, left = x; x += v * scale;
          return f >= sAt - 1 ? (
            <div key={t} style={{ position: 'absolute', left, top: 0, width: w, height: 74, background: c, borderRight: '2px solid rgba(10,14,24,.6)' }}>
              {w > 100 && <div style={{ position: 'absolute', left: 12, top: 8, fontFamily: T.font, fontSize: 15, fontWeight: 900, letterSpacing: 2, color: 'rgba(10,14,24,.85)' }}>{t}</div>}
              {w > 100 && <div style={{ position: 'absolute', left: 12, top: 34, fontFamily: T.font, fontSize: 24, fontWeight: 900, color: '#0b1220', fontVariantNumeric: 'tabular-nums' }}>{money(v * p)}</div>}
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
};

const Bars = ({ f }: { f: number }) => {
  const a = B.c1.s + 4, b = B.reveal.s;
  if (f < a - 1 || f > b + 16) return null;
  const o = ease(f, b - 2, b + 14), y = L.bars.y;
  const gapOn = ease(f, Q.skip, Q.skip + 10);
  return (
    <div style={{ opacity: 1 - o }}>
      <div style={{ position: 'absolute', left: 56, top: y - 30, width: 928, height: 640, borderRadius: 28, background: 'linear-gradient(160deg, rgba(10,16,28,.82), rgba(10,16,28,.6))', border: `1px solid ${T.glassEdge}`, opacity: ease(f, a, a + 12) }} />
      <Bar f={f} y={y} at={a} label="SOLE PROPRIETOR" segs={[['INCOME TAX', X.sole_tax, Q.s_tax, RED], ['CPP', X.sole_cpp, Q.s_cpp, BLUE], ['YOU KEEP', X.sole_keep, Q.s_keep, GREEN]]} />
      <Bar f={f} y={y + 190} at={B.c2.s + 4} label="CORPORATION · ALL PAID OUT" segs={[['CORP 9%', X.corp_tax, Q.k_corp, '#e58b6e'], ['DIV. TAX', X.div_tax, Q.k_div, RED], ['YOU KEEP', X.corp_keep, Q.k_total + 8, GREEN]]} />
      {f >= Q.k_total && (
        <div style={{ position: 'absolute', left: 80, top: y + 430, width: 880, display: 'flex', gap: 16 }}>
          {[['INCOME TAX', X.sole_tax, X.corp_total_tax, Q.k_total, RED], ['CPP', X.sole_cpp, 0, Q.skip, BLUE]].map(([t, s, c, at, col]) => (
            <div key={t as string} style={{ flex: 1, height: 120, borderRadius: 18, position: 'relative', background: 'rgba(255,255,255,.06)', border: `1.5px solid ${f >= (at as number) ? col : T.glassEdge}`, opacity: ease(f, at as number, (at as number) + 8) }}>
              <div style={{ position: 'absolute', left: 20, top: 12, fontFamily: T.font, fontSize: 16, fontWeight: 900, letterSpacing: 3, color: T.mute }}>{t} · SOLE → CORP</div>
              <div style={{ position: 'absolute', left: 20, top: 44, fontFamily: T.font, fontSize: 34, fontWeight: 900, color: T.white, fontVariantNumeric: 'tabular-nums' }}>{money(s as number)} → {money(c as number)}</div>
            </div>
          ))}
        </div>
      )}
      <Stamp f={f} at={Q.more} text={`+${money(MORE)} more income tax`} x={300} y={y + 356} size={26} color={T.red} rotate={-4} />
      {gapOn > 0 && (
        <div style={{ position: 'absolute', left: 80, top: y + 566, width: 880, fontFamily: T.font, fontSize: 25, fontWeight: 800, color: T.white, textShadow, opacity: gapOn }}>
          The {money(GAP)} gap = CPP not paid → <span style={{ color: f >= Q.pension ? T.gold : T.white }}>no CPP pension built</span>{f >= Q.rrsp ? <span style={{ color: T.gold }}> · no RRSP room</span> : null}
        </div>
      )}
    </div>
  );
};

// ---------- reveal: the company vault ----------
const Vault = ({ f }: { f: number }) => {
  const a = B.reveal.s, b = B.action.s;
  if (f < a || f > b + 14) return null;
  const o = ease(f, b - 2, b + 12), y = L.vault.y;
  const fill = outExpo((f - Q.forty) / 20);
  return (
    <div style={{ opacity: 1 - o }}>
      <div style={{ position: 'absolute', left: 80, width: 880, top: y, textAlign: 'center', fontFamily: T.font, fontSize: 30, fontWeight: 900, letterSpacing: 3, color: T.white, textShadow, opacity: ease(f, a, a + 10) }}>MONEY LEFT INSIDE THE COMPANY</div>
      <div style={{ position: 'absolute', left: 290, top: y + 70, width: 500, height: 440, borderRadius: 34, background: 'linear-gradient(170deg, #2a3446, #141a26)', border: `3px solid ${T.glassEdge}`, boxShadow: '0 40px 80px rgba(0,0,0,.55)',
        transform: `scale(${clamp(outBack((f - a - 2) / 14), 0.7, 1.03)})`, opacity: ease(f, a, a + 8) }}>
        <div style={{ position: 'absolute', left: 30, top: 24, fontFamily: T.font, fontSize: 18, fontWeight: 900, letterSpacing: 4, color: T.mute }}>YOUR CORPORATION</div>
        <div style={{ position: 'absolute', left: 30, right: 30, bottom: 30, height: 300 * fill, borderRadius: 18, background: 'linear-gradient(180deg, rgba(241,199,91,.55), rgba(168,116,18,.35))' }} />
        <div style={{ position: 'absolute', left: 0, right: 0, top: 150, textAlign: 'center', fontFamily: T.font, fontSize: 92, fontWeight: 900, color: T.white, textShadow, fontVariantNumeric: 'tabular-nums' }}>{money(X.retain * fill)}</div>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 262, textAlign: 'center', fontFamily: T.font, fontSize: 26, fontWeight: 800, color: T.white, opacity: ease(f, Q.nine2, Q.nine2 + 8) }}>taxed {Math.round(X.corp_rate * 100)}% so far</div>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 302, textAlign: 'center', fontFamily: T.font, fontSize: 19, fontWeight: 700, color: T.soft, opacity: ease(f, Q.nine2 + 10, Q.nine2 + 20) }}>personal tax comes when you take it out</div>
      </div>
      <Stamp f={f} at={Q.nine2 + 4} text="Deferral, not a discount" x={560} y={y + 520} size={24} color={T.green} rotate={-4} />
    </div>
  );
};

// ---------- action + end: note card ----------
const Note = ({ f }: { f: number }) => {
  const a = B.action.s;
  if (f < a - 2) return null;
  const y = L.note.y;
  const row = (i: number, at: number, t: string, s: string) => (
    <div style={{ position: 'absolute', left: 36, top: 70 + i * 92, right: 30, opacity: ease(f, at - 2, at + 8), transform: `translateY(${(1 - outExpo((f - at) / 12)) * 20}px)` }}>
      <div style={{ fontFamily: T.font, fontSize: 30, fontWeight: 900, color: T.white }}>{t}</div>
      <div style={{ fontFamily: T.font, fontSize: 19, fontWeight: 700, color: T.soft }}>{s}</div>
    </div>
  );
  return (
    <div style={{ position: 'absolute', left: 80, top: y, width: 880 }}>
      <div style={{ position: 'absolute', left: 0, top: 0, width: 880, height: 290, borderRadius: 26, background: 'linear-gradient(160deg, rgba(10,16,28,.84), rgba(10,16,28,.62))', border: `1px solid ${T.glassEdge}`, opacity: ease(f, a, a + 12) }}>
        <div style={{ position: 'absolute', left: 36, top: 24, fontFamily: T.font, fontSize: 18, fontWeight: 900, letterSpacing: 4, color: T.gold }}>BEFORE YOU INCORPORATE</div>
        {row(0, Q.t2, 'A SECOND TAX RETURN, EVERY YEAR', 'the corporation files its own return (T2) + bookkeeping')}
        {row(1, Q.acct, 'RUN YOUR OWN NUMBERS', 'profit, what you need to live on, CPP and RRSP plans · with an accountant')}
      </div>
      <div style={{ position: 'absolute', left: 0, top: 330, display: 'flex', alignItems: 'center', gap: 18, opacity: ease(f, Q.next - 4, Q.next + 8) }}>
        <Flag f={f} w={90} amp={0.06} />
        <div style={{ display: 'inline-flex', padding: '16px 28px', borderRadius: 999, background: `linear-gradient(160deg,${T.goldHi},${T.gold} 50%,${T.goldDeep})`, color: '#1d1503', fontFamily: T.font, fontSize: 28, fontWeight: 900,
          transform: `scale(${1 + 0.03 * Math.sin((f - a) / 6)})` }}>NEXT: SALARY OR DIVIDENDS? →</div>
      </div>
      <div style={{ position: 'absolute', left: 0, top: 420, fontFamily: T.font, fontSize: 26, fontWeight: 700, color: T.white, textShadow, opacity: ease(f, Q.follow, Q.follow + 10) }}>Follow so you don't miss it</div>
      <div style={{ position: 'absolute', left: 0, top: 470, width: 880, fontFamily: T.font, fontSize: 18, fontWeight: 600, color: T.mute, lineHeight: 1.45, opacity: ease(f, a + 20, a + 34) }}>
        Source: Income Tax Act ss. 82(1)(b), 121, 146(1); Manitoba Income Tax Act s. 4.7; CPP Act ss. 12–13; CRA 2026 rates · example: $100,000 profit, single, Manitoba {DATA.tax_year}, corporation costs not included · general info, not advice
      </div>
    </div>
  );
};

const Header = ({ f }: { f: number }) => (
  <div style={{ position: 'absolute', left: 80, top: 92, right: 80, display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: T.white, fontSize: 22, fontWeight: 800, letterSpacing: 4, fontFamily: T.font }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}><Flag f={f} w={72} />TAX SECRETS CANADA</div>
    <div style={{ color: T.gold, letterSpacing: 5 }}>INCORPORATE? · {DATA.tax_year}</div>
  </div>
);

export const C1V3 = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: T.navy, fontFamily: T.font, overflow: 'hidden' }}>
      <SceneCuts f={f} cuts={CUTS} scene={(i) => i === 0 ? (
        <PhotoPlate f={f} src="plates/c1-s1-4k.jpg" iw={PW} ih={PH} keys={K1} glide={40} blur={0.8 + 4 * (1 - ease(f, 0, 20))} steam={{ u: 0.26, v: 0.58, w: 0.03 }} snow={[{ u0: 0.62, v0: 0.0, u1: 1.0, v1: 0.38 }]} />
      ) : i === 1 ? (
        <PhotoPlate f={f} src="plates/c1-s2-4k.jpg" iw={PW} ih={PH} keys={K2} glide={50} blur={0.8} />
      ) : (
        <PhotoPlate f={f} src="plates/c1-s3-4k.jpg" iw={PW} ih={PH} keys={K3} glide={40} blur={0.8} />
      )} />
      <Depth f={f} seed={f < B.c2.s ? 60 : f < B.reveal.s ? 61 : 62} warm={0.6} />
      <NavyGrade low={f >= B.action.s ? 1.2 : 1} />
      <Header f={f} />
      <Typed f={f} caps={CAPS} head={T.font} />
      {f < B.c1.s + 20 && <Hook f={f} />}
      <Bars f={f} />
      <Vault f={f} />
      <Note f={f} />
      <Captions f={f} fps={C1FPS} beats={WORDS.beats as never} from={B.c1.s} until={B.action.s} y={1296} />
    </AbsoluteFill>
  );
};
