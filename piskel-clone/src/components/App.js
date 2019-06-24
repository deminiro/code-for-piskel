import css from '../view/style';
import actionWithCanvas from './canvas/actionWithCanvases';
import actionWithFrames from './actionWithFrames/actionWithFrames';
import shortCuts from './shortcuts/shortcut';

export default function app() {
  css();
  actionWithCanvas();
  actionWithFrames();
  shortCuts();
}
