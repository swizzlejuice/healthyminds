import React, { useState, useEffect } from 'react';
import { HappyPawsNav } from './components/hpnav';
import Necessities from './components/necessities';
import StorePage from './components/clothing';
import Footer from './components/hpfooter';
import { Home } from './components/home';
import ProfilePage from './components/profile';
import { Routes, Route } from 'react-router-dom';
import Pets from './components/pets';
import Places from './components/places';
import LoginPage from './components/login';
import './App.css';
import CreateAccount from './components/createaccount';
import CheckIn from './components/checkin';
import CheckModal from './components/CheckModal';

function App() {
  const selectedAvatar = 'profileimage.png';
  return (
    <div >
      <HappyPawsNav selectedAvatar={selectedAvatar} />
      <Routes>
          <Route path="/"index element={<LoginPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/clothing" element={<StorePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/necessities" element={<Necessities />}/>
          <Route path="/pets" element={<Pets />}/>
          <Route path="/places" element={<Places />}/>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<CreateAccount />} />
          <Route path="/checkin" element={<CheckIn />} />
          <Route path="/modal" element={<CheckModal />} />
      </Routes>
      <Footer /> 
    </div>
  );
}

export default App;