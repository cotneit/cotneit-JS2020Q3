const app = document.querySelector('.app');
const timeElement = document.querySelector('.time');
const dateElement = document.querySelector('.date');
const greetingElement = document.querySelector('.greeting');
const nameElement = document.querySelector('.name');
const focusElement = document.querySelector('.focus');
const buttonBgNext = document.querySelector('.button--bg-next');
const buttonBgPrev = document.querySelector('.button--bg-prev');

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

  // Update hourly
  setTimeout(updateGreeting, 60 * 60 * 1000 - today.getMilliseconds() - today.getSeconds() * 1000 - today.getMinutes() * 60 * 1000)
}

function appendZero(number) {
  return +number > 9 ? `${number}` : `0${number}`;
}

function getRandomInt(min, max) {
  // Including min and max
  return Math.floor(Math.random() * max + min)
}

function updateBackground() {
  const bgLog = JSON.parse(localStorage.getItem('bgLog')) || [];
  let timeOfDay = getTimeOfDay(today);
  let backgroundPath;

  do {
    backgroundPath = `./images/${timeOfDay}/${appendZero(Math.floor(getRandomInt(1, 20)))}.jpg`;
  } while (bgLog.includes(backgroundPath) && bgLog.length < 20)

  // app.style.backgroundImage = `url(${backgroundPath})`;
  const img = document.createElement('img');
  img.src = backgroundPath;
  img.onload = () => {      
    app.style.backgroundImage = `url(${backgroundPath})`;
  };

  // Make 'Next background' button inactive
  buttonBgNext.classList.add('button--disabled');

  // Make 'Previous background' button active if it's the second bg
  if (bgCount === 1) {
    buttonBgPrev.classList.remove('button--disabled');
  }

  bgLog.push(backgroundPath);

  localStorage.setItem('bgLog', JSON.stringify(bgLog));
  bgCount = bgLog.length;

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

  nameElement.style.minWidth = '';

  if (nameElement.textContent.trim() === '') {
    nameElement.textContent = localStorage.getItem('name');
    return;
  }
    
  localStorage.setItem('name', nameElement.textContent);
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

  if (focusElement.textContent.trim() === '') {
    focusElement.textContent = localStorage.getItem('focus');
    return;
  }
    
  localStorage.setItem('focus', focusElement.textContent);
}

let today;
let bgCount;

updateTime();
updateGreeting();
updateName();
updateFocus();
updateBackground();

bgCount = JSON.parse(localStorage.getItem('bgLog')).length;

if (bgCount <= 1) {
  buttonBgPrev.classList.add('button--disabled');
}

/* Name handlers */

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

/* Focus handlers */

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

/* Background controls */

buttonBgPrev.addEventListener('click', () => {
  if (buttonBgPrev.classList.contains('button--disabled')) {
    return;
  }

  const bgLog = JSON.parse(localStorage.getItem('bgLog'));

  if (bgCount - 2 >= 0) {
    const backgroundPath = bgLog[bgCount - 2];
    // app.style.backgroundImage = `url(${backgroundPath})`;
    const img = document.createElement('img');
    img.src = backgroundPath;
    img.onload = () => {      
      app.style.backgroundImage = `url(${backgroundPath})`;
    };
    bgCount--;

    buttonBgNext.classList.remove('button--disabled');
  }

  buttonBgPrev.classList.add('button--disabled');

  if (bgCount > 1) {
    setTimeout(() => {
      buttonBgPrev.classList.remove('button--disabled');
    }, 500)
  }
})

buttonBgNext.addEventListener('click', () => {
  if (buttonBgNext.classList.contains('button--disabled')) {
    return;
  }

  const bgLog = JSON.parse(localStorage.getItem('bgLog'));

  if (bgCount < bgLog.length) {
    const backgroundPath = bgLog[bgCount];
    // app.style.backgroundImage = `url(${backgroundPath})`;
    const img = document.createElement('img');
    img.src = backgroundPath;
    img.onload = () => {      
      app.style.backgroundImage = `url(${backgroundPath})`;
    };
    bgCount++;

    buttonBgPrev.classList.remove('button--disabled');
  }

  buttonBgNext.classList.add('button--disabled');

  if (bgCount < bgLog.length) {
    setTimeout(() => {
      buttonBgNext.classList.remove('button--disabled');
    }, 500)
  }
})
