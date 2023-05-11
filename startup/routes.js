const express = require("express");
const cors = require("cors");
const error = require("../middleware/error");
const article = require("../routes/article");
const category = require("../routes/category");
const order = require("../routes/shoppingcart");
const login = require("../routes/login");
const accounting = require("../routes/accounting");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/article", cors(), article);
  app.use("/api/category", cors(), category);
  app.use("/api/shoppingcart", cors(), order);
  app.use("/api/login", cors(), login);
  app.use("/api/accounting", cors(), accounting);
  app.use(cors());
  app.use(error);
};
