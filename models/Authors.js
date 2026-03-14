const mongoose = require("mongoose");
const joi = require("joi");
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
    image: joi.string().trim(),
  });
  return schema.validate(obj);
}

const Author = mongoose.model("Author", AuthorSchema);
module.exports = {
  Author,AddAuother,UpdateAuother
};
