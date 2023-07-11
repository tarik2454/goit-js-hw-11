export default function createCardTpl(cards) {
  return cards
    .map(card => {
      const {
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = card;

      return `
        <div class="photo__card">
          <a class="photo__link" href="${largeImageURL}">
            <img class="photo__img lazyload" data-src="${webformatURL}" alt="${tags}" loading="lazy" />
          </a>
            <div class="info">
              <p class="info__item">
                <b>Likes</b>
                <span>${likes}</span>
              </p>
              <p class="info__item">
                <b>Views</b>
                <span>${views}</span>
              </p>
              <p class="info__item">
                <b>Comments</b>
                <span>${comments}</span>
              </p>
              <p class="info__item">
                <b>Downloads</b>
                <span>${downloads}</span>
              </p>
            </div>
        </div>`;
    })
    .join('');
}
