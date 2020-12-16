/** @format */

import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import {
	productListReducer,
	productDetailsReducer,
	productSaveReducer,
	productDeleteReducer,
} from "./Reducer/productReducer";

import Cookie from "js-cookie";
import thunk from "redux-thunk";
import cartReducer from "./Reducer/cartReducer";
import { userSiginReducer, userRegisterReducer } from "./Reducer/userReducer";

const cartItems = Cookie.getJSON("cartItems") || [];

// show user saved items on their carts once they log in
const userInfo = Cookie.getJSON("userInfo") || null;

const initialState = {
	cart: { cartItems, shipping: {}, payment: {} },
	userSignin: { userInfo },
};
const reducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	cart: cartReducer,
	userSignin: userSiginReducer,
	userRegister: userRegisterReducer,
	productSave: productSaveReducer,
	productDelete: productDeleteReducer,
});

const composeEnhancer =
	(typeof window !== "undefined" &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
	compose;

const store = createStore(
	reducer,
	initialState,
	composeEnhancer(applyMiddleware(thunk))
);

export default store;
