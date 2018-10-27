import React, { Component } from "react";

class Home extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
      comfirmPassword: "",
      termsAndConditions: false
    };
  }

  validateForm() {
    return (
      this.state.username.length > 2 &&
      this.state.password.length > 2 &&
      this.state.password === this.state.comfirmPassword &&
      this.state.termsAndConditions
    );
  }

  render() {
    return (
      <form
        className="container needs-validation"
        onSubmit={e => {
          e.preventDefault();

          if (!this.validateForm()) {
            alert("Invalid input");
            return;
          }
          alert(JSON.stringify(this.state, null, "\t"));
        }}
      >
        <h1>Register</h1>
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
        <div className="form-group">
          <label className="w-100" htmlFor="confirm-password-input">
            Confirm password
            <input
              required
              id="confirm-password-input"
              type="password"
              className="form-control"
              placeholder="***"
              onChange={e => this.setState({ comfirmPassword: e.target.value })}
            />
          </label>
        </div>
        <label htmlFor="terms-and-conditions-check">
          <input
            required
            id="terms-and-conditions-check"
            type="checkbox"
            onChange={e =>
              this.setState({ termsAndConditions: e.target.checked })
            }
          />
          Forfeit soul
        </label>
        <div>
          <button type="submit" className="btn btn-primary btn-block">
            Register
          </button>
        </div>
      </form>
    );
  }
}

export default Home;
