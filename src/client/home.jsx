import React, { Component } from "react";
import Register from "./register";

class Home extends Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <div className="row">
        <Register className="col" />
        <Register className="col" />
      </div>
    );
  }
}

export default Home;
