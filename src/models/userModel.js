const db = require("../configs/index.js");

const { DataTypes } = require("sequelize");

// define user model
const UserModel = db.define("users", {
	studentID: {
		type: DataTypes.STRING,
		primaryKey: true,
		allowNull: false,
		validate: {
			notEmpty: true,
			len: [5, 5],
			isNumeric: true,
			// custom validator
			isValidDigits(value) {
				const twoLastDigits = value.slice(-2);
				const sumFirstThreeDigits = value
					.slice(0, 3)
					.split("")
					.reduce((acc, curr) => acc + parseInt(curr), 0);
				if (parseInt(twoLastDigits) !== parseInt(sumFirstThreeDigits)) {
					throw new Error("Invalid student ID");
				}
			},
		},
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			notEmpty: true,
			len: [6],
		},
	},
});

module.exports = UserModel;
