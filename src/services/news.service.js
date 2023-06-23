import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

class NewsService {
  getNews() {
    return axios.get(API_URL + 'current_event/');
  }
}

export default new NewsService();
