import Notiflix from 'notiflix';
// import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import cardsTpl from './js/cards-tpl';
import ImagesApiService from './js/images-api-sevice';

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const sentinel = document.querySelector('#sentinel');

const imagesApiService = new ImagesApiService();

searchForm.addEventListener('submit', onSearchSubmit);

function onSearchSubmit(event) {
  event.preventDefault();

  imagesApiService.searchQuery = event.currentTarget.elements.searchQuery.value;

  imagesApiService.resetLoadedHits();
  imagesApiService.resetPage();

  imagesApiService.fetchImages().then(images => {
    if (images.totalHits > 0) {
      Notiflix.Notify.success(`Hooray! We found ${images.totalHits} images.`);
    }
    if (images.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    clearCardContainer();
    observer.observe(sentinel);
    imagesApiService.incrementLoadedHits(images.hits);
    appendCardsMarkup(images.hits);

    if (images.hits.length === images.totalHits) {
      observer.unobserve(sentinel);
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }

    simpleLightbox.refresh();
  });
}

// function fetchImages() {
//   imagesApiService
//     .fetchImages()
//     .then(images => {
//       if (images.totalHits > 0) {
//         Notiflix.Notify.success(`Hooray! We found ${images.totalHits} images.`);
//       }
//       if (images.hits.length === 0) {
//         Notiflix.Notify.failure(
//           'Sorry, there are no images matching your search query. Please try again.'
//         );
//       }
//       appendCardsMarkup(images.hits);
//       imagesApiService.incrementPage();
//     })
//     .catch(error => console.log(error));
// }

function appendCardsMarkup(cards) {
  gallery.insertAdjacentHTML('beforeend', cardsTpl(cards));
}

function clearCardContainer() {
  gallery.innerHTML = '';
}

const onEntry = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && imagesApiService.searchQuery !== '') {
      imagesApiService
        .fetchImages()
        .then(images => {
          imagesApiService.incrementLoadedHits(images.hits);

          if (images.totalHits <= imagesApiService.loadedHits) {
            observer.unobserve(sentinel);
            Notiflix.Notify.info(
              "We're sorry, but you've reached the end of search results."
            );
          }

          appendCardsMarkup(images.hits);

          simpleLightbox.refresh();
        })
        .catch(error => {
          console.warn(`${error}`);
        });
    }
  });
};

const options = {
  rootMargin: '200px',
};

const observer = new IntersectionObserver(onEntry, options);
observer.observe(sentinel);

const simpleLightbox = new SimpleLightbox('.gallery a', {
  fadeSpeed: 100,
  animationSlide: false,
});
