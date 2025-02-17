import React from 'react';
import { Link } from 'react-router-dom';

function RecipeCard({ recipe }) {
  return (
    <div className="recipe-card">
      <h2>{recipe.recipe_name}</h2>
      <p>{recipe.recipe_description.substring(0, 100)}...</p>
      <p><strong>Time:</strong> {recipe.time} mins | <strong>Servings:</strong> {recipe.serving}</p>
      <p><strong>Country:</strong> {recipe.country}</p>
      <Link to={`/recipe/${recipe.recipe_id}`}>View Full Recipe</Link>
    </div>
  );
}

export default RecipeCard;
