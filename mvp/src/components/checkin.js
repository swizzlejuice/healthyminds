import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, push, update, get } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

function CheckIn({ updateStreak }) {
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [coinCount, setCoinCount] = useState(0);
  const [lastCheckInTimestamp, setLastCheckInTimestamp] = useState(null);
  const [hasCheckedInToday, setHasCheckedInToday] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        fetchUserData(user.uid);
      } else {
        setCurrentUser(null);
      }
    });
  }, []);

  const fetchUserData = (userId) => {
    const db = getDatabase();
    const userRef = ref(db, `users/${userId}`);

    get(userRef).then((snapshot) => {
      const userData = snapshot.val();
      if (userData) {
        setCoinCount(userData.coinCount || 0);
        setLastCheckInTimestamp(userData.lastCheckInTimestamp);
        setHasCheckedInToday(checkIfCheckedInToday(userData.lastCheckInTimestamp));
      }
    });
  };

  const handleEmojiClick = (emoji) => {
    setSelectedEmoji(emoji);
  };

  const handleSubmit = () => {
    if (selectedEmoji && currentUser && !hasCheckedInToday) {
      const db = getDatabase();
      const currentDate = new Date().toLocaleString();
      const userId = currentUser.uid;

      update(ref(db, `users/${userId}`), { coinCount: coinCount + 2 })
        .then(() => {
          const moodEntry = {
            mood: selectedEmoji,
            timestamp: currentDate
          };

          push(ref(db, `${userId}/moodEntries`), moodEntry)
            .then(() => {
              updateStreakInDatabase(userId); 
              navigate('/modal');
            });
        });
      
      update(ref(db, `users/${userId}`), { lastCheckInTimestamp: currentDate });
    } else {
      console.log("You already checked in today.");
    }
  };

  const updateStreakInDatabase = (userId) => {
    const db = getDatabase();
    const streakRef = ref(db, `users/${userId}/streakCount`);
    get(streakRef)
      .then((snapshot) => {
        let streak = snapshot.val() || 0;
        streak++; 
        update(ref(db, `users/${userId}`), { streakCount: streak })
          .then(() => {
            updateStreak(streak); 
          });
      });
  };

  const checkIfCheckedInToday = (timestamp) => {
    if (timestamp) {
      const today = new Date().toLocaleDateString();
      const lastCheckInDate = new Date(timestamp).toLocaleDateString();
      return today === lastCheckInDate;
    }
    return false;
  };

  return (
    <div className="checkin-body">
      <div className="flex-container-profile">
        <div className="checkin-card">
          <NavLink to="/home"><img className="xbtn" src="x.png" alt="close button"></img></NavLink>
          {hasCheckedInToday ? (
            <div>
              <img className="cheer-three" src="cheer3.gif" alt="giphy"></img>
              <p className="checkedin-already">Already checked in today! (woop woop)</p>
            </div>
          ) : (
            <div>
              <p className="checkin-time">Time to check in!</p>
              <p className="checkin-question">How are you feeling today?</p>
              <div className="emojis">
                <img className={`emoji ${selectedEmoji === 'frown' && 'selected'}`} src="frown.png" alt="profile pic" onClick={() => handleEmojiClick('frown')} />
                <img className={`emoji ${selectedEmoji === 'slightfrown' && 'selected'}`} src="slightfrown.png" alt="profile pic" onClick={() => handleEmojiClick('slightfrown')} />
                <img className={`emoji ${selectedEmoji === 'neutral' && 'selected'}`} src="neutral.png" alt="profile pic" onClick={() => handleEmojiClick('neutral')} />
                <img className={`emoji ${selectedEmoji === 'slightsmile' && 'selected'}`} src="slightsmile.png" alt="profile pic" onClick={() => handleEmojiClick('slightsmile')} />
                <img className={`emoji ${selectedEmoji === 'smile' && 'selected'}`} src="smile.png" alt="profile pic" onClick={() => handleEmojiClick('smile')} />
              </div>
              <button className="checkin-btn" onClick={handleSubmit}>Submit</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CheckIn;
