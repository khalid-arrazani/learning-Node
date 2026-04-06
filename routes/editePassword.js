const express = require("express");
const router = express.Router();
const { User } = require("../models/User.js");

const { verifyTokenForUpload,createResetToken } = require("../middlewares/verifyToken");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

const resend = require("../config/resond")

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

router.get("/forgotPassword",verifyTokenForUpload,async (req,res)=>{
  const user = await User.findById(req.user.id)
  if (!user){
    return res.status(404).redirect("/api/auth/login")
  }
  res.render("sendEmail",{    message: null,
    error: null})
});

router.post("/forgotPassword",verifyTokenForUpload,async (req,res)=>{
 
  const user= await User.findById(req.user.id)

  if(user.email===req.body.email){
  // generate code
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  // hash code
  const hashedCode = await bcrypt.hash(code, 10);

  user.resetCode = hashedCode;
  user.resetCodeExpire = Date.now() + 10 * 60 * 1000;
  await user.save();
  const resetPasswordEmail  = require("../mails/resetPassword.js")
  const html = resetPasswordEmail(code)

  // 📧 send email with Resend
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: user.email,
    subject: "Reset Password Code",
    html: html
  });
    res.redirect("/api/profile/set-Code&verify")
  }else{
    const error = "This email not match"
    res.render("sendEmail",{message:null,
    error: error})
  }
});

router.get("/set-Code&verify",verifyTokenForUpload,async (req,res)=>{
  const user = await User.findById(req.user.id)
  if (!user){
    return res.status(404).redirect("/api/auth/login")
  }
  res.render("CodeVerify",{    message: null,
    error: null,email:user.email})
});




router.post("/set-Code&verify",verifyTokenForUpload,async (req,res)=>{

  const v = await User.findById(req.user.id)
  if (!v){
    return res.status(404).redirect("/api/auth/login")
  }

  const { email, code } = req.body;

  const user = await User.findOne({email});
   
  console.log(user.resetCode);
  if (!user.resetCodeExpire || user.resetCodeExpire < Date.now()) {
  return   res.render("CodeVerify",{ message: "Code expired",
    error: null , email:user.email})
  }
  if (!user.resetCode) {
  return res.render("CodeVerify", {
    message: "No reset code found",
    error: null,
    email: user.email
  });
}
  const isMatch = await bcrypt.compare(code , user.resetCode);

  if (!isMatch) return res.render("CodeVerify",{ message: "Invalid code", error: null , email:user.email})

  user.resetCode = null;
  await user.save();

  const token = createResetToken(user._id);

  res.redirect(`/api/profile/resetPassword?token=${token}`);
});

router.get("/resetPassword",verifyTokenForUpload,async (req,res)=>{

  const token = req.query.token;
  if (!token) {
    return res.status(400).send("Token missing");
  }
    try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.render("resetPassword", { userId: decoded.id , message: null, error: null ,email:user.email });

  } catch (err) {
    return res.status(400).send("Invalid or expired token");
  }
  
});

router.post("/resetPassword",verifyTokenForUpload,async (req,res)=>{
  const user = await User.findById(req.body.userId)
  console.log(user);
  if (!user){
    return res.status(404).redirect("/api/auth/login")
  } 
  const { email, newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword) {
    return res.render("resetPassword",{    message: null,
      error: "Passwords do not match",email:user.email})
  }

  
  const salt  = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);
  await user.save();

  res.render("passChangeSeccese").status(200)
});






module.exports = router;
