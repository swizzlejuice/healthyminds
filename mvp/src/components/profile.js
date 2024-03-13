import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import LogoutButton from './logout'; 

function Profile() {
  const [moodEntries, setMoodEntries] = useState([]);
      
  useEffect(() => {
    const auth = getAuth();
    const db = getDatabase();
  
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const moodRef = ref(db, `${userId}/moodEntries`);
    
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
                  {moodEntries.map((entry, index) => (
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
    