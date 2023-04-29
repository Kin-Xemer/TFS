import {combineReducers} from "redux"
import todoReducer from "./productReducer"
import addressReducer from "./addressReducer";
import foodReducer from "./foodReducer";
import restaurantReducer from './restaurantReducer';
import accountReducer from "./accountReducer";
import orderStatusReducer from './orderStatusReducer';
import localLocationReducer from './localLocationReducer';
import serviceReducer from './serviceReducer';
import partyReducer from "./partyReducer";
import feedBackReducer from "./feedBackReducer";
import notiReducer from "./notiReducer";
import comboReducer from "./comboReducer";
import promotionReducer from "./promotionReducer";
import eventReducer from "./eventReducer";
const rootReducer = combineReducers({
    cart: todoReducer,
    address: addressReducer,
    food: foodReducer,
    restaurant: restaurantReducer,
    account: accountReducer,
    status:orderStatusReducer,
    local: localLocationReducer,
    services: serviceReducer,
    feedback: feedBackReducer,
    party: partyReducer,
    noti: notiReducer,
    combo:comboReducer,
    promotion:promotionReducer,
    event:eventReducer
})

export default rootReducer;