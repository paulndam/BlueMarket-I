/** @format */

import "./App.css";
import "./index.css";
import { BrowserRouter, Route, Link } from "react-router-dom";
import HomeScreen from "./Screen/HomeScreen";
import ProductScreen from "./Screen/ProductScreen";
import CartScreen from "./Screen/CartScreen";
import SigninScreen from "./Screen/SiginScreen";
import RegisterScreen from "./Screen/RegisterScreen";
import { useSelector } from "react-redux";
import ProductScreenTwo from "./Screen/ProductScreenTwo";
import ShippingScreen from "./Screen/ShippingScreen";
import PaymentScreen from "./Screen/PaymentScreen";
import PlaceOrderScreen from "./Screen/PlaceOrderScreen";

function App() {
	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;

	const openMenu = () => {
		document.querySelector(".sidebar").classList.add("open");
	};

	const closeMenu = () => {
		document.querySelector(".sidebar").classList.remove("open");
	};
	return (
		<BrowserRouter>
			<div>
				<div className="grid-container">
					<header className="header">
						<div className="brand">
							<button onClick={openMenu}>&#9776;</button>
							<Link to="/">Bluemarket</Link>
						</div>
						<div className="header-links">
							<a href="cart.html">Shopping cart</a>
							{userInfo ? (
								<Link to="/profile">{userInfo.name}</Link>
							) : (
								<Link to="/signin" />
							)}

							<a href="signin">Sign up</a>
						</div>
					</header>

					<aside className="sidebar">
						<h3>Shopping Categories</h3>
						<button className="sidebar-close-btn" onClick={closeMenu}>
							x
						</button>
						<ul>
							<li>
								<a href="index.html">shoes</a>
							</li>
							<li>
								<a href="index.html">pants</a>
							</li>
						</ul>
					</aside>
				</div>

				{/* Section Main */}

				<main className="main">
					<div className="content">
						<Route path="/product/:id" exact={true} component={ProductScreen} />
						<Route path="/" exact={true} component={HomeScreen} />
						<Route path="/cart/:id?" component={CartScreen} />
						<Route path="/signin" component={SigninScreen} />
						<Route path="/register" component={RegisterScreen} />
						<Route path="/products" component={ProductScreenTwo} />
						<Route path="/shipping" component={ShippingScreen} />
						<Route path="/payment" component={PaymentScreen} />
						<Route path="/placeOrder" component={PlaceOrderScreen} />
					</div>
				</main>

				{/* footer section */}
				<footer className="footer">All rigths reserved</footer>
			</div>
		</BrowserRouter>
	);
}

export default App;
