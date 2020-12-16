/** @format */

import express from "express";
import data from "./market/backend/data.js";
import dotenv from "dotenv";
import config from "./market/backend/config.js";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import userRoute from "./market/backend/routes/userRoute.js";
import productRoute from "./market/backend/routes/productRoute.js";

dotenv.config();

const DB_name = "The-Market-DB";
mongoose
	.connect("mongodb://localhost/The-Market-DB", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => console.log(`connection established with ${DB_name}`))
	.catch((err) => console.log("error error, DB not connected", err));

const app = express();

app.use(bodyParser.json());

app.use("/api/users", userRoute);

app.use("/api/products", productRoute);

// static API can be commented out

// app.get("/api/product", (req, res) => {
// 	res.send(data.products);
// });

// app.get("/api/product/:id", (req, res) => {
// 	const productId = req.params.id;
// 	const product = data.products.find((p) => p._id === productId);
// 	if (product) {
// 		res.send(product);
// 	} else {
// 		res.status(404).send({ message: `product not found` });
// 	}
// });

app.listen(5000, () => {
	console.log("Server up and now runing http://localhost:5000");
});
