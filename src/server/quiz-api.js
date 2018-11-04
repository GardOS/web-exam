const express = require("express");
const { Quiz } = require("./model");

const router = express.Router();

router.get("/quizzes", (req, res) => {
  Quiz.find((err, quizzes) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(quizzes);
    }
    return null;
  });
});

router.get("/quizzes/:id", (req, res) => {
  const id = req.params.id;
  Quiz.findById(id, (err, quiz) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(quiz);
    }
    return null;
  });
});

router.post("/quizzes", (req, res) => {
  const body = req.body;
  const quiz = new Quiz(body);

  quiz.save((err, savedQuiz) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.send(savedQuiz);
  });
});

module.exports = router;
