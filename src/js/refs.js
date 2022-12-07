const refs = {
  formEl: document.querySelector('.header__form'),
  movieSection: document.querySelector('.main-section'),
  modalMovie: document.querySelector('.modal__movie'),
  warningField: document.querySelector('.js-warning'),
  galleryEl: document.querySelector('.movie__gallery'),

  // Movie Modal Window overview
  poster: document.querySelector('.modal__poster'),
  movieTitle: document.querySelector('.modal__movie-name'),
  averageVotes: document.querySelector('.modal__span--rate'),
  totalVotes: document.querySelector('.modal__span--votes'),
  popularity: document.querySelector('.popularity'),
  originalTitle: document.querySelector('.original-title'),
  genres: document.querySelector('.genres'),
  overview: document.querySelector('.overview'),

  // Buttons
  btnAddWatched: document.querySelector('.modal__btn--watched'),
  btnAddQueue: document.querySelector('.modal__btn--queue'),
  closeBtn: document.querySelector('.modal__close'),


};

export const {
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
} = refs;
