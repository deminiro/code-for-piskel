export default function mirrorPenTool() {
  const canvasWhichStateOnMiddleOfPage = document.getElementById('main-div--canvas');
  const ctxOfMiddleCanvas = canvasWhichStateOnMiddleOfPage.getContext('2d');
  const submitCanvasSize = document.getElementById('submit-size-of-canvas');
  const divWithTools = document.getElementById('div-with-tools');
  let units = 32;
  let amountOfDivisonsOfCanvas = 19;
  const mirrorPen = document.getElementsByClassName('tools-which-change-canvas--mirror-pen')[0];

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
  submitCanvasSize.addEventListener('click', changeUnitsOfCanvas);

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
      const maxCoordinate = coordinatesPerSquareOnMainCanvasX.reverse()[0];
      const xMirror = maxCoordinate - x[0];
      ctxOfMiddleCanvas.fillRect(x[0] - amountOfDivisonsOfCanvas, y[0] - amountOfDivisonsOfCanvas,
        amountOfDivisonsOfCanvas, amountOfDivisonsOfCanvas);
      ctxOfMiddleCanvas.fillRect(xMirror,
        y[0] - amountOfDivisonsOfCanvas, amountOfDivisonsOfCanvas, amountOfDivisonsOfCanvas);
    }

    makeCoordinatePerSquare();
    drawOnMiddleCanvas(event);
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

  canvasWhichStateOnMiddleOfPage.addEventListener('mousedown', recognizeLeftOrRightClick);
  canvasWhichStateOnMiddleOfPage.addEventListener('mouseup', (event) => {
    event.preventDefault();
    canvasWhichStateOnMiddleOfPage.removeEventListener('mousedown', draw);
    canvasWhichStateOnMiddleOfPage.removeEventListener('mousemove', draw);
  });

  divWithTools.addEventListener('mouseup', () => {
    if (!mirrorPen.classList.contains('active')) {
      canvasWhichStateOnMiddleOfPage.removeEventListener('mousedown', recognizeLeftOrRightClick);
    }
  });
}
