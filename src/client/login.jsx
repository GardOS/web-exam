import React, { Component } from "react";
import PropTypes from "prop-types";

class Login extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: ""
    };

    Login.propTypes = {
      loginHandler: PropTypes.func.isRequired
    };
  }

  login() {
    fetch("http://localhost:3000/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
      .then(res => {
        if (res.status === 400) {
          alert("Request is invalid");
        } else if (res.status === 401) {
          alert("Username/password is wrong");
        } else {
          this.props.loginHandler(res.body);
        }
      })
      .catch(err => alert(`Something went wrong. Error: ${err}`));
  }

  render() {
    return (
      <form
        className="container needs-validation, w-50"
        onSubmit={e => {
          e.preventDefault();

          this.login();
        }}
      >
        <h1>Login</h1>
        <div className="form-group">
          <label className="w-100" htmlFor="login-username">
            Username
            <input
              required
              id="login-username"
              type="text"
              className="form-control"
              placeholder="Name"
              onChange={e => this.setState({ username: e.target.value })}
            />
          </label>
        </div>
        <div className="form-group">
          <label className="w-100" htmlFor="login-password">
            Password
            <input
              required
              id="login-password"
              type="password"
              className="form-control"
              placeholder="***"
              onChange={e => this.setState({ password: e.target.value })}
            />
          </label>
        </div>
        <div>
          <button type="submit" className="btn btn-primary btn-block">
            Login
          </button>
        </div>
      </form>
    );
  }
}

export default Login;
