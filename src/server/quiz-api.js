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

module.exports = router;
