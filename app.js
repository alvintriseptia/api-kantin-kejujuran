require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	cors({
		origin: "https://fe-kantin-kejujuran.vercel.app",
		credentials: true,
	})
);
app.use("/public", express.static("public"));

// Connect to database
const db = require("./src/configs/index.js");
try {
	db.authenticate();
	console.log("DB Connected");
} catch (error) {
	console.log("error nih: " + error);
}

app.get("/", (req, res) => {
	res.send("Express on Vercel");
});

//routes
app.use("/api", require("./src/routes/index.js"));

// handling error
app.use((err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.message = err.message || "Internal Server Error";
	res.status(err.statusCode).json({
		message: err.message,
	});
});

// Listen on port 5000
app.listen(port, () => {
	console.log(`listening on port ${port}`);
});
