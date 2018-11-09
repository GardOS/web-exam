import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Register from "./register";
import Login from "./login";

class Home extends Component {
  constructor() {
    super();

    this.state = {};

    Home.propTypes = {
      userHandler: PropTypes.func.isRequired,
      isLoggedIn: PropTypes.func.isRequired
    };
  }

  render() {
    return this.props.isLoggedIn() ? (
      <Link to="/game">
        <button
          type="button"
          className="btn btn-block btn-primary align-middle"
        >
          {"Join game"}
        </button>
      </Link>
    ) : (
      <div className="row">
        <Register className="col" userHandler={this.props.userHandler} />
        <Login className="col" userHandler={this.props.userHandler} />
      </div>
    );
  }
}

export default Home;
