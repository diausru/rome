// node render.mjs --v glass|glassv|desk [--fps 30] [--stills 1,4,9]  -> out/<v>.mp4 (silent) or out/still-<v>-<t>.png
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const argv = process.argv;
const arg = (k, d) => { const i = argv.indexOf('--' + k); return i > 0 ? argv[i + 1] : d; };
const V = arg('v', 'glass'), FPS = Number(arg('fps', 30)), STILLS = arg('stills', '');
const dir = path.dirname(fileURLToPath(import.meta.url));
mkdirSync(path.join(dir, 'out'), { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
await page.goto(`file://${dir}/index.html?v=${V}`);
await page.evaluate(() => window.ready);
const DUR = await page.evaluate(() => window.DUR);
const grab = async (t, type = 'png') => { await page.evaluate((t) => window.seek(t), t); return page.screenshot({ type, quality: type === 'jpeg' ? 95 : undefined, clip: { x: 0, y: 0, width: 1080, height: 1920 } }); };

if (STILLS) {
  for (const t of STILLS.split(',').map(Number)) writeFileSync(path.join(dir, `out/still-${V}-${t}.png`), await grab(t));
} else {
  const out = path.join(dir, `out/${V}-silent.mp4`);
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-i', '-',
    '-c:v', 'libx264', '-crf', '17', '-preset', 'medium', '-pix_fmt', 'yuv420p', out], { stdio: ['pipe', 'inherit', 'inherit'] });
  const total = Math.round(DUR * FPS);
  for (let i = 0; i < total; i++) {
    const img = await grab(i / FPS, 'jpeg');
    if (!ff.stdin.write(img)) await new Promise((r) => ff.stdin.once('drain', r));
  }
  ff.stdin.end(); await new Promise((r) => ff.on('close', r));
  console.log('wrote', out);
}
await browser.close();
