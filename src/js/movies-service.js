import axios from 'axios';
import { warningField } from './refs';
//import { request } from './markup';
const API_KEY = 'c491b5b8e2b4a9ab13619b0a91f8bb41';
const BASE_URL = 'https://api.themoviedb.org/3/';
let request = `${BASE_URL}trending/movie/day?api_key=${API_KEY}`;

// const apiKey = 'c491b5b8e2b4a9ab13619b0a91f8bb41';
// let markup = '';
// let counter;
// let total_results = 0;
let language = 'en-US';
// let include_adult = false;
let genres = [];

export default class MovieApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }

    fetchMovies(url) {
        return axios.get(url);
    }

    async getGenre() {
        const url = `${BASE_URL}genre/movie/list?api_key=${API_KEY}&language=${language}`;
        try {
            const response = await this.fetchMovies(url);
            if (response != undefined) {
                genres = response.data.genres;
            }
        } catch (error) {
            setTimeout(
                () =>
                (warningField.textContent =
                    'Sorry, there are no movies matching your search query. Please try again.'),
                300
            );
        }
    }

    findGenresById(element) {
        let strGenres = '';
        let genresLength = element.genre_ids.length;
        let i = 0;
        element.genre_ids.slice(0, 2)
            .map(id => id)
            .forEach(element => {
                i++;
                strGenres = strGenres + genres.find(item => item.id === element).name;
                genresLength === i ? undefined : (strGenres += ', ');
            });
        if (strGenres.slice(-2) == ', ') {
            return strGenres.slice(0, -2)
        }
        return strGenres;
    }
}