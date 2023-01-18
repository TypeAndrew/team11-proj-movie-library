import nothingHereJpg from '../images/library/Theres_nothing_here.jpg';
import { btnAddWatched, btnAddQueue, closeBtn } from './refs';
import { initializeApp } from "firebase/app";
import { getDatabase, set, ref, get, child, update, remove,onValue  } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
const elLabrary = document.querySelector('.library__js-card');
const firebaseConfig = {
    apiKey: "AIzaSyAfAXK_eMmM8x3Fv1Qp4fXOpLOfKmbbEck",
    authDomain: "movieproject11.firebaseapp.com",
    databaseURL: "https://movieproject11-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "movieproject11",
    storageBucket: "movieproject11.appspot.com",
    messagingSenderId: "414406009031",
    appId: "1:414406009031:web:e07613adfc75fe7967dee2",
    measurementId: "G-HM44PYJGKZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

export default function addToFirebase(element) {

    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('keydown', closeModalEsc);

    function closeModalEsc(e) {
        if (e.code === 'Escape') {
        btnAddWatched.removeEventListener('click', savedata);
        btnAddQueue.removeEventListener('click', savedata);
        }
    }
    function closeModal(e) {
        btnAddWatched.removeEventListener('click', savedata);
        btnAddQueue.removeEventListener('click', savedata);
    }

    btnAddWatched.addEventListener('click', savedata);
    btnAddQueue.addEventListener('click', savedata);
    let selectMovie = element;
    let idMovie = element.id;
    let table = "";

    function savedata(event) {
        
        //console.log(element);
        let insertMovie = false;
        let removeMovie = false;
    
        if (event.currentTarget.innerText === "ADD TO WATCHED") {
            table = "watched_movies";
            insertMovie = true;
           // btnAddWatched.removeEventListener('click', savedata);
        
        } else if (event.currentTarget.innerText === "ADD TO QUEUE") {
            table = "queue_movies";
            insertMovie = true;
            //btnAddQueue.removeEventListener('click', savedata);
        } else if (event.currentTarget.innerText === "REMOVE FROM VIEWS") {
            table = "watched_movies";
            removeMovie = true;

        } else if (event.currentTarget.innerText === "REMOVE FROM QUEUE") {
            table = "queue_movies";
            removeMovie = true;
        }

        if (insertMovie === true) {
            set(ref(database, table + '/' + selectMovie.title),
                element
            ).then(() => {

                console.log('ok');
            }).catch((error) => {
                console.log(error);

            });
        }
            
        if (removeMovie === true) {
            const dbref = ref(database);
            remove(ref(database, table + '/' + selectMovie.title)
            ).then(() => {
                
                console.log('remove ok');
            }).catch((error) => {
                console.log(error);
                
            });
        };
    };   

};


export async function selectData(table) {
    let dataTable = [];
    const dbRef = ref(database);
    await get(child(dbRef, table)).then((snapshot) => {
    if (snapshot.exists()) {
        dataTable.push(snapshot.val()); 
        console.log(snapshot.val());
        
   } else {
        console.log("No data available");
   }
    }).catch((error) => {
    console.error(error);
    });
    
     
    if (dataTable) {
      //dataTable = JSON.parse(dataTable);
      creadListWatch(dataTable);
    }
    if (dataTable === null || dataTable.length === 0) {
      elLabrary.innerHTML = `<img src="${nothingHereJpg}" class="img__nothing-here" alt="Theres nothing" />`;
    }
  
};

function creadListWatch(dataTable) {
  elLabrary.innerHTML = '';
  let response = Object.values(dataTable[0]);

  let markup = '';
  response.map(element => {
    markup += `<li class="movie__card">
    <a href="https://www.themoviedb.org/t/p/original/${
      element.backdrop_path
    }"><img class="movie__poster" src="https://www.themoviedb.org/t/p/original/${
      element.poster_path
    }" alt="${element.original_title}" loading="lazy" id="${element.id}"></a>
    <div class="movie__info">
    <h2 class="movie__name">${element.title}</h2>
    <p class="movie__info"><span class="movie__year">${element.release_date.slice(
      0,
      4
    )}</span></p>
    </div>
    </li>`;
  });
  elLabrary.insertAdjacentHTML('afterbegin', markup);
}
