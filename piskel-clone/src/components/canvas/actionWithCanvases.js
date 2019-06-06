export default function actionWithCanvases() {
  const canvasWhichStateOnMiddleOfPage = document.getElementById('main-div--canvas');
  const ctxOfMiddleCanvas = canvasWhichStateOnMiddleOfPage.getContext('2d');
  const chooseCurrentColorTop = document.getElementById('tools-choose-color--top');
  const imagesForPreview = new Map();

  function drawCanvases() {
    function drawOnMiddleCanvas(event) {
      ctxOfMiddleCanvas.fillStyle = chooseCurrentColorTop.value;
      ctxOfMiddleCanvas.fillRect(event.offsetX - 5, event.offsetY - 5, 10, 10);
      ctxOfMiddleCanvas.fill();
    }

    function saveDataUrls(event) {
      global.console.log(event);
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
      global.console.log(imagesForPreview);
    }

    function changeCanvasOfPreviewAfterDrawing(event) {
      global.console.log(event);
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

    canvasWhichStateOnMiddleOfPage.addEventListener('mousedown', () => {
      canvasWhichStateOnMiddleOfPage.addEventListener('mousemove', drawOnMiddleCanvas);
    });
    canvasWhichStateOnMiddleOfPage.addEventListener('mouseup', (event) => {
      canvasWhichStateOnMiddleOfPage.removeEventListener('mousedown', drawOnMiddleCanvas);
      canvasWhichStateOnMiddleOfPage.removeEventListener('mousemove', drawOnMiddleCanvas);
      saveDataUrls(event);
      changeCanvasOfPreviewAfterDrawing(event);
    });
  }

  drawCanvases();
}
