import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="container">
      <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
        <NavLink className="d-flex mb-3 me-auto nav-link" to="/">
          <h1>Weather and air quality</h1>
        </NavLink>
        <ul className="nav nav-pills">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/history">
              History
            </NavLink>
          </li>
        </ul>
      </header>
    </div>
  );
};

export default Header;
