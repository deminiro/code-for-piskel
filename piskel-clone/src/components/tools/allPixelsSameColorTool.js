export default function allPixelsSameColorTool() {
  const canvasWhichStateOnMiddleOfPage = document.getElementById('main-div--canvas');
  const ctxOfMiddleCanvas = canvasWhichStateOnMiddleOfPage.getContext('2d');
  let units = 32;
  let amountOfDivisonsOfCanvas = 19;

  function changeUnitsOfCanvas() {
    units = +document.querySelector('input[name="size"]:checked').value;
    if (units === 32) amountOfDivisonsOfCanvas = 19;
    if (units === 64) amountOfDivisonsOfCanvas = 9.5;
    if (units === 128) amountOfDivisonsOfCanvas = 4.75;
  }

  function takeImageData(event) {
    const coordinatesPerSquareOnMainCanvasX = [];
    const coordinatesPerSquareOnMainCanvasY = [];

    function makeCoordinatePerSquare() {
      let devider = 1;
      let sizeOfSquare = 0;
      while (devider <= units) {
        sizeOfSquare = amountOfDivisonsOfCanvas * devider;
        coordinatesPerSquareOnMainCanvasX.push(sizeOfSquare);
        coordinatesPerSquareOnMainCanvasY.push(sizeOfSquare);
        devider += 1;
      }
    }
    makeCoordinatePerSquare();

    function imageData() {
      const x = coordinatesPerSquareOnMainCanvasX.filter(coordinate => coordinate >= event.offsetX);
      const y = coordinatesPerSquareOnMainCanvasX.filter(coordinate => coordinate >= event.offsetY);
      const colorData = [];
      const colorOfPixel = ctxOfMiddleCanvas
        .getImageData(x[0] - amountOfDivisonsOfCanvas, y[0] - amountOfDivisonsOfCanvas,
          1, 1).data;
      colorData.push(colorOfPixel[0]);
      colorData.push(colorOfPixel[1]);
      colorData.push(colorOfPixel[2]);
      colorData.push(colorOfPixel[3]);
      for (let first = 0; first <= coordinatesPerSquareOnMainCanvasY.length - 1; first += 1) {
        for (let second = 0; second <= coordinatesPerSquareOnMainCanvasX.length - 1; second += 1) {
          const takeColorFromPixel = ctxOfMiddleCanvas
            .getImageData(coordinatesPerSquareOnMainCanvasX[second] - amountOfDivisonsOfCanvas,
              coordinatesPerSquareOnMainCanvasY[first] - amountOfDivisonsOfCanvas, 1, 1).data;
          if (takeColorFromPixel[0] === colorData[0] && takeColorFromPixel[1] === colorData[1]
            && takeColorFromPixel[2] === colorData[2]
            && takeColorFromPixel[3] === colorData[3]) {
            ctxOfMiddleCanvas
              .fillRect(coordinatesPerSquareOnMainCanvasX[second] - amountOfDivisonsOfCanvas,
                coordinatesPerSquareOnMainCanvasY[first] - amountOfDivisonsOfCanvas,
                amountOfDivisonsOfCanvas, amountOfDivisonsOfCanvas);
          }
        }
      }
    }

    return imageData(event);
  }

  function recognizeLeftOrRightClick(event) {
    const colorLeftClick = document.getElementById('tools-choose-color--top');
    const colorRightClick = document.getElementById('tools-choose-color--bottom');
    let currentColor;
    const leftClick = 1;
    const rightClick = 3;
    if (event.which === leftClick) {
      currentColor = colorLeftClick.value;
    }
    if (event.which === rightClick) {
      currentColor = colorRightClick.value;
    }
    ctxOfMiddleCanvas.fillStyle = currentColor;
    takeImageData(event);
  }


  function active(event) {
    const activeTool = document.getElementsByClassName('active')[0];
    if (activeTool.classList
      .contains('tools-which-change-canvas--paint-all-pixels-of-the-same-color')) {
      recognizeLeftOrRightClick(event);
    }
  }
  function act() {
    const activeTool = document.getElementsByClassName('active')[0];
    if (activeTool.classList
      .contains('tools-which-change-canvas--paint-all-pixels-of-the-same-color')) {
      canvasWhichStateOnMiddleOfPage.addEventListener('mousedown', active);
    }
    if (!activeTool.classList
      .contains('tools-which-change-canvas--paint-all-pixels-of-the-same-color')) {
      canvasWhichStateOnMiddleOfPage.removeEventListener('mousedown', active);
    }
  }
  changeUnitsOfCanvas();
  act();
}
