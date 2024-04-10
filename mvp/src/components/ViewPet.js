import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';

export default function ViewPet() {
  const location = useLocation();
  const backgroundImage = new URLSearchParams(location.search).get('backgroundImage') || 'basicbg.png';
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

return (
  <div className="checkin-body" style={{ backgroundImage: `url(${backgroundImage})` }}>
    <div className="flex-container-profile">
      <div className="checkin-card">
          <div>
          <NavLink to="/home"><img className="xbutton" src="x.png" alt="close button"></img></NavLink>
            <div className='arrows-name'>
                <img className="left-arrow" src="Leftt_Arrow.png" alt="left arrow"></img>
                <p className="pet-name" onClick={() => handleChangePetName(prompt('Enter new pet name'))}>{displayPetName}</p>
                <img className="right-arrow" src="Right_Arrow 2.png" alt="right arrow"></img>
            </div>
          <div>
            <img className ='dog-view' src="hiro.png" alt="picture of a dog"/>
          </div>
          <div className='closet-places-btns'>
            <div className='closet-div'>
              <NavLink to="/myCloset" style={{ textDecoration: 'none'}}><div className="place-closet"> <img className="closet-btn-image" src="Boy_Shirt.png" alt="picture of a shirt icon"></img>
                <p className="closet-places-text">My Closet</p>
              </div></NavLink>
            </div>

            <div className='places-div'>
              <NavLink to="/myPlaces" style={{ textDecoration: 'none'}}><div className="place-closet"> <img className="places-btn-image" src="Vector.png" alt="picture of a places icon"></img>
                <p className="closet-places-text">My Places</p>
              </div></NavLink>
            </div>

          </div>
          </div>
      </div>
    </div>
  </div>
);
}