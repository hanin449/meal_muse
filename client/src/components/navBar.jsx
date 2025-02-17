import React from 'react';
import { Link } from 'react-router-dom';
//import "./Navbar.css";

/*function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">RecipeHub</Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/add-recipe">Post Recipe</Link>
        <Link to="/signin">Sign In</Link>
      </div>
    </nav>
  );
}

export default Navbar;

*/

// import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          meal_muse
        </Link>
        <div className="space-x-4">
          <Link to="/" className="text-white px-4 py-2 rounded hover:bg-gray-700">
            Home
          </Link>
          <Link to="/add-recipe" className="text-white px-4 py-2 rounded hover:bg-gray-700">
            Add recipe
          </Link>
          <Link to="/signin" className="text-white px-4 py-2 rounded hover:bg-gray-700">
            Signin
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;