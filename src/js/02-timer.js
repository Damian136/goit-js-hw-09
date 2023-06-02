"use strict"
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const dateTimePicker = document.getElementById("datetime-picker");
const startBtn = document.querySelector("button[data-start]");
const daysValue = document.querySelector("span[data-days]");
const hoursValue = document.querySelector("span[data-hours]");
const minutesValue = document.querySelector("span[data-minutes]");
const secondsValue = document.querySelector("span[data-seconds]");

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate < new Date()) {
      alert("Please choose a date in the future");
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr(dateTimePicker, options);

function countDown() {
  const selectedDate = new Date(dateTimePicker.value);
  const currentDate = new Date();
  const diff = selectedDate - currentDate;
  if (diff < 0) {
    clearInterval(intervalId);
    return;
  }
  const { days, hours, minutes, seconds } = convertMs(diff);
  daysValue.textContent = days;
  hoursValue.textContent = hours;
  minutesValue.textContent = minutes;
  secondsValue.textContent = seconds;
}

let intervalId;
startBtn.addEventListener("click", () => {
  intervalId = setInterval(countDown, 1000);
});

function convertMs(ms) {
// Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

// Remaining days
  const days = Math.floor(ms / day);
// Remaining hours
  const hours = Math.floor((ms % day) / hour);
// Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
// Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000));// {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000));// {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000));// {days: 0, hours: 6 minutes: 42, seconds: 20}