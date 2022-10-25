import { configureStore } from "@reduxjs/toolkit";
import {legacy_createStore as createStore, applyMiddleware} from "redux";
import {Provider, useDispatch} from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import RootReducer from "../reducers";

const stores =  createStore(RootReducer,applyMiddleware(thunkMiddleware));
export default stores