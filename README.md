# meal_muse
Recipe Website
    This web application allows users to browse, add, and review recipes from around the world. It's built with a React frontend and a Node.js/Express backend using a PostgreSQL database.

Features
    Browse Recipes: Explore a variety of recipes by category or country.
    Add Recipes: Users can submit their own recipes, including ingredients, instructions, and more.
    Rate and Review: Leave reviews for recipes, including a rating (1-5 stars) and text feedback.
    User-friendly Interface: Built with React and styled for a responsive, modern experience.

Technologies Used
    Frontend: React, Vite
    Backend: Node.js, Express
    Database: PostgreSQL
    HTTP Requests: Axios for API calls

Prerequisites
    Node.js (v16 or later)
    PostgreSQL (Latest Version)
    npm (Comes with Node.js)

Clone the Repository

Install Dependencies 

 Database Setup
    Start PostgreSQL and create a database
       CREATE DATABASE recipe_db;
     Connect to the database:
        psql -U your_username -d recipe_db
     Create Recipes Table
        CREATE TABLE recipes (
            recipe_id SERIAL PRIMARY KEY,
            recipe_name VARCHAR(255) NOT NULL,
            recipe_description TEXT,
            recipe_ingredients TEXT NOT NULL,
            recipe_instructions TEXT NOT NULL,
            servings INT,
            time INT,
            recipe_category VARCHAR(100),
            recipe_country VARCHAR(100),
            );
     Create Reviews Table
         CREATE TABLE reviews (
            review_id SERIAL PRIMARY KEY,
            recipe_id INT REFERENCES recipes(recipe_id) ON DELETE CASCADE,
            reviewer_name VARCHAR(255) NOT NULL,
            review_text TEXT NOT NULL,
            rating INT CHECK (rating BETWEEN 1 AND 5)
            );

 Create a .env file in the root of your project and add:
    PORT=5000
    DB_USER=your_username
    DB_HOST=localhost
    DB_NAME=recipe_db
    DB_PASSWORD=your_password
    DB_PORT=5432

Start the Server
    Run the backend: npm run server
    Run the frontend: npm start

The website will be accesable through http://localhost:3000

API Endpoints
     Recipes

        GET /api/recipes - Fetch all recipes
        GET /api/recipes/:id - Get a single recipe
        POST /api/recipes - Add a new recipe
        PUT /api/recipes/:id - Update a recipe
        DELETE /api/recipes/:id - Delete a recipe

     Reviews

        GET /api/reviews/:recipe_id - Fetch all reviews for a recipe
        POST /api/reviews - Add a review
        PUT /api/reviews/:id - Update a review
        DELETE /api/reviews/:id - Delete a review
