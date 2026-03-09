const express = require("express");
const asyncHandler = require("express-async-handler");
const { required } = require("joi");
const router = express.Router();
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

const {User,validateUpdateUser,validateLoginUser,validateRegisterUser} = require("../models/User")

/**
 * @desc Register User
 * @rout /api/auth/register
 * @method POST
 * @access public
 */
router.post("/register",asyncHandler(async(req,res)=>{

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
    password: req.body.password,
    isAdmin:req.body.isAdmin
 })
 const result = await user.save()
 const token = JWT.sign({id:user._id,username:user.username},process.env.JWT_SECRET_KEY);
 const {password, ...other} = result._doc;
 res.status(201).json(other) 
}))


/**
 * @desc login User
 * @rout /api/auth/register
 * @method POST
 * @access public
 */
router.post("/login",asyncHandler(async(req,res)=>{ 
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

 const token = JWT.sign({id:user._id,username:user.username},process.env.JWT_SECRET_KEY);
 const {password,...other} = user._doc;

 res.status(200).json({...other, token})

}))


/**
 * @desc Update User
 * @rout /api/auth/updateUser
 * @method PUT
 * @access public
 */

module.exports=router