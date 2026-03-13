const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();

const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");

const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const { User, validateUpdateUser } = require("../models/User");

/**
 * @desc update User
 * @rout /api/users/:id
 * @method PUT
 * @access privete(only admin and the user himself)
 */

router.put(
  "/:id",
  verifyTokenAndAuthorization,
  asyncHandler(async (req, res) => {

    const { error } = validateUpdateUser(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    };

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    };

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
  }),
);


/**
 * @desc get all users
 * @rout /api/users/
 * @method GET
 * @access privete (only admin)
 */

router.get(
  "/",
  verifyTokenAndAdmin,
  asyncHandler(async (req, res) => {
  const users = await User.find().select('-password')
    res.status(200).json(users);
  }), 
);


/**
 * @desc get user by id
 * @rout /api/users/:id
 * @method GET
 * @access privete (only admin and the user himself)
 */

router.get(
  "/:id",
  verifyTokenAndAuthorization,
  asyncHandler(async (req, res) => {
  const users = await User.findById(req.params.id).select('-password')
    res.status(200).json(users);
  }),
);

/**
 * @desc delete user by id 
 * @rout /api/users/:id
 * @method delete
 * @access privete (only admin and the user himself)
 */

router.delete(
  "/:id",
  verifyTokenAndAuthorization,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')
    if(user){
  const users = await User.findByIdAndDelete(req.params.id)
    res.status(200).json({message:'user has been deleted seccessfully'});}else{
      res.status(404).json({message:'user not found'})
    }
  }),
);




module.exports = router;
