import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { NavLink } from 'react-router-dom';

function DiaryPage() {
  const [diaryEntries, setDiaryEntries] = useState([]);

  useEffect(() => {
    const auth = getAuth();
    const db = getDatabase();

    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const diaryEntriesRef = ref(db, `users/${userId}/diaryEntries`);
      onValue(diaryEntriesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const entries = Object.values(data);
          entries.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
          setDiaryEntries(entries);
        } else {
          setDiaryEntries([]);
        }
      });
    }
  }, []);

    const getImageSource = (tag) => {
        switch (tag) {
        case 'Sunny':
            return 'sunny.png';
        case 'Cloudy':
            return 'cloudy.png';
        case 'Rainy':
            return 'rainy2.png';
        case 'Snowy':
            return 'snow.png';
        case 'Windy':
            return 'windy2.png';
        case 'School':
            return 'school.png';
        case 'Work':
            return 'work.png';
        case 'Vacation':
            return 'vacation.png';
        case 'Travel':
            return 'travel.png';
        case 'Family':
            return 'family.png';
        case 'Friends':
            return 'friends.png';
        case 'Party':
            return 'party.png';
        case 'Call':
            return 'call.png';
        case 'Dating':
            return 'dating.png';
        case 'Games':
            return 'games.png';
        case 'Shopping':
            return 'shopping.png';
        case 'Photography':
            return 'photography.png';
        case 'Listening to Music':
            return 'listenmusic.png';
        case 'Playing Instrument':
            return 'playinginstrument.png';
        case 'Gardening':
            return 'gardening.png';
        case 'Baking':
            return 'baking.png';
        case 'Cooking':
            return 'cooking.png';
        case 'Arts & Crafts':
            return 'art & crafts.png';
        case 'Movies & TV':
            return 'moviestv.png';
        case 'Fitness':
            return 'health&fitness.png';
        case 'Sports':
            return 'sports.png';
        case 'Reading':
            return 'reading.png';
        case 'Writing':
            return 'writing.png';
        case 'Makeup':
            return 'makeup.png';
        default:
            return ''; 
        }
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        return formattedDate;
      };

  return (
    <div className="profile-body">
      <div className="flex-container-profile">
        <div className="diary-entries-card">
            <NavLink className="back-link" to="/profile"><p className="back-help2">← Back</p></NavLink>
            <h2 className="diarypage-text">Diary Entries</h2>
            <div>
                {diaryEntries.map((entry, index) => (
                <div key={index} className="each-entry">
                    <p className="diaryentrydate">Date of Entry: {formatDate(entry.timestamp)}</p>
                    <p className="tagtitle">Tags:</p>
                    <div className="each-tags">
                    {entry.tags.map((tag, idx) => (
                        <div key={idx}>
                            <img src={getImageSource(tag)} alt={tag} className="diarytag-img"/>
                            <span className="tagspan">{tag}</span>
                        </div>
                    ))}
                    </div>
                    {entry.description && (
                    <div>
                        <p className="tagtitle-two">Description:</p>
                        <p className="entrytext">{entry.description}</p>
                    </div>
                    )}
                </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}

export default DiaryPage;


