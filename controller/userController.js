const asyncHandler = require("express-async-handler");

const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();

const { User, validateUpdateUser } = require("../models/User");
//=============================/* USER CONTROLLER * /=============================/

//===============================================================================//
// we can update the user by id and we can update the email, password and username
const updateUser = asyncHandler(async (req, res) => {
  const { error } = validateUpdateUser(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }

  const updateUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
      },
    },
    { returnDocument: "after" },
  ).select("-password");

  res.status(200).json(updateUser);
});
//===============================================================================//

//===============================================================================//
// we can get all users but we can't get the password of the users
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");
  res.status(200).json(users);
});
//===============================================================================//



//===============================================================================//
// we can get user by id but we can't get the password of the user
const getUserById = asyncHandler(async (req, res) => {
  const users = await User.findById(req.params.id).select("-password");
  res.status(200).json(users);
});
//===============================================================================//



//===============================================================================//
// we can delete user by id but we can't get the password of the user
const deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    const users = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "user has been deleted seccessfully" });
  } else {
    res.status(404).json({ message: "user not found" });
  }
});
//===============================================================================//

module.exports = {
  updateUser,
  getAllUsers,
  getUserById,
  deleteUserById
};