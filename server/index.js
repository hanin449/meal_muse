const express = require("express");
const cors = require("cors");
const recipeRoute  = require("./routes/recipeRoutes");
const reviewRoute = require("./routes/reviewRoutes"); 

const app = express();

// Enable CORS and Body Parser before routes
app.use(cors());

app.use(express.json());
// Routes
app.use('/api/recipes', recipeRoute); 
app.use('/api/reviews', reviewRoute);

app.get("/", (req, res) => {
    res.send("Welcome to the API!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
