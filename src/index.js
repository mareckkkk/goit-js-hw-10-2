import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

// wyszukiwanie elementów DOM
const breeds = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

error.style.display = 'none';

// tworzenie listy ras kotów
breeds.style.display = 'none';
fetchBreeds()
  .then(data => {
    const html = data.map(
      breed => `<option value="${breed.id}">"${breed.name}"</option>`
    );
    breeds.innerHTML = html;
    breeds.style.display = 'block';
    loader.style.display = 'none';
  })
  .catch(error => Notiflix.Notify.failure('Error loading breeds'));

// nasłuchiwanie formularza i wyświetlanie info o kocie
breeds.addEventListener('change', event => {
  const breedId = event.target.value;
  catInfo.style.display = 'none';
  loader.style.display = 'block';
  fetchCatByBreed(breedId)
    .then(catData => {
      catInfo.innerHTML = `
      <div>
    <img width="300px" src="${catData[0].url}" />
    </div>
    <div>
    <h2>Name: ${catData[0].breeds[0].name}</h2>
    <p><span>Description:</span> ${catData[0].breeds[0].description}</p>
    <p><span>Temperament:</span> ${catData[0].breeds[0].temperament}</p>
     </div>`;
      loader.style.display = 'none';
      catInfo.style.display = 'flex';
    })
    .catch(error => Notiflix.Notify.failure('Error loading cat info'));
});
