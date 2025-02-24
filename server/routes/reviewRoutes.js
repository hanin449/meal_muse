const express = require("express");
const pool = require("../db/db"); 
const router = express.Router();

// CREATE Review
router.post("/", async (req, res) => {
  try {
    const { recipe_id, reviewer_name, review_text, rating } = req.body;

    // Check if required fields are present
    if (!recipe_id || !reviewer_name || !review_text || !rating) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const query = `
      INSERT INTO review (recipe_id, reviewer_name, review_text, rating)
      VALUES ($1, $2, $3, $4) RETURNING *;
    `;

    const values = [recipe_id, reviewer_name, review_text, rating];
    const result = await pool.query(query, values);

    res.status(201).json({
      message: "Review added successfully!",
      review: result.rows[0],
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Failed to add review", error: error.message });
  }
});

// GET all Reviews for a specific Recipe
router.get("/:recipe_id", async (req, res) => {
  try {
    const { recipe_id } = req.params;
    const result = await pool.query("SELECT * FROM review WHERE recipe_id = $1", [recipe_id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No reviews found for this recipe" });
    }

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching reviews:", error.message);
    res.status(500).json({ message: "Failed to fetch reviews", error: error.message });
  }
});

// GET Single Review by ID
router.get("/review/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM review WHERE review_id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching review:", error.message);
    res.status(500).json({ message: "Failed to fetch review", error: error.message });
  }
});

// UPDATE Review by ID
router.put("/review/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { reviewer_name, review_text, rating } = req.body;

    const query = `
      UPDATE review
      SET reviewer_name = $1, review_text = $2, rating = $3
      WHERE review_id = $4 RETURNING *;
    `;

    const values = [reviewer_name, review_text, rating, id];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({ message: "Review updated successfully!", review: result.rows[0] });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Failed to update review", error: error.message });
  }
});

// DELETE Review by ID
router.delete("/review/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM review WHERE review_id = $1 RETURNING *", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({ message: "Review deleted successfully!" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Failed to delete review", error: error.message });
  }
});

module.exports = router;
