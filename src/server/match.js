class Match {
  constructor() {
    this.score = 0;
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
      return 2;
    }
    if (this.time > 3) {
      return 1;
    }
    return 0;
  }

  answerQuestion(answer) {
    if (
      this.questions[this.turn - 1] &&
      answer === this.questions[this.turn - 1].correctAnswer
    ) {
      const timeScore = this.getTimeScore();
      this.score += 3 + timeScore;
    }
  }

  nextQuestion() {
    const question = this.questions[this.turn];
    this.turn += 1;
    this.setTimer();
    return question;
  }

  getScore() {
    return this.score;
  }
}

module.exports = Match;
