export default function actionWithCanvases() {
  const canvasWhichStateOnMiddleOfPage = document.getElementById('main-div--canvas');
  const listOfFrames = document.getElementById('list-of-frames');
  const ctxOfMiddleCanvas = canvasWhichStateOnMiddleOfPage.getContext('2d');
  const chooseCurrentColorTop = document.getElementById('tools-choose-color--top');
  // const buttonAddFrame = document.getElementById('button-add-new-frame');
  let imagesForPreviewAndFrames = new Map();
  const coordinateForMainCanvas = new Map();


  function drawOnMiddleCanvas(event) {
    // const arrayWhichSaveCoordinates = [];
    const currentColor = chooseCurrentColorTop.value;
    // const numberOfCurrentFrame = +document
    //   .getElementsByClassName('yellow-frame-items')[0].children[0].innerText;
    const x = event.offsetX - 5;
    const y = event.offsetY - 5;
    ctxOfMiddleCanvas.fillStyle = currentColor;
    ctxOfMiddleCanvas.fillRect(x, y, 10, 10);
    ctxOfMiddleCanvas.fill();
    // eslint-disable-next-line no-restricted-syntax
    // for (const key of coordinateForMainCanvas.keys()) {
    //   if (key
    // .numberOfCurrentFrame === numberOfCurrentFrame && key.currentColor === currentColor) {
    //     arrayWhichSaveCoordinates.push(coordinateForMainCanvas.get(key));
    //   }
    // }
    // arrayWhichSaveCoordinates.push(x, y);

    // coordinateForMainCanvas
    // .set({ numberOfCurrentFrame, currentColor }, arrayWhichSaveCoordinates);
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
    currentFrame.innerHTML = '<img class="image-frame" width="50" height="46">';
    currentFrame
      .children[0]
      .setAttribute('src', imagesForPreviewAndFrames.get(arrayOfYellowBorder[0]));
  }

  function changeMainCanvasAfterSwitchCurrentFrame(event) {
    // const currentFrame = document.getElementsByClassName('yellow-border');
    // const numberOfCurrentFrame = +currentFrame[0].innerText;
    // const canvasOfCurrentFrame = currentFrame[0].children[4];
    setTimeout(() => {
      if (event.target.className === 'canvas-frame' || event.target.className === 'image-frame') {
        const numberOfCurrentFrame = +document.getElementsByClassName('yellow-frame-items')[0]
          .children[0].innerText;
        const imageOfCurrentFrame = imagesForPreviewAndFrames.get(numberOfCurrentFrame);
        const image = new Image();
        image.src = imageOfCurrentFrame;
        ctxOfMiddleCanvas.clearRect(0, 0, 640, 608);
        ctxOfMiddleCanvas.drawImage(image, 0, 0);
      }
    }, 10);
  }

  function changeKeysAfterDeleteFrame(event) {
    if (event.target.className === 'fas fa-trash-alt') {
      const numberOfDeleteFrame = +event.path[2].children[0].children[0].innerText;
      const listFrames = document.getElementById('list-of-frames');
      imagesForPreviewAndFrames.delete(numberOfDeleteFrame);
      for (let key = numberOfDeleteFrame; key < listFrames.children.length; key += 1) {
        if (imagesForPreviewAndFrames.has(key + 1)) {
          const numberOfFrame = +listFrames.children[key - 1].children[0].children[0].innerText;
          const value = imagesForPreviewAndFrames.get(key + 1);
          imagesForPreviewAndFrames.delete(key + 1);
          imagesForPreviewAndFrames.set(numberOfFrame, value);
        }
      }
      imagesForPreviewAndFrames = new Map([...imagesForPreviewAndFrames.entries()].sort());
    }
  }

  function changeKeysAfterDublicateFrame(event) {
    if (event.target.className === 'fas fa-copy') {
      const frameOnWhichClickDublicate = event.path[2];
      const numberOfDublicateFrame = +frameOnWhichClickDublicate
        .children[0].children[0].innerText + 1;
      for (let key = imagesForPreviewAndFrames.size; key >= numberOfDublicateFrame; key -= 1) {
        if (imagesForPreviewAndFrames.has(key)) {
          const value = imagesForPreviewAndFrames.get(key);
          imagesForPreviewAndFrames.delete(key);
          imagesForPreviewAndFrames.set(key + 1, value);
        }
      }
      imagesForPreviewAndFrames
        .set(numberOfDublicateFrame, imagesForPreviewAndFrames.get(numberOfDublicateFrame - 1));

      imagesForPreviewAndFrames = new Map([...imagesForPreviewAndFrames.entries()].sort());
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
      changeMainCanvasAfterSwitchCurrentFrame(event);
      changeKeysAfterDeleteFrame(event);
      changeKeysAfterDublicateFrame(event);
      global.console.log(coordinateForMainCanvas);
    });
  }

  useEventListeners();
}
