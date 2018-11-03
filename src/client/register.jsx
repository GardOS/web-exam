import React, { Component } from "react";
import PropTypes from "prop-types";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      comfirm: "",
      termsAndConditions: true
    };

    Register.propTypes = {
      userHandler: PropTypes.func.isRequired
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

  createUser() {
    fetch("http://localhost:3000/users", {
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
        } else if (res.status === 409) {
          alert("Username is taken");
        } else {
          this.props.userHandler(this.state.username);
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

          if (!this.validateForm()) {
            alert("Invalid input");
            return;
          }
          this.createUser();
        }}
      >
        <h1>Register</h1>
        <div className="form-group">
          <label className="w-100" htmlFor="register-username">
            {"Username"}
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
            {"Password"}
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
            {"Confirm password"}
            <input
              required
              id="register-confirm"
              type="password"
              className="form-control"
              placeholder="***"
              onChange={e => this.setState({ comfirm: e.target.value })}
            />
          </label>
        </div>
        <label htmlFor="register-terms-and-conditions">
          <input
            required
            checked
            id="register-terms-and-conditions"
            type="checkbox"
            onChange={e =>
              this.setState({ termsAndConditions: e.target.checked })
            }
          />
          {"Forfeit soul"}
        </label>
        <div>
          <button type="submit" className="btn btn-primary btn-block">
            {"Register"}
          </button>
        </div>
      </form>
    );
  }
}

export default Register;
