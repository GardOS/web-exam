import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Question from "./question";
import Results from "./results";
import GameLobby from "./game-lobby";

const io = require("socket.io-client");

class Game extends Component {
  constructor() {
    super();

    this.gameStateEnum = Object.freeze({ new: 0, inProgress: 1, done: 2 });

    this.state = {
      isPlaying: false,
      currentQuestion: null,
      results: [],
      isHost: false,
      gameState: this.gameStateEnum.new,
      players: []
    };

    Game.propTypes = {
      isLoggedIn: PropTypes.func.isRequired
    };

    this.socket = null;

    this.handleAnswer = this.handleAnswer.bind(this);
    this.handleStart = this.handleStart.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:3000/wstoken", {
      method: "post",
      credentials: "include"
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return null;
      })
      .then(message => {
        if (message && message.wstoken) {
          this.createSocket();

          this.socket.emit("login", message.wstoken);
        }
      })
      .catch(err => alert(`Failed to connect to server. Error: ${err}`));
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
      this.setState({ isPlaying: false });
      console.log("Disconnected!");
    });

    this.socket.on("errorEvent", message => {
      alert(message.error);
    });

    this.socket.on("question", question => {
      this.setState({ currentQuestion: question });
    });

    this.socket.on("done", results => {
      this.setState({ results });
      this.setState({ currentQuestion: null });
      this.setState({ gameState: this.gameStateEnum.done });
    });

    this.socket.on("players", players => {
      this.setState({ isPlaying: true });
      this.setState({ players });
    });

    this.socket.on("gameCreated", () => {
      this.setState({ isHost: true });
    });

    this.socket.on("gameStarted", () => {
      this.setState({ isHost: true });
      this.setState({ gameState: this.gameStateEnum.inProgress });
    });
  }

  handleAnswer(answer) {
    this.socket.emit("answer", answer);
    this.setState({ currentQuestion: null });
  }

  handleStart() {
    this.socket.emit("start");
  }

  renderGame() {
    switch (this.state.gameState) {
      case this.gameStateEnum.new:
        return (
          <GameLobby
            isHost={this.state.isHost}
            players={this.state.players}
            handleStart={this.handleStart}
          />
        );
      case this.gameStateEnum.inProgress:
        return this.state.currentQuestion ? (
          <Question
            question={this.state.currentQuestion}
            handleAnswer={this.handleAnswer}
          />
        ) : (
          <div>Waiting for opponent(s)</div>
        );
      case this.gameStateEnum.done:
        return <Results results={this.state.results} />;
      default:
        return <div>Something went wrong. Cannot track game state.</div>;
    }
  }

  render() {
    return this.props.isLoggedIn() ? (
      <div>
        {this.state.isPlaying ? (
          this.renderGame()
        ) : (
          <div>
            <button
              type="button"
              className="btn btn-block btn-primary align-middle"
              onClick={() => {
                this.socket.emit("create");
              }}
            >
              {"Create game"}
            </button>
            <button
              type="button"
              className="btn btn-block btn-primary align-middle"
              onClick={() => {
                this.socket.emit("join");
              }}
            >
              {"Join game"}
            </button>
          </div>
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
