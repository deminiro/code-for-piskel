import activateNoActivateTools from '../tools/activeNoActiveTools';
import penAndEraserTools from '../tools/penAndEraserTools';
import colorPickerTool from '../tools/colorPickerToolAndBrightness';
import allPixelsSameColorTool from '../tools/allPixelsSameColorTool';
import showCoordinate from './showCoordinate';
import penMirrorTool from '../tools/penMirrorTool';
import ditheringTool from '../tools/ditheringTool';
import paintBucketTool from '../tools/paintBucketTool';
import moveTool from '../tools/moveTool';
import rectangleTool from '../tools/rectangleTool';
import undoTool from '../tools/undoTool';
import GIF from './gif';

export default function actionWithCanvases() {
  const divWithTools = document.getElementById('div-with-tools');
  const listOfFrames = document.getElementById('list-of-frames');
  const inputRangeOnPreview = document.getElementById('preview-fps--choose-fps');
  const preview = document.getElementById('canvas-preview');
  const canvasWhichStateOnMiddleOfPage = document.getElementById('main-div--canvas');
  const ctxOfMiddleCanvas = canvasWhichStateOnMiddleOfPage.getContext('2d');
  let imagesForPreviewAndFrames = new Map();
  const pressDublicateButton = 221;
  let changeToolAfterKeyboardUse = document.getElementsByClassName('active')[0];

  function deleteNullFromImagesMap() {
    if (imagesForPreviewAndFrames.has(null)) imagesForPreviewAndFrames.delete(null);
  }

  function saveDataUrls() {
    const childsOfUl = Array.from(listOfFrames.children);
    const arrayOfYellowBorder = [];
    childsOfUl.forEach((elem) => {
      if (elem.classList[1] === 'yellow-border') { arrayOfYellowBorder.push(elem); }
    });
    const picture = canvasWhichStateOnMiddleOfPage.toDataURL('image/png');
    const numberOfCurrentFrame = Number(arrayOfYellowBorder[0].innerText);
    imagesForPreviewAndFrames.set(numberOfCurrentFrame, picture);
  }

  function changeCanvasAfterChangeSizeOfIt() {
    canvasWhichStateOnMiddleOfPage.style.imageRendering = 'pixelated';
    const submitCanvasSize = document.getElementById('submit-size-of-canvas');
    const numberOfActiveFrame = +document.getElementsByClassName('yellow-frame-items')[0].innerText;
    let units = +document.querySelector('input[name="size"]:checked').value;
    let previousUnits = 32;
    let multiplierForImageSize = 1;
    function changeCanvas() {
      units = +document.querySelector('input[name="size"]:checked').value;
      if (units === 32 && previousUnits !== 32
        && imagesForPreviewAndFrames.has(numberOfActiveFrame)) {
        if (previousUnits === 64) multiplierForImageSize = 2;
        if (previousUnits === 128) multiplierForImageSize = 4;
        const widthForImage = canvasWhichStateOnMiddleOfPage.width * multiplierForImageSize;
        const heightForImage = canvasWhichStateOnMiddleOfPage.height * multiplierForImageSize;
        const image = new Image();
        image.src = imagesForPreviewAndFrames.get(numberOfActiveFrame);
        ctxOfMiddleCanvas.clearRect(0, 0, canvasWhichStateOnMiddleOfPage.width,
          canvasWhichStateOnMiddleOfPage.height);
        ctxOfMiddleCanvas.imageSmoothingEnabled = false;
        ctxOfMiddleCanvas.drawImage(image, 0, 0, widthForImage, heightForImage);
        previousUnits = 32;
      }
      if (units === 64 && previousUnits !== 64
         && imagesForPreviewAndFrames.has(numberOfActiveFrame)) {
        if (previousUnits === 32) multiplierForImageSize = 1 / 2;
        if (previousUnits === 128) multiplierForImageSize = 2;
        const widthForImage = Math
          .floor(canvasWhichStateOnMiddleOfPage.width * multiplierForImageSize);
        const heightForImage = Math
          .floor(canvasWhichStateOnMiddleOfPage.height * multiplierForImageSize);
        const image = new Image();
        image.src = imagesForPreviewAndFrames.get(numberOfActiveFrame);
        ctxOfMiddleCanvas.clearRect(0, 0, canvasWhichStateOnMiddleOfPage.width,
          canvasWhichStateOnMiddleOfPage.height);
        ctxOfMiddleCanvas.drawImage(image, 0, 0, widthForImage, heightForImage);
        previousUnits = 64;
      }
      if (units === 128 && previousUnits !== 128
        && imagesForPreviewAndFrames.has(numberOfActiveFrame)) {
        if (previousUnits === 32) multiplierForImageSize = 1 / 4;
        if (previousUnits === 64) multiplierForImageSize = 1 / 2;
        const widthForImage = Math
          .floor(canvasWhichStateOnMiddleOfPage.width * multiplierForImageSize);
        const heightForImage = Math
          .floor(canvasWhichStateOnMiddleOfPage.height * multiplierForImageSize);
        const image = new Image();
        image.src = imagesForPreviewAndFrames.get(numberOfActiveFrame);
        ctxOfMiddleCanvas.clearRect(0, 0, canvasWhichStateOnMiddleOfPage.width,
          canvasWhichStateOnMiddleOfPage.height);
        ctxOfMiddleCanvas.drawImage(image, 0, 0, widthForImage, heightForImage);
        previousUnits = 128;
      }
      const image = canvasWhichStateOnMiddleOfPage.toDataURL('image/png');
      imagesForPreviewAndFrames.delete(numberOfActiveFrame);
      imagesForPreviewAndFrames.set(numberOfActiveFrame, image);
    }
    submitCanvasSize.addEventListener('click', changeCanvas);
  }
  changeCanvasAfterChangeSizeOfIt();

  function changeCanvasOfPreviewAndFrameAfterDrawing() {
    const ul = document.getElementById('list-of-frames');
    const childsOfUl = Array.from(ul.children);
    const arrayOfYellowBorder = [];
    childsOfUl.forEach((elem) => {
      if (elem.classList[1] === 'yellow-border') arrayOfYellowBorder.push(+elem.innerText);
    });
    const image = imagesForPreviewAndFrames.get(arrayOfYellowBorder[0]);
    preview.innerHTML = '<img id="image-preview" width="202" height="200">';
    document
      .getElementById('image-preview')
      .setAttribute('src', image);
    const currentFrame = childsOfUl[arrayOfYellowBorder[0] - 1].children[4];
    currentFrame.innerHTML = '<img class="image-frame" width="50" height="46">';
    currentFrame
      .children[0]
      .setAttribute('src', image);
  }

  function changeMainCanvasAfterSwitchCurrentFrame(event) {
    const keyboardButtonUp = 38;
    const keyboardButtonDown = 40;
    setTimeout(() => {
      if (event.target.className === 'canvas-frame' || event.target.className === 'image-frame'
       || event.keyCode === keyboardButtonDown || event.keyCode === keyboardButtonUp) {
        const numberOfCurrentFrame = +document.getElementsByClassName('yellow-frame-items')[0]
          .children[0].innerText;
        const imageOfCurrentFrame = imagesForPreviewAndFrames.get(numberOfCurrentFrame);
        const image = new Image();
        image.src = imageOfCurrentFrame;
        ctxOfMiddleCanvas.clearRect(0, 0, canvasWhichStateOnMiddleOfPage.width,
          canvasWhichStateOnMiddleOfPage.height);
        ctxOfMiddleCanvas.drawImage(image, 0, 0);
      }
    }, 10);
  }

  function changeKeysAfterDeleteFrame(event) {
    const deleteKeyCode = 46;
    let numberOfCurrentFrame;
    let numberOfDeleteFrame;
    if (event.keyCode === deleteKeyCode) {
      numberOfCurrentFrame = +document.getElementsByClassName('yellow-frame-items')[0].innerText;
      numberOfDeleteFrame = numberOfCurrentFrame + 1;
    } else {
      numberOfDeleteFrame = +event.path[2].innerText;
      numberOfCurrentFrame = numberOfDeleteFrame - 1;
    }
    imagesForPreviewAndFrames.delete(numberOfDeleteFrame);
    let numberWhichChangeNumberOfFrame = numberOfDeleteFrame;
    for (let key = numberOfDeleteFrame; key <= listOfFrames.children.length; key += 1) {
      if (imagesForPreviewAndFrames.has(key + 1)) {
        const value = imagesForPreviewAndFrames.get(key + 1);
        imagesForPreviewAndFrames.delete(key + 1);
        imagesForPreviewAndFrames.set(numberWhichChangeNumberOfFrame, value);
        numberWhichChangeNumberOfFrame += 1;
      }
    }
    imagesForPreviewAndFrames = new Map([...imagesForPreviewAndFrames.entries()].sort());
    const image = new Image();
    image.src = imagesForPreviewAndFrames.get(numberOfCurrentFrame);
    ctxOfMiddleCanvas.clearRect(0, 0, canvasWhichStateOnMiddleOfPage.width,
      canvasWhichStateOnMiddleOfPage.height);
    ctxOfMiddleCanvas.drawImage(image, 0, 0);
  }

  function changeKeysAfterDublicateFrame(event) {
    let frameOnWhichClickDublicate = event.path[2];
    let numberOfDublicateFrame = +frameOnWhichClickDublicate
      .children[0].children[0].innerText + 1;
    if (event.keyCode === pressDublicateButton) {
      // eslint-disable-next-line prefer-destructuring
      frameOnWhichClickDublicate = document.getElementsByClassName('yellow-border')[0];
      numberOfDublicateFrame = +document.getElementsByClassName('yellow-frame-items')[0].innerText;
    }
    for (let key = imagesForPreviewAndFrames.size; key >= numberOfDublicateFrame; key -= 1) {
      if (imagesForPreviewAndFrames.has(key)) {
        const value = imagesForPreviewAndFrames.get(key);
        imagesForPreviewAndFrames.delete(key);
        imagesForPreviewAndFrames.set(key + 1, value);
      }
    }
    imagesForPreviewAndFrames
      .set(numberOfDublicateFrame, imagesForPreviewAndFrames.get(numberOfDublicateFrame - 1));
    imagesForPreviewAndFrames = new Map([...imagesForPreviewAndFrames.entries()].sort());
  }

  function changeMainCanvasAfterDublicateFrame(event) {
    let frameNumberOnWhichClickDublicate = +event.path[2].innerText;
    if (event.keyCode === pressDublicateButton) {
      frameNumberOnWhichClickDublicate = +document.getElementsByClassName('yellow-frame-items')[0].innerText;
    }
    if (imagesForPreviewAndFrames.has(frameNumberOnWhichClickDublicate)) {
      const imageOfCurrentFrame = imagesForPreviewAndFrames.get(frameNumberOnWhichClickDublicate);
      const image = new Image();
      image.src = imageOfCurrentFrame;
      ctxOfMiddleCanvas.clearRect(0, 0, canvasWhichStateOnMiddleOfPage.width,
        canvasWhichStateOnMiddleOfPage.height);
      ctxOfMiddleCanvas.drawImage(image, 0, 0);
    }
  }

  function animationOnPreview(event) {
    const keyboardButtonLeft = 37;
    const keyboardButtonRight = 39;
    const numberOfFpsElementHtml = document.getElementsByClassName('preview-fps--number-fps')[0];
    if (event.keyCode === keyboardButtonLeft || event.keyCode === keyboardButtonRight
      || event.target.classList.contains('choose-fps')) {
      deleteNullFromImagesMap();
      let number = 0;
      let fpsOnPreview = Number(inputRangeOnPreview.value);

      const forAnimation = () => {
        const amountImages = imagesForPreviewAndFrames.size;
        const keysOfImages = [];
        // eslint-disable-next-line no-restricted-syntax
        for (const key of imagesForPreviewAndFrames.keys()) {
          keysOfImages.push(key);
        }
        function step() {
          if (fpsOnPreview !== 0) {
            setTimeout(() => {
              requestAnimationFrame(step);
              if (number === amountImages) number = 0;
              if (imagesForPreviewAndFrames.get(keysOfImages[number]) === undefined) number += 1;
              if (document.fullscreenElement === null) {
                document.getElementById('canvas-preview').innerHTML = '<img id="image-preview" width="202" height="200">';
              }
              if (document.fullscreenElement !== null) {
                document.getElementById('canvas-preview').innerHTML = '<img id="image-preview" width="766" height="766">';
              }
              document
                .getElementById('image-preview')
                .setAttribute('src', imagesForPreviewAndFrames.get(keysOfImages[number]));

              number += 1;
            }, 1000 / fpsOnPreview);
          }
        }
        step();
      };

      const activateAnimation = () => {
        if (event.keyCode === keyboardButtonLeft || event.keyCode === keyboardButtonRight
          || event.target.classList.contains('choose-fps')) {
          event.stopPropagation();
          fpsOnPreview = 0;
          fpsOnPreview = Number(inputRangeOnPreview.value);
          numberOfFpsElementHtml.innerHTML = `${fpsOnPreview} fps`;
          if (fpsOnPreview > 0) {
            forAnimation();
          }
        }
      };

      inputRangeOnPreview.addEventListener('click', activateAnimation);
      inputRangeOnPreview.addEventListener('mousemove', activateAnimation);
      document.addEventListener('keyup', activateAnimation);
    }
  }

  function fullScreenPreview() {
    function toggleFullScreen(event) {
      if (!preview.fullscreenElement && (event.target === preview || event.target.localName === 'img' || event.which === 70)) {
        preview.requestFullscreen();
      }
    }
    document.addEventListener('dblclick', toggleFullScreen);
    document.addEventListener('keyup', toggleFullScreen);
  }
  fullScreenPreview();

  // function below needs to change current tool
  function rotationTool() {
    function rotation(event) {
      event.stopPropagation();
      const numberOfCurrentFrame = +document
        .getElementsByClassName('yellow-frame-items')[0].innerText;
      const image = new Image();
      image.src = imagesForPreviewAndFrames.get(numberOfCurrentFrame);
      ctxOfMiddleCanvas.clearRect(0, 0, canvasWhichStateOnMiddleOfPage.width,
        canvasWhichStateOnMiddleOfPage.height);
      ctxOfMiddleCanvas.drawImage(image, 0, 0);
      ctxOfMiddleCanvas.rotate(90 * Math.PI / 180);
      ctxOfMiddleCanvas.translate(0, -canvasWhichStateOnMiddleOfPage.width);
      const picture = canvasWhichStateOnMiddleOfPage.toDataURL('image/png');
      imagesForPreviewAndFrames.set(numberOfCurrentFrame, picture);
    }
    divWithTools.addEventListener('mousedown', rotation);
  }

  function tools(event) {
    event.stopPropagation();
    const previosActiveTool = document.getElementsByClassName('active')[0];
    activateNoActivateTools(event);
    const activeTool = document.getElementsByClassName('active')[0] || previosActiveTool;
    undoTool(event);
    if (activeTool.children[0].classList.contains('fa-pencil-alt')
     || previosActiveTool.children[0].classList.contains('fa-pencil-alt')
     || activeTool.children[0].classList.contains('fa-eraser')
     || previosActiveTool.children[0].classList.contains('fa-eraser')) penAndEraserTools(event);
    if (activeTool.children[0].classList.contains('fa-eye-dropper')
     || activeTool.children[0].classList.contains('lighten')
     || activeTool.children[0].classList.contains('darken')) colorPickerTool(event);
    if (activeTool.classList
      .contains('tools-which-change-canvas--paint-all-pixels-of-the-same-color')
       || previosActiveTool.classList
         .contains('tools-which-change-canvas--paint-all-pixels-of-the-same-color')) {
      allPixelsSameColorTool(event);
    }
    if (event.target.classList.contains('tools-which-change-canvas--rotate')
     || event.target.classList.contains('fa-redo')) {
      rotationTool(event);
    }
    if (event.target.classList.contains('tools-which-change-canvas--mirror-pen')
     || event.target.classList.contains('fa-grip-lines-vertical')
     || previosActiveTool.children[0].classList.contains('fa-grip-lines-vertical')) {
      penMirrorTool(event);
    }
    if (event.target.classList.contains('tools-which-change-canvas--dithering-tool')
     || event.target.classList.contains('fa-chess-board')
     || previosActiveTool.children[0].classList.contains('fa-chess-board')) {
      ditheringTool(event);
    }
    if (activeTool.children[0].classList.contains('fa-fill-drip')) {
      paintBucketTool(event);
    }
    if (activeTool.children[0].classList.contains('fa-hand-paper')) {
      moveTool(event);
    }
    // if (activeTool.children[0].classList.contains('fa-magic')) {
    //   shapeSelectionTool(event);
    // }
    if (activeTool.children[0].classList.contains('fa-square')) {
      rectangleTool(event);
    }
  }

  function toolsForKeyboardUse(event) {
    event.stopPropagation();
    const activeTool = document.getElementsByClassName('active')[0];
    undoTool(event);
    if (activeTool.children[0].classList.contains('fa-pencil-alt')
     || changeToolAfterKeyboardUse.children[0].classList.contains('fa-pencil-alt')
     || activeTool.children[0].classList.contains('fa-eraser')
     || changeToolAfterKeyboardUse.children[0].classList.contains('fa-eraser')) penAndEraserTools(event);
    if (activeTool.children[0].classList.contains('fa-eye-dropper')
     || activeTool.children[0].classList.contains('lighten')
     || activeTool.children[0].classList.contains('darken')) colorPickerTool(event);
    if (activeTool.classList
      .contains('tools-which-change-canvas--paint-all-pixels-of-the-same-color')
       || changeToolAfterKeyboardUse.classList
         .contains('tools-which-change-canvas--paint-all-pixels-of-the-same-color')) {
      allPixelsSameColorTool(event);
    }
    if (event.target.classList.contains('tools-which-change-canvas--rotate')
     || event.target.classList.contains('fa-redo')) {
      rotationTool(event);
    }
    if (event.target.classList.contains('tools-which-change-canvas--mirror-pen')
     || event.target.classList.contains('fa-grip-lines-vertical')
     || changeToolAfterKeyboardUse.children[0].classList.contains('fa-grip-lines-vertical')) {
      penMirrorTool(event);
    }
    if (event.target.classList.contains('tools-which-change-canvas--dithering-tool')
     || event.target.classList.contains('fa-chess-board')
     || changeToolAfterKeyboardUse.children[0].classList.contains('fa-chess-board')) {
      ditheringTool(event);
    }
    if (activeTool.children[0].classList.contains('fa-fill-drip')) {
      paintBucketTool(event);
    }
    if (activeTool.children[0].classList.contains('fa-hand-paper')) {
      moveTool(event);
    }
    if (activeTool.children[0].classList.contains('fa-square')) {
      rectangleTool(event);
    }
    changeToolAfterKeyboardUse = activeTool;
  }

  function disableSaveImageRightClick() {
    document.body.addEventListener('contextmenu', (event) => {
      event.preventDefault();
    });
  }

  function useEventListeners() {
    canvasWhichStateOnMiddleOfPage.addEventListener('mouseup', (event) => {
      saveDataUrls(event);
      changeCanvasOfPreviewAndFrameAfterDrawing(event);
    });

    listOfFrames.addEventListener('click', (event) => {
      changeMainCanvasAfterSwitchCurrentFrame(event);
      if (event.target.className === 'fas fa-trash-alt') changeKeysAfterDeleteFrame(event);
      if (event.target.className === 'fas fa-copy'
        || event.keyCode === pressDublicateButton) changeKeysAfterDublicateFrame(event);
      if (event.target.className === 'fas fa-copy'
        || event.keyCode === pressDublicateButton) changeMainCanvasAfterDublicateFrame(event);
    });
    document.addEventListener('keydown', changeMainCanvasAfterSwitchCurrentFrame);
    document.addEventListener('keyup', (event) => {
      const deleteKeyCode = 46;
      if (event.keyCode === deleteKeyCode) changeKeysAfterDeleteFrame(event);
    });
    document.addEventListener('keyup', (event) => {
      if (event.keyCode === pressDublicateButton) {
        changeMainCanvasAfterSwitchCurrentFrame(event);
        changeKeysAfterDublicateFrame(event);
        changeMainCanvasAfterDublicateFrame(event);
      }
    });

    inputRangeOnPreview.addEventListener('mousedown', animationOnPreview);
    document.addEventListener('keydown', animationOnPreview);
    divWithTools.addEventListener('mousedown', tools);
    document.addEventListener('keyup', toolsForKeyboardUse);
  }
  disableSaveImageRightClick();
  useEventListeners();
  showCoordinate();

  // local storage
  function storage() {
    let saveImagesAndKeysFromMap = [];
    function saveDataInArray() {
      const arrayOfKeys = [];
      const arrayOfValues = [];
      // eslint-disable-next-line no-restricted-syntax
      for (const key of imagesForPreviewAndFrames.keys()) {
        arrayOfKeys.push(key);
      }
      // eslint-disable-next-line no-restricted-syntax
      for (const value of imagesForPreviewAndFrames) {
        arrayOfValues.push(value);
      }
      if (localStorage.getItem('images') !== null) {
        saveImagesAndKeysFromMap = [];
      }
      let number = 0;
      while (number < arrayOfKeys.length) {
        saveImagesAndKeysFromMap.push({
          arrayOfKeys: arrayOfValues,
        });
        number += 1;
      }
      localStorage.setItem('images', JSON.stringify(saveImagesAndKeysFromMap));
    }
    canvasWhichStateOnMiddleOfPage.addEventListener('mouseup', saveDataInArray);
    listOfFrames.addEventListener('mouseup', saveDataInArray);
    window.onload = () => {
      if (localStorage.getItem('images') !== null) {
        const images = JSON.parse(localStorage.getItem('images'));
        if (images[images.length - 1] !== undefined) {
          const takeLastItemFromImages = images[images.length - 1].arrayOfKeys;
          const numbersOfFrames = [];
          takeLastItemFromImages.forEach((element) => {
            numbersOfFrames.push(element[0]);
          });
          const defineAmountOfFrames = Math.max.apply(null, numbersOfFrames);
          for (let amount = 0; amount < defineAmountOfFrames - 1; amount += 1) {
            const frame = listOfFrames.children[listOfFrames.children.length - 1];
            const frameClone = frame.cloneNode(true);
            frameClone.classList.remove('yellow-border');
            frameClone.classList.add('gray-border');
            Array.from(frameClone.children).forEach((element) => {
              if (element.classList.contains('yellow-frame-items')) {
                element.classList.remove('yellow-frame-items');
                element.classList.add('gray-frame-items');
              }
            });
            frame.parentNode.insertBefore(frameClone, frame.nextSibling);
          }
          // update numbers of frames
          Array.from(listOfFrames.children).forEach((element, index) => {
          // eslint-disable-next-line no-param-reassign
            element.children[0].children[0].innerText = index + 1;
          });

          // change Map with images
          takeLastItemFromImages.forEach((element) => {
            imagesForPreviewAndFrames.set(element[0], element[1]);
          });
          // change image of frames
          Array.from(listOfFrames.children).forEach((element) => {
            const keyOfMap = +element.children[0].innerText;
            if (imagesForPreviewAndFrames.has(keyOfMap)
            && imagesForPreviewAndFrames.get(keyOfMap) !== null) {
              const image = imagesForPreviewAndFrames.get(keyOfMap);
              // eslint-disable-next-line no-param-reassign
              element.children[4].innerHTML = '<img class="image-frame" width="50" height="46">';
              element.children[4]
                .children[0]
                .setAttribute('src', image);
            }
          });
          // change image of main canvas and preview
          if (imagesForPreviewAndFrames.has(1)) {
            const previewImage = document.getElementById('canvas-preview');
            const imageForPreview = imagesForPreviewAndFrames.get(1);
            const image = new Image();
            image.src = imagesForPreviewAndFrames.get(1);
            ctxOfMiddleCanvas.clearRect(0, 0, canvasWhichStateOnMiddleOfPage.width,
              canvasWhichStateOnMiddleOfPage.height);
            ctxOfMiddleCanvas.drawImage(image, 0, 0);
            previewImage.innerHTML = '<img id="image-preview" width="202" height="200">';
            document.getElementById('image-preview')
              .setAttribute('src', imageForPreview);
          }
        }
      }
    };
  }
  storage();

  function downloadGif() {
    const iconWithDownloadGif = document.getElementsByClassName('fa-save')[0];
    const gifWindow = document.getElementById('window-with-save-gif');
    const nameByUserToGif = document.getElementById('save-gif--input-text');
    const submitNameToGif = document.getElementById('save-gif--input-submit');
    const keyboardButtonL = 76;

    function downloadGifToFileSystem(event) {
      if (event.keyCode === keyboardButtonL || event.type === 'click') {
        // eslint-disable-next-line global-require
        const download = require('downloadjs');
        const valueOfFps = document.getElementById('preview-fps--choose-fps').value;
        const delayForFrames = Math.floor(1000 / valueOfFps);
        const gif = new GIF({
          workers: 2,
          workerScript: '../../../src/components/canvas/gif.worker.js',
          background: '#fff',
          quality: 10,
        });

        // add an image element
        // eslint-disable-next-line no-restricted-syntax
        for (const value of imagesForPreviewAndFrames.values()) {
          const image = new Image();
          image.src = value;

          gif.addFrame(image, { delay: delayForFrames });
        }
        gif.on('finished', (blob) => {
          if (event.keyCode === keyboardButtonL) {
            const nameOfGif = global.prompt('Choose name of gif', 'animation');
            download(blob, nameOfGif, 'image/gif');
          } else {
            download(blob, nameByUserToGif.value, 'image/gif');
          }
        });
        gif.render();
      }
    }

    function openCloseDownloadGifWindow() {
      if (!gifWindow.hasAttribute('style')) {
        gifWindow.setAttribute('style', 'display: grid');
      } else {
        gifWindow.removeAttribute('style', 'display: grid');
      }
    }
    iconWithDownloadGif.addEventListener('click', openCloseDownloadGifWindow);
    submitNameToGif.addEventListener('click', downloadGifToFileSystem);
    document.addEventListener('keyup', downloadGifToFileSystem);
  }

  downloadGif();

  return { tools };
}
