/** @format */

import React, { useEffect, useState } from "react";
import "../index.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { detailsProduct } from "../Action/productAction";

const ProductScreen = (props) => {
	// console.log(props.match.params.id);

	// const product = data.products.find(
	// 	(product) => product._id === props.match.params.id
	// );

	const productDetails = useSelector((state) => state.productDetails);
	const { product, loading, error } = productDetails;
	const dispatch = useDispatch();

	const [qty, setqty] = useState(1);

	// dispatching an action

	useEffect(() => {
		dispatch(detailsProduct(props.match.params.id));

		return () => {
			// cleanUp
		};
	}, []);

	// adding to cart
	const addToCart = () => {
		props.history.push("/cart/" + props.match.params.id + "?qty=" + qty);
	};
	return (
		<div>
			<div className="back-to-result">
				<Link to="/">Back to results</Link>
			</div>
			{loading ? (
				<div>Loading..</div>
			) : error ? (
				<div>{error}</div>
			) : (
				<div className="details">
					<div className="details-image">
						<img src={product.image} alt="pics" />
					</div>
					<div className="details-info">
						<ul>
							<li>
								<h4>Item: {product.name}</h4>
							</li>
							<li>
								Rating: {product.rating} Stars ({product.reviews})
							</li>
							<li>
								<b>Price: ${product.prices}</b>
							</li>
							<li>
								Description
								<div>{product.description}</div>
							</li>
						</ul>
					</div>
					<div className="details-action">
						<ul>
							<li>Price:${product.prices}</li>
							<li>
								Status:
								{product.countInStock > 0 ? "In stock" : "Unavailable for now"}
							</li>
							<li>
								Qty:{" "}
								<select
									value={qty}
									onChange={(e) => {
										setqty(e.target.value);
									}}>
									{[...Array(product.countInStock).keys()].map((p) => (
										<option key={p + 1} value={p + 1}>
											{p + 1}
										</option>
									))}
								</select>
							</li>
							<li>
								{product.countInStock > 0 && (
									<button className="button primary" onClick={addToCart}>
										Add to cart
									</button>
								)}
							</li>
						</ul>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProductScreen;
