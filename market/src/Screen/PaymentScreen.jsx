/** @format */

import React, { useState } from "react";
import "../index.css";
import { useDispatch } from "react-redux";
import { savePayment } from "../Action/cartAction";
import CheckOutSteps from "../components/checkOutSteps";

const PaymentScreen = (props) => {
	const [Payment, setPayment] = useState("");

	// dispatching an action
	// in use effect if the user exist then we redirect them to home page
	const dispatch = useDispatch();

	// method to sign user
	const paymentMethod = (e) => {
		e.preventDefault();
		dispatch(savePayment({ Payment }));
		props.history.push("placeOrder");
	};

	return (
		<div>
			<CheckOutSteps step1 step2 step3></CheckOutSteps>
			<div className="form">
				<form onSubmit={paymentMethod}>
					<ul className="form-container">
						<li>
							<h2>Payment</h2>
						</li>

						<li>
							<div></div>
							<label htmlFor="Payment">Paypal Payment</label>
							<input
								type="radio"
								name="Payment"
								id="Payment"
								value="paypal"
								onChange={(e) => setPayment(e.target.value)}
							/>
						</li>

						<li>
							<button type="submit" className="button primary">
								continue
							</button>
						</li>
					</ul>
				</form>
			</div>
		</div>
	);
};

export default PaymentScreen;
