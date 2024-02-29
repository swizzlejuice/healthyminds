import React from 'react';
import { HappyPawsNav } from './components/hpnav';
import Necessities from './components/necessities';
import StorePage from './components/clothing';
import { Home } from './components/home';
import ProfilePage from './components/profile';
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <div >
      <HappyPawsNav/>
      <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/clothing" element={<StorePage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/necessities" element={<Necessities />}/>
      </Routes>
    </div>
    
  );
}

export default App;