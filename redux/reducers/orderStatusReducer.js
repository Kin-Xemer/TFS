const initState = {
    status: null,
  };
  
  function orderStatusReducer(state = initState, action) {
    switch (action.type) {
      case "SET_ORDER_STATUS":
        return {
          ...state,
          status: action.payload
        };
      default:
        return state;
    }
  }
  export default orderStatusReducer;