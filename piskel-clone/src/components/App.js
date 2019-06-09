import css from '../view/style';
import canvas from './canvas/actionWithCanvases';
import actionWithFrames from './actionWithFrames/actionWithFrames';

export default function app() {
  css();
  canvas();
  actionWithFrames();
}
