const jwt = require("jsonwebtoken");

//verified that user is logged in
const verifyToken = (req, res, next) => {
	const token = req.headers["x-access-token"];
	if (token) {
		jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
			if (err) {
				res.status(401).json({ message: "Token is not valid" });
			} else {
				next();
			}
		});
	} else {
		res.status(401).json({ message: "Token is not provided" });
	}
};

module.exports = verifyToken;
