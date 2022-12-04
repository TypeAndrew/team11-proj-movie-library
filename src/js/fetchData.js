//export * from 'fetcData.js'

import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';
import Notiflix from 'notiflix';

const formEl = document.querySelector('.header__form');
const movieSection = document.querySelector('.main-section');
const gallery = document.querySelector('.movie__gallery');

let lightbox = new SimpleLightbox('.movie__gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  widthRatio: 0.8,
});
// formEl.style.background = 'blue';
// formEl.style.display = 'flex';
// formEl.style.justifyContent = 'center';
//const galleryEl = document.querySelector('.gallery');
// const galleryEl = document.createElement('div');
// galleryEl.classList.add('gallery');
// movieSection.append(galleryEl);
// let galleryLinkEl = document.createElement('a');
// galleryEl.append(galleryLinkEl);

const apiKey = 'c491b5b8e2b4a9ab13619b0a91f8bb41';
let markup = '';
let counter;
let total_results = 0;
let lenguage = 'en-US';
let include_adult = false;

//document.body.insertAdjacentHTML("afterend", `<div class="footer"> <button type="button" class="load-more">Load more</button></div>`);
const galleryEl = document.querySelector('.movie__gallery');
const createMarckup = function (response) {
  response.data.results.map(element => {
    const genreId = element.genre_ids.map(id => id);

    markup += `<li class="movie__card">
    <a href="https://www.themoviedb.org/t/p/original/${
      element.backdrop_path
    }"><img class="movie__poster" src="https://www.themoviedb.org/t/p/original/${
      element.poster_path
    }" alt="${element.original_title}" loading="lazy"></a>
    <div>
    <h2 class="movie__name">${element.title}</h2>
    <p class="movie__info">${genreId}<span class="movie__year">${element.release_date.slice(
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

const getMovies = function (request) {
  fetchData(request)
    .then(response => {
      console.log(response.data);

      if (response.data === null) {
        Notiflix.Notify.warning(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        galleryEl.innerHTML = createMarckup(response);
        // document.querySelector('.load-more').style.opacity = '1';
        total_results += response.data.length;
        // let lightbox = new SimpleLightbox('.movie__gallery img', {
        //   captionsData: 'alt',
        //   captionDelay: 250,
        //   widthRatio: 0.8,
        // });
        lightbox.refresh();
        if (total_results === response.data.total_results) {
          Notiflix.Notify.warning(
            "We're sorry, but you've reached the end of search results."
          );
        }
      }
    })
    .catch(error => {
      console.log(error);
    });
};

formEl.addEventListener('submit', event => {
  event.preventDefault();
  markup = '';
  total_results = 0;
  counter = 1;
  let request = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=${lenguage}&page=${counter}&include_adult=${include_adult}&query=${formEl[0].value}`;

  getMovies(request);
});

let request = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`;
getMovies(request);

function getGenre() {
  const request = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;
  const response = axios.get(request);
  return response;
}

gallery.addEventListener('click', e => {
  e.preventDefault();
});
