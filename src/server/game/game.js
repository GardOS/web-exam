const Match = require("./match");
const { Quiz } = require("../model");

const waitingPlayers = [];
const matches = [];
let newMatch = null;

function isNewMatch() {
  return !!newMatch;
}

function findMatch(socket) {
  return matches.find(m => {
    const player = m.getPlayer(socket);
    if (player) {
      return player.socket === socket;
    }
    return false;
  });
}

// https://stackoverflow.com/a/39297234
function createMatch(socket) {
  if (newMatch === null) {
    Quiz.countDocuments().exec((countErr, count) => {
      if (countErr) {
        this.messagePlayers("errorEvent", {
          error: "Error when finding quiz"
        });
        return;
      }
      const random = Math.floor(Math.random() * count);

      Quiz.findOne()
        .skip(random)
        .exec((findErr, result) => {
          if (findErr || !result) {
            this.messagePlayers("errorEvent", {
              error: "Error when finding quiz"
            });
            return;
          }
          newMatch = new Match(socket, result.questions);
          socket.emit("gameCreated");
        });
    });
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
  answerQuestion,
  isNewMatch
};
