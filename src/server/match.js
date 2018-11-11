class Match {
  constructor(playerOne, playerTwo) {
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
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

    this.nextQuestion();
  }

  getPlayer(socket) {
    if (socket === this.playerOne.socket) {
      return this.playerOne;
    }
    if (socket === this.playerTwo.socket) {
      return this.playerTwo;
    }
    return null;
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
    return this.playerOne.hasAnswered && this.playerTwo.hasAnswered;
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

    if (this.isTurnComplete()) {
      this.nextQuestion();
    }
  }

  nextQuestion() {
    if (this.isMatchDone()) {
      this.playerOne.socket.emit("done", this.getResults());
      this.playerTwo.socket.emit("done", this.getResults());
      return;
    }

    const question = this.questions[this.turn];
    this.turn += 1;
    this.setTimer();
    this.playerOne.socket.emit("question", question);
    this.playerTwo.socket.emit("question", question);
    this.playerOne.hasAnswered = false;
    this.playerTwo.hasAnswered = false;
  }

  getResults() {
    return {
      playerOne: {
        username: this.playerOne.username,
        score: this.playerOne.score
      },
      playerTwo: {
        username: this.playerTwo.username,
        score: this.playerTwo.score
      }
    };
  }
}

module.exports = Match;
