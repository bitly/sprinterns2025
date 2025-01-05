import React from 'react';
import './header.css';
import {
  Link
} from "react-router-dom";


function Header() {
  return (
    <div className="Header">
      <Link to="/" className="EventlyLogoLink">
        <h1 className="logo">event.ly</h1>
      </Link>
      <nav>
        <ul className="nav">
          <li>
            <Link to="/" className="nav-links">Home</Link>
          </li>
          <li>
            <Link to="/create-event" className="nav-links">Create</Link>
          </li>
          <li>
            <Link to="/hosts" className="nav-links">Hosts</Link>
          </li>
          <li>
            <Link to="/community-page" className="nav-links">Community</Link>
          </li>
          <li>
            <Link to="/about-us" className="nav-links">About Us</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
export default Header