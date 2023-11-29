
// const hoursEl = document.getElementById('hours');
// const minsEL = document.getElementById('mins');
// const newYears = document.querySelector('.text-white').getAttribute('data-time');
// function countdown() {
//   const newYearsDate = new Date(newYears);
//   const currentDate = new Date();
//   const totalSeconds = (newYearsDate - currentDate) / 1000;
//   const minutes = Math.floor(totalSeconds / 60) % 60;
//   const hours = Math.floor(totalSeconds / 3600) % 24;
//   hoursEl.innerText = hours;
//   minsEL.innerText = minutes;
// }
// setInterval(countdown, 1000);

const hoursEl = document.getElementById('hours');
const minsEl = document.getElementById('mins');
const newYears = document.querySelector('.text-white').getAttribute('data-time');

function countdown() {
  const newYearsDate = new Date(newYears);
  const currentDate = new Date();

  // Check if the target date has already passed
  if (newYearsDate < currentDate) {
    // If so, set the target date to next year or some future date
    newYearsDate.setFullYear(currentDate.getFullYear() + 1);
  }

  const totalSeconds = Math.floor((newYearsDate - currentDate) / 1000);
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const hours = Math.floor(totalSeconds / 3600) % 24;

  hoursEl.innerText = hours;
  minsEl.innerText = minutes;
}

setInterval(countdown, 1000);
countdown(); // Initial call to set the countdown immediately
