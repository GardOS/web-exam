const path = require("path");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const session = require("express-session");
const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const socketIo = require("socket.io");
const { User } = require("./model");
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

const port = 3000;
const httpServer = app.listen(port, () =>
  console.log(`Listening on port ${port}.`)
);

// Sockets

const userSockets = new Map();
const tokens = new Map();

const createToken = userId => {
  const token = crypto.randomBytes(10).toString("hex");
  tokens.set(token, userId);
  return token;
};

const consumeToken = token => {
  const userId = tokens.get(token);
  tokens.delete(token);
  return userId;
};

app.post("/wstoken", (req, res) => {
  if (!req.user) {
    res.status(401).send();
    return;
  }

  const token = createToken(req.user.username);

  res.status(201).json({ wstoken: token });
});

const io = socketIo(httpServer);
io.sockets.on("connection", socket => {
  console.log("A client is connected!");

  socket.on("disconnect", () => {
    console.log("A client disconnected!");
  });

  socket.on("login", token => {
    if (token === null || token === undefined) {
      socket.emit("errorEvent", { error: "No payload provided" });
      return;
    }

    const userId = consumeToken(token);

    if (!userId) {
      socket.emit("errorEvent", { error: "Invalid token" });
      return;
    }

    userSockets.set(socket, userId);
    socket.emit("userSockets", userSockets);
    console.log(`Socket: ${socket.id} User: ${userId}`);

    userSockets.forEach((tempSocket, user, map) =>
      console.log(`Socket: ${tempSocket} User: ${user}`)
    );
  });
});
