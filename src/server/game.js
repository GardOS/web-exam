const Match = require("./match");

const players = [];
let match = null;

function socketConfig(socket) {
  socket.on("answer", answer => {
    match.answerQuestion(socket, answer);
  });
}

function addPlayer(userId, socket) {
  const player = { userId, socket, score: 0, hasAnswered: false };
  players.push(player);
  socketConfig(socket);
  if (players.length > 1) {
    match = new Match(players.shift, players.shift);
  }
}

function removePlayer(socket) {
  players.filter(player => player.socket === socket);
}

module.exports = { addPlayer, removePlayer };
