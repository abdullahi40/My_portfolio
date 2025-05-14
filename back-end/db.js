const { Pool } = require("pg");

const env = require("dotenv");

env.config();
// Create a new pool instance with the database connection details

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  port: process.env.PG_PORT,
});

module.exports = pool;
// Get all blogs
