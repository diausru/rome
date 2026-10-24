// R5 "Pension income splitting: move it on paper" — investigation format, motion engine v1 (2026-10-24).
// Variety vs D4 / C2 / C1 (CLAUDE.md "Variety"): hook = two tax returns side by side with a $40,000 pension strip
// sliding from PAT's return to JO's; main visual = two income tubes (communicating vessels) that level out at $60K;
// exceptions = a sorting tray of four chips (✕ CPP, ✕ OAS, ✕ RRIF under 65, ✓ workplace life pension);
// reveal = the cheque envelope stays with Pat while a T1032 card ticks both returns + EVERY YEAR stamp;
// end = next pill + sources. Numbers come from r5/data.json.
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { PhotoPlate, SceneCuts, type Focus } from './Plate';
import { Flag } from './RaiseShort';
import { Typed, beatsFrom, type Cap } from './Kit';
import TL from './r5-timeline.json';
import WORDS from './r5-words.json';
import CUE from './r5-cues.json';
import DATA from '../../r5/data.json';
import REEL from '../../r5/reel.json';
import { T, goldFill, textShadow } from './motion/brand';
import { Captions, Depth, Kinetic, NavyGrade, Stamp, clamp, ease, money, outBack, outExpo } from './motion/Reel';

export const R5FPS = 24;
const B = beatsFrom(TL, R5FPS);
export const R5DUR = Math.ceil((TL.total + REEL.hold_after_vo) * R5FPS);
const Q = Object.fromEntries(Object.entries(CUE).map(([k, v]) => [k, Math.round((v as number) * R5FPS)])) as Record<string, number>;

const X = DATA.example;
const RED = T.redSoft, GREEN = T.green;
const PW = 2294, PH = 4096;

const CUTS = [B.exc.s, B.reveal.s];
const L = Object.fromEntries(Object.entries(REEL.layout).map(([k, v]) => [k, { x: v.box[0], y: v.box[1], w: v.box[2], h: v.box[3] }])) as Record<string, { x: number; y: number; w: number; h: number }>;
const K1: Focus[] = [{ f: 0, u: 0.5, v: 0.3, k: 1.14 }, { f: B.c1.s, u: 0.3, v: 0.26, k: 1.22 }, { f: B.c2.s, u: 0.62, v: 0.28, k: 1.2 }, { f: B.c3.s, u: 0.7, v: 0.3, k: 1.26 }];
const K2: Focus[] = [{ f: 0, u: 0.5, v: 0.32, k: 1.18 }, { f: Q.work, u: 0.6, v: 0.6, k: 1.1 }];
const K3: Focus[] = [{ f: 0, u: 0.45, v: 0.36, k: 1.2 }, { f: Q.form, u: 0.5, v: 0.3, k: 1.12 }, { f: B.cta.s, u: 0.5, v: 0.32, k: 1.05 }];

const CAPS: Cap[] = [
  { at: B.c1.s, l1: 'THE COUPLE', l2: `both 66 · Manitoba ${DATA.tax_year}`, until: B.c2.s - 2 },
  { at: B.c2.s, l1: 'THE RULE', l2: 'up to half of eligible pension', until: B.c3.s - 2 },
  { at: B.c3.s, l1: 'THE BONUS', l2: "Jo's pension credit", until: B.exc.s - 2 },
  { at: B.exc.s, l1: "WHAT DOESN'T COUNT", l2: 'and what does', until: B.reveal.s - 2 },
  { at: B.reveal.s, l1: 'THE TWIST', l2: 'on paper only', until: B.cta.s - 2 },
];

const glass = { background: 'linear-gradient(160deg, rgba(10,16,28,.86), rgba(10,16,28,.62))', border: `1px solid ${T.glassEdge}` };
const label = (c: string) => ({ fontFamily: T.font, fontSize: 18, fontWeight: 900, letterSpacing: 4, color: c });

// ---------- hook: two returns, a pension strip slides across ----------
const Return = ({ f, x, at, name, inc, after }: { f: number; x: number; at: number; name: string; inc: number; after: number }) => {
  const p = outBack((f - at) / 14), m = outExpo((f - Q.paper - 10) / 18);
  return (
    <div style={{ position: 'absolute', left: x, top: 690, width: 400, height: 420, borderRadius: 18, background: 'rgba(246,242,232,.95)', boxShadow: '0 24px 60px rgba(0,0,0,.45)',
      opacity: clamp(p), transform: `scale(${clamp(p, 0.7, 1.03)}) rotate(${x < 500 ? -1.5 : 1.5}deg)` }}>
      <div style={{ position: 'absolute', left: 28, top: 26, fontFamily: T.font, fontSize: 16, fontWeight: 900, letterSpacing: 3, color: '#5b5446' }}>{DATA.tax_year} RETURN · EXAMPLE</div>
      <div style={{ position: 'absolute', left: 28, top: 58, fontFamily: T.font, fontSize: 52, fontWeight: 900, color: '#141a24' }}>{name}</div>
      {[0, 1, 2].map((i) => <div key={i} style={{ position: 'absolute', left: 28, right: 28, top: 150 + i * 38, height: 10, borderRadius: 5, background: 'rgba(20,26,36,.12)' }} />)}
      <div style={{ position: 'absolute', left: 28, top: 286, fontFamily: T.font, fontSize: 16, fontWeight: 800, letterSpacing: 2, color: '#5b5446' }}>INCOME</div>
      <div style={{ position: 'absolute', left: 28, top: 312, fontFamily: T.font, fontSize: 50, fontWeight: 900, color: '#141a24' }}>{money(Math.round(inc + (after - inc) * clamp(m)))}</div>
    </div>
  );
};
const Hook = ({ f }: { f: number }) => {
  const o = ease(f, B.c1.s - 6, B.c1.s + 8);
  const s = outExpo((f - Q.paper) / 22);
  return (
    <div style={{ opacity: 1 - o }}>
      <Kinetic f={f} at={0} now text={REEL.hook.l1} x={80} y={440} size={66} nowrap />
      <Kinetic f={f} at={0} now text={REEL.hook.l2} x={80} y={520} size={66} nowrap color={T.gold} />
      <Return f={f} x={80} at={Math.min(Q.pat - 6, 6)} name="PAT" inc={X.pat} after={X.each_after} />
      <Return f={f} x={600} at={Math.min(Q.pat, 12)} name="JO" inc={X.jo} after={X.each_after} />
      <div style={{ position: 'absolute', left: 120 + 520 * s, top: 900, width: 330, padding: '16px 0', borderRadius: 12, textAlign: 'center', background: `linear-gradient(160deg,${T.goldHi},${T.gold} 55%,${T.goldDeep})`,
        boxShadow: '0 14px 34px rgba(0,0,0,.45)', fontFamily: T.font, fontSize: 30, fontWeight: 900, color: '#1d1503', opacity: ease(f, Q.pat - 2, Q.pat + 6), transform: `rotate(${-3 + 6 * s}deg)` }}>
        {money(X.split)} PENSION
      </div>
      {f >= Q.save && (
        <div style={{ position: 'absolute', left: 80, width: 920, top: 1140, textAlign: 'center', opacity: ease(f, Q.save, Q.save + 8), transform: `scale(${clamp(outBack((f - Q.save) / 14), 0.7, 1.04)})` }}>
          <span style={{ fontFamily: T.font, fontSize: 64, fontWeight: 900, color: GREEN, textShadow }}>−{money(X.total_saving)}</span>
          <span style={{ fontFamily: T.font, fontSize: 32, fontWeight: 900, color: T.white, textShadow, marginLeft: 16 }}>TAX A YEAR</span>
        </div>
      )}
    </div>
  );
};

// ---------- the two income tubes ----------
const MAXV = 110_000, TH = 470;
const Tubes = ({ f }: { f: number }) => {
  const a = B.c1.s + 2, b = B.exc.s;
  if (f < a - 1 || f > b + 16) return null;
  const o = ease(f, b - 2, b + 14), y = L.tubes.y;
  const flow = outExpo((f - Q.moves) / 40);
  const patNow = X.pat - X.split * flow, joNow = X.jo + X.split * flow;
  const fillP = ease(f, Q.patinc - 4, Q.patinc + 14), fillJ = ease(f, Q.jo - 4, Q.jo + 14);
  const tube = (x: number, name: string, v: number, fill: number, gold: number) => {
    const h = (TH * v * fill) / MAXV, hg = (TH * gold * fill) / MAXV;
    return (
      <div style={{ position: 'absolute', left: x, top: y + 70, width: 200, height: TH + 70 }}>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: TH, borderRadius: 26, background: 'rgba(255,255,255,.06)', border: `2px solid ${T.glassEdge}`, overflow: 'hidden' }}>
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: h, background: 'linear-gradient(180deg, rgba(160,176,200,.55), rgba(90,105,130,.55))' }} />
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: h - hg, height: hg, background: `linear-gradient(180deg, ${T.goldHi}, ${T.goldDeep})` }} />
        </div>
        <div style={{ position: 'absolute', left: 0, right: 0, top: TH + 12, textAlign: 'center', fontFamily: T.font, fontSize: 34, fontWeight: 900, color: T.white, letterSpacing: 3 }}>{name}</div>
        <div style={{ position: 'absolute', left: -40, right: -40, top: TH - h - 54, textAlign: 'center', fontFamily: T.font, fontSize: 38, fontWeight: 900, color: T.white, textShadow, opacity: fill }}>{money(Math.round(v / 100) * 100)}</div>
      </div>
    );
  };
  const level = y + 70 + TH - (TH * X.each_after) / MAXV;
  return (
    <div style={{ opacity: outExpo((f - a) / 14) * (1 - o) }}>
      <div style={{ position: 'absolute', left: 56, top: y - 20, width: 968, height: 660, borderRadius: 28, ...glass }} />
      <div style={{ position: 'absolute', left: 90, top: y, ...label(T.mute) }}>INCOME · EXAMPLE COUPLE · {DATA.tax_year}</div>
      <div style={{ position: 'absolute', left: 90, top: y + 30, display: 'flex', gap: 22, fontFamily: T.font, fontSize: 17, fontWeight: 800, color: T.soft, opacity: ease(f, Q.rpp - 2, Q.rpp + 8) }}>
        <span><span style={{ display: 'inline-block', width: 14, height: 14, borderRadius: 3, background: T.gold, marginRight: 8 }} />workplace pension</span>
        <span><span style={{ display: 'inline-block', width: 14, height: 14, borderRadius: 3, background: 'rgba(160,176,200,.8)', marginRight: 8 }} />CPP + OAS</span>
      </div>
      {tube(130, 'PAT', patNow, fillP, (X.pat_rpp - X.split * flow) * ease(f, Q.rpp - 2, Q.rpp + 10))}
      {tube(430, 'JO', joNow, fillJ, X.split * flow)}
      {f >= Q.half && (
        <svg width={1080} height={200} style={{ position: 'absolute', left: 0, top: y + 90, overflow: 'visible' }}>
          <path d="M 330 60 C 360 10, 400 10, 430 60" stroke={T.gold} strokeWidth={6} fill="none" strokeDasharray="200" strokeDashoffset={200 * (1 - outExpo((f - Q.half) / 14))} />
          <polygon points="430,60 414,46 412,64" fill={T.gold} opacity={ease(f, Q.half + 6, Q.half + 12)} />
        </svg>
      )}
      {f >= Q.half && <div style={{ position: 'absolute', left: 300, width: 160, top: y + 52, textAlign: 'center', fontFamily: T.font, fontSize: 18, fontWeight: 900, color: T.gold, opacity: ease(f, Q.half, Q.half + 8) }}>UP TO 50%</div>}
      {f >= Q.level && (
        <>
          <div style={{ position: 'absolute', left: 110, width: 540, top: level, borderTop: `3px dashed ${GREEN}`, opacity: ease(f, Q.level, Q.level + 8) }} />
          <div style={{ position: 'absolute', left: 300, width: 160, textAlign: 'center', top: level + 14, fontFamily: T.font, fontSize: 18, fontWeight: 900, letterSpacing: 2, color: GREEN, opacity: ease(f, Q.level, Q.level + 8) }}>BOTH {money(X.each_after)}</div>
        </>
      )}
      {f >= Q.less && (
        <div style={{ position: 'absolute', left: 690, top: y + 120, width: 300, opacity: ease(f, Q.less, Q.less + 8), transform: `translateY(${(1 - outExpo((f - Q.less) / 12)) * 20}px)` }}>
          <div style={{ ...label(GREEN), fontSize: 16 }}>LESS BRACKET TAX</div>
          <div style={{ fontFamily: T.font, fontSize: 54, fontWeight: 900, color: GREEN }}>−{money(X.bracket_saving)}</div>
          <div style={{ fontFamily: T.font, fontSize: 16, fontWeight: 700, color: T.soft, lineHeight: 1.35, marginTop: 6 }}>$40K leaves {(X.rate_pat * 100).toFixed(2)}% and lands mostly at {(X.rate_jo * 100).toFixed(1)}%</div>
        </div>
      )}
      {f >= Q.credit && (
        <div style={{ position: 'absolute', left: 690, top: y + 330, width: 300, opacity: ease(f, Q.credit, Q.credit + 8) }}>
          <div style={{ ...label(T.gold), fontSize: 16 }}>JO'S PENSION CREDIT</div>
          <div style={{ fontFamily: T.font, fontSize: 54, fontWeight: 900, ...goldFill }}>−{money(X.pension_credit)}</div>
          <div style={{ fontFamily: T.font, fontSize: 15, fontWeight: 700, color: T.soft, lineHeight: 1.35 }}>$2,000 × 14% + MB $1,000 × 10.8%</div>
        </div>
      )}
      {f >= Q.c388 && <Stamp f={f} at={Q.c388 + 6} text={`= −${money(X.total_saving)} a year`} x={680} y={y + 500} size={26} color={GREEN} rotate={-4} />}
    </div>
  );
};

// ---------- exceptions: the sorting tray ----------
const CHIPS: [string, string, boolean, string][] = [['cpp', 'CPP', false, 'never split here'], ['oas', 'OAS', false, 'never split here'], ['rrif', 'RRIF · UNDER 65', false, 'counts from 65'], ['work', 'WORKPLACE LIFE PENSION', true, 'any age']];
const Sort = ({ f }: { f: number }) => {
  const a = B.exc.s, b = B.reveal.s;
  if (f < a || f > b + 14) return null;
  const o = ease(f, b - 2, b + 12), y = L.sort.y;
  return (
    <div style={{ opacity: ease(f, a, a + 10) * (1 - o) }}>
      <div style={{ position: 'absolute', left: 56, top: y - 20, width: 968, height: 600, borderRadius: 28, ...glass }} />
      <div style={{ position: 'absolute', left: 90, top: y + 4, ...label(T.mute) }}>CAN IT BE SPLIT? · ITA 60.03, 118(7)–(8)</div>
      {CHIPS.map(([id, t, ok, sub], i) => {
        const at = Q[id], p = outBack((f - at) / 12);
        const c = ok ? GREEN : RED;
        return (
          <div key={id} style={{ position: 'absolute', left: 90 + (i % 2) * 450, top: y + 60 + Math.floor(i / 2) * 250, width: 420, height: 220, borderRadius: 22, opacity: clamp(p), transform: `scale(${clamp(p, 0.6, 1.04)})`,
            background: ok ? 'rgba(127,224,168,.14)' : 'rgba(224,57,43,.14)', border: `2px solid ${c}` }}>
            <div style={{ position: 'absolute', left: 26, top: 22, fontFamily: T.font, fontSize: 66, fontWeight: 900, color: c }}>{ok ? '✓' : '✕'}</div>
            <div style={{ position: 'absolute', left: 26, right: 20, top: 108, fontFamily: T.font, fontSize: ok ? 28 : 34, fontWeight: 900, lineHeight: 1.1, color: T.white }}>{t}</div>
            <div style={{ position: 'absolute', left: 26, top: 178, fontFamily: T.font, fontSize: 18, fontWeight: 800, color: T.soft }}>{sub}</div>
          </div>
        );
      })}
    </div>
  );
};

// ---------- reveal: the cheque stays, the form moves ----------
const Form = ({ f }: { f: number }) => {
  const a = B.reveal.s, b = B.cta.s;
  if (f < a || f > b + 14) return null;
  const o = ease(f, b - 2, b + 12), y = L.form.y;
  const tick = (at: number, t: string, i: number) => (
    <div style={{ position: 'absolute', left: 36, top: 150 + i * 62, display: 'flex', alignItems: 'center', gap: 16, opacity: ease(f, at, at + 8) }}>
      <div style={{ width: 40, height: 40, borderRadius: 10, border: `2px solid ${GREEN}`, display: 'grid', placeItems: 'center', fontSize: 28, fontWeight: 900, color: GREEN }}>{f >= at + 4 ? '✓' : ''}</div>
      <div style={{ fontFamily: T.font, fontSize: 30, fontWeight: 800, color: '#141a24' }}>{t}</div>
    </div>
  );
  return (
    <div style={{ opacity: 1 - o }}>
      <div style={{ position: 'absolute', left: 80, top: y, width: 400, height: 250, borderRadius: 18, ...glass, opacity: ease(f, Q.cheque - 4, Q.cheque + 8), transform: `translateX(${(1 - outExpo((f - Q.cheque) / 14)) * -60}px)` }}>
        <div style={{ position: 'absolute', left: 28, top: 26, ...label(T.gold), fontSize: 16 }}>THE PENSION CHEQUE</div>
        <div style={{ position: 'absolute', left: 28, top: 70, fontFamily: T.font, fontSize: 46, fontWeight: 900, color: T.white }}>→ PAT</div>
        <div style={{ position: 'absolute', left: 28, top: 140, right: 20, fontFamily: T.font, fontSize: 22, fontWeight: 800, color: T.soft, lineHeight: 1.3 }}>no money moves between the couple</div>
      </div>
      <div style={{ position: 'absolute', left: 500, top: y - 10, width: 500, height: 440, borderRadius: 18, background: 'rgba(246,242,232,.96)', boxShadow: '0 24px 60px rgba(0,0,0,.45)',
        opacity: ease(f, Q.form - 4, Q.form + 8), transform: `translateY(${(1 - outExpo((f - Q.form) / 16)) * 40}px) rotate(1deg)` }}>
        <div style={{ position: 'absolute', left: 36, top: 30, fontFamily: T.font, fontSize: 18, fontWeight: 900, letterSpacing: 3, color: '#5b5446' }}>FORM T1032</div>
        <div style={{ position: 'absolute', left: 36, top: 62, right: 30, fontFamily: T.font, fontSize: 30, fontWeight: 900, lineHeight: 1.1, color: '#141a24' }}>Joint election to split pension income</div>
        {tick(Q.both, "with Pat's return", 0)}
        {tick(Q.both + 8, "with Jo's return", 1)}
        {tick(Q.every - 4, `amount: ${money(X.split)}`, 2)}
      </div>
      {f >= Q.every && <Stamp f={f} at={Q.every} text="EVERY YEAR" x={560} y={y + 380} size={34} color={T.red} rotate={-6} />}
      <div style={{ position: 'absolute', left: 80, width: 920, top: y + 460, padding: '12px 18px', borderRadius: 14, background: 'rgba(10,16,28,.82)', fontFamily: T.font, fontSize: 18, fontWeight: 700, color: T.mute, lineHeight: 1.4, opacity: ease(f, Q.both, Q.both + 12) }}>
        filed by each return's due date · one joint election per year · canada.ca, Pension income splitting
      </div>
    </div>
  );
};

// ---------- end ----------
const End = ({ f }: { f: number }) => {
  const a = B.cta.s;
  if (f < a - 2) return null;
  const y = L.end.y;
  return (
    <div style={{ position: 'absolute', left: 80, top: y, width: 880 }}>
      <div style={{ position: 'absolute', left: 0, top: 0, width: 880, height: 230, borderRadius: 26, ...glass, opacity: ease(f, a, a + 12) }}>
        <div style={{ position: 'absolute', left: 36, top: 28, ...label(T.gold) }}>CHECK YOURS</div>
        <div style={{ position: 'absolute', left: 36, top: 66, right: 36, fontFamily: T.font, fontSize: 32, fontWeight: 900, lineHeight: 1.15, color: T.white }}>Whose pension qualifies, your ages at Dec 31, and T1032 on both returns</div>
      </div>
      <div style={{ position: 'absolute', left: 0, top: 270, display: 'flex', alignItems: 'center', gap: 18, opacity: ease(f, Q.next - 4, Q.next + 8) }}>
        <Flag f={f} w={90} amp={0.06} />
        <div style={{ display: 'inline-flex', padding: '16px 28px', borderRadius: 999, background: `linear-gradient(160deg,${T.goldHi},${T.gold} 50%,${T.goldDeep})`, color: '#1d1503', fontFamily: T.font, fontSize: 28, fontWeight: 900,
          transform: `scale(${1 + 0.03 * Math.sin((f - a) / 6)})` }}>NEXT: DISABILITY TAX CREDIT →</div>
      </div>
      <div style={{ position: 'absolute', left: 0, top: 360, fontFamily: T.font, fontSize: 26, fontWeight: 700, color: T.white, textShadow, opacity: ease(f, Q.follow, Q.follow + 10) }}>Follow so you don't miss it</div>
      <div style={{ position: 'absolute', left: -10, top: 410, width: 900, padding: '14px 18px', borderRadius: 14, background: 'rgba(10,16,28,.84)', fontFamily: T.font, fontSize: 18, fontWeight: 600, color: T.mute, lineHeight: 1.45, opacity: ease(f, a + 6, a + 20) }}>
        Source: Income Tax Act ss. 60.03, 118(3), 118(7)–(8); CRA {DATA.tax_year} federal + Manitoba rates; canada.ca Pension income splitting · example couple; age amount and OAS recovery not included · general info, not advice
      </div>
    </div>
  );
};

const Header = ({ f }: { f: number }) => (
  <div style={{ position: 'absolute', left: 80, top: 92, right: 80, display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: T.white, fontSize: 22, fontWeight: 800, letterSpacing: 4, fontFamily: T.font }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}><Flag f={f} w={72} />TAX SECRETS CANADA</div>
    <div style={{ color: T.gold, letterSpacing: 5 }}>PENSION SPLITTING · {DATA.tax_year}</div>
  </div>
);

export const R5V3 = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: T.navy, fontFamily: T.font, overflow: 'hidden' }}>
      <SceneCuts f={f} cuts={CUTS} scene={(i) => i === 0 ? (
        <PhotoPlate f={f} src="plates/r5-s1-4k.jpg" iw={PW} ih={PH} keys={K1} glide={40} blur={0.8 + 4 * (1 - ease(f, 0, 20))} steam={{ u: 0.25, v: 0.47, w: 0.03 }} snow={[{ u0: 0.4, v0: 0.0, u1: 1.0, v1: 0.3 }]} />
      ) : i === 1 ? (
        <PhotoPlate f={f} src="plates/r5-s2-4k.jpg" iw={PW} ih={PH} keys={K2} glide={50} blur={0.8} steam={{ u: 0.06, v: 0.55, w: 0.025 }} />
      ) : (
        <PhotoPlate f={f} src="plates/r5-s3-4k.jpg" iw={PW} ih={PH} keys={K3} glide={40} blur={0.8} snow={[{ u0: 0.0, v0: 0.0, u1: 1.0, v1: 0.6 }]} />
      )} />
      <Depth f={f} seed={f < B.exc.s ? 90 : f < B.reveal.s ? 91 : 92} warm={0.6} />
      <NavyGrade low={f >= B.cta.s ? 1.2 : 1} />
      <Header f={f} />
      <Typed f={f} caps={CAPS} head={T.font} />
      {f < B.c1.s + 20 && <Hook f={f} />}
      <Tubes f={f} />
      <Sort f={f} />
      <Form f={f} />
      <End f={f} />
      <Captions f={f} fps={R5FPS} beats={WORDS.beats as never} from={B.c1.s} until={B.cta.s} y={1296} />
    </AbsoluteFill>
  );
};
