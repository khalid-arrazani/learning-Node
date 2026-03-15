const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();

const {
  book,
  validatePostbooks,
  validateUpdateBooks,
} = require("../models/Books");

const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");

/**
 * @desc Get all books
 * @rout /api/books
 * @method GET ,
 * @access public
 */

// get all books
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const { minPrice, maxPrice } = req.query;
    let books;
    if (minPrice && maxPrice) {
      books=await book.find({price:{$gte:minPrice, $lte:maxPrice}})
      .populate("author", ["firstName", "lastName"]);
    }else if (minPrice){
      books=await book.find({price:{$gte:minPrice}})
      .populate("author", ["firstName", "lastName"]);
    } else if (maxPrice){
      books=await book.find({price:{$lte:maxPrice}})
      .populate("author", ["firstName", "lastName"]);
    }else {
      books = await book.find()
      .populate("author", ["firstName", "lastName"]);
    }

  
    if (books.length === 0) {
      res.status(404).json({ message: "No books found" });
    }
    res.status(200).json(books);
  }),
);

/**
 * @desc Get book by id
 * @rout /api/books/:id
 * @method GET
 * @access public
 */

// get book by id
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const Book = await book.findById(req.params.id).populate("author");
    console.log(Book);
    if (Book == null) {
      res.status(404).send({ Message: "book not found" });
    }
    res.status(200).json(Book);
  }),
);

/**
 * @desc Add a new book
 * @rout /api/books
 * @method POST
 * @access public
 */

// add new book
router.post(
  "/",
  verifyTokenAndAdmin,
  asyncHandler(async (req, res) => {
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
  }),
);

/**
 * @desc Update book by id
 * @rout /api/books/:id
 * @method PUT
 * @access public
 */

router.put(
  "/:id",
  verifyTokenAndAdmin,
  asyncHandler(async (req, res) => {
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
  }),
);

/**
 * @desc Delete book by id
 * @rout /api/books
 * @method DELETE
 * @access public
 */

router.delete(
  "/:id",
  verifyTokenAndAdmin,
  asyncHandler(async (req, res) => {
    const Book = await book.findByIdAndDelete(req.params.id);
    if (!Book) {
      res.status(404).send({ message: "bock not found" });

      res.status(200).json({ message: "book deleted successfully" });
    }
  }),
);

// export router
module.exports = router;
