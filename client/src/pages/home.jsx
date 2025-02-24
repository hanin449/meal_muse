import React, { useEffect, useState } from "react";
import RecipeCard from "../components/recipeCard";
import axios from "axios";
import "../index.css";


function Home() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async (search = "") => {
    try {
      const response = await axios.get(`http://localhost:5000/api/recipes`, {
        params: { search },
      });
      setRecipes(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    fetchRecipes(term);
  };

  return (
    <div className="welcome-container">
      <h1 className="welcome-text">Welcome to RecipeHub</h1>

      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search for a recipe..."
      />

      <div className="recipe-list">
        {recipes.length > 0 ? (
          recipes.map((recipe) => <RecipeCard key={recipe.recipe_id} recipe={recipe} />)
        ) : (
          <p>No recipes found.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
