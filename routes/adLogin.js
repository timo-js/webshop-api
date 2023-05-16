/*
  Authentication and Authorization utilizing Microsoft Active Directory (NO AZURE)
*/

const express = require("express");
const router = express.Router();

const ActiveDirectory = require("activedirectory2");
const config = require("config");

require("dotenv").config();
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const configAD = {
    url: "AD_IP_ADRESS",
    baseDN: "DOMAIN_NAME",
    username: "admin",
    password: process.argv.slice(2)[0],
  };

  const ad = new ActiveDirectory(configAD);
  const usernameWithDomain = "DOMAIN\\" + req.body.username;
  const username = req.body.username;
  const password = req.body.password;
  const groupsToCheck = config.get("groups");
  let mail = "";
  let displayName = "";

  ad.authenticate(usernameWithDomain, password, async function (err, auth) {
    if (err) {
      return res.status(400).send("Username or password not correct.");
    }

    if (auth) {
      ad.findUser(username, function (err, user) {
        if (err) {
          console.log("Something went wrong at ad.findUser function");
          return;
        } else {
          mail = user.mail;
          displayName = user.displayName;
        }
      });

      const isUserMember = function (username, group) {
        return new Promise((resolve, reject) => {
          ad.isUserMemberOf(username, group, function (err, isMember) {
            if (err) {
              reject("Error");
            }
            resolve(isMember);
          });
        });
      };

      const getMemberGroup = async function (username, groups) {
        for (const group of groups) {
          try {
            if (await isUserMember(username, group)) {
              return group;
            }
          } catch (err) {
            return null;
          }
        }
        return null;
      };

      const groupOfUser = await getMemberGroup(username, groupsToCheck);

      if (groupOfUser == null) {
        res.status(403)
          .send(`Username and password correct, but the user: "${username}" is not authenticated to use this service.
        Please contact the administrator.`);
      } else {
        const authenticatedUser = {
          username: username,
          groupname: groupOfUser,
          mail: mail,
          displayName: displayName,
        };

        const accessToken = jwt.sign(
          authenticatedUser,
          process.env.ACCESS_TOKEN_SECRET
        );

        switch (groupOfUser) {
          case "Webshop-Users":
            res.json({ accessToken: accessToken });
            return;
          case "Admin":
            res.json({ accessToken: accessToken });
            return;
        }

        res.status(400).send("Group not found");
      }
    }
  });
});

module.exports = router;
