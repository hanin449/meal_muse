const express = require('express');
const router = express.Router();
const pool = require('../db/db');

// CREATE Recipe
router.post('/', async (req, res) => {
  try {
    const {
      recipe_name,
      recipe_description,
      recipe_ingredients,
      recipe_instructions,
      servings,
      time,
      recipe_category,
      recipe_country,
    } = req.body;
    
    const query = `
      INSERT INTO recipe (recipe_name, recipe_description, recipe_ingredients, recipe_instructions, servings, time, recipe_category, recipe_country)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;
    `;

    const values = [
      recipe_name,
      recipe_description,
      recipe_ingredients,
      recipe_instructions,
      servings,
      time,
      recipe_category,
      recipe_country,
    ];

    const result = await pool.query(query, values);

    res.status(201).json({
      message: 'Recipe added successfully!',
      recipe: result.rows[0],
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Failed to add recipe', error: error.message });
  }
});

// GET All Recipes with Search
router.get('/', async (req, res) => {
  try {
    const { search } = req.query; 
    let query = 'SELECT * FROM recipe ORDER BY recipe_id ASC';
    let values = [];

    if (search) {
      // Modify query to search in recipe_name and recipe_description
      query = `SELECT * FROM recipe WHERE recipe_name ILIKE $1 OR recipe_description ILIKE $1 ORDER BY recipe_id ASC`;
      values = [`%${search}%`]; 
    }

    const result = await pool.query(query, values);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Failed to fetch recipes', error: error.message });
  }
});

// GET Single Recipe by ID with Reviews
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch the recipe details
    const recipeQuery = `SELECT * FROM recipe WHERE recipe_id = $1`;
    const recipeResult = await pool.query(recipeQuery, [id]);

    if (recipeResult.rows.length === 0) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // Fetch the associated reviews
    const reviewQuery = `SELECT review_id, reviewer_name, review_text, rating FROM review WHERE recipe_id = $1 ORDER BY review_id ASC`;
    const reviewResult = await pool.query(reviewQuery, [id]);

    // Combine recipe details with its reviews
    const recipeWithReviews = {
      ...recipeResult.rows[0], 
      reviews: reviewResult.rows, 
    };

    res.status(200).json(recipeWithReviews);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Failed to fetch recipe', error: error.message });
  }
});

// UPDATE Recipe by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      recipe_name,
      recipe_description,
      recipe_ingredients,
      recipe_instructions,
      servings,
      time,
      recipe_category,
      recipe_country,
    } = req.body;

    const query = `
      UPDATE recipe
      SET recipe_name = $1, recipe_description = $2, recipe_ingredients = $3, recipe_instructions = $4,
          time = $5, servings = $6, recipe_category = $7, recipe_country = $8
      WHERE recipe_id = $9 RETURNING *;
    `;

    const values = [
      recipe_name,
      recipe_description,
      recipe_ingredients,
      recipe_instructions,
      servings,
      time,
      recipe_category,
      recipe_country,
      id,
    ];

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.status(200).json({ message: 'Recipe updated successfully!', recipe: result.rows[0] });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Failed to update recipe', error: error.message });
  }
});

// DELETE Recipe by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM recipe WHERE recipe_id = $1 RETURNING *;', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.status(200).json({ message: 'Recipe deleted successfully!' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Failed to delete recipe', error: error.message });
  }
});

module.exports = router;
