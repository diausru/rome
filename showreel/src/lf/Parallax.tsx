// TAX SECRETS CANADA — layered parallax plate with a simulated camera (code-only system, LF-02+).
// A still is split into depth layers (clean background + cut-out desk objects); every layer moves with the
// virtual camera in proportion to its depth. Light, glow, dust and steam are procedural. No video generator.
import React from 'react';
import { AbsoluteFill, Img, staticFile, interpolate } from 'remotion';
import { easeOut } from './Effects';

export type Layer = { src: string; depth: number; blur?: number };
export type Light = { x: number; y: number; r: number; color: string; amp?: number; speed?: number }; // % of frame
export type Shot = { t: number; plate: string; cam: { x: number; y: number; z: number; r?: number }[]; dur?: number }; // cam keys spread over the shot
export type PlateDef = { layers: Layer[]; lights?: Light[]; dust?: boolean; steam?: { x: number; y: number }; screen?: { x: number; y: number; w: number; h: number } };

const noise = (t: number, s: number) => Math.sin(t * 0.37 + s) * 0.6 + Math.sin(t * 0.13 + s * 2.1) * 0.4;
const rnd = (n: number) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };

// camera value inside a shot: keys are evenly spaced over the shot, eased, plus handheld micro-noise
const camAt = (s: Shot, t: number, end: number) => {
  const n = s.cam.length; const u = Math.max(0, Math.min(1, (t - s.t) / Math.max(0.1, end - s.t)));
  const f = u * (n - 1); const i = Math.min(n - 2, Math.floor(f)); const k = n === 1 ? 0 : easeOut(f - i);
  const a = s.cam[Math.max(0, i)], b = s.cam[Math.min(n - 1, i + 1)];
  const L = (p: number, q: number) => p + (q - p) * k;
  return { x: L(a.x, b.x) + noise(t, 1) * 4, y: L(a.y, b.y) + noise(t, 4) * 2.5, z: L(a.z, b.z), r: L(a.r ?? 0, b.r ?? 0) + noise(t, 7) * 0.08 };
};

const PlateView: React.FC<{ def: PlateDef; cam: { x: number; y: number; z: number; r: number }; t: number; seed: number }> = ({ def, cam, t, seed }) => (
  <AbsoluteFill style={{ transform: `rotate(${cam.r}deg)` }}>
    {def.layers.map((l, i) => (
      <Img key={i} src={staticFile(l.src)} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
        transform: `translate(${-cam.x * l.depth}px, ${-cam.y * l.depth}px) scale(${1.1 + cam.z * l.depth})`, filter: l.blur ? `blur(${l.blur}px)` : undefined }} />
    ))}
    {(def.lights ?? []).map((L, i) => { // breathing practical lights (lamp, window, screen)
      const a = (L.amp ?? 0.12) * (0.75 + 0.25 * Math.sin(t * (L.speed ?? 0.9) + i * 2 + seed));
      return <div key={i} style={{ position: 'absolute', left: `${L.x - L.r}%`, top: `${L.y - L.r * 1.78}%`, width: `${L.r * 2}%`, height: `${L.r * 3.56}%`, borderRadius: '50%', background: `radial-gradient(closest-side, ${L.color}, transparent)`, opacity: a * 4, mixBlendMode: 'screen', transform: `translate(${-cam.x * 0.6}px, ${-cam.y * 0.6}px)` }} />;
    })}
    {def.steam && Array.from({ length: 5 }, (_, i) => { // rising steam wisps
      const ph = ((t * 0.22 + i / 5) % 1); const sx = def.steam!.x + Math.sin(t * 0.8 + i) * 0.8 * ph;
      return <div key={i} style={{ position: 'absolute', left: `${sx}%`, top: `${def.steam!.y - ph * 14}%`, width: `${2.2 + ph * 3}%`, height: `${5 + ph * 6}%`, borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(255,255,255,.22), transparent)', opacity: Math.sin(ph * Math.PI) * 0.7, filter: 'blur(8px)', transform: `translate(${-cam.x * 0.55}px, ${-cam.y * 0.55}px)` }} />;
    })}
    {def.dust !== false && Array.from({ length: 46 }, (_, i) => { // dust in the light, near layer (moves most)
      const x = (rnd(i + seed * 7) * 110 + t * (0.4 + rnd(i) * 0.6) + noise(t * 0.5, i) * 2) % 110 - 5;
      const y = (rnd(i * 3 + seed) * 100 + Math.sin(t * 0.3 + i) * 3);
      const s = 1.5 + rnd(i * 9) * 3.5;
      return <div key={i} style={{ position: 'absolute', left: `${x}%`, top: `${y}%`, width: s, height: s, borderRadius: s, background: 'rgba(255,236,200,.85)', opacity: 0.18 + 0.35 * Math.abs(Math.sin(t * 0.7 + i)), filter: s > 3.5 ? 'blur(1.5px)' : undefined, transform: `translate(${-cam.x * 1.6}px, ${-cam.y * 1.6}px)` }} />;
    })}
  </AbsoluteFill>
);

// Shots: each shot has its own plate and camera path; changes cross-dissolve with a light-leak + focus pull.
export const Parallax: React.FC<{ shots: Shot[]; plates: Record<string, PlateDef>; t: number; total: number }> = ({ shots, plates, t, total }) => {
  const idx = shots.reduce((acc, s, i) => (s.t <= t ? i : acc), 0);
  const cur = shots[idx], prev = idx > 0 ? shots[idx - 1] : undefined;
  const endOf = (i: number) => (i + 1 < shots.length ? shots[i + 1].t + 1.2 : total);
  const k = prev ? Math.min(1, (t - cur.t) / 1.2) : 1;
  const leak = prev ? Math.sin(Math.min(1, (t - cur.t) / 1.2) * Math.PI) : 0;
  const changesPlate = prev && prev.plate !== cur.plate;
  return (
    <AbsoluteFill style={{ background: '#07090d', overflow: 'hidden' }}>
      {prev && k < 1 && <AbsoluteFill style={{ opacity: changesPlate ? 1 - k : 1, filter: changesPlate ? `blur(${k * 10}px)` : undefined }}><PlateView def={plates[prev.plate]} cam={camAt(prev, t, endOf(idx - 1))} t={t} seed={idx - 1} /></AbsoluteFill>}
      <AbsoluteFill style={{ opacity: changesPlate ? k : 1, filter: changesPlate ? `blur(${(1 - k) * 10}px)` : undefined }}><PlateView def={plates[cur.plate]} cam={camAt(cur, t, endOf(idx))} t={t} seed={idx} /></AbsoluteFill>
      {changesPlate && <AbsoluteFill style={{ background: 'linear-gradient(100deg, transparent 20%, rgba(255,200,140,.35) 50%, transparent 80%)', opacity: leak, mixBlendMode: 'screen', transform: `translateX(${interpolate(k, [0, 1], [-30, 30])}%)` }} />}
      {/* grade: depth haze + vignette keep panels readable */}
      <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 30%, rgba(4,6,10,.55) 100%)' }} />
      <AbsoluteFill style={{ background: 'linear-gradient(180deg, rgba(5,8,14,.35) 0%, rgba(5,8,14,.15) 40%, rgba(5,8,14,.45) 100%)' }} />
    </AbsoluteFill>
  );
};
