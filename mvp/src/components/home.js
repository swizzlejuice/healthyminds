import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, set, get } from 'firebase/database';
import { NavLink } from 'react-router-dom';
import DogImage from './DogImage';

function Home() {
  const [currentUser, setCurrentUser] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState('basicbg.png');

  useEffect(() => {
    const auth = getAuth();
    const db = getDatabase();

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        fetchBackgroundImage(user.uid);
      } else {
        setCurrentUser(null);
        setBackgroundImage('basicbg.png'); 
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const fetchBackgroundImage = (userId) => {
    const db = getDatabase();
    const userRef = ref(db, `users/${userId}/backgroundImage`);

    get(userRef)
      .then((snapshot) => {
        const savedBackground = snapshot.val();
        if (savedBackground) {
          setBackgroundImage(savedBackground);
        }
      })
      .catch((error) => {
        console.error("Error fetching background image:", error);
      });
  };

  const changeBackground = (newBackground) => {
    setBackgroundImage(newBackground);
    const currentUser = getAuth().currentUser;
    if (currentUser) {
      const db = getDatabase();
      const userRef = ref(db, `users/${currentUser.uid}/backgroundImage`);
      set(userRef, newBackground)
        .catch(error => console.error("Error updating background image:", error));
    }
  };

  const backgrounds = [
    { name: 'Starter Background', url: 'basicbg.png' },
    { name: 'Rainbow Meadow', url: 'bg2.png' },
    { name: 'Backyard Barbecue', url: 'bg4.png' },
    { name: 'Day at the Park', url: 'bg5.png' },
    { name: 'Cabin in the Woods', url: 'bg6.png' },
    { name: 'City Living', url: 'bg7.png' },
  ];

  return (
    <div className="homepage" style={{backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', height: '80vh', marginTop: '.4rem', borderRadius: '22px', marginBottom: '0rem'}}>
      <div className="bg-btns">
        {backgrounds.map((bg, index) => (
          <button className="bg-buttons" key={index} onClick={() => changeBackground(bg.url)}>{bg.name}</button>
        ))}
      </div>
      <NavLink to={{ pathname: "/viewpet", search: `?backgroundImage=${encodeURIComponent(backgroundImage)}` }}><DogImage/></NavLink>
    </div>
  );
}

export default Home;
