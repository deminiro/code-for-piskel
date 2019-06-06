export default function canvas() {
  const canvasWhichStateOnMiddleOfPage = document.getElementById('main-div--canvas');
  const ctxOfMiddleCanvas = canvasWhichStateOnMiddleOfPage.getContext('2d');
  global.console.log(canvasWhichStateOnMiddleOfPage);

  function drawOnMiddleCanvas(event) {
    ctxOfMiddleCanvas.fillRect(event.offsetX - 5, event.offsetY - 5, 10, 10);
    global.console.log(`x: ${event.offsetX}, y: ${event.offsetY}, event: ${event} `);
    global.console.log(event);
  }

  canvasWhichStateOnMiddleOfPage.addEventListener('mousedown', () => {
    canvasWhichStateOnMiddleOfPage.addEventListener('mousemove', drawOnMiddleCanvas);
  });
  canvasWhichStateOnMiddleOfPage.addEventListener('mouseup', () => {
    canvasWhichStateOnMiddleOfPage.removeEventListener('mousedown', drawOnMiddleCanvas);
    canvasWhichStateOnMiddleOfPage.removeEventListener('mousemove', drawOnMiddleCanvas);
  });
}
