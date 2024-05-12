import axiosCuston from "../../config/axios-custom.js";

const baseURL = "http://127.0.0.1:8000";

const API_PATH = baseURL + "/orders";

export const handleAddOrder = (payload) => {
  return axiosCuston.post(API_PATH, payload);
};
