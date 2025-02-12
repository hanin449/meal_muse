require("dotenv").config(); // Load environment variables
const { Pool } = require("pg");

// Create a connection pool using the DATABASE_URL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL.includes("localhost") ? false : { rejectUnauthorized: false }, // Required for some cloud hosts
});

module.exports = pool;