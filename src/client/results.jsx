import React from "react";
import { Link } from "react-router-dom";

const Results = message =>
  message ? (
    <div>
      {console.log(message)}
      {message.results.map(player => (
        <h2>{`${player.username}: ${player.score}`}</h2>
      ))}
      <h4>
        <Link to="/">
          <u>Click here to play more</u>
        </Link>
      </h4>
    </div>
  ) : (
    <h1>No results</h1>
  );

export default Results;
