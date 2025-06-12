import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database';
import { NavLink, useLocation } from 'react-router-dom';
import { usePetImage } from './PetImageContext';
import { useBackground } from './BackgroundContext';

export default function MyCloset() {
  const [items, setItems] = useState({});
  const [selectedOutfit, setSelectedOutfit] = useState('');  
  const location = useLocation();
  const { backgroundImage } = useBackground();
  const { updateNecessityImage } = usePetImage();
  const { updatePetImage } = usePetImage();
  const [basePetName, setBasePetName] = useState('');

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const db = getDatabase();
        const itemsRef = ref(db, `users/${user.uid}/purchasedItems`);
        get(itemsRef).then(snapshot => {
          if (snapshot.exists()) {
            setItems(snapshot.val());
          }
        });

        const userRef = ref(db, `users/${user.uid}/currentPet`);
        get(userRef).then(snapshot => {
          if (snapshot.exists()) {
            const fullPetName = snapshot.val(); // e.g., "dog1.png"
            const match = fullPetName.match(/^([a-zA-Z]+\d+)/); // Regex to extract the base pet name with numbers
            if (match) {
              setBasePetName(match[1]); 
            }
          }
        });
      }
    });
  }, []);

  const handleItemClick = (item) => {
    console.log("Item clicked:", item);
    if (item.isNecessity) {
        console.log("Applying as necessity");
        updateNecessityImage(item.imgSrc.replace('T', ''));
    } else {
        console.log("Applying as clothing or pet");
        const formattedItemName = item.itemName.replace(/\s+/g, '').toLowerCase();
        const newPetImage = `${basePetName}${formattedItemName}.png`;
        updatePetImage(newPetImage);
    }
};

  return (
    <div className="checkin-body" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="flex-container-profile">
        <div className="closet-card">
          <div className="closet-div">
            <NavLink to="/home"><img className="x-btn2" src="x.png" alt="close button"></img></NavLink>
            <div className="closet-divv">
              <p className="closet-title">My Closet</p>
            </div>
            <div className='clothing-list'>
              {Object.values(items).map((item) => (
                <div key={item.itemName} className={`clothing-item ${selectedOutfit === item.itemName ? 'closet-selected' : ''}`} onClick={() => handleItemClick(item)}>
                <img className="img-closet" src={item.imgSrc} alt={item.itemName} />
                  <p className="p-closet">{item.itemName}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

