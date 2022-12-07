import { btnAddWatched, btnAddQueue, closeBtn } from './refs';

export default function addToLocalStorage(element) {
  const locallistWatch = 'listToWatch';
  const locallistQueue = 'listToQueue';
  let idMovie = element.id;
  closeBtn.addEventListener('click', closeModal);
  window.addEventListener('keydown', closeModalEsc);

  function closeModalEsc(e) {
    if (e.code === 'Escape') {
      btnAddWatched.removeEventListener('click', addToWatched);
      btnAddQueue.removeEventListener('click', addToQueue);
    }
  }
  function closeModal(e) {
    btnAddWatched.removeEventListener('click', addToWatched);
    btnAddQueue.removeEventListener('click', addToQueue);
  }

  btnAddWatched.addEventListener('click', addToWatched);
  btnAddQueue.addEventListener('click', addToQueue);

  let localStoragetoWatchList = localStorage.getItem(locallistWatch);
  if (localStoragetoWatchList == null) {
    console.log('checklocal=>clear');
    localStoragetoWatchList = [];
  } else {
    localStoragetoWatchList = JSON.parse(localStoragetoWatchList);
  }
  for (let i = 0; i < localStoragetoWatchList.length; i++) {
    if (localStoragetoWatchList[i].id === idMovie) {
      console.log('find');
      setTimeout(() => {
        btnAddWatched.textContent = 'remove from views';
      }, 0);

      btnAddWatched.classList.add('btn_watched_list');
    } else {
      btnAddWatched.textContent = 'add to Watched';
      btnAddWatched.classList.remove('btn_watched_list');
    }
  }

  function addToWatched() {
    let localStoragetoWatchList = localStorage.getItem(locallistWatch);

    if (localStoragetoWatchList == null) {
      console.log('checklocal=>clear');
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
      localStoragetoWatchList.push(element);

      localStorage.setItem(
        locallistWatch,
        JSON.stringify(localStoragetoWatchList)
      );

      btnAddWatched.textContent = 'remove from views';
      btnAddWatched.classList.add('btn_watched_list');
    }
  }

  let localStoragetoQueueList = localStorage.getItem(locallistQueue);
  if (localStoragetoQueueList == null) {
    console.log('checklocal=>clear');
    localStoragetoQueueList = [];
  } else {
    localStoragetoQueueList = JSON.parse(localStoragetoQueueList);
  }
  for (let i = 0; i < localStoragetoQueueList.length; i++) {
    if (localStoragetoQueueList[i].id === idMovie) {
      console.log('find');
      setTimeout(() => {
        btnAddQueue.textContent = 'remove from queue';
      }, 0);

      btnAddQueue.classList.add('btn_queue_list');
    } else {
      btnAddQueue.textContent = 'add to queue';
      btnAddQueue.classList.remove('btn_queue_list');
    }
  }

  function addToQueue() {
    let localStoragetoQueueList = localStorage.getItem(locallistQueue);

    if (localStoragetoQueueList == null) {
      console.log('checklocal=>clear');
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
      localStoragetoQueueList.push(element);

      localStorage.setItem(
        locallistQueue,
        JSON.stringify(localStoragetoQueueList)
      );

      btnAddQueue.textContent = 'remove from queue';
      btnAddQueue.classList.add('btn_queue_list');
    }
  }


}
