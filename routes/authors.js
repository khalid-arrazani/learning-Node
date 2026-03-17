const express = require("express");
const router = express.Router();

const {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} = require("../controllers/authorsController");

const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");

/**
 * @desc Get all authors
 * @route GET /api/authors
 * @access public
 */
router.get("/", getAllAuthors);

/**
 * @desc Get author by id
 * @route GET /api/authors/:id
 * @access public
 */
router.get("/:id", getAuthorById);

/**
 * @desc Create new author
 * @route POST /api/authors
 * @access private (Admin)
 */
router.post("/", verifyTokenAndAdmin, createAuthor);

/**
 * @desc Update author
 * @route PUT /api/authors/:id
 * @access private (Admin)
 */
router.put("/:id", verifyTokenAndAdmin, updateAuthor);

/**
 * @desc Delete author
 * @route DELETE /api/authors/:id
 * @access private (Admin)
 */
router.delete("/:id", verifyTokenAndAdmin, deleteAuthor);

module.exports = router;