export default function penAndEraserTools() {
  const canvasWhichStateOnMiddleOfPage = document.getElementById('main-div--canvas');
  const ctxOfMiddleCanvas = canvasWhichStateOnMiddleOfPage.getContext('2d');
  const divWithTools = document.getElementById('div-with-tools');
  const units = 32;
  const amountOfDivisonsOfCanvas = 19;
  const pen = document.getElementsByClassName('tools-which-change-canvas--pen')[0];
  const eraser = document.getElementsByClassName('tools-which-change-canvas--eraser-tool')[0];
  const keyboardButtonE = 69;
  const keyboardButtonP = 80;
  let toolPen = false;
  let toolEraser = false;

  function changeCurrentTool() {
    function chooseCurrentTool(event) {
      if (pen.classList.contains('active') || event.keyCode === keyboardButtonP) toolPen = true;
      if (eraser.classList.contains('active') || event.keyCode === keyboardButtonE) toolEraser = true;
    }

    divWithTools.addEventListener('mouseup', chooseCurrentTool);
    document.addEventListener('keyup', chooseCurrentTool);
  }
  changeCurrentTool();

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


    function drawOnMiddleCanvas() {
      const x = coordinatesPerSquareOnMainCanvasX.filter(coordinate => coordinate >= event.offsetX);
      const y = coordinatesPerSquareOnMainCanvasY.filter(coordinate => coordinate >= event.offsetY);
      if (toolPen) {
        ctxOfMiddleCanvas.fillRect(x[0] - amountOfDivisonsOfCanvas, y[0] - amountOfDivisonsOfCanvas,
          amountOfDivisonsOfCanvas, amountOfDivisonsOfCanvas);
      }
      if (toolEraser) {
        ctxOfMiddleCanvas
          .clearRect(x[0] - amountOfDivisonsOfCanvas, y[0] - amountOfDivisonsOfCanvas,
            amountOfDivisonsOfCanvas, amountOfDivisonsOfCanvas);
      }
      ctxOfMiddleCanvas.fill();
    }
    makeCoordinatePerSquare();
    drawOnMiddleCanvas();

    return { makeCoordinatePerSquare, drawOnMiddleCanvas };
  }

  function makeDrawingWithMouse(event) {
    draw(event);
    canvasWhichStateOnMiddleOfPage.addEventListener('mousemove', draw);
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
      event.preventDefault();
      currentColor = colorRightClick.value;
    }
    ctxOfMiddleCanvas.fillStyle = currentColor;
    makeDrawingWithMouse(event);
  }

  function activateEvendListeners() {
    canvasWhichStateOnMiddleOfPage.addEventListener('click', (event) => {
      event.preventDefault();
    });
    canvasWhichStateOnMiddleOfPage.addEventListener('mousedown', recognizeLeftOrRightClick);
    canvasWhichStateOnMiddleOfPage.addEventListener('mouseup', (event) => {
      event.preventDefault();
      canvasWhichStateOnMiddleOfPage.removeEventListener('mousedown', draw);
      canvasWhichStateOnMiddleOfPage.removeEventListener('mousemove', draw);
    });


    divWithTools.addEventListener('mouseup', () => {
      if (!pen.classList.contains('active')) {
        canvasWhichStateOnMiddleOfPage.removeEventListener('mousedown', makeDrawingWithMouse);
        toolPen = false;
      }
      if (!eraser.classList.contains('active')) {
        canvasWhichStateOnMiddleOfPage.removeEventListener('mousedown', makeDrawingWithMouse);
        toolEraser = false;
      }
    });
  }
  activateEvendListeners();

  function toActivateWithKeyboard(event) {
    if (event.keyCode !== keyboardButtonP) {
      canvasWhichStateOnMiddleOfPage.removeEventListener('mousedown', makeDrawingWithMouse);
      canvasWhichStateOnMiddleOfPage.removeEventListener('mousedown', draw);
      canvasWhichStateOnMiddleOfPage.removeEventListener('mousemove', draw);
      toolPen = false;
    }
    if (event.keyCode !== keyboardButtonE) {
      canvasWhichStateOnMiddleOfPage.removeEventListener('mousedown', makeDrawingWithMouse);
      canvasWhichStateOnMiddleOfPage.removeEventListener('mousedown', draw);
      canvasWhichStateOnMiddleOfPage.removeEventListener('mousemove', draw);
      toolEraser = false;
    }
  }
  document.addEventListener('keyup', toActivateWithKeyboard);


  return { changeCurrentTool, activateEvendListeners };
}
