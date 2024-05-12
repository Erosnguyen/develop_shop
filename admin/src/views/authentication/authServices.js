import axios from 'axios';
import { API_PATH } from 'src/AppConst';

const url = API_PATH + '/accounts';

export const login = (payload) => {
  let path = url + '/login';
  return axios.post(path, payload);
};
