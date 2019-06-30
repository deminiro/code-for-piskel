export default function showCoordinate() {
  const placeShowCoordinates = document.getElementById('place-for-show-coordinates');
  const canvasWhichStateOnMiddleOfPage = document.getElementById('main-div--canvas');
  const submitCanvasSize = document.getElementById('submit-size-of-canvas');
  let units = 32;
  let amountOfDivisonsOfCanvas = 19;

  function changeUnitsOfCanvas() {
    units = +document.querySelector('input[name="size"]:checked').value;
    if (units === 32) amountOfDivisonsOfCanvas = 19;
    if (units === 64) amountOfDivisonsOfCanvas = 9.5;
    if (units === 128) amountOfDivisonsOfCanvas = 4.75;
  }

  function coordinates(event) {
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
    makeCoordinatePerSquare();
    function sizeNumbers() {
      const x = coordinatesPerSquareOnMainCanvasX.filter(coordinate => coordinate >= event.offsetX);
      const y = coordinatesPerSquareOnMainCanvasY.filter(coordinate => coordinate >= event.offsetY);
      placeShowCoordinates.innerHTML = `x:${Math.floor((x[0] - amountOfDivisonsOfCanvas) / amountOfDivisonsOfCanvas)},
      y:${Math.floor((y[0] - amountOfDivisonsOfCanvas) / amountOfDivisonsOfCanvas)}`;
    }
    return sizeNumbers();
  }

  submitCanvasSize.addEventListener('click', changeUnitsOfCanvas);
  canvasWhichStateOnMiddleOfPage.addEventListener('mousemove', coordinates);
}
