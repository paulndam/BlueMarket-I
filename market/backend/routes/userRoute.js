/** @format */

const express = require("express");
const User = require("../models/userModel.js");
const { getToken } = require("../utils.js");

const router = express.Router();

router.post("/register", async (req, res) => {
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
	});
	const newUser = await user.save();

	if (newUser) {
		res.send({
			_id: newUser.id,
			name: newUser.name,
			email: newUser.email,
			isAdmin: newUser.isAdmin,
			token: getToken(newUser),
		});
	} else {
		res.status(401).send({ message: "could not sign in" });
	}
});

router.post("/signin", async (req, res) => {
	try {
		const signedInUser = await User.findOne({
			email: req.body.email,
			password: req.body.password,
		});
		if (signedInUser) {
			res.send({
				_id: signedInUser.id,
				name: signedInUser.name,
				email: signedInUser.email,
				isAdmin: signedInUser.isAdmin,
				token: getToken(signedInUser),
			});
		} else {
			res.status(401).send({ message: "Invalid email and password" });
		}
	} catch (error) {
		res.send({ message: error.message });
	}
});

router.get("/createAdmin", async (req, res) => {
	try {
		const user = new User({
			name: "Rico",
			email: "njoyablue43@gmail.com",
			password: "123456789",
			isAdmin: true,
		});

		const newUser = await user.save();
		res.send(newUser);
	} catch (error) {
		res.send({ message: error.message });
	}
});

module.exports = router;
