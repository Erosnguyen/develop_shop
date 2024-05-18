export const API_PATH = 'http://127.0.0.1:8000';

export const convertDate = (inputDate) => {
  // Chuyển inputDate thành kiểu Date
  var inputDateObj = new Date(inputDate);

  // Lấy ngày, tháng, năm
  var year = inputDateObj.getFullYear();
  var month = inputDateObj.getMonth() + 1; // Tháng bắt đầu từ 0
  var day = inputDateObj.getDate();

  // Format lại ngày thành chuỗi "YYYY-MM-DD"
  var newDate = year + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day;

  return newDate;
};

export const convertDateFormat = (inputDate) => {
  // Split the input date string into date and time parts
  let [datePart, timePart] = inputDate.split(' ');

  // Split the date part into year, month, and day
  let [year, month, day] = datePart.split('-');

  // Format the date in "dd/mm/yyyy js" format
  let formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
};

export const chuyenNgayThanhChuoi = (ngayThangNam) => {
  var nam = ngayThangNam[0];
  var thang = ngayThangNam[1];
  var ngay = ngayThangNam[2];

  var chuoiNgayThangNam = ngay + '/' + thang + '/' + nam;

  return chuoiNgayThangNam;
};

export const dinhDangTien = (soTien) => {
  // Định dạng số tiền theo ngôn ngữ và quốc gia của máy tính
  return soTien.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};

export const convertToDateTime = (inputDate) => {
  // Tạo một đối tượng Date từ chuỗi ngày đầu vào
  var date = new Date(inputDate);

  // Lấy các thành phần của ngày (năm, tháng, ngày)
  var year = date.getFullYear();
  var month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0
  var day = date.getDate().toString().padStart(2, '0');

  // Tạo định dạng mới: "yyyy-mm-ddT00:00:00"
  var newDateTimeFormat = `${year}-${month}-${day}T00:00:00`;

  return newDateTimeFormat;
};
