export default function shortcutsFunction() {
  const shortcutPen = document.getElementById('shortcut-letter-pen');
  const shortcutMirror = document.getElementById('shortcut-letter-mirror');
  const shortcutBucket = document.getElementById('shortcut-letter-bucket');
  const shortcutAllPixels = document.getElementById('shortcut-letter-all-pixels');
  const shortcutEraser = document.getElementById('shortcut-letter-eraser');
  const shortcutRectangle = document.getElementById('shortcut-letter-rectangle');
  const shortcutMove = document.getElementById('shortcut-letter-move');
  const shortcutDithering = document.getElementById('shortcut-letter-dithering');
  const shortcutRotate = document.getElementById('shortcut-letter-rotate');
  const shortcutLighten = document.getElementById('shortcut-letter-lighten');
  const shortcutDarken = document.getElementById('shortcut-letter-darken');
  const shortcutColorPicker = document.getElementById('shortcut-letter-color-picker');
  const toolsWhichUse = [];
  toolsWhichUse.push(shortcutPen, shortcutMirror, shortcutBucket, shortcutAllPixels,
    shortcutEraser, shortcutRectangle, shortcutMove, shortcutDithering, shortcutRotate,
    shortcutLighten, shortcutDarken, shortcutColorPicker);

  function saveShortcutsAfterReloadingPage() {
    const buttonForShortCuts = [];
    toolsWhichUse.forEach((element) => {
      buttonForShortCuts.push(element.innerHTML);
    });
    localStorage.setItem('shortcuts', buttonForShortCuts);
  }

  function takeShortcutsFromLocalStorage() {
    if (localStorage.getItem('shortcuts') !== null) {
      const shortcutsStr = localStorage.getItem('shortcuts').toString();
      const shortcutsArr = shortcutsStr.replace(/,/gi, '');
      global.console.log(shortcutsArr);
      toolsWhichUse.forEach((element, index) => {
        // eslint-disable-next-line no-param-reassign
        element.innerHTML = shortcutsArr[index];
      });
    }
  }

  function changeToolTips() {
    document.getElementById('tool-tip-pen').innerHTML = `(${shortcutPen.innerHTML})`;
    document.getElementById('tool-tip-mirror').innerHTML = `(${shortcutMirror.innerHTML})`;
    document.getElementById('tool-tip-bucket').innerHTML = `(${shortcutBucket.innerHTML})`;
    document.getElementById('tool-tip-all-pixels').innerHTML = `(${shortcutAllPixels.innerHTML})`;
    document.getElementById('tool-tip-eraser').innerHTML = `(${shortcutEraser.innerHTML})`;
    document.getElementById('tool-tip-rectangle').innerHTML = `(${shortcutRectangle.innerHTML})`;
    document.getElementById('tool-tip-move').innerHTML = `(${shortcutMove.innerHTML})`;
    document.getElementById('tool-tip-dithering').innerHTML = `(${shortcutDithering.innerHTML})`;
    document.getElementById('tool-tip-lighten').innerHTML = `(${shortcutLighten.innerHTML})`;
    document.getElementById('tool-tip-darken').innerHTML = `(${shortcutDarken.innerHTML})`;
    document.getElementById('tool-tip-color-picker').innerHTML = `(${shortcutColorPicker.innerHTML})`;
  }

  function openShortcutsWindow() {
    const keyboardIcon = document.getElementById('keyboard');
    const windowShortCuts = document.getElementsByClassName('window-shortcuts')[0];
    const buttonCloseWindowShortCut = document.getElementsByClassName('close-shortcut-window')[0];
    const keyBoardButtonToOpenShortCuts = 191;
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

    keyboardIcon.addEventListener('click', showWindowWithShortCuts);
    buttonCloseWindowShortCut.addEventListener('click', closeWindow);
    document.addEventListener('keyup', showWindowWithShortCuts);
  }

  // numbers equal to key code
  function shortcutsForTools() {
    const penToolKeyCode = shortcutPen.innerHTML.toLocaleUpperCase().charCodeAt(0);
    const penTool = document.getElementsByClassName('tools-which-change-canvas--pen')[0];
    const mirrorPenToolKeyCode = shortcutMirror.innerHTML.toLocaleUpperCase().charCodeAt(0);
    const mirrorPenTool = document.getElementsByClassName('tools-which-change-canvas--mirror-pen')[0];
    const paintBucketToolKeyCode = shortcutBucket.innerHTML.toLocaleUpperCase().charCodeAt(0);
    const paintBucketTool = document.getElementsByClassName('tools-which-change-canvas--paint-bucket-tool')[0];
    const paintAllPixelsSameColorToolKeyCode = shortcutAllPixels.innerHTML
      .toLocaleUpperCase().charCodeAt(0);
    const paintAllPixelsSameColorTool = document.getElementsByClassName('tools-which-change-canvas--paint-all-pixels-of-the-same-color')[0];
    const eraserToolKeyCode = shortcutEraser.innerHTML.toLocaleUpperCase().charCodeAt(0);
    const eraserTool = document.getElementsByClassName('tools-which-change-canvas--eraser-tool')[0];
    const rectangleToolKeyCode = shortcutRectangle.innerHTML.toLocaleUpperCase().charCodeAt(0);
    const rectangleTool = document.getElementsByClassName('tools-which-change-canvas--rectangle-tool')[0];
    const moveToolKeyCode = shortcutMove.innerHTML.toLocaleUpperCase().charCodeAt(0);
    const moveTool = document.getElementsByClassName('tools-which-change-canvas--move-tool')[0];
    const ditheringToolKeyCode = shortcutDithering.innerHTML.toLocaleUpperCase().charCodeAt(0);
    const ditheringTool = document.getElementsByClassName('tools-which-change-canvas--dithering-tool')[0];
    const rotateToolKeyCode = shortcutRotate.innerHTML.toLocaleUpperCase().charCodeAt(0);
    const rotateTool = document.getElementsByClassName('tools-which-change-canvas--rotate')[0];
    const lightenToolKeyCode = shortcutLighten.innerHTML.toLocaleUpperCase().charCodeAt(0);
    const lightenTool = document.getElementsByClassName('tools-which-change-canvas--lighten')[0];
    const darkenToolKeyCode = shortcutDarken.innerHTML.toLocaleUpperCase().charCodeAt(0);
    const darkenTool = document.getElementsByClassName('tools-which-change-canvas--darken')[0];
    const colorPickerToolKeyCode = shortcutColorPicker.innerHTML.toLocaleUpperCase().charCodeAt(0);
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
        if (event.keyCode === rectangleToolKeyCode && rectangleTool.classList.contains('no-active')) {
          rectangleTool.classList.remove('no-active');
          rectangleTool.classList.add('active');
          changeTool = true;
        }
        if (event.keyCode === moveToolKeyCode && moveTool.classList.contains('no-active')) {
          moveTool.classList.remove('no-active');
          moveTool.classList.add('active');
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
        }
        if (event.keyCode === keyboardButtonUp && numberOfCurrentFrame !== 1) {
          makeYellowFrameToGray();
          nextFrame = listOfFrames.children[numberOfCurrentFrame - 2];
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

  function changeKeyboardShortcuts() {
    const shortcutWindow = document.getElementsByClassName('window-shortcuts')[0];
    const btnDeleteFrame = 46;
    const btnCopyFrame = 221;
    const btnAddNewFrame = 78;
    const btnOpenShortcutWindow = 191;
    const btnChangeToPreviousFrame = 38;
    const btnChangeToNextFrame = 40;
    const btnDecreaseFps = 37;
    const btnInecreaseFps = 39;
    const btnFullscreenPreview = 70;
    let element;
    function change(event) {
      if (event.type === 'click' && event.target.classList.contains('tool')) {
        const previousItem = document.getElementsByClassName('opacity-half')[0] || 0;
        if (previousItem !== 0) {
          previousItem.classList.remove('opacity-half');
        }
        const shortcutName = event.target.classList.contains('shortcuts-name');
        const shortcutLetter = event.target.classList.contains('shortcuts-letter');
        const shortcutIcon = event.target.classList.contains('keyboard-shortcuts-icon');
        if (shortcutName) {
          element = event.target.previousElementSibling;
        } else if (shortcutLetter) {
          element = event.target;
        } else if (shortcutIcon) {
          element = event.target.nextElementSibling;
        }
        if (!element.classList.contains('white-button')) element.classList.add('opacity-half');
      } else if (event.type === 'keydown' && document.getElementsByClassName('opacity-half').length === 1
      && event.keyCode !== btnDeleteFrame && event.keyCode !== btnCopyFrame
      && event.keyCode !== btnAddNewFrame && event.keyCode !== btnOpenShortcutWindow
      && event.keyCode !== btnChangeToNextFrame && event.keyCode !== btnChangeToPreviousFrame
      && event.keyCode !== btnDecreaseFps && event.keyCode !== btnInecreaseFps
      && event.keyCode !== btnFullscreenPreview) {
        toolsWhichUse.forEach((elem) => {
          if (elem.innerHTML === String.fromCharCode(event.keyCode)) {
            // eslint-disable-next-line no-param-reassign
            elem.innerHTML = '???';
          }
        });
        // eslint-disable-next-line prefer-destructuring
        element = document.getElementsByClassName('opacity-half')[0];
        element.innerHTML = String.fromCharCode(event.keyCode);
        element.classList.remove('opacity-half');
        shortcutsForTools();
        saveShortcutsAfterReloadingPage();
        changeToolTips();
      }
    }
    shortcutWindow.addEventListener('click', change);
    document.addEventListener('keydown', change);
  }

  function restoreKeyboardShortcuts() {
    const buttonRestore = document.getElementById('restore-shortcuts');
    const keyboardButtonRestoreShortCuts = 222;
    const restore = document.getElementById('restore-shortcuts');
    function notifyWithRestore(event) {
      if (event.target.classList.contains('bottom-shortcuts--restore') || event.keyCode === keyboardButtonRestoreShortCuts) {
        if (global.confirm('Replace all custom shortcuts by the default Piskel shortcuts ?')) {
          shortcutPen.innerHTML = 'P';
          shortcutMirror.innerHTML = 'V';
          shortcutBucket.innerHTML = 'B';
          shortcutAllPixels.innerHTML = 'A';
          shortcutEraser.innerHTML = 'E';
          shortcutRectangle.innerHTML = 'R';
          shortcutMove.innerHTML = 'M';
          shortcutDithering.innerHTML = 'T';
          shortcutRotate.innerHTML = 'D';
          shortcutLighten.innerHTML = 'U';
          shortcutDarken.innerHTML = 'I';
          shortcutColorPicker.innerHTML = 'O';
          shortcutsForTools();
          saveShortcutsAfterReloadingPage();
          changeToolTips();
        }
      }
    }

    buttonRestore.addEventListener('click', restore);
    document.addEventListener('keyup', notifyWithRestore);
    restore.addEventListener('click', notifyWithRestore);
  }

  // shortcuts with frames use in file './actionWithFrames/actionWithFrames'
  takeShortcutsFromLocalStorage();
  changeToolTips();
  openShortcutsWindow();
  shortcutsForTools();
  shortcutsForChangeCurrentTool();
  shortcutsChangeFpsOfPreview();
  changeKeyboardShortcuts();
  restoreKeyboardShortcuts();
}
