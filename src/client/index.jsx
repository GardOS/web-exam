import React from "react";
import ReactDOM from "react-dom";
import { hot } from "react-hot-loader";
import { BrowserRouter } from "react-router-dom";
import App from "./app";

export default hot(module)(App);

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
