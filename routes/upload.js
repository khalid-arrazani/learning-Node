// // this is for upload route and controller

const { User } = require("../models/User");
const express = require("express");
const router = express.Router();
const cloudinary = require("../config/cloudinary.js");
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

// this is for post upload image and save to cloudinary and get the url and save to DB
// router.post("/upload", upload.single("image"), async (req, res) => {
//   console.log(req.user);

//   const result = await cloudinary.uploader.upload(req.file.path);
//  console.log(result);
//   res.render("uploudPhoto", { imageUrl: result.secure_url });
// });

// module.exports = router;

// const express = require("express");
// const router = express.Router();

const multer = require("multer");
// const cloudinary = require("../config/cloudinary");
const fs = require("fs");

// multer config
const upload = multer({ dest: "uploads/" });

// 🔥 UPDATE PROFILE IMAGE
router.post(
  "/upload",
  upload.single("image"),
  async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
      res.status(401).json({ message: "no token provided" });
    } else {
      try {
        const decoded = JWT.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
      } catch (error) {
       return res.redirect("/login");
      }
    }

    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.redirect("/login");
      }
      // check file
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // 🔥 delete old image
      if (user.public_id) {
        await cloudinary.uploader.destroy(user.public_id);
      }

      // upload new image
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "users",
      });

      // delete local file
      fs.unlinkSync(req.file.path);

      // save new data
      user.image = result.secure_url;
      user.public_id = result.public_id;

      await user.save();

      res.render("uploudPhoto", { imageUrl: user.image });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  },
);

module.exports = router;
