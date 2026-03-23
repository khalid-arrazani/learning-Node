const express = require("express");

const { RegisterUser, loginUser ,getLoginView,googleLogin,googleCallback} = require("../controller/authController");

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
 

// Google login
router.get("/google", googleLogin);
router.get("/google/callback", googleCallback);
//==============================//

module.exports = router;
