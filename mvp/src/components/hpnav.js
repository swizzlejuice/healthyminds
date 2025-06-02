// import React, { useEffect, useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import { getDatabase, ref, onValue } from 'firebase/database';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import LogoutButton from './logout';

// export function HappyPawsNav({ updateStreak, backgroundImage }) {
//   const [avatar, setAvatar] = useState('profileimage.png');
//   const [coinCount, setCoinCount] = useState(0);
//   const [streakCount, setStreakCount] = useState(0);
//   const [coinCountUpdated, setCoinCountUpdated] = useState(false);
//   const [streakUpdated, setStreakUpdated] = useState(false);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const auth = getAuth();
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       if (currentUser) {
//         fetchData(currentUser);
//       } else {
//         setAvatar('profileimage.png');
//         setCoinCount(0);
//         setStreakCount(0);
//       }
//     });
//     return () => unsubscribe();
//   }, []);

//   const fetchData = (user) => {
//     const db = getDatabase();
//     const userId = user.uid;
//     const coinCountRef = ref(db, `users/${userId}/coinCount`);
//     const streakRef = ref(db, `users/${userId}/streakCount`);
//     const avatarRef = ref(db, `${userId}/userAvatar`);

//     onValue(coinCountRef, (snapshot) => {
//       const count = snapshot.val() || 0;
//       setCoinCount(count);
//       setCoinCountUpdated(true);
//       setTimeout(() => {
//         setCoinCountUpdated(false);
//       }, 1000);
//     });

//     onValue(streakRef, (snapshot) => {
//       const streak = snapshot.val() || 0;
//       setStreakCount(streak);
//       setStreakUpdated(true);
//       setTimeout(() => {
//         setStreakUpdated(false);
//       }, 500);
//     });

//     onValue(avatarRef, (snapshot) => {
//       const avatarUrl = snapshot.val();
//       setAvatar(avatarUrl || 'profileimage.png');
//     });
//   };

//   return (
//     <header>
//       <h1>
//         {user ? (
//           <NavLink to="/home">
//             <img className="logo-img" src="Logo.png"></img>
//           </NavLink>
//         ) : (
//           <span><img className="logo-img" src="Logo.png"></img></span>
//         )}
//       </h1>

//       <nav>
//         <ul>
//           <li>
//             {user ? (
//               <NavLink to="/clothing" style={{ color: '#f6f3eb', textDecoration: 'none' }}>
//                 <img className="store" src="store.png" alt="store icon" />
//                 Store
//               </NavLink>
//             ) : (
//               <span style={{ color: '#f6f3eb', opacity: 0.5 }}>
//                 <img className="store" src="store.png" alt="store icon" />
//                 Store
//               </span>
//             )}
//           </li>
//           <li>
//             {user ? (
//               <NavLink to="/diary" style={{ color: '#f6f3eb', textDecoration: 'none' }}>
//                 <img className="diary" src="bluediary.png" alt="diary icon" />
//                 Diary
//               </NavLink>
//             ) : (
//               <span style={{ color: '#f6f3eb', opacity: 0.5 }}>
//                 <img className="diary" src="bluediary.png" alt="diary icon" />
//                 Diary
//               </span>
//             )}
//           </li>
//           <li>
//             {user ? (
//               <NavLink to="/checkin" style={{ color: '#f6f3eb', textDecoration: 'none' }}>
//                 <img className="check-smile" src="checkinimg.png" alt="checkin icon" />
//                 Check in
//               </NavLink>
//             ) : (
//               <span style={{ color: '#f6f3eb', opacity: 0.5 }}>
//                 <img className="fire" src="checkinimg.png" alt="checkin icon" />
//                 Check in
//               </span>
//             )}
//           </li>
//           <li>
//             <img className={`coins ${coinCountUpdated ? 'bounce' : ''}`} src="coins.png" alt="coins icon" />
//             {coinCount}{' '}
//           </li>
//           <li>
//             <img
//               className="fire"
//               src="fire.png"
//               alt="fire icon"
//               style={{ transform: streakUpdated ? 'scale(1.5)' : 'scale(1)', transition: 'transform 0.8s ease-in-out' }}
//             />
//             {streakCount}{' '}
//           </li>
//           <li>
//             {user ? (
//               <NavLink to="/profile">
//                 <img className="profileimage" src={avatar} alt="profile icon" />
//               </NavLink>
//             ) : (
//               <img className="profileimage" src={avatar} alt="profile icon" style={{ opacity: 0.5 }} />
//             )}
//           </li>
//         </ul>
//       </nav>
//     </header>
//   );
// }

// export default HappyPawsNav;



import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export function HappyPawsNav() {
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState('profileimage.png');
  const [coinCount, setCoinCount] = useState(0);
  const [displayedCoinCount, setDisplayedCoinCount] = useState(0);
  const [flipTrigger, setFlipTrigger] = useState(0);
  const [coinCountUpdated, setCoinCountUpdated] = useState(false);
  const [streakCount, setStreakCount] = useState(0);
  const [streakUpdated, setStreakUpdated] = useState(false);
  const previousCoinCountRef = useRef(0); // Stores previous coin count

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchData(currentUser.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchData = (userId) => {
    const db = getDatabase();

    const coinRef = ref(db, `users/${userId}/coinCount`);
    const streakRef = ref(db, `users/${userId}/streakCount`);
    const avatarRef = ref(db, `${userId}/userAvatar`);

    onValue(coinRef, (snapshot) => {
      const newCount = snapshot.val() || 0;
      const prevCount = previousCoinCountRef.current;

      if (newCount > prevCount) {
        animateCoinCount(prevCount, newCount);
        setCoinCountUpdated(true);
        setTimeout(() => setCoinCountUpdated(false), 800);
      } else {
        setDisplayedCoinCount(newCount); // fallback
      }

      setCoinCount(newCount);
      previousCoinCountRef.current = newCount; // update ref
    });

    onValue(streakRef, (snapshot) => {
      const streak = snapshot.val() || 0;
      setStreakCount(streak);
      setStreakUpdated(true);
      setTimeout(() => setStreakUpdated(false), 500);
    });

    onValue(avatarRef, (snapshot) => {
      const avatarUrl = snapshot.val();
      setAvatar(avatarUrl || 'profileimage.png');
    });
  };

  const animateCoinCount = (from, to) => {
    const duration = 1000;
    const startTime = performance.now();

    const easeOutQuad = (t) => t * (2 - t);

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuad(progress);

      const currentValue = Math.round(from + (to - from) * eased);
      setDisplayedCoinCount(currentValue);
      setFlipTrigger(Date.now()); 

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  return (
    <header>
      <h1>
        <NavLink to="/home">
          <img className="logo-img" src="Logo.png" alt="logo" />
        </NavLink>
      </h1>

      <nav>
        <ul>
          <li>
            <NavLink to="/clothing" style={{ color: '#f6f3eb', textDecoration: 'none' }}><img className="store" src="store.png" alt="store" />Store</NavLink>
          </li>
          <li>
            <NavLink to="/diary" style={{ color: '#f6f3eb', textDecoration: 'none' }}><img className="diary" src="bluediary.png" alt="diary" />Diary</NavLink>
          </li>
          <li>
            <NavLink to="/checkin" style={{ color: '#f6f3eb', textDecoration: 'none' }}><img className="check-smile" src="checkinimg.png" alt="checkin" />Check in</NavLink>
          </li>
          <li>
            <img className={`coins ${coinCountUpdated ? 'bounce' : ''}`} src="coins.png" alt="coin icon" />
            <span key={flipTrigger} className="coin-number">{displayedCoinCount}</span>
          </li>
          <li>
            <img
              className="fire"
              src="fire.png"
              alt="fire icon"
              style={{
                transform: streakUpdated ? 'scale(1.5)' : 'scale(1)',
                transition: 'transform 0.8s ease-in-out'
              }}
            />
            {streakCount}
          </li>
          <li>
            <NavLink to="/profile">
              <img className="profileimage" src={avatar} alt="profile" />
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default HappyPawsNav;

