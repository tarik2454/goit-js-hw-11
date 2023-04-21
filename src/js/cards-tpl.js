export default function createCardTpl(cards) {
  return cards
    .map(card => {
      return `
          <div class="photo-card">
            <a href="${card.largeImageURL}">
              <img src="${card.webformatURL}" alt="${card.tags}" loading="lazy" />
            </a>
              <div class="info">
                <p class="info-item">
                  <b>${card.likes} Likes</b>
                </p>
                <p class="info-item">
                  <b>${card.views} Views</b>
                </p>
                <p class="info-item">
                  <b>${card.comments} Comments</b>
                </p>
                <p class="info-item">
                  <b>${card.downloads} Downloads</b>
                </p>
              </div>
          </div>`;
    })
    .join('');
}
