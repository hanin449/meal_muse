import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReviewSection from "./ReviewSection";

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Sample recipes (should be replaced with API call)
    const recipes = [
      {
        recipe_id: 1,
        recipe_name: "Spaghetti Bolognese",
        recipe_description: "A classic Italian pasta dish with rich meat sauce.",
        recipe_ingredient: "Spaghetti, beef, tomato sauce, onions, garlic, olive oil, herbs",
        recipe_instruction: "1. Cook spaghetti. 2. Prepare the meat sauce. 3. Combine and serve.",
        time: 45,
        serving: 4,
        country: "Italy",
      },
      {
        recipe_id: 2,
        recipe_name: "Beef Stroganoff",
        recipe_description: "A rich and creamy beef dish served with pasta or rice.",
        recipe_ingredient: "Beef, mushrooms, onions, sour cream, pasta",
        recipe_instruction: "1. Cook beef and mushrooms. 2. Add sour cream and serve over pasta.",
        time: 50,
        serving: 4,
        country: "Russia",
      },
      // Add all other recipes here...
    ];

    // Fetch recipe by id
    const fetchedRecipe = recipes.find((r) => r.recipe_id === parseInt(id));
    setRecipe(fetchedRecipe || {});

    // Sample reviews (should be replaced with API call)
    const fetchedReviews = [
      { review_id: 1, user_id: 101, recipe_id: id, review_text: "Delicious recipe!", rating: 5 },
      { review_id: 2, user_id: 102, recipe_id: id, review_text: "Easy to make!", rating: 4 },
    ];
    setReviews(fetchedReviews);
  }, [id]);

  if (!recipe.recipe_id) {
    return <h2>Recipe not found</h2>;
  }

  return (
    <div>
      <h1>{recipe.recipe_name}</h1>
      <p><strong>Country:</strong> {recipe.country}</p>
      <p>{recipe.recipe_description}</p>
      
      <h3>Ingredients</h3>
      <p>{recipe.recipe_ingredient}</p>
      
      <h3>Instructions</h3>
      <p>{recipe.recipe_instruction}</p>
      
      <p><strong>Time:</strong> {recipe.time} mins | <strong>Servings:</strong> {recipe.serving}</p>
      
      <ReviewSection reviews={reviews} />
    </div>
  );
}

export default RecipeDetails;
