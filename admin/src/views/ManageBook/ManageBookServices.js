import axios from 'axios';
import { API_PATH } from 'src/AppConst';

export const getAllProducts = () => {
  return axios.get(API_PATH + '/products');
};

export const getAllBook = () => {
  return axios.get(API_PATH + '/getAllBook');
};

export const insertBook = (payload) => {
  return axios.post(API_PATH + '/insertBook', payload);
};

export const updateBook = (payload) => {
  return axios.put(API_PATH + '/updateBook', payload);
};

export const deleteProduct = (id) => {
  return axios.delete(API_PATH + '/products/' + id);
};
