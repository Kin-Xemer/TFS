export const getListPercentRating = (listRating) => {

  const occurrences = listRating.reduce(
    function (acc, curr) {
      return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
    },
    { "5": 0, "4": 0, "3": 0, "2": 0, "1": 0 }
  );


  return occurrences;
};
export const getAverageRating = (listRating) => {
  let sum = listRating.reduce((acc, curr) => {
    return acc + curr.rate;
  }, 0);
  return sum / listRating.length;
};
