import {combineReducers} from "redux"
import noteReducer from "./noteReducer"
import hobbyReducer from "./hobbyReducer"
import todoReducer from "./productReducer"
const rootReducer = combineReducers({
    dataApp: noteReducer,
    hobbyRe: hobbyReducer,
    cart: todoReducer,
})

export default rootReducer;