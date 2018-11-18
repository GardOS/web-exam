import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Results = props =>
  props.results ? (
    <div>
      {console.log(props)}
      {props.results.map(player => (
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

Results.propTypes = {
  results: PropTypes.array.isRequired
};

export default Results;
