const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const User = require("./model");

const app = express();
app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true
  })
);
app.use(bodyParser.json());

app.use(
  session({
    secret: "Secret Token",
    resave: false,
    saveUninitialized: false
  })
);

passport.use(
  new Strategy((username, password, cb) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        return cb(err);
      }
      if (!user) {
        return cb(null, false);
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return cb(null, false);
      }
      return cb(null, user);
    });
  })
);

passport.serializeUser((user, cb) => {
  cb(null, user.username);
});

passport.deserializeUser((username, cb) => {
  User.findOne({ username }, (err, user) => {
    if (err) {
      return cb(err);
    }
    if (!user) {
      return cb(null, false);
    }
    return cb(null, user);
  });
});

app.use(passport.initialize());
app.use(passport.session());

const isUserValid = body => {
  if (body && body.username && body.password) {
    return true;
  }
  return false;
};

app.get("/users", (req, res) => {
  User.find((err, users) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(users);
    }
    return null;
  });
});

app.get("/user", (req, res) => {
  if (!req.user) {
    res.status(401).send();
    return;
  }
  res.json({
    username: req.user.username
  });
});

app.post("/users", (req, res) => {
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

app.post("/login", passport.authenticate("local"), (req, res) => {
  res.json({
    username: req.user.username
  });
});

app.get("/logout", (req, res) => {
  req.logout();
  res.status(204).send();
});

const port = 3000;
app.listen(port, () => console.log(`Listening on port ${port}.`));
