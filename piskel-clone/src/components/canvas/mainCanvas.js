export default function canvas() {
  const canvasWhichStateOnMiddleOfPage = document.getElementById('main-div--canvas');
  const ctxOfMiddleCanvas = canvasWhichStateOnMiddleOfPage.getContext('2d');
  const chooseCurrentColorTop = document.getElementById('tools-choose-color--top');
  global.console.log(canvasWhichStateOnMiddleOfPage);

  function drawOnMiddleCanvas(event) {
    ctxOfMiddleCanvas.fillStyle = chooseCurrentColorTop.value;
    ctxOfMiddleCanvas.fillRect(event.offsetX - 5, event.offsetY - 5, 10, 10);
    ctxOfMiddleCanvas.fill();
  }

  canvasWhichStateOnMiddleOfPage.addEventListener('mousedown', () => {
    canvasWhichStateOnMiddleOfPage.addEventListener('mousemove', drawOnMiddleCanvas);
  });
  canvasWhichStateOnMiddleOfPage.addEventListener('mouseup', () => {
    canvasWhichStateOnMiddleOfPage.removeEventListener('mousedown', drawOnMiddleCanvas);
    canvasWhichStateOnMiddleOfPage.removeEventListener('mousemove', drawOnMiddleCanvas);
  });
}
