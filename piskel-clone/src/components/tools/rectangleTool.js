export default function rectangleToolFunction() {
  const canvasWhichStateOnMiddleOfPage = document.getElementById('main-div--canvas');
  const ctxOfMiddleCanvas = canvasWhichStateOnMiddleOfPage.getContext('2d');
  const divWithTools = document.getElementById('div-with-tools');
  const rectangleTool = document.getElementsByClassName('tools-which-change-canvas--rectangle-tool')[0];
  const colorLeftClick = document.getElementById('tools-choose-color--top');
  const colorRightClick = document.getElementById('tools-choose-color--bottom');
  const image = new Image();
  const units = 32;
  const amountOfDivisonsOfCanvas = Math.floor(canvasWhichStateOnMiddleOfPage.width / units);
  let startPointX = 0;
  let startPointY = 0;
  let endPointX = 0;
  let endPointY = 0;


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
    if (rectangleTool.classList.contains('active')) {
      const currentImage = canvasWhichStateOnMiddleOfPage.toDataURL('image/png');
      image.src = currentImage;
    }
  }

  function drawRectangle(event) {
    event.preventDefault();
    const { x, y } = takeXAndYCoordinates(event);
    const leftClick = 1;
    const rightClick = 3;
    endPointX = x - amountOfDivisonsOfCanvas;
    endPointY = y - amountOfDivisonsOfCanvas;
    ctxOfMiddleCanvas.clearRect(0, 0, canvasWhichStateOnMiddleOfPage.width,
      canvasWhichStateOnMiddleOfPage.height);
    ctxOfMiddleCanvas.drawImage(image, 0, 0);
    ctxOfMiddleCanvas.lineWidth = amountOfDivisonsOfCanvas;
    if (event.which === leftClick) ctxOfMiddleCanvas.strokeStyle = colorLeftClick.value;
    if (event.which === rightClick) ctxOfMiddleCanvas.strokeStyle = colorRightClick.value;
    if (startPointX <= endPointX) {
      ctxOfMiddleCanvas.strokeRect(startPointX, startPointY,
        endPointX - startPointX, endPointY - startPointY);
    }

    if (startPointX >= endPointX) {
      ctxOfMiddleCanvas.strokeRect(endPointX, endPointY,
        startPointX - endPointX, startPointY - endPointY);
    }
  }

  function takeStartPoint(event) {
    event.preventDefault();
    takeImage();
    const { x, y } = takeXAndYCoordinates(event);
    startPointX = x - amountOfDivisonsOfCanvas;
    startPointY = y - amountOfDivisonsOfCanvas;
    canvasWhichStateOnMiddleOfPage.addEventListener('mousemove', drawRectangle);
  }

  function stopDrawing() {
    canvasWhichStateOnMiddleOfPage.removeEventListener('mousemove', drawRectangle);
    const picture = canvasWhichStateOnMiddleOfPage.toDataURL('image/png');
    image.src = picture;
  }

  function activate() {
    if (rectangleTool.classList.contains('active')) {
      canvasWhichStateOnMiddleOfPage.addEventListener('mousedown', takeStartPoint);
      canvasWhichStateOnMiddleOfPage.addEventListener('mouseup', stopDrawing);
    }
  }

  function deactivate() {
    if (!rectangleTool.classList.contains('active')) {
      canvasWhichStateOnMiddleOfPage.removeEventListener('mousedown', takeStartPoint);
      canvasWhichStateOnMiddleOfPage.removeEventListener('mouseup', stopDrawing);
    }
  }

  divWithTools.addEventListener('mouseup', activate);
  divWithTools.addEventListener('mouseup', deactivate);
  document.addEventListener('keyup', activate);
  document.addEventListener('keyup', deactivate);
}
