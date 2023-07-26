import axios from 'axios';
import authHeader from './auth-header';

const API_URL = import.meta.env.VITE_API_URL;

class PlaceholderService {

  getPlaceholders() {
    return axios.get(API_URL + 'placeholders/');
  }

  createPlaceholder(placeholder) {
    return axios.put(API_URL + 'placeholders/', placeholder, { headers: authHeader() });
  }

  deletePlaceholder(placeholderName) {
    return axios.delete(API_URL + 'placeholders/' + placeholderName, { headers: authHeader() });
  }
}

export default new PlaceholderService();
