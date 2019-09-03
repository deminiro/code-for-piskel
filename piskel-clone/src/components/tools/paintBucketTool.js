/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
export default function paintBucketTool() {
  const canvasWhichStateOnMiddleOfPage = document.getElementById('main-div--canvas');
  const ctxOfMiddleCanvas = canvasWhichStateOnMiddleOfPage.getContext('2d');
  const bucket = document.getElementsByClassName('tools-which-change-canvas--paint-bucket-tool')[0];
  const divWithTools = document.getElementById('div-with-tools');
  const colorTop = document.getElementById('tools-choose-color--top');
  const colorBottom = document.getElementById('tools-choose-color--bottom');
  const units = 32;
  const amountOfDivisonsOfCanvas = Math.floor(canvasWhichStateOnMiddleOfPage.width / units);


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

  const getPixelPos = function qwe(x, y) {
    return (y * canvasWhichStateOnMiddleOfPage.width + x) * 4;
  };

  function matchStartColor(data, pos, startColor) {
    return (data[pos] === startColor.r
            && data[pos + 1] === startColor.g
            && data[pos + 2] === startColor.b
            && data[pos + 3] === startColor.a);
  }

  function colorPixel(data, pos, color) {
    data[pos] = color.r || 0;
    data[pos + 1] = color.g || 0;
    data[pos + 2] = color.b || 0;
    // eslint-disable-next-line no-prototype-builtins
    data[pos + 3] = color.hasOwnProperty('a') ? color.a : 255;
  }

  function floodFill(startX, startY, fillColor) {
    const dstImg = ctxOfMiddleCanvas.getImageData(0, 0,
      canvasWhichStateOnMiddleOfPage.width, canvasWhichStateOnMiddleOfPage.height);
    const dstData = dstImg.data;

    const startPos = getPixelPos(startX, startY);
    const startColor = {
      r: dstData[startPos],
      g: dstData[startPos + 1],
      b: dstData[startPos + 2],
      a: dstData[startPos + 3],
    };
    const todo = [[startX, startY]];

    while (todo.length) {
      const pos = todo.pop();
      const x = pos[0];
      let y = pos[1];
      let currentPos = getPixelPos(x, y);

      while ((y-- >= 0) && matchStartColor(dstData, currentPos, startColor)) {
        currentPos -= canvasWhichStateOnMiddleOfPage.width * 4;
      }

      currentPos += canvasWhichStateOnMiddleOfPage.width * 4;
      ++y;
      let reachLeft = false;
      let reachRight = false;

      while ((y++ < canvasWhichStateOnMiddleOfPage.height - 1)
      && matchStartColor(dstData, currentPos, startColor)) {
        colorPixel(dstData, currentPos, fillColor);

        if (x > 0) {
          if (matchStartColor(dstData, currentPos - 4, startColor)) {
            if (!reachLeft) {
              todo.push([x - 1, y]);
              reachLeft = true;
            }
          } else if (reachLeft) {
            reachLeft = false;
          }
        }

        if (x < canvasWhichStateOnMiddleOfPage.width - 1) {
          if (matchStartColor(dstData, currentPos + 4, startColor)) {
            if (!reachRight) {
              todo.push([x + 1, y]);
              reachRight = true;
            }
          } else if (reachRight) {
            reachRight = false;
          }
        }

        currentPos += canvasWhichStateOnMiddleOfPage.width * 4;
      }
    }

    ctxOfMiddleCanvas.putImageData(dstImg, 0, 0);
  }

  function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    } : null;
  }

  function activate(event) {
    const { x, y } = takeXAndYCoordinates(event);
    const startX = x - amountOfDivisonsOfCanvas;
    const startY = y - amountOfDivisonsOfCanvas;
    let currentColor;
    const top = hexToRgb(colorTop.value);
    const bottom = hexToRgb(colorBottom.value);
    const leftClick = 1;
    const rightClick = 3;
    if (event.which === leftClick) currentColor = top;
    if (event.which === rightClick) currentColor = bottom;
    floodFill(startX, startY, currentColor);
  }

  canvasWhichStateOnMiddleOfPage.addEventListener('mousedown', activate);

  divWithTools.addEventListener('mouseup', () => {
    if (!bucket.classList.contains('active')) {
      canvasWhichStateOnMiddleOfPage.removeEventListener('mousedown', activate);
    }
  });
}
