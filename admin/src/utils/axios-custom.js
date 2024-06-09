import axios from 'axios';
export const baseURL = 'http://127.0.0.1:8000';

const instance = axios.create({
  baseURL,
});
function getTokenFromLocalStorage() {
  return localStorage.getItem('token');
}
function setAuthorizationHeader(config) {
  const token = getTokenFromLocalStorage();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}

instance.interceptors.request.use(setAuthorizationHeader, function (error) {
  return Promise.reject(error);
});

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      // Handle logout here
      localStorage.removeItem("token");
      window.location = '/auth/login'; // Redirect to login page
    }
    return Promise.reject(error);
  },
);

export default instance;
