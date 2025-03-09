import iziToast from "izitoast";
import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";
import "izitoast/dist/css/iziToast.min.css";

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  dayValue: document.querySelector('span[data-days]'),
  hourValue: document.querySelector('span[data-hours]'),
  minuteValue: document.querySelector('span[data-minutes]'),
  secondValue: document.querySelector('span[data-seconds]'),
};

refs.startBtn.disabled = true;
let selectedDate = null;
let timerId = null;

function pad(value) {
  return String(value).padStart(2, '0');
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (!selectedDates[0]) {
      selectedDate = null;
      refs.startBtn.disabled = true;
      return;
    }
    selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      refs.startBtn.disabled = true;
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
    } else {
      refs.startBtn.disabled = false;
    }
  },
};

flatpickr("#datetime-picker", options);

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

function updateTimer() {
  const now = new Date();
  const msRemaining = selectedDate - now;
  if (msRemaining <= 0) {
    clearInterval(timerId);
    refs.dayValue.textContent = "00";
    refs.hourValue.textContent = "00";
    refs.minuteValue.textContent = "00";
    refs.secondValue.textContent = "00";
    return;
  }
  const { days, hours, minutes, seconds } = convertMs(msRemaining);
  refs.dayValue.textContent = pad(days);
  refs.hourValue.textContent = pad(hours);
  refs.minuteValue.textContent = pad(minutes);
  refs.secondValue.textContent = pad(seconds);
}

refs.startBtn.addEventListener('click', () => {
  if (!selectedDate || selectedDate <= new Date()) {
    iziToast.error({
      title: 'Error',
      message: 'Please choose a date in the future',
      position: 'bottomCenter'
    });
    return;
  }
  refs.startBtn.disabled = true;
  updateTimer();
  timerId = setInterval(updateTimer, 1000);
});
