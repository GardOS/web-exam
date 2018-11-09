import React, { Component } from "react";
import PropTypes from "prop-types";

const io = require("socket.io-client");

class Game extends Component {
  constructor() {
    super();

    this.state = { lastMessage: null };

    Game.propTypes = {
      username: PropTypes.string
    };

    Game.defaultProps = {
      username: null
    };
  }

  startGameHandler() {
    const socket = io(window.location.origin);

    console.log("Socket");

    socket.on("message", message => {
      this.setState({ lastMessage: message });
      console.log("Connected!");
    });
  }

  render() {
    return (
      <div>
        <h1 className="">{`Hello ${this.props.username}!`}</h1>
        <button
          type="button"
          className="btn btn-block btn-primary align-middle"
          onClick={() => this.startGameHandler()}
        >
          {"Start game"}
        </button>
        <div>{`Last message: ${this.state.lastMessage}`}</div>
      </div>
    );
  }
}

export default Game;
