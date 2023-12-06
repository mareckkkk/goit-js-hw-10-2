import axios from 'axios';

// konfiguracja axios-a
axios.defaults.headers.common['x-api-key'] =
  'live_zF1n8nORE4U14nwvfy5TOM2NqnsQ2au7WemLIArFQyvvJz9Esc6v5VN6hL5CeuI1';
axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

// funkcja pobierająca rasy kotów
export function fetchBreeds() {
  return axios
    .get('/breeds')
    .then(({ data }) => data)
    .catch(error => {
      throw new Error();
    });
}

// funckja pobierajkąca dane o kocie
export function fetchCatByBreed(breedId) {
  return axios
    .get(`/images/search?breed_ids=${breedId}`)
    .then(({ data }) => data)
    .catch(error => {
      throw new Error();
    });
}
