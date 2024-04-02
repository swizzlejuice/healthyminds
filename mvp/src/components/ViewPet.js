import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';

export default function ViewPet() {

  const [displayPetName, setPetName] = useState('Enter Name');

  const handleChangePetName = (newPetName) => {
    setPetName(newPetName);
    const auth = getAuth();
    const db = getDatabase();
    const petId = auth.currentUser.uid;
    const petRef = ref(db, `${petId}/petData`);
    set(petRef, { displayPetName: newPetName });
  };

  useEffect(() => {
    const auth = getAuth();
    const db = getDatabase();
  
    if (auth.currentUser) {
      const petId = auth.currentUser.uid;
      const petRef = ref(db, `${petId}/petData`);
      
    
      onValue(petRef, (snapshot) => {
        const petData = snapshot.val();
        if (petData && petData.displayPetName) {
          setPetName(petData.displayPetName);
        }
      });

      
    }
  }, []);

  /*return (
    <div className="checkin-body">
      <div className="flex-container-profile">
        <div className="checkin-card">
          <NavLink to="/home"><img className="xbtn" src="x.png" alt="close button"></img></NavLink>
            <div>
              <p className="pet-name">{displayPetName}</p>
              <p className="change-name" onClick={() => handleChangePetName(prompt('Enter new pet name'))}>
            Change Name
          </p>
            </div>
        </div>
      </div>
    </div>
  );
}
*/

return (
  <div className="checkin-body">
    <div className="flex-container-profile">
      <div className="checkin-card">
          <div>
            <div>
                <img className="left-arrow" src="Leftt_Arrow.png" alt="left arrow"></img>
                <p className="pet-name" onClick={() => handleChangePetName(prompt('Enter new pet name'))}>{displayPetName}</p>
                <img className="right-arrow" src="Right_Arrow 2.png" alt="right arrow"></img>
              
            </div>
        <NavLink to="/home"><p className="back-btn"> Back </p></NavLink>
          </div>
      </div>
    </div>
  </div>
);
}