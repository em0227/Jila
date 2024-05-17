require("dotenv").config();

// const { Pool } = require("pg");

// const db = new Pool({
//   connectionString: process.env.POSTGRES_URL,
// });

// module.exports = db;

const db = require("knex")({
  client: "pg",
  connection: process.env.POSTGRES_URL,
  searchPath: ["knex", "public"],
});

module.exports = db;
