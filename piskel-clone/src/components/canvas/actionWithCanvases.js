import activateNoActivateTools from '../tools/activeNoActiveTools';
import penAndEraserTools from '../tools/penAndEraserTools';
import colorPickerTool from '../tools/colorPickerToolAndBrightness';
import strokeTool from '../tools/strokeTool';
import allPixelsSameColorTool from '../tools/allPixelsSameColorTool';
import showCoordinate from './showCoordinate';
import penMirrorTool from '../tools/penMirrorTool';
import ditheringTool from '../tools/ditheringTool';
// import moveFrame from '../actionWithFrames/moveFrame';
// import actionWithFrames from '../actionWithFrames/actionWithFrames';
import paintBucketTool from '../tools/paintBucketTool';
import moveTool from '../tools/moveTool';
import shapeSelectionTool from '../tools/shapeSelectionTool';
import rectangleTool from '../tools/rectangleTool';
import undoTool from '../tools/undoTool';

export default function actionWithCanvases() {
  const divWithTools = document.getElementById('div-with-tools');
  const listOfFrames = document.getElementById('list-of-frames');
  const inputRangeOnPreview = document.getElementById('preview-fps--choose-fps');
  const preview = document.getElementById('canvas-preview');
  const canvasWhichStateOnMiddleOfPage = document.getElementById('main-div--canvas');
  const ctxOfMiddleCanvas = canvasWhichStateOnMiddleOfPage.getContext('2d');
  let imagesForPreviewAndFrames = new Map();
  const pressDublicateButton = 221;
  // const pressDeleteButton = 68;
  // switch images of frames in map after swap frames
  // function switchImagesOfFrames() {
  //   function swap() {
  //     const numbersOfFramesAfterSwitch = moveFrame().arr;
  //     const valueOfFirstSwap = imagesForPreviewAndFrames.get(numbersOfFramesAfterSwitch[0]);
  //     const valueOfSecondSwap = imagesForPreviewAndFrames.get(numbersOfFramesAfterSwitch[1]);
  //     imagesForPreviewAndFrames.delete(numbersOfFramesAfterSwitch[0]);
  //     imagesForPreviewAndFrames.delete(numbersOfFramesAfterSwitch[1]);
  //     imagesForPreviewAndFrames.set(numbersOfFramesAfterSwitch[0], valueOfSecondSwap);
  //     imagesForPreviewAndFrames.set(numbersOfFramesAfterSwitch[1], valueOfFirstSwap);
  //     const numbersOfFrames = Array.from(document.getElementsByClassName('number-of-frame'));
  //     let number = 1;
  //     numbersOfFrames.forEach((element) => {
  //       // eslint-disable-next-line no-param-reassign
  //       element.innerText = number;
  //       number += 1;
  //     });
  //   }
  //   listOfFrames.addEventListener('mouseup', swap);
  // }
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
    setTimeout(() => {
      if (event.target.className === 'canvas-frame' || event.target.className === 'image-frame') {
        const numberOfCurrentFrame = +document.getElementsByClassName('yellow-frame-items')[0]
          .children[0].innerText;
        const imageOfCurrentFrame = imagesForPreviewAndFrames.get(numberOfCurrentFrame);
        const image = new Image();
        image.src = imageOfCurrentFrame;
        ctxOfMiddleCanvas.clearRect(0, 0, 640, 608);
        ctxOfMiddleCanvas.drawImage(image, 0, 0);
      }
    }, 10);
  }

  function changeKeysAfterDeleteFrame() {
    const currentFrame = document.getElementsByClassName('yellow-border')[0];
    const numberOfDeleteFrame = +currentFrame.children[0].children[0].innerText;
    imagesForPreviewAndFrames.delete(numberOfDeleteFrame);
    for (let key = numberOfDeleteFrame; key < listOfFrames.children.length; key += 1) {
      if (imagesForPreviewAndFrames.has(key + 1)) {
        const numberOfFrame = +listOfFrames.children[key - 1].children[0].children[0].innerText;
        const value = imagesForPreviewAndFrames.get(key + 1);
        imagesForPreviewAndFrames.delete(key + 1);
        imagesForPreviewAndFrames.set(numberOfFrame, value);
      }
    }
    imagesForPreviewAndFrames = new Map([...imagesForPreviewAndFrames.entries()].sort());
    global.console.log(imagesForPreviewAndFrames);
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
      ctxOfMiddleCanvas.clearRect(0, 0, 640, 608);
      ctxOfMiddleCanvas.drawImage(image, 0, 0);
    }
  }

  function animationOnPreview() {
    deleteNullFromImagesMap();
    const numberOfFpsElementHtml = document.getElementsByClassName('preview-fps--number-fps')[0];
    let number = 0;
    let fpsOnPreview = Number(inputRangeOnPreview.value);
    numberOfFpsElementHtml.innerHTML = `${fpsOnPreview} fps`;

    function forAnimation() {
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
            if (imagesForPreviewAndFrames.get(keysOfImages[number - 1]) === undefined) number += 1;
            if (document.fullscreenElement === null) {
              document.getElementById('canvas-preview').innerHTML = '<img id="image-preview" width="202" height="200">';
            }
            if (document.fullscreenElement !== null) {
              document.getElementById('canvas-preview').innerHTML = '<img id="image-preview" width="766" height="766">';
            }
            document
              .getElementById('image-preview')
              .setAttribute('src', imagesForPreviewAndFrames.get(keysOfImages[number - 1]));

            number += 1;
          }, 1000 / fpsOnPreview);
        }
      }
      step();
    }

    inputRangeOnPreview.addEventListener('click', (event) => {
      fpsOnPreview = Number(inputRangeOnPreview.value);
      event.stopPropagation();
      if (fpsOnPreview > 0) {
        forAnimation();
      }
    });
    inputRangeOnPreview.addEventListener('mousemove', () => {
      fpsOnPreview = Number(inputRangeOnPreview.value);
      numberOfFpsElementHtml.innerHTML = `${fpsOnPreview} fps`;
    });
  }
  function fullScreenPreview() {
    function toggleFullScreen(event) {
      if (!preview.fullscreenElement && (event.target === preview || event.target.localName === 'img')) {
        preview.requestFullscreen();
      }
    }
    document.addEventListener('dblclick', toggleFullScreen);
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
      ctxOfMiddleCanvas.clearRect(0, 0, 608, 608);
      ctxOfMiddleCanvas.drawImage(image, 0, 0);
      ctxOfMiddleCanvas.rotate(90 * Math.PI / 180);
      ctxOfMiddleCanvas.translate(0, -canvasWhichStateOnMiddleOfPage.width);
      const picture = canvasWhichStateOnMiddleOfPage.toDataURL('image/png');
      imagesForPreviewAndFrames.set(numberOfCurrentFrame, picture);
    }
    divWithTools.addEventListener('mousedown', rotation);
  }
  function tools(event) {
    const previosActiveTool = document.getElementsByClassName('active')[0];
    activateNoActivateTools(event);
    const activeTool = document.getElementsByClassName('active')[0];
    if (activeTool.children[0].classList.contains('fa-pencil-alt')
     || previosActiveTool.children[0].classList.contains('fa-pencil-alt')
     || activeTool.children[0].classList.contains('fa-eraser')
     || previosActiveTool.children[0].classList.contains('fa-eraser')) penAndEraserTools(event);
    if (activeTool.children[0].classList.contains('fa-eye-dropper')
     || activeTool.children[0].classList.contains('lighten')
     || activeTool.children[0].classList.contains('darken')) colorPickerTool(event);
    if (activeTool.children[0].classList.contains('fa-slash')
     || previosActiveTool.children[0].classList.contains('fa-slash')) strokeTool(event);
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
    if (activeTool.children[0].classList.contains('fa-magic')) {
      shapeSelectionTool(event);
    }
    if (activeTool.children[0].classList.contains('fa-square')) {
      rectangleTool(event);
    }
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
      const deleteKeyCode = 46;
      changeMainCanvasAfterSwitchCurrentFrame(event);
      if (event.keyCode === deleteKeyCode
        || event.target.className === 'fas fa-trash-alt') changeKeysAfterDeleteFrame(event);
      if (event.target.className === 'fas fa-copy'
        || event.keyCode === pressDublicateButton) changeKeysAfterDublicateFrame(event);
      if (event.target.className === 'fas fa-copy'
        || event.keyCode === pressDublicateButton) changeMainCanvasAfterDublicateFrame(event);
    });

    inputRangeOnPreview.addEventListener('mouseup', animationOnPreview);
    divWithTools.addEventListener('mousedown', tools);
    document.addEventListener('keypress', undoTool);
  }
  disableSaveImageRightClick();
  useEventListeners();
  showCoordinate();
  // switchImagesOfFrames();

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
            ctxOfMiddleCanvas.clearRect(0, 0, 640, 608);
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
}
