// TAX SECRETS CANADA — Stories v2: AI video clips as the living background (mascot narrator in real scenes).
// Each clip starts at t, plays at `rate`, cross-dissolves into the next; code adds light leaks, flare, grain and grade.
import React from 'react';
import { AbsoluteFill, OffthreadVideo, Sequence, staticFile, interpolate, useVideoConfig } from 'remotion';

export type Clip = { t: number; src: string; rate?: number; from?: number; zoom?: number };

const rnd = (n: number) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };

export const ClipBg: React.FC<{ clips: Clip[]; t: number; total: number }> = ({ clips, t, total }) => {
  const { fps } = useVideoConfig(); const X = 0.6; // cross-dissolve seconds
  return (
    <AbsoluteFill style={{ background: '#05070a', overflow: 'hidden', zIndex: 0, isolation: 'isolate' }}>
      {clips.map((c, i) => {
        const end = i + 1 < clips.length ? clips[i + 1].t + X : total;
        if (t < c.t - 0.05 || t > end) return null;
        const op = i === 0 ? 1 : interpolate(t, [c.t, c.t + X], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        const z = (c.zoom ?? 1.04) + 0.03 * ((t - c.t) / Math.max(1, end - c.t)); // slow extra push on top of the clip's own camera
        return (
          <AbsoluteFill key={i} style={{ opacity: op, zIndex: i }}>
            <Sequence from={Math.round(c.t * fps)} durationInFrames={Math.max(1, Math.round((end - c.t) * fps))} layout="none">
              <OffthreadVideo src={staticFile(c.src)} muted playbackRate={c.rate ?? 1} startFrom={Math.round((c.from ?? 0) * fps)}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${z})`, filter: 'contrast(1.06) saturate(1.08)' }} />
            </Sequence>
          </AbsoluteFill>
        );
      })}
      {clips.map((c, i) => { // light leak sweep on every cut
        if (i === 0) return null; const u = (t - c.t) / 1.1; if (u < 0 || u > 1) return null;
        return <AbsoluteFill key={'l' + i} style={{ zIndex: 50, mixBlendMode: 'screen', opacity: Math.sin(u * Math.PI) * 0.75, background: `linear-gradient(${100 + (i % 3) * 20}deg, transparent 15%, rgba(255,170,90,.55) 45%, rgba(255,90,60,.35) 55%, transparent 85%)`, transform: `translateX(${interpolate(u, [0, 1], [-40, 40])}%)` }} />;
      })}
      {/* drifting anamorphic flare */}
      <AbsoluteFill style={{ zIndex: 51, mixBlendMode: 'screen', pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: `${18 + Math.sin(t * 0.13) * 6}%`, left: `${-20 + ((t * 2.2) % 140)}%`, width: '55%', height: 3, background: 'linear-gradient(90deg, transparent, rgba(255,210,160,.55), transparent)', filter: 'blur(2px)', opacity: 0.5 }} />
        <div style={{ position: 'absolute', top: `${8 + Math.sin(t * 0.2) * 4}%`, left: `${70 + Math.sin(t * 0.1) * 8}%`, width: 260, height: 260, borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(255,200,140,.28), transparent)', opacity: 0.6 + 0.3 * Math.sin(t * 0.7) }} />
      </AbsoluteFill>
      {/* film grain + vignette + bottom grade for cards/ticker */}
      <AbsoluteFill style={{ zIndex: 52, opacity: 0.07, backgroundImage: `radial-gradient(rgba(255,255,255,.9) 1px, transparent 1px)`, backgroundSize: `${3 + rnd(Math.floor(t * 24)) * 2}px ${3 + rnd(Math.floor(t * 24) + 1) * 2}px`, backgroundPosition: `${rnd(Math.floor(t * 24) + 2) * 50}px ${rnd(Math.floor(t * 24) + 3) * 50}px` }} />
      <AbsoluteFill style={{ zIndex: 53, background: 'radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 45%, rgba(4,6,10,.55) 100%)' }} />
      <AbsoluteFill style={{ zIndex: 54, background: 'linear-gradient(180deg, rgba(5,8,14,.30) 0%, rgba(5,8,14,0) 22%, rgba(5,8,14,0) 70%, rgba(5,8,14,.55) 100%)' }} />
    </AbsoluteFill>
  );
};
