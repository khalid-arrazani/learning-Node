// this is for multer configuration and connection

const multer =require ("multer");

const upload = multer({ dest: "uploads/" });

module.exports = upload;