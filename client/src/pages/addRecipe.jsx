import React from "react";
import RecipeForm from "../components/recipeForm";

function AddRecipe() {
  const handleRecipeSubmit = (recipe) => {
    console.log("New Recipe Submitted:", recipe);
  };

  return (
    <div>
      <h1>Add a New Recipe</h1>
      <RecipeForm onSubmit={handleRecipeSubmit} />
    </div>
  );
}
export default AddRecipe;