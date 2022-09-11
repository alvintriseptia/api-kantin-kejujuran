const dbConfig = require("./db.config");
const Sequelize = require("sequelize");

const db = new Sequelize(
	dbConfig.database,
	dbConfig.username,
	dbConfig.password,
	{
		host: dbConfig.host,
		port: 3306,
		dialect: dbConfig.dialect,
		pool: dbConfig.pool,
		define: {
			timestamps: false,
		},
	}
);
db.sync();

module.exports = db;
