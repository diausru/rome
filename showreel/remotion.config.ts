import { Config } from '@remotion/cli/config';
import fs from 'fs';
// headless_shell version differs between containers: use whichever /opt/pw-browsers/chromium_headless_shell-* exists
const hs = fs.existsSync('/opt/pw-browsers') ? fs.readdirSync('/opt/pw-browsers').filter((d) => d.startsWith('chromium_headless_shell-')).sort().pop() : undefined;
const sub = hs ? ['chrome-linux', 'chrome-headless-shell-linux64'].map((s) => `/opt/pw-browsers/${hs}/${s}`).find((p) => fs.existsSync(p)) : undefined;
const exe = sub ? ['headless_shell', 'chrome-headless-shell'].map((b) => `${sub}/${b}`).find((p) => fs.existsSync(p)) : undefined;
if (exe) Config.setBrowserExecutable(exe);
Config.setChromiumOpenGlRenderer('swangle');
Config.setVideoImageFormat('jpeg');
Config.setJpegQuality(95);
