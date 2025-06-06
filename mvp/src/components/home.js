import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getDatabase, ref, get, set } from 'firebase/database';
import { NavLink, useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { usePetImage } from './PetImageContext';
import { useBackground } from './BackgroundContext';

function Home() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { currentPetImage, necessityImage } = usePetImage();
  const { backgroundImage, setBackgroundImage } = useBackground();

  useEffect(() => {
    const auth = getAuth();

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);

        // if (!backgroundImage) {
        //   fetchBackgroundImage(user.uid);
        // } else {
        //   // If context already has background, no need to fetch again
        //   setIsLoading(false);
        //   checkLastLoginDate(user.uid);
        // }
        fetchBackgroundImage(user.uid);
        checkLastLoginDate(user.uid);


      } else {
        setCurrentUser(null);
        setBackgroundImage('basicbg.png');
        setShowModal(false);
        setIsLoading(false);
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
        } else {
          setBackgroundImage('basicbg.png'); // fallback
        }
      })
      .catch(() => {
        setBackgroundImage('basicbg.png');
      })
      .finally(() => setIsLoading(false));
  };

  const checkLastLoginDate = (userId) => {
    const db = getDatabase();
    const lastLoginRef = ref(db, `users/${userId}/lastLoginDate`);
    get(lastLoginRef).then((snapshot) => {
      const lastLoginDate = snapshot.val();
      const today = new Date().toDateString();
      if (!lastLoginDate || lastLoginDate !== today) {
        setShowModal(true);
        updateLastLoginDate(userId, today);
      }
    });
  };

  const updateLastLoginDate = (userId, date) => {
    const db = getDatabase();
    const lastLoginRef = ref(db, `users/${userId}/lastLoginDate`);
    set(lastLoginRef, date).catch(() => {});
  };

  const changeBackground = (newBackground) => {
    setBackgroundImage(newBackground);
    const currentUser = getAuth().currentUser;
    if (currentUser) {
      const db = getDatabase();
      const userRef = ref(db, `users/${currentUser.uid}/backgroundImage`);
      set(userRef, newBackground).catch(() => {});
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth);
  };

  const backgrounds = [
    { name: 'Starter Background', url: 'basicbg.png' },
    { name: 'Red Orchard', url: 'bg2.png' },
    { name: 'The Stables', url: 'barn.png' },
    { name: 'Fireside Evening', url: 'bg11.png' },
    { name: 'The Neighborhood', url: 'bg9.png' },
    { name: 'Cabin at Sundown', url: 'bg6.png' },
    { name: 'Day at the Farm', url: 'farm.jpg' },
    { name: 'Roadside Gazebo', url: 'bg8.png' },
    { name: 'Blue Night', url: 'nighthouse.jpg' },
    // all vectors sourced from Vecteezy with a premium license
  ];

  if (isLoading) return null; 

  return (
    <div
      className="homepage"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        borderRadius: '0px',
        marginBottom: '0rem',
      }}
    >
      <Modal show={showModal} onHide={toggleModal} centered>
        <Modal.Header>
          <Modal.Title>Daily Check In Reminder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Don't forget to complete your daily check in to earn coins and increase your pet's health!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleModal}>
            Dismiss
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="bg-btns">
        {backgrounds.map((bg, index) => (
          <button className="bg-buttons" key={index} onClick={() => changeBackground(bg.url)}>
            {bg.name}
          </button>
        ))}
      </div>

      <NavLink to={{ pathname: '/mycloset', search: `?backgroundImage=${encodeURIComponent(backgroundImage)}` }}>
        <button className="outfit-buttons">Change Pet Outfit</button>
      </NavLink>

      <NavLink to={{ pathname: '/viewpet', search: `?backgroundImage=${encodeURIComponent(backgroundImage)}` }}>
        <div className="pet-and-necessity-display">
          {necessityImage && (
            <img src={necessityImage} alt="Necessity" className="necessity-image" />
          )}
          <img className="dog" src={currentPetImage} alt="Current Pet" />
        </div>
      </NavLink>
    </div>
  );
}

export default Home;


// import React, { useState, useEffect } from 'react';
// import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
// import { getDatabase, ref, get, set } from 'firebase/database';
// import { NavLink, useNavigate } from 'react-router-dom';
// import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';
// import { usePetImage } from './PetImageContext';
// import { useBackground } from './BackgroundContext';

// function Home({ updateBackgroundImage }) {
//   let navigate = useNavigate();
//   const [currentUser, setCurrentUser] = useState(null);
//   const [backgroundImage, setBackgroundImage] = useState(null); // no default image
//   const [showModal, setShowModal] = useState(false);
//   const [isLoading, setIsLoading] = useState(true); // loading state
//   const { currentPetImage, necessityImage } = usePetImage();

//   useEffect(() => {
//     const auth = getAuth();

//     const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setCurrentUser(user);
//         fetchBackgroundImage(user.uid);
//         checkLastLoginDate(user.uid);
//       } else {
//         setCurrentUser(null);
//         setBackgroundImage(null);
//         setShowModal(false);
//         setIsLoading(false);
//       }
//     });

//     return () => unsubscribeAuth();
//   }, []);

//   const fetchBackgroundImage = (userId) => {
//     const db = getDatabase();
//     const userRef = ref(db, `users/${userId}/backgroundImage`);
//     get(userRef)
//       .then((snapshot) => {
//         const savedBackground = snapshot.val();
//         if (savedBackground) {
//           setBackgroundImage(savedBackground);
//           updateBackgroundImage(savedBackground);
//         } else {
//           setBackgroundImage('basicbg.png'); // fallback if no saved background
//         }
//       })
//       .catch(() => {
//         setBackgroundImage('basicbg.png');
//       })
//       .finally(() => setIsLoading(false));
//   };

//   const checkLastLoginDate = (userId) => {
//     const db = getDatabase();
//     const lastLoginRef = ref(db, `users/${userId}/lastLoginDate`);
//     get(lastLoginRef).then((snapshot) => {
//       const lastLoginDate = snapshot.val();
//       const today = new Date().toDateString();
//       if (!lastLoginDate || lastLoginDate !== today) {
//         setShowModal(true);
//         updateLastLoginDate(userId, today);
//       }
//     });
//   };

//   const updateLastLoginDate = (userId, date) => {
//     const db = getDatabase();
//     const lastLoginRef = ref(db, `users/${userId}/lastLoginDate`);
//     set(lastLoginRef, date).catch(() => {});
//   };

//   const changeBackground = (newBackground) => {
//     setBackgroundImage(newBackground);
//     const currentUser = getAuth().currentUser;
//     if (currentUser) {
//       const db = getDatabase();
//       const userRef = ref(db, `users/${currentUser.uid}/backgroundImage`);
//       set(userRef, newBackground).catch(() => {});
//     }
//   };

//   const toggleModal = () => {
//     setShowModal(!showModal);
//   };

//   const handleLogout = () => {
//     const auth = getAuth();
//     signOut(auth);
//   };

//   const backgrounds = [
//     { name: 'Starter Background', url: 'basicbg.png' },
//     { name: 'Red Orchard', url: 'bg2.png' },
//     { name: 'Fireside Evening', url: 'bg11.png' },
//     { name: 'The Neighborhood', url: 'bg9.png' },
//     { name: 'Cabin at Sundown', url: 'bg6.png' },
//     { name: 'Roadside Gazebo', url: 'bg8.png' },
//     { name: 'Day at the Park', url: 'bg3.png' },
//   ];

//   if (isLoading) return null; // or replace with a loader/spinner

//   return (
//     <div
//       className="homepage"
//       style={{
//         backgroundImage: `url(${backgroundImage})`,
//         backgroundSize: 'cover',
//         borderRadius: '0px',
//         marginBottom: '0rem',
//       }}
//     >
//       <Modal show={showModal} onHide={toggleModal} centered>
//         <Modal.Header>
//           <Modal.Title>Daily Check-In Reminder</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>Don't forget to complete your daily check-in to earn coins and increase your pet's health!</p>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={toggleModal}>
//             Dismiss
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       <div className="bg-btns">
//         {backgrounds.map((bg, index) => (
//           <button className="bg-buttons" key={index} onClick={() => changeBackground(bg.url)}>
//             {bg.name}
//           </button>
//         ))}
//       </div>

//       <NavLink to={{ pathname: '/mycloset', search: `?backgroundImage=${encodeURIComponent(backgroundImage)}` }}>
//         <button className='outfit-buttons'>Change Pet Outfit</button>
//       </NavLink>
      
//       <NavLink to={{ pathname: '/viewpet', search: `?backgroundImage=${encodeURIComponent(backgroundImage)}` }}>
//         <div className="pet-and-necessity-display">
//           {necessityImage && (
//             <img src={necessityImage} alt="Necessity" className="necessity-image" />
//           )}
//           <img className="dog" src={currentPetImage} alt="Current Pet" />
//         </div>
//       </NavLink>
//     </div>
//   );
// }

// export default Home;




// import React, { useState, useEffect } from 'react';
// import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
// import { getDatabase, ref, get, set } from 'firebase/database';
// import { NavLink, useNavigate } from 'react-router-dom';
// import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';
// import { usePetImage } from './PetImageContext';

// function Home({ updateBackgroundImage }) {
//   let navigate = useNavigate();
//   const [currentUser, setCurrentUser] = useState(null);
//   const [backgroundImage, setBackgroundImage] = useState('basicbg.png');
//   const [showModal, setShowModal] = useState(false);
//   const { currentPetImage, necessityImage } = usePetImage();

//   useEffect(() => {
//     const auth = getAuth();
//     const db = getDatabase();

//     const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setCurrentUser(user);
//         fetchBackgroundImage(user.uid);
//         checkLastLoginDate(user.uid);
//       } else {
//         setCurrentUser(null);
//         setBackgroundImage('basicbg.png');
//         setShowModal(false);
//       }
//     });

//     return () => unsubscribeAuth();
//   }, []);

//   const fetchBackgroundImage = (userId) => {
//     const db = getDatabase();
//     const userRef = ref(db, `users/${userId}/backgroundImage`);
//     get(userRef).then((snapshot) => {
//       const savedBackground = snapshot.val();
//       if (savedBackground) {
//         setBackgroundImage(savedBackground);
//         updateBackgroundImage(savedBackground);
//       }
//     }).catch(() => {});
//   };

//   const checkLastLoginDate = (userId) => {
//     const db = getDatabase();
//     const lastLoginRef = ref(db, `users/${userId}/lastLoginDate`);
//     get(lastLoginRef).then((snapshot) => {
//       const lastLoginDate = snapshot.val();
//       const today = new Date().toDateString();
//       if (!lastLoginDate || lastLoginDate !== today) {
//         setShowModal(true);
//         updateLastLoginDate(userId, today);
//       }
//     }).catch(() => {});
//   };

//   const updateLastLoginDate = (userId, date) => {
//     const db = getDatabase();
//     const lastLoginRef = ref(db, `users/${userId}/lastLoginDate`);
//     set(lastLoginRef, date).catch(() => {});
//   };

//   const changeBackground = (newBackground) => {
//     setBackgroundImage(newBackground);
//     const currentUser = getAuth().currentUser;
//     if (currentUser) {
//       const db = getDatabase();
//       const userRef = ref(db, `users/${currentUser.uid}/backgroundImage`);
//       set(userRef, newBackground).catch(() => {});
//     }
//   };

//   const toggleModal = () => {
//     setShowModal(!showModal);
//   };

//   const handleLogout = () => {
//     const auth = getAuth();
//     signOut(auth);
//   };

//   const backgrounds = [
//     { name: 'Starter Background', url: 'basicbg.png' },
//     { name: 'Red Orchard', url: 'bg2.png' },
//     // attribution: <a href="https://www.vecteezy.com/free-vector/house-street">House Street Vectors by Vecteezy</a>
//     { name: 'Fireside Evening', url: 'bg11.png' },
//     { name: 'The Neighborhood', url: 'bg9.png' },
//     // attribution: <a href="https://www.freepik.com/free-vector/scene-with-house-garden_25539962.htm">Image by brgfx</a> on Freepik
//     { name: 'Cabin at Sundown', url: 'bg6.png' },
//     // attribution: <a href="https://www.vecteezy.com/free-vector/wooden-house">Wooden House Vectors by Vecteezy</a>
//     { name: 'Roadside Gazebo', url: 'bg8.png' },
//     // attribution: <a href="https://www.freepik.com/free-vector/outdoor-scene-with-doodle-house-cartoon_25679522.htm">Image by brgfx</a> on Freepik
//     { name: 'Day at the Park', url: 'bg3.png' },
//     // attribution: <a href="https://www.vecteezy.com/vector-art/24592378-playground-park-in-kindergarten-cartoon-landscape">Vectors by Vecteezy</a>
//   ];

//   return (
//     <div
//       className="homepage"
//       style={{
//         backgroundImage: `url(${backgroundImage})`,
//         backgroundSize: 'cover',
//         borderRadius: '0px',
//         marginBottom: '0rem',
//       }}
//     >
//       <Modal show={showModal} onHide={toggleModal} centered>
//         <Modal.Header>
//           <Modal.Title>Daily Check-In Reminder</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>Don't forget to complete your daily check-in to earn coins and increase your pet's health!</p>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={toggleModal}>
//             Dismiss
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       <div className="bg-btns">
//         {backgrounds.map((bg, index) => (
//           <button className="bg-buttons" key={index} onClick={() => changeBackground(bg.url)}>
//             {bg.name}
//           </button>
//         ))}
//       </div>

//       <NavLink to={{ pathname: '/mycloset', search: `?backgroundImage=${encodeURIComponent(backgroundImage)}` }}>
//         <button className='outfit-buttons'>Change Pet Outfit</button>
//       </NavLink>
      
//       <NavLink to={{ pathname: '/viewpet', search: `?backgroundImage=${encodeURIComponent(backgroundImage)}` }}>
//         <div className="pet-and-necessity-display">
//           {necessityImage && (
//             <img src={necessityImage} alt="Necessity" className="necessity-image" />
//           )}
//           <img className="dog" src={currentPetImage} alt="Current Pet" />
//         </div>
//       </NavLink>
//     </div>
//   );
// }

// export default Home;
