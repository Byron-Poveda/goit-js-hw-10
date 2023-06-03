import { fetchCatByBreed } from './cat-api';
import { fetchSearchCats } from './cat-api';

const loaderMssg = document.querySelector('.loader'),
  errorMssg = document.querySelector('.error'),
  breedSelect = document.getElementById('selectElement');

errorMssg.classList.add('hide');
loaderMssg.classList.remove('hide');
breedSelect.classList.add('hide');

fetchSearchCats();
breedSelect.addEventListener('change', e => {
  loaderMssg.classList.remove('hide');
  breedSelect.classList.add('hide');
  fetchCatByBreed(breedSelect.value);
});
