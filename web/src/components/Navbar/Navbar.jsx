import React from 'react';

import { Link, useLocation } from 'react-router-dom';

import './Navbar.css';

export default function Header() {
  const location = useLocation();

  return (
    <header>
      <div className='header-inner'>
        <div className='logo'>
          <a href='/'>MediTree</a>
        </div>
        <nav>
          <ul>
            {['/', '/leaderboard']
              .filter(p => p !== location.pathname)
              .map(p => (
                <li key={p}>
                  <Link to={p}>{p === '/' ? 'Home' : 'Leaderboard'}</Link>
                </li>
              ))}
            <li>
              <a href='/'>Log Out</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
