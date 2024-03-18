import React from 'react';
import { NavLink } from 'react-router-dom';
import DiaryTags from './DiaryTags';
import { Input } from 'rsuite';

function Diary() {
  return (
    <div className="checkin-body">
      <div className="flex-container-profile">
        <div className="diary-card">
          <NavLink to="/home"><img className="xbtn" src="x.png" alt="close button"></img></NavLink>
          <p className="diary-heading">Daily Diary</p>
          <p className="diary-p">Add tags to record your day!</p>
          <div>
            <DiaryTags />
          </div>
          <p className="diary-p2">Add an optional description :)</p>
          <Input as="textarea" rows={4} placeholder="Type diary entry here" className="diary-form"/>
          <button className="diary-btn">Submit</button>
        </div>
      </div>
    </div>
  );
}

export default Diary;

