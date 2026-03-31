const express = require("express");
const router = express.Router();
const { User } = require("../models/User.js");

const { verifyTokenForUpload } = require("../middlewares/verifyToken");
const bcrypt = require("bcryptjs");

router.get("/editPassword", verifyTokenForUpload, async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return res.redirect("/api/auth/login");
  }
  res.render("editPassword", { user, message: null });
});

router.post("/editPassword", verifyTokenForUpload, async (req, res) => {
  const user = await User.findById(req.user.id);
  const newPassword = req.body.newPassword;
  const confirmPassword = req.body.confirmPassword;
  const currentPassword = req.body.currentPassword;
  const message = null;

  if (newPassword == confirmPassword) {
    
    if (!user.password) {
      //update the password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
      await user.save();

      const message = "password updated successfully";
      res.render("editPassword", { user, message });
    } else {
      const match = await bcrypt.compare(currentPassword, user.password);
      if (!match) {
        const message = "current password is incorrect";
        res.render("editPassword", { user, message });
      } else {
        if (currentPassword != newPassword) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(newPassword, salt);
          await user.save();

          const message = "password updated successfully";
          res.render("editPassword", { user, message });
        } else {
          const message = "new password cannot be the same as current password";
          res.render("editPassword", { user, message });
        }
      }
    }
  } else {
    const message = "new password and confirm password do not match";
    res.render("editPassword", { user, message });
  }
});

module.exports = router;
