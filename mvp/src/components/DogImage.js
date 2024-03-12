import React from 'react';
import { NavLink } from 'react-router-dom';

function DogImage() {
    return (
        <div className="dog">
            <li><NavLink to="/checkin"><img src="dog.png" alt="picture of a dog" /></NavLink></li>
        </div>
    );
}

export default DogImage;

