import axios from 'axios';
import { API_PATH } from 'src/AppConst';

export const getAllUser = () => {
  return axios.get(API_PATH + '/getAllUser');
};

export const insertUser = (payload) => {
  return axios.post(API_PATH + '/insertUser', payload);
};

export const updateGenre = (payload) => {
  return axios.put(API_PATH + '/updateGenre', payload);
};

export const deleteGenre = (id) => {
  return axios.delete(API_PATH + '/deleteGenre/' + id);
};
