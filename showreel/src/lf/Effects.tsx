// TAX SECRETS CANADA — code-made entrance/exit library for long-form panels (code-only system, LF-02+).
// Every effect is a pure function of progress k (0 → 1), so duration/easing/position are controlled by the caller.
// Entrances: k goes 0 → 1 while the panel appears. Exits: k goes 0 → 1 while the panel leaves.
import React from 'react';
import { interpolate, Easing } from 'remotion';

export type FxName =
  | 'glass' | 'slideL' | 'slideR' | 'slideUp' | 'wipe' | 'focus' | 'sweep' | 'stagger'
  | 'fade' | 'vapor' | 'particles' | 'defocus' | 'morph' | 'collapse';
export const easeOut = Easing.bezier(0.22, 1, 0.36, 1);
export const easeIn = Easing.bezier(0.55, 0, 0.75, 0.2);
const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

export type FxOut = { style: React.CSSProperties; overlay?: React.ReactNode };

// k: 0 = hidden, 1 = fully shown (for exits pass 1 - exitProgress so the same curves read backwards,
// except effects that have a dedicated exit look: vapor, particles, defocus, collapse, morph).
export const fxStyle = (name: FxName, k: number, phase: 'in' | 'out', seed = 1): FxOut => {
  k = clamp01(k);
  const e = phase === 'in' ? easeOut(k) : k; // k already eased by caller for exits
  switch (name) {
    case 'glass': // 1. glass reveal: frosted → clear, rises slightly, glass edge brightens
      return { style: { opacity: e, filter: `blur(${lerp(14, 0, e)}px) brightness(${lerp(1.5, 1, e)})`, transform: `translateY(${lerp(30, 0, e)}px) scale(${lerp(0.965, 1, e)})` } };
    case 'slideL': // 2. directional slide from the left
      return { style: { opacity: clamp01(e * 1.6), transform: `translateX(${lerp(-160, 0, e)}px)`, filter: `blur(${lerp(6, 0, e)}px)` } };
    case 'slideR':
      return { style: { opacity: clamp01(e * 1.6), transform: `translateX(${lerp(160, 0, e)}px)`, filter: `blur(${lerp(6, 0, e)}px)` } };
    case 'slideUp':
      return { style: { opacity: clamp01(e * 1.6), transform: `translateY(${lerp(90, 0, e)}px)` } };
    case 'wipe': // 3. mask wipe left → right with a soft feather
      return { style: { opacity: 1, WebkitMaskImage: `linear-gradient(90deg, #000 ${e * 120 - 20}%, transparent ${e * 120}%)`, maskImage: `linear-gradient(90deg, #000 ${e * 120 - 20}%, transparent ${e * 120}%)` } };
    case 'focus': // 4. focus reveal: rack focus from soft to sharp, slight zoom settle
      return { style: { opacity: clamp01(e * 2), filter: `blur(${lerp(26, 0, e)}px)`, transform: `scale(${lerp(1.08, 1, e)})` } };
    case 'sweep': { // 5. light sweep: fade in under a moving specular band
      const x = lerp(-40, 140, e);
      return {
        style: { opacity: clamp01(e * 1.4), transform: `translateY(${lerp(16, 0, e)}px)` },
        overlay: <div style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', pointerEvents: 'none', background: `linear-gradient(105deg, transparent ${x - 18}%, rgba(255,240,210,.28) ${x}%, transparent ${x + 18}%)`, mixBlendMode: 'screen' }} />,
      };
    }
    case 'stagger': // 6. staggered data reveal: container fades fast; rows use staggerK()
      return { style: { opacity: clamp01(e * 3) } };
    case 'fade': // 8. glass fade
      return { style: { opacity: e, transform: `scale(${lerp(0.985, 1, e)})` } };
    case 'vapor': { // 9. vapor dissolve: rises, stretches, top dissolves first
      const v = 1 - e; // 0 shown → 1 gone
      const m = `linear-gradient(0deg, #000 ${100 - v * 140}%, transparent ${130 - v * 140}%)`;
      return { style: { opacity: clamp01(1 - v * 1.1), transform: `translateY(${-v * 60}px) scaleY(${1 + v * 0.08})`, filter: `blur(${v * 10}px)`, WebkitMaskImage: m, maskImage: m } };
    }
    case 'particles': { // 10. particle dissolve: panel thins out while glints drift away
      const v = 1 - e;
      return {
        style: { opacity: clamp01(1 - v * 1.3), filter: `blur(${v * 4}px) contrast(${1 + v})` },
        overlay: <Particles v={v} seed={seed} />,
      };
    }
    case 'defocus': { // 11. defocus exit: drifts out of the focal plane
      const v = 1 - e;
      return { style: { opacity: clamp01(1 - v), filter: `blur(${v * 22}px)`, transform: `scale(${1 + v * 0.05})` } };
    }
    case 'morph': { // 12. morph: squashes into a gold line (out) / unfolds from one (in)
      const sx = phase === 'in' ? interpolate(e, [0, 0.45, 1], [0.04, 1, 1]) : interpolate(e, [0, 0.55, 1], [0.04, 1, 1]);
      const sy = phase === 'in' ? interpolate(e, [0, 0.45, 1], [0.012, 0.012, 1]) : interpolate(e, [0, 0.55, 1], [0.012, 0.012, 1]);
      return { style: { opacity: clamp01(e * 4), transform: `scale(${sx}, ${sy})`, boxShadow: `0 0 ${lerp(40, 0, e)}px rgba(232,194,122,${lerp(0.9, 0, e)})` } };
    }
    case 'collapse': { // 13. collapse to result: rows fold down into the bottom line
      const v = 1 - e;
      return { style: { opacity: clamp01(1 - Math.max(0, v - 0.6) * 2.5), transform: `scaleY(${lerp(1, 0.08, v)})`, transformOrigin: 'bottom center', filter: `brightness(${1 + v * 0.6})` } };
    }
  }
  return { style: {} };
};

// row-level stagger for effect 6 (and for any table/grid): returns 0..1 for item i
export const staggerK = (now: number, t0: number, i: number, gap = 0.12, d = 0.4) => easeOut(clamp01((now - t0 - i * gap) / d));

const rnd = (n: number) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
const Particles: React.FC<{ v: number; seed: number }> = ({ v, seed }) => (
  <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'visible' }}>
    {Array.from({ length: 70 }, (_, i) => {
      const x = rnd(seed * 97 + i) * 100, y = rnd(seed * 31 + i * 7) * 100;
      const dx = (rnd(i * 13 + seed) - 0.3) * 260, dy = -60 - rnd(i * 5 + seed) * 220;
      const s = 2 + rnd(i * 3) * 5, a = clamp01(v * 2.2) * clamp01((1 - v) * 1.6);
      return <div key={i} style={{ position: 'absolute', left: `${x}%`, top: `${y}%`, width: s, height: s, borderRadius: s, background: i % 3 ? 'rgba(244,241,234,.9)' : '#E8C27A', opacity: a, transform: `translate(${dx * v}px, ${dy * v}px)`, boxShadow: '0 0 8px rgba(232,194,122,.8)' }} />;
    })}
  </div>
);

// default rotation so consecutive panels never reuse the same entrance/exit
export const IN_ROTATION: FxName[] = ['glass', 'wipe', 'slideL', 'focus', 'sweep', 'slideR', 'morph', 'stagger', 'slideUp'];
export const OUT_ROTATION: FxName[] = ['fade', 'vapor', 'defocus', 'particles', 'collapse', 'morph'];
