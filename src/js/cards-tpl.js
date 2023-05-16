export default function createCardTpl(cards) {
  return cards
    .map(card => {
      return `
          <div class="photo__card">
            <a class="photo__link" href="${card.largeImageURL}">
              <img class="photo__img lazyload" data-src="${card.webformatURL}" alt="${card.tags}" loading="lazy" />
            </a>
              <div class="info">
                <p class="info__item">
                  <b>Likes</b>
                  <span>${card.likes}</span>
                </p>
                <p class="info__item">
                  <b>Views</b>
                  <span>${card.views}</span>
                </p>
                <p class="info__item">
                  <b>Comments</b>
                  <span>${card.comments}</span>
                </p>
                <p class="info__item">
                  <b>Downloads</b>
                  <span>${card.downloads}</span>
                </p>
              </div>
          </div>`;
    })
    .join('');
}
