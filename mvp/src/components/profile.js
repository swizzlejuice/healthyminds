import React from 'react';

function ProfilePage() {
  return (
    <div className="profile-body">
      <div className="flex-container-profile">
        <div className="profile-card">
          <img className="profile-pic" src="profilepic.png" alt="profile pic" />
          <p className="profile-name">Clarabelle</p>
          <p className="profile-email">claro007@uw.edu</p>
          <button className="change-pass">Change Password</button>
          <div className="mood-card">
            <p className="mood-summary">Weekly Mood Summary</p>
          </div>
          <button className="logout">Log out</button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;