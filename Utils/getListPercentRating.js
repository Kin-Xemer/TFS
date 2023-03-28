export const getListPercentRating = (listRating) => {
  let listPercent = [
    { rate: 1, value: 0 },
    { rate: 2, value: 0 },
    { rate: 3, value: 0 },
    { rate: 4, value: 0 },
    { rate: 5, value: 0 },
  ];

  const occurrences = listRating.reduce(function (acc, curr) {
    return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
  }, {});

//   let averageData = [];

//   Object.keys(occurrences).map((key) => {
//     listPercent = listPercent.map((feedback) => {
//       if (feedback.rate === occurrences[key]) {
//         averageData.push({
//           rate: item.rate,
//           value: item.rate / 2,
//         });
//       }
//       averageData.push(feedback);
//     });
//   });

  //   let updatedList = listRating.map((feedback) => {
  //     if (feedback.foodId === item.id) {
  //       return {
  //         ...item,
  //         foodId: item.id,
  //         customerId: customerId,
  //         avatarUrl: avatarUrl,
  //         comment: textArea,
  //         rate: rating,
  //         status: true,
  //       };
  //     }
  //     return feedback; // else return unmodified item
  //   });
  //   let listUpdate = [];
  //   let sum = listRating.length;

  //   const result = listRating.reduce((acc, rating) => {
  //     return rating;
  //   }, {});

  // listPercent.map((itemRate) => {
  //     listUpdate = listRating.map((item, i) => {

  //             return{
  //                 ...itemRate,
  //                 rate: item.rate,
  //                 value: item.rate/2,
  //             }

  //     })
  // })
  //   console.log(listRating);
  // console.log(listPercent);
  return occurrences
};
export const getAverageRating = (listRating) => {
  let sum = listRating.reduce((acc, curr) => {
    return acc + curr.rate;
  }, 0);
  return sum / listRating.length;
};
