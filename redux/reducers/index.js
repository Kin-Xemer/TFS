import {combineReducers} from "redux"
import todoReducer from "./productReducer"
import loginReducer from "./loginReducer"
import addressReducer from "./addressReducer";
import foodReducer from "./foodReducer";
import restaurantReducer from './restaurantReducer';
import accountReducer from "./accountReducer";
const rootReducer = combineReducers({
    cart: todoReducer,
    login: loginReducer,
    address: addressReducer,
    food: foodReducer,
    restaurant: restaurantReducer,
    account: accountReducer
})

export default rootReducer;