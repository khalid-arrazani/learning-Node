const mongoose = require("mongoose");
const joi = require("joi");

const booksShema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Books",
    },
    actor: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
      default: "Not applicable",
    },
    price: {
      type: Number,
      minlength: 1,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 500,
    },
    publishYear: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      default: "default-book.png",
    },
  },
  {
    timestamps: true,
  },
);

function validatePostbooks(obj) {
  const schema = joi.object({
    name: joi.string().trim().min(3).max(200).required(),
    actor: joi.string().trim().min(3).max(22),
    price: joi.number().min(0).required(),
    cover: joi.string().trim(),
    description: joi.string().trim().required(),
    image: joi.string().trim(),
    publishYear: joi.number().required(),
    author: joi.string().trim().min(3).max(200).required(),
  });
  return schema.validate(obj);
}

function validateUpdateBooks(obj) {
  const schema = joi.object({
    name: joi.string().trim().min(3).max(200).required(),
    actor: joi.string().trim().min(3).max(200).required(),
    price: joi.number().min(0).required(),
    cover: joi.string().trim(),
    description: joi.string().trim().required(),
    image: joi.string().trim(),
    publishYear: joi.number().required(),
    author: joi.string().trim().min(3).max(200).required(),
  });
  return schema.validate(obj);
}

const book = mongoose.model("book", booksShema);
module.exports = {
  book,
  validateUpdateBooks,
  validatePostbooks,
};
