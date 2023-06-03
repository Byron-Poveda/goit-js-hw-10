import SlimSelect from 'slim-select';
import { Report } from 'notiflix/build/notiflix-report-aio';
let idCat, urlImgLink;
const url = 'https://api.thecatapi.com/v1',
  urlBreeds = url + '/breeds',
  apiKey =
    'api_key=live_GfeASd4JrBuu7Sqd2cD9oA3gRTDWD8eHeMtcwwbBg2YbR12KeELESVLcXlLsPBy8',
  loaderMssg = document.querySelector('.loader'),
  errorMssg = document.querySelector('.error'),
  divCatInfo = document.querySelector('.cat-info'),
  breedSelect = document.getElementById('selectElement');

export function fetchSearchCats() {
  fetch(urlBreeds, {
    headers: {
      'x-api-key': apiKey,
    },
  })
    .then(response => response.json())
    .then(data => {
      idCat = data
        .map(
          dataCat => `<option value="${dataCat.id}">${dataCat.name}</option>`
        )
        .join('');
      loaderMssg.classList.add('hide');
      breedSelect.classList.remove('hide');
      breedSelect.insertAdjacentHTML('beforeend', idCat);
      new SlimSelect({
        select: breedSelect,
        settings: {
          placeholderText: 'Select Breed Cat',
        },
      });
    })
    .catch(error => {
      errorMssg.style.display = 'block';
      loaderMssg.classList.add('hide');
      Report.failure(
        'URL error',
        `Please try this URL: https://api.thecatapi.com/v1`,
        'Okay',
        {
          titleFontSize: '30px',
          messageFontSize: '14px',
        }
      );
    });
}
export function fetchCatByBreed(breedId) {
  fetch(urlBreeds + `/${breedId}`)
    .then(response => response.json())
    .then(data => {
      loaderMssg.classList.add('hide');
      breedSelect.classList.remove('hide');
      errorMssg.classList.add('hide');
      divCatInfo.classList.remove('hide');
      fetch(`${url}/images/${data.reference_image_id}`)
        .then(response => {
          return response.json();
        })
        .then(data => {
          urlImgLink = `<img class="imgCat" src="${data.url}" alt="${data.breeds[0].name}"/>`;
          divCatInfo.insertAdjacentHTML('afterbegin', urlImgLink);
        })
        .catch(error => {
          errorMssg.style.display = 'block';
          divCatInfo.classList.add('hide');
          Report.failure(
            'Error',
            'Please refresh the page and choose another breed of cat',
            'Okay'
          ),
            function cb() {
              location.reload();
            },
            {
              titleFontSize: '30px',
              messageFontSize: '14px',
            };
        });
      const contentDivCatInfo = `
      <div class="cat-info__wrap">
        <h2>${data.name}</h2>
      <p>${data.description}</p>
      <p><b>Temperament: </b>${data.temperament}</p>
      </div>`;
      divCatInfo.innerHTML = contentDivCatInfo;
    });
}
