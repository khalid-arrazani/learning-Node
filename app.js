const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const  logger  = require("./middlewares/logger");
const {notFound,errorHandler} = require('./middlewares/errors')
dotenv.config();

//connection To DataBase
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connection To mongoDB..."))
  .catch((error) => console.log("Connection Failed  To mongoDB...", error));
const app = express();

// middlewares
app.use(express.json());

app.use(logger);



// routes
const userRoutes = require("./routes/books");
const authors = require("./routes/authors");
const authPath = require("./routes/auth");


// use routes if path start with /api/books
app.use("/api/books", userRoutes);

// use routes if path start with /api/authors
app.use("/api/authors", authors);

// use routes if path start with /api/auth
app.use("/api/auth", authPath);

//Error Handler Middleware
app.use(notFound)

app.use(errorHandler);

// start server
app.listen(process.env.PORT || 8000, () => {
  console.log("Server running..,.");
});
