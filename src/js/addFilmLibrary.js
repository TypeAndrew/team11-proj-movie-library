import nothingHereJpg from '../images/library/Theres_nothing_here.jpg';
const btnWatch = document.querySelector('#watched');
const btnQueue = document.querySelector('#queue');
const elLabrary = document.querySelector('.library__js-card');
const locallistWatch = 'listToWatch';
const locallistQueue = 'listToQueue';

if (btnWatch && btnQueue) {
  btnWatch.addEventListener('click', onBtnWatchedClick);
  btnQueue.addEventListener('click', onBtnQueueClick);
}

function onBtnWatchedClick() {
  try {
    let watchedFilms = localStorage.getItem(locallistWatch);
    if (watchedFilms) {
      watchedFilms = JSON.parse(watchedFilms);
      creadListWatch(watchedFilms);
    }
    if (watchedFilms.length === 0) {
      elLabrary.innerHTML = `<img src="${nothingHereJpg}" alt="Theres nothing" />`;
    }
  } catch (error) {
    console.log(error);
  }

  return;
}

function creadListWatch() {
  elLabrary.innerHTML = '';
  let response = JSON.parse(localStorage.getItem(locallistWatch));

  markup = '';
  response.map(element => {
    markup += `<li class="movie__card">
    <a href="https://www.themoviedb.org/t/p/original/${
      element.backdrop_path
    }"><img class="movie__poster" src="https://www.themoviedb.org/t/p/original/${
      element.poster_path
    }" alt="${element.original_title}" loading="lazy" id="${element.id}"></a>
    <div class="movie__info">
    <h2 class="movie__name">${element.title}</h2>
    <p class="movie__info"><span class="movie__year">${element.release_date.slice(
      0,
      4
    )}</span></p>
    </div>
    </li>`;
  });
  elLabrary.insertAdjacentHTML('afterbegin', markup);
}

function onBtnQueueClick() {
  try {
    let queueFilms = localStorage.getItem(locallistQueue);
    if (queueFilms) {
      watchedFilms = JSON.parse(queueFilms);

      creadListQueue(queueFilms);
    }
    if (watchedFilms.length === 0) {
      elLabrary.innerHTML = `<img src="${nothingHereJpg}" alt="Theres nothing" />`;
    }
  } catch (error) {
    console.log(error);
  }

  return;
}

function creadListQueue() {
  elLabrary.innerHTML = '';

  let response = JSON.parse(localStorage.getItem(locallistQueue));
  markup = '';
  response.map(element => {
    markup += `<li class="movie__card">
    <a href="https://www.themoviedb.org/t/p/original/${
      element.backdrop_path
    }"><img class="movie__poster" src="https://www.themoviedb.org/t/p/original/${
      element.poster_path
    }" alt="${element.original_title}" loading="lazy" id="${element.id}"></a>
    <div class="movie__info">
    <h2 class="movie__name">${element.title}</h2>
    <p class="movie__info"><span class="movie__year">${element.release_date.slice(
      0,
      4
    )}</span></p>
    </div>
    </li>`;
  });
  elLabrary.innerHTML = markup;
}
