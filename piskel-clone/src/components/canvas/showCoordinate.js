export default function showCoordinate() {
  const placeShowCoordinates = document.getElementById('place-for-show-coordinates');
  const canvasWhichStateOnMiddleOfPage = document.getElementById('main-div--canvas');
  const units = 32;
  const amountOfDivisonsOfCanvas = Math.floor(canvasWhichStateOnMiddleOfPage.width / units);

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

  canvasWhichStateOnMiddleOfPage.addEventListener('mousemove', coordinates);
}
