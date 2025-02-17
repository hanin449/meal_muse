import React, { useState } from 'react';

function RecipeForm() {
  const [recipe, setRecipe] = useState({
    recipe_name: '',
    recipe_description: '',
    recipe_ingredients: '',  // Fix naming to match backend
    recipe_instruction: '',
    time: '',
    servings: '', // Fix naming to match backend
    recipe_category: '',
    recipe_country: ''
  });

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipe),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Recipe added successfully!');
        setRecipe({ 
          recipe_name: '',
          recipe_description: '',
          recipe_ingredients: '',
          recipe_instruction: '',
          time: '',
          servings: '',
          recipe_category: '',
          recipe_country: ''
        });
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error submitting recipe:', error);
      alert('Something went wrong! Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="recipe_name" placeholder="Recipe Name" value={recipe.recipe_name} onChange={handleChange} required />
      <textarea name="recipe_description" placeholder="Recipe Description" value={recipe.recipe_description} onChange={handleChange} required />
      <textarea name="recipe_ingredients" placeholder="Ingredients" value={recipe.recipe_ingredients} onChange={handleChange} required />
      <textarea name="recipe_instruction" placeholder="Instructions" value={recipe.recipe_instruction} onChange={handleChange} required />
      <input type="number" name="time" placeholder="Preparation Time (mins)" value={recipe.time} onChange={handleChange} required />
      <input type="number" name="servings" placeholder="Servings" value={recipe.servings} onChange={handleChange} required />
      <input type="text" name="recipe_category" placeholder="Category (e.g. Italian)" value={recipe.recipe_category} onChange={handleChange} required />
      <input type="text" name="recipe_country" placeholder="Country of Origin" value={recipe.recipe_country} onChange={handleChange} required />
      <button type="submit">Submit Recipe</button>
    </form>
  );
}

export default RecipeForm;
