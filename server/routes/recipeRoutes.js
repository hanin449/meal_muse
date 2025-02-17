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
      recipe_instruction,
      time,
      servings,
      recipe_category,
      recipe_country,
    } = req.body;

    const query = `
      INSERT INTO recipes (recipe_name, recipe_description, recipe_ingredients, recipe_instruction, time, servings, recipe_category, recipe_country)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;
    `;

    const values = [
      recipe_name,
      recipe_description,
      recipe_ingredients,
      recipe_instruction,
      time,
      servings,
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

// GET All Recipes
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM recipes ORDER BY id DESC');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Failed to fetch recipes', error: error.message });
  }
});

// GET Single Recipe by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM recipes WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.status(200).json(result.rows[0]);
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
      recipe_instruction,
      time,
      servings,
      recipe_category,
      recipe_country,
    } = req.body;

    const query = `
      UPDATE recipes
      SET recipe_name = $1, recipe_description = $2, recipe_ingredients = $3, recipe_instruction = $4,
          time = $5, servings = $6, recipe_category = $7, recipe_country = $8
      WHERE id = $9 RETURNING *;
    `;

    const values = [
      recipe_name,
      recipe_description,
      recipe_ingredients,
      recipe_instruction,
      time,
      servings,
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
    const result = await pool.query('DELETE FROM recipes WHERE id = $1 RETURNING *;', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.status(200).json({ message: 'Recipe deleted successfully!' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Failed to delete recipe', error: error.message });
  }
});

module.exports = { router };
