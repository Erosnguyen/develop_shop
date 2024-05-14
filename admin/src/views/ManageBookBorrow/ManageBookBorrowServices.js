import axios from 'axios';
import { API_PATH } from 'src/AppConst';

export const listMuonSach = () => {
  return axios.get(API_PATH + '/listMuonSach');
};

export const muonsach = (payload) => {
  return axios.post(API_PATH + '/muonsach', payload);
};

export const updateGenre = (payload) => {
  return axios.put(API_PATH + '/updateGenre', payload);
};

export const trasach = (payload) => {
  return axios.post(API_PATH + '/trasach', payload);
};
