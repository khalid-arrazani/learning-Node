// this is for upload image to cloudinary and get the url

const cloudinary =require("../config/cloudinary.js");
//this function is for upload image to cloudinary and get the url
const uploadImage = async (filePath) => {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: "users",
  });

  return result.secure_url;
};

module.exports = uploadImage;
