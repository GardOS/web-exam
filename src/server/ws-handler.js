const express = require("express");
const socketIo = require("socket.io");
const { createToken, consumeToken } = require("./ws-token");
const Match = require("./match");

const wsApi = express.Router();
const userSockets = new Map();

const createWsServer = httpServer => {
  const io = socketIo(httpServer);
  io.sockets.on("connection", socket => {
    console.log("A client is connected!");

    socket.on("disconnect", () => {
      console.log("A client disconnected!");
      userSockets.delete(socket);
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
    });

    let match;
    socket.on("start", () => {
      match = new Match();
      socket.emit("question", match.nextQuestion());
    });

    socket.on("answer", answer => {
      match.answerQuestion(answer);
      const question = match.nextQuestion();
      if (question) {
        socket.emit("question", question);
      } else {
        socket.emit("done", match.getScore());
      }
    });
  });
  return io;
};

wsApi.post("/wstoken", (req, res) => {
  if (!req.user) {
    res.status(401).send();
    return;
  }

  const token = createToken(req.user.username);

  res.status(201).json({ wstoken: token });
});

wsApi.get("/userSockets", (req, res) => {
  const temp = [];
  userSockets.forEach((value, key) => {
    temp.push({ user: value, socket: key.id });
  });
  res.send(temp);
});

module.exports = { wsApi, createWsServer };
