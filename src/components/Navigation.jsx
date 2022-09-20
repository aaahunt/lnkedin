import React from "react";
import { Link } from "react-router-dom";

export default function Navigation() {

  return (
    <nav className="navbar background">
      <ul className="nav-list">
        <div className="logo"></div>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
        {showProfilePage && (
          <li>
            <Link to="/profile">My Profile</Link>
          </li>
        )}
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
      <div className="rightNav">
        <input type="text" name="search" id="search" />
        <button className="btn btn-sm">Search</button>
      </div>
    </nav>
  );
}
