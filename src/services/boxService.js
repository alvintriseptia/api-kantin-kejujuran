const BoxModel = require("../models/BoxModel.js");

const getCurrentBalance = async () => {
	// get current balance sum of add transaction substract with sum of withdraw transaction
	const countAdd = await BoxModel.count({
		where: {
			transactionType: "add",
		},
	});

	const countWithdraw = await BoxModel.count({
		where: {
			transactionType: "withdraw",
		},
	});

	if (countAdd > 0 && countWithdraw > 0) {
		const addBalance = await BoxModel.sum("amount", {
			where: {
				transactionType: "add",
			},
		});
		const withdrawBalance = await BoxModel.sum("amount", {
			where: {
				transactionType: "withdraw",
			},
		});
		return addBalance - withdrawBalance;
	} else if (countAdd > 0 && countWithdraw === 0) {
		const addBalance = await BoxModel.sum("amount", {
			where: {
				transactionType: "add",
			},
		});
		return addBalance;
	} else {
		return 0;
	}
};

const addTransaction = async (type, amount) => {
	const currentBalance = await getCurrentBalance();
	if (type === "add") {
		return await BoxModel.create({
			amount: amount,
			transactionType: type,
		});
	} else if (type === "withdraw") {
		console.log(currentBalance + " = " + amount);
		if (currentBalance >= amount) {
			return await BoxModel.create({
				amount: amount,
				transactionType: type,
			});
		} else {
			throw new Error("balance not enough");
		}
	}
};

module.exports = {
	getCurrentBalance,
	addTransaction,
};
