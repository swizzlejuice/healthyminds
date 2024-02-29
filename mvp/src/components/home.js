import React from 'react';
import DogImage from './DogImage';


export function Home() {
    return (
        <div className="homepage" style={{ backgroundImage: 'url("background.png")' }}>
            <DogImage />

        </div>
        
    );
  }