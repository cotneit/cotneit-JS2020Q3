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

function updateGreeting() {
  const hours = today.getHours();
  let greeting;

  if (hours < 6) {
    greeting = 'Good night, ';
  } else if (hours < 12) {
    greeting = 'Good morning, ';
  } else if (hours < 18) {
    greeting = 'Good afternoon, ';
  } else {
    greeting = 'Good evening, ';
  }

  greetingElement.textContent = greeting;
}

function upgradeBackground() {

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
