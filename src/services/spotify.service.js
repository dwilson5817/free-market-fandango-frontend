import axios from 'axios';
import authHeader from "@/services/auth-header";

const API_URL = import.meta.env.VITE_API_URL;

class SpotifyService {
  getAccountInfo() {
    return axios.get(API_URL + 'spotify/account_info/');
  }

  disconnectAccount() {
    return axios.get(API_URL + 'spotify/disconnect/', { headers: authHeader() });
  }

  getConnectUrl() {
    return API_URL + 'spotify/redirect/'
  }

  getCurrentlyPlaying() {
    return axios.get(API_URL + 'spotify/currently_playing/');
  }
}

export default new SpotifyService();
