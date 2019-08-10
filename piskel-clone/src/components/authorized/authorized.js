export default function autorizedFunction() {
  const buttonSignIn = document.getElementById('sign-in');
  function authorizeVk(event) {
    event.preventDefault();
    const url = 'http://oauth.vk.com/authorize?client_id=7031875&redirect_uri=deminiro.github.io/piskel//vklogin&response_type=code';
    const xhr = new Request(url);
    const req = fetch(xhr);
    global.console.log(req);
  }
  buttonSignIn.addEventListener('click', authorizeVk);
}
