export default function tools() {
  const divWithTools = document.getElementById('div-with-tools');

  function makeToolNoActive() {
    const activeTool = document.getElementsByClassName('active')[0];
    activeTool.classList.remove('active');
    activeTool.classList.add('no-active');
  }

  function makeToolActive(event) {
    if (event.target.classList.contains('no-active')) {
      event.target.classList.remove('no-active');
      event.target.classList.add('active');
    }

    if (event.target.classList.contains('fas') || event.target.classList.contains('fab')
        || event.target.classList.contains('far')) {
      event.path[1].classList.remove('no-active');
      event.path[1].classList.add('active');
    }
  }

  divWithTools.addEventListener('click', (event) => {
    makeToolNoActive();
    makeToolActive(event);
  });
}
