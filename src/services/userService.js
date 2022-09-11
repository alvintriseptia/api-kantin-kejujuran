const UserModel = require("../models/userModel");

//register user
const addUser = async (studentID, password) => {
	return await UserModel.create({ studentID, password });
};

// login user
const getUserByStudentID = async (studentID) => {
	return await UserModel.findOne({
		where: {
			studentID: studentID,
		},
	});
};

module.exports = {
	addUser,
	getUserByStudentID,
};
