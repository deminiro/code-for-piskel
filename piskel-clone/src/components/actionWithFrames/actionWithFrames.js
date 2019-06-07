export default function actionWithFrames() {
  const listOfFrames = document.getElementById('list-of-frames');
  const buttonAddFrame = document.getElementById('button-add-new-frame');
  const canvasWhichStateOnMiddleOfPage = document.getElementById('main-div--canvas');
  const ctxOfMiddleCanvas = canvasWhichStateOnMiddleOfPage.getContext('2d');
  let countOfFrames = 1;
  const arrayOflistFrames = [1];

  function changeColorOfFrameFromYellowToGrey() {
    const previosframeBeforeClick = document.getElementsByClassName('yellow-border')[0];
    const previosFrameElementsBeforeClick = Array.from(document
      .getElementsByClassName('yellow-frame-items'));

    previosframeBeforeClick.classList.remove('yellow-border');
    previosframeBeforeClick.classList.add('gray-border');
    previosFrameElementsBeforeClick.forEach((element) => {
      element.classList.remove('yellow-frame-items');
      element.classList.add('gray-frame-items');
    });
  }

  function addNewFrame() {
    const newLi = listOfFrames.innerHTML;
    function addFrame() {
      global.console.log(newLi);
      changeColorOfFrameFromYellowToGrey();
      listOfFrames.innerHTML += newLi;
      ctxOfMiddleCanvas.clearRect(0, 0, 640, 608);
      // change number of frame
      countOfFrames += 1;
      arrayOflistFrames.push(countOfFrames);
      const numberOfFrame = document.getElementsByClassName('number-of-frame');
      numberOfFrame[numberOfFrame.length - 1].innerText = countOfFrames;
    }

    buttonAddFrame.addEventListener('click', addFrame);
  }

  function updateNumbersOfFrames(event) {
    const childrensOfUl = Array.from(event.path[3].children);
    for (let i = 0; i < childrensOfUl.length; i += 1) {
      childrensOfUl[i].children[0].children[0].innerHTML = i + 1;
    }
  }

  function deleteFrame() {
    function deleteChosenFrame(event) {
      if (event.target.className === 'fas fa-trash-alt') {
        countOfFrames -= 1;
        arrayOflistFrames.pop();
        global.console.log(arrayOflistFrames);
        event.path[3].removeChild(event.path[2]);
        updateNumbersOfFrames(event);
      }
    }

    listOfFrames.addEventListener('click', deleteChosenFrame);
  }

  function chooseCurrentFrame() {
    function clickOnFrame(event) {
      global.console.log(event);
      if (event.path[0].className === 'canvas-frame' || event.target.className === 'image-frame') {
        changeColorOfFrameFromYellowToGrey();
        let currentLi;
        // change gray to yellow color to current frame
        // eslint-disable-next-line prefer-destructuring
        if (event.path[0].className === 'canvas-frame') { currentLi = event.path[1]; }
        // eslint-disable-next-line prefer-destructuring
        if (event.target.className === 'image-frame') { currentLi = event.path[2]; }
        const elementsOfCurrentLi = Array.from(currentLi.children);

        currentLi.classList.remove('gray-border');
        currentLi.classList.add('yellow-border');
        elementsOfCurrentLi.forEach((element) => {
          if (element.classList[2] === 'gray-frame-items') {
            element.classList.remove('gray-frame-items');
            element.classList.add('yellow-frame-items');
          }
        });
      }
    }

    listOfFrames.addEventListener('click', clickOnFrame);
  }

  function containFunctionsWhichUsedAbove() {
    addNewFrame();
    chooseCurrentFrame();
    deleteFrame();
  }

  containFunctionsWhichUsedAbove();
}
