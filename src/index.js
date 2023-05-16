import Notiflix from 'notiflix';
// import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import cardsTpl from './js/cards-tpl';
import ImagesApiService from './js/images-api-sevice';
import './js/fixid-header-top-btn';
import lazyLoading from './js/lazi-loading';

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const sentinel = document.querySelector('#sentinel');

const imagesApiService = new ImagesApiService();

searchForm.addEventListener('submit', onSearchSubmit);

function onSearchSubmit(event) {
  event.preventDefault();

  window.scrollTo({ top: 0, behavior: 'instant' });

  imagesApiService.query =
    event.currentTarget.elements.searchQuery.value.trim();

  imagesApiService.resetPage();
  imagesApiService.resetLoadedHits();

  imagesApiService
    .fetchImages()
    .then(images => {
      if (imagesApiService.query === '' || images.hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }
      if (images.totalHits > 0) {
        Notiflix.Notify.success(`Hooray! We found ${images.totalHits} images.`);
      }

      loadImgObserver.observe(sentinel);

      if (images.hits.length === images.totalHits) {
        loadImgObserver.unobserve(sentinel);
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
      }

      clearCardContainer();
      imagesApiService.incrementLoadedHits(images.hits);
      appendCardsMarkup(images.hits);

      simpleLightbox.refresh();
    })
    .catch(error => console.warn`${error}`);
}

function appendCardsMarkup(cards) {
  gallery.insertAdjacentHTML('beforeend', cardsTpl(cards));
  lazyLoading();
}

function clearCardContainer() {
  gallery.innerHTML = '';
}

const onEntry = entries => {
  entries.forEach(entry => {
    //&& imagesApiService.query !== ''
    if (!entry.isIntersecting) return;
    imagesApiService
      .fetchImages()
      .then(images => {
        imagesApiService.incrementLoadedHits(images.hits);

        if (images.totalHits <= imagesApiService.loadedHits) {
          loadImgObserver.unobserve(sentinel);
          Notiflix.Notify.info(
            "We're sorry, but you've reached the end of search results."
          );
        }
        if (images.hits > 40) {
          smoothScrollGallery();
        }

        appendCardsMarkup(images.hits);
        simpleLightbox.refresh();
      })
      .catch(error => {
        console.warn(`${error}`);
      });
  });
};

const options = {
  root: null,
  rootMargin: '200px',
};

const loadImgObserver = new IntersectionObserver(onEntry, options);
loadImgObserver.observe(sentinel);

const simpleLightbox = new SimpleLightbox('.gallery a', {
  fadeSpeed: 100,
  animationSlide: false,
});

function smoothScrollGallery() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
