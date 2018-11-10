const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const { User } = require("./model");
const { wsApi, createWsServer } = require("./ws-handler");
const userApi = require("./user-api");
const quizApi = require("./quiz-api");

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

app.use(userApi);
app.use(quizApi);
app.use(wsApi);

const port = 3000;
const httpServer = app.listen(port, () =>
  console.log(`Listening on port ${port}.`)
);
createWsServer(httpServer);
