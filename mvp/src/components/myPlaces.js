import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

export default function MyPlaces() {

return (
  <div className="checkin-body">
    <div className="flex-container-profile">
      <div className="checkin-card">
          <div>
            <p className="closet-title">My Places</p>
            <div className= 'places-list'></div>
            </div>
            <NavLink to="/viewPet"><p className="back-btn"> Back </p></NavLink>
          </div>
      </div>
    </div>
);
}