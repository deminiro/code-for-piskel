export default function shortcutsFunction() {
  function openShortCutsWindow() {
    const keyboardIcon = document.getElementById('keyboard');
    const windowShortCuts = document.getElementsByClassName('window-shortcuts')[0];
    const buttonCloseWindowShortCut = document.getElementsByClassName('close-shortcut-window')[0];
    const keyBoardButtonToOpenShortCuts = 191;
    const keyboardButtonRestoreShortCuts = 222;
    const restore = document.getElementById('restore-shortcuts');
    function showWindowWithShortCuts(event) {
      if (event.target.classList.contains('fa-keyboard') || event.keyCode === keyBoardButtonToOpenShortCuts) {
        event.preventDefault();
        windowShortCuts.classList.toggle('display-none');
      }
    }

    function closeWindow(event) {
      if (event.target.classList.contains('close-shortcut-window')) {
        event.preventDefault();
        windowShortCuts.classList.add('display-none');
      }
    }

    function notifyWithRestore(event) {
      if (event.target.classList.contains('bottom-shortcuts--restore') || event.keyCode === keyboardButtonRestoreShortCuts) {
        global.confirm('Replace all custom shortcuts by the default Piskel shortcuts ?');
      }
    }

    keyboardIcon.addEventListener('click', showWindowWithShortCuts);
    buttonCloseWindowShortCut.addEventListener('click', closeWindow);
    document.addEventListener('keyup', showWindowWithShortCuts);
    document.addEventListener('keyup', notifyWithRestore);
    restore.addEventListener('click', notifyWithRestore);
  }
  openShortCutsWindow();

  // numbers equal to key code
  function shortcutsForTools() {
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
    const rotateToolKeyCode = 68;
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
        if (event.keyCode === shapeSelectionToolKeyCode && !event.ctrlKey && shapeSelectionTool.classList.contains('no-active')) {
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

  function shortcutsForChangeCurrentTool() {
    const listOfFrames = document.getElementById('list-of-frames');
    const keyboardButtonUp = 38;
    const keyboardButtonDown = 40;

    function changeCurrentFrameWithKeyboard(event) {
      if (event.keyCode === keyboardButtonDown || event.keyCode === keyboardButtonUp) {
        const numberOfCurrentFrame = +document.getElementsByClassName('yellow-frame-items')[0].innerText;
        const currentFrame = document.getElementsByClassName('yellow-border')[0];
        const childsOfCurrentFrame = Array.from(currentFrame.children);
        const amountOfFrames = listOfFrames.children.length;
        let nextFrame;
        const makeYellowFrameToGray = () => {
          currentFrame.classList.remove('yellow-border');
          currentFrame.classList.add('gray-border');
          childsOfCurrentFrame.forEach((element) => {
            if (element.classList.contains('yellow-frame-items')) {
              element.classList.remove('yellow-frame-items');
              element.classList.add('gray-frame-items');
            }
          });
        };
        if (event.keyCode === keyboardButtonDown && numberOfCurrentFrame !== amountOfFrames) {
          makeYellowFrameToGray();
          nextFrame = listOfFrames.children[numberOfCurrentFrame];
          global.console.log(nextFrame, listOfFrames.children, numberOfCurrentFrame);
        }
        if (event.keyCode === keyboardButtonUp && numberOfCurrentFrame !== 1) {
          makeYellowFrameToGray();
          nextFrame = listOfFrames.children[numberOfCurrentFrame - 2];
          global.console.log('ds');
        }

        nextFrame.classList.remove('gray-border');
        nextFrame.classList.add('yellow-border');
        Array.from(nextFrame.children).forEach((element) => {
          if (element.classList.contains('gray-frame-items')) {
            element.classList.remove('gray-frame-items');
            element.classList.add('yellow-frame-items');
          }
        });
      }
    }

    document.addEventListener('keydown', changeCurrentFrameWithKeyboard);
  }

  function shortcutsChangeFpsOfPreview() {
    const keyboardButtonLeft = 37;
    const keyboardButtonRight = 39;
    function changeFpsWithKeyboard(event) {
      if (event.keyCode === keyboardButtonLeft || event.keyCode === keyboardButtonRight) {
        const numberOfFps = document.getElementsByClassName('preview-fps--number-fps')[0];
        const inputWithRangeFps = document.getElementById('preview-fps--choose-fps');
        let valueOfInputRange = +inputWithRangeFps.value;
        if (event.keyCode === keyboardButtonLeft && inputWithRangeFps.value >= 0) {
          inputWithRangeFps.value = +valueOfInputRange - 1;
          valueOfInputRange = inputWithRangeFps.value;
          numberOfFps.innerHTML = `${valueOfInputRange} fps`;
        } else if (event.keyCode === keyboardButtonRight && inputWithRangeFps.value <= 24) {
          inputWithRangeFps.value = +valueOfInputRange + 1;
          valueOfInputRange = inputWithRangeFps.value;
          numberOfFps.innerHTML = `${valueOfInputRange} fps`;
        }
      }
    }

    document.addEventListener('keydown', changeFpsWithKeyboard);
  }

  // shortcuts with frames use in file './actionWithFrames/actionWithFrames'
  shortcutsForTools();
  shortcutsForChangeCurrentTool();
  shortcutsChangeFpsOfPreview();
}
