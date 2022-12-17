const player = document.querySelector('.player');
const fire = document.querySelector('.fire');

const playerHeight = player.clientHeight;
const playerWidth = player.clientWidth;
const fireHeight = fire.clientHeight;
const windowHeight = document.documentElement.clientHeight;
const maxHeight = windowHeight - playerHeight;

window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case ' ':
      const x = player.offsetTop + playerHeight / 2 - fireHeight / 2;
      const y = playerWidth;
      fire.style.visibility = 'visible';
      fire.style.top = x + 'px';
      fire.style.left = y + 'px';
      break;
    case 'ArrowUp':
      if (player.offsetTop >= 0) {
        const goUp = player.offsetTop;
        player.style.top = goUp - 5 + 'px';
      }
      break;
    case 'ArrowDown':
      if (player.offsetTop < maxHeight - 5) {
        const goDown = player.offsetTop;
        player.style.top = goDown + 5 + 'px';
      }
      break;
    default:
      break;
  }
});
