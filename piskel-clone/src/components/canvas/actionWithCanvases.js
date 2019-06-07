export default function actionWithCanvases() {
  const canvasWhichStateOnMiddleOfPage = document.getElementById('main-div--canvas');
  const listOfFrames = document.getElementById('list-of-frames');
  const ctxOfMiddleCanvas = canvasWhichStateOnMiddleOfPage.getContext('2d');
  const chooseCurrentColorTop = document.getElementById('tools-choose-color--top');
  // const buttonAddFrame = document.getElementById('button-add-new-frame');
  const imagesForPreviewAndFrames = new Map();


  function drawOnMiddleCanvas(event) {
    ctxOfMiddleCanvas.fillStyle = chooseCurrentColorTop.value;
    const x = event.offsetX - 5;
    const y = event.offsetY - 5;
    ctxOfMiddleCanvas.fillRect(x, y, 10, 10);
    ctxOfMiddleCanvas.fill();
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
    imagesForPreviewAndFrames.set(numberOfCurrentFrame, picture);
  }

  function changeCanvasOfPreviewAfterDrawing(event) {
    const childsOfUl = Array.from(
      event.path[2].children[1].children[0].children[0].children,
    );
    const arrayOfYellowBorder = [];
    childsOfUl.forEach((elem) => {
      if (elem.classList[1] === 'yellow-border') arrayOfYellowBorder.push(+elem.innerText);
    });
    document.getElementById('canvas-preview').innerHTML = '<img id="image-preview" width="101" height="100">';
    document
      .getElementById('image-preview')
      .setAttribute('src', imagesForPreviewAndFrames.get(arrayOfYellowBorder[0]));
    const currentFrame = childsOfUl[arrayOfYellowBorder[0] - 1].children[4];
    global.console.log(childsOfUl[arrayOfYellowBorder[0] - 1]);
    currentFrame.innerHTML = '<img class="image-frame" width="50" height="46">';
    currentFrame
      .children[0]
      .setAttribute('src', imagesForPreviewAndFrames.get(arrayOfYellowBorder[0]));
  }

  function changeColorsToCurrentFrame() {
    const currentFrame = document.getElementsByClassName('yellow-border');
    const numberOfCurrentFrame = +currentFrame[0].innerText;
    const canvasOfCurrentFrame = currentFrame[0].children[4];
    global.console.log(canvasOfCurrentFrame, numberOfCurrentFrame);
  }

  function changeKeysAfterDeleteFrame(event) {
    if (event.target.className === 'fas fa-trash-alt') {
      const numberOfDeleteFrame = +event.path[2].children[0].children[0].innerText;
      // const sizeOfMap = +imagesForPreviewAndFrames.size;
      const listFrames = document.getElementById('list-of-frames');
      global.console.log(listFrames.children.length);
      imagesForPreviewAndFrames.delete(numberOfDeleteFrame);
      for (let key = numberOfDeleteFrame; key < listFrames.children.length; key += 1) {
        if (imagesForPreviewAndFrames.has(key + 1)) {
          const numberOfFrame = +listFrames.children[key - 1].children[0].children[0].innerText;
          const value = imagesForPreviewAndFrames.get(key + 1);
          imagesForPreviewAndFrames.delete(key + 1);
          imagesForPreviewAndFrames.set(numberOfFrame, value);
        }
      }
      global.console.log(imagesForPreviewAndFrames);
    }
  }

  function useEventListeners() {
    canvasWhichStateOnMiddleOfPage.addEventListener('mousedown', () => {
      canvasWhichStateOnMiddleOfPage.addEventListener('mousemove', drawOnMiddleCanvas);
    });

    canvasWhichStateOnMiddleOfPage.addEventListener('mouseup', (event) => {
      canvasWhichStateOnMiddleOfPage.removeEventListener('mousedown', drawOnMiddleCanvas);
      canvasWhichStateOnMiddleOfPage.removeEventListener('mousemove', drawOnMiddleCanvas);
      saveDataUrls(event);
      changeCanvasOfPreviewAfterDrawing(event);
    });

    listOfFrames.addEventListener('click', (event) => {
      changeColorsToCurrentFrame();
      changeKeysAfterDeleteFrame(event);
    });
  }

  useEventListeners();
}
