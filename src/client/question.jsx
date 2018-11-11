import React from "react";
import PropTypes from "prop-types";

const Question = props => (
  <div>
    <div>{props.question.questionText}</div>
    {props.question.answers.map((answer, i) => (
      <button
        key={answer}
        type="button"
        className="btn btn-block btn-primary align-middle"
        onClick={() => props.handleAnswer(i)}
      >
        {answer}
      </button>
    ))}
  </div>
);

Question.propTypes = {
  question: PropTypes.object.isRequired,
  handleAnswer: PropTypes.func.isRequired
};

export default Question;
