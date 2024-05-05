require("dotenv").config();

const db = require("knex")({
  client: "pg",
  version: "7.2",
  connection: {
    connectionString: process.env.DATABASE_URL,
    // host: process.env.DB_HOST,
    // port: 5432,
    // user: process.env.DB_USER,
    // database: process.env.DB_NAME,
    // password: process.env.DB_PASSWORD,
  },
  debug: false,
});

module.exports = db;
