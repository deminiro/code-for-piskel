export default function shotcutsFunction() {
  // numbers equal to key code
  function shotcutsForTools() {
    const penToolKeyCode = 80;
    const penTool = document.getElementsByClassName('tools-which-change-canvas--pen')[0];
    const mirrorPenToolKeyCode = 86;
    const mirrorPenTool = document.getElementsByClassName('tools-which-change-canvas--mirror-pen')[0];
    const paintBucketToolKeyCode = 66;
    const paintBucketTool = document.getElementsByClassName('tools-which-change-canvas--paint-bucket-tool')[0];
    const paintAllPixelsSameColorToolKeyCode = 65;
    const paintAllPixelsSameColorTool = document.getElementsByClassName('tools-which-change-canvas--paint-all-pixels-of-the-same-color')[0];
    const eraserToolKeyCode = 69;
    const eraserTool = document.getElementsByClassName('tools-which-change-canvas--eraser-tool')[0];
    const strokeToolKeyCode = 76;
    const strokeTool = document.getElementsByClassName('tools-which-change-canvas--stroke-tool')[0];
    const rectangleToolKeyCode = 82;
    const rectangleTool = document.getElementsByClassName('tools-which-change-canvas--rectangle-tool')[0];
    const circleToolKeyCode = 67;
    const circleTool = document.getElementsByClassName('tools-which-change-canvas--circle-tool')[0];
    const moveToolKeyCode = 77;
    const moveTool = document.getElementsByClassName('tools-which-change-canvas--move-tool')[0];
    const shapeSelectionToolKeyCode = 90;
    const shapeSelectionTool = document.getElementsByClassName('tools-which-change-canvas--shape-selection')[0];
    const ditheringToolKeyCode = 84;
    const ditheringTool = document.getElementsByClassName('tools-which-change-canvas--dithering-tool')[0];
    const rotateToolKeyCode = 81;
    const rotateTool = document.getElementsByClassName('tools-which-change-canvas--rotate')[0];
    const lightenToolKeyCode = 85;
    const lightenTool = document.getElementsByClassName('tools-which-change-canvas--lighten')[0];
    const darkenToolKeyCode = 73;
    const darkenTool = document.getElementsByClassName('tools-which-change-canvas--darken')[0];
    const colorPickerToolKeyCode = 79;
    const colorPickerTool = document.getElementsByClassName('tools-which-change-canvas--color-picker')[0];

    function activateNeedableToolByKeyboard(event) {
      const previosTool = document.getElementsByClassName('active')[0];
      // if use keyboard and button not change tool, below variable need to check it
      let changeTool = false;
      function activate() {
        if (event.keyCode === penToolKeyCode && penTool.classList.contains('no-active')) {
          penTool.classList.remove('no-active');
          penTool.classList.add('active');
          changeTool = true;
        }
        if (event.keyCode === mirrorPenToolKeyCode && mirrorPenTool.classList.contains('no-active')) {
          mirrorPenTool.classList.remove('no-active');
          mirrorPenTool.classList.add('active');
          changeTool = true;
        }
        if (event.keyCode === paintBucketToolKeyCode && paintBucketTool.classList.contains('no-active')) {
          paintBucketTool.classList.remove('no-active');
          paintBucketTool.classList.add('active');
          changeTool = true;
        }
        if (event.keyCode === paintAllPixelsSameColorToolKeyCode && paintAllPixelsSameColorTool.classList.contains('no-active')) {
          paintAllPixelsSameColorTool.classList.remove('no-active');
          paintAllPixelsSameColorTool.classList.add('active');
          changeTool = true;
        }
        if (event.keyCode === eraserToolKeyCode && eraserTool.classList.contains('no-active')) {
          eraserTool.classList.remove('no-active');
          eraserTool.classList.add('active');
          changeTool = true;
        }
        if (event.keyCode === strokeToolKeyCode && strokeTool.classList.contains('no-active')) {
          strokeTool.classList.remove('no-active');
          strokeTool.classList.add('active');
          changeTool = true;
        }
        if (event.keyCode === rectangleToolKeyCode && rectangleTool.classList.contains('no-active')) {
          rectangleTool.classList.remove('no-active');
          rectangleTool.classList.add('active');
          changeTool = true;
        }
        if (event.keyCode === circleToolKeyCode && circleTool.classList.contains('no-active')) {
          circleTool.classList.remove('no-active');
          circleTool.classList.add('active');
          changeTool = true;
        }
        if (event.keyCode === moveToolKeyCode && moveTool.classList.contains('no-active')) {
          moveTool.classList.remove('no-active');
          moveTool.classList.add('active');
          changeTool = true;
        }
        if (event.keyCode === shapeSelectionToolKeyCode && shapeSelectionTool.classList.contains('no-active')) {
          shapeSelectionTool.classList.remove('no-active');
          shapeSelectionTool.classList.add('active');
          changeTool = true;
        }
        if (event.keyCode === ditheringToolKeyCode && ditheringTool.classList.contains('no-active')) {
          ditheringTool.classList.remove('no-active');
          ditheringTool.classList.add('active');
          changeTool = true;
        }
        if (event.keyCode === rotateToolKeyCode && rotateTool.classList.contains('no-active')) {
          rotateTool.classList.remove('no-active');
          rotateTool.classList.add('active');
          changeTool = true;
        }
        if (event.keyCode === lightenToolKeyCode && lightenTool.classList.contains('no-active')) {
          lightenTool.classList.remove('no-active');
          lightenTool.classList.add('active');
          changeTool = true;
        }
        if (event.keyCode === darkenToolKeyCode && darkenTool.classList.contains('no-active')) {
          darkenTool.classList.remove('no-active');
          darkenTool.classList.add('active');
          changeTool = true;
        }
        if (event.keyCode === colorPickerToolKeyCode && colorPickerTool.classList.contains('no-active')) {
          colorPickerTool.classList.remove('no-active');
          colorPickerTool.classList.add('active');
          changeTool = true;
        }
      }

      function diactivate() {
        if (changeTool) {
          previosTool.classList.remove('active');
          previosTool.classList.add('no-active');
        }
      }

      activate();
      diactivate();
    }

    document.addEventListener('keydown', activateNeedableToolByKeyboard);
  }

  // shotcuts with frames use in file './actionWithFrames/actionWithFrames'
  shotcutsForTools();
}
