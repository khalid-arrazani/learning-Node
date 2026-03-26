const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const  logger  = require("./middlewares/logger");
const {notFound,errorHandler} = require('./middlewares/errors')
const connectToDB = require("./config/db")
const passport =require("passport")

const cookieParser = require("cookie-parser");


//connection To DataBase
connectToDB();

const app = express();

// middlewares
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); // to parse urlencoded data
app.use(logger);
app.set('view engine','ejs');
app.use(passport.initialize());

app.use(cookieParser());


// use routes if path start with /api/books
app.use("/api/books", require("./routes/books"));

// use routes if path start with /api/authors
app.use("/api/authors", require("./routes/authors"));

// use routes if path start with /api/auth
app.use("/api/auth", require("./routes/auth"));

// use routes if path start with /api/user
app.use("/api/users", require ("./routes/user"));

// use routes for reset password
app.use("/password", require("./routes/password"))


//Error Handler Middleware
app.use(notFound)

app.use(errorHandler);

// start server
app.listen(process.env.PORT || 8000, () => {
  console.log("Server running..,.");
});
