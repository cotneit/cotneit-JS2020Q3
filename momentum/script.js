const app = document.querySelector('.app');
const timeElement = document.querySelector('.time');
const dateElement = document.querySelector('.date');
const greetingElement = document.querySelector('.greeting');
const nameElement = document.querySelector('.name');
const focusElement = document.querySelector('.focus');

let today;

function updateTime() {
  today = new Date();

  const date = today.toLocaleDateString('en-US', {dateStyle: 'full'});
  const time = today.toLocaleTimeString('en-US', {hourCycle: 'h23'});
  const milliseconds = today.getMilliseconds()

  timeElement.textContent = time;
  dateElement.textContent = date;

  // updates once next second passes
  setTimeout(updateTime, 1000 - milliseconds);
}

function getTimeOfDay(date) {
  const hours = date.getHours();
  let timeOfDay;

  if (hours < 6) {
    timeOfDay = 'night';
  } else if (hours < 12) {
    timeOfDay = 'morning';
  } else if (hours < 18) {
    timeOfDay = 'afternoon';
  } else {
    timeOfDay = 'evening';
  }

  return timeOfDay;
}

function updateGreeting() {
  const greeting = `Good ${getTimeOfDay(today)}, `;

  greetingElement.textContent = greeting;

  setTimeout(updateGreeting, 60 * 60 * 1000 - today.getMilliseconds() - today.getSeconds() * 1000 - today.getMinutes() * 60 * 1000)
}

function appendZero(number) {
  return +number > 9 ? `${number}` : `0${number}`;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * 20 + 1)
}

function updateBackground() {
  const bgLog = JSON.parse(localStorage.getItem('bgLog')) || [];
  let timeOfDay = getTimeOfDay(today);
  let backgroundPath;

  backgroundPath = `./images/${timeOfDay}/${appendZero(Math.floor(Math.random() * 20 + 1))}.jpg`;
  app.style.backgroundImage = `url(${backgroundPath})`;

  if (bgLog[bgLog.length - 1] !== backgroundPath) {
    bgLog.push(backgroundPath);
  }

  localStorage.setItem('bgLog', JSON.stringify(bgLog));
  
  // setTimeout(updateBackground, 60 * 1000 - today.getMilliseconds() - today.getSeconds() * 1000)

  setTimeout(updateBackground, 60 * 60 * 1000 - today.getMilliseconds() - today.getSeconds() * 1000 - today.getMinutes() * 60 * 1000);
}

function updateName(event) {
  if (!event && localStorage.getItem('name') !== null) {
    nameElement.textContent = localStorage.getItem('name');
    return;
  }

  if (!event && localStorage.getItem('name') === null) {
    nameElement.textContent = '[Enter your name]';
    localStorage.setItem('name', nameElement.textContent);
    return;
  }

  event.target.style.minWidth = '';

  if (event.target.textContent.trim() === '') {
    event.target.textContent = localStorage.getItem('name');
    return;
  }
    
  localStorage.setItem('name', event.target.textContent);
}

function updateFocus(event) {
  if (!event && localStorage.getItem('focus') !== null) {
    focusElement.textContent = localStorage.getItem('focus');
    return;
  }

  if (!event && localStorage.getItem('focus') === null) {
    focusElement.textContent = '[Enter your focus]';
    localStorage.setItem('focus', focusElement.textContent);
    return;
  }

  if (event.target.textContent.trim() === '') {
    event.target.textContent = localStorage.getItem('focus');
    return;
  }
    
  localStorage.setItem('focus', event.target.textContent);
}

nameElement.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    updateName(event);
    event.target.blur();
  }
})

nameElement.addEventListener('focus', (event) => {
  event.target.style.minWidth = `${event.target.clientWidth}px`;
  console.log(event.target.clientWidth);
  console.log(event.target.style.width)
  event.target.textContent = '';
})

nameElement.addEventListener('blur', (event) => {
  updateName(event);
})

focusElement.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    updateFocus(event);
    event.target.blur();
  }
})

focusElement.addEventListener('focus', (event) => {
  event.target.textContent = '';
})

focusElement.addEventListener('blur', (event) => {
  updateFocus(event);
})

updateTime();
updateGreeting();
updateName();
updateFocus();
updateBackground();
