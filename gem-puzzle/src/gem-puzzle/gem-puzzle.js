import './style.css';
import Timer from './Timer';

export default class GemPuzzle {
  constructor() {
    this.timer = new Timer();
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
