export default function startDrawFunction() {
  const createSprite = document.getElementById('create-sprite');
  const landingPage = document.getElementById('landing-page');
  const piskel = document.getElementById('piskel');
  const body = document.getElementsByClassName('body')[0];

  function closeLandingPageOpenPiskel(event) {
    event.preventDefault();
    body.removeAttribute('style');
    landingPage.classList.add('display-none');
    piskel.removeAttribute('style');
  }

  createSprite.addEventListener('click', closeLandingPageOpenPiskel);
}
