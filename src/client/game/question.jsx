import React, { Component } from "react";
import PropTypes from "prop-types";

class Question extends Component {
  constructor() {
    super();

    this.state = {
      time: 10
    };

    Question.propTypes = {
      question: PropTypes.object.isRequired,
      handleAnswer: PropTypes.func.isRequired
    };

    this.timer = null;
  }

  componentDidMount() {
    this.setTimer();
  }

  componentDidUpdate(prevProps) {
    if (this.props.question !== prevProps.question) {
      this.setTimer();
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  setTimer() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.setState({ time: 10 });
    this.timer = setInterval(() => {
      this.setState(prevState => ({ time: prevState.time - 1 }));
      if (this.state.time <= 0) clearInterval(this.timer);
    }, 1000);
  }

  getProgressColor() {
    if (this.state.time > 6) {
      return "bg-success";
    }
    if (this.state.time > 3) {
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
            style={{ width: `${this.state.time * 10}%` }}
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
