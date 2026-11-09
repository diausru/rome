// R3 "Donations: same gifts, $116 or $145" — motion engine v1 (2026-11-09). Checklist: channel/REEL-CHECKLIST.md.
// Variety vs M30 / R2 / R1: hook = two receipts sliding together into one; main visual = credit jars with two layers
// (first $200 at 14.5% grey, above at 29% gold): two jars, then one bigger jar; re-hook stamp +$29 (57 %);
// reveal = five-year carry-forward strip; end = check card + next pill.
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { PhotoPlate, SceneCuts, type Focus } from './Plate';
import { Flag } from './RaiseShort';
import { Typed, beatsFrom, type Cap } from './Kit';
import TL from './r3-timeline.json';
import WORDS from './r3-words.json';
import CUE from './r3-cues.json';
import DATA from '../../r3/data.json';
import REEL from '../../r3/reel.json';
import { T, goldFill, textShadow } from './motion/brand';
import { Captions, Depth, Kinetic, NavyGrade, Stamp, clamp, ease, money, outBack, outExpo } from './motion/Reel';

export const R3FPS = 24;
const B = beatsFrom(TL, R3FPS);
export const R3DUR = Math.ceil((TL.total + REEL.hold_after_vo) * R3FPS);
const Q = Object.fromEntries(Object.entries(CUE).map(([k, v]) => [k, Math.round((v as number) * R3FPS)])) as Record<string, number>;
const X = DATA.example;
const GREEN = T.green;
const PW = 2294, PH = 4096;
const CUTS = [B.c2.s, B.reveal.s];
const L = Object.fromEntries(Object.entries(REEL.layout).map(([k, v]) => [k, { x: v.box[0], y: v.box[1], w: v.box[2], h: v.box[3] }])) as Record<string, { x: number; y: number; w: number; h: number }>;
const K1: Focus[] = [{ f: 0, u: 0.5, v: 0.3, k: 1.14 }, { f: B.c1.s, u: 0.45, v: 0.28, k: 1.22 }];
const K2: Focus[] = [{ f: 0, u: 0.5, v: 0.32, k: 1.2 }, { f: B.c3.s, u: 0.55, v: 0.3, k: 1.12 }];
const K3: Focus[] = [{ f: 0, u: 0.5, v: 0.34, k: 1.2 }, { f: B.action.s, u: 0.5, v: 0.3, k: 1.08 }];
const CAPS: Cap[] = [
  { at: B.c1.s, l1: 'THE RULE', l2: `federal donation credit · ${DATA.tax_year}`, until: B.c2.s - 2 },
  { at: B.c2.s, l1: 'CLAIMED SEPARATELY', l2: 'two low-rate $200s', until: B.c3.s - 2 },
  { at: B.c3.s, l1: 'ON ONE RETURN', l2: `${money(X.total)} together`, until: B.reveal.s - 2 },
  { at: B.reveal.s, l1: 'THE TWIST', l2: `carry forward up to ${X.years} years`, until: B.action.s - 2 },
];
const glass = { background: 'linear-gradient(160deg, rgba(10,16,28,.86), rgba(10,16,28,.62))', border: `1px solid ${T.glassEdge}` };
const label = (c: string) => ({ fontFamily: T.font, fontSize: 18, fontWeight: 900, letterSpacing: 4, color: c });

const Receipt = ({ x, y, r, o, name, amt }: { x: number; y: number; r: number; o: number; name: string; amt: string }) => (
  <div style={{ position: 'absolute', left: x, top: y, width: 330, height: 400, borderRadius: 10, background: 'rgba(246,242,232,.96)', boxShadow: '0 20px 50px rgba(0,0,0,.45)', opacity: o, transform: `rotate(${r}deg)` }}>
    <div style={{ position: 'absolute', left: 26, top: 24, fontFamily: T.font, fontSize: 15, fontWeight: 900, letterSpacing: 3, color: '#5b5446' }}>OFFICIAL RECEIPT · EXAMPLE</div>
    <div style={{ position: 'absolute', left: 26, top: 60, fontFamily: T.font, fontSize: 40, fontWeight: 900, color: '#141a24' }}>{name}</div>
    {[0, 1, 2].map((i) => <div key={i} style={{ position: 'absolute', left: 26, right: 26, top: 140 + i * 34, height: 9, borderRadius: 5, background: 'rgba(20,26,36,.12)' }} />)}
    <div style={{ position: 'absolute', left: 26, top: 290, fontFamily: T.font, fontSize: 56, fontWeight: 900, color: '#141a24' }}>{amt}</div>
  </div>
);
const Hook = ({ f }: { f: number }) => {
  const m = outExpo((f - Q.c145 + 10) / 18);
  return (
    <div style={{ opacity: 1 - ease(f, B.c1.s - 6, B.c1.s + 8) }}>
      <Kinetic f={f} at={0} now text={REEL.hook.l1} x={80} y={440} size={70} nowrap />
      <Kinetic f={f} at={0} now text={REEL.hook.l2} x={80} y={524} size={70} nowrap color={T.gold} />
      <Receipt x={110 + 120 * m} y={690} r={-6 + 6 * m} o={ease(f, 2, 10) * (1 - 0.6 * m)} name="LEA" amt={money(X.each)} />
      <Receipt x={640 - 300 * m} y={700} r={5 - 5 * m} o={ease(f, 6, 14) * (1 - 0.6 * m)} name="MAX" amt={money(X.each)} />
      {m > 0.05 && <Receipt x={375} y={690} r={0} o={m} name="LEA + MAX" amt={money(X.total)} />}
      {f >= Q.s116 && <div style={{ position: 'absolute', left: 80, width: 920, top: 1120, textAlign: 'center', fontFamily: T.font, fontSize: 46, fontWeight: 900, color: T.white, textShadow, opacity: ease(f, Q.s116, Q.s116 + 8) }}>
        {money(X.sep)} → <span style={{ color: GREEN }}>{f >= Q.c145 ? money(X.comb) : '?'}</span></div>}
    </div>
  );
};

// ---------- credit jars ----------
const Jar = ({ f, x, w, total, at, lbl, credit }: { f: number; x: number; w: number; total: number; at: number; lbl: string; credit: number }) => {
  const H = 430, lowH = (H * 200) / 600, hiH = (H * (total - 200)) / 600, p = outExpo((f - at) / 20);
  return (
    <div style={{ position: 'absolute', left: x, top: 0, width: w, height: H + 120 }}>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: H, borderRadius: '20px 20px 28px 28px', border: `2px solid ${T.glassEdge}`, background: 'rgba(255,255,255,.05)', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: lowH * p, background: 'rgba(140,150,170,.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: T.font, fontSize: 18, fontWeight: 900, color: '#0b1220' }}>$200 · 14.5%</div>
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: lowH * p, height: hiH * p, background: `linear-gradient(180deg, ${T.goldHi}, ${T.goldDeep})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: T.font, fontSize: 20, fontWeight: 900, color: '#1d1503' }}>{money(total - 200)} · 29%</div>
      </div>
      <div style={{ position: 'absolute', left: -20, right: -20, top: H + 12, textAlign: 'center', ...label(T.white), fontSize: 18 }}>{lbl}</div>
      <div style={{ position: 'absolute', left: -20, right: -20, top: H + 44, textAlign: 'center', fontFamily: T.font, fontSize: 40, fontWeight: 900, ...goldFill, opacity: p }}>{money(credit)}</div>
    </div>
  );
};
const Jars = ({ f }: { f: number }) => {
  const a = B.c1.s + 2, b = B.reveal.s;
  if (f < a - 1 || f > b + 14) return null;
  const y = L.jars.y, one = f >= B.c3.s;
  return (
    <div style={{ opacity: outExpo((f - a) / 14) * (1 - ease(f, b - 2, b + 12)) }}>
      <div style={{ position: 'absolute', left: 56, top: y - 20, width: 968, height: 660, borderRadius: 28, ...glass }} />
      <div style={{ position: 'absolute', left: 90, top: y, ...label(T.mute) }}>FEDERAL DONATION CREDIT · {DATA.tax_year}</div>
      <div style={{ position: 'absolute', left: 90, top: y + 34, fontFamily: T.font, fontSize: 22, fontWeight: 800, color: T.soft, opacity: ease(f, Q.low - 2, Q.low + 8) }}>
        first $200 at 14.5% · <span style={{ color: T.gold, opacity: ease(f, Q.high - 2, Q.high + 8) }}>above $200 at 29%</span>
      </div>
      <div style={{ position: 'absolute', left: 0, top: y + 90, width: 1080, opacity: 1 - ease(f, B.c3.s - 4, B.c3.s + 6) }}>
        <Jar f={f} x={180} w={260} total={X.each} at={B.c2.s} lbl="LEA" credit={X.sep_each} />
        <Jar f={f} x={640} w={260} total={X.each} at={B.c2.s + 8} lbl="MAX" credit={X.sep_each} />
      </div>
      {one && <div style={{ position: 'absolute', left: 0, top: y + 90, width: 1080, opacity: ease(f, B.c3.s, B.c3.s + 10) }}>
        <Jar f={f} x={330} w={420} total={X.total} at={Q.six} lbl="ONE RETURN" credit={X.comb} />
      </div>}
      {f >= Q.more && <Stamp f={f} at={Q.more} text={`+${money(X.gain)}`} x={760} y={y + 120} size={40} color={T.red} rotate={-6} />}
    </div>
  );
};

// ---------- reveal: carry forward ----------
const Years = ({ f }: { f: number }) => {
  const a = B.reveal.s, b = B.action.s;
  if (f < a || f > b + 12) return null;
  const y = L.years.y, yrs = [2025, 2026, 2027, 2028, 2029, 2030];
  return (
    <div style={{ opacity: ease(f, a, a + 10) * (1 - ease(f, b - 2, b + 12)) }}>
      <div style={{ position: 'absolute', left: 56, top: y - 20, width: 968, height: 470, borderRadius: 28, ...glass }} />
      <div style={{ position: 'absolute', left: 90, top: y + 4, ...label(T.gold) }}>UNCLAIMED GIFTS: ANY OF THE NEXT {X.years} YEARS</div>
      {yrs.map((yr, i) => {
        const at = Q.five + i * 4, p = outBack((f - at) / 12), first = i === 0;
        return (
          <div key={yr} style={{ position: 'absolute', left: 90 + i * 150, top: y + 80, width: 136, height: 170, borderRadius: 18, opacity: clamp(p), transform: `scale(${clamp(p, 0.6, 1.04)})`,
            background: first ? 'rgba(160,176,200,.18)' : 'rgba(127,224,168,.14)', border: `2px solid ${first ? T.glassEdge : GREEN}` }}>
            <div style={{ position: 'absolute', left: 0, right: 0, top: 26, textAlign: 'center', fontFamily: T.font, fontSize: 32, fontWeight: 900, color: T.white }}>{yr}</div>
            <div style={{ position: 'absolute', left: 6, right: 6, top: 90, textAlign: 'center', fontFamily: T.font, fontSize: 17, fontWeight: 800, color: first ? T.soft : GREEN }}>{first ? 'gift year' : 'claim here'}</div>
          </div>
        );
      })}
      <div style={{ position: 'absolute', left: 90, width: 900, top: y + 290, fontFamily: T.font, fontSize: 28, fontWeight: 900, color: T.white, opacity: ease(f, Q.join - 4, Q.join + 8) }}>
        a small year can join a bigger one
      </div>
      <div style={{ position: 'absolute', left: 90, width: 900, top: y + 350, fontFamily: T.font, fontSize: 18, fontWeight: 700, color: T.mute, opacity: ease(f, Q.join, Q.join + 10) }}>
        carried-forward gifts are claimed first · 10 years for ecologically sensitive land · CRA line 34900
      </div>
    </div>
  );
};

const End = ({ f }: { f: number }) => {
  const a = B.action.s;
  if (f < a - 2) return null;
  const y = L.end.y;
  return (
    <div style={{ position: 'absolute', left: 80, top: y, width: 880 }}>
      <div style={{ position: 'absolute', left: 0, top: 0, width: 880, height: 200, borderRadius: 26, ...glass, opacity: ease(f, a, a + 12) }}>
        <div style={{ position: 'absolute', left: 36, top: 26, ...label(T.gold) }}>CHECK YOURS</div>
        <div style={{ position: 'absolute', left: 36, top: 66, right: 36, fontFamily: T.font, fontSize: 32, fontWeight: 900, lineHeight: 1.15, color: T.white, opacity: ease(f, Q.pool - 4, Q.pool + 6) }}>
          Pool both spouses' receipts on one return (line 34900), if that spouse has tax to cut
        </div>
      </div>
      <div style={{ position: 'absolute', left: 0, top: 240, display: 'flex', alignItems: 'center', gap: 18, opacity: ease(f, Q.next - 4, Q.next + 8) }}>
        <Flag f={f} w={90} amp={0.06} />
        <div style={{ display: 'inline-flex', padding: '16px 28px', borderRadius: 999, background: `linear-gradient(160deg,${T.goldHi},${T.gold} 50%,${T.goldDeep})`, color: '#1d1503', fontFamily: T.font, fontSize: 28, fontWeight: 900,
          transform: `scale(${1 + 0.03 * Math.sin((f - a) / 6)})` }}>NEXT: MOVING EXPENSES →</div>
      </div>
      <div style={{ position: 'absolute', left: 0, top: 330, fontFamily: T.font, fontSize: 26, fontWeight: 700, color: T.white, textShadow, opacity: ease(f, Q.follow, Q.follow + 10) }}>Follow so you don't miss it</div>
      <div style={{ position: 'absolute', left: -10, top: 380, width: 900, padding: '14px 18px', borderRadius: 14, background: 'rgba(10,16,28,.84)', fontFamily: T.font, fontSize: 18, fontWeight: 600, color: T.mute, lineHeight: 1.45, opacity: ease(f, a + 6, a + 20) }}>
        Source: canada.ca (CRA) line 34900; {DATA.tax_year} federal rates 14.5% / 29% · provincial credits not included · example couple · general info, not advice
      </div>
    </div>
  );
};

const Header = ({ f }: { f: number }) => (
  <div style={{ position: 'absolute', left: 80, top: 92, right: 80, display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: T.white, fontSize: 22, fontWeight: 800, letterSpacing: 4, fontFamily: T.font }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}><Flag f={f} w={72} />TAX SECRETS CANADA</div>
    <div style={{ color: T.gold, letterSpacing: 5 }}>DONATIONS · {DATA.tax_year}</div>
  </div>
);

export const R3V3 = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: T.navy, fontFamily: T.font, overflow: 'hidden' }}>
      <SceneCuts f={f} cuts={CUTS} scene={(i) => i === 0 ? (
        <PhotoPlate f={f} src="plates/r3-s1-4k.jpg" iw={PW} ih={PH} keys={K1} glide={40} blur={0.8 + 4 * (1 - ease(f, 0, 20))} snow={[{ u0: 0.5, v0: 0.0, u1: 1.0, v1: 0.3 }]} />
      ) : i === 1 ? (
        <PhotoPlate f={f} src="plates/r3-s2-4k.jpg" iw={PW} ih={PH} keys={K2} glide={50} blur={0.8} snow={[{ u0: 0.0, v0: 0.0, u1: 1.0, v1: 0.8 }]} />
      ) : (
        <PhotoPlate f={f} src="plates/r3-s3-4k.jpg" iw={PW} ih={PH} keys={K3} glide={40} blur={0.8} steam={{ u: 0.3, v: 0.7, w: 0.03 }} />
      )} />
      <Depth f={f} seed={f < B.c2.s ? 40 : f < B.reveal.s ? 41 : 42} warm={0.6} />
      <NavyGrade low={f >= B.action.s ? 1.2 : 1} />
      <Header f={f} />
      <Typed f={f} caps={CAPS} head={T.font} />
      {f < B.c1.s + 20 && <Hook f={f} />}
      <Jars f={f} />
      <Years f={f} />
      <End f={f} />
      <Captions f={f} fps={R3FPS} beats={WORDS.beats as never} from={B.c1.s} until={B.action.s} y={1296} />
    </AbsoluteFill>
  );
};
