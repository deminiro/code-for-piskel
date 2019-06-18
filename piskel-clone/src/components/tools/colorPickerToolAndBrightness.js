export default function colorPickerTool() {
  const canvasWhichStateOnMiddleOfPage = document.getElementById('main-div--canvas');
  const divWithTools = document.getElementById('div-with-tools');
  const mainCanvas = document.getElementById('main-div--canvas');
  const ctxMainCanvas = mainCanvas.getContext('2d');
  const colorTop = document.getElementById('tools-choose-color--top');
  const colorBottom = document.getElementById('tools-choose-color--bottom');
  const toolPicker = document.getElementsByClassName('tools-which-change-canvas--color-picker')[0];
  const toolLighten = document.getElementsByClassName('tools-which-change-canvas--lighten')[0];
  const submitCanvasSize = document.getElementById('submit-size-of-canvas');
  let colorForLeftOrRightClick;
  let units = 32;
  let amountOfDivisonsOfCanvas = 19;

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


  function rgb2hex(rgb) {
    // eslint-disable-next-line no-param-reassign
    rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    const result = `#${
      (`0${parseInt(rgb[1], 10).toString(16)}`).slice(-2)
    }${(`0${parseInt(rgb[2], 10).toString(16)}`).slice(-2)
    }${(`0${parseInt(rgb[3], 10).toString(16)}`).slice(-2)}`;
    colorForLeftOrRightClick = result;
  }

  function pickColorFromPixel(event, r, g, b) {
    const x = event.offsetX;
    const y = event.offsetY;
    const colorImageData = ctxMainCanvas.getImageData(x, y, 1, 1);
    let colorImageDataR = colorImageData.data[0] + r;
    let colorImageDataG = colorImageData.data[1] + g;
    let colorImageDataB = colorImageData.data[2] + b;
    if (colorImageDataR > 255) colorImageDataR = 255;
    if (colorImageDataG > 255) colorImageDataG = 255;
    if (colorImageDataB > 255) colorImageDataB = 255;
    const colorR = colorImageDataR;
    const colorG = colorImageDataG;
    const colorB = colorImageDataB;

    const rgb = `rgb(${colorR}, ${colorG}, ${colorB})`;
    rgb2hex(rgb);
  }

  function leftOfRightClick(event) {
    pickColorFromPixel(event, 0, 0, 0);
    if (event.which === 1) colorTop.value = colorForLeftOrRightClick;
    if (event.which === 3) colorBottom.value = colorForLeftOrRightClick;
  }

  function lightenTool(event) {
    pickColorFromPixel(event, 5, 5, 5);
    const { x } = takeXAndYCoordinates(event);
    const { y } = takeXAndYCoordinates(event);
    ctxMainCanvas.fillStyle = colorForLeftOrRightClick;
    ctxMainCanvas.fillRect(x - amountOfDivisonsOfCanvas, y - amountOfDivisonsOfCanvas,
      amountOfDivisonsOfCanvas, amountOfDivisonsOfCanvas);
  }

  divWithTools.addEventListener('mouseup', () => {
    if (toolPicker.classList.contains('active')) {
      canvasWhichStateOnMiddleOfPage.addEventListener('mousedown', leftOfRightClick);
    }
    if (!toolPicker.classList.contains('active')) {
      canvasWhichStateOnMiddleOfPage.removeEventListener('mousedown', leftOfRightClick);
    }
    if (toolLighten.classList.contains('active')) {
      canvasWhichStateOnMiddleOfPage.addEventListener('mousedown', lightenTool);
    }
    if (!toolLighten.classList.contains('active')) {
      canvasWhichStateOnMiddleOfPage.removeEventListener('mousedown', lightenTool);
    }
  });
}
