class Match {
  constructor() {
    this.turn = 0;
    this.questions = [
      {
        answers: ["Zero", "One", "Two", "Three"],
        questionText: "1+1?",
        correctAnswer: 2
      },
      {
        answers: ["Zero", "One", "Two", "Three"],
        questionText: "1+2?",
        correctAnswer: 3
      }
    ];
  }

  nextQuestion() {
    const question = this.questions[this.turn];
    this.turn = this.turn + 1;
    return question;
  }
}

module.exports = Match;
