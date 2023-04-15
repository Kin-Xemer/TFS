
const initState = {
  restaurant: [],
  nearRestaurant: {},
  minDistance: 0,
  specRes:null
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
        minDistance: action.minDistance,
      };
    case "SET_SPEC_RESTAURANT":
      return {
        ...state,
        specRes: action.payload,
      };
    default:
      return state;
  }
}

export default restaurantReducer;
