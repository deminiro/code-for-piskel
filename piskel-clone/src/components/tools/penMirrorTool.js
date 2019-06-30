export default function mirrorPenTool() {
  const canvasWhichStateOnMiddleOfPage = document.getElementById('main-div--canvas');
  const ctxOfMiddleCanvas = canvasWhichStateOnMiddleOfPage.getContext('2d');
  const divWithTools = document.getElementById('div-with-tools');
  let units = 32;
  let amountOfDivisonsOfCanvas = 19;
  const mirrorPen = document.getElementsByClassName('tools-which-change-canvas--mirror-pen')[0];

  function changeUnitsOfCanvas() {
    units = +document.querySelector('input[name="size"]:checked').value;
    if (units === 32) amountOfDivisonsOfCanvas = 19;
    if (units === 64) amountOfDivisonsOfCanvas = 9.5;
    if (units === 128) amountOfDivisonsOfCanvas = 4.75;
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
    changeUnitsOfCanvas();
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

  function deactivate() {
    if (!mirrorPen.classList.contains('active')) {
      canvasWhichStateOnMiddleOfPage.removeEventListener('mousedown', recognizeLeftOrRightClick);
    }
  }

  divWithTools.addEventListener('mouseup', deactivate);
  document.addEventListener('keyup', deactivate);
}
