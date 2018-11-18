import React from "react";
import PropTypes from "prop-types";

const GameLobby = props => (
  <div>
    {props.isHost ? (
      <button
        type="button"
        className="btn btn-block btn-primary align-middle"
        onClick={() => {
          props.handleStart();
        }}
      >
        {"Start game"}
      </button>
    ) : (
      <div>Waiting for host</div>
    )}

    <div>Players:</div>
    {props.players.map(player => (
      <div>{player}</div>
    ))}
  </div>
);

GameLobby.propTypes = {
  isHost: PropTypes.bool.isRequired,
  handleStart: PropTypes.func.isRequired,
  players: PropTypes.array.isRequired
};

export default GameLobby;
