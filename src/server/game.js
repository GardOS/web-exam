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
  if (match.isMatchDone()) {
    matches.splice(matches.indexOf(match), 1);
  }
}

function addPlayer(socket, username) {
  const player = { username, socket, score: 0, hasAnswered: false };
  waitingPlayers.push(player);

  const usernames = waitingPlayers.map(p => p.username);
  waitingPlayers.map(waitingPlayer =>
    waitingPlayer.socket.emit("players", usernames)
  );
}

function removePlayer(socket) {
  const player = waitingPlayers.find(p => p.socket === socket);
  if (player) {
    waitingPlayers.splice(waitingPlayers.indexOf(player), 1);
    if (newMatch && socket === newMatch.host) {
      newMatch = null;
    }

    const usernames = waitingPlayers.map(p => p.username);
    waitingPlayers.map(waitingPlayer =>
      waitingPlayer.socket.emit("players", usernames)
    );
  }

  const ongoingMatch = matches.find(m => m.getPlayer(socket));
  if (ongoingMatch) {
    ongoingMatch.removePlayer(socket);
    if (ongoingMatch.players.length < 1) {
      matches.splice(matches.indexOf(ongoingMatch), 1);
    }
    // Notify players?
  }
}

module.exports = {
  createMatch,
  startMatch,
  addPlayer,
  removePlayer,
  answerQuestion
};
