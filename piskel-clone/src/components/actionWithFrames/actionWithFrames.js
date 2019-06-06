export default function actionWithFrames() {
  const listOfFrames = document.getElementById('list-of-frames');
  const buttonAddFrame = document.getElementById('button-add-new-frame');
  let countOfFrames = 1;
  const arrayOflistFrames = [1];

  function addNewFrame() {
    const newLi = listOfFrames.innerHTML;
    function addFrame() {
      const indexOfYellowBorder = newLi.indexOf('yellow-border');
      const newLiAsArray = newLi.split('');
      newLiAsArray.splice(indexOfYellowBorder, 6, 'gray');
      let changedNewLi = newLiAsArray.join('');
      global.console.log(newLi);

      for (let i = 0; i < 4; i += 1) {
        const indexOfYellowElement = changedNewLi.indexOf('yellow');
        const changedNewLiAsArray = changedNewLi.split('');
        changedNewLiAsArray.splice(indexOfYellowElement, 6, 'gray');
        changedNewLi = changedNewLiAsArray.join('');
      }

      listOfFrames.innerHTML += changedNewLi;
      // change number of frame
      countOfFrames += 1;
      arrayOflistFrames.push(countOfFrames);
      const numberOfFrame = document.getElementsByClassName('number-of-frame');
      numberOfFrame[numberOfFrame.length - 1].innerText = countOfFrames;
    }

    buttonAddFrame.addEventListener('click', addFrame);
  }

  function chooseCurrentFrame() {
    function clickOnFrame(event) {
      if (event.path[0].nodeName === 'CANVAS') {
      // change yellow to gray color to previos frame
        const previosframeBeforeClick = document.getElementsByClassName('yellow-border')[0];
        const previosFrameElementsBeforeClick = Array.from(document
          .getElementsByClassName('yellow-frame-items'));

        previosframeBeforeClick.classList.remove('yellow-border');
        previosframeBeforeClick.classList.add('gray-border');
        previosFrameElementsBeforeClick.forEach((element) => {
          element.classList.remove('yellow-frame-items');
          element.classList.add('gray-frame-items');
        });

        // change gray to yellow color to current frame
        const currentLi = event.path[1];
        const elementsOfCurrentLi = Array.from(currentLi.children);

        currentLi.classList.remove('gray-border');
        currentLi.classList.add('yellow-border');
        elementsOfCurrentLi.forEach((element) => {
          console.log(element);
          if (element.classList[2] === 'gray-frame-items') {
            element.classList.remove('gray-frame-items');
            element.classList.add('yellow-frame-items');
          }
        });
        global.console.log(event);
      }
    }

    listOfFrames.addEventListener('click', clickOnFrame);
  }

  function containFunctionsWhichUsedAbove() {
    addNewFrame();
    chooseCurrentFrame();
  }

  containFunctionsWhichUsedAbove();
}
