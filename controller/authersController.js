const { Author, AddAuother, UpdateAuother } = require("../models/Authors");
const asyncHandler = require("express-async-handler");

//=============================/* AUTHORS CONTROLLER * /=============================/

//===================================================================================/
// get all authors

const GetAllAuthors = asyncHandler(async (req, res) => {
  const limit = 2;
  const page = req.query.pageNum || 1;
  const authors = await Author.find()
    .skip((page - 1) * 2)
    .limit(limit);
  res.status(200).json(authors);
});
//===================================================================================/

//===================================================================================/
// get author by id

const GetIdAuthors = asyncHandler(async (req, res) => {
  const author = await Author.findById(req.params.id);
  if (!author) {
    returnres.status(404).send("auother not found ");
  }
  res.status(200).json(author);
});
//===================================================================================/

//===================================================================================/
// add new auother

const AddAuthor = asyncHandler(async (req, res) => {
  const { error } = AddAuother(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const author = new Author({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    nationality: req.body.nationality,
    image: req.body.image,
  });

  const result = await author.save();

  res.status(201).json(result);
});

//===================================================================================/

//===================================================================================/

// update auother
const UpdateAuothers = asyncHandler(async (req, res) => {
  const { error } = UpdateAuother(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const updateData = {};

  if (req.body.firstName) updateData.firstName = req.body.firstName;
  if (req.body.lastName) updateData.lastName = req.body.lastName;
  if (req.body.nationality) updateData.nationality = req.body.nationality;
  if (req.body.image) updateData.image = req.body.image;

  const updatedAuthor = await Author.findByIdAndUpdate(
    req.params.id,
    { $set: updateData },
    { returnDocument: "after" },
  );

  if (!updatedAuthor) {
    return res.status(404).send({ message: "auother not found" });
  }
  res.json(updatedAuthor);
});
//===================================================================================/

//===================================================================================/

// delete auother by id
const DeleteAuthors = asyncHandler(async (req, res) => {
  const author = await Author.findByIdAndDelete(req.params.id);

  if (!author) {
    return res.status(404).json({ message: "Author not found" });
  }

  res.json({ message: "Author deleted seccessfuly" });
});
//===================================================================================/

module.exports = {
  GetAllAuthors,
  AddAuthor,
  GetIdAuthors,
  UpdateAuothers,
  DeleteAuthors,
};
