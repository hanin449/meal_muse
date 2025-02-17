const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { router: auth } = require("./routes/auth");
const { router: recipeRoute } = require("./routes/recipeRoutes");

const app = express();

// Enable CORS and Body Parser before routes
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use(auth);
app.use(recipeRoute);

app.get("/", (req, res) => {
    res.send("Welcome to the API!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
