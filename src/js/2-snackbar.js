import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const refs = {
  form: document.querySelector('.form'),
  submitBtn: document.querySelector('.form button'),
};

function checkFormValidity() {
  const delayVal = refs.form.elements.delay.value;
  const stateVal = refs.form.elements.state.value;
  return delayVal.trim() !== "" && stateVal.trim() !== "";
}

function updateButtonStatus() {
  refs.submitBtn.disabled = !checkFormValidity();
}

updateButtonStatus();
refs.form.addEventListener('input', updateButtonStatus);

refs.form.addEventListener('submit', e => {
  e.preventDefault();
  const form = e.currentTarget;
  const delay = Number(form.elements.delay.value);
  const state = form.elements.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay => {
      console.log(`✅ Fulfilled promise in ${delay}ms`);
      iziToast.success({
        title: 'Success',
        message: `Fulfilled promise in ${delay}ms`,
        position: 'bottomCenter'
      });
    })
    .catch(delay => {
      console.log(`❌ Rejected promise in ${delay}ms`);
      iziToast.error({
        title: 'Error',
        message: `Rejected promise in ${delay}ms`,
        position: 'bottomCenter'
      });
    });
});
