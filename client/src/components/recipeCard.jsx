import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

function RecipeCard({ recipe }) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/recipes').then(response => {
      setMessage(response.data.message)
    }).catch(error => {
      console.error('error fetching data:', error)
    });
  })
  return (
    
    <div className="recipe-card">
      <h2>{recipe.recipe_name}</h2>
      <p><strong>Description:</strong> {recipe.recipe_description.substring(0, 100)}...</p>
      <h3>Ingredients:</h3>
      <p>{recipe.recipe_ingredients.substring(0, 50)}...</p>
      <p><strong>Servings:</strong> {recipe.servings}</p>
      <p><strong>Time:</strong> {recipe.time} mins</p>
      <p><strong>Category:</strong> {recipe.recipe_category}</p>
      <p><strong>Country:</strong> {recipe.recipe_country}</p>
      <Link to={`/recipe/${recipe.recipe_id}`}>View Full Recipe</Link>
    </div>
  );
}

export default RecipeCard;
