// /* eslint-disable */
export default function moveToolFunction() {
  const canvasWhichStateOnMiddleOfPage = document.getElementById('main-div--canvas');
  const ctxOfMiddleCanvas = canvasWhichStateOnMiddleOfPage.getContext('2d');
  const divWithTools = document.getElementById('div-with-tools');
  const moveTool = document.getElementsByClassName('tools-which-change-canvas--move-tool')[0];
  const imageWhichMove = new Image();
  let isDraggable = false;
  const submitCanvasSize = document.getElementById('submit-size-of-canvas');
  let units = 32;
  let amountOfDivisonsOfCanvas = 19;
  let currentX = 0;
  let currentY = 0;

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

  function resetCanvas() {
    ctxOfMiddleCanvas.clearRect(0, 0, canvasWhichStateOnMiddleOfPage.width,
      canvasWhichStateOnMiddleOfPage.height);
  }

  function isDraggableFalse() {
    isDraggable = false;
  }

  function forMouseDown(event) {
    const { x, y } = takeXAndYCoordinates(event);
    const mouseX = x - amountOfDivisonsOfCanvas;
    const mouseY = y - amountOfDivisonsOfCanvas;

    if (mouseX >= (currentX - imageWhichMove.width / 2)
      && mouseX <= (currentX + imageWhichMove.width / 2)
      && mouseY >= (currentY - imageWhichMove.height / 2)
      && mouseY <= (currentY + imageWhichMove.height / 2)) {
      isDraggable = true;
    }
  }

  function forMouseMove(event) {
    if (isDraggable) {
      const { x, y } = takeXAndYCoordinates(event);
      currentX = x;
      currentY = y;
    }
  }

  function mouseEvents() {
    canvasWhichStateOnMiddleOfPage.addEventListener('mousedown', forMouseDown);
    canvasWhichStateOnMiddleOfPage.addEventListener('mousemove', forMouseMove);
    canvasWhichStateOnMiddleOfPage.addEventListener('mouseup', isDraggableFalse);
    canvasWhichStateOnMiddleOfPage.addEventListener('mouseout', isDraggableFalse);
  }
  function drawImagew() {
    ctxOfMiddleCanvas.drawImage(imageWhichMove, currentX - (imageWhichMove.width / 2),
      currentY - (imageWhichMove.height / 2));
  }

  function go() {
    currentX = canvasWhichStateOnMiddleOfPage.width / 2;
    currentY = canvasWhichStateOnMiddleOfPage.height / 2;
    const picture = canvasWhichStateOnMiddleOfPage.toDataURL('image/png');
    imageWhichMove.src = picture;
    mouseEvents();
    const interval = setInterval(() => {
      resetCanvas();
      drawImagew();
      if (!moveTool.classList.contains('active')) {
        clearInterval(interval);
      }
    }, 1000 / 30);
  }
  divWithTools.addEventListener('mouseup', () => {
    const picture = canvasWhichStateOnMiddleOfPage.toDataURL('image/png');
    imageWhichMove.src = picture;
  });
  canvasWhichStateOnMiddleOfPage.addEventListener('mousedown', go);
  divWithTools.addEventListener('mouseup', () => {
    if (!moveTool.classList.contains('active')) {
      canvasWhichStateOnMiddleOfPage.removeEventListener('mousedown', go);
      canvasWhichStateOnMiddleOfPage.removeEventListener('mousedown', forMouseDown);
      canvasWhichStateOnMiddleOfPage.removeEventListener('mousemove', forMouseMove);
      canvasWhichStateOnMiddleOfPage.removeEventListener('mouseup', isDraggableFalse);
      canvasWhichStateOnMiddleOfPage.removeEventListener('mouseout', isDraggableFalse);
    }
  });
}
