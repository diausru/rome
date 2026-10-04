// node music.mjs public/music-raw.wav — 15 s score for the showreel, 120 BPM, synthesized (no samples).
import { writeFileSync } from 'node:fs';
const SR = 48000, DUR = 15, N = SR * DUR;
const L = new Float32Array(N), R = new Float32Array(N);
let seed = 3; const noise = () => (seed = (seed * 1664525 + 1013904223) >>> 0) / 2147483648 - 1;
const hz = (m) => 440 * Math.pow(2, (m - 69) / 12);
const add = (t0, len, fn, pan = 0.5, g = 1) => { const s0 = Math.floor(t0 * SR); for (let i = 0; i < len * SR && s0 + i < N; i++) { if (s0 + i < 0) continue; const v = fn(i / SR) * g; L[s0 + i] += v * (1 - pan) * 2 * 0.5 + v * 0.5 * (1 - Math.abs(pan - 0.5)); R[s0 + i] += v * pan * 2 * 0.5 + v * 0.5 * (1 - Math.abs(pan - 0.5)); } };
const CUTS = [1.95, 4.4, 6.85, 9.3, 11.25, 13.2].map((t) => t + 0.15);
const B = 0.5; // beat
// drums
for (let t = 0; t < 14.4; t += B) {
  add(t, 0.4, (x) => Math.sin(2 * Math.PI * (48 + 120 * Math.exp(-x * 30)) * x) * Math.exp(-x * 9) * 0.9);                 // kick
  if (Math.round(t / B) % 2 === 1) add(t, 0.25, (x) => (noise() * 0.7 + Math.sin(2 * Math.PI * 190 * x) * 0.3) * Math.exp(-x * 22) * 0.45); // clap
  add(t + B / 2, 0.06, (x) => noise() * Math.exp(-x * 90) * 0.18, 0.7);                                                     // hat
  add(t, 0.05, (x) => noise() * Math.exp(-x * 120) * 0.08, 0.3);
}
// bass + pluck arpeggio, Am F C G (2 s per chord)
const PROG = [[45, 57, 60, 64], [41, 53, 57, 60], [48, 55, 60, 64], [43, 55, 59, 62]];
for (let bar = 0; bar < 7; bar++) {
  const ch = PROG[bar % 4], t0 = bar * 2;
  for (let k = 0; k < 4; k++) add(t0 + k * B, 0.45, (x) => { const f = hz(ch[0] - 12); return (Math.sin(2 * Math.PI * f * x) + 0.3 * Math.sin(4 * Math.PI * f * x)) * Math.exp(-x * 5) * 0.5; });
  for (let k = 0; k < 8; k++) { const m = ch[1 + (k % 3)] + 12; add(t0 + k * B / 2, 0.3, (x) => (Math.sin(2 * Math.PI * hz(m) * x) + 0.4 * Math.sin(4 * Math.PI * hz(m) * x)) * Math.exp(-x * 11) * 0.13, k % 2 ? 0.75 : 0.25); }
  add(t0, 2.1, (x) => ch.slice(1).reduce((s, m) => s + Math.sin(2 * Math.PI * hz(m) * x) * 0.5 + Math.sin(2 * Math.PI * hz(m) * 1.003 * x) * 0.5, 0) * Math.min(1, x * 3) * Math.exp(-x * 0.8) * 0.035);
}
// whoosh into every cut + impact on it
for (const c of CUTS) {
  let lp = 0; add(c - 0.45, 0.5, (x) => { const p = x / 0.5; lp += (noise() - lp) * (0.03 + 0.4 * p); return lp * Math.sin(Math.PI * p) * 0.5; }, 0.5);
  add(c, 0.9, (x) => (Math.sin(2 * Math.PI * (60 - 25 * x) * x) * Math.exp(-x * 4) + noise() * Math.exp(-x * 30) * 0.4) * 0.6);
}
// coin ring (coin lands ~2.3 s, outro flip ~13.9 s)
for (const t of [2.35, 14.0]) for (const [f, g] of [[2093, 1], [3136, 0.5], [5274, 0.35]]) add(t, 1.6, (x) => Math.sin(2 * Math.PI * f * x) * Math.exp(-x * 3.2) * 0.12 * g, 0.6);
// typewriter ticks while the receipt prints (≈7.0–8.7 s)
for (let t = 7.02; t < 8.7; t += 1.67 / 44) add(t, 0.03, (x) => (noise() * 0.6 + Math.sin(2 * Math.PI * 2600 * x) * 0.4) * Math.exp(-x * 160) * 0.25, 0.4 + 0.2 * Math.sin(t * 9));
// calendar page flips (≈9.37–10.47 s, 11 flips)
for (let k = 0; k < 11; k++) add(9.37 + k * 0.1, 0.08, (x) => noise() * Math.exp(-x * 60) * 0.25, 0.6);
// subscribe click + final chord
add(14.43, 0.05, (x) => Math.sin(2 * Math.PI * 1800 * x) * Math.exp(-x * 120) * 0.4);
add(13.35, 1.65, (x) => [57, 60, 64, 69].reduce((s, m) => s + Math.sin(2 * Math.PI * hz(m) * x), 0) * Math.min(1, x * 4) * Math.exp(-x * 1.4) * 0.05);
for (let i = 0; i < N; i++) { const t = i / SR, g = Math.min(1, t / 0.05) * (1 - Math.max(0, (t - 14.4) / 0.6)); L[i] *= g; R[i] *= g; }
const b = Buffer.alloc(44 + N * 4);
b.write('RIFF', 0); b.writeUInt32LE(36 + N * 4, 4); b.write('WAVEfmt ', 8); b.writeUInt32LE(16, 16); b.writeUInt16LE(1, 20); b.writeUInt16LE(2, 22);
b.writeUInt32LE(SR, 24); b.writeUInt32LE(SR * 4, 28); b.writeUInt16LE(4, 32); b.writeUInt16LE(16, 34); b.write('data', 36); b.writeUInt32LE(N * 4, 40);
let peak = 1e-9; for (let i = 0; i < N; i++) peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i]));
for (let i = 0; i < N; i++) { b.writeInt16LE(Math.round(L[i] / peak * 0.9 * 32767), 44 + i * 4); b.writeInt16LE(Math.round(R[i] / peak * 0.9 * 32767), 46 + i * 4); }
writeFileSync(process.argv[2], b);
