import React, { Component } from "react";
import PropTypes from "prop-types";
import Register from "./register";
import Login from "./login";

class Home extends Component {
  constructor() {
    super();

    this.state = {};

    Home.propTypes = {
      loginHandler: PropTypes.func.isRequired
    };
  }

  render() {
    return (
      <div className="row">
        <Register className="col" loginHandler={this.props.loginHandler} />
        <Login className="col" loginHandler={this.props.loginHandler} />
      </div>
    );
  }
}

export default Home;
