import axios from 'axios';
import authHeader from "@/services/auth-header";

const API_URL = import.meta.env.VITE_API_URL;

class AccountService {
  getAccounts() {
    return axios.get(API_URL + 'accounts/');
  }

  getAccount(cardNumber) {
    return axios.get(API_URL + 'accounts/' + cardNumber);
  }

  createAccount(account) {
    return axios.put(API_URL + 'accounts/', account, { headers: authHeader() });
  }

  deleteAccount(cardNumber) {
    return axios.delete(API_URL + 'accounts/' + cardNumber, { headers: authHeader() });
  }

}

export default new AccountService();
