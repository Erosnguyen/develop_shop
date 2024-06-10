import axios from '../../utils/axios-custom.js';
import { API_PATH } from 'src/AppConst';

export const getListOrders = () => {
  return axios.get(API_PATH + '/orders');
};

export const getProductById = (id) => {
  return axios.get(API_PATH + '/products/' + id);
};

export const getCustomerById = (id) => {
  return axios.get(API_PATH + '/accounts/' + id);
}

export const updateOrder = (id, data) => {
  return axios.put(API_PATH + '/orders/' + id, data);
}
