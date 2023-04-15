const WEIGHT_PRICE_TABLE = [
  { weight: 0.5, price: 20000 },
  { weight: 1, price: 25000 },
  { weight: 1.5, price: 30000 },
  { weight: 2, price: 35000 },
  { weight: 3, price: 40000 },
  { weight: 4, price: 50000 },
  { weight: 5, price: 55000 },
  { weight: 6, price: 60000 },
  { weight: 7, price: 65000 },
  { weight: 8, price: 70000 },
  { weight: 9, price: 75000 },
  { weight: 10, price: 80000 },
];
const DISTANCE_PRICE_TABLE = [
  { distance: 10, price: 12000 },
  { distance: 30, price: 14000 },
  { distance: 50, price: 16000 },
  { distance: 70, price: 20000 },
  { distance: 100, price: 22000 },
  { distance: 200, price: 30000 },
  { distance: 300, price: 40000 },
  { distance: 400, price: 50000 },
  { distance: 500, price: 60000 },
];

export const calculateShippingFee = (weight, distance) => {
  const weightPrice = WEIGHT_PRICE_TABLE.find((item) => item.weight >= weight);
  const distancePrice = DISTANCE_PRICE_TABLE.find(
    (item) => item.distance >= distance
  );

  return weightPrice.price + distancePrice.price;
};
