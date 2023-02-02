const initState = {
    order: false,
    stringAddress: "aa",
  };
  
  function orderReducer(state = initState, action) {
    switch (action.type) {
      case "SET_ORDER":
        return {
          ...state,
          stringAddress: action.payload
        };
  
      default:
        return state;
    }
  }
  export default orderReducer;