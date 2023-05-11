/*
  route handlers to modify mongoDB article database
    GET Route does not include middleware, every user can get a list of given articles
    POST, PUT, DELETE incule middleware, user has to be authenticated as user and admin
*/

const mongoose = require("mongoose");
const express = require("express");
const { Article, validate } = require("../modules/article");
const router = express.Router();

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

// get list of all artiles, sorted by its name
router.get("/", async (req, res) => {
  const article = await Article.find().sort("name");
  res.send(article);
});

// add a new article
router.post("/", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let article = new Article({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
    src: req.body.src,
    mercateoNr: req.body.mercateoNr,
  });
  article = await article.save();

  res.send(article);
});

//change existing article (id required)
router.put("/:id", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const article = await Article.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
      src: req.body.src,
      mercateoNr: req.body.mercateoNr,
    },
    { new: true }
  );

  if (!article)
    return res.status(404).send("The article with the given ID was not found!");

  res.send(article);
});

//delete existing article (id required)
router.delete("/:id", [auth, admin], async (req, res) => {
  const article = await Article.findByIdAndRemove(req.params.id);

  if (!article)
    return res.status(404).send("The article with the given ID was not found!");

  res.send(article);
});

// get specific article (id required)
router.get("/:id", async (req, res) => {
  const article = await Article.findById(req.params.id);

  if (!article)
    return res.status(404).send("The article with the given ID was not found!");

  res.send(article);
});

module.exports = router;
