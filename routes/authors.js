const express = require("express");
const router = express.Router();
const joi = require("joi");

//Fake data insted of database
const authors = [
  {
    id: 1,
    name: "John",
    lastName: "Smith",
    nationality: "American",
    phone: "+1 202-555-0145",
    work: "Software Engineer",
  },
  {
    id: 2,
    name: "Maria",
    lastName: "Garcia",
    nationality: "Spanish",
    phone: "+34 612-456-789",
    work: "Graphic Designer",
  },
  {
    id: 3,
    name: "Youssef",
    lastName: "Benali",
    nationality: "Moroccan",
    phone: "+212 612-345-678",
    work: "Frontend Developer",
  },
  {
    id: 4,
    name: "Anna",
    lastName: "Muller",
    nationality: "German",
    phone: "+49 151-234-5678",
    work: "Product Manager",
  },
  {
    id: 5,
    name: "Lucas",
    lastName: "Silva",
    nationality: "Brazilian",
    phone: "+55 11-98765-4321",
    work: "Data Analyst",
  },
  {
    id: 6,
    name: "Fatima",
    lastName: "Zahra",
    nationality: "Moroccan",
    phone: "+212 621-987-654",
    work: "UX Designer",
  },
  {
    id: 7,
    name: "David",
    lastName: "Johnson",
    nationality: "British",
    phone: "+44 7700-900123",
    work: "Backend Developer",
  },
  {
    id: 8,
    name: "Chen",
    lastName: "Wei",
    nationality: "Chinese",
    phone: "+86 138-0000-1234",
    work: "Mobile Developer",
  },
  {
    id: 9,
    name: "Omar",
    lastName: "Hassan",
    nationality: "Egyptian",
    phone: "+20 100-234-5678",
    work: "Network Engineer",
  },
  {
    id: 10,
    name: "Sofia",
    lastName: "Rossi",
    nationality: "Italian",
    phone: "+39 333-456-7890",
    work: "Marketing Specialist",
  },
];

/**
 * @desc Get all authors
 * @route /api/authors
 * @method GET
 * @access public
 */

// get all authors
router.get("/", (req, res) => {
  res.status(200).json(authors);
});

/**
 * @desc Get author by id
 * @route /api/authors/:id
 * @method GET
 * @access public
 */

// get author by id
router.get("/:id", (req, res) => {
  const auother = authors.find((a) => a.id === Number(req.params.id));
  if (auother) {
    res.status(200).json(auother);
  } else {
    res.status(404).send("auother not found ");
  }
});

/**
 * @desc Add a new auother
 * @route /api/authors
 * @method post
 * @access public
 */

// add new auother
router.post("/", (req, res) => {
  const { error } = AddAuother(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const auother = {
    id: authors.length + 1,
    name: req.body.name,
    lastName: req.body.lastName,
    nationality: req.body.nationality,
    phone: req.body.phone,
    work: req.body.work,
  };

  authors.push(auother);
  res.status(201).send({ message: "auother added successfully" });
});

/**
 * @desc Update auother by id
 * @route /api/authors/:id
 * @method PUT
 * @access public
 */

// update auother by id
router.put("/:id", (req, res) => {
  const { error } = UpdateAuother(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const auother = authors.find((a) => a.id === Number(req.params.id));

  if (auother) {
    res.status(200).send({ message: "auother updated successfully" });
  } else {
    res.status(404).send({ message: "auother not found" });
  }
});

// delete auother by id
router.delete("/:id", (req, res) => {
  const auother = authors.find((a) => a.id === Number(req.params.id));

  if (auother) {
    res.status(200).send({ message: "auother deleted successfully" });
  } else {
    res.status(404).send({ message: "auother not found" });
  }
});

// validation functions

// validation function for add auother
function AddAuother(obj) {
  const schema = joi.object({
    name: joi.string().trim().min(3).max(10),
    lastName: joi.string().trim().min(3).max(20),
    nationality: joi.string().trim().min(3).max(20),
    phone: joi.string().required(),
    work: joi.string().trim().min(3).max(30),
  });
  return schema.validate(obj);
}
// validation function for update auother
function UpdateAuother(obj) {
  const schema = joi.object({
    name: joi.string().trim().min(3).max(10),
    lastName: joi.string().trim().min(3).max(20),
    nationality: joi.string().trim().min(3).max(20),
    phone: joi.string(),
    work: joi.string().trim().min(3).max(30),
  });
  return schema.validate(obj);
}

module.exports = router;
