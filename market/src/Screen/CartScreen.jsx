/** @format */

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeItem } from "../Action/cartAction";

const CartScreen = (props) => {
	// getting item of cart from the cart reduce store

	const cart = useSelector((state) => state.cart);

	const { cartItems } = cart;

	const productId = props.match.params.id;
	const qty = props.location.search
		? Number(props.location.search.split("=")[1])
		: 1;

	const dispatch = useDispatch();

	useEffect(() => {
		if (productId) {
			dispatch(addToCart(productId, qty));
		}
	}, []);

	const deleteItem = (productId) => {
		dispatch(removeItem(productId));
	};

	const checkOut = () => {
		props.history.push("/signin?redirect=shipping");
	};

	return (
		<div className="cart">
			<div className="cart-list">
				<ul className="cart-list-container">
					<li>
						<h3>shopping cart</h3>
					</li>

					{cartItems.length === 0 ? (
						<div>cart is empty</div>
					) : (
						cartItems.map((item) => (
							<div>
								<div className="cart">
									<img src={item.image} alt="pics" />
								</div>

								<div className="cart-name">
									<div>
										<Link to={"/product/" + item.product}>{item.name}</Link>
									</div>
								</div>
								<div>
									Qty
									<select
										value={item.qty}
										onChange={(e) =>
											dispatch(addToCart(item.product, e.target.value))
										}>
										{[...Array(item.countInStock).keys()].map((x) => (
											<option key={x + 1} value={x + 1}>
												{x + 1}
											</option>
										))}
									</select>
									<button
										className="button"
										type="button"
										onClick={(e) => deleteItem(item.product)}>
										Delete
									</button>
								</div>
								<div className="cart-price">price ${item.prices}</div>
							</div>
						))
					)}
				</ul>
			</div>
			<div className="cart-action">
				<h3>subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items)</h3>: ${" "}
				{cartItems.reduce((a, c) => a + c.prices * c.qty, 0)}
				<button
					className="button primary full-width"
					disabled={cartItems.length === 0}
					onClick={checkOut}>
					checkout now
				</button>
			</div>
		</div>
	);
};

export default CartScreen;
