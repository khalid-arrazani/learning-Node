const express = require("express");

const app = express();

// middlewares 
app.use(express.json());

// routes
const userRoutes = require("./routes/books")

// use routes if path start with /api/books
app.use("/api/books", userRoutes);




// start server
app.listen(5000, () => {
  console.log("Server running..,.");
});
