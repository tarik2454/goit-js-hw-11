import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import cardsTpl from './cards-tpl';
import ImagesApiService from './images-api-sevice';
import './fixid-header-top-btn';
import lazyLoading from './lazi-loading';

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const sentinel = document.querySelector('#sentinel');

const imagesApiService = new ImagesApiService();

searchForm.addEventListener('submit', onSearchSubmit);

async function onSearchSubmit(event) {
  event.preventDefault();

  window.scrollTo({ top: 0, behavior: 'instant' });

  imagesApiService.searchQuery =
    event.currentTarget.elements.searchQuery.value.trim();

  imagesApiService.resetPage();
  imagesApiService.resetLoadedHits();
  clearCardContainer();

  try {
    const imagesObject = await imagesApiService.fetchImages();
    const { hits, totalHits } = imagesObject;

    if (imagesApiService.query === '' || hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    if (totalHits > 0) {
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    }

    loadImgObserver.observe(sentinel);

    if (hits.length === totalHits) {
      loadImgObserver.unobserve(sentinel);
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }

    imagesApiService.incrementLoadedHits(hits);
    appendCardsMarkup(hits);

    simpleLightbox.refresh();
  } catch (error) {
    console.warn(error);
  }
}

function appendCardsMarkup(cards) {
  gallery.insertAdjacentHTML('beforeend', cardsTpl(cards));
  lazyLoading();
}

function clearCardContainer() {
  gallery.innerHTML = '';
}

const onEntry = async entries => {
  for (const entry of entries) {
    if (!entry.isIntersecting) return;

    try {
      const imagesObject = await imagesApiService.fetchImages();
      const { hits, totalHits } = imagesObject;

      imagesApiService.incrementLoadedHits(hits);

      if (totalHits <= imagesApiService.loadedHits) {
        loadImgObserver.unobserve(sentinel);
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
      }
      if (hits > 40) {
        smoothScrollGallery();
      }

      appendCardsMarkup(hits);
      simpleLightbox.refresh();
    } catch (error) {
      console.warn(error);
    }
  }
};

const options = {
  root: null,
  rootMargin: '300px',
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
