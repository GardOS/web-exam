import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const io = require("socket.io-client");

class Game extends Component {
  constructor() {
    super();

    this.state = { connected: false };

    Game.propTypes = {
      username: PropTypes.string,
      isLoggedIn: PropTypes.func.isRequired
    };

    Game.defaultProps = {
      username: null
    };

    this.socket = null;
  }

  componentWillUnmount() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  connect() {
    this.socket = io("http://localhost:3000");

    this.socket.on("connect", () => {
      this.setState({ connected: true });
      console.log("Connected!");
    });

    this.socket.on("disconnect", () => {
      this.setState({ connected: false });
      console.log("Disconnected!");
    });

    this.socket.on("errorEvent", message => {
      alert(message.error);
    });

    fetch("http://localhost:3000/wstoken", {
      method: "post",
      credentials: "include"
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        if (res.status === 401) {
          alert("You should log in first");
        }
        return null;
      })
      .then(message => {
        if (message && message.wstoken) {
          this.socket.emit("login", message.wstoken);
        }
      })
      .catch(err => alert(`Failed to connect to server. Error: ${err}`));
  }

  sendMessage() {
    this.socket.emit("userJoined", this.props.username);
    console.log(`Send message: userJoined, ${this.props.username}`);
  }

  render() {
    return this.props.isLoggedIn() ? (
      <div>
        {this.state.connected ? (
          <div>Connected</div>
        ) : (
          <button
            type="button"
            className="btn btn-block btn-primary align-middle"
            onClick={() => this.connect()}
          >
            {"Connect"}
          </button>
        )}
      </div>
    ) : (
      <div>
        <h3>You have to log in before playing the game.</h3>
        <h4>
          <Link to="/">
            <u>Login</u>
          </Link>
        </h4>
      </div>
    );
  }
}

export default Game;
