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
      case "CLEAR_FILTER":
        return {
          ...state,
          currentFilter:"all",
          status:null
        };
      default:
        return state;
    }
  }
  export default orderStatusReducer;