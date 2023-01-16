import AuthService from '../services/auth.service';

const authToken = localStorage.getItem('authToken');
const initialState = authToken
  ? { status: { loggedIn: true }, authToken }
  : { status: { loggedIn: false }, authToken: null };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }, authToken) {
      return AuthService.login(authToken).then(
        user => {
          commit('loginSuccess', authToken);
          return Promise.resolve(authToken);
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }) {
      AuthService.logout();
      commit('logout');
    },
  },
  mutations: {
    loginSuccess(state, authToken) {
      state.status.loggedIn = true;
      state.authToken = authToken;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.authToken = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.authToken = null;
    },
  }
};
