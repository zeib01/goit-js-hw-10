// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('form');
const delayInput = form.querySelector('input[name="delay"]');

form.addEventListener('submit', event => {
  event.preventDefault();
  console.log('Submit pressed');
  console.log(`Delay value: ${delayInput.value}`);

  const delayValue = delayInput.value;
  const selectedRadio = form.querySelector('input[name="state"]:checked');
  const isFulfilled = selectedRadio.value === 'fulfilled';

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isFulfilled) resolve(delayValue);
      else reject(delayValue);
    }, delayValue);
  });

  promise
    .then(delay => {
      //console.log(`✅ Fulfilled promise in ${delay}ms`);
      iziToast.success({
        title: 'Fulfilled',
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
      });
    })
    .catch(delay => {
      //console.log(`❌ Rejected promise in ${delay}ms`);
      iziToast.error({
        title: 'Rejected',
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
      });
    });
});
