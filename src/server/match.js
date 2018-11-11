class Match {
  constructor() {
    this.score = 0;
    this.turn = 0;
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

  answerQuestion(answer) {
    if (
      this.questions[this.turn - 1] &&
      answer === this.questions[this.turn - 1].correctAnswer
    ) {
      this.score += 1;
    }
  }

  nextQuestion() {
    const question = this.questions[this.turn];
    this.turn += 1;
    return question;
  }

  getScore() {
    return this.score;
  }
}

module.exports = Match;
