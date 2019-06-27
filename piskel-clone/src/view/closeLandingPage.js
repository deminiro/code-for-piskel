export default function startDrawFunction() {
  const createSprite = document.getElementById('create-sprite');
  const landingPage = document.getElementById('landing-page');
  const piskel = document.getElementById('piskel');

  function closeLandingPageOpenPiskel(event) {
    event.preventDefault();
    landingPage.classList.add('display-none');
    piskel.removeAttribute('style');
  }

  createSprite.addEventListener('click', closeLandingPageOpenPiskel);
}
