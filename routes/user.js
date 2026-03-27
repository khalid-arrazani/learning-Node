const express = require("express");
const router = express.Router();

const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");

const {
  updateUser,
  getAllUsers,
  getUserById,
  deleteUserById,
} = require("../controller/userController");


//=============================/* USER ROUTES * /=============================/

//===========================================================================//
/**
 * @desc update User
 * @rout /api/users/:id
 * @method PUT
 * @access privete(only admin and the user himself)
 */

// we can update the user by id and we can update the email, password and username
router.put("/:id", verifyTokenAndAuthorization, updateUser);
//===========================================================================//

//===========================================================================//
/**
 * @desc get all users
 * @rout /api/users/
 * @access privete (only admin)
 */

// we can get all users but we can't get the password of the users
router.get("/", verifyTokenAndAdmin, getAllUsers);
//===========================================================================//

//===========================================================================//
/**
 * @desc get user by id
 * @rout /api/users/:id
 * @method GET
 * @access privete (only admin and the user himself)
 */

// we can get user by id but we can't get the password of the user
router.get("/:id", verifyTokenAndAuthorization, getUserById);
//===========================================================================//

//===========================================================================//
/**
 * @desc delete user by id
 * @rout /api/users/:id
 * @access privete (only admin and the user himself)
 */
// we can delete user by id but we can't get the password of the user
router.delete("/:id", verifyTokenAndAuthorization, deleteUserById);
//===========================================================================//


module.exports = router;
