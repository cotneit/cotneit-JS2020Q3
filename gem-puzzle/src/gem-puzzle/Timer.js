import { appendZero } from './utils';

export default class Timer {
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
    const hours = appendZero(this.getHours());
    const minutes = appendZero(this.getMinutes());
    const seconds = appendZero(this.getSeconds());

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
