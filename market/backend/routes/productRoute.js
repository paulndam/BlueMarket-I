/** @format */

const express = require("express");
const Product = require("../models/productModel.js");
const { isAdmin, isAuth } = require("../utils.js");

const router = express.Router();
// gets list of product
router.get("/", async (req, res) => {
	const product = await Product.find({});
	res.send(product);
});

// detailed api for product
router.get("/:id", async (req, res) => {
	const product = await Product.findOne({ _id: req.params.id });
	if (product) {
		res.send(product);
	} else {
		res.status(404).send({ msg: "product not found " });
	}
	res.send(product);
});

// create a product
router.post("/", async (req, res) => {
	const product = new Product({
		name: req.body.name,
		image: req.body.image,
		brand: req.body.brand,
		Categories: req.body.Categories,
		countInStock: req.body.countInStock,
		prices: req.body.prices,
		description: req.body.description,
		rating: req.body.rating,
		reviews: req.body.reviews,
	});

	const newProduct = await product.save();

	if (newProduct) {
		return res.send(201).send({ msg: "product created", data: newProduct });
	}
	return res.status(500).send({ msg: "error making product" });
});

// update a product
router.put("/:id", async (req, res) => {
	const productId = req.params.id;

	const product = await Product.findById(productId);

	if (product) {
		product.name = req.body.name;
		product.image = req.body.image;
		product.brand = req.body.brand;
		product.egories = req.body.Categories;
		product.InStock = req.body.countInStock;
		product.prices = req.body.prices;
		product.ription = req.body.description;
		product.rating = req.body.rating;
		product.reviews = req.body.reviews;

		const updatedProduct = await product.save();

		if (updatedProduct) {
			return res
				.status(200)
				.send({ msg: "product updated", data: updatedProduct });
		}
	}
	return res.status(500).send({ msg: "error updating product" });
});

// delete product
router.delete("/:id", async (req, res) => {
	// const productId = req.params.id;
	const deletedProduct = await Product.findById(req.params.id);

	if (deletedProduct) {
		await deletedProduct.remove();
		res.send({ message: "product deleted" });
	}
	res.send("error deleting product");
});

module.exports = router;
