import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import LogoutButton from './logout'; 
import AvatarSelection from './avatars'; 
import { NavLink } from 'react-router-dom';

function Profile() {
  const [moodEntries, setMoodEntries] = useState([]);
  const [userEmail, setUserEmail] = useState(null);
  const [displayName, setDisplayName] = useState('Enter Name'); 
  const [selectedAvatar, setSelectedAvatar] = useState(null); 
  const [showAvatarModal, setShowAvatarModal] = useState(false);
      
  useEffect(() => {
    const auth = getAuth();
    const db = getDatabase();
  
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const moodRef = ref(db, `${userId}/moodEntries`);
      const userRef = ref(db, `${userId}/userData`);
      const avatarRef = ref(db, `${userId}/userAvatar`);
      
      setUserEmail(auth.currentUser.email);
    
      onValue(userRef, (snapshot) => {
        const userData = snapshot.val();
        if (userData && userData.displayName) {
          setDisplayName(userData.displayName);
        }
      });

      onValue(avatarRef, (snapshot) => {
        const avatarData = snapshot.val();
        if (avatarData) {
          setSelectedAvatar(avatarData);
        }
      });
      
      onValue(moodRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const entries = Object.values(data);
          setMoodEntries(entries);
        } else {
          setMoodEntries([]);
        }
      });
    }
  }, []);
    
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    return formattedDate;
  };
    
  const mapMoodToEmoji = (mood) => {
    switch (mood) {
      case 'frown':
        return '😞';
      case 'slightfrown':
        return '🙁';
      case 'neutral':
        return '😐';
      case 'slightsmile':
        return '🙂';
      case 'smile':
        return '😊';
      default:
        return '';
    }
  };

  const handleChangeDisplayName = (newName) => {
    setDisplayName(newName);
    const auth = getAuth();
    const db = getDatabase();
    const userId = auth.currentUser.uid;
    const userRef = ref(db, `${userId}/userData`);
    set(userRef, { displayName: newName });
  };

  const handleAvatarChange = (newAvatar) => {
    setSelectedAvatar(newAvatar);
    setShowAvatarModal(false);
    const auth = getAuth();
    const db = getDatabase();
    const userId = auth.currentUser.uid;
    const avatarRef = ref(db, `${userId}/userAvatar`);
    set(avatarRef, newAvatar);
  };
    
  return (
    <div className="profile-body">
      <div className="flex-container-profile">
        <div className="profile-card">
          <img
            className="profile-pic"
            src={selectedAvatar || 'profilepic.png'} 
            alt="profile pic"
            onClick={() => setShowAvatarModal(true)} 
          />
          <NavLink to="/help"><img className="help-icon" src="help.png"/></NavLink>
          <p className="profile-name">{displayName}</p>
          {userEmail && <p className="profile-email">{userEmail}</p>}
          <button className="change-pass" onClick={() => handleChangeDisplayName(prompt('Enter new display name'))}>
            Change Name
          </button>
          <AvatarSelection 
            show={showAvatarModal} 
            handleClose={() => setShowAvatarModal(false)} 
            onSelectAvatar={handleAvatarChange} 
          />
          <div className="mood-card">
            <p className="mood-summary">Weekly Mood Summary</p>
            <ul className="mood-summary-list">
              {moodEntries.slice(-7).map((entry, index) => (
                <li key={index}>
                  <span className="mood-emoji">{mapMoodToEmoji(entry.mood)}</span>
                  <span className="mood-date">{formatDate(entry.timestamp)}</span>
                </li>
              ))}
            </ul>
          </div>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}

export default Profile;
