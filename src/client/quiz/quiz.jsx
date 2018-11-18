import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class Quiz extends Component {
  constructor() {
    super();

    this.state = {
      questionText: null,
      answers: [],
      correctAnswer: null
    };

    Quiz.propTypes = {
      isLoggedIn: PropTypes.func.isRequired
    };
  }

  createQuiz() {
    fetch("http://localhost:3000/quizzes", {
      method: "post",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        questions: [
          {
            questionText: this.state.questionText,
            answers: this.state.answers,
            correctAnswer: this.state.correctAnswer
          }
        ]
      })
    })
      .then(res => {
        if (res.ok) {
          alert("Quiz created");
        }

        if (res.status === 400) {
          alert("Request is invalid");
        }
      })
      .catch(err => alert(`Something went wrong. Error: ${err}`));
  }

  updateAnswers(value, index) {
    const answers = [...this.state.answers];
    answers[index] = value;
    this.setState({ answers });
  }

  updateCorrectAnswer(checked, value) {
    if (checked) {
      this.setState({ correctAnswer: value });
    }
  }

  renderAnswers() {
    return [...Array(4)].map((v, i) => (
      <div className="form-row" key={`row-${i}`}>
        <label className="w-100 col" htmlFor={`answer-${i}`}>
          <input
            required
            id={`answer-${i}`}
            type="text"
            className="form-control"
            placeholder={`Answer ${i + 1}`}
            onChange={e => this.updateAnswers(e.target.value, i)}
          />
        </label>
        <label htmlFor="correctAnswer">
          <input
            required
            id="correctAnswerRadio"
            name="correctAnswerRadio"
            type="radio"
            onChange={e => this.updateCorrectAnswer(e.target.value, i)}
          />
        </label>
      </div>
    ));
  }

  render() {
    return this.props.isLoggedIn() ? (
      <form
        className="container needs-validation"
        onSubmit={e => {
          e.preventDefault();

          this.createQuiz();
        }}
      >
        <h1>Create quiz</h1>
        <div className="form-group">
          <label className="w-100" htmlFor="question-text">
            {"Question text"}
            <input
              required
              id="question-text"
              type="text"
              className="form-control"
              placeholder="Insert question here"
              onChange={e => this.setState({ questionText: e.target.value })}
            />
          </label>
          <div className="row">
            <div className="col">Answers</div>
            <div className="col text-right">Correct</div>
          </div>

          {this.renderAnswers()}
        </div>
        <div>
          <button type="submit" className="btn btn-primary btn-block">
            {"Create"}
          </button>
        </div>
      </form>
    ) : (
      <div>
        <h3>You have to log in before you can create a quiz.</h3>
        <h4>
          <Link to="/">
            <u>Login</u>
          </Link>
        </h4>
      </div>
    );
  }
}

export default Quiz;
