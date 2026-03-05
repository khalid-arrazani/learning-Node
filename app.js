const express = require("express");

const app = express();

// middlewares 
app.use(express.json());

// routes
const userRoutes = require("./routes/books")
const authors = require("./routes/authors")

// use routes if path start with /api/books
app.use("/api/books", userRoutes);

// use routes if path start with /api/authors
app.use("/api/authors", authors);



// start server
app.listen(5000, () => {
  console.log("Server running..,.");
});
