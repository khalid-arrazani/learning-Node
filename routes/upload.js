const express = require("express");
const router = express.Router();
const cloudinary =require("../config/cloudinary.js");
const upload = require('../middlewares/multer')
const {updateProfile,getUpdatePhotoView} = require("../controller/updatProfile")


router.get("/upload", (req, res) => {
  res.render("uploudPhoto",{ imageUrl: null });
});

router.post("/upload", upload.single("image"), async (req, res) => {

  const result = await cloudinary.uploader.upload(req.file.path);
 console.log(result);
  res.render("uploudPhoto", { imageUrl: result.secure_url });
});

module.exports = router;