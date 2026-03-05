const express = require("express");
const joi = require("joi");

const router = express.Router();

// fake database

const books = [
  {
    id: 1,
    name: "inter",
    actor: "swaris",
  },
  {
    id: 2,
    name: "for hh nothing",
    actor: "willsmith",
  },
  {
    id: 33,
    name: "were is good",
    actor: "ronald",
    a: 52154,
  },
];


/** 
 * @desc Get all books
 * @rout /api/books
 * @method GET
 * @access public
*/

// get all books
router.get("/", (req, res) => {
  res.status(200).json(books)
});

/** 
 * @desc Get book by id
 * @rout /api/books/:id
 * @method GET
 * @access public
*/


// get book by id
router.get("/:id", (req, res) => {
  const book = books.find((i) => i.id === Number(req.params.id));
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).send({ Message: "book not found" });
  }
});


/** 
 * @desc Add a new book 
 * @rout /api/books
 * @method POST
 * @access public
*/


// add new book
router.post("/", (req, res) => {

      const {error} = validatePostbooks (req.body)
       if (error){
    return res.status(400).json({message:error.details[0].message})
   }
    const book = {
      id: books.length + 1,
      name: req.body.name,
      actor: req.body.actor,
      price: req.body.price,
      cover:req.body.cover,
    };
    books.push(book);
    res.status(201).send({ message: "bock added secsfuly", book });
  
});


/** 
 * @desc Update book by id
 * @rout /api/books
 * @method PUT
 * @access public
*/

router.put("/:id", (req, res) => {

      const {error} = validateUpdateBooks (req.body)
       if (error){
    return res.status(400).json({message:error.details[0].message})
   }
    const book = books.find(b=>b.id === Number(req.params.id))
    if(book){
        res.status(200).send({ message: "bock has been updated" });
    }else{
         res.status(404).send({ message: "bock not found" });
    }
});


/** 
 * @desc Delete book by id
 * @rout /api/books
 * @method DELETE
 * @access public
*/

router.delete("/:id", (req, res) => {


    const book = books.find(b=>b.id === Number(req.params.id))
    if(book){
        res.status(200).send({ message: "bock has been deleted" });
    }else{
         res.status(404).send({ message: "bock not found" });
    }
});

// validation function
function validatePostbooks (obj){
   const schema = joi.object({
   name:joi.string().trim().min(3).max(200).required(),
   actor:joi.string().trim().min(3).max(10).required(),
   price:joi.number().min(0).required(),
   cover:joi.string().trim().required(),
   });
  return schema.validate(obj);
}


function validateUpdateBooks (obj){
   const schema = joi.object({
   name:joi.string().trim().min(3).max(200),
   actor:joi.string().trim().min(3).max(10),
   price:joi.number().min(0),
   cover:joi.string().trim(),
   });
  return schema.validate(obj);
}
// export router
module.exports= router


