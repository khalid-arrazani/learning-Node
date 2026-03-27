const cloudinary =require("../config/cloudinary.js");

const uploadImage = async (filePath) => {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: "users",
  });

  return result.secure_url;
};

module.exports = uploadImage;
