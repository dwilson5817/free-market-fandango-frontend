import axios from 'axios';
import authHeader from './auth-header';

const API_URL = import.meta.env.VITE_API_URL;

class StockService {

  getStocks() {
    return axios.get(API_URL + 'stocks/');
  }

  createStock(stock) {
    return axios.put(API_URL + 'stocks/', stock, { headers: authHeader() });
  }

  updateStockInStockStatus(stockCode, inStock) {
    return axios.put(API_URL + 'stocks/' + stockCode + '/?in_stock=' + inStock, null, { headers: authHeader() });
  }

  deleteStock(stockCode) {
    return axios.delete(API_URL + 'stocks/' + stockCode, { headers: authHeader() });
  }
}

export default new StockService();
