import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';

export default function ViewPet() {
  const location = useLocation();
  const backgroundImage = new URLSearchParams(location.search).get('backgroundImage') || 'basicbg.png';
  const [displayPetName, setPetName] = useState('Enter Name');
  const [progress, setProgress] = useState(25); 


  const handleChangePetName = (newPetName) => {
    if (newPetName) { 
      setPetName(newPetName);
      const auth = getAuth();
      const db = getDatabase();
      const petId = auth.currentUser.uid;
      const petRef = ref(db, `${petId}/petData`);
      set(petRef, { displayPetName: newPetName });
    } else { 
      // having it do nothing
    }
  };

  /*useEffect(() => {
    const auth = getAuth();
    const db = getDatabase();
  
    if (auth.currentUser) {
      const petId = auth.currentUser.uid;
      const petRef = ref(db, `${petId}/petData`);
      
    
      onValue(petRef, (snapshot) => {
        const petData = snapshot.val();
        if (petData && petData.displayPetName) {
          setPetName(petData.displayPetName);
          resetProgress(petData.lastProgressUpdate);
        }
      });

      
    }
  }, []);*/

  useEffect(() => {
    const auth = getAuth();
    const db = getDatabase();

    if (auth.currentUser) {
        const userId = auth.currentUser.uid;
        const petRef = ref(db, `users/${userId}/petData`);
        
        onValue(petRef, (snapshot) => {
            const petData = snapshot.val();
            if (petData) {
                if (petData.lastProgressUpdate === new Date().toLocaleDateString()) {
                    setProgress(petData.progress);
                } else {
                    setProgress(25); // Reset if it's a new day
                }
            }
        });
    }
}, []);



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
    const petRef = ref(db, `${petId}/petData`);
    set(petRef, { progress: newProgress, lastProgressUpdate: date });
  };

const healthMessage = progress === 100 ? "Congrats! Your pet is healthy!" : "Complete more activities to increase their health!";


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
            <img className ='dog-view' src="hiro.png" alt="picture of a dog"/>
          </div>

          <div className="pet-health"> 
            <div className="progress-container" role="progressbar" aria-label="Pet Health Progress" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
            <div className="progress-bar-color" style={{ width: `${progress}%` }}>Pet Health {progress}%</div>
            </div>
          </div>
          <p className='health-msg'> {healthMessage} </p>
          <div className='closet-places-btns'>
            <div className='closet-div'>
              <NavLink to="/myCloset" style={{ textDecoration: 'none'}}><div className="place-closet"> <img className="closet-btn-image" src="Boy_Shirt.png" alt="picture of a shirt icon"></img>
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