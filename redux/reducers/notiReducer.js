const initState = {
listNoti:[]
};

function notiReducer(state = initState, action) {
  switch (action.type) {
    case "SET_NOTI":
      return {
        ...state,
        listNoti: action.payload,
      };

    default:
      return state;
  }
}
export default notiReducer;
