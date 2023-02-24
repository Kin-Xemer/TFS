import {combineReducers} from "redux"
import todoReducer from "./productReducer"
import addressReducer from "./addressReducer";
import foodReducer from "./foodReducer";
import restaurantReducer from './restaurantReducer';
import accountReducer from "./accountReducer";
import orderStatusReducer from './orderStatusReducer';
import localLocationReducer from './localLocationReducer';
const rootReducer = combineReducers({
    cart: todoReducer,
    address: addressReducer,
    food: foodReducer,
    restaurant: restaurantReducer,
    account: accountReducer,
    status:orderStatusReducer,
    local: localLocationReducer
})

export default rootReducer;