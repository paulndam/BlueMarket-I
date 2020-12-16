/** @format */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../index.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../Action/productAction";

const HomeScreen = (props) => {
	// const [products, setproducts] = useState([]);
	const productList = useSelector((state) => state.productList);
	const { products, loading, error } = productList;
	const dispatch = useDispatch();

	// to get or fetch data from server
	useEffect(() => {
		dispatch(listProducts());
		// const getData = async () => {
		// 	const { data } = await axios.get("/api/product");
		// 	setproducts(data);
		// };
		// getData();
		return () => {};
	}, []);

	return loading ? (
		<div>Loading...</div>
	) : error ? (
		<div>{error}</div>
	) : (
		<ul className="products">
			{products.map((product) => (
				<li key={product.id}>
					<div className="product">
						<Link to={`/product/${product._id}`}>
							<img className="product-image" src={product.image} alt="pictur" />
						</Link>

						<div className="product-name">
							<Link to={`/product/${product._id}`}>{product.name}</Link>
						</div>
						<div className="product-brand">{product.brand}</div>
						<div className="product-price">${product.prices}</div>
						<div className="product-rating">
							{product.rating} Stars(reviews)
						</div>
					</div>
				</li>
			))}
		</ul>
	);
};

export default HomeScreen;
