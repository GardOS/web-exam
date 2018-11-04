import React, { Component } from "react";
import PropTypes from "prop-types";

class Game extends Component {
  constructor() {
    super();

    this.state = {};

    Game.propTypes = {
      username: PropTypes.string
    };

    Game.defaultProps = {
      username: null
    };
  }

  render() {
    return (
      <div>
        <h1 className="">{`Hello ${this.props.username}!`}</h1>
        <button
          type="button"
          className="btn btn-block btn-primary align-middle"
        >
          {"Start game"}
        </button>
      </div>
    );
  }
}

export default Game;
