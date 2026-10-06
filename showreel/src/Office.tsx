// Background plate for the carousel: an open-plan tax office with people walking, rendered in 3D and defocused.
// The panorama is built from 7 cameras that share one eye point and turn by one slide's field of view each,
// so the office reads as one continuous room across the seams (a cylindrical pano without edge stretch).
// A post pass blurs it with a radius that shrinks from slide 1 to slide 7 and grades it from cold/grey to warm:
// the further you swipe, the clearer the picture gets.
// Everything moves with whole cycles per LOOP, and walkers enter/exit behind columns, so the loop is seamless.
import { ThreeCanvas } from '@remotion/three';
import { useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

const TAU = Math.PI * 2;
export const N = 7;                       // slides
const VFOV = 44, ASPECT = 1080 / 1350;
const SLICE = 2 * Math.atan(ASPECT * Math.tan((VFOV / 2) * Math.PI / 180)); // horizontal fov of one slide, rad
const EYE = 1.45;
const seamTh = (k: number) => (k - N / 2) * SLICE;   // k = 0..7, left edge of slide k
const polar = (th: number, r: number): [number, number] => [r * Math.sin(th), -r * Math.cos(th)];

function rng(seed: number) {
  return () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

// ---------- static set ----------
function windowTextures() {
  const W = 4096, H = 512, c = document.createElement('canvas'); c.width = W; c.height = H;
  const e = document.createElement('canvas'); e.width = W; e.height = H;
  const g = c.getContext('2d')!, ge = e.getContext('2d')!;
  const y0 = H * (1 - 2.95 / 3.2), y1 = H * (1 - 0.8 / 3.2); // pane top / bottom
  g.fillStyle = '#b9b2a6'; g.fillRect(0, 0, W, H);
  ge.fillStyle = '#000'; ge.fillRect(0, 0, W, H);
  const sky = g.createLinearGradient(0, y0, 0, y1); sky.addColorStop(0, '#eef4f8'); sky.addColorStop(1, '#d5e0e6');
  g.fillStyle = sky; g.fillRect(0, y0, W, y1 - y0);
  ge.fillStyle = '#fff'; ge.fillRect(0, y0, W, y1 - y0);
  const r = rng(7);
  for (let x = 0; x < W;) { // low skyline seen through the glass
    const w = 30 + r() * 90, h = (y1 - y0) * (0.12 + r() * 0.42);
    g.fillStyle = `rgba(${150 + r() * 30},${165 + r() * 25},${178 + r() * 20},1)`; g.fillRect(x, y1 - h, w, h);
    ge.fillStyle = 'rgba(120,120,120,1)'; ge.fillRect(x, y1 - h, w, h);
    x += w + r() * 20;
  }
  const panes = 48;
  for (let i = 0; i <= panes; i++) {
    const x = (i / panes) * W; g.fillStyle = '#3b3d3f'; g.fillRect(x - 5, y0, 10, y1 - y0); ge.fillStyle = '#000'; ge.fillRect(x - 5, y0, 10, y1 - y0);
  }
  [y0, y1, (y0 + y1) * 0.3].forEach((y) => { g.fillStyle = '#3b3d3f'; g.fillRect(0, y - 4, W, 8); ge.fillStyle = '#000'; ge.fillRect(0, y - 4, W, 8); });
  const t = new THREE.CanvasTexture(c), te = new THREE.CanvasTexture(e);
  t.colorSpace = THREE.SRGBColorSpace; te.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = te.anisotropy = 8;
  return [t, te];
}

function floorGlow() {
  const S = 1024, c = document.createElement('canvas'); c.width = c.height = S;
  const g = c.getContext('2d')!, gr = g.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
  gr.addColorStop(0, 'rgba(255,255,255,0)'); gr.addColorStop(0.62, 'rgba(255,255,255,0)'); gr.addColorStop(0.97, 'rgba(255,250,240,0.5)'); gr.addColorStop(1, 'rgba(255,250,240,0)');
  g.fillStyle = gr; g.fillRect(0, 0, S, S);
  return new THREE.CanvasTexture(c);
}

const SPAN = N * SLICE + 0.7;
const Room = () => {
  const [win, winE] = useMemo(windowTextures, []);
  const glow = useMemo(floorGlow, []);
  return (
    <>
      <mesh position={[0, 1.6, 0]}>
        <cylinderGeometry args={[11.5, 11.5, 3.2, 256, 1, true, Math.PI - SPAN / 2, SPAN]} />
        <meshStandardMaterial side={THREE.BackSide} map={win} emissiveMap={winE} emissive="#ffffff" emissiveIntensity={2.4} roughness={0.7} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[24, 24, 64, 64]} />
        <meshStandardMaterial color="#4f463f" roughness={0.22} metalness={0.05} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={[23.6, 23.6]} />
        <meshBasicMaterial map={glow} transparent blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 3.2, 0]}>
        <planeGeometry args={[24, 24, 64, 64]} />
        <meshStandardMaterial color="#d3cec6" roughness={0.9} />
      </mesh>
      {[4.6, 6.6, 8.6, 10.6].map((r) => (
        <mesh key={r} rotation={[Math.PI / 2, 0, 0]} position={[0, 3.17, 0]}>
          <ringGeometry args={[r, r + 0.14, 256, 1, 0, TAU]} />
          <meshBasicMaterial color={new THREE.Color(2.6, 2.5, 2.3)} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </>
  );
};

// columns sit just right of each seam; walkers start and finish behind them
const COL_R = 3.8;
const colTh = (k: number) => seamTh(k) + 0.18 * SLICE;
const Columns = () => (
  <>
    {Array.from({ length: N + 2 }, (_, i) => i - 1).map((k) => {
      const [x, z] = polar(colTh(k), COL_R);
      return (
        <mesh key={k} position={[x, 1.6, z]} castShadow>
          <cylinderGeometry args={[0.26, 0.26, 3.2, 40]} />
          <meshStandardMaterial color="#b9b2a7" roughness={0.6} />
        </mesh>
      );
    })}
  </>
);

const TOPS = ['#1f2a44', '#e9e9e6', '#c8b08a', '#6b6f73', '#6e2a35', '#2f5d62', '#a9c1d9', '#d9d2c5', '#2b3a2f'];
const PANTS = ['#2b2d31', '#232b3d', '#9b8a6b', '#18191b', '#4a4d52'];
const SKIN = ['#e0b896', '#c68e66', '#8d5a3b', '#f1d0b5', '#a8714d'];
const HAIR = ['#2a1d15', '#5a3d26', '#151515', '#b38a5a', '#8a8a8a'];
const mat = (c: string) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.82 });

export type Look = { top: THREE.Material; pants: THREE.Material; skin: THREE.Material; hair: THREE.Material; h: number };
export const looks: Look[] = (() => { const r = rng(42); return Array.from({ length: 40 }, () => ({ top: mat(TOPS[Math.floor(r() * TOPS.length)]), pants: mat(PANTS[Math.floor(r() * PANTS.length)]), skin: mat(SKIN[Math.floor(r() * SKIN.length)]), hair: mat(HAIR[Math.floor(r() * HAIR.length)]), h: 0.94 + r() * 0.12 })); })();

// leg/arm swing a (rad), body bob b; seated hides legs
export const Person = ({ look, a = 0, b = 0, arm = 0, seated = false }: { look: Look; a?: number; b?: number; arm?: number; seated?: boolean }) => (
  <group scale={look.h} position={[0, b, 0]}>
    {!seated && [-1, 1].map((s) => (
      <group key={s} position={[s * 0.1, 0.9, 0]} rotation={[s * a, 0, 0]}>
        <mesh position={[0, -0.43, 0]} material={look.pants} castShadow><capsuleGeometry args={[0.075, 0.72, 4, 12]} /></mesh>
      </group>
    ))}
    <mesh position={[0, seated ? 0.95 : 1.24, 0]} scale={[1.25, 1, 0.72]} material={look.top} castShadow><capsuleGeometry args={[0.17, 0.42, 6, 16]} /></mesh>
    {[-1, 1].map((s) => (
      <group key={s} position={[s * 0.26, seated ? 1.18 : 1.47, 0]} rotation={[-s * (a + arm) * 0.8, 0, s * 0.06]}>
        <mesh position={[0, -0.3, 0]} material={look.top} castShadow><capsuleGeometry args={[0.055, 0.5, 4, 10]} /></mesh>
      </group>
    ))}
    <mesh position={[0, seated ? 1.42 : 1.7, 0]} material={look.skin} castShadow><sphereGeometry args={[0.112, 24, 16]} /></mesh>
    <mesh position={[0, seated ? 1.46 : 1.74, -0.02]} scale={[1.04, 0.8, 1.06]} material={look.hair}><sphereGeometry args={[0.116, 24, 16]} /></mesh>
  </group>
);

// desks along arcs, facing the camera
const wood = new THREE.MeshStandardMaterial({ color: '#ebe7df', roughness: 0.45 });
const panel = new THREE.MeshStandardMaterial({ color: '#5d6a66', roughness: 0.85 });
const dark = new THREE.MeshStandardMaterial({ color: '#202326', roughness: 0.5 });
const screen = new THREE.MeshBasicMaterial({ color: new THREE.Color(1.5, 1.85, 2.4) });
const plant = new THREE.MeshStandardMaterial({ color: '#3f6b3a', roughness: 0.9 });

type DeskT = { th: number; r: number; seat: number; mon: boolean; plant: boolean };
const DESKS: DeskT[] = (() => {
  const r = rng(11), out: DeskT[] = [];
  for (const R of [4.6, 6.9, 9.4]) {
    const step = 2.25 / R;
    for (let th = -SPAN / 2 + step * 0.5 + r() * step * 0.3; th < SPAN / 2; th += step) {
      out.push({ th, r: R, seat: r() < 0.55 ? Math.floor(r() * looks.length) : -1, mon: r() < 0.85, plant: r() < 0.18 });
    }
  }
  return out;
})();

const Desks = ({ p }: { p: number }) => (
  <>
    {DESKS.map((d, i) => {
      const [x, z] = polar(d.th, d.r);
      const sway = Math.sin(TAU * (p * (1 + (i % 3)) + i * 0.137)) * 0.04;
      return (
        <group key={i} position={[x, 0, z]} rotation={[0, -d.th, 0]}>
          <mesh position={[0, 0.74, 0]} material={wood} castShadow receiveShadow><boxGeometry args={[1.6, 0.04, 0.78]} /></mesh>
          <mesh position={[0, 0.42, -0.36]} material={panel} castShadow><boxGeometry args={[1.56, 0.62, 0.03]} /></mesh>
          <mesh position={[0, 0.98, -0.42]} material={panel}><boxGeometry args={[1.6, 0.5, 0.03]} /></mesh>
          {d.mon && <>
            <mesh position={[0.12, 1.02, -0.05]} material={dark}><boxGeometry args={[0.64, 0.4, 0.035]} /></mesh>
            <mesh position={[0.12, 1.02, -0.03]} material={screen}><planeGeometry args={[0.6, 0.36]} /></mesh>
          </>}
          {d.plant && <mesh position={[-0.6, 0.86, 0.1]} material={plant} scale={[1, 1.3, 1]}><sphereGeometry args={[0.13, 16, 12]} /></mesh>}
          {d.seat >= 0 && (
            <group position={[0.12, 0, -0.75]} rotation={[sway, Math.PI * 0 + sway * 2, 0]}>
              <Person look={looks[d.seat]} seated arm={0.3} />
            </group>
          )}
        </group>
      );
    })}
  </>
);

// walkers: lane radius, start column, columns travelled per loop (direction by sign)
type W = { r: number; k: number; s: number; look: number; ph: number };
const WALKERS: W[] = [
  { r: 5.85, k: 0, s: 1, look: 1, ph: 0.1 }, { r: 5.85, k: 3, s: -2, look: 4, ph: 0.4 }, { r: 5.85, k: 4, s: 2, look: 7, ph: 0.7 },
  { r: 8.25, k: 1, s: 2, look: 9, ph: 0.2 }, { r: 8.25, k: 5, s: -2, look: 12, ph: 0.5 }, { r: 8.25, k: 6, s: 1, look: 15, ph: 0.9 }, { r: 8.25, k: 2, s: -1, look: 18, ph: 0.3 },
  { r: 8.1, k: 0, s: 2, look: 21, ph: 0.6 }, { r: 8.1, k: 3, s: 2, look: 24, ph: 0.15 }, { r: 8.1, k: 7, s: -2, look: 27, ph: 0.85 }, { r: 8.1, k: 5, s: 1, look: 30, ph: 0.45 },
  { r: 10.6, k: 2, s: -1, look: 33, ph: 0.25 }, { r: 10.6, k: 4, s: 2, look: 36, ph: 0.65 }, { r: 10.6, k: 7, s: -2, look: 39, ph: 0.05 },
];

// occluders are COL_R away; a walker is hidden at angle colTh(k) only if it is behind the column
const Walkers = ({ p }: { p: number }) => (
  <>
    {WALKERS.map((w, i) => {
      const q = (p + w.ph) % 1;                                      // each walker wraps at its own time, always behind a column
      const th = colTh(w.k) + (colTh(w.k + w.s) - colTh(w.k)) * q;
      const [x, z] = polar(th, w.r);
      const arc = Math.abs(w.s) * SLICE * w.r;
      const cycles = Math.max(1, Math.round(arc / 1.45));          // one cycle = two steps
      const ph = TAU * (cycles * p + w.ph);
      const dir = Math.sign(w.s);
      const face = Math.atan2(dir * Math.cos(th), dir * Math.sin(th));
      return (
        <group key={i} position={[x, 0, z]} rotation={[0, face, 0]}>
          <Person look={looks[w.look]} a={Math.sin(ph) * 0.42} b={Math.abs(Math.sin(ph)) * 0.035} />
        </group>
      );
    })}
  </>
);

// standing pairs talking near the far desks
const Talkers = ({ p }: { p: number }) => (
  <>
    {[[-2.6, 8.3, 2], [-0.4, 6.0, 5], [1.35, 8.4, 8], [2.9, 6.2, 11]].map(([th0, r, lk], i) => (
      <group key={i}>
        {[-1, 1].map((s) => {
          const th = th0 + s * 0.035;
          const [x, z] = polar(th, r);
          return (
            <group key={s} position={[x, 0, z]} rotation={[0, -th + s * 1.3 + Math.PI, 0]}>
              <Person look={looks[(lk + (s > 0 ? 1 : 0)) % looks.length]} arm={s > 0 ? 0.25 + 0.25 * Math.sin(TAU * (2 * p + i * 0.3)) : 0.05} b={0.01 * Math.sin(TAU * (p + i * 0.2 + s * 0.3))} />
            </group>
          );
        })}
      </group>
    ))}
  </>
);

// ---------- post: per-slide cameras → variable blur → grade ----------
export const VERT = 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }';
export const FRAG = `
uniform sampler2D tex; uniform vec2 dir; uniform vec2 res; uniform float final; uniform float seed;
uniform float blurL; uniform float blurR; uniform float gradeU;
varying vec2 vUv;
float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233)) + seed) * 43758.5453); }
void main(){
  float u = gradeU < 0.0 ? vUv.x : gradeU;
  float s = mix(blurL, blurR, smoothstep(0.0, 1.0, u));
  vec3 acc = vec3(0.0); float wsum = 0.0;
  for (int i = -24; i <= 24; i++) {
    float x = float(i) * s / 8.0;
    float g = exp(-0.5 * x * x / (s * s));
    acc += texture2D(tex, vUv + dir * x / res).rgb * g; wsum += g;
  }
  vec3 c = acc / wsum;
  if (final > 0.5) {
    float lum = dot(c, vec3(0.2126, 0.7152, 0.0722));
    c = mix(vec3(lum), c, mix(0.3, 1.15, u));
    c *= mix(vec3(0.82, 0.93, 1.08), vec3(1.12, 1.0, 0.84), u);
    c *= mix(0.72, 1.12, u);
  }
  gl_FragColor = vec4(c, 1.0);
  if (final > 0.5) {
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
    gl_FragColor.rgb += (hash(vUv * res) - 0.5) * 0.035;
  }
}`;

export type Pan = { yaw: number; pitch: number; roll: number; vfov: number; grade: number };
const Post = ({ fRef, w, h, blur, pan }: { fRef: React.MutableRefObject<number>; w: number; h: number; blur: [number, number]; pan?: React.MutableRefObject<Pan | undefined> }) => {
  const { scene } = useThree();
  const st = useMemo(() => {
    const A = new THREE.WebGLRenderTarget(w, h, { type: THREE.HalfFloatType, samples: 4 });
    const B = new THREE.WebGLRenderTarget(w, h, { type: THREE.HalfFloatType });
    const panCam = new THREE.PerspectiveCamera(50, w / h, 0.1, 80); panCam.position.set(0, EYE, 0);
    const cams = Array.from({ length: N }, (_, k) => {
      const c = new THREE.PerspectiveCamera(VFOV, ASPECT, 0.1, 80);
      c.position.set(0, EYE, 0); c.rotation.set(0, -(k - (N - 1) / 2) * SLICE, 0, 'YXZ');
      c.updateMatrixWorld(); c.updateProjectionMatrix(); return c;
    });
    const m = new THREE.ShaderMaterial({
      uniforms: { tex: { value: null }, dir: { value: new THREE.Vector2() }, res: { value: new THREE.Vector2(w, h) }, final: { value: 0 }, seed: { value: 0 }, blurL: { value: blur[0] }, blurR: { value: blur[1] }, gradeU: { value: -1 } },
      vertexShader: VERT, fragmentShader: FRAG, depthTest: false, depthWrite: false,
    });
    const qs = new THREE.Scene(); qs.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), m));
    return { A, B, cams, panCam, m, qs, qc: new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1) };
  }, [w, h]);
  useFrame(({ gl }) => {
    const { A, B, cams, panCam, m, qs, qc } = st, sw = w / N;
    const pv = pan?.current;
    gl.autoClear = false;
    A.scissorTest = false; A.viewport.set(0, 0, w, h); gl.setRenderTarget(A); gl.clear();
    if (pv) {
      panCam.fov = pv.vfov; panCam.rotation.set(pv.pitch, -pv.yaw, pv.roll, 'YXZ'); panCam.updateProjectionMatrix(); panCam.updateMatrixWorld();
      gl.setRenderTarget(A); gl.render(scene, panCam);
    } else cams.forEach((c, k) => {
      A.viewport.set(k * sw, 0, sw, h); A.scissor.set(k * sw, 0, sw, h); A.scissorTest = true;
      gl.setRenderTarget(A); gl.render(scene, c);
    });
    A.scissorTest = false; A.viewport.set(0, 0, w, h);
    m.uniforms.seed.value = (fRef.current % 180) * 1.618; m.uniforms.blurL.value = blur[0]; m.uniforms.blurR.value = blur[1]; m.uniforms.gradeU.value = pv ? pv.grade : -1;
    m.uniforms.tex.value = A.texture; m.uniforms.dir.value.set(1, 0); m.uniforms.final.value = 0;
    gl.setRenderTarget(B); gl.clear(); gl.render(qs, qc);
    m.uniforms.tex.value = B.texture; m.uniforms.dir.value.set(0, 1); m.uniforms.final.value = 1;
    gl.setRenderTarget(null); gl.clear(); gl.render(qs, qc);
  }, 1);
  return null;
};

const Setup = () => {
  const { gl, scene } = useThree();
  useMemo(() => {
    const pm = new THREE.PMREMGenerator(gl);
    scene.environment = pm.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environmentIntensity = 0.55;
    scene.background = new THREE.Color('#d9e2e6');
    scene.fog = new THREE.Fog('#cdd6d8', 9, 40);
    gl.toneMapping = THREE.ACESFilmicToneMapping; gl.toneMappingExposure = 1.05;
  }, [gl, scene]);
  return null;
};

export const Office = ({ f, loop, w, h, blur = [16, 6], pan }: { f: number; loop: number; w: number; h: number; blur?: [number, number]; pan?: Pan }) => {
  const fRef = useRef(f); fRef.current = f;
  const panRef = useRef(pan); panRef.current = pan;
  const p = (f % loop) / loop;
  return (
    <ThreeCanvas width={w} height={h} shadows gl={{ antialias: false }} camera={{ position: [0, EYE, 0] }}>
      <Setup />
      <hemisphereLight args={['#e8eef2', '#6f6457', 0.9]} />
      <directionalLight position={[3, 12, 7]} intensity={1.6} color="#fff4e6" castShadow
        shadow-mapSize={[4096, 4096]} shadow-camera-left={-18} shadow-camera-right={18} shadow-camera-top={18} shadow-camera-bottom={-18} shadow-camera-far={40} shadow-bias={-0.0004} />
      <Room />
      <Columns />
      <Desks p={p} />
      <Walkers p={p} />
      <Talkers p={p} />
      <Post fRef={fRef} w={w} h={h} blur={blur} pan={pan ? panRef : undefined} />
    </ThreeCanvas>
  );
};
