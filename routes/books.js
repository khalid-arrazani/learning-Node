const express = require("express");
const router = express.Router();



const {
  getAllBooks,
  getBookById,
  addNewBook,
  updateBook,
  deleteBook,
} = require("../controller/booksController");

const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");
//======================================================//
/**
 * @desc Get all books
 * @rout /api/books
 * @access public
 */
router.get("/", getAllBooks);
//======================================================//
/**
 * @desc Get book by id
 * @rout /api/books/:id
 * @access public
 */
router.get("/:id", getBookById);
//======================================================//
/**
 * @desc Add a new book
 * @rout /api/books
 * @access private (Admin)
 */
router.post("/", verifyTokenAndAdmin, addNewBook);
//======================================================//
/**
 * @desc Update book by id
 * @rout /api/books/:id
 * @access private (Admin)
 */
router.put("/:id", verifyTokenAndAdmin, updateBook);
//======================================================//
/**
 * @desc Delete book by id
 * @rout /api/books
 * @access private (Admin)
 */
router.delete("/:id", verifyTokenAndAdmin, deleteBook);
//======================================================//

// export router
module.exports = router;
