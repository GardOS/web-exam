import React, { Component } from "react";
import PropTypes from "prop-types";
import Register from "./register";
import Login from "./login";

class Home extends Component {
  constructor() {
    super();

    this.state = {};

    Home.propTypes = {
      userHandler: PropTypes.func.isRequired
    };
  }

  render() {
    return (
      <div className="row">
        <Register className="col" userHandler={this.props.userHandler} />
        <Login className="col" userHandler={this.props.userHandler} />
      </div>
    );
  }
}

export default Home;
