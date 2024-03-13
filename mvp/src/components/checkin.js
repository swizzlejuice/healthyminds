import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, push, update, get } from 'firebase/database'; 
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

function CheckIn() {
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [submittedEmoji, setSubmittedEmoji] = useState(null);
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
        fetchCoinCount(user.uid); 
        fetchLastCheckInTimestamp(user.uid);
      } else {
        setCurrentUser(null);
      }
    });
  }, []);

  const fetchLastCheckInTimestamp = (userId) => {
    const db = getDatabase();
    const lastCheckInRef = ref(db, `users/${userId}/lastCheckInTimestamp`);

    get(lastCheckInRef).then((snapshot) => {
      const timestamp = snapshot.val();
      setLastCheckInTimestamp(timestamp);
      setHasCheckedInToday(checkIfCheckedInToday(timestamp)); 
    }).catch((error) => {
      console.error("Error fetching last check-in timestamp: ", error);
    });
  };

  const fetchCoinCount = (userId) => {
    const db = getDatabase();
    const coinCountRef = ref(db, `users/${userId}/coinCount`);

    get(coinCountRef).then((snapshot) => {
      const count = snapshot.val() || 0;
      setCoinCount(count);
    }).catch((error) => {
      console.error("Error fetching coin count: ", error);
    });
  };

  const handleEmojiClick = (emoji) => {
    setSelectedEmoji(emoji);
  };

  const handleSubmit = () => {
    if (selectedEmoji !== null && currentUser !== null && !hasCheckedInToday) {
      const db = getDatabase();
      const currentDate = new Date().toLocaleString();
      const userId = currentUser.uid; 

      update(ref(db, `users/${userId}`), { coinCount: coinCount + 5 })
        .then(() => {
          const moodEntry = {
            mood: selectedEmoji,
            timestamp: currentDate 
          };

          push(ref(db, `${userId}/moodEntries`), moodEntry)
            .then(() => {
              setSubmittedEmoji(selectedEmoji);
              navigate('/modal'); 
            })
            .catch((error) => {
              console.error("Error adding mood entry: ", error);
            });
        })
        .catch((error) => {
          console.error("Error updating coin count: ", error);
        });

      update(ref(db, `users/${userId}`), { lastCheckInTimestamp: currentDate })
        .catch((error) => {
          console.error("Error updating last check-in timestamp: ", error);
        });
    } else {
      console.log("You have already checked in today.");
    }
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
