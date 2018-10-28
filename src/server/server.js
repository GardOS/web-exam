const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwtSimple = require("jwt-simple");
const bcrypt = require("bcryptjs");
const User = require("./model");

const app = express();
app.use(bodyParser.json());
app.use("/", cors("localhost:8080"));

const secret = "Secret Token";

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

app.post("/users", (req, res) => {
  const reqUser = req.body;

  if (!isUserValid(reqUser)) {
    res.status(400).send("Invalid request");
    return;
  }

  User.findOne({ username: reqUser.username }, (findErr, dbUser) => {
    if (findErr) {
      res.status(500).send(findErr);
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
          return;
        }

        const payload = {
          username: reqUser.username
        };

        const token = jwtSimple.encode(payload, secret);
        res.status(201).send(token);
      });
    }
  });
});

app.post("/login", (req, res) => {
  const reqUser = req.body;

  if (!isUserValid(reqUser)) {
    res.status(400).send("Invalid request");
    return;
  }

  User.findOne({ username: reqUser.username }, (err, dbUser) => {
    if (err) {
      res.status(500).send(err);
    }
    if (!dbUser) {
      res.status(401).send("User not found");
    } else {
      const passwordMatches = bcrypt.compareSync(
        reqUser.password,
        dbUser.password
      );

      if (!passwordMatches) {
        res.status(401).send("Wrong password");
        return;
      }

      const payload = {
        username: reqUser.username
      };

      const token = jwtSimple.encode(payload, secret);
      res.status(201).send(token);
    }
  });
});

app.get("/whoami", (req, res) => {
  const token = req.header("Authorization");
  if (!token) {
    res.status(401).send("No token");
    return;
  }

  let payload;
  try {
    payload = jwtSimple.decode(token, secret);
  } catch (error) {
    res.status(401).send("Invalid token");
    return;
  }

  User.findOne({ username: payload.username }, (err, user) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.send(user);
  });
});

app.listen(3000, () => console.log("Listening on port 3000."));
