const express = require("express");

const { RegisterUser, loginUser ,getLoginView,googleLogin,googleCallback,verifyToken} = require("../controller/authController");

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
router
 .route("/login")
 .get(getLoginView)
 .post(loginUser)
 

// Google login
router.get("/google", googleLogin);
router.get("/google/callback", googleCallback);
//==============================//

router.get("/dashboard", verifyToken, (req, res) => {
    console.log("8888",req.user);
  res.render("dashboard", { user: req.user });
});



router.get("/logout", (req, res) => {
  res.clearCookie("token"); // 👈 تمسح cookie
  res.redirect("/api/auth/login");   // 👈 رجع ل login
});

module.exports = router;
