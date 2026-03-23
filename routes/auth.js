const express = require("express");

const { RegisterUser, loginUser ,getLoginView} = require("../controller/authController");

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

router.post("/login", loginUser)
router
 .route("/login")
 .get(getLoginView)
 .post(loginUser)
 
//==============================//

module.exports = router;
