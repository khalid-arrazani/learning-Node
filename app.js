const express = require("express");

const joi = require("joi");

const app = express();

app.use(express.json());

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
    a: 5,
    a: 52154,
  },
];

app.get("/", (req, res) => {
  res.status(200).json(books);
});
app.get("/:id", (req, res) => {
  const book = books.find((i) => i.id === Number(req.params.id));
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).send({ Message: "book not found" });
  }
});
app.post("/", (req, res) => {

   const schema = joi.object({
   name:joi.string().trim().min(3).max(200).required(),
   actore:joi.string().trim().min(3).max(10).required(),
   price:joi.number().min(0).required(),
   cover:joi.string().trim().required(),
   });

   const {error} = schema.validate(req.body);

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

app.listen(5000, () => {
  console.log("Server running...");
});
