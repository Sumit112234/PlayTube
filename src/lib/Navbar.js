// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
 
const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">
        Home
      </Link>
      <Link to="/AskFromGaren" className="nav-link">
        Ask From Garen
      </Link>
      <Link to="/about" className="nav-link">
        About
      </Link>
      
    </nav>
  );
};

export default Navbar;
