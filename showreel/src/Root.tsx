import { Composition, continueRender, delayRender, staticFile } from 'remotion';
import { Showreel, SHOWREEL_FRAMES } from './Showreel';
import { Carousel, CW, SH, LOOP } from './Carousel';
import { Office } from './Office';
import { Home } from './Home';
const HomeTest = () => { const f = useCurrentFrame(); return <Home f={f} T={f / 300} w={540} h={960} />; };
import { Kitchen } from './Kitchen';
const KitchenTest = ({ blur = 8 }: { blur?: number }) => { const f = useCurrentFrame(); return <Kitchen f={f} T={f / 300} w={540} h={960} blur={blur} />; };
import { Carousel2 } from './Carousel2';
import { SalaryShort, SDUR, SFPS } from './SalaryShort';
import { RaiseShort, RDUR, RFPS } from './RaiseShort';
import { Case002, CDUR, CFPS } from './Case002';
import { E3Short, E3DUR, E3FPS } from './E3Short';
import { E2Short, E2DUR, E2FPS } from './E2Short';
import { E2v2, E2V2DUR, E2V2FPS } from './E2v2';
import { E1v2, E1DUR, E1FPS } from './E1v2';
import { D3v2, D3DUR, D3FPS } from './D3v2';
import { D6v2, D6DUR, D6FPS } from './D6v2';
import { E4v2, E4DUR, E4FPS } from './E4v2';
import { A6v2, A6DUR, A6FPS } from './A6v2';
import { A7v2, A7DUR, A7FPS } from './A7v2';
import { H2v2, H2DUR, H2FPS } from './H2v2';
import { G3v2, G3DUR, G3FPS } from './G3v2';
import { D2v2, D2DUR, D2FPS } from './D2v2';
import { D5v2, D5DUR, D5FPS } from './D5v2';
import { C3v2, C3DUR, C3FPS } from './C3v2';
import { F1v2, F1DUR, F1FPS } from './F1v2';
import { F5v2, F5DUR, F5FPS } from './F5v2';
import { F4v2, F4DUR, F4FPS } from './F4v2';
import { C5v2, C5DUR, C5FPS } from './C5v2';
import { A4v2, A4DUR, A4FPS } from './A4v2';
import { G1v2, G1DUR, G1FPS } from './G1v2';
import { useCurrentFrame } from 'remotion';
const OfficeTest = () => <Office f={useCurrentFrame()} loop={LOOP} w={CW / 2} h={SH / 2} />;

const fontHandle = delayRender('fonts');
Promise.all([
  new FontFace('Mont', `url(${staticFile('Montserrat-var.woff2')})`, { weight: '100 900' }),
  new FontFace('Tape', `url(${staticFile('CourierPrime-400.woff2')})`, { weight: '400' }),
  new FontFace('Tape', `url(${staticFile('CourierPrime-700.woff2')})`, { weight: '700' }),
  new FontFace('Fraunces', `url(${staticFile('Fraunces-600.ttf')})`, { weight: '600' }),
  new FontFace('Fraunces', `url(${staticFile('Fraunces-800.ttf')})`, { weight: '800' }),
  new FontFace('Nunito', `url(${staticFile('Nunito-700.ttf')})`, { weight: '700' }),
  new FontFace('Nunito', `url(${staticFile('Nunito-900.ttf')})`, { weight: '900' }),
].map((f) => f.load().then((ff) => document.fonts.add(ff)))).then(() => continueRender(fontHandle));

export const RemotionRoot = () => (
  <>
    <Composition id="Showreel" component={Showreel} durationInFrames={SHOWREEL_FRAMES} fps={60} width={1080} height={1920} />
    <Composition id="Carousel" component={Carousel} durationInFrames={LOOP} fps={30} width={CW} height={SH} />
    <Composition id="Carousel2" component={Carousel2} durationInFrames={LOOP} fps={30} width={CW} height={SH} />
    <Composition id="SalaryShort" component={SalaryShort} durationInFrames={SDUR} fps={SFPS} width={1080} height={1920} />
    <Composition id="RaiseShort" component={RaiseShort} durationInFrames={RDUR} fps={RFPS} width={1080} height={1920} />
    <Composition id="Case002" component={Case002} durationInFrames={CDUR} fps={CFPS} width={1080} height={1920} />
    <Composition id="HomeTest" component={HomeTest} durationInFrames={300} fps={24} width={540} height={960} />
    <Composition id="KitchenTest" component={KitchenTest} durationInFrames={300} fps={24} width={540} height={960} defaultProps={{ blur: 8 }} />
    <Composition id="E3Short" component={E3Short} durationInFrames={E3DUR} fps={E3FPS} width={1080} height={1920} />
    <Composition id="E2Short" component={E2Short} durationInFrames={E2DUR} fps={E2FPS} width={1080} height={1920} />
    <Composition id="E2v2" component={E2v2} durationInFrames={E2V2DUR} fps={E2V2FPS} width={1080} height={1920} />
    <Composition id="E1v2" component={E1v2} durationInFrames={E1DUR} fps={E1FPS} width={1080} height={1920} />
    <Composition id="D3v2" component={D3v2} durationInFrames={D3DUR} fps={D3FPS} width={1080} height={1920} />
    <Composition id="D6v2" component={D6v2} durationInFrames={D6DUR} fps={D6FPS} width={1080} height={1920} />
    <Composition id="E4v2" component={E4v2} durationInFrames={E4DUR} fps={E4FPS} width={1080} height={1920} />
    <Composition id="A6v2" component={A6v2} durationInFrames={A6DUR} fps={A6FPS} width={1080} height={1920} />
    <Composition id="A7v2" component={A7v2} durationInFrames={A7DUR} fps={A7FPS} width={1080} height={1920} />
    <Composition id="H2v2" component={H2v2} durationInFrames={H2DUR} fps={H2FPS} width={1080} height={1920} />
    <Composition id="G3v2" component={G3v2} durationInFrames={G3DUR} fps={G3FPS} width={1080} height={1920} />
    <Composition id="D2v2" component={D2v2} durationInFrames={D2DUR} fps={D2FPS} width={1080} height={1920} />
    <Composition id="D5v2" component={D5v2} durationInFrames={D5DUR} fps={D5FPS} width={1080} height={1920} />
    <Composition id="C3v2" component={C3v2} durationInFrames={C3DUR} fps={C3FPS} width={1080} height={1920} />
    <Composition id="F1v2" component={F1v2} durationInFrames={F1DUR} fps={F1FPS} width={1080} height={1920} />
    <Composition id="F5v2" component={F5v2} durationInFrames={F5DUR} fps={F5FPS} width={1080} height={1920} />
    <Composition id="F4v2" component={F4v2} durationInFrames={F4DUR} fps={F4FPS} width={1080} height={1920} />
    <Composition id="C5v2" component={C5v2} durationInFrames={C5DUR} fps={C5FPS} width={1080} height={1920} />
    <Composition id="A4v2" component={A4v2} durationInFrames={A4DUR} fps={A4FPS} width={1080} height={1920} />
    <Composition id="G1v2" component={G1v2} durationInFrames={G1DUR} fps={G1FPS} width={1080} height={1920} />
    <Composition id="OfficeTest" component={OfficeTest} durationInFrames={LOOP} fps={30} width={CW / 2} height={SH / 2} />
  </>
);
