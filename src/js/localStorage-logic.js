import { btnAddWatched, btnAddQueue } from './refs';

export default function addToLocalStorage(element) {
  btnAddWatched.addEventListener('click', addToWatched);
  btnAddQueue.addEventListener('click', addToQueue);
  let selectMovie = element;
  let idMovie = element.id;
  const locallistWatch = 'listToWatch';
  const locallistQueue = 'listToQueue';

  let wacthlocal = JSON.parse(localStorage.getItem(locallistWatch));
  let queuelocal = JSON.parse(localStorage.getItem(locallistQueue));
  try {
    if (wacthlocal != false) {
      for (let i = 0; i < wacthlocal.length; i++) {
        if (wacthlocal[i].id === idMovie) {
          btnAddWatched.textContent = 'remove from views';
          btnAddWatched.classList.add('btn_watched_list');
        }
      }
    }

    if (queuelocal != false) {
      for (let i = 0; i < queuelocal.length; i++) {
        if (wacthlocal[i].id === idMovie) {
          btnAddQueue.textContent = 'remove from queue';
          btnAddQueue.classList.add('btn_queue_list');
        }
      }
    }
  } catch (error) {}

  function addToWatched() {
    let localStoragetoWatchList = localStorage.getItem(locallistWatch);
    if (localStoragetoWatchList == null) {
      localStoragetoWatchList = [];
    } else {
      localStoragetoWatchList = JSON.parse(localStoragetoWatchList);
    }

    let indexMovie;

    for (let i = 0; i < localStoragetoWatchList.length; i++) {
      if (localStoragetoWatchList[i].id === idMovie) {
        indexMovie = i;
      }
    }

    if (indexMovie !== undefined) {
      localStoragetoWatchList.splice(indexMovie, 1);

      localStorage.setItem(
        locallistWatch,
        JSON.stringify(localStoragetoWatchList)
      );
      btnAddWatched.textContent = 'add to Watched';
      btnAddWatched.classList.remove('btn_watched_list');
    } else {
      localStoragetoWatchList.push(selectMovie);
      localStorage.setItem(
        locallistWatch,
        JSON.stringify(localStoragetoWatchList)
      );
      btnAddWatched.textContent = 'remove from views';
      btnAddWatched.classList.add('btn_watched_list');
    }
  }

  function addToQueue() {
    let localStoragetoQueueList = localStorage.getItem(locallistQueue);
    if (localStoragetoQueueList == null) {
      localStoragetoQueueList = [];
    } else {
      localStoragetoQueueList = JSON.parse(localStoragetoQueueList);
    }

    let indexMovie;

    for (let i = 0; i < localStoragetoQueueList.length; i++) {
      if (localStoragetoQueueList[i].id === idMovie) {
        indexMovie = i;
      }
    }

    if (indexMovie !== undefined) {
      localStoragetoQueueList.splice(indexMovie, 1);

      localStorage.setItem(
        locallistQueue,
        JSON.stringify(localStoragetoQueueList)
      );
      btnAddQueue.textContent = 'add to queue';
      btnAddQueue.classList.remove('btn_queue_list');
    } else {
      localStoragetoQueueList.push(selectMovie);
      localStorage.setItem(
        locallistQueue,
        JSON.stringify(localStoragetoQueueList)
      );
      btnAddQueue.textContent = 'remove from queue';
      btnAddQueue.classList.add('btn_queue_list');
    }
  }
}
