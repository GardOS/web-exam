import React, { Component } from "react";
import { Route, Switch, Link } from "react-router-dom";
import Home from "./home";
import { NotFound } from "./not-found";

class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedIn: false
    };

    this.handleLogin = this.handleLogin.bind(this);
  }

  componentWillMount() {
    if (localStorage.getItem("token")) {
      this.setState({ loggedIn: true });
    } else {
      this.setState({ loggedIn: false });
    }
  }

  handleLogin(token) {
    if (token) {
      this.setState({ loggedIn: true });
      localStorage.setItem("token", token);
    } else {
      this.setState({ loggedIn: false });
      localStorage.removeItem("token");
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-sm bg-info sticky-top justify-content-between">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="text-light nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/NotAPage" className="text-light nav-link">
                404
              </Link>
            </li>
          </ul>
          {this.state.loggedIn ? (
            <form className="form-inline">
              <button
                className="btn btn-outline-light"
                type="button"
                onClick={_ => this.handleLogin(null)} // eslint-disable-line
              >
                Log out
              </button>
            </form>
          ) : (
            <span className="navbar-brand text-light">Not logged in</span>
          )}
        </nav>
        <br />
        <div className="container">
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <Home {...props} loginHandler={this.handleLogin} />
              )}
            />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
