import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, set, get } from 'firebase/database';
import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DogImage from './DogImage';

function Home() {
  const [currentUser, setCurrentUser] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState('basicbg.png');
  const [showModal, setShowModal] = useState(false); 

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
        .catch((error) => console.error("Error updating background image:", error));
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal); 
  };

  const backgrounds = [
    { name: 'Starter Background', url: 'basicbg.png' },
        // attribution: vector by drogatnev from depositphotos
    { name: 'Red Orchard', url: 'bg2.png' },
        // attribution: <a href="https://www.vecteezy.com/free-vector/house-street">House Street Vectors by Vecteezy</a>
    { name: 'Fireside Evening', url: 'bg11.png' },
        // free vector with premium trial, no attribution required
    { name: 'The Neighborhood', url: 'bg9.png' },
        // attribution: <a href="https://www.freepik.com/free-vector/scene-with-house-garden_25539962.htm">Image by brgfx</a> on Freepik
    { name: 'Cabin at Sundown', url: 'bg6.png' },
        // attribution: <a href="https://www.vecteezy.com/free-vector/wooden-house">Wooden House Vectors by Vecteezy</a>
    { name: 'Roadside Gazebo', url: 'bg8.png' },
        // attribution: <a href="https://www.freepik.com/free-vector/outdoor-scene-with-doodle-house-cartoon_25679522.htm">Image by brgfx</a> on Freepik
    { name: 'Day at the Park', url: 'bg3.png' },
        // attribution: <a href="https://www.vecteezy.com/vector-art/24592378-playground-park-in-kindergarten-cartoon-landscape">Vectors by Vecteezy</a>
  ];

  return (
    <div className="homepage" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', height: '80vh', marginTop: '.4rem', borderRadius: '22px', marginBottom: '0rem' }}>
      <div className="bg-btns">
        {backgrounds.map((bg, index) => (
          <button className="bg-buttons" key={index} onClick={() => changeBackground(bg.url)}>{bg.name}</button>
        ))}
      </div>
      <button className="outfit-buttons" onClick={toggleModal}>Change Pet Outfit</button>
      <NavLink to={{ pathname: "/viewpet", search: `?backgroundImage=${encodeURIComponent(backgroundImage)}` }}><DogImage /></NavLink>

      <Modal show={showModal} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Change Pet Outfit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Feature not enabled yet, coming soon!
          </p>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Home;
