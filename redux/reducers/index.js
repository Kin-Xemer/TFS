import {combineReducers} from "redux"
import todoReducer from "./productReducer"
import loginReducer from "./loginReducer"
import addressReducer from "./addressReducer";
import foodReducer from "./foodReducer";
const rootReducer = combineReducers({
    cart: todoReducer,
    login: loginReducer,
    address: addressReducer,
    food: foodReducer,
})

export default rootReducer;