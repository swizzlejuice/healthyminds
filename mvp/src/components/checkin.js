/*import React from 'react';

function CheckIn() {

  return (
    <div className="checkin-body">
      <div className="flex-container-profile">
        <div className="checkin-card">
          <p className="checkin-time">Time to check in!</p>
          <p className="checkin-question">How are you feeling today?</p>
          <div className="emojis">
            <img className="emoji" src="frown.png" alt="profile pic" />
            <img className="emoji" src="slightfrown.png" alt="profile pic" />
            <img className="emoji" src="neutral.png" alt="profile pic" />
            <img className="emoji" src="slightsmile.png" alt="profile pic" />
            <img className="emoji" src="smile.png" alt="profile pic" />
          </div>

          <button className="checkin-btn">submit</button>
          <p className="back-link"> Back </p>
        </div>
      </div>
    </div>
  );
}

export default CheckIn;*/

/*import React, { useState } from 'react';
import { getDatabase, ref, push, serverTimestamp } from 'firebase/database'; // Import the database service

function CheckIn() {
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  // Function to handle click on emoji
  const handleEmojiClick = (emoji) => {
    setSelectedEmoji(emoji);

    // Get a reference to the database service
    const db = getDatabase();

    // Save the selected emoji to Firebase
    push(ref(db, 'user_moods'), {
      mood: emoji,
      timestamp: serverTimestamp() // Include timestamp for reference
    });
  };

  return (
    <div className="checkin-body">
      <div className="flex-container-profile">
        <div className="checkin-card">
          <p className="checkin-time">Time to check in!</p>
          <p className="checkin-question">How are you feeling today?</p>
          <div className="emojis">
            <img className="emoji" src="frown.png" alt="profile pic" onClick={() => handleEmojiClick('frown')} />
            <img className="emoji" src="slightfrown.png" alt="profile pic" onClick={() => handleEmojiClick('slightfrown')} />
            <img className="emoji" src="neutral.png" alt="profile pic" onClick={() => handleEmojiClick('neutral')} />
            <img className="emoji" src="slightsmile.png" alt="profile pic" onClick={() => handleEmojiClick('slightsmile')} />
            <img className="emoji" src="smile.png" alt="profile pic" onClick={() => handleEmojiClick('smile')} />
          </div>

          <button className="checkin-btn">submit</button>
          <p className="back-link"> Back </p>
        </div>
      </div>
    </div>
  );
}

export default CheckIn;*/

import React, { useState } from 'react';
import { getDatabase, ref, push, serverTimestamp } from 'firebase/database'; // Import the database service
import { useNavigate } from 'react-router-dom';

function CheckIn() {
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [submittedEmoji, setSubmittedEmoji] = useState(null);
  const navigate = useNavigate(); 

  // Function to handle click on emoji
  const handleEmojiClick = (emoji) => {
    setSelectedEmoji(emoji);
  };

  // Function to handle submit button click
  const handleSubmit = () => {
    if (selectedEmoji !== null) {
      // Get a reference to the database service
      const db = getDatabase();

      // Save the selected emoji to Firebase
      push(ref(db, 'user_moods'), {
        mood: selectedEmoji,
        timestamp: serverTimestamp() // Include timestamp for reference
      }).then(() => {
        // Set submitted emoji
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

          <p className="back-link"> Back </p>

    
        </div>
      </div>
    </div>
  );
}

export default CheckIn;



