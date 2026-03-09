const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

const {User,validateUpdateUser} = require("../models/User")

/**
 * @desc update User
 * @rout /api/users/:id
 * @method PUT
 * @access privete
 */


router.put("/:id",asyncHandler(async(req,res)=>{

 const {error} = validateUpdateUser(req.body);


 if (error){
    return res.status(400).json({message:error.details[0].message});
 };
 if(req.body.params){
    const salt = await bcrypt.genSalt(10)
    req.body.password= await bcrypt.hash(req.body.password, salt)
 }
const updateUser = await User.findByIdAndUpdate(req.params.id,{
    $set: {
        email:req.body.email,
        password: req.body.password,
        username:req.body.username
    }
},{new:true}).select("-password")


res.status(200).json(updateUser)

}))




module.exports=router