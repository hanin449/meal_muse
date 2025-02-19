import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/image.png";
const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
      <Link to="/" className="flex items-center">
          <img 
            src={logo} 
            alt="meal_muse logo" 
            className="w-12 h-12 mr-2 rounded-full" 
          />
          <span className="text-white text-xl font-bold">meal_muse</span>
        </Link>
        <div className="space-x-4">
          <Link to="/" className="text-white px-4 py-2 rounded hover:bg-gray-700">
            Home
          </Link>
          <Link to="/add-recipe" className="text-white px-4 py-2 rounded hover:bg-gray-700">
            Add recipe
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;