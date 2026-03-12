const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    nationality: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    phone: {
      type: String,
      required: true,
    },
    work: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    image: {
      type: String,
      default: "default-avatar.png",
    },
  },
  {
    timestamps: true,
  },
);

// validation function for add auother
function AddAuother(obj) {
  const schema = joi.object({
    firstName: joi.string().trim().min(3).max(10),
    lastName: joi.string().trim().min(3).max(20),
    nationality: joi.string().trim().min(3).max(20),
    phone: joi.string().required(),
    work: joi.string().trim().min(3).max(30),
    image: joi.string().trim(),
  });
  return schema.validate(obj);
}

// validation function for update auother
function UpdateAuother(obj) {
  const schema = joi.object({
    firstName: joi.string().trim().min(3).max(10),
    lastName: joi.string().trim().min(3).max(20),
    nationality: joi.string().trim().min(3).max(20),
    phone: joi.string(),
    work: joi.string().trim().min(3).max(30),
    image: joi.string().trim(),
  });
  return schema.validate(obj);
}

const Author = mongoose.model("Author", AuthorSchema);
module.exports = {
  Author,AddAuother,UpdateAuother
};
