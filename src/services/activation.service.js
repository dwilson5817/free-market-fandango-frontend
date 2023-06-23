import axios from 'axios';
import authHeader from './auth-header';

const API_URL = import.meta.env.VITE_API_URL;

class ActivationService {

  getStatus() {
    return axios.get(API_URL + 'activation/');
  }

  startMarket() {
    return axios.put(API_URL + 'activation/open/', null, { headers: authHeader() });
  }

  stopMarket(minutes) {
    return axios.put(API_URL + 'activation/close/?ends_in=' + minutes, null, { headers: authHeader() });
  }

  crashMarket() {
      return axios.put(API_URL + 'crash/', null, { headers: authHeader() });
  }
}

export default new ActivationService();
