import React, { useEffect, useState } from "react";
import RecipeCard from "./components/RecipeCard";
import axios from "axios";

function Home() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/recipes")
      .then((response) => {
        setRecipes(response.data); // Ensure the API returns an array
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
      });
  }, []); // Runs once when component mounts

  return (
    <div>
      <h1>Welcome to RecipeHub</h1>
      <div className="recipe-list">
        {recipes.length > 0 ? (
          recipes.map((recipe) => <RecipeCard key={recipe.recipe_id} recipe={recipe} />)
        ) : (
          <p>Loading recipes...</p>
        )}
      </div>
    </div>
  );
}

export default Home;
