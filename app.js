const express = require("express");
const mongoose = require("mongoose");

//connection To DataBase
mongoose
  .connect("mongodb://127.0.0.1:27017/my-project")
  .then(() => console.log("Connection To mongoDB..."))
  .catch((error) => console.log("Connection Failed  To mongoDB...", error));
const app = express();

// middlewares
app.use(express.json());

// routes
const userRoutes = require("./routes/books");
const authors = require("./routes/authors");

// use routes if path start with /api/books
app.use("/api/books", userRoutes);

// use routes if path start with /api/authors
app.use("/api/authors", authors);

// start server
app.listen(5000, () => {
  console.log("Server running..,.");
});
