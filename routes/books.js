const express = require("express");
const joi = require("joi");
const { book } = require("../models/Books");

const router = express.Router();

/**
 * @desc Get all books
 * @rout /api/books
 * @method GET
 * @access public
 */

// get all books
router.get("/", async (req, res) => {
  try {
    const Book = await book.find();
    if (Book.length === 0) {
      res.status(404).json({ message: "No books found" });
    }
    res.status(200).json(Book);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "" });
  }
});

/**
 * @desc Get book by id
 * @rout /api/books/:id
 * @method GET
 * @access public
 */

// get book by id
router.get("/:id", async (req, res) => {
  try {
    const Book = await book.findById(req.params.id);
    if (!Book) {
      res.status(404).send({ Message: "book not found" });
    }
    res.status(200).json(Book);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
});

/**
 * @desc Add a new book
 * @rout /api/books
 * @method POST
 * @access public
 */

// add new book
router.post("/", async (req, res) => {
  const { error } = validatePostbooks(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
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
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong");
  }
});

/**
 * @desc Update book by id
 * @rout /api/books
 * @method PUT
 * @access public
 */

router.put("/:id", async (req, res) => {
  const { error } = validateUpdateBooks(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    const Book = await book.findByIdAndUpdate(
      req.params.id,

      req.body,
      { returnDocument: "after" },
    );

    if (!Book) {
      return res.status(404).send({ message: "bock not fouand" });
    }
    res.status(200).json(Book);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @desc Delete book by id
 * @rout /api/books
 * @method DELETE
 * @access public
 */

router.delete("/:id", async (req, res) => {
  try {
    const Book = await book.findByIdAndDelete(req.params.id);
    if (!Book) {
      res.status(404).send({ message: "bock not found" });

      res.status(200).json({ message: "book deleted successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

// validation function
function validatePostbooks(obj) {
  const schema = joi.object({
    name: joi.string().trim().min(3).max(200).required(),
    actor: joi.string().trim().min(3).max(22),
    price: joi.number().min(0).required(),
    cover: joi.string().trim(),
    description: joi.string().trim().required(),
    image: joi.string().trim(),
    publishYear: joi.number().required(),
    author: joi.string().trim().min(3).max(200).required(),
  });
  return schema.validate(obj);
}

function validateUpdateBooks(obj) {
  const schema = joi.object({
    name: joi.string().trim().min(3).max(200).required(),
    actor: joi.string().trim().min(3).max(200).required(),
    price: joi.number().min(0).required(),
    cover: joi.string().trim(),
    description: joi.string().trim().required(),
    image: joi.string().trim(),
    publishYear: joi.number().required(),
    author: joi.string().trim().min(3).max(200).required(),
  });
  return schema.validate(obj);
}
// export router
module.exports = router;
