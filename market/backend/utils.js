/** @format */

const config = require("../backend/config.js");
const jwt = require("jsonwebtoken");
const user = require("../backend/routes/userRoute");
require("dotenv").config();

// const getToken = (user) => {
// 	console.log(
// 		"====> JWT FROM UTILS in GETTOKEN METHOD =========>>>",
// 		config.JWT_SECRET
// 	);
// 	return jwt.sign(
// 		{
// 			_id: user._id,
// 			name: user.name,
// 			email: user.email,
// 			isAdmin: user.isAdmin,
// 		},
// 		config.JWT_SECRET,
// 		{
// 			expiresIn: "48",
// 		}
// 	);
// };

// // authentication to validate users
// // modifying changes after making sure only admins and validated users can perform certain
// const isAuth = (req, res, next) => {
// 	const token = req.headers.authorization;
// 	console.log(token, "HERE IS FROM UTILS");

// 	if (token) {
// 		console.log(token, "========>>>> HERE IS TOKEN FROM UTILS IN AUTH METHOD");
// 		const onlyToken = token.slice(7, token.length);
// 		jwt.verify(onlyToken, config.JWT_SECRET, (error, decode) => {
// 			// check if error
// 			if (error) {
// 				return res.status(401).send({ msg: "invalid token" });
// 			}
// 			req.user = decode;
// 			next();
// 			return;
// 		});

// 		console.log(
// 			"====> JWT FROM UTILS IN AUTH METHOD =========>>>",
// 			config.JWT_SECRET
// 		);
// 	}
// 	return res.status(401).send({ msg: "token is not supplied" });
// };

// // authentication to validate users
// const isAdmin = (req, res, next) => {
// 	console.log(
// 		req.user,
// 		"========>>>> HERE IS REQ OF USER FROM UTILS IN IS ADMIN METHOD"
// 	);
// 	if (req.user && req.user.isAdmin) {
// 		return next();
// 	}
// 	return res.status(401).send({ msg: "admin token is not valid" });
// };

const getToken = (user) => {
	return jwt.sign(
		{
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		},
		config.JWT_SECRET,
		{
			expiresIn: "30d",
		}
	);
};

const isAuth = (req, res, next) => {
	const token = req.headers.authorization;

	if (token) {
		const onlyToken = token.slice(7, token.length);
		jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) => {
			if (err) {
				return res.status(401).send({ message: "Invalid Token" });
			}
			req.user = decode;
			next();
			return;
		});
	} else {
		return res.status(401).send({ message: "Token is not supplied." });
	}
};

const isAdmin = (req, res, next) => {
	console.log(req.user);
	if (req.user && req.user.isAdmin) {
		return next();
	}
	return res.status(401).send({ message: "Admin Token is not valid." });
};

module.exports = { getToken, isAuth, isAdmin };
