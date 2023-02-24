const initState = {
  myLocation: {},
};

function localLocationReducer(state = initState, action) {
  switch (action.type) {
    case "SET_LOCAL":
      return {
        ...state,
        myLocation: action.payload
      };

    default:
      return state;
  }
}
export default localLocationReducer;
