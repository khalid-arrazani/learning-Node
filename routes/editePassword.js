const express = require("express");
const router = express.Router();
const { User } = require("../models/User.js");

const { verifyTokenForUpload } = require("../middlewares/verifyToken");




router.get("/editPassword", verifyTokenForUpload, async (req, res) => {   
  const user = await User.findById(req.user.id);
  if (!user) {
    return res.redirect("/api/auth/login");
  }  
  res.render("editPassword", { user });
} );

router.post("/editPassword", verifyTokenForUpload, async (req, res) => { 
   const user = await User.findById(req.user.id); 
  const input1 = req.body.newPassword 
  const input2 = req.body.confirmPassword 
 if (input1==input2){
  user.password = input1
  user.save()
 }else{
  console.log(111)
 }
 const message = 'new password and confirm password do not match'
 res.render("editPassword", { user , message });
} );

module.exports = router;                        
