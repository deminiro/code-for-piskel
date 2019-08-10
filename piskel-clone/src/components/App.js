import actionWithCanvas from './canvas/actionWithCanvases';
import actionWithFrames from './actionWithFrames/actionWithFrames';
import shortCuts from './shortcuts/shortcut';
import closeLandingPage from '../view/closeLandingPage';
import css from '../view/style';

export default function app() {
  async function activate() {
    await css();
    await actionWithCanvas();
    await actionWithFrames();
    await shortCuts();
    await closeLandingPage();
  }
  activate();
}
