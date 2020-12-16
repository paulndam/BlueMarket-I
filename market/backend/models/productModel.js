/** @format */

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
	brand: {
		type: String,
		required: true,
	},
	Categories: {
		type: String,
		required: true,
	},
	countInStock: {
		type: Number,
		default: 0,
		required: true,
	},
	prices: {
		type: Number,
		default: 0,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	rating: {
		type: Number,
		default: 0,
	},
	reviews: {
		type: Number,
		default: 0,
	},
});

const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;
