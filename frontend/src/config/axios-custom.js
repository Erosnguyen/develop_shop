import axios from "axios";
export const baseURL = "http://127.0.0.1:8000";

const instance = axios.create({
  baseURL,
});
function getTokenFromLocalStorage() {
  return localStorage.getItem("access_token");
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
    return Promise.reject(error);
  }
);

export default instance;
