const Match = require("./match");

const waitingPlayers = [];
const matches = [];
let newMatch = null;

function findMatch(socket) {
  return matches.find(m => m.getPlayer(socket).socket === socket);
}

function createMatch(socket) {
  if (newMatch === null) {
    newMatch = new Match(socket);
    socket.emit("gameCreated");
  }
}

function startMatch(socket) {
  if (waitingPlayers.length > 1 && newMatch && socket === newMatch.host) {
    newMatch.start(waitingPlayers.splice(0));
    matches.push(newMatch);
    newMatch = null;
  }
}

function answerQuestion(socket, answer) {
  const match = findMatch(socket);
  match.answerQuestion(socket, answer);
  if (match.isTurnComplete()) {
    if (match.isMatchDone()) {
      match.messagePlayers("done", match.getResults());
      matches.splice(matches.indexOf(match), 1);
    } else {
      match.nextQuestion();
    }
  }
}

function addPlayer(socket, username) {
  const player = { username, socket, score: 0, hasAnswered: false };
  waitingPlayers.push(player);

  const usernames = waitingPlayers.map(p => p.username);
  waitingPlayers.map(waitingPlayer =>
    waitingPlayer.socket.emit("playerJoined", usernames)
  );
}

function removePlayer(socket) {
  waitingPlayers.filter(player => player.socket === socket);
  // Remove player in match?
}

module.exports = {
  createMatch,
  startMatch,
  addPlayer,
  removePlayer,
  answerQuestion
};
