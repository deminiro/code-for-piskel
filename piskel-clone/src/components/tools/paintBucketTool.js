export default function paintBucketTool() {
  const canvasWhichStateOnMiddleOfPage = document.getElementById('main-div--canvas');
  const ctxOfMiddleCanvas = canvasWhichStateOnMiddleOfPage.getContext('2d');
  let units = 32;
  let amountOfDivisonsOfCanvas = 19;
  const bucket = document.getElementsByClassName('tools-which-change-canvas--paint-bucket-tool')[0];
  const divWithTools = document.getElementById('div-with-tools');

  function changeUnitsOfCanvas() {
    units = +document.querySelector('input[name="size"]:checked').value;
    if (units === 32) {
      amountOfDivisonsOfCanvas = 19;
      if (canvasWhichStateOnMiddleOfPage.classList.contains('scaled-divide-by-two')) {
        canvasWhichStateOnMiddleOfPage.classList.remove('scaled-divide-by-two');
      }
      if (canvasWhichStateOnMiddleOfPage.classList.contains('scaled-divide-by-four')) {
        canvasWhichStateOnMiddleOfPage.classList.remove('scaled-divide-by-four');
      }
      canvasWhichStateOnMiddleOfPage.classList.add('scaled-divide-by-one');
    }
    if (units === 64) {
      amountOfDivisonsOfCanvas = 9.5;
      if (canvasWhichStateOnMiddleOfPage.classList.contains('scaled-divide-by-one')) {
        canvasWhichStateOnMiddleOfPage.classList.remove('scaled-divide-by-one');
      }
      if (canvasWhichStateOnMiddleOfPage.classList.contains('scaled-divide-by-four')) {
        canvasWhichStateOnMiddleOfPage.classList.remove('scaled-divide-by-four');
      }
      canvasWhichStateOnMiddleOfPage.classList.add('scaled-divide-by-two');
    }
    if (units === 128) {
      amountOfDivisonsOfCanvas = 4.75;
      if (canvasWhichStateOnMiddleOfPage.classList.contains('scaled-divide-by-one')) {
        canvasWhichStateOnMiddleOfPage.classList.remove('scaled-divide-by-one');
      }
      if (canvasWhichStateOnMiddleOfPage.classList.contains('scaled-divide-by-two')) {
        canvasWhichStateOnMiddleOfPage.classList.remove('scaled-divide-by-two');
      }
      canvasWhichStateOnMiddleOfPage.classList.add('scaled-divide-by-four');
    }
  }


  function draw(event) {
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
    function getPixel() {
      const startX = coordinatesPerSquareOnMainCanvasX
        .filter(coordinate => coordinate >= event.offsetX);
      const startY = coordinatesPerSquareOnMainCanvasX
        .filter(coordinate => coordinate >= event.offsetY);
      const colorOfFillPixel = ctxOfMiddleCanvas
        .getImageData(startX[0] - amountOfDivisonsOfCanvas, startY[0] - amountOfDivisonsOfCanvas,
          1, 1).data;
      const coordsWhichNeedToFill = [];
      let falseToStop = [];
      coordsWhichNeedToFill.push(startX[0] - amountOfDivisonsOfCanvas,
        startY[0] - amountOfDivisonsOfCanvas);
      let lengthOfCoordsCollector = 2;
      const pushFormuls = [];
      let multiplyier = 1;
      // this number need to change coordinates in x,y
      let number = 0;
      // collect coordinates, which need to fill
      while (number <= lengthOfCoordsCollector) {
        const x = coordsWhichNeedToFill[number];
        const y = coordsWhichNeedToFill[number + 1];
        multiplyier = Math.floor(x / amountOfDivisonsOfCanvas) + 1;
        falseToStop = [];
        number += 2;
        if (x >= 19) {
          const colorOfPixel = ctxOfMiddleCanvas
            .getImageData(x - amountOfDivisonsOfCanvas, y,
              1, 1).data;
          multiplyier = Math.floor((x - amountOfDivisonsOfCanvas) / amountOfDivisonsOfCanvas) + 1;
          const idFormula = `${(x - amountOfDivisonsOfCanvas) * multiplyier - (y)}x`;
          if ((colorOfPixel[0] === colorOfFillPixel[0] && colorOfPixel[1] === colorOfFillPixel[1]
            && colorOfPixel[2] === colorOfFillPixel[2] && colorOfPixel[3] === colorOfFillPixel[3])
            && pushFormuls.indexOf(idFormula) === -1) {
            coordsWhichNeedToFill.push(x - amountOfDivisonsOfCanvas);
            coordsWhichNeedToFill.push(y);
            lengthOfCoordsCollector += 2;
            pushFormuls.push(idFormula);
          } else {
            falseToStop.push(false);
          }
        } else {
          falseToStop.push(false);
        }
        if (x <= 608) {
          const colorOfPixel = ctxOfMiddleCanvas
            .getImageData(x + amountOfDivisonsOfCanvas, y, 1, 1).data;
          multiplyier = Math.floor((x + amountOfDivisonsOfCanvas) / amountOfDivisonsOfCanvas) + 1;
          const idFormula = `${(x + amountOfDivisonsOfCanvas) * multiplyier - (y)}x`;
          if ((colorOfPixel[0] === colorOfFillPixel[0] && colorOfPixel[1] === colorOfFillPixel[1]
            && colorOfPixel[2] === colorOfFillPixel[2] && colorOfPixel[3] === colorOfFillPixel[3])
            && pushFormuls.indexOf(idFormula) === -1) {
            coordsWhichNeedToFill.push(x + amountOfDivisonsOfCanvas);
            coordsWhichNeedToFill.push(y);
            lengthOfCoordsCollector += 2;
            pushFormuls.push(idFormula);
          } else {
            falseToStop.push(false);
          }
        } else {
          falseToStop.push(false);
        }
        if (y >= 19) {
          const colorOfPixel = ctxOfMiddleCanvas
            .getImageData(x,
              y - amountOfDivisonsOfCanvas,
              1, 1).data;
          multiplyier = Math.floor(x / amountOfDivisonsOfCanvas) + 1;
          const idFormula = `${(x) - ((y - amountOfDivisonsOfCanvas) * multiplyier)}y`;
          if ((colorOfPixel[0] === colorOfFillPixel[0] && colorOfPixel[1] === colorOfFillPixel[1]
            && colorOfPixel[2] === colorOfFillPixel[2] && colorOfPixel[3] === colorOfFillPixel[3])
            && pushFormuls.indexOf(idFormula) === -1) {
            coordsWhichNeedToFill.push(x);
            coordsWhichNeedToFill.push(y - amountOfDivisonsOfCanvas);
            lengthOfCoordsCollector += 2;
            pushFormuls.push(idFormula);
          } else {
            falseToStop.push(false);
          }
        } else {
          falseToStop.push(false);
        }
        if (y <= 608) {
          const colorOfPixel = ctxOfMiddleCanvas
            .getImageData(x, y + amountOfDivisonsOfCanvas, 1, 1).data;
          multiplyier = Math.floor(x / amountOfDivisonsOfCanvas) + 1;
          const idFormula = `${(x) - ((y + amountOfDivisonsOfCanvas) * multiplyier)}y`;
          if ((colorOfPixel[0] === colorOfFillPixel[0] && colorOfPixel[1] === colorOfFillPixel[1]
            && colorOfPixel[2] === colorOfFillPixel[2] && colorOfPixel[3] === colorOfFillPixel[3])
            && pushFormuls.indexOf(idFormula) === -1) {
            coordsWhichNeedToFill.push(x);
            coordsWhichNeedToFill.push(y + amountOfDivisonsOfCanvas);
            lengthOfCoordsCollector += 2;
            pushFormuls.push(idFormula);
          } else {
            falseToStop.push(false);
          }
        } else {
          falseToStop.push(false);
        }
      }
      while (coordsWhichNeedToFill.length > 0) {
        const { length } = coordsWhichNeedToFill;
        ctxOfMiddleCanvas
          .fillRect(coordsWhichNeedToFill[length - 2], coordsWhichNeedToFill[length - 1],
            amountOfDivisonsOfCanvas, amountOfDivisonsOfCanvas);
        coordsWhichNeedToFill.pop();
        coordsWhichNeedToFill.pop();
      }
    }
    getPixel();
  }
  changeUnitsOfCanvas();
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
      event.preventDefault();
      currentColor = colorRightClick.value;
    }
    ctxOfMiddleCanvas.fillStyle = currentColor;
    draw(event);
  }
  canvasWhichStateOnMiddleOfPage.addEventListener('mousedown', recognizeLeftOrRightClick);
  divWithTools.addEventListener('mouseup', () => {
    if (!bucket.classList.contains('active')) {
      canvasWhichStateOnMiddleOfPage.removeEventListener('mousedown', recognizeLeftOrRightClick);
    }
  });
}
