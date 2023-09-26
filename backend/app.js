const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error")

app.use(express.json());
app.use(cookieParser());




//Route Imports
const recipe = require("./routes/recipeRoute");
const user = require("./routes/userRoute");

app.use("/api/v1", recipe);
app.use("/api/v1", user);


//middleware for error handling
app.use(errorMiddleware);


module.exports = app;