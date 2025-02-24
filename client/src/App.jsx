import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navBar";
import Home from "./pages/home";
import AddRecipe from "./pages/AddRecipe";
import RecipeDetails from "./pages/recipeDetails";
import Footer from "./components/footer"
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-recipe" element={<AddRecipe />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />  
        </Routes>
      </div>
      <Footer /> 
    </Router>
  );
}

export default App;

