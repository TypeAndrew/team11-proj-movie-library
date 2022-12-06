// import "https://code.jquery.com/jquery-3.6.1.min.js";


window.onload = function () {
    let preloader = document.getElementById('preloader');
    preloader.classList.add('hide-preloader');
    setInterval(function() {
          preloader.classList.add('preloader-hidden');
    }, 990);
}