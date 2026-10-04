// node render.mjs --fps 60 --sub 2      -> out/desk-test.mp4
// node render.mjs --stills 3.2,8.6,12.4  -> out/still-<t>.png
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const argv = process.argv;
const arg = (k, d) => { const i = argv.indexOf('--' + k); return i > 0 ? argv[i + 1] : d; };
const LANG = arg('lang', 'en'), FMT = arg('fmt', '916'), FPS = Number(arg('fps', 60)), SUB = Number(arg('sub', 1));
const STILLS = arg('stills', '');
const dir = path.dirname(fileURLToPath(import.meta.url));
mkdirSync(path.join(dir, 'out'), { recursive: true });

const browser = await chromium.launch();
const [VW, VH] = [1920, 1080];
const page = await browser.newPage({ viewport: { width: VW, height: VH }, deviceScaleFactor: 1 });
await page.goto(`file://${dir}/index.html`);
await page.evaluate(() => window.ready);
const DUR = Number(arg('dur', await page.evaluate(() => window.DUR)));
const grab = async (t) => {
  const url = await page.evaluate((t) => { window.seek(t); return document.getElementById('c').toDataURL('image/png'); }, t);
  return Buffer.from(url.split(',')[1], 'base64');
};

if (STILLS) {
  for (const t of STILLS.split(',').map(Number)) writeFileSync(path.join(dir, `out/still-${t}.png`), await grab(t));
} else {
  const vf = SUB > 1 ? `tmix=frames=${SUB},select='eq(mod(n\\,${SUB})\\,${SUB - 1})',setpts=N/${FPS}/TB` : 'null';
  const out = path.join(dir, `out/desk-test.mp4`);
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS * SUB), '-i', '-',
    '-vf', vf, '-r', String(FPS), '-c:v', 'libx264', '-crf', '16', '-preset', 'slow', '-pix_fmt', 'yuv420p',
    '-movflags', '+faststart', out], { stdio: ['pipe', 'inherit', 'inherit'] });
  const total = Math.round(DUR * FPS * SUB);
  for (let i = 0; i < total; i++) {
    const png = await grab(i / (FPS * SUB));
    if (!ff.stdin.write(png)) await new Promise((r) => ff.stdin.once('drain', r));
    if (i % (FPS * SUB * 5) === 0) console.log(`${LANG}: ${(i / (FPS * SUB)).toFixed(0)}s / ${DUR.toFixed(1)}s`);
  }
  ff.stdin.end();
  await new Promise((r) => ff.on('close', r));
  console.log('wrote', out);
}
await browser.close();
