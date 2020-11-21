/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/gem-puzzle/assets/audio/tile-move.mp3":
/*!***************************************************!*\
  !*** ./src/gem-puzzle/assets/audio/tile-move.mp3 ***!
  \***************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.p, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "assets/audio/tile-move.mp3");

/***/ }),

/***/ "./src/gem-puzzle/style.css":
/*!**********************************!*\
  !*** ./src/gem-puzzle/style.css ***!
  \**********************************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/gem-puzzle/Timer.js":
/*!*********************************!*\
  !*** ./src/gem-puzzle/Timer.js ***!
  \*********************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ Timer
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/gem-puzzle/utils.js");
;

class Timer {
  constructor() {
    this.intervals = [];
  }

  update() {
    this.intervals[this.intervals.length - 1] += 1000;
    this.updateElement();
  }

  start() {
    this.active = true;
    this.intervals.push(0);
    this.interval = setInterval(() => {
      this.update();
    }, 1000);
  }

  pause() {
    if (this.active) {
      clearInterval(this.interval);
      this.active = false;
    }
  }

  reset() {
    this.pause();
    this.intervals.length = 0;
    this.updateElement();
  }

  getTime() {
    const hours = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.appendZero)(this.getHours());
    const minutes = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.appendZero)(this.getMinutes());
    const seconds = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.appendZero)(this.getSeconds());

    if (hours === '00') {
      return `${minutes}:${seconds}`;
    }

    return `${hours}:${minutes}:${seconds}`;
  }

  getMilliseconds() {
    const timePassed = this.intervals.reduce((acc, curr) => (acc + curr), 0);
    const milliseconds = timePassed % 1000;
    return milliseconds;
  }

  getSeconds() {
    const timePassed = this.intervals.reduce((acc, curr) => (acc + curr), 0);
    const seconds = Math.floor((timePassed % 60000) / 1000);
    return seconds;
  }

  getMinutes() {
    const timePassed = this.intervals.reduce((acc, curr) => (acc + curr), 0);
    const minutes = Math.floor((timePassed % (60 * 60000)) / 60000);
    return minutes;
  }

  getHours() {
    const timePassed = this.intervals.reduce((acc, curr) => (acc + curr), 0);
    const hours = Math.floor(timePassed / (60 * 60000));
    return hours;
  }

  createElement(tag) {
    this.DOMElement = document.createElement(tag);
    this.updateElement();
    return this.DOMElement;
  }

  updateElement() {
    if (this.DOMElement) {
      this.DOMElement.textContent = this.getTime();
    }
  }
}


/***/ }),

/***/ "./src/gem-puzzle/gem-puzzle.js":
/*!**************************************!*\
  !*** ./src/gem-puzzle/gem-puzzle.js ***!
  \**************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ GemPuzzle
/* harmony export */ });
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/gem-puzzle/style.css");
/* harmony import */ var _Timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Timer */ "./src/gem-puzzle/Timer.js");
/* harmony import */ var _assets_audio_tile_move_mp3__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./assets/audio/tile-move.mp3 */ "./src/gem-puzzle/assets/audio/tile-move.mp3");
;



class GemPuzzle {
  constructor() {
    this.timer = new _Timer__WEBPACK_IMPORTED_MODULE_1__.default();
    this.state = {
      size: 4,
      tiles: [],
      moves: 0,
      isSolved: false,
    };

    this.stateProxy = new Proxy(this.state, {
      set: (target, prop, value, receiver) => {
        if (prop === 'moves') {
          this.elements.moveCounter.textContent = `Moves: ${value}`;
        }

        if (prop === 'size') {
          Reflect.set(target, prop, value, receiver);
          this.startNewGame();
          return true;
        }

        return Reflect.set(target, prop, value, receiver);
      },
    });

    this.eventListeners = {
      tileOnClick: (event) => {
        const { tiles, size } = this.state;
        const index = tiles.map((tile) => tile.element).indexOf(event.target);
        const tile = event.target;
        const gapSize = 2;

        if (this.state.isSolved || this.isTransitioning) {
          return;
        }

        if (!this.timer.active) {
          this.timer.start();
        }

        switch (true) {
          case tiles[index - 1] && tiles[index - 1].id === -1 && index % size !== 0:
            [tiles[index], tiles[index - 1]] = [tiles[index - 1], tiles[index]];
            this.stateProxy.moves += 1;
            tile.style.transform = `translateX(-100%) translateX(-${gapSize}px)`;
            break;
          case tiles[index + 1] && tiles[index + 1].id === -1 && index % size !== size - 1:
            [tiles[index], tiles[index + 1]] = [tiles[index + 1], tiles[index]];
            this.stateProxy.moves += 1;
            tile.style.transform = `translateX(100%) translateX(${gapSize}px)`;
            break;
          case tiles[index - size] && tiles[index - size].id === -1:
            [tiles[index], tiles[index - size]] = [tiles[index - size], tiles[index]];
            this.stateProxy.moves += 1;
            tile.style.transform = `translateY(-100%) translateY(-${gapSize}px)`;
            break;
          case tiles[index + size] && tiles[index + size].id === -1:
            [tiles[index], tiles[index + size]] = [tiles[index + size], tiles[index]];
            this.stateProxy.moves += 1;
            tile.style.transform = `translateY(100%) translateY(${gapSize}px)`;
            break;
          default:
            break;
        }
      },

      tileOnTransitionStart: (event) => {
        if (event.propertyName === 'transform') {
          this.isTransitioning = true;
          new Audio(_assets_audio_tile_move_mp3__WEBPACK_IMPORTED_MODULE_2__.default).play();
        }
      },

      tileOnTransitionEnd: (event) => {
        if (event.propertyName === 'transform') {
          this.renderTiles();
          this.checkState();
        }
      },

    };
  }

  init() {
    this.createElements();
    this.generateTiles();
    this.startNewGame();
    return this.elements.container;
  }

  startNewGame() {
    this.state.isSolved = false;
    this.stateProxy.moves = 0;
    this.timer.reset();
    this.shuffleTiles();
    this.renderTiles();
    this.elements.board.style.gridTemplateColumns = `repeat(${this.state.size}, 1fr)`;
  }

  generateTiles() {
    const tileAmount = this.state.size ** 2;
    const tiles = [];
    const emptyTile = {
      id: -1,
      element: document.createElement('div'),
    };

    for (let i = 0; i < tileAmount - 1; i += 1) {
      const tile = { };
      tile.id = i + 1;
      tile.element = document.createElement('div');
      tile.element.classList.add('gem-puzzle__tile');
      tile.element.textContent = tile.id;
      tiles.push(tile);

      tile.element.addEventListener('click', this.eventListeners.tileOnClick);
      tile.element.addEventListener('transitionstart', this.eventListeners.tileOnTransitionStart);
      tile.element.addEventListener('transitionend', this.eventListeners.tileOnTransitionEnd);
    }

    tiles.push(emptyTile);
    this.state.tiles = tiles;
  }

  renderTiles() {
    const { tiles } = this.state;
    tiles.forEach((tile) => {
      // eslint-disable-next-line no-param-reassign
      tile.element.style.transform = '';
      this.elements.board.append(tile.element);
      this.isTransitioning = false;
    });
  }

  checkState() {
    const tileIds = this.state.tiles.map((tile) => tile.id);

    for (let i = 0; i + 2 < tileIds.length; i += 1) {
      if (tileIds[i + 1] !== tileIds[i] + 1) {
        return;
      }
    }

    this.timer.pause();
    this.state.isSolved = true;

    // setTimeout to fire alert once the event loop is empty
    setTimeout(() => {
      alert(`You solved the puzzle in ${this.timer.getTime()} and made ${this.state.moves} moves.\nSorry for the alert, work in progress.`);
    }, 0);
  }

  shuffleTiles() {
    const tileAmount = this.state.size ** 2;
    const { tiles } = this.state;

    for (let i = 0; i < tileAmount; i += 1) {
      const randomTile = Math.floor(Math.random() * tileAmount);
      [tiles[i], tiles[randomTile]] = [tiles[randomTile], tiles[i]];
    }

    // Shuffle until solvable combination is found
    if (!this.isSolvable()) this.shuffleTiles();
  }

  isSolvable() {
    const { tiles, size } = this.state;
    const tileIds = tiles.map((tile) => tile.id);
    const emptyTileIndex = tileIds.indexOf(-1);
    const emptyTileRow = Math.ceil((emptyTileIndex + 1) / size);
    let inversions = 0;

    // Count inversions
    for (let i = 0; i < tileIds.length; i += 1) {
      if (tileIds[i] !== -1) {
        for (let j = i; j < tileIds.length; j += 1) {
          if (tileIds[i] > tileIds[j] && tileIds[j] !== -1) {
            inversions += 1;
          }
        }
      }
    }

    // If N is odd, then puzzle instance is solvable if number of inversions is even.
    if (size % 2 === 1 && inversions % 2 === 0) {
      return true;
    }

    if (size % 2 === 0) {
      if (emptyTileRow % 2 === 1 && inversions % 2 === 1) {
        return true;
      }
      if (emptyTileRow % 2 === 0 && inversions % 2 === 0) {
        return true;
      }
    }

    return false;
  }

  createElements() {
    const container = document.createElement('div');
    const statusBar = document.createElement('div');
    const board = document.createElement('div');
    const timer = document.createElement('span');
    const moveCounter = document.createElement('span');
    const newGameBtn = document.createElement('button');

    // Main elements setup
    container.classList.add('gem-puzzle');
    statusBar.classList.add('gem-puzzle__status-bar');
    board.classList.add('gem-puzzle__board');
    board.style.gridTemplateColumns = `repeat(${this.state.size}, 1fr)`;

    // Timer setup
    timer.textContent = 'Timer: ';
    timer.append(this.timer.createElement('time'));

    // Move counter setup
    moveCounter.textContent = 'Moves: 0';

    // New game button setup
    newGameBtn.type = 'button';
    newGameBtn.classList.add('gem-puzzle__button');
    newGameBtn.textContent = 'New game';
    newGameBtn.addEventListener('click', () => {
      this.startNewGame();
    });

    statusBar.append(timer, newGameBtn, moveCounter);
    container.append(statusBar, board);

    this.elements = {
      container,
      statusBar,
      board,
      timer,
      moveCounter,
    };
  }
}


/***/ }),

/***/ "./src/gem-puzzle/utils.js":
/*!*********************************!*\
  !*** ./src/gem-puzzle/utils.js ***!
  \*********************************/
/*! namespace exports */
/*! export appendZero [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "appendZero": () => /* binding */ appendZero
/* harmony export */ });
/* eslint-disable import/prefer-default-export */
function appendZero(num) {
  return num < 10 ? `0${num}` : `${num}`;
}




/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _gem_puzzle_gem_puzzle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gem-puzzle/gem-puzzle */ "./src/gem-puzzle/gem-puzzle.js");
;


document.documentElement.classList.add('page');
document.body.classList.add('page__inner');

const gemPuzzle = new _gem_puzzle_gem_puzzle__WEBPACK_IMPORTED_MODULE_1__.default();
const gemPuzzleElement = gemPuzzle.init();
document.body.append(gemPuzzleElement);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9nZW0tcHV6emxlLy4vc3JjL2dlbS1wdXp6bGUvYXNzZXRzL2F1ZGlvL3RpbGUtbW92ZS5tcDMiLCJ3ZWJwYWNrOi8vZ2VtLXB1enpsZS8uL3NyYy9nZW0tcHV6emxlL3N0eWxlLmNzcz8zZGNiIiwid2VicGFjazovL2dlbS1wdXp6bGUvLi9zcmMvc3R5bGUuY3NzP2UzMjAiLCJ3ZWJwYWNrOi8vZ2VtLXB1enpsZS8uL3NyYy9nZW0tcHV6emxlL1RpbWVyLmpzIiwid2VicGFjazovL2dlbS1wdXp6bGUvLi9zcmMvZ2VtLXB1enpsZS9nZW0tcHV6emxlLmpzIiwid2VicGFjazovL2dlbS1wdXp6bGUvLi9zcmMvZ2VtLXB1enpsZS91dGlscy5qcyIsIndlYnBhY2s6Ly9nZW0tcHV6emxlLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL2dlbS1wdXp6bGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZ2VtLXB1enpsZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZ2VtLXB1enpsZS93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2dlbS1wdXp6bGUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9nZW0tcHV6emxlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZ2VtLXB1enpsZS93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9nZW0tcHV6emxlL3dlYnBhY2svc3RhcnR1cCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpRUFBZSxxQkFBdUIsK0JBQStCLEU7Ozs7Ozs7Ozs7Ozs7O0FDQXJFOzs7Ozs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQSxDQUFxQzs7QUFFdEI7QUFDZjtBQUNBO0FB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QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JQQTtBQUNBO0FBQ0Esd0JBQXdCLElBQUksT0FBTyxJQUFJO0FBQ3ZDOztBQUlFOzs7Ozs7Ozs7Ozs7Ozs7OztBQ1BGLENBQXFCO0FBQzJCOztBQUVoRDtBQUNBOztBQUVBLHNCQUFzQiwyREFBUztBQUMvQjtBQUNBOzs7Ozs7O1VDUkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDckJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEVBQUU7V0FDRjtXQUNBO1dBQ0EsQ0FBQyxJOzs7OztXQ1BELHNGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGtDOzs7O1VDZkE7VUFDQTtVQUNBO1VBQ0EiLCJmaWxlIjoiYXBwLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJhc3NldHMvYXVkaW8vdGlsZS1tb3ZlLm1wM1wiOyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImltcG9ydCB7IGFwcGVuZFplcm8gfSBmcm9tICcuL3V0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGltZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmludGVydmFscyA9IFtdO1xuICB9XG5cbiAgdXBkYXRlKCkge1xuICAgIHRoaXMuaW50ZXJ2YWxzW3RoaXMuaW50ZXJ2YWxzLmxlbmd0aCAtIDFdICs9IDEwMDA7XG4gICAgdGhpcy51cGRhdGVFbGVtZW50KCk7XG4gIH1cblxuICBzdGFydCgpIHtcbiAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG4gICAgdGhpcy5pbnRlcnZhbHMucHVzaCgwKTtcbiAgICB0aGlzLmludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9LCAxMDAwKTtcbiAgfVxuXG4gIHBhdXNlKCkge1xuICAgIGlmICh0aGlzLmFjdGl2ZSkge1xuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcbiAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy5wYXVzZSgpO1xuICAgIHRoaXMuaW50ZXJ2YWxzLmxlbmd0aCA9IDA7XG4gICAgdGhpcy51cGRhdGVFbGVtZW50KCk7XG4gIH1cblxuICBnZXRUaW1lKCkge1xuICAgIGNvbnN0IGhvdXJzID0gYXBwZW5kWmVybyh0aGlzLmdldEhvdXJzKCkpO1xuICAgIGNvbnN0IG1pbnV0ZXMgPSBhcHBlbmRaZXJvKHRoaXMuZ2V0TWludXRlcygpKTtcbiAgICBjb25zdCBzZWNvbmRzID0gYXBwZW5kWmVybyh0aGlzLmdldFNlY29uZHMoKSk7XG5cbiAgICBpZiAoaG91cnMgPT09ICcwMCcpIHtcbiAgICAgIHJldHVybiBgJHttaW51dGVzfToke3NlY29uZHN9YDtcbiAgICB9XG5cbiAgICByZXR1cm4gYCR7aG91cnN9OiR7bWludXRlc306JHtzZWNvbmRzfWA7XG4gIH1cblxuICBnZXRNaWxsaXNlY29uZHMoKSB7XG4gICAgY29uc3QgdGltZVBhc3NlZCA9IHRoaXMuaW50ZXJ2YWxzLnJlZHVjZSgoYWNjLCBjdXJyKSA9PiAoYWNjICsgY3VyciksIDApO1xuICAgIGNvbnN0IG1pbGxpc2Vjb25kcyA9IHRpbWVQYXNzZWQgJSAxMDAwO1xuICAgIHJldHVybiBtaWxsaXNlY29uZHM7XG4gIH1cblxuICBnZXRTZWNvbmRzKCkge1xuICAgIGNvbnN0IHRpbWVQYXNzZWQgPSB0aGlzLmludGVydmFscy5yZWR1Y2UoKGFjYywgY3VycikgPT4gKGFjYyArIGN1cnIpLCAwKTtcbiAgICBjb25zdCBzZWNvbmRzID0gTWF0aC5mbG9vcigodGltZVBhc3NlZCAlIDYwMDAwKSAvIDEwMDApO1xuICAgIHJldHVybiBzZWNvbmRzO1xuICB9XG5cbiAgZ2V0TWludXRlcygpIHtcbiAgICBjb25zdCB0aW1lUGFzc2VkID0gdGhpcy5pbnRlcnZhbHMucmVkdWNlKChhY2MsIGN1cnIpID0+IChhY2MgKyBjdXJyKSwgMCk7XG4gICAgY29uc3QgbWludXRlcyA9IE1hdGguZmxvb3IoKHRpbWVQYXNzZWQgJSAoNjAgKiA2MDAwMCkpIC8gNjAwMDApO1xuICAgIHJldHVybiBtaW51dGVzO1xuICB9XG5cbiAgZ2V0SG91cnMoKSB7XG4gICAgY29uc3QgdGltZVBhc3NlZCA9IHRoaXMuaW50ZXJ2YWxzLnJlZHVjZSgoYWNjLCBjdXJyKSA9PiAoYWNjICsgY3VyciksIDApO1xuICAgIGNvbnN0IGhvdXJzID0gTWF0aC5mbG9vcih0aW1lUGFzc2VkIC8gKDYwICogNjAwMDApKTtcbiAgICByZXR1cm4gaG91cnM7XG4gIH1cblxuICBjcmVhdGVFbGVtZW50KHRhZykge1xuICAgIHRoaXMuRE9NRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgICB0aGlzLnVwZGF0ZUVsZW1lbnQoKTtcbiAgICByZXR1cm4gdGhpcy5ET01FbGVtZW50O1xuICB9XG5cbiAgdXBkYXRlRWxlbWVudCgpIHtcbiAgICBpZiAodGhpcy5ET01FbGVtZW50KSB7XG4gICAgICB0aGlzLkRPTUVsZW1lbnQudGV4dENvbnRlbnQgPSB0aGlzLmdldFRpbWUoKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCAnLi9zdHlsZS5jc3MnO1xuaW1wb3J0IFRpbWVyIGZyb20gJy4vVGltZXInO1xuaW1wb3J0IHRpbGVNb3ZlU291bmQgZnJvbSAnLi9hc3NldHMvYXVkaW8vdGlsZS1tb3ZlLm1wMyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdlbVB1enpsZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMudGltZXIgPSBuZXcgVGltZXIoKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgc2l6ZTogNCxcbiAgICAgIHRpbGVzOiBbXSxcbiAgICAgIG1vdmVzOiAwLFxuICAgICAgaXNTb2x2ZWQ6IGZhbHNlLFxuICAgIH07XG5cbiAgICB0aGlzLnN0YXRlUHJveHkgPSBuZXcgUHJveHkodGhpcy5zdGF0ZSwge1xuICAgICAgc2V0OiAodGFyZ2V0LCBwcm9wLCB2YWx1ZSwgcmVjZWl2ZXIpID0+IHtcbiAgICAgICAgaWYgKHByb3AgPT09ICdtb3ZlcycpIHtcbiAgICAgICAgICB0aGlzLmVsZW1lbnRzLm1vdmVDb3VudGVyLnRleHRDb250ZW50ID0gYE1vdmVzOiAke3ZhbHVlfWA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvcCA9PT0gJ3NpemUnKSB7XG4gICAgICAgICAgUmVmbGVjdC5zZXQodGFyZ2V0LCBwcm9wLCB2YWx1ZSwgcmVjZWl2ZXIpO1xuICAgICAgICAgIHRoaXMuc3RhcnROZXdHYW1lKCk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUmVmbGVjdC5zZXQodGFyZ2V0LCBwcm9wLCB2YWx1ZSwgcmVjZWl2ZXIpO1xuICAgICAgfSxcbiAgICB9KTtcblxuICAgIHRoaXMuZXZlbnRMaXN0ZW5lcnMgPSB7XG4gICAgICB0aWxlT25DbGljazogKGV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IHsgdGlsZXMsIHNpemUgfSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGlsZXMubWFwKCh0aWxlKSA9PiB0aWxlLmVsZW1lbnQpLmluZGV4T2YoZXZlbnQudGFyZ2V0KTtcbiAgICAgICAgY29uc3QgdGlsZSA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgY29uc3QgZ2FwU2l6ZSA9IDI7XG5cbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuaXNTb2x2ZWQgfHwgdGhpcy5pc1RyYW5zaXRpb25pbmcpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMudGltZXIuYWN0aXZlKSB7XG4gICAgICAgICAgdGhpcy50aW1lci5zdGFydCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICAgICAgY2FzZSB0aWxlc1tpbmRleCAtIDFdICYmIHRpbGVzW2luZGV4IC0gMV0uaWQgPT09IC0xICYmIGluZGV4ICUgc2l6ZSAhPT0gMDpcbiAgICAgICAgICAgIFt0aWxlc1tpbmRleF0sIHRpbGVzW2luZGV4IC0gMV1dID0gW3RpbGVzW2luZGV4IC0gMV0sIHRpbGVzW2luZGV4XV07XG4gICAgICAgICAgICB0aGlzLnN0YXRlUHJveHkubW92ZXMgKz0gMTtcbiAgICAgICAgICAgIHRpbGUuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoLTEwMCUpIHRyYW5zbGF0ZVgoLSR7Z2FwU2l6ZX1weClgO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSB0aWxlc1tpbmRleCArIDFdICYmIHRpbGVzW2luZGV4ICsgMV0uaWQgPT09IC0xICYmIGluZGV4ICUgc2l6ZSAhPT0gc2l6ZSAtIDE6XG4gICAgICAgICAgICBbdGlsZXNbaW5kZXhdLCB0aWxlc1tpbmRleCArIDFdXSA9IFt0aWxlc1tpbmRleCArIDFdLCB0aWxlc1tpbmRleF1dO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZVByb3h5Lm1vdmVzICs9IDE7XG4gICAgICAgICAgICB0aWxlLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKDEwMCUpIHRyYW5zbGF0ZVgoJHtnYXBTaXplfXB4KWA7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIHRpbGVzW2luZGV4IC0gc2l6ZV0gJiYgdGlsZXNbaW5kZXggLSBzaXplXS5pZCA9PT0gLTE6XG4gICAgICAgICAgICBbdGlsZXNbaW5kZXhdLCB0aWxlc1tpbmRleCAtIHNpemVdXSA9IFt0aWxlc1tpbmRleCAtIHNpemVdLCB0aWxlc1tpbmRleF1dO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZVByb3h5Lm1vdmVzICs9IDE7XG4gICAgICAgICAgICB0aWxlLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVZKC0xMDAlKSB0cmFuc2xhdGVZKC0ke2dhcFNpemV9cHgpYDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgdGlsZXNbaW5kZXggKyBzaXplXSAmJiB0aWxlc1tpbmRleCArIHNpemVdLmlkID09PSAtMTpcbiAgICAgICAgICAgIFt0aWxlc1tpbmRleF0sIHRpbGVzW2luZGV4ICsgc2l6ZV1dID0gW3RpbGVzW2luZGV4ICsgc2l6ZV0sIHRpbGVzW2luZGV4XV07XG4gICAgICAgICAgICB0aGlzLnN0YXRlUHJveHkubW92ZXMgKz0gMTtcbiAgICAgICAgICAgIHRpbGUuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVkoMTAwJSkgdHJhbnNsYXRlWSgke2dhcFNpemV9cHgpYDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgdGlsZU9uVHJhbnNpdGlvblN0YXJ0OiAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LnByb3BlcnR5TmFtZSA9PT0gJ3RyYW5zZm9ybScpIHtcbiAgICAgICAgICB0aGlzLmlzVHJhbnNpdGlvbmluZyA9IHRydWU7XG4gICAgICAgICAgbmV3IEF1ZGlvKHRpbGVNb3ZlU291bmQpLnBsYXkoKTtcbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgdGlsZU9uVHJhbnNpdGlvbkVuZDogKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChldmVudC5wcm9wZXJ0eU5hbWUgPT09ICd0cmFuc2Zvcm0nKSB7XG4gICAgICAgICAgdGhpcy5yZW5kZXJUaWxlcygpO1xuICAgICAgICAgIHRoaXMuY2hlY2tTdGF0ZSgpO1xuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgfTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5jcmVhdGVFbGVtZW50cygpO1xuICAgIHRoaXMuZ2VuZXJhdGVUaWxlcygpO1xuICAgIHRoaXMuc3RhcnROZXdHYW1lKCk7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudHMuY29udGFpbmVyO1xuICB9XG5cbiAgc3RhcnROZXdHYW1lKCkge1xuICAgIHRoaXMuc3RhdGUuaXNTb2x2ZWQgPSBmYWxzZTtcbiAgICB0aGlzLnN0YXRlUHJveHkubW92ZXMgPSAwO1xuICAgIHRoaXMudGltZXIucmVzZXQoKTtcbiAgICB0aGlzLnNodWZmbGVUaWxlcygpO1xuICAgIHRoaXMucmVuZGVyVGlsZXMoKTtcbiAgICB0aGlzLmVsZW1lbnRzLmJvYXJkLnN0eWxlLmdyaWRUZW1wbGF0ZUNvbHVtbnMgPSBgcmVwZWF0KCR7dGhpcy5zdGF0ZS5zaXplfSwgMWZyKWA7XG4gIH1cblxuICBnZW5lcmF0ZVRpbGVzKCkge1xuICAgIGNvbnN0IHRpbGVBbW91bnQgPSB0aGlzLnN0YXRlLnNpemUgKiogMjtcbiAgICBjb25zdCB0aWxlcyA9IFtdO1xuICAgIGNvbnN0IGVtcHR5VGlsZSA9IHtcbiAgICAgIGlkOiAtMSxcbiAgICAgIGVsZW1lbnQ6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuICAgIH07XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRpbGVBbW91bnQgLSAxOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IHRpbGUgPSB7IH07XG4gICAgICB0aWxlLmlkID0gaSArIDE7XG4gICAgICB0aWxlLmVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHRpbGUuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdnZW0tcHV6emxlX190aWxlJyk7XG4gICAgICB0aWxlLmVsZW1lbnQudGV4dENvbnRlbnQgPSB0aWxlLmlkO1xuICAgICAgdGlsZXMucHVzaCh0aWxlKTtcblxuICAgICAgdGlsZS5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5ldmVudExpc3RlbmVycy50aWxlT25DbGljayk7XG4gICAgICB0aWxlLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbnN0YXJ0JywgdGhpcy5ldmVudExpc3RlbmVycy50aWxlT25UcmFuc2l0aW9uU3RhcnQpO1xuICAgICAgdGlsZS5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCB0aGlzLmV2ZW50TGlzdGVuZXJzLnRpbGVPblRyYW5zaXRpb25FbmQpO1xuICAgIH1cblxuICAgIHRpbGVzLnB1c2goZW1wdHlUaWxlKTtcbiAgICB0aGlzLnN0YXRlLnRpbGVzID0gdGlsZXM7XG4gIH1cblxuICByZW5kZXJUaWxlcygpIHtcbiAgICBjb25zdCB7IHRpbGVzIH0gPSB0aGlzLnN0YXRlO1xuICAgIHRpbGVzLmZvckVhY2goKHRpbGUpID0+IHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgdGlsZS5lbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9ICcnO1xuICAgICAgdGhpcy5lbGVtZW50cy5ib2FyZC5hcHBlbmQodGlsZS5lbGVtZW50KTtcbiAgICAgIHRoaXMuaXNUcmFuc2l0aW9uaW5nID0gZmFsc2U7XG4gICAgfSk7XG4gIH1cblxuICBjaGVja1N0YXRlKCkge1xuICAgIGNvbnN0IHRpbGVJZHMgPSB0aGlzLnN0YXRlLnRpbGVzLm1hcCgodGlsZSkgPT4gdGlsZS5pZCk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSArIDIgPCB0aWxlSWRzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAodGlsZUlkc1tpICsgMV0gIT09IHRpbGVJZHNbaV0gKyAxKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnRpbWVyLnBhdXNlKCk7XG4gICAgdGhpcy5zdGF0ZS5pc1NvbHZlZCA9IHRydWU7XG5cbiAgICAvLyBzZXRUaW1lb3V0IHRvIGZpcmUgYWxlcnQgb25jZSB0aGUgZXZlbnQgbG9vcCBpcyBlbXB0eVxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgYWxlcnQoYFlvdSBzb2x2ZWQgdGhlIHB1enpsZSBpbiAke3RoaXMudGltZXIuZ2V0VGltZSgpfSBhbmQgbWFkZSAke3RoaXMuc3RhdGUubW92ZXN9IG1vdmVzLlxcblNvcnJ5IGZvciB0aGUgYWxlcnQsIHdvcmsgaW4gcHJvZ3Jlc3MuYCk7XG4gICAgfSwgMCk7XG4gIH1cblxuICBzaHVmZmxlVGlsZXMoKSB7XG4gICAgY29uc3QgdGlsZUFtb3VudCA9IHRoaXMuc3RhdGUuc2l6ZSAqKiAyO1xuICAgIGNvbnN0IHsgdGlsZXMgfSA9IHRoaXMuc3RhdGU7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRpbGVBbW91bnQ7IGkgKz0gMSkge1xuICAgICAgY29uc3QgcmFuZG9tVGlsZSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRpbGVBbW91bnQpO1xuICAgICAgW3RpbGVzW2ldLCB0aWxlc1tyYW5kb21UaWxlXV0gPSBbdGlsZXNbcmFuZG9tVGlsZV0sIHRpbGVzW2ldXTtcbiAgICB9XG5cbiAgICAvLyBTaHVmZmxlIHVudGlsIHNvbHZhYmxlIGNvbWJpbmF0aW9uIGlzIGZvdW5kXG4gICAgaWYgKCF0aGlzLmlzU29sdmFibGUoKSkgdGhpcy5zaHVmZmxlVGlsZXMoKTtcbiAgfVxuXG4gIGlzU29sdmFibGUoKSB7XG4gICAgY29uc3QgeyB0aWxlcywgc2l6ZSB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCB0aWxlSWRzID0gdGlsZXMubWFwKCh0aWxlKSA9PiB0aWxlLmlkKTtcbiAgICBjb25zdCBlbXB0eVRpbGVJbmRleCA9IHRpbGVJZHMuaW5kZXhPZigtMSk7XG4gICAgY29uc3QgZW1wdHlUaWxlUm93ID0gTWF0aC5jZWlsKChlbXB0eVRpbGVJbmRleCArIDEpIC8gc2l6ZSk7XG4gICAgbGV0IGludmVyc2lvbnMgPSAwO1xuXG4gICAgLy8gQ291bnQgaW52ZXJzaW9uc1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGlsZUlkcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKHRpbGVJZHNbaV0gIT09IC0xKSB7XG4gICAgICAgIGZvciAobGV0IGogPSBpOyBqIDwgdGlsZUlkcy5sZW5ndGg7IGogKz0gMSkge1xuICAgICAgICAgIGlmICh0aWxlSWRzW2ldID4gdGlsZUlkc1tqXSAmJiB0aWxlSWRzW2pdICE9PSAtMSkge1xuICAgICAgICAgICAgaW52ZXJzaW9ucyArPSAxO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIElmIE4gaXMgb2RkLCB0aGVuIHB1enpsZSBpbnN0YW5jZSBpcyBzb2x2YWJsZSBpZiBudW1iZXIgb2YgaW52ZXJzaW9ucyBpcyBldmVuLlxuICAgIGlmIChzaXplICUgMiA9PT0gMSAmJiBpbnZlcnNpb25zICUgMiA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHNpemUgJSAyID09PSAwKSB7XG4gICAgICBpZiAoZW1wdHlUaWxlUm93ICUgMiA9PT0gMSAmJiBpbnZlcnNpb25zICUgMiA9PT0gMSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmIChlbXB0eVRpbGVSb3cgJSAyID09PSAwICYmIGludmVyc2lvbnMgJSAyID09PSAwKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNyZWF0ZUVsZW1lbnRzKCkge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IHN0YXR1c0JhciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IGJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3QgdGltZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgY29uc3QgbW92ZUNvdW50ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgY29uc3QgbmV3R2FtZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuXG4gICAgLy8gTWFpbiBlbGVtZW50cyBzZXR1cFxuICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdnZW0tcHV6emxlJyk7XG4gICAgc3RhdHVzQmFyLmNsYXNzTGlzdC5hZGQoJ2dlbS1wdXp6bGVfX3N0YXR1cy1iYXInKTtcbiAgICBib2FyZC5jbGFzc0xpc3QuYWRkKCdnZW0tcHV6emxlX19ib2FyZCcpO1xuICAgIGJvYXJkLnN0eWxlLmdyaWRUZW1wbGF0ZUNvbHVtbnMgPSBgcmVwZWF0KCR7dGhpcy5zdGF0ZS5zaXplfSwgMWZyKWA7XG5cbiAgICAvLyBUaW1lciBzZXR1cFxuICAgIHRpbWVyLnRleHRDb250ZW50ID0gJ1RpbWVyOiAnO1xuICAgIHRpbWVyLmFwcGVuZCh0aGlzLnRpbWVyLmNyZWF0ZUVsZW1lbnQoJ3RpbWUnKSk7XG5cbiAgICAvLyBNb3ZlIGNvdW50ZXIgc2V0dXBcbiAgICBtb3ZlQ291bnRlci50ZXh0Q29udGVudCA9ICdNb3ZlczogMCc7XG5cbiAgICAvLyBOZXcgZ2FtZSBidXR0b24gc2V0dXBcbiAgICBuZXdHYW1lQnRuLnR5cGUgPSAnYnV0dG9uJztcbiAgICBuZXdHYW1lQnRuLmNsYXNzTGlzdC5hZGQoJ2dlbS1wdXp6bGVfX2J1dHRvbicpO1xuICAgIG5ld0dhbWVCdG4udGV4dENvbnRlbnQgPSAnTmV3IGdhbWUnO1xuICAgIG5ld0dhbWVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICB0aGlzLnN0YXJ0TmV3R2FtZSgpO1xuICAgIH0pO1xuXG4gICAgc3RhdHVzQmFyLmFwcGVuZCh0aW1lciwgbmV3R2FtZUJ0biwgbW92ZUNvdW50ZXIpO1xuICAgIGNvbnRhaW5lci5hcHBlbmQoc3RhdHVzQmFyLCBib2FyZCk7XG5cbiAgICB0aGlzLmVsZW1lbnRzID0ge1xuICAgICAgY29udGFpbmVyLFxuICAgICAgc3RhdHVzQmFyLFxuICAgICAgYm9hcmQsXG4gICAgICB0aW1lcixcbiAgICAgIG1vdmVDb3VudGVyLFxuICAgIH07XG4gIH1cbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9wcmVmZXItZGVmYXVsdC1leHBvcnQgKi9cbmZ1bmN0aW9uIGFwcGVuZFplcm8obnVtKSB7XG4gIHJldHVybiBudW0gPCAxMCA/IGAwJHtudW19YCA6IGAke251bX1gO1xufVxuXG5leHBvcnQge1xuICBhcHBlbmRaZXJvLFxufTtcbiIsImltcG9ydCAnLi9zdHlsZS5jc3MnO1xuaW1wb3J0IEdlbVB1enpsZSBmcm9tICcuL2dlbS1wdXp6bGUvZ2VtLXB1enpsZSc7XG5cbmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdwYWdlJyk7XG5kb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ3BhZ2VfX2lubmVyJyk7XG5cbmNvbnN0IGdlbVB1enpsZSA9IG5ldyBHZW1QdXp6bGUoKTtcbmNvbnN0IGdlbVB1enpsZUVsZW1lbnQgPSBnZW1QdXp6bGUuaW5pdCgpO1xuZG9jdW1lbnQuYm9keS5hcHBlbmQoZ2VtUHV6emxlRWxlbWVudCk7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmNcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSBzY3JpcHRVcmwgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV0uc3JjXG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlXG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXguanNcIik7XG4vLyBUaGlzIGVudHJ5IG1vZHVsZSB1c2VkICdleHBvcnRzJyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG4iXSwic291cmNlUm9vdCI6IiJ9