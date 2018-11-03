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
  }

  componentDidMount() {
    this.isAuthenticated(); // TODO: Fix state being lost when refreshing. Related to username/id?
  }

  isAuthenticated() {
    fetch("http://localhost:3000/user", { credentials: "include" })
      .then(res => {
        if (res.status === 200) {
          this.handleUser(res.body.username);
        } else if (res.status === 401) {
          this.handleUser(null);
        } else {
          alert(
            `Something went wrong when authenticating. Status: ${res.status}`
          );
        }
      })
      .catch(err => alert(`Something went wrong. Error: ${err}`));
  }

  handleUser(username) {
    this.setState({ username });
  }

  logout() {
    fetch("http://localhost:3000/logout")
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
          {this.state.username ? (
            <form className="form-inline">
              <button
                className="btn btn-outline-light"
                type="button"
                onClick={() => {
                  this.logout();
                }}
              >
                {`${this.state.username}  Log out`}
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
                <Home {...props} userHandler={this.handleUser} />
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
