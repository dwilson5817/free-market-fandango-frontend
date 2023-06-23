import axios from 'axios';
import authHeader from './auth-header';

const API_URL = import.meta.env.VITE_API_URL;

class PurchaseService {

  getSettings() {
    return axios.get(API_URL + 'settings/', { headers: authHeader() });
  }

  setSettings(settings) {
    return axios.put(API_URL + 'settings/', { settings: settings }, { headers: authHeader() });
  }
}

export default new PurchaseService();
