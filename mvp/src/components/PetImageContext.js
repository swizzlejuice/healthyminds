import React, { createContext, useState, useContext } from 'react';

const PetImageContext = createContext();

export const usePetImage = () => useContext(PetImageContext);

export const PetImageProvider = ({ children }) => {
    const [currentPetImage, setCurrentPetImage] = useState('dog1.png');

    const updatePetImage = (image) => {
        setCurrentPetImage(image);
    };

    return (
        <PetImageContext.Provider value={{ currentPetImage, updatePetImage }}>
            {children}
        </PetImageContext.Provider>
    );
};
