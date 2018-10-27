import React from "react";
import { Link } from "react-router-dom";

export const NotFound = () => (
  <div>
    <h1>404 page not found</h1>
    <h4>
      Oh no! Take me
      {"  "}
      <Link to="/">
        <u>home</u>
      </Link>
    </h4>
  </div>
);

export default NotFound;
