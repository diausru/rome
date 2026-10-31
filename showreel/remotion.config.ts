import { Config } from '@remotion/cli/config';
import { existsSync, readdirSync } from 'fs';
// Pre-installed Playwright headless shell; the version folder changes between containers, so pick whichever exists.
const pw = '/opt/pw-browsers';
const shell = existsSync(pw) ? readdirSync(pw).filter((d) => d.startsWith('chromium_headless_shell-')).sort().reverse()
  .flatMap((d) => [`${pw}/${d}/chrome-headless-shell-linux64/chrome-headless-shell`, `${pw}/${d}/chrome-linux/headless_shell`]).find(existsSync) : undefined;
if (shell) Config.setBrowserExecutable(shell);
Config.setChromiumOpenGlRenderer('swangle');
Config.setVideoImageFormat('jpeg');
Config.setJpegQuality(95);
