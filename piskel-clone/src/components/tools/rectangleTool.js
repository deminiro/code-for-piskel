export default function rectangleToolFunction() {
  const canvasWhichStateOnMiddleOfPage = document.getElementById('main-div--canvas');
  const ctxOfMiddleCanvas = canvasWhichStateOnMiddleOfPage.getContext('2d');
  const divWithTools = document.getElementById('div-with-tools');
  const rectangleTool = document.getElementsByClassName('tools-which-change-canvas--rectangle-tool')[0];
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
    if (rectangleTool.classList.contains('active')) {
      if (localStorage.getItem('images') !== null) {
        const numberOfCurrentFrame = +document.getElementsByClassName('yellow-frame-items')[0].innerText;
        const images = JSON.parse(localStorage.getItem('images'));
        const { length } = images;
        if (images[length - 1] !== undefined) {
          const arrayWithImages = images[length - 1].arrayOfKeys;
          const currentImage = arrayWithImages[numberOfCurrentFrame - 1][1];
          image.src = currentImage;
        }
      }
    }
  }

  function drawRectangle(event) {
    event.preventDefault();
    const { x, y } = takeXAndYCoordinates(event);
    const leftClick = 1;
    const rightClick = 3;
    endPointX = x - Math.floor(amountOfDivisonsOfCanvas / 2);
    endPointY = y - Math.floor(amountOfDivisonsOfCanvas / 2);
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
    startPointX = x - Math.floor(amountOfDivisonsOfCanvas / 2);
    startPointY = y - Math.floor(amountOfDivisonsOfCanvas / 2);
    canvasWhichStateOnMiddleOfPage.addEventListener('mousemove', drawRectangle);
  }

  function mouseUp() {
    canvasWhichStateOnMiddleOfPage.removeEventListener('mousemove', drawRectangle);
    const picture = canvasWhichStateOnMiddleOfPage.toDataURL('image/png');
    image.src = picture;
  }

  function activate() {
    if (rectangleTool.classList.contains('active')) {
      canvasWhichStateOnMiddleOfPage.addEventListener('mousedown', takeStartPoint);
      canvasWhichStateOnMiddleOfPage.addEventListener('mouseup', mouseUp);
    }
  }

  function deactivate() {
    if (!rectangleTool.classList.contains('active')) {
      canvasWhichStateOnMiddleOfPage.removeEventListener('mousedown', takeStartPoint);
      canvasWhichStateOnMiddleOfPage.removeEventListener('mouseup', mouseUp);
    }
  }

  divWithTools.addEventListener('mouseup', activate);
  deactivate();
}
