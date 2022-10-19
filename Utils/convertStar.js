export const convertStar = (rating) => {
  if (rating !== 0) {
    if (rating >= 1 && rating <= 1.49) {
      return 1;
    } else if (rating >= 1.5 && rating <= 1.99) {
      return 2;
    } else if (rating >= 2 && rating <= 2.49) {
      return 2;
    } else if (rating >= 2.5 && rating <= 2.99) {
      return 3;
    } else if (rating >= 3 && rating <= 3.49) {
      return 3;
    } else if (rating >= 3.5 && rating <= 3.99) {
      return 4;
    } else if (rating >= 4 && rating <= 4.49) {
      return 4;
    } else if (rating >= 4.5 && rating <= 5) {
      return 5;
    }
  }
};
