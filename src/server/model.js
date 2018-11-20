const mongoose = require("mongoose");

const Schema = mongoose.Schema;

mongoose.set("useCreateIndex", true);

const mongoUrl = process.env.HEROKU
  ? `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@ds029381.mlab.com:29381/web-exam` // prettier-ignore
  : "mongodb://localhost:27017";

function connectWithRetry() {
  return mongoose.connect(
    mongoUrl,
    { useNewUrlParser: true },
    err => {
      if (err) {
        console.error(
          "Failed to connect to MongoDB on startup - retrying in 5 sec"
        );
        setTimeout(connectWithRetry, 5000);
      } else {
        console.log("Connected to MongoDB");
      }
    }
  );
}

connectWithRetry();

function answerValidator(val) {
  return val.length === 4;
}

function questionValidator(val) {
  return val.length > 0;
}

const QuestionSchema = new Schema({
  questionText: { type: String, required: true },
  correctAnswer: { type: Number, required: true, min: 0, max: 3 },
  answers: {
    type: [String],
    required: true,
    validate: [answerValidator, "Required amount of answers is: 4"]
  }
});

const Quiz = mongoose.model("Quiz", {
  questions: {
    type: [QuestionSchema],
    required: true,
    validate: [questionValidator, "Required amount of questions is minimum: 1"]
  }
});

const User = mongoose.model("User", {
  username: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true }
});

// Init data
// new User({ username: "User", password: "pwd" }).save();
new Quiz({
  questions: [
    {
      questionText: "What is 1+1?",
      answers: ["2", "4", "8", "16"],
      correctAnswer: 0
    },
    {
      questionText: "What is 2+2?",
      answers: ["2", "4", "8", "16"],
      correctAnswer: 1
    },
    {
      questionText: "What is 4+4?",
      answers: ["2", "4", "8", "16"],
      correctAnswer: 2
    },
    {
      questionText: "What is 8+8?",
      answers: ["2", "4", "8", "16"],
      correctAnswer: 3
    }
  ]
}).save();

module.exports = { Quiz, User };
