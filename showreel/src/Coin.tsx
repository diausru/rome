import { ThreeCanvas } from '@remotion/three';
import { useThree } from '@react-three/fiber';
import { useMemo } from 'react';
import { useVideoConfig } from 'remotion';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

export const LEAF = 'M50,2 L57,16 L64,12 L62,34 L76,22 L80,30 L94,28 L89,42 L97,47 L76,62 L80,72 L58,68 L59,86 L52,86 L52,100 L48,100 L48,86 L41,86 L42,68 L20,72 L24,62 L3,47 L11,42 L6,28 L20,30 L24,22 L38,34 L36,12 L43,16 Z';

const Env = () => {
  const { gl, scene } = useThree();
  useMemo(() => {
    const pm = new THREE.PMREMGenerator(gl);
    scene.environment = pm.fromScene(new RoomEnvironment(), 0.02).texture;
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1.15;
  }, [gl, scene]);
  return null;
};

// Coin face drawn on a canvas: used both as colour variation and as a bump map (embossed relief).
function faceCanvas(kind: 'leaf' | 'dollar') {
  const S = 1024, c = document.createElement('canvas'); c.width = c.height = S;
  const g = c.getContext('2d')!;
  g.fillStyle = '#808080'; g.fillRect(0, 0, S, S);
  g.translate(S / 2, S / 2);
  g.strokeStyle = '#d8d8d8'; g.lineWidth = 26; g.beginPath(); g.arc(0, 0, 470, 0, Math.PI * 2); g.stroke();
  g.lineWidth = 8; g.beginPath(); g.arc(0, 0, 400, 0, Math.PI * 2); g.stroke();
  // ring lettering
  g.fillStyle = '#e0e0e0'; g.font = '700 58px Mont'; g.textAlign = 'center'; g.textBaseline = 'middle';
  const txt = 'TAX SECRETS • CANADA • ';
  for (let i = 0; i < txt.length; i++) {
    const a = (i / txt.length) * Math.PI * 2 - Math.PI / 2;
    g.save(); g.rotate(a + Math.PI / 2); g.translate(0, -435); g.fillText(txt[i], 0, 0); g.restore();
  }
  if (kind === 'leaf') {
    g.save(); g.scale(6.2, 6.2); g.translate(-50, -52);
    g.fillStyle = '#efefef'; g.fill(new Path2D(LEAF)); g.restore();
  } else {
    g.fillStyle = '#efefef'; g.font = '900 560px Mont'; g.fillText('$', 0, 30);
  }
  return c;
}

const CoinMesh = ({ rx, ry, rz, x, y, z, s }: { rx: number; ry: number; rz: number; x: number; y: number; z: number; s: number }) => {
  const mats = useMemo(() => {
    const leaf = new THREE.CanvasTexture(faceCanvas('leaf'));
    const dollar = new THREE.CanvasTexture(faceCanvas('dollar'));
    leaf.colorSpace = dollar.colorSpace = THREE.SRGBColorSpace;
    const edge = document.createElement('canvas'); edge.width = 1024; edge.height = 8;
    const eg = edge.getContext('2d')!;
    for (let i = 0; i < 1024; i += 8) { eg.fillStyle = '#fff'; eg.fillRect(i, 0, 4, 8); eg.fillStyle = '#000'; eg.fillRect(i + 4, 0, 4, 8); }
    const edgeTex = new THREE.CanvasTexture(edge);
    const gold = (map?: THREE.Texture) => new THREE.MeshPhysicalMaterial({
      color: '#e9b949', metalness: 1, roughness: 0.22, clearcoat: 0.3, clearcoatRoughness: 0.3,
      bumpMap: map, bumpScale: 2.2, roughnessMap: map,
    });
    return [gold(edgeTex), gold(leaf), gold(dollar)];
  }, []);
  return (
    <mesh position={[x, y, z]} rotation={[rx, ry, rz]} scale={s} material={mats}>
      <cylinderGeometry args={[1, 1, 0.12, 128, 1]} />
    </mesh>
  );
};

export type CoinPose = { rx: number; ry: number; rz: number; x: number; y: number; z: number; s: number };
export const CoinScene = ({ coins }: { coins: CoinPose[] }) => {
  const { width, height } = useVideoConfig();
  return (
    <ThreeCanvas width={width} height={height} camera={{ position: [0, 0, 10], fov: 30 }} gl={{ antialias: true }}>
      <Env />
      <directionalLight position={[4, 6, 6]} intensity={2.4} />
      <directionalLight position={[-5, -2, 4]} intensity={0.6} color="#9fd8b5" />
      {coins.map((c, i) => <CoinMesh key={i} {...c} />)}
    </ThreeCanvas>
  );
};
