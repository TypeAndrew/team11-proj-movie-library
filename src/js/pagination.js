import Pagination from 'tui-pagination';
import {  createRequest, movieService, createRequest,  totalResults } from './markup';
import { BASE_URL } from './movies-service';
//import { formEl } from './refs';

// import 'tui-pagination/dist/tui-pagination.css';
// const listRef = document.querySelector('.movie-list');
const paginationSection = document.querySelector('.pagination.section');
const paginationContainer = document.getElementById(
    'tui-pagination-container'
);
//paginationContainer.appendChild(galleryEl);

export function makePaginationOptions(totalResults = 1000) {
    return {
        totalItems: totalResults, //total_results < 10000 ? total_results : 10000,
        itemsPerPage: 20,
        visiblePages: 5,
        page: 1,
        centerAlign: true,
        firstItemClassName: 'tui-first-child',
        lastItemClassName: 'tui-last-child',
        template: {
            page: '<a href="#" class="tui-page-btn">{{page}}</a>',
            currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
            moveButton: '<a href="#" class="tui-page-btn tui-{{type}}">' +
                '<span class="tui-ico-{{type}}">{{type}}</span>' +
                '</a>',
            disabledMoveButton: '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
                '<span class="tui-ico-{{type}}">{{type}}</span>' +
                '</span>',
            moreButton: '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
                '<span class="tui-ico-ellip">...</span>' +
                '</a>',
        },
    };
}

const options = makePaginationOptions();

export let pagination = new Pagination(paginationContainer, options);

pagination.on('beforeMove', function(eventData) {
    //return confirm('Go to page ' + eventData.page + '?');
    movieService.page = eventData.page;
    createRequest();
});

pagination.on('afterMove', function(eventData) {
    //alert('The current page is ' + eventData.page);

    pagination._options.totalItems = totalResults;

});


// pagination.on('afterMove', updateMoviesList);

// export async function updateMoviesList(event) {
//   const currentPage = event.page;

//   await moviesListMarkupFirstRender(currentPage);
//   document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
// }

// export function addHiddenPagination() {
//   paginationContainer.classList.add('visually-hidden');
// }

// export function removeHiddenPagination() {
//   paginationContainer.classList.remove('visually-hidden');
// }