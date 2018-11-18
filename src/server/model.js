const mongoose = require("mongoose");

const Schema = mongoose.Schema;

mongoose.set("useCreateIndex", true);

function connectWithRetry() {
  return mongoose.connect(
    "mongodb://localhost:27017",
    { useNewUrlParser: true },
    err => {
      if (err) {
        console.error(
          "Failed to connect to MongoDB on startup - retrying in 5 sec"
        );
        setTimeout(connectWithRetry, 5000);
      } else {
        console.log("Connected to MongoDB container");
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

module.exports = { Quiz, User };
