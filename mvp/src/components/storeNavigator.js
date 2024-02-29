/* import React from 'react';
import Necessities from './necessities';
import { NavLink, } from 'react-router-dom';

function StoreNavigator() {
    return (
        <div className="store-navigator">
            <button className="clothing-btn">Clothing</button>
            <button className="necessities-btn"><NavLink to="/necessities"></NavLink>Necessities</button>
            <button className="pets-btn">Pets</button>
            <button className="places-btn">Places</button>
        </div>
        /*<div>
            <button className="clothing-btn" onClick={() => navigate('/clothing')}>Clothing</button>
            <button className="necessities-btn" onClick={() => navigate('/necessities')}>Necessities</button>
            <button className="pets-btn" onClick={() => navigate('/pets')}>Pets</button>
            <button className="places-btn" onClick={() => navigate('/places')}>Places</button>
            <Routes>
            <Route path="/necessities" element={<Necessities />}> </Route>
            </Routes>
        </div>
        
    );
}

export default StoreNavigator;

*/
// StoreNavigator.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function StoreNavigator() {
  let navigate = useNavigate();

  return (
    <nav className="store-navigator">
      <button className='clothing-btn' onClick={() => navigate('/clothing')}>Clothing</button>
      <button className='necessities-btn' onClick={() => navigate('/necessities')}>Necessities</button>
      <button className='pets-btn' onClick={() => navigate('/pets')}>Pets</button>
      <button className='places-btn' onClick={() => navigate('/places')}>Places</button>
    </nav>
  );
}

export default StoreNavigator;