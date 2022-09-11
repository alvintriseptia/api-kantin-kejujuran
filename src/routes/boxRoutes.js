const {
	getCurrentBalance,
	withdrawTransaction,
	addTransaction,
} = require("../controllers/boxController.js");
const verifyToken = require("../middlewares/verifyToken");
const express = require("express");

const boxRouter = express.Router();

boxRouter.get("/balance", verifyToken, getCurrentBalance);
boxRouter.post("/withdraw", verifyToken, withdrawTransaction);
boxRouter.post("/add", verifyToken, addTransaction);

module.exports = boxRouter;
