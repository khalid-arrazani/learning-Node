const asyncHandler = require("express-async-handler");

const {
  book,
  validatePostbooks,
  validateUpdateBooks,
} = require("../models/Books");

//=============================/* BOOKS CONTROLLER * /=============================/

//======================================================//
// get all books
const getAllBooks = asyncHandler(async (req, res) => {
  const { minPrice, maxPrice } = req.query;
  let books;
  if (minPrice && maxPrice) {
    books = await book
      .find({ price: { $gte: minPrice, $lte: maxPrice } })
      .populate("author", ["firstName", "lastName"]);
  } else if (minPrice) {
    books = await book
      .find({ price: { $gte: minPrice } })
      .populate("author", ["firstName", "lastName"]);
  } else if (maxPrice) {
    books = await book
      .find({ price: { $lte: maxPrice } })
      .populate("author", ["firstName", "lastName"]);
  } else {
    books = await book.find().populate("author", ["firstName", "lastName"]);
  }

  if (books.length === 0) {
    res.status(404).json({ message: "No books found" });
  }
  res.status(200).json(books);
});
//======================================================//

//======================================================//
// get book by id
const getBookById = asyncHandler(async (req, res) => {
  const Book = await book.findById(req.params.id).populate("author");
  console.log(Book);
  if (Book == null) {
    res.status(404).send({ Message: "book not found" });
  }
  res.status(200).json(Book);
});
//======================================================//

//======================================================//
// add new book
const addNewBook = asyncHandler(async (req, res) => {
  const { error } = validatePostbooks(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const Book = new book({
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    price: req.body.price,
    cover: req.body.cover,
  });
  const result = await Book.save();

  res.status(201).json(result);
});
//======================================================//

//======================================================//
// update book
const updateBook = asyncHandler(async (req, res) => {
  const { error } = validateUpdateBooks(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const updateData = {};

  if (req.body.title) updateData.title = req.body.title;
  if (req.body.author) updateData.author = req.body.author;
  if (req.body.description) updateData.description = req.body.description;
  if (req.body.price) updateData.price = req.body.price;
  if (req.body.cover) updateData.cover = req.body.cover;

  const updatedBook = await book.findByIdAndUpdate(
    req.params.id,
    { $set: updateData },
    { returnDocument: "after" },
  );

  if (!updatedBook) {
    return res.status(404).json({ message: "Book not found" });
  }
  res.status(200).json(updatedBook);
});
//======================================================//

//======================================================//
// delete book
const deleteBook = asyncHandler(async (req, res) => {
  const Book = await book.findByIdAndDelete(req.params.id);
  if (!Book) {
    res.status(404).send({ message: "bock not found" });

    res.status(200).json({ message: "book deleted successfully" });
  }
});
//======================================================//

module.exports = {
  getAllBooks,
  getBookById,
  addNewBook,
  updateBook,
  deleteBook,
};
