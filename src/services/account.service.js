import axios from 'axios';
import authHeader from "@/services/auth-header";

const API_URL = import.meta.env.VITE_API_URL;

class AccountService {
  getAccounts() {
    return axios.get(API_URL + 'account');
  }

  createAccount(account) {
    return axios.put(API_URL + 'account', account, { headers: authHeader() });
  }

  deleteAccount(cardNumber) {
    return axios.delete(API_URL + 'account/' + cardNumber, { headers: authHeader() });
  }

}

export default new AccountService();
