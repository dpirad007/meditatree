import React from "react";

import "./Navbar.css";

export default function Header() {
  return (
    <header>
      <div className="header-inner">
        <div className="logo">
          <a href="/">MediTree</a>
        </div>
        <nav>
          <ul>
            <li>
              <a href="/leaderboard">LeaderBoard</a>
            </li>
            <li>
              <a href="/">Log Out</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
