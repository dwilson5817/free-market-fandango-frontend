export default function authHeader() {
  let authToken = localStorage.getItem('authToken');

  if (authToken) {
    return { Authorization: 'Bearer ' + authToken };
  } else {
    return {};
  }
}
