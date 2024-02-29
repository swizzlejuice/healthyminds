import React from 'react';
import { NavLink } from 'react-router-dom';

export function HappyPawsNav() {
  return (
    <header>
      <h1><NavLink to="/home" style={{ color: '#f6f3eb' }}>Happy Paws</NavLink></h1>
      <nav>
        <ul>
          <li><NavLink to="/clothing" style={{ color: '#f6f3eb' }}><img className="store" src="store.png" alt="store icon" /> Store</NavLink></li>
          <li><img className="coins" src="coins.png" alt="coins icon" />48</li>
          <li><img className="fire" src="fire.png" alt="fire icon" />16</li>
          <li><NavLink to="/profile"><img className="profileimage" src="profilepic.png" alt="profile icon" /></NavLink></li>
        </ul>
      </nav>
    </header>
  );
}