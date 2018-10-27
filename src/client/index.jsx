import React, { Component } from "react";
import ReactDOM from "react-dom";
import { hot } from "react-hot-loader";

class App extends Component {
	render() {
		return <h1>Hello</h1>;
	}
}

export default hot(module)(App);

ReactDOM.render(<App />, document.getElementById("root"));