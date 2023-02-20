
const initState = {
  restaurant: [],
  nearRestaurant: {},
};

function restaurantReducer(state = initState, action) {
  switch (action.type) {
    case "SET_RESTAURANT":
      return {
        ...state,
        restaurant: action.payload,
      };
    case "SET_NEARLY_RESTAURANT":
      return {
        ...state,
        nearRestaurant: action.payload,
      };
    default:
      return state;
  }
}

export default restaurantReducer;
