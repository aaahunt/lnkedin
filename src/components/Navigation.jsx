import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navigation() {
  let showProfilePage = /users|profile/.test(useLocation().pathname);

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/users">Users</Link>
      {showProfilePage && <Link to="/profile">My Profile</Link>}
      <Link to="/about">About</Link>
    </nav>
  );
}
