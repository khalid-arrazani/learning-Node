const mongoose = require("mongoose");

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
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
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

const book = mongoose.model("book", booksShema);
module.exports = {
  book,
};
