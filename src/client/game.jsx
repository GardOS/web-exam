import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Question from "./question";

const io = require("socket.io-client");

class Game extends Component {
  constructor() {
    super();

    this.state = {
      connected: false,
      currentQuestion: null,
      results: null,
      isGameDone: false
    };

    Game.propTypes = {
      isLoggedIn: PropTypes.func.isRequired
    };

    this.socket = null;

    this.handleAnswer = this.handleAnswer.bind(this);
  }

  componentWillUnmount() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  createSocket() {
    this.socket = io("http://localhost:3000");

    this.socket.on("connect", () => {
      console.log("Connected!");
    });

    this.socket.on("disconnect", () => {
      this.setState({ connected: false });
      console.log("Disconnected!");
    });

    this.socket.on("errorEvent", message => {
      alert(message.error);
    });

    this.socket.on("question", question => {
      this.setState({ currentQuestion: question });
    });

    this.socket.on("done", results => {
      this.setState({ currentQuestion: null });
      this.setState({ results });
      this.setState({ isGameDone: true });
    });
  }

  connect() {
    this.createSocket();

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
          this.socket.emit("start");
          this.setState({ connected: true });
        }
      })
      .catch(err => alert(`Failed to connect to server. Error: ${err}`));
  }

  handleAnswer(answer) {
    this.socket.emit("answer", answer);
    this.setState({ currentQuestion: null });
  }

  renderGame() {
    if (this.state.isGameDone) {
      return <div>Score and stuff</div>;
    }

    return this.state.currentQuestion ? (
      <Question
        question={this.state.currentQuestion}
        handleAnswer={this.handleAnswer}
      />
    ) : (
      <div>Waiting for opponent</div>
    );
  }

  render() {
    return this.props.isLoggedIn() ? (
      <div>
        {this.state.connected ? (
          this.renderGame()
        ) : (
          <button
            type="button"
            className="btn btn-block btn-primary align-middle"
            onClick={() => this.connect()}
          >
            {"Find match"}
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
