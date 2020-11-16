import './style.css';
import GemPuzzle from './gem-puzzle/gem-puzzle';

document.documentElement.classList.add('page');
document.body.classList.add('page__inner');

const gemPuzzle = new GemPuzzle();
const gemPuzzleElement = gemPuzzle.init();
document.body.append(gemPuzzleElement);
