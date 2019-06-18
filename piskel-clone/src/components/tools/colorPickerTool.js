export default function colorPickerTool() {
  const canvasWhichStateOnMiddleOfPage = document.getElementById('main-div--canvas');
  const divWithTools = document.getElementById('div-with-tools');
  const mainCanvas = document.getElementById('main-div--canvas');
  const ctxMainCanvas = mainCanvas.getContext('2d');
  const colorTop = document.getElementById('tools-choose-color--top');
  const colorBottom = document.getElementById('tools-choose-color--bottom');
  const toolPicker = document.getElementsByClassName('tools-which-change-canvas--color-picker')[0];
  let colorForLeftOrRightClick;

  function rgb2hex(rgb) {
    // eslint-disable-next-line no-param-reassign
    rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    const result = `#${
      (`0${parseInt(rgb[1], 10).toString(16)}`).slice(-2)
    }${(`0${parseInt(rgb[2], 10).toString(16)}`).slice(-2)
    }${(`0${parseInt(rgb[3], 10).toString(16)}`).slice(-2)}`;
    global.console.log(result);
    colorForLeftOrRightClick = result;
  }

  function pickColorFromPixel(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    const colorImageData = ctxMainCanvas.getImageData(x, y, 1, 1);
    const colorR = colorImageData.data[0];
    const colorG = colorImageData.data[1];
    const colorB = colorImageData.data[2];

    const rgb = `rgb(${colorR}, ${colorG}, ${colorB})`;
    rgb2hex(rgb);
  }

  function leftOfRightClick(event) {
    pickColorFromPixel(event);
    if (event.which === 1) colorTop.value = colorForLeftOrRightClick;
    if (event.which === 3) colorBottom.value = colorForLeftOrRightClick;
  }

  divWithTools.addEventListener('mouseup', () => {
    if (toolPicker.classList.contains('active')) {
      canvasWhichStateOnMiddleOfPage.addEventListener('mousedown', leftOfRightClick);
    }
    if (!toolPicker.classList.contains('active')) {
      canvasWhichStateOnMiddleOfPage.removeEventListener('mousedown', leftOfRightClick);
    }
  });
}
