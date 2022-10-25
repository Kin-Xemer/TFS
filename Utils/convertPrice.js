import 'intl';
import 'intl/locale-data/jsonp/en';
export const convertPrice = (price) => {
  return new Intl.NumberFormat("vi-VN", {
    currency: "VND",
  }).format(price);
};
