import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from "axios";
import Notiflix from 'notiflix';

const formEl = document.querySelector('.search-form');
formEl.style.background = "blue"; 
formEl.style.display = "flex";
formEl.style.justifyContent = "center";
const galleryEl = document.querySelector('.gallery');  

const apiKey = 'c491b5b8e2b4a9ab13619b0a91f8bb41';
let markup = "";
let counter;
let total_results = 0;
let lenguage = 'en-US';
let include_adult = false;

document.body.insertAdjacentHTML("afterend", `<div class="footer"> <button type="button" class="load-more">Load more</button></div>`);

const createMarckup = function (response) {
  
  response.data.results.map((element) => {

      markup += `<div class="photo-card">
              <a class="gallery__item" href="https://www.themoviedb.org/t/p/original/${element.backdrop_path}">
              <img class="gallery__image" src="https://www.themoviedb.org/t/p/original/${element.poster_path}"
              
               alt="${element.original_title}" loading="lazy" /></a>
              <div class="info">
               
              </div>
            </div>`;
  });
  
  return markup;
} 


const fetchData = async (request) => {
  const response = await axios.get(request);
  return response;
}

const  getMovies = function(request)  {
   
  
   fetchData(request).then((response) => {
    console.log(response.data);
   
    if (response.data.results.length === 0) {
      Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.');

    } else {
      
      galleryEl.innerHTML = createMarckup(response);
      document.querySelector('.load-more').style.opacity = "1";
      total_results += response.data.length;
     let lightbox = new SimpleLightbox('.photo-card a', { captionsData: 'alt', captionDelay: 250, widthRatio: 0.8 });
      lightbox.show();
      if (total_results === response.data.total_results) {
        Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
        
      } 
     
    }  
    }).catch((error) => {
      console.log(error);
    });
    
         
} 

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  markup = "";
  total_results = 0;
  counter = 1;
  let request = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=${lenguage}&page=${counter}&include_adult=${include_adult}&query=${formEl[0].value}`;

  getMovies(request);
   
});

let request = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`;
getMovies(request)
