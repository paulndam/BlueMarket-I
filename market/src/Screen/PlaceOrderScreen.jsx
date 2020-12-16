/** @format */

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CheckOutSteps from "../components/checkOutSteps";

const PlaceOrderScreen = (props) => {
	// getting item of cart from the cart reduce store

	const cart = useSelector((state) => state.cart);

	const { cartItems, shipping, payment } = cart;

	if (!shipping.address) {
		props.history.push("/shipping");
	} else if (!payment.Payment) {
		props.history.push("/payment");
	}

	const itemsPrice = cartItems.reduce((a, c) => a + c.prices * c.qty, 0);
	const shippingPrice = itemsPrice > 100 ? 0 : 10;
	const taxPrice = 0.15 * itemsPrice;
	const totalPrice = itemsPrice + shippingPrice + taxPrice;

	// method to place order
	const placeOrderMethod = () => {
		// create an order
	};

	const dispatch = useDispatch();

	useEffect(() => {}, []);

	const checkOut = () => {
		props.history.push("/signin?redirect=shipping");
	};

	return (
		<div>
			<div>
				<CheckOutSteps step1 step2 step3 step4></CheckOutSteps>
				<div className="placeorder">
					<div className="placeorder-info">
						<div>
							<h3>Shipping</h3>
							<div>
								{cart.shipping.address},{cart.shipping.city}
								{cart.shipping.zipcode},{cart.shipping.country}
							</div>
						</div>
						<div>
							<h3>Payment</h3>
							<div>{cart.payment.Payment}</div>

							<div>
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
														<Link to={"/product/" + item.product}>
															{item.name}
														</Link>
													</div>
												</div>
												<div>Qty:{item.qty}</div>
												<div className="cart-price">price ${item.prices}</div>
											</div>
										))
									)}
								</ul>
							</div>
						</div>
					</div>
					<div className="placeorder-action">
						<ul>
							<li>
								<button
									className="button primary full-width"
									onClick={placeOrderMethod}>
									order now
								</button>
							</li>
							<li>Order summary</li>
							<li>
								<div>items</div>
								<div>${itemsPrice}</div>
							</li>
							<li>
								<div>shipping</div>
								<div>${shippingPrice}</div>
							</li>
							<li>
								<div>Tax</div>
								<div>${taxPrice}</div>
							</li>
							<li>
								<div>totalPrice</div>
								<div>${totalPrice}</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PlaceOrderScreen;
