const Match = require("./match");

const players = [];

function addPlayer(userId, socket) {
  players.push({ userId, socket });
  socketConfig(socket);
}

function removePlayer(socket) {
  players.filter(player => player.socket === socket);
}

function socketConfig(socket) {
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
}

module.exports = { addPlayer, removePlayer };
