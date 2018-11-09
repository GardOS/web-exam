import React, { Component } from "react";
import { Route, Switch, Link } from "react-router-dom";
import Home from "./home";
import { NotFound } from "./not-found";

class App extends Component {
  constructor() {
    super();

    this.state = {
      username: null
    };

    this.handleUser = this.handleUser.bind(this);
    this.isLoggedIn = this.isLoggedIn.bind(this);
  }

  componentWillMount() {
    this.isAuthenticated();
  }

  isAuthenticated() {
    fetch("http://localhost:3000/user", { credentials: "include" })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        if (res.status === 401) {
          return null;
        }
        throw new Error(`Network response was not ok. Status: ${res.status}`);
      })
      .then(user => this.handleUser(user ? user.username : null))
      .catch(err => alert(`Something went wrong. Error: ${err}`));
  }

  handleUser(username) {
    this.setState({ username });
  }

  isLoggedIn() {
    return !!this.state.username;
  }

  logout() {
    fetch("http://localhost:3000/logout", { credentials: "include" })
      .then(res => {
        if (res.status === 204) {
          this.handleUser(null);
        } else {
          alert("Something went wrong when logging out from server");
        }
      })
      .catch(err => alert(`Something went wrong. Error: ${err}`));
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-sm bg-info sticky-top justify-content-between">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="text-light nav-link">
                {"Home"}
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/NotAPage" className="text-light nav-link">
                {"404"}
              </Link>
            </li>
          </ul>
          <form className="form-inline">
            <button
              className="btn btn-outline-light"
              type="button"
              onClick={() => {
                this.isAuthenticated();
              }}
            >
              {`${this.state.username}`}
            </button>
          </form>
          {this.state.username ? (
            <form className="form-inline">
              <button
                className="btn btn-outline-light"
                type="button"
                onClick={() => {
                  this.logout();
                }}
              >
                {"Log out"}
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
                <Home
                  {...props}
                  username={this.state.username}
                  userHandler={this.handleUser}
                  isLoggedIn={this.isLoggedIn}
                />
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
