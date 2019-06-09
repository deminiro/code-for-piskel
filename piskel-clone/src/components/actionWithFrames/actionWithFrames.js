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
        event.path[3].removeChild(event.path[2]);
        updateNumbersOfFrames(event);
        // if was delete current frame(with yellow color)
        if (event.path[1].classList.contains('yellow-frame-items')) {
          const currentFrameAfterDelete = event.path[3].children[countOfFrames - 1];
          currentFrameAfterDelete.classList.remove('gray-border');
          currentFrameAfterDelete.classList.add('yellow-border');

          Array.from(currentFrameAfterDelete.children).forEach((element) => {
            if (element.classList.contains('gray-frame-items')) {
              element.classList.remove('gray-frame-items');
              element.classList.add('yellow-frame-items');
            }
          });
        }
      }
    }

    listOfFrames.addEventListener('click', deleteChosenFrame);
  }

  function chooseCurrentFrame() {
    function clickOnFrame(event) {
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

  function copyFrame() {
    function copy(event) {
      if (event.target.className === 'fas fa-copy') {
        countOfFrames += 1;
        arrayOflistFrames.push(countOfFrames);

        const frameElement = event.target.parentElement.parentElement;
        const frameElementClone = event.target.parentElement.parentElement.cloneNode(
          true,
        );
        frameElement.parentNode.insertBefore(
          frameElementClone,
          frameElement.nextSibling,
        );

        // change colors of frame
        frameElementClone.children[0].children[0].innerHTML = +frameElementClone
          .children[0].children[0].innerHTML + 1;
        if (frameElement.classList[1] === 'yellow-border') {
          changeColorOfFrameFromYellowToGrey();
        }

        Array.from(frameElementClone.children).forEach((element) => {
          if (element.classList.contains('gray-frame-items')) {
            element.classList.remove('gray-frame-items');
            element.classList.add('yellow-frame-items');
          }
        });

        const yellowItems = Array.from(document.getElementsByClassName('yellow-frame-items'));
        const checkHaveBorderParentElement = yellowItems[0].parentElement.classList.contains('yellow-border');
        if (!checkHaveBorderParentElement) {
          yellowItems.slice(0, 4).forEach((element) => {
            element.classList.remove('yellow-frame-items');
            element.classList.add('gray-frame-items');
          });
        }

        updateNumbersOfFrames(event);
      }
    }

    listOfFrames.addEventListener('click', copy);
  }

  function containFunctionsWhichUsedAbove() {
    addNewFrame();
    chooseCurrentFrame();
    deleteFrame();
    copyFrame();
  }

  containFunctionsWhichUsedAbove();
}
