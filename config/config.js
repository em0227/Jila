require("dotenv").config();
// console.log('env', process.env)
const db = require('knex')({
  client: 'pg',
  version: '7.2',
  connection: {
    connectionString: process.env.DATABASE_URL,
    host: process.env.DB_HOST,
    port: 5432,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
  },
  searchPath: ['knex', 'public'],
  debug: true
});

module.exports = db;
