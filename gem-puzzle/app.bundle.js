/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
      tileOnclick: (event) => {
        const { tiles, size } = this.state;
        const index = tiles.map((tile) => tile.element).indexOf(event.target);

        if (this.state.isSolved) {
          return;
        }

        if (!this.timer.active) {
          this.timer.start();
        }

        switch (true) {
          case tiles[index - 1] && tiles[index - 1].id === -1 && index % size !== 0:
            [tiles[index], tiles[index - 1]] = [tiles[index - 1], tiles[index]];
            this.stateProxy.moves += 1;
            break;
          case tiles[index + 1] && tiles[index + 1].id === -1 && index % size !== size - 1:
            [tiles[index], tiles[index + 1]] = [tiles[index + 1], tiles[index]];
            this.stateProxy.moves += 1;
            break;
          case tiles[index - size] && tiles[index - size].id === -1:
            [tiles[index], tiles[index - size]] = [tiles[index - size], tiles[index]];
            this.stateProxy.moves += 1;
            break;
          case tiles[index + size] && tiles[index + size].id === -1:
            [tiles[index], tiles[index + size]] = [tiles[index + size], tiles[index]];
            this.stateProxy.moves += 1;
            break;
          default:
            break;
        }
        this.renderTiles();
        this.checkState();
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

      tile.element.addEventListener('click', this.eventListeners.tileOnclick);
    }

    tiles.push(emptyTile);
    this.state.tiles = tiles;
  }

  renderTiles() {
    const { tiles } = this.state;
    tiles.forEach((tile) => {
      this.elements.board.append(tile.element);
    });
  }

  // moveTile(tileIndex1, tileIndex2) {
  //   const tiles = this.state.tiles;
  //   const nextSibling = tile2.nextSibling;
  //   const prevSibling = tile2.previousSibling;
  //   const parent = tile2.parentElement;
  //   tile1.replaceWith(tile2);

  //   if (nextSibling) {
  //     nextSibling.before(tile1);
  //   } else if (prevSibling) {
  //     prevSibling.after(tile1);
  //   } else {
  //     parent.append(tile1);
  //   }

  //   [tiles[i], tiles[i - 1]] = [tiles[i - 1], tiles[i]];
  // }

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
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9nZW0tcHV6emxlLy4vc3JjL2dlbS1wdXp6bGUvc3R5bGUuY3NzPzNkY2IiLCJ3ZWJwYWNrOi8vZ2VtLXB1enpsZS8uL3NyYy9zdHlsZS5jc3M/ZTMyMCIsIndlYnBhY2s6Ly9nZW0tcHV6emxlLy4vc3JjL2dlbS1wdXp6bGUvVGltZXIuanMiLCJ3ZWJwYWNrOi8vZ2VtLXB1enpsZS8uL3NyYy9nZW0tcHV6emxlL2dlbS1wdXp6bGUuanMiLCJ3ZWJwYWNrOi8vZ2VtLXB1enpsZS8uL3NyYy9nZW0tcHV6emxlL3V0aWxzLmpzIiwid2VicGFjazovL2dlbS1wdXp6bGUvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZ2VtLXB1enpsZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9nZW0tcHV6emxlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9nZW0tcHV6emxlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZ2VtLXB1enpsZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2dlbS1wdXp6bGUvd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBLENBQXFDOztBQUV0QjtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0JBQWtCLGtEQUFVO0FBQzVCLG9CQUFvQixrREFBVTtBQUM5QixvQkFBb0Isa0RBQVU7O0FBRTlCO0FBQ0EsZ0JBQWdCLFFBQVEs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O1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSxzRjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7OztVQ05BO1VBQ0E7VUFDQTtVQUNBIiwiZmlsZSI6ImFwcC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJpbXBvcnQgeyBhcHBlbmRaZXJvIH0gZnJvbSAnLi91dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpbWVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5pbnRlcnZhbHMgPSBbXTtcbiAgfVxuXG4gIHVwZGF0ZSgpIHtcbiAgICB0aGlzLmludGVydmFsc1t0aGlzLmludGVydmFscy5sZW5ndGggLSAxXSArPSAxMDAwO1xuICAgIHRoaXMudXBkYXRlRWxlbWVudCgpO1xuICB9XG5cbiAgc3RhcnQoKSB7XG4gICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xuICAgIHRoaXMuaW50ZXJ2YWxzLnB1c2goMCk7XG4gICAgdGhpcy5pbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfSwgMTAwMCk7XG4gIH1cblxuICBwYXVzZSgpIHtcbiAgICBpZiAodGhpcy5hY3RpdmUpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XG4gICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHJlc2V0KCkge1xuICAgIHRoaXMucGF1c2UoKTtcbiAgICB0aGlzLmludGVydmFscy5sZW5ndGggPSAwO1xuICAgIHRoaXMudXBkYXRlRWxlbWVudCgpO1xuICB9XG5cbiAgZ2V0VGltZSgpIHtcbiAgICBjb25zdCBob3VycyA9IGFwcGVuZFplcm8odGhpcy5nZXRIb3VycygpKTtcbiAgICBjb25zdCBtaW51dGVzID0gYXBwZW5kWmVybyh0aGlzLmdldE1pbnV0ZXMoKSk7XG4gICAgY29uc3Qgc2Vjb25kcyA9IGFwcGVuZFplcm8odGhpcy5nZXRTZWNvbmRzKCkpO1xuXG4gICAgaWYgKGhvdXJzID09PSAnMDAnKSB7XG4gICAgICByZXR1cm4gYCR7bWludXRlc306JHtzZWNvbmRzfWA7XG4gICAgfVxuXG4gICAgcmV0dXJuIGAke2hvdXJzfToke21pbnV0ZXN9OiR7c2Vjb25kc31gO1xuICB9XG5cbiAgZ2V0TWlsbGlzZWNvbmRzKCkge1xuICAgIGNvbnN0IHRpbWVQYXNzZWQgPSB0aGlzLmludGVydmFscy5yZWR1Y2UoKGFjYywgY3VycikgPT4gKGFjYyArIGN1cnIpLCAwKTtcbiAgICBjb25zdCBtaWxsaXNlY29uZHMgPSB0aW1lUGFzc2VkICUgMTAwMDtcbiAgICByZXR1cm4gbWlsbGlzZWNvbmRzO1xuICB9XG5cbiAgZ2V0U2Vjb25kcygpIHtcbiAgICBjb25zdCB0aW1lUGFzc2VkID0gdGhpcy5pbnRlcnZhbHMucmVkdWNlKChhY2MsIGN1cnIpID0+IChhY2MgKyBjdXJyKSwgMCk7XG4gICAgY29uc3Qgc2Vjb25kcyA9IE1hdGguZmxvb3IoKHRpbWVQYXNzZWQgJSA2MDAwMCkgLyAxMDAwKTtcbiAgICByZXR1cm4gc2Vjb25kcztcbiAgfVxuXG4gIGdldE1pbnV0ZXMoKSB7XG4gICAgY29uc3QgdGltZVBhc3NlZCA9IHRoaXMuaW50ZXJ2YWxzLnJlZHVjZSgoYWNjLCBjdXJyKSA9PiAoYWNjICsgY3VyciksIDApO1xuICAgIGNvbnN0IG1pbnV0ZXMgPSBNYXRoLmZsb29yKCh0aW1lUGFzc2VkICUgKDYwICogNjAwMDApKSAvIDYwMDAwKTtcbiAgICByZXR1cm4gbWludXRlcztcbiAgfVxuXG4gIGdldEhvdXJzKCkge1xuICAgIGNvbnN0IHRpbWVQYXNzZWQgPSB0aGlzLmludGVydmFscy5yZWR1Y2UoKGFjYywgY3VycikgPT4gKGFjYyArIGN1cnIpLCAwKTtcbiAgICBjb25zdCBob3VycyA9IE1hdGguZmxvb3IodGltZVBhc3NlZCAvICg2MCAqIDYwMDAwKSk7XG4gICAgcmV0dXJuIGhvdXJzO1xuICB9XG5cbiAgY3JlYXRlRWxlbWVudCh0YWcpIHtcbiAgICB0aGlzLkRPTUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XG4gICAgdGhpcy51cGRhdGVFbGVtZW50KCk7XG4gICAgcmV0dXJuIHRoaXMuRE9NRWxlbWVudDtcbiAgfVxuXG4gIHVwZGF0ZUVsZW1lbnQoKSB7XG4gICAgaWYgKHRoaXMuRE9NRWxlbWVudCkge1xuICAgICAgdGhpcy5ET01FbGVtZW50LnRleHRDb250ZW50ID0gdGhpcy5nZXRUaW1lKCk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgJy4vc3R5bGUuY3NzJztcbmltcG9ydCBUaW1lciBmcm9tICcuL1RpbWVyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2VtUHV6emxlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy50aW1lciA9IG5ldyBUaW1lcigpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzaXplOiA0LFxuICAgICAgdGlsZXM6IFtdLFxuICAgICAgbW92ZXM6IDAsXG4gICAgICBpc1NvbHZlZDogZmFsc2UsXG4gICAgfTtcblxuICAgIHRoaXMuc3RhdGVQcm94eSA9IG5ldyBQcm94eSh0aGlzLnN0YXRlLCB7XG4gICAgICBzZXQ6ICh0YXJnZXQsIHByb3AsIHZhbHVlLCByZWNlaXZlcikgPT4ge1xuICAgICAgICBpZiAocHJvcCA9PT0gJ21vdmVzJykge1xuICAgICAgICAgIHRoaXMuZWxlbWVudHMubW92ZUNvdW50ZXIudGV4dENvbnRlbnQgPSBgTW92ZXM6ICR7dmFsdWV9YDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm9wID09PSAnc2l6ZScpIHtcbiAgICAgICAgICBSZWZsZWN0LnNldCh0YXJnZXQsIHByb3AsIHZhbHVlLCByZWNlaXZlcik7XG4gICAgICAgICAgdGhpcy5zdGFydE5ld0dhbWUoKTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBSZWZsZWN0LnNldCh0YXJnZXQsIHByb3AsIHZhbHVlLCByZWNlaXZlcik7XG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgdGhpcy5ldmVudExpc3RlbmVycyA9IHtcbiAgICAgIHRpbGVPbmNsaWNrOiAoZXZlbnQpID0+IHtcbiAgICAgICAgY29uc3QgeyB0aWxlcywgc2l6ZSB9ID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aWxlcy5tYXAoKHRpbGUpID0+IHRpbGUuZWxlbWVudCkuaW5kZXhPZihldmVudC50YXJnZXQpO1xuXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmlzU29sdmVkKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLnRpbWVyLmFjdGl2ZSkge1xuICAgICAgICAgIHRoaXMudGltZXIuc3RhcnQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgICAgIGNhc2UgdGlsZXNbaW5kZXggLSAxXSAmJiB0aWxlc1tpbmRleCAtIDFdLmlkID09PSAtMSAmJiBpbmRleCAlIHNpemUgIT09IDA6XG4gICAgICAgICAgICBbdGlsZXNbaW5kZXhdLCB0aWxlc1tpbmRleCAtIDFdXSA9IFt0aWxlc1tpbmRleCAtIDFdLCB0aWxlc1tpbmRleF1dO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZVByb3h5Lm1vdmVzICs9IDE7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIHRpbGVzW2luZGV4ICsgMV0gJiYgdGlsZXNbaW5kZXggKyAxXS5pZCA9PT0gLTEgJiYgaW5kZXggJSBzaXplICE9PSBzaXplIC0gMTpcbiAgICAgICAgICAgIFt0aWxlc1tpbmRleF0sIHRpbGVzW2luZGV4ICsgMV1dID0gW3RpbGVzW2luZGV4ICsgMV0sIHRpbGVzW2luZGV4XV07XG4gICAgICAgICAgICB0aGlzLnN0YXRlUHJveHkubW92ZXMgKz0gMTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgdGlsZXNbaW5kZXggLSBzaXplXSAmJiB0aWxlc1tpbmRleCAtIHNpemVdLmlkID09PSAtMTpcbiAgICAgICAgICAgIFt0aWxlc1tpbmRleF0sIHRpbGVzW2luZGV4IC0gc2l6ZV1dID0gW3RpbGVzW2luZGV4IC0gc2l6ZV0sIHRpbGVzW2luZGV4XV07XG4gICAgICAgICAgICB0aGlzLnN0YXRlUHJveHkubW92ZXMgKz0gMTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgdGlsZXNbaW5kZXggKyBzaXplXSAmJiB0aWxlc1tpbmRleCArIHNpemVdLmlkID09PSAtMTpcbiAgICAgICAgICAgIFt0aWxlc1tpbmRleF0sIHRpbGVzW2luZGV4ICsgc2l6ZV1dID0gW3RpbGVzW2luZGV4ICsgc2l6ZV0sIHRpbGVzW2luZGV4XV07XG4gICAgICAgICAgICB0aGlzLnN0YXRlUHJveHkubW92ZXMgKz0gMTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlbmRlclRpbGVzKCk7XG4gICAgICAgIHRoaXMuY2hlY2tTdGF0ZSgpO1xuICAgICAgfSxcbiAgICB9O1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLmNyZWF0ZUVsZW1lbnRzKCk7XG4gICAgdGhpcy5nZW5lcmF0ZVRpbGVzKCk7XG4gICAgdGhpcy5zdGFydE5ld0dhbWUoKTtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50cy5jb250YWluZXI7XG4gIH1cblxuICBzdGFydE5ld0dhbWUoKSB7XG4gICAgdGhpcy5zdGF0ZS5pc1NvbHZlZCA9IGZhbHNlO1xuICAgIHRoaXMuc3RhdGVQcm94eS5tb3ZlcyA9IDA7XG4gICAgdGhpcy50aW1lci5yZXNldCgpO1xuICAgIHRoaXMuc2h1ZmZsZVRpbGVzKCk7XG4gICAgdGhpcy5yZW5kZXJUaWxlcygpO1xuICAgIHRoaXMuZWxlbWVudHMuYm9hcmQuc3R5bGUuZ3JpZFRlbXBsYXRlQ29sdW1ucyA9IGByZXBlYXQoJHt0aGlzLnN0YXRlLnNpemV9LCAxZnIpYDtcbiAgfVxuXG4gIGdlbmVyYXRlVGlsZXMoKSB7XG4gICAgY29uc3QgdGlsZUFtb3VudCA9IHRoaXMuc3RhdGUuc2l6ZSAqKiAyO1xuICAgIGNvbnN0IHRpbGVzID0gW107XG4gICAgY29uc3QgZW1wdHlUaWxlID0ge1xuICAgICAgaWQ6IC0xLFxuICAgICAgZWxlbWVudDogZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXG4gICAgfTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGlsZUFtb3VudCAtIDE7IGkgKz0gMSkge1xuICAgICAgY29uc3QgdGlsZSA9IHsgfTtcbiAgICAgIHRpbGUuaWQgPSBpICsgMTtcbiAgICAgIHRpbGUuZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgdGlsZS5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2dlbS1wdXp6bGVfX3RpbGUnKTtcbiAgICAgIHRpbGUuZWxlbWVudC50ZXh0Q29udGVudCA9IHRpbGUuaWQ7XG4gICAgICB0aWxlcy5wdXNoKHRpbGUpO1xuXG4gICAgICB0aWxlLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmV2ZW50TGlzdGVuZXJzLnRpbGVPbmNsaWNrKTtcbiAgICB9XG5cbiAgICB0aWxlcy5wdXNoKGVtcHR5VGlsZSk7XG4gICAgdGhpcy5zdGF0ZS50aWxlcyA9IHRpbGVzO1xuICB9XG5cbiAgcmVuZGVyVGlsZXMoKSB7XG4gICAgY29uc3QgeyB0aWxlcyB9ID0gdGhpcy5zdGF0ZTtcbiAgICB0aWxlcy5mb3JFYWNoKCh0aWxlKSA9PiB7XG4gICAgICB0aGlzLmVsZW1lbnRzLmJvYXJkLmFwcGVuZCh0aWxlLmVsZW1lbnQpO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gbW92ZVRpbGUodGlsZUluZGV4MSwgdGlsZUluZGV4Mikge1xuICAvLyAgIGNvbnN0IHRpbGVzID0gdGhpcy5zdGF0ZS50aWxlcztcbiAgLy8gICBjb25zdCBuZXh0U2libGluZyA9IHRpbGUyLm5leHRTaWJsaW5nO1xuICAvLyAgIGNvbnN0IHByZXZTaWJsaW5nID0gdGlsZTIucHJldmlvdXNTaWJsaW5nO1xuICAvLyAgIGNvbnN0IHBhcmVudCA9IHRpbGUyLnBhcmVudEVsZW1lbnQ7XG4gIC8vICAgdGlsZTEucmVwbGFjZVdpdGgodGlsZTIpO1xuXG4gIC8vICAgaWYgKG5leHRTaWJsaW5nKSB7XG4gIC8vICAgICBuZXh0U2libGluZy5iZWZvcmUodGlsZTEpO1xuICAvLyAgIH0gZWxzZSBpZiAocHJldlNpYmxpbmcpIHtcbiAgLy8gICAgIHByZXZTaWJsaW5nLmFmdGVyKHRpbGUxKTtcbiAgLy8gICB9IGVsc2Uge1xuICAvLyAgICAgcGFyZW50LmFwcGVuZCh0aWxlMSk7XG4gIC8vICAgfVxuXG4gIC8vICAgW3RpbGVzW2ldLCB0aWxlc1tpIC0gMV1dID0gW3RpbGVzW2kgLSAxXSwgdGlsZXNbaV1dO1xuICAvLyB9XG5cbiAgY2hlY2tTdGF0ZSgpIHtcbiAgICBjb25zdCB0aWxlSWRzID0gdGhpcy5zdGF0ZS50aWxlcy5tYXAoKHRpbGUpID0+IHRpbGUuaWQpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgKyAyIDwgdGlsZUlkcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKHRpbGVJZHNbaSArIDFdICE9PSB0aWxlSWRzW2ldICsgMSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy50aW1lci5wYXVzZSgpO1xuICAgIHRoaXMuc3RhdGUuaXNTb2x2ZWQgPSB0cnVlO1xuXG4gICAgLy8gc2V0VGltZW91dCB0byBmaXJlIGFsZXJ0IG9uY2UgdGhlIGV2ZW50IGxvb3AgaXMgZW1wdHlcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGFsZXJ0KGBZb3Ugc29sdmVkIHRoZSBwdXp6bGUgaW4gJHt0aGlzLnRpbWVyLmdldFRpbWUoKX0gYW5kIG1hZGUgJHt0aGlzLnN0YXRlLm1vdmVzfSBtb3Zlcy5cXG5Tb3JyeSBmb3IgdGhlIGFsZXJ0LCB3b3JrIGluIHByb2dyZXNzLmApO1xuICAgIH0sIDApO1xuICB9XG5cbiAgc2h1ZmZsZVRpbGVzKCkge1xuICAgIGNvbnN0IHRpbGVBbW91bnQgPSB0aGlzLnN0YXRlLnNpemUgKiogMjtcbiAgICBjb25zdCB7IHRpbGVzIH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aWxlQW1vdW50OyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IHJhbmRvbVRpbGUgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aWxlQW1vdW50KTtcbiAgICAgIFt0aWxlc1tpXSwgdGlsZXNbcmFuZG9tVGlsZV1dID0gW3RpbGVzW3JhbmRvbVRpbGVdLCB0aWxlc1tpXV07XG4gICAgfVxuXG4gICAgLy8gU2h1ZmZsZSB1bnRpbCBzb2x2YWJsZSBjb21iaW5hdGlvbiBpcyBmb3VuZFxuICAgIGlmICghdGhpcy5pc1NvbHZhYmxlKCkpIHRoaXMuc2h1ZmZsZVRpbGVzKCk7XG4gIH1cblxuICBpc1NvbHZhYmxlKCkge1xuICAgIGNvbnN0IHsgdGlsZXMsIHNpemUgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgdGlsZUlkcyA9IHRpbGVzLm1hcCgodGlsZSkgPT4gdGlsZS5pZCk7XG4gICAgY29uc3QgZW1wdHlUaWxlSW5kZXggPSB0aWxlSWRzLmluZGV4T2YoLTEpO1xuICAgIGNvbnN0IGVtcHR5VGlsZVJvdyA9IE1hdGguY2VpbCgoZW1wdHlUaWxlSW5kZXggKyAxKSAvIHNpemUpO1xuICAgIGxldCBpbnZlcnNpb25zID0gMDtcblxuICAgIC8vIENvdW50IGludmVyc2lvbnNcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRpbGVJZHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGlmICh0aWxlSWRzW2ldICE9PSAtMSkge1xuICAgICAgICBmb3IgKGxldCBqID0gaTsgaiA8IHRpbGVJZHMubGVuZ3RoOyBqICs9IDEpIHtcbiAgICAgICAgICBpZiAodGlsZUlkc1tpXSA+IHRpbGVJZHNbal0gJiYgdGlsZUlkc1tqXSAhPT0gLTEpIHtcbiAgICAgICAgICAgIGludmVyc2lvbnMgKz0gMTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBJZiBOIGlzIG9kZCwgdGhlbiBwdXp6bGUgaW5zdGFuY2UgaXMgc29sdmFibGUgaWYgbnVtYmVyIG9mIGludmVyc2lvbnMgaXMgZXZlbi5cbiAgICBpZiAoc2l6ZSAlIDIgPT09IDEgJiYgaW52ZXJzaW9ucyAlIDIgPT09IDApIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGlmIChzaXplICUgMiA9PT0gMCkge1xuICAgICAgaWYgKGVtcHR5VGlsZVJvdyAlIDIgPT09IDEgJiYgaW52ZXJzaW9ucyAlIDIgPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBpZiAoZW1wdHlUaWxlUm93ICUgMiA9PT0gMCAmJiBpbnZlcnNpb25zICUgMiA9PT0gMCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjcmVhdGVFbGVtZW50cygpIHtcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCBzdGF0dXNCYXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCBib2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IHRpbWVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGNvbnN0IG1vdmVDb3VudGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGNvbnN0IG5ld0dhbWVCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcblxuICAgIC8vIE1haW4gZWxlbWVudHMgc2V0dXBcbiAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgnZ2VtLXB1enpsZScpO1xuICAgIHN0YXR1c0Jhci5jbGFzc0xpc3QuYWRkKCdnZW0tcHV6emxlX19zdGF0dXMtYmFyJyk7XG4gICAgYm9hcmQuY2xhc3NMaXN0LmFkZCgnZ2VtLXB1enpsZV9fYm9hcmQnKTtcbiAgICBib2FyZC5zdHlsZS5ncmlkVGVtcGxhdGVDb2x1bW5zID0gYHJlcGVhdCgke3RoaXMuc3RhdGUuc2l6ZX0sIDFmcilgO1xuXG4gICAgLy8gVGltZXIgc2V0dXBcbiAgICB0aW1lci50ZXh0Q29udGVudCA9ICdUaW1lcjogJztcbiAgICB0aW1lci5hcHBlbmQodGhpcy50aW1lci5jcmVhdGVFbGVtZW50KCd0aW1lJykpO1xuXG4gICAgLy8gTW92ZSBjb3VudGVyIHNldHVwXG4gICAgbW92ZUNvdW50ZXIudGV4dENvbnRlbnQgPSAnTW92ZXM6IDAnO1xuXG4gICAgLy8gTmV3IGdhbWUgYnV0dG9uIHNldHVwXG4gICAgbmV3R2FtZUJ0bi50eXBlID0gJ2J1dHRvbic7XG4gICAgbmV3R2FtZUJ0bi5jbGFzc0xpc3QuYWRkKCdnZW0tcHV6emxlX19idXR0b24nKTtcbiAgICBuZXdHYW1lQnRuLnRleHRDb250ZW50ID0gJ05ldyBnYW1lJztcbiAgICBuZXdHYW1lQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgdGhpcy5zdGFydE5ld0dhbWUoKTtcbiAgICB9KTtcblxuICAgIHN0YXR1c0Jhci5hcHBlbmQodGltZXIsIG5ld0dhbWVCdG4sIG1vdmVDb3VudGVyKTtcbiAgICBjb250YWluZXIuYXBwZW5kKHN0YXR1c0JhciwgYm9hcmQpO1xuXG4gICAgdGhpcy5lbGVtZW50cyA9IHtcbiAgICAgIGNvbnRhaW5lcixcbiAgICAgIHN0YXR1c0JhcixcbiAgICAgIGJvYXJkLFxuICAgICAgdGltZXIsXG4gICAgICBtb3ZlQ291bnRlcixcbiAgICB9O1xuICB9XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvcHJlZmVyLWRlZmF1bHQtZXhwb3J0ICovXG5mdW5jdGlvbiBhcHBlbmRaZXJvKG51bSkge1xuICByZXR1cm4gbnVtIDwgMTAgPyBgMCR7bnVtfWAgOiBgJHtudW19YDtcbn1cblxuZXhwb3J0IHtcbiAgYXBwZW5kWmVybyxcbn07XG4iLCJpbXBvcnQgJy4vc3R5bGUuY3NzJztcbmltcG9ydCBHZW1QdXp6bGUgZnJvbSAnLi9nZW0tcHV6emxlL2dlbS1wdXp6bGUnO1xuXG5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgncGFnZScpO1xuZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdwYWdlX19pbm5lcicpO1xuXG5jb25zdCBnZW1QdXp6bGUgPSBuZXcgR2VtUHV6emxlKCk7XG5jb25zdCBnZW1QdXp6bGVFbGVtZW50ID0gZ2VtUHV6emxlLmluaXQoKTtcbmRvY3VtZW50LmJvZHkuYXBwZW5kKGdlbVB1enpsZUVsZW1lbnQpO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0aWYoX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSkge1xuXHRcdHJldHVybiBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlXG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXguanNcIik7XG4vLyBUaGlzIGVudHJ5IG1vZHVsZSB1c2VkICdleHBvcnRzJyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG4iXSwic291cmNlUm9vdCI6IiJ9