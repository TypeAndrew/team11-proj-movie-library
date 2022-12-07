import { btnAddWatched, btnAddQueue } from './refs';
import { initializeApp } from "firebase/app";
import { getDatabase, set, ref, get, child, update, remove } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

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

    btnAddWatched.addEventListener('click', savedata);
    btnAddQueue.addEventListener('click', savedata);
    let selectMovie = element;
    let idMovie = element.id;
    let table = "";

    function savedata(event) {

        //console.log(element);
        let insertMovie = false;
        if (event.currentTarget.innerText === "ADD TO WATCHED") {
            table = "watched_movies";
            insertMovie = true;
        } else if (event.currentTarget.innerText === "ADD TO QUEUE") {
            table = "queue_movies";
            insertMovie = true;
        } else if (event.currentTarget.innerText === "REMOVE FROM VIEWS") {
            table = "queue_movies";
        }
        if (insertMovie === true) {
            set(ref(database, table + '/' + selectMovie.id),
                element
            ).then(() => {

                console.log('ok');
            }).catch((error) => {
                console.log(error);

            });
        }
    }

}