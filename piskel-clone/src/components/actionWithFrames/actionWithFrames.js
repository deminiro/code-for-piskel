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

  function deleteFrame() {

  }

  function containFunctionsWhichUsedAbove() {
    addNewFrame();
    deleteFrame();
  }

  containFunctionsWhichUsedAbove();
}
