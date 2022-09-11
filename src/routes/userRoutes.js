const {
	registerUser,
	loginUser,
	verifyUser,
} = require("../controllers/userController");
const express = require("express");

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/verify", verifyUser);

module.exports = userRouter;
