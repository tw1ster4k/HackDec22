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

eval("const Game = __webpack_require__(/*! ./models/game */ \"./src/js/models/game.js\");\nconst Player = __webpack_require__(/*! ./models/player */ \"./src/js/models/player.js\");\nconst Enemy = __webpack_require__(/*! ./models/enemy */ \"./src/js/models/enemy.js\");\nconst Bullet = __webpack_require__(/*! ./models/bullet */ \"./src/js/models/bullet.js\");\n\nconst root = document.querySelector(\".root\");\nconst startLayer = document.querySelector(\".start-layer\");\nconst gameOverLayer = document.querySelector(\".game-over\");\nconst startBtn = document.querySelector(\"#start-btn\");\nconst replayBtn = document.querySelector(\"#replay-btn\");\nconst scoreCounter = document.querySelector(\"#score-counter\");\nconst finalScore = document.querySelector(\"#final-score\");\n\nconst step = 30;\n\nlet player = null;\nlet game = null;\n\nconst newGame = () => {\n    player = new Player(\"Username\", document.createElement(\"div\"));\n    game = new Game(root, Enemy, Bullet, player, gameOverCb, scoreCounter);\n    game.start();\n    startLayer.style.height = \"0\";\n    root.insertAdjacentElement(\"afterbegin\", player.element);\n};\n\nstartBtn.addEventListener(\"click\", (event) => {\n    if (game) return;\n    newGame();\n});\n\nreplayBtn.addEventListener(\"click\", (event) => {\n    if (game) return;\n    newGame();\n    gameOverLayer.style.height = \"0\";\n});\n\ndocument.addEventListener(\"keydown\", (event) => {\n    if (game.isOver) return;\n    switch (event.key) {\n        case \"ArrowUp\":\n            player.setPosition(0, -step);\n            break;\n        case \"ArrowDown\":\n            player.setPosition(0, step);\n            break;\n        case \"ArrowRight\":\n            player.setPosition(step, 0);\n            break;\n        case \"ArrowLeft\":\n            player.setPosition(-step, 0);\n            break;\n\n        case \" \":\n            game.attack(player.position.x + 150, player.position.y + 100);\n    }\n});\n\nconst gameOverCb = () => {\n    gameOverLayer.style.height = \"100vh\";\n    finalScore.innerText = game.score;\n    game = null;\n    player = null;\n    root.innerHTML = \"\";\n    scoreCounter.innerText = \"0\";\n};\n\n\n//# sourceURL=webpack://hackdec22/./src/js/index.js?");

/***/ }),

/***/ "./src/js/models/bullet.js":
/*!*********************************!*\
  !*** ./src/js/models/bullet.js ***!
  \*********************************/
/***/ ((module) => {

eval("module.exports = class Bullet {\n    position = {\n        x: 0,\n        y: 0,\n    };\n    element = null;\n\n    constructor(position, element) {\n        this.element = element;\n\n        this.position = position;\n\n        this.element.className = \"bullet\";\n        this.element.style.left = this.position.x + \"px\";\n        this.element.style.top = this.position.y + \"px\";\n    }\n\n    move() {\n        if (this.position.x > screen.width) this.element.remove();\n        this.position.x += 50;\n        this.element.style.left = this.position.x + \"px\";\n    }\n\n    clear() {\n        this.element.remove();\n    }\n};\n\n\n//# sourceURL=webpack://hackdec22/./src/js/models/bullet.js?");

/***/ }),

/***/ "./src/js/models/enemy.js":
/*!********************************!*\
  !*** ./src/js/models/enemy.js ***!
  \********************************/
/***/ ((module) => {

eval("module.exports = class Enemy {\n    type = 1;\n    element = null;\n    speed = 20;\n    position = {\n        x: 0,\n        y: 0,\n    };\n    reward = 0;\n\n    constructor(type, position, element, speed = 20, reward = 10) {\n        this.type = type;\n        this.position = position;\n        this.element = element;\n        this.speed = speed;\n        this.reward = reward;\n    }\n\n    kill() {\n        this.element.remove();\n    }\n\n    move() {\n        this.position.x -= this.speed;\n        this.element.style.left = this.position.x + \"px\";\n    }\n};\n\n\n//# sourceURL=webpack://hackdec22/./src/js/models/enemy.js?");

/***/ }),

/***/ "./src/js/models/game.js":
/*!*******************************!*\
  !*** ./src/js/models/game.js ***!
  \*******************************/
/***/ ((module) => {

eval("module.exports = class Game {\n    score = 0;\n    player = null;\n    rootDiv = null;\n    enemies = [];\n    isOver = false;\n    bullets = [];\n    EnemyModel = null;\n    BulletModel = null;\n    isStarted = false;\n    gameOverCb = null;\n    counterElement;\n\n    constructor(\n        rootDiv,\n        EnemyModel,\n        BulletModel,\n        player,\n        gameOverCb,\n        counterElement\n    ) {\n        this.player = player;\n        this.rootDiv = rootDiv;\n        this.EnemyModel = EnemyModel;\n        this.BulletModel = BulletModel;\n        this.gameOverCb = gameOverCb;\n        this.counterElement = counterElement;\n    }\n\n    start() {\n        const gameInterval = setInterval(() => {\n            this.isOver && clearInterval(gameInterval);\n\n            this.bullets.forEach((el) => {\n                el.move();\n                el.position.x >= screen.width && el.clear();\n            });\n            this.enemies.forEach((el) => {\n                el.move();\n                el.position.x <= 0 && el.kill();\n            });\n\n            this.bullets = this.bullets.filter(\n                (el) => el.position.x < screen.width\n            );\n            this.enemies = this.enemies.filter((el) => el.position.x > 0);\n            this.checkHits();\n            this.checkIntersections();\n            this.isStarted = true;\n        }, 100);\n\n        const enemiesInterval = setInterval(() => {\n            this.isOver && clearInterval(enemiesInterval);\n            this.createRandomEnemy();\n        }, 1000);\n    }\n\n    createRandomEnemy() {\n        const newEnemy = new this.EnemyModel(\n            this.randomizer(1, 10),\n            {\n                x: screen.width,\n                y: this.randomizer(0, screen.height),\n            },\n            document.createElement(\"div\"),\n            this.randomizer(5, 25),\n            this.randomizer(5, 25)\n        );\n        newEnemy.element.className = `enemy e${newEnemy.type}`;\n        newEnemy.element.style.top = newEnemy.position.y + \"px\";\n        newEnemy.element.style.left = newEnemy.position.x + \"px\";\n        this.rootDiv.insertAdjacentElement(\"afterbegin\", newEnemy.element);\n        this.enemies.push(newEnemy);\n    }\n\n    randomizer(from = 0, to = 100) {\n        return Math.ceil(from + Math.random() * (to - from));\n    }\n\n    attack(posX, posY) {\n        const newBullet = new this.BulletModel(\n            { x: posX, y: posY },\n            document.createElement(\"div\")\n        );\n        newBullet.element.className = \"bullet\";\n        newBullet.element.style.top = newBullet.position.y + \"px\";\n        newBullet.element.style.left = newBullet.position.x + \"px\";\n        this.bullets.push(newBullet);\n        this.rootDiv.insertAdjacentElement(\"afterbegin\", newBullet.element);\n    }\n\n    isHit(polyCords, pointX, pointY) {\n        let i = 0;\n        let j = 0;\n        let c = 0;\n\n        for (i = 0, j = polyCords.length - 1; i < polyCords.length; j = i++) {\n            if (\n                polyCords[i][1] > pointY != polyCords[j][1] > pointY &&\n                pointX <\n                    ((polyCords[j][0] - polyCords[i][0]) *\n                        (pointY - polyCords[i][1])) /\n                        (polyCords[j][1] - polyCords[i][1]) +\n                        polyCords[i][0]\n            ) {\n                c = !c;\n            }\n        }\n\n        return c;\n    }\n\n    checkHits() {\n        this.bullets.forEach((bullet) => {\n            this.enemies.forEach((enemie) => {\n                if (\n                    this.isHit(\n                        [\n                            [enemie.position.x, enemie.position.y],\n                            [enemie.position.x + 100, enemie.position.y],\n                            [enemie.position.x + 100, enemie.position.y + 100],\n                            [enemie.position.x, enemie.position.y + 100],\n                        ],\n                        bullet.position.x,\n                        bullet.position.y\n                    )\n                ) {\n                    enemie.kill();\n                    this.enemies = this.enemies.filter((el) => el !== enemie);\n                    bullet.clear();\n                    this.bullets = this.bullets.filter((el) => el !== bullet);\n                    this.score += enemie.reward;\n                    this.counterElement.innerText = this.score;\n                }\n            });\n        });\n    }\n\n    checkIntersections() {\n        this.enemies.forEach((enemie) => {\n            if (\n                this.isHit(\n                    [\n                        [enemie.position.x, enemie.position.y],\n                        [enemie.position.x + 100, enemie.position.y],\n                        [enemie.position.x + 100, enemie.position.y + 100],\n                        [enemie.position.x, enemie.position.y + 100],\n                    ],\n                    this.player.position.x + 200,\n                    this.player.position.y\n                ) ||\n                this.isHit(\n                    [\n                        [enemie.position.x, enemie.position.y],\n                        [enemie.position.x + 100, enemie.position.y],\n                        [enemie.position.x + 100, enemie.position.y + 100],\n                        [enemie.position.x, enemie.position.y + 100],\n                    ],\n                    this.player.position.x + 180,\n                    this.player.position.y + 100\n                )\n            ) {\n                this.gameOver();\n            }\n        });\n    }\n\n    gameOver() {\n        this.isOver = true;\n        this.isStarted = false;\n        this.gameOverCb();\n    }\n};\n\n\n//# sourceURL=webpack://hackdec22/./src/js/models/game.js?");

/***/ }),

/***/ "./src/js/models/player.js":
/*!*********************************!*\
  !*** ./src/js/models/player.js ***!
  \*********************************/
/***/ ((module) => {

eval("module.exports = class Player {\n    username = \"Player\";\n    score = 0;\n    position = {\n        x: 100,\n        y: 500,\n    };\n    element = null;\n\n    constructor(username, element) {\n        this.username = username;\n        this.element = element;\n        this.element.className = \"player\";\n        this.element.style.left = this.position.x + \"px\";\n        this.element.style.top = this.position.y + \"px\";\n    }\n\n    setPosition(x = 0, y = 0) {\n        x &&\n            (this.position.x += x) &&\n            (this.element.style.left = this.position.x + \"px\");\n        y &&\n            (this.position.y += y) &&\n            (this.element.style.top = this.position.y + \"px\");\n    }\n};\n\n\n//# sourceURL=webpack://hackdec22/./src/js/models/player.js?");

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