/** @format */

import React, { useEffect, useState } from "react";
import "../index.css";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	saveProduct,
	listProducts,
	deleteProduct,
} from "../Action/productAction";

const ProductScreenTwo = (props) => {
	// modal
	const [modalVisible, setModalVisible] = useState(false);
	const [_id, setId] = useState("");

	const [name, setName] = useState("");
	const [prices, setPrices] = useState("");
	const [image, setimage] = useState("");
	const [brand, setbrand] = useState("");
	const [Categories, setCategories] = useState("");
	const [countInStock, setcountInStock] = useState("");
	const [description, setdescription] = useState("");
	const [rating, setrating] = useState("");
	const [reviews, setreviews] = useState("");

	// this will to display list of products
	const productList = useSelector((state) => state.productList);
	const { loading, products, error } = productList;

	// accesing user signing from the redux store
	const productSave = useSelector((state) => state.productSave);
	// from user store we acces this information of the use
	const {
		loading: loadingSave,
		success: successSave,
		error: errorSave,
	} = productSave;
	const dispatch = useDispatch();

	// for deleting
	const productDelete = useSelector((state) => state.productDelete);
	const {
		loading: loadingSaveForDelete,
		success: successSaveForDelete,
		error: errorSaveForDelete,
	} = productDelete;

	// dispatching an action
	// in use effect if the user exist then we redirect them to home page

	// use effect will be used to display all list of product to the admin
	// and when the product save we show a success msg by passing the successSave in the useEffect array
	useEffect(() => {
		// if successfull then close the modal
		if (successSave) {
			setModalVisible(false);
		}
		dispatch(listProducts());
		return () => {};
	}, [successSave, successSaveForDelete]);

	// method to sign user
	const createProduct = (e) => {
		e.preventDefault();
		dispatch(
			saveProduct({
				_id: _id,
				name,
				prices,
				image,
				brand,
				Categories,
				countInStock,
				description,
				// rating,
				// reviews,
			})
		);
	};

	// for deleting
	const removeProduct = (product) => {
		dispatch(deleteProduct(product._id));
	};

	// method for modal
	const openModal = (product) => {
		setModalVisible(true);
		setId(product._id);
		setName(product.name);
		setPrices(product.prices);
		setimage(product.image);
		setbrand(product.brand);
		setCategories(product.Categories);
		setcountInStock(product.countInStock);
		setrating(product.rating);
		setreviews(product.reviews);
	};

	return (
		<div>
			<div className="content content-margined">
				<div className="product-header">
					<h3>Products</h3>
					<button className="button primary" onClick={() => openModal({})}>
						Create Product
					</button>
				</div>

				{/* check modal visible , if its tru then display form */}

				{modalVisible && (
					<div className="form">
						<form onSubmit={createProduct}>
							<ul className="form-container">
								<li>
									<h2>Create a Product</h2>
								</li>
								<li>{loadingSave && <div>Loading...</div>}</li>
								<li>{errorSave && <div>{errorSave}</div>}</li>
								<li>
									<label htmlFor="Name">Name</label>
									<input
										type="text"
										name="Name"
										id="Name"
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
								</li>

								<li>
									<label htmlFor="Prices">Prices</label>
									<input
										type="text"
										name="Prices"
										id="Prices"
										value={prices}
										onChange={(e) => setPrices(e.target.value)}
									/>
								</li>

								<li>
									<label htmlFor="image">image</label>
									<input
										type="text"
										name="image"
										id="image"
										value={image}
										onChange={(e) => setimage(e.target.value)}
									/>
								</li>

								<li>
									<label htmlFor="brand">brand</label>
									<input
										type="text"
										name="brand"
										id="brand"
										value={brand}
										onChange={(e) => setbrand(e.target.value)}
									/>
								</li>

								<li>
									<label htmlFor="Categories">Categories</label>
									<input
										type="text"
										name="Categories"
										id="Categories"
										value={Categories}
										onChange={(e) => setCategories(e.target.value)}
									/>
								</li>

								<li>
									<label htmlFor="countInStock">countInStock</label>
									<input
										type="text"
										name="countInStock"
										id="countInStock"
										value={countInStock}
										onChange={(e) => setcountInStock(e.target.value)}
									/>
								</li>

								<li>
									<label htmlFor="description">description</label>
									<input
										type="text"
										name="description"
										id="description"
										value={description}
										onChange={(e) => setdescription(e.target.value)}
									/>
								</li>

								{/* <li>
							<label htmlFor="rating">rating</label>
							<input
								type="text"
								name="rating"
								id="rating"
								onChange={(e) => setrating(e.target.value)}
							/>
						</li>

						<li>
							<label htmlFor="reviews">reviews</label>
							<input
								type="text"
								name="reviews"
								id="reviews"
								onChange={(e) => setreviews(e.target.value)}
							/>
						</li> */}

								{/* check the id to see if it exist, if so show the update button if not then don't */}

								<li>
									<button type="submit" className="button primary">
										{" "}
										{_id ? "Update" : "Create"}
									</button>
								</li>
								{/* this will permit close modal */}
								<li>
									<button
										type="submit"
										className="button secondary"
										onClick={() => setModalVisible(false)}>
										back
									</button>
								</li>
							</ul>
						</form>
					</div>
				)}

				<div className="product-list">
					<table className="table">
						<thead>
							<tr>
								<th>ID</th>
								<th>Name</th>
								<th>Price</th>
								<th>Category</th>
								<th>Brand</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{products.map((product) => (
								<tr key={product._id}>
									<td>{product._id}</td>
									<td>{product.name}</td>
									<td>${product.prices}</td>
									<td>{product.Categories}</td>
									<td>{product.brand}</td>
									<td>
										<button
											className="button"
											onClick={() => openModal(product)}>
											Edit
										</button>{" "}
										<button
											className="button"
											onClick={() => removeProduct(product)}>
											Delete
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default ProductScreenTwo;
