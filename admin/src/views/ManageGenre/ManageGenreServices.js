import axios from 'axios';
import { API_PATH } from 'src/AppConst';

export const getListGenre = () => {
  return axios.get(API_PATH + '/getListGenre');
};

export const insertGenre = (payload) => {
  return axios.post(API_PATH + '/insertGenre', payload);
};

export const updateGenre = (payload) => {
  return axios.put(API_PATH + '/updateGenre', payload);
};

export const deleteGenre = (id) => {
  return axios.delete(API_PATH + '/deleteGenre/' + id);
};
