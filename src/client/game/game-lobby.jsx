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
        <h3>Waiting for more players</h3>
      )
    ) : (
      <h3>Waiting for host</h3>
    )}
    <br />
    <h2>Players:</h2>
    <ol className="list-group-flush pl-0">
      {props.players.map(player => (
        <li key={player} className="list-group-item">
          {player}
        </li>
      ))}
    </ol>
  </div>
);

GameLobby.propTypes = {
  isHost: PropTypes.bool.isRequired,
  handleStart: PropTypes.func.isRequired,
  players: PropTypes.array.isRequired
};

export default GameLobby;
