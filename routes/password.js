const express = require("express");
const {
  getForgotPasswordView,
  sendForgotPasswordLink,
  resetPassword,
  resetPasswordLink
} = require("../controller/passwordController");
const router = express.Router();

// @desc Get Forgot Password View
// @route /password/forgot-password
// @method GET
// @access public
router
  .route("/forgot-password")
  .get(getForgotPasswordView)
  .post(sendForgotPasswordLink);


router
 .route("/reset-password/:id/:token")
 .get(resetPasswordLink)
 .post(resetPassword)

module.exports = router;
