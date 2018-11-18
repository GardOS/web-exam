import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Results = props =>
  props.results ? (
    <div>
      <h1>Score</h1>
      <ol className="list-group-flush pl-0">
        {props.results.map(player => (
          <li key={player.username} className="list-group-item">
            {`${player.username}: ${player.score}`}
          </li>
        ))}
      </ol>
      <h4>
        <Link to="/">
          <u>Go back</u>
        </Link>
      </h4>
    </div>
  ) : (
    <h1>No results</h1>
  );

Results.propTypes = {
  results: PropTypes.array.isRequired
};

export default Results;
