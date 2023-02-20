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
        case "CLEAR_ORDER_STATUS":
            state.status = ""
            return {
              ...state,
            };
      
      default:
        return state;
    }
  }
  export default orderStatusReducer;