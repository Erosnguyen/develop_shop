import moment from 'moment';

export const formatDate = (inputDate) => {
  return moment(inputDate).format('DD/MM/YYYY');
};
