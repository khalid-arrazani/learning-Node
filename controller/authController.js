const asyncHandler = require("express-async-handler");
const bcrypt = require('bcryptjs');
const dotenv = require("dotenv");
dotenv.config();
const {User,validateLoginUser,validateRegisterUser} = require("../models/User")


//=============================/* AUTH CONTROLLER * /=============================/

//Register User
const RegisterUser = asyncHandler(async(req,res)=>{

 const {error} = validateRegisterUser(req.body);

 if (error){
    return res.status(400).json({message:error.details[0].message});
 };

 let user = await User.findOne({email:req.body.email});

 if(user){
    return res.status(400).json({message:'This email already registered'})
 };

 const salt = await bcrypt.genSalt(10);
 req.body.password = await bcrypt.hash(req.body.password, salt)

 user = new User({
    email:req.body.email,
    username:req.body.username,
    password: req.body.password
 })
 const result = await user.save()
 const token = null;
 const {password, ...other} = result._doc;
 res.status(201).json(other) 
})


//login User
const loginUser = asyncHandler(async(req,res)=>{ 
 const {error} = validateLoginUser(req.body);

 if (error){
    return res.status(400).json({message:error.details[0].message});
 };

 let user = await User.findOne({email:req.body.email});

 if(!user){
    return res.status(400).json({message:'invalid email or password'})
 };
 const isPasswordMatch = await bcrypt.compare(req.body.password,user.password);
 
 if(!isPasswordMatch){
    return res.status(400).json({message:'invalid email or password'})
 };

 const token = user.generateToken();

 const {password,...other} = user._doc;
 
 res.status(200).json({...other, token})

})

/**
 * @desc Get login View
 * @route /password/fprgot-password
 * @method GET
 * @access public
 */

getLoginView = asyncHandler((req, res) => {
  res.render("login");
});


module.exports = {
    RegisterUser,
    loginUser,getLoginView
}
