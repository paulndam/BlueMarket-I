/** @format */

import axios from "axios";
import {
	PRODUCT_LIST_FAIL,
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_FAIL,
	PRODUCT_SAVE_REQUEST,
	PRODUCT_SAVE_SUCCES,
	PRODUCT_SAVE_FAIL,
	PRODUCT_DELETE_REQUEST,
	PRODUCT_DELETE_SUCCESS,
	PRODUCT_DELETE_FAIL,
} from "../Constant/productConstant";

// method for displaying list of products
const listProducts = () => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_LIST_REQUEST });
		const { data } = await axios.get("/api/products");
		dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
	}
};

// method for savig a product and create one
const saveProduct = (product) => async (dispatch, getState) => {
	try {
		dispatch({ type: PRODUCT_SAVE_REQUEST });

		// token comes from the user signed in
		const {
			userSignin: { userInfo },
		} = getState();

		// before sending the post request do a check
		if (!product._id) {
			console.log(userInfo.token, "TOKEN FROM FRONT END");
			const { data } = await axios.post("/api/products", product, {
				headers: {
					Authorization: "Bearer" + userInfo.token,
				},
			});
			dispatch({ type: PRODUCT_SAVE_SUCCES, payload: data });
		} else {
			const { data } = await axios.put(
				`/api/products/${product._id}`,
				product,
				{
					headers: {
						Authorization: "Bearer" + userInfo.token,
					},
				}
			);
			dispatch({ type: PRODUCT_SAVE_SUCCES, payload: data });
		}
	} catch (error) {
		dispatch({ type: PRODUCT_SAVE_FAIL, payload: error.message });
	}
};

// method for show a detailed or specific product
const detailsProduct = (productId) => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
		const { data } = await axios.get("/api/products/" + productId);
		dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message });
	}
};

// deleting
const deleteProduct = (productId) => async (dispatch, getState) => {
	try {
		dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
		const {
			userSignin: { userInfo },
		} = getState();
		const { data } = await axios.delete("/api/products/" + productId, {
			headers: {
				Authorization: "Bearer" + userInfo.token,
			},
		});
		dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data, success: true });
	} catch (error) {
		dispatch({ type: PRODUCT_DELETE_FAIL, payload: error.message });
	}
};

export { listProducts, detailsProduct, saveProduct, deleteProduct };
