const db = require("../configs/index.js");
const { DataTypes, literal } = require("sequelize");

//define box model
const BoxModel = db.define("box", {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		defaultValue: DataTypes.UUIDV4,
	},
	amount: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	transactionType: {
		type: DataTypes.ENUM("add", "withdraw"),
		allowNull: false,
	},
	transactionDate: {
		type: "TIMESTAMP",
		allowNull: false,
		defaultValue: literal("CURRENT_TIMESTAMP"),
	},
});

module.exports = BoxModel;
