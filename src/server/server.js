const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const User = require("./model");

const app = express();
app.use(bodyParser.json());
app.use("/", cors("localhost:8080"));

const isUserValid = body => {
  if (body && body.username && body.password) {
    return true;
  }
  return false;
};

app.get("/", (req, res) => {
  res.send("Hello!");
});

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
  const body = req.body;

  if (!isUserValid(body)) {
    res.status(400).send(`body ${body.username}`);
    return;
  }

  User.findOne({ username: body.username }, (findErr, existingUser) => {
    if (findErr) {
      res.status(500).send(findErr);
    }
    if (existingUser) {
      res.status(409).send();
    } else {
      new User(body).save((saveErr, savedUser) => {
        if (saveErr) {
          res.status(500).send(saveErr);
          return;
        }
        res.send(savedUser);
      });
    }
  });
});

app.listen(3000, () => console.log("Listening on port 3000."));
