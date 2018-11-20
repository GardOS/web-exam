const express = require("express");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const { User } = require("../model");
const { createToken } = require("../ws/ws-token");

const router = express.Router();

const isUserValid = body => {
  if (body && body.username && body.password) {
    return true;
  }
  return false;
};

router.get("/user", (req, res) => {
  if (!req.user) {
    res.status(401).send();
    return;
  }
  res.json({
    username: req.user.username
  });
});

router.post("/users", (req, res) => {
  const reqUser = req.body;

  if (!isUserValid(reqUser)) {
    res.status(400).send("Invalid request");
    return;
  }

  User.findOne({ username: reqUser.username }, (findErr, dbUser) => {
    if (findErr) {
      res.status(500).send(findErr);
      return;
    }
    if (dbUser) {
      res.status(409).send("Username taken");
    } else {
      const encryptedUser = {
        username: reqUser.username,
        password: bcrypt.hashSync(reqUser.password, 10)
      };

      new User(encryptedUser).save((saveErr, newUser) => {
        if (saveErr) {
          res.status(500).send(saveErr);
        } else {
          req.login(newUser, loginErr => {
            if (loginErr) {
              res.status(500).send("Something went wrong when logging in");
            } else {
              res.status(201).json({
                username: newUser.username
              });
            }
          });
        }
      });
    }
  });
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.json({
    username: req.user.username
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.status(204).send();
});

router.post("/wstoken", (req, res) => {
  if (!req.user) {
    res.status(401).send();
    return;
  }

  const token = createToken(req.user.username);

  res.status(201).json({ wstoken: token });
});

module.exports = router;
