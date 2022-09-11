const boxService = require("../services/boxService.js");

const getCurrentBalance = async (req, res) => {
	try {
		const balance = await boxService.getCurrentBalance();
		res.status(200).json({ balance: balance });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const withdrawTransaction = async (req, res) => {
	try {
		const { amount } = req.body;
		console.log(amount);
		await boxService.addTransaction("withdraw", amount);
		res.status(200).json({ message: "Withdraw success" });
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: error.message });
	}
};

const addTransaction = async (req, res) => {
	try {
		const { amount } = req.body;
		await boxService.addTransaction("add", amount);
		res.status(200).json({ message: "Transaction success" });
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: error.message });
	}
};

module.exports = {
	getCurrentBalance,
	withdrawTransaction,
	addTransaction,
};
