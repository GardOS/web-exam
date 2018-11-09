import React, { Component } from "react";
import PropTypes from "prop-types";

const io = require("socket.io-client");

class Game extends Component {
  constructor() {
    super();

    this.state = {
      onlinePlayers: []
    };

    Game.propTypes = {
      username: PropTypes.string
    };

    Game.defaultProps = {
      username: null
    };
  }

  componentWillMount() {
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
    return (
      <div>
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
    );
  }
}

export default Game;
