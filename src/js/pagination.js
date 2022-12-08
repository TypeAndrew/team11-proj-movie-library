import Pagination from 'tui-pagination';
import { createRequest, movieService, createRequest, totalResults, firstPage} from './markup';

const paginationContainer = document.getElementById(
    'tui-pagination-container'
);

export function makePaginationOptions(totalResults = 1000) {
    return {
        totalItems: totalResults, 
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
let chanePage = true;
pagination.on('beforeMove', function(eventData) {

    console.log(firstPage);
    movieService.page = eventData.page; 
    createRequest();
});

pagination.on('afterMove', function(eventData) {
    chanePage = false;
    pagination._options.totalItems = totalResults;

});

export function changeFirstPage() {
  
    pagination.reset();
    console.log(pagination);
}
