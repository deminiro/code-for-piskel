export default function penAndEraserTools() {
  const canvasWhichStateOnMiddleOfPage = document.getElementById('main-div--canvas');
  const ctxOfMiddleCanvas = canvasWhichStateOnMiddleOfPage.getContext('2d');
  const submitCanvasSize = document.getElementById('submit-size-of-canvas');
  const divWithTools = document.getElementById('div-with-tools');
  let units = 32;
  let amountOfDivisonsOfCanvas = 19;
  const pen = document.getElementsByClassName('tools-which-change-canvas--pen')[0];
  const eraser = document.getElementsByClassName('tools-which-change-canvas--eraser-tool')[0];
  const keyboardButtonE = 69;
  const keyboardButtonP = 80;
  let toolPen = false;
  let toolEraser = false;

  divWithTools.addEventListener('mouseup', () => {
    if (pen.classList.contains('active')) toolPen = true;
    if (eraser.classList.contains('active')) toolEraser = true;
  });

  document.addEventListener('keyup', (event) => {
    if (event.keyCode === keyboardButtonP) toolPen = true;
    if (event.keyCode === keyboardButtonE) toolEraser = true;
  });

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

  submitCanvasSize.addEventListener('click', changeUnitsOfCanvas);
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
}
