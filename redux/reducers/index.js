import {combineReducers} from "redux"
import todoReducer from "./productReducer"
import loginReducer from "./loginReducer"
const rootReducer = combineReducers({
    cart: todoReducer,
    login: loginReducer
})

export default rootReducer;