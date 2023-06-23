import axios from 'axios';
import authHeader from './auth-header';

const API_URL = import.meta.env.VITE_API_URL;

class PurchaseService {

  getPurchases() {
    return axios.get(API_URL + 'purchases/', { headers: authHeader() });
  }

  createPurchase(purchase) {
    return axios.post(API_URL + 'purchases/', purchase, { headers: authHeader() });
  }
}

export default new PurchaseService();
