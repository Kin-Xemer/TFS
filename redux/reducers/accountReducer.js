const initState = {
  account: {
    customerId: 0,
    customerName: "",
    email: "",
    avatarURL:
      "https://live.staticflickr.com/65535/52719475105_ec5b21e417_w.jpg",
    theAccount: {
      accountId: "khách",
      phoneNumber: "",
      password: "",
      roleId: 0,
      status: true,
    },
    cart: {
    },
    address: "",
  },
  isLogin: false,
  customerName: "",
};

function accountReducer(state = initState, action) {
  switch (action.type) {
    case "SET_ACCOUNT":
      return {
        ...state,
        account: action.payload,
        isLogin: true
      };
    case "SET_LOGIN_STATUS_LOGOUT":
      return {
        ...state,
        isLogin: false
      };
    default:
      return state;
  }
}

export default accountReducer;
