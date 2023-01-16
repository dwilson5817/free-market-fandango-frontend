import axios from 'axios';
import authHeader from './auth-header';

const API_URL = import.meta.env.VITE_API_URL;

class PlaceholderService {

  getPlaceholders() {
    return axios.get(API_URL + 'placeholder');
  }

  createPlaceholder(placeholder) {
    return axios.put(API_URL + 'placeholder', placeholder, { headers: authHeader() });
  }

  deletePlaceholder(placeholderName) {
    return axios.delete(API_URL + 'placeholder/' + placeholderName, { headers: authHeader() });
  }
}

export default new PlaceholderService();
