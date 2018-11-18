const socketIo = require("socket.io");
const { consumeToken } = require("./ws-token");
const Game = require("../game/game");

const userSockets = new Map();

const createWsServer = httpServer => {
  const io = socketIo(httpServer);
  io.sockets.on("connection", socket => {
    socket.on("disconnect", () => {
      console.log("A client disconnected!");
      Game.removePlayer(socket);
      userSockets.delete(socket);
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

      userSockets.set(socket, username);

      socket.on("newPlayer", () => {
        if (!Game.isNewMatch()) {
          Game.createMatch(socket);
        }
        Game.addPlayer(socket, userSockets.get(socket));
      });

      socket.on("start", () => {
        Game.startMatch(socket);
      });

      socket.on("answer", answer => {
        Game.answerQuestion(socket, answer);
      });

      console.log(`${username} logged in.`);
    });
  });
  return io;
};

module.exports = { createWsServer };
