// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const datetimePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('#start-button');
// const timer = document.querySelector('.timer');
let intervalId = null;
let userSelectedDate = null;
startButton.disabled = true;
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (Date.now() < selectedDates[0].getTime()) {
      userSelectedDate = selectedDates[0];
      startButton.disabled = false;
    } else {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
        messageColor: '#fff',
        backgroundColor: '#ef4040',
        iconColor: '#fff;',
        titleColor: '#fff',
        close: true,
        closeColor: '#fff',
      });
    }
  },
};
flatpickr(datetimePicker, options);

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

startButton.addEventListener('click', () => {
  intervalId = setInterval(() => {
    startButton.disabled = true;
    const elapsedMs = userSelectedDate.getTime() - Date.now();
    if (elapsedMs > 0) {
      const formatedTime = convertMs(elapsedMs);

      const { days, hours, minutes, seconds } = formatedTime;

      dataDays.textContent = addLeadingZero(days);
      dataHours.textContent = addLeadingZero(hours);
      dataMinutes.textContent = addLeadingZero(minutes);
      dataSeconds.textContent = addLeadingZero(seconds);
    } else {
      //  elapsedMs <= 0
      dataDays.textContent = '00';
      dataHours.textContent = '00';
      dataMinutes.textContent = '00';
      dataSeconds.textContent = '00';

      iziToast.success({
        title: 'Done',
        message: 'Countdown finished!',
        position: 'topRight',
      });

      clearInterval(intervalId);
      startButton.disabled = false;
      datetimePicker.disabled = false;
      userSelectedDate = null;
    }
  }, 1000);
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
