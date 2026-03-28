
// this is for update profile controller and get update photo view
const { uploadImage } =require ("../utils/uploadToCloudinary.js");
//route for update profile photo and save to cloudinary and get the url and save to DB
const updateProfile = async (req, res) => {
  const imageUrl = await uploadImage(req.file.path);

  // save to DB
  console.log("884499",req.user);
  req.user.image = imageUrl;
  await req.user.save();

  res.json({ message: "Updated successfully" });
};

getUpdatePhotoView =(req, res) => { 
  res.render("uploudPhoto");
};
module.exports ={updateProfile,getUpdatePhotoView}