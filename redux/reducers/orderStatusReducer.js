const initState = {
    status: null,
    currentFilter:"all"
  };
  
  function orderStatusReducer(state = initState, action) {
    switch (action.type) {
      case "SET_ORDER_STATUS":
        return {
          ...state,
          status: action.payload
        };
      case "SET_CURRENT_FILTER":
        return {
          ...state,
          currentFilter: action.payload
        };
      default:
        return state;
    }
  }
  export default orderStatusReducer;