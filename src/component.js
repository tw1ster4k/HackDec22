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

var EnemTop;
var FireTop;
var EnemLeft;
var FireLeft;

const getRandomHeight = (elHeight) => {
  return Math.floor(Math.random() * (windowHeight - elHeight - 50) + 50);
};

window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case ' ':
      // eslint-disable-next-line no-case-declarations
      const fireClone = fire.cloneNode(true);
      // eslint-disable-next-line no-case-declarations
      const fireX = player.offsetTop + playerHeight / 2 - fireHeight / 2;
      // eslint-disable-next-line no-case-declarations
      const fireY = playerWidth;
      root.appendChild(fireClone);

      // player.offsetTop - количество пикселей от верха экрана до верхней границы игрока
      // playerHeight / 2 - середина высоты игрока
      // fireHeight / 2 - середина элемента огня
      fireClone.style.visibility = 'visible';
      fireClone.style.top = fireX + 'px';
      fireClone.style.left = fireY + 'px';
      setInterval(() => {
        let goRight = fireClone.offsetLeft;
        if (goRight < windowWidth - 20) {
          goRight += 20;
          fireClone.style.left = goRight + 'px';
          FireLeft = fireClone.offsetLeft;
          FireTop = fireClone.offsetTop;
        } else {
          fireClone.remove();
        }
        if (
          FireLeft + fireHeight >= EnemLeft - 10 &&
          FireLeft <= EnemLeft + enemyHeight + 10 &&
          FireTop + fireHeight >= EnemTop - 10 &&
          FireTop <= EnemTop + enemyHeight + 10
        ) {
          fireClone.remove();
        }
      }, 100);
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

setInterval(() => {
  const enemyClone = enemy.cloneNode(true);
  enemyClone.style.visibility = 'visible';
  enemyClone.style.top = getRandomHeight(enemyHeight) + 'px';
  console.log(enemyClone.style.top);
  root.appendChild(enemyClone);

  setInterval(() => {
    let goLeft = enemyClone.offsetLeft;
    if (enemyClone.offsetLeft > 0) {
      goLeft -= 1;
      enemyClone.style.left = goLeft + 'px';
      EnemLeft = enemyClone.offsetLeft;
      EnemTop = enemyClone.offsetTop;
    } else {
      enemyClone.remove();
    }
    if (
      FireLeft + fireHeight >= EnemLeft - 10 &&
      FireLeft <= EnemLeft + enemyHeight + 10 &&
      FireTop + fireHeight >= EnemTop - 10 &&
      FireTop <= EnemTop + enemyHeight + 10
    ) {
      enemyClone.remove();
      console.log('Попал!');
    }
  }, 1);
}, 2000);
