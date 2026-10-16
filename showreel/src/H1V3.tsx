// H1 "Manitoba pays you even at $0 tax: MB479 credits" — investigation format, motion engine v1 (2026-10-16).
// Variety vs A9 / A2 / A8 (CLAUDE.md "Variety"): hook = a TAX OWING meter that sits at $0 while a green payout slip
// slides out of it; main visual = three payout columns that grow per case (count-up) under one detail card per case;
// reveal = a two-way switch (non-refundable vs refundable at $0 tax); end = a three-item checklist + next pill.
// Numbers come from h1/data.json.
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { PhotoPlate, SceneCuts, type Focus } from './Plate';
import { Flag } from './RaiseShort';
import { Typed, beatsFrom, type Cap } from './Kit';
import TL from './h1-timeline.json';
import WORDS from './h1-words.json';
import CUE from './h1-cues.json';
import DATA from '../../h1/data.json';
import REEL from '../../h1/reel.json';
import { T, goldFill, textShadow } from './motion/brand';
import { Captions, Depth, Glass, Kinetic, NavyGrade, Stamp, Tag, clamp, ease, money, outBack, outExpo } from './motion/Reel';

export const H1FPS = 24;
const B = beatsFrom(TL, H1FPS);
export const H1DUR = Math.ceil((TL.total + REEL.hold_after_vo) * H1FPS);
const Q = Object.fromEntries(Object.entries(CUE).map(([k, v]) => [k, Math.round((v as number) * H1FPS)])) as Record<string, number>;

const X = DATA.example;
const FERT = X.fert_paid * X.fert_rate;
const HATC = Math.min(X.hatc_max, X.school_tax);
const GREEN = T.green;
const PW = 2294, PH = 4096;

const CUTS = [B.c2.s, B.c3.s];
const L = Object.fromEntries(Object.entries(REEL.layout).map(([k, v]) => [k, { x: v.box[0], y: v.box[1], w: v.box[2], h: v.box[3] }])) as Record<string, { x: number; y: number; w: number; h: number }>;
const K1: Focus[] = [{ f: 0, u: 0.4, v: 0.3, k: 1.16 }, { f: B.c1.s, u: 0.32, v: 0.26, k: 1.24 }];
const K2: Focus[] = [{ f: 0, u: 0.55, v: 0.24, k: 1.22 }, { f: Q.k8, u: 0.6, v: 0.3, k: 1.14 }];
const K3: Focus[] = [{ f: 0, u: 0.55, v: 0.28, k: 1.2 }, { f: B.reveal.s, u: 0.6, v: 0.36, k: 1.1 }, { f: B.cta.s, u: 0.55, v: 0.3, k: 1.05 }];

const CAPS: Cap[] = [
  { at: B.c1.s, l1: 'CASE 1', l2: 'primary caregiver', until: B.c2.s - 2 },
  { at: B.c2.s, l1: 'CASE 2', l2: 'fertility treatment', until: B.c3.s - 2 },
  { at: B.c3.s, l1: 'CASE 3', l2: 'homeowners affordability', until: B.reveal.s - 2 },
  { at: B.reveal.s, l1: 'THE TWIST', l2: 'refundable means paid out', until: B.action.s - 2 },
];

// ---------- hook: the $0 meter and the payout slip ----------
const Hook = ({ f }: { f: number }) => {
  const out = B.c1.s, o = ease(f, out - 6, out + 8);
  const sp = outExpo((f - Q.pay) / 16);
  const needle = -60 + 2 * Math.sin(f / 9) * (1 - ease(f, Q.zero, Q.zero + 10));
  return (
    <div style={{ opacity: 1 - o }}>
      <Kinetic f={f} at={0} now text={REEL.hook.l1} x={80} y={470} size={70} nowrap />
      <Kinetic f={f} at={0} now text={REEL.hook.l2} x={80} y={552} size={66} nowrap color={T.gold} />
      <div style={{ position: 'absolute', left: 80, top: 660, width: 460, height: 320, borderRadius: 28, background: 'linear-gradient(160deg, rgba(14,20,34,.9), rgba(10,14,24,.76))', border: `1.5px solid ${T.glassEdge}`, boxShadow: '0 30px 70px rgba(0,0,0,.5)' }}>
        <div style={{ position: 'absolute', left: 30, top: 22, fontFamily: T.font, fontSize: 20, fontWeight: 900, letterSpacing: 4, color: T.mute }}>MANITOBA TAX OWING</div>
        <svg width={460} height={200} style={{ position: 'absolute', left: 0, top: 50 }}>
          <path d="M 80 170 A 150 150 0 0 1 380 170" stroke="rgba(255,255,255,.14)" strokeWidth={18} fill="none" strokeLinecap="round" />
          <g transform={`translate(230 170) rotate(${needle})`}><line x1={0} y1={0} x2={0} y2={-128} stroke={T.gold} strokeWidth={6} strokeLinecap="round" /></g>
          <circle cx={230} cy={170} r={12} fill={T.gold} />
        </svg>
        <div style={{ position: 'absolute', left: 0, width: 460, top: 236, textAlign: 'center', fontFamily: T.font, fontSize: 64, fontWeight: 900, color: T.white }}>$0</div>
      </div>
      {f >= Q.pay - 2 && (
        <div style={{ position: 'absolute', left: 560 + (1 - sp) * -220, top: 700, width: 400, height: 240, borderRadius: 14, background: '#eef6ef', transform: `rotate(${5 - 3 * sp}deg)`, boxShadow: '0 30px 60px rgba(0,0,0,.5)', opacity: sp }}>
          <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 54, borderRadius: '14px 14px 0 0', background: '#1e7a4a' }} />
          <div style={{ position: 'absolute', left: 24, top: 14, fontFamily: T.font, fontSize: 22, fontWeight: 900, letterSpacing: 4, color: '#fff' }}>PAID TO YOU</div>
          <div style={{ position: 'absolute', left: 24, top: 82, fontFamily: T.font, fontSize: 70, fontWeight: 900, color: '#1e7a4a' }}>+ $ ?</div>
          {[0.8, 0.55].map((w, i) => <div key={i} style={{ position: 'absolute', left: 24, top: 176 + i * 26, width: 340 * w, height: 10, borderRadius: 5, background: '#c3d3c6' }} />)}
        </div>
      )}
      <Tag f={f} at={Q.three} text="CAREGIVER" x={90} y={1040} from="left" seed={1} />
      <Tag f={f} at={Q.three + 5} text="FERTILITY" x={380} y={1040} from="up" seed={2} />
      <Tag f={f} at={Q.three + 10} text="HOMEOWNER" x={660} y={1040} from="right" seed={3} />
      {f >= Q.form - 2 && (
        <div style={{ position: 'absolute', left: 80, width: 880, top: 1150, textAlign: 'center', opacity: ease(f, Q.form - 2, Q.form + 8) }}>
          <span style={{ fontFamily: T.font, fontSize: 30, fontWeight: 800, letterSpacing: 4, color: T.white, textShadow }}>ONE FORM: </span>
          <span style={{ fontFamily: T.font, fontSize: 56, fontWeight: 900, ...goldFill }}>MB479</span>
        </div>
      )}
    </div>
  );
};

// ---------- cases: detail card + three payout columns ----------
const Detail = ({ f }: { f: number }) => {
  const y = L.stack.y, h = 270;
  const line = (at: number, txt: string, size = 26, color: string = T.white) => (
    <div style={{ fontFamily: T.font, fontSize: size, fontWeight: 800, color, lineHeight: 1.3, opacity: ease(f, at, at + 8), transform: `translateY(${(1 - outExpo((f - at) / 10)) * 14}px)` }}>{txt}</div>
  );
  return (
    <>
      <Glass f={f} a={B.c1.s + 4} b={B.c2.s - 2} y={y} h={h} w={L.stack.w} label="Primary caregiver tax credit" enter="slideL" exit="fade" lit={ease(f, Q.k14, Q.k14 + 8)}>
        <div style={{ position: 'absolute', left: 40, top: 70, right: 40, display: 'grid', gap: 6 }}>
          {line(B.c1.s + 10, '✓ unpaid care at home · care level 2+')}
          {line(Q.days, `✓ more than ${X.care_days} days`)}
          {line(Q.reg, '✓ registered with Manitoba Finance', 26, T.gold)}
          {line(Q.k14, `= ${money(X.caregiver)} a year · flat · not income-tested`, 26, GREEN)}
        </div>
      </Glass>
      <Glass f={f} a={B.c2.s + 4} b={B.c3.s - 2} y={y} h={h} w={L.stack.w} label="Fertility treatment tax credit" enter="wipe" exit="fade" lit={ease(f, Q.k8, Q.k8 + 8)}>
        <div style={{ position: 'absolute', left: 40, top: 76, right: 40 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, fontFamily: T.font, fontWeight: 900, color: T.white }}>
            <span style={{ fontSize: 52, opacity: ease(f, Q.paid, Q.paid + 8) }}>{money(X.fert_paid)}</span>
            <span style={{ fontSize: 40, color: T.soft, opacity: ease(f, Q.pct, Q.pct + 8) }}>× {Math.round(X.fert_rate * 100)}%</span>
            <span style={{ fontSize: 52, color: GREEN, opacity: ease(f, Q.k8, Q.k8 + 8) }}>= {money(FERT)}</span>
          </div>
          <div style={{ position: 'relative', marginTop: 22, height: 26, borderRadius: 13, background: 'rgba(255,255,255,.1)', opacity: ease(f, Q.paid, Q.paid + 8) }}>
            <div style={{ position: 'absolute', left: 0, top: 0, height: 26, borderRadius: 13, width: `${X.fert_rate * 100 * outExpo((f - Q.pct) / 18)}%`, background: GREEN }} />
          </div>
          {line(Q.pct + 10, `Manitoba clinic · net of insurance · max ${money(X.fert_max_credit)} on ${money(X.fert_max_expenses)}`, 20, T.soft)}
        </div>
      </Glass>
      <Glass f={f} a={B.c3.s + 4} b={B.reveal.s - 2} y={y} h={h} w={L.stack.w} label="Homeowners affordability tax credit" enter="slideR" exit="collapse" collapseTo="50% 100%" lit={ease(f, Q.k16, Q.k16 + 8)}>
        <div style={{ position: 'absolute', left: 40, top: 70, right: 40, display: 'grid', gap: 6 }}>
          {line(Q.bill, '✕ not on the property tax bill (home not designated)', 24, T.redSoft)}
          {line(Q.claim, '→ claim it on the return, Form MB479', 26)}
          {line(Q.k16, `lesser of ${money(X.hatc_max)} and school taxes (${money(X.school_tax)})`, 24, T.soft)}
          {line(Q.k16 + 8, `= ${money(HATC)} for ${DATA.tax_year}  (2025: ${money(X.hatc_2025)})`, 26, GREEN)}
        </div>
      </Glass>
    </>
  );
};

const Columns = ({ f }: { f: number }) => {
  const a = B.c1.s + 8, b = B.reveal.s;
  if (f < a - 1 || f > b + 16) return null;
  const o = ease(f, b - 2, b + 14), top = L.stack.y + 300, H = 300, max = FERT;
  const cols: [string, number, number][] = [['CAREGIVER', Q.k14, X.caregiver], ['FERTILITY', Q.k8, FERT], ['HOMEOWNER', Q.k16, HATC]];
  const active = f >= B.c3.s ? 2 : f >= B.c2.s ? 1 : 0;
  return (
    <div style={{ position: 'absolute', left: 80, top, width: 880, height: H + 50, opacity: outExpo((f - a) / 14) * (1 - o) }}>
      <div style={{ position: 'absolute', left: 0, right: 0, top: H, height: 2, background: T.glassEdge }} />
      {cols.map(([t, at, v], i) => {
        const p = outExpo((f - at) / 20), h = Math.max(6, (H - 70) * (v / max) * p), on = i === active;
        return (
          <div key={t} style={{ position: 'absolute', left: 40 + i * 290, width: 220, top: 0, height: H }}>
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: h, borderRadius: '14px 14px 0 0', background: f >= at ? `linear-gradient(180deg, ${on ? T.gold : 'rgba(127,224,168,.75)'}, rgba(30,122,74,.55))` : 'rgba(255,255,255,.07)', border: `1.5px solid ${on ? T.gold : T.glassEdge}` }} />
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: h + 10, textAlign: 'center', fontFamily: T.font, fontSize: 40, fontWeight: 900, color: f >= at ? T.white : T.mute, textShadow, fontVariantNumeric: 'tabular-nums' }}>{f >= at ? money(v * p) : '…'}</div>
            <div style={{ position: 'absolute', left: -20, right: -20, top: H + 12, textAlign: 'center', fontFamily: T.font, fontSize: 18, fontWeight: 800, letterSpacing: 3, color: on ? T.gold : T.soft, textShadow }}>{t}</div>
          </div>
        );
      })}
    </div>
  );
};

// ---------- reveal: the refundable switch ----------
const Switch = ({ f }: { f: number }) => {
  const a = B.reveal.s, b = B.action.s;
  if (f < a || f > b + 14) return null;
  const o = ease(f, b - 2, b + 12), y = L.switch.y;
  const card = (x: number, at: number, ok: boolean, l1: string, l2: string, res: string) => {
    const p = outBack((f - at) / 12);
    if (f < at) return null;
    return (
      <div style={{ position: 'absolute', left: x, top: y + 110, width: 420, height: 380, borderRadius: 26, background: 'linear-gradient(160deg, rgba(14,20,34,.88), rgba(10,14,24,.74))', border: `2px solid ${ok ? GREEN : T.glassEdge}`,
        transform: `scale(${clamp(p, 0.6, 1.04)})`, opacity: clamp(p, 0, 1) * (ok ? 1 : 0.8) }}>
        <div style={{ position: 'absolute', left: 28, top: 26, fontFamily: T.font, fontSize: 18, fontWeight: 900, letterSpacing: 4, color: ok ? GREEN : T.mute }}>{ok ? 'REFUNDABLE' : 'NON-REFUNDABLE'}</div>
        <div style={{ position: 'absolute', left: 28, top: 64, right: 24, fontFamily: T.font, fontSize: 28, fontWeight: 900, lineHeight: 1.15, color: T.white }}>{l1}</div>
        <div style={{ position: 'absolute', left: 28, top: 170, right: 24, fontFamily: T.font, fontSize: 20, fontWeight: 700, lineHeight: 1.3, color: T.soft }}>{l2}</div>
        <div style={{ position: 'absolute', left: 28, bottom: 26, fontFamily: T.font, fontSize: 46, fontWeight: 900, color: ok ? GREEN : T.mute, opacity: ease(f, Q.money - (ok ? 0 : 20), Q.money + 8) }}>{res}</div>
      </div>
    );
  };
  return (
    <div style={{ opacity: 1 - o }}>
      <div style={{ position: 'absolute', left: 80, width: 880, top: y, textAlign: 'center', fontFamily: T.font, fontSize: 30, fontWeight: 900, letterSpacing: 3, color: T.white, textShadow, opacity: ease(f, a, a + 10) }}>
        TAX OWING: <span style={{ ...goldFill }}>$0</span></div>
      <svg width={1080} height={110} style={{ position: 'absolute', left: 0, top: y + 40, overflow: 'visible' }}>
        <path d={`M 540 10 C 540 60, 290 50, 290 ${10 + 90 * outExpo((f - a - 4) / 16)}`} stroke={T.glassEdge} strokeWidth={6} fill="none" strokeDasharray="14 10" />
        <path d={`M 540 10 C 540 60, 790 50, 790 ${10 + 90 * outExpo((f - a - 4) / 16)}`} stroke={f >= Q.refund ? GREEN : T.glassEdge} strokeWidth={6} fill="none" />
      </svg>
      {card(80, a + 8, false, 'Only cuts tax you owe', 'with nothing owing, nothing to cut', '$0')}
      {card(540, Q.refund, true, 'Paid out to you', 'even with no tax to pay: caregiver, fertility, homeowners', '+ money')}
      <Stamp f={f} at={Q.notax} text="Even at $0 tax" x={620} y={y + 508} size={22} color={GREEN} rotate={-4} />
    </div>
  );
};

// ---------- action + end: checklist ----------
const Check = ({ f }: { f: number }) => {
  const a = B.action.s;
  if (f < a - 2) return null;
  const y = L.check.y;
  const item = (i: number, at: number, t: string, s: string) => {
    const p = outExpo((f - at) / 14);
    if (f < at - 2) return null;
    return (
      <div style={{ position: 'absolute', left: 0, top: i * 96, width: 880, display: 'flex', gap: 22, alignItems: 'center', opacity: p, transform: `translateX(${(1 - p) * -60}px)` }}>
        <div style={{ width: 60, height: 60, borderRadius: 16, display: 'grid', placeItems: 'center', background: 'rgba(127,224,168,.16)', border: `2px solid ${GREEN}`, fontFamily: T.font, fontSize: 34, fontWeight: 900, color: GREEN, flex: 'none' }}>✓</div>
        <div>
          <div style={{ fontFamily: T.font, fontSize: 30, fontWeight: 900, color: T.white, textShadow }}>{t}</div>
          <div style={{ fontFamily: T.font, fontSize: 19, fontWeight: 700, color: T.soft, textShadow }}>{s}</div>
        </div>
      </div>
    );
  };
  return (
    <div style={{ position: 'absolute', left: 80, top: y, width: 880 }}>
      <div style={{ position: 'absolute', left: -24, top: -24, width: 928, height: 330, borderRadius: 26, background: 'linear-gradient(160deg, rgba(10,16,28,.82), rgba(10,16,28,.6))', border: `1px solid ${T.glassEdge}`, opacity: ease(f, a, a + 12) }} />
      {item(0, Q.check, 'ATTACH FORM MB479', 'Manitoba Credits, filed with your return')}
      {item(1, Q.check + 18, 'CAREGIVER? REGISTER FIRST', 'registration form to Manitoba Finance, then claim')}
      {item(2, Q.back, `MISSED ONE? UP TO ${X.years_back} YEARS BACK`, 'for most MB479 credits')}
      <div style={{ position: 'absolute', left: 0, top: 340, display: 'flex', alignItems: 'center', gap: 18, opacity: ease(f, Q.next - 4, Q.next + 8) }}>
        <Flag f={f} w={90} amp={0.06} />
        <div style={{ display: 'inline-flex', padding: '16px 28px', borderRadius: 999, background: `linear-gradient(160deg,${T.goldHi},${T.gold} 50%,${T.goldDeep})`, color: '#1d1503', fontFamily: T.font, fontSize: 28, fontWeight: 900,
          transform: `scale(${1 + 0.03 * Math.sin((f - a) / 6)})` }}>NEXT: SOLE PROP OR CORPORATION? →</div>
      </div>
      <div style={{ position: 'absolute', left: 0, top: 430, fontFamily: T.font, fontSize: 26, fontWeight: 700, color: T.white, textShadow, opacity: ease(f, Q.follow, Q.follow + 10) }}>Follow so you don't miss it</div>
      <div style={{ position: 'absolute', left: 0, top: 480, width: 880, fontFamily: T.font, fontSize: 18, fontWeight: 600, color: T.mute, lineHeight: 1.45, opacity: ease(f, a + 20, a + 34) }}>
        Source: Manitoba Finance (gov.mb.ca, personal tax credits; primary caregiver tax credit); CRA Manitoba information guide, Form MB479 · {DATA.tax_year} amounts · example cases · general info, not advice
      </div>
    </div>
  );
};

const Header = ({ f }: { f: number }) => (
  <div style={{ position: 'absolute', left: 80, top: 92, right: 80, display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: T.white, fontSize: 22, fontWeight: 800, letterSpacing: 4, fontFamily: T.font }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}><Flag f={f} w={72} />TAX SECRETS CANADA</div>
    <div style={{ color: T.gold, letterSpacing: 5 }}>MB479 · {DATA.tax_year}</div>
  </div>
);

export const H1V3 = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: T.navy, fontFamily: T.font, overflow: 'hidden' }}>
      <SceneCuts f={f} cuts={CUTS} scene={(i) => i === 0 ? (
        <PhotoPlate f={f} src="plates/h1-s1-4k.jpg" iw={PW} ih={PH} keys={K1} glide={40} blur={0.8 + 4 * (1 - ease(f, 0, 20))} steam={{ u: 0.48, v: 0.43, w: 0.03 }} />
      ) : i === 1 ? (
        <PhotoPlate f={f} src="plates/h1-s2-4k.jpg" iw={PW} ih={PH} keys={K2} glide={50} blur={0.8} />
      ) : (
        <PhotoPlate f={f} src="plates/h1-s3-4k.jpg" iw={PW} ih={PH} keys={K3} glide={40} blur={0.8} />
      )} />
      <Depth f={f} seed={f < B.c2.s ? 50 : f < B.c3.s ? 51 : 52} warm={0.6} />
      <NavyGrade low={f >= B.action.s ? 1.2 : 1} />
      <Header f={f} />
      <Typed f={f} caps={CAPS} head={T.font} />
      {f < B.c1.s + 20 && <Hook f={f} />}
      <Detail f={f} />
      <Columns f={f} />
      <Switch f={f} />
      <Check f={f} />
      <Captions f={f} fps={H1FPS} beats={WORDS.beats as never} from={B.c1.s} until={B.action.s} y={1296} />
    </AbsoluteFill>
  );
};
