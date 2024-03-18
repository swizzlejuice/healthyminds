import React from 'react';
import { NavLink } from 'react-router-dom';

function CheckModal() {
  return (
    <div className="checkin-body">
      <div className="flex-container-profile">
        <div className="checkin-card">
          <NavLink to="/home"><img className="xbtn" src="x.png" alt="close button"></img></NavLink>
          <img className="cheering" src="giphy.gif" alt="giphy"></img>
          <p className="checkin-state">You earned 5 coins for completing your daily check in!</p>
        </div>
      </div>
    </div>
  );
}

export default CheckModal;
