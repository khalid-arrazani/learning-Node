const { User } = require("../models/User.js");
const cloudinary = require("../config/cloudinary.js");
const streamifier = require("streamifier");


//this is for get upload image view
const getUploadView =  async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return res.redirect("/api/auth/login");
  }
  res.render("uploudPhoto", { imageUrl: user.image });
}


// this is for update profile image
const updateProfile =  async (req, res ,next) => {

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
};

module.exports ={updateProfile, getUploadView};