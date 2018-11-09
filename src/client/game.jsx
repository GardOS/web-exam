import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const io = require("socket.io-client");

class Game extends Component {
  constructor() {
    super();

    this.state = {
      onlinePlayers: []
    };

    Game.propTypes = {
      username: PropTypes.string,
      isLoggedIn: PropTypes.func.isRequired
    };

    Game.defaultProps = {
      username: null
    };
  }

  componentWillMount() {
    if (!this.props.isLoggedIn()) {
      return;
    }

    this.socket = io("http://localhost:3000");

    this.socket.on("connect", () => {
      console.log("Connected!");
      this.socket.emit("userJoined", this.props.username);
    });

    this.socket.on("disconnect", () => {
      console.log("Disconnected!");
    });

    this.socket.on("userJoined", message => {
      console.log("userJoined!");
      this.setState({
        onlinePlayers: message
      });
    });
  }

  sendMessage() {
    this.socket.emit("userJoined", this.props.username);
    console.log(`Send message: userJoined, ${this.props.username}`);
  }

  render() {
    return this.props.isLoggedIn() ? (
      <div>
        <button
          type="button"
          className="btn btn-block btn-primary align-middle"
          onClick={() => this.sendMessage()}
        >
          {"Join game"}
        </button>

        <button
          type="button"
          className="btn btn-block btn-primary align-middle"
          onClick={() => this.sendMessage()}
        >
          {"Send message"}
        </button>
        <ul className="list-group-flush pl-0">
          {this.state.onlinePlayers.map((player, i) => (
            <li key={player + i} className="list-group-item">
              {player}
            </li>
          ))}
        </ul>
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
