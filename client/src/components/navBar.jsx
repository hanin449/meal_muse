import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/image.png";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img 
            src={logo} 
            alt="meal_muse logo" 
            className="w-16 h-16 mr-4 rounded-full" 
          />
          <span className="text-white text-2xl font-bold">meal_muse</span>
        </Link>

        <div className="hidden md:flex space-x-8"> 
          <Link to="/" className="text-white text-lg px-4 py-2 rounded hover:bg-gray-700">
            Home
          </Link>
          <Link to="/add-recipe" className="text-white text-lg px-4 py-2 rounded hover:bg-gray-700">
            Add recipe
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
