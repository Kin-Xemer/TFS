
const initState = {
    feedBackList: [],
    
    };
    
    function feedBackReducer(state = initState, action) {
    switch (action.type) {
    case "SET_LIST_FEEDBACK":
      return {
        ...state,
        feedBackList: action.payload,
        
      };
      case "SET_STRING_ADDRESS":
        return {
          ...state,
          feedBackList: []
        }
    default:
      return state;
    }
    }
    
    export default feedBackReducer;