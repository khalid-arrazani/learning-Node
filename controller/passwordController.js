const asyncHandler = require("express-async-handler");
const {User} = require("../models/User")
  const JWT = require("jsonwebtoken");
  const dotenv = require("dotenv");
  dotenv.config();

/**
 * @desc Get Forgot Password View
 * @route /password/fprgot-password
 * @method GET
 * @access public
 */

module.exports.getForgotPasswordView = asyncHandler((req,res)=>{
    res.render('forgot-password')
})


/**
 * @desc send Forgot Password link
 * @route /password/fprgot-password
 * @method post
 * @access public
 */

module.exports.sendForgotPasswordLink = asyncHandler(async(req,res)=>{
    const user=await User.findOne({ email:req.body.email});
    if (!user){
       return res.status(404).json({message:"User not found"})
    }
    const secret= process.env.JWT_SECRET_KEY + user.password
    const token = JWT.sign({email:user.email , id:user.id},secret,{expiresIn: '10m'})
    
    const link =`http://localhost:5000/password/reset-password/${user.id}/${token}`
     res.json({message:'Click on the link' , resetPasswordLink:link})
})


/**
 * @desc reset Password link
 * @route /password/fprgot-password
 * @method post
 * @access public
 */

module.exports.resetPassword = asyncHandler(async(req,res)=>{
  const token = req.params.token
  const decoded = await JWT.decode(token)
  const id = decoded.id
  const user = await User.findById(id)
  const pass = user.password
 
  if(!user){

  }

  try{
     const secret = process.env.JWT_SECRET_KEY + pass
    const decoded = await JWT.verify(token,secret)
  }catch (err){
   console.log(err.message)
  }

    console.log(200)
     res.render('forgot-password')

})