import React from "react";
import ReactDOM from "react-dom";
import { hot } from "react-hot-loader";
import App from "./app";

export default hot(module)(App);

ReactDOM.render(<App />, document.getElementById("root"));
