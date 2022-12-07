import MovieApiService from './movies-service';
import addToLocalStorage from './localStorage-logic';
import {
  formEl,
  movieSection,
  modalMovie,
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
  btnAddWatched,
  btnAddQueue,
  closeBtn,
} from './refs';

const movieService = new MovieApiService();

const API_KEY = 'c491b5b8e2b4a9ab13619b0a91f8bb41';
const BASE_URL = 'https://api.themoviedb.org/3/';
const language = 'en-US';
const include_adult = false;

function createMarkup(response) {
  let markup = '';
  response.data.results.map(element => {
    let strGenres = movieService.findGenresById(element);

    markup += `<li class="movie__card">
    <a href="https://www.themoviedb.org/t/p/original/${
      element.backdrop_path
    }"><img class="movie__poster" src="https://www.themoviedb.org/t/p/original/${
      element.poster_path
    }" alt="${element.original_title}" loading="lazy" id="${element.id}"></a>
    <div class="movie__info">
    <h2 class="movie__name">${element.title}</h2>
    <p class="movie__info">${strGenres}<span class="movie__year">${element.release_date.slice(
      0,
      4
    )}</span></p>
    </div>
    </li>`;
  });
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

function onFormSubmit(event) {
  event.preventDefault();
  movieService.query = formEl.elements.searchmovies.value;
  let request = `${BASE_URL}search/movie?api_key=${API_KEY}&language=${language}&page=${movieService.page}&include_adult=${include_adult}&query=${movieService.query}`;

  getMovies(request);
}

formEl.addEventListener('submit', onFormSubmit);

let request = `${BASE_URL}trending/movie/day?api_key=${API_KEY}`;

movieService.getGenre();

getMovies(request);
