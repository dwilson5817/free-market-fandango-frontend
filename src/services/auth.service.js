import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

class AuthService {
  login(password) {
    return axios
      .post(API_URL + 'auth/', {
        password: password
      })
      .then(response => {
        if (response.data.access_token) {
          localStorage.setItem('authToken', response.data.access_token);
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('authToken');
  }
}

export default new AuthService();
