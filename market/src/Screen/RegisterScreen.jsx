/** @format */

import React, { useEffect, useState } from "react";
import "../index.css";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../Action/userAction";

const RegisterScreen = (props) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	// accesing user signing from the redux store
	const userRegister = useSelector((state) => state.userRegister);
	// from user store we acces this information of the use
	const { loading, userInfo, error } = userRegister;
	const dispatch = useDispatch();

	// this line of code below will be for when have added items to their cart then i will need to redirect them to the shipping page
	const redirect = props.location.search
		? props.location.search.split("=")[1]
		: "/";

	// dispatching an action
	// in use effect if the user exist then we redirect them to home page

	useEffect(() => {
		if (userInfo) {
			props.history.push(redirect);
		}
		return () => {};
	}, [userInfo]);

	// method to sign user
	const Register = (e) => {
		e.preventDefault();
		dispatch(register(name, email, password, confirmPassword));
	};

	return (
		<div>
			<div className="form">
				<form onSubmit={Register}>
					<ul className="form-container">
						<li>
							<h2>Register</h2>
						</li>
						<li>{loading && <div>Loading...</div>}</li>
						<li>{error && <div>{error}</div>}</li>

						<li>
							<label htmlFor="name">Name</label>
							<input
								type="name"
								name="name"
								id="name"
								onChange={(e) => setName(e.target.value)}
							/>
						</li>

						<li>
							<label htmlFor="email">Email</label>
							<input
								type="email"
								name="email"
								id="email"
								onChange={(e) => setEmail(e.target.value)}
							/>
						</li>

						<li>
							<label htmlFor="password">Password</label>
							<input
								type="password"
								name="password"
								id="password"
								onChange={(e) => setPassword(e.target.value)}
							/>
						</li>

						<li>
							<label htmlFor="password">Confirm Password</label>
							<input
								type="password"
								name="password"
								id="password"
								onChange={(e) => setConfirmPassword(e.target.value)}
							/>
						</li>

						<li>
							<button type="submit" className="button primary">
								sign-Up
							</button>
						</li>

						<li>Already Have an Account ?</li>
						<li>
							<Link
								to={redirect === "/" ? "sigin" : "sigin?redirect=" + redirect}
								className="button secondary text-center">
								Sign-In
							</Link>
						</li>
					</ul>
				</form>
			</div>
		</div>
	);
};

export default RegisterScreen;
