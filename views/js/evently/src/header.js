import React from 'react';
import './header.css';
import { NavLink } from 'react-router-dom'; // Import NavLink instead of Link

function Header() {
  return (
    <div className="Header">
      <NavLink  to="/" className="EventlyLogoLink">
        <h1 className="logo">event.ly</h1>     
      </NavLink >
      <nav>
        <ul className="nav">
          <li>
          <NavLink
              to="/"
              className={({ isActive }) => isActive ? 'nav-links active-link' : 'nav-links'}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/create-event"
              className={({ isActive }) => isActive ? 'nav-links active-link' : 'nav-links'}
            >
              Create
            </NavLink>
          </li>
<<<<<<< HEAD
          <li>
            <NavLink
              to="/hosts"
              className={({ isActive }) => isActive ? 'nav-links active-link' : 'nav-links'}
            >
              People
            </NavLink>
          </li>
          <li className = "nav-wrapper">
            <Link to="/community-page" className="nav-links">Community</Link>
            </li>
=======
>>>>>>> 9fa083d (Got rid of the duplicates in the header)
          <li>
            <Link to="/community-page" className="nav-links">Events</Link>
          </li>
          <li>
            <NavLink
              to="/about-us"
              className={({ isActive }) => isActive ? 'nav-links active-link' : 'nav-links'}
            > 
              About Us
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
export default Header