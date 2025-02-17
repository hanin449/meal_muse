
// const express = require('express');
// const cors = require("cors");
// const { router: auth } = require("./routes/auth");
// const bodyParser = require('body-parser');
// const recipeRoute = require("./routes/recipeRoutes")
// const app = express();

// app.use(express.json(), cors());

// app.use("/auth", auth);
// app.use("/recipes", recipeRoute)

// app.use(cors());  // Enable CORS for frontend requests
// app.use(bodyParser.json());

// app.get("/", (req, res) => {
//     res.send("Welcome to the API!");
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server runnible: ${PORT}`));

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const auth = require("./routes/auth");
const recipeRoute = require("./routes/recipeRoutes");

const app = express();

// Enable CORS and Body Parser before routes
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/auth", auth);
app.use("/recipes", recipeRoute);

app.get("/", (req, res) => {
    res.send("Welcome to the API!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
