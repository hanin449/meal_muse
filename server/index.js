const express = require('express');
const cors = require("cors");
const { router: auth } = require("./routes/auth");


const app = express();

app.use(express.json(), cors());

app.use("/auth", auth);


app.get("/", (req, res) => {
    res.send("Welcome to the API!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server runnible: ${PORT}`));