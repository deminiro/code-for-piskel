export default function ditheringTool() {
  const canvasWhichStateOnMiddleOfPage = document.getElementById('main-div--canvas');
  const ctxOfMiddleCanvas = canvasWhichStateOnMiddleOfPage.getContext('2d');
  const submitCanvasSize = document.getElementById('submit-size-of-canvas');
  const divWithTools = document.getElementById('div-with-tools');
  const colorLeftClick = document.getElementById('tools-choose-color--top');
  const colorRightClick = document.getElementById('tools-choose-color--bottom');
  const leftClick = 1;
  const rightClick = 3;
  let units = 32;
  let amountOfDivisonsOfCanvas = 19;
  const dithering = document.getElementsByClassName('tools-which-change-canvas--dithering-tool')[0];
  // 0 equal fillRect, 1 equal clearRect
  let needToChangeFillAndClear = 0;
  // need to change fill pixel to clear pixel
  const coordsForFill = new Set();
  const coordsForClear = new Set();

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
      if (needToChangeFillAndClear === 0
        && !coordsForClear.has(x[0] - amountOfDivisonsOfCanvas, y[0] - amountOfDivisonsOfCanvas)) {
        global.console.log(x[0], y[0]);
        coordsForFill.add(x[0] - amountOfDivisonsOfCanvas, y[0] - amountOfDivisonsOfCanvas);
        if (event.which === rightClick) ctxOfMiddleCanvas.fillStyle = colorRightClick.value;
        if (event.which === leftClick) ctxOfMiddleCanvas.fillStyle = colorLeftClick.value;
        ctxOfMiddleCanvas.fillRect(x[0] - amountOfDivisonsOfCanvas, y[0] - amountOfDivisonsOfCanvas,
          amountOfDivisonsOfCanvas, amountOfDivisonsOfCanvas);
        needToChangeFillAndClear += 1;
      }
      if (needToChangeFillAndClear === 1
         && !coordsForFill.has(x[0] - amountOfDivisonsOfCanvas, y[0] - amountOfDivisonsOfCanvas)) {
        coordsForClear.add(x[0] - amountOfDivisonsOfCanvas, y[0] - amountOfDivisonsOfCanvas);
        if (event.which === leftClick) ctxOfMiddleCanvas.fillStyle = colorRightClick.value;
        if (event.which === rightClick) ctxOfMiddleCanvas.fillStyle = colorLeftClick.value;
        ctxOfMiddleCanvas.fillRect(x[0] - amountOfDivisonsOfCanvas,
          y[0] - amountOfDivisonsOfCanvas, amountOfDivisonsOfCanvas, amountOfDivisonsOfCanvas);
        needToChangeFillAndClear -= 1;
      }
    }

    makeCoordinatePerSquare();
    drawOnMiddleCanvas(event);
  }

  function makeDrawingWithMouse(event) {
    draw(event);
    canvasWhichStateOnMiddleOfPage.addEventListener('mousemove', draw);
  }

  function recognizeLeftOrRightClick(event) {
    let currentColor;
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
  canvasWhichStateOnMiddleOfPage.addEventListener('mouseup', () => {
    canvasWhichStateOnMiddleOfPage.removeEventListener('mousedown', draw);
    canvasWhichStateOnMiddleOfPage.removeEventListener('mousemove', draw);
  });


  divWithTools.addEventListener('mouseup', () => {
    if (!dithering.classList.contains('active')) {
      canvasWhichStateOnMiddleOfPage.removeEventListener('mousedown', recognizeLeftOrRightClick);
    }
  });
}
