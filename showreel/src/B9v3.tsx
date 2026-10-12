// Sample Reel for motion engine v3 (2026-10-12): "$10K side hustle, two tax bills" (numbers and voiceover of B9).
// Everything is driven by b9v3-timeline.json (measured Grady VO, word timings from tools/words.py, SFX cues shared with
// tools/sfx_mix.py) and b9v3-data.json (generated from b9/calc.py; this file never computes a tax figure).
// Three photo plates (code-animated stills: camera moves, parallax dust, lamp light; no video model) joined by SceneCuts.
import { AbsoluteFill, Audio, staticFile, useCurrentFrame } from 'remotion';
import { PhotoPlate, SceneCuts, type Focus } from './Plate';
import { Flag } from './RaiseShort';
import TL from './b9v3-timeline.json';
import D from './b9v3-data.json';
import { BR, SAFE, Bar, Captions, CountUp, Dust, FloatTag, GlassPanel, MaskHeadline, Row, Sweep, goldText, money, shadow, tw, EZ } from './motion/Engine';

export const B9V3FPS = 30;
const fps = B9V3FPS, s = (t: number) => Math.round(t * fps);
export const B9V3DUR = s(TL.total);
const K = Object.fromEntries(Object.entries(TL.k).map(([k, v]) => [k, s(v as number)])) as Record<keyof typeof TL.k, number>;

const K1: Focus[] = [{ f: 0, u: 0.4, v: 0.42, k: 1.18 }, { f: K.c1_in, u: 0.32, v: 0.62, k: 1.28 }, { f: K.c1_cpp, u: 0.45, v: 0.5, k: 1.12 }];
const K2: Focus[] = [{ f: 0, u: 0.55, v: 0.42, k: 1.25 }, { f: K.c2_top, u: 0.5, v: 0.7, k: 1.18 }, { f: K.c2_cpp_n, u: 0.55, v: 0.45, k: 1.1 }];
const K3: Focus[] = [{ f: 0, u: 0.3, v: 0.62, k: 1.3 }, { f: K.tot_n, u: 0.6, v: 0.75, k: 1.2 }, { f: K.cta, u: 0.65, v: 0.3, k: 1.1 }];

// spoken numbers → display numbers in captions (display only; the timing stays on the spoken words)
const display = (w: string) => w.replace(/^C-P-P/, 'CPP');

const Header = ({ f }: { f: number }) => (
  <div style={{ position: 'absolute', left: SAFE.x0 + 20, right: 1080 - SAFE.x1, top: SAFE.y0 + 18, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    fontFamily: BR.font, fontSize: 22, fontWeight: 800, letterSpacing: 4, color: BR.ink }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}><Flag f={f} w={64} />TAX SECRETS CANADA</div>
    <div style={{ color: BR.gold, letterSpacing: 5 }}>SIDE INCOME · 2026</div>
  </div>
);

const Lamp = ({ f }: { f: number }) => ( // warm practical-light breathing over the plate (simulated, code-only)
  <AbsoluteFill style={{ background: 'radial-gradient(60% 40% at 30% 62%, rgba(255,182,72,.16), rgba(255,182,72,0) 70%)', opacity: 0.75 + 0.25 * Math.sin(f * 0.04) * Math.sin(f * 0.013 + 1), mixBlendMode: 'screen' }} />
);

export const B9v3 = () => {
  const f = useCurrentFrame();
  const c1Active = 1 - tw(f, K.c2_in, K.c2_in + 10);
  const c2Active = tw(f, K.c2_in, K.c2_in + 10);
  const r1a = tw(f, K.c1_zero, K.c1_zero + 6) * (1 - tw(f, K.c1_cpp_n, K.c1_cpp_n + 6));
  const r2a = tw(f, K.c1_cpp_n, K.c1_cpp_n + 6) * (1 - tw(f, K.c2_in, K.c2_in + 6));
  const r3a = tw(f, K.c2_tax_n, K.c2_tax_n + 6) * (1 - tw(f, K.c2_cpp_n, K.c2_cpp_n + 6));
  const r4a = tw(f, K.c2_cpp_n, K.c2_cpp_n + 6) * (1 - tw(f, K.tot, K.tot + 6));
  const frac1 = D.case1.total / D.case2.total;
  return (
    <AbsoluteFill style={{ background: BR.navy, fontFamily: BR.font, overflow: 'hidden' }}>
      <Audio src={staticFile('audio/b9v3-mix.wav')} />
      <SceneCuts f={f} cuts={[K.cut1, K.cut2]} dur={20} scene={(i) => (
        <PhotoPlate f={f} src={`plates/b9v3-s${i + 1}-4k.jpg`} iw={2294} ih={4096} keys={i === 0 ? K1 : i === 1 ? K2 : K3} glide={44} blur={0.7} />
      )} />
      <Lamp f={f} />
      {/* navy grade: keeps the top and bottom calm for type, the middle shows the scene */}
      <AbsoluteFill style={{ background: 'linear-gradient(180deg, rgba(6,10,20,.88) 0%, rgba(6,10,20,.45) 18%, rgba(6,10,20,.18) 38%, rgba(6,10,20,.5) 68%, rgba(6,10,20,.9) 100%)' }} />
      <AbsoluteFill><Dust f={f} n={40} /></AbsoluteFill>
      <Header f={f} />
      <div style={{ position: 'absolute', left: SAFE.x0 + 20, top: SAFE.y0 + 62, width: 160 * tw(f, 4, 26, EZ.wipe), height: 2, background: BR.red }} />

      {/* ---------- 1. opening hook: topic on frame 0, then staged reveals ---------- */}
      {f < K.c1_in + 20 && (
        <>
          <FloatTag f={f} a={s(0.25)} from="left" x={80} y={300} out={K.c1_in - 8}>SIDE HUSTLE</FloatTag>
          <FloatTag f={f} a={s(0.55)} from="right" x={600} y={290} out={K.c1_in - 8}>CRA · 2026</FloatTag>
          <FloatTag f={f} a={s(0.85)} from="top" x={410} y={372} out={K.c1_in - 8}>MANITOBA</FloatTag>
          <MaskHeadline f={f} a={0} now lines={['*$10,000* FROM', 'YOUR CHANNEL.']} size={98} y={470} out={K.c1_in - 6} />
          <MaskHeadline f={f} a={K.q_how - 2} lines={['HOW MUCH *TAX?*']} size={96} y={720} out={K.c1_in - 6} />
          {f < K.c1_in && <Sweep f={f} a={K.q_how + 10} x={84} y={840} w={640} />}
          {f >= K.q_thing - 4 && f < K.c1_in && (
            <div style={{ position: 'absolute', left: 84, top: 890, fontFamily: BR.font, fontSize: 34, fontWeight: 800, letterSpacing: 4, color: BR.soft, opacity: tw(f, K.q_thing - 4, K.q_thing + 8) }}>IT DEPENDS ON ONE THING.</div>
          )}
        </>
      )}

      {/* ---------- 2. the two cases, highlighted as the narration moves ---------- */}
      <GlassPanel f={f} a={K.c1_in} b={K.tot} enter="glass" exit="collapse" active={c1Active} x={70} y={560} w={880} h={330} label={`CASE 1 · ${D.case1.label}`}>
        <Row f={f} a={K.c1_bpa} top={96} label="INCOME TAX" active={r1a} note="under the basic personal amount"
          value={f >= K.c1_zero ? <CountUp f={f} a={K.c1_zero} dur={10} value={D.case1.income_tax} /> : <span style={{ color: BR.dim }}>—</span>} />
        <Row f={f} a={K.c1_cpp} top={214} label="CPP" active={r2a} note="self-employed: both halves"
          value={f >= K.c1_cpp_n ? <CountUp f={f} a={K.c1_cpp_n} dur={26} value={D.case1.cpp} cents /> : <span style={{ color: BR.dim }}>—</span>} />
      </GlassPanel>
      <GlassPanel f={f} a={K.c2_in} b={K.tot} enter="slide-right" exit="collapse" active={c2Active} x={70} y={920} w={880} h={330} label={`CASE 2 · ${D.case2.label}`}>
        <Row f={f} a={K.c2_sal} top={96} label="INCOME TAX" active={r3a} note="every extra dollar in your top bracket"
          value={f >= K.c2_tax_n ? <CountUp f={f} a={K.c2_tax_n} dur={26} value={Math.round(D.case2.income_tax)} /> : <span style={{ color: BR.dim }}>—</span>} />
        <Row f={f} a={K.c2_cpp_n - 6} top={214} label="CPP" active={r4a} note={f >= K.c2_exempt ? 'your job already used the $3,500 exemption' : 'both halves, no exemption left'}
          value={f >= K.c2_cpp_n ? <CountUp f={f} a={K.c2_cpp_n} dur={22} value={D.case2.cpp} /> : <span style={{ color: BR.dim }}>—</span>} />
      </GlassPanel>
      <FloatTag f={f} a={K.c2_top} from="right" x={330} y={850} out={K.c2_cpp_n}>
        <span style={{ color: BR.ink }}>TOP BRACKET</span> <span style={{ color: BR.red }}>●</span> <span style={{ color: BR.gold }}>20.5% + 12.75%</span>
      </FloatTag>

      {/* ---------- 3. collapse to the result: same $10,000, two bills ---------- */}
      <GlassPanel f={f} a={K.tot + 8} b={K.cta} enter="wipe" exit="vapor" active={tw(f, K.tot_n, K.tot_n + 10)} x={70} y={520} w={880} h={640} label="SAME $10,000 · TAX + CPP">
        <div style={{ position: 'absolute', left: 44, right: 44, top: 110 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 30, fontWeight: 800, letterSpacing: 3, color: BR.soft }}><span>{D.case1.label}</span><span style={{ color: BR.ink }}>{money(D.case1.total, true)}</span></div>
          <div style={{ marginTop: 14 }}><Bar f={f} a={K.tot + 14} frac={frac1} color="#9fb0c8" /></div>
          <div style={{ marginTop: 40, display: 'flex', justifyContent: 'space-between', fontSize: 30, fontWeight: 800, letterSpacing: 3, color: BR.ink }}>
            <span>{D.case2.label}</span><span style={goldText}>{f >= K.tot_n ? <CountUp f={f} a={K.tot_n} dur={28} value={Math.round(D.case2.total)} /> : '—'}</span>
          </div>
          <div style={{ marginTop: 14 }}><Bar f={f} a={K.tot_n} frac={1} /></div>
        </div>
        <div style={{ position: 'absolute', left: 44, top: 380, opacity: tw(f, K.x5 - 2, K.x5 + 10), transform: `translateY(${(1 - tw(f, K.x5 - 2, K.x5 + 12)) * 30}px)` }}>
          <div style={{ fontSize: 150, fontWeight: 900, letterSpacing: -4, lineHeight: 1, ...goldText }}>{D.ratio.toFixed(1)}×</div>
          <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: 4, color: BR.ink, marginTop: 10 }}>THE BILL, SAME INCOME</div>
        </div>
      </GlassPanel>

      {/* ---------- 4. close: the next question, then the sonic logo ---------- */}
      <MaskHeadline f={f} a={K.cta + 2} lines={['ON A *$100K*', 'SALARY?']} size={104} y={560} />
      {f >= K.cta_q && (
        <div style={{ position: 'absolute', left: 84, top: 830, fontSize: 36, fontWeight: 800, letterSpacing: 4, color: BR.soft, opacity: tw(f, K.cta_q, K.cta_q + 10) }}>SHOULD WE RUN IT NEXT?</div>
      )}
      {f >= K.cta_yes - 4 && (
        <div style={{ position: 'absolute', left: 84, top: 910, padding: '20px 34px', borderRadius: 999, background: 'linear-gradient(160deg,#fff3c9,#f1c75b 50%,#c88f1f)', color: '#1c1404',
          fontSize: 34, fontWeight: 900, letterSpacing: 2, boxShadow: `0 16px 36px rgba(0,0,0,.45), 0 0 ${30 * tw(f, K.cta_yes, K.cta_yes + 20)}px rgba(255,182,72,.45)`,
          opacity: tw(f, K.cta_yes - 4, K.cta_yes + 8), transform: `scale(${0.94 + 0.06 * tw(f, K.cta_yes - 4, K.cta_yes + 10, EZ.settle)})` }}>SAY YES IN THE COMMENTS</div>
      )}
      {f >= K.cta && (
        <div style={{ position: 'absolute', left: 84, right: 1080 - SAFE.x1 + 20, top: 1060, fontSize: 20, fontWeight: 600, lineHeight: 1.45, color: BR.dim, opacity: tw(f, K.cta + 10, K.cta + 24) }}>
          {D.assumptions} · Source: {D.sources} · Example only · general info, not advice
        </div>
      )}

      <Captions f={f} fps={fps} chunks={TL.chunks} words={TL.words} display={display} />
      {/* end card: flag + wordmark land with the sonic logo */}
      {f >= K.logo - 6 && (
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', background: `rgba(6,10,20,${0.82 * tw(f, K.logo - 6, K.logo + 6)})` }}>
          <div style={{ opacity: tw(f, K.logo, K.logo + 12, EZ.settle), transform: `scale(${0.96 + 0.04 * tw(f, K.logo, K.logo + 16, EZ.settle)})`, textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}><Flag f={f} w={150} amp={0.05} /></div>
            <div style={{ marginTop: 26, fontSize: 52, fontWeight: 900, letterSpacing: 8, color: BR.ink, textShadow: shadow }}>TAX SECRETS CANADA</div>
            <div style={{ margin: '14px auto 0', width: 260 * tw(f, K.logo + 6, K.logo + 24, EZ.wipe), height: 2, background: BR.gold }} />
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
