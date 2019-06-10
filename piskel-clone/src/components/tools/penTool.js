export default function penTool() {
  const chooseCurrentColorTop = document.getElementById('tools-choose-color--top');
  const canvasWhichStateOnMiddleOfPage = document.getElementById('main-div--canvas');
  const ctxOfMiddleCanvas = canvasWhichStateOnMiddleOfPage.getContext('2d');
  const submitCanvasSize = document.getElementById('submit-size-of-canvas');
  const divWithTools = document.getElementById('div-with-tools');
  let units = 32;
  let amountOfDivisonsOfCanvas = 19;
  const pen = document.getElementsByClassName('tools-which-change-canvas--pen')[0];


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
      const currentColor = chooseCurrentColorTop.value;
      const x = coordinatesPerSquareOnMainCanvasX.filter(coordinate => coordinate >= event.offsetX);
      const y = coordinatesPerSquareOnMainCanvasY.filter(coordinate => coordinate >= event.offsetY);
      ctxOfMiddleCanvas.fillStyle = currentColor;
      ctxOfMiddleCanvas.fillRect(x[0] - amountOfDivisonsOfCanvas, y[0] - amountOfDivisonsOfCanvas,
        amountOfDivisonsOfCanvas, amountOfDivisonsOfCanvas);
      ctxOfMiddleCanvas.fill();
      global.console.log(x, y);
    }

    makeCoordinatePerSquare();
    drawOnMiddleCanvas(event);
  }

  function deactivate(event) {
    event.preventDefault();
    draw(event);
    canvasWhichStateOnMiddleOfPage.addEventListener('mousemove', draw);
  }

  submitCanvasSize.addEventListener('click', changeUnitsOfCanvas);
  canvasWhichStateOnMiddleOfPage.addEventListener('mousedown', deactivate);
  canvasWhichStateOnMiddleOfPage.addEventListener('mouseup', () => {
    canvasWhichStateOnMiddleOfPage.removeEventListener('mousedown', draw);
    canvasWhichStateOnMiddleOfPage.removeEventListener('mousemove', draw);
  });


  divWithTools.addEventListener('mouseup', () => {
    if (!pen.classList.contains('active')) {
      canvasWhichStateOnMiddleOfPage.removeEventListener('mousedown', deactivate);
    }
  });
}
