import axios from 'axios';
import authHeader from './auth-header';

const API_URL = import.meta.env.VITE_API_URL;

class StockService {

  getStocks() {
    return axios.get(API_URL + 'stock');
  }

  createStock(stock) {
    return axios.put(API_URL + 'stock', stock, { headers: authHeader() });
  }

  deleteStock(stockCode) {
    return axios.delete(API_URL + 'stock/' + stockCode, { headers: authHeader() });
  }
}

export default new StockService();
