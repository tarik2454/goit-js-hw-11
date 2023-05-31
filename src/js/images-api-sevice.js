import axios from 'axios';

const BASE_URL = 'https://pixabay.com';
const API_KEY = '34147979-e919755f9413e6e8eb4321476';

export default class ImagesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.loadedHits = 0;
  }

  async fetchImages() {
    const searchParams = new URLSearchParams({
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 40,
      page: this.page,
    });

    const url = `${BASE_URL}/api/?key=${API_KEY}&${searchParams.toString()}`;

    // return fetch(url)
    //   .then(response => response.json())
    //   .then(data => {
    //     this.incrementPage();
    //     return data;
    //   });

    const response = await axios.get(url);
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

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
