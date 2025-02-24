import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import axios from "axios";
import ReviewSection from "../components/reviewSection"; 

function RecipeDetails() {
  const { id } = useParams(); 
  const [recipe, setRecipe] = useState(null);
  const [reviews, setReviews] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    
    axios.get(`http://localhost:5000/api/recipes/${id}`)
      .then(response => {
        setRecipe(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching recipe:", error);
        setError("Recipe not found");
        setLoading(false);
      });

    axios.get(`http://localhost:5000/api/reviews/${id}`)
      .then(response => {
        setReviews(response.data);
      })
      .catch(error => {
        console.error("Error fetching reviews:", error);
      });
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/recipes/${id}`);
      alert(response.data.message); 
      navigate("/"); 
    } catch (error) {
      console.error("Error deleting recipe:", error);
      alert("Failed to delete the recipe. Please try again.");
    }
  };

  if (loading) return <p>Loading recipe...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="recipe-details">
      <h1>{recipe.recipe_name}</h1>
      <p><strong>Description:</strong> {recipe.recipe_description}</p>
      <p><strong>Ingredients</strong>
        <ul>
          {recipe.recipe_ingredients.split(",").map((ingredient, index) => (
            <li key={index}>{ingredient.trim()}</li>
          ))}
        </ul>
      </p>
      <p><strong>Instructions</strong></p>
      <p>{recipe.recipe_instructions}</p>
      <p><strong>Servings:</strong> {recipe.servings}</p>
      <p><strong>Time:</strong> {recipe.time} mins</p>
      <p><strong>Category:</strong> {recipe.recipe_category}</p>
      <p><strong>Country:</strong> {recipe.recipe_country}</p>

      <button onClick={handleDelete}>Delete Recipe</button>

      <ReviewSection reviews={reviews} recipeId={id} setReviews={setReviews} />
    </div>
  );
}

export default RecipeDetails;