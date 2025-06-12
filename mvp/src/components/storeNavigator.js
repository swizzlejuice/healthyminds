import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function StoreNavigator() {
  let location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="store-navigator">
      <button
        className={`clothing-btn ${location.pathname === '/clothing' ? 'active-tab' : ''}`}
        onClick={() => navigate('/clothing')}
      >
        Clothing
      </button>

      <button
        className={`necessities-btn ${location.pathname === '/necessities' ? 'active-tab' : ''}`}
        onClick={() => navigate('/necessities')}
      >
        Necessities
      </button>

      <button
        className={`pets-btn ${location.pathname === '/pets' ? 'active-tab' : ''}`}
        onClick={() => navigate('/pets')}
      >
        Pets
      </button>
      {/* <button className='clothing-btn' onClick={() => navigate('/clothing')}>Clothing</button>
      <button className='necessities-btn' onClick={() => navigate('/necessities')}>Necessities</button>
      <button className='pets-btn' onClick={() => navigate('/pets')}>Pets</button> */}
    </nav>
  );
}

export default StoreNavigator;

