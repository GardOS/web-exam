const express = require("express");
const socketIo = require("socket.io");
const { createToken, consumeToken } = require("./ws-token");
const Game = require("./game");

const wsApi = express.Router();
const userSockets = new Map();

const createWsServer = httpServer => {
  const io = socketIo(httpServer);
  io.sockets.on("connection", socket => {
    console.log("A client is connected!");

    socket.on("disconnect", () => {
      console.log("A client disconnected!");
      Game.removePlayer(socket);
    });

    socket.on("login", token => {
      if (token === null || token === undefined) {
        socket.emit("errorEvent", { error: "No payload provided" });
        return;
      }

      const username = consumeToken(token);

      if (!username) {
        socket.emit("errorEvent", { error: "Invalid token" });
        return;
      }

      Game.addPlayer(username, socket);

      console.log(`${username} logged in.`);
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
