const mongoose = require("mongoose");
const joi = require("joi");
const JWT = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

//User Schema
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 100,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
},{timestamps:true});

UserSchema.methods.generateToken = function( ){
  return JWT.sign({id: this._id, isAdmin: this.isAdmin},process.env.JWT_SECRET_KEY)
}


//User Model 
const User = mongoose.model("User",UserSchema)

//Validate register User

function validateRegisterUser(obj) {
  const schema = joi.object({
    email: joi.string().trim().min(5).max(100).required().email(),
    username: joi.string().trim().min(2).max(200).required(),
    password: joi.string().min(6).required().trim()
  });
  return schema.validate(obj);
}

//Validate Login User

function validateLoginUser(obj) {
  const schema = joi.object({
    email: joi.string().trim().min(5).max(100).required().email(),
    password: joi.string().min(6).required().trim(),
  });
  return schema.validate(obj);
}


//Validate Update User

function validateUpdateUser(obj) {
  const schema = joi.object({
    email: joi.string().trim().min(5).max(100).email(),
    username: joi.string().trim().min(2).max(200),
    password: joi.string().min(6).trim()
  });
  return schema.validate(obj);
}
module.exports={User,validateUpdateUser,validateLoginUser,validateRegisterUser}