/** @format */

import React, { useState } from "react";
import "../index.css";
import { useDispatch } from "react-redux";
import { saveShipping } from "../Action/cartAction";
import CheckOutSteps from "../components/checkOutSteps";

const ShippingScreen = (props) => {
	const [address, setAddress] = useState("");
	const [city, setCity] = useState("");
	const [zipCode, setzipCode] = useState("");
	const [country, setCountry] = useState("");

	// dispatching an action
	// in use effect if the user exist then we redirect them to home page
	const dispatch = useDispatch();

	// method to sign user
	const shippingMethod = (e) => {
		e.preventDefault();
		dispatch(saveShipping({ address, city, zipCode, country }));
		props.history.push("payment");
	};

	return (
		<div>
			<CheckOutSteps step1 step2></CheckOutSteps>
			<div className="form">
				<form onSubmit={shippingMethod}>
					<ul className="form-container">
						<li>
							<h2>Shipping</h2>
						</li>

						<li>
							<label htmlFor="address">Street Address</label>
							<input
								type="text"
								name="address"
								id="address"
								onChange={(e) => setAddress(e.target.value)}
							/>
						</li>

						<li>
							<label htmlFor="City">City</label>
							<input
								type="text"
								name="City"
								id="City"
								onChange={(e) => setCity(e.target.value)}
							/>
						</li>

						<li>
							<label htmlFor="Zipcode">Zip code</label>
							<input
								type="text"
								name="zipCode"
								id="zipCode"
								onChange={(e) => setzipCode(e.target.value)}
							/>
						</li>

						<li>
							<label htmlFor="country">Country</label>
							<input
								type="text"
								name="Country"
								id="Country"
								onChange={(e) => setCountry(e.target.value)}
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

export default ShippingScreen;
