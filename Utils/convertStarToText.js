export const convertStarToText = (star) => {
  let feedBackType = [
    {
      id: 1,
      rate: 1,
      name: "Quá tệ",
    },
    {
      id: 2,
      rate: 2,
      name: "Không ngon lắm",
    },
    {
      id: 3,
      rate: 3,
      name: "Bình thường",
    },
    {
      id: 4,
      rate: 4,
      name: "Ngon",
    },
    {
      id: 5,
      rate: 5,
      name: "Hoàn hảo",
    },
  ];

  const feedBack = feedBackType.find((item) => item.rate === star);
  return feedBack.name;
};
