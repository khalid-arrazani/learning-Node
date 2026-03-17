const express = require("express");
const router = express.Router();

const {
  getAllAuthors,
  addAuthor,
  getIdAuthors,
  updateAuothors,
  deleteAuthors,
} = require("../controller/authersController");

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
router.get("/:id", getIdAuthors);

/**
 * @desc Create new author
 * @route POST /api/authors
 * @access private (Admin)
 */
router.post("/", verifyTokenAndAdmin, addAuthor);

/**
 * @desc Update author
 * @route PUT /api/authors/:id
 * @access private (Admin)
 */
router.put("/:id", verifyTokenAndAdmin, updateAuothors);

/**
 * @desc Delete author
 * @route DELETE /api/authors/:id
 * @access private (Admin)
 */
router.delete("/:id", verifyTokenAndAdmin, deleteAuthors);

module.exports = router;