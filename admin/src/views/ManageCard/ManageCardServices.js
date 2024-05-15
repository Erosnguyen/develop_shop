import axios from 'axios';
import { API_PATH } from 'src/AppConst';

export const getAllCard = () => {
  return axios.get(API_PATH + '/getAllCard');
};

export const addCard = (payload) => {
  return axios.post(API_PATH + '/addCard', payload);
};

export const editCard = (payload) => {
  return axios.put(API_PATH + '/editCard', payload);
};

export const deleteCard = (id) => {
  return axios.delete(API_PATH + '/deleteCard/' + id);
};
