const express = require("express");

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
  if (!req.body.name || req.body.name < 3) {
    return res
      .status(400)
      .json("name is required and must be more than 3 characters");
  } else if (!req.body.actor || req.body.actor < 3) {
    return res
      .status(400)
      .json("actor is required and must be more than 3 characters");
  } else {
    const book = {
      id: books.length + 1,
      name: req.body.name,
      actor: req.body.actor,
      price: req.body.price,
    };
    books.push(book);
    res.status(201).send({ message: "bock added secsfuly", book });
  }
});

app.listen(5000, () => {
  console.log("Server running....");
});
