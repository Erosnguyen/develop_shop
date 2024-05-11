import axios from 'axios';
import { API_PATH } from 'src/AppConst';

export const login = (payload) => {
  return axios.post(API_PATH + '/login', payload);
};
