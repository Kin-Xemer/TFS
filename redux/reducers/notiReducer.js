const initState = {
listNoti:[],
numberNoti:0,
};

function notiReducer(state = initState, action) {
  switch (action.type) {
    case "SET_NOTI":
      return {
        ...state,
        listNoti: action.payload,
      };
    case "SET_NUMBER_NOTI":
      return {
        ...state,
        numberNoti: action.payload,
      };

    default:
      return state;
  }
}
export default notiReducer;
