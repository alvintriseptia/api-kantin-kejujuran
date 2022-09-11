const ProductModel = require("../models/productModel.js");
const BoxService = require("../services/boxService.js");
const path = require("path");
const fs = require("fs");

//add a new item
const addProduct = async (product) => {
	return await ProductModel.create(product);
};

// see all items
const getAllProducts = async (sortBy, type, size, page) => {
	return await ProductModel.findAndCountAll({
		order: [[sortBy, type]],
		limit: size,
		offset: page * size,
	});
};

// get product by id
const getProductById = async (id) => {
	return await ProductModel.findOne({
		where: {
			id: id,
		},
	});
};

// get an item by id
const getProductPrice = async (id) => {
	const product = await getProductById(id);
	const productPrice = product.dataValues.price;
	return productPrice;
};

// buy an item
const buyProduct = async (id) => {
	const product = await getProductById(id);
	const productImage = product.dataValues.productImage;
	if (productImage && productImage.slice(0, 4) !== "http") {
		const imagePath = path.join(
			__dirname,
			"../../public/images/" + productImage
		);
		fs.unlinkSync(imagePath);
	}
	return await ProductModel.destroy({ where: { id } });
};

//count product rows
const countProducts = async () => {
	const count = await ProductModel.count();
	return count;
};

module.exports = {
	addProduct,
	getAllProducts,
	getProductById,
	getProductPrice,
	buyProduct,
	countProducts,
};
