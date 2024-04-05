import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

export default function MyCloset() {

return (
  <div className="checkin-body">
    <div className="flex-container-profile">
      <div className="checkin-card">
        <div>
            <p className="closet-title">My Closet</p>
        <div className= 'clothing-list'></div>
        </div>
        <NavLink to="/viewPet"><p className="back-btn"> Back </p></NavLink>
      </div>
    </div>
  </div>
);
}