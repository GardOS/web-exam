import React, { Component } from "react";
import Register from "./register";
import Login from "./login";

class Home extends Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <div className="row">
        <Register className="col" />
        <Login className="col" />
      </div>
    );
  }
}

export default Home;
