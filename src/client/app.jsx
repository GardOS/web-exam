import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import Home from "./home";
import { NotFound } from "./not-found";

export const App = () => (
  <div>
    <nav className="navbar navbar-expand-sm bg-info sticky-top">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/" className="text-light nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/NotAPage" className="text-light nav-link">
            404
          </Link>
        </li>
      </ul>
    </nav>
    <br />
    <div className="container">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </div>
);

export default App;
