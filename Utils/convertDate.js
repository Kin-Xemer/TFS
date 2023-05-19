import moment from "moment-timezone";

export const convertDate = (date) => {
  let year = date.slice(0, 4);
  let month = date.slice(5, 7);
  let day = date.slice(8, 10);
  let time = date.slice(11, 16);
  return day + "/" + month + "/" + year + "  " + time;
};
export const convertOnlyDate = (date) => {
  let year = date.slice(0, 4);
  let month = date.slice(5, 7);
  let day = date.slice(8, 10);
  return day + "/" + month + "/" + year;
};
export const convertDateToString = (date) => {
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  return day + "/" + month + "/" + year;
};
export const convertTimeToString = (date) => {
  let hour = date.getHours();
  let minute = date.getMinutes();
  return hour + ":" + minute;
};
export const formatVNTime = (date) => {
  return moment.utc(date).tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY  HH:mm");
};
export const formatVNDate = (date) => {
  return moment.utc(date).tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY");
};
