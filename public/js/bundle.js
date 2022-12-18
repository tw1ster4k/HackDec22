/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const Game = __webpack_require__(/*! ./models/game */ \"./src/js/models/game.js\");\r\nconst Player = __webpack_require__(/*! ./models/player */ \"./src/js/models/player.js\");\r\nconst Enemy = __webpack_require__(/*! ./models/enemy */ \"./src/js/models/enemy.js\");\r\nconst Bullet = __webpack_require__(/*! ./models/bullet */ \"./src/js/models/bullet.js\");\r\n\r\nconst root = document.querySelector(\".root\");\r\nconst startLayer = document.querySelector(\".start-layer\");\r\nconst gameOverLayer = document.querySelector(\".game-over\");\r\nconst startBtn = document.querySelector(\"#start-btn\");\r\nconst replayBtn = document.querySelector(\"#replay-btn\");\r\n\r\nconst step = 30;\r\n\r\nlet player = null;\r\nlet game = null;\r\n\r\nconst newGame = () => {\r\n    player = new Player(\"Username\", document.createElement(\"div\"));\r\n    game = new Game(root, Enemy, Bullet, player, gameOverCb);\r\n    game.start();\r\n    startLayer.style.height = \"0\";\r\n    root.insertAdjacentElement(\"afterbegin\", player.element);\r\n};\r\n\r\nstartBtn.addEventListener(\"click\", (event) => {\r\n    if (game) return;\r\n    newGame();\r\n});\r\n\r\nreplayBtn.addEventListener(\"click\", (event) => {\r\n    if (game) return;\r\n    newGame();\r\n    gameOverLayer.style.height = \"0\";\r\n});\r\n\r\ndocument.addEventListener(\"keydown\", (event) => {\r\n    if (game.isOver) return;\r\n    switch (event.key) {\r\n        case \"ArrowUp\":\r\n            player.setPosition(0, -step);\r\n            break;\r\n        case \"ArrowDown\":\r\n            player.setPosition(0, step);\r\n            break;\r\n        case \"ArrowRight\":\r\n            player.setPosition(step, 0);\r\n            break;\r\n        case \"ArrowLeft\":\r\n            player.setPosition(-step, 0);\r\n            break;\r\n\r\n        case \" \":\r\n            game.attack(player.position.x + 150, player.position.y + 100);\r\n    }\r\n});\r\n\r\nconst gameOverCb = () => {\r\n    gameOverLayer.style.height = \"100vh\";\r\n    game = null;\r\n    player = null;\r\n    root.innerHTML = \"\";\r\n};\r\n\n\n//# sourceURL=webpack://hackdec22/./src/js/index.js?");

/***/ }),

/***/ "./src/js/models/bullet.js":
/*!*********************************!*\
  !*** ./src/js/models/bullet.js ***!
  \*********************************/
/***/ ((module) => {

eval("module.exports = class Bullet {\r\n    position = {\r\n        x: 0,\r\n        y: 0,\r\n    };\r\n    element = null;\r\n\r\n    constructor(position, element) {\r\n        this.element = element;\r\n\r\n        this.position = position;\r\n\r\n        this.element.className = \"bullet\";\r\n        this.element.style.left = this.position.x + \"px\";\r\n        this.element.style.top = this.position.y + \"px\";\r\n    }\r\n\r\n    move() {\r\n        if (this.position.x > screen.width) this.element.remove();\r\n        this.position.x += 50;\r\n        this.element.style.left = this.position.x + \"px\";\r\n    }\r\n\r\n    clear() {\r\n        this.element.remove();\r\n    }\r\n};\r\n\n\n//# sourceURL=webpack://hackdec22/./src/js/models/bullet.js?");

/***/ }),

/***/ "./src/js/models/enemy.js":
/*!********************************!*\
  !*** ./src/js/models/enemy.js ***!
  \********************************/
/***/ ((module) => {

eval("module.exports = class Enemy {\r\n    type = 1;\r\n    width = 50;\r\n    height = 50;\r\n    element = null;\r\n    speed = 20;\r\n    position = {\r\n        x: 0,\r\n        y: 0,\r\n    };\r\n\r\n    constructor(type, position, element, speed = 20, width = 50, height = 50) {\r\n        this.type = type;\r\n        this.position = position;\r\n        this.element = element;\r\n        this.height = height;\r\n        this.width = width;\r\n        this.speed = speed;\r\n    }\r\n\r\n    kill() {\r\n        this.element.remove();\r\n    }\r\n\r\n    move() {\r\n        this.position.x -= this.speed;\r\n        this.element.style.left = this.position.x + \"px\";\r\n    }\r\n};\r\n\n\n//# sourceURL=webpack://hackdec22/./src/js/models/enemy.js?");

/***/ }),

/***/ "./src/js/models/game.js":
/*!*******************************!*\
  !*** ./src/js/models/game.js ***!
  \*******************************/
/***/ ((module) => {

eval("const startGameMusic = new Audio(\"./img/theme.mp3\");\r\n\r\nmodule.exports = class Game {\r\n    player = null;\r\n    rootDiv = null;\r\n    enemies = [];\r\n    isOver = false;\r\n    bullets = [];\r\n    EnemyModel = null;\r\n    BulletModel = null;\r\n    isStarted = false;\r\n    gameOverCb = null;\r\n\r\n    constructor(rootDiv, EnemyModel, BulletModel, player, gameOverCb) {\r\n        this.player = player;\r\n        this.rootDiv = rootDiv;\r\n        this.EnemyModel = EnemyModel;\r\n        this.BulletModel = BulletModel;\r\n        this.gameOverCb = gameOverCb;\r\n    }\r\n\r\n    start() {\r\n        startGameMusic.play();\r\n        const gameInterval = setInterval(() => {\r\n            this.isOver && clearInterval(gameInterval);\r\n\r\n            this.bullets.forEach((el) => {\r\n                el.move();\r\n                el.position.x > screen.width && el.clear();\r\n            });\r\n            this.enemies.forEach((el) => {\r\n                el.move();\r\n                el.position.x <= 0 && el.kill();\r\n            });\r\n\r\n            this.bullets = this.bullets.filter(\r\n                (el) => el.position.x < screen.width\r\n            );\r\n            this.enemies = this.enemies.filter((el) => el.position.x > 0);\r\n            this.checkHits();\r\n            this.checkIntersections();\r\n            this.isStarted = true;\r\n        }, 100);\r\n\r\n        const enemiesInterval = setInterval(() => {\r\n            this.isOver && clearInterval(enemiesInterval);\r\n            this.createRandomEnemy();\r\n        }, 1000);\r\n    }\r\n\r\n    createRandomEnemy() {\r\n        const newEnemy = new this.EnemyModel(\r\n            1,\r\n            {\r\n                x: screen.width,\r\n                y: this.randomizer(0, screen.height),\r\n            },\r\n            document.createElement(\"div\"),\r\n            this.randomizer(5, 25)\r\n        );\r\n        newEnemy.element.className = \"enemy\";\r\n        newEnemy.element.style.top = newEnemy.position.y + \"px\";\r\n        newEnemy.element.style.left = newEnemy.position.x + \"px\";\r\n        this.rootDiv.insertAdjacentElement(\"afterbegin\", newEnemy.element);\r\n        this.enemies.push(newEnemy);\r\n    }\r\n\r\n    randomizer(from = 0, to = 100) {\r\n        return Math.ceil(from + Math.random() * (to - from));\r\n    }\r\n\r\n    attack(posX, posY) {\r\n        const shoot = new Audio(\"./img/shoot.mp3\");\r\n        shoot.play();\r\n        const newBullet = new this.BulletModel(\r\n            { x: posX, y: posY },\r\n            document.createElement(\"div\")\r\n        );\r\n        newBullet.element.className = \"bullet\";\r\n        newBullet.element.style.top = newBullet.position.y + \"px\";\r\n        newBullet.element.style.left = newBullet.position.x + \"px\";\r\n        this.bullets.push(newBullet);\r\n        this.rootDiv.insertAdjacentElement(\"afterbegin\", newBullet.element);\r\n    }\r\n\r\n    isHit(polyCords, pointX, pointY) {\r\n        let i = 0;\r\n        let j = 0;\r\n        let c = 0;\r\n\r\n        for (i = 0, j = polyCords.length - 1; i < polyCords.length; j = i++) {\r\n            if (\r\n                polyCords[i][1] > pointY != polyCords[j][1] > pointY &&\r\n                pointX <\r\n                    ((polyCords[j][0] - polyCords[i][0]) *\r\n                        (pointY - polyCords[i][1])) /\r\n                        (polyCords[j][1] - polyCords[i][1]) +\r\n                        polyCords[i][0]\r\n            ) {\r\n                c = !c;\r\n            }\r\n        }\r\n\r\n        return c;\r\n    }\r\n\r\n    checkHits() {\r\n        this.bullets.forEach((bullet) => {\r\n            this.enemies.forEach((enemie) => {\r\n                if (\r\n                    this.isHit(\r\n                        [\r\n                            [enemie.position.x, enemie.position.y],\r\n                            [enemie.position.x + 100, enemie.position.y],\r\n                            [enemie.position.x + 100, enemie.position.y + 100],\r\n                            [enemie.position.x, enemie.position.y + 100],\r\n                        ],\r\n                        bullet.position.x,\r\n                        bullet.position.y\r\n                    )\r\n                ) {\r\n                    enemie.kill();\r\n                    this.enemies = this.enemies.filter((el) => el !== enemie);\r\n                    bullet.clear();\r\n                    this.bullets = this.bullets.filter((el) => el !== bullet);\r\n                }\r\n            });\r\n        });\r\n    }\r\n\r\n    checkIntersections() {\r\n        this.enemies.forEach((enemie) => {\r\n            if (\r\n                this.isHit(\r\n                    [\r\n                        [enemie.position.x, enemie.position.y],\r\n                        [enemie.position.x + 100, enemie.position.y],\r\n                        [enemie.position.x + 100, enemie.position.y + 100],\r\n                        [enemie.position.x, enemie.position.y + 100],\r\n                    ],\r\n                    this.player.position.x + 200,\r\n                    this.player.position.y\r\n                ) ||\r\n                this.isHit(\r\n                    [\r\n                        [enemie.position.x, enemie.position.y],\r\n                        [enemie.position.x + 100, enemie.position.y],\r\n                        [enemie.position.x + 100, enemie.position.y + 100],\r\n                        [enemie.position.x, enemie.position.y + 100],\r\n                    ],\r\n                    this.player.position.x + 180,\r\n                    this.player.position.y + 100\r\n                )\r\n            ) {\r\n                this.player.element.classList.remove(\"vibrate\");\r\n                this.player.element.style.backgroundImage =\r\n                    \"url(../img/blast.png)\";\r\n                this.player.element.style.backgroundSize = \"contain\";\r\n                this.gameOver();\r\n            }\r\n        });\r\n    }\r\n\r\n    gameOver() {\r\n        startGameMusic.pause();\r\n        startGameMusic.currentTime = 0;\r\n        const gameOverMusic = new Audio(\"./img/game-over.mp3\");\r\n        gameOverMusic.play();\r\n        this.isOver = true;\r\n        this.isStarted = false;\r\n        setTimeout(() => {\r\n            this.gameOverCb();\r\n        }, 2000);\r\n    }\r\n};\r\n\n\n//# sourceURL=webpack://hackdec22/./src/js/models/game.js?");

/***/ }),

/***/ "./src/js/models/player.js":
/*!*********************************!*\
  !*** ./src/js/models/player.js ***!
  \*********************************/
/***/ ((module) => {

eval("module.exports = class Player {\r\n    username = \"Player\";\r\n    score = 0;\r\n    position = {\r\n        x: 100,\r\n        y: 500,\r\n    };\r\n    element = null;\r\n\r\n    constructor(username, element) {\r\n        this.username = username;\r\n        this.element = element;\r\n        this.element.className = \"player\";\r\n        this.element.classList.add(\"vibrate\");\r\n        this.element.style.left = this.position.x + \"px\";\r\n        this.element.style.top = this.position.y + \"px\";\r\n    }\r\n\r\n    setPosition(x = 0, y = 0) {\r\n        x &&\r\n            (this.position.x += x) &&\r\n            (this.element.style.left = this.position.x + \"px\");\r\n        y &&\r\n            (this.position.y += y) &&\r\n            (this.element.style.top = this.position.y + \"px\");\r\n    }\r\n};\r\n\n\n//# sourceURL=webpack://hackdec22/./src/js/models/player.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/index.js");
/******/ 	
/******/ })()
;