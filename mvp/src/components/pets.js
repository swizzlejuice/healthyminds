import React from 'react';
import StoreNavigator from './storeNavigator'; 
import Footer from './hpfooter';
import PetBox from './petBox';

function Pets() {
    const items = [
        { imgSrc: "browndog.png", price: 100 },
        { imgSrc: "blueheartdog.png", price: 100 },
        { imgSrc: "whitedog.png", price: 100 },
        
    ];

    return (
        <div className="store-page">
            <div className="container">
                <StoreNavigator />
                <div className="row mt-4 justify-content-center">
                    {items.map(item => (
                        <PetBox key={item.itemName} imgSrc={item.imgSrc} itemName={item.itemName} price={item.price} />
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Pets;