import { Composition, continueRender, delayRender, staticFile } from 'remotion';
import { Showreel, SHOWREEL_FRAMES } from './Showreel';
import { Carousel, CW, SH, LOOP } from './Carousel';
import { Office } from './Office';
import { Carousel2 } from './Carousel2';
import { useCurrentFrame } from 'remotion';
const OfficeTest = () => <Office f={useCurrentFrame()} loop={LOOP} w={CW / 2} h={SH / 2} />;

const fontHandle = delayRender('fonts');
Promise.all([
  new FontFace('Mont', `url(${staticFile('Montserrat-var.woff2')})`, { weight: '100 900' }),
  new FontFace('Tape', `url(${staticFile('CourierPrime-400.woff2')})`, { weight: '400' }),
  new FontFace('Tape', `url(${staticFile('CourierPrime-700.woff2')})`, { weight: '700' }),
].map((f) => f.load().then((ff) => document.fonts.add(ff)))).then(() => continueRender(fontHandle));

export const RemotionRoot = () => (
  <>
    <Composition id="Showreel" component={Showreel} durationInFrames={SHOWREEL_FRAMES} fps={60} width={1080} height={1920} />
    <Composition id="Carousel" component={Carousel} durationInFrames={LOOP} fps={30} width={CW} height={SH} />
    <Composition id="Carousel2" component={Carousel2} durationInFrames={LOOP} fps={30} width={CW} height={SH} />
    <Composition id="OfficeTest" component={OfficeTest} durationInFrames={LOOP} fps={30} width={CW / 2} height={SH / 2} />
  </>
);
