import React, { Component } from "react";
import PropTypes from "prop-types";

class Question extends Component {
  constructor() {
    super();

    this.state = {
      timer: 10
    };

    Question.propTypes = {
      question: PropTypes.object.isRequired,
      handleAnswer: PropTypes.func.isRequired
    };
  }

  componentDidMount() {
    this.setTimer();
  }

  setTimer() {
    this.setState({ timer: 10 });
    const downloadTimer = setInterval(() => {
      this.setState(prevState => ({ timer: prevState.timer - 1 }));
      if (this.state.timer <= 0) clearInterval(downloadTimer);
    }, 1000);
  }

  getProgressColor() {
    if (this.state.timer > 6) {
      return "bg-success";
    }
    if (this.state.timer > 3) {
      return "bg-warning";
    }
    return "bg-danger";
  }

  render() {
    return (
      <div>
        <div className="progress bg-secondary">
          <div
            className={`progress-bar ${this.getProgressColor()}`}
            role="progressbar"
            style={{ width: `${this.state.timer * 10}%` }}
            aria-valuenow="10"
            aria-valuemin="0"
            aria-valuemax="10"
          />
        </div>
        <h2>{this.props.question.questionText}</h2>
        {this.props.question.answers.map((answer, i) => (
          <button
            key={answer}
            type="button"
            className="btn btn-block btn-primary align-middle"
            onClick={() => {
              this.props.handleAnswer(i);
              this.setTimer();
            }}
          >
            {answer}
          </button>
        ))}
      </div>
    );
  }
}

export default Question;
