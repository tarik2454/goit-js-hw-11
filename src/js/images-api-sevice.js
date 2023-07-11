import axios from 'axios';

export default class ImagesApiService {
  #BASE_URL = 'https://pixabay.com';
  #API_KEY = '34147979-e919755f9413e6e8eb4321476';
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.loadedHits = 0;
  }

  async fetchImages() {
    const searchParams = {
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 40,
      page: this.page,
    };

    const url = `${this.#BASE_URL}/api/?key=${this.#API_KEY}`;
    const response = await axios.get(url, { params: searchParams });
    this.incrementPage();

    return response.data;
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

  // get query() {
  //   return this.searchQuery;
  // }

  // set query(newQuery) {
  //   this.searchQuery = newQuery;
  // }
}
