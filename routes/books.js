const express = require("express");
const asyncHandler = require("express-async-handler");
const joi = require("joi");
const {
  book,
  validatePostbooks,
  validateUpdateBooks,
} = require("../models/Books");

const router = express.Router();

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
    const Book = await book.find();
    if (Book.length === 0) {
      res.status(404).json({ message: "No books found" });
    }
    res.status(200).json(Book);
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
    const Book = await book.findById(req.params.id);
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
  asyncHandler(async (req, res) => {
    const { error } = validatePostbooks(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const Book = new book({
      name: req.body.name,
      actor: req.body.actor,
      price: req.body.price,
      author: req.body.author,
      description: req.body.description,
      publishYear: req.body.publishYear,
      image: req.body.image,
    });
    const result = await Book.save();

    res.status(201).json(result);
    es.status(500).send("something went wrong");
  }),
);

/**
 * @desc Update book by id
 * @rout /api/books
 * @method PUT
 * @access public
 */

router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const { error } = validateUpdateBooks(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const Book = await book.findByIdAndUpdate(
      req.params.id,

      req.body,
      { returnDocument: "after" },
    );

    if (!Book) {
      return res.status(404).send({ message: "bock not fouand" });
    }
    res.status(200).json(Book);
  }),
);

/**
 * @desc Delete book by id
 * @rout /api/books
 * @method DELETE
 * @access public
 */

router.delete("/:id", asyncHandler(
 async (req, res) => {
 
    const Book = await book.findByIdAndDelete(req.params.id);
    if (!Book) {
      res.status(404).send({ message: "bock not found" });

      res.status(200).json({ message: "book deleted successfully" });
    }
 
}));

// export router
module.exports = router;
