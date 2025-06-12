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
  const [previousDisplayName, setPreviousDisplayName] = useState('Enter Name');
  const [selectedAvatar, setSelectedAvatar] = useState(null); 
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [topTags, setTopTags] = useState([]);
  const [overallMoodCounts, setOverallMoodCounts] = useState({
    frown: 0,
    slightfrown: 0,
    neutral: 0,
    slightsmile: 0,
    smile: 0
  });
  const [diaryChartData, setDiaryChartData] = useState([]);

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
          setPreviousDisplayName(userData.displayName); 
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
    const auth = getAuth();
    const db = getDatabase();
  
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const diaryEntriesRef = ref(db, `users/${userId}/diaryEntries`);
  
      onValue(diaryEntriesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const entries = Object.values(data);
          const tagCounts = calculateTagCounts(entries);
          const sortedTags = sortTagsByCount(tagCounts);
  
          const topFiveTags = sortedTags.slice(0, 5);
          const bottomFiveTags = sortedTags
            .filter(tag => tag.count > 0)
            .slice(-5);
  
          const allPossibleTags = [
            'Sunny', 'Cloudy', 'Rainy', 'Snowy', 'Windy', 'Stormy', 'Foggy',
            'School', 'Work', 'Vacation', 'Travel',
            'Family', 'Friends', 'Party', 'Call', 'Text', 'Social Media', 'Dating',
            'Games', 'Shopping', 'Photography', 'Podcast', 'Listening to Music',
            'Singing', 'Playing Instrument', 'Chores', 'Cleaning', 'Gardening',
            'Baking', 'Cooking', 'Self Care', 'Arts & Crafts', 'Movies & TV',
            'Nap', 'Fitness', 'Sports', 'Pets', 'Reading', 'Writing', 'Makeup'
          ];
  
          const usedTags = Object.keys(tagCounts);
          const neverUsedTags = allPossibleTags.filter(tag => !usedTags.includes(tag));
  
          setTopTags(topFiveTags);
          setLeastTags(bottomFiveTags);
          setNeverTags(neverUsedTags);
        } else {
          setTopTags([]);
          setLeastTags([]);
          setNeverTags([]);
        }
      });
    }
  }, []);
  
  const [leastTags, setLeastTags] = useState([]);
  const [neverTags, setNeverTags] = useState([]);
  
  useEffect(() => {
    const ctx = document.getElementById('moodChart');
    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['😞', '🙁', '😐', '🙂', '😊'],
        datasets: [{
          label: 'Overall Mood Count',
          data: [overallMoodCounts.frown, overallMoodCounts.slightfrown, overallMoodCounts.neutral, overallMoodCounts.slightsmile, overallMoodCounts.smile],
          backgroundColor: [
            '#E6D9F8',  // Light lavender
            '#D5C1F5',  // Soft purple
            '#C2A9F1',  // Medium purple
            '#A982EB',  // Deeper purple
            '#8C5FE0'   // Rich purple
          ],
          borderColor: [
            '#D3C6EC',
            '#C3AFE9',
            '#B399E4',
            '#9872DD',
            '#7648D0'
          ],
          borderWidth: 1,
          borderRadius: {
            topLeft: 4,
            topRight: 4
          },
        }]            
      },
      options: {
        scales: {
          y: { beginAtZero: true, precision: 0, stepSize: 1 }
        }
      }
    });
    return () => chart.destroy();
  }, [overallMoodCounts]);

  const countEntriesByMonth = (entries) => {
    const now = new Date();
    const result = [];
  
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const year = date.getFullYear();
      const month = (date.getMonth()).toString().padStart(2, '0'); 
      const monthKey = `${year}-${(parseInt(month) + 1).toString().padStart(2, '0')}`;
  
      const count = entries.filter(entry => {
        const entryDate = new Date(entry.timestamp);
        const entryYear = entryDate.getFullYear();
        const entryMonth = entryDate.getMonth(); 
        return entryYear === year && entryMonth === date.getMonth();
      }).length;
  
      result.push({
        month: date.toLocaleString('default', { month: 'short' }), // e.g., "Jun"
        count
      });
    }
  
    return result;
  };

  useEffect(() => {
    const auth = getAuth();
    const db = getDatabase();
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const diaryRef = ref(db, `users/${userId}/diaryEntries`);
      onValue(diaryRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const entries = Object.values(data);
          const monthlyCounts = getLastSixMonthsCounts(entries);
          setDiaryChartData(monthlyCounts);
        }
      });
    }
  }, []);

  useEffect(() => {
    const ctx = document.getElementById('diaryChart');
    if (!ctx || !diaryChartData || diaryChartData.length === 0) return;
  
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: diaryChartData.map(d => d.label),
        datasets: [{
          label: 'Number of Diary Entries per Month',
          data: diaryChartData.map(d => d.count),
          borderColor: '#A982EB',             
          backgroundColor: 'rgba(169, 130, 235, 0.3)', 
          tension: 0.3,
          pointBackgroundColor: '#8C5FE0',    
          pointBorderColor: '#8C5FE0',
          pointRadius: 4,
          pointHoverRadius: 6,
          fill: true
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true, precision: 0, stepSize: 1 }
        }
      }
    });
  
    return () => chart.destroy();
  }, [diaryChartData]);  

  const getLastSixMonthsCounts = (entries) => {
    const today = new Date();
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const label = date.toLocaleString('default', { month: 'short' }) + ' ' + date.getFullYear();
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const count = entries.filter(entry => entry.timestamp.startsWith(key)).length;
      months.push({ label, count });
    }
    return months;
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  const mapMoodToEmoji = (mood) => {
    switch (mood) {
      case 'frown': return '😞';
      case 'slightfrown': return '🙁';
      case 'neutral': return '😐';
      case 'slightsmile': return '🙂';
      case 'smile': return '😊';
      default: return '';
    }
  };

  const handleChangeDisplayName = (newName) => {
    if (newName) {
      setDisplayName(newName);
      const auth = getAuth();
      const db = getDatabase();
      const userId = auth.currentUser.uid;
      const userRef = ref(db, `${userId}/userData`);
      set(userRef, { displayName: newName });
    } else {
      setDisplayName(previousDisplayName);
    }
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

  const calculateTagCounts = (entries) => {
    const tagCounts = {};
    if (Array.isArray(entries)) {
      entries.forEach(entry => {
        if (Array.isArray(entry.tags)) {
          entry.tags.forEach(tag => {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1;
          });
        }
      });
    }
    return tagCounts;
  };

  const sortTagsByCount = (tagCounts) => {
    return Object.keys(tagCounts).sort((a, b) => tagCounts[b] - tagCounts[a]).map(tag => ({ tag, count: tagCounts[tag] }));
  };

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
    case 'Stormy':
        return 'stormy.png';
    case 'Foggy':
        return 'foggy.png';
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
        return 'friendss.png';
    case 'Party':
        return 'party.png';
    case 'Call':
        return 'call.png';
    case 'Text':
        return 'friends.png';
    case 'Social Media':
        return 'socialmedia.png';
    case 'Dating':
        return 'dating.png';
    case 'Games':
        return 'games.png';
    case 'Shopping':
        return 'shopping.png';
    case 'Photography':
        return 'photography.png';
    case 'Podcast':
        return 'podcast.png';
    case 'Listening to Music':
        return 'listenmusic.png';
    case 'Singing':
        return 'singing.png';
    case 'Playing Instrument':
        return 'playinginstrument.png';
    case 'Chores':
        return 'chores.png';
    case 'Cleaning':
        return 'cleaning.png';
    case 'Gardening':
        return 'gardening.png';
    case 'Baking':
        return 'baking.png';
    case 'Cooking':
        return 'cooking.png';
    case 'Self Care':
        return 'selfcare.png';
    case 'Arts & Crafts':
        return 'art & crafts.png';
    case 'Movies & TV':
        return 'moviestv.png';
    case 'Nap':
        return 'nap.png';
    case 'Fitness':
        return 'health&fitness.png';
    case 'Sports':
        return 'sports.png';
    case 'Pets':
        return 'pets.png';
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

    return (
      <div className="profile-body">
        <div className="flex-container-profile">
          <div className="profile-card">
            <LogoutButton />
            <div className="profile-divv">
              <img
                className="profile-pic"
                src={selectedAvatar || 'profilepic.png'}
                alt="profile pic"
                onClick={() => setShowAvatarModal(true)}
              />
              <p className="profile-name">{displayName}</p>
              {userEmail && <p className="profile-email">{userEmail}</p>}
              <button
                className="change-pass"
                onClick={() => handleChangeDisplayName(prompt('Enter new display name'))}
              >
                Change Name
              </button>
              <AvatarSelection
                show={showAvatarModal}
                handleClose={() => setShowAvatarModal(false)}
                onSelectAvatar={handleAvatarChange}
              />
            </div>

            <p className="insights-heading">✨ Insights Dashboard ✨</p>
            <div className="profile-layout">
              <nav className="profile-sidebar">
                <ul>
                  <p className="navhead">🔍 Navigate to...</p>
                  <li><a href="#mood-insights">• Mood Insights</a></li>
                  <li><a href="#diary-insights">• Diary Insights</a></li>
                  <li><a href="#view-entries">• View All Diary Entries</a></li>
                </ul>
              </nav>
    
              <div className="profile-card-content">
                <div className="mood-card" id="mood-insights">
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
                    <p className="chart-text">Total Count per Mood to Date</p>
                    <p className="chart-desc">
                      This chart shows how often you've selected each mood in your daily check ins since you started using the app.
                    </p>
                    <canvas id="moodChart" height="200"></canvas>
                  </div>
                </div>
    
                <div className="bar-card" id="diary-insights">
                  <div className="bar-chart">
                    <p className="chart-text">Number of Diary Entries per Month</p>
                    <p className="chart-desc">
                      This chart displays the number of diary entries you've made each month over the past six months.
                    </p>
                    <canvas id="diaryChart" height="200"></canvas>
                  </div>
                </div>
    
                <div className="tagz-card">
                  <h2 className="tagz-summary">Diary Tag Insights</h2>
                  <h3 className="tagz-subheading">Most Frequently Recorded Tags</h3>
                  <div className="top-tags-section">
                    {topTags.map((tag, index) => (
                      <div key={index} className="top-tag">
                        <img src={getImageSource(tag.tag)} alt={tag.tag} className="diarytag-img" />
                        <span>{tag.tag}</span>
                        <span style={{ marginLeft: '4px' }}>(x{tag.count})</span>
                      </div>
                    ))}
                  </div>
    
                  <h3 className="tagz-subhead">Least Frequently Recorded Tags</h3>
                  <div className="top-tags-section">
                    {leastTags.map((tag, index) => (
                      <div key={index} className="top-tag">
                        <img src={getImageSource(tag.tag)} alt={tag.tag} className="diarytag-img" />
                        <span>{tag.tag}</span>
                        <span style={{ marginLeft: '4px' }}>(x{tag.count})</span>
                      </div>
                    ))}
                  </div>
    
                  <h3 className="tagz-subhead">Tags You Haven't Recorded Yet</h3>
                  <div className="top-tags-section">
                    {neverTags.map((tag, index) => (
                      <div key={index} className="top-tag">
                        <img src={getImageSource(tag)} alt={tag} className="diarytag-img" />
                        <span>{tag}</span>
                      </div>
                    ))}
                  </div>
                </div>
    
                <NavLink to="/diaryentries" style={{ textDecoration: 'none' }}>
                  <div className="diary-ent-card" id="view-entries">
                    <p className="diary-ent-text">View All Diary Entries</p>
                  </div>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

export default Profile;






// import React, { useEffect, useState } from 'react';
// import { getDatabase, ref, onValue, set } from 'firebase/database';
// import { getAuth } from 'firebase/auth';
// import LogoutButton from './logout'; 
// import AvatarSelection from './avatars'; 
// import { NavLink } from 'react-router-dom';
// import Chart from 'chart.js/auto'; 

// function Profile() {
//   const [moodEntries, setMoodEntries] = useState([]);
//   const [userEmail, setUserEmail] = useState(null);
//   const [displayName, setDisplayName] = useState('Enter Name'); 
//   const [previousDisplayName, setPreviousDisplayName] = useState('Enter Name');
//   const [selectedAvatar, setSelectedAvatar] = useState(null); 
//   const [showAvatarModal, setShowAvatarModal] = useState(false);
//   const [topTags, setTopTags] = useState([]);
//   const [diaryChartData, setDiaryChartData] = useState([]);
//   const [overallMoodCounts, setOverallMoodCounts] = useState({
//     frown: 0,
//     slightfrown: 0,
//     neutral: 0,
//     slightsmile: 0,
//     smile: 0
//   });

//   const countOverallMoodOccurrences = (entries) => {
//     const counts = {
//       frown: 0,
//       slightfrown: 0,
//       neutral: 0,
//       slightsmile: 0,
//       smile: 0
//     };
//     entries.forEach(entry => {
//       counts[entry.mood] += 1;
//     });
//     return counts;
//   };

//   useEffect(() => {
//     const auth = getAuth();
//     const db = getDatabase();
//     if (auth.currentUser) {
//       const userId = auth.currentUser.uid;
//       const moodRef = ref(db, `${userId}/moodEntries`);
//       const userRef = ref(db, `${userId}/userData`);
//       const avatarRef = ref(db, `${userId}/userAvatar`);
//       setUserEmail(auth.currentUser.email);
//       onValue(userRef, (snapshot) => {
//         const userData = snapshot.val();
//         if (userData && userData.displayName) {
//           setDisplayName(userData.displayName);
//           setPreviousDisplayName(userData.displayName); 
//         }
//       });

//       onValue(avatarRef, (snapshot) => {
//         const avatarData = snapshot.val();
//         if (avatarData) {
//           setSelectedAvatar(avatarData);
//         }
//       });
      
//       onValue(moodRef, (snapshot) => {
//         const data = snapshot.val();
//         console.log("Fetched mood entries:", data);  
//         if (data) {
//           const entries = Object.values(data);
//           setMoodEntries(entries);
//           const overallCounts = countOverallMoodOccurrences(entries);
//           setOverallMoodCounts(overallCounts);
//         } else {
//           setMoodEntries([]);  // Ensure this is an empty array if nothing is fetched
//         }
//       });
//     }
//   }, []);

//   useEffect(() => {
//     // for my chartjs!
//     const ctx = document.getElementById('moodChart');
//     const chart = new Chart(ctx, {
//       type: 'bar',
//       data: {
//         labels: ['😞', '🙁', '😐', '🙂', '😊'],
//         datasets: [{
//           label: 'Overall Mood Counts',
//           data: [overallMoodCounts.frown, overallMoodCounts.slightfrown, overallMoodCounts.neutral, overallMoodCounts.slightsmile, overallMoodCounts.smile],
//           backgroundColor: [
//             'rgba(255, 99, 132, 0.2)',
//             'rgba(255, 159, 64, 0.2)',
//             'rgba(255, 205, 86, 0.2)',
//             'rgba(75, 192, 192, 0.2)',
//             'rgba(54, 162, 235, 0.2)',
//           ],
//           borderColor: [
//             'rgba(255, 99, 132, 1)',
//             'rgba(255, 159, 64, 1)',
//             'rgba(255, 205, 86, 1)',
//             'rgba(75, 192, 192, 1)',
//             'rgba(54, 162, 235, 1)',
//           ],
//           borderWidth: 1
//         }]
//       },
//       options: {
//         scales: {
//           y: {
//             beginAtZero: true,
//             precision: 0, 
//             stepSize: 1 
//           }
//         }
//       }
//     });
    
//     return () => {
//       chart.destroy();
//     };
//   }, [overallMoodCounts]);

//   const getLastSixMonthsLabels = () => {
//     // for my diary entries line chart!
//     const labels = [];
//     const currentDate = new Date();
  
//     for (let i = 5; i >= 0; i--) {
//       const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
//       const label = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
//       labels.push({ label, year: date.getFullYear(), month: date.getMonth() + 1 });
//     }
  
//     return labels;
//   };
  
//   const countEntriesByMonth = (entries) => {
//     const counts = {};
//     const months = getLastSixMonthsLabels();
  
//     months.forEach(({ year, month }) => {
//       const key = `${year}-${String(month).padStart(2, '0')}`;
//       counts[key] = 0;
//     });
  
//     entries.forEach((entry) => {
//       const date = new Date(entry.timestamp);
//       const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
//       if (key in counts) counts[key]++;
//     });
  
//     return months.map(({ label, year, month }) => {
//       const key = `${year}-${String(month).padStart(2, '0')}`;
//       return { label, count: counts[key] || 0 };
//     });
//   };  

//   useEffect(() => {
//     const auth = getAuth();
//     const db = getDatabase();
//     if (auth.currentUser) {
//       const userId = auth.currentUser.uid;
//       const diaryRef = ref(db, `users/${userId}/diaryEntries`);
//       onValue(diaryRef, (snapshot) => {
//         const data = snapshot.val();
//         if (data) {
//           const entries = Object.values(data);
//           const monthlyCounts = countEntriesByMonth(entries);
//           setDiaryChartData(monthlyCounts);
//         }
//       });
//     }
//   }, []);

//   useEffect(() => {
//     const ctx = document.getElementById('diaryLineChart');
  
//     const chart = new Chart(ctx, {
//       type: 'line',
//       data: {
//         labels: diaryChartData.map(d => d.label),
//         datasets: [{
//           label: 'Diary Entries Per Month',
//           data: diaryChartData.map(d => d.count),
//           fill: false,
//           borderColor: 'rgba(75, 192, 192, 1)',
//           tension: 0.2
//         }]
//       },
//       options: {
//         responsive: true,
//         scales: {
//           y: {
//             beginAtZero: true,
//             precision: 0,
//             stepSize: 1
//           }
//         }
//       }
//     });
  
//     return () => chart.destroy();
//   }, [diaryChartData]);  

//   const formatDate = (timestamp) => {
//     const date = new Date(timestamp);
//     const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
//     return formattedDate;
//   };
    
//   const mapMoodToEmoji = (mood) => {
//     switch (mood) {
//       case 'frown':
//         return '😞';
//       case 'slightfrown':
//         return '🙁';
//       case 'neutral':
//         return '😐';
//       case 'slightsmile':
//         return '🙂';
//       case 'smile':
//         return '😊';
//       default:
//         return '';
//     }
//   };

//   const handleChangeDisplayName = (newName) => {
//     if (newName) { 
//       setDisplayName(newName);
//       const auth = getAuth();
//       const db = getDatabase();
//       const userId = auth.currentUser.uid;
//       const userRef = ref(db, `${userId}/userData`);
//       set(userRef, { displayName: newName });
//     } else { // if the user decides not to change (i.e. if they cancel)
//       setDisplayName(previousDisplayName); 
//     }
//   };

//   const handleAvatarChange = (newAvatar) => {
//     setSelectedAvatar(newAvatar);
//     setShowAvatarModal(false);
//     const auth = getAuth();
//     const db = getDatabase();
//     const userId = auth.currentUser.uid;
//     const avatarRef = ref(db, `${userId}/userAvatar`);
//     set(avatarRef, newAvatar);
//   };

//   useEffect(() => {
//     const auth = getAuth();
//     const db = getDatabase();

//     if (auth.currentUser) {
//       const userId = auth.currentUser.uid;
//       const diaryEntriesRef = ref(db, `users/${userId}/diaryEntries`);
//       onValue(diaryEntriesRef, (snapshot) => {
//         const data = snapshot.val();
//         if (data) {
//           const entries = Object.values(data);
//           const tagCounts = calculateTagCounts(entries);
//           const sortedTags = sortTagsByCount(tagCounts);
//           const topThreeTags = sortedTags.slice(0, 3);
//           setTopTags(topThreeTags);
//         } else {
//           setTopTags([]);
//         }
//       });
//     }
//   }, []);

//   const calculateTagCounts = (entries) => {
//     const tagCounts = {};
//     if (Array.isArray(entries)) {
//       entries.forEach((entry) => {
//         if (entry.tags && Array.isArray(entry.tags)) {
//           entry.tags.forEach((tag) => {
//             tagCounts[tag] = (tagCounts[tag] || 0) + 1;
//           });
//         }
//       });
//     }
//     return tagCounts;
//   };
  
//   const sortTagsByCount = (tagCounts) => {
//     return Object.keys(tagCounts).sort((a, b) => tagCounts[b] - tagCounts[a]).map(tag => ({ tag, count: tagCounts[tag] }));
//   };

//   const getImageSource = (tag) => {
//     switch (tag) {
//     case 'Sunny':
//         return 'sunny.png';
//     case 'Cloudy':
//         return 'cloudy.png';
//     case 'Rainy':
//         return 'rainy2.png';
//     case 'Snowy':
//         return 'snow.png';
//     case 'Windy':
//         return 'windy2.png';
//     case 'School':
//         return 'school.png';
//     case 'Work':
//         return 'work.png';
//     case 'Vacation':
//         return 'vacation.png';
//     case 'Travel':
//         return 'travel.png';
//     case 'Family':
//         return 'family.png';
//     case 'Friends':
//         return 'friends.png';
//     case 'Party':
//         return 'party.png';
//     case 'Call':
//         return 'call.png';
//     case 'Dating':
//         return 'dating.png';
//     case 'Games':
//         return 'games.png';
//     case 'Shopping':
//         return 'shopping.png';
//     case 'Photography':
//         return 'photography.png';
//     case 'Listening to Music':
//         return 'listenmusic.png';
//     case 'Playing Instrument':
//         return 'playinginstrument.png';
//     case 'Gardening':
//         return 'gardening.png';
//     case 'Baking':
//         return 'baking.png';
//     case 'Cooking':
//         return 'cooking.png';
//     case 'Arts & Crafts':
//         return 'art & crafts.png';
//     case 'Movies & TV':
//         return 'moviestv.png';
//     case 'Fitness':
//         return 'health&fitness.png';
//     case 'Sports':
//         return 'sports.png';
//     case 'Reading':
//         return 'reading.png';
//     case 'Writing':
//         return 'writing.png';
//     case 'Makeup':
//         return 'makeup.png';
//     default:
//         return ''; 
//     }
// };

//   return (
//     <div className="profile-body">
//       <div className="flex-container-profile">
//         <div className="profile-card">   
//         <LogoutButton />
//         <div className="profile-divv">     
//           <img
//             className="profile-pic"
//             src={selectedAvatar || 'profilepic.png'} 
//             alt="profile pic"
//             onClick={() => setShowAvatarModal(true)} 
//           />  
//           <p className="profile-name">{displayName}</p> 
//           {userEmail && <p className="profile-email">{userEmail}</p>} 
//           <button className="change-pass" onClick={() => handleChangeDisplayName(prompt('Enter new display name'))}>
//               Change Name
//           </button>
//           <AvatarSelection 
//             show={showAvatarModal} 
//             handleClose={() => setShowAvatarModal(false)} 
//             onSelectAvatar={handleAvatarChange} 
//           />
//           <div className="mood-card">
//             <p className="mood-summary">Weekly Mood Summary</p>
//             <ul className="mood-summary-list">
//               {moodEntries.slice(-7).map((entry, index) => (
//                 <li key={index}>
//                   <span className="mood-emoji">{mapMoodToEmoji(entry.mood)}</span>
//                   <span className="mood-date">{formatDate(entry.timestamp)}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//           </div>
//           <div className="bar-card">
//           <div className="bar-chart">
//             <p className="chart-text">All-time Mood Summary</p>
//             <canvas id="moodChart" height="200"></canvas>
//           </div></div>
//           <div className="line-chart-section">
//   <p className="chart-text">Monthly Diary Entry History</p>
//   <canvas id="diaryLineChart" height="200"></canvas>
// </div>

//           <div className="tagz-card">
//             <h2 className="tagz-summary">Most Recorded Diary Tags</h2>
//             <div className="top-tags-section">
//               {topTags.map((tag, index) => (
//                 <div key={index} className="top-tag">
//                   <img src={getImageSource(tag.tag)} alt={tag.tag} className="diarytag-img" />
//                   <span>{tag.tag}</span>
//                   <span style={{ marginLeft: '4px' }}>(x{tag.count})</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <NavLink to="/diaryentries" style={{ textDecoration: 'none'}}><div className="diary-ent-card">
//             <p className="diary-ent-text">View All Diary Entries</p>
//           </div></NavLink>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Profile;
