// Background plate for retirement-income topics (OAS / CPP / GIS): a bright kitchen on a winter morning.
// Back wall: kitchen cabinets and a fridge beside a wide window onto a snowy residential street (houses, bare trees, a parked car). An older
// couple at the kitchen table: he is seated reading a letter beside an open laptop, she stands at the
// counter with a mug. Pendant lamp over the table,  The camera is on a
// slider: a slow lateral truck left → right with operator micro-motion. Post pass shared with Home.tsx.
import { ThreeCanvas } from '@remotion/three';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Person, type Look } from './Office';
import { Post, Setup } from './Home';

const TAU = Math.PI * 2;
const m = (c: string, r = 0.8, extra: Partial<THREE.MeshStandardMaterialParameters> = {}) => new THREE.MeshStandardMaterial({ color: c, roughness: r, ...extra });

function streetTexture() {
  const W = 2048, H = 1024, c = document.createElement('canvas'); c.width = W; c.height = H;
  const g = c.getContext('2d')!;
  let seed = 11; const r = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const sky = g.createLinearGradient(0, 0, 0, H * 0.6);
  sky.addColorStop(0, '#b9cbe0'); sky.addColorStop(1, '#eef2f6');
  g.fillStyle = sky; g.fillRect(0, 0, W, H);
  // houses across the street: siding colours, snowy roofs, lit windows
  for (let x = -60; x < W; x += 330 + r() * 80) {
    const w = 260 + r() * 60, h = 200 + r() * 60, y = H * 0.62 - h;
    g.fillStyle = ['#8a5a44', '#5f7487', '#c9b48e', '#7b8a6a', '#a8a29a'][Math.floor(r() * 5)];
    g.fillRect(x, y, w, h);
    g.fillStyle = '#f7f9fb'; g.beginPath(); g.moveTo(x - 20, y + 4); g.lineTo(x + w / 2, y - 110); g.lineTo(x + w + 20, y + 4); g.closePath(); g.fill();
    g.fillStyle = '#ffd9a0'; g.fillRect(x + 30, y + 50, 60, 70); g.fillRect(x + w - 90, y + 50, 60, 70);
    g.fillStyle = '#4a3a2e'; g.fillRect(x + w / 2 - 28, y + h - 110, 56, 110);
  }
  // bare trees
  g.strokeStyle = '#4a4440'; g.lineCap = 'round';
  for (let k = 0; k < 7; k++) {
    const x = r() * W, base = H * 0.68;
    const branch = (x0: number, y0: number, a: number, len: number, d: number): void => {
      if (d === 0) return; const x1 = x0 + Math.cos(a) * len, y1 = y0 - Math.sin(a) * len;
      g.lineWidth = d * 2.2; g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y1); g.stroke();
      branch(x1, y1, a + 0.45 + r() * 0.2, len * 0.72, d - 1); branch(x1, y1, a - 0.45 - r() * 0.2, len * 0.72, d - 1);
    };
    branch(x, base, Math.PI / 2, 120 + r() * 50, 6);
  }
  // snowbanks, road, a parked car
  g.fillStyle = '#f4f6f8'; g.fillRect(0, H * 0.62, W, H * 0.1);
  g.fillStyle = '#9aa1a8'; g.fillRect(0, H * 0.72, W, H * 0.12);
  g.fillStyle = '#eef1f4'; g.fillRect(0, H * 0.84, W, H * 0.16);
  g.fillStyle = '#7a1f22'; g.fillRect(W * 0.58, H * 0.7, 300, 70); g.fillRect(W * 0.6, H * 0.65, 190, 50);
  g.fillStyle = '#cfd8e0'; g.fillRect(W * 0.61, H * 0.66, 80, 36); g.fillRect(W * 0.66, H * 0.66, 80, 36);
  g.fillStyle = '#1d1d1f'; [W * 0.6, W * 0.69].forEach((x) => { g.beginPath(); g.arc(x + 20, H * 0.78, 26, 0, TAU); g.fill(); });
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}

function letterTexture() {
  const W = 256, H = 340, c = document.createElement('canvas'); c.width = W; c.height = H;
  const g = c.getContext('2d')!; g.fillStyle = '#fbfaf6'; g.fillRect(0, 0, W, H);
  g.fillStyle = '#c0392b'; g.fillRect(20, 20, 30, 16); g.fillStyle = '#333'; g.fillRect(58, 22, 110, 10);
  for (let y = 70; y < H - 30; y += 18) { g.fillStyle = '#9a9a9a'; g.fillRect(20, y, 150 + ((y * 37) % 60), 5); }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}

const COUPLE: Look[] = [
  { top: m('#4f6378'), pants: m('#3a3632'), skin: m('#e2bc9c'), hair: m('#bdbab4'), h: 0.98 },
  { top: m('#c9a27a'), pants: m('#3f4652'), skin: m('#e8c6a8'), hair: m('#d8d3cc'), h: 0.93 },
];

const Kitchen3D = ({ p }: { p: number }) => {
  const street = useMemo(streetTexture, []);
  const letter = useMemo(letterTexture, []);
  const floor = useMemo(() => m('#6a4c33', 0.75), []);
  const wall = useMemo(() => m('#d6cfc2', 0.9), []);
  const cab = useMemo(() => m('#3e5953', 0.5), []);
  const top = useMemo(() => m('#3b3b3d', 0.25), []);
  const oak = useMemo(() => m('#9b7148', 0.45), []);
  const steel = useMemo(() => m('#c8ccd0', 0.25, { metalness: 0.7 }), []);
  const breathe = (k: number) => Math.sin(TAU * (p * 2 + k * 0.41)) * 0.006;
  const read = Math.sin(TAU * p) * 0.02; // the letter drifts as he reads
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} material={floor} receiveShadow><planeGeometry args={[12, 14]} /></mesh>
      <mesh position={[0, 1.6, -5]} material={wall}><planeGeometry args={[12, 3.2]} /></mesh>
      <mesh position={[-4, 1.6, 0]} rotation={[0, Math.PI / 2, 0]} material={wall}><planeGeometry args={[14, 3.2]} /></mesh>
      <mesh position={[4, 1.6, 0]} rotation={[0, -Math.PI / 2, 0]} material={wall}><planeGeometry args={[14, 3.2]} /></mesh>
      <mesh position={[0, 3.2, 0]} rotation={[Math.PI / 2, 0, 0]} material={wall}><planeGeometry args={[12, 14]} /></mesh>
      {/* window: street view + frame */}
      <mesh position={[0.6, 1.6, -4.98]}><planeGeometry args={[4.4, 1.9]} /><meshBasicMaterial map={street} color={new THREE.Color(1.25, 1.25, 1.32)} toneMapped /></mesh>
      {[-1.6, 0.6, 2.8].map((x) => <mesh key={x} position={[x, 1.6, -4.95]}><boxGeometry args={[0.07, 1.98, 0.07]} /><meshStandardMaterial color="#ffffff" /></mesh>)}
      {[0.62, 2.58].map((y) => <mesh key={y} position={[0.6, y, -4.95]}><boxGeometry args={[4.5, 0.07, 0.07]} /><meshStandardMaterial color="#ffffff" /></mesh>)}
      {/* cabinets, counter and fridge along the left wall */}
      <group position={[-3.0, 0, -4.55]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh position={[0, 0.45, 0]} material={cab} castShadow><boxGeometry args={[0.8, 0.9, 1.6]} /></mesh>
        <mesh position={[0.02, 0.92, 0]} material={top}><boxGeometry args={[0.86, 0.04, 1.66]} /></mesh>
        <mesh position={[0.1, 2.15, 0]} material={cab}><boxGeometry args={[0.55, 0.8, 1.6]} /></mesh>
        {[-0.4, 0.4].map((z) => <mesh key={z} position={[0.41, 0.6, z]}><boxGeometry args={[0.01, 0.02, 0.25]} /><meshStandardMaterial color="#555" metalness={0.6} roughness={0.3} /></mesh>)}
        <mesh position={[0.05, 1.0, -1.25]} material={steel} castShadow><boxGeometry args={[0.85, 2.0, 0.9]} /></mesh>
      </group>
      {/* table with laptop, letters, mug; he sits reading */}
      <group position={[0.4, 0, -2.4]}>
        <mesh position={[0, 0.75, 0]} material={oak} castShadow receiveShadow><boxGeometry args={[1.6, 0.05, 0.95]} /></mesh>
        {[[-0.72, -0.4], [0.72, -0.4], [-0.72, 0.4], [0.72, 0.4]].map(([x, z]) => <mesh key={`${x}${z}`} position={[x, 0.37, z]} material={oak}><boxGeometry args={[0.06, 0.74, 0.06]} /></mesh>)}
        <group position={[0.35, 0.78, -0.1]} rotation={[0, -0.5, 0]}>
          <mesh><boxGeometry args={[0.4, 0.015, 0.28]} /><meshStandardMaterial color="#9ea3a8" metalness={0.6} roughness={0.35} /></mesh>
          <mesh position={[0, 0.13, -0.14]} rotation={[-0.25, 0, 0]}><planeGeometry args={[0.4, 0.26]} /><meshBasicMaterial color={new THREE.Color(1.1, 1.2, 1.35)} /></mesh>
        </group>
        <mesh position={[-0.25, 0.781, 0.15]} rotation={[-Math.PI / 2, 0, 0.3]}><planeGeometry args={[0.24, 0.12]} /><meshStandardMaterial color="#efe6d2" /></mesh>
        <mesh position={[-0.05, 0.782, 0.25]} rotation={[-Math.PI / 2, 0, -0.15]}><planeGeometry args={[0.24, 0.12]} /><meshStandardMaterial color="#f8f6f0" /></mesh>
        <mesh position={[-0.55, 0.83, -0.2]}><cylinderGeometry args={[0.045, 0.04, 0.1, 24]} /><meshStandardMaterial color="#b0503a" roughness={0.35} /></mesh>
        {/* chair + seated reader facing the camera side of the table */}
        <group position={[-0.25, 0, 0.75]}>
          <mesh position={[0, 0.45, 0]} material={oak}><boxGeometry args={[0.45, 0.04, 0.45]} /></mesh>
          <mesh position={[0, 0.75, 0.21]} material={oak}><boxGeometry args={[0.45, 0.6, 0.04]} /></mesh>
          <group position={[0, 0.0 + breathe(0), 0]} rotation={[0, Math.PI, 0]}>
            <Person look={COUPLE[0]} seated arm={0.9} />
          </group>
          <mesh position={[0, 1.1, -0.42]} rotation={[-0.9 + read, 0, 0.05]}><planeGeometry args={[0.24, 0.32]} /><meshStandardMaterial map={letter} side={THREE.DoubleSide} /></mesh>
        </group>
      </group>
      {/* she stands at the counter with a mug, half-turned to the table */}
      <group position={[-0.9, 0, -3.9]} rotation={[0, 0.35, 0]}>
        <group position={[0, breathe(1), 0]}><Person look={COUPLE[1]} arm={0.5} /></group>
        <mesh position={[0.16, 1.18, 0.28]}><cylinderGeometry args={[0.045, 0.04, 0.1, 20]} /><meshStandardMaterial color="#e9e4d8" roughness={0.3} /></mesh>
      </group>
      {/* pendant lamp over the table */}
      <group position={[0.4, 0, -2.4]}>
        <mesh position={[0, 2.75, 0]}><cylinderGeometry args={[0.006, 0.006, 0.9, 6]} /><meshStandardMaterial color="#222" /></mesh>
        <mesh position={[0, 2.25, 0]}><cylinderGeometry args={[0.08, 0.3, 0.22, 32, 1, true]} /><meshStandardMaterial color="#2c3a33" side={THREE.DoubleSide} /></mesh>
        <pointLight position={[0, 2.1, 0]} intensity={4} distance={5} color="#ffd29a" />
      </group>
      <mesh position={[-3.0, 1.3, -4.97]}><planeGeometry args={[1.6, 0.7]} /><meshStandardMaterial color="#e9e3d6" roughness={0.3} /></mesh>
      {/* plant on the sill */}
      <group position={[2.5, 0.65, -4.75]}>
        <mesh position={[0, 0.1, 0]}><cylinderGeometry args={[0.1, 0.08, 0.2, 20]} /><meshStandardMaterial color="#d9cbb3" /></mesh>
        {[0, 1, 2, 3].map((k) => <mesh key={k} position={[Math.sin(k * 1.7) * 0.08, 0.3 + (k % 2) * 0.08, Math.cos(k * 1.7) * 0.08]} scale={[1, 1.3, 1]}><sphereGeometry args={[0.1, 14, 10]} /><meshStandardMaterial color="#56763f" roughness={0.9} /></mesh>)}
      </group>
      <mesh position={[0.6, 0.6, -4.88]}><boxGeometry args={[4.6, 0.06, 0.25]} /><meshStandardMaterial color="#ffffff" /></mesh>
    </>
  );
};

// T = 0..1 progress through the film; lateral truck with a slight push-in
export const Kitchen = ({ f, T, w, h, blur = 8 }: { f: number; T: number; w: number; h: number; blur?: number }) => {
  const fRef = useRef(f); fRef.current = f;
  const e = T * T * (3 - 2 * T);
  const cam = useRef({ z: 0, x: 0, y: 1.45, yaw: 0, pitch: 0, grade: 0.8 });
  cam.current = { z: 2.0 - 0.5 * e, x: -0.35 + 1.1 * e + 0.004 * Math.sin(f * 0.035), y: 1.45, yaw: 0.05 - 0.12 * e + 0.0025 * Math.sin(f * 0.027 + 1), pitch: -0.08 + 0.0015 * Math.sin(f * 0.041), grade: 0.55 + 0.3 * e };
  const p = (f % 240) / 240;
  return (
    <ThreeCanvas width={w} height={h} shadows gl={{ antialias: false }}>
      <Setup bg="#d8dde2" env={0.3} />
      <hemisphereLight args={['#eef3fa', '#4a3a2c', 0.5]} />
      <directionalLight position={[1.2, 3.0, -9]} intensity={2.0} color="#e8f0ff" castShadow shadow-mapSize={[2048, 2048]} shadow-camera-left={-6} shadow-camera-right={6} shadow-camera-top={6} shadow-camera-bottom={-6} shadow-camera-far={25} shadow-bias={-0.0005} />
      <Kitchen3D p={p} />
      <Post fRef={fRef} w={w} h={h} blur={blur} cam={cam} />
    </ThreeCanvas>
  );
};
