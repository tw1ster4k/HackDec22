const player = document.querySelector('.player');
const fire = document.querySelector('.fire');
const root = document.querySelector('.root');

const playerHeight = player.clientHeight;
const playerWidth = player.clientWidth;
const fireHeight = fire.clientHeight;
const windowHeight = document.documentElement.clientHeight;
const windowWidth = document.documentElement.clientWidth;
const maxHeight = windowHeight - playerHeight;

window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case ' ':
      const fireClone = fire.cloneNode(true);
      // player.offsetTop - количество пикселей от верха экрана до верхней границы игрока
      // playerHeight / 2 - середина высоты игрока
      // fireHeight / 2 - середина элемента огня
      console.log(fireClone);
      console.log(player.offsetTop);
      const fireX = player.offsetTop + playerHeight / 2;
      // const x = player.offsetTop + playerHeight / 2 - fireHeight / 2;
      // const y = playerWidth;
      // fire.style.visibility = 'visible';
      // fire.style.top = x + 'px';
      // fire.style.left = y + 'px';
      // setInterval(() => {
      //   let plusLeft = fire.offsetLeft;
      //   if (plusLeft < windowWidth - 20) {
      //     plusLeft += 1;
      //     fire.style.left = plusLeft + 'px';
      //   } else {
      //     fire.style.display = 'none';
      //   }
      // }, 1);
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
