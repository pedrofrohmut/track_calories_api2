const config = require("./config");

// Express
const express = require("express");
const app = express();

const cors = require("cors");

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS Middleware
app.use(cors());

// Meals Router
app.use("/", require("./src/routes/MealsRoutes"));

app.listen(config.PORT, () =>
  console.log("Example app listening at port " + config.PORT)
);
