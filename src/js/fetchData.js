//export * from 'fetcData.js'

// Додатковий імпорт стилів
import MovieApiService from './movies-service';
import { createMarkup, createModalMarkup, getMovies } from './markup';
import { formEl, modalMovie, galleryEl, closeBtn } from './refs';
console.log(formEl.elements);
const movieService = new MovieApiService();

const API_KEY = 'c491b5b8e2b4a9ab13619b0a91f8bb41';
const BASE_URL = 'https://api.themoviedb.org/3/';
let markup = '';
let counter;
const language = 'en-US';
const include_adult = false;
let request = `${BASE_URL}trending/movie/day?api_key=${API_KEY}`;

movieService.getGenre();

formEl.addEventListener('submit', onFormSubmit);

getMovies(request);

function onFormSubmit(event) {
  event.preventDefault();
  markup = '';
  total_results = 0;
  counter = 1;

  movieService.query = formEl.elements.searchmovies.value;
  let request = `${BASE_URL}search/movie?api_key=${API_KEY}&language=${language}&page=${counter}&include_adult=${include_adult}&query=${movieService.query}`;

  getMovies(request);
}

galleryEl.addEventListener('click', showModalMovie);
async function showModalMovie(evt) {
  evt.preventDefault();

  if (evt.target.nodeName !== 'IMG' && evt.target.nodeName !== 'H2') {
    return;
  }

  const movies = await movieService.fetchMovies(request);
  const requiredMovie = movies.data.results.find(
    movie => movie.id === Number(evt.target.id)
  );
  createModalMarkup(requiredMovie);

  modalMovie.classList.toggle('is-hidden');

  // Modal close

  closeBtn.addEventListener('click', closeModal);
  window.addEventListener('keydown', closeModalEsc);
}

function closeModalEsc(e) {
  if (e.code === 'Escape') {
    modalMovie.classList.toggle('is-hidden');
    window.removeEventListener('keydown', closeModalEsc);
  }
}

function closeModal(e) {
  modalMovie.classList.toggle('is-hidden');
  window.removeEventListener('keydown', closeModal);
}
