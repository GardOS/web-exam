import React, { Component } from "react";

class Register extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
      comfirm: "",
      termsAndConditions: false
    };
  }

  validateForm() {
    return (
      this.state.username.length > 2 &&
      this.state.password.length > 2 &&
      this.state.password === this.state.comfirm &&
      this.state.termsAndConditions
    );
  }

  render() {
    return (
      <form
        className="container needs-validation, w-50"
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
          <label className="w-100" htmlFor="register-username">
            Username
            <input
              required
              id="register-username"
              type="text"
              className="form-control"
              placeholder="Name"
              onChange={e => this.setState({ username: e.target.value })}
            />
          </label>
        </div>
        <div className="form-group">
          <label className="w-100" htmlFor="register-password">
            Password
            <input
              required
              id="register-password"
              type="password"
              className="form-control"
              placeholder="***"
              onChange={e => this.setState({ password: e.target.value })}
            />
          </label>
        </div>
        <div className="form-group">
          <label className="w-100" htmlFor="register-confirm">
            Confirm password
            <input
              required
              id="register-confirm"
              type="password"
              className="form-control"
              placeholder="***"
              onChange={e => this.setState({ comfirmPassword: e.target.value })}
            />
          </label>
        </div>
        <label htmlFor="register-terms-and-conditions">
          <input
            required
            id="register-terms-and-conditions"
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

export default Register;
