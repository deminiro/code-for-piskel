/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
export default function shapeSelectionFunction() {
  const canvasWhichStateOnMiddleOfPage = document.getElementById('main-div--canvas');
  const ctxOfMiddleCanvas = canvasWhichStateOnMiddleOfPage.getContext('2d');
  const magicStick = document.getElementsByClassName('tools-which-change-canvas--shape-selection')[0];
  const divWithTools = document.getElementById('div-with-tools');
  const submitCanvasSize = document.getElementById('submit-size-of-canvas');
  const saveCoordinatesWhichChooseStickX = [];
  const saveCoordinatesWhichChooseStickY = [];
  let units = 32;
  const amountOfDivisonsOfCanvas = Math.floor(canvasWhichStateOnMiddleOfPage.width / units);

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
      let newX;
      let newY;
      if (event) {
        newX = coordinatesPerSquareOnMainCanvasX
          .filter(coordinate => coordinate >= event.offsetX);
        newY = coordinatesPerSquareOnMainCanvasY
          .filter(coordinate => coordinate >= event.offsetY);
      }
      const x = newX[0];
      const y = newY[0];
      return { x, y };
    }

    function imageData() {
      const x = coordinatesPerSquareOnMainCanvasX.filter(coordinate => coordinate >= event.offsetX);
      const y = coordinatesPerSquareOnMainCanvasX.filter(coordinate => coordinate >= event.offsetY);
      const colorData = [];
      const colorOfPixel = ctxOfMiddleCanvas
        .getImageData(x[0] - amountOfDivisonsOfCanvas, y[0] - amountOfDivisonsOfCanvas,
          1, 1).data;
      colorData.push(colorOfPixel[0]);
      colorData.push(colorOfPixel[1]);
      colorData.push(colorOfPixel[2]);
      colorData.push(colorOfPixel[3]);
      for (let first = 0; first <= coordinatesPerSquareOnMainCanvasY.length - 1; first += 1) {
        for (let second = 0; second <= coordinatesPerSquareOnMainCanvasX.length - 1; second += 1) {
          const takeColorFromPixel = ctxOfMiddleCanvas
            .getImageData(coordinatesPerSquareOnMainCanvasX[second] - amountOfDivisonsOfCanvas,
              coordinatesPerSquareOnMainCanvasY[first] - amountOfDivisonsOfCanvas, 1, 1).data;
          if (takeColorFromPixel[0] === colorData[0] && takeColorFromPixel[1] === colorData[1]
            && takeColorFromPixel[2] === colorData[2]
            && takeColorFromPixel[3] === colorData[3]) {
            const xShape = Math.floor(coordinatesPerSquareOnMainCanvasX[second]
               - amountOfDivisonsOfCanvas);
            const yShape = Math.floor(coordinatesPerSquareOnMainCanvasY[first]
              - amountOfDivisonsOfCanvas);
            saveCoordinatesWhichChooseStickX.push(xShape);
            saveCoordinatesWhichChooseStickY.push(yShape);
          }
        }
      }
    }

    makeCoordinatePerSquare();
    imageData();
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
    data[pos + 3] = color.hasOwnProperty('a') ? color.a : 150;
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

  function clearShapedCoordinates() {
    saveCoordinatesWhichChooseStickX.forEach((coordinateX, index) => {
      const coordinateY = saveCoordinatesWhichChooseStickY[index];
      ctxOfMiddleCanvas.clearRect(coordinateX, coordinateY,
        amountOfDivisonsOfCanvas, amountOfDivisonsOfCanvas);
    });
  }

  function activate(event) {
    const { x, y } = takeXAndYCoordinates(event);
    const startX = x - amountOfDivisonsOfCanvas;
    const startY = y - amountOfDivisonsOfCanvas;
    clearShapedCoordinates();
    floodFill(startX, startY, { r: 133, g: 250, b: 255 });
  }

  canvasWhichStateOnMiddleOfPage.addEventListener('mousedown', activate);

  divWithTools.addEventListener('mouseup', () => {
    if (!magicStick.classList.contains('active')) {
      canvasWhichStateOnMiddleOfPage.removeEventListener('mousedown', activate);
    }
  });
}
