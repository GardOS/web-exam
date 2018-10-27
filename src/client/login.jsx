import React, { Component } from "react";

class Login extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: ""
    };
  }

  render() {
    return (
      <form
        className="container needs-validation, w-50"
        onSubmit={e => {
          e.preventDefault();

          alert(JSON.stringify(this.state, null, "\t"));
        }}
      >
        <h1>Login</h1>
        <div className="form-group">
          <label className="w-100" htmlFor="username-input">
            Username
            <input
              required
              id="username-input"
              type="text"
              className="form-control"
              placeholder="Name"
              onChange={e => this.setState({ username: e.target.value })}
            />
          </label>
        </div>
        <div className="form-group">
          <label className="w-100" htmlFor="password-input">
            Password
            <input
              required
              id="password-input"
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
