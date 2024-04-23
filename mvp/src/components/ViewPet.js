import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { getDatabase, ref, onValue, set, get } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { usePetImage } from './PetImageContext';

export default function ViewPet() {
  const location = useLocation();
  const backgroundImage = new URLSearchParams(location.search).get('backgroundImage') || 'basicbg.png';
  const [displayPetName, setDisplayPetName] = useState('Enter Name');
  const [progress, setProgress] = useState(25);
  const { currentPetImage, updatePetImage } = usePetImage();
  const [petData, setPetData] = useState(null);

  const auth = getAuth();
  const db = getDatabase();

  useEffect(() => {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const refPath = `users/${userId}/petData`;
      const petRef = ref(db, refPath);

      const fetchData = (snapshot) => {
        const data = snapshot.val();
        if (data && data.displayPetName) {
          setPetData(data);
          setDisplayPetName(data.displayPetName);
          setProgress(data.progress || 25);
        }
      };
      const unsubscribe = onValue(petRef, fetchData);
      return () => unsubscribe?.();
    }
  }, []);

  useEffect(() => {
    if (auth.currentUser) {
        const userId = auth.currentUser.uid;
        const db = getDatabase();
        const userRef = ref(db, `users/${userId}/currentPet`);
        get(userRef).then((snapshot) => {
            if (snapshot.exists()) {
                updatePetImage(snapshot.val());
            }
        });
    }
}, [auth.currentUser, db, updatePetImage]);


  const handleChangePetName = (newPetName) => {
    if (newPetName) {
      setDisplayPetName(newPetName);
      const auth = getAuth();
      const db = getDatabase();
      const petId = auth.currentUser.uid;
      const petRef = ref(db, `users/${petId}/petData`);
      set(petRef, { ...petData, displayPetName: newPetName })
        .then(() => {})
        .catch((error) => console.error("Error updating pet name: ", error));
    }
  };

  const resetProgress = (lastUpdate) => {
    const today = new Date().toLocaleDateString();
    if (lastUpdate !== today) {
      setProgress(25); // Reset progress to 25% for a new day
      updateProgressInDB(25, today);
    }
  };

  const updateProgressInDB = (newProgress, date) => {
    const auth = getAuth();
    const db = getDatabase();
    const petId = auth.currentUser.uid;
    const petRef = ref(db, `users/${petId}/petData`);
    set(petRef, { progress: newProgress, lastProgressUpdate: date });
  };

  const healthMessage = progress === 100 ? "Your pet is healthy! Check in again tomorrow :)" : "Complete more activities to increase their health!";


return (
  <div className="homepage" style={{ backgroundImage: `url(${backgroundImage})` }}>
    <div className="flex-container-profile">
      <div className="checkin-card">
          <div>
          <NavLink to="/home"><img className="xbutton" src="x.png" alt="close button"></img></NavLink>
            <div className='arrows-name'>
                <p className="pet-name" onClick={() => handleChangePetName(prompt('Enter new pet name'))}>{displayPetName}</p>
            </div>
          <div>
          <img className='dog-view' src={currentPetImage} alt="picture of a pet"/>
          </div>

          <div className="pet-health"> 
            <div className="progress-container" role="progressbar" aria-label="Pet Health Progress" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
            <div className="progress-bar-color" style={{ width: `${progress}%` }}>Pet Health {progress}%</div>
            </div>
          </div>
          <p className='health-msg'> {healthMessage} </p>
          <div className='closet-places-btns'>
            <div className='closet-div'>
              <NavLink to={{ pathname: "/mycloset", search: `?backgroundImage=${encodeURIComponent(backgroundImage)}` }}><div className="place-closet"> <img className="closet-btn-image" src="Boy_Shirt.png" alt="picture of a shirt icon"></img>
                <p className="closet-places-text">My Closet</p>
              </div></NavLink>
            </div>
          </div>
          </div>
      </div>
    </div>
  </div>
);
}



// THIS WAS HOW THE CODE WAS BEFORE I CHANGED IT TO THE ABOVE ^ CODE - IF THERE ARE ISSUES U IDENTIFY LATER
// U CAN USE BELOW CODE

// import React, { useState, useEffect } from 'react';
// import { NavLink, useLocation } from 'react-router-dom';
// import { getDatabase, ref, onValue, set } from 'firebase/database';
// import { getAuth } from 'firebase/auth';

// export default function ViewPet() {
//   const location = useLocation();
//   const backgroundImage = new URLSearchParams(location.search).get('backgroundImage') || 'basicbg.png';
//   const [displayPetName, setPetName] = useState('Enter Name');
//   const [progress, setProgress] = useState(25); 
//   const [currentPetImage, setCurrentPetImage] = useState('dog1.png'); 

//   const handleChangePetName = (newPetName) => {
//     if (newPetName) { 
//       setPetName(newPetName);
//       const auth = getAuth();
//       const db = getDatabase();
//       const petId = auth.currentUser.uid;
//       const petRef = ref(db, `${petId}/petData`);
//       onValue(petRef, (snapshot) => {
//         const petData = snapshot.val();
//         if (petData) {
//           const updatedPetData = { ...petData, displayPetName: newPetName };
//           set(petRef, updatedPetData);
//         }
//       });
//     } else { 
//       // having it do nothing
//     }
//   };

//   useEffect(() => {
//     const auth = getAuth();
//     const db = getDatabase();
  
//     if (auth.currentUser) {
//         const userId = auth.currentUser.uid;
//         const petRef = ref(db, `users/${userId}/petData`);
  
//         onValue(petRef, (snapshot) => {
//             const userData = snapshot.val();
//             if (userData) {
//                 if (userData.currentPetName) {
//                   setPetName(userData.currentPetName);
//                 }
//                 resetProgress(userData.lastProgressUpdate);
//             }
//         });
//     }
//   }, []);
  
//   useEffect(() => {
//     const auth = getAuth();
//     const db = getDatabase();
  
//     if (auth.currentUser) {
//         const userId = auth.currentUser.uid;
//         const petRef = ref(db, `users/${userId}/currentPet`);
  
//         onValue(petRef, (snapshot) => {
//             const currentPet = snapshot.val();
//             if (currentPet) {
//                 setCurrentPetImage(currentPet);
//             }
//         });
//     }
// }, []);

//   useEffect(() => {
//     const auth = getAuth();
//     const db = getDatabase();

//     if (auth.currentUser) {
//         const userId = auth.currentUser.uid;
//         const petRef = ref(db, `users/${userId}/petData`);
        
//         onValue(petRef, (snapshot) => {
//             const petData = snapshot.val();
//             if (petData) {
//                 if (petData.lastProgressUpdate === new Date().toLocaleDateString()) {
//                     setProgress(petData.progress);
//                 } else {
//                     setProgress(25); // Reset if it's a new day
//                 }
//             }
//         });
//     }
// }, []);

//   const resetProgress = (lastUpdate) => {
//     const today = new Date().toLocaleDateString();
//     if (lastUpdate !== today) {
//       setProgress(25); // Reset progress to 25% for a new day
//       updateProgressInDB(25, today); 
//     }
//   };

//   const updateProgressInDB = (newProgress, date) => {
//     const auth = getAuth();
//     const db = getDatabase();
//     const petId = auth.currentUser.uid;
//     const petRef = ref(db, `${petId}/petData`);
//     set(petRef, { progress: newProgress, lastProgressUpdate: date });
//   };

// const healthMessage = progress === 100 ? "Your pet is healthy! Check in again tomorrow :)" : "Complete more activities to increase their health!";

// return (
//   <div className="homepage" style={{ backgroundImage: `url(${backgroundImage})` }}>
//     <div className="flex-container-profile">
//       <div className="checkin-card">
//           <div>
//           <NavLink to="/home"><img className="xbutton" src="x.png" alt="close button"></img></NavLink>
//             <div className='arrows-name'>
//                 <p className="pet-name" onClick={() => handleChangePetName(prompt('Enter new pet name'))}>{displayPetName}</p>
//             </div>
//           <div>
//           <img className='dog-view' src={currentPetImage} alt="picture of a pet"/>
//           </div>

//           <div className="pet-health"> 
//             <div className="progress-container" role="progressbar" aria-label="Pet Health Progress" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
//             <div className="progress-bar-color" style={{ width: `${progress}%` }}>Pet Health {progress}%</div>
//             </div>
//           </div>
//           <p className='health-msg'> {healthMessage} </p>
//           <div className='closet-places-btns'>
//             <div className='closet-div'>
//               <NavLink to="/myCloset" style={{ textDecoration: 'none'}}><div className="place-closet"> <img className="closet-btn-image" src="Boy_Shirt.png" alt="picture of a shirt icon"></img>
//                 <p className="closet-places-text">My Closet</p>
//               </div></NavLink>
//             </div>
//           </div>
//           </div>
//       </div>
//     </div>
//   </div>
// );
// }

