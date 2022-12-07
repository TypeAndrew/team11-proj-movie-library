//export * from 'fetcData.js'

import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';
import Notiflix from 'notiflix';
// import * as basicLightbox from 'basiclightbox';

const formEl = document.querySelector('.header__form');
const movieSection = document.querySelector('.main-section');
const modalMovie = document.querySelector('.modal__movie');

const refs = {
  warningField: document.querySelector('.js-warning'),
};

const apiKey = 'c491b5b8e2b4a9ab13619b0a91f8bb41';
let markup = '';
let counter;
let total_results = 0;
let lenguage = 'en-US';
let include_adult = false;
let genres;
let request = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`;
//document.body.insertAdjacentHTML("afterend", `<div class="footer"> <button type="button" class="load-more">Load more</button></div>`);
const galleryEl = document.querySelector('.movie__gallery');
const findGenresById = function (element) {
  let strGenres = '';
  let genresLength = element.genre_ids.length;
  let i = 0;
  const genreId = element.genre_ids
    .map(id => id)
    .forEach(element => {
      i++;
      strGenres = strGenres + genres.find(item => item.id === element).name;
      genresLength === i ? undefined : (strGenres += ', ');
    });
  return strGenres;
};

const createMarckup = function (response) {
  response.data.results.map(element => {
    let strGenres = findGenresById(element);

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
};

const fetchData = async request => {
  const response = await axios.get(request);
  return response;
};

function getGenre() {
  const request = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=${lenguage}`;
  fetchData(request)
    .then(response => {
      console.log(response.data);
      if (response != undefined) {
        genres = response.data.genres;
      }
    })

    .catch(error => {
      console.log(error);
    });
}
getGenre();

const getMovies = function (request) {
  fetchData(request)
    .then(response => {
      if (response.data.total_results === 0) {
        refs.warningField.textContent =
          'Sorry, there are no images matching your search query. Please try again.';
        setTimeout(() => (refs.warningField.textContent = ''), 3000);
      } else {
        galleryEl.innerHTML = createMarckup(response);

        // total_results += response.data.length;

        // if (total_results === response.data.total_results) {

        // }
      }
    })
    .catch(error => {
      refs.warningField.textContent = 'Please write something in the box :)';
      setTimeout(() => (refs.warningField.textContent = ''), 3000);

      console.log(error);
    });
};

if (formEl !== null) {
  formEl.addEventListener('submit', event => {
    event.preventDefault();
    markup = '';
    total_results = 0;
    counter = 1;
    let request = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=${lenguage}&page=${counter}&include_adult=${include_adult}&query=${formEl[0].value}`;

    getMovies(request);
  });

  // let request = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`;
  getMovies(request);
}
/*function getGenre() {
  const request = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;
  const response = axios.get(request);
  return response;
}*/
if (galleryEl !== null) {
  galleryEl.addEventListener('click', showModalMovie);
}
const modalCard = document.querySelector('.modal__movie');

let closeBtn = document.querySelector('.modal__close');

async function showModalMovie(evt) {
  evt.preventDefault();

  if (evt.target.nodeName !== 'IMG' && evt.target.nodeName !== 'H2') {
    return;
  }

  const movies = await fetchData(request);
  const requiredMovie = movies.data.results.find(
    movie => movie.id === Number(evt.target.id)
  );
  createModalMarkup(requiredMovie);

  modalMovie.classList.toggle('is-hidden');

  // Modal close

  const closeBtn = document.querySelector('.modal__close');
  closeBtn.addEventListener('click', closeModal);
  window.addEventListener('keydown', closeModalEsc);

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
}

function createModalMarkup(element) {
  modalMovie.innerHTML = '';
  const genreId = element.genre_ids.map(id => id);
  let strGenres = findGenresById(element);
  const modalMarkup = `<span class="modal__close">&times;</span>
        <img class="modal__poster" src="https://www.themoviedb.org/t/p/original/${element.poster_path}" alt="${element.original_title}" loading="lazy">
        <div class="modal__info-position">
            <h2 class="modal__movie-name">${element.title}</h2>
            <table class="modal__table">
                <tbody>
                    <tr>
                        <td class="modal__description-title">Vote / Votes</td>
                        <td class="modal__description-text modal__description-text--slash"><span class="modal__span modal__span--rate">${element.vote_average}</span>/<span class="modal__span modal__span--votes">${element.vote_count}</span></td>
                    </tr>
                    <tr>
                        <td class="modal__description-title">Popularity</td>
                        <td class="modal__description-text">${element.popularity}</td>
                    </tr>
                    <tr>
                        <td class="modal__description-title">Original Title</td>
                        <td class="modal__description-text">${element.original_title}</td>
                    </tr>
                    <tr>
                        <td class="modal__description-title">Genre</td>
                        <td class="modal__description-text">${strGenres}</td>
                    </tr>
                </tbody>
            </table>
            <div>
                <h3 class="modal__about-title">About</h3>
                <p class="modal__about-text">${element.overview}</p>
            </div>
            <ul class="modal__btn-container">
                <li><button class="modal__btn modal__btn--watched" type="button">add to Watched</button></li>
                <li><button class="modal__btn modal__btn--queue" type="button">add to queue</button></li>
            </ul>
        </div>`;
  modalMovie.insertAdjacentHTML('afterbegin', modalMarkup);
  addToLocalStorage(element);
}

function addToLocalStorage(element) {
  const btnAddWatched = document.querySelector('.modal__btn--watched');
  const btnAddQueue = document.querySelector('.modal__btn--queue');
  btnAddWatched.addEventListener('click', addToWatched);
  btnAddQueue.addEventListener('click', addToQueue);
  let selectMovie = element;
  let idMovie = element.id;
  const locallistWatch = 'listToWatch';
  const locallistQueue = 'listToQueue';

  let wacthlocal = JSON.parse(localStorage.getItem(locallistWatch));
  let queuelocal = JSON.parse(localStorage.getItem(locallistQueue));
  try {
    if (wacthlocal != false) {
      for (let i = 0; i < wacthlocal.length; i++) {
        if (wacthlocal[i].id === idMovie) {
          btnAddWatched.textContent = 'remove from views';
          btnAddWatched.classList.add('btn_watched_list');
        }
      }
    }

    if (queuelocal != false) {
      for (let i = 0; i < queuelocal.length; i++) {
        if (wacthlocal[i].id === idMovie) {
          btnAddQueue.textContent = 'remove from queue';
          btnAddQueue.classList.add('btn_queue_list');
        }
      }
    }
  } catch (error) {}

  function addToWatched() {
    let localStoragetoWatchList = localStorage.getItem(locallistWatch);
    if (localStoragetoWatchList == null) {
      localStoragetoWatchList = [];
    } else {
      localStoragetoWatchList = JSON.parse(localStoragetoWatchList);
    }

    let indexMovie;

    for (let i = 0; i < localStoragetoWatchList.length; i++) {
      if (localStoragetoWatchList[i].id === idMovie) {
        indexMovie = i;
      }
    }

    if (indexMovie !== undefined) {
      localStoragetoWatchList.splice(indexMovie, 1);

      localStorage.setItem(
        locallistWatch,
        JSON.stringify(localStoragetoWatchList)
      );
      btnAddWatched.textContent = 'add to Watched';
      btnAddWatched.classList.remove('btn_watched_list');
    } else {
      localStoragetoWatchList.push(selectMovie);
      localStorage.setItem(
        locallistWatch,
        JSON.stringify(localStoragetoWatchList)
      );
      btnAddWatched.textContent = 'remove from views';
      btnAddWatched.classList.add('btn_watched_list');
    }
  }
  function addToQueue() {
    let localStoragetoQueueList = localStorage.getItem(locallistQueue);
    if (localStoragetoQueueList == null) {
      localStoragetoQueueList = [];
    } else {
      localStoragetoQueueList = JSON.parse(localStoragetoQueueList);
    }

    let indexMovie;

    for (let i = 0; i < localStoragetoQueueList.length; i++) {
      if (localStoragetoQueueList[i].id === idMovie) {
        indexMovie = i;
      }
    }

    if (indexMovie !== undefined) {
      localStoragetoQueueList.splice(indexMovie, 1);

      localStorage.setItem(
        locallistQueue,
        JSON.stringify(localStoragetoQueueList)
      );
      btnAddQueue.textContent = 'add to queue';
      btnAddQueue.classList.remove('btn_queue_list');
    } else {
      localStoragetoQueueList.push(selectMovie);
      localStorage.setItem(
        locallistQueue,
        JSON.stringify(localStoragetoQueueList)
      );
      btnAddQueue.textContent = 'remove from queue';
      btnAddQueue.classList.add('btn_queue_list');
    }
  }
}
