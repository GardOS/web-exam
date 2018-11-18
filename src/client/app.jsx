import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./home/home";
import Game from "./game/game";
import { NotFound } from "./not-found";
import NavBar from "./nav-bar";

class App extends Component {
  constructor() {
    super();

    this.state = {
      username: null
    };

    this.handleUser = this.handleUser.bind(this);
    this.isLoggedIn = this.isLoggedIn.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
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

  handleLogout() {
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
        <NavBar
          username={this.state.username}
          logoutHandler={this.handleLogout}
        />
        <br />
        <div className="container">
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <Home
                  {...props}
                  userHandler={this.handleUser}
                  isLoggedIn={this.isLoggedIn}
                />
              )}
            />
            <Route
              exact
              path="/game"
              render={props => <Game {...props} isLoggedIn={this.isLoggedIn} />}
            />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
