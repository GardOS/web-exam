class Match {
  constructor(host) {
    this.host = host;
    this.players = null;
    this.turn = 0;
    this.time = 11;
    this.timer = null;
    this.questions = [
      {
        answers: ["Zero", "One", "Two", "Three"],
        questionText: "1+1?",
        correctAnswer: 2
      },
      {
        answers: ["Two", "Four", "Six", "Eight"],
        questionText: "4+4?",
        correctAnswer: 3
      }
    ];
  }

  getPlayer(socket) {
    return this.players.find(player => player.socket === socket);
  }

  setTimer() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.time = 11; // Add extra second as buffer
    this.timer = setInterval(() => {
      this.time -= 1;
      if (this.time <= 0) clearInterval(this.timer);
    }, 1000);
  }

  getTimeScore() {
    if (this.time > 6) {
      return 3;
    }
    if (this.time > 3) {
      return 2;
    }
    if (this.time > 0) {
      return 1;
    }
    return 0;
  }

  isTurnComplete() {
    return !this.players.some(player => !player.hasAnswered);
  }

  isMatchDone() {
    return this.turn === this.questions.length;
  }

  answerQuestion(socket, answer) {
    const player = this.getPlayer(socket);

    if (
      this.questions[this.turn - 1] &&
      answer === this.questions[this.turn - 1].correctAnswer
    ) {
      const timeScore = this.getTimeScore();

      player.score += 3 + timeScore;
    }
    player.hasAnswered = true;
  }

  start(players) {
    this.players = players;
    this.messagePlayers("gameStarted");
    this.nextQuestion();
  }

  nextQuestion() {
    const question = this.questions[this.turn];
    this.turn += 1;
    this.setTimer();
    this.messagePlayers("question", question);

    this.players.forEach(player => {
      player.hasAnswered = false;
    });
  }

  messagePlayers(message, payload = null) {
    this.players.map(player => player.socket.emit(message, payload));
  }

  getResults() {
    return this.players.map(player => ({
      username: player.username,
      score: player.score
    }));
  }
}

module.exports = Match;
