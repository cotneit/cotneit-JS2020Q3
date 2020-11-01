const app = document.querySelector('.app');
const timeElement = document.querySelector('.time');
const dateElement = document.querySelector('.date');
const greetingElement = document.querySelector('.greeting');
const nameElement = document.querySelector('.name');
const focusElement = document.querySelector('.focus');
const buttonBgNext = document.querySelector('.button--bg-next');
const buttonBgPrev = document.querySelector('.button--bg-prev');
const quote = document.querySelector('.quote__quote');
const quoteAuthor = document.querySelector('.quote__author');
const buttonNewQuote = document.querySelector('.quote__button');
const cityElement = document.querySelector('.weather__city');
const weatherElement = document.querySelector('.weather');
const weatherIcon = document.querySelector('.weather__icon');
const weatherTemperature = document.querySelector('.weather__temperature');
const weatherHumidity = document.querySelector('.weather__humidity');
const weatherWindSpeed = document.querySelector('.weather__wind-speed');
const weatherInner = document.querySelector('.weather__inner');
const weatherError = document.querySelector('.weather__error');


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

function populateBackgrounds() {
  const date = new Date();
  dailyBackgroundImages.length = 0; // clearing array
  let imagePath;

  for (let i = 0; i < 24; i++) {
    date.setHours(i);
    do {
      imagePath = `./images/${getTimeOfDay(date)}/${appendZero(getRandomInt(1, 20))}.jpg`
    } while (dailyBackgroundImages.includes(imagePath));

    dailyBackgroundImages.push(imagePath);
  }
  console.log('Updated backgrounds!');
}

function setBackgroundImage(imagePath) {
  const img = document.createElement('img');
  img.src = imagePath;
  img.onload = () => {
    app.style.backgroundImage = `url(${imagePath})`;
  }
}

function updateBackgroundImage() {
  const hour = today.getHours();
  setBackgroundImage(dailyBackgroundImages[hour]);
  currentBackgroundIndex = hour;

  // Handle background control buttons
  if (currentBackgroundIndex <= 0) {
    buttonBgPrev.classList.add('button--disabled');
  } else {
    buttonBgPrev.classList.remove('button--disabled');
  }
  
  if (currentBackgroundIndex >= dailyBackgroundImages.length - 1) {
    buttonBgNext.classList.add('button--disabled');
  } else {
    buttonBgNext.classList.remove('button--disabled');
  }

  const msTillNextHour = today.getMilliseconds() + today.getSeconds() * 1000 + today.getMinutes() * 60 * 1000;

  setTimeout(() => {
    if (hour === 23) {
      populateBackgrounds();
    }
    updateBackgroundImage();
  }, 60 * 60 * 1000 - msTillNextHour);
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

async function loadQuotes() {
  if (localStorage.getItem('quotes') === null) {
    const url = 'https://type.fit/api/quotes';
    const res = await fetch(url);
    const data = await res.json();
    localStorage.setItem('quotes', JSON.stringify(data));
    quotes = data;
    return;
  }
  quotes = JSON.parse(localStorage.getItem('quotes'));
}

function updateQuote() {
  const randomQuote = quotes[getRandomInt(0, quotes.length - 1)];
  quote.textContent = randomQuote.text;
  quoteAuthor.textContent = randomQuote.author;
}

async function updateWeather() {
  const city = localStorage.getItem('city'); 
  if (city !== null) {
    cityElement.textContent = city;
  } else {
    weatherElement.classList.add('weather--inactive');
    return;
  }

  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ce705e5566c6dfb9d6b2df26e5633ef4&units=metric&lang=en`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    weatherIcon.className = `weather__icon owf owf-${data.weather[0].id} owf-3x owf-border`
    weatherTemperature.textContent = data.main.temp;
    weatherHumidity.textContent = data.main.humidity;
    weatherWindSpeed.textContent = data.wind.speed;
    weatherElement.classList.remove('weather--inactive');
    weatherError.classList.remove('weather__error--visible');
    console.log(data);
  } catch (e) {
    console.log('Error!')
    weatherElement.classList.add('weather--inactive');
    weatherError.classList.add('weather__error--visible');
  }
}

let today;
let currentBackgroundIndex;
let quotes;

const dailyBackgroundImages = [];
updateTime();
populateBackgrounds();
updateGreeting();
updateName();
updateFocus();
updateBackgroundImage();
updateWeather();

(async () => {
  await loadQuotes();
  updateQuote();
})();

/* Name handlers */
nameElement.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.target.blur();
  }
})

nameElement.addEventListener('focus', (event) => {
  event.target.style.minWidth = `${event.target.clientWidth}px`;
  event.target.textContent = '';
})

nameElement.addEventListener('blur', (event) => {
  updateName(event);
})

/* Focus handlers */
focusElement.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.target.blur();
  }
})

focusElement.addEventListener('focus', (event) => {
  event.target.textContent = '';
})

focusElement.addEventListener('blur', (event) => {
  updateFocus(event);
})

/* City handlers */
cityElement.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.target.blur();
  }
})

cityElement.addEventListener('focus', (event) => {
  event.target.style.minWidth = `${event.target.clientWidth}px`;
  event.target.textContent = '';
})

cityElement.addEventListener('blur', () => {
  if (cityElement.textContent === localStorage.getItem('city')) {
    return;
  }

  cityElement.style.minWidth = '';

  if (cityElement.textContent.trim() === '') {
    cityElement.textContent = localStorage.getItem('city');
    return;
  }

  localStorage.setItem('city', cityElement.textContent.trim());
  updateWeather();
  weatherInner.classList.remove('.weather--inactive');
})

/* Background controls */
buttonBgPrev.addEventListener('click', () => {
  if (buttonBgPrev.classList.contains('button--disabled')) {
    return;
  }

  const prevBackgroundIndex = currentBackgroundIndex - 1;

  if (prevBackgroundIndex >= 0) {
    const backgroundPath = dailyBackgroundImages[prevBackgroundIndex];
    setBackgroundImage(backgroundPath);
    currentBackgroundIndex--;

    buttonBgNext.classList.remove('button--disabled');
  }

  buttonBgPrev.classList.add('button--disabled');

  if (currentBackgroundIndex > 0) {
    setTimeout(() => {
      buttonBgPrev.classList.remove('button--disabled');
    }, 500)
  }
})

buttonBgNext.addEventListener('click', () => {
  if (buttonBgNext.classList.contains('button--disabled')) {
    return;
  }

  const nextBackgroundIndex = currentBackgroundIndex + 1;

  if (nextBackgroundIndex < dailyBackgroundImages.length) {
    const backgroundPath = dailyBackgroundImages[nextBackgroundIndex];
    setBackgroundImage(backgroundPath);
    currentBackgroundIndex++;

    buttonBgPrev.classList.remove('button--disabled');
  }

  buttonBgNext.classList.add('button--disabled');

  if (currentBackgroundIndex < dailyBackgroundImages.length - 1) {
    setTimeout(() => {
      buttonBgNext.classList.remove('button--disabled');
    }, 500)
  }
})

buttonNewQuote.addEventListener('click', () => {
  updateQuote();
})
