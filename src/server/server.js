const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const User = require("./model");

const app = express();
app.use("/", cors("localhost:8080"));
app.use(bodyParser.json());

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
  const user = new User(req.body);

  user.save((err, savedUser) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.send(savedUser);
  });
});

app.listen(3000, () => console.log("Listening on port 3000."));
