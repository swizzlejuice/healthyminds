import React from 'react';
import { NavLink } from 'react-router-dom';
import DiaryTags from './DiaryTags';
import { useBackground } from './BackgroundContext';

function Diary() {
  const { backgroundImage } = useBackground();
  return (
    <div className="checkin-body" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="flex-container-profile">
        <div className="diary-card">
          <NavLink to="/home"><img className="xbtn" src="x.png" alt="close button"></img></NavLink>
          <p className="diary-heading">Daily Diary</p>
          <p className="diary-p">Click on the tags that reflect your day!</p>
          <div>
            <DiaryTags />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Diary;
