// C2 "Salary or dividends?" — investigation format, motion engine v1 (2026-10-16).
// Variety vs C1 / H1 / A9 (CLAUDE.md "Variety"): hook = two pay envelopes sliding in from opposite sides, one tagged
// +$5,800; main visual = a two-column ledger table that fills row by row as the narration reaches each line, then two
// "what it bought" chips under the salary column; reveal = a salary ↔ dividends mix slider; end = an EI card + next
// pill. Numbers come from c2/data.json.
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { PhotoPlate, SceneCuts, type Focus } from './Plate';
import { Flag } from './RaiseShort';
import { Typed, beatsFrom, type Cap } from './Kit';
import TL from './c2-timeline.json';
import WORDS from './c2-words.json';
import CUE from './c2-cues.json';
import DATA from '../../c2/data.json';
import REEL from '../../c2/reel.json';
import { T, goldFill, textShadow } from './motion/brand';
import { Captions, Depth, Kinetic, NavyGrade, Stamp, clamp, ease, money, outBack, outExpo } from './motion/Reel';

export const C2FPS = 24;
const B = beatsFrom(TL, C2FPS);
export const C2DUR = Math.ceil((TL.total + REEL.hold_after_vo) * C2FPS);
const Q = Object.fromEntries(Object.entries(CUE).map(([k, v]) => [k, Math.round((v as number) * C2FPS)])) as Record<string, number>;

const X = DATA.example;
const GAP = X.div_keep - X.sal_keep;
const RED = T.redSoft, GREEN = T.green;
const PW = 2294, PH = 4096;

const CUTS = [B.c2.s, B.reveal.s];
const L = Object.fromEntries(Object.entries(REEL.layout).map(([k, v]) => [k, { x: v.box[0], y: v.box[1], w: v.box[2], h: v.box[3] }])) as Record<string, { x: number; y: number; w: number; h: number }>;
const K1: Focus[] = [{ f: 0, u: 0.35, v: 0.24, k: 1.18 }, { f: B.c1.s, u: 0.35, v: 0.22, k: 1.24 }];
const K2: Focus[] = [{ f: 0, u: 0.5, v: 0.22, k: 1.2 }, { f: B.c3.s, u: 0.5, v: 0.28, k: 1.12 }];
const K3: Focus[] = [{ f: 0, u: 0.45, v: 0.26, k: 1.2 }, { f: B.action.s, u: 0.5, v: 0.32, k: 1.1 }, { f: B.cta.s, u: 0.5, v: 0.28, k: 1.05 }];

const CAPS: Cap[] = [
  { at: B.c1.s, l1: 'ALL SALARY', l2: 'company pays you + its half of CPP', until: B.c2.s - 2 },
  { at: B.c2.s, l1: 'ALL DIVIDENDS', l2: '9% in the company, then personal tax', until: B.c3.s - 2 },
  { at: B.c3.s, l1: 'WHAT IT BOUGHT', l2: 'the $5,800 difference', until: B.reveal.s - 2 },
  { at: B.reveal.s, l1: 'THE TWIST', l2: 'you can mix both', until: B.action.s - 2 },
];

// ---------- hook: two envelopes from opposite sides ----------
const Env = ({ f, at, from, x, label, tag }: { f: number; at: number; from: 1 | -1; x: number; label: string; tag?: number }) => {
  const p = outExpo((f - at) / 14);
  return (
    <div style={{ position: 'absolute', left: x + from * (1 - p) * 520, top: 700, width: 400, height: 270, opacity: clamp(p * 1.4), transform: `rotate(${from * (1 - p) * 8 - from * 2}deg)` }}>
      <div style={{ position: 'absolute', inset: 0, borderRadius: 14, background: '#efe9dc', boxShadow: '0 30px 60px rgba(0,0,0,.5)' }} />
      <svg width={400} height={150} style={{ position: 'absolute', left: 0, top: 0 }}><path d="M 0 0 L 200 120 L 400 0" fill="none" stroke="#cfc6b3" strokeWidth={3} /></svg>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 160, textAlign: 'center', fontFamily: T.font, fontSize: 40, fontWeight: 900, letterSpacing: 4, color: '#2a3140' }}>{label}</div>
      {tag !== undefined && f >= tag && (
        <div style={{ position: 'absolute', right: -20, top: -34, padding: '10px 20px', borderRadius: 999, background: `linear-gradient(160deg,${T.goldHi},${T.gold} 50%,${T.goldDeep})`, color: '#1d1503', fontFamily: T.font, fontSize: 36, fontWeight: 900,
          transform: `scale(${clamp(outBack((f - tag) / 12), 0.4, 1.06)})` }}>+{money(GAP)}?</div>
      )}
    </div>
  );
};
const Hook = ({ f }: { f: number }) => {
  const out = B.c1.s, o = ease(f, out - 6, out + 8);
  return (
    <div style={{ opacity: 1 - o }}>
      <Kinetic f={f} at={0} now text={REEL.hook.l1} x={80} y={470} size={64} nowrap />
      <Kinetic f={f} at={0} now text={REEL.hook.l2} x={80} y={548} size={64} nowrap color={T.gold} />
      <Env f={f} at={Math.min(Q.sal - 6, 4)} from={-1} x={60} label="SALARY" />
      <Env f={f} at={Math.min(Q.div - 6, 10)} from={1} x={580} label="DIVIDENDS" tag={Q.more} />
      {f >= Q.more + 8 && <div style={{ position: 'absolute', left: 80, width: 880, top: 1030, textAlign: 'center', fontFamily: T.font, fontSize: 30, fontWeight: 800, letterSpacing: 3, color: T.white, textShadow, opacity: ease(f, Q.more + 8, Q.more + 18) }}>MORE IN YOUR POCKET. BUT WHAT DO YOU GIVE UP?</div>}
    </div>
  );
};

// ---------- the ledger table ----------
const Table = ({ f }: { f: number }) => {
  const a = B.c1.s + 4, b = B.reveal.s;
  if (f < a - 1 || f > b + 16) return null;
  const o = ease(f, b - 2, b + 14), y = L.table.y;
  const rows: [string, string, number, string, number, string][] = [
    ['Company pays out', money(X.salary + X.employer_cpp), Q.s_pay, money(X.profit), Q.d_corp, T.white],
    ['Corporate tax (9%)', '$0', Q.s_pay, `−${money(X.corp_tax)}`, Q.d_corp, RED],
    ['CPP (employer + you)', `−${money(X.cpp_total)}`, Q.s_cpp, '$0', Q.d_pay, RED],
    ['Personal income tax', `−${money(X.sal_tax)}`, Q.s_tax, `−${money(X.div_tax)}`, Q.d_tax, RED],
  ];
  const cell = (txt: string, at: number, x: number, color: string, big = false) => (
    <div style={{ position: 'absolute', left: x, width: 250, textAlign: 'right', fontFamily: T.font, fontSize: big ? 40 : 30, fontWeight: 900, color: f >= at ? color : 'rgba(255,255,255,.18)', fontVariantNumeric: 'tabular-nums',
      opacity: f >= at ? 1 : 0.6, transform: `translateY(${(1 - outExpo((f - at) / 10)) * (f >= at ? 10 : 0)}px)` }}>{f >= at ? txt : '—'}</div>
  );
  const keepRow = 4;
  return (
    <div style={{ position: 'absolute', left: 56, top: y, width: 928, opacity: outExpo((f - a) / 14) * (1 - o) }}>
      <div style={{ position: 'absolute', left: 0, top: 0, width: 928, height: 640, borderRadius: 28, background: 'linear-gradient(160deg, rgba(10,16,28,.84), rgba(10,16,28,.62))', border: `1px solid ${T.glassEdge}` }} />
      <div style={{ position: 'absolute', left: 384, top: 26, width: 250, textAlign: 'right', fontFamily: T.font, fontSize: 22, fontWeight: 900, letterSpacing: 4, color: f < B.c2.s ? T.gold : T.mute }}>SALARY</div>
      <div style={{ position: 'absolute', left: 650, top: 26, width: 250, textAlign: 'right', fontFamily: T.font, fontSize: 22, fontWeight: 900, letterSpacing: 4, color: f >= B.c2.s && f < B.c3.s ? T.gold : T.mute }}>DIVIDENDS</div>
      {rows.map(([lab, s, sAt, d, dAt, c], i) => (
        <div key={lab} style={{ position: 'absolute', left: 0, top: 80 + i * 70, width: 928, height: 60 }}>
          <div style={{ position: 'absolute', left: 32, top: 12, fontFamily: T.font, fontSize: 22, fontWeight: 800, color: T.soft }}>{lab}</div>
          {cell(s, sAt, 384, i === 0 ? T.white : c)}
          {cell(d, dAt, 650, i === 0 ? T.white : c)}
          <div style={{ position: 'absolute', left: 24, right: 24, bottom: 0, height: 1, background: 'rgba(255,255,255,.08)' }} />
        </div>
      ))}
      <div style={{ position: 'absolute', left: 0, top: 80 + keepRow * 70 + 6, width: 928, height: 74, background: 'rgba(127,224,168,.08)' }}>
        <div style={{ position: 'absolute', left: 32, top: 20, fontFamily: T.font, fontSize: 26, fontWeight: 900, color: T.white }}>YOU KEEP</div>
        {cell(money(X.sal_keep), Q.s_keep, 384, GREEN, true)}
        {cell(money(X.div_keep), Q.d_keep, 650, GREEN, true)}
      </div>
      {f >= Q.bought && (
        <div style={{ position: 'absolute', left: 32, top: 470, width: 864, display: 'flex', gap: 16 }}>
          {[['INTO CPP → PENSION', X.cpp_total, Q.cpp], ['RRSP ROOM CREATED', X.rrsp_room, Q.rrsp]].map(([t, v, at]) => (
            <div key={t as string} style={{ flex: 1, height: 130, borderRadius: 18, position: 'relative', background: 'linear-gradient(160deg, rgba(241,199,91,.18), rgba(12,18,30,.7))', border: `1.5px solid ${f >= (at as number) ? T.gold : T.glassEdge}`,
              opacity: ease(f, (at as number) - 6, (at as number) + 4), transform: `translateY(${(1 - outExpo((f - (at as number) + 6) / 12)) * 30}px)` }}>
              <div style={{ position: 'absolute', left: 20, top: 14, fontFamily: T.font, fontSize: 16, fontWeight: 900, letterSpacing: 2, color: T.gold }}>{t}</div>
              <div style={{ position: 'absolute', left: 20, top: 48, fontFamily: T.font, fontSize: 52, fontWeight: 900, color: T.white, fontVariantNumeric: 'tabular-nums' }}>{money((v as number) * clamp(outExpo((f - (at as number)) / 18)))}</div>
            </div>
          ))}
        </div>
      )}
      <Stamp f={f} at={Q.bought} text={`The ${money(GAP)} bought something`} x={330} y={-46} size={24} color={T.gold} rotate={-3} />
    </div>
  );
};

// ---------- reveal: the mix slider ----------
const Mix = ({ f }: { f: number }) => {
  const a = B.reveal.s, b = B.action.s;
  if (f < a || f > b + 14) return null;
  const o = ease(f, b - 2, b + 12), y = L.mix.y;
  const t = (f - Q.mix) / 24;
  const knob = f < Q.mix ? 0.5 : 0.5 + 0.32 * Math.sin(t * 1.4) * Math.exp(-Math.max(0, t) * 0.25);
  const W = 760;
  return (
    <div style={{ opacity: 1 - o }}>
      <div style={{ position: 'absolute', left: 56, top: y, width: 928, height: 470, borderRadius: 28, background: 'linear-gradient(160deg, rgba(10,16,28,.84), rgba(10,16,28,.6))', border: `1px solid ${T.glassEdge}`, opacity: ease(f, a, a + 10) }} />
      <div style={{ position: 'absolute', left: 80, width: 880, top: y + 40, textAlign: 'center', fontFamily: T.font, fontSize: 30, fontWeight: 900, letterSpacing: 3, color: T.white }}>NOT EITHER / OR</div>
      <div style={{ position: 'absolute', left: 140, top: y + 170, width: W, height: 26, borderRadius: 13, background: `linear-gradient(90deg, ${T.gold}, rgba(150,180,230,.9))`, opacity: ease(f, a + 4, a + 14) }} />
      <div style={{ position: 'absolute', left: 140 + W * knob - 34, top: y + 149, width: 68, height: 68, borderRadius: 34, background: '#f4f2ec', boxShadow: '0 10px 30px rgba(0,0,0,.5)', opacity: ease(f, a + 8, a + 16) }} />
      <div style={{ position: 'absolute', left: 140, top: y + 230, fontFamily: T.font, fontSize: 24, fontWeight: 900, color: T.gold }}>SALARY</div>
      <div style={{ position: 'absolute', left: 140 + W - 200, width: 200, textAlign: 'right', top: y + 230, fontFamily: T.font, fontSize: 24, fontWeight: 900, color: 'rgba(170,195,235,1)' }}>DIVIDENDS</div>
      <div style={{ position: 'absolute', left: 140, top: y + 280, width: W, display: 'flex', justifyContent: 'space-between', fontFamily: T.font, fontSize: 20, fontWeight: 700, color: T.soft, opacity: ease(f, Q.later - 10, Q.later + 4) }}>
        <span>CPP · RRSP room · steady pay</span><span>cash now · fewer deductions</span>
      </div>
      <div style={{ position: 'absolute', left: 80, width: 880, top: y + 360, textAlign: 'center', fontFamily: T.font, fontSize: 26, fontWeight: 800, color: T.white, opacity: ease(f, Q.later - 4, Q.later + 8) }}>the right mix = what you need <span style={{ ...goldFill }}>now</span> and <span style={{ ...goldFill }}>later</span></div>
    </div>
  );
};

// ---------- action + end: EI card ----------
const EI = ({ f }: { f: number }) => {
  const a = B.action.s;
  if (f < a - 2) return null;
  const y = L.ei.y;
  return (
    <div style={{ position: 'absolute', left: 80, top: y, width: 880 }}>
      <div style={{ position: 'absolute', left: 0, top: 0, width: 880, height: 290, borderRadius: 26, background: 'linear-gradient(160deg, rgba(10,16,28,.86), rgba(10,16,28,.64))', border: `1px solid ${T.glassEdge}`, opacity: ease(f, a, a + 12) }}>
        <div style={{ position: 'absolute', left: 36, top: 28, fontFamily: T.font, fontSize: 18, fontWeight: 900, letterSpacing: 4, color: T.gold }}>OWNER ON SALARY</div>
        <div style={{ position: 'absolute', left: 36, top: 70, display: 'flex', alignItems: 'baseline', gap: 18, opacity: ease(f, Q.forty - 4, Q.forty + 6) }}>
          <span style={{ fontFamily: T.font, fontSize: 84, fontWeight: 900, ...goldFill }}>&gt;{Math.round(X.ei_share * 100)}%</span>
          <span style={{ fontFamily: T.font, fontSize: 26, fontWeight: 800, color: T.white }}>of the voting shares</span>
        </div>
        <div style={{ position: 'absolute', left: 36, top: 186, fontFamily: T.font, fontSize: 30, fontWeight: 900, color: T.white, opacity: ease(f, Q.ei - 4, Q.ei + 6) }}>→ salary is not insurable for EI</div>
        <div style={{ position: 'absolute', left: 36, top: 232, fontFamily: T.font, fontSize: 20, fontWeight: 700, color: T.soft, opacity: ease(f, Q.plan - 6, Q.plan + 6) }}>Plan the salary / dividend mix with an accountant</div>
      </div>
      <div style={{ position: 'absolute', left: 0, top: 330, display: 'flex', alignItems: 'center', gap: 18, opacity: ease(f, Q.next - 4, Q.next + 8) }}>
        <Flag f={f} w={90} amp={0.06} />
        <div style={{ display: 'inline-flex', padding: '16px 28px', borderRadius: 999, background: `linear-gradient(160deg,${T.goldHi},${T.gold} 50%,${T.goldDeep})`, color: '#1d1503', fontFamily: T.font, fontSize: 28, fontWeight: 900,
          transform: `scale(${1 + 0.03 * Math.sin((f - a) / 6)})` }}>NEXT: SPOUSAL RRSPs →</div>
      </div>
      <div style={{ position: 'absolute', left: 0, top: 420, fontFamily: T.font, fontSize: 26, fontWeight: 700, color: T.white, textShadow, opacity: ease(f, Q.follow, Q.follow + 10) }}>Follow so you don't miss it</div>
      <div style={{ position: 'absolute', left: 0, top: 470, width: 880, fontFamily: T.font, fontSize: 18, fontWeight: 600, color: T.mute, lineHeight: 1.45, opacity: ease(f, a + 20, a + 34) }}>
        Source: Income Tax Act ss. 82(1)(b), 121, 146(1); Manitoba Income Tax Act s. 4.7; CPP Act ss. 12–13; EI Act s. 5(2)(b); CRA 2026 rates · example: $100,000 company profit, single owner, Manitoba {DATA.tax_year} · general info, not advice
      </div>
    </div>
  );
};

const Header = ({ f }: { f: number }) => (
  <div style={{ position: 'absolute', left: 80, top: 92, right: 80, display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: T.white, fontSize: 22, fontWeight: 800, letterSpacing: 4, fontFamily: T.font }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}><Flag f={f} w={72} />TAX SECRETS CANADA</div>
    <div style={{ color: T.gold, letterSpacing: 5 }}>PAY YOURSELF · {DATA.tax_year}</div>
  </div>
);

export const C2V3 = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: T.navy, fontFamily: T.font, overflow: 'hidden' }}>
      <SceneCuts f={f} cuts={CUTS} scene={(i) => i === 0 ? (
        <PhotoPlate f={f} src="plates/c2-s1-4k.jpg" iw={PW} ih={PH} keys={K1} glide={40} blur={0.8 + 4 * (1 - ease(f, 0, 20))} steam={{ u: 0.36, v: 0.43, w: 0.03 }} snow={[{ u0: 0.0, v0: 0.0, u1: 0.9, v1: 0.16 }]} />
      ) : i === 1 ? (
        <PhotoPlate f={f} src="plates/c2-s2-4k.jpg" iw={PW} ih={PH} keys={K2} glide={50} blur={0.8} />
      ) : (
        <PhotoPlate f={f} src="plates/c2-s3-4k.jpg" iw={PW} ih={PH} keys={K3} glide={40} blur={0.8} snow={[{ u0: 0.72, v0: 0.0, u1: 1.0, v1: 0.3 }]} />
      )} />
      <Depth f={f} seed={f < B.c2.s ? 70 : f < B.reveal.s ? 71 : 72} warm={0.6} />
      <NavyGrade low={f >= B.action.s ? 1.2 : 1} />
      <Header f={f} />
      <Typed f={f} caps={CAPS} head={T.font} />
      {f < B.c1.s + 20 && <Hook f={f} />}
      <Table f={f} />
      <Mix f={f} />
      <EI f={f} />
      <Captions f={f} fps={C2FPS} beats={WORDS.beats as never} from={B.c1.s} until={B.action.s} y={1296} />
    </AbsoluteFill>
  );
};
