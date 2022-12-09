import MovieApiService from './movies-service';
import addToLocalStorage from './localStorage-logic';
import addToFirebase from './firebase';
import { changeFirstPage } from './pagination';
import {
  formEl,
  warningField,
  galleryEl,
  poster,
  movieTitle,
  averageVotes,
  totalVotes,
  popularity,
  originalTitle,
  genres,
  overview,
} from './refs';

export const movieService = new MovieApiService();

const API_KEY = 'c491b5b8e2b4a9ab13619b0a91f8bb41';
const BASE_URL = 'https://api.themoviedb.org/3/';
const language = 'en-US';
const include_adult = false;

export let request = `${BASE_URL}trending/movie/day?api_key=${API_KEY}&page=${movieService.page}`;
export let firstPage = false;
export let totalPages = 0;
export let totalResults = 0;
let strGenres;
export let tempData = [];
function createMarkup(response) {
  let markup = '';
  
  totalPages = response.data.total_pages;
  totalResults = response.data.total_results;
    
    response.data.results.map(element => {
    if (element !== undefined) {
      strGenres = movieService.findGenresById(element);
      }
      tempData.push(element);
    markup += `<li class="movie__card">

    <a href="https://www.themoviedb.org/t/p/original/${
      element.backdrop_path == null
        ? element.poster_path
        : element.backdrop_path
    }"><img class="movie__poster" src="https://www.themoviedb.org/t/p/original/${
      element.poster_path
    }" alt="${element.original_title}" loading="lazy" id="${
      element.id
    }" loading="lazy"></a>

    <div class="movie__info">
    <h2 class="movie__name">${element.title}</h2>
    <p class="movie__info">${strGenres}<span class="movie__year">${element.release_date.slice(
      0,
      4
    )}</span></p>
    </div>
    </li>`;
  });
  console.log(tempData);
  return markup;
}

export function createModalMarkup(element) {
  let strGenres = movieService.findGenresById(element);

  if (element.poster_path !== null) {
    poster.src = `https://www.themoviedb.org/t/p/original/${element.poster_path}`;
  }
  poster.alt = `${element.original_title}`;
  movieTitle.textContent = `${element.title}`;
  averageVotes.textContent = `${element.vote_average}`;
  totalVotes.textContent = `${element.vote_count}`;
  popularity.textContent = `${element.popularity}`;
  originalTitle.textContent = `${element.original_title}`;
  genres.textContent = `${strGenres}`;
  overview.textContent = `${element.overview}`;

  addToFirebase(element);
  addToLocalStorage(element);
}

async function getMovies(request) {
  try {
    const response = await movieService.fetchMovies(request);
    if (response.data.total_results === 0) {
      warningField.textContent =
        'Sorry, there are no movies matching your search query. Please try again.';
      setTimeout(() => (warningField.textContent = ''), 3000);
    } else {
      galleryEl.innerHTML = createMarkup(response);
    }
  } catch (error) {
    warningField.textContent = 'Please write something in the box :)';
    setTimeout(() => (warningField.textContent = ''), 3000);

    console.log(error);
  }
}

export function createRequest() {
  let query = formEl.elements.searchmovies.value;
  // console.log(movieService);
  if (query !== '' && query !== undefined) {
    request = `${BASE_URL}search/movie?api_key=${API_KEY}&language=${language}&page=${movieService.page}&include_adult=${include_adult}&query=${query}`;
    getMovies(request);
  } else {
    firstPage = false;
    request = `${BASE_URL}trending/movie/day?api_key=${API_KEY}&page=${movieService.page}`;
    getMovies(request);
  }
}

function onFormSubmit(event, request) {
  event.preventDefault();
  changeFirstPage();
  movieService.page = 1;
  createRequest(event.page);
}

if (formEl) {
  formEl.addEventListener('submit', onFormSubmit);

  movieService.getGenre();

  createRequest();
}
