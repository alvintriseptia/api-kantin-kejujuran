const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserService = require("../services/userService");
require("dotenv").config();

//register and create token
const registerUser = async (req, res) => {
	const { studentID, password } = req.body;
	const checkUser = await UserService.getUserByStudentID(studentID);
	if (checkUser) {
		console.log("here");
		return res.status(401).json({ message: "User already exists" });
	}
	bcrypt.hash(password, 10, async (err, hash) => {
		if (err) {
			res.status(500).json({ message: err.message });
		} else {
			try {
				const result = await UserService.addUser(studentID, hash);
				if (result) {
					const token = jwt.sign(
						{
							studentID: result.studentID,
						},
						process.env.JWT_KEY,
						{
							expiresIn: "1h",
						}
					);
					res.status(200).json({
						message: "User registered successfully",
						token: token,
						studentID,
					});
				}
			} catch (error) {
				res.status(500).json({ message: error.message });
			}
		}
	});
};

const loginUser = async (req, res) => {
	try {
		const user = await UserService.getUserByStudentID(req.body.studentID);
		if (user) {
			bcrypt.compare(req.body.password, user.password, (err, result) => {
				if (err) {
					res.status(500).json({ message: err.message });
				} else if (result) {
					const token = jwt.sign(
						{
							studentID: user.studentID,
						},
						process.env.JWT_KEY,
						{
							expiresIn: "1h",
						}
					);
					res.status(200).json({
						message: "You're logged in",
						token: token,
					});
				} else {
					res.status(401).json({ message: "Password incorrect" });
				}
			});
		} else {
			res.status(401).json({ message: "User not found" });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const verifyUser = async (req, res) => {
	const token = req.headers["x-access-token"];
	if (token) {
		jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
			if (err) {
				res.status(401).json({ message: "Token is not valid" });
			} else {
				res.status(200).json({ message: "Token is valid" });
			}
		});
	} else {
		res.status(401).json({ message: "Token is not provided" });
	}
};

module.exports = {
	registerUser,
	loginUser,
	verifyUser,
};
