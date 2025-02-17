require("dotenv").config(); // Load environment variables
const { Pool } = require("pg");

// Create a connection pool using the DATABASE_URL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false
});

module.exports = pool;


