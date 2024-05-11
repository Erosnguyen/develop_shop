import axios from 'axios';
import { API_PATH } from 'src/AppConst';

export const getAlllStaff = () => {
  return axios.get(API_PATH + '/getAlllStaff');
};

export const insertStaff = (payload) => {
  return axios.post(API_PATH + '/insertStaff', payload);
};

export const updateStaff = (payload) => {
  return axios.put(API_PATH + '/updateStaff', payload);
};

export const deleteStaff = (id) => {
  return axios.delete(API_PATH + '/deleteStaff/' + id);
};
