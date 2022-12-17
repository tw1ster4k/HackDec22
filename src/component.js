const player = document.querySelector('.player');
const fire = document.querySelector('.fire');
const root = document.querySelector('.root');
const enemy = document.querySelector('.enemy');

const playerHeight = player.clientHeight;
const playerWidth = player.clientWidth;

const windowHeight = document.documentElement.clientHeight;
const windowWidth = document.documentElement.clientWidth;

const maxHeight = windowHeight - playerHeight;
const fireHeight = fire.clientHeight;
const enemyHeight = enemy.clientHeight;

window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case ' ':
      const fireClone = fire.cloneNode(true);
      root.appendChild(fireClone);
      // player.offsetTop - количество пикселей от верха экрана до верхней границы игрока
      // playerHeight / 2 - середина высоты игрока
      // fireHeight / 2 - середина элемента огня
      const fireX = player.offsetTop + playerHeight / 2 - fireHeight / 2;
      const fireY = playerWidth;
      fireClone.style.visibility = 'visible';
      fireClone.style.top = fireX + 'px';
      fireClone.style.left = fireY + 'px';
      setInterval(() => {
        let goRight = fireClone.offsetLeft;
        if (goRight < windowWidth - 20) {
          goRight += 1;
          fireClone.style.left = goRight + 'px';
        } else {
          fireClone.remove();
        }
        const enemiesList = Array.from(document.querySelectorAll('.enemy'));
        console.log(enemiesList);
        const fireList = Array.from(document.querySelectorAll('.fire'));
        console.log(fireList);
      }, 10);
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

const getRandomHeight = (elHeight) => {
  return Math.floor(Math.random() * (windowHeight - elHeight - 50) - 50);
};
enemy.style.top = getRandomHeight(enemyHeight) + 'px';

setInterval(() => {
  const enemyClone = enemy.cloneNode(true);
  enemyClone.style.visibility = 'visible';
  enemyClone.style.top = getRandomHeight(enemyHeight) + 'px';
  root.appendChild(enemyClone);
  setInterval(() => {
    let goLeft = enemyClone.offsetLeft;
    if (enemyClone.offsetLeft > 0) {
      goLeft -= 1;
      enemyClone.style.left = goLeft + 'px';
    } else {
      enemyClone.remove();
    }
  }, 10);
}, 2000);
