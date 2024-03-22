import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import LogoutButton from './logout'; 
import AvatarSelection from './avatars'; 
import { NavLink } from 'react-router-dom';
import Chart from 'chart.js/auto'; 

function Profile() {
  const [moodEntries, setMoodEntries] = useState([]);
  const [userEmail, setUserEmail] = useState(null);
  const [displayName, setDisplayName] = useState('Enter Name'); 
  const [selectedAvatar, setSelectedAvatar] = useState(null); 
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [overallMoodCounts, setOverallMoodCounts] = useState({
    frown: 0,
    slightfrown: 0,
    neutral: 0,
    slightsmile: 0,
    smile: 0
  });

  const countOverallMoodOccurrences = (entries) => {
    const counts = {
      frown: 0,
      slightfrown: 0,
      neutral: 0,
      slightsmile: 0,
      smile: 0
    };
    entries.forEach(entry => {
      counts[entry.mood] += 1;
    });
    return counts;
  };

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

          const overallCounts = countOverallMoodOccurrences(entries);
          setOverallMoodCounts(overallCounts);
        } else {
          setMoodEntries([]);
        }
      });
    }
  }, []);

  useEffect(() => {
    // for my chartjs!
    const ctx = document.getElementById('moodChart');
    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['😞', '🙁', '😐', '🙂', '😊'],
        datasets: [{
          label: 'Overall Mood Counts',
          data: [overallMoodCounts.frown, overallMoodCounts.slightfrown, overallMoodCounts.neutral, overallMoodCounts.slightsmile, overallMoodCounts.smile],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 205, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(54, 162, 235, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            precision: 0, 
            stepSize: 1 
          }
        }
      }
    });
    
    return () => {
      chart.destroy();
    };
  }, [overallMoodCounts]);

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
          <div className="bar-card">
          <div className="bar-chart">
            <p className="chart-text">All-time Mood Summary</p>
            <canvas id="moodChart" height="200"></canvas>
          </div></div>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}

export default Profile;
