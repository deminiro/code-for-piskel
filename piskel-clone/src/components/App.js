import css from '../view/style';
import canvas from './canvas/actionWithCanvases';
import addNewFrame from './actionWithFrames/actionWithFrames';

export default function app() {
  css();
  canvas();
  addNewFrame();
}
