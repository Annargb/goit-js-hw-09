import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

let id = null;

const btnStart = document.querySelector('button[data-start]');
btnStart.disabled = true;

const input = document.getElementById('datetime-picker');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    // const differences = selectedDates[0] - options.defaultDate;
    // localStorage.setItem('differencesTime', differences);
    localStorage.setItem('selectedDate', selectedDates[0]);
    if (selectedDates[0] < options.defaultDate) {
      alert('Please choose a date in the future');
    } else {
      btnStart.disabled = false;
    }
  },
};

const fp = flatpickr(input, options);

const timer = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const selectedDate = new Date(localStorage.getItem('selectedDate'));
const selectedSecondsDate = selectedDate.getTime();
console.log(selectedSecondsDate);

btnStart.addEventListener('click', onBtnStartClick);

function onBtnStartClick() {
  //   updateTime();
  id = setInterval(updateTime, 1000);
}

function updateTime() {
  const currentDate = Date.now();
  let differences = selectedSecondsDate - currentDate - 1000;
  if (differences > 0) {
    const timerTime = convertMs(differences);

    timer.days.textContent = addLeadingZero(timerTime.days);
    timer.hours.textContent = addLeadingZero(timerTime.hours);
    timer.minutes.textContent = addLeadingZero(timerTime.minutes);
    timer.seconds.textContent = addLeadingZero(timerTime.seconds);
  } else {
    clearInterval(id);
  }
}

// let currentDifferenceTime = Number(localStorage.getItem('differencesTime'));
// function updateTime() {
//   //   currentDifferenceTime -= 1000;
//   let newUpdatedTime = currentDifferenceTime - 1000;
//   const timerTime = convertMs(newUpdatedTime);

//   timer.days.textContent = addLeadingZero(timerTime.days);
//   timer.hours.textContent = addLeadingZero(timerTime.hours);
//   timer.minutes.textContent = addLeadingZero(timerTime.minutes);
//   timer.seconds.textContent = addLeadingZero(timerTime.seconds);

//   if (newUpdatedTime < 0) {
//     clearInterval(id);
//   }
// }

// function onBtnStartClick() {
//   //   updateTime(currentDifferenceTime);
//   id = setInterval(updateTime, 1000);
// }

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
