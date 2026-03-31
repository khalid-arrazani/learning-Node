// // this is for upload profile photo route and controller
const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer.js");


const { verifyToken,verifyTokenForUpload } = require("../middlewares/verifyToken");
const { updateProfile ,getUploadView} = require("../controller/updatProfileController.js");

// this is for get upload image view
router.get("/upload", verifyTokenForUpload,getUploadView);

// 🔥 UPDATE PROFILE IMAGE
router.post("/upload", verifyTokenForUpload, upload.single("image"),updateProfile);

module.exports = router;
