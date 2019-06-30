export default function undoFunction() {
  const canvasWhichStateOnMiddlePage = document.getElementById('main-div--canvas');
  const ctxOfMiddleCanvas = canvasWhichStateOnMiddlePage.getContext('2d');
  const listOfFrames = document.getElementById('list-of-frames');
  const deleteButton = 46;
  const pressDublicateButton = 221;
  const buttonZ = 90;
  let storageOfPreviousImages = new Map();

  function saveImages() {
    let saveSyncImage = [];
    const picture = canvasWhichStateOnMiddlePage.toDataURL('image/png');
    const numberOfCurrentFrame = +document.getElementsByClassName('yellow-frame-items')[0].innerText;
    if (!storageOfPreviousImages.has(numberOfCurrentFrame)) {
      saveSyncImage.push(picture);
      storageOfPreviousImages.set(numberOfCurrentFrame, JSON.stringify(saveSyncImage));
    } else {
      saveSyncImage = JSON.parse(storageOfPreviousImages.get(numberOfCurrentFrame));
      saveSyncImage.push(picture);
      storageOfPreviousImages.set(numberOfCurrentFrame, JSON.stringify(saveSyncImage));
    }
  }

  function backPreviosImage(event) {
    if ((event.keyCode === buttonZ) && event.ctrlKey) {
      event.preventDefault();
      const numberOfCurrentFrame = +document.getElementsByClassName('yellow-frame-items')[0].innerText;
      const pictureArray = JSON.parse(storageOfPreviousImages.get(numberOfCurrentFrame));
      const { length } = pictureArray;
      const image = new Image();
      image.src = pictureArray[length - 1];
      ctxOfMiddleCanvas.clearRect(0, 0, canvasWhichStateOnMiddlePage.width,
        canvasWhichStateOnMiddlePage.height);
      ctxOfMiddleCanvas.drawImage(image, 0, 0);
      pictureArray.pop();
      storageOfPreviousImages.set(numberOfCurrentFrame, JSON.stringify(pictureArray));
    }
  }

  canvasWhichStateOnMiddlePage.addEventListener('mousedown', saveImages);
  document.addEventListener('keyup', backPreviosImage);

  function changeStorageMapAfterDeleteFrame(event) {
    event.stopPropagation();
    let numberOfDeleteFrame;
    if (event.keyCode === deleteButton) {
      numberOfDeleteFrame = +document.getElementsByClassName('yellow-frame-items')[0].innerText + 1;
    } else {
      numberOfDeleteFrame = +event.path[2].innerText;
    }
    storageOfPreviousImages.delete(numberOfDeleteFrame);
    let numberWhichChangeNumberOfFrame = numberOfDeleteFrame;
    for (let key = numberOfDeleteFrame; key <= listOfFrames.children.length; key += 1) {
      if (storageOfPreviousImages.has(key + 1)) {
        const value = storageOfPreviousImages.get(key + 1);
        storageOfPreviousImages.delete(key + 1);
        storageOfPreviousImages.set(numberWhichChangeNumberOfFrame, value);
        numberWhichChangeNumberOfFrame += 1;
      }
    }
    storageOfPreviousImages = new Map([...storageOfPreviousImages.entries()].sort());
  }

  function activate(event) {
    if (event.target.classList.contains('fa-trash-alt') || event.keyCode === deleteButton) {
      changeStorageMapAfterDeleteFrame(event);
    }
  }

  listOfFrames.addEventListener('click', activate);

  function changeKeysAfterDublicateFrame(event) {
    const amountOfFrames = listOfFrames.children.length;
    let frameOnWhichClickDublicate = event.path[2];
    let numberOfDublicateFrame = +frameOnWhichClickDublicate
      .children[0].children[0].innerText + 1;
    if (event.keyCode === pressDublicateButton) {
      numberOfDublicateFrame = +document.getElementsByClassName('yellow-frame-items')[0].innerText;
      frameOnWhichClickDublicate = listOfFrames.children[numberOfDublicateFrame - 2];
    }
    for (let key = amountOfFrames; key >= numberOfDublicateFrame; key -= 1) {
      if (storageOfPreviousImages.has(key)) {
        const value = storageOfPreviousImages.get(key);
        storageOfPreviousImages.delete(key);
        storageOfPreviousImages.set(key + 1, value);
      }
    }
    storageOfPreviousImages
      .set(numberOfDublicateFrame, storageOfPreviousImages.get(numberOfDublicateFrame - 1));
    storageOfPreviousImages = new Map([...storageOfPreviousImages.entries()].sort());
  }

  function afterDublicate(event) {
    if (event.target.className === 'fas fa-copy'
    || event.keyCode === pressDublicateButton) changeKeysAfterDublicateFrame(event);
  }

  listOfFrames.addEventListener('click', afterDublicate);
  document.addEventListener('keyup', afterDublicate);
}
