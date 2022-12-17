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

eval("const Game = __webpack_require__(/*! ./models/game */ \"./src/js/models/game.js\");\nconst Player = __webpack_require__(/*! ./models/player */ \"./src/js/models/player.js\");\nconst Enemy = __webpack_require__(/*! ./models/enemy */ \"./src/js/models/enemy.js\");\n\nconsole.log(Game);\n\n\n//# sourceURL=webpack://hackdec22/./src/js/index.js?");

/***/ }),

/***/ "./src/js/models/enemy.js":
/*!********************************!*\
  !*** ./src/js/models/enemy.js ***!
  \********************************/
/***/ ((module) => {

eval("module.exports = class Enemy {\n    type = 1;\n    position = {\n        x: 0,\n        y: 0,\n    };\n\n    constructor(type) {\n        this.type = type;\n    }\n};\n\n\n//# sourceURL=webpack://hackdec22/./src/js/models/enemy.js?");

/***/ }),

/***/ "./src/js/models/game.js":
/*!*******************************!*\
  !*** ./src/js/models/game.js ***!
  \*******************************/
/***/ ((module) => {

eval("module.exports = class Game {\n    players = [];\n    enemies = [];\n    isOver = false;\n\n    start() {}\n\n    end() {}\n};\n\n\n//# sourceURL=webpack://hackdec22/./src/js/models/game.js?");

/***/ }),

/***/ "./src/js/models/player.js":
/*!*********************************!*\
  !*** ./src/js/models/player.js ***!
  \*********************************/
/***/ ((module) => {

eval("module.exports = class Player {\n    username = \"Player\";\n    score = 0;\n    position = {\n        x: 0,\n        y: 0,\n    };\n\n    constructor(username) {\n        this.username = username;\n    }\n\n    setPosition() {}\n};\n\n\n//# sourceURL=webpack://hackdec22/./src/js/models/player.js?");

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