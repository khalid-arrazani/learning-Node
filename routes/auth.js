const express = require("express");

const { RegisterUser, loginUser } = require("../controller/authController");

const router = express.Router();
//==============================//
/**
 * @desc Register User
 * @rout /api/auth/register
 * @access public
 */

router.post("/register", RegisterUser);
//==============================//


//==============================//
/**
 * @desc login User
 * @rout /api/auth/login
 * @access public
 */

router.post("/login", loginUser);
//==============================//

module.exports = router;
