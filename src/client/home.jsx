import React, { Component } from "react";
import PropTypes from "prop-types";
import Game from "./game";
import Register from "./register";
import Login from "./login";

class Home extends Component {
  constructor() {
    super();

    this.state = {};

    Home.propTypes = {
      username: PropTypes.string,
      userHandler: PropTypes.func.isRequired,
      isLoggedIn: PropTypes.func.isRequired
    };

    Home.defaultProps = {
      username: null
    };
  }

  render() {
    return this.props.isLoggedIn() ? (
      <Game username={this.props.username} />
    ) : (
      <div className="row">
        <Register className="col" userHandler={this.props.userHandler} />
        <Login className="col" userHandler={this.props.userHandler} />
      </div>
    );
  }
}

export default Home;
