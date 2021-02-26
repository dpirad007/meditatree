import React from "react";

import { Link, useLocation } from "react-router-dom";
import easyFetch from "../../utils/easyFetch";

import "./Navbar.css";

export default function Header() {
  const location = useLocation();

  return (
    <header>
      <div className="header-inner">
        <div className="logo">
          <a href="/">MediTree</a>
        </div>
        <nav>
          <ul>
            {["/", "/leaderboard", "/streaks"]
              .filter((p) => p !== location.pathname)
              .map((p) => (
                <li key={p}>
                  <Link to={p}>{p === "/" ? "Home" : "Leaderboard"}</Link>
                </li>
              ))}
            <li>
              <button
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={async () => {
                  await easyFetch("auth/logout", {}, "POST");
                  window.location = "/login";
                }}
              >
                Log Out
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
