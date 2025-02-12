require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../db/db.js");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// **1. User Signup**
router.post("/signup", async (req, res) => {
  try {
    const { first_name, last_name, username, email, password } = req.body;

    // Check if user already exists (by email or username)
    const userCheck = await pool.query(
      "SELECT * FROM user_auth WHERE email = $1 OR username = $2",
      [email, username]
    );

    if (userCheck.rows.length > 0) {
      return res.status(400).json({ error: "Email or username already in use" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Determine user role (first user = admin)
    let role = "user";
    const userCount = await pool.query("SELECT COUNT(*) FROM user_auth");
    if (parseInt(userCount.rows[0].count) === 0) {
      role = "admin";
    }

    // Insert user into DB
    const newUser = await pool.query(
      "INSERT INTO user_auth (first_name, last_name, username, email, password, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING user_id, first_name, last_name, username, email, role",
      [first_name, last_name, username, email, hashedPassword, role]
    );

    res.status(201).json({ message: "User registered successfully", user: newUser.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// **2. User Login**
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user by username
    const user = await pool.query("SELECT * FROM user_auth WHERE username = $1", [username]);
    if (user.rows.length === 0) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    // Compare passwords
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.rows[0].user_id, username: user.rows[0].username, role: user.rows[0].role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token, role: user.rows[0].role });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// **3. Logout (Handled on Frontend)**
router.post("/logout", (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
});

// **4. Middleware to Protect Routes**
const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ error: "Access denied, no token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = { router, authenticateUser };