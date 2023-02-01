
import {legacy_createStore as createStore, applyMiddleware,compose} from "redux";
import thunkMiddleware from 'redux-thunk'
import RootReducer from "../reducers";


const stores =  createStore(RootReducer,applyMiddleware(thunkMiddleware));
export default stores