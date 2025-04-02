// src/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav id='navbar'>
      <Link to='/'>Home</Link>
      <Link to='/book-reviews'>Book Reviews</Link>
      <Link to='/game-reviews'>Game Reviews</Link>
    </nav>
  );
}

export default Navbar;
