import { SET_LIST_FEEDBACK } from "../../Utils/constant";

const initState = {
    feedBackList: [],
    
    };
    
    function feedBackReducer(state = initState, action) {
    switch (action.type) {
    case SET_LIST_FEEDBACK:
      return {
        ...state,
        feedBackList: action.payload,
        
      };
    default:
      return state;
    }
    }
    
    export default feedBackReducer;