const express = require("express");
const router = express.Router();
const joi = require("joi");
const { Author } = require("../models/Authors");


/**
 * @desc Get all authors
 * @route /api/authors
 * @method GET
 * @access public
 */

// get all authors
router.get("/", async (req, res) => {
  try {
    const authors = await Author.find();
    res.status(200).json(authors);
  } catch {
    res.status(500).json({ message: "Something went wrong" });
  }
});

/**
 * @desc Get author by id
 * @route /api/authors/:id
 * @method GET
 * @access public
 */

// get author by id
router.get("/:id", async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    res.status(200).json(author);
    if (!author) {
      returnres.status(404).send("auother not found ");
    }
    res.status(200).json(author);
  } catch {
    res.status(500).json({ message: "Something went wrong" });
  }
});

/**
 * @desc Add a new auother
 * @route /api/authors
 * @method post
 * @access public
 */

// add new auother

router.post("/", async (req, res) => {
  const { error } = AddAuother(req.body);
  console.log(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    const auther = new Author({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      nationality: req.body.nationality,
      phone: req.body.phone,
      work: req.body.work,
      image: req.body.image,
    });

    const result = await auther.save();

    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
});

/**
 * @desc Update auother by id
 * @route /api/authors/:id
 * @method PUT
 * @access public
 */

// update auother by id
router.put("/:id",async (req, res) => {
  const { error } = UpdateAuother(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

 try{
 const auther =await Author.findByIdAndUpdate(req.params.id,{
        firstName: req.body.firstName,
      lastName: req.body.lastName,
      nationality: req.body.nationality,
      phone: req.body.phone,
      work: req.body.work,
      image: req.body.image,
 },{new: true});

  if (!auther) {
   return res.status(404).send({ message: "auother not found" });
  };
  res.json(auther);

 }catch(error){
  console.log(error)
  res.status(500).json({ message: "Server error" });
 }


});



// delete auother by id

router.delete("/:id", async(req, res) => {

 try {
    const author = await Author.findByIdAndDelete(req.params.id);

    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    res.json({ message: "Author deleted" });

  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});



// validation functions

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

module.exports = router;
