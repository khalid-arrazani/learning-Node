// // this is for upload route and controller

const { User } = require("../models/User");

const express = require("express");
const router = express.Router();

const cloudinary = require("../config/cloudinary.js");
const JWT = require("jsonwebtoken");
// const upload = require('../middlewares/multer')
const {
  updateProfile,
  getUpdatePhotoView,
} = require("../controller/updatProfile");
// middleware (خاصك يكون عندك)

const { verifyToken } = require("../middlewares/verifyToken");
// this is for get upload image view
router.get("/upload", verifyToken, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.render("uploudPhoto", { imageUrl: user.image });
});


const streamifier = require("streamifier");

const upload = require("multer");


// 🔥 UPDATE PROFILE IMAGE
router.post("/upload", upload.single("image"), async (req, res) => {

  // verify token
  const token = req.cookies.token;
  if (!token) {
    return res.redirect("/api/auth/login");
  } else {
    try {
      const decoded = JWT.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decoded;
    } catch (error) {
      console.log(error);
      return res.redirect("/api/auth/login");
    }
  }

/////////


  try {
    // find user
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.redirect("/api/auth/login");
    }

    // check file
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // 🔥 delete old image
    if (user.public_id) {
      await cloudinary.uploader.destroy(user.public_id);
    }

    // 🔥 upload from buffer (correct way)
    const result = await new Promise((resolve, reject) => {
      // create upload stream
      const CloudinaryUploadStream = cloudinary.uploader.upload_stream(
        { folder: "users" },

        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
  // convert buffer to stream and pipe to cloudinary
      const ReadStream = streamifier.createReadStream(req.file.buffer)
      ReadStream.pipe(CloudinaryUploadStream);
    });

    // save new data
    user.image = result.secure_url;
    user.public_id = result.public_id;

    await user.save();

    res.render("uploudPhoto", { imageUrl: user.image });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
