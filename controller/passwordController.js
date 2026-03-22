const asyncHandler = require("express-async-handler");
const { User } = require("../models/User");
const JWT = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const bcrypt = require("bcryptjs");

const { Resend } =require( 'resend');

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * @desc Get Forgot Password View
 * @route /password/fprgot-password
 * @method GET
 * @access public
 */

module.exports.getForgotPasswordView = asyncHandler((req, res) => {
  res.render("forgot-password");
});

/**
 * @desc send Forgot Password link
 * @route /password/fprgot-password
 * @method post
 * @access public
 */

module.exports.sendForgotPasswordLink = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const secret = process.env.JWT_SECRET_KEY + user.password;
  const token = JWT.sign({ email: user.email, id: user.id }, secret, {
    expiresIn: "10m",
  });
    const link = `http://localhost:5000/password/reset-password/${user.id}/${token}`;
    
  const mailHtml = `
  <p>To reset your password, click the link below:</p>
  <a href="${link}">Reset Password</a>
`;


  resend.emails.send({
    from: 'onboarding@resend.dev',
    to: user.email,
    subject: "Reset Your Password",
    html: mailHtml
  });
  
  res.json({ message: "Click on the link", resetPasswordLink: link });
});

/**
 * @desc reset Password link
 * @route /password/fprgot-password
 * @method post
 * @access public
 */

module.exports.resetPasswordLink = asyncHandler(async (req, res) => {
  const token = req.params.token;
  const decoded = await JWT.decode(token);
  const id = decoded.id;
  const user = await User.findById(id);
  const pass = user.password;

  if (!user) {
    res.status(404).json({ message: "User not found" });
  }

  try {
    const secret = process.env.JWT_SECRET_KEY + pass;
    const decoded = await JWT.verify(token, secret);
  } catch (err) {
    console.log(err.message);
  }
  res.render("reset-password");
});

/**
 * @desc reset Password link
 * @route /password/fprgot-password
 * @method post
 * @access public
 */

module.exports.resetPassword = asyncHandler(async (req, res) => {
  const token = req.params.token;
  const decoded = await JWT.decode(token);
  const id = decoded.id;
  const user = await User.findById(id);
  const pass = user.password;
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
  if (!user) {
    res.status(404).json({ message: "User not found" });
  }
  try {
    const secret = process.env.JWT_SECRET_KEY + pass;
    const decoded = await JWT.verify(token, secret);
  } catch (err) {
    console.log(err.message);
    res.json({message:"error"})
  }
  //change the password
   const resetPassword = await User.findByIdAndUpdate(
    id,    {
      $set: {
        password: req.body.password,
      }
    },{ returnDocument: "after" }
   )
  res.status(200).render("change-sezccefully");
});  
