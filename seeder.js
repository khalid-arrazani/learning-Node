const { book } = require("./models/Books");
const {Author} = require("./models/Authors");
const { books,authors} = require("./data");

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
     process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

//import AUTHOR
const importAuthors = async () => {
  try {
    await Author.insertMany(authors);
    console.log("authors imported");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

const removeAuthors = async () => {
  try {
    await Author.deleteMany();
    console.log("authors removed!");
     process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

if (process.argv[2] == "-import") {
  importBooks();
  
} else if (process.argv[2] == "-remove") {
  removeBooks();
}else if (process.argv[2] == "-import-Authors") {
  importAuthors();
}else if (process.argv[2] == "-remove-Authors") {
  removeAuthors();
}
 