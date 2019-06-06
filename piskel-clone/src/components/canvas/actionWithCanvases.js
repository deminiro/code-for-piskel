export default function actionWithCanvases() {
  const canvasWhichStateOnMiddleOfPage = document.getElementById('main-div--canvas');
  const ctxOfMiddleCanvas = canvasWhichStateOnMiddleOfPage.getContext('2d');
  const chooseCurrentColorTop = document.getElementById('tools-choose-color--top');
  const imagesForPreview = new Map();
  const coordinatesFromMainCanvasForFrameCanvas = new Map();

  function drawCanvases() {
    function drawOnMiddleCanvas(event) {
      const numberOfCurrentFrame = +document.getElementsByClassName('yellow-frame-items')[0].innerText;
      ctxOfMiddleCanvas.fillStyle = chooseCurrentColorTop.value;
      const x = event.offsetX - 5;
      const y = event.offsetY - 5;
      ctxOfMiddleCanvas.fillRect(x, y, 10, 10);
      ctxOfMiddleCanvas.fill();

      // save coordinates
      const coordinatesOfCurrentFrame = [];
      const coordinatesX = [];
      const coordinatesY = [];
      global.console.log(coordinatesFromMainCanvasForFrameCanvas);
      if (coordinatesFromMainCanvasForFrameCanvas.has(numberOfCurrentFrame)) {
        const currentCoordinate = coordinatesFromMainCanvasForFrameCanvas.get(numberOfCurrentFrame);
        global.console.log(currentCoordinate);
        coordinatesX.push(...currentCoordinate[0].coordinatesX);
        coordinatesY.push(...currentCoordinate[0].coordinatesY);
        coordinatesX.push(x);
        coordinatesY.push(y);
        coordinatesOfCurrentFrame.push({
          coordinatesX,
          coordinatesY,
        });
      } else {
        coordinatesX.push(x);
        coordinatesY.push(y);
        coordinatesOfCurrentFrame.push({
          coordinatesX,
          coordinatesY,
        });
      }
      coordinatesFromMainCanvasForFrameCanvas.set(numberOfCurrentFrame, coordinatesOfCurrentFrame);
      global.console.log(coordinatesFromMainCanvasForFrameCanvas);
    }

    function saveDataUrls(event) {
      const childsOfUl = Array.from(
        event.path[2].children[1].children[0].children[0].children,
      );
      const arrayOfYellowBorder = [];
      childsOfUl.forEach((elem) => {
        if (elem.classList[1] === 'yellow-border') { arrayOfYellowBorder.push(elem); }
      });
      const picture = event.path[0].toDataURL('image/png');
      const numberOfCurrentFrame = Number(arrayOfYellowBorder[0].innerText);
      imagesForPreview.set(numberOfCurrentFrame, picture);
    }

    function changeCanvasOfPreviewAfterDrawing(event) {
      const childsOfUl = Array.from(
        event.path[2].children[1].children[0].children[0].children,
      );
      const arrayOfYellowBorder = [];
      childsOfUl.forEach((elem) => {
        if (elem.classList[1] === 'yellow-border') { arrayOfYellowBorder.push(+elem.innerText); }
      });
      document.getElementById('canvas-preview').innerHTML = '<img id="image-preview" width="101" height="100">';
      document
        .getElementById('image-preview')
        .setAttribute('src', imagesForPreview.get(arrayOfYellowBorder[0]));
    }

    function changeCanvasOfCurrentFrame() {
      const currentFrame = document.getElementsByClassName('yellow-border');
      const numberOfCurrentFrame = +currentFrame[0].innerText;
      const canvasOfCurrentFrame = currentFrame[0].children[4];
      const ctxOfCanvasOfCurrentFrame = canvasOfCurrentFrame.getContext('2d');
      const coordinates = coordinatesFromMainCanvasForFrameCanvas.get(numberOfCurrentFrame)[0];
      global.console.log(coordinates);
      const { coordinatesX } = coordinates;
      const { coordinatesY } = coordinates;

      for (let index = 0; index < coordinatesX.length; index += 1) {
        ctxOfCanvasOfCurrentFrame.fillStyle = chooseCurrentColorTop.value;
        ctxOfCanvasOfCurrentFrame
          .fillRect(coordinatesX[index] / 11, coordinatesY[index] / 13, 1, 1);
        ctxOfCanvasOfCurrentFrame.fill();
      }
    }

    canvasWhichStateOnMiddleOfPage.addEventListener('mousedown', () => {
      canvasWhichStateOnMiddleOfPage.addEventListener('mousemove', drawOnMiddleCanvas);
    });
    canvasWhichStateOnMiddleOfPage.addEventListener('mouseup', (event) => {
      canvasWhichStateOnMiddleOfPage.removeEventListener('mousedown', drawOnMiddleCanvas);
      canvasWhichStateOnMiddleOfPage.removeEventListener('mousemove', drawOnMiddleCanvas);
      saveDataUrls(event);
      changeCanvasOfPreviewAfterDrawing(event);
      changeCanvasOfCurrentFrame();
    });
  }

  drawCanvases();
}
