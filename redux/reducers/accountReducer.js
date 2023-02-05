
const initState = {
account: {},
customerName: "",
};

function accountReducer(state = initState, action) {
switch (action.type) {
  case "SET_ACCOUNT":
    return {
      ...state,
      account: action.payload,
    };
  default:
    return state;
}
}

export default accountReducer;