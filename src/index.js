<<<<<<< Updated upstream
import { getMovies } from "./js/fetchData.js";
=======
const modal = document.getElementById("teamModal");

// Получить кнопку, которая открывает модальный
const btn = document.getElementById("myBtn");

// Получить элемент <span>, который закрывает модальный
const span = document.getElementsByClassName("close")[0];

// Когда пользователь нажимает на кнопку, откройте модальный
btn.onclick = function() {
  modal.style.display = "flex";
}

// Когда пользователь нажимает на <span> (x), закройте модальное окно
span.onclick = function() {
  modal.style.display = "none";
}

// Когда пользователь щелкает в любом месте за пределами модального, закройте его
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
>>>>>>> Stashed changes
