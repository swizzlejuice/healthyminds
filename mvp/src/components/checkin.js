import React, { useState } from 'react';
import { getDatabase, ref, push, serverTimestamp } from 'firebase/database'; // Import the database service
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

function CheckIn() {
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [submittedEmoji, setSubmittedEmoji] = useState(null);
  const navigate = useNavigate(); 

  // Function to handle click on emoji
  const handleEmojiClick = (emoji) => {
    setSelectedEmoji(emoji);
  };

  const handleSubmit = () => {
    if (selectedEmoji !== null) {
      const db = getDatabase();
      // Get the current datetime
      const currentDate = new Date().toLocaleString();
      push(ref(db, 'user_moods'), {
        mood: selectedEmoji,
        timestamp: currentDate 
      }).then(() => {
        setSubmittedEmoji(selectedEmoji);
        navigate('/home');
      }).catch((error) => {
        console.error("Error adding document: ", error);
      });
    }
  };

  return (
    <div className="checkin-body">
      <div className="flex-container-profile">
        <div className="checkin-card">
          <NavLink to="/home"><img className="xbtn" src="x.png" alt="close button"></img></NavLink>
          <p className="checkin-time">Time to check in!</p>
          <p className="checkin-question">How are you feeling today?</p>
          <div className="emojis">
            {/* Make emojis clickable */}
            <img className={`emoji ${selectedEmoji === 'frown' && 'selected'}`} src="frown.png" alt="profile pic" onClick={() => handleEmojiClick('frown')} />
            <img className={`emoji ${selectedEmoji === 'slightfrown' && 'selected'}`} src="slightfrown.png" alt="profile pic" onClick={() => handleEmojiClick('slightfrown')} />
            <img className={`emoji ${selectedEmoji === 'neutral' && 'selected'}`} src="neutral.png" alt="profile pic" onClick={() => handleEmojiClick('neutral')} />
            <img className={`emoji ${selectedEmoji === 'slightsmile' && 'selected'}`} src="slightsmile.png" alt="profile pic" onClick={() => handleEmojiClick('slightsmile')} />
            <img className={`emoji ${selectedEmoji === 'smile' && 'selected'}`} src="smile.png" alt="profile pic" onClick={() => handleEmojiClick('smile')} />
          </div>
          <button className="checkin-btn" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default CheckIn;



