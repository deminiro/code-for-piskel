export default function strokeToolFunction() {
  const canvasWhichStateOnMiddleOfPage = document.getElementById('main-div--canvas');
  const ctxOfMiddleCanvas = canvasWhichStateOnMiddleOfPage.getContext('2d');
  const divWithTools = document.getElementById('div-with-tools');
  const strokeTool = document.getElementsByClassName('tools-which-change-canvas--stroke-tool')[0];
  const submitCanvasSize = document.getElementById('submit-size-of-canvas');
  const colorLeftClick = document.getElementById('tools-choose-color--top');
  const colorRightClick = document.getElementById('tools-choose-color--bottom');
  const image = new Image();
  let units = 32;
  let amountOfDivisonsOfCanvas = 19;
  let startPointX = 0;
  let startPointY = 0;
  let endPointX = 0;
  let endPointY = 0;

  function changeUnitsOfCanvas() {
    units = +document.querySelector('input[name="size"]:checked').value;
    if (units === 32) {
      amountOfDivisonsOfCanvas = 19;
    }
    if (units === 64) {
      amountOfDivisonsOfCanvas = 9.5;
    }
    if (units === 128) {
      amountOfDivisonsOfCanvas = 4.75;
    }
  }
  submitCanvasSize.addEventListener('click', changeUnitsOfCanvas);


  function takeXAndYCoordinates(event) {
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

    function xAndY() {
      const newX = coordinatesPerSquareOnMainCanvasX
        .filter(coordinate => coordinate >= event.offsetX);
      const newY = coordinatesPerSquareOnMainCanvasY
        .filter(coordinate => coordinate >= event.offsetY);
      const x = newX[0];
      const y = newY[0];
      return { x, y };
    }

    makeCoordinatePerSquare();
    return xAndY();
  }

  function takeImage() {
    if (strokeTool.classList.contains('active')) {
      const currentImage = canvasWhichStateOnMiddleOfPage.toDataURL('image/png');
      image.src = currentImage;
    }
  }


  function drawRectangle(event) {
    event.preventDefault();
    const { x, y } = takeXAndYCoordinates(event);
    const leftClick = 1;
    const rightClick = 3;
    endPointX = x;
    endPointY = y;
    ctxOfMiddleCanvas.clearRect(0, 0, canvasWhichStateOnMiddleOfPage.width,
      canvasWhichStateOnMiddleOfPage.height);
    ctxOfMiddleCanvas.drawImage(image, 0, 0);
    ctxOfMiddleCanvas.lineWidth = 1;
    if (event.which === leftClick) ctxOfMiddleCanvas.strokeStyle = colorLeftClick.value;
    if (event.which === rightClick) ctxOfMiddleCanvas.strokeStyle = colorRightClick.value;
    if (startPointX <= endPointX) {
      const differenceX = Math.floor(startPointX - endPointX);
      const differenceY = Math.floor(startPointY - endPointY);
      let amountOfDivisionsX;
      let amountOfDivisionsY;
      let lengthOfLine;
      let ostatok;
      if (differenceX > differenceY) {
        amountOfDivisionsY = differenceY;
        lengthOfLine = differenceX;
        ostatok = lengthOfLine % differenceX;
      } else if (differenceX < differenceY) {
        amountOfDivisionsX = differenceX;
        lengthOfLine = differenceY;
        ostatok = lengthOfLine % differenceY;
      } else {
        amountOfDivisionsX = differenceX;
        lengthOfLine = differenceX;
        ostatok = lengthOfLine % differenceX;
      }
      const amountOfDivisions = amountOfDivisionsX || amountOfDivisionsY;
      if (ostatok === 0) {
        const lengthPerDivision = Math.floor(lengthOfLine / amountOfDivisions);
        let counter = 0;
        let multiplierForCoords = -1;
        let forStopLoopX = startPointX + amountOfDivisonsOfCanvas * multiplierForCoords;
        let forStopLoopY = startPointY + amountOfDivisonsOfCanvas * multiplierForCoords;
        while (forStopLoopX <= endPointX && forStopLoopY <= endPointY) {
          forStopLoopX = startPointX + amountOfDivisonsOfCanvas * multiplierForCoords;
          forStopLoopY = startPointX + amountOfDivisonsOfCanvas * multiplierForCoords;
          let changePlace = 0;
          if (counter === lengthPerDivision) {
            changePlace = amountOfDivisonsOfCanvas;
            counter = 0;
          }
          if (differenceX < differenceY || differenceX === differenceY) {
            ctxOfMiddleCanvas.fillRect(startPointX + amountOfDivisonsOfCanvas * multiplierForCoords,
              startPointY + changePlace, amountOfDivisonsOfCanvas, amountOfDivisonsOfCanvas);
            global.console.log(startPointX + amountOfDivisonsOfCanvas * multiplierForCoords,
              startPointY + changePlace);
          } else if (differenceX < differenceY) {
            ctxOfMiddleCanvas.fillRect(startPointX + changePlace,
              startPointY + amountOfDivisonsOfCanvas * multiplierForCoords,
              amountOfDivisonsOfCanvas, amountOfDivisonsOfCanvas);
          }
          multiplierForCoords += 1;
          counter += 1;
        }
      }
    }

    if (startPointX >= endPointX) {
      ctxOfMiddleCanvas.fillRect(startPointX, startPointY,
        amountOfDivisonsOfCanvas, amountOfDivisonsOfCanvas);
      ctxOfMiddleCanvas.fillRect(endPointX, endPointY,
        amountOfDivisonsOfCanvas, amountOfDivisonsOfCanvas);
    }
  }

  function takeStartPoint(event) {
    event.preventDefault();
    takeImage();
    const { x, y } = takeXAndYCoordinates(event);
    startPointX = x;
    startPointY = y;
    canvasWhichStateOnMiddleOfPage.addEventListener('mousemove', drawRectangle);
  }

  function stopDrawing() {
    canvasWhichStateOnMiddleOfPage.removeEventListener('mousemove', drawRectangle);
    const picture = canvasWhichStateOnMiddleOfPage.toDataURL('image/png');
    image.src = picture;
  }

  function activate() {
    if (strokeTool.classList.contains('active')) {
      canvasWhichStateOnMiddleOfPage.addEventListener('mousedown', takeStartPoint);
      canvasWhichStateOnMiddleOfPage.addEventListener('mouseup', stopDrawing);
    }
  }

  function deactivate() {
    if (!strokeTool.classList.contains('active')) {
      canvasWhichStateOnMiddleOfPage.removeEventListener('mousedown', takeStartPoint);
      canvasWhichStateOnMiddleOfPage.removeEventListener('mouseup', stopDrawing);
    }
  }

  divWithTools.addEventListener('mouseup', activate);
  divWithTools.addEventListener('mouseup', deactivate);
}
