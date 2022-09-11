const db = require("../configs/index.js");
const { DataTypes, literal } = require("sequelize");

//define products model
const ProductModel = db.define("products", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	productName: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			notEmpty: true,
		},
	},
	productImage: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			notEmpty: true,
		},
	},
	price: {
		type: DataTypes.INTEGER,
		allowNull: false,
		validate: {
			notEmpty: true,
		},
	},
	description: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			notEmpty: true,
		},
	},
	createdAt: {
		type: "TIMESTAMP",
		allowNull: false,
		defaultValue: literal("CURRENT_TIMESTAMP"),
	},
});

module.exports = ProductModel;
