/*
  AUTH MIDDLEWARE:
    Checks if the provided JSON Webtoken is authorized, passes to next function if so
*/

require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).send("Access denied. No token provided.");

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).send(`Token not verified.`);
    req.user = user;
    next();
  });
};
