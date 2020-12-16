/** @format */

import React, { useEffect, useState } from "react";
import "../index.css";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../Action/userAction";

const SigninScreen = (props) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	// accesing user signing from the redux store
	const userSignin = useSelector((state) => state.userSignin);
	// from user store we acces this information of the use
	const { loading, userInfo, error } = userSignin;
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
	const SignIn = (e) => {
		e.preventDefault();
		dispatch(signin(email, password));
	};

	return (
		<div>
			<div className="form">
				<form onSubmit={SignIn}>
					<ul className="form-container">
						<li>
							<h2>Sign-In</h2>
						</li>
						<li>{loading && <div>Loading...</div>}</li>
						<li>{error && <div>{error}</div>}</li>
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
							<button type="submit" className="button primary">
								signIn
							</button>
						</li>

						<li>New to Bluemarket ?</li>
						<li>
							{/* check the redirect ,if its home page set it to the register page and if just redirect*/}
							<Link
								to={
									redirect === "/"
										? "register"
										: "register?redirect=" + redirect
								}
								className="button secondary text-center">
								Create an Account
							</Link>
						</li>
					</ul>
				</form>
			</div>
		</div>
	);
};

export default SigninScreen;
