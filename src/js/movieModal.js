import { modalMovie, galleryEl, closeBtn } from './refs';
import MovieApiService from './movies-service';
import { createModalMarkup } from './markup';
const movieService = new MovieApiService();

const API_KEY = 'c491b5b8e2b4a9ab13619b0a91f8bb41';
const BASE_URL = 'https://api.themoviedb.org/3/';
let request = `${BASE_URL}trending/movie/day?api_key=${API_KEY}`;
let language = 'en-US';
let include_adult = false;

galleryEl.addEventListener('click', showModalMovie);

function modyfyRequest(evt) {
    const findString = document.querySelector('.header__form-input');
    if (findString.value !== "") {
        
        movieService.query = evt.target.alt.replace("#",'');
        request = `${BASE_URL}search/movie?api_key=${API_KEY}&language=${language}&page=${movieService.page}&include_adult=${include_adult}&query=${movieService.query}`;
    }
    return request;
}

async function showModalMovie(evt) {
    evt.preventDefault();

    if (evt.target.nodeName !== 'IMG' && evt.target.nodeName !== 'H2') {
        return;
    }

    request = modyfyRequest(evt);

    const movies = await movieService.fetchMovies(request);

    const requiredMovie = movies.data.results.find(
        movie => movie.id === Number(evt.target.id)
    );
    createModalMarkup(requiredMovie);


  document.body.classList.toggle("is-open");
  modalMovie.classList.toggle("is-hidden");


    // Modal close

    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('keydown', closeModalEsc);
}

function closeModalEsc(e) {

  if (e.code === 'Escape') {
    document.body.classList.toggle("is-open");
    modalMovie.classList.toggle("is-hidden");
    window.removeEventListener('keydown', closeModalEsc);
  }
}

function closeModal(e) {
  document.body.classList.toggle("is-open");
  modalMovie.classList.toggle('is-hidden');
  window.removeEventListener('keydown', closeModal);
}

