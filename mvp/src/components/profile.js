import LogoutButton from './logout'; 
import React, { useEffect, useState } from 'react';
import { getDatabase, ref, orderByKey, limitToLast, onValue, query } from 'firebase/database';

function Profile() {
  const [recentMoods, setRecentMoods] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const moodRef = ref(db, 'user_moods');
    const recentMoodsQuery = query(moodRef, orderByKey(), limitToLast(7));

    onValue(recentMoodsQuery, (snapshot) => {
      const moods = [];
      snapshot.forEach((moodSnapshot) => {
        const mood = moodSnapshot.val();
        moods.push(mood);
      });
      setRecentMoods(moods.reverse());
    });
  }, []);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0'); 
    const year = String(date.getFullYear()).slice(-2); 
    return `${month}/${day}/${year}`;
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

  return (
    <div className="profile-body">
      <div className="flex-container-profile">
        <div className="profile-card">
          <img className="profile-pic" src="profilepic.png" alt="profile pic" />
          <p className="profile-name">Clarabelle</p>
          <p className="profile-email">claro007@uw.edu</p>
          <button className="change-pass">Edit Profile</button>
          <div className="mood-card">
            <p className="mood-summary">Weekly Mood Summary</p>
            <ul className="mood-summary-list">
              {recentMoods.map((mood, index) => (
                <li key={index}>
                  <span className="mood-emoji">{mapMoodToEmoji(mood.mood)}</span> {/* Display emoji */}
                  <span className="mood-date">{formatDate(mood.timestamp)}</span> {/* Display date */}
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
