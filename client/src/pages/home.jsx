import React from "react";
import RecipeCard from "../components/RecipeCard";

function Home() {
  const recipes = [
    {
      recipe_id: 1,
      recipe_name: "Spaghetti Bolognese",
      recipe_description: "A classic Italian pasta dish with a rich meat sauce.",
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
    {
      recipe_id: 3,
      recipe_name: "Margarita Pizza",
      recipe_description: "A simple pizza with tomato, mozzarella, and basil.",
      recipe_ingredient: "Pizza dough, tomato sauce, mozzarella, basil, olive oil",
      recipe_instruction: "1. Spread sauce on dough. 2. Add toppings. 3. Bake.",
      time: 25,
      serving: 4,
      country: "Italy",
    },
    {
      recipe_id: 4,
      recipe_name: "Caesar Salad",
      recipe_description: "A fresh salad with romaine lettuce, croutons, and Caesar dressing.",
      recipe_ingredient: "Romaine lettuce, croutons, Parmesan, Caesar dressing",
      recipe_instruction: "1. Toss all ingredients together. 2. Serve chilled.",
      time: 15,
      serving: 4,
      country: "United States",
    },
    {
      recipe_id: 5,
      recipe_name: "Chocolate Chip Cookies",
      recipe_description: "Classic soft and chewy chocolate chip cookies.",
      recipe_ingredient: "Flour, sugar, butter, chocolate chips, eggs, vanilla",
      recipe_instruction: "1. Mix ingredients. 2. Bake until golden brown.",
      time: 25,
      serving: 24,
      country: "United States",
    },
    {
      recipe_id: 6,
      recipe_name: "Jollof Rice",
      recipe_description: "A vibrant rice dish with tomatoes, onions, and peppers.",
      recipe_ingredient: "Rice, tomatoes, onions, red peppers, spices",
      recipe_instruction: "1. Cook the tomato sauce. 2. Add rice and simmer until done.",
      time: 45,
      serving: 6,
      country: "Nigeria",
    },
    {
      recipe_id: 7,
      recipe_name: "Bobotie",
      recipe_description: "A South African baked dish with spiced minced meat and an egg topping.",
      recipe_ingredient: "Minced meat, bread, curry powder, eggs, milk, onions",
      recipe_instruction: "1. Cook the meat mixture. 2. Add egg topping and bake.",
      time: 60,
      serving: 4,
      country: "South Africa",
    },
    {
      recipe_id: 8,
      recipe_name: "Yassa Poulet",
      recipe_description: "A Senegalese chicken dish marinated in lemon, mustard, and onions.",
      recipe_ingredient: "Chicken, lemon, mustard, onions, garlic",
      recipe_instruction: "1. Marinate chicken. 2. Cook with onions and serve.",
      time: 90,
      serving: 6,
      country: "Senegal",
    },
    {
      recipe_id: 9,
      recipe_name: "Doro Wat",
      recipe_description: "A spicy Ethiopian chicken stew with hard-boiled eggs.",
      recipe_ingredient: "Chicken, berbere spice, onions, garlic, eggs",
      recipe_instruction: "1. Cook onions and spices. 2. Add chicken and simmer. 3. Add eggs.",
      time: 90,
      serving: 6,
      country: "Ethiopia",
    },
    {
      recipe_id: 10,
      recipe_name: "Injera",
      recipe_description: "A traditional Ethiopian flatbread made from teff flour.",
      recipe_ingredient: "Teff flour, water",
      recipe_instruction: "1. Mix teff flour and water. 2. Ferment and cook on a hot griddle.",
      time: 24 * 60, // 24 hrs for fermentation
      serving: 8,
      country: "Ethiopia",
    },
    {
      recipe_id: 11,
      recipe_name: "Shiro Wat",
      recipe_description: "A thick chickpea stew seasoned with berbere.",
      recipe_ingredient: "Chickpea flour, berbere spice, garlic, water",
      recipe_instruction: "1. Cook chickpea flour with spices and water until thickened.",
      time: 30,
      serving: 4,
      country: "Ethiopia",
    },
    {
      recipe_id: 12,
      recipe_name: "Tibs",
      recipe_description: "Sautéed meat dish with Ethiopian spices and vegetables.",
      recipe_ingredient: "Beef, onions, peppers, garlic, spices",
      recipe_instruction: "1. Sauté beef with vegetables and spices. 2. Serve hot.",
      time: 25,
      serving: 4,
      country: "Ethiopia",
    },
    {
      recipe_id: 13,
      recipe_name: "Kitfo",
      recipe_description: "Minced raw beef seasoned with Ethiopian spices and butter.",
      recipe_ingredient: "Beef, spiced butter, mitmita spice blend",
      recipe_instruction: "1. Mince beef. 2. Mix with spiced butter and spices.",
      time: 20,
      serving: 4,
      country: "Ethiopia",
    },
  ];

  return (
    <div>
      <h1>Welcome to RecipeHub</h1>
      <div className="recipe-list">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.recipe_id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}

export default Home;