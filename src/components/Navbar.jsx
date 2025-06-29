import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/stellarsynapselogo.png'; // Adjust path as needed

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">
        <img src={logo} alt="StellarSynapse Logo" className="logo-img" />
      </Link>
      <ul className="nav-links">
        <li><Link to="/stellarbot">StellarBot</Link></li>
        <li><Link to="/moon-phase">Moon Phase</Link></li>
        <li><Link to="/solar-tour">Solar Tour</Link></li>
        <li><Link to="/mystery">Mystery</Link></li>
        <li><Link to="/mars">Mars</Link></li>
        <li><Link to="/hall-of-fame">Hall of Fame</Link></li>
        <li><Link to="/game">Game</Link></li>
        <li><Link to="/zodiac">Zodiac</Link></li> {/* 🆕 New link here */}
      </ul>
    </nav>
  );
}

export default Navbar;
