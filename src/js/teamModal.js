export { teamModal };

const modal = document.getElementById("teamModal");
const btn = document.getElementById("myBtn");
const span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  document.body.classList.toggle("is-open");
  
  modal.style.display = "block";
  window.addEventListener('keydown', closeModalEsc);
}

if (span !== undefined) {
  span.onclick = function () {
  document.body.classList.toggle("is-open");
    modal.style.display = "none";
    window.removeEventListener('keydown', closeModalEsc);
}
}

window.onclick = function(event) {
  if (event.target === modal) {
    document.body.classList.toggle("is-open");
    modal.style.display = "none";
    window.removeEventListener('keydown', closeModalEsc);
  }
}


function closeModalEsc(e) {

  if (e.code === 'Escape') {
    document.body.classList.toggle("is-open");
    modal.style.display = "none";
    window.removeEventListener('keydown', closeModalEsc);
  }
}