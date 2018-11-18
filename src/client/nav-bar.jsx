import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const NavBar = props => (
  <nav className="navbar navbar-expand-sm bg-info sticky-top justify-content-between">
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link to="/" className="text-light nav-link">
          {"Home"}
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/game" className="text-light nav-link">
          {"Game"}
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/quiz" className="text-light nav-link">
          {"Quiz"}
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/NotAPage" className="text-light nav-link">
          {"404"}
        </Link>
      </li>
    </ul>
    {props.username ? (
      <form className="form-inline">
        <button
          className="btn btn-outline-light"
          type="button"
          onClick={() => {
            props.logoutHandler();
          }}
        >
          {"Log out"}
        </button>
      </form>
    ) : (
      <span className="navbar-brand text-light">Not logged in</span>
    )}
  </nav>
);

NavBar.propTypes = {
  username: PropTypes.string,
  logoutHandler: PropTypes.func.isRequired
};

NavBar.defaultProps = {
  username: null
};

export default NavBar;
