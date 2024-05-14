import axios from '../../utils/axios-custom.js';
import { API_PATH } from 'src/AppConst';

export const getAllProducts = () => {
  return axios.get(API_PATH + '/products');
};

export const getAllBook = () => {
  return axios.get(API_PATH + '/getAllBook');
};

export const addProduct = (payload) => {
  return axios.post(API_PATH + '/products', payload);
};

export const updateProduct = (id, payload) => {
  return axios.put(API_PATH + '/products/' + id, payload);
};

export const deleteProduct = (id) => {
  return axios.delete(API_PATH + '/products/' + id);
};

export const getById = (id) => {
  return axios.get(API_PATH + '/products/' + id);
};
