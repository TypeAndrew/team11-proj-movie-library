import MovieApiService from './movies-service';
import addToLocalStorage from './localStorage-logic';
import {
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

const movieService = new MovieApiService();

export function createMarkup(response) {
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

export async function getMovies(request) {
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
