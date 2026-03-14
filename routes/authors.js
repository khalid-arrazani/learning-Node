const express = require("express");
const router = express.Router();

const { Author } = require("../models/Authors");
const asyncHandler = require("express-async-handler");

const {
AddAuother,UpdateAuother
} = require("../models/Authors");


const {
  verifyTokenAndAdmin
} = require("../middlewares/verifyToken");


/**
 * @desc Get all authors
 * @route /api/authors
 * @method GET
 * @access public
 */

// get all authors
router.get("/",asyncHandler( async (req, res) => {

    const authors = await Author.find();
    res.status(200).json(authors);

}));

/**
 * @desc Get author by id
 * @route /api/authors/:id
 * @method GET
 * @access public
 */

// get author by id
router.get("/:id",asyncHandler( async (req, res) => {
 
    const author = await Author.findById(req.params.id);
    res.status(200).json(author);
    if (!author) {
      returnres.status(404).send("auother not found ");
    }
    res.status(200).json(author);

}));

/**
 * @desc Add a new auother
 * @route /api/authors
 * @method post
 * @access private (only admin)
 */

// add new auother

router.post("/",  verifyTokenAndAdmin,asyncHandler( async (req, res) => {
  const { error } = AddAuother(req.body);
  console.log(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
 
    const auther = new Author({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      nationality: req.body.nationality,
      image: req.body.image,
    });

    const result = await auther.save();

    res.status(201).json(result);
 
}));

/**
 * @desc Update auother by id
 * @route /api/authors/:id
 * @method PUT
 * @access private (only admin)
 */

// update auother by id
router.put("/:id",  verifyTokenAndAdmin,asyncHandler (async (req, res) => {
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
  };
  res.json(updatedAuthor);

}));


/**
 * @desc delete auother
 * @route /api/authors/:id
 * @method deleted
 * @access private (only admin)
 */

// delete auother by id

router.delete("/:id",  verifyTokenAndAdmin,asyncHandler( async(req, res) => {

    const author = await Author.findByIdAndDelete(req.params.id);

    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    res.json({ message: "Author deleted seccessfuly" });


}));


module.exports = router;
