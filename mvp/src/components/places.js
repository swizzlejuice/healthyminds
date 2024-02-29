import React from 'react';
import StoreNavigator from './storeNavigator'; 
import PlaceBox from './placeBox';

function Places() {
    const items = [
        { imgSrc: "grassygreens.png", itemName: "Grassy Greens", price: 75 },
    ];

    return (
        <div className="store-page">
            <div className="container">
                <StoreNavigator />
                <div className="row mt-4 justify-content-center">
                    {items.map(item => (
                        <PlaceBox key={item.itemName} imgSrc={item.imgSrc} itemName={item.itemName} price={item.price} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Places;