const { uploadImage } =require ("../utils/uploadToCloudinary.js");

 const updateProfile = async (req, res) => {
  const imageUrl = await uploadImage(req.file.path);

  // save to DB
  req.user.image = imageUrl;
  await req.user.save();

  res.json({ message: "Updated successfully" });
};


getUpdatePhotoView =(req, res) => {
  res.render("uploudPhoto");
};
module.exports ={updateProfile,getUpdatePhotoView}