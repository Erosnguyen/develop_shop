import axios from "axios";

const baseURL = "http://127.0.0.1:8000";

const API_PATH = baseURL + "/accounts";

export const handleLogin = (data) => {
  let url = API_PATH + "/login";
  return axios.post(url, data);
};

export const handleRegister = (data) => {
  let url = API_PATH + "/register";
  return axios.post(url, data);
};

export const handleVerify = (data) => {
  let url = API_PATH + "/register/verify";
  return axios.patch(url, data);
};
