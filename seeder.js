const { book } = require("./models/Books");
const { books } = require("./data");
const connectToDb = require("./config/db");
require("dotenv").config();

//connect to db

connectToDb();

//import book
const importBooks = async () => {
  try {
    await book.insertMany(books);
    console.log("books imported");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

const removeBooks = async () => {
  try {
    await book.deleteMany();
    console.log("books removed!");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

if (process.argv[2] == "-import") {
  importBooks(books);
  
} else if (process.argv[2] == "-remove") {
  removeBooks();
};
