/** @format */

import {
	CART_ADD_ITEM,
	CART_REMOVE_ITEM,
	CART_SAVE_SHIPPING,
	CART_SAVE_PAYMENT,
} from "../Constant/cartConstant";

const cartReducer = (
	state = { cartItems: [], shipping: {}, payment: {} },
	action
) => {
	switch (action.type) {
		case CART_ADD_ITEM:
			const item = action.payload;
			const product = state.cartItems.find((p) => p.product === item.product);

			if (product) {
				return {
					...state,
					cartItems: state.cartItems.map((p) =>
						p.product === product.product ? product : p
					),
				};
			}
			return { cartItems: [...state.cartItems, item] };

		case CART_REMOVE_ITEM:
			return {
				cartItems: state.cartItems.filter((x) => x.product !== action.payload),
			};
		case CART_SAVE_SHIPPING:
			return { ...state, shipping: action.payload };
		case CART_SAVE_PAYMENT:
			return { ...state, payment: action.payload };

		default:
			return state;
	}
};

export default cartReducer;
