const productService = require("../services/productService.js");
const path = require("path");
const Resize = require("../utils/resize");

const addProduct = async (req, res) => {
	try {
		const imagePath = path.join(__dirname, "../../public/images/");
		const fileUpload = new Resize(imagePath);
		const fileName = await fileUpload.save(req.file.buffer);
		const product = { ...req.body, productImage: fileName };
		const result = await productService.addProduct(product);
		if (result) {
			res.status(200).json({ message: "Product added successfully" });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};

const getAllProducts = async (req, res) => {
	const pageAsNumber = Number.parseInt(req.query.page);
	const sizeAsNumber = Number.parseInt(req.query.size);
	const sortBy = req.query.sortBy;
	const type = req.query.type;

	let page = 0;
	if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
		page = pageAsNumber;
	}

	let size = 10;
	if (
		!Number.isNaN(sizeAsNumber) &&
		!(sizeAsNumber > 10) &&
		!(sizeAsNumber < 1)
	) {
		size = sizeAsNumber;
	}

	let sortedBy = "id";
	if (sortBy !== "" && sortBy) {
		if (sortBy === "date") sortedBy = "createdAt";
		else if (sortBy === "name") sortedBy = "productName";
		else if (sortBy === "price") sortedBy = "price";
	}

	let orderedBy = "ASC";
	if (type) {
		orderedBy = type.toUpperCase() === "DESC" ? "DESC" : "ASC";
	}

	try {
		const products = await productService.getAllProducts(
			sortedBy,
			orderedBy,
			size,
			page
		);
		res.status(200).json({
			products: products.rows,
			total: Math.ceil(products.count / size),
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getProductById = async (req, res) => {
	const id = req.params.id;
	try {
		const product = await productService.getProductById(id);
		res.status(200).json({ product });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const buyProduct = async (req, res) => {
	try {
		const id = req.params.id;
		const result = await productService.buyProduct(id);
		if (result) {
			res.status(200).json({ message: "Product bought" });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = {
	getAllProducts,
	getProductById,
	addProduct,
	buyProduct,
};
