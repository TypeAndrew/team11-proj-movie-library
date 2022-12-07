//export * from 'fetcData.js'

// Додатковий імпорт стилів
import MovieApiService from './movies-service';
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

const apiKey = 'c491b5b8e2b4a9ab13619b0a91f8bb41';
let markup = '';
let counter;
let lenguage = 'en-US';
let include_adult = false;
let request = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`;

const createMarkup = function (response) {
  response.data.results.map(element => {
    let strGenres = movieService.findGenresById(element);

    // console.log(element.poster_path);

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

movieService.getGenre();

const getMovies = function (request) {
  movieService
    .fetchMovies(request)
    .then(response => {
      if (response.data.total_results === 0) {
        warningField.textContent =
          'Sorry, there are no movies matching your search query. Please try again.';
        setTimeout(() => (warningField.textContent = ''), 3000);
      } else {
        galleryEl.innerHTML = createMarkup(response);
      }
    })
    .catch(error => {
      refs.warningField.textContent = 'Please write something in the box :)';
      setTimeout(() => (warningField.textContent = ''), 3000);

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

  getMovies(request);
}

if (galleryEl !== null) {
  galleryEl.addEventListener('click', showModalMovie);
}

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

function createModalMarkup(element) {
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

function addToLocalStorage(element) {
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
