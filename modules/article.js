const Joi = require("joi");
const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 250,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
    max: 10000,
  },
  description: {
    type: String,
    minlength: 1,
    maxlenghth: 500,
  },
  src: {
    type: String,
    minlength: 1,
    maxlenghth: 500,
  },
  mercateoNr: {
    type: String,
    minlength: 0,
    maxlength: 500,
  },
});

const Article = mongoose.model("Article", articleSchema);

function validateArticle(article) {
  const schema = Joi.object({
    name: Joi.string().min(1).max(250).required(),
    price: Joi.number().min(1).max(5000).required(),
    description: Joi.string().min(1).max(500),
    category: Joi.string().required(),
    src: Joi.string().min(1).max(500),
    mercateoNr: Joi.string().min(0).max(500),
  });

  return schema.validate(article);
}

exports.articleSchema = articleSchema;
exports.Article = Article;
exports.validate = validateArticle;
