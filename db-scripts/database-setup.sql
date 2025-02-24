-- Create Recipes Table
CREATE TABLE IF NOT EXISTS recipe (
  recipe_id SERIAL PRIMARY KEY,
  recipe_name VARCHAR(255) NOT NULL,
  recipe_description TEXT,
  recipe_ingredients TEXT NOT NULL,
  recipe_instructions TEXT NOT NULL,
  servings INTEGER NOT NULL,
  time INTEGER NOT NULL,
  recipe_category VARCHAR(100),
  recipe_country VARCHAR(100)
);

-- Create Reviews Table
CREATE TABLE IF NOT EXISTS review (
  review_id SERIAL PRIMARY KEY,
  recipe_id INTEGER NOT NULL,
  reviewer_name VARCHAR(255) DEFAULT 'Anonymous',
  review_text TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  FOREIGN KEY (recipe_id) REFERENCES recipe(recipe_id) ON DELETE CASCADE
);

-- INSERT SAMPLE DATA for Recipe Table (optional, for testing)
INSERT INTO recipe (recipe_name, recipe_description, recipe_ingredients, recipe_instructions, servings, time, recipe_category, recipe_country)
VALUES
  ('Spaghetti Carbonara', 'A classic Italian pasta dish', 'Spaghetti, eggs, bacon, Parmesan cheese, garlic, black pepper', 'Cook the spaghetti. Fry the bacon. Mix the eggs with cheese and pepper. Combine everything.', 4, 20, 'Pasta', 'Italy'),
  ('Chicken Curry', 'A spicy, flavorful chicken curry', 'Chicken, curry powder, onions, tomatoes, garlic, coconut milk', 'Cook the chicken. Add the spices and ingredients. Simmer until cooked.', 4, 40, 'Curry', 'India');

-- INSERT SAMPLE DATA for Review Table (optional, for testing)
INSERT INTO review (recipe_id, reviewer_name, review_text, rating)
VALUES
  (1, 'John Doe', 'Amazing recipe! Simple and delicious.', 5),
  (2, 'Jane Smith', 'Loved the flavor, but a bit too spicy for me.', 4);
