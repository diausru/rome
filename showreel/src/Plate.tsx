// Photo plate (user decision 2026-10-06, option 1): a photoreal still generated without any text or numbers,
// animated entirely in code. A virtual camera moves between per-beat focus points (motivated: it looks at what
// the narration talks about), plus live elements drawn in code: snow behind the window, steam over the mug,
// a slow light breathing. Numbers never live in the image; they are rendered by the composition on top.
import { AbsoluteFill, Img, staticFile } from 'remotion';

export type Focus = { f: number; u: number; v: number; k: number }; // frame, focus point (0..1 image coords), zoom
export type Rect = { u0: number; v0: number; u1: number; v1: number };

const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const sstep = (t: number) => { t = clamp(t); return t * t * t * (t * (t * 6 - 15) + 10); };

// camera between keyframes: ease over `glide` frames after each keyframe, plus a constant slow push
function camera(f: number, keys: Focus[], glide: number) {
  let cur = keys[0];
  for (let i = 1; i < keys.length; i++) {
    const k = keys[i];
    if (f < k.f) break;
    const t = sstep((f - k.f) / glide);
    cur = { f: k.f, u: cur.u + (k.u - cur.u) * t, v: cur.v + (k.v - cur.v) * t, k: cur.k + (k.k - cur.k) * t };
  }
  return cur;
}

export const PhotoPlate = ({ f, src, iw, ih, W = 1080, H = 1920, keys, glide = 36, blur = 0.6, snow, steam, children }: {
  f: number; src: string; iw: number; ih: number; W?: number; H?: number; keys: Focus[]; glide?: number; blur?: number;
  snow?: Rect[]; steam?: { u: number; v: number; w: number };
  children?: React.ReactNode; // overlay in image space (position children with % of the image), not blurred
}) => {
  const s0 = Math.max(W / iw, H / ih);
  const c = camera(f, keys, glide);
  const k = c.k * (1 + 0.00004 * f); // continuous slow push so the frame never freezes
  const pw = iw * s0 * k, ph = ih * s0 * k;
  // keep the image covering the frame
  const fu = clamp(c.u, W / 2 / pw, 1 - W / 2 / pw), fv = clamp(c.v, H / 2 / ph, 1 - H / 2 / ph);
  const x = W / 2 - fu * pw + 3 * Math.sin(f * 0.021), y = H / 2 - fv * ph + 2.5 * Math.sin(f * 0.017 + 1);
  const flakes = (snow ?? []).flatMap((sn, j) => Array.from({ length: 45 }, (_, n) => {
    const i = n + j * 1000, snow = sn;
    const r = (n: number) => { const s = Math.sin(i * 127.1 + n * 311.7) * 43758.5453; return s - Math.floor(s); };
    const sp = 0.6 + r(1) * 1.2, size = 2.5 + r(2) * 4;
    const u = snow.u0 + (snow.u1 - snow.u0) * ((r(3) + 0.004 * Math.sin(f * 0.05 + i)) % 1);
    const v = snow.v0 + (snow.v1 - snow.v0) * ((r(4) + f * 0.0016 * sp) % 1);
    return { u, v, size, o: 0.35 + r(5) * 0.5 };
  }));
  return (
    <AbsoluteFill style={{ overflow: 'hidden', background: '#000' }}>
      <div style={{ position: 'absolute', left: x, top: y, width: pw, height: ph, filter: `blur(${blur}px)` }}>
        <Img src={staticFile(src)} style={{ width: '100%', height: '100%' }} />
        {flakes.map((p, i) => (
          <div key={i} style={{ position: 'absolute', left: p.u * pw, top: p.v * ph, width: p.size * k, height: p.size * k, borderRadius: '50%', background: '#fff', opacity: p.o, filter: 'blur(0.6px)' }} />
        ))}
        {steam && [0, 1, 2, 3].map((i) => {
          const t = ((f + i * 22) % 88) / 88;
          return (
            <div key={i} style={{ position: 'absolute', left: steam.u * pw + Math.sin(t * 5 + i) * 14 * k - 30 * k, top: steam.v * ph - t * 170 * k, width: 60 * k, height: 90 * k, borderRadius: '50%',
              background: 'radial-gradient(closest-side, rgba(255,255,255,.55), rgba(255,255,255,0))', opacity: Math.sin(Math.PI * t) * 0.55, filter: `blur(${8 * k}px)`, transform: `scaleX(${0.7 + t * 0.6})` }} />
          );
        })}
      </div>
      {children && <div style={{ position: 'absolute', left: x, top: y, width: pw, height: ph }}>{children}</div>}
      {/* light breathing + vignette */}
      <AbsoluteFill style={{ background: 'radial-gradient(120% 80% at 50% 45%, rgba(0,0,0,0) 55%, rgba(0,0,0,.45) 100%)', opacity: 0.9 + 0.1 * Math.sin(f * 0.03) }} />
    </AbsoluteFill>
  );
};
