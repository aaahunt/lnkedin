import React from "react";
import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav className="navbar background">
      <ul className="nav-list">
        <div className="logo">
          <h1>RSG Bridge</h1>
        </div>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/graduates">Graduates</Link>
        </li>
        <li>
          <Link to="/mentors">Mentors</Link>
        </li>
      </ul>
      <div className="rightNav">
        <Link to="/profile">My Profile</Link>
      </div>
    </nav>
  );
}
