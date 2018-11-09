const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const socketIo = require("socket.io");
const { User } = require("./model");
const userApi = require("./user-api");
const quizApi = require("./quiz-api");

const app = express();
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

app.use("/api", userApi);
app.use("/api", quizApi);

app.use(express.static("public"));
app.use((req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "..", "public", "index.html"));
});

const port = 8080;
const httpServer = app.listen(port, () =>
  console.log(`Listening on port ${port}.`)
);

const io = socketIo(httpServer);
io.sockets.on("connection", socket => {
  console.log("A client is connected!");
  socket.emit("message", "message");
});
