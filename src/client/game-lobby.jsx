import React from "react";
import PropTypes from "prop-types";

const GameLobby = props => (
  <div>
    {props.isHost ? (
      props.players.length > 1 ? (
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
        <div>Waiting for more players</div>
      )
    ) : (
      <div>Waiting for host</div>
    )}

    <div>Players:</div>
    {props.players.map(player => (
      <div key={player}>{player}</div>
    ))}
  </div>
);

GameLobby.propTypes = {
  isHost: PropTypes.bool.isRequired,
  handleStart: PropTypes.func.isRequired,
  players: PropTypes.array.isRequired
};

export default GameLobby;
