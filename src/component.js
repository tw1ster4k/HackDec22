const player = document.querySelector('.player');

window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp':
      const goUp = player.offsetTop;
      player.style.top = goUp - 5 + 'px';
      break;
    case 'ArrowDown':
      const goDown = player.offsetTop;
      player.style.top = goDown + 5 + 'px';
      break;
    default:
      break;
  }
});
