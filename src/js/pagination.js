import Pagination from 'tui-pagination';

import { createRequest, movieService, createRequest, totalResults, firstPage} from './markup';

const paginationContainers = document.querySelectorAll(
    '.tui-pagination'
);
const paginationContainerTop = paginationContainers[0];
const paginationContainer = paginationContainers[1];



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
      currentPage:
        '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
      moveButton:
        '<a href="#" class="tui-page-btn tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</a>',
      disabledMoveButton:
        '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</span>',
      moreButton:
        '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
        '<span class="tui-ico-ellip">...</span>' +
        '</a>',
    },
  };
}

const options = makePaginationOptions();

export let pagination = new Pagination(paginationContainer, options);
export let paginationTop = new Pagination(paginationContainerTop, options);
let chanePage = true;

pagination.on('beforeMove', function(eventData) {
    currentPage = eventData.page;
    console.log(firstPage);
    movieService.page = eventData.page; 
    createRequest();
});

paginationTop.on('beforeMove', function(eventData) {
    currentPage = eventData.page;
    console.log(firstPage);
    movieService.page = eventData.page; 
    createRequest();
});

pagination.on('afterMove', function(eventData) {
  
  if (chanePage === true) {
        
        pagination._options.totalItems = totalResults;
        paginationTop.reset(eventData.page);
        paginationTop._options.totalItems = totalResults;
        chanePage = false;
        paginationTop.movePageTo(eventData.page);
        
    }
    chanePage = true;
});

paginationTop.on('afterMove', function(eventData) {
    if (chanePage === true) {
        paginationTop._options.totalItems = totalResults;
        pagination.reset(eventData.page);
        pagination._options.totalItems = totalResults;
        chanePage = false;
        pagination.movePageTo(eventData.page);
        
    }
    chanePage = true;
});

export function changeFirstPage() {
  
    pagination.reset();
    paginationTop.reset();
    console.log(pagination);

}
