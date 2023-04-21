export default class ImagesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.loadedHits = 0;
  }

  fetchImages() {
    return fetch(
      `https://pixabay.com/api/?key=34147979-e919755f9413e6e8eb4321476&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`
    )
      .then(response => response.json())
      .then(data => {
        this.incrementPage();
        return data;
      })
      .catch(error => console.warn(`${error}`));
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  incrementLoadedHits(hits) {
    this.loadedHits += hits.length;
  }

  resetLoadedHits() {
    this.loadedHits = 0;
  }
}
