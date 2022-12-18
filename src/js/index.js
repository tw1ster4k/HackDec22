const Game = require("./models/game");
const Player = require("./models/player");
const Enemy = require("./models/enemy");
const Bullet = require("./models/bullet");

const root = document.querySelector(".root");
const startLayer = document.querySelector(".start-layer");
const gameOverLayer = document.querySelector(".game-over");
const startBtn = document.querySelector("#start-btn");
const replayBtn = document.querySelector("#replay-btn");
const scoreCounter = document.querySelector("#score-counter");
const finalScore = document.querySelector("#final-score");

const step = 30;

let player = null;
let game = null;

const newGame = () => {
    player = new Player("Username", document.createElement("div"));
    game = new Game(root, Enemy, Bullet, player, gameOverCb, scoreCounter);
    game.start();
    startLayer.style.height = "0";
    root.insertAdjacentElement("afterbegin", player.element);
};

startBtn.addEventListener("click", (event) => {
    if (game) return;
    newGame();
});

replayBtn.addEventListener("click", (event) => {
    if (game) return;
    newGame();
    gameOverLayer.style.height = "0";
});

document.addEventListener("keydown", (event) => {
    if (game.isOver) return;
    switch (event.key) {
        case "ArrowUp":
            player.setPosition(0, -step);
            break;
        case "ArrowDown":
            player.setPosition(0, step);
            break;
        case "ArrowRight":
            player.setPosition(step, 0);
            break;
        case "ArrowLeft":
            player.setPosition(-step, 0);
            break;

        case " ":
            game.attack(player.position.x + 150, player.position.y + 100);
    }
});

const gameOverCb = () => {
    gameOverLayer.style.height = "100vh";
    finalScore.innerText = game.score;
    game = null;
    player = null;
    root.innerHTML = "";
    scoreCounter.innerText = "0";
};
