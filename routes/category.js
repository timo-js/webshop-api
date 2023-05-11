/*
  route handlers to modify mongoDB category database
    GET Route does not include middleware, every user can get a list of given categorys
    POST, PUT, DELETE incule middleware, user has to be authenticated as user and admin
*/

const mongoose = require("mongoose");
const express = require("express");
const { Category, validate } = require("../modules/category");
const router = express.Router();

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

//Get list of categories
router.get("/", async (req, res) => {
  const category = await Category.find().sort("name");
  res.send(category);
});

//add a new category to database
router.post("/", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const existing = await Category.find({ name: req.body.name });

  if (existing.length > 0)
    return res.status(404).send("Category already existing!");

  let category = new Category({
    name: req.body.name,
  });
  category = await category.save();

  res.send(category);
});

//change existing category (id required)
router.put("/:id", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    { new: true }
  );

  if (!category)
    return res
      .status(404)
      .send("The category with the given ID was not found!");

  res.send(category);
});

//delete existing category (id required)
router.delete("/:id", [auth, admin], async (req, res) => {
  const category = await Category.findByIdAndRemove(req.params.id);

  if (!category)
    return res
      .status(404)
      .send("The category with the given ID was not found!");

  res.send(category);
});

//get specific category (id required)
router.get("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category)
    return res.status(404).send("The article with the given ID was not found!");

  res.send(category);
});

module.exports = router;
