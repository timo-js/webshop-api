const express = require("express");
const router = express.Router();

require("dotenv").config();
const jwt = require("jsonwebtoken");

const users = [
  {
    username: "admin",
    groupname: "Admin",
    mail: "admin@webshop",
    displayName: "Admin",
  },
  {
    username: "user",
    groupname: "Webshop-Users",
    mail: "user@webshop",
    displayName: "User",
  },
];

// DO NEVER USE THIS APPROACH IN PRODUCTION
// In production use: "./adLogin.js" as it utilizes Microsofts Active Directory
// to authenticate users.
// I did code this snippet just for the demo version of this app
router.post("/", async (req, res) => {
  let index;

  if (req.body.username === "admin" && req.body.password === "admin") {
    index = 0;
  } else if (req.body.username === "user" && req.body.password === "user") {
    index = 1;
  } else {
    res.status(400).send("Username or password wrong");
  }

  const authenticatedUser = users[index];

  const accessToken = jwt.sign(
    authenticatedUser,
    process.env.ACCESS_TOKEN_SECRET
  );

  res.json({ accessToken: accessToken });
});

module.exports = router;
