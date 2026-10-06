// Background plate for retirement topics (pensions group): a warm living room at golden hour.
// A large window looks onto a lake with autumn trees; an older couple sits on the sofa facing the window;
// a floor lamp, bookshelf, coffee table with papers and a mug. The camera is on a slider: a slow push-in
// toward the window with operator micro-motion. Same defocus/grade post pass as the office plate (Office.tsx).
import { ThreeCanvas } from '@remotion/three';
import { useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { FRAG, VERT, Person, type Look } from './Office';

const TAU = Math.PI * 2;
const m = (c: string, r = 0.8, extra: Partial<THREE.MeshStandardMaterialParameters> = {}) => new THREE.MeshStandardMaterial({ color: c, roughness: r, ...extra });

function viewTexture() {
  const W = 2048, H = 1024, c = document.createElement('canvas'); c.width = W; c.height = H;
  const g = c.getContext('2d')!;
  const sky = g.createLinearGradient(0, 0, 0, H * 0.55);
  sky.addColorStop(0, '#9fb9cf'); sky.addColorStop(0.6, '#f3d3a2'); sky.addColorStop(1, '#ffc98a');
  g.fillStyle = sky; g.fillRect(0, 0, W, H * 0.55);
  // far shore: autumn tree line
  let seed = 3; const r = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  for (let x = -20; x < W + 40; x += 14) {
    const h = 60 + r() * 90, col = ['#b5532a', '#d98a2b', '#8a3b22', '#c9a13a', '#5e6b34'][Math.floor(r() * 5)];
    g.fillStyle = col; g.beginPath(); g.ellipse(x, H * 0.55 - h * 0.35, 16 + r() * 18, h * 0.5, 0, 0, TAU); g.fill();
  }
  // lake with sun glint
  const lake = g.createLinearGradient(0, H * 0.55, 0, H);
  lake.addColorStop(0, '#d8b48a'); lake.addColorStop(0.3, '#6d8aa0'); lake.addColorStop(1, '#3d5466');
  g.fillStyle = lake; g.fillRect(0, H * 0.55, W, H * 0.45);
  for (let i = 0; i < 260; i++) { g.fillStyle = `rgba(255,236,190,${0.15 + r() * 0.5})`; g.fillRect(W * 0.55 + (r() - 0.5) * 600, H * 0.56 + r() * H * 0.3, 20 + r() * 60, 2); }
  // near shore grass + dock
  g.fillStyle = '#5c6a35'; g.fillRect(0, H * 0.9, W, H * 0.1);
  g.fillStyle = '#6b4a2e'; g.fillRect(W * 0.3, H * 0.84, W * 0.25, 10);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}

function bookTexture() {
  const W = 512, H = 512, c = document.createElement('canvas'); c.width = W; c.height = H;
  const g = c.getContext('2d')!; g.fillStyle = '#3b2a1e'; g.fillRect(0, 0, W, H);
  let seed = 9; const r = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  for (let row = 0; row < 4; row++) for (let x = 6; x < W - 10;) {
    const w = 10 + r() * 18, h = 80 + r() * 30;
    g.fillStyle = ['#7a2e2a', '#284a63', '#c7b07c', '#3f5b3a', '#8c6a3d', '#d9d2c5'][Math.floor(r() * 6)];
    g.fillRect(x, row * 128 + 120 - h, w, h); x += w + 2;
  }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}

const COUPLE: Look[] = [
  { top: m('#7d8f9c'), pants: m('#3b3f46'), skin: m('#e6c2a3'), hair: m('#c9c6c1'), h: 0.97 },
  { top: m('#b46a5a'), pants: m('#4a4038'), skin: m('#d9ab8a'), hair: m('#e0ddd8'), h: 0.93 },
];

const Room = ({ p }: { p: number }) => {
  const view = useMemo(viewTexture, []);
  const books = useMemo(bookTexture, []);
  const wood = useMemo(() => m('#7a5236', 0.45), []);
  const wall = useMemo(() => m('#efe4d3', 0.9), []);
  const fabric = useMemo(() => m('#6f7d6a', 0.95), []);
  const breathe = (k: number) => Math.sin(TAU * (p * 2 + k * 0.37)) * 0.006;
  return (
    <>
      {/* floor + walls */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} material={wood} receiveShadow><planeGeometry args={[12, 14]} /></mesh>
      <mesh position={[0, 3, -6]} material={wall}><planeGeometry args={[12, 6]} /></mesh>
      <mesh position={[-5, 1.5, -1]} rotation={[0, Math.PI / 2, 0]} material={wall}><planeGeometry args={[12, 3]} /></mesh>
      <mesh position={[5, 1.5, -1]} rotation={[0, -Math.PI / 2, 0]} material={wall}><planeGeometry args={[12, 3]} /></mesh>
      <mesh position={[0, 3, -1]} rotation={[Math.PI / 2, 0, 0]} material={wall}><planeGeometry args={[12, 14]} /></mesh>
      {/* window: view + mullions */}
      <mesh position={[0.3, 1.55, -5.98]}><planeGeometry args={[5.2, 2.3]} /><meshBasicMaterial map={view} color={new THREE.Color(1.5, 1.4, 1.3)} toneMapped /></mesh>
      {[-2.3, -0.5, 1.3, 3.1].map((x) => <mesh key={x} position={[x - 0.2, 1.55, -5.95]}><boxGeometry args={[0.06, 2.35, 0.06]} /><meshStandardMaterial color="#f4efe6" /></mesh>)}
      <mesh position={[0.3, 2.72, -5.95]}><boxGeometry args={[5.3, 0.08, 0.08]} /><meshStandardMaterial color="#f4efe6" /></mesh>
      <mesh position={[0.3, 0.38, -5.9]}><boxGeometry args={[5.4, 0.08, 0.2]} /><meshStandardMaterial color="#f4efe6" /></mesh>
      {/* sofa facing the window, couple on it */}
      <group position={[0.4, 0, -3.1]}>
        <mesh position={[0, 0.25, 0]} material={fabric} castShadow><boxGeometry args={[2.4, 0.5, 0.95]} /></mesh>
        <mesh position={[0, 0.7, 0.42]} material={fabric} castShadow><boxGeometry args={[2.4, 0.75, 0.22]} /></mesh>
        {[-1.25, 1.25].map((x) => <mesh key={x} position={[x, 0.42, 0]} material={fabric}><boxGeometry args={[0.2, 0.6, 0.95]} /></mesh>)}
        {[-0.5, 0.5].map((x, k) => (
          <group key={x} position={[x, 0.08 + breathe(k), 0.05]} rotation={[0, Math.PI + (k ? -0.12 : 0.1), k ? 0.05 : -0.04]}>
            <Person look={COUPLE[k]} seated arm={0.15} />
          </group>
        ))}
      </group>
      {/* coffee table with papers and a mug */}
      <group position={[-0.6, 0, -1.6]}>
        <mesh position={[0, 0.42, 0]} material={wood} castShadow><boxGeometry args={[1.3, 0.05, 0.7]} /></mesh>
        {[[-0.58, -0.3], [0.58, -0.3], [-0.58, 0.3], [0.58, 0.3]].map(([x, z]) => <mesh key={`${x}${z}`} position={[x, 0.2, z]} material={wood}><boxGeometry args={[0.05, 0.4, 0.05]} /></mesh>)}
        <mesh position={[-0.15, 0.452, 0.02]} rotation={[-Math.PI / 2, 0, 0.12]}><planeGeometry args={[0.42, 0.56]} /><meshStandardMaterial color="#fbf8f1" /></mesh>
        <mesh position={[0.05, 0.455, -0.05]} rotation={[-Math.PI / 2, 0, -0.2]}><planeGeometry args={[0.42, 0.56]} /><meshStandardMaterial color="#f4efe4" /></mesh>
        <mesh position={[0.42, 0.5, 0.1]}><cylinderGeometry args={[0.05, 0.045, 0.1, 24]} /><meshStandardMaterial color="#2f4a5a" roughness={0.3} /></mesh>
      </group>
      {/* floor lamp (warm practical) */}
      <group position={[-2.7, 0, -3.6]}>
        <mesh position={[0, 0.8, 0]}><cylinderGeometry args={[0.02, 0.02, 1.6, 12]} /><meshStandardMaterial color="#2a2a2a" /></mesh>
        <mesh position={[0, 1.65, 0]}><cylinderGeometry args={[0.18, 0.26, 0.32, 32, 1, true]} /><meshBasicMaterial color={new THREE.Color(2.4, 1.7, 1.0)} side={THREE.DoubleSide} /></mesh>
        <pointLight position={[0, 1.55, 0]} intensity={6} distance={6} color="#ffbe7a" />
      </group>
      {/* bookshelf on the right wall */}
      <mesh position={[4.85, 1.2, -3.2]} rotation={[0, -Math.PI / 2, 0]}><planeGeometry args={[2, 2]} /><meshStandardMaterial map={books} roughness={0.9} /></mesh>
      {/* plant */}
      <group position={[3.4, 0, -5.2]}>
        <mesh position={[0, 0.22, 0]}><cylinderGeometry args={[0.2, 0.16, 0.44, 24]} /><meshStandardMaterial color="#c9b79a" /></mesh>
        {[0, 1, 2, 3, 4].map((k) => <mesh key={k} position={[Math.sin(k * 1.3) * 0.18, 0.75 + (k % 3) * 0.12, Math.cos(k * 1.3) * 0.18]} scale={[1, 1.4, 1]}><sphereGeometry args={[0.2, 16, 12]} /><meshStandardMaterial color="#4f6b3a" roughness={0.9} /></mesh>)}
      </group>
    </>
  );
};

export const Post = ({ fRef, w, h, blur, cam }: { fRef: React.MutableRefObject<number>; w: number; h: number; blur: number; cam: React.MutableRefObject<{ z: number; x: number; y?: number; yaw: number; pitch: number; grade: number }> }) => {
  const { scene } = useThree();
  const st = useMemo(() => {
    const A = new THREE.WebGLRenderTarget(w, h, { type: THREE.HalfFloatType, samples: 4 });
    const B = new THREE.WebGLRenderTarget(w, h, { type: THREE.HalfFloatType });
    const c = new THREE.PerspectiveCamera(48, w / h, 0.05, 60);
    const mt = new THREE.ShaderMaterial({ uniforms: { tex: { value: null }, dir: { value: new THREE.Vector2() }, res: { value: new THREE.Vector2(w, h) }, final: { value: 0 }, seed: { value: 0 }, blurL: { value: blur }, blurR: { value: blur }, gradeU: { value: 0.8 } }, vertexShader: VERT, fragmentShader: FRAG, depthTest: false, depthWrite: false });
    const qs = new THREE.Scene(); qs.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mt));
    return { A, B, c, mt, qs, qc: new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1) };
  }, [w, h, blur]);
  useFrame(({ gl }) => {
    const { A, B, c, mt, qs, qc } = st, v = cam.current;
    c.position.set(v.x, v.y ?? 1.5, v.z); c.rotation.set(v.pitch, v.yaw, 0, 'YXZ'); c.updateMatrixWorld();
    gl.autoClear = false;
    gl.setRenderTarget(A); gl.clear(); gl.render(scene, c);
    mt.uniforms.seed.value = (fRef.current % 180) * 1.618; mt.uniforms.gradeU.value = v.grade;
    mt.uniforms.tex.value = A.texture; mt.uniforms.dir.value.set(1, 0); mt.uniforms.final.value = 0;
    gl.setRenderTarget(B); gl.clear(); gl.render(qs, qc);
    mt.uniforms.tex.value = B.texture; mt.uniforms.dir.value.set(0, 1); mt.uniforms.final.value = 1;
    gl.setRenderTarget(null); gl.clear(); gl.render(qs, qc);
  }, 1);
  return null;
};

export const Setup = ({ bg = '#2a2018', env = 0.35 }: { bg?: string; env?: number }) => {
  const { gl, scene } = useThree();
  useMemo(() => {
    const pm = new THREE.PMREMGenerator(gl);
    scene.environment = pm.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environmentIntensity = env;
    scene.background = new THREE.Color(bg);
    gl.toneMapping = THREE.ACESFilmicToneMapping; gl.toneMappingExposure = 1.0;
  }, [gl, scene, bg, env]);
  return null;
};

// T = 0..1 progress through the film; push-in from z 2.6 to 0.4 with micro-motion
export const Home = ({ f, T, w, h, blur = 8 }: { f: number; T: number; w: number; h: number; blur?: number }) => {
  const fRef = useRef(f); fRef.current = f;
  const e = T * T * (3 - 2 * T);
  const cam = useRef({ z: 0, x: 0, yaw: 0, pitch: 0, grade: 0.8 });
  cam.current = { z: 3.6 - 1.5 * e, x: 0.15 + 0.12 * e + 0.004 * Math.sin(f * 0.037), yaw: 0.02 - 0.04 * e + 0.0025 * Math.sin(f * 0.029 + 1), pitch: -0.07 + 0.0015 * Math.sin(f * 0.043), grade: 0.62 + 0.3 * e };
  const p = (f % 240) / 240;
  return (
    <ThreeCanvas width={w} height={h} shadows gl={{ antialias: false }}>
      <Setup />
      <hemisphereLight args={['#ffe2bf', '#3a2a1e', 0.55]} />
      <directionalLight position={[1.5, 2.2, -9]} intensity={3.2} color="#ffc88a" castShadow shadow-mapSize={[2048, 2048]} shadow-camera-left={-6} shadow-camera-right={6} shadow-camera-top={6} shadow-camera-bottom={-6} shadow-camera-far={25} shadow-bias={-0.0005} />
      <Room p={p} />
      <Post fRef={fRef} w={w} h={h} blur={blur} cam={cam} />
    </ThreeCanvas>
  );
};
