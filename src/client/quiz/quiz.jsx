import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class Quiz extends Component {
  constructor() {
    super();

    this.state = {};

    Quiz.propTypes = {
      isLoggedIn: PropTypes.func.isRequired
    };
  }

  render() {
    return this.props.isLoggedIn() ? (
      <div>Quiz</div>
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
