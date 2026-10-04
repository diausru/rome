// node music.mjs out/music-raw.wav — 20 s ambient bed synthesized in code (no samples, no licences needed).
// Tension (pulse speeds up, clock ticks toward the deadline) → a breath of silence → resolution on the CTA at 16 s.
import { writeFileSync } from 'node:fs';
const SR = 48000, DUR = 20, N = SR * DUR;
const L = new Float32Array(N), R = new Float32Array(N);
const hz = (m) => 440 * Math.pow(2, (m - 69) / 12);
let seed = 7; const noise = () => (seed = (seed * 1664525 + 1013904223) >>> 0) / 2147483648 - 1;
const T = [0, 3, 5.5, 7.8, 10.1, 12.4, 16];
const smooth = (x) => x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x);

// pad chords (MIDI): Am, Am, F, C, G, Esus→E, C(resolution)
const CH = [[45, 57, 60, 64], [45, 57, 60, 64], [41, 57, 60, 65], [48, 55, 60, 64], [43, 55, 59, 62], [40, 56, 59, 64], [48, 55, 60, 64, 67]];
function pad(t0, t1, notes, gain) {
  const a = 0.9, r = 1.2;
  for (const m of notes) for (const det of [-0.12, 0, 0.11]) {
    const f = hz(m) * Math.pow(2, det / 12), pan = 0.5 + det * 3;
    for (let i = Math.floor(t0 * SR); i < Math.min(N, Math.floor((t1 + r) * SR)); i++) {
      const t = i / SR, env = smooth((t - t0) / a) * (t > t1 ? 1 - smooth((t - t1) / r) : 1);
      let v = 0; for (let h = 1; h <= 6; h++) v += Math.sin(2 * Math.PI * f * h * t + h) / Math.pow(h, 1.7);
      v *= env * gain * (0.85 + 0.15 * Math.sin(2 * Math.PI * 0.2 * t));
      L[i] += v * (1 - pan * 0.4); R[i] += v * (0.6 + pan * 0.4);
    }
  }
}
for (let k = 0; k < 6; k++) pad(T[k], T[k + 1], CH[k], k === 5 ? 0.017 : 0.02);
pad(16, 19.2, CH[6], 0.022);

// heartbeat: lub-dub thumps, 60 → 88 bpm, stops before the CTA
let tb = 0.4;
while (tb < 15.6) {
  for (const [dt, g] of [[0, 1], [0.2, 0.6]]) {
    const s0 = Math.floor((tb + dt) * SR);
    for (let i = 0; i < SR * 0.35 && s0 + i < N; i++) {
      const t = i / SR, v = Math.sin(2 * Math.PI * (52 - 20 * t) * t) * Math.exp(-t * 14) * 0.11 * g;
      L[s0 + i] += v; R[s0 + i] += v;
    }
  }
  const bpm = 60 + 28 * smooth(tb / 15); tb += 60 / bpm;
}
// clock tick from the deadline on (every 0.5 s), fading out before the breath
for (let tt = 3; tt < 15.5; tt += 0.5) {
  const s0 = Math.floor(tt * SR), g = 0.05 * (tt % 1 < 0.25 ? 1 : 0.6);
  for (let i = 0; i < SR * 0.03; i++) { const t = i / SR, v = noise() * Math.exp(-t * 260) * g + Math.sin(2 * Math.PI * 3200 * t) * Math.exp(-t * 300) * g * 0.6;
    L[s0 + i] += v * 0.7; R[s0 + i] += v; }
}
// soft glass tap on every screen change
for (const tt of T.slice(1)) {
  const s0 = Math.floor(tt * SR);
  for (let i = 0; i < SR * 0.25; i++) { const t = i / SR, v = (Math.sin(2 * Math.PI * 2400 * t) + 0.5 * Math.sin(2 * Math.PI * 3610 * t)) * Math.exp(-t * 28) * 0.035;
    L[s0 + i] += v; R[s0 + i] += v; }
}
// riser 12.4 → 15.7, then silence until the resolution
let lp = 0;
for (let i = Math.floor(12.4 * SR); i < Math.floor(15.7 * SR); i++) {
  const t = i / SR, p = (t - 12.4) / 3.3; lp += (noise() - lp) * (0.02 + 0.25 * p * p);
  const v = (lp * 0.5 + Math.sin(2 * Math.PI * (220 + 440 * p * p) * t) * 0.15) * p * p * 0.12 * (1 - smooth((t - 15.5) / 0.2));
  L[i] += v; R[i] += v;
}
// resolution bell at 16 s
for (const [m, g] of [[72, 1], [79, 0.6], [84, 0.4]]) {
  const f = hz(m), s0 = 16 * SR;
  for (let i = 0; i < SR * 3.5 && s0 + i < N; i++) { const t = i / SR;
    const v = (Math.sin(2 * Math.PI * f * t) + 0.3 * Math.sin(2 * Math.PI * f * 2.76 * t) * Math.exp(-t * 3)) * Math.exp(-t * 1.3) * 0.1 * g;
    L[s0 + i] += v; R[s0 + i] += v * 0.9; }
}
// master fade in/out
for (let i = 0; i < N; i++) { const t = i / SR, g = smooth(t / 0.6) * (1 - smooth((t - 18.8) / 1.2)); L[i] *= g; R[i] *= g; }

const b = Buffer.alloc(44 + N * 4);
b.write('RIFF', 0); b.writeUInt32LE(36 + N * 4, 4); b.write('WAVEfmt ', 8); b.writeUInt32LE(16, 16); b.writeUInt16LE(1, 20); b.writeUInt16LE(2, 22);
b.writeUInt32LE(SR, 24); b.writeUInt32LE(SR * 4, 28); b.writeUInt16LE(4, 32); b.writeUInt16LE(16, 34); b.write('data', 36); b.writeUInt32LE(N * 4, 40);
for (let i = 0; i < N; i++) { b.writeInt16LE(Math.round(Math.max(-1, Math.min(1, L[i])) * 32767), 44 + i * 4); b.writeInt16LE(Math.round(Math.max(-1, Math.min(1, R[i])) * 32767), 46 + i * 4); }
writeFileSync(process.argv[2], b);
