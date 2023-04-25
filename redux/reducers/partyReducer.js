import { DELETE_MENU_ITEM, DELETE_PARTY, SET_MENU_QUANTITY, SET_NOTE, SET_PARTY_LIST, SET_PARTY_NAME, SET_SELECTED_FORM, SET_TOTAL_PRICE } from "../../Utils/constant";

const initState = {
  note: "",
  quantity: 0,
  itemList: [],
  totalPrice: 0,
  partyName: "Thực đơn",
  partyTemplate:
    "https://live.staticflickr.com/65535/52747068688_98b7ab0db3_n.jpg",
  subTotal: 0,
};
const getCurrentSubtotal = (state) => {
  let subTotal = 0;
  Object.keys(state.itemList).forEach(function (item) {
    subTotal += state.itemList[item].price;
  });
  return subTotal;
};
const getCurrentTotalPrice = (subTotal, quantity) => {

  return subTotal * quantity;
};
const itemFilter = (itemList, action) => {
  return itemList.filter((item) => item.foodId !== action.payload);
};
function partyReducer(state = initState, action) {
  switch (action.type) {
    case DELETE_MENU_ITEM:
      return {
        ...state,
        itemList: itemFilter(state.itemList, action),
        subTotal: getCurrentSubtotal({
          ...state,
          itemList: itemFilter(state.itemList, action),
        }),
        totalPrice:
          getCurrentSubtotal({
            ...state,
            itemList: itemFilter(state.itemList, action),
          }) * state.quantity,
      };
    case SET_MENU_QUANTITY:
      return {
        ...state,
        quantity: action.payload,
        subTotal: getCurrentSubtotal(state),
        totalPrice: getCurrentSubtotal(state) * action.payload,
      };
    case SET_SELECTED_FORM:
      return {
        ...state,
        partyTemplate: action.payload,
      };
    case SET_TOTAL_PRICE:
      return {
        ...state,
        totalPrice: action.payload,
      };
    case SET_NOTE:
      return {
        ...state,
        note: action.payload,
      };
    case SET_PARTY_NAME:
      return {
        ...state,
        partyName: action.payload,
      };
    case SET_PARTY_LIST:
      let item = {
        foodId: action.payload.id,
        foodImage: action.payload.imgUrl,
        foodName: action.payload.foodName,
        price: action.payload.price * 5,
      };
      state.itemList.push(item);
      return {
        ...state,
        subTotal: getCurrentSubtotal(state),
        totalPrice: getCurrentSubtotal(state) * state.quantity,
      };
    case DELETE_PARTY:
      return {
        ...state,
        note: "",
        quantity: 0,
        itemList: [],
        totalPrice: 0,
        subTotal: 0,
        partyName: "Thực đơn",
      };

    default:
      return state;
  }
}

export default partyReducer;
