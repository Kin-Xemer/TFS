const initState = {
    timeNow: 0,
  };
  
  function timeNowReducer(state = initState, action) {
    switch (action.type) {
      case "SET_TIME_NOW":
        return {
          ...state,
          timeNow: action.payload
        };
  
      default:
        return state;
    }
  }
  export default timeNowReducer;
  