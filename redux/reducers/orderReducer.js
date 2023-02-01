const initState = {
    isLogin: false,
    user: null,
  };
  
  function orderReducer(state = initState, action) {
    switch (action.type) {
      case "GET_ORDER":
        return {
          ...state,
         food: action.payload
        };
  
      default:
        return state;
    }
  }
  export default orderReducer;