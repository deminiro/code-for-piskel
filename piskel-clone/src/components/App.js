import css from '../view/style';
import canvas from './canvas/mainCanvas';
import addNewFrame from './actionWithFrames/addNewFrame';

export default function app() {
  css();
  canvas();
  addNewFrame();
}
