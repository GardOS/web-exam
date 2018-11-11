import React from "react";
import { Link } from "react-router-dom";

const Results = message => (
  <div>
    <h1>
      {`${message.results.playerOne.username}: 
      ${message.results.playerOne.score}`}
    </h1>
    <h1>
      {`${message.results.playerTwo.username}: 
      ${message.results.playerTwo.score}`}
    </h1>
    <h4>
      <Link to="/">
        <u>Click here to play more</u>
      </Link>
    </h4>
  </div>
);

export default Results;
