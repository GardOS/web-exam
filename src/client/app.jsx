import React, { Component } from "react";

class App extends Component {
  constructor() {
    super();

    this.state = {
      message: "Hello"
    };
  }

  render() {
    return <div>{this.state.message}</div>;
  }
}

export default App;
