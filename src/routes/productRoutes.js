const {
	getAllProducts,
	getProductById,
	addProduct,
	buyProduct,
} = require("../controllers/productController.js");
const verifyToken = require("../middlewares/verifyToken");
const upload = require("../middlewares/fileUpload");
const express = require("express");

const productRouter = express.Router();

productRouter.post("/", verifyToken, upload.single("productImage"), addProduct);
productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductById);
productRouter.post("/buy/:id", verifyToken, buyProduct);

module.exports = productRouter;
