import {combineReducers} from "redux"
import todoReducer from "./productReducer"
const rootReducer = combineReducers({
    cart: todoReducer,
})

export default rootReducer;