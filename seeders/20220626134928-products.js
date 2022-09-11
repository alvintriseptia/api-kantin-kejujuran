"use strict";
const { faker } = require("@faker-js/faker");
faker.locale = "id_ID";
//create array of 500 data with faker
const products = [...Array(500)].map((product, index) => ({
	id: index + 1,
	productName: faker.commerce.productName(),
	productImage: faker.image.image(640, 480, true),
	price: faker.commerce.price() * 100,
	description: faker.lorem.paragraph(),
	createdAt: faker.date.past(),
}));

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert("products", products, {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("products", null, {});
	},
};
