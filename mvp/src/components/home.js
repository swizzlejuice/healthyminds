import React from 'react';
import DogImage from './DogImage';
import { NavLink } from 'react-router-dom';

export function Home() {
    return (
        <div className="homepage">
            <NavLink to="/viewpet"><DogImage/></NavLink>
        </div>
        
    );
  }